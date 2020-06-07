using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using react;

namespace Blog.Controllers 
{ 
    public class ApplicationContext : DbContext
    {
        public DbSet<UserLogin> Users { get; set; }

        public ApplicationContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Server=localhost;User=root;Password=;Port=3306;Database=blog;");
        }
    }
}
