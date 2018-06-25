using Microsoft.AspNetCore.Mvc;
using NG_Task.Entities;
using NG_Task.Models;
using NG_Task.Seed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG_Task.Controllers
{
    [Produces("application/json")]
    [Route("api/seed")]
    public class SeedController : Controller
    {
        private NGContext NGContext;

        public SeedController(NGContext NGContext)
        {
            this.NGContext = NGContext;
        }

        [HttpGet("")]
        public IActionResult Seed()
        {
            NGContext.RestSeed(); 
            return Redirect("\\"); 
        }
 
    }
}
