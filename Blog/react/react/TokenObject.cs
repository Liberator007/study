using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react
{
    [Serializable]
    public class TokenObject
    {
        [JsonProperty("Token")]
        public string Token { get; set; }

        [JsonProperty("Login")]
        public string Login { get; set; }

        public TokenObject() { }
    }
}
