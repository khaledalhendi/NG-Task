using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NG_Task.Entities;
using NG_Task.Models;

namespace NG_Task.Controllers
{
    //[Produces("application/json")]
    [Route("api/customers")]
    public class CustomersController : Controller
    {
        const int DefaultPageIndex = 1;
        const int DefaultPageSize = 3;

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

        [HttpGet("{customerId}/{pageIndex?}", Name = "CustomerDetails")]
        public IActionResult GetCustomer(int customerId, int pageIndex = DefaultPageIndex)
        {
            Customer customer = NGContext.Customers.Include(c => c.Accounts).ThenInclude(a => a.Currency).FirstOrDefault(c => c.Id == customerId);

            if (customer == null)
            {
                return NotFound();
            }

            const string localCurrencyISO = "EGP"; 
            CustomerDetailDto customerDto = AutoMapper.Mapper.Map<CustomerDetailDto>(customer);

            decimal totalBalance = customer.Accounts.Sum(a => a.Balance / a.Currency.Multiplier); 
            customerDto.TotalBalance = totalBalance.ToString("0000.00 " + localCurrencyISO);

            customerDto.AccountLength = customer.Accounts.Count();

            int lastPage = (int)MathF.Ceiling((float)customerDto.AccountLength / DefaultPageSize);
            if (pageIndex > lastPage)
            {
                pageIndex = lastPage;
            }

            customerDto.Accounts = PickAccounts(customerId, pageIndex).ToArray();
            customerDto.PageIndex = pageIndex;
            customerDto.PageSize = DefaultPageSize; 
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

            return GetCustomer(customerId);
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


            return GetCustomer(customerId); 
        }

        [HttpGet("{customerId}/account/{accountId}", Name = "GetAccount")]
        public IActionResult GetCustomerAccount(int customerId, int accountId)
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

        [HttpGet("{customerId}/accounts/{pageIndex?}", Name = "GetAccounts")]
        public IActionResult GetCustomerAccounts(int customerId, int pageIndex = DefaultPageIndex)
        {
            Customer customer = NGContext.Customers.Include(c => c.Accounts).FirstOrDefault(c => c.Id == customerId);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(PickAccounts(customerId, pageIndex));
        }


        private IEnumerable<AccountDto> PickAccounts(int customerId, int pageIndex, int pageSize = DefaultPageSize)
        {
            Customer customer = NGContext.Customers.Include(c => c.Accounts).FirstOrDefault(c => c.Id == customerId);

            if (customer == null)
            {
                return null;
            }

            IEnumerable<Account> account = customer.Accounts.Skip((pageIndex - 1) * pageSize).Take(pageSize);

            IEnumerable<AccountDto> accountDtos = AutoMapper.Mapper.Map<IEnumerable<AccountDto>>(account);

            return accountDtos;
        }
    }
}