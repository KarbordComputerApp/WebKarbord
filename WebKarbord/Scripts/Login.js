var ViewModel = function () {
    var server;

    var userAccount = "";
    var passAccount = "";

    var user = "";
    var pass = "";

    var check = 0;

    var LoginUri; // 
    var LoginTestUri;

    //var serverAccount = 'http://192.168.0.114:902/api/';
    var serverAccount = 'http://127.0.0.1:902/api/';






    /*  read text file
     var input = document.getElementById("myFile");
var output = document.getElementById("output");


input.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function (e) {
      output.textContent = e.target.result;
    });

    reader.readAsBinaryString(myFile);
  }
});
<input type="file" id="myFile">
<hr>
<textarea style="width:500px;height: 400px" id="output"></textarea>
     */


    /*
<input type="file" onchange="loadFile(this.files[0])">
<script>
  async function loadFile(file) {
    let text = await file.text();
    console.log(text);
  }
</script>

     */



    /*
            /* MyObject = new ActiveXObject("WScript.Shell")
        MyObject.Run("file:///D:/Audacity/Audacity.exe");


        if (window.DOMParser) { // Firefox, Chrome, Opera, etc.
            parser = new DOMParser();
            var htmlDoc = parser.parseFromString(txt, 'text/html');
            htmlDoc.getElementById("someID");
        }

        var x = new ActiveXObject("WScript.Shell");
        x.run('calc.exe');
        */

    sessionStorage.SelectMenu = '';


    $("#user").focus();

    $("#user").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            $("#pass").focus();
        }
    });

    $("#pass").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            LoginUser();
        }
    });


    $("#userAccount").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            $("#passAccount").focus();
        }
    });

    $("#passAccount").keydown(function (e) {
        if (e.keyCode == key_Enter) {
            LoginAccount();
        }
    });



    localStorage.setItem("serverAccount", serverAccount);


    // var serverAccount = 'http://192.168.6.204:902/api/'; //Canada
    // var serverAccount = 'http://192.168.0.109:902/api/'; //Office 109
    //var serverAccount = 'http://185.208.174.64:902/api/'; //Interanet


    var MachineId = localStorage.getItem("MachineIdKarbord");
    if (MachineId == null || MachineId == '') {
        var d = new Date();
        id = d.getDate() + d.getTime();
        localStorage.setItem("MachineIdKarbord", id);
    }


    var AccountUri = serverAccount + 'Account/'; // آدرس حساب
    self.LoginList = ko.observableArray([]); // ليست حساب ها


    $('#modal-service').on('shown.bs.modal', function () {
        var userNameAccount = localStorage.getItem("userNameAccount");
        var passAccount = localStorage.getItem("passAccount");

        $('#userAccount').val(userNameAccount);
        $('#passAccount').val(passAccount);
        $('#userAccount').focus();
    });


    var lastMachineId;

    function getLoginData() {

        pass === '' ? pass = 'null' : pass = pass;




        ajaxFunction(ChangeDatabaseConfigUri + '/' + lockNumber + '/true', 'GET', null, true).done(function (data) {

        });



        var LoginObject = {
            userName: user,
            pass: pass,
            param1: 'u-Xe',
            param2: 'zqQ3',
        }

        //+ user + '/' + pass + '/' + 'u-Xe' + '/' + 'zqQ3'
        ajaxFunction(LoginUri, 'POST', LoginObject, true).done(function (data) {

            if (data == "error") {
                return showNotification(translate('اشکال در اتصال به سرور'), 0);
            }

            if (data == "Disable Account") {
                return showNotification(translate('حساب شما مسدود شده است'), 0);
            }

            if (data == "Expire Account") {
                return showNotification(translate('زمان استفاده شما از نرم افزار به پایان رسیده است'), 0);
            }

            if (data == null || data == 0)
                //return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
                return showNotification(translate('نام کاربری یا کلمه عبور اشتباه است'), 0);

            var res = data.split("-");
            userValid = res[0];


            if (userValid === 0) {
                return showNotification(translate('نام کاربری یا کلمه عبور اشتباه است'), 0);
                // return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
                sessionStorage.userName = '';
                sessionStorage.pass = '';
                sessionStorage.userNameFa = '';

                localStorage.setItem("userName", '');
                localStorage.setItem('password', '');
                localStorage.setItem('userNameFa', '');
            }
            else {

                sessionStorage.onlyGroupErj = '';
                var progCaption;
                if (localStorage.getItem('afi1List') == 'null' && localStorage.getItem('afi8List') != 'null') {
                    localStorage.setItem("ace", 'Web8');
                    sessionStorage.ace = 'Web8';
                    progCaption = translate('وب : سیستم جامع');

                    groups = localStorage.getItem('afi8List');
                    onlyGroupErj = '';

                    erj = localStorage.getItem('erjList');
                    afi = localStorage.getItem('afi8List');

                    if ((erj != null || erj != '') && erj != afi) {
                        erj = erj.split("-");
                        afi = afi.split("-");

                        for (var i = 0; i < erj.length; i++) {
                            if (afi.includes(erj[i]) == false) {
                                groups += '-' + erj[i];
                                onlyGroupErj += erj[i] + '-'
                            }
                        }

                        if (onlyGroupErj != '') {
                            onlyGroupErj = onlyGroupErj.substring(0, onlyGroupErj.length - 1);
                            sessionStorage.onlyGroupErj = onlyGroupErj;
                        }
                    }


                    tempAccess = localStorage.getItem('afi8Access');


                    /* if (tempAccess.search("ADOC") > 0 ||
                         tempAccess.search("TrzAcc") > 0 ||
                         tempAccess.search("Dftr") > 0 ||
                         tempAccess.search("TChk") > 0 ||
                         tempAccess.search("ADocR") > 0)
                         progName = "ACC5"
     
                     else if (
                         tempAccess.search("SFORD") > 0 ||
                         tempAccess.search("SPFCT") > 0 ||
                         tempAccess.search("SFCT") > 0 ||
                         tempAccess.search("SRFCT") > 0 ||
                         tempAccess.search("SHVL") > 0 ||
                         tempAccess.search("SEXT") > 0 ||
                         tempAccess.search("PFORD") > 0 ||
                         tempAccess.search("PPFCT") > 0 ||
                         tempAccess.search("PFCT") > 0 ||
                         tempAccess.search("PRFCT") > 0 ||
                         tempAccess.search("FDocR_S") > 0 ||
                         tempAccess.search("FDocR_P") > 0 ||
                         tempAccess.search("TrzFKala_S") > 0 ||
                         tempAccess.search("TrzFKala_P") > 0 ||
                         tempAccess.search("TrzFCust_S") > 0 ||
                         tempAccess.search("TrzFCust_P") > 0)
                         progName = "FCT5"
     
                     else if (tempAccess.search("IIDOC") > 0 ||
                         tempAccess.search("IODOC") > 0 ||
                         tempAccess.search("TrzIKala") > 0 ||
                         tempAccess.search("TrzIKalaExf") > 0 ||
                         tempAccess.search("Krdx") > 0 ||
                         tempAccess.search("IDocR") > 0)
                         progName = "INV5"
                         */
                    //progName = "ERJ1"


                } else if (localStorage.getItem('afi1List') != 'null' && localStorage.getItem('afi8List') == 'null') {
                    localStorage.setItem("ace", 'Web1');
                    sessionStorage.ace = 'Web1';
                    progCaption = translate('وب : مالی بازرگانی');

                    groups = localStorage.getItem('afi1List');

                    onlyGroupErj = '';

                    erj = localStorage.getItem('erjList');
                    afi = localStorage.getItem('afi1List');

                    if ((erj != null || erj != '') && erj != afi) {
                        erj = erj.split("-");
                        afi = afi.split("-");

                        for (var i = 0; i < erj.length; i++) {
                            if (afi.includes(erj[i]) == false) {
                                groups += '-' + erj[i];
                                onlyGroupErj += erj[i] + '-'
                            }
                        }

                        if (onlyGroupErj != '') {
                            onlyGroupErj = onlyGroupErj.substring(0, onlyGroupErj.length - 1);
                            sessionStorage.onlyGroupErj = onlyGroupErj;
                        }
                    }

                    //progName = "afi1"

                }
                else {
                    localStorage.setItem("ace", 'Web2');
                    sessionStorage.ace = 'Web2';
                    progCaption = translate('وب : اتوماسیون');
                    groups = localStorage.getItem('erjList');
                    //progName = "ERJ1"
                }



                ipw = localStorage.getItem("IPW");
                country = localStorage.getItem("CountryLogin");
                city = localStorage.getItem("CityLogin");


                var LoginTestObject = {
                    MachineId: MachineId,
                    IPWan: ipw,
                    Country: country,
                    City: city,
                    UserCode: user.toUpperCase(),
                    ProgName: sessionStorage.ace,
                    ProgVer: sessionStorage.ver,
                    ProgCaption: progCaption,
                    FlagTest: 0,
                    GroupNo: '',
                    Year: '',
                }
                ajaxFunction(LoginTestUri, 'POST', LoginTestObject).done(function (datalogin) {

                    if (datalogin == "MaxCount") {
                        return showNotification(translate('محدودیت ورود تعداد کاربران'), 0);
                    }

                    res[1] == "" || res[1] == null ? sessionStorage.userNameFa = user.toUpperCase() : sessionStorage.userNameFa = res[1];

                    lastMachineId = datalogin;
                    /*   if (datalogin.ID > -1) {
    
                        m_id = datalogin.CompName.split('-')
                        var LogOutObject = {
                            MachineId: m_id[0],
                            UserCode: user.toUpperCase(),
                            ProgName: ace
                        }
                        ajaxFunction(LogOutUri, 'POST', LogOutObject).done(function (datalogin) {
                            return getLoginData();
                        });
                    }*/

                    if (datalogin.ID == -1) {
                        res[1] == "" || res[1] == null ? sessionStorage.userNameFa = user.toUpperCase() : sessionStorage.userNameFa = res[1];

                        //localStorage.setItem('userNameFa', '');

                        sessionStorage.userName = user.toUpperCase();
                        sessionStorage.pass = pass;
                        localStorage.setItem("userNameFa", sessionStorage.userNameFa);
                        localStorage.setItem("userName", user.toUpperCase());
                        localStorage.setItem('password', pass);

                        //sessionStorage.progName = progName;

                        server = localStorage.getItem("ApiAddress");

                        var ProgTrsObject = {
                            User: sessionStorage.userName,
                        }

                        ace = localStorage.getItem("ace");
                        ajaxFunction(server + '/api/Web_Data/ProgTrs/' + ace, 'POST', ProgTrsObject).done(function (data) {

                            //if (localStorage.getItem("ace") == 'Web8') {
                            //   data = data.filter(s => s.prog != 'Afi1');
                            // }

                            p = '';
                            for (var i = 0; i < data.length; i++) {
                                p += data[i].prog + '-';
                            }
                            localStorage.setItem('ProgAccess', p);


                            sessionStorage.OrgProgName = data[0].prog;
                        });

                        var GroupsObject = {
                            ProgName: sessionStorage.OrgProgName,
                            User: sessionStorage.userName,
                            Groups: groups.replaceAll('-', ',')
                        }

                        ajaxFunction(server + '/api/Web_Data/Groups', 'POST', GroupsObject).done(function (data) {
                            localStorage.setItem('afiList', JSON.stringify(data));
                            //a = localStorage.getItem('afiList');
                        });

                        var Statements = "";
                        ajaxFunction(server + '/api/Web_Data/Statements', 'GET', true).done(function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (i < data.length - 1)
                                    Statements += data[i].Name + ',';
                                else
                                    Statements += data[i].Name;
                            }
                        });
                        localStorage.setItem('StatementsList', Statements);

                        localStorage.removeItem("listForms");



                        ajaxFunction(server + '/api/Web_Data/GetVerDllAcc6', 'Get').done(function (data) {
                            localStorage.setItem('VerDllCheckAcc6', data);
                        });

                        ajaxFunction(server + '/api/Web_Data/GetVerDllFct6', 'Get').done(function (data) {
                            localStorage.setItem('VerDllCheckFct6', data);
                        });

                        ajaxFunction(server + '/api/Web_Data/GetVerDllInv6', 'Get').done(function (data) {
                            localStorage.setItem('VerDllCheckInv6', data);
                        });

                        ajaxFunction(server + '/api/Web_Data/GetVerDllAfi2', 'Get').done(function (data) {
                            localStorage.setItem('VerDllCheckAfi2', data);
                        });




                        window.location.href = localStorage.getItem("urlSetting");//sessionStorage.urlSetting;
                    }
                    else {
                        var ipW = datalogin.CompName.split("-");
                        $('#title_dataUser').text(translate('کاربر') + ' ' + sessionStorage.userNameFa + ' ' + translate('قبلا وارد سیستم شده است'));
                        $('#param_ipw').text(ipW[1]);
                        $('#param_date').text(datalogin.LoginDate);
                        $('#param_time').text(datalogin.LoginTime);
                        $('#param_prog').text(datalogin.ProgCaption);
                        $('#param_ver').text(datalogin.ProgVer);
                        $('#param_country').text('');
                        $('#param_city').text('');
                        $('#modal-dataUser').modal('show');
                    }
                });
            }
        });
    }


    $("#Login_LogOutUser").click(function () {
        m_id = lastMachineId.CompName.split('-');
        user = $("#user").val();
        var LogOutObject = {
            MachineId: m_id[0],
            UserCode: user.toUpperCase(),
            ProgName: ace
        }
        ajaxFunction(LogOutUri, 'POST', LogOutObject).done(function (datalogin) {
            return getLoginData();
        });

    });

    function getAccountData() {
        //window.localStorage.clear();
        ajaxFunctionAccount(AccountUri + userAccount + '/' + passAccount, 'GET').done(function (data) {
            if (data === 0) {

                return showNotification(translate('نام مجوز ورود یا کلمه عبور اشتباه است'), 0);
            }
            else {
                serverAddress = data.AddressApi;
                apiAddressPos = data.AddressApiPos;
                afi1List = data.AFI1_Group;
                afi8List = data.AFI8_Group;
                erjList = data.ERJ_Group;

                afi1Access = data.AFI1_Access;
                afi8Access = data.AFI8_Access;
                erjAccess = data.ERJ_Access;

                lockNumber = data.lockNumber;
                multilang = data.multilang;
                logoutmin = data.logoutmin;

                Master_ProgName = data.ProgName;
                Fct_or_Inv = data.Fct_or_Inv == 'FCT5' ? 'Fct5' : Fct_or_Inv == 'INV5' ? 'Inv5' : '';



                localStorage.setItem("ApiAddress", serverAddress);
                localStorage.setItem("ApiAddressPos", apiAddressPos);
                localStorage.setItem('userNameAccount', userAccount);
                localStorage.setItem('passAccount', passAccount);
                localStorage.setItem("lockNumber", lockNumber);

                localStorage.setItem('DataAccount', JSON.stringify(data));
                localStorage.setItem('afi1List', afi1List);
                localStorage.setItem('afi8List', afi8List);
                localStorage.setItem('erjList', erjList);

                localStorage.setItem('afi1Access', afi1Access);
                localStorage.setItem('afi8Access', afi8Access);
                localStorage.setItem('erjAccess', erjAccess);
                localStorage.setItem('multilang', multilang);
                localStorage.setItem('logoutmin', logoutmin);

                localStorage.setItem('Master_ProgName', Master_ProgName);
                localStorage.setItem('Fct_or_Inv', Fct_or_Inv);

                $('#modal-service').modal('hide');
                // $('#modal-service').hide();

                return showNotification(translate('اتصال برقرار شد'), 1);

                //Swal.fire({ type: 'info', title: 'عملیات موفق', text: 'اتصال برقرار شد' });
            }
        });
    }


    self.LoginUser = function LoginUser() {
        server = localStorage.getItem("ApiAddress");
        if (server === null || server === "") {
            return showNotification(translate('تنظیمات اتصال به وب را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'خطا در ورود', text: 'مشخصات سرویس را وارد کنید' });
        }
        user = $("#user").val();
        pass = $("#pass").val();
        if (user === "" || user === null) {
            return showNotification(translate('نام کاربری را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' نام کاربری را وارد کنید ' });
        }
        //if (pass == "" || pass == null) {
        //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' کلمه عبور را وارد کنید ' });
        //}
        LoginUri = server + '/api/Web_Data/Login/';
        LoginTestUri = server + '/api/Web_Data/LoginTest';
        //sessionStorage.ace = 0;

        //localStorage.setItem('ace', '');
        //localStorage.setItem('group', '');
        //localStorage.setItem('sal', '');
        localStorage.setItem("Inbox", 0);

        localStorage.setItem('Access', null);
        localStorage.setItem('AccessErj', null);
        sessionStorage.SelectMenu = 0;
        sessionStorage.Login = "OK";
        getLoginData();
    }







    self.LoginAccount = function LoginAccount() {

        userAccount = $("#userAccount").val();
        passAccount = $("#passAccount").val();

        if (userAccount === "" || userAccount === null) {
            return showNotification(translate('نام کاربری را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' نام کاربری را وارد کنید ' });
        }
        if (passAccount === "" || passAccount === null) {
            return showNotification(translate('کلمه عبور را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' کلمه عبور را وارد کنید ' });
        }

        //asciiuserAccount = '';
        //for (var i = 0; i < userAccount.length; i++)
        //    asciiuserAccount += (userAccount[i].charCodeAt(0) * 1024) + ',';
        //asciiuserAccount += i;

        //asciipassAccount = '';
        //for (var i = 0; i < passAccount.length; i++)
        //    asciipassAccount += (passAccount[i].charCodeAt(0) * 1024) + ',';
        //asciipassAccount += i;


        localStorage.setItem('ace', '');
        localStorage.setItem('group', '');
        localStorage.setItem('sal', '');

        localStorage.setItem("SalAcc", '');
        localStorage.setItem("SalFct", '');
        localStorage.setItem("SalInv", '');

        localStorage.setItem("Inbox", 0);

        getAccountData();
    }

    tempUser = localStorage.getItem("userName");
    tempPass = localStorage.getItem("password");
    $('#user').val(tempUser);
    $('#pass').val(tempPass == "null" ? '' : tempPass);

    // ورود خودکار به صفحه خانه
    if (tempUser != '') {
        // self.LoginUser();
    }

    function getIP(data) {
        ajaxFunctionAccount('http://ip-api.com/json/', 'GET').done(function (data) {
            //a = sessionStorage.MacAddress;
            //b = sessionStorage.IP4Address;
            localStorage.setItem("IPW", data.query);
            localStorage.setItem("CountryLogin", data.country);
            localStorage.setItem("CityLogin", data.city);

            sessionStorage.IPW = data.query;
            sessionStorage.CountryLogin = data.country
            sessionStorage.CityLogin = data.city
        });
    }

    //showMacAddress();
    getIP();
    ///a = GetLocalIPAddr();
    //a = a;


    (function () {
        var now = new Date();
        var version = now.getFullYear().toString() + "0" + now.getMonth() + "0" + now.getDate();
        //"0" + now.getHours();
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://app.najva.com/static/css/local-messaging.css" + "?v=" + version;
        head.appendChild(link);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://app.najva.com/static/js/scripts/174-website-27295-a0b970d7-1466-49f3-bf2b-1cfa6674e8e9.js" + "?v=" + version;
        head.appendChild(script);
    })()


};

ko.applyBindings(new ViewModel());




