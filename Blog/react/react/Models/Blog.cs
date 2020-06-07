using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Blog.Models
{
    [Serializable]
    public partial class Blog
    {
        public Blog()
        {
            Comment = new HashSet<Comment>();
        }

        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Topic")]
        public string Topic { get; set; }

        [JsonProperty("Title")]
        public string Title { get; set; }

        [JsonProperty("Headline")]
        public string Headline { get; set; }

        [JsonProperty("Text")]
        public string Text { get; set; }

        [JsonProperty("Date")]
        public DateTime Date { get; set; }

        [JsonProperty("UserId")]
        public int UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
    }
}
