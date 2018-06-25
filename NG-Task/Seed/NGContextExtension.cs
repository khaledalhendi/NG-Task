using Microsoft.EntityFrameworkCore;
using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NG_Task.Seed
{
    public static class NGContextExtension
    {
        public static void RestSeed(this NGContext context)
        {
            //delete tables
            context.AccountTypes.RemoveRange(context.AccountTypes); 
            context.ClassCodes.RemoveRange(context.ClassCodes); 
            context.Currencies.RemoveRange(context.Currencies);
            context.Customers.RemoveRange(context.Customers); 
            context.Accounts.RemoveRange(context.Accounts);

            context.SaveChanges();
            
            //seed lookup tables
            SeedAccountTypes(context);
            context.SaveChanges();
            SeedClassCodes(context);
            SeedCurrencies(context);

            context.SaveChanges();

            //seed customers tables
            SeedCustomers(context);
            context.SaveChanges();
            
            //seed accounts tables (depends on customer
            SeedAcconuts(context);
            context.SaveChanges();
        }
      
        #region AccountType
        private static void SeedAccountTypes(NGContext context)
        {
            IEnumerable<AccountType> AccountTypes = CreateAccountTypes();

            context.AccountTypes.AddRange(AccountTypes);
        }

        private static IEnumerable<AccountType> CreateAccountTypes()
        {
            return new List<AccountType>()
            {
                new AccountType{Type = "CK" },
                new AccountType{Type = "SV" },
                new AccountType{Type = "CD" },
            };
        }
        #endregion
        #region ClassCodes
        private static void SeedClassCodes(NGContext context)
        {
            IEnumerable<ClassCode> ClassCodes = CreateClassCodes(context.AccountTypes.ToList());

            context.ClassCodes.AddRange(ClassCodes);
            
        }

        private static IEnumerable<ClassCode> CreateClassCodes(IEnumerable<AccountType> accountTypes)
        {
            const int seed = 42;
            Random r = new Random(seed); //reusable

            List<int> RandomCodes = Enumerable.Range(0, 100).ToList();

            Func<List<int>, int, int> ReadAndRemove = (list, i) => { int value = list[i]; list.Remove(i); return value; }; 

            List<ClassCode> classes = new List<ClassCode>();
            foreach (var at in accountTypes)
            {
                for (int i = 0; i < 2 + r.Next(3); i++)
                {
                    classes.Add(new ClassCode()
                    {
                        Code = ""+ReadAndRemove(RandomCodes, r.Next(RandomCodes.Count)),
                        AccountType = at.Type,
                    });
                }
            }
            return classes;
        }
        #endregion
        #region Customer
        private static void SeedCustomers(NGContext context)
        {
            IEnumerable<Customer> Customers = CreateCustomers();

            context.Customers.AddRange(Customers);
            
        }

        private static IEnumerable<Customer> CreateCustomers()
        {
            return new List<Customer>()
            {
                new Customer(){
                Name = "Abdullah",
                OpenDate = new DateTime(1990,7,5),
                Branch = "Banking"
                },
            new Customer(){
                Name = "Ahmad",
                OpenDate = new DateTime(2000,8,10),
                Branch = "Medical"
                },
            new Customer(){
                Name = "Sherif",
                OpenDate = new DateTime(2090,5,9),
                Branch = "Business"
                },
            new Customer(){
                Name = "Yusri",
                OpenDate = new DateTime(2015,1,6),
                Branch = "Banking"
                }
            };
        }

        #endregion
        #region Accounts
        private static void SeedAcconuts(NGContext context)
        {
            IEnumerable<Account> Accounts = CreateAccounts(context, context.Customers.ToList());

            context.Accounts.AddRange(Accounts);
            
        }

        private static IEnumerable<Account> CreateAccounts(NGContext context, IEnumerable<Customer> customers)
        {
            AccountType[] types = context.AccountTypes.Include(a => a.ClassCodes).ToArray();

            Currency[] currencies = context.Currencies.ToArray(); 

            const int seed = 42;
            Random r = new Random(seed); //reusable

            List<Account> accounts = new List<Account>();
            foreach (var c in customers)
            {
                for (int i = 0; i < 1 + r.Next(5); i++)
                {
                    AccountType accountType = types[r.Next(3)];
                    ClassCode[] classCodes = accountType.ClassCodes.ToArray(); 

                    accounts.Add(new Account()
                    {
                        CustomerId = c.Id,
                        Balance = (decimal)((2000 * r.Next(1,5)) + (1000 * r.NextDouble()) ),
                        CurrencyISO = currencies[r.Next(currencies.Length)].ISO,
                        AccountType = accountType.Type,
                        ClassCode = classCodes[r.Next(classCodes.Length)].Code,
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
        }

        private static IEnumerable<Currency> CreateCurrencies()
        {
            return new Currency[]
            {
                new Currency{
                    Name = "Egyption Pund",
                    ISO = "EGP", 
                    Multiplier = 1,
                    Culture = "ar-EG"
                },
                new Currency{
                    Name = "Kuwaiti Dinar",
                    ISO = "KWD",
                    Multiplier = 0.017m,
                    Culture = "ar-KW"
                },
                new Currency{
                    Name = "United States Dollar",
                    ISO = "USD",
                    Multiplier = 0.056m,
                    Culture = "en-US"
                },
                new Currency{
                    Name = "Saudi Riyal",
                    ISO = "SAR",
                    Multiplier = 0.21m,
                    Culture = "ar-SA"
                },
                new Currency{
                    Name = "Euro",
                    ISO = "EUR",
                    Multiplier = 0.048m,
                    Culture = "en-GB"
                },
            };

        }
        #endregion
    }
}
