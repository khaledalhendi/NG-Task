﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Models
{
    public class AccountCreateDto
    {
        public float Balance { get; set; }
        public string CurrencyISO { get; set; }
        public string AccountType { get; set; }
    }
}
