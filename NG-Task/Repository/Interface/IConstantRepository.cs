using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public interface IConstantRepository
    {
        IEnumerable<AccountType> GetAccountTypes(); 

        IEnumerable<ClassCode> GetClassCodes(string accountType);

        IEnumerable<Currency> GetCurrencies();

        Currency GetLocalCurrency(); 
    }
}
