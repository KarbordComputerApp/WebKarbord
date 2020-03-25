using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebKarbord.Controllers.Unit;

namespace WebKarbord.Controllers.AFI
{
    public class AFIFactorController : Controller
    {
        public object PersianDateTime { get; private set; }

        public ActionResult Index()
        {
            ViewBag.salList = UnitPublic.free;
            return View();
        }


        // GET: Factor
        public ActionResult AddFdoc()
        {
            ViewBag.apiAddress = UnitPublic.apiAddress;
            
            return View();
        }
    }
}
