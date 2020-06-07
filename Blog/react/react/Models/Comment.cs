using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Blog.Models
{
    [Serializable]
    public partial class Comment
    {

        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Text")]
        public string Text { get; set; }

        [JsonProperty("Date")]
        public DateTime Date { get; set; }

        [JsonProperty("Rating")]
        public int Rating { get; set; }

        [JsonProperty("BlogId")]
        public int BlogId { get; set; }

        [JsonProperty("UserId")]
        public int UserId { get; set; }

        public virtual Blog Blog { get; set; }
        public virtual User User { get; set; }
    }
}
