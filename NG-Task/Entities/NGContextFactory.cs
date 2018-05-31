using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Entities
{
    public class NGContextFactory : IDesignTimeDbContextFactory<NGContext>
    {
        public NGContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<NGContext>();
            string connectionString = "Server=(localdb)\\mssqllocaldb;Database=NGApp;Trusted_Connection=True;";

            optionsBuilder.UseSqlServer(connectionString); 

            return new NGContext(optionsBuilder.Options);
        }
    }
}
