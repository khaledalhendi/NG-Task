using Microsoft.EntityFrameworkCore;
using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(NGContext context) : base(context)
        {
        }

        public Customer GetCustomerDetail(int customerId)
        {
            return ((NGContext)Context).Customers.Include(c => c.Accounts).ThenInclude(a => a.Currency).Where(c => c.Id == customerId).SingleOrDefault(); 
        }
    }
}
