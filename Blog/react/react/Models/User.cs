using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Blog.Models
{
    [Serializable]
    public partial class User
    {
        public User()
        {
            Blog = new HashSet<Blog>();
            Comment = new HashSet<Comment>();
        }

        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("Password")]
        public string Password { get; set; }

        [JsonProperty("Role")]
        public string Role { get; set; }

        public virtual ICollection<Blog> Blog { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
    }
}
