using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebKarbord.Controllers.Unit;
using WebKarbord.Models;
using System.Reflection;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace WebKarbord.Controllers
{
    public class HomeController : Controller
    {

        // GET: Home

        public ActionResult Index()
        {
            //if (!UnitDatabase.TestSqlServer(false))
            //{
           //     return JavaScript(UnitSweet2.ShowMessage(1, "خطا در اتصال", ""));
            //}
            return View();
        }


        public ActionResult Setting()
        {
            ViewBag.aceList = UnitPublic.aceList;
            ViewBag.salList = UnitPublic.free;
            ViewBag.groupList = UnitPublic.free;
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LoginGuouhfgr(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName)) return JavaScript(UnitSweet2.ShowMessage(3, "خطا در ورود اطلاعات", "نام کاربری را وارد کنید"));
            if (string.IsNullOrEmpty(password)) return JavaScript(UnitSweet2.ShowMessage(3, "خطا در ورود اطلاعات", "کلمه عبور را وارد کنید"));
            if (UnitDatabase.CreateConection("", "", ""))
            {
                try
                {
                    //var list = from p in UnitDatabase.db.AccessSet where p.Email == userName && p.Pass == password select p;
                    var list = UnitDatabase.db.Access.First(c => c.UserName == userName && c.Password == password);
                    if (list.Id > 0)
                    {
                        if (UnitPublic.UserInformation(list.ACC_Group, list.INV_Group, list.FCT_Group, list.AFI_Group))
                        {
                            //string a = UnitPublic.Encrypt(password);
                            //string b = UnitPublic.Decrypt(a);
                            UnitPublic.apiAddress = list.AddressApi;
                            UnitPublic.afiAccess = list.AFI_Access.ToCharArray();
                            //return JavaScript("document.location.replace('" + Url.Action("index", "Home") + "');");
                            return JavaScript(
                                " localStorage.setItem('ApiAddress'," + "'" + list.AddressApi + "'" + ");" +
                                " localStorage.setItem('User'," + userName + ");" +
                                " localStorage.setItem('Pass'," + password + ");" +
                                " localStorage.setItem('AFI_Access'," + "'" + list.AFI_Access + "'" + ");" +
                                " localStorage.setItem('AceList'," + "'" + Json(UnitPublic.aceList) + "'" + ");" +
                                " localStorage.setItem('afiGroup'," + "'" + Json(UnitPublic.afiList) + "'" + ");" +
                                " localStorage.setItem('fctGroup'," + "'" + Json(UnitPublic.fctList) + "'" + ");" +
                                " localStorage.setItem('invGroup'," + "'" + Json(UnitPublic.invList) + "'" + ");" +
                                " localStorage.setItem('accGroup'," + "'" + Json(UnitPublic.accList) + "'" + ");" +
                                UnitSweet2.ShowMessage(0, "عملیات موفق", "اتصال برقرار شد"));
                        }
                        else
                        {
                            return JavaScript(
                                " localStorage.setItem('ApiAddress'," + "''" + ");" + 
                                UnitSweet2.ShowMessage(1, "خطا", "اطلاعات کاربر یافت نشد"));
                        }
                    }
                    else
                    {
                        return JavaScript(
                            " localStorage.setItem('ApiAddress'," + "''" + ");" +
                            UnitSweet2.ShowMessage(3, "خطا", "نام کاربری یا کلمه عبور اشتباه است"));
                    }
                }
                catch (Exception e)
                {
                    return JavaScript(
                        " localStorage.setItem('ApiAddress'," + "''" + ");" +
                        UnitSweet2.ShowMessage(1, "خطا", "نام کاربری یا کلمه عبور اشتباه است"));
                }

            }
            else
            {
                return JavaScript(UnitSweet2.ShowMessage(1, "خطا", "ارتباط برقرار نشد"));
            }
        }

/*
        [HttpPost]
        [ValidateAntiForgeryToken]
       public ActionResult LoginUser(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName)) return JavaScript(UnitSweet2.ShowMessage(3, "خطا در ورود اطلاعات", "نام کاربری را وارد کنید"));
            if (string.IsNullOrEmpty(password)) return JavaScript(UnitSweet2.ShowMessage(3, "خطا در ورود اطلاعات", "کلمه عبور را وارد کنید"));
            if (UnitDatabase.CreateConection("", "", ""))
            {
                try
                {
                    var list = UnitDatabase.db.AccessSet.First(c => c.Email == userName && c.Pass == password);
                    if (list.Id > 0)
                    {
                        if (UnitPublic.UserInformation(list.ACC_Group, list.INV_Group, list.FCT_Group, list.AFI_Group))
                        {
                            UnitPublic.apiAddress = list.ConnectionString;
                            return JavaScript("document.location.replace('" + Url.Action("index", "Home") + "');");
                        }
                        else
                        {
                            return JavaScript(UnitSweet2.ShowMessage(1, "خطا", "اطلاعات کاربر یافت نشد"));
                        }
                    }
                    else
                    {
                        return JavaScript(UnitSweet2.ShowMessage(3, "خطا", "نام کاربری یا کلمه عبور اشتباه است"));
                    }
                }
                catch (Exception)
                {
                    return JavaScript(UnitSweet2.ShowMessage(1, "خطا", "نام کاربری یا کلمه عبور اشتباه است"));
                }

            }
            else
            {
                return JavaScript(UnitSweet2.ShowMessage(1, "خطا", "ارتباط برقرار نشد"));
            }
        }
*/

        //نمایش اطلاعات اتصال به دیتابیس
        public ActionResult AddSqlServer()
        {
            ViewBag.serverName = UnitPublic.MyIniServer.Read("serverName");
            ViewBag.userName = UnitPublic.MyIniServer.Read("userName");
            ViewBag.password = UnitPublic.MyIniServer.Read("password");
            return View();
        }

        //ثبت و ویرایش اطلاعات اتصال به دیتابیس
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddSqlServer(string serverName, string userName, string password)
        {
            //ذخیره اطلاعات اس کیو ال در فایل ای ان ای در سرور
            if (string.IsNullOrEmpty(serverName)) return JavaScript(UnitSweet2.ShowMessage(3, "خطا در ورود اطلاعات", "نام سرور را وارد کنید"));
            if (string.IsNullOrEmpty(userName)) return JavaScript(UnitSweet2.ShowMessage(3, "خطا در ورود اطلاعات", "نام کاربری را وارد کنید"));
            if (string.IsNullOrEmpty(password)) return JavaScript(UnitSweet2.ShowMessage(3, "خطا در ورود اطلاعات", "کلمه عبور را وارد کنید"));
            UnitPublic.MyIniServer.Write("serverName", serverName);
            UnitPublic.MyIniServer.Write("userName", userName);
            UnitPublic.MyIniServer.Write("password", password);
            try
            {
                if (!UnitDatabase.TestSqlServer(false))
                {
                    return JavaScript(UnitSweet2.ShowMessage(1, "خطا در اتصال", "دوباره سعی کنید"));
                }
                return JavaScript(UnitSweet2.ShowMessage(0, "ذخیره شد", ""));
            }
            catch (Exception)
            {
                return JavaScript(UnitSweet2.ShowMessage(1, "خطا در اتصال", "دوباره سعی کنید"));
                throw;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ChangeProgram(string aceList, string groupList, string salList)
        {
            //UnitPublic.ace = aceList;
            //UnitPublic.group = groupList;
            //UnitPublic.sal = salList;
            return JavaScript(UnitSweet2.ShowMessage(0, "ذخیره شد", ""));
            //return JavaScript("document.location.replace('" + Url.Action("Index", "AFIFactor") + "');");
        }

        public JsonResult GetGroup(string ace)
        {
            if (!string.IsNullOrEmpty(ace))
            {
                switch (ace)
                {
                    case "ACC5": return Json(UnitPublic.accList);
                    case "INV5": return Json(UnitPublic.invList);
                    case "FCT5": return Json(UnitPublic.fctList);
                    case "AFI1": return Json(UnitPublic.afiList);
                    default: return null;
                }
            }
            else
            {
                List<SelectListItem> GroupList = new List<SelectListItem>();//لیست سال فروش
                GroupList.Add(new SelectListItem { Value = "0", Text = "گروه را انتخاب نمایید" });
                return Json(GroupList);
            }

        }
        public JsonResult GetSal(string ace, string group)
        {

            if (!string.IsNullOrEmpty(ace) || !string.IsNullOrEmpty(group))
            {
                string sql = string.Format(@" select SUBSTRING(name,11,4) as name  from sys.sysdatabases
                                          where name like 'ACE_{0}%' and SUBSTRING(name,9,2) like '%{1}' order by name"
                                          , ace, group);
                var listDB = UnitDatabase.db.Database.SqlQuery<UnitPublic.listDatabase>(sql).ToList();
                return Json(new SelectList(listDB, "name", "name"));
            }
            else
            {
                List<SelectListItem> SalList = new List<SelectListItem>();//لیست سال فروش
                SalList.Add(new SelectListItem { Value = "0", Text = "سال را انتخاب کنید" });
                return Json(SalList);
            }
            // return Json(new SelectList (null,"0","سال را انتخاب کنید"));

        }
        protected override void HandleUnknownAction(string actionName)
        {
            ViewData["actionName"] = actionName;
            View("Login").ExecuteResult(this.ControllerContext);
        }
    }
}