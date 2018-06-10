using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NG_Task.Models
{
    public class CustomerDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Branch { get; set; }
        public string OpenDate { get; set; }

        public decimal TotalBalance { set; get; }

        public ICollection<AccountDto> Accounts { get; set; } = new List<AccountDto>();

        public int AccountLength { get { return Accounts.Count(); } } 
    }
}
