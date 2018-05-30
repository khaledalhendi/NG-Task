using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ng_api.Entities
{
    public class ClassCode
    {
        [Key]
        [StringLength(3)]
        public string Value { get; set; }
}
}
