var ViewModel = function () {
    var server;

    var userAccount = "";
    var passAccount = "";

    var user = "";
    var pass = "";

    var check = 0;

    var LoginUri; // آدرس حساب

    //Debug
    //var serverAccount = 'http://localhost:902/api/';       
    var serverAccount = 'http://localhost:49961/api/';       

   // var serverAccount = 'http://192.168.6.204:902/api/'; //Canada
   // var serverAccount = 'http://192.168.0.109:902/api/'; //Office 109
   //var serverAccount = 'http://185.208.174.64:902/api/'; //Interanet

    sessionStorage.serverAccount = serverAccount;

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
        ajaxFunction(LoginUri + user + '/' + pass + '/' + 'u-Xe' + '/' + 'zqQ3', 'GET').done(function (data) {
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

                localStorage.setItem("userName", '');
                localStorage.setItem('password', '');
                sessionStorage.userNameFa = '';
            }
            else {
                res[1] == "" || res[1] == null ? sessionStorage.userNameFa = user.toUpperCase() : sessionStorage.userNameFa = res[1];
                sessionStorage.userName = user.toUpperCase();
                sessionStorage.pass = pass;
                localStorage.setItem("userName", user.toUpperCase());
                localStorage.setItem('password', pass);


                window.location.href = sessionStorage.urlSetting;
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

                localStorage.setItem("ApiAddress", serverAddress);
                localStorage.setItem('userNameAccount', userAccount);
                localStorage.setItem('passAccount', passAccount);

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
        sessionStorage.ace = 0;
        sessionStorage.group = 0;
        sessionStorage.sal = 0;
        localStorage.setItem('Access', null);
        localStorage.setItem('AccessErj', null);
        sessionStorage.SelectMenu = 0;
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

        sessionStorage.ace = 0;
        sessionStorage.group = 0;
        sessionStorage.sal = 0;
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


};

ko.applyBindings(new ViewModel());




