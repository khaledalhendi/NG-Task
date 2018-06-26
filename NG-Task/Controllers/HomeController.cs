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
            return View(new HomeModel() { Env=((Startup.ENV?? "Null")+ " - "  + (Startup.ENV_FILE?? "NO_FILE") ) } );
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }

    public class HomeModel
    {
        public string Env;
    }
        
}
