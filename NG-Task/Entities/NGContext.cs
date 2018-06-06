using Microsoft.EntityFrameworkCore;

namespace NG_Task.Entities
{
    public class NGContext : DbContext
    {
        public DbSet<Customer> Customers { set; get; }
        public DbSet<Account> Accounts { set; get; }
        public DbSet<Currency> Currencies { set; get; }
        public DbSet<AccountType> AccountTypes { set; get; }
        public DbSet<ClassCode> ClassCodes { set; get; }

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
