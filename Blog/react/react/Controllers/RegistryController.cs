using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Blog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using react;

namespace Blog.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class RegistryController : Controller
    {
        private readonly ILogger<RegistryController> _logger;

        private blogContext _context;
        public RegistryController(ILogger<RegistryController> logger, blogContext context)
        {
            _logger = logger;
            _context = context;
        }

        [Route("registration")]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<User> Registry([FromBody]User user)
        {
            if (ModelState.IsValid)
            {

                user.Role = "user";

                List<User> listUser = _context.User.ToList();
                foreach (User userOne in listUser)
                {
                    if (userOne.Username == user.Username)
                    {
                        return StatusCode(401);
                    }
                }


                _context.User.Add(user);
                _context.SaveChanges();

                return Ok();
            }

            return BadRequest();
        }
    }
}
