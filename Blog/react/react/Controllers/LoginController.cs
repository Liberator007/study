using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mime;
using System.Security.Claims;
using System.Threading.Tasks;
using Blog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using react;
using react.Controllers;

namespace Blog.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly ILogger<LoginController> _logger;

        private blogContext _context;
        public LoginController(ILogger<LoginController> logger, blogContext context)
        {
            _logger = logger;
            _context = context;
        }

        [Route("login")]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TokenObject> Registry([FromBody]User user)
        {
            if (ModelState.IsValid)
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

            return BadRequest();
        }

        [NonAction]
        private ClaimsIdentity GetIdentity(string username, string password)
        {

            List<User> userList = new List<User>();
            userList = _context.User.ToList();

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
