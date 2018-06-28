using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public interface IAccountRepository : IRepository<Account>
    {
        IEnumerable<Account> GetPagedAccounts(int customerId, int pageIndex, int pageSize); 
    }
}
