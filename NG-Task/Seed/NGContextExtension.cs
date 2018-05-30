using ng_api.Entities;
using ng_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ng_api.Seed
{
    public static class NGContextExtension
    {
        public static void EnsureSeedDatabase(this NGContext context)
        {
            if (context.Customers.Any() == false)
                SeedCustomers(context);

            if (context.Accounts.Any() == false)
                SeedAcconuts(context);

        }

        private static void SeedAcconuts(NGContext context)
        {
            IEnumerable<Account> Accounts = CreateAccounts(context.Customers.ToList());

            context.Accounts.AddRange(Accounts);
            context.SaveChanges();
        }

        private static IEnumerable<Account> CreateAccounts(IEnumerable<Customer> customers)
        {
            string[] types = { "CK", "SV", "CD" };
            string[] classCodes = { "33", "44", "301" };

            const int seed = 42;  
            Random r = new Random(seed); //reusable

            List<Account> accounts = new List<Account>();
            foreach (var c in customers)
            {
                for (int i = 0; i < 1 + r.Next(5); i++)
                {
                    accounts.Add(new Account() {
                        CustomerId = c.Id,
                        Balance = (decimal)(100 * r.NextDouble() * r.Next(5)),
                        Type = types[r.Next(3)],
                        ClassCodeValue = classCodes[r.Next(3)],
                        Customer = c,
                    });
            }
            }
            return accounts; 

        }

        private static void SeedCustomers(NGContext context)
        {
            IEnumerable<Customer> Customers = CreateCustomers();

            context.Customers.AddRange(Customers);
            context.SaveChanges();
        }

        private static IEnumerable<Customer> CreateCustomers()
        {
            return new List<Customer>()
            {
                new Customer(){
                Name = "Abdullah",
                OpenDate = new DateTime(1990,7,5)
                },
            new Customer(){
                Name = "Ahmad",
                OpenDate = new DateTime(2000,8,10)
                },
            new Customer(){
                Name = "Sherif",
                OpenDate = new DateTime(2090,5,9)
                },
            new Customer(){
                Name = "Yusri",
                OpenDate = new DateTime(2015,1,6)
                }
            };
        }
    }
}
