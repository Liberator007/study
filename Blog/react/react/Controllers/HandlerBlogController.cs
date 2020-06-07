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

namespace Blog.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class HandlerBlogController : Controller
    {
        private readonly ILogger<LoginController> _logger;
        private blogContext _context;

        public HandlerBlogController(ILogger<LoginController> logger, blogContext context)
        {
            _logger = logger;
            _context = context;
        }

        // Отправка всех блогов
        [Route("showListBlog")]
        [HttpGet]
        public IEnumerable<Models.Blog> ShowListBlog()
        {                
            List<Models.Blog> listBlog = new List<Models.Blog>();
            listBlog = _context.Blog.ToList();
            /*            foreach (Models.Blog blog in listBlog)
                        {
                            blog.User = null;
                        }*/
            return listBlog;
        }

        // Вывод информации о блогах в профиле авторизированного пользователя
        [Route("showProfile")]
        [HttpGet]
        public IEnumerable<Models.Blog> ShowProfile([FromQuery]string id)
        {
            //string nameUser = User.Identity.Name;
            string nameUser = id;
            List<Models.Blog> listBlogProfile = new List<Models.Blog>();
            if (nameUser != null)
            {
                List<User> userList = new List<User>();
                userList = _context.User.ToList();
                List<Models.Blog> listBlog = new List<Models.Blog>();
                listBlog = _context.Blog.ToList();
                
                    
                foreach (User user in userList)
                {
                    if (user.Username == nameUser)
                    {
                        foreach (Models.Blog blog in listBlog)
                        {
                            if (blog.User == user)
                            {
                                blog.User = null;
                                listBlogProfile.Add(blog);
                            }
                        }
                    }
                }
                return listBlogProfile;
            }
            else
            {
                return listBlogProfile;
            }
        }

        //________Функции_для_авторизированных_пользователей_________________________________________________________________________________________________________________

        // Открытие профиля
        [Authorize(Roles = "user")]
        [Route("openProfile")]
        [AllowAnonymous]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Models.Blog> AddBlog()
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                if (nameUser != null)
                {
                    return Ok();
                }
                else
                {
                    return StatusCode(401);
                }
            }
            return BadRequest();
        }

        // Добавление Блога
        [Authorize(Roles = "user")]
        [Route("addBlog")]
        [AllowAnonymous]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Models.Blog> AddBlog([FromBody]Models.Blog blog)
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                if (nameUser != null)
                {
                    List<User> userList = new List<User>();
                    userList = _context.User.ToList();

                    foreach (User user in userList)
                    {
                        if (user.Username == nameUser)
                        {
                            blog.User = user;
                            blog.UserId = user.Id;
                            _context.Blog.Add(blog);
                            _context.SaveChanges();
                        }
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
    }
}
