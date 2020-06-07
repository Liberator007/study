using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Blog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Blog.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class BlogController : Controller
    {
        private readonly ILogger<LoginController> _logger;
        private blogContext _context;

        public BlogController(ILogger<LoginController> logger, blogContext context)
        {
            _logger = logger;
            _context = context;
        }

        // Отображение одного Блога
        [Route("getBlog")]
        [HttpGet]
        public Models.Blog GetBlog([FromQuery]int id)
        {
            List<Models.Blog> listBlog = new List<Models.Blog>();
            listBlog = _context.Blog.ToList();
            Models.Blog blog = new Models.Blog();
            foreach (Models.Blog oneBlog in listBlog)
            {
                if (oneBlog.Id == id)
                {
                    blog = oneBlog;
                }
            }
            return blog;
        }

        // Отображение комментариев к блогу
        [Route("getComment")]
        [HttpGet]
        public IEnumerable<Comment> GetComment([FromQuery]int id)
        {
            List<Comment> listComment = new List<Comment>();
            listComment = _context.Comment.ToList();

            List<Comment> listCommentShow = new List<Comment>();

            List<Models.Blog> listBlog = new List<Models.Blog>();
            listBlog = _context.Blog.ToList();

            //listCommentShow = blog.Comment.ToList();

            foreach (Comment comment in listComment)
            {
                if (comment.BlogId == id)
                {
                    comment.User = null;
                    comment.Blog = null;
                    listCommentShow.Add(comment);
                }
            }

            return listCommentShow;
        }

        // Отображение комментариев к блогу
        [Route("getUserList")]
        [HttpGet]
        public IEnumerable<User> GetUserList()
        {
            List<User> listUser = new List<User>();
            listUser = _context.User.ToList();

            return listUser;
        }

        // Отображение блогов на определенную тему
        [Route("getBlogList")]
        [HttpGet]
        public IEnumerable<Models.Blog> GetBlogList([FromQuery]string id)
        {
            List<Models.Blog> listBlog = new List<Models.Blog>();
            List<Models.Blog> listBlogShow = new List<Models.Blog>();
            listBlog = _context.Blog.ToList();
            listBlogShow = _context.Blog.ToList();
            foreach (Models.Blog blog in listBlog)
            {
                if (blog.Topic != id)
                {
                    listBlogShow.Remove(blog);
                }
            }
            return listBlogShow;
        }

        // Добавление Комментария
        [Authorize(Roles = "user")]
        [AllowAnonymous]
        [Route("addComment")]
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Comment> AddComment([FromBody]Comment comment, [FromQuery]int id)
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                int idBlog = id;
                if (nameUser != null)
                {
                    List<User> userList = new List<User>();
                    userList = _context.User.ToList();

                    foreach (User user in userList)
                    {
                        if (user.Username == nameUser)
                        {
                            comment.UserId = user.Id;
                            comment.BlogId = idBlog;
                            _context.Comment.Add(comment);
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

        // Редактирование комментария
        [Authorize(Roles = "user")]
        [AllowAnonymous]
        [Route("editComment")]
        [HttpPut]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Comment> EditComment([FromBody]Comment comment)
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                if (nameUser != null)
                {
                    Comment commentDB = _context.Comment.Where(c => c.Id == comment.Id).FirstOrDefault();

                    commentDB.Text = comment.Text;
                    commentDB.Rating = comment.Rating;

                    _context.Comment.Update(commentDB);
                    _context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return StatusCode(401);
                }
            }
            return BadRequest();
        }

        // Редактирование Блога
        [Authorize(Roles = "user")]
        [Route("editBlog")]
        [AllowAnonymous]
        [HttpPut]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Models.Blog> EditBlog([FromBody]Models.Blog blog, [FromQuery]int id)
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                if (nameUser != null)
                {
                    Models.Blog blogDB = _context.Blog.Where(b => b.Id == id).FirstOrDefault();

                    blogDB.Topic = blog.Topic;
                    blogDB.Title = blog.Title;
                    blogDB.Headline = blog.Headline;
                    blogDB.Text = blog.Text;

                    _context.Blog.Update(blogDB);
                    _context.SaveChanges();

                    return Ok();
                }
                else
                {
                    return StatusCode(401);
                }
            }
            return BadRequest();
        }

        // Удаление Блога
        [Authorize(Roles = "user")]
        [Route("deleteBlog")]
        [AllowAnonymous]
        [HttpDelete]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Models.Blog> DeleteBlog([FromQuery]int id)
        {
            if (ModelState.IsValid)
            {
                string nameUser = User.Identity.Name;
                if (nameUser != null)
                {

                    List<Comment> comments = _context.Comment.Where(c => c.BlogId == id).ToList();

                    // Удаление комментариев к блогу
                    foreach (Comment comment in comments)
                    {
                        _context.Comment.Remove(comment);
                    }

                    // Удаление самого блога
                    Models.Blog blogDB = _context.Blog.Where(b => b.Id == id).FirstOrDefault();
                    _context.Blog.Remove(blogDB);
                    _context.SaveChanges();

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
