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
    [Route("api/customers", Name ="Customers")]
    public class CustomersController : Controller
    {
        const int DefaultPageIndex = 1;
        const int DefaultPageSize = 3;

        private IUnitOfWork UnitOfWork;

        public CustomersController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            IEnumerable<CustomerViewDto> result = AutoMapper.Mapper.Map<IEnumerable<CustomerViewDto>>(UnitOfWork.CustomerRepository.GetAll());

            return Ok(result);
        }

        [HttpGet("{customerId}/{pageIndex?}", Name = "CustomerDetails")]
        public IActionResult GetCustomer(int customerId, int pageIndex = DefaultPageIndex)
        {
            Customer customer = UnitOfWork.CustomerRepository.GetCustomerDetail(customerId); 

            if (customer == null)
            {
                return NotFound();
            }

            Currency localCurrency = UnitOfWork.ConstantRepository.GetLocalCurrency(); 
            CustomerDetailDto customerDto = AutoMapper.Mapper.Map<CustomerDetailDto>(customer);

            decimal totalBalance = customer.Accounts.Sum(a => a.Balance / a.Currency.Multiplier);
            customerDto.TotalBalance = totalBalance.ToString("c", CultureInfo.CreateSpecificCulture(localCurrency.Culture)); 
            customerDto.AccountLength = customer.Accounts.Count();

            IEnumerable<Account> accounts = UnitOfWork.AccountRepository.GetPagedAccounts(customerId, pageIndex, DefaultPageSize);
            ICollection<AccountDto> accountDtos = (ICollection<AccountDto>)AutoMapper.Mapper.Map<IEnumerable<AccountDto>>(accounts);
           
            customerDto.Accounts = accountDtos; 
            customerDto.PageIndex = pageIndex;
            customerDto.PageSize = DefaultPageSize; 
            return Ok(customerDto);
        }
       
    }
}