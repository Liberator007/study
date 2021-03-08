using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Models
{
    [Serializable]
    public partial class Employee
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Surname")]
        public string Surname { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("MiddleName")]
        public string MiddleName { get; set; }

        [JsonProperty("EmploymentDate")]
        public string EmploymentDate { get; set; }

        [JsonProperty("Position")]
        public string Position { get; set; }

        [JsonProperty("CompanyId")]
        public int CompanyId { get; set; }
    }
}
