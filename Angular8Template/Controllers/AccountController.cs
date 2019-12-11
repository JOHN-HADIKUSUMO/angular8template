using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Angular8Template.Models;
using Angular8Template.Database;

namespace Angular8Template.Web.Controllers.Api
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration configuration;
        private IServiceProvider provider;
        private ILogger logger;
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private string securityKey;
        private string validIssuer;
        private string validAudience;
        public AccountController(IConfiguration configuration, IServiceProvider provider, ILogger<AccountController> logger) : base()
        {
            this.configuration = configuration;
            this.provider = provider;
            this.logger = logger;
            userManager = (UserManager<ApplicationUser>)this.provider.GetService(typeof(UserManager<ApplicationUser>));
            signInManager = (SignInManager<ApplicationUser>)this.provider.GetService(typeof(SignInManager<ApplicationUser>));
            securityKey = this.configuration.GetSection("JWTAuthentication")["SecretKey"].ToString();
            validIssuer = this.configuration.GetSection("JWTAuthentication")["ValidIssuer"].ToString();
            validAudience = this.configuration.GetSection("JWTAuthentication")["ValidAudience"].ToString();
        }

        [Authorize(Roles = "User", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("profile")]
        public async Task<ActionResult> UpdateProfile(UpdateProfile model)
        {
            return new ContentResult() { StatusCode = 200, ContentType = "application/json", Content = string.Empty };
            //Claim emailClaim = User.Claims.Where(w => w.Type.Contains("email")).FirstOrDefault();
            //if (emailClaim != null)
            //{
            //    string email = emailClaim.Value;
            //    ApplicationUser user = await this.userManager.FindByNameAsync(email);
            //    if (user != null)
            //    {

            //        UpdateProfile update = new UpdateProfile();
            //        update.Email = email;
            //        update.Firstname = user.Firstname;
            //        update.Lastname = user.Lastname;
            //        update.Age = user.Age;
            //        update.Position = await this.userManager.IsInRoleAsync(user, "Manager") ? "Manager" : "User";
            //        return Ok(update);
            //    }
            //}
            //return new ContentResult() { StatusCode = 500, ContentType = "application/json", Content = "Fail to find the profile" };
        }

        [Authorize(Roles = "User", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("profile")]
        public async Task<ActionResult> GetProfile()
        {
            Claim emailClaim = User.Claims.Where(w => w.Type.Contains("email")).FirstOrDefault();
            if(emailClaim != null)
            {
                string email = emailClaim.Value;
                ApplicationUser user = await this.userManager.FindByNameAsync(email);
                if(user != null)
                {
                    
                    UpdateProfile update = new UpdateProfile();
                    update.Email = email;
                    update.Firstname = user.Firstname;
                    update.Lastname = user.Lastname;
                    update.Age = user.Age;
                    update.Position = await this.userManager.IsInRoleAsync(user, "Manager") ? "Manager" : "User";
                    return Ok(update);
                }
            }
            return new ContentResult() { StatusCode = 500, ContentType = "application/json", Content = "Fail to find the profile" };
        }

        [Authorize(Roles = "Manager", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("users")]
        public ActionResult GetUsers()
        {
            List<ApplicationUser> users = this.userManager.Users.ToList<ApplicationUser>();
            return Ok(users);
        }

        [Authorize(Roles = "Manager", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("users/delete")]
        public async Task<ActionResult> Delete(DeleteUser model)
        {
            ApplicationUser user = await this.userManager.FindByIdAsync(model.Id);
            if(user != null)
            {
                IdentityResult deleteResult = await this.userManager.DeleteAsync(user);
                if(deleteResult.Succeeded)
                    return new ContentResult() { StatusCode = 200, ContentType = "application/json", Content = "true" };
                else
                {
                    string errorMessage = deleteResult.Errors.FirstOrDefault().Description;
                    return new ContentResult() { StatusCode = 500, ContentType = "application/json", Content = errorMessage };
                }
            }
            return new ContentResult() { StatusCode = 500, ContentType = "application/json" , Content = "Invalid user id" };
        }

        [HttpPost("users/add")]
        public async Task<ActionResult> Add(Registration registration)
        {
            ApplicationUser user = new ApplicationUser();
            user.Firstname = registration.firstname;
            user.Lastname = registration.lastname;
            user.Email = registration.email;
            user.EmailConfirmed = false;
            user.UserName = registration.email;
            user.Age = registration.age;

            IdentityResult resultCreateUser = await userManager.CreateAsync(user, registration.password);
            if (resultCreateUser.Succeeded)
            {
                IdentityResult resultRole = await userManager.AddToRoleAsync(user, registration.position);
                if(resultRole.Succeeded)
                    return Ok(true);
                else
                {
                    string message = null;
                    foreach (IdentityError item in resultCreateUser.Errors)
                    {
                        message = item.Description;
                        break;
                    }
                    return new ContentResult() { StatusCode = 500, Content = message, ContentType = "application/json" };
                }
            }
            else
            {
                string message = null;
                foreach (IdentityError item in resultCreateUser.Errors)
                {
                    message = item.Description;
                    break;
                }
                return new ContentResult() { StatusCode = 500, Content = message, ContentType = "application/json" };
            }
        }

        private List<Claim> GetRoleClaims(ApplicationUser user)
        {
            List<Claim> claims = new List<Claim>();
            Task<IList<string>> roles =  this.userManager.GetRolesAsync(user);
            foreach (string role in roles.Result)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(Login model)
        {
            logger.LogInformation("Login starts");
            Task<ApplicationUser> user = userManager.FindByEmailAsync(model.Email);
            Task<Microsoft.AspNetCore.Identity.SignInResult> signInResult = signInManager.CheckPasswordSignInAsync(user.Result, model.Password, false);
            if (signInResult.Result.Succeeded)
            {
                logger.LogInformation("Login is Succeeded");
                Task<IList<string>> roles = userManager.GetRolesAsync(user.Result);
                List<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.Name, user.Result.Firstname + (string.IsNullOrEmpty(user.Result.Lastname) ? "" : (" " + user.Result.Lastname))));
                claims.Add(new Claim(ClaimTypes.Email, user.Result.Email));
                claims.AddRange(this.GetRoleClaims(user.Result).ToArray());


                byte[] arrayOfBytes = Encoding.UTF8.GetBytes(securityKey);
                SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(arrayOfBytes);
                SigningCredentials signinCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

                JwtSecurityToken token = new JwtSecurityToken(
                    issuer: validIssuer,
                    audience: validAudience,
                    expires: DateTime.Now.AddDays(1),
                    claims: claims,
                    signingCredentials: signinCredentials
                );
                string jwt = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new LoginSuccess { Fullname = user.Result.Firstname + (string.IsNullOrEmpty(user.Result.Lastname) ? "" : (" " + user.Result.Lastname)), Token = jwt, Position = (await this.userManager.IsInRoleAsync(user.Result, "Manager") ? "Manager" : "User") });
            }
            else
            {
                return new ContentResult() { StatusCode = 400, Content = "Wrong email or password", ContentType = "application/json" };
            }
        }
    }
}
