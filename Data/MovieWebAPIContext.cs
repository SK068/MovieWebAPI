using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieWebAPI.Models;

namespace MovieWebAPI.Data
{
    public class MovieWebAPIContext : DbContext
    {
        public MovieWebAPIContext (DbContextOptions<MovieWebAPIContext> options)
            : base(options)
        {
        }

        public DbSet<MovieWebAPI.Models.Movies> Movies { get; set; }
    }
}
