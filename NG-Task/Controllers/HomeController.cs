using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NG_Task.Controllers
{
    public class HomeController : Controller
    {
        [Route("/{id?}")]
        [Route("Home/{id?}")]
        [Route("Index/{id?}")]
        public IActionResult Index(int? id)
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
