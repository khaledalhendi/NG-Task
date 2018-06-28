using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly NGContext NGContext;

        public ICustomerRepository CustomerRepository { get; private set; }
        public IAccountRepository AccountRepository { get; private set; }
        public IConstantRepository ConstantRepository { get; private set; }

        public UnitOfWork(NGContext ngContext)
        {
            this.NGContext = ngContext;

            CustomerRepository = new CustomerRepository(NGContext);
            AccountRepository = new AccountRepository(NGContext);
            ConstantRepository = new ConstantRepository(NGContext); 
        }

        public int Complete()
        {
            return NGContext.SaveChanges(); 
        }

        public void Dispose()
        {
            NGContext.Dispose(); 
        }
    }
}
