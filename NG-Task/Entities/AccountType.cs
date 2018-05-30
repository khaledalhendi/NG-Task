using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ng_api.Entities
{
    public class AccountType
    {
        [Key]
        [StringLength(2)]
        public string Type { set; get; } 
    }
}
