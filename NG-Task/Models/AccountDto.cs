using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ng_api.Models
{
    public class AccountDto
    {
        public int Id { get; set; }
        public float Balance { get; set; }
        public string ClassCode { get; set; }
        public string Type { get; set; }
    }
}
