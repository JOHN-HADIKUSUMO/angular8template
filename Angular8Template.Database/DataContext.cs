using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Angular8Template.Models;


namespace Angular8Template.Database
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration configuration;
        public DbSet<Gallery> Galleries { get; set; }
        public DataContext(IConfiguration config, DbContextOptions options) : base(options)
        {
            configuration = config ?? throw new System.ArgumentNullException(nameof(config));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}