
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NG_Task.Entities
{
    [Table("Accounts")]
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "decimal(21,6)")]
        public decimal Balance { get; set; }

        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        [Column(TypeName ="char(3)")]
        public string CurrencyISO { get; set; }

        [ForeignKey("CurrencyISO")]
        public virtual Currency Currency { get; set; }

        //[Required]
        //[StringLength(3)]
        //public string ClassCode { get; set; }

        //[ForeignKey("ClassCodeValue")]
        //public ClassCode ClassCode { get; set; }

        //[Required]
        //[StringLength(2)]
        //public string Type { get; set; }

        //[ForeignKey("Type")]
        //public AccountType AccountType { get; set; }

    }
}
