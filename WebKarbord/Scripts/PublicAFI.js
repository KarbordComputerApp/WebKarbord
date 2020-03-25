var server = localStorage.getItem("ApiAddress");
$('#TextUserName').text(sessionStorage.userName);
var access = JSON.parse(localStorage.getItem("Access"));
var accessReport = JSON.parse(localStorage.getItem("AccessReport"));

var accessErj = JSON.parse(localStorage.getItem("AccessErj"));
var accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));

const MODECODE_ADOC_A = 1;
const MODECODE_ADOC_EFT = 2;
const MODECODE_ADOC_EKH = 3;
const MODECODE_ADOC_SODZYN = 4;

const MODECODE_FDOC_SP = 51;
const MODECODE_FDOC_S = 52;
const MODECODE_FDOC_SR = 53;
const MODECODE_FDOC_PP = 54;
const MODECODE_FDOC_P = 55;
const MODECODE_FDOC_PR = 56;

const MODECODE_FDOC_SandSR = 81;
const MODECODE_FDOC_PandPR = 82;

const MODECODE_IDOC_AVAL = 101;
const MODECODE_IDOC_I = 102;
const MODECODE_IDOC_ISR = 103;
const MODECODE_IDOC_O = 104;
const MODECODE_IDOC_OPR = 105;
const MODECODE_IDOC_IMOVE = 106;
const MODECODE_IDOC_OMOVE = 107;
const MODECODE_IDOC_IP = 108;
const MODECODE_IDOC_OS = 109;
const MODECODE_IDOC_IMAHSOOL = 110;
const MODECODE_IDOC_OMAVAD = 111;

//if (localStorage.getItem("ApiAddress");  == null || sessionStorage.ApiAddress == "") {
//    sessionStorage.ApiAddress = $("#serverTest").text();
//    server = sessionStorage.ApiAddress;
//}
//else
//    server = sessionStorage.ApiAddress;

//$("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
//$("#groupTest").text('نام گروه' + sessionStorage.group);
//$("#salTest").text('سال مالی' + sessionStorage.sal);

//  $("#ace").val(sessionStorage.ace);
//  $("#group").val(sessionStorage.group);
//  $("#sal").val(sessionStorage.sal);

//تنظیمات هشدار ها

var afiAccessApi;
var erjAccessApi;
var erjGroupApi;

//access = JSON.parse(localStorage.getItem("Access"));

if (localStorage.getItem("afiAccess") != null && localStorage.getItem("afiAccess") != "") {
    afiAccessApi = localStorage.getItem("afiAccess").split("*")
}
else {
    accAccess = localStorage.getItem("accAccess");
    fctAccess = localStorage.getItem("fctAccess");
    invAccess = localStorage.getItem("invAccess");

    tempAccess = invAccess + '*' + fctAccess;
    afiAccessApi = tempAccess.split("*");
}


if (localStorage.getItem("erjAccess") != null && localStorage.getItem("erjAccess") != "") {
    erjAccessApi = localStorage.getItem("erjAccess").split("*")
    erjGroupApi = localStorage.getItem("erjList").split("*")
}



afiaccess = [false, false, false, false, false, false, false, false, false]
for (var i = 0; i < 9; i++) {
    afiAccessApi[i] == 'SFCT' ? afiaccess[0] = true : null;
    afiAccessApi[i] == 'SPFCT' ? afiaccess[1] = true : null;
    afiAccessApi[i] == 'SRFCT' ? afiaccess[2] = true : null;
    afiAccessApi[i] == 'PFCT' ? afiaccess[3] = true : null;
    afiAccessApi[i] == 'PPFCT' ? afiaccess[4] = true : null;
    afiAccessApi[i] == 'PRFCT' ? afiaccess[5] = true : null;
    afiAccessApi[i] == 'IIDOC' ? afiaccess[6] = true : null;
    afiAccessApi[i] == 'IODOC' ? afiaccess[7] = true : null;
    afiAccessApi[i] == 'TIKALA' ? afiaccess[8] = true : null;
}



function CheckGroupErj(GroupName) {
    if (GroupName == '') {
        return false;
    }
    else {
        if (erjGroupApi != null) {
            for (var i = 0; i < erjGroupApi.length; i++) {
                if (erjGroupApi[i] == GroupName)
                    return true;
            }
        }
        else
            return false;
    }
    return false;
}


erjaccess = [false, false]

if (CheckGroupErj(sessionStorage.group) == true) {
    for (var i = 0; i < 2; i++) {
        erjAccessApi[i] == 'ErjDocK' ? erjaccess[1] = true : null;
    }
}

sessionStorage.placementFrom = 'top';
sessionStorage.placementAlign = 'right';
sessionStorage.animateEnter = '';
sessionStorage.animateExit = '';
sessionStorage.colorName = 'alert-danger';

/*afiaccess[0] == 0 ? $("#FDOC_SP").hide() : $("#FDOC_SP").show();
afiaccess[1] == 0 ? $("#FDOC_S").hide() : $("#FDOC_S").show();
afiaccess[2] == 0 ? $("#FDOC_SR").hide() : $("#FDOC_SR").show();
afiaccess[3] == 0 ? $("#FDOC_PP").hide() : $("#FDOC_PP").show();
afiaccess[4] == 0 ? $("#FDOC_P").hide() : $("#FDOC_P").show();
afiaccess[5] == 0 ? $("#FDOC_PR").hide() : $("#FDOC_PR").show();
afiaccess[6] == 0 ? $("#IDOC_I").hide() : $("#IDOC_I").show();
afiaccess[7] == 0 ? $("#IDOC_O").hide() : $("#IDOC_O").show();*/

$("#FDOC_SP").hide();
$("#FDOC_S").hide();
$("#FDOC_SR").hide();
$("#FDOC_PP").hide();
$("#FDOC_P").hide();
$("#FDOC_PR").hide();

$("#IDOC_I").hide();
$("#IDOC_O").hide();

$("#TrzIKala").hide();
$("#FDOC_Menu").hide();
$("#IDOC_Menu").hide();
$("#IReport_Menu").hide();
$("#EReport_Menu").hide();

/*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
    afiaccess[2] == 0 && afiaccess[3] == 0 &&
    afiaccess[4] == 0 && afiaccess[5] == 0)
    $("#FDOC_Menu").hide();
else
    $("#FDOC_Menu").show();

if (afiaccess[6] == 0 && afiaccess[7] == 0)
    $("#IDOC_Menu").hide();
else
    $("#IDOC_Menu").show();*/

var ParamUri = server + '/api/Web_Data/Param/'; // آدرس پارامتر
var DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
var AccessUri = server + '/api/Web_Data/AccessUser/'; // آدرس سطح دسترسی
var AccessReportUri = server + '/api/Web_Data/AccessUserReport/'; // آدرس سطح دسترسی گزارشات
var AccessReportErjUri = server + '/api/Web_Data/AccessUserReportErj/'; // آدرس سطح دسترسی گزارشات

ParamList = ko.observableArray([]); // پارامتر ها
DatabseSalList = ko.observableArray([]); // دیتابیس های سال
AccessList = ko.observableArray([]); // سطح دسترسی
AccessListReport = ko.observableArray([]); // سطح دسترسی گزارشات

//function ajaxFunction(uri, method, data) {
//    return $.ajax({
//        type: method,
//        url: uri,
//        dataType: 'json',
//        contentType: 'application/json',
//        data: data ? JSON.stringify(data) : null
//    }).fail(function (jqXHR, textStatus, errorThrown) {
//        Swal.fire({ type: 'danger', title: 'خطای دیباگ', text: errorThrown });
//    });
//}

function ajaxFunction(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        //async: true,
        //crossDomain: true,
        contentType: 'application/json',
        //contentType: 'application/x-www-form-urlencoded',
        // xhrFields: { withCredentials: true },
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        Swal.fire({ type: 'danger', title: 'اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید', text: errorThrown });
    });
}


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function GetDataApi(Url, localStorageName) { // دریافت اطلاعات از ای پی ای
    $.ajax({
        url: Url,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            sessionStorage.setItem(localStorageName, JSON.stringify(data));
            //showNotification(' دیتای ' + localStorageName + ' دریافت شد ');
        },
        error: function (xhr, textStatus, errorThrown) {
            //showNotification('خطا در دریافت اطلاعات از سرور' + '(' + errorThrown + ')');
        }
    });
}


function SearchArry(Node, Key, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Node === Node && myArray[i].Key === Key) {
            return myArray[i].Param;
        }
    }
}

function SetSelectProgram() {
    var ace = sessionStorage.ace;
    var group = $("#DropGroup").val();
    var sal = $("#DropSal").val();

    if (server == '' || server == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود به نرم افزار', text: 'دوباره لاگین کنید' });
        return false;
    }

    if (ace == '0' || ace == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'نرم افزار را انتخاب کنید' });
        return false;
    }
    if (group == '0' || group == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'گروه را انتخاب کنید' });
        return false;
    }
    if (sal == '0' || sal == null) {
        Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'سال را انتخاب کنید' });
        return false;
    }
    try {
        //sessionStorage.ace = ace;
        sessionStorage.group = group;
        sessionStorage.sal = sal;

        localStorage.setItem('ace', ace);
        localStorage.setItem('group', group);
        localStorage.setItem('sal', sal);

        //sessionStorage.url = server + '/api/'; 
        $('#SaveParam').attr('disabled', 'disabled');
        getParamList();
        getAccessList();
        $('#SaveParam').removeAttr('disabled');


        return true;
    } catch (e) {
        $('#SaveParam').removeAttr('disabled');
        Swal.fire({ type: 'danger', title: 'خطای ورود', text: e });
        return false;
    }
}

//if ($("#DropAce").val() != '0' && $("#DropGroup").val() != '0' && $("#DropSal").val() != '0') {
//    SetSelectProgram();
//}

$("#SaveParam").click(function () {
    SetSelectProgram();
});

//Get Param List
function getParamList() {
    ajaxFunction(ParamUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group, 'GET').done(function (data) {
        ParamList(data);
        $('#information').hide();
        if (self.ParamList().length > 0) {
            sessionStorage.BeginDate = SearchArry("SalMali", "BeginDate", self.ParamList());
            sessionStorage.EndDate = SearchArry("SalMali", "EndDate", self.ParamList());
            sessionStorage.Deghat = SearchArry("Deghat", "Deghat", self.ParamList());
            sessionStorage.InvDefult = SearchArry("Inv", "Default", self.ParamList());
            sessionStorage.GPriceDefultS = SearchArry("KalaPriceS", "Default", self.ParamList());
            sessionStorage.GPriceDefultP = SearchArry("KalaPriceP", "Default", self.ParamList());
            sessionStorage.GPriceDefultI = SearchArry("KalaPriceI", "Default", self.ParamList());

            //localStorage.setItem('', aa);


            sessionStorage.invSelect = "";
            $('#param1').text(sessionStorage.ace == "null" ? "انتخاب نشده است" : sessionStorage.ace);
            $('#param2').text(sessionStorage.group == "null" ? "انتخاب نشده است" : sessionStorage.group);
            $('#param3').text(sessionStorage.sal == "null" ? "انتخاب نشده است" : sessionStorage.sal);
            $('#param4').text(sessionStorage.BeginDate == "null" ? "انتخاب نشده است" : sessionStorage.BeginDate);
            $('#param5').text(sessionStorage.EndDate == "null" ? "انتخاب نشده است" : sessionStorage.EndDate);
            $('#param6').text(sessionStorage.Deghat == "null" ? "انتخاب نشده است" : sessionStorage.Deghat);
            $('#param7').text(sessionStorage.InvDefult == '' ? "انتخاب نشده است" : sessionStorage.InvDefult);
            $('#param8').text(sessionStorage.GPriceDefultS == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultS);
            $('#param9').text(sessionStorage.GPriceDefultP == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultP);
            $('#param10').text(sessionStorage.GPriceDefultI == 0 ? "انتخاب نشده است" : sessionStorage.GPriceDefultI);

            //sessionStorage.GPriceDefultS == 0 ? sessionStorage.GPriceDefultS = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultS
            //sessionStorage.GPriceDefultP == 0 ? sessionStorage.GPriceDefultP = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultP
            //sessionStorage.GPriceDefultI == 0 ? sessionStorage.GPriceDefultI = 'گروه قیمت را انتخاب کنید' : sessionStorage.GPriceDefultI
        }
    });
}

function CheckAccess(TrsName) {
    //access = JSON.parse(localStorage.getItem("Access"));//localStorage.getItem("Access");
    if (access[0].TrsName == 'ADMIN') {
        return true;
    }
    else {
        for (var i = 0; i < access.length; i++) {
            if (access[i].TrsName == TrsName)
                return true;
        }
    }
    return false
}

function CheckAccessReport(Code) {
    for (var i = 0; i < accessReport.length; i++) {
        if (accessReport[i].Code == 'TiKala') {
            return accessReport[i].Trs;
        }
        else if (accessReport[i].Code == 'TiKalaMin') {
            return accessReport[i].Trs;
        }
        else
            return false;
    }
}

function CheckAccessReportErj(Code) {
    for (var i = 0; i < accessReportErj.length; i++) {
        if (accessReportErj[i].Code == 'DocK') {
            return accessReportErj[i].Trs;
        }
        else if (accessReportErj[i].Code == 'DocKMin') {
            return accessReportErj[i].Trs;
        }
        else
            return false;
    }
}


//Get Access List
function getAccessList() {

    AccountUri = sessionStorage.serverAccount + 'Account/'; // آدرس حساب
    ajaxFunction(AccountUri + localStorage.getItem("userNameAccount") + '/' +
        localStorage.getItem("passAccount"), 'GET').done(function (data) {
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

                //localStorage.setItem("ApiAddress", serverAddress);
                //localStorage.setItem('userNameAccount', userAccount);
                //localStorage.setItem('passAccount', passAccount);
                //localStorage.setItem('DataAccount', JSON.stringify(data));

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

                if (sessionStorage.ace == 'AFI1') {
                    afiAccess != null ? afiAccessApi = afiAccess.split("*") : afiAccessApi = null
                }
                else {
                    //tempAccess = accAccess +'*'+ invAccess + '*' + fctAccess;
                    tempAccess = invAccess + '*' + fctAccess;
                    afiAccessApi = tempAccess.split("*");
                }

                afiaccess = [false, false, false, false, false, false, false, false, false]

                for (var i = 0; i < 9; i++) {
                    afiAccessApi[i] == 'SFCT' ? afiaccess[0] = true : null;
                    afiAccessApi[i] == 'SPFCT' ? afiaccess[1] = true : null;
                    afiAccessApi[i] == 'SRFCT' ? afiaccess[2] = true : null;
                    afiAccessApi[i] == 'PFCT' ? afiaccess[3] = true : null;
                    afiAccessApi[i] == 'PPFCT' ? afiaccess[4] = true : null;
                    afiAccessApi[i] == 'PRFCT' ? afiaccess[5] = true : null;
                    afiAccessApi[i] == 'IIDOC' ? afiaccess[6] = true : null;
                    afiAccessApi[i] == 'IODOC' ? afiaccess[7] = true : null;
                    afiAccessApi[i] == 'TIKALA' ? afiaccess[8] = true : null;
                }

                erjaccess = [false, false]

                if (CheckGroupErj(sessionStorage.group) == true) {
                    for (var i = 0; i < 2; i++) {
                        erjAccessApi[i] == 'ErjDocK' ? erjaccess[1] = true : null;
                    }

                    ajaxFunction(AccessUri + 'ERJ1' + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                        self.AccessList(data);
                        if (self.AccessList().length > 0) {
                            localStorage.setItem('AccessErj', JSON.stringify(data));
                            accssErj = JSON.parse(localStorage.getItem("AccessErj"));

                            ajaxFunction(AccessReportErjUri + 'ERJ1' + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                                self.AccessListReport(data);
                                if (self.AccessListReport().length > 0) {
                                    localStorage.setItem('AccessReportErj', JSON.stringify(data));
                                    accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));
                                    SetValidationErj();
                                }
                            });
                        }
                    });


                }

                ajaxFunction(AccessUri + sessionStorage.ace + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                    self.AccessList(data);
                    if (self.AccessList().length > 0) {
                        localStorage.setItem('Access', JSON.stringify(data));
                        //if (sessionStorage.userName == 'ACE') {
                        //    localStorage.setItem('Access', 1);
                        //} else {
                        access = JSON.parse(localStorage.getItem("Access"));
                        //}


                        ajaxFunction(AccessReportUri + sessionStorage.ace + '/' + sessionStorage.group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                            self.AccessListReport(data);
                            if (self.AccessListReport().length > 0) {
                                localStorage.setItem('AccessReport', JSON.stringify(data));
                                accessReport = JSON.parse(localStorage.getItem("AccessReport"));
                                SetValidation();
                                window.location.href = sessionStorage.urlIndex;
                            }
                        });
                    }
                });


            }
        });
}

SetValidation();
SetValidationErj();

function SetValidation() {
    var ShowMenu = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    if (access == null) return false;
    if (access.length == 0) return false;
    sessionStorage.userName == 'ACE' ? access[0].TrsName = 'ADMIN' : null
    //sessionStorage.userName == 'ACE' ? access[0].TrsName = 'ADMIN' : null
    if (access[0].TrsName == 'ADMIN') {
        if (sessionStorage.userName == 'ACE')
            $('#TextNoUser').text('مدیر سیستم');
        else
            $('#TextNoUser').text('مدیر');
    }
    else
        $('#TextNoUser').text('کاربر');

    $('#persionUserName').text(sessionStorage.userName);

    /*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
        afiaccess[2] == 0 && afiaccess[3] == 0 &&
        afiaccess[4] == 0 && afiaccess[5] == 0)
        $("#FDOC_Menu").hide();
    else
        $("#FDOC_Menu").show();


    if (afiaccess[6] == 0 && afiaccess[7] == 0)
        $("#IDOC_Menu").hide();
    else
        $("#IDOC_Menu").show();*/

    validation = CheckAccess('DOC'); //ثبت اسناد
    ShowMenu[0] = validation;

    validation = CheckAccess('FSDOC'); //اسناد فروش
    ShowMenu[1] = validation;

    validation = CheckAccess('FPDOC'); // اسناد خرید
    ShowMenu[2] = validation;

    validation = CheckAccess('RPRT'); // گزارشات
    ShowMenu[11] = validation;

    validation = CheckAccessReport('TiKala');
    ShowMenu[12] = validation;  // گزارش موجودی کالا

    validation = CheckAccess('SPDOC');
    ShowMenu[3] = validation;  // پیش فاکتور قروش

    sessionStorage.AccessSanad = true; // بعد از ایجاد دسترسی پاک شود

    if (sessionStorage.ModeCode == MODECODE_FDOC_SP) {
        validation = CheckAccess('NEW_SPDOC');// new pish Factor forosh
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        validation = CheckAccess('CHG_SPDOC');// edit pish Factor forosh
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation = CheckAccess('DEL_SPDOC'); // delete pish Factor forosh

        validation = CheckAccess('OTHERUSER_SPDOC');
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        //validation = CheckAccess('PRN_SPDOC'); // Print pish Factor forosh
        //validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('AccessSanad_SPDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        sessionStorage.AccessSanad = true;

        validation = CheckAccess('OTHERUSER_SPDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewPishFactorForosh = true;
        }
        else {
            sessionStorage.AccessViewPishFactorForosh = false;
        }
    }

    // OTHERUSER_ADOC

    validation = CheckAccess('SDOC');
    ShowMenu[4] = validation;  //  فاکتور قروش

    if (sessionStorage.ModeCode == MODECODE_FDOC_S) {
        validation = CheckAccess('NEW_SDOC');// new Factor forosh
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        validation = CheckAccess('CHG_SDOC');// edit Factor forosh
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation = CheckAccess('DEL_SDOC'); // delete Factor forosh
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        //validation = CheckAccess('PRN_SDOC'); // Print Factor forosh
        //validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('AccessSanad_SDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        sessionStorage.AccessSanad = true;

        validation = CheckAccess('OTHERUSER_SDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewFactorForosh = true;
        }
        else {
            sessionStorage.AccessViewFactorForosh = false;
        }
    }

    validation = CheckAccess('SRDOC');
    ShowMenu[5] = validation;  // برگشت فاکتور قروش

    if (sessionStorage.ModeCode == MODECODE_FDOC_SR) {
        validation = CheckAccess('NEW_SRDOC');// new back Factor forosh
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        validation = CheckAccess('CHG_SRDOC');// edit back Factor forosh
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation = CheckAccess('DEL_SRDOC'); // delete back Factor forosh
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        //validation = CheckAccess('PRN_SRDOC'); // Print back Factor forosh
        //validation == true ? $("#").show() : $("#").hide()
        validation = CheckAccess('AccessSanad_SRDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        sessionStorage.AccessSanad = true;


        validation = CheckAccess('OTHERUSER_SRDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewBackFactorForosh = true;
        }
        else {
            sessionStorage.AccessViewBackFactorForosh = false;
        }
    }

    validation = CheckAccess('PPDOC');
    ShowMenu[6] = validation;  // پیش فاکتور خرید

    if (sessionStorage.ModeCode == MODECODE_FDOC_PP) {
        validation = CheckAccess('NEW_PPDOC');// new pish Factor kharid
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        validation = CheckAccess('CHG_PPDOC');// edit pish Factor kharid
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation = CheckAccess('DEL_PPDOC'); // delete pish Factor kharid
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        //validation = CheckAccess('PRN_PPDOC'); // Print pish Factor kharid
        //validation == true ? $("#").show() : $("#").hide()
        //validation = CheckAccess('OTHERUSER_PPDOC');// AccessSanad
        //validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false

        validation = CheckAccess('AccessSanad_SRDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        sessionStorage.AccessSanad = true;

        validation = CheckAccess('OTHERUSER_PPDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewPishFactorKharid = true;
        }
        else {
            sessionStorage.AccessViewPishFactorKharid = false;
        }
    }

    validation = CheckAccess('PDOC');
    ShowMenu[7] = validation;  //  فاکتور خرید

    if (sessionStorage.ModeCode == MODECODE_FDOC_P) {
        validation = CheckAccess('NEW_PDOC');// new Factor kharid
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        validation = CheckAccess('CHG_PDOC');// edit Factor kharid
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation = CheckAccess('DEL_PDOC'); // delete Factor kharid
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        //validation = CheckAccess('PRN_PDOC'); // Print Factor kharid
        //validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('AccessSanad_PDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        sessionStorage.AccessSanad = true;


        validation = CheckAccess('OTHERUSER_PDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewFactorKharid = true;
        }
        else {
            sessionStorage.AccessViewFactorKharid = false;
        }
    }


    validation = CheckAccess('PRDOC');
    ShowMenu[8] = validation;  // برگشت فاکتور خرید

    if (sessionStorage.ModeCode == MODECODE_FDOC_PR) {
        validation = CheckAccess('NEW_PRDOC');// new back Factor kharid
        validation == true ? $("#AddNewFactor").show() : $("#AddNewFactor").hide()
        validation = CheckAccess('CHG_PRDOC');// edit back Factor kharid
        validation == true ? $("#UpdateFactor").show() : $("#UpdateFactor").hide()
        validation = CheckAccess('DEL_PRDOC'); // delete back Factor kharid
        validation == true ? $("#DeleteFactor").show() : $("#DeleteFactor").hide()
        //validation = CheckAccess('PRN_PRDOC'); // Print back Factor kharid
        //validation == true ? $("#").show() : $("#").hide()
        validation = CheckAccess('AccessSanad_PRDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        sessionStorage.AccessSanad = true;


        validation = CheckAccess('OTHERUSER_PRDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewBackFactorKharid = true;
        }
        else {
            sessionStorage.AccessViewBackFactorKharid = false;
        }
    }


    validation = CheckAccess('IIDOC');
    ShowMenu[9] = validation;  // وارده انبار

    if (sessionStorage.ModeCode == 'in') {
        validation = CheckAccess('NEW_IIDOC');// new varedae anbar
        validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
        validation = CheckAccess('CHG_IIDOC');// edit varedae anbar
        validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
        validation = CheckAccess('DEL_IIDOC'); // delete varedae anbar
        validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
        //validation = CheckAccess('PRN_IIDOC'); // Print varedae anbar
        //validation == true ? $("#").show() : $("#").hide()


        validation = CheckAccess('AccessSanad_IIDOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        sessionStorage.AccessSanad = true;

        validation = CheckAccess('OTHERUSER_IIDOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewSanadAnbarVarede = true;
            //$('#action_header').removeAttr('style');
            //$('#action_body').removeAttr('style');
            //$('#action_footer').removeAttr('style');
            //$('#action_Hdoc').removeAttr('style');
        }
        else {
            sessionStorage.AccessViewSanadAnbarVarede = false;
            //$('#action_header').attr('style', 'display: none');
            //$('#action_body').attr('style', 'display: none');
            //$('#action_footer').attr('style', 'display: none');
            //$('#action_Hdoc').attr('style', 'display: none');
        }
    }

    // $('#action_header').attr('style', 'display: none');
    //$('#action_body').attr('style', 'display: none');
    //$('#action_footer').attr('style', 'display: none');
    //$('#action_Hdoc').attr('style', 'display: none');

    validation = CheckAccess('IODOC');
    ShowMenu[10] = validation;  // صادره انبار

    if (sessionStorage.ModeCode == 'out') {
        validation = CheckAccess('NEW_IODOC');// new sadere anbar
        validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
        validation = CheckAccess('CHG_IODOC');// edit sadere anbar
        validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
        validation = CheckAccess('DEL_IODOC'); // delete sadere anbar
        validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
        //validation = CheckAccess('PRN_IODOC'); // delete sadere anbar
        // validation == true ? $("#").show() : $("#").hide()

        validation = CheckAccess('AccessSanad_IODOC');// AccessSanad
        validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
        sessionStorage.AccessSanad = true;



        validation = CheckAccess('OTHERUSER_IODOC');// AccessViewSanad
        if (validation == true) {
            sessionStorage.AccessViewSanadAnbarSadere = true;
        }
        else {
            sessionStorage.AccessViewSanadAnbarSadere = false;
        }

    }

    if (access[0].Trs == 0) {
        sessionStorage.AccessSanad = true;
        sessionStorage.AccessViewSanadAnbarVarede = true;
    }

    if (ShowMenu[0]) {
        if (afiaccess[0] == true || afiaccess[1] == true || afiaccess[2] == true || afiaccess[3] == true || afiaccess[4] == true || afiaccess[5] == true) {
            if (ShowMenu[1] || ShowMenu[2]) {
                if (ShowMenu[3] || ShowMenu[4] || ShowMenu[5] || ShowMenu[6] || ShowMenu[7] || ShowMenu[8]) {
                    $("#FDOC_Menu").show();
                    (ShowMenu[3] == true) && (afiaccess[0] == true) ? $("#FDOC_S").show() : $("#FDOC_S").hide();
                    (ShowMenu[4] == true) && (afiaccess[1] == true) ? $("#FDOC_SP").show() : $("#FDOC_SP").hide();
                    (ShowMenu[5] == true) && (afiaccess[2] == true) ? $("#FDOC_SR").show() : $("#FDOC_SR").hide();
                    (ShowMenu[6] == true) && (afiaccess[3] == true) ? $("#FDOC_P").show() : $("#FDOC_P").hide();
                    (ShowMenu[7] == true) && (afiaccess[4] == true) ? $("#FDOC_PP").show() : $("#FDOC_PP").hide();
                    (ShowMenu[8] == true) && (afiaccess[5] == true) ? $("#FDOC_PR").show() : $("#FDOC_PR").hide();
                }
                else {
                    $("#FDOC_Menu").hide();
                }
            }
            else {
                $("#FDOC_Menu").hide();
            }
        }
        else {
            $("#FDOC_Menu").hide();
        }


        if (afiaccess[6] == true || afiaccess[7] == true) {
            if (ShowMenu[9] || ShowMenu[10]) {
                $("#IDOC_Menu").show();
                (ShowMenu[9] == true) && (afiaccess[6] == true) ? $("#IDOC_I").show() : $("#IDOC_I").hide();
                (ShowMenu[10] == true) && (afiaccess[7] == true) ? $("#IDOC_O").show() : $("#IDOC_O").hide();
            }
            else {
                $("#IDOC_Menu").hide();
            }
        }
        else {
            $("#IDOC_Menu").hide();
        }
    }
    else {
        $("#FDOC_Menu").hide();
        $("#IDOC_Menu").hide();
    }

    if (ShowMenu[11]) {    // گزارشات
        if (afiaccess[8] == true) {
            if (ShowMenu[11]) {
                $("#IReport_Menu").show();
                ShowMenu[12] == true ? $("#TrzIKala").show() : $("#TrzIKala").hide();
            }
            else {
                $("#IReport_Menu").hide();
            }
        }
        else {
            $("#IReport_Menu").hide();
        }
    }

    // window.location.href = sessionStorage.urlIndex;

    /*if (afiaccess[0] == 0 && afiaccess[1] == 0 &&
   afiaccess[2] == 0 && afiaccess[3] == 0 &&
   afiaccess[4] == 0 && afiaccess[5] == 0)
   $("#FDOC_Menu").hide();
else
   $("#FDOC_Menu").show();


if (afiaccess[6] == 0 && afiaccess[7] == 0)
   $("#IDOC_Menu").hide();
else
   $("#IDOC_Menu").show();*/

}


function SetValidationErj() {
    var ShowMenuErj = [false, false];
    if (accessErj == null) return false;
    if (accessErj.length == 0) return false;
    sessionStorage.userName == 'ACE' ? accessErj[0].TrsName = 'ADMIN' : null

    if (accessErj[0].Trs == 0) {
        sessionStorage.AccessSanadErj = true;
    }

    validation = CheckAccessReportErj('DocK');
    ShowMenuErj[1] = validation;  // گزارش فهرست پرونده

    if (ShowMenuErj[1]) {
        if (erjaccess[1] == true) {
            $("#EReport_Menu").show();
        }
        else {
            $("#EReport_Menu").hide();
        }
    }
}





$("#FDOC_SP").click(function () {
    sessionStorage.ModeCode = MODECODE_FDOC_SP;
});

$("#FDOC_S").click(function () {
    sessionStorage.ModeCode = MODECODE_FDOC_S;
});

$("#FDOC_SR").click(function () {
    sessionStorage.ModeCode = MODECODE_FDOC_SR;
});

$("#FDOC_PP").click(function () {
    sessionStorage.ModeCode = MODECODE_FDOC_PP;
});

$("#FDOC_P").click(function () {
    sessionStorage.ModeCode = MODECODE_FDOC_P;
});

$("#FDOC_PR").click(function () {
    sessionStorage.ModeCode = MODECODE_FDOC_PR;
});

$("#IDOC_I").click(function () {
    sessionStorage.ModeCode = 'in';
});

$("#IDOC_O").click(function () {
    sessionStorage.ModeCode = 'out';
});


//MODECODE_IDOC_AVAL = 101 'موجودي اول دوره';
//MODECODE_IDOC_I: 102 'رسيد ورود به انبار';
//MODECODE_IDOC_ISR: 103 'برگشت فروش به انبار';
//MODECODE_IDOC_IMOVE: 106  'انتقال به انبار';
//MODECODE_IDOC_IP: 108 'رسيد خريد';
//MODECODE_IDOC_IMAHSOOL: 110 'رسيد محصول';

//MODECODE_IDOC_O: 104 'حواله خروج از انبار';
//MODECODE_IDOC_OPR: 105 'برگشت خريد از انبار';
//MODECODE_IDOC_OMOVE: 107 'انتقال از انبار';
//MODECODE_IDOC_OS: 109 'حواله فروش';
//MODECODE_IDOC_OMAVAD: 111 'حواله مواد';

function ShamsiDate() {
    d = new Date();
    date = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate(), 'Short');
    date.jm <= 9 ? mah = '0' + date.jm : mah = date.jm;
    date.jd <= 9 ? day = '0' + date.jd : day = date.jd;
    temp = date.jy + '/' + mah + '/' + day;
    return temp;
}



function showNotification(text, colorNumber) {

    placementFrom = sessionStorage.placementFrom;
    placementAlign = sessionStorage.placementAlign;
    animateEnter = sessionStorage.animateEnter;
    animateExit = sessionStorage.animateExit;
    if (colorNumber == 0)
        colorName = 'alert-danger';
    else if (colorNumber == 1)
        colorName = 'alert-success';
    else if (colorNumber == 2)
        colorName = 'alert-warning';
    else if (colorNumber == 3)
        colorName = 'alert-info';

    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'خطای برنامه نویسی : متن هشدار وارد نشده است'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
        message: text
    },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: 1000,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            animate: {
                enter: animateEnter,
                exit: animateExit
            },
            template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
}

/*$(function () {
    //Textare auto growth
    autosize($('textarea.auto-growth'));

    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY - HH:mm',
        clearButton: true,
        rtl: true,
        weekStart: 1
    });

    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    $('.datepicker2').bootstrapMaterialDatePicker({
        format: 'DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        rtl: true,
        time: false
    });

    $('.timepicker').bootstrapMaterialDatePicker({
        format: 'HH:mm',
        clearButton: true,
        rtl: true,
        date: false
    });

    $('input#input_text, textarea#textarea2').characterCounter();
});*/


/*

$("#ace0").click(function () {
    $("#group").empty();
    $("#sal").empty();
    $.ajax({
        type: 'POST',
        url: '/Home/GetGroup',//'@Url.Action("GetGroup")',//نام تابع با خروجی جیسون
        dataType: 'json',
        data: { ace: $("#ace").val() },
        success: function (mems) {
            $.each(mems, function (i, member) {
                $("#group").append('<option value="'
                    + member.Value + '">'
                    + member.Text + '</option>');
            });
        },
        error: function (ex) {
            Swal.fire({ type: 'info', title: 'توجه', text: 'انتخاب نرم افزار اجباری است' });
        }
    });
});


$("#group0").click(function () {
    var ace = $("#ace").val();
    var group = $("#group").val();
    $("#sal").empty();
    ajaxFunction(DatabseSalUrl + ace + '/' + group, 'GET').done(function (data) {
        self.DatabseSalList(data);
        if (self.DatabseSalList().length > 0) {

            for (var i = 1; i < self.DatabseSalList().length + 1; i++) {
                var sal = self.DatabseSalList()[i - 1];
                $("#sal").append('<option value="'
                    + sal.Name + '">'
                    + sal.Name + '</option>');
            }

        }//else{
        //    Swal.fire({ type: 'info', title: 'توجه', text: 'انتخاب نرم افزار اجباری است' });
        //}
    });
});
*/



$('#FDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 1;
});

$('#IDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 2;
});

$('#Setting_Menu').click(function () {
    sessionStorage.SelectMenu = 3;
});

$('#IReport_Menu').click(function () {
    sessionStorage.SelectMenu = 4;
});


if (sessionStorage.SelectMenu == 1) {
    $('#FDOC_Menu').attr('class', 'active');
    $('#IDOC_Menu').removeAttr('class');
    $('#IReport_Menu').removeAttr('class');
    //$('#Setting_Menu').removeAttr('class');
}
else if (sessionStorage.SelectMenu == 2) {
    $('#IDOC_Menu').attr('class', 'active');
    $('#FDOC_Menu').removeAttr('class');
    $('#IReport_Menu').removeAttr('class');
    //$('#Setting_Menu').removeAttr('class');
}
else if (sessionStorage.SelectMenu == 3) {
    //$('#Setting_Menu').attr('class', 'active');
    $('#FDOC_Menu').removeAttr('class');
    $('#IDOC_Menu').removeAttr('class');
    $('#IReport_Menu').removeAttr('class');
}
else if (sessionStorage.SelectMenu == 4) {
    //$('#Setting_Menu').attr('class', 'active');
    $('#IReport_Menu').attr('class', 'active');
    $('#FDOC_Menu').removeAttr('class');
    $('#IDOC_Menu').removeAttr('class');
}
else {
    $('#FDOC_Menu').removeAttr('class');
    $('#IDOC_Menu').removeAttr('class');
    $('#IReport_Menu').removeAttr('class');
    //$('#Setting_Menu').removeAttr('class');
}

$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
    });
};








