using Microsoft.EntityFrameworkCore;
using ng_api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ng_api.Entities
{
    public class NGContext : DbContext
    {
        public DbSet<Customer> Customers { set; get; }
        public DbSet<Account> Accounts { set; get; }
        public DbSet<ClassCode> ClassCodes { set; get; }
        public DbSet<AccountType> AccountTypes { set; get; }

        public NGContext(DbContextOptions<NGContext> options) : base (options)
        {
            Database.Migrate(); 
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
