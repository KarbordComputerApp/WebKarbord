var TestFDocList; //لیست خطا ها
var cols;

//اطلاعات سلول
//var dataGrid = $("#gridContainer").dxDataGrid("instance");
//cellValue = dataGrid.cellValue(ro, 'KalaCode');

var ViewModel = function () {
    var self = this;


    var arzCalcMode = localStorage.getItem("ArzCalcMode");

    var forSels = true;

    var viewAction = false;
    var allSearchCust = true;
    var allSearchKala = true;
    var flagSaveLogWin = false;

    var flagupdateHeader;
    var flagOtherFieldShow;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;

    if (sessionStorage.CHG == null) {
        sessionStorage.CHG = localStorage.getItem("CHG")
        sessionStorage.AccessPrint_Factor = localStorage.getItem("AccessPrint_Factor")
    }

    var resTestNew = false;

    var flaglog = "Y";

    if (sessionStorage.flagCopy == 'Y')
        flaglog = "N";

    if (ace == 'Web1') {
        $('#docnoout').attr('class', 'form-control int');
    }
    else {
        $('#docnoout').attr('class', 'form-control ShomarehSanad');
    }

    if (lang == 'en') {
        $("#docnoout").addClass("right-to-left");
    }

    $('#textnumberfactor').hide();
    $('#finalSave_Title').attr('hidden', '');

    TestUser();


    var codeCust = '';
    var codeOpr = '';
    var codeMkz = '';
    var codeVstr = '';
    var codeArz = '';
    var arzRate = 0;

    var zarib1 = 0;
    var zarib2 = 0;
    var zarib3 = 0;

    var DeghatR1 = 0;
    var DeghatR2 = 0;
    var DeghatR3 = 0;

    var DeghatM1 = 0;
    var DeghatM2 = 0;
    var DeghatM3 = 0;

    var Price1;
    var Price2;
    var Price3;

    var totalPrice;
    var discountprice;
    var discountCol = 0;
    var oldAddMinPrice = 0;

    var amountTextUpdate = "";
    var amountValueUpdate = "";

    var flagEditBand = false;

    var FDocHKAmount1 = 0;
    var FDocHAmount2 = 0;
    var FDocHAmount3 = 0;
    var FDocHTotalPrice = 0;
    var FDocHFinalPrice = 0;
    var FDocHDiscount = 0;
    var sumFactor = 0;

    var dataAddMin;
    var dataAddminCust = [];
    var dataAddminKala = [];

    var unitvalue = "";

    var KalaCode = '';
    var kalapricecode = 0;

    var bandnumber = 0;
    var bandnumberedit = 0;

    var flagFinalSave = false;

    var flagKalaPrice = false;
    var ModeCodeExtraFields = '';

    var flag = -1;
    var flagdiscount = -1;
    var flagInsertFdoch = 0;

    var accessTaeed = false;
    var accessTasvib = false;
    var accessCancel = false;

    var firstUpdateShow;
    self.flagupdateband = false;
    var amountAfterBarCode;

    self.SerialNumber = ko.observable();
    var Serial = '';

    var KalaList;
    var FDocB;
    var Addmin;
    var KalaUnitList = [];// [{ 'ID': 1, 'Name': 'a' }, { 'ID': 2, 'Name': 'b' }, { 'ID': 3, 'Name': 'c' }];
    //var KalaUnitList = [{}];
    // var KalaUnitList = [{ 'Name': '1'}];

    self.DocNoOut = ko.observable();

    self.DocDate = ko.observable(DateNow);
    self.Spec = ko.observable();
    self.CustCode = ko.observable();

    self.OprCode = ko.observable();
    self.MkzCode = ko.observable();
    self.VstrCode = ko.observable();
    self.ArzCode = ko.observable();
    self.ArzRate = ko.observable();

    self.PriceCode = ko.observable();
    self.InvCode = ko.observable();
    self.StatusFactor = ko.observable();
    self.PaymentFactor = ko.observable();

    self.CustList = ko.observableArray([]); // لیست حساب ها
    self.KalaList = ko.observableArray([]); // لیست کالاها
    self.KalaPriceList = ko.observableArray([]); // لیست گروه قیمت
    self.KalaPriceBList = ko.observableArray([]); // قیمت کالا بر اساس گروه قیمت
    self.FDocBList = ko.observableArray([]); // لیست فاکتور
    self.FDocB = ko.observableArray([]); // لیست فاکتور
    self.InvList = ko.observableArray([]); // لیست انبارها
    self.AddMinList = ko.observableArray([]); // لیست کسورات و افزایشات 
    self.FDocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش  
    self.PaymentList = ko.observableArray([]); // لیست نحوه پرداخت 
    self.StatusList = ko.observableArray([]); // لیست وضعیت پرداخت 
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.VstrList = ko.observableArray([]); // لیست ویزیتور

    self.FDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    //self.TestFDocList = ko.observableArray([]); // لیست تست 
    self.TestFDoc_NewList = ko.observableArray([]); // لیست تست جدید
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.ArzList = ko.observableArray([]); // لیست ارز ها

    FDOC_SO_Text = translate("سفارش فروش");
    FDOC_SP_Text = translate("پیش فاکتور فروش");
    FDOC_S_Text = translate("فاکتور فروش");
    FDOC_SR_Text = translate("برگشت از فروش");
    FDOC_SH_Text = translate("حواله فروش");
    FDOC_SE_Text = translate("برگه خروج");
    FDOC_PO_Text = translate("سفارش خرید");
    FDOC_PP_Text = translate("پیش فاکتور خرید");
    FDOC_P_Text = translate("فاکتور خرید");
    FDOC_PR_Text = translate("برگشت از خرید");

    switch (sessionStorage.ModeCode.toString()) {
        case sessionStorage.MODECODE_FDOC_SO:
            textFactor = FDOC_SO_Text;
            ModeCodeExtraFields = 'FSDOC';
            amountAfterBarCode = sessionStorage.FDOCSOAmountAfterBarCode;
            break;
        case sessionStorage.MODECODE_FDOC_SP:
            textFactor = FDOC_SP_Text;
            amountAfterBarCode = sessionStorage.FDOCSPAmountAfterBarCode;
            //ModeCodeExtraFields = 'FDOCSP';
            ModeCodeExtraFields = 'FSDOC';
            break;
        case sessionStorage.MODECODE_FDOC_S:
            textFactor = FDOC_S_Text;
            //ModeCodeExtraFields = 'FSDOC';
            amountAfterBarCode = sessionStorage.FDOCSAmountAfterBarCode;
            ModeCodeExtraFields = 'FSDOC';
            break;
        case sessionStorage.MODECODE_FDOC_SR:
            textFactor = FDOC_SR_Text;
            amountAfterBarCode = sessionStorage.FDOCSRAmountAfterBarCode;
            ModeCodeExtraFields = 'FSDOC';
            break;
        case sessionStorage.MODECODE_FDOC_SH:
            textFactor = FDOC_SH_Text;
            amountAfterBarCode = sessionStorage.FDOCSHAmountAfterBarCode;
            ModeCodeExtraFields = 'FSDOC';
            break;
        case sessionStorage.MODECODE_FDOC_SE:
            textFactor = FDOC_SE_Text;
            amountAfterBarCode = sessionStorage.FDOCSEAmountAfterBarCode;
            ModeCodeExtraFields = 'FSDOC';
            break;
        case sessionStorage.MODECODE_FDOC_PO:
            textFactor = FDOC_PO_Text;
            amountAfterBarCode = sessionStorage.FDOCPOAmountAfterBarCode;
            ModeCodeExtraFields = 'FPDOC';
            break;
        case sessionStorage.MODECODE_FDOC_PP:
            textFactor = FDOC_PP_Text;
            amountAfterBarCode = sessionStorage.FDOCPPAmountAfterBarCode;
            ModeCodeExtraFields = 'FPDOC';
            break;
        case sessionStorage.MODECODE_FDOC_P:
            textFactor = FDOC_P_Text;
            amountAfterBarCode = sessionStorage.FDOCPAmountAfterBarCode;
            ModeCodeExtraFields = 'FPDOC';
            break;
        case sessionStorage.MODECODE_FDOC_PR:
            textFactor = FDOC_PR_Text;
            ModeCodeExtraFields = 'FPDOC';
            amountAfterBarCode = sessionStorage.FDOCPRAmountAfterBarCode;
            break;
    }

    $('#TitleHeaderFactor').text(textFactor + " ");
    $('#TitleBodyFactor').text(textFactor + " ");
    $('#TitleFooterFactor').text(textFactor + " ");
    $('#titlePage').text(textFactor + " " + translate("جدید"));

    $("#Panel_Barcode_Amount").attr('hidden', '');




    if (amountAfterBarCode == "1")
        $("#Panel_Barcode_Amount").removeAttr('hidden', '');

    if (sessionStorage.InOut == 2) {

        $('#LableCustCode').text(translate('خریدار'));
        $('#LableCustCode').text(translate('نام خریدار'));
        $('#TitleModalCust').text(translate('لیست خریداران'));
        $('#TitleCodeTableModalCust').text(translate('کد خریدار'));
        $('#TitleNameTableModalCust').text(translate('نام خریدار'));
        sessionStorage.sels = "true";
    } else {
        $('#LableCustCode').text(translate('فروشنده'));
        $('#LableCustCode').text(translate('نام فروشنده'));
        $('#TitleModalCust').text(translate('لیست فروشندگان'));
        $('#TitleCodeTableModalCust').text(translate('کد فروشنده'));
        $('#TitleNameTableModalCust').text(translate('نام فروشنده'));
        sessionStorage.sels = "false";
    }


    var FDocHUri = server + '/api/AFI_FDocHi/'; // آدرس هدر فاکتور 
    var FDocBUri = server + '/api/AFI_FDocBi/'; // آدرس بند فاکتور 
    var UpdatePriceUri = server + '/api/FDocData/UpdatePrice/'; // آدرس اعمال گروه قیمت
    var FDocHListUri = server + '/api/FDocData/FDocH/'; //آدرس اطلاعات فاکتور  
    var FDocBListUri = server + '/api/FDocData/FDocB/'; // آدرس لیست بند های فاکتور 
    var FDocHLastDateUri = server + '/api/FDocData/FDocH/LastDate/'; // آدرس آخرین تاریخ سند

    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس حساب
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var KalaPriceUri = server + '/api/Web_Data/KalaPrice/'; // آدرس گروه قیمت
    var KalaPriceBUri = server + '/api/Web_Data/KalaPriceB/'; //  آدرس  قیمت کالا بر اساس گروه قیمت
    var UnitUri = server + '/api/Web_Data/Unit/'; // آدرس واحد کالا 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var AddMinUri = server + '/api/Web_Data/AddMin/'; // آدرس کسورات و افزایشات 
    var TashimBandUri = server + '/api/Web_Data/TashimBand/'; // آدرس تسهیم بند 

    var PaymentUri = server + '/api/Web_Data/Payment/'; // آدرس نحوه پرداخت 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت پرداخت 

    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var FDocPUri = server + '/api/FDocData/FDocP/'; // آدرس ویوی چاپ سند 

    var TestFDocUri = server + '/api/FDocData/TestFDoc/'; // آدرس تست فاکتور 
    var TestFDoc_NewUri = server + '/api/FDocData/TestFDoc_New/'; // آدرس تست ایجاد فاکتور 
    var TestFDoc_EditUri = server + '/api/FDocData/TestFDoc_Edit/'; // آدرس تست ویرایش 

    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var VstrUri = server + '/api/Web_Data/Vstr/'; // آدرس ویزیتور 

    var V_Del_FDocUri = server + '/api/Web_Data/V_Del_FDoc/'; // آدرس ویزیتور 

    var SaveFDoc_HZUri = server + '/api/FDocData/SaveFDoc_HZ/'; // آدرس ویرایس ستون تنظیم



    var FDocBSaveAllUri = server + '/api/AFI_FDocBi/SaveAllDocB/'; // آدرس ذخیره یند فاکتور 
    var FDocBConvertUri = server + '/api/AFI_FDocBi/Convert/'; // آدرس ذخیره یند فاکتوردر جدول اصلی 

    var UnitNameUri = server + '/api/Web_Data/Web_UnitName/'; // آدرس عنوان واحد ها 
    var FChangeStatusUri = server + '/api/FDocData/ChangeStatus/'; // آدرس تغییر وضعیت اسناد 
    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها


    function getExtraFieldsList() {
        var rprtId = sessionStorage.InOut == 1 ? 'FDocH_P' : 'FDocH_S';
        cols = getRprtCols(rprtId, sessionStorage.userName);
        result = ko.utils.arrayFilter(cols, function (item) {
            result =
                (ko.utils.stringStartsWith(item.Code, 'F0') ||
                    ko.utils.stringStartsWith(item.Code, 'F1') ||
                    ko.utils.stringStartsWith(item.Code, 'F2')) &&
                item.Name != ''
            return result;
        })
        self.ExtraFieldsList(result);
    }
    getExtraFieldsList();

    //Get Cust List
    function getCustList() {
        var CustObject = {
            forSale: sessionStorage.InOut == 2 ? true : false,
            updatedate: null,
            Mode: 2,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CustUri + ace + '/' + sal + '/' + group, 'POST', CustObject, false).done(function (data) {
            self.CustList(data == null ? [] : data);
        });
    }

    $('#btnCust').click(function () {
        if (self.CustList().length == 0) {
            getCustList();
        }
    });



    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            self.OprList(data == null ? [] : data);
        });
    }

    $('#btnOpr').click(function () {
        if (self.OprList().length == 0) {
            getOprList();
        }
    });


    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            self.MkzList(data == null ? [] : data);
        });
    }


    $('#btnMkz').click(function () {
        if (self.MkzList().length == 0) {
            getMkzList();
        }
    });


    //Get  Vstr List
    function getVstrList() {
        ajaxFunction(VstrUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            self.VstrList(data == null ? [] : data);
        });
    }

    $('#btnVstr').click(function () {
        if (self.VstrList().length == 0) {
            getVstrList();
        }
    });


    //Get Arz List
    function getArzList() {
        ajaxFunction(ArzUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.ArzList(data);
        });
    }

    $('#btnArz').click(function () {
        if (self.ArzList().length == 0) {
            getArzList();
        }
    });

    //Get  UnitName List
    function getUnitNameList() {
        ajaxFunction(UnitNameUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            KalaUnitList = data;
        });
    }

    getUnitNameList();



    function getUnit(codeKala) {
        ajaxFunction(UnitUri + ace + '/' + sal + '/' + group + '/' + codeKala, 'GET').done(function (data) {
            KalaUnitList = data;
        });
    }





    //Get kala List
    function getKalaList() {
        var KalaObject = {
            withimage: false,
            updatedate: null,
            Mode: 2,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject, false).done(function (data) {
            self.KalaList(data);
            KalaList = data;
        });
    }



    // usage example:
    var a = ['a', 1, 'a', 2, '1'];


    getKalaList();



    //Get Payment List
    function getPaymentList() {
        ajaxFunction(PaymentUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.PaymentList(data);
            if (self.PaymentList().length > 0) {
            }
        });
    }
    getPaymentList();


    function getStatusList() {
        list = localStorage.getItem('FctStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('FctStatus'));
            self.StatusList(list)
        }
        else {
            progName = getProgName('A');
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
                self.StatusList(data);
                localStorage.setItem("FctStatus", JSON.stringify(data));
            });
        }
    }

    getStatusList();



    //Get KalaPrice List
    function getKalaPriceList(insert) {
        ajaxFunction(KalaPriceUri + ace + '/' + sal + '/' + group + '/' + insert, 'GET').done(function (data) {
            self.KalaPriceList(data);
            if (self.KalaPriceList().length > 0) {
                if (flagupdateHeader == 1) {
                    firstUpdateShow = 1;
                    sessionStorage.PriceCode != "0" ? $("#gGhimat").val(sessionStorage.PriceCode) : $("#gGhimat").val(sessionStorage.GPriceDefult);
                }
                else
                    firstUpdateShow = 0;
                if (sessionStorage.sels == "true")
                    sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                else
                    sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultP);
            }
        });
    }

    self.OptionsCaptionKalaPrice = ko.computed(function () {
        return translate('قیمت اطلاعات پایه');
    });


    flagupdateHeader == 1 ? getKalaPriceList(false) : getKalaPriceList(true);



    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/2/' + sessionStorage.userName, 'GET').done(function (data) {
            $("div.loadingZone").hide();
            self.InvList(data);
            if (self.InvList().length > 0) {
                if (flagupdateHeader == 1) {
                    $("#inv").val(sessionStorage.InvCode);
                    self.InvCode(sessionStorage.InvCode);
                }
                else {
                    if (sessionStorage.InvDefult != "null") $("#inv").val(sessionStorage.InvDefult);
                }
            }
        });
    }
    self.OptionsCaptionAnbar = ko.computed(function () {
        return self.InvList().length > 0 ? translate('انبار را انتخاب کنید') : translate('انبار تعریف نشده است');
    });
    getInvList();



    $("#inv").change(function () {
        flagFinalSave = false;

        if (firstUpdateShow == 1)
            firstUpdateShow = 0;
    })

    $("#sumFactor").text('');

    $("#gGhimat").change(function () {
        if ($("#sumFactor").text() != '' && viewAction == true && firstUpdateShow == 0) {
            Swal.fire({
                title: translate('تایید تغییرات ؟'),
                text: translate("قیمت تمام کالاها با قیمت های ثبت شده در گروه قیمت کالای انتخاب شده پر می شوند آیا مطمئن هستید ؟"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    SetKalaPrice();

                }
                else {
                    kalapricecode == '0' ? kalapricecode = '' : kalapricecode = kalapricecode;
                    $("#gGhimat").val(kalapricecode);
                    kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                }
            })
        }

    })

    function SetKalaPrice() {
        //kalapricecode = $("#gGhimat").val();

        kalapricecode = $("#gGhimat").val() == "" ? 0 : $("#gGhimat").val();

        flagKalaPrice = true;

        for (var i = 0; i < FDocB.length; i++) {
            if (FDocB[i].KalaCode != "" && FDocB[i].KalaCode != null) {


                if (kalapricecode == null || kalapricecode == "") {
                    if (sessionStorage.sels == "true") {
                        Price1 = parseFloat(FDocB[i].dataKala.SPrice1);
                        Price2 = parseFloat(FDocB[i].dataKala.SPrice2);
                        Price3 = parseFloat(FDocB[i].dataKala.SPrice3);
                    } else {
                        Price1 = parseFloat(FDocB[i].dataKala.PPrice1);
                        Price2 = parseFloat(FDocB[i].dataKala.PPrice2);
                        Price3 = parseFloat(FDocB[i].dataKala.PPrice3);
                    }

                    if (FDocB[i].MainUnit == 1) FDocB[i].UnitPrice = Price1;
                    else if (FDocB[i].MainUnit == 2) FDocB[i].UnitPrice = Price2;
                    else if (FDocB[i].MainUnit == 3) FDocB[i].UnitPrice = Price3;
                }
                else {
                    ajaxFunction(KalaPriceBUri + ace + '/' + sal + '/' + group + '/' + kalapricecode + '/' + FDocB[i].KalaCode, 'GET').done(function (data) {
                        FDocB[i].UP_Flag = true;
                        FDocB[i].UnitPrice = 0;
                        if (data.length > 0) {
                            if (FDocB[i].MainUnit == 1) FDocB[i].UnitPrice = data[0].Price1;
                            else if (FDocB[i].MainUnit == 2) FDocB[i].UnitPrice = data[0].Price2;
                            else if (FDocB[i].MainUnit == 3) FDocB[i].UnitPrice = data[0].Price3;
                        }
                    });
                }
                CalcPrice(i);
            }
        }

        dataGrid.refresh();
        CalcFactor();
    }



    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {
        if (lastStatus != "") {
            if (Serial == 0) {
                $("#status").val(lastStatus);
                return showNotification(translate('ابتدا فاکتور را ذخیره کنید'), 0);
            }

            selectStatus = $("#status").val();
            if (accessTaeed == false && selectStatus == translate('تایید')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی تایید ندارید'), 0);
            }

            if (accessCancel == false && selectStatus == translate('باطل')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی باطل ندارید'), 0);
            }

            if (accessTasvib == false && selectStatus == translate('تصویب')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی تصویب ندارید'), 0);
            }

            if (sessionStorage.Status != translate('تایید') && selectStatus == translate('تصویب')) {
                $("#status").val(lastStatus);
                return showNotification(translate('فقط فاکتور های تایید شده امکان تصویب دارند'), 0);
            }


            var StatusChangeObject = {
                DMode: 0,
                UserCode: sessionStorage.userName,
                SerialNumber: Serial,
                Status: selectStatus,
            };

            ajaxFunction(FChangeStatusUri + ace + '/' + sal + '/' + group, 'POST', StatusChangeObject).done(function (response) {
                item = response;
                sessionStorage.Status = selectStatus;
                lastStatus = "";
                showNotification(translate('وضعیت ' + textFactor + ' ' + selectStatus + ' شد'), 1);
            });
        }





    });


    //Get KalaPriceB List
    function getKalaPriceBList(codeKala) {
        kalapricecode = $("#gGhimat").val() == "" ? 0 : $("#gGhimat").val();
        ajaxFunction(KalaPriceBUri + ace + '/' + sal + '/' + group + '/' + kalapricecode + '/' + codeKala, 'GET').done(function (data) {
            self.KalaPriceBList(data);
            if (self.KalaPriceBList().length > 0) { // اگر شامل گروه قیمت بود
                var dataPrice = self.KalaPriceBList()[0];
                Price1 = parseFloat(dataPrice.Price1);
                Price2 = parseFloat(dataPrice.Price2);
                Price3 = parseFloat(dataPrice.Price3);
            }
            else if (kalapricecode > 0) {// اگر شامل گروه قیمت نبود
                Price1 = 0;
                Price2 = 0;
                Price3 = 0;
            }
            if (self.flagupdateband == false)
                Price1 > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        });
    }


    //Get FDocP List
    function getFDocP(serialNumber) {
        ajaxFunction(FDocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.FDocPList(data);
        });
    }

    //Get AddMin List
    function getAddMinList(forSale, serialNumber, custCode, typeJob, isUpdate,
        spec1, spec2, spec3, spec4, spec5, spec6, spec7, spec8, spec9, spec10,
        MP1, MP2, MP3, MP4, MP5, MP6, MP7, MP8, MP9, MP10) {

        if (custCode == '')
            custCode = 0;

        if (serialNumber == '')
            serialNumber = -1;

        var CalcAddminObject = {
            forSale: forSale,
            serialNumber: serialNumber,
            custCode: custCode,
            typeJob: typeJob,
            spec1: spec1,
            spec2: spec2,
            spec3: spec3,
            spec4: spec4,
            spec5: spec5,
            spec6: spec6,
            spec7: spec7,
            spec8: spec8,
            spec9: spec9,
            spec10: spec10,
            MP1: MP1,
            MP2: MP2,
            MP3: MP3,
            MP4: MP4,
            MP5: MP5,
            MP6: MP6,
            MP7: MP7,
            MP8: MP8,
            MP9: MP9,
            MP10: MP10,
            flagTest: isUpdate == true ? 'N' : 'Y'
        };

        discountCol = 0;
        $("#discountCol").text(0);
        $('#ghabelpardakht').text(0);
        //getFDocH(Serial == '' ? -1 : Serial);
        ajaxFunction(AddMinUri + ace + '/' + sal + '/' + group, 'POST', CalcAddminObject).done(function (data) {
            if (data.length > 0) {
                Addmin = JSON.parse(data);
                for (var i = 0; i < Addmin.length; i++) {
                    if (Addmin[i].Mode == 1) {
                        Addmin[i].AddMinPrice = Math.abs(Addmin[i].AddMinPrice);
                        Addmin[i].Mode = '-';
                    }
                    else
                        Addmin[i].Mode = '+';
                }
                CreateTableAddminColumn();
                self.AddMinList(Addmin);
                var dataAddminTemp = self.AddMinList()[0];
                discountCol = dataAddminTemp.SumDiscount;
                $("#discountCol").text(NumberToNumberString(discountCol.toFixed(parseInt(sessionStorage.Deghat))));
                $('#ghabelPardakht').text(NumberToNumberString(parseFloat(sumFactor + discountCol).toFixed(parseInt(sessionStorage.Deghat))))
            }
        });
    }



    //Get TashimBand List
    function TashimBand() {


        var CalcTashimBandObject = {
            ForSale: sessionStorage.sels,
            SerialNumber: Serial_Test,
            Deghat: sessionStorage.Deghat,
            MP1: Addmin.length >= 1 ? Addmin[0].Mode == '-' ? Addmin[0].AddMinPrice * -1 : Addmin[0].AddMinPrice : 0,
            MP2: Addmin.length >= 2 ? Addmin[1].Mode == '-' ? Addmin[1].AddMinPrice * -1 : Addmin[1].AddMinPrice : 0,
            MP3: Addmin.length >= 3 ? Addmin[2].Mode == '-' ? Addmin[2].AddMinPrice * -1 : Addmin[2].AddMinPrice : 0,
            MP4: Addmin.length >= 4 ? Addmin[3].Mode == '-' ? Addmin[3].AddMinPrice * -1 : Addmin[3].AddMinPrice : 0,
            MP5: Addmin.length >= 5 ? Addmin[4].Mode == '-' ? Addmin[4].AddMinPrice * -1 : Addmin[4].AddMinPrice : 0,
            MP6: Addmin.length >= 6 ? Addmin[5].Mode == '-' ? Addmin[5].AddMinPrice * -1 : Addmin[5].AddMinPrice : 0,
            MP7: Addmin.length >= 7 ? Addmin[6].Mode == '-' ? Addmin[6].AddMinPrice * -1 : Addmin[6].AddMinPrice : 0,
            MP8: Addmin.length >= 8 ? Addmin[7].Mode == '-' ? Addmin[7].AddMinPrice * -1 : Addmin[7].AddMinPrice : 0,
            MP9: Addmin.length >= 9 ? Addmin[8].Mode == '-' ? Addmin[8].AddMinPrice * -1 : Addmin[8].AddMinPrice : 0,
            MP10: Addmin.length >= 10 ? Addmin[9].Mode == '-' ? Addmin[9].AddMinPrice * -1 : Addmin[9].AddMinPrice : 0,
        };

        ajaxFunction(TashimBandUri + ace + '/' + sal + '/' + group, 'POST', CalcTashimBandObject).done(function (data) {

        });
    }




    //Get FDocH
    function getFDocH(serialNumber) {
        ajaxFunction(FDocHListUri + ace + '/' + sal + '/' + group + '/' + serialNumber + '/' + sessionStorage.ModeCode, 'GET').done(function (data) {
            self.FDocHList(data);

            if (self.FDocHList().length > 0) { // اگر شامل اطلاعات فاکتور بود
                dataFDocH = self.FDocHList()[0];
                dataFDocH.Amount1 != null ? FDocHAmount1 = dataFDocH.Amount1 : FDocHAmount1 = 0;
                dataFDocH.Amount2 != null ? FDocHAmount2 = dataFDocH.Amount2 : FDocHAmount2 = 0;
                dataFDocH.Amount3 != null ? FDocHAmount3 = dataFDocH.Amount3 : FDocHAmount3 = 0;
                dataFDocH.TotalPrice != null ? FDocHTotalPrice = dataFDocH.TotalPrice : FDocHTotalPrice = 0;
                dataFDocH.Discount != null ? FDocHDiscount = dataFDocH.Discount : FDocHDiscount = 0;
                dataFDocH.FinalPrice != null ? FDocHFinalPrice = dataFDocH.FinalPrice : FDocHFinalPrice = 0;
                // FDocHAmount1 == 0 ? $('#foottextsum').text('') : $('#foottextsum').text(translate('جمع'));
                //FDocHAmount1 == 0 ? $('#foottextamount1').text('') : $('#foottextamount1').text(NumberToNumberString(FDocHAmount1.valueOf()));
                // FDocHAmount2 == 0 ? $('#foottextamount2').text('') : $('#foottextamount2').text(NumberToNumberString(FDocHAmount2.valueOf()));
                // FDocHAmount3 == 0 ? $('#foottextamount3').text('') : $('#foottextamount3').text(NumberToNumberString(FDocHAmount3.valueOf()));
                // FDocHTotalPrice == 0 ? $('#foottexttotalprice').text('') : $('#foottexttotalprice').text(NumberToNumberString(parseFloat(FDocHTotalPrice).toFixed(parseInt(sessionStorage.Deghat))));
                // FDocHDiscount == 0 ? $('#foottextdiscount').text('') : $('#foottextdiscount').text(NumberToNumberString(Math.abs(FDocHDiscount)));
                sumFactor = FDocHTotalPrice + FDocHDiscount;
                $('#sumFactor').text(NumberToNumberString(parseFloat(sumFactor).toFixed(parseInt(sessionStorage.Deghat))));
                $('#ghabelPardakht').text(NumberToNumberString(parseFloat(FDocHFinalPrice).toFixed(parseInt(sessionStorage.Deghat))))
            }
        });
    }


    function getFDocHLastDate() {
        ajaxFunction(FDocHLastDateUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.ModeCode, 'GET').done(function (data) {
            self.DocDate(data);
            $('#btntarikh').click(function () {
                $('#tarikh').change();
            });
        });
    }

    /*function CalcDiscontCol(castCode) {
        var mp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (self.FDocHList().length > 0) {
            for (var i = 1; i < self.AddMinList().length + 1; i++) {
                $('#AddMinMablagh' + i).val() > '0' ? mp[i] = SlashToDot($('#AddMinMablagh' + i).val()) : mp[i] = 0;
            }
        } else {
            mp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        getAddMinList(sessionStorage.sels, Serial, castCode, 0, true,
            $("#AddMinSharh1").val(),
            $("#AddMinSharh2").val(),
            $("#AddMinSharh3").val(),
            $("#AddMinSharh4").val(),
            $("#AddMinSharh5").val(),
            $("#AddMinSharh6").val(),
            $("#AddMinSharh7").val(),
            $("#AddMinSharh8").val(),
            $("#AddMinSharh9").val(),
            $("#AddMinSharh10").val(),
            mp[1], mp[2], mp[3], mp[4],
            mp[5], mp[6], mp[7], mp[8],
            mp[9], mp[10]);
    }*/

    function GetBandNumber() {

        if (FDocB.length > 0) {
            return FDocB.length + 1;
        } else {
            return 1;
        }
    }







    var firstShowData = true;

    var rprtId = sessionStorage.InOut == 1 ? 'FDocB_P' : 'FDocB_S';

    function getFDocB(serialNumber) {
        ajaxFunction(FDocBListUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {

            for (var i = 0; i < data.length; i++) {
                KalaData = KalaList.filter(s => s.Code == data[i].KalaCode);
                if (KalaData.length > 0) {
                    data[i].dataKala = KalaData[0];
                }
            }
            FDocB = data;
            GetRprtCols_NewList(sessionStorage.userName);
        });

    }



    var showPrice;

    function CheckAccess() {

        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SO) {
            showPrice = localStorage.getItem("Access_SHOWPRICE_SFORD") == 'true';// sessionStorage.Access_SHOWPRICE_SFORD == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_SFORD") == 'true';//sessionStorage.Access_TAEED_SFORD == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_SFORD") == 'true';//sessionStorage.Access_TASVIB_SFORD == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_SFORD") == 'true';//sessionStorage.Access_CANCEL_SFORD == 'true'

            if (localStorage.getItem("AccessViewSefareshForosh") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SP) {

            showPrice = localStorage.getItem("Access_SHOWPRICE_SPDOC") == 'true';//sessionStorage.Access_SHOWPRICE_SPDOC == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_SPDOC") == 'true';//sessionStorage.Access_TAEED_SPDOC == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_SPDOC") == 'true';//sessionStorage.Access_TASVIB_SPDOC == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_SPDOC") == 'true';//sessionStorage.Access_CANCEL_SPDOC == 'true'

            if (localStorage.getItem("AccessViewPishFactorForosh") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_S) {

            showPrice = localStorage.getItem("Access_SHOWPRICE_SFDOC") == 'true';//sessionStorage.Access_SHOWPRICE_SFDOC == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_SFDOC") == 'true';//sessionStorage.Access_TAEED_SFDOC == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_SFDOC") == 'true';//sessionStorage.Access_TASVIB_SFDOC == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_SFDOC") == 'true';//sessionStorage.Access_CANCEL_SFDOC == 'true'

            if (localStorage.getItem("AccessViewFactorForosh") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR) {

            showPrice = localStorage.getItem("Access_SHOWPRICE_SRDOC") == 'true';//sessionStorage.Access_SHOWPRICE_SRDOC == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_SRDOC") == 'true';//sessionStorage.Access_TAEED_SRDOC == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_SRDOC") == 'true';//sessionStorage.Access_TASVIB_SRDOC == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_SRDOC") == 'true';//sessionStorage.Access_CANCEL_SRDOC == 'true'

            if (localStorage.getItem("AccessViewBackFactorForosh") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }


        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SH) {

            accessTaeed = localStorage.getItem("Access_TAEED_SHVL") == 'true';//sessionStorage.Access_TAEED_SHVL == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_SHVL") == 'true';//sessionStorage.Access_TASVIB_SHVL == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_SHVL") == 'true';//sessionStorage.Access_CANCEL_SHVL == 'true'

            if (localStorage.getItem("AccessViewHavaleForosh") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SE) {

            accessTaeed = localStorage.getItem("Access_TAEED_SEXT") == 'true';//sessionStorage.Access_TAEED_SEXT == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_SEXT") == 'true';//sessionStorage.Access_TASVIB_SEXT == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_SEXT") == 'true';//sessionStorage.Access_CANCEL_SEXT == 'true'

            if (localStorage.getItem("AccessViewBargeKhoroj") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PO) {

            showPrice = localStorage.getItem("Access_SHOWPRICE_PFORD") == 'true';//sessionStorage.Access_SHOWPRICE_PFORD == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_PFORD") == 'true';//sessionStorage.Access_TAEED_PFORD == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_PFORD") == 'true';//sessionStorage.Access_TASVIB_PFORD == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_PFORD") == 'true';//sessionStorage.Access_CANCEL_PFORD == 'true'

            if (localStorage.getItem("AccessViewSefareshKharid") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }


        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PP) {

            showPrice = localStorage.getItem("Access_SHOWPRICE_PPDOC") == 'true';//sessionStorage.Access_SHOWPRICE_PPDOC == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_PPDOC") == 'true';//sessionStorage.Access_TAEED_PPDOC == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_PPDOC") == 'true';//sessionStorage.Access_TASVIB_PPDOC == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_PPDOC") == 'true';//sessionStorage.Access_CANCEL_PPDOC == 'true'

            if (localStorage.getItem("AccessViewPishFactorKharid") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }


        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_P) {

            showPrice = localStorage.getItem("Access_SHOWPRICE_PFDOC") == 'true';//sessionStorage.Access_SHOWPRICE_PFDOC == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_PFDOC") == 'true';//sessionStorage.Access_TAEED_PFDOC == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_PFDOC") == 'true';//sessionStorage.Access_TASVIB_PFDOC == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_PFDOC") == 'true';//sessionStorage.Access_CANCEL_PFDOC == 'true'

            if (localStorage.getItem("AccessViewFactorKharid") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR) {

            showPrice = localStorage.getItem("Access_SHOWPRICE_PRDOC") == 'true';//sessionStorage.Access_SHOWPRICE_PRDOC == 'true'
            accessTaeed = localStorage.getItem("Access_TAEED_PRDOC") == 'true';//sessionStorage.Access_TAEED_PRDOC == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_PRDOC") == 'true';//sessionStorage.Access_TASVIB_PRDOC == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_PRDOC") == 'true';//sessionStorage.Access_CANCEL_PRDOC == 'true'

            if (localStorage.getItem("AccessViewBackFactorKharid") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }


        if (sessionStorage.CHG == 'false' && sessionStorage.BeforeMoveFactor == "false" && flagupdateHeader == 1) {
            viewAction = false;
        } else {
            sessionStorage.BeforeMoveFactor = false;
        }

        if (accessTaeed == false && sessionStorage.Status == translate('تایید'))
            viewAction = false;

        if (accessTasvib == false && sessionStorage.Status == translate('تصویب'))
            viewAction = false;

        if (accessCancel == false && sessionStorage.Status == translate('باطل'))
            viewAction = false;


        if (viewAction) {
            $('#action_headerfactor').removeAttr('style');
            $('#action_bodyfactor').removeAttr('style');
            $('#action_footerfactor').removeAttr('style');
            $('#action_Fdoc').removeAttr('style');
            $('#btnCust').removeAttr('style');
            $('#insertband').removeAttr('style');
            $('#Barcode').removeAttr('style');
            $('#btnMkz').removeAttr('style');
            $('#btnVstr').removeAttr('style');
            $('#btnOpr').removeAttr('style');
            $('#btnArz').removeAttr('style');
            $('#gGhimat').attr('disabled', false);
            $('#inv').attr('disabled', false);
        }
    }

    CheckAccess();


    if (showPrice) {
        $('#unitPriceShow').show();
        $('#totalPriceShow').show();
        $('#unitdiscount').show();
        $('#unitAddmin').show();
        $('#unitSumPrice').show();
        $('#ViewGGhimat').show();
        $('#thUnitPrice').removeAttr('hidden', '');
        $('#thTotalPrice').removeAttr('hidden', '');
        $('#thDiscount').removeAttr('hidden', '');
        $('#tdUnitPrice').removeAttr('hidden', '');
        $('#tdTotalPrice').removeAttr('hidden', '');
        $('#tdDiscount').removeAttr('hidden', '');
        $('#foottextUnitPrice').removeAttr('hidden', '');
        $('#foottexttotalprice').removeAttr('hidden', '');
        $('#foottextdiscount').removeAttr('hidden', '');
    }
    else {
        $('#unitPriceShow').hide();
        $('#totalPriceShow').hide();
        $('#unitdiscount').hide();
        $('#unitAddmin').hide();
        $('#unitSumPrice').hide();
        $('#ViewGGhimat').hide();
        $('#thUnitPrice').attr('hidden', '');
        $('#thTotalPrice').attr('hidden', '');
        $('#thDiscount').attr('hidden', '');
        $('#tdUnitPrice').attr('hidden', '');
        $('#tdTotalPrice').attr('hidden', '');
        $('#tdDiscount').attr('hidden', '');
        $('#foottextUnitPrice').attr('hidden', '');
        $('#foottexttotalprice').attr('hidden', '');
        $('#foottextdiscount').attr('hidden', '');
    }




    if (flagupdateHeader == 1) {

        flagInsertFdoch = 1;
        Serial = sessionStorage.SerialNumber;
        self.SerialNumber(Serial);
        self.InvCode(sessionStorage.InvCode);
        self.DocNoOut(sessionStorage.DocNo);
        self.DocDate(sessionStorage.DocDate);
        $('#btntarikh').click(function () {
            $('#tarikh').change();
        });
        self.Spec(sessionStorage.Spec);
        footer
        $("#footer").val(sessionStorage.Footer);
        codeCust = sessionStorage.CustCode;
        self.CustCode(sessionStorage.CustCode);
        self.PriceCode(sessionStorage.PriceCode);
        kalapricecode = sessionStorage.PriceCode;

        $("#docnoout").val(sessionStorage.DocNo);
        $('#textnumberfactor').show();
        $('#nameCust').val(sessionStorage.CustCode == '' ? '' : '(' + sessionStorage.CustCode + ') ' + sessionStorage.CustName);

        self.OprCode(sessionStorage.OprCode);
        codeOpr = sessionStorage.OprCode;

        self.MkzCode(sessionStorage.MkzCode);
        codeMkz = sessionStorage.MkzCode;

        self.VstrCode(sessionStorage.VstrCode);
        codeVstr = sessionStorage.VstrCode;

        self.ArzCode(sessionStorage.ArzCode);
        codeArz = sessionStorage.ArzCode;

        self.ArzRate(parseFloat(sessionStorage.ArzRate));
        arzRate = parseFloat(sessionStorage.ArzRate);


        $('#nameOpr').val(sessionStorage.OprCode == '' ? '' : '(' + sessionStorage.OprCode + ') ' + sessionStorage.OprName);
        $('#nameMkz').val(sessionStorage.MkzCode == '' ? '' : '(' + sessionStorage.MkzCode + ') ' + sessionStorage.MkzName);
        $('#nameVstr').val(sessionStorage.VstrCode == '' ? '' : '(' + sessionStorage.VstrCode + ') ' + sessionStorage.VstrName);
        $('#nameArz').val(sessionStorage.ArzName == '' || sessionStorage.ArzName == 'null' ? '' : '(' + sessionStorage.ArzCode + ') ' + sessionStorage.ArzName);

        getFDocH(Serial);
        getFDocB(Serial);

        getAddMinList(
            sessionStorage.sels,
            Serial,
            sessionStorage.CustCode,
            1,
            true,
            sessionStorage.AddMinSpec1,
            sessionStorage.AddMinSpec2,
            sessionStorage.AddMinSpec3,
            sessionStorage.AddMinSpec4,
            sessionStorage.AddMinSpec5,
            sessionStorage.AddMinSpec6,
            sessionStorage.AddMinSpec7,
            sessionStorage.AddMinSpec8,
            sessionStorage.AddMinSpec9,
            sessionStorage.AddMinSpec10,
            sessionStorage.AddMin1,
            sessionStorage.AddMin2,
            sessionStorage.AddMin3,
            sessionStorage.AddMin4,
            sessionStorage.AddMin5,
            sessionStorage.AddMin6,
            sessionStorage.AddMin7,
            sessionStorage.AddMin8,
            sessionStorage.AddMin9,
            sessionStorage.AddMin10);
        $("#footer").val(sessionStorage.Footer);
        flagOtherFieldShow = true;
        self.StatusFactor(sessionStorage.Status);
        $("#status").val(sessionStorage.Status);

        self.PaymentFactor(sessionStorage.PaymentType);
        $("#paymenttype").val(sessionStorage.PaymentType);
        $('#titlePage').text(textFactor + " شماره " + sessionStorage.DocNo.toPersianDigit());

        var closedDate = false;

        var TestFDoc_EditObject = {
            Serialnumber: Serial
        }

        ajaxFunction(TestFDoc_EditUri + ace + '/' + sal + '/' + group, 'POST', TestFDoc_EditObject, false).done(function (data) {
            list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                if (list[i].TestName == "YTrs") {
                    closedDate = true;
                    showNotification(translate(list[i].TestCap), 0);
                }
            }

        });



        if (codeOpr == "!!!" || codeMkz == "!!!" || closedDate == true) {
            $('#action_headerfactor').attr('style', 'display: none');
            $('#action_bodyfactor').attr('style', 'display: none');
            $('#action_footerfactor').attr('style', 'display: none');
            $('#action_Fdoc').attr('style', 'display: none');
            $('#insertband').attr('style', 'display: none');
            $('#Barcode').attr('style', 'display: none');
            $('#btnCust').attr('style', 'display: none');
            $('#btnMkz').attr('style', 'display: none');
            $('#btnOpr').attr('style', 'display: none');
            $('#btnArz').attr('style', 'display: none');
            $('#gGhimat').attr('disabled', true);
            $('#inv').attr('disabled', true);
        }

        if (codeOpr == "!!!" || codeMkz == "!!!") {
            showNotification($('#TitleHeaderFactor').text() + ' ' + translate('دارای پروژه و مرکز هزینه متفاوت است و امکان ثبت وجود ندارد'), 0);
        }

        dataGrid.focus(dataGrid.getCellElement(0, 4));
    }
    else {
        flagInsertFDocH = 0;
        if (parseInt(sal) < SalNow) {
            getFDocHLastDate();
        }
        getFDocB(0);
        dataGrid = $("#gridContainer").dxDataGrid("instance");
        // $("#SumBedehkar").val(0);
        //$("#SumBestankar").val(0);
        //$("#TafavotSanad").val(0);
        $("#footer").val('');
        getAddMinList(sessionStorage.sels, -1, 0, 0, false,
            '', '', '', '', '', '', '', '', '', ''
            , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        );

        for (i = 0; i < 5; i++) {
            tmp = {
                KalaCode: '',
                KalaName: '',
                MainUnit: 0,
                MainUnitName: '',
                BandSpec: '',
                Amount1: 0,
                Amount2: 0,
                Amount3: 0,
                UnitPrice: 0,
                TotalPrice: 0,
                Discount: 0,
                Comm: '',
                BandNo: i,
                UP_Flag: true,
            };
            FDocB[i] = tmp;
        }
        dataGrid.focus(dataGrid.getCellElement(0, 1));
    }



    var flagupdateHeader;
    var changeColumn = false;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;


    $('#data-error').hide();
    $('#data-grid').addClass('col-md');

    $('#finalSave_Title').attr('hidden', '');
























    function GetRprtCols_NewList(userName) {
        //showPrice = false;
        cols = getRprtCols(rprtId, userName);
        if (showPrice) {
            cols = cols.filter(s =>
                //s.Code == 'BandNo' ||
                s.Code == 'KalaCode' ||
                s.Code == 'KalaName' ||
                //s.Code == 'MainUnit' ||
                s.Code == 'MainUnitName' ||
                s.Code == 'BandSpec' ||
                s.Code == 'Amount1' ||
                s.Code == 'Amount2' ||
                s.Code == 'Amount3' ||
                s.Code == 'Comm' ||
                s.Code == 'UnitPrice' ||
                s.Code == 'TotalPrice' ||
                s.Code == 'Discount' ||
                s.Code == 'ArzValue'
            );
        }
        else {
            $("#p_Sum").hide();
            $("#p_Addmin").hide();


            cols = cols.filter(s =>
                //s.Code == 'BandNo' ||
                s.Code == 'KalaCode' ||
                s.Code == 'KalaName' ||
                //s.Code == 'MainUnit' ||
                s.Code == 'MainUnitName' ||
                s.Code == 'BandSpec' ||
                s.Code == 'Amount1' ||
                s.Code == 'Amount2' ||
                s.Code == 'Amount3' ||
                s.Code == 'Comm' ||
                s.Code == 'ArzValue'
            );
        }

        orderProp = 'Position';
        cols.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            return leftVal > rightVal ? 1 : -1;
        });

        if (cols[0].UserCode == '*Default*') {
            for (var i = 0; i < cols.length; i++) {
                if (
                    cols[i].Code == 'KalaCode' ||
                    cols[i].Code == 'KalaName' ||
                    //cols[i].Code == 'MainUnit' ||
                    cols[i].Code == 'MainUnitName' ||
                    cols[i].Code == 'Comm' ||
                    cols[i].Code == 'Amount1' ||
                    cols[i].Code == 'UnitPrice' ||
                    cols[i].Code == 'TotalPrice' ||
                    cols[i].Code == 'Discount'
                )
                    cols[i].Visible = 1
                else {
                    cols[i].Visible = 0;
                    cols[i].Position = 100;
                }
                cols[i].Code == 'KalaName' ? cols[i].Width = 200 : null
                cols[i].Code == 'Comm' ? cols[i].Width = 200 : null

                cols[i].Code == 'KalaCode' ? cols[i].Position = 0 : null
                cols[i].Code == 'KalaName' ? cols[i].Position = 1 : null
                cols[i].Code == 'Comm' ? cols[i].Position = 2 : null
                cols[i].Code == 'MainUnitName' ? cols[i].Position = 3 : null
                cols[i].Code == 'Amount1' ? cols[i].Position = 4 : null
                cols[i].Code == 'UnitPrice' ? cols[i].Position = 5 : null
                cols[i].Code == 'TotalPrice' ? cols[i].Position = 6 : null
                cols[i].Code == 'Discount' ? cols[i].Position = 7 : null
            }

            //cols.Code == 'KalaCode'
            orderProp = 'Position';
            cols.sort(function (left, right) {
                leftVal = left[orderProp];
                rightVal = right[orderProp];
                return leftVal > rightVal ? 1 : -1;
            });
        }

        data = cols;

        ListColumns = cols;
        f = '['

        for (var i = 0; i < data.length; i++) {

            f += '{"dataField":"' + data[i].Code + '",'
            f += '"width":' + data[i].Width + ','
            f += '"caption":"' + data[i].Name + '",';
            // f += '"alignment": "center",';
            f += '"visible":' + (data[i].Visible == 0 ? false : true);
            if (data[i].Code == "KalaCode") {
                f +=
                    ',"lookup": {"dataSource": "KalaList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    // '"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorCode"'//+ 
                //', "fixed": true , "fixedPosition": "right" , "width": 230'
            }

            else if (data[i].Code == "KalaName") {
                f +=
                    ',"lookup": {"dataSource": "KalaList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    //'"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorName"'
            }

            else if (data[i].Code == "MainUnitName") {
                f +=
                    ',"lookup": {"dataSource": "KalaUnitList", "valueExpr": "Name", "displayExpr": "Name"}';
            }

            // else if (data[i].Code == "Amount1") {
            //    f += ',"setCellValue": "EditorAmount1"'
            //}

            if (data[i].Code == "BandNo" || data[i].Code == "ArzValue") {
                f += ',"allowEditing": false'
            }

            if (data[i].Type == 4) {
                f += ',"dataType":"number"';
            }
            else if (data[i].Type == 5 || data[i].Code == 'Amount') {
                f += ',"format": { "style": "decimal",  "useGrouping": true, "minimumSignificantDigits": 1 }';
            }
            f += '}';
            if (i < data.length - 1)
                f += ','
        }

        f += ',{"dataField":"button","caption":"عملیات" ,"type": "buttons"}';//,"buttons": ["edit", "delete"]}';
        f += ',{"caption":"#","allowEditing": false}';//,"buttons": ["edit", "delete"]}';

        f += ']'

        cols = JSON.parse(f)

        conutHide = 0;
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].caption == '#') {
                cols[i].caption = 'ردیف';
                cols[i].dataField = '#';
                cols[i].fixed = true;
                cols[i].fixedPosition = "right";
                cols[i].width = 70;
                cols[i].cellTemplate = function (cellElement, cellInfo) {
                    cellElement.text(cellInfo.row.rowIndex + 1)
                }
            }
            if (cols[i].type == 'buttons') {
                buttons = cols[i];
                buttons.fixed = true;
                buttons.fixedPosition = "left";
                buttons.buttons = ["",
                    {
                        hint: 'حذف',
                        icon: 'trash',
                        onClick(e) {
                            e.component.saveEditData();
                            const visibleRows = e.component.getVisibleRows();
                            row = e.row.rowIndex;

                            clonedItem = visibleRows[row].data;//  $.extend({}, e.row.data);

                            FDocB.splice(row, 1);

                            e.component.saveEditData();
                            CalcFactor();
                            e.component.refresh(true);
                        }
                    },

                    {
                        hint: 'کپی',
                        icon: 'copy',
                        onClick(e) {
                            e.component.saveEditData();
                            const visibleRows = e.component.getVisibleRows();
                            row = e.row.rowIndex;

                            clonedItem = visibleRows[row].data;//  $.extend({}, e.row.data);
                            dataJson = JSON.stringify(clonedItem);
                            dataJson = JSON.parse(dataJson);

                            dataJson.BandNo = null;
                            FDocB.splice(row, 0, dataJson);

                            for (var i = 0; i < FDocB.length; i++) {
                                FDocB[i].BandNo = i;
                            }

                            e.component.saveEditData();
                            CalcFactor();
                            e.component.refresh(true);

                        }
                    },
                    {
                        hint: 'درج',
                        icon: 'add',
                        onClick(e) {
                            e.component.saveEditData();
                            const visibleRows = e.component.getVisibleRows();
                            clonedItem = {};
                            FDocB.splice(e.row.rowIndex, 0, clonedItem);

                            for (var i = 0; i < FDocB.length; i++) {
                                FDocB[i].BandNo = i;
                            }

                            e.component.repaintRows();
                            $("#gridContainer").dxDataGrid("instance").refresh();
                        }
                    }
                ];

                cols[i] = buttons;
            }
            if (cols[i].dataField == 'KalaCode') {
                cols[i].editCellTemplate = dropDownBoxEditorKalaCode;
                cols[i].lookup.dataSource = KalaList;
            }

            if (cols[i].dataField == 'KalaName') {
                cols[i].editCellTemplate = dropDownBoxEditorKalaName;
                cols[i].lookup.dataSource = KalaList;
            }

            if (cols[i].dataField == 'MainUnitName') {
                cols[i].editCellTemplate = dropDownBoxEditorUnitName;
                cols[i].lookup.dataSource = KalaUnitList;
            }

            if (cols[i].dataField == 'Amount1') {

            }
        }

        CreateTableColumn(cols);

    }


    function CreateTableColumn(data) {
        dataGrid = $('#gridContainer').dxDataGrid({
            dataSource: FDocB,
            keyExpr: 'BandNo',
            showBorders: true,
            showRowLines: true,
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnAutoWidth: false,

            sorting: { mode: 'none' },

            columnResizingMode: 'widget',
            columnMinWidth: 70,
            focusedRowIndex: 0,
            //focusedColumnIndex: 0,
            rtlEnabled: true,
            columnChooser: {
                enabled: true,
                mode: 'select',
                width: 250,
                width: 250,
                title: 'تنظیم ستون ها',
                sortOrder: 'asc',
                //searchTimeout: 500,
                height: 500,

                //allowSearch : true,
            },

            //AllowSortedDataDragDrop : true,

            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'row',
                editOnKeyPress: true,
            },

            paging: {
                enabled: false,
            },


            editing: {
                mode: 'batch',
                // mode: 'form',
                //  mode: 'cell',
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
                selectTextOnEditStart: true,
                startEditAction: 'click',
                confirmDelete: false,
                useIcons: true,
                newRowPosition: 'last',
            },

            rowDragging: {
                allowReordering: true,
                showDragIcons: false,
                onReorder(e) {
                    const visibleRows = e.component.getVisibleRows();

                    const fromIndex = e.fromIndex;
                    const toIndex = e.toIndex

                    FDocB.splice(fromIndex, 1);
                    FDocB.splice(toIndex, 0, e.itemData);
                    FDocB[toIndex].BandNo = visibleRows[fromIndex].data.BandNo

                    e.component.refresh();
                },
            },

            columns: data,

            summary: {
                //recalculateWhileEditing: ,
                totalItems: [{
                    column: '#',
                    summaryType: 'count',
                    displayFormat: "{0}  رکورد",
                    showInGroupFooter: false,
                },
                {
                    column: 'Amount1',
                    summaryType: 'sum',
                    valueFormat: 'decimal',
                    displayFormat: "{0}",
                    format: { style: "currency", currency: "EUR", useGrouping: true, minimumSignificantDigits: 3 },
                    showInGroupFooter: false,
                }, {
                    column: 'Amount2',
                    summaryType: 'sum',
                    valueFormat: 'decimal',
                    displayFormat: "{0}",
                    showInGroupFooter: false,
                }, {
                    column: 'Amount3',
                    summaryType: 'sum',
                    valueFormat: 'decimal',
                    displayFormat: "{0}",
                    showInGroupFooter: false,
                },
                {
                    column: 'Discount',
                    summaryType: 'sum',
                    valueFormat: 'decimal',
                    displayFormat: "{0}",
                    showInGroupFooter: false,
                    //alignment: "center"
                },

                {
                    column: 'TotalPrice',
                    summaryType: 'sum',
                    valueFormat: 'decimal',
                    displayFormat: "{0}",
                    showInGroupFooter: false,
                    //alignment: "center"
                }

                ],
            },

            onCellClick: function (e) {
                co = e.columnIndex;
                ro = e.rowIndex;
                fieldName = e.column.dataField;
            },

            onKeyDown: function (e) {
                const keyCode = e.event.key;

                if (keyCode == 'F2') {
                    SaveColumnSanad();
                    ControlSave();
                }


                if (keyCode == 'Enter' && columnName == 'button') {
                    rows = dataGrid.getVisibleRows().length;
                    if (ro == rows - 1) {

                        e.component.saveEditData();
                        const visibleRows = e.component.getVisibleRows();
                        FDocB.push({});
                        for (var i = 0; i < FDocB.length; i++) {
                            FDocB[i].BandNo = i;
                        }
                        dataGrid.refresh(true);

                    }
                };

                if (keyCode == 'Enter') {

                }
            },



            onFocusedCellChanged: function (e) {
                columnName = e.column.dataField;
                ro = e.rowIndex
            },


            onToolbarPreparing: function (e) {
                var toolbarItems = e.toolbarOptions.items;
                e.toolbarOptions.items.unshift(
                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'save',
                        options: {
                            icon: 'save',
                            hint: 'ذخیره',
                            onClick() {
                                SaveColumnSanad();
                                ControlSave();
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'addRow',
                        options: {
                            icon: 'add',
                            hint: 'بند جدید',
                            onClick() {
                                e.component.saveEditData();
                                FDocB.push({});
                                for (var i = 0; i < FDocB.length; i++) {
                                    FDocB[i].BandNo = i;
                                }
                                dataGrid.refresh(true);
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'print',
                        options: {
                            icon: 'print',
                            hint: 'چاپ',
                            onClick() {



                                if (Serial == '')
                                    return showNotification(translate('ابتدا فاکتور را ذخیره کنید'), 0);
                                getFDocP(Serial);
                                createViewer();

                                if (self.FDocPList().length == 0)
                                    return showNotification(translate('برای چاپ فاکتور حداقل یک بند الزامیست'), 0);

                                textFinalPrice = self.FDocPList()[0].FinalPrice.toPersianLetter() + titlePrice;
                                printVariable = '"ReportDate":"' + DateNow + '",' +
                                    '"TextFinalPrice":"' + textFinalPrice + '",';
                                printName = null;

                                sessionStorage.ModePrint = sessionStorage.ModeCode;
                                if (ace == "Web1") {
                                    if (sessionStorage.ModeCode == 51)
                                        sessionStorage.ModePrint = 'SPFCT';
                                    else if (sessionStorage.ModeCode == 52)
                                        sessionStorage.ModePrint = 'SFCT';
                                    else if (sessionStorage.ModeCode == 53)
                                        sessionStorage.ModePrint = 'SRFCT';
                                    else if (sessionStorage.ModeCode == 54)
                                        sessionStorage.ModePrint = 'PPFCT';
                                    else if (sessionStorage.ModeCode == 55)
                                        sessionStorage.ModePrint = 'PFCT';
                                    else if (sessionStorage.ModeCode == 56)
                                        sessionStorage.ModePrint = 'PRFCT';
                                }
                                GetPrintForms(sessionStorage.ModePrint);
                                self.filterPrintForms1("1");
                                $('#modal-Print').modal('show');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'OtherField',
                        options: {
                            icon: '/Content/img/sanad/paper-write.png',
                            hint: 'مشخصات اضافی',
                            onClick() {
                                $('#modal-OtherField').modal('show');
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'Barcode',
                        options: {
                            icon: '/Content/img/barcode.png',
                            hint: 'بارکد',
                            onClick() {
                                $('#modal-Barcode').modal();
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'AddNewSanad',
                        options: {
                            icon: '/Content/img/sanad/streamline-icon-pencil-write-3-alternate@48x48.png',
                            hint: 'سند جدید',
                            onClick() {
                                Swal.fire({
                                    title: '',
                                    text: textFactor + " " + translate("جدید ایجاد می شود . آیا مطمئن هستید ؟"),
                                    type: 'warning',
                                    showCancelButton: true,
                                    cancelButtonColor: '#3085d6',
                                    cancelButtonText: text_No,
                                    allowOutsideClick: false,
                                    confirmButtonColor: '#d33',
                                    confirmButtonText: text_Yes
                                }).then((result) => {
                                    if (result.value) {
                                        $('#titlePage').text(textFactor + " " + translate("جدید"));
                                        Serial = 0;
                                        Serial_Test = 0;
                                        flagInsertFDocH = 0;
                                        if (parseInt(sal) < SalNow) {
                                            getFDocHLastDate();
                                        }
                                        getFDocB(0);
                                        dataGrid = $("#gridContainer").dxDataGrid("instance");
                                        sumFactor = 0;
                                        $('#sumFactor').text('');
                                        $('#discountCol').text('');
                                        $('#ghabelPardakht').text('');
                                        self.Spec('');
                                        getAddMinList(sessionStorage.sels, -1, 0, 0, false,
                                            '', '', '', '', '', '', '', '', '', ''
                                            , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                                        );

                                        for (i = 0; i < 5; i++) {
                                            tmp = {
                                                KalaCode: '',
                                                KalaName: '',
                                                MainUnit: 0,
                                                MainUnitName: '',
                                                BandSpec: '',
                                                Amount1: 0,
                                                Amount2: 0,
                                                Amount3: 0,
                                                UnitPrice: 0,
                                                TotalPrice: 0,
                                                Discount: 0,
                                                Comm: '',
                                                BandNo: i
                                            };
                                            FDocB[i] = tmp;
                                        }
                                        dataGrid.focus(dataGrid.getCellElement(0, 1));




                                        codeCust = '';





                                        closedDate = false;
                                        codeCust = '';
                                        sessionStorage.flagupdateHeader = 0;
                                        $('#docnoout').val('');
                                        sessionStorage.searchFDocH = "";
                                        $("#status").val(translate('موقت'));
                                        sessionStorage.Status = translate('موقت');
                                        $("#paymenttype").val(0);
                                        $("#footer").val('');
                                        sessionStorage.Eghdam = sessionStorage.userName;
                                        discountCol = 0;




                                        kalapricecode = 0;
                                        flagFinalSave = false;
                                        flag = -1;
                                        flagdiscount = -1;
                                        flagInsertFdoch = 0;
                                        self.flagupdateband = false;
                                        self.SerialNumber();
                                        self.DocNoOut();
                                        self.DocDate();
                                        self.Spec();
                                        self.CustCode();
                                        self.PriceCode = ko.observable(sessionStorage.GPriceDefult);
                                        self.InvCode = ko.observable(sessionStorage.InvDefult);
                                        self.OprCode("");
                                        self.MkzCode("");
                                        self.VstrCode("");
                                        self.ArzCode("");
                                        self.ArzRate(0);
                                        arzRate = 0;

                                        codeOpr = '';
                                        codeMkz = '';
                                        codeVstr = '';
                                        codeArz = '';
                                        flaglog = "Y";
                                        if (sessionStorage.InvDefult != "null") $("#inv").val(sessionStorage.InvDefult);
                                        $("#gGhimat").val(sessionStorage.GPriceDefult);

                                        $('#nameCust').val("");
                                        $('#nameOpr').val("");
                                        $('#nameMkz').val("");
                                        $('#nameVstr').val("");
                                        $('#nameArz').val("");

                                        sessionStorage.F01 = "";
                                        sessionStorage.F02 = "";
                                        sessionStorage.F03 = "";
                                        sessionStorage.F04 = "";
                                        sessionStorage.F05 = "";
                                        sessionStorage.F06 = "";
                                        sessionStorage.F07 = "";
                                        sessionStorage.F08 = "";
                                        sessionStorage.F09 = "";
                                        sessionStorage.F10 = "";
                                        sessionStorage.F11 = "";
                                        sessionStorage.F12 = "";
                                        sessionStorage.F13 = "";
                                        sessionStorage.F14 = "";
                                        sessionStorage.F15 = "";
                                        sessionStorage.F16 = "";
                                        sessionStorage.F17 = "";
                                        sessionStorage.F18 = "";
                                        sessionStorage.F19 = "";
                                        sessionStorage.F20 = "";

                                        $("#ExtraFields1").val("");
                                        $("#ExtraFields2").val("");
                                        $("#ExtraFields3").val("");
                                        $("#ExtraFields4").val("");
                                        $("#ExtraFields5").val("");
                                        $("#ExtraFields6").val("");
                                        $("#ExtraFields7").val("");
                                        $("#ExtraFields8").val("");
                                        $("#ExtraFields9").val("");
                                        $("#ExtraFields10").val("");
                                        $("#ExtraFields11").val("");
                                        $("#ExtraFields12").val("");
                                        $("#ExtraFields13").val("");
                                        $("#ExtraFields14").val("");
                                        $("#ExtraFields15").val("");
                                        $("#ExtraFields16").val("");
                                        $("#ExtraFields17").val("");
                                        $("#ExtraFields18").val("");
                                        $("#ExtraFields19").val("");
                                        $("#ExtraFields20").val("");
                                        CheckAccess();
                                    }
                                })
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'DefultColumn',
                        options: {
                            icon: 'columnproperties',
                            hint: 'پیش فرض',
                            onClick() {
                                Swal.fire({
                                    title: '',
                                    text: translate("آیا ستون های پیش فرض جایگزین شود ؟"),
                                    type: 'warning',
                                    showCancelButton: true,
                                    cancelButtonColor: '#3085d6',
                                    cancelButtonText: text_No,
                                    allowOutsideClick: false,
                                    confirmButtonColor: '#d33',
                                    confirmButtonText: text_Yes
                                }).then((result) => {

                                    GetRprtCols_NewList('*Default*');
                                })

                            },
                        },
                    }

                );

                $.each(toolbarItems, function (_, item) {
                    if (item.name == "addRowButton" || item.name == "saveButton") {
                        item.visible = false;
                    }

                    if (amountAfterBarCode == "-1" && item.name == "Barcode") {
                        item.visible = false;
                    }



                    if (viewAction == false && (item.name == "save" || item.name == "revertButton" || item.name == "addRow" || item.name == "Barcode")) {
                        item.visible = false;
                    }

                    if (sessionStorage.newFactor == "false" && item.name == "AddNewSanad")
                        item.visible = false;

                    if (sessionStorage.AccessPrint_Factor == "false" && item.name == "print") {
                        item.visible = false;
                    }

                });


            },

            onOptionChanged: function (e) {
                if (e.fullName.includes("column")) {
                    changeColumn = true;
                }


                if (e.fullName.endsWith("ortOrder")) {
                    a = FDocB;
                    alert(e.fullName + ': ' + e.value);
                    dataGrid.saveEditData();
                    const visibleRows = dataGrid.getVisibleRows();
                    a = FDocB;
                    a = FDocB;
                }
            },




            onValueChanged: function (e) {
                const previousValue = e.previousValue;
                const newValue = e.value;
            },

            onEditorPrepared: function (e) { // تغییر ادیت
                a = 1;
            },

            onCellPrepared: function (e) {

                if (e.rowType === "data" && e.column.dataField === "KalaCode" && Serial > 0) {
                    const visibleRows = dataGrid.getVisibleRows();
                    if (visibleRows[e.rowIndex].data.dataKala == null) {
                        dataKala = KalaList.filter(s => s.Code == visibleRows[e.rowIndex].data.KalaCode);
                        visibleRows[e.rowIndex].data.dataKala = visibleRows[e.rowIndex].data.dataKala;
                    }
                }

                if (e.rowType === "data" && e.column.dataField === "TotalPrice") {
                    ro = e.row.rowIndex;
                    if (FDocB[ro] != null) {
                        if (FDocB[ro].UP_Flag == true || (FDocB[ro].UP_Flag == null && FDocB[ro].dataKala != null)) {
                            e.cellElement.css("background-color", '#fdf9b0');
                        }
                    }
                }

                if (e.rowType === "data" && e.column.dataField === "UnitPrice") {
                    ro = e.row.rowIndex;
                    if (FDocB[ro] != null) {
                        if (FDocB[ro].UP_Flag == false) {
                            e.cellElement.css("background-color", '#fdf9b0');
                        }
                    }
                }

            },

            onEditorPreparing: function (e) {
                dataField = e.dataField;

                if (e.parentType == 'dataRow' && e.dataField == 'Amount1' || e.dataField == 'Amount2' || e.dataField == 'Amount3') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;

                        if (e.dataField == 'Amount1')
                            FDocB[ro].Amount1 = args.value;
                        else if (e.dataField == 'Amount2')
                            FDocB[ro].Amount2 = args.value;
                        else if (e.dataField == 'Amount3')
                            FDocB[ro].Amount3 = args.value;
                        dataGrid.saveEditData();
                        dataGrid.refresh();

                        CalcAmount(e.row.rowIndex, e.dataField);
                        CalcFactor();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'UnitPrice') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        FDocB[ro].UP_Flag = true;
                        FDocB[ro].UnitPrice = args.value;
                        CalcPrice(ro);
                        dataGrid.saveEditData();
                        dataGrid.refresh();
                        CalcFactor();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'TotalPrice') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        FDocB[ro].UP_Flag = false;
                        FDocB[ro].TotalPrice = args.value;
                        CalcPrice(ro);

                        dataGrid.saveEditData();
                        dataGrid.refresh();
                        CalcFactor();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'Discount') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        FDocB[ro].Discount = args.value;
                        CalcFactor();
                        dataGrid.saveEditData();
                        dataGrid.refresh();
                    }
                }



                /*if (e.parentType == 'dataRow' && e.dataField == 'MainUnitName') {
                    ro = e.row.rowIndex;

                    KalaUnitList = KalaUnitList.filter(s => s.UnitName == FDocB[ro].dataKala.UnitName1);
                   // dataGrid.refresh();
                    e.editorOptions.onValueChanged = function (args) {
                        
                        CalcFactor();
                        dataGrid.saveEditData();
                        dataGrid.refresh();
                    }
                }*/


            }

        }).dxDataGrid('instance');
    }



    function CalcFactor() {
        discount = 0
        totalPrice = 0;
        sumDiscount = 0;
        sumTotalPrice = 0;
        for (var i = 0; i < FDocB.length; i++) {
            discount = FDocB[i].Discount == null || FDocB[i].Discount == '' ? 0 : parseFloat(FDocB[i].Discount);
            totalPrice = FDocB[i].TotalPrice == null || FDocB[i].TotalPrice == '' ? 0 : parseFloat(FDocB[i].TotalPrice);

            sumDiscount = sumDiscount + discount;
            sumTotalPrice = sumTotalPrice + totalPrice;
        }
        sumFactor = sumTotalPrice - sumDiscount;
        $("#sumFactor").text(NumberToNumberString(sumTotalPrice - sumDiscount));
    }






    function CreateTableAddminColumn() {
        dataGridAddmin = $('#gridAddminContainer').dxDataGrid({
            dataSource: Addmin,
            keyExpr: 'Code',
            showBorders: true,
            showRowLines: true,
            sorting: { mode: 'none' },
            // allowColumnReordering: true,
            // allowColumnResizing: true,
            // columnAutoWidth: false,

            // columnResizingMode: 'widget',
            //columnMinWidth: 100,
            focusedRowIndex: 0,
            focusedColumnIndex: 0,
            rtlEnabled: true,

            onOptionChanged: function (e) {
                if (e.fullName.includes("column")) {
                    changeColumn = true;
                }
            },


            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'row',
                editOnKeyPress: true,
            },

            paging: {
                enabled: false,
            },


            editing: {
                // mode: 'batch',
                // mode: 'form',
                mode: 'cell',
                allowUpdating: true,
                // allowAdding: true,
                //allowDeleting: true,
                selectTextOnEditStart: true,
                startEditAction: 'click',
                //confirmDelete: false,
                //useIcons: true,
                //newRowPosition: 'last',
            },

            columns: [
                { dataField: 'Name', caption: "شرح" },
                {
                    dataField: 'AddMinPrice', caption: "مبلغ", format: { style: "decimal", useGrouping: true, minimumSignificantDigits: 1 },

                    cellTemplate: function (element, info) {
                        element.append("<div>" + info.text + "</div>")
                            .css("direction", "ltr");
                    }
                },
                { dataField: 'Mode', caption: "", width: "30", allowEditing: false },
                {
                    dataField: 'MablaghMoaser', caption: "مبلغ موثر", allowEditing: false, format: { style: "decimal", useGrouping: true, minimumSignificantDigits: 1 },
                    cellTemplate: function (element, info) {
                        element.append("<div>" + info.text + "</div>")
                            .css("direction", "ltr");
                    }
                },
            ],

            onCellClick: function (e) {
                //co = e.columnIndex;
                // ro = e.rowIndex;
                // fieldName = e.column.dataField;
            },

            onKeyDown: function (e) {
                const keyCode = e.event.key;

                /*if (keyCode == 'Enter' && columnName == 'button') {
                    rows = dataGrid.getVisibleRows().length;
                    if (ro == rows - 1) {

                        e.component.saveEditData();
                        const visibleRows = e.component.getVisibleRows();
                        FDocB.push({});
                        for (var i = 0; i < FDocB.length; i++) {
                            FDocB[i].BandNo = i;
                        }
                        dataGrid.refresh(true);

                    }
                };

                if (keyCode == 'Enter') {

                }*/
            },

            onEditorPreparing: function (e) {


                if (e.row.data.Auto == true) {
                    e.editorOptions.disabled = true;
                    // e.editorOptions.readOnly = true;
                }

            },



            onFocusedCellChanged: function (e) {
                columnName = e.column.dataField;
                ro = e.rowIndex
            },


            onToolbarPreparing: function (e) {

            },



            onValueChanged: function (e) {
            },


        }).dxDataGrid('instance');
    }





    function CalcAddmin() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();
        docno = $("#docnoout").val();
        rows = dataGrid.getVisibleRows();

        dataGrid.saveEditData();

        var V_Del_FDocObject = {
            SerialNumber: Serial_Test,
        };

        ajaxFunction(V_Del_FDocUri + ace + '/' + sal + '/' + group, 'POST', V_Del_FDocObject).done(function (response) {

        });

        var FDocHObject = {
            SerialNumber: 0,
            DocDate: tarikh,
            Spec: self.Spec(),
            CustCode: codeCust,
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: sessionStorage.ModeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: docno,
            StartNo: 0,
            EndNo: 0,
            Tanzim: sessionStorage.userName,
            TahieShode: ace,
            VstrPer: 0,
            PakhshCode: '',
            AddMinSpec1: Addmin.length >= 1 ? Addmin[0].Name : '',
            AddMinSpec2: Addmin.length >= 2 ? Addmin[1].Name : '',
            AddMinSpec3: Addmin.length >= 3 ? Addmin[2].Name : '',
            AddMinSpec4: Addmin.length >= 4 ? Addmin[3].Name : '',
            AddMinSpec5: Addmin.length >= 5 ? Addmin[4].Name : '',
            AddMinSpec6: Addmin.length >= 6 ? Addmin[5].Name : '',
            AddMinSpec7: Addmin.length >= 7 ? Addmin[6].Name : '',
            AddMinSpec8: Addmin.length >= 8 ? Addmin[7].Name : '',
            AddMinSpec9: Addmin.length >= 9 ? Addmin[8].Name : '',
            AddMinSpec10: Addmin.length >= 10 ? Addmin[9].Name : '',
            AddMinPrice1: Addmin.length >= 1 ? Addmin[0].AddMinPrice : 0,
            AddMinPrice2: Addmin.length >= 2 ? Addmin[1].AddMinPrice : 0,
            AddMinPrice3: Addmin.length >= 3 ? Addmin[2].AddMinPrice : 0,
            AddMinPrice4: Addmin.length >= 4 ? Addmin[3].AddMinPrice : 0,
            AddMinPrice5: Addmin.length >= 5 ? Addmin[4].AddMinPrice : 0,
            AddMinPrice6: Addmin.length >= 6 ? Addmin[5].AddMinPrice : 0,
            AddMinPrice7: Addmin.length >= 7 ? Addmin[6].AddMinPrice : 0,
            AddMinPrice8: Addmin.length >= 8 ? Addmin[7].AddMinPrice : 0,
            AddMinPrice9: Addmin.length >= 9 ? Addmin[8].AddMinPrice : 0,
            AddMinPrice10: Addmin.length >= 10 ? Addmin[9].AddMinPrice : 0,
            InvCode: inv,
            PaymentType: $("#paymenttype").val(),
            Footer: $("#footer").val(),
            Eghdam: sessionStorage.userName,
            EghdamDate: 'null',
            flagLog: 'N',
            VstrCode: codeVstr,
            flagTest: 'Y'
        };

        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'POST', FDocHObject).done(function (response) {
            var res = response.split("@");
            Serial_Test = res[1];
        });


        data = FDocB;
        var obj = [];
        for (i = 0; i <= data.length - 1; i++) {
            item = data[i];
            if (item.KalaCode != "") {

                temp_FinalPrice = item.TotalPrice - item.Discount;
                arzValue = 0
                if (temp_FinalPrice > 0) {

                    if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                        arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
                    }
                }


                tmp = {
                    SerialNumber: Serial_Test,
                    KalaCode: item.KalaCode == null ? "" : item.KalaCode,
                    Amount1: item.Amount1 == null ? 0 : item.Amount1,
                    Amount2: item.Amount2 == null ? 0 : item.Amount2,
                    Amount3: item.Amount3 == null ? 0 : item.Amount3,
                    UnitPrice: item.UnitPrice == null ? 0 : item.UnitPrice,
                    TotalPrice: item.TotalPrice == null ? 0 : item.TotalPrice,
                    Discount: item.Discount == null ? 0 : item.Discount,
                    MainUnit: item.MainUnit == null ? 1 : item.MainUnit,
                    BandSpec: item.BandSpec == null ? "" : item.BandSpec,
                    Comm: item.Comm == null ? "" : item.Comm,
                    Up_Flag: item.UP_Flag == null ? true : item.UP_Flag,
                    ModeCode: sessionStorage.ModeCode,
                    InvCode: inv,
                    OprCode: codeOpr,
                    MkzCode: codeMkz,
                    ArzCode: codeArz,
                    ArzRate: arzRate,
                    ArzValue: arzValue,
                    flagLog: 'N',
                };

                obj.push(tmp);
            }
        }

        if (obj.length > 0) {


            ajaxFunction(FDocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial_Test, 'POST', obj, false).done(function (response) {

            });
        }

        getAddMinList(sessionStorage.sels, Serial_Test, codeCust, 0, false,
            FDocHObject.AddMinSpec1,
            FDocHObject.AddMinSpec2,
            FDocHObject.AddMinSpec3,
            FDocHObject.AddMinSpec4,
            FDocHObject.AddMinSpec5,
            FDocHObject.AddMinSpec6,
            FDocHObject.AddMinSpec7,
            FDocHObject.AddMinSpec8,
            FDocHObject.AddMinSpec9,
            FDocHObject.AddMinSpec10,

            FDocHObject.AddMinPrice1,
            FDocHObject.AddMinPrice2,
            FDocHObject.AddMinPrice3,
            FDocHObject.AddMinPrice4,
            FDocHObject.AddMinPrice5,
            FDocHObject.AddMinPrice6,
            FDocHObject.AddMinPrice7,
            FDocHObject.AddMinPrice8,
            FDocHObject.AddMinPrice9,
            FDocHObject.AddMinPrice10
        );


    }



    $('#CalcAddmin').click(function () {
        CalcAddmin();
    });






    var Serial_Test = 0;

    function ControlSave() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();

        docno = $("#docnoout").val();

        CalcAddmin();

        if (docno.length > 10) {
            return showNotification(translate('شماره نباید بیشتر از ده رقم باشد'), 0);
        }

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
        }

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
        }


        if (codeCust == '') {
            switch (sessionStorage.ModeCode.toString()) {
                case sessionStorage.MODECODE_FDOC_SO:
                    if (sessionStorage.FDOCSO_TestCust == "1")
                        showNotification(translate('خریدار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSO_TestCust == "2")
                        return showNotification(translate('خریدار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SP:
                    if (sessionStorage.FDOCSP_TestCust == "1")
                        showNotification(translate('خریدار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSP_TestCust == "2")
                        return showNotification(translate('خریدار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_S:
                    if (sessionStorage.FDOCS_TestCust == "1")
                        showNotification(translate('خریدار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCS_TestCust == "2")
                        return showNotification(translate('خریدار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SR:
                    if (sessionStorage.FDOCSR_TestCust == "1")
                        showNotification(translate('خریدار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSR_TestCust == "2")
                        return showNotification(translate('خریدار انتخاب نشده است'), 0);
                    break;

                case sessionStorage.MODECODE_FDOC_SH:
                    if (sessionStorage.FDOCSH_TestCust == "1")
                        showNotification(translate('خریدار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSH_TestCust == "2")
                        return showNotification(translate('خریدار انتخاب نشده است'), 0);
                    break;

                case sessionStorage.MODECODE_FDOC_SE:
                    if (sessionStorage.FDOCSE_TestCust == "1")
                        showNotification(translate('خریدار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSE_TestCust == "2")
                        return showNotification(translate('خریدار انتخاب نشده است'), 0);
                    break;



                case sessionStorage.MODECODE_FDOC_PO:
                    if (sessionStorage.FDOCPO_TestCust == "1")
                        showNotification(translate('فروشنده انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCPO_TestCust == "2")
                        return showNotification(translate('فروشنده انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_PP:
                    if (sessionStorage.FDOCPP_TestCust == "1")
                        showNotification(translate('فروشنده انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCPP_TestCust == "2")
                        return showNotification(translate('فروشنده انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_P:
                    if (sessionStorage.FDOCP_TestCust == "1")
                        showNotification(translate('فروشنده انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCP_TestCust == "2")
                        return showNotification(translate('فروشنده انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_PR:
                    if (sessionStorage.FDOCPR_TestCust == "1")
                        showNotification(translate('فروشنده انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCPR_TestCust == "2")
                        return showNotification(translate('فروشنده انتخاب نشده است'), 0);
                    break;
            }
        }


        if (inv == '') {
            switch (sessionStorage.ModeCode.toString()) {
                case sessionStorage.MODECODE_FDOC_SO:
                    if (sessionStorage.FDOCSO_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSO_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SP:
                    if (sessionStorage.FDOCSP_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSP_TestInv == "2")
                        return showNotificationtranslate(('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_S:
                    if (sessionStorage.FDOCS_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCS_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SR:
                    if (sessionStorage.FDOCSR_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSR_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SH:
                    if (sessionStorage.FDOCSH_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSH_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SE:
                    if (sessionStorage.FDOCSE_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCSE_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;

                case sessionStorage.MODECODE_FDOC_PO:
                    if (sessionStorage.FDOCPO_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCPO_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_PP:
                    if (sessionStorage.FDOCPP_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCPP_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_P:
                    if (sessionStorage.FDOCP_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCP_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
                case sessionStorage.MODECODE_FDOC_PR:
                    if (sessionStorage.FDOCPR_TestInv == "1")
                        showNotification(translate('انبار انتخاب نشده است'), 2);
                    else if (sessionStorage.FDOCPR_TestInv == "2")
                        return showNotification(translate('انبار انتخاب نشده است'), 0);
                    break;
            }
        }



        var isFree = true;
        for (var i = 0; i < FDocB.length; i++) {
            if (FDocB[i].KalaCode != '') {
                isFree = false
            }
        }


        if (isFree == true) {
            return showNotification(translate(textFactor + ' دارای بند قابل ذخیره نیست'), 0);
        }


        rows = dataGrid.getVisibleRows();
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].data.KalaCode == '' || rows[i].data.KalaCode == null) {
                dataGrid.deleteRow(i);
            }
        }

        dataGrid.saveEditData();
        //dataGrid.refresh();


        var V_Del_FDocObject = {
            SerialNumber: Serial_Test,
        };

        ajaxFunction(V_Del_FDocUri + ace + '/' + sal + '/' + group, 'POST', V_Del_FDocObject).done(function (response) {

        });


        var FDocHObject = {
            SerialNumber: 0,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            CustCode: codeCust,//self.CustCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: sessionStorage.ModeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: docno,
            StartNo: 0,
            EndNo: 0,
            Tanzim: sessionStorage.userName,
            TahieShode: ace,
            VstrPer: 0,
            PakhshCode: '',
            AddMinSpec1: Addmin.length >= 1 ? Addmin[0].Name : '',
            AddMinSpec2: Addmin.length >= 2 ? Addmin[1].Name : '',
            AddMinSpec3: Addmin.length >= 3 ? Addmin[2].Name : '',
            AddMinSpec4: Addmin.length >= 4 ? Addmin[3].Name : '',
            AddMinSpec5: Addmin.length >= 5 ? Addmin[4].Name : '',
            AddMinSpec6: Addmin.length >= 6 ? Addmin[5].Name : '',
            AddMinSpec7: Addmin.length >= 7 ? Addmin[6].Name : '',
            AddMinSpec8: Addmin.length >= 8 ? Addmin[7].Name : '',
            AddMinSpec9: Addmin.length >= 9 ? Addmin[8].Name : '',
            AddMinSpec10: Addmin.length >= 10 ? Addmin[9].Name : '',
            AddMinPrice1: Addmin.length >= 1 ? Addmin[0].AddMinPrice : 0,
            AddMinPrice2: Addmin.length >= 2 ? Addmin[1].AddMinPrice : 0,
            AddMinPrice3: Addmin.length >= 3 ? Addmin[2].AddMinPrice : 0,
            AddMinPrice4: Addmin.length >= 4 ? Addmin[3].AddMinPrice : 0,
            AddMinPrice5: Addmin.length >= 5 ? Addmin[4].AddMinPrice : 0,
            AddMinPrice6: Addmin.length >= 6 ? Addmin[5].AddMinPrice : 0,
            AddMinPrice7: Addmin.length >= 7 ? Addmin[6].AddMinPrice : 0,
            AddMinPrice8: Addmin.length >= 8 ? Addmin[7].AddMinPrice : 0,
            AddMinPrice9: Addmin.length >= 9 ? Addmin[8].AddMinPrice : 0,
            AddMinPrice10: Addmin.length >= 10 ? Addmin[9].AddMinPrice : 0,
            InvCode: inv,
            PaymentType: $("#paymenttype").val(),
            Footer: $("#footer").val(),
            Eghdam: sessionStorage.userName,
            EghdamDate: 'null',
            F01: $("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val(),
            F02: $("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val(),
            F03: $("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val(),
            F04: $("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val(),
            F05: $("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val(),
            F06: $("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val(),
            F07: $("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val(),
            F08: $("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val(),
            F09: $("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val(),
            F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val(),
            F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val(),
            F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val(),
            F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val(),
            F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val(),
            F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val(),
            F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val(),
            F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val(),
            F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val(),
            F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val(),
            F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val(),
            flagLog: 'N',
            VstrCode: codeVstr,
            flagTest: 'Y'
        };

        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'POST', FDocHObject).done(function (response) {
            var res = response.split("@");
            Serial_Test = res[1];
        });


        data = FDocB;
        var obj = [];
        for (i = 0; i <= data.length - 1; i++) {
            item = data[i];
            if (item.KalaCode != "") {

                temp_FinalPrice = item.TotalPrice - item.Discount;
                arzValue = 0
                if (temp_FinalPrice > 0) {

                    if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                        arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
                    }
                }

                tmp = {
                    SerialNumber: Serial_Test,
                    KalaCode: item.KalaCode == null ? "" : item.KalaCode,
                    Amount1: item.Amount1 == null ? 0 : item.Amount1,
                    Amount2: item.Amount2 == null ? 0 : item.Amount2,
                    Amount3: item.Amount3 == null ? 0 : item.Amount3,
                    UnitPrice: item.UnitPrice == null ? 0 : item.UnitPrice,
                    TotalPrice: item.TotalPrice == null ? 0 : item.TotalPrice,
                    Discount: item.Discount == null ? 0 : item.Discount,
                    MainUnit: item.MainUnit == null ? 1 : item.MainUnit,
                    Comm: item.Comm == null ? "" : item.Comm,
                    BandSpec: item.BandSpec == null ? "" : item.BandSpec,
                    Up_Flag: item.UP_Flag == null ? true : item.UP_Flag,
                    ModeCode: sessionStorage.ModeCode,
                    InvCode: inv,
                    OprCode: codeOpr,
                    MkzCode: codeMkz,
                    ArzCode: codeArz,
                    ArzRate: arzRate,
                    ArzValue: arzValue,

                    InvSerialNumber: item.InvSerialNumber == null ? 0 : item.InvSerialNumber,
                    LFctSerialNumber: item.LFctSerialNumber == null ? 0 : item.LFctSerialNumber,
                    LinkNumber: item.LinkNumber == null ? 0 : item.LinkNumber,
                    LinkYear: item.LinkYear == null ? 0 : item.LinkYear,
                    LinkProg: item.LinkProg == null ? '' : item.LinkProg,
                    flagLog: 'N',
                };
                obj.push(tmp);
            }


        }

        ajaxFunction(FDocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial_Test, 'POST', obj, false).done(function (response) {

        });

        var TestFDocObject = {
            SerialNumber: Serial_Test,
            flagTest: 'Y'
        };

        ajaxFunction(TestFDocUri + ace + '/' + sal + '/' + group, 'POST', TestFDocObject).done(function (data) {
            var obj = JSON.parse(data);
            TestFDocList = obj;
            TashimBand();
            if (data.length > 2) {
                $('#data-error').show();
                $('#data-grid').addClass('col-md-6');
                //$('#modal-FinalSave').modal('show');
                SetDataTestDocB();
            } else {
                SaveSanad();
            }
        });
    }






    function SetDataTestDocB() {
        $("#BodyTestDocB").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = TestFDocList;
        for (var i = 0; i < list.length; i++) {
            textBody +=
                '<div class="body" style="padding:7px;">' +
                '    <div class="form-inline">';
            if (list[i].Test == 1) {
                countWarning += 1;
                textBody += ' <img src="/Content/img/Warning.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('هشدار :') + '</p>'
            }
            else {
                countError += 1;
                textBody += ' <img src="/Content/img/Error.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('خطا :') + '</p>'
            }


            if (list[i].TestName == "Opr")
                textBody += '<p>' + translate('بند شماره') + " " + list[i].BandNo + " " + translate('پروژه مشخص نشده است') + ' </p>';

            else if (list[i].TestName == "Mkz")
                textBody += '<p>' + translate('بند شماره') + " " + list[i].BandNo + " " + translate('مرکز هزینه مشخص نشده است') + ' </p>';

            else if (list[i].TestName == 'Arz')
                textBody += '<p>' + translate('بند شماره') + " " + list[i].BandNo + " " + translate('ارز معرفی نشده است') + ' </p>';


            else if (list[i].TestName == 'ZeroAmount')
                textBody += '<p>' + translate('بند شماره') + " " + list[i].BandNo + " " + translate('مقدار صفر است') + ' </p>';


            else if (list[i].TestName == 'ZeroPrice')
                textBody += '<p>' + translate('بند شماره') + " " + list[i].BandNo + " " + translate('مبلغ صفر است') + ' </p>';


            else if (list[i].TestName == 'Cust')
                textBody += '<p>' + $('#LableCustCode').text() + " " + translate('انتخاب نشده است') + ' </p>';

            else if (list[i].TestName == 'Inv')
                textBody += '<p>' + translate('انبار انتخاب نشده است') + ' </p>';

            else if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTestDocB').append(textBody);

        $('#CountWarning').text(countWarning);
        $('#CountError').text(countError);

        if (countError > 0) {
            $('#FinalSave-Modal').attr('hidden', '');
            $('#ShowCountError').removeAttr('hidden', '');
        }
        else {
            $('#FinalSave-Modal').removeAttr('hidden', '')
            $('#ShowCountError').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning').attr('hidden', '');
        }


    }


    $("#closeError").click(function () {
        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-6');
    });

    $("#backError").click(function () {
        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-6');
    });

    $('#FinalSave-Modal').click(function () {
        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-6');
        SaveSanad();
    });




    function DeleteBand() {
        ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + Serial + '/0/' + sessionStorage.ModeCode + '/Y', 'DELETE').done(function (response) {

        });
    }




    function SaveSanad() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();
        docno = $("#docnoout").val();
        //kalapricecode = $("#gGhimat").val();

        //if (kalapricecode == null) kalapricecode = "";

        kalapricecode = $("#gGhimat").val() == "" ? 0 : $("#gGhimat").val();

        //CalcAddmin();

        if (Serial == 0) {

            var FDocHObject = {
                SerialNumber: 0,
                DocDate: tarikh,
                Spec: self.Spec(),
                CustCode: codeCust,
                KalaPriceCode: kalapricecode,
                UserCode: sessionStorage.userName,
                BranchCode: 0,
                ModeCode: sessionStorage.ModeCode,
                DocNoMode: 1,
                InsertMode: 0,
                DocNo: docno,
                StartNo: 0,
                EndNo: 0,
                Tanzim: sessionStorage.userName,
                TahieShode: ace,
                VstrPer: 0,
                PakhshCode: '',
                AddMinSpec1: Addmin.length >= 1 ? Addmin[0].Name : '',
                AddMinSpec2: Addmin.length >= 2 ? Addmin[1].Name : '',
                AddMinSpec3: Addmin.length >= 3 ? Addmin[2].Name : '',
                AddMinSpec4: Addmin.length >= 4 ? Addmin[3].Name : '',
                AddMinSpec5: Addmin.length >= 5 ? Addmin[4].Name : '',
                AddMinSpec6: Addmin.length >= 6 ? Addmin[5].Name : '',
                AddMinSpec7: Addmin.length >= 7 ? Addmin[6].Name : '',
                AddMinSpec8: Addmin.length >= 8 ? Addmin[7].Name : '',
                AddMinSpec9: Addmin.length >= 9 ? Addmin[8].Name : '',
                AddMinSpec10: Addmin.length >= 10 ? Addmin[9].Name : '',
                AddMinPrice1: Addmin.length >= 1 ? Addmin[0].AddMinPrice : 0,
                AddMinPrice2: Addmin.length >= 2 ? Addmin[1].AddMinPrice : 0,
                AddMinPrice3: Addmin.length >= 3 ? Addmin[2].AddMinPrice : 0,
                AddMinPrice4: Addmin.length >= 4 ? Addmin[3].AddMinPrice : 0,
                AddMinPrice5: Addmin.length >= 5 ? Addmin[4].AddMinPrice : 0,
                AddMinPrice6: Addmin.length >= 6 ? Addmin[5].AddMinPrice : 0,
                AddMinPrice7: Addmin.length >= 7 ? Addmin[6].AddMinPrice : 0,
                AddMinPrice8: Addmin.length >= 8 ? Addmin[7].AddMinPrice : 0,
                AddMinPrice9: Addmin.length >= 9 ? Addmin[8].AddMinPrice : 0,
                AddMinPrice10: Addmin.length >= 10 ? Addmin[9].AddMinPrice : 0,
                InvCode: inv,
                PaymentType: $("#paymenttype").val(),
                Footer: $("#footer").val(),
                Eghdam: sessionStorage.userName,
                EghdamDate: 'null',
                flagLog: flaglog,
                VstrCode: codeVstr,
                F01: $("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val() == "" ? sessionStorage.F01 : $("#ExtraFields1").val(),
                F02: $("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val() == "" ? sessionStorage.F02 : $("#ExtraFields2").val(),
                F03: $("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val() == "" ? sessionStorage.F03 : $("#ExtraFields3").val(),
                F04: $("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val() == "" ? sessionStorage.F04 : $("#ExtraFields4").val(),
                F05: $("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val() == "" ? sessionStorage.F05 : $("#ExtraFields5").val(),
                F06: $("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val() == "" ? sessionStorage.F06 : $("#ExtraFields6").val(),
                F07: $("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val() == "" ? sessionStorage.F07 : $("#ExtraFields7").val(),
                F08: $("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val() == "" ? sessionStorage.F08 : $("#ExtraFields8").val(),
                F09: $("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val() == "" ? sessionStorage.F09 : $("#ExtraFields9").val(),
                F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val() == "" ? sessionStorage.F10 : $("#ExtraFields10").val(),
                F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val() == "" ? sessionStorage.F11 : $("#ExtraFields11").val(),
                F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val() == "" ? sessionStorage.F12 : $("#ExtraFields12").val(),
                F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val() == "" ? sessionStorage.F13 : $("#ExtraFields13").val(),
                F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val() == "" ? sessionStorage.F14 : $("#ExtraFields14").val(),
                F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val() == "" ? sessionStorage.F15 : $("#ExtraFields15").val(),
                F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val() == "" ? sessionStorage.F16 : $("#ExtraFields16").val(),
                F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val() == "" ? sessionStorage.F17 : $("#ExtraFields17").val(),
                F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val() == "" ? sessionStorage.F18 : $("#ExtraFields18").val(),
                F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val() == "" ? sessionStorage.F19 : $("#ExtraFields19").val(),
                F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val() == "" ? sessionStorage.F20 : $("#ExtraFields20").val(),
                flagTest: 'N'
            };


            ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'POST', FDocHObject).done(function (response) {
                var res = response.split("@");
                Serial = res[0];
                DocNoOut = res[1];
                $('#docnoout').val(DocNoOut);
                flaglog = 'N';
                if (flagSaveLogWin == false) {
                    SaveLog('Fct5', EditMode_New, LogMode_FDoc, 0, DocNoOut, Serial);
                    flagSaveLogWin = true;
                }
            });

        }
        else {
            var FDocHObject = {
                SerialNumber: Serial,
                DocDate: tarikh,
                Spec: self.Spec(),
                CustCode: codeCust,
                KalaPriceCode: kalapricecode,
                UserCode: sessionStorage.userName,
                BranchCode: 0,
                ModeCode: sessionStorage.ModeCode,
                DocNoMode: 1,
                InsertMode: 0,
                DocNo: docno,
                StartNo: 0,
                EndNo: 0,
                Tanzim: sessionStorage.userName,
                TahieShode: ace,
                VstrPer: 0,
                PakhshCode: '',
                AddMinSpec1: Addmin.length >= 1 ? Addmin[0].Name : '',
                AddMinSpec2: Addmin.length >= 2 ? Addmin[1].Name : '',
                AddMinSpec3: Addmin.length >= 3 ? Addmin[2].Name : '',
                AddMinSpec4: Addmin.length >= 4 ? Addmin[3].Name : '',
                AddMinSpec5: Addmin.length >= 5 ? Addmin[4].Name : '',
                AddMinSpec6: Addmin.length >= 6 ? Addmin[5].Name : '',
                AddMinSpec7: Addmin.length >= 7 ? Addmin[6].Name : '',
                AddMinSpec8: Addmin.length >= 8 ? Addmin[7].Name : '',
                AddMinSpec9: Addmin.length >= 9 ? Addmin[8].Name : '',
                AddMinSpec10: Addmin.length >= 10 ? Addmin[9].Name : '',
                AddMinPrice1: Addmin.length >= 1 ? Addmin[0].AddMinPrice : 0,
                AddMinPrice2: Addmin.length >= 2 ? Addmin[1].AddMinPrice : 0,
                AddMinPrice3: Addmin.length >= 3 ? Addmin[2].AddMinPrice : 0,
                AddMinPrice4: Addmin.length >= 4 ? Addmin[3].AddMinPrice : 0,
                AddMinPrice5: Addmin.length >= 5 ? Addmin[4].AddMinPrice : 0,
                AddMinPrice6: Addmin.length >= 6 ? Addmin[5].AddMinPrice : 0,
                AddMinPrice7: Addmin.length >= 7 ? Addmin[6].AddMinPrice : 0,
                AddMinPrice8: Addmin.length >= 8 ? Addmin[7].AddMinPrice : 0,
                AddMinPrice9: Addmin.length >= 9 ? Addmin[8].AddMinPrice : 0,
                AddMinPrice10: Addmin.length >= 10 ? Addmin[9].AddMinPrice : 0,
                InvCode: inv,
                Status: status,
                Taeed: sessionStorage.TaeedF == '' ? status == translate("تایید") ? sessionStorage.userName : '' : sessionStorage.TaeedF,
                Tasvib: status == translate("تصویب") ? sessionStorage.userName : '',
                PaymentType: $("#paymenttype").val(),
                Footer: $("#footer").val(),
                deghat: parseInt(sessionStorage.Deghat),
                F01: $("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val() == "" ? sessionStorage.F01 : $("#ExtraFields1").val(),
                F02: $("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val() == "" ? sessionStorage.F02 : $("#ExtraFields2").val(),
                F03: $("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val() == "" ? sessionStorage.F03 : $("#ExtraFields3").val(),
                F04: $("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val() == "" ? sessionStorage.F04 : $("#ExtraFields4").val(),
                F05: $("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val() == "" ? sessionStorage.F05 : $("#ExtraFields5").val(),
                F06: $("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val() == "" ? sessionStorage.F06 : $("#ExtraFields6").val(),
                F07: $("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val() == "" ? sessionStorage.F07 : $("#ExtraFields7").val(),
                F08: $("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val() == "" ? sessionStorage.F08 : $("#ExtraFields8").val(),
                F09: $("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val() == "" ? sessionStorage.F09 : $("#ExtraFields9").val(),
                F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val() == "" ? sessionStorage.F10 : $("#ExtraFields10").val(),
                F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val() == "" ? sessionStorage.F11 : $("#ExtraFields11").val(),
                F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val() == "" ? sessionStorage.F12 : $("#ExtraFields12").val(),
                F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val() == "" ? sessionStorage.F13 : $("#ExtraFields13").val(),
                F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val() == "" ? sessionStorage.F14 : $("#ExtraFields14").val(),
                F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val() == "" ? sessionStorage.F15 : $("#ExtraFields15").val(),
                F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val() == "" ? sessionStorage.F16 : $("#ExtraFields16").val(),
                F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val() == "" ? sessionStorage.F17 : $("#ExtraFields17").val(),
                F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val() == "" ? sessionStorage.F18 : $("#ExtraFields18").val(),
                F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val() == "" ? sessionStorage.F19 : $("#ExtraFields19").val(),
                F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val() == "" ? sessionStorage.F20 : $("#ExtraFields20").val(),
                flagLog: flaglog,
                OprCode: codeOpr,
                MkzCode: codeMkz,
                VstrCode: codeVstr,
                New: 'Y'
            };



            ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'PUT', FDocHObject).done(function (response) {
                sessionStorage.searchFDocH = docno;
                flaglog = 'N';
                DeleteBand();
                if (flagSaveLogWin == false) {
                    SaveLog('Fct5', EditMode_Chg, LogMode_FDoc, 0, docno, Serial);
                    flagSaveLogWin = true;
                }

            });
        }

        /*data = FDocB;
        var obj = [];
        for (i = 0; i <= data.length - 1; i++) {
            item = data[i];
            tmp = {
                SerialNumber: Serial,
                KalaCode: item.KalaCode == null ? "" : item.KalaCode,
                Amount1: item.Amount1 == null ? 0 : item.Amount1,
                Amount2: item.Amount2 == null ? 0 : item.Amount2,
                Amount3: item.Amount3 == null ? 0 : item.Amount3,
                UnitPrice: item.UnitPrice == null ? 0 : item.UnitPrice,
                TotalPrice: item.TotalPrice == null ? 0 : item.TotalPrice,
                Discount: item.Discount == null ? 0 : item.Discount,
                MainUnit: item.MainUnit == null ? 1 : item.MainUnit,
                Comm: item.Comm == null ? "" : item.Comm,
                BandSpec: item.BandSpec == null ? "" : item.BandSpec,
                Up_Flag: item.UP_Flag == null ? true : item.UP_Flag,
                ModeCode: sessionStorage.ModeCode,
                InvCode: inv,
                OprCode: codeOpr,
                MkzCode: codeMkz,
                flagLog: flaglog,
                flagTest: 'N'
            };
 
            obj.push(tmp);
        }
 
        ajaxFunction(FDocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST', obj, false).done(function (response) {
            showNotification(translate('سند ذخیره شد'), 1);
        });*/





        var ConvertObject = {
            SerialNumber: Serial,
            TempSerialNumber: Serial_Test,
            ModeCode: sessionStorage.ModeCode,
        };

        ajaxFunction(FDocBConvertUri + ace + '/' + sal + '/' + group, 'POST', ConvertObject, false).done(function (response) {
            showNotification(translate('سند ذخیره شد'), 1);
        });

    }










    CalcAmount = function (row, amountName) {
        item = FDocB[row];// Band.data;
        var mainUnit = item.MainUnit;
        var amount1 = parseFloat(item.Amount1);
        var amount2 = parseFloat(item.Amount2);
        var amount3 = parseFloat(item.Amount3);
        var unitPrice = parseFloat(item.UnitPrice);
        var oldprice = parseFloat(unitPrice);
        var totalPrice = parseFloat(item.TotalPrice);
        var flag = item.UP_Flag == null ? true : item.UP_Flag;

        var zarib1 = item.dataKala.zarib1;
        var zarib2 = item.dataKala.zarib2;
        var zarib3 = item.dataKala.zarib3;

        var deghatM1 = item.dataKala.DeghatM1;
        var deghatM2 = item.dataKala.DeghatM2;
        var deghatM3 = item.dataKala.DeghatM3;

        var deghatR1 = item.dataKala.DeghatR1;
        var deghatR2 = item.dataKala.DeghatR2;
        var deghatR3 = item.dataKala.DeghatR3;

        if (mainUnit == "1") FDocB[row].UnitPrice = Price1
        else if (mainUnit == "2") FDocB[row].UnitPrice = Price2
        else if (mainUnit == "3") FDocB[row].UnitPrice = Price3

        var a1 = 0;
        var a2 = 0;
        var a3 = 0;

        if (amountName == 'Amount1') {
            a1 = amount1;
            zarib2 == 0 ? a2 = 0 : a2 = amount1 / zarib2;
            zarib3 == 0 ? a3 = 0 : a3 = amount1 / zarib3;
            Price1 > 0 ? FDocB[row].UnitPrice = parseFloat(Price1).toFixed(deghatR1) : FDocB[row].UnitPrice = 0;
        }
        else if (amountName == 'Amount2') {
            a1 = amount2 * zarib2;
            a2 = amount2;
            zarib3 == 0 ? a3 = 0 : a3 = a1 / zarib3;
            Price2 > 0 ? FDocB[row].UnitPrice = parseFloat(Price2).toFixed(deghatR2) : FDocB[row].UnitPrice = 0;
        }
        else if (amountName == 'Amount3') {
            a1 = (amount3 * zarib3);// * (zarib2);
            a2 = a1 / zarib2;
            a3 = amount3;
            Price3 > 0 ? FDocB[row].UnitPrice = parseFloat(Price3).toFixed(deghatR3) : FDocB[row].UnitPrice = 0;
        }

        if (oldprice > 0)
            FDocB[row].UnitPrice = oldprice;

        a1 != 0 ? a1 = a1.toFixed(deghatM1) : a1 = 0;
        a2 != 0 ? a2 = a2.toFixed(deghatM2) : a2 = 0;
        a3 != 0 ? a3 = a3.toFixed(deghatM3) : a3 = 0;

        FDocB[row].Amount1 = a1;
        FDocB[row].Amount2 = a2;
        FDocB[row].Amount3 = a3;


        CalcPrice(row);
    }

    CalcPrice = function (row) {
        item = FDocB[row];// Band.data;
        var mainUnit = item.MainUnit;
        var amount1 = item.Amount1;
        var amount2 = item.Amount2;
        var amount3 = item.Amount3;
        var unitPrice = item.UnitPrice;
        var oldprice = unitPrice;
        var totalPrice = item.TotalPrice;
        var flag = item.UP_Flag == null ? true : item.UP_Flag;

        var deghatR1 = item.dataKala.DeghatR1;
        var deghatR2 = item.dataKala.DeghatR2;
        var deghatR3 = item.dataKala.DeghatR3;

        var sum = 0;

        if (mainUnit > 0) {
            sum = 0;
            if (mainUnit == 1) {
                if (amount1 > 0)
                    flag == true ? sum = (amount1 * unitPrice).toFixed(deghatR1) : sum = (totalPrice / amount1).toFixed(deghatR1);
                else
                    sum = 0;
            }
            else if (mainUnit == 2) {
                if (amount2 > 0)
                    flag == true ? sum = (amount2 * unitPrice).toFixed(deghatR2) : sum = (totalPrice / amount2).toFixed(deghatR2);
                else
                    sum = 0;
            }
            else if (mainUnit == 3) {
                if (amount3 > 0)
                    flag == true ? sum = (amount3 * unitPrice).toFixed(deghatR3) : sum = (totalPrice / amount3).toFixed(deghatR3);
                else
                    sum = 0;
            }



            if (flag == true) {
                // $("#unitPrice").css("backgroundColor", "white");
                //$("#totalPrice").css("backgroundColor", "yellow");

                sum != 0 ? FDocB[row].TotalPrice = parseFloat(sum).toFixed(parseInt(sessionStorage.Deghat)) : FDocB[row].TotalPrice = 0;
            }
            else {
                // $("#totalPrice").css("backgroundColor", "white");
                // $("#unitPrice").css("backgroundColor", "yellow");
                sum != 0 ? FDocB[row].UnitPrice = sum : FDocB[row].UnitPrice = 0;
            }
        }




    }










    setInterval(SaveColumnSanad, 10000);
    function SaveColumnSanad() {
        if (changeColumn == true) {
            var dataGrid = $("#gridContainer").dxDataGrid("instance");
            columnCount = dataGrid.columnCount();
            var obj = [];
            for (i = 0; i < columnCount; i++) {
                var colInfo = dataGrid.columnOption(i);
                tmp = {
                    'UserCode': sessionStorage.userName,
                    'RprtId': rprtId,
                    'Code': colInfo.dataField,
                    'Visible': colInfo.visible,
                    'Position': colInfo.visibleIndex,
                    'Width': colInfo.visibleWidth
                };
                obj.push(tmp);
            }
            a = RprtColsSaveUri + ace + '/' + sal + '/' + group;
            ajaxFunction(RprtColsSaveUri + ace + '/' + sal + '/' + group, 'POST', obj).done(function (response) {
                changeColumn = false;
                getRprtAllCols();
            });
        }
    }



    function SelectedMainUnit(newData, value, currentRowData) {
        const visibleRows = dataGrid.getVisibleRows();
        newData.MainUnit = value;
        FDocB[ro].MainUnit = value;

        item = FDocB[ro];// Band.data;
        var mainUnit = parseInt(item.MainUnit);
        var unitPrice = parseFloat(item.UnitPrice);

        var deghatR1 = item.dataKala.DeghatR1;
        var deghatR2 = item.dataKala.DeghatR2;
        var deghatR3 = item.dataKala.DeghatR3;


        if (sessionStorage.sels == "true") {
            Price1 = parseFloat(FDocB[ro].dataKala.SPrice1);
            Price2 = parseFloat(FDocB[ro].dataKala.SPrice2);
            Price3 = parseFloat(FDocB[ro].dataKala.SPrice3);
        } else {
            Price1 = parseFloat(FDocB[ro].dataKala.PPrice1);
            Price2 = parseFloat(FDocB[ro].dataKala.PPrice2);
            Price3 = parseFloat(FDocB[ro].dataKala.PPrice3);
        }

        getKalaPriceBList(FDocB[ro].dataKala.Code);

        if (value == "1") FDocB[ro].UnitPrice = Price1 = 0 ? 0 : Price1.toFixed(deghatR1)
        else if (value == "2") FDocB[ro].UnitPrice = Price2 = 0 ? 0 : Price2.toFixed(deghatR2)
        else if (value == "3") FDocB[ro].UnitPrice = Price3 = 0 ? 0 : Price3.toFixed(deghatR3)

        CalcPrice(ro);
        dataGrid.saveEditData();
        dataGrid.refresh();
    }


    function dropDownBoxEditorKalaCode(cellElement, cellInfo) {
        return $('<div>').dxDropDownBox({
            //dropDownOptions: { width: 500, height: 1500},
            dropDownOptions: { width: 500 },
            dataSource: KalaList,
            value: cellInfo.value,
            valueExpr: 'Code',
            displayExpr: 'Code',
            contentTemplate(e) {
                return $('<div>').dxDataGrid({
                    dataSource: KalaList,
                    keyExpr: 'Code',
                    remoteOperations: true,
                    rtlEnabled: true,
                    filterRow: {
                        visible: true,
                        applyFilter: 'auto',
                    },
                    columns: [
                        { dataField: 'Code', caption: "کد" },
                        { dataField: 'Name', caption: "نام" },
                        { dataField: 'Spec', caption: "ملاحظات" },
                        { dataField: 'FanniNo', caption: "شماره فنی" },
                    ],
                    hoverStateEnabled: true,
                    scrolling: { mode: 'virtual' },
                    height: 250,
                    selection: { mode: 'single' },
                    selectedRowKeys: [cellInfo.value],
                    focusedRowEnabled: true,
                    focusedRowKey: cellInfo.value,
                    onSelectionChanged(selectionChangedArgs) {
                        dKala = selectionChangedArgs.selectedRowsData[0];
                        if (dKala != null) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");

                                dataGrid.cellValue(ro, "KalaName", selectionChangedArgs.selectedRowsData[0].Name);

                                const visibleRows = dataGrid.getVisibleRows();
                                visibleRows[ro].data.dataKala = selectionChangedArgs.selectedRowsData[0];
                                FDocB[ro].dataKala = selectionChangedArgs.selectedRowsData[0];


                                dataKala = selectionChangedArgs.selectedRowsData[0];
                                FDocB[ro].MainUnit = dataKala.DefaultUnit
                                dataGrid.cellValue(ro, "MainUnitName", dataKala.DefaultUnit == 1 ? FDocB[ro].dataKala.UnitName1 : dataKala.DefaultUnit == 2 ? FDocB[ro].dataKala.UnitName2 : FDocB[ro].dataKala.UnitName3);

                                defaultUnit = dataKala.DefaultUnit;

                                if (sessionStorage.sels == "true") {
                                    Price1 = parseFloat(dataKala.SPrice1);
                                    Price2 = parseFloat(dataKala.SPrice2);
                                    Price3 = parseFloat(dataKala.SPrice3);
                                } else {
                                    Price1 = parseFloat(dataKala.PPrice1);
                                    Price2 = parseFloat(dataKala.PPrice2);
                                    Price3 = parseFloat(dataKala.PPrice3);
                                }

                                getKalaPriceBList(dataKala.Code);

                                dataGrid.cellValue(ro, "UnitPrice", defaultUnit == 1 ? Price1 : defaultUnit == 2 ? Price2 : Price3);

                                //KalaUnitList = [];
                                //
                                // KalaUnitList[0].Name = FDocB[ro].dataKala.UnitName1;
                                // KalaUnitList[1].Name = FDocB[ro].dataKala.UnitName2;
                                //KalaUnitList[2].Name = FDocB[ro].dataKala.UnitName3;





                                /* if (newRec == false && visibleRows[ro].data.dataKala.NextLevelFromZKala == 0) {
                                     dataGrid.cellValue(ro, "KalaZCode", '');
                                     dataGrid.cellValue(ro, "KalaZName", '');
                                 }*/


                                e.component.close();
                                dataGrid.focus(dataGrid.getCellElement(ro, 'Amount' + (defaultUnit == null ? 1 : defaultUnit)));
                                //dataGrid.focus(dataGrid.getCellElement(ro, 5));
                            }
                        }



                    },

                });
            },
        });
    }

    function dropDownBoxEditorKalaName(cellElement, cellInfo) {
        return $('<div>').dxDropDownBox({
            dropDownOptions: { width: 500 },
            dataSource: KalaList,
            value: cellInfo.value,
            valueExpr: 'Name',
            displayExpr: 'Name',
            contentTemplate(e) {
                return $('<div>').dxDataGrid({
                    dataSource: KalaList,
                    keyExpr: 'Name',
                    remoteOperations: true,
                    rtlEnabled: true,
                    filterRow: {
                        visible: true,
                        applyFilter: 'auto',
                    },
                    columns: [
                        { dataField: 'Code', caption: "کد" },
                        { dataField: 'Name', caption: "نام" },
                        { dataField: 'Spec', caption: "ملاحظات" },
                        { dataField: 'FanniNo', caption: "شماره فنی" },
                    ],
                    hoverStateEnabled: true,
                    scrolling: { mode: 'virtual' },
                    height: 250,
                    selection: { mode: 'single' },
                    selectedRowKeys: [cellInfo.value],
                    focusedRowEnabled: true,
                    focusedRowKey: cellInfo.value,
                    onSelectionChanged(selectionChangedArgs) {
                        dKala = selectionChangedArgs.selectedRowsData[0];
                        if (dKala != null) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                dataGrid.cellValue(ro, "KalaCode", selectionChangedArgs.selectedRowsData[0].Code);
                                const visibleRows = dataGrid.getVisibleRows();
                                visibleRows[ro].data.dataKala = selectionChangedArgs.selectedRowsData[0];
                                FDocB[ro].dataKala = selectionChangedArgs.selectedRowsData[0];
                                e.component.close();
                            }
                        }
                    },
                });
            },
        });
    }





    function dropDownBoxEditorUnitName(cellElement, cellInfo) {

        ro = cellInfo.rowIndex;
        if (FDocB[ro].dataKala != null) {

            getUnit(FDocB[ro].dataKala.Code);
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: KalaUnitList,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: KalaUnitList,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد", sortOrder: "asc" }, { dataField: 'Name', caption: "واحد" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            dKala = selectionChangedArgs.selectedRowsData[0];
                            if (dKala != null) {
                                e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                    cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                    //dataGrid.cellValue(ro, "MainUnit", selectionChangedArgs.selectedRowsData[0].Code);
                                    FDocB[ro].MainUnit = selectionChangedArgs.selectedRowsData[0].Code;

                                    if (sessionStorage.sels == "true") {
                                        Price1 = parseFloat(dataKala.SPrice1);
                                        Price2 = parseFloat(dataKala.SPrice2);
                                        Price3 = parseFloat(dataKala.SPrice3);
                                    } else {
                                        Price1 = parseFloat(dataKala.PPrice1);
                                        Price2 = parseFloat(dataKala.PPrice2);
                                        Price3 = parseFloat(dataKala.PPrice3);
                                    }

                                    getKalaPriceBList(dataKala.Code);

                                    dataGrid.cellValue(ro, "UnitPrice", FDocB[ro].MainUnit == 1 ? Price1 : FDocB[ro].MainUnit == 2 ? Price2 : Price3);


                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }


    function FilterUnitName(dataKala) {
        if (dataKala != null) {
            return ["UnitName", "=", dataKala.UnitName1]
        }
    }














    //$(document).ready(function () { });
    //------------------------------------------------------
    self.currentPageCust = ko.observable();

    pageSizeCust = localStorage.getItem('pageSizeCust') == null ? 10 : localStorage.getItem('pageSizeCust');

    self.pageSizeCust = ko.observable(pageSizeCust);
    self.currentPageIndexCust = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");


    self.filterCust0 = ko.observable("");
    self.filterCust1 = ko.observable("");
    self.filterCust2 = ko.observable("");


    self.filterCustList = ko.computed(function () {

        self.currentPageIndexCust(0);
        var filter0 = self.filterCust0().toUpperCase();
        var filter1 = self.filterCust1();
        var filter2 = self.filterCust2();

        if (!filter0 && !filter1 && !filter2) {
            return self.CustList();
        } else {
            tempData = ko.utils.arrayFilter(self.CustList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCust = ko.computed(function () {
        var pageSizeCust = parseInt(self.pageSizeCust(), 10),
            startIndex = pageSizeCust * self.currentPageIndexCust(),
            endIndex = startIndex + pageSizeCust;
        localStorage.setItem('pageSizeCust', pageSizeCust);
        return self.filterCustList().slice(startIndex, endIndex);
    });


    self.nextPageCust = function () {
        if (((self.currentPageIndexCust() + 1) * self.pageSizeCust()) < self.filterCustList().length) {
            self.currentPageIndexCust(self.currentPageIndexCust() + 1);
        }
    };

    self.previousPageCust = function () {
        if (self.currentPageIndexCust() > 0) {
            self.currentPageIndexCust(self.currentPageIndexCust() - 1);
        }
    };

    self.firstPageCust = function () {
        self.currentPageIndexCust(0);
    };

    self.lastPageCust = function () {
        countCust = parseInt(self.filterCustList().length / self.pageSizeCust(), 10);
        self.currentPageIndexCust(countCust);
    };

    self.sortTableCust = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.CustList.sort(function (left, right) {

            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);

            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');

        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    self.selectCust = function (item) {

        // if (Serial != '') {
        Swal.fire({
            title: translate('تایید تغییرات ؟'),
            text: translate('در صورت تغییر') + " " + (sessionStorage.InOut == 2 ? translate('خریدار') : translate('فروشنده')) + " " + translate('تغییرات پیش فرض اعمال می شود . آیا عملیات انجام شود؟'),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                codeCust = item.Code;
                $('#nameCust').val('(' + item.Code + ') ' + item.Name)

                if (sessionStorage.sels == "true")
                    sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                else
                    sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultP);


                if (sessionStorage.InOut == 2 && item.CGruKalaPriceCode_S > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_S);
                else if (sessionStorage.InOut == 1 && item.CGruKalaPriceCode_P > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_P);

                if (sessionStorage.InOut == 2 && item.KalaPriceCode_S > 0)
                    $("#gGhimat").val(item.KalaPriceCode_S);
                else if (sessionStorage.InOut == 1 && item.KalaPriceCode_P > 0)
                    $("#gGhimat").val(item.KalaPriceCode_P);


                self.CustCode(item.Code);
                SetKalaPrice();


                flagKalaPrice = true;
            }
        })
        /*}
        else {
            codeCust = item.Code;
            $('#nameCust').val('(' + item.Code + ') ' + item.Name)

            if ($("#gGhimat").val() == '') {

                if (sessionStorage.sels == "true")
                    sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                else
                    sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultP);

                if (sessionStorage.InOut == 2 && item.CGruKalaPriceCode_S > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_S);
                else if (sessionStorage.InOut == 1 && item.CGruKalaPriceCode_P > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_P);

                if (sessionStorage.InOut == 2 && item.KalaPriceCode_S > 0)
                    $("#gGhimat").val(item.KalaPriceCode_S);
                else if (sessionStorage.InOut == 1 && item.KalaPriceCode_P > 0)
                    $("#gGhimat").val(item.KalaPriceCode_P);
            }
            self.CustCode(item.Code)
        }*/
        CalcAddmin();
        $('#nameCust').focus();
    };

    self.getById = function (id) {
        return ko.utils.arrayFirst(self.KalaPriceBList(), function (q) {
            if (q.Code === id) {
                return q.Price1;
            }
            else {
                return 'not found';
            }
        });
    };


    $('#modal-Cust').on('shown.bs.modal', function () {
        $('#searchCust').val('');
        self.filterCustList();
        $('#searchCust').focus();
    });


    $('#refreshcust').click(function () {

        Swal.fire({
            title: mes_Refresh,
            text: (sessionStorage.InOut == 2 ? translate("لیست خریداران ") : translate("لیست فروشندگان ")) + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getCustList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: sessionStorage.InOut == 1 ? 'لیست خریداران به روز رسانی شد' : 'لیست فروشندگان به روز رسانی شد' });
            }
        })
    })



















    self.currentPageOpr = ko.observable();
    pageSizeOpr = localStorage.getItem('pageSizeOpr') == null ? 10 : localStorage.getItem('pageSizeOpr');
    self.pageSizeOpr = ko.observable(pageSizeOpr);
    self.currentPageIndexOpr = ko.observable(0);

    self.filterOpr0 = ko.observable("");
    self.filterOpr1 = ko.observable("");
    self.filterOpr2 = ko.observable("");

    self.filterOprList = ko.computed(function () {

        self.currentPageIndexOpr(0);
        var filter0 = self.filterOpr0().toUpperCase();
        var filter1 = self.filterOpr1();
        var filter2 = self.filterOpr2();

        if (!filter0 && !filter1 && !filter2) {
            return self.OprList();
        } else {
            tempData = ko.utils.arrayFilter(self.OprList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageOpr = ko.computed(function () {
        var pageSizeOpr = parseInt(self.pageSizeOpr(), 10),
            startIndex = pageSizeOpr * self.currentPageIndexOpr(),
            endIndex = startIndex + pageSizeOpr;
        localStorage.setItem('pageSizeOpr', pageSizeOpr);
        return self.filterOprList().slice(startIndex, endIndex);
    });

    self.nextPageOpr = function () {
        if (((self.currentPageIndexOpr() + 1) * self.pageSizeOpr()) < self.filterOprList().length) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() + 1);
        }
    };

    self.previousPageOpr = function () {
        if (self.currentPageIndexOpr() > 0) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() - 1);
        }
    };

    self.firstPageOpr = function () {
        self.currentPageIndexOpr(0);
    };

    self.lastPageOpr = function () {
        countOpr = parseInt(self.filterOprList().length / self.pageSizeOpr(), 10);
        if ((self.filterOprList().length % self.pageSizeOpr()) == 0)
            self.currentPageIndexOpr(countOpr - 1);
        else
            self.currentPageIndexOpr(countOpr);
    };

    self.sortTableOpr = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.OprList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);

            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshOpr').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست پروژه ها") + " " + translate("به روز رسانی شود ؟"),

            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getOprList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectOpr = function (item) {
        codeOpr = item.Code;
        $('#nameOpr').val('(' + item.Code + ') ' + item.Name)
        self.OprCode(item.Code)
    };


    $('#modal-Opr').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });



    self.currentPageMkz = ko.observable();
    pageSizeMkz = localStorage.getItem('pageSizeMkz') == null ? 10 : localStorage.getItem('pageSizeMkz');
    self.pageSizeMkz = ko.observable(pageSizeMkz);
    self.currentPageIndexMkz = ko.observable(0);

    self.filterMkz0 = ko.observable("");
    self.filterMkz1 = ko.observable("");
    self.filterMkz2 = ko.observable("");

    self.filterMkzList = ko.computed(function () {

        self.currentPageIndexMkz(0);
        var filter0 = self.filterMkz0().toUpperCase();
        var filter1 = self.filterMkz1();
        var filter2 = self.filterMkz2();

        if (!filter0 && !filter1 && !filter2) {
            return self.MkzList();
        } else {
            tempData = ko.utils.arrayFilter(self.MkzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageMkz = ko.computed(function () {
        var pageSizeMkz = parseInt(self.pageSizeMkz(), 10),
            startIndex = pageSizeMkz * self.currentPageIndexMkz(),
            endIndex = startIndex + pageSizeMkz;
        localStorage.setItem('pageSizeMkz', pageSizeMkz);
        return self.filterMkzList().slice(startIndex, endIndex);
    });

    self.nextPageMkz = function () {
        if (((self.currentPageIndexMkz() + 1) * self.pageSizeMkz()) < self.filterMkzList().length) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() + 1);
        }
    };

    self.previousPageMkz = function () {
        if (self.currentPageIndexMkz() > 0) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() - 1);
        }
    };

    self.firstPageMkz = function () {
        self.currentPageIndexMkz(0);
    };

    self.lastPageMkz = function () {
        countMkz = parseInt(self.filterMkzList().length / self.pageSizeMkz(), 10);
        if ((self.filterMkzList().length % self.pageSizeMkz()) == 0)
            self.currentPageIndexMkz(countMkz - 1);
        else
            self.currentPageIndexMkz(countMkz);
    };

    self.sortTableMkz = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.MkzList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);

            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshMkz').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست مراکز هزینه ") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getMkzList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالاها به روز رسانی شد' });
            }
        })
    })



    self.selectMkz = function (item) {
        codeMkz = item.Code;
        $('#nameMkz').val('(' + item.Code + ') ' + item.Name)
        self.MkzCode(item.Code)
    };

    $('#modal-Mkz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });





    self.iconTypeRate = ko.observable("");

    self.currentPageArz = ko.observable();
    pageSizeArz = localStorage.getItem('pageSizeArz') == null ? 10 : localStorage.getItem('pageSizeArz');
    self.pageSizeArz = ko.observable(pageSizeArz);
    self.currentPageIndexArz = ko.observable(0);

    self.filterArz0 = ko.observable("");
    self.filterArz1 = ko.observable("");
    self.filterArz2 = ko.observable("");
    self.filterArz3 = ko.observable("");

    self.filterArzList = ko.computed(function () {

        self.currentPageIndexArz(0);
        var filter0 = self.filterArz0().toUpperCase();
        var filter1 = self.filterArz1();
        var filter2 = self.filterArz2();
        var filter3 = self.filterArz3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.ArzList();
        } else {
            tempData = ko.utils.arrayFilter(self.ArzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    ko.utils.stringStartsWith(item.Rate.toString().toLowerCase(), filter3)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageArz = ko.computed(function () {
        var pageSizeArz = parseInt(self.pageSizeArz(), 10),
            startIndex = pageSizeArz * self.currentPageIndexArz(),
            endIndex = startIndex + pageSizeArz;
        localStorage.setItem('pageSizeArz', pageSizeArz);
        return self.filterArzList().slice(startIndex, endIndex);
    });

    self.nextPageArz = function () {
        if (((self.currentPageIndexArz() + 1) * self.pageSizeArz()) < self.filterArzList().length) {
            self.currentPageIndexArz(self.currentPageIndexArz() + 1);
        }
    };

    self.previousPageArz = function () {
        if (self.currentPageIndexArz() > 0) {
            self.currentPageIndexArz(self.currentPageIndexArz() - 1);
        }
    };

    self.firstPageArz = function () {
        self.currentPageIndexArz(0);
    };

    self.lastPageArz = function () {
        countArz = parseInt(self.filterArzList().length / self.pageSizeArz(), 10);
        if ((self.filterArzList().length % self.pageSizeArz()) == 0)
            self.currentPageIndexArz(countArz - 1);
        else
            self.currentPageIndexArz(countArz);
    };

    self.sortTableArz = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ArzList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);

            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');
        self.iconTypeRate('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Rate') self.iconTypeRate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshArz').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ارز") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getArzList();
            }
        })
    })


    self.selectArz = function (item) {
        $('#nameArz').val('(' + item.Code + ') ' + item.Name);
        codeArz = item.Code;
        self.ArzCode(item.Code);
        arzRate = item.Rate;
        //$('#ArzRate').val(item.Rate);

    }


    $('#modal-Arz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });









    self.currentPageVstr = ko.observable();
    pageSizeVstr = localStorage.getItem('pageSizeVstr') == null ? 10 : localStorage.getItem('pageSizeVstr');
    self.pageSizeVstr = ko.observable(pageSizeVstr);
    self.currentPageIndexVstr = ko.observable(0);

    self.filterVstr0 = ko.observable("");
    self.filterVstr1 = ko.observable("");
    self.filterVstr2 = ko.observable("");

    self.filterVstrList = ko.computed(function () {

        self.currentPageIndexVstr(0);
        var filter0 = self.filterVstr0().toUpperCase();
        var filter1 = self.filterVstr1();
        var filter2 = self.filterVstr2();

        if (!filter0 && !filter1 && !filter2) {
            return self.VstrList();
        } else {
            tempData = ko.utils.arrayFilter(self.VstrList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageVstr = ko.computed(function () {
        var pageSizeVstr = parseInt(self.pageSizeVstr(), 10),
            startIndex = pageSizeVstr * self.currentPageIndexVstr(),
            endIndex = startIndex + pageSizeVstr;
        localStorage.setItem('pageSizeVstr', pageSizeVstr);
        return self.filterVstrList().slice(startIndex, endIndex);
    });

    self.nextPageVstr = function () {
        if (((self.currentPageIndexVstr() + 1) * self.pageSizeVstr()) < self.filterVstrList().length) {
            self.currentPageIndexVstr(self.currentPageIndexVstr() + 1);
        }
    };

    self.previousPageVstr = function () {
        if (self.currentPageIndexVstr() > 0) {
            self.currentPageIndexVstr(self.currentPageIndexVstr() - 1);
        }
    };

    self.firstPageVstr = function () {
        self.currentPageIndexVstr(0);
    };

    self.lastPageVstr = function () {
        countVstr = parseInt(self.filterVstrList().length / self.pageSizeVstr(), 10);
        if ((self.filterVstrList().length % self.pageSizeVstr()) == 0)
            self.currentPageIndexVstr(countVstr - 1);
        else
            self.currentPageIndexVstr(countVstr);
    };

    self.sortTableVstr = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.VstrList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);

            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');


        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshVstr').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویزیتورها ") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getVstrList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالاها به روز رسانی شد' });
            }
        })
    })



    self.selectVstr = function (item) {
        codeVstr = item.Code;
        $('#nameVstr').val('(' + item.Code + ') ' + item.Name)
        self.VstrCode(item.Code)
    };

    $('#modal-Vstr').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });







    var DataKalaBarcode = null;

    $("#Barcode_Value").keydown(function (e) {
        $('#TitleBarcode').text('');
        if (e.keyCode == 13) {
            barcode = $("#Barcode_Value").val();
            // barcode1 = "(" + barcode + ")";
            if (barcode != '') {

                tempData = null
                list = self.KalaList();
                for (var i = 0; i < list.length; i++) {

                    barCodeList = list[i].BarCode.split(')');
                    if (barCodeList.length > 1) {
                        for (var j = 0; j < barCodeList.length; j++) {
                            result = '(' + barcode == barCodeList[j];
                            if (result == true)
                                break;
                        }
                    }
                    else {
                        result = list[i].BarCode == barcode;
                    }
                    if (result == true) {
                        tempData = list[i];
                        break;
                    }
                }



                if (tempData != null) {
                    DataKalaBarcode = tempData;

                    if (amountAfterBarCode == '0') {
                        SetDataBarCode(DataKalaBarcode, 1);
                        $('#TitleBarcode').text(translate('بند جدید ایجاد شد'));
                    }
                    else if (amountAfterBarCode == '1') {
                        $('#Barcode_Amount').val('');
                        $('#Barcode_Amount').focus();
                        $('#TitleBarcode').text(translate('مقدار را وارد کنید'));
                    }
                    else if (amountAfterBarCode == '2') {
                        ro = -1
                        for (var i = 0; i < FDocB.length; i++) {
                            if (FDocB[i].KalaCode == DataKalaBarcode.Code) {
                                ro = i;
                                break;
                            }
                        }

                        if (ro == -1) { // بند کالا وجود نداشت
                            SetDataBarCode(DataKalaBarcode, 1);
                            $('#TitleBarcode').text(translate('بند جدید ایجاد شد'));
                        }
                        else {
                            dataBandKala = FDocB[ro];

                            if (dataBandKala.MainUnit == "1") {
                                amountB = parseFloat(dataBandKala.Amount1) + 1;
                                a1 = amountB;
                                DataKalaBarcode.zarib2 == 0 ? a2 = 0 : a2 = amountB / DataKalaBarcode.zarib2;
                                DataKalaBarcode.zarib3 == 0 ? a3 = 0 : a3 = amountB / DataKalaBarcode.zarib3;

                                if (dataBandKala.UP_Flag == true) {
                                    unitPrice = dataBandKala.UnitPrice;
                                    totalPrice = a1 * dataBandKala.UnitPrice;
                                }
                                else {
                                    unitPrice = dataBandKala.TotalPrice / a1;
                                    totalPrice = dataBandKala.TotalPrice;
                                }
                            }
                            else if (dataBandKala.MainUnit == "2") {
                                amountB = dataBandKala.Amount2 + 1;
                                a1 = amountB * DataKalaBarcode.zarib2;
                                a2 = amountB;
                                DataKalaBarcode.zarib3 == 0 ? a3 = 0 : a3 = amountB / DataKalaBarcode.zarib2;

                                if (dataBandKala.UP_Flag == true) {
                                    unitPrice = dataBandKala.UnitPrice;
                                    totalPrice = a2 * dataBandKala.UnitPrice;
                                }
                                else {
                                    unitPrice = dataBandKala.TotalPrice / a2;
                                    totalPrice = dataBandKala.TotalPrice;
                                }

                            }
                            else if (dataBandKala.MainUnit == "3") {
                                amountB = dataBandKala.Amount2 + 1;
                                a1 = (amountB * DataKalaBarcode.zarib2) * (DataKalaBarcode.zarib2);
                                a2 = amountB * DataKalaBarcode.zarib2;
                                a3 = amountB;

                                if (dataBandKala.UP_Flag == true) {
                                    unitPrice = dataBandKala.UnitPrice;
                                    totalPrice = a3 * dataBandKala.UnitPrice;
                                }
                                else {
                                    unitPrice = dataBandKala.TotalPrice / a2;
                                    totalPrice = dataBandKala.TotalPrice;
                                }
                            }
                            a1 != 0 ? a1 = parseFloat(a1.toFixed(DataKalaBarcode.DeghatM1)) : a1 = 0;
                            a2 != 0 ? a2 = parseFloat(a2.toFixed(DataKalaBarcode.DeghatM2)) : a2 = 0;
                            a3 != 0 ? a3 = parseFloat(a3.toFixed(DataKalaBarcode.DeghatM3)) : a3 = 0;



                            /* var FDocBObject = {
                                 SerialNumber: dataBandKala.SerialNumber,
                                 BandNo: dataBandKala.BandNo,
                                 KalaCode: dataBandKala.KalaCode,
                                 Amount1: a1,
                                 Amount2: a2,
                                 Amount3: a3,
                                 UnitPrice: unitPrice,
                                 TotalPrice: totalPrice,
                                 Discount: dataBandKala.Discount,
                                 MainUnit: dataBandKala.MainUnit,
                                 Comm: dataBandKala.Comm,
                                 Up_Flag: dataBandKala.UP_Flag,
                                 ModeCode: sessionStorage.ModeCode,
                                 flagLog: flaglog,
                                 OprCode: codeOpr,
                                 MkzCode: codeMkz,
                             };*/

                            FDocB[ro].Amount1 = a1;
                            FDocB[ro].Amount2 = a2;
                            FDocB[ro].Amount3 = a3;
                            FDocB[ro].UnitPrice = unitPrice;
                            FDocB[ro].TotalPrice = totalPrice;


                            $('#TitleBarcode').text(translate('بند شماره') + ' ' + (ro + 1) + ' ' + translate('ویرایش شد'));
                            $('#Barcode_Value').val('');
                            $('#Barcode_Value').focus();
                            dataGrid.refresh(true);
                        }
                    }
                }
            }
        }
    });

    $("#Barcode_Amount").keydown(function (e) {
        amountB = $("#Barcode_Amount").val();
        if (amountB > 0) {
            if (e.keyCode == 13) {
                SetDataBarCode(DataKalaBarcode, parseFloat(amountB));

                DataKalaBarcode = null;
                $('#Barcode_Amount').val('');
                $('#Barcode_Value').val('');
                $('#Barcode_Value').focus();
            }
        }
    });


    $('#modal-Barcode').on('shown.bs.modal', function () {
        $('#TitleBarcode').text('');
        $('#Barcode_Value').val('');
        $('#Barcode_Amount').val('');
        $('#Barcode_Value').focus();
    });



    function SetDataBarCode(kala, amountB) {
        bandnumber = GetBandNumber();
        defaultUnit = kala.DefaultUnit;

        a1 = 0;
        a2 = 0;
        a3 = 0;

        unitPrice = 0;
        totalPrice = 0;
        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

        if (sessionStorage.sels == "true") {
            Price1 = kala.SPrice1;
            Price2 = kala.SPrice2;
            Price3 = kala.SPrice3;
        } else {
            Price1 = kala.PPrice1;
            Price2 = kala.PPrice2;
            Price3 = kala.PPrice3;
        }

        getKalaPriceBList(kala.Code);

        if (defaultUnit == "1") {
            mainUnitName = kala.UnitName1;
            a1 = amountB;
            kala.zarib2 == 0 ? a2 = 0 : a2 = amountB / kala.zarib2;
            kala.zarib3 == 0 ? a3 = 0 : a3 = amountB / kala.zarib3;
            unitPrice = Price1;
            totalPrice = a1 * unitPrice;

        }
        else if (defaultUnit == "2") {
            mainUnitName = kala.UnitName2;
            a1 = amountB * kala.zarib2;
            a2 = amountB;
            kala.zarib3 == 0 ? a3 = 0 : a3 = amountB / kala.zarib2;
            unitPrice = Price2;
            totalPrice = a2 * unitPrice;
        }
        else if (defaultUnit == "3") {
            mainUnitName = kala.UnitName3;
            a1 = (amountB * kala.zarib2) * (kala.zarib2);
            a2 = amountB * kala.zarib2;
            a3 = amountB;
            unitPrice = Price3;
            totalPrice = a3 * unitPrice;
        }

        a1 != 0 ? a1 = a1.toFixed(kala.DeghatM1) : a1 = "";
        a2 != 0 ? a2 = a2.toFixed(kala.DeghatM2) : a2 = "";
        a3 != 0 ? a3 = a3.toFixed(kala.DeghatM3) : a3 = "";

        ro = -1;
        for (var i = 0; i < FDocB.length; i++) {
            if (FDocB[i].KalaCode == '' || FDocB[i].KalaCode == null) {
                ro = i;
                break;
            }
        }
        if (ro == -1) {
            dataGrid.saveEditData();
            FDocB.push({});

            for (var i = 0; i < FDocB.length; i++) {
                FDocB[i].BandNo = i;
            }
            i = i - 1;
            dataGrid.refresh(true);
        }
        FDocB[i].dataKala = [];
        FDocB[i].dataKala = kala;
        FDocB[i].KalaCode = kala.Code;
        FDocB[i].KalaName = kala.Name;
        FDocB[i].MainUnit = kala.DefaultUnit;
        FDocB[i].MainUnitName = mainUnitName;
        FDocB[i].Amount1 = a1;
        FDocB[i].Amount2 = a2;
        FDocB[i].Amount3 = a3;
        FDocB[i].UnitPrice = unitPrice;
        FDocB[i].TotalPrice = totalPrice;
        FDocB[i].UP_Flag = true;
        dataGrid.refresh(true);


        /* 
          Amount1: a1,
          Amount2: a2,
          Amount3: a3,
          UnitPrice: unitPrice,
          TotalPrice: totalPrice,
          MainUnit: defaultUnit,
          Up_Flag: 1,
*/

        //SendFDocBI(FDocBObject);
        $("#Barcode_Value").val('');
    }
















    pageSizePrintForms = localStorage.getItem('pageSizePrintForms') == null ? 10 : localStorage.getItem('pageSizePrintForms');
    self.pageSizePrintForms = ko.observable(pageSizePrintForms);
    self.currentPageIndexKhdt = ko.observable(0);

    self.currentPageIndexPrintForms = ko.observable(0);
    self.filterPrintForms0 = ko.observable("");
    self.filterPrintForms1 = ko.observable("");

    self.filterPrintFormsList = ko.computed(function () {

        self.currentPageIndexPrintForms(0);
        var filter0 = self.filterPrintForms0();
        var filter1 = self.filterPrintForms1();

        if (!filter0 && !filter1) {
            return PrintFormsList();
        } else {
            tempData = ko.utils.arrayFilter(PrintFormsList(), function (item) {
                result =
                    (item.namefa == null ? '' : item.namefa.toString().search(filter0) >= 0) &&
                    (item.Selected == null ? '' : item.Selected.toString().search(filter1) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPagePrintForms = ko.computed(function () {
        var pageSizePrintForms = parseInt(self.pageSizePrintForms(), 10),
            startIndex = pageSizePrintForms * self.currentPageIndexPrintForms(),
            endIndex = startIndex + pageSizePrintForms;
        localStorage.setItem('pageSizePrintForms', pageSizePrintForms);
        return self.filterPrintFormsList().slice(startIndex, endIndex);
    });

    self.nextPagePrintForms = function () {
        if (((self.currentPageIndexPrintForms() + 1) * self.pageSizePrintForms()) < self.filterPrintFormsList().length) {
            self.currentPageIndexPrintForms(self.currentPageIndexPrintForms() + 1);
        }
    };

    self.previousPagePrintForms = function () {
        if (self.currentPageIndexPrintForms() > 0) {
            self.currentPageIndexPrintForms(self.currentPageIndexPrintForms() - 1);
        }
    };

    self.firstPagePrintForms = function () {
        self.currentPageIndexPrintForms(0);
    };


    self.lastPagePrintForms = function () {
        countPrintForms = parseInt(self.filterPrintFormsList().length / self.pageSizePrintForms(), 10);
        if ((self.filterPrintFormsList().length % self.pageSizePrintForms()) == 0)
            self.currentPageIndexPrintForms(countPrintForms - 1);
        else
            self.currentPageIndexPrintForms(countPrintForms);
    };


    self.iconTypenamefa = ko.observable("");

    self.sortTablePrintForms = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        PrintFormsList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);

            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        if (orderProp == 'namefa') self.iconTypenamefa((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    self.CodePrint = ko.observable();

    self.radifPrint = function (index) {
        countShow = self.pageSizePrintForms();
        page = self.currentPageIndexPrintForms();
        calc = (countShow * page) + 1;
        return index + calc;
    }


    self.ShowActionPrint = function (isPublic) {
        return isPublic == 1 ? false : true;
    }


    self.ShowPrintForms = function (item) {
        printName = item.namefa;
        address = item.address;
        data = item.Data;
        printPublic = item.isPublic == 1 ? true : false;
        setReport(self.FDocPList(), data, printVariable);
    };


    self.SelectedPrintForms = function (item) {
        SelectedPrintForm(item.address, item.isPublic);
        GetPrintForms(sessionStorage.ModePrint);
        return true;
    };


    self.SelectedAccessGhimat = function (item) {
        SelectedAccessGhimatPrintForm(item.address, item.isPublic);
        GetPrintForms(sessionStorage.ModePrint);
        return true;
    };



    self.DeletePrintForms = function (item) {
        Swal.fire({
            title: mes_Delete,
            text: translate("آیا فرم چاپ انتخابی حذف شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                address = item.address;
                DeletePrintForm(address);
                GetPrintForms(sessionStorage.ModePrint);
            }
        })

    };

    $('#AddNewPrintForms').click(function () {
        printName = translate('فرم جدید');
        printPublic = false;
        setReport(self.FDocPList(), '', printVariable);
    });




    $('#DesignPrint').click(function () {
        self.filterPrintForms1("");
        $('#modal-Print').modal('hide');
        $('#modal-PrintForms').modal('show');
    });

    $('#AcceptPrint').click(function () {
        codeSelect = self.CodePrint();
        list = PrintFormsList();
        for (var i = 0; i < list.length; i++) {
            if (list[i].code == codeSelect) {
                name = list[i].namefa;
                data = list[i].Data;
            }
        }
        setReport(self.FDocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });






    $('#modal-OtherField').on('shown.bs.modal', function () {
        if (flagOtherFieldShow == true) {
            $("#ExtraFields1").val(sessionStorage.F01);
            $("#ExtraFields2").val(sessionStorage.F02);
            $("#ExtraFields3").val(sessionStorage.F03);
            $("#ExtraFields4").val(sessionStorage.F04);
            $("#ExtraFields5").val(sessionStorage.F05);
            $("#ExtraFields6").val(sessionStorage.F06);
            $("#ExtraFields7").val(sessionStorage.F07);
            $("#ExtraFields8").val(sessionStorage.F08);
            $("#ExtraFields9").val(sessionStorage.F09);
            $("#ExtraFields10").val(sessionStorage.F10);
            $("#ExtraFields11").val(sessionStorage.F11);
            $("#ExtraFields12").val(sessionStorage.F12);
            $("#ExtraFields13").val(sessionStorage.F13);
            $("#ExtraFields14").val(sessionStorage.F14);
            $("#ExtraFields15").val(sessionStorage.F15);
            $("#ExtraFields16").val(sessionStorage.F16);
            $("#ExtraFields17").val(sessionStorage.F17);
            $("#ExtraFields18").val(sessionStorage.F18);
            $("#ExtraFields19").val(sessionStorage.F19);
            $("#ExtraFields20").val(sessionStorage.F20);
            flagOtherFieldShow = false;
        }
    });



    $('#modal-OtherField').on('hide.bs.modal', function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });


    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "Factor", sessionStorage.SerialNumber);
    };



    document.onkeydown = function (e) {
        if (e.keyCode == key_F2) {
            SaveColumnSanad();
            ControlSave();
        }
    };





};

ko.applyBindings(new ViewModel());
