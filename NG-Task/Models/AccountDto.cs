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
        public float Balance { get; set; }
        public string CurrencyISO { get; set; }
    }
}
