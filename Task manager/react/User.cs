using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react
{
    [Serializable]
    public class User
    {
        [JsonProperty("Username")]
        public string Username { get; set;}

        [JsonProperty("Password")]
        public string Password
        {
            get; set;
        }
        
        [JsonProperty("Role")]
        public string Role
        {
            get; set;
        }

        public User() { }

        public User(string username, string password, string role)
        {
            Username = username;
            Password = password;
            Role = role;
        }
    }
}
