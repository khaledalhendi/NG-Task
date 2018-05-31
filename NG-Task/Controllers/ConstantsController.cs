using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("classcode")]
        public IActionResult GetClassCodes()
        {
            return Ok(new []{ "CK","SV","KS" }); 
        }
    }
}
