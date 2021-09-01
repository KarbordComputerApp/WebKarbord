var ViewModel = function () {
    var server;

    var userAccount = "";
    var passAccount = "";

    var user = "";
    var pass = "";

    var check = 0;

    var LoginUri; // 
    var LoginTestUri;

    sessionStorage.SelectMenu = '';




    var serverAccount = 'http://192.168.0.114:902/api/';
    //var serverAccount = 'http://127.0.0.1:902/api/';

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


    $('#modal-service').on('show.bs.modal', function () {
        var userNameAccount = localStorage.getItem("userNameAccount");
        var passAccount = localStorage.getItem("passAccount");

        $('#userAccount').val(userNameAccount);
        $('#passAccount').val(passAccount);
    });

    function getLoginData() {

        pass === '' ? pass = 'null' : pass = pass;


        var LoginObject = {
            userName: user,
            pass: pass,
            param1: 'u-Xe',
            param2: 'zqQ3',
        }

        //+ user + '/' + pass + '/' + 'u-Xe' + '/' + 'zqQ3'
        ajaxFunction(LoginUri, 'POST', LoginObject, true).done(function (data) {

            if (data == "error") {
                return showNotification('اشکال در اتصال به سرور', 0);
            }

            if (data == "Disable Account") {
                return showNotification('حساب شما مسدود شده است', 0);
            }

            if (data == "Expire Account") {
                return showNotification('زمان استفاده شما از نرم افزار به پایان رسیده است', 0);
            }

            if (data == null || data == 0)
                //return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
                return showNotification(' نام کاربری یا کلمه عبور اشتباه است ', 0);

            var res = data.split("-");
            userValid = res[0];


            if (userValid === 0) {
                return showNotification(' نام کاربری یا کلمه عبور اشتباه است ', 0);
                // return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
                sessionStorage.userName = '';
                sessionStorage.pass = '';
                sessionStorage.userNameFa = '';

                localStorage.setItem("userName", '');
                localStorage.setItem('password', '');
                localStorage.setItem('userNameFa', '');
            }
            else {

                var progCaption;
                if (localStorage.getItem('afi1List') == 'null' && localStorage.getItem('afi8List') != 'null') {
                    localStorage.setItem("ace", 'Web8');
                    sessionStorage.ace = 'Web8';
                    progCaption = ' وب : سیستم جامع';
                    groups = localStorage.getItem('afi8List');

                    tempAccess = localStorage.getItem('afi8Access');


                    if (tempAccess.search("ADOC") > 0 ||
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

                    //progName = "ERJ1"


                } else if (localStorage.getItem('afi1List') != 'null' && localStorage.getItem('afi8List') == 'null') {
                    localStorage.setItem("ace", 'Web1');
                    sessionStorage.ace = 'Web1';
                    progCaption = ' وب : مالی بازرگانی';
                    groups = localStorage.getItem('afi1List');
                    progName = "afi1"
                }
                else {
                    localStorage.setItem("ace", 'Web2');
                    sessionStorage.ace = 'Web2';
                    progCaption = ' وب : اتوماسیون';
                    groups = localStorage.getItem('erjList');
                    progName = "ERJ1"
                }

                var LoginTestObject = {
                    MachineId: MachineId,
                    IPWan: sessionStorage.IPW,
                    Country: sessionStorage.CountryLogin,
                    City: sessionStorage.CityLogin,
                    UserCode: user.toUpperCase(),
                    ProgName: sessionStorage.ace,
                    ProgVer: sessionStorage.ver,
                    ProgCaption: progCaption,
                    FlagTest: 0
                }
                ajaxFunction(LoginTestUri, 'POST', LoginTestObject).done(function (datalogin) {

                    if (datalogin == "MaxCount") {
                        return showNotification('محدودیت ورود تعداد کاربران', 0);
                    }

                    res[1] == "" || res[1] == null ? sessionStorage.userNameFa = user.toUpperCase() : sessionStorage.userNameFa = res[1];
                    if (datalogin.ID == -1) {
                        res[1] == "" || res[1] == null ? sessionStorage.userNameFa = user.toUpperCase() : sessionStorage.userNameFa = res[1];

                        //localStorage.setItem('userNameFa', '');

                        sessionStorage.userName = user.toUpperCase();
                        sessionStorage.pass = pass;
                        localStorage.setItem("userNameFa", sessionStorage.userNameFa);
                        localStorage.setItem("userName", user.toUpperCase());
                        localStorage.setItem('password', pass);

                        sessionStorage.progName = progName;

                        var GroupsObject = {
                            ProgName: progName,
                            User: sessionStorage.userName,
                            Groups: groups.replaceAll('-', ',')
                        }

                        server = localStorage.getItem("ApiAddress");
                        ajaxFunction(server + '/api/Web_Data/Groups', 'POST', GroupsObject).done(function (data) {
                            localStorage.setItem('afiList', JSON.stringify(data));
                            a = localStorage.getItem('afiList');
                        });






                        window.location.href = localStorage.getItem("urlSetting");//sessionStorage.urlSetting;
                    }
                    else {

                        var ipW = datalogin.CompName.split("-");
                        $('#title_dataUser').text('کاربر ' + sessionStorage.userNameFa + ' قبلا وارد سیستم شده است');
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

    function getAccountData() {
        //window.localStorage.clear();
        ajaxFunctionAccount(AccountUri + userAccount + '/' + passAccount, 'GET').done(function (data) {
            if (data === 0) {

                return showNotification(' نام مجوز ورود یا کلمه عبور اشتباه است ', 0);
            }
            else {
                serverAddress = data.AddressApi;
                afi1List = data.AFI1_Group;
                afi8List = data.AFI8_Group;
                erjList = data.ERJ_Group;

                afi1Access = data.AFI1_Access;
                afi8Access = data.AFI8_Access;
                erjAccess = data.ERJ_Access;

                lockNumber = data.lockNumber;

                localStorage.setItem("ApiAddress", serverAddress);
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

                $('#modal-service').modal('hide');
                // $('#modal-service').hide();

                return showNotification('اتصال برقرار شد', 1);

                //Swal.fire({ type: 'info', title: 'عملیات موفق', text: 'اتصال برقرار شد' });
            }
        });
    }


    self.LoginUser = function LoginUser() {
        server = localStorage.getItem("ApiAddress");
        if (server === null || server === "") {
            return showNotification('مشخصات سرویس را وارد کنید', 0);
            //return Swal.fire({ type: 'info', title: 'خطا در ورود', text: 'مشخصات سرویس را وارد کنید' });
        }
        user = $("#user").val();
        pass = $("#pass").val();
        if (user === "" || user === null) {
            return showNotification(' نام کاربری را وارد کنید ', 0);
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
            return showNotification(' نام کاربری را وارد کنید ', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' نام کاربری را وارد کنید ' });
        }
        if (passAccount === "" || passAccount === null) {
            return showNotification(' کلمه عبور را وارد کنید ', 0);
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
            sessionStorage.IPW = data.query;
            sessionStorage.CountryLogin = data.country
            sessionStorage.CityLogin = data.city
        });
    }

    //showMacAddress();
    getIP();
    ///a = GetLocalIPAddr();
    //a = a;



};

ko.applyBindings(new ViewModel());




