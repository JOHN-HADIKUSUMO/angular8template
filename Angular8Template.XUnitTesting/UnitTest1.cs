using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Net;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using Angular8Template.Models;
     

using Xunit;
using Newtonsoft.Json;

namespace Angular8Template.XUnitTesting
{
    public class UnitTest1
    {
        private readonly HttpClient _client;
        public UnitTest1()
        {
            var appFactory = new WebApplicationFactory<Startup>();
            _client = appFactory.CreateClient();
            var test = _client.BaseAddress;
        }

        [Fact]
        public async Task Login()
        {
            Login login = new Login();
            login.Email = "john.hadikusumo@gmail.com";
            login.Password = "Gunawan70**";

            var myContent = JsonConvert.SerializeObject(login);
            var stringContent = new StringContent(myContent, UnicodeEncoding.UTF8, "application/json");
            var result = await _client.PostAsync("/api/account/login", stringContent);
            string output = await result.Content.ReadAsStringAsync();
            Assert.True(result.StatusCode == HttpStatusCode.OK);
        }
    }
}
