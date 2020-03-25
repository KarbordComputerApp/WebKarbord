using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebKarbord.Models;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace WebKarbord.Controllers.Unit
{
    public static class UnitDatabase
    {
        public static WebModel db;
        class testMaster
        {
            public string TABLE_SCHEMA { get; set; }
        }

        //اتصال به دیتابیس با توجه به گروه و سال 

        public static string DatabaseName(string ace, string sal, string group)
        {
            string dbName;
            if (string.IsNullOrEmpty(ace) || string.IsNullOrEmpty(sal) || string.IsNullOrEmpty(group))
            {
                return null;
            }
            else
            {
                dbName = "ACE_" + ace;
                dbName += ace == "AFI" ? "1" : "5";
                dbName += group + sal;
                return dbName;
            }
        }
        //ایجاد کانکشن استرینگ 
        //اگر سایت ترو باشد یعنی به اس کیو ال ای پی ای
        public static string CreateConnectionString(string dataBaseName)
        {
            try
            {
                string serverName = UnitPublic.MyIniServer.Read("serverName");
                string userName = UnitPublic.MyIniServer.Read("userName");
                string password = UnitPublic.MyIniServer.Read("password");
                dataBaseName = "guouhfgr_karbordapp";

                string connection = String.Format(
                                    @"data source = {0};initial catalog = {1};user id = {2}; password = {3}; MultipleActiveResultSets = True; App = EntityFramework",
                 //@"data source = SOFTWARE14\SQL2014; initial catalog = master; user id = sa; password = 114; MultipleActiveResultSets = True; App = EntityFramework";
                 //@"data source = SOFTWARE14\SQL2014; initial catalog = master; user id = sa; password = 114; MultipleActiveResultSets = True; App = EntityFramework";
                 serverName, dataBaseName, userName, password);
                return connection;
            }
            catch (Exception)
            {
                return null;
                throw;
            }
        }

        public static string CreateConnectionString(bool api)
        {
            try
            {
                string serverName = UnitPublic.MyIniServer.Read("serverName");
                string userName = UnitPublic.MyIniServer.Read("userName");
                string password = UnitPublic.MyIniServer.Read("password");

                string connection = String.Format( @"data source = {0};initial catalog = {1};user id = {2}; password = {3}; MultipleActiveResultSets = True; App = EntityFramework",
                    serverName, "master", userName, password);
                return connection;
            }
            catch (Exception)
            {
                return null;
                throw;
            }
        }

        //اگر سایت ترو باشد یعنی به اس کیو ال ای پی ای
        public static Boolean CreateConection(string ace, string sal, string group)
        {
            try
            {
                string conStr = CreateConnectionString(DatabaseName(ace, sal, group));
                if (string.IsNullOrEmpty(conStr))
                {
                    return false;
                }
                db = new WebModel(conStr);
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }

        //اگر سایت ترو باشد یعنی به اس کیو ال ای پی ای
        public static Boolean TestSqlServer(bool api)
        {
            try
            {
                string conStr = CreateConnectionString(api);
                db = new WebModel(conStr);
                var table = db.Database.SqlQuery<testMaster>("use master SELECT TABLE_SCHEMA FROM INFORMATION_SCHEMA.TABLES");
                if (table.Count() == 0) //اگر جدولی در دیتابیس مستر پیدا نشد 
                {
                    return false;
                }
                else
                {
                    return true;
                }

            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }

    }
}
