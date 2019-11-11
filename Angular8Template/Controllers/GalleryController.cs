using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Angular8Template.Models;
using Angular8Template.Database;

namespace Angular8Template.Web.Controllers.Api
{
    [Route("api/gallery")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private IConfiguration configuration;
        private IServiceProvider provider;
        private ILogger logger;
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        public GalleryController(IConfiguration configuration, IServiceProvider provider, ILogger<AccountController> logger) : base()
        {
            this.configuration = configuration;
            this.provider = provider;
            this.logger = logger;
            userManager = (UserManager<ApplicationUser>)this.provider.GetService(typeof(UserManager<ApplicationUser>));
            signInManager = (SignInManager<ApplicationUser>)this.provider.GetService(typeof(SignInManager<ApplicationUser>));
        }

        [Authorize(Roles = "Manager,User",AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("asx/data")]
        public async Task<ActionResult> GetASXData()
        {
            ChartItem[] items = await Task.Run(() => {
                return new ChartItem[] {
                    new ChartItem() { Name = "AGL", Data = new int[] { 1000, 1120, 1080, 900, 1000, 1180, 1050, 960, 980, 1050, 1090, 1060 } },
                    new ChartItem() { Name = "HXL", Data = new int[] { 700, 805, 830, 820, 1090, 1020, 1018, 1000, 1015, 995, 990, 1002 } },
                    new ChartItem() { Name = "UGG", Data = new int[] { 500, 572, 550, 500, 570, 600, 690, 905, 850, 810, 774, 840 } },
                    new ChartItem() { Name = "EBO", Data = new int[] { 1030, 1005, 980, 800, 1090, 1020, 990, 965, 1015, 950, 890, 1102 } },
                    new ChartItem() { Name = "KSC", Data = new int[] { 970, 1022, 1000, 980, 1094, 1020, 1108, 1099, 1015, 995, 990, 1002 } },
                    new ChartItem() { Name = "KGL", Data = new int[] { 300, 322, 450, 560, 360, 480, 605, 630, 850, 762, 700, 930} },
                    new ChartItem() { Name = "SAN", Data = new int[] { 690, 720, 790, 720, 908, 820, 700, 745, 730, 895, 990, 1002 } },
                    new ChartItem() { Name = "TLG", Data = new int[] { 250, 190, 200, 210, 360, 230, 450, 567, 800, 740, 680, 580 } },
                    new ChartItem() { Name = "ZEU", Data = new int[] { 390, 302, 330, 360, 100, 120, 138, 110, 154, 120, 270, 210 } },
                    new ChartItem() { Name = "DTL", Data = new int[] { 880, 850, 767, 1100, 1090, 920, 1010, 980, 1000, 835, 786, 840 } }
                };
            });
            return Ok(items);
        }

        [Authorize(Roles = "Manager,User", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("pm/data")]
        public async Task<ActionResult> GetPMData()
        {
            ChartItem[] items = await Task.Run(() => {
                return new ChartItem[] {
                    new ChartItem() { Name = "Gold", Data = new int[] { 1830, 1799, 1800, 1750, 1780, 1790, 1805, 1810, 1885, 1860, 1855, 1875} },
                    new ChartItem() { Name = "Silver", Data = new int[] { 16, 17, 17, 17, 19, 18, 18, 17, 16, 16, 17, 17 } },
                    new ChartItem() { Name = "Palladium", Data = new int[] { 150, 160, 158, 154, 150, 148, 154, 156, 160, 163, 160, 170} },
                    new ChartItem() { Name = "Platinum", Data = new int[] { 148, 150, 152, 145, 140, 142, 139, 146, 140, 135, 130, 135} },
                };
            });
            return Ok(items);
        }

        [Authorize(Roles = "Manager,User", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("crypto/data")]
        public async Task<ActionResult> GetCryptoData()
        {
            ChartItem2[] items = await Task.Run(() => {
                return new ChartItem2[] {
                    new ChartItem2() { Name = "Bitcoin", Data = new decimal[] { 11695.52M, 11668.20M, 11680.32M, 11690.10M, 11700.45M, 11725.10M, 11665.46M, 11680.73M, 11695.63M, 11720.43M, 11725.10M, 11721.18M } },
                    new ChartItem2() { Name = "Etherum", Data = new decimal[] { 249.65M, 248.02M, 244.35M, 241.15M, 240.11M, 236.52M, 226.77M, 239.89M, 241.09M, 240.88M, 241.73M, 232.54M } },
                    new ChartItem2() { Name = "XRP", Data = new decimal[] { 0.42M, 0.40M, 0.41M, 0.40M, 0.37M, 0.36M, 0.35M, 0.38M, 0.38M, 0.41M, 0.40M, 0.37M } },
                    new ChartItem2() { Name = "Litecoin", Data = new decimal[] { 77.86M, 77.05M, 76.96M, 76.56M, 77.25M, 77.10M, 76.15M, 75.20M, 75.63M, 76.19M, 77.25M, 78.16M } },
                    new ChartItem2() { Name = "Dash", Data = new decimal[] { 98.20M, 97.10M, 96.80M, 96.75M, 94.50M, 95.10M, 96.18M, 95.54M, 95.42M, 94.60M, 93.33M, 92.85M } },
                    new ChartItem2() { Name = "ZCash", Data = new decimal[] { 52.25M, 52.05M, 51.16M, 51.60M, 51.26M, 50.60M, 50.20M, 49.30M, 49.04M, 50.54M, 52.13M, 51.53M } },
                };
            });
            return Ok(items);
        }
    }
}
