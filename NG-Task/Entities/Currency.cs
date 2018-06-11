using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Entities
{
[   Table("Currencies")]
    public class Currency
    {
        [Key]
        [Column(TypeName = "char(3)")]
        public string ISO { get; set; }

        [Required]
        [Column(TypeName ="varchar(25)")]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "decimal(21,6)")]
        public decimal Multiplier { get; set; }
    }
}
