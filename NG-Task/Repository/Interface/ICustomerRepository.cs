using NG_Task.Entities;
using NG_Task.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Customer GetCustomerDetail(int customerId); 
    }
}
