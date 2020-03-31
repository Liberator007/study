using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Serenity.Services;

namespace react.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        public const int DATA_SIZE = 30;
        private readonly ILogger<ValuesController> _logger;

        public ValuesController(ILogger<ValuesController> logger)
        {
            _logger = logger;
        }

        [Route("fetch-data")]
        [HttpGet]
        public IEnumerable<TaskObject> Get()
        {
            List<TaskObject> taskList = new List<TaskObject>();
            XmlSerializer formatter = new XmlSerializer(typeof(List<TaskObject>));
            using (FileStream fstream = new FileStream("TaskObject.xml", FileMode.OpenOrCreate))
            {
                taskList = (List<TaskObject>)formatter.Deserialize(fstream);
                fstream.Close();
            }
            return taskList;
            
        }

        [Authorize(Roles = "user")]
        [Route("fetch-data")]
        [AllowAnonymous]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TaskObject> Post([FromBody]TaskObject taskObject)
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                if (nameUser != null)
                {
                    taskObject.Сomplete = false;
                    taskObject.Filter = false;

                    List<TaskObject> taskList = new List<TaskObject>();
                    XmlSerializer formatter = new XmlSerializer(typeof(List<TaskObject>));
                    using (FileStream fstream = new FileStream("TaskObject.xml", FileMode.OpenOrCreate))
                    {
                        taskList = (List<TaskObject>)formatter.Deserialize(fstream);
                        fstream.Close();
                    }

                    taskList.Add(taskObject);

                    using (FileStream fstream = new FileStream("TaskObject.xml", FileMode.Create))
                    {
                        formatter.Serialize(fstream, taskList);
                        fstream.Close();
                    }

                    return Ok();
                } 
                else
                {
                    return StatusCode(401);
                }
            }

            return BadRequest();
        }

        [Route("fetch-data/filter-task")]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<TaskObject>> FilterTask([FromBody]List<TaskObject> taskList)
        {
            if (ModelState.IsValid)
            {

                XmlSerializer formatter = new XmlSerializer(typeof(List<TaskObject>));
                using (FileStream fstream = new FileStream("TaskObject.xml", FileMode.Create))
                {
                    formatter.Serialize(fstream, taskList);
                    fstream.Close();
                }

                return Ok();
            }

            return BadRequest();
        }

        [Route("fetch-data/none-filter-task")]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<TaskObject>> NoneFilterTask([FromBody]List<TaskObject> taskList)
        {
            if (ModelState.IsValid)
            {

                XmlSerializer formatter = new XmlSerializer(typeof(List<TaskObject>));
                using (FileStream fstream = new FileStream("TaskObject.xml", FileMode.Create))
                {
                    formatter.Serialize(fstream, taskList);
                    fstream.Close();
                }

                return Ok();
            }

            return BadRequest();
        }

        [Authorize(Roles = "user")]
        [Route("fetch-data/delete-task")]
        [AllowAnonymous]
        [HttpDelete]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<TaskObject>> Delete([FromBody]string info)
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                if (nameUser != null)
                {
                    List<TaskObject> taskList = new List<TaskObject>();

                    XmlSerializer formatter = new XmlSerializer(typeof(List<TaskObject>));
                    using (FileStream fstream = new FileStream("TaskObject.xml", FileMode.OpenOrCreate))
                    {
                        taskList = (List<TaskObject>)formatter.Deserialize(fstream);
                        fstream.Close();
                    }

                    foreach (TaskObject taskObject in taskList.ToList())
                    {
                        if (taskObject.Information == info)
                        {
                            taskList.Remove(taskObject);
                        }
                    }

                    using (FileStream fstream = new FileStream("TaskObject.xml", FileMode.Create))
                    {
                        formatter.Serialize(fstream, taskList);
                        fstream.Close();
                    }

                    return Ok();
                }
                else
                {
                    return StatusCode(401);
                }

            }

            return BadRequest();
        }

        [Route("fetch-data/registry")]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<User> Registry([FromBody]User user)
        {
            if (ModelState.IsValid)
            {

                List<User> userList = new List<User>();
                XmlSerializer formatter = new XmlSerializer(typeof(List<User>));
                using (FileStream fstream = new FileStream("User.xml", FileMode.OpenOrCreate))
                {
                    userList = (List<User>)formatter.Deserialize(fstream);
                    fstream.Close();
                }

                //string token = user.Password;
                //byte[] data = Encoding.Unicode.GetBytes(token);
                //SHA256 shaM = new SHA256Managed();
                //byte[] result = shaM.ComputeHash(data);
                //token = Encoding.Unicode.GetString(result);

                user.Role = "user";
       
                userList.Add(user);
               
                using (FileStream fstream = new FileStream("User.xml", FileMode.Create))
                {
                    formatter.Serialize(fstream, userList);
                    fstream.Close();
                }

                return Ok();
            }

            return BadRequest();
        }

        [Route("fetch-data/login")]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TokenObject> Token([FromBody]User user)
        {
            string username = user.Username;
            string password = user.Password;

            var identity = GetIdentity(username, password);
            if (identity == null)
            {
                //return BadRequest(new { errorText = "401" });

                return StatusCode(401);
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            TokenObject tokenObject = new TokenObject();
            tokenObject.Token = response.access_token;
            tokenObject.Login = response.username;

            return tokenObject;
        }

        [NonAction]
        private ClaimsIdentity GetIdentity(string username, string password)
        {
            List<User> userList = new List<User>();
            XmlSerializer formatter = new XmlSerializer(typeof(List<User>));
            using (FileStream fstream = new FileStream("User.xml", FileMode.OpenOrCreate))
            {
                userList = (List<User>)formatter.Deserialize(fstream);
                fstream.Close();
            }

            User user = userList.FirstOrDefault(x => x.Username == username && x.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Username),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

    }
}
