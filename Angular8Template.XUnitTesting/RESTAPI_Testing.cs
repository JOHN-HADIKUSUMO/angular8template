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
    public class RESTAPI_Testing
    {
        private readonly HttpClient _client;
        public RESTAPI_Testing()
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

            var serializedLogin = JsonConvert.SerializeObject(login);
            var jsonContent = new StringContent(serializedLogin, UnicodeEncoding.UTF8, "application/json");
            var result = await _client.PostAsync("/api/account/login", jsonContent);
            string stringFeedback = await result.Content.ReadAsStringAsync();
            LoginSuccess deserializedFeedback = JsonConvert.DeserializeObject<LoginSuccess>(stringFeedback);
            Assert.True(result.StatusCode == HttpStatusCode.OK);
        }
    }
}
