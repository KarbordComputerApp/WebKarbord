using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebKarbord.Controllers.Unit;

namespace WebKarbord.Controllers.AFI
{
    public class AFISanadAnbarController : Controller
    {
        // GET: SanadAnbarList
        public ActionResult Index()
        {
            return View();
        }

        // GET: SanadAnbar
        public ActionResult AddIdoc()
        {
            ViewBag.apiAddress = UnitPublic.apiAddress;
            return View();
        }

    }
}