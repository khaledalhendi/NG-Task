using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ng_api.Models
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<AccountDto> Accounts { get; set; } = new List<AccountDto>();

        public int AccountLength { get { return Accounts.Count(); } } 
    }
}
