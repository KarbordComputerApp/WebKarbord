using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using WebKarbord.Controllers.Unit;
using WebKarbord.Models;

namespace WebKarbord.Controllers.Unit
{
    public class UnitPublic
    {
        //Server.MapPath("ini/SqlServerConfig.Ini");
        public static string Appddress; //ادرس نرم افزار
        public static IniFile MyIniServer;
        public static string apiAddress;
        public static char[] afiAccess;
        //public static string ace;
        //public static string group;
        //public static string sal;

        public static List<SelectListItem> free = new List<SelectListItem>();
        public static List<SelectListItem> aceList = new List<SelectListItem>(); //لیست نرم افزار ها
        public static List<SelectListItem> accList = new List<SelectListItem>();//لیست گروه های حسابداری
        public static List<SelectListItem> invList = new List<SelectListItem>();//لیست گروه های انبار
        public static List<SelectListItem> fctList = new List<SelectListItem>();//لیست گروه های فروش
        public static List<SelectListItem> afiList = new List<SelectListItem>();//لیست گروه های مالی و بازرگانی

        public static List<SelectListItem> accSalList = new List<SelectListItem>();//لیست سال حسابداری
        public static List<SelectListItem> invSalList = new List<SelectListItem>();//لیست سال انبار
        public static List<SelectListItem> fctSalList = new List<SelectListItem>();//لیست سال فروش
        public static List<SelectListItem> afiSalList = new List<SelectListItem>();//لیست سال مالی و بازرگانی


        public class listDatabase
        {
            public string name { get; set; }
        }

        public static string MD5Hash(string itemToHash)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(itemToHash)).Select(s => s.ToString("x2")));
        }

        public static string Encrypt(string str)
        {
            string EncrptKey = "2013;[pnuLIT)WebCodeExpert";
            byte[] byKey = { };
            byte[] IV = { 18, 52, 86, 120, 144, 171, 205, 239 };
            byKey = System.Text.Encoding.UTF8.GetBytes(EncrptKey.Substring(0, 8));
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray = Encoding.UTF8.GetBytes(str);
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(byKey, IV), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            return Convert.ToBase64String(ms.ToArray());
        }

        public static string Decrypt(string str)
        {
            str = str.Replace(" ", "+");
            string DecryptKey = "2013;[pnuLIT)WebCodeExpert";
            byte[] byKey = { };
            byte[] IV = { 18, 52, 86, 120, 144, 171, 205, 239 };
            byte[] inputByteArray = new byte[str.Length];

            byKey = System.Text.Encoding.UTF8.GetBytes(DecryptKey.Substring(0, 8));
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            inputByteArray = Convert.FromBase64String(str.Replace(" ", "+"));
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(byKey, IV), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            System.Text.Encoding encoding = System.Text.Encoding.UTF8;
            return encoding.GetString(ms.ToArray());
        }

        //دریافت اطلاعات کاربر
        public static bool UserInformation(string acc, string inv, string fct, string afi)
        {
            try
            {
                aceList.Clear();
                invList.Clear();
                fctList.Clear();
                accList.Clear();
                afiList.Clear();
                invSalList.Clear();
                fctSalList.Clear();
                accSalList.Clear();
                afiSalList.Clear();


                if (!string.IsNullOrEmpty(acc))
                {
                    aceList.Add(new SelectListItem { Value = "ACC5", Text = "نرم افزار حسابداری" });
                    string[] accTemp = acc.Split('-');
                    foreach (string accs in accTemp)
                    {
                        accList.Add(new SelectListItem { Value = accs, Text = accs});
                    }

                    var salDB = UnitDatabase.db.Database.SqlQuery<listDatabase>(@"select DISTINCT substring(name,11,4) as name from sys.sysdatabases where name like 'ACE_ACC5%' order by name");
                    foreach (var item in salDB)
                    {
                        accSalList.Add(new SelectListItem { Value = item.name, Text = item.name });
                    }
                }


                if (!string.IsNullOrEmpty(inv))
                {
                    aceList.Add(new SelectListItem { Value = "INV5", Text = "نرم افزار انبار" });
                    string[] invTemp = inv.Split('-');
                    foreach (string invs in invTemp)
                    {
                        invList.Add(new SelectListItem { Value = invs, Text = invs });
                    }

                    var salDB = UnitDatabase.db.Database.SqlQuery<listDatabase>(@"select DISTINCT substring(name,11,4) as name from sys.sysdatabases where name like 'ACE_INV5%' order by name");
                    foreach (var item in salDB)
                    {
                        invSalList.Add(new SelectListItem { Value = item.name, Text = item.name });
                    }
                }

                if (!string.IsNullOrEmpty(fct))
                {
                    aceList.Add(new SelectListItem { Value = "FCT5", Text = "نرم افزار فروش" });
                    string[] fctTemp = fct.Split('-');
                    foreach (string fcts in fctTemp)
                    {
                        fctList.Add(new SelectListItem { Value = fcts, Text = fcts });
                    }

                    var salDB = UnitDatabase.db.Database.SqlQuery<listDatabase>(@"select DISTINCT substring(name,11,4) as name from sys.sysdatabases where name like 'ACE_FCT5%' order by name");
                    foreach (var item in salDB)
                    {
                        fctSalList.Add(new SelectListItem { Value = item.name, Text = item.name });
                    }
                }

                if (!string.IsNullOrEmpty(afi))
                {
                    aceList.Add(new SelectListItem { Value = "AFI1", Text = "نرم افزار مالی بازرگانی" });
                    string[] afiTemp = afi.Split('-');
                    foreach (string afis in afiTemp)
                    {
                        afiList.Add(new SelectListItem { Value = afis, Text = afis });
                    }

                    var salDB = UnitDatabase.db.Database.SqlQuery<listDatabase>(@"select DISTINCT substring(name,11,4) as name from sys.sysdatabases where name like 'ACE_AFI1%' order by name");
                    foreach (var item in salDB)
                    {
                        afiSalList.Add(new SelectListItem { Value = item.name, Text = item.name });
                    }
                }




                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }



        public static List<SelectListItem> ListTypeAnbar()
{
    List<SelectListItem> list = new List<SelectListItem>();
    list.Add(new SelectListItem { Value = "0", Text = "دارای گردش" });
    list.Add(new SelectListItem { Value = "1", Text = "دارای گردش با موجودی مخالف صفر" });
    list.Add(new SelectListItem { Value = "2", Text = "دارای گردش با موجودی صفر" });
    list.Add(new SelectListItem { Value = "3", Text = "دارای گردش با موجودی مثبت" });
    list.Add(new SelectListItem { Value = "4", Text = "دارای گردش با موجودی منفی" });
    list.Add(new SelectListItem { Value = "5", Text = "بدون گردش طی دوره" });
    list.Add(new SelectListItem { Value = "6", Text = "بدون گردش و یا موجودی صفر" });
    list.Add(new SelectListItem { Value = "7", Text = "دارای گردش منفی طی دوره" });
    return list;
}

public static List<SelectListItem> type1()
{
    List<SelectListItem> list = new List<SelectListItem>();
    list.Add(new SelectListItem { Value = "0", Text = "موجودی اول دوره" });
    list.Add(new SelectListItem { Value = "1", Text = "رسید ورود به انبار" });
    list.Add(new SelectListItem { Value = "2", Text = "برگشت فروش به انبار" });
    list.Add(new SelectListItem { Value = "3", Text = "انتقال به انبار" });
    list.Add(new SelectListItem { Value = "4", Text = "رسید خرید" });
    list.Add(new SelectListItem { Value = "5", Text = "حواله خروج از انبار" });
    list.Add(new SelectListItem { Value = "6", Text = "برگشت خرید از انبار" });
    list.Add(new SelectListItem { Value = "7", Text = "انتقال از انبار" });
    list.Add(new SelectListItem { Value = "8", Text = "حواله فروش" });
    return list;
}

public static List<SelectListItem> type2()
{
    List<SelectListItem> list = new List<SelectListItem>();
    list.Add(new SelectListItem { Value = "0", Text = "وارده به انبار" });
    list.Add(new SelectListItem { Value = "1", Text = "صادره از انبار" });
    return list;
}

public static List<SelectListItem> type3()
{
    List<SelectListItem> list = new List<SelectListItem>();
    list.Add(new SelectListItem { Value = "0", Text = "فعال" });
    list.Add(new SelectListItem { Value = "1", Text = "باطل" });
    list.Add(new SelectListItem { Value = "1", Text = "پایان یافته" });
    return list;
}

public static List<SelectListItem> type4()
{
    List<SelectListItem> list = new List<SelectListItem>();
    list.Add(new SelectListItem { Value = "0", Text = "پیش فاکتور فروش" });
    list.Add(new SelectListItem { Value = "1", Text = "فاکتور فروش" });
    list.Add(new SelectListItem { Value = "2", Text = "برگشت از فروش" });
    list.Add(new SelectListItem { Value = "3", Text = "پیش فاکتور خرید" });
    list.Add(new SelectListItem { Value = "4", Text = "فاکتور خرید" });
    list.Add(new SelectListItem { Value = "5", Text = "برگشت از خرید" });
    return list;
}

public static List<SelectListItem> type5()
{
    List<SelectListItem> list = new List<SelectListItem>();
    list.Add(new SelectListItem { Value = "0", Text = "پیش فاکتور فروش" });
    list.Add(new SelectListItem { Value = "1", Text = "فاکتور فروش" });
    list.Add(new SelectListItem { Value = "2", Text = "برگشت از فروش" });
    list.Add(new SelectListItem { Value = "3", Text = "سفارش فروش" });
    list.Add(new SelectListItem { Value = "4", Text = "حواله فروش" });
    list.Add(new SelectListItem { Value = "5", Text = "برگه خروج" });
    list.Add(new SelectListItem { Value = "6", Text = "پیش فاکتور خرید" });
    list.Add(new SelectListItem { Value = "7", Text = "فاکتور خرید" });
    list.Add(new SelectListItem { Value = "8", Text = "برگشت از خرید" });
    list.Add(new SelectListItem { Value = "9", Text = "سفارش خرید" });
    return list;
}

        /*
         public static List<SelectListItem> type()
                {
                    List<SelectListItem> list = new List<SelectListItem>();
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    list.Add(new SelectListItem { Value = "", Text = "" });
                    return list;

                }
                    { "NoeTarazTypes", new Dictionary<string, string> {
                            { "تراز در سطح", "1" },
                            { "تراز تا سطح", "2" }
                        }
                    },

                    { "SathTarazTypes", new Dictionary<string, string> {
                            { "کل", "1" },
                            { "معین", "2" },
                            { "تفصیلی 1", "3" },
                            { "تفصیلی 2", "4" },
                            { "تفصیلی 3", "5" }
                        }
                    },


                    ////////////
                    {"CheckTypes", new Dictionary<string, string> {
                            { "اسناد پرداختی", "1" },
                            { "اسناد دریافتی", "2" }
                        }
                    },

                    {"BaravatAcc", new Dictionary<string, string> {
                            { "تمام چک ها", "1" },
                            { "بروات", "2" },
                            { "غیر بروات", "3" }
                        }
                    },

                    {"VaziyatCheckAccP", new Dictionary<string, string> {
                            { "تمام چک ها", "" },
                            { "صادر شده", "1" },
                            { "پاس شده", "2" },
                            { "برگشتی", "6" },
                            { "واگذار شده", "7" },
                            { "نامشخص", "8" },
                            { "عودت", "9" }
                        }
                    },


                    {"VaziyatCheckAccD", new Dictionary<string, string> {
                            { "تمام چک ها", "" },
                            { "نزد صندوق", "3" },
                            { "وصول شده", "4" },
                            { "در جریان وصول", "5" },
                            { "برگشتی", "6" },
                            { "واگذار شده", "7" },
                            { "نامشخص", "8" },
                            { "عودت", "9" }
                        }
                    },



                    {"VaziyatCheckAfiP", new Dictionary<string, string> {
                            { "تمام چک ها", "" },
                            { "صادر شده", "1" },
                            { "پاس شده", "2" },
                            { "برگشتی", "11" },
                            { "عودت", "13" },
                            { "نامشخص", "14" }
                        }
                    },


                    {"VaziyatCheckAfiD", new Dictionary<string, string> {
                            { "تمام چک ها", "" },
                            { "نزد صندوق", "3" },
                            { "وصول شده", "4" },
                            { "در جریان وصول", "5" },
                            { "برگشتی", "6" },
                            { "واگذار شده", "7" },
                            { "عودت", "9" },
                            { "نامشخص", "8" }
                        }
                    },

                    */

    }
}