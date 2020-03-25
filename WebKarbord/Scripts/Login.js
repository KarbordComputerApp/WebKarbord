var ViewModel = function () {
    var server;

    var userAccount = "";
    var passAccount = "";

    var user = "";
    var pass = "";

    var check = 0;

    var LoginUri; // آدرس حساب
    var serverAccount = 'http://localhost:902/api/';
    sessionStorage.serverAccount = serverAccount;

    var AccountUri = serverAccount + 'Account/'; // آدرس حساب
    self.LoginList = ko.observableArray([]); // ليست حساب ها

    function getLoginData() {
        pass === '' ? pass = 'null' : pass = pass;
        ajaxFunction(LoginUri + user + '/' + pass + '/' + 'u-Xe' + '/' + 'zqQ3', 'GET').done(function (data) {
            if (data === 0) {
                return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
            }
            else {
                sessionStorage.userName = user.toUpperCase();
                sessionStorage.pass = pass;
                window.location.href = sessionStorage.urlSetting;
            }
        });
    }

    function getAccountData() {
        //window.localStorage.clear();
        ajaxFunction(AccountUri + userAccount + '/' + passAccount, 'GET').done(function (data) {
            if (data === null) {
                return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
            }
            else {
                serverAddress = data.AddressApi;
                afiList = data.AFI_Group;// : afiList = null;
                accList = data.ACC_Group;
                invList = data.INV_Group;//.split("-") : invList = null;
                fctList = data.FCT_Group;//.split("-") : fctList = null;
                erjList = data.ERJ_Group;
                 
                afiAccess = data.AFI_Access;//.split("");
                accAccess = data.ACC_Access;//.split("");
                invAccess = data.INV_Access;//.split("");
                fctAccess = data.FCT_Access;//.split("");
                erjAccess = data.ERJ_Access;//.split("");

                localStorage.setItem("ApiAddress", serverAddress);
                localStorage.setItem('userNameAccount', userAccount);
                localStorage.setItem('passAccount', passAccount);
                localStorage.setItem('DataAccount', JSON.stringify(data));
                localStorage.setItem('afiList', afiList);
                localStorage.setItem('accList', accList);
                localStorage.setItem('invList', invList);
                localStorage.setItem('fctList', fctList);
                localStorage.setItem('erjList', erjList);


                localStorage.setItem('afiAccess', afiAccess);
                localStorage.setItem('accAccess', accAccess);
                localStorage.setItem('invAccess', invAccess);
                localStorage.setItem('fctAccess', fctAccess);
                localStorage.setItem('erjAccess', erjAccess);

                return Swal.fire({ type: 'info', title: 'عملیات موفق', text: 'اتصال برقرار شد' });
            }
        });
    }


    self.LoginUser = function LoginUser() {
        server = localStorage.getItem("ApiAddress");
        if (server === null || server === "") {
            return Swal.fire({ type: 'info', title: 'خطا در ورود', text: 'مشخصات سرویس را وارد کنید' });
        }
        user = $("#user").val();
        pass = $("#pass").val();
        if (user === "" || user === null) {
            return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' نام کاربری را وارد کنید ' });
        }
        //if (pass == "" || pass == null) {
        //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' کلمه عبور را وارد کنید ' });
        //}
        LoginUri = server + '/api/Web_Data/Login/';
        sessionStorage.ace = 0;
        sessionStorage.group = 0;
        sessionStorage.sal = 0;
        localStorage.setItem('Access', null);
        sessionStorage.SelectMenu = 0;
        getLoginData();
    }

    self.LoginAccount = function LoginAccount() {
        userAccount = $("#userAccount").val();
        passAccount = $("#passAccount").val();
        if (userAccount === "" || userAccount === null) {
            return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' نام کاربری را وارد کنید ' });
        }
        if (passAccount === "" || passAccount === null) {
            return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' کلمه عبور را وارد کنید ' });
        }
        sessionStorage.ace = 0;
        sessionStorage.group = 0;
        sessionStorage.sal = 0;
        getAccountData();
    }
};

ko.applyBindings(new ViewModel());




