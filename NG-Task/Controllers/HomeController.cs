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
        [Route("/{id?}/{pageIndex?}")]
        [Route("Home/{id?}/{pageIndex?}")]
        [Route("Index/{id?}/{pageIndex?}")]
        public IActionResult Index(int? id, int? pageIndex)
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
