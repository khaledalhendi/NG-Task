using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NG_Task.Entities;

namespace NG_Task.Repository
{
    public class ConstantRepository : IConstantRepository
    {
        private readonly NGContext Context; 

        public ConstantRepository(NGContext context)
        {
            Context = context; 
        }

        public IEnumerable<AccountType> GetAccountTypes()
        {
           return Context.AccountTypes.ToArray(); 
        }

        public IEnumerable<ClassCode> GetClassCodes(string accountType)
        {
            return Context.ClassCodes.Where(c => c.AccountType.ToLower() == accountType.ToLower()).ToArray();
        }

        public IEnumerable<Currency> GetCurrencies()
        {
            return Context.Currencies.ToArray();
        }

        public Currency GetLocalCurrency()
        {
            return Context.Currencies.Where(c => MathF.Abs((float)(c.Multiplier - 1m)) < 0.0001f).SingleOrDefault();
        }
    }
}
