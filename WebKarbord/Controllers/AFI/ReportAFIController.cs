using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebKarbord.Controllers.AFI
{
    public class ReportAFIController : Controller
    {


        // حسابداری ------------------------------------------

        public ActionResult TrzAcc()
        {
            return View();
        }

        public ActionResult Dftr()
        {
            return View();
        }

        public ActionResult ADocR()
        {
            return View();
        }

        public ActionResult TChk()
        {
            return View();
        }



        // انبار داری ------------------------------------------


        public ActionResult TrzIKala()
        {
            return View();
        }

        public ActionResult TrzIKalaExf()
        {
            return View();
        }

        public ActionResult IDocR()
        {
            return View();
        }

        public ActionResult FDocR_S()
        {
            return View();
        }

        public ActionResult FDocR_P()
        {
            return View();
        }




    }
}