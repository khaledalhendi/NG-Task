using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ng.api;
using ng_api.Entities;
using ng_api.Models;

namespace ng_api.Controllers
{
    [Produces("application/json")]
    [Route("api/customers")]
    public class CustomersController : Controller
    {
        private NGContext NGContext;

        public CustomersController(NGContext NGContext)
        {
            this.NGContext = NGContext; 
        }
        [HttpGet]
        public IActionResult GetCustomers()
        {
            IEnumerable<CustomerViewDto> result = AutoMapper.Mapper.Map<IEnumerable<CustomerViewDto>>(NGContext.Customers); 

            return Ok(result);
        }

        [HttpGet("{customerId}", Name = "CustomerDetails")]
        public IActionResult GetCustomer(int customerId)
        {
            Customer customer = NGContext.Customers.Include(c => c.Accounts).FirstOrDefault(c => c.Id == customerId); 

            if(customer == null)
            {
                return NotFound(); 
            }

            CustomerDto customerDto = AutoMapper.Mapper.Map<CustomerDto>(customer); 
            
            return Ok(customerDto);
        }

        [HttpPost("{customerId}/account")]
        public IActionResult AddAccount(int customerId, [FromBody] AccountCreateDto accountCreateDto)
        {
            Customer customer = NGContext.Customers.Include(c => c.Accounts).FirstOrDefault(c => c.Id == customerId);

            if (customer == null)
            {
                return NotFound();
            }

            if (accountCreateDto == null)
            {
                return BadRequest();
            }

            Account account = AutoMapper.Mapper.Map<Account>(accountCreateDto);
            account.CustomerId = customerId; 

            NGContext.Accounts.Add(account);
            NGContext.SaveChanges();


            AccountDto accountDto = AutoMapper.Mapper.Map<AccountDto>(account);
            return CreatedAtRoute("CustomerDetails", new { customerId = customerId }, accountDto);
        }

        [HttpDelete("{customerId}/account/{accountId}")]
        public IActionResult DeleteAccount(int customerId, int accountId)
        {
            Customer customer = NGContext.Customers.Include(c => c.Accounts).FirstOrDefault(c => c.Id == customerId);

            if (customer == null)
            {
                return NotFound();
            }

            Account account = customer.Accounts.FirstOrDefault(a => a.Id == accountId);

            if (account == null)
            {
                return NotFound();
            }

            NGContext.Accounts.Remove(account);
            NGContext.SaveChanges();

            AccountDto accountDto = AutoMapper.Mapper.Map<AccountDto>(account);
            return CreatedAtRoute("CustomerDetails", new { customerId = customerId }, accountDto);
        }


        [HttpGet("{customerId}/account/{accountId}", Name = "GetAccount")]
        public IActionResult GetCustomerAccounts(int customerId, int accountId)
        {
            Customer customer = NGContext.Customers.Include(c => c.Accounts).FirstOrDefault(c => c.Id == customerId);

            if (customer == null)
            {
                return NotFound();
            }

            Account account = customer.Accounts.FirstOrDefault(a => a.Id == accountId);

            if (account == null)
            {
                return NotFound();
            }

            AccountDto accountDto = AutoMapper.Mapper.Map<AccountDto>(account);
            return Ok(accountDto);
        }
    }
}