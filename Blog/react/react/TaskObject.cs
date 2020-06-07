using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react
{
    [Serializable]
    public class TaskObject
    {
        [JsonProperty("Information")]
        public string Information { get; set;}

        [JsonProperty("Time")]
        public DateTime Time
        {
            get; set;
        }

        [JsonProperty("Сomplete")]
        public bool Сomplete
        {
            get; set;
        }

        [JsonProperty("Filter")]
        public bool Filter
        {
            get; set;
        }

        [JsonProperty("Path")]
        public string Path
        {
            get; set;
        }

        public TaskObject() { }

        public TaskObject(string information, DateTime time, bool complete, bool filter, string path)
        {
            Information = information;
            Time = time;
            Сomplete = complete;
            Filter = filter;
            Path = path;
        }
    }
}
