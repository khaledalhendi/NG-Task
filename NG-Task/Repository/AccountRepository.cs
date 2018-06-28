using Microsoft.EntityFrameworkCore;
using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        public AccountRepository(NGContext context) : base(context)
        {
        }

        public IEnumerable<Account> GetPagedAccounts(int customerId, int pageIndex = 1, int pageSize = 5)
        {
            var NGContext = ((NGContext)Context);

            var customer = NGContext.Customers.Include(c => c.Accounts).ThenInclude(a => a.Currency).Where(c => c.Id == customerId).SingleOrDefault(); 

            int lastPage = (int)MathF.Ceiling((float)customer.Accounts.Count / pageSize);
            if (pageIndex > lastPage)
            {
                pageIndex = lastPage;
            }
            else if(pageIndex < 1)
            {
                pageIndex = 1; 
            }

            return customer.Accounts.Skip((pageIndex-1) * pageSize).Take(pageSize);
        }
    }
}
