using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace WebKarbord.Controllers.Unit
{
    public class UnitSweet2
    {
        //نمایش پیغام ها با استفاده از sweet2
        public static string ShowMessage(int? type, string title , string text)
        {
            //success - error - warning - info - question
            string textType = "success";
            switch (type)
            {
                case 0: textType = "success"; break;
                case 1: textType = "error"; break;
                case 2: textType = "warning"; break;
                case 3: textType = "info"; break;
                case 4: textType = "question"; break;
                default:  textType = "success";      break;
            }
            string javaText = " Swal.fire({ type: '" + textType + "', title: '" + title + "',text: '" + text + "'});";
            return javaText;
        }
    }
}