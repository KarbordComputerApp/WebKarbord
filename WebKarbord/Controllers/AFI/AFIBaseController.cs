using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebKarbord.Controllers.Unit;
namespace WebKarbord.Controllers.AFI
{
    public class AFIBaseController : Controller
    {

        public ActionResult Kala()
        {
            return View();
        }
        public ActionResult Cust()
        {
            return View();
        }


        public ActionResult Acc()
        {
            return View();
        }

    }
}
