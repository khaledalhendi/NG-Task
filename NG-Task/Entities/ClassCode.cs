using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Entities
{
    [Table("ClassCodes")]
    public class ClassCode
    {
        [Key]
        [Column(TypeName ="char(3)")]
        public string Code { get; set; }

        [Required]
        [Column(TypeName = "char(2)")]
        public string AccountType { get; set; }

        [ForeignKey("AccountType")]
        public AccountType Type { get; set; }
    }
}
