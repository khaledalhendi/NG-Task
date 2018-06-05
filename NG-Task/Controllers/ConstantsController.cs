using Microsoft.AspNetCore.Mvc;
using NG_Task.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Controllers
{
    [Produces("application/json")]
    [Route("api/const")]
    public class ConstantsController : Controller
    {
        private NGContext NGContext;

        public ConstantsController(NGContext NGContext)
        {
            this.NGContext = NGContext;
        }

        [HttpGet("accountType")]
        public IActionResult GetAccountTypes()
        {
            return Ok(NGContext.AccountTypes.Select(at => at.Type).ToArray()); 
        }

        [HttpGet("currency")]
        public IActionResult GetCurrencies()
        {
            return Ok(NGContext.Currencies.Select(c => c.ISO).ToArray());
        }

        [HttpGet("classCode")]
        public IActionResult GetClassCodes()
        {
            return Ok(new[] { "33", "44", "301" });
        }
    }
}
