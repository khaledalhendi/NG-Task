using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NG_Task.Models
{
    public class AccountDto
    {
        public int Id { get; set; }
        public string Balance { get; set; }
        public string CurrencyISO { get; set; }
        public string AccountType { get; set; }
        public string ClassCode { get; set; }
    }
}
