using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NG_Task.Entities;
using NG_Task.Models;
using NG_Task.Repository;

namespace NG_Task.Controllers
{
    [Route("api/customers/{customerId}/account")]
    public class AccountsController : Controller
    {
        const int DefaultPageIndex = 1;
        const int DefaultPageSize = 3;

        private IUnitOfWork UnitOfWork;

        public AccountsController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        [HttpGet(Name = "GetAccounts")]
        public IActionResult GetCustomerAccounts(int customerId, int pageIndex = DefaultPageIndex)
        {
            Customer customer = UnitOfWork.CustomerRepository.Get(customerId);

            if (customer == null)
            {
                return NotFound();
            }

            IEnumerable<Account> accounts = UnitOfWork.AccountRepository.GetPagedAccounts(customerId, pageIndex, DefaultPageSize);
            IEnumerable<AccountDto> accountDtos = AutoMapper.Mapper.Map<IEnumerable<AccountDto>>(accounts);

            return Ok();
        }

        [HttpPost()]
        public IActionResult AddAccount(int customerId, [FromBody] AccountCreateDto accountCreateDto)
        {
            Customer customer = UnitOfWork.CustomerRepository.Get(customerId);

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

            UnitOfWork.AccountRepository.Add(account);
            UnitOfWork.Complete(); 

            return CreatedAtRoute("CustomerDetails", new{ controller="Customers", customerId }, new { accountId = account.Id });
        }

        [HttpDelete("{accountId}")]
        public IActionResult DeleteAccount(int customerId, int accountId)
        {
            var account = UnitOfWork.AccountRepository.Get(accountId); 

            if(account == null)
            {
                return NotFound(); 
            }

            UnitOfWork.AccountRepository.Remove(account);
            UnitOfWork.Complete();

            return Ok(); 
        }
    }
}