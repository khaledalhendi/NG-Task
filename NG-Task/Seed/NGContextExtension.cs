using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NG_Task.Seed
{
    public static class NGContextExtension
    {
        public static void EnsureSeedDatabase(this NGContext context)
        {
            if (context.Currencies.Any() == false)
                SeedCurrencies(context);

            if (context.Customers.Any() == false)
                SeedCustomers(context);

            if (context.Accounts.Any() == false)
                SeedAcconuts(context);
        }
      
        #region Customer
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

        #endregion
        #region Accounts
        private static void SeedAcconuts(NGContext context)
        {
            IEnumerable<Account> Accounts = CreateAccounts(context, context.Customers.ToList());

            context.Accounts.AddRange(Accounts);
            context.SaveChanges();
        }

        private static IEnumerable<Account> CreateAccounts(NGContext context, IEnumerable<Customer> customers)
        {
            string[] types = { "CK", "SV", "CD" };
            string[] classCodes = { "33", "44", "301" };

            Currency[] currencies = context.Currencies.ToArray(); 

            const int seed = 42;
            Random r = new Random(seed); //reusable

            List<Account> accounts = new List<Account>();
            foreach (var c in customers)
            {
                for (int i = 0; i < 1 + r.Next(5); i++)
                {
                    accounts.Add(new Account()
                    {
                        CustomerId = c.Id,
                        Balance = (decimal)((2000 * r.Next(1,5)) + (1000 * r.NextDouble()) ),
                        CurrencyISO = currencies[r.Next(currencies.Length)].ISO,
                        //Type = types[r.Next(3)],
                        //ClassCodeValue = classCodes[r.Next(3)],
                    });
                }
            }
            return accounts;

        }
        #endregion
        #region Currency
        private static void SeedCurrencies(NGContext context)
        {
            IEnumerable<Currency> Currencys = CreateCurrencies();

            context.Currencies.AddRange(Currencys);
            context.SaveChanges();
        }

        private static IEnumerable<Currency> CreateCurrencies()
        {
            return new Currency[]
            {
                new Currency{
                    Name= "Egyption Pund",
                    ISO= "EGP", 
                    Multiplier = 1
                },
                new Currency{
                    Name= "Kuwaiti Dinar",
                    ISO= "KWD",
                    Multiplier = 0.017m
                },
                new Currency{
                    Name= "United States Dollar",
                    ISO= "USD",
                    Multiplier = 0.056m
                },
                new Currency{
                    Name= "Saudi Riyal",
                    ISO= "SAR",
                    Multiplier = 0.21m
                },
                new Currency{
                    Name= "Euro",
                    ISO= "EUR",
                    Multiplier = 0.048m
                },
            };

        }
        #endregion
    }
}
