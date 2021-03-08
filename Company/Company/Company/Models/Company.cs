using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Models
{
    [Serializable]
    public partial class Company
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("Size")]
        public int Size { get; set; }

        [JsonProperty("FormIncorporation")]
        public string FormIncorporation { get; set; }

    }
}
