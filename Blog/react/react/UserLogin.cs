using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react
{
    [Serializable]
    public class UserLogin
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("Password")]
        public string Password { get; set; }
        
        [JsonProperty("Role")]
        public string Role { get; set; }

        public UserLogin() { }

        public UserLogin(string username, string password, string role)
        {
            Username = username;
            Password = password;
            Role = role;
        }

        public UserLogin(int id, string username, string password, string role)
        {
            Id = id;
            Username = username;
            Password = password;
            Role = role;
        }
    }
}
