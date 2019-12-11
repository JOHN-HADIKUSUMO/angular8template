using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Angular8Template.Models;
using Angular8Template.Database;
using Microsoft.Extensions.Hosting;

namespace Angular8Template
{
    public class Startup
    {
        private string connectionString;
        private string securityKey;
        private string validIssuer;
        private string validAudience;
        private IWebHostEnvironment environment { get; }
        public IConfiguration configuration { get; }


        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            this.environment = environment;
            this.configuration = configuration;
            connectionString = this.configuration.GetConnectionString("DefaultConnection");
            securityKey = this.configuration.GetSection("JWTAuthentication")["SecretKey"].ToString();
            validIssuer = this.configuration.GetSection("JWTAuthentication")["ValidIssuer"].ToString();
            validAudience = this.configuration.GetSection("JWTAuthentication")["ValidAudience"].ToString();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            byte[] arrayOfBytes = Encoding.UTF8.GetBytes(securityKey);
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(arrayOfBytes);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = validIssuer,
                        ValidAudience = validAudience,
                        IssuerSigningKey = symmetricSecurityKey
                    };
                });
            services.AddControllers(options => options.EnableEndpointRouting = false);
            services.AddDbContext<ApplicationUserContext>(options => options.UseSqlServer(connectionString));
            services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationUserContext>()
            .AddDefaultTokenProviders();

            services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));
            services.Configure<IdentityOptions>(options =>
            {
                // User settings
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
            });

            services.AddCors();
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            if (this.environment.IsDevelopment() && !string.IsNullOrWhiteSpace(this.configuration["HttpsRedirectionPort"]))
            {
                services.AddHttpsRedirection(options =>
                {
                    options.HttpsPort = int.Parse(this.configuration["HttpsRedirectionPort"]);
                });
            }
            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
            app.UseAuthorization();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";    
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
