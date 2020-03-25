using WebKarbord.Controllers.Unit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace WebKarbord
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            UnitPublic.Appddress = Server.MapPath("");
            UnitPublic.MyIniServer = new IniFile(UnitPublic.Appddress + "\\Content\\ini\\SqlServerConfigServer.Ini");
            //          UnitPublic.MyIniServer = new IniFile(@"d:\test\Content\ini\SqlServerConfigServer.Ini");

        }


    }
}
