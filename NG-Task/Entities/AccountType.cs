using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Entities
{
    //Lookup table 
    [Table("AccountTypes")]
    public class AccountType
    {
        [Key]
        [Column(TypeName ="char(2)")]
        public string Type { get; set; }

        public ICollection<ClassCode> ClassCodes { get; set; } = new HashSet<ClassCode>(); 
    }
}
