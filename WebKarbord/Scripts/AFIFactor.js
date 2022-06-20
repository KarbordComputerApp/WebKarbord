var ViewModel = function () {
    var self = this;
    var forSels = true;

    sal = localStorage.getItem("SalFct");

    var arzCalcMode = localStorage.getItem("ArzCalcMode_Fct");

    var viewAction = false;
    var allSearchHesab = true;
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

    /*$("#aceTest").text('نام نرم افزار' + ace);
    $("#groupTest").text('نام گروه' + group);
    $("#salTest").text('سال مالی' + sal);*/

    //var server = $("#server").text();
    //sessionStorage.searchFDocH = "";

    $('#textnumberfactor').hide();
    $('#finalSave_Title').attr('hidden', '');

    TestUser();


    var codeCust = '';
    var codeOpr = '';
    var codeMkz = '';
    var codeVstr = '';

    var codeArz = '';
    var arzRate = 0;
    $('#ArzRate').val(0);

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

    var dataAddMin;
    var dataAddminHesab = [];
    var dataAddminKala = [];

    self.bundNumberImport = 0;

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

    self.BandNo = ko.observable();
    self.KalaCode = ko.observable();
    self.Amount1 = ko.observable();
    self.Amount2 = ko.observable();
    self.Amount3 = ko.observable();
    self.UnitPrice = ko.observable();
    self.TotalPrice = ko.observable();
    self.Discount = ko.observable();
    self.MainUnit = ko.observable();
    self.Comm = ko.observable();

    self.CustList = ko.observableArray([]); // لیست حساب ها
    self.KalaList = ko.observableArray([]); // لیست کالاها
    self.KalaPriceList = ko.observableArray([]); // لیست گروه قیمت
    self.KalaPriceBList = ko.observableArray([]); // قیمت کالا بر اساس گروه قیمت
    self.FDocBList = ko.observableArray([]); // لیست فاکتور
    self.FDocB = ko.observableArray([]); // لیست فاکتور
    self.UnitList = ko.observableArray([]); // لیست واحد ها
    self.InvList = ko.observableArray([]); // لیست انبارها
    self.AddMinList = ko.observableArray([]); // لیست کسورات و افزایشات 
    self.FDocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش  
    self.PaymentList = ko.observableArray([]); // لیست نحوه پرداخت 
    self.StatusList = ko.observableArray([]); // لیست وضعیت پرداخت 
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.VstrList = ko.observableArray([]); // لیست ویزیتور

    self.FDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    self.TestFDocList = ko.observableArray([]); // لیست تست 
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


    if (amountAfterBarCode == "-1")
        $("#Barcode").attr('hidden', '');

    else if (amountAfterBarCode == "1")
        $("#Panel_Barcode_Amount").removeAttr('hidden', '');

    if (sessionStorage.InOut == 2) {

        $('#LableCustCode').text(translate('خریدار'));
        $('#LableHesabCode').text(translate('نام خریدار'));
        //$('#codeHesab').attr('placeholder', 'کد خریدار');
        //$('#nameHesab').attr('placeholder', 'نام خریدار');
        //$('#LableCustCode').attr('placeholder', 'نام خریدار');
        $('#TitleModalCust').text(translate('لیست خریداران'));
        $('#TitleCodeTableModalCust').text(translate('کد خریدار'));
        $('#TitleNameTableModalCust').text(translate('نام خریدار'));
        sessionStorage.sels = "true";
    } else {
        $('#LableCustCode').text(translate('فروشنده'));
        $('#LableHesabCode').text(translate('نام فروشنده'));
        //$('#codeHesab').attr('placeholder', 'کد فروشنده ');
        //$('#nameHesab').attr('placeholder', 'نام فروشنده');
        //$('#LableCustCode').attr('placeholder', 'نام فروشنده ');
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

    var SaveFDoc_HZUri = server + '/api/FDocData/SaveFDoc_HZ/'; // آدرس ویرایس ستون تنظیم

    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    function getRprtColsList() {
        cols = getRprtCols('FDocP', sessionStorage.userName);
        ListColumns = cols;
        /*     var rprtId = 'FDocP';
             ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            ListColumns = data;
        });*/
    }
    getRprtColsList();

    //Get ExtraFields List
    /*function getExtraFieldsList() {
        ajaxFunction(ExtraFieldsUri + ace + '/' + sal + '/' + group + '/' + ModeCodeExtraFields, 'GET').done(function (data) {
            self.ExtraFieldsList(data);
        });
    }*/

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


    //Get Cust List
    function getCustList() {
        var CustObject = {
            forSale: sessionStorage.InOut == 2 ? true : false,
            updatedate: null,
            Mode: 2,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CustUri + ace + '/' + sal + '/' + group, 'POST', CustObject, true).done(function (data) {
            self.CustList(data == null ? [] : data);
        });
    }
    $('#btnCust').click(function () {
        if (self.CustList().length == 0) {
            getCustList();
        }
    });

    //Get kala List
    function getKalaList() {
        var KalaObject = {
            withimage: false,
            updatedate: null,
            Mode: 2,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject, true).done(function (data) {
            self.KalaList(data == null ? [] : data);
        });
    }

    $('#btnkala').click(function () {
        if (self.KalaList().length == 0) {
            getKalaList();
        }
    });

    //Get KalaPrice List
    function getKalaPriceList(insert) {
        ajaxFunction(KalaPriceUri + ace + '/' + sal + '/' + group + '/' + insert, 'GET').done(function (data) {
            self.KalaPriceList(data == null ? [] : data);
            if (self.KalaPriceList().length > 0) {
                //$("#gGhimat").val('شکری');
                //aaaaa = $("#gGhimat").val();
                if (flagupdateHeader == 1) {
                    firstUpdateShow = 1;
                    sessionStorage.PriceCode != "0" ? $("#gGhimat").val(sessionStorage.PriceCode) : $("#gGhimat").val(sessionStorage.GPriceDefult);
                }
                else
                    firstUpdateShow = 0;
                if (sessionStorage.sels == "true")
                    sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                // $("#gGhimat").val(sessionStorage.GPriceDefultS);
                else
                    sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultP);
                // $("#gGhimat").val(sessionStorage.GPriceDefultP);
            }
        });
    }

    //Get Payment List
    function getPaymentList() {
        ajaxFunction(PaymentUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.PaymentList(data == null ? [] : data);
            if (self.PaymentList().length > 0) {
                //if (flagupdateHeader == 1)
                //$("#paymenttype").val(sessionStorage.PaymentType);
            }
        });
    }


    //Get Status List
    function getStatusList() {
        list = localStorage.getItem('FctStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('FctStatus'));
            self.StatusList(list)
        }
        else {
            progName = getProgName('S');
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
                self.StatusList(data);
                localStorage.setItem("FctStatus", JSON.stringify(data));
            });
        }
    }

    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
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
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
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
        ajaxFunction(VstrUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
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


    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {
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
    });


    //Get KalaPriceB List
    function getKalaPriceBList(codeKalaPrice, codeKala) {
        ajaxFunction(KalaPriceBUri + ace + '/' + sal + '/' + group + '/' + codeKalaPrice + '/' + codeKala, 'GET').done(function (data) {
            self.KalaPriceBList(data);
            if (self.KalaPriceBList().length > 0) { // اگر شامل گروه قیمت بود
                var dataPrice = self.KalaPriceBList()[0];
                Price1 = dataPrice.Price1;
                Price2 = dataPrice.Price2;
                Price3 = dataPrice.Price3;
            }
            else if (codeKalaPrice > 0) {// اگر شامل گروه قیمت نبود
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
            self.FDocPList(data == null ? [] : data);
        });
    }

    //Get AddMin List
    function getAddMinList(forSale, serialNumber, custCode, typeJob,
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
            MP10: MP10
        };

        discountCol = 0;
        $("#discountCol").val('');
        $('#ghabelpardakht').val('');
        //getFDocH(Serial == '' ? -1 : Serial);
        ajaxFunction(AddMinUri + ace + '/' + sal + '/' + group, 'POST', CalcAddminObject).done(function (data) {
            if (data.length > 0) {
                var obj = JSON.parse(data);
                self.AddMinList(obj);
                var dataAddminTemp = self.AddMinList()[0];
                discountCol = dataAddminTemp.SumDiscount;
                tempsumfactor = FDocHTotalPrice + FDocHDiscount;// $("#sumfactor").val() != null ? parseFloat($("#sumfactor").val()) : 0;
                $("#discountCol").val(NumberToNumberString(discountCol.toFixed(parseInt(sessionStorage.DeghatFct))));
                $('#ghabelpardakht').val(NumberToNumberString(parseFloat(parseFloat(tempsumfactor) + discountCol).toFixed(parseInt(sessionStorage.DeghatFct))))
            }
        });
    }



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
                    if (sessionStorage.InvDefult_Fct != "null") $("#inv").val(sessionStorage.InvDefult_Fct);
                }
            }
        });
    }

    //Get Unit List
    function getUnit(codeKala) {
        ajaxFunction(UnitUri + ace + '/' + sal + '/' + group + '/' + codeKala, 'GET').done(function (data) {
            self.UnitList(data);
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
                FDocHAmount1 == 0 ? $('#foottextsum').text('') : $('#foottextsum').text(translate('جمع'));
                FDocHAmount1 == 0 ? $('#foottextamount1').text('') : $('#foottextamount1').text(NumberToNumberString(FDocHAmount1.valueOf()));
                FDocHAmount2 == 0 ? $('#foottextamount2').text('') : $('#foottextamount2').text(NumberToNumberString(FDocHAmount2.valueOf()));
                FDocHAmount3 == 0 ? $('#foottextamount3').text('') : $('#foottextamount3').text(NumberToNumberString(FDocHAmount3.valueOf()));
                FDocHTotalPrice == 0 ? $('#foottexttotalprice').text('') : $('#foottexttotalprice').text(NumberToNumberString(parseFloat(FDocHTotalPrice).toFixed(parseInt(sessionStorage.DeghatFct))));
                FDocHDiscount == 0 ? $('#foottextdiscount').text('') : $('#foottextdiscount').text(NumberToNumberString(Math.abs(FDocHDiscount)));
                $('#sumfactor').val(NumberToNumberString(parseFloat(FDocHTotalPrice + FDocHDiscount).toFixed(parseInt(sessionStorage.DeghatFct))));
                $('#ghabelpardakht').val(NumberToNumberString(parseFloat(FDocHFinalPrice).toFixed(parseInt(sessionStorage.DeghatFct))))
            }
        });
    }
    //Get FDocB 
    function getFDocB(serialNumber) {
        ajaxFunction(FDocBListUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.FDocBList(data);
            self.FDocB(data);
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

    function CalcDiscontCol(castCode) {
        var mp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (self.FDocHList().length > 0) {
            for (var i = 1; i < self.AddMinList().length + 1; i++) {
                $('#AddMinMablagh' + i).val() > '0' ? mp[i] = SlashToDot($('#AddMinMablagh' + i).val()) : mp[i] = 0;
            }
        } else {
            mp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        getAddMinList(sessionStorage.sels, Serial, castCode, 0,
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
    }

    function GetBandNumber() {

        if (self.FDocBList().length > 0) {
            bandnumber = self.FDocBList().length + 1;
        } else {
            bandnumber = 1;
        }
    }


    self.ChangeAddMinMablagh = function (AddMinList) {
        CalcDiscontCol(self.CustCode());
    }
    self.KeyAddMinMablagh = function (AddMinList) {
        CalcDiscontCol(self.CustCode());
    }



    // $("#AddMinMablagh1").inputFilter(function (value) {
    //    return /^\d*$/.test(value);
    //});



    /*        if (e.ctrlKey) {
                // CTRL + INS
                if (!((e.keyCode == 45) ||
                    // CTRL + C
                    (e.keyCode == 67) ||
                    // CTRL + V
                    (e.keyCode == 86))) {
    
                    e.preventDefault();
                }
            }
            else {
                if (e.shiftKey) {
                    // SHIFT + TAB
                    if (!((e.keyCode == 9) ||
                        // SHIFT + LEFT ARROW KEY
                        (e.keyCode == 37) ||
                        // SHIFT + RIGHT ARROW KEY
                        (e.keyCode == 39) ||
                        // SHIFT + INS
                        (e.keyCode == 45))) {
                        e.preventDefault();
                    }
                }
                else {
                    // BACKSPACE
                    if (!((e.keyCode == 8) ||
                        // TAB
                        (e.keyCode == 9) ||
                        // LEFT ARROW KEY
                        (e.keyCode == 37) ||
                        // RIGHT ARROW KEY
                        (e.keyCode == 39) ||
                        // DELETE
                        (e.keyCode == 46) ||
    
                        //(e.keyCode == 110) ||
                        // NUMBER KEYS
                        ((e.keyCode >= 48) && (e.keyCode <= 57)) ||
                        // NUMLOCK KEYS
                        ((e.keyCode >= 96) && (e.keyCode <= 105)))) {
                        e.preventDefault();
                    }
                }
            }
            if (e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 111 || e.keyCode == 191) {
                this.value = this.value + String.fromCharCode(47);
            }
            // $("#AddMinMablagh1").val(this.AddMinPrice + String.fromCharCode(e.keyCode));
        }*/




    self.ClearFDocH = function ClearFDocH() {
        //var tarikh = $("#tarikh").val().toEnglishDigit();
        Serial = '';
        sessionStorage.flagupdateHeader = '0';
        flagupdateHeader = 0;
        self.DocNoOut('');
        self.DocDate($('#tarikh').val().toEnglishDigit());
        self.Spec('');
        self.CustCode('');
        $('#nameHesab').val('');
        $('#nameVstr').val('');
        $('#nameArz').val('');

        self.PriceCode('');
        self.InvCode('');
        self.OprCode('');
        self.MkzCode('');
        self.VstrCode('');
        self.ArzCode('');
        self.ArzRate(0);
        arzRate = 0;
        $('#ArzRate').val(0);
        codeOpr = '';
        codeMkz = '';
        codeVstr = '';
        codeArz = '';
    };


    self.ClearFDocB = function ClearFDocB() {
        $('#codeKala').val('');
        $('#nameKala').val('');
        $("#unitName").empty();
        self.KalaCode('');
        self.Amount1('');
        self.Amount2('');
        self.Amount3('');
        self.UnitPrice('');
        self.TotalPrice('');
        self.Discount('');
        self.MainUnit('');
        self.Comm('');

        $('#txtzarib1').text(translate('مقدار 1'));
        $('#txtzarib2').text(translate('مقدار 2'));
        $('#txtzarib3').text(translate('مقدار 3'));

        $('#amounttext').text(translate('مقدار'));


        $('#viewunit').hide();

        $('#amount1').text('');
        $('#amount2').text('');
        $('#amount3').text('');
        $("#amount").val('');
        $("#unitPrice").val('');
        $("#totalPrice").val('');
        $("#comm").val('');

        $("#discountdarsad").val('');
        $("#discountprice").val('');

        $("#totalPrice").css("backgroundColor", "white");
        $("#unitPrice").css("backgroundColor", "white");
        //$("#discountdarsad").css("backgroundColor", "white");
        //$("#discountprice").css("backgroundColor", "white");
        flag = -1;
        flagdiscount = -1;
    };

    self.ImportBand = function (item) {
        self.ClearFDocB();
        self.flagupdateband = false;
        self.bundNumberImport = item.BandNo;
    }


    self.ButtonFDocH = function ButtonFDocH(newFDocH) {
        if (flagInsertFdoch == 0) {
            var tarikh = $("#tarikh").val().toEnglishDigit();
            var docNo = $("#docnoout").val();

            if (tarikh.length != 10)
                return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);

            if (tarikh == '')
                return showNotification(translate('تاریخ را وارد کنید'), 0);

            if ((tarikh >= sessionStorage.BeginDateFct) && (tarikh <= sessionStorage.EndDateFct)) { }
            else
                return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);

            TestFDoc_New(Serial, tarikh, docNo);
            if (resTestNew == true) {
                self.ClearFDocB();
                AddFDocH(newFDocH);
                flagInsertFdoch == 1 ? $('#modal-Band').modal() : null
            }
            /* var TestFDoc_NewObject = {
                 DocDate: tarikh,
                 ModeCode: sessionStorage.ModeCode,
                 DocNo: docNo == "" ? "Auto" : docNo,
             };
 
             ajaxFunction(TestFDoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestFDoc_NewObject).done(function (data) {
                 var obj = JSON.parse(data);
                 self.TestFDoc_NewList(obj);
                 if (data.length > 2) {
                     $('#modal-Test_New').modal('show');
                     SetDataTest_New();
                 } else {
                     self.ClearFDocB();
                     var a = AddFDocH(newFDocH);
                     flagInsertFdoch == 1 ? $('#modal-Band').modal() : null
                 }
             });*/
        } else {
            $('#modal-Band').modal()
        }
    }


    function TestFDoc_New(serialNumber, tarikh, docNo) {
        var TestFDoc_NewObject = {
            DocDate: tarikh,
            ModeCode: sessionStorage.ModeCode,
            DocNo: docNo == "" ? "Auto" : docNo,
            SerialNumber: serialNumber,
        };

        ajaxFunction(TestFDoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestFDoc_NewObject).done(function (data) {
            var obj = JSON.parse(data);
            self.TestFDoc_NewList(obj);
            if (data.length > 2) {
                $('#modal-Test_New').modal('show');
                SetDataTest_New();
                resTestNew = false;
            } else {
                resTestNew = true;
            }
        });
    }




    function SetDataTest_New() {
        $("#BodyTest_New").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestFDoc_NewList();
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

            if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTest_New').append(textBody);

        $('#CountWarning_New').text(countWarning);
        $('#CountError_New').text(countError);

        if (countError > 0) {
            $('#Delete-Modal').attr('hidden', '');
            $('#ShowCountError_New').removeAttr('hidden', '');
        }
        else {
            $('#Delete-Modal').removeAttr('hidden', '')
            $('#ShowCountError_New').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning_New').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning_New').attr('hidden', '');
        }


    }


    self.ButtonFDocHBarcode = function ButtonFDocH(newFDocH) {
        if (flagInsertFdoch == 0) {

            var tarikh = $("#tarikh").val().toEnglishDigit();

            if (tarikh.length != 10)
                return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);

            if (tarikh == '')
                return showNotification(translate('تاریخ را وارد کنید'), 0);

            if ((tarikh >= sessionStorage.BeginDateFct) && (tarikh <= sessionStorage.EndDateFct)) { }
            else
                return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);

            var TestFDoc_NewObject = {
                DocDate: tarikh,
                ModeCode: sessionStorage.ModeCode
            };

            ajaxFunction(TestFDoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestFDoc_NewObject).done(function (data) {
                var obj = JSON.parse(data);
                self.TestFDoc_NewList(obj);
                if (data.length > 2) {
                    $('#modal-Test_New').modal('show');
                    SetDataTest_New();
                } else {
                    var a = AddFDocH(newFDocH);
                    flagInsertFdoch == 1 ? $('#modal-Barcode').modal() : null
                }
            });

        } else {
            $('#modal-Barcode').modal()
        }

        if (self.KalaList().length == 0) {
            getKalaList();
        }
    }

    //Add new FDocH 
    function AddFDocH(newFDocH) {
        sessionStorage.TaeedF = '';
        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();

        bandnumber = 0;

        docno = $("#docnoout").val();

        if (docno.length > 10) {
            return showNotification(translate('شماره نباید بیشتر از ده رقم باشد'), 0);
        }

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را صحیح وارد کنید' });
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را وارد کنید' });
        }

        if ((tarikh >= sessionStorage.BeginDateFct) && (tarikh <= sessionStorage.EndDateFct)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ وارد شده با سال انتخابی همخوانی ندارد' });
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


        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

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
            Tanzim: '*' + sessionStorage.userName + '*',
            TahieShode: ace,
            VstrCode: '',
            VstrPer: 0,
            PakhshCode: '',
            AddMinSpec1: $("#AddMinSharh1").val(),
            AddMinSpec2: $("#AddMinSharh2").val(),
            AddMinSpec3: $("#AddMinSharh3").val(),
            AddMinSpec4: $("#AddMinSharh4").val(),
            AddMinSpec5: $("#AddMinSharh5").val(),
            AddMinSpec6: $("#AddMinSharh6").val(),
            AddMinSpec7: $("#AddMinSharh7").val(),
            AddMinSpec8: $("#AddMinSharh8").val(),
            AddMinSpec9: $("#AddMinSharh8").val(),
            AddMinSpec10: $("#AddMinSharh10").val(),
            AddMinPrice1: 0,
            AddMinPrice2: 0,
            AddMinPrice3: 0,
            AddMinPrice4: 0,
            AddMinPrice5: 0,
            AddMinPrice6: 0,
            AddMinPrice7: 0,
            AddMinPrice8: 0,
            AddMinPrice9: 0,
            AddMinPrice10: 0,
            InvCode: inv,
            Eghdam: sessionStorage.userName,
            EghdamDate: 'null',
            PaymentType: $("#paymenttype").val(),
            Footer: $("#footer").val(),
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
            flagLog: flaglog,
            VstrCode: codeVstr
        };

        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'POST', FDocHObject).done(function (response) {
            //$('#DatileFactor').show();
            //$('#Save').attr('disabled', true);
            var res = response.split("@");
            Serial = res[0];
            DocNoOut = res[1];

            if (flagSaveLogWin == false) {
                SaveLog('Fct5', EditMode_New, LogMode_FDoc, 0, DocNoOut, Serial);
                flagSaveLogWin = true;
            }

            if (Serial == "0") {
                flagInsertFdoch == 0;
                showNotification(DocNoOut, 0);
            }
            else {
                sessionStorage.searchFDocH = DocNoOut;
                $('#textnumberfactor').show();
                $('#docnoout').val(DocNoOut);
                // Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' مشخصات فاکتور به شماره ' + DocNoOut + ' ذخیره شد ' });
                flaglog = 'N';
                flagInsertFdoch = 1;
            }
        });
    };



    self.UpdateFDocH = function UpdateFDocH(newFDocH) {
        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();

        //if (inv == '' || inv == null) {
        //     return showNotification(translate('انبار را انتخاب کنید', 0);
        //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'انبار را انتخاب کنید' });
        //}

        docno = $("#docnoout").val();

        if (docno.length > 10) {
            return showNotification(translate('شماره نباید بیشتر از ده رقم باشد'), 0);
        }


        if (Serial == "" || self.FDocBList().length == 0)
            return showNotification(translate('فاکتور دارای بند قابل ذخیره نیست'), 0);


        if (self.DocNoOut == '') {
            return showNotification(translate('شماره فاکتور را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' شماره فاکتور را وارد کنید ' });
        }

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را صحیح وارد کنید' });
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را وارد کنید' });
        }

        if ((tarikh >= sessionStorage.BeginDateFct) && (tarikh <= sessionStorage.EndDateFct)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
            // return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ وارد شده با سال انتخابی همخوانی ندارد' });
        }

        TestFDoc_New(Serial, tarikh, docno);
        if (resTestNew == false) {
            return null;
        }

        //if (codeCust == '') {
        //codeCust = ' ';
        //     return showNotification(sessionStorage.InOut == 1 ? 'خریدار را انتخاب کنید' : 'فروشنده را انتخاب کنید', 0);
        //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: sessionStorage.InOut == 1 ? 'خریدار را انتخاب کنید' : 'فروشنده را انتخاب کنید' });
        // }


        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

        status = $("#status").val();
        var FDocHObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            CustCode: codeCust,//self.CustCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: sessionStorage.ModeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: $("#docnoout").val(),
            StartNo: 0,
            EndNo: 0,
            Tanzim: '*' + sessionStorage.userName + '*',
            TahieShode: ace,
            VstrCode: 'null',
            VstrPer: 0,
            PakhshCode: '',
            AddMinSpec1: $("#AddMinSharh1").val(),
            AddMinSpec2: $("#AddMinSharh2").val(),
            AddMinSpec3: $("#AddMinSharh3").val(),
            AddMinSpec4: $("#AddMinSharh4").val(),
            AddMinSpec5: $("#AddMinSharh5").val(),
            AddMinSpec6: $("#AddMinSharh6").val(),
            AddMinSpec7: $("#AddMinSharh7").val(),
            AddMinSpec8: $("#AddMinSharh8").val(),
            AddMinSpec9: $("#AddMinSharh9").val(),
            AddMinSpec10: $("#AddMinSharh10").val(),
            AddMinPrice1: $("#AddMinMablagh1").val() == null ? 0 : ($("#iconAddMin1").text() == '+' ? SlashToDot($("#AddMinMablagh1").val()) : SlashToDot($("#AddMinMablagh1").val()) * (-1)), //SlashToDot($("#AddMinMablagh1").val())
            AddMinPrice2: $("#AddMinMablagh2").val() == null ? 0 : ($("#iconAddMin2").text() == '+' ? SlashToDot($("#AddMinMablagh2").val()) : SlashToDot($("#AddMinMablagh2").val()) * (-1)),//SlashToDot($("#AddMinMablagh2").val()),//($("#iconAddMin2").text() == '+' ? SlashToDot($("#AddMinMablagh2").val()) : SlashToDot($("#AddMinMablagh2").val()) * (-1)),
            AddMinPrice3: $("#AddMinMablagh3").val() == null ? 0 : ($("#iconAddMin3").text() == '+' ? SlashToDot($("#AddMinMablagh3").val()) : SlashToDot($("#AddMinMablagh3").val()) * (-1)),//SlashToDot($("#AddMinMablagh3").val()),//($("#iconAddMin3").text() == '+' ? SlashToDot($("#AddMinMablagh3").val()) : SlashToDot($("#AddMinMablagh3").val()) * (-1)),
            AddMinPrice4: $("#AddMinMablagh4").val() == null ? 0 : ($("#iconAddMin4").text() == '+' ? SlashToDot($("#AddMinMablagh4").val()) : SlashToDot($("#AddMinMablagh4").val()) * (-1)),//SlashToDot($("#AddMinMablagh4").val()),//($("#iconAddMin4").text() == '+' ? SlashToDot($("#AddMinMablagh4").val()) : SlashToDot($("#AddMinMablagh4").val()) * (-1)),
            AddMinPrice5: $("#AddMinMablagh5").val() == null ? 0 : ($("#iconAddMin5").text() == '+' ? SlashToDot($("#AddMinMablagh5").val()) : SlashToDot($("#AddMinMablagh5").val()) * (-1)),//SlashToDot($("#AddMinMablagh5").val()),//($("#iconAddMin5").text() == '+' ? SlashToDot($("#AddMinMablagh5").val()) : SlashToDot($("#AddMinMablagh5").val()) * (-1)),
            AddMinPrice6: $("#AddMinMablagh6").val() == null ? 0 : ($("#iconAddMin6").text() == '+' ? SlashToDot($("#AddMinMablagh6").val()) : SlashToDot($("#AddMinMablagh6").val()) * (-1)),//SlashToDot($("#AddMinMablagh6").val()),//($("#iconAddMin6").text() == '+' ? SlashToDot($("#AddMinMablagh6").val()) : SlashToDot($("#AddMinMablagh6").val()) * (-1)),
            AddMinPrice7: $("#AddMinMablagh7").val() == null ? 0 : ($("#iconAddMin7").text() == '+' ? SlashToDot($("#AddMinMablagh7").val()) : SlashToDot($("#AddMinMablagh7").val()) * (-1)),//SlashToDot($("#AddMinMablagh7").val()),//($("#iconAddMin7").text() == '+' ? SlashToDot($("#AddMinMablagh7").val()) : SlashToDot($("#AddMinMablagh7").val()) * (-1)),
            AddMinPrice8: $("#AddMinMablagh8").val() == null ? 0 : ($("#iconAddMin8").text() == '+' ? SlashToDot($("#AddMinMablagh8").val()) : SlashToDot($("#AddMinMablagh8").val()) * (-1)),//SlashToDot($("#AddMinMablagh8").val()),//($("#iconAddMin8").text() == '+' ? SlashToDot($("#AddMinMablagh8").val()) : SlashToDot($("#AddMinMablagh8").val()) * (-1)),
            AddMinPrice9: $("#AddMinMablagh9").val() == null ? 0 : ($("#iconAddMin9").text() == '+' ? SlashToDot($("#AddMinMablagh9").val()) : SlashToDot($("#AddMinMablagh9").val()) * (-1)),//SlashToDot($("#AddMinMablagh9").val()),//($("#iconAddMin9").text() == '+' ? SlashToDot($("#AddMinMablagh9").val()) : SlashToDot($("#AddMinMablagh9").val()) * (-1)),
            AddMinPrice10: $("#AddMinMablagh10").val() == null ? 0 : ($("#iconAddMin10").text() == '+' ? SlashToDot($("#AddMinMablagh10").val()) : SlashToDot($("#AddMinMablagh10").val()) * (-1)), //SlashToDot($("#AddMinMablagh10").val()),//($("#iconAddMin10").text() == '+' ? SlashToDot($("#AddMinMablagh10").val()) : SlashToDot($("#AddMinMablagh10").val()) * (-1)),
            InvCode: inv,
            Status: status,
            //Taeed: status == "تایید" ? sessionStorage.userName : '',
            Taeed: sessionStorage.TaeedF == '' ? status == translate("تایید") ? sessionStorage.userName : '' : sessionStorage.TaeedF,
            Tasvib: status == translate("تصویب") ? sessionStorage.userName : '',
            PaymentType: $("#paymenttype").val(),
            Footer: $("#footer").val(),
            deghat: parseInt(sessionStorage.DeghatFct),
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
        };

        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'PUT', FDocHObject).done(function (response) {
            if (response == "") {
                sessionStorage.searchFDocH = $("#docnoout").val();
                // $('#finalSave_Title').attr('hidden', '');
                flaglog = 'N';

                if (flagSaveLogWin == false) {
                    SaveLog('Fct5', EditMode_Chg, LogMode_FDoc, 0, $("#docnoout").val(), Serial);
                    flagSaveLogWin = true;
                }

                if (flagKalaPrice == true) {
                    ajaxFunction(UpdatePriceUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST').done(function (response) {
                        self.FDocBList(response);
                        self.FDocB(response);
                        getFDocH(Serial);
                        CalcDiscontCol(self.CustCode());
                        flagFinalSave = false;
                        flagKalaPrice = false;
                        //Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'تغییرات با موفقیت انجام شد' });
                        showNotification(translate('تغییرات با موفقیت انجام شد'), 1)
                    });
                } else {
                    getFDocH(Serial);
                }


                if (flagupdateHeader == 1 && flagFinalSave == true) {
                    sessionStorage.flagupdateHeader = 0;
                    flagupdateHeader = 0;
                    window.location.href = sessionStorage.urlFDocH;
                }
                else if (flagupdateHeader == 1 && flagFinalSave == false) {

                }
                else if (flagupdateHeader == 0 && flagFinalSave == false) {

                }
                else {
                    showNotification($('#TitleHeaderFactor').text() + ' ' + translate('ذخیره شد'), 1);
                }
            }
            else {
                return showNotification(translate('خطا : ') + response, 0);
            }


        });
        return "OK";
    }

    //Add new FDocB  
    self.AddFDocB = function AddFDocB(newFDocB) {
        //KalaCode = $("#codeKala").val();
        //var serialNumber = $("#docnoout").val();
        //bandnumber = bandnumber + 1;
        GetBandNumber();
        bandnumber = bandnumber;
        if (Serial == '') {
            return showNotification(translate('اطلاعات اولیه فاکتور ثبت نشده است'), 0);
            //return Swal.fire({ type: 'danger', title: 'اطلاعات ناقص', text: ' اطلاعات اولیه فاکتور ثبت نشده است ' });
        }
        //var cKala = $('#codeKala').val();
        var nKala = $('#nameKala').val();
        //var uKala = $('#unitName').val();

        var uKala = $("#unitName option:selected").val();

        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());


        /*if (flag == 0) {
            unitprice = totalPrice / amount;
            degat = uKala == 1 ? DeghatR1 : uKala == 2 ? DeghatR2 : DeghatR3;
            if (degat > 0)
                unitprice = unitprice.toFixed(degat);
        }*/

        discountprice = SlashToDot($("#discountprice").val());
        comm = $("#comm").val();

        if (KalaCode == '' || nKala == '' || uKala == '') {
            return showNotification(translate('کالا را وارد کنید'), 0);
        }

        if (amount == '') {
            amount = 0;
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'مقدار را وارد کنید' });
        }

        if (unitprice == '') {
            unitprice = 0;
        }

        if (totalPrice == '') {
            totalPrice = 0;
        }


        Amount1 = SlashToDot($('#amount1').text());
        Amount2 = SlashToDot($('#amount2').text());
        Amount3 = SlashToDot($('#amount3').text());

        if ((Amount1 == "" || Amount2 == "" || Amount3 == "")) {
            if (amount > 0)
                Amount1 = amount;
            else
                Amount1 = "0";
        }

        if (uKala == null)
            uKala = 1;

        textZeroAmount = translate('مقدار صفر است')

        if (Amount3 == 0)
            if (Amount2 == 0)
                if (Amount1 == 0) {
                    switch (sessionStorage.ModeCode.toString()) {
                        case sessionStorage.MODECODE_FDOC_SO:
                            if (sessionStorage.FDOCSO_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSO_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_SP:
                            if (sessionStorage.FDOCSP_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSP_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_S:
                            if (sessionStorage.FDOCS_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCS_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_SR:
                            if (sessionStorage.FDOCSR_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSR_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;

                        case sessionStorage.MODECODE_FDOC_SH:
                            if (sessionStorage.FDOCSH_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSH_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_SE:
                            if (sessionStorage.FDOCSE_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSE_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;


                        case sessionStorage.MODECODE_FDOC_PO:
                            if (sessionStorage.FDOCPO_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCPO_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_PP:
                            if (sessionStorage.FDOCPP_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCPP_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_P:
                            if (sessionStorage.FDOCP_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCP_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_PR:
                            if (sessionStorage.FDOCPR_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCPR_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                    }
                }

        textZeroPrice = translate('مبلغ صفر است')

        if (totalPrice == 0) {
            switch (sessionStorage.ModeCode.toString()) {
                case sessionStorage.MODECODE_FDOC_SO:
                    if (sessionStorage.FDOCSO_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSO_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SP:
                    if (sessionStorage.FDOCSP_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSP_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_S:
                    if (sessionStorage.FDOCS_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCS_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SR:
                    if (sessionStorage.FDOCSR_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSR_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;

                /*case sessionStorage.MODECODE_FDOC_SH:
                    if (sessionStorage.FDOCSH_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSH_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SE:
                    if (sessionStorage.FDOCSE_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSE_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;*/


                case sessionStorage.MODECODE_FDOC_PO:
                    if (sessionStorage.FDOCPO_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCPO_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;

                case sessionStorage.MODECODE_FDOC_PP:
                    if (sessionStorage.FDOCPP_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCPP_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_P:
                    if (sessionStorage.FDOCP_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCP_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_PR:
                    if (sessionStorage.FDOCPR_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCPR_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
            }
        }


        temp_FinalPrice = totalPrice - discountprice;
        arzValue = 0
        if (temp_FinalPrice > 0) {

            if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
            }
        }

        var FDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumber,
            KalaCode: KalaCode,
            Amount1: Amount1,//SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount2: Amount2,//SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: Amount3,//SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice,
            TotalPrice: totalPrice + '',//self.TotalPrice(),
            Discount: discountprice,//self.Discount(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag,
            ModeCode: sessionStorage.ModeCode,
            flagLog: flaglog,
            OprCode: codeOpr,
            MkzCode: codeMkz,
            ArzCode: codeArz,
            ArzRate: arzRate,
            ArzValue: arzValue,
        };
        if (self.bundNumberImport > 0) {
            bandnumber = self.bundNumberImport;
        }

        SendFDocBI(FDocBObject)
        /*ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + bandnumber, 'POST', FDocBObject).done(function (response) {
            self.FDocBList(response);
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند به شماره ' + bandnumber + ' ذخیره شد ' });
            self.flagupdateband = false;
            self.bundNumberImport = 0;
            CalcDiscontCol(self.CustCode());
            flaglog = 'N';
            self.UpdateFDocH();
            self.ClearFDocB();
            showNotification(' بند شماره ' + bandnumber + ' ذخیره شد ', 1);
        });*/
    };

    function SendFDocBI(FDocBObject) {
        ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + bandnumber, 'POST', FDocBObject).done(function (response) {
            self.FDocBList(response);
            self.FDocB(response);
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند به شماره ' + bandnumber + ' ذخیره شد ' });
            self.flagupdateband = false;
            self.bundNumberImport = 0;
            CalcDiscontCol(self.CustCode());
            flaglog = 'N';
            self.UpdateFDocH();
            self.ClearFDocB();
            KalaCode = '';
            showNotification(translate('بند شماره') + " " + bandnumber + " " + translate('ذخیره شد'), 1);
        });
    }




    acceptUpdate = false;
    //update FDocB
    self.UpdateFDocB = function UpdateFDocB(newFDocB) {
        //KalaCode = $("#codeKala").val();
        //        bandnumber = bandnumber + 1;
        if (Serial == '') {
            return showNotification(translate('اطلاعات اولیه فاکتور ثبت نشده است'), 0);
            //return Swal.fire({ type: 'danger', title: 'اطلاعات ناقص', text: ' اطلاعات اولیه فاکتور ثبت نشده است ' });
        }
        //var cKala = $('#codeKala').val();
        var nKala = $('#nameKala').val();
        var uKala = $("#unitName option:selected").val();

        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());

        /*if (flag == 0) {
            unitprice = totalPrice / amount;
            degat = uKala == 1 ? DeghatR1 : uKala == 2 ? DeghatR2 : DeghatR3;
            if (degat > 0)
                unitprice = unitprice.toFixed(degat);
        }*/

        discountprice = SlashToDot($("#discountprice").val());
        comm = $("#comm").val();

        if (nKala == '' || uKala == '') {
            return showNotification(translate('کالا را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'کالا را وارد کنید' });
        }

        if (amount == '') {
            amount = 0;
        }

        if (unitprice == '') {
            unitprice = 0;
        }

        if (totalPrice == '') {
            totalPrice = 0;
        }

        Amount1 = SlashToDot($('#amount1').text());
        Amount2 = SlashToDot($('#amount2').text());
        Amount3 = SlashToDot($('#amount3').text());

        if ((Amount1 == "" || Amount2 == "" || Amount3 == "")) {
            if (amount > 0)
                Amount1 = amount;
            else
                Amount1 = "0";
        }

        if (uKala == null)
            uKala = 1;

        textZeroAmount = translate('مقدار صفر است')

        if (Amount3 == 0)
            if (Amount2 == 0)
                if (Amount1 == 0) {
                    switch (sessionStorage.ModeCode.toString()) {
                        case sessionStorage.MODECODE_FDOC_SO:
                            if (sessionStorage.FDOCSO_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSO_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_SP:
                            if (sessionStorage.FDOCSP_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSP_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_S:
                            if (sessionStorage.FDOCS_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCS_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_SR:
                            if (sessionStorage.FDOCSR_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSR_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_SH:
                            if (sessionStorage.FDOCSH_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSH_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_SE:
                            if (sessionStorage.FDOCSE_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCSE_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;

                        case sessionStorage.MODECODE_FDOC_PO:
                            if (sessionStorage.FDOCPO_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCPO_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_PP:
                            if (sessionStorage.FDOCPP_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCPP_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_P:
                            if (sessionStorage.FDOCP_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCP_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                        case sessionStorage.MODECODE_FDOC_PR:
                            if (sessionStorage.FDOCPR_TestZeroAmount == "1")
                                showNotification(textZeroAmount, 2);
                            else if (sessionStorage.FDOCPR_TestZeroAmount == "2")
                                return showNotification(textZeroAmount, 0);
                            break;
                    }
                }

        textZeroPrice = translate('مبلغ صفر است')

        if (totalPrice == 0) {
            switch (sessionStorage.ModeCode.toString()) {
                case sessionStorage.MODECODE_FDOC_SO:
                    if (sessionStorage.FDOCSO_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSO_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SP:
                    if (sessionStorage.FDOCSP_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSP_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_S:
                    if (sessionStorage.FDOCS_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCS_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SR:
                    if (sessionStorage.FDOCSR_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSR_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;

                /*case sessionStorage.MODECODE_FDOC_SH:
                    if (sessionStorage.FDOCSH_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSH_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_SE:
                    if (sessionStorage.FDOCSE_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCSE_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;*/

                case sessionStorage.MODECODE_FDOC_PO:
                    if (sessionStorage.FDOCPO_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCPO_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_PP:
                    if (sessionStorage.FDOCPP_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCPP_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_P:
                    if (sessionStorage.FDOCP_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCP_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
                case sessionStorage.MODECODE_FDOC_PR:
                    if (sessionStorage.FDOCPR_TestZeroPrice == "1")
                        showNotification(textZeroPrice, 2);
                    else if (sessionStorage.FDOCPR_TestZeroPrice == "2")
                        return showNotification(textZeroPrice, 0);
                    break;
            }
        }

        temp_FinalPrice = totalPrice - discountprice;
        arzValue = 0
        if (temp_FinalPrice > 0) {

            if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
            }
        }

        var FDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumberedit,
            KalaCode: KalaCode,
            Amount1: Amount1,//SlashToDot($('#amount1').text()),// self.Amount1(),
            Amount2: Amount2,//SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: Amount3,//SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice,
            TotalPrice: totalPrice,//self.TotalPrice(),
            Discount: discountprice,//self.Discount(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag,
            ModeCode: sessionStorage.ModeCode,
            flagLog: flaglog,
            OprCode: codeOpr,
            MkzCode: codeMkz,
            ArzCode: codeArz,
            ArzRate: arzRate,
            ArzValue: arzValue,
        };
        acceptUpdate = false;
        SendFDocBU(FDocBObject);
        if (acceptUpdate == true) {
            showNotification(translate('بند شماره') + " " + bandnumberedit + " " + translate('ویرایش شد'), 1);
            KalaCode = '';
        }

    };

    function SendFDocBU(FDocBObject) {
        ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + bandnumberedit, 'PUT', FDocBObject).done(function (response) {
            self.FDocBList(response);
            self.FDocB(response);

            self.flagupdateband = false;
            // Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند به شماره ' + bandnumberedit + ' ویرایش شد ' });
            flagFinalSave = false;
            //if (flagupdateHeader == 1) {
            CalcDiscontCol(self.CustCode());
            flaglog = 'N';
            self.UpdateFDocH();
            //getFDocH(Serial);
            //}
            $('#modal-Band').modal('hide');
            self.ClearFDocB();

            acceptUpdate = true;
        });
    }

    self.SerialNumber('0');

    //$('#DatileFactor').hide();
    if (flagupdateHeader != 1) {
        if (parseInt(sal) < SalNow)
            getFDocHLastDate();
    }

    getExtraFieldsList();
    //getCustList();
    //getKalaList();
    getInvList();
    flagupdateHeader == 1 ? getKalaPriceList(false) : getKalaPriceList(true);
    if (flagupdateHeader != 1)
        getAddMinList(sessionStorage.sels, -1, 0, 0,
            '', '', '', '', '', '', '', '', '', ''
            , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        );
    getPaymentList();
    getStatusList();



    //$(document).ready(function () { });
    //------------------------------------------------------
    self.currentPageHesab = ko.observable();
    self.currentPageKala = ko.observable();

    pageSizeCust = localStorage.getItem('pageSizeCust') == null ? 10 : localStorage.getItem('pageSizeCust');
    pageSizeKala = localStorage.getItem('pageSizeKala') == null ? 10 : localStorage.getItem('pageSizeKala');

    self.pageSizeCust = ko.observable(pageSizeCust);
    self.pageSizeKala = ko.observable(pageSizeKala);
    self.currentPageIndexCust = ko.observable(0);
    self.currentPageIndexKala = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    /*self.filterCust = ko.observable("");
        self.filterCustList = ko.computed(function () {
            self.currentPageIndexCust(0);
            var filter = self.filterCust().toLowerCase();
            if (!filter) {
                return self.CustList();
            } else {
                return ko.utils.arrayFilter(self.CustList(), function (item) {
                    if ($("#allSearchHesab").is(':checked')) {
                        result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Name.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Spec.toLowerCase(), filter)
                        //(item.Code.toLowerCase().search(filter) >= 0 || item.Name.toLowerCase().search(filter) >= 0 || item.Spec.toLowerCase().search(filter) >= 0)
                        return result;
                    }
                    else {
                        result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                        //return ko.utils.stringStartsWith(item.Name().toLowerCase(), filter);
                        return result;
                    }
                });
            }
        });*/

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
        //else {
        //    self.currentPageIndexCust(0);
        //}
    };

    self.previousPageCust = function () {
        if (self.currentPageIndexCust() > 0) {
            self.currentPageIndexCust(self.currentPageIndexCust() - 1);
        }
        //else {
        //    self.currentPageIndexCust((Math.ceil(self.filterCustList().length / self.pageSizeCust())) - 1);
        //}
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




    self.filterKala0 = ko.observable("");
    self.filterKala1 = ko.observable("");
    self.filterKala2 = ko.observable("");
    self.filterKala3 = ko.observable("");

    self.filterKalaList = ko.computed(function () {

        self.currentPageIndexKala(0);
        var filter0 = self.filterKala0().toUpperCase();
        var filter1 = self.filterKala1();
        var filter2 = self.filterKala2();
        var filter3 = self.filterKala3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.KalaList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.FanniNo == null ? '' : item.FanniNo.toString().search(filter2) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter3) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageKala = ko.computed(function () {
        var pageSizeKala = parseInt(self.pageSizeKala(), 10),
            startIndex = pageSizeKala * self.currentPageIndexKala(),
            endIndex = startIndex + pageSizeKala;
        localStorage.setItem('pageSizeKala', pageSizeKala);
        return self.filterKalaList().slice(startIndex, endIndex);
    });

    self.nextPageKala = function () {
        if (((self.currentPageIndexKala() + 1) * self.pageSizeKala()) < self.filterKalaList().length) {
            self.currentPageIndexKala(self.currentPageIndexKala() + 1);
        }
        //else {
        //    self.currentPageIndexKala(0);
        //}
    };

    self.previousPageKala = function () {
        if (self.currentPageIndexKala() > 0) {
            self.currentPageIndexKala(self.currentPageIndexKala() - 1);
        }
    };

    self.firstPageKala = function () {
        self.currentPageIndexKala(0);
    };


    self.lastPageKala = function () {
        countKala = parseInt(self.filterKalaList().length / self.pageSizeKala(), 10);
        if ((self.filterKalaList().length % self.pageSizeKala()) == 0)
            self.currentPageIndexKala(countKala - 1);
        else
            self.currentPageIndexKala(countKala);
    };


    self.iconTypeCodeKala = ko.observable("");
    self.iconTypeNameKala = ko.observable("");
    self.iconTypeFanniNoKala = ko.observable("");
    self.iconTypeSpecKala = ko.observable("");

    self.sortTableKala = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.KalaList.sort(function (left, right) {

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

        self.iconTypeCodeKala('');
        self.iconTypeNameKala('');
        self.iconTypeFanniNoKala('');
        self.iconTypeSpecKala('');
        if (orderProp == 'Code') self.iconTypeCodeKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeNameKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FanniNo') self.iconTypeFanniNoKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpecKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    };


    //row select ---------------------------------
    self.selectCust = function (item) {

        if (Serial != '') {
            Swal.fire({
                title: translate('تایید و ثبت نهایی تغییرات ؟'),
                text: translate('در صورت تغییر') + " " + (sessionStorage.InOut == 2 ? translate('خریدار') : translate('فروشنده')) + " " + translate('تغییرات پیش فرض اعمال و ثبت نهایی می شود . آیا عملیات انجام شود؟'),
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
                    $('#nameHesab').val('(' + item.Code + ') ' + item.Name)

                    //                    sessionStorage.GPriceDefult == "null" ? $("#gGhimat").val('گروه قیمت را انتخاب کنید') : $("#gGhimat").val(sessionStorage.GPriceDefult);

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


                    self.CustCode(item.Code)

                    //if ($("#gGhimat").val() != '')
                    flagKalaPrice = true;
                    //else
                    //    flagKalaPrice = false;

                    CalcDiscontCol(self.CustCode());
                    self.UpdateFDocH();
                }
            })
        }
        else {
            codeCust = item.Code;
            $('#nameHesab').val('(' + item.Code + ') ' + item.Name)

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
        }
        $('#nameHesab').focus();
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

    self.selectKala = function (item) {
        self.ClearFDocB();
        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

        KalaCode = item.Code;
        getUnit(item.Code);

        if (sessionStorage.sels == "true") {
            Price1 = item.SPrice1;
            Price2 = item.SPrice2;
            Price3 = item.SPrice3;
        } else {
            Price1 = item.PPrice1;
            Price2 = item.PPrice2;
            Price3 = item.PPrice3;
        }

        getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, item.Code);

        zarib1 = item.zarib1;
        zarib2 = item.zarib2;
        zarib3 = item.zarib3;

        DeghatR1 = item.DeghatR1;
        DeghatR2 = item.DeghatR2;
        DeghatR3 = item.DeghatR3;

        DeghatM1 = item.DeghatM1;
        DeghatM2 = item.DeghatM2;
        DeghatM3 = item.DeghatM3;

        $('#codeKala').val(item.Code);
        $('#nameKala').val('(' + item.Code + ') ' + item.Name);

        Price1 > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');

        defaultUnit = item.DefaultUnit;
        $('#unitName').val(defaultUnit);

        if (defaultUnit == 1) {
            $("#amounttext").val(item.UnitName1);
            $("#iconzarib1").css("backgroundColor", "#c0bfbf");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (defaultUnit == 2) {
            $("#amounttext").text(item.UnitName2);
            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "#c0bfbf");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (defaultUnit == 3) {
            $("#amounttext").text(item.UnitName3);
            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "#c0bfbf");
        }



        $("#txtzarib1").text(item.UnitName1);
        $("#txtzarib2").text(item.UnitName2);
        $("#txtzarib3").text(item.UnitName3);

        if (item.UnitName2 != "" && item.UnitName3 == "") {
            $("#viewunit").show();
            $("#txtzarib3").hide();
            $("#amount3").hide();
        }
        else if (item.UnitName2 != "" && item.UnitName3 != "") {
            $("#viewunit").show();
            $("#txtzarib3").show();
            $("#amount3").show();
        }
        flag = 1;
    };

    function SearchKalaArry(Code, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].Code === Code) {

                zarib1 = myArray[i].zarib1;
                zarib2 = myArray[i].zarib2;
                zarib3 = myArray[i].zarib3;

                DeghatR1 = myArray[i].DeghatR1;
                DeghatR2 = myArray[i].DeghatR2;
                DeghatR3 = myArray[i].DeghatR3;

                DeghatM1 = myArray[i].DeghatM1;
                DeghatM2 = myArray[i].DeghatM2;
                DeghatM3 = myArray[i].DeghatM3;

                if (sessionStorage.sels == "true") {
                    Price1 = myArray[i].SPrice1;
                    Price2 = myArray[i].SPrice2;
                    Price3 = myArray[i].SPrice3;
                } else {
                    Price1 = myArray[i].PPrice1;
                    Price2 = myArray[i].PPrice2;
                    Price3 = myArray[i].PPrice3;
                }
                $("#txtzarib1").text(myArray[i].UnitName1);
                $("#txtzarib2").text(myArray[i].UnitName2);
                $("#txtzarib3").text(myArray[i].UnitName3);

                if (myArray[i].UnitName2 != "" && myArray[i].UnitName3 == "") {
                    $("#viewunit").show();
                    $("#txtzarib3").hide();
                    $("#amount3").hide();
                }
                else if (myArray[i].UnitName2 != "" && myArray[i].UnitName3 != "") {
                    $("#viewunit").show();
                    $("#txtzarib3").show();
                    $("#amount3").show();
                }
                return true;
            }
        }
    }

    self.selectFactor = function (item) {
        if (self.flagupdateband == true) {
            var amo;
            bandnumberedit = item.BandNo;
            getUnit(item.KalaCode);

            KalaCode = item.KalaCode;
            $('#codeKala').val(item.KalaCode);
            $('#nameKala').val('(' + item.KalaCode + ') ' + item.KalaName);

            amountTextUpdate = item.MainUnitName;
            amountValueUpdate = item.MainUnit;

            SearchKalaArry(item.KalaCode, self.KalaList());

            kalapricecode = $("#gGhimat").val();
            getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, item.KalaCode);

            if (item.MainUnit == 1) {
                amo = item.Amount1.toFixed(item.KalaDeghatM1);
                Price1 = item.UnitPrice.toFixed(item.KalaDeghatR1);
                $("#iconzarib1").css("backgroundColor", "#c0bfbf");
                $("#iconzarib2").css("backgroundColor", "white");
                $("#iconzarib3").css("backgroundColor", "white");
            }
            else if (item.MainUnit == 2) {
                amo = item.Amount2.toFixed(item.KalaDeghatM2);
                Price2 = item.UnitPrice.toFixed(item.KalaDeghatR2);
                $("#iconzarib1").css("backgroundColor", "white");
                $("#iconzarib2").css("backgroundColor", "#c0bfbf");
                $("#iconzarib3").css("backgroundColor", "white");
            }
            else if (item.MainUnit == 3) {
                amo = item.Amount3.toFixed(item.KalaDeghatM3);;
                Price3 = item.UnitPrice.toFixed(item.KalaDeghatR3);
                $("#iconzarib1").css("backgroundColor", "white");
                $("#iconzarib2").css("backgroundColor", "white");
                $("#iconzarib3").css("backgroundColor", "#c0bfbf");
            }

            amo != 0 ? $('#amount').val(NumberToNumberString(amo)) : $('#amount').val('');

            item.UnitPrice != 0 ? $('#unitPrice').val(NumberToNumberString(item.UnitPrice.toFixed(item.DeghatR))) : $('#unitPrice').val('');
            item.TotalPrice != 0 ? $('#totalPrice').val(NumberToNumberString(item.TotalPrice.toFixed(parseInt(sessionStorage.DeghatFct)))) : $('#totalPrice').val('');
            item.Discount != 0 ? $('#discountprice').val(NumberToNumberString(Math.abs(item.Discount))) : $('#discountprice').val('');
            ((Math.abs(item.Discount) * 100) / item.TotalPrice) != 0 && item.TotalPrice > 0 ? $('#discountdarsad').val(NumberToNumberString(((Math.abs(item.Discount) * 100) / item.TotalPrice).toFixed(2))) : $('#discountdarsad').val('');
            $('#comm').val(item.Comm);

            flag = item.UP_Flag;

            if (flag == 1) {
                $("#unitPrice").css("backgroundColor", "white");
                $("#totalPrice").css("backgroundColor", "yellow");
            }
            else if (flag == 0) {
                $("#totalPrice").css("backgroundColor", "white");
                $("#unitPrice").css("backgroundColor", "yellow");
            }

            $('#amount1').text(NumberToNumberString(item.Amount1));
            $('#amount2').text(NumberToNumberString(item.Amount2));
            $('#amount3').text(NumberToNumberString(item.Amount3));

            //if (self.flagupdateband == 1)
            $('#modal-Band').modal();
        }

    };

    //-------------------------------------------























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
        sessionStorage.invSelect_Fct = $('#invSelect').val();
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
        sessionStorage.invSelect_Fct = $('#invSelect').val();
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
        $('#ArzRate').val(arzRate);
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
        sessionStorage.invSelect_Fct = $('#invSelect').val();
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





























    self.DeleteBand = function (factorBand) {

        Swal.fire({
            title: mes_Delete,
            text: translate("آیا بند انتخابی حذف شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + factorBand.SerialNumber + '/' + factorBand.BandNo + '/' + sessionStorage.ModeCode + '/' + flaglog, 'DELETE').done(function (response) {
                    self.FDocBList(response);
                    self.FDocB(response);
                    flaglog = 'N';
                    getFDocH(Serial);
                    CalcDiscontCol(self.CustCode());
                    flagFinalSave = false;
                    //self.UpdateFDocH();
                    showNotification(translate('بند شماره') + " " + factorBand.BandNo + " " + translate('حذف شد'), 1);
                });
            }
        })
    };

    self.UpdateBand = function (factorBand) {
        self.flagupdateband = true;
    }


    $('#modal-hesab').on('shown.bs.modal', function () {
        $('#searchHesab').val('');
        self.filterCustList();
        $('#searchHesab').focus();
    });

    $('#modal-kala').on('shown.bs.modal', function () {
        $('#searchKala').val('');
        $('.fix').attr('class', 'form-line focused fix');
        self.filterKalaList();
        $('#searchKala').focus();
    });

    // $('#modal-kala').on('hide.bs.modal', function () {
    //     $('#modal-Band').css("overflow-x", "hidden");
    //    $('#modal-Band').css("overflow-y", "auto");
    //});





    $('#modal-Band').on('show.bs.modal', function () {

        if (self.flagupdateband == false) {
            self.ClearFDocB();
        } else {
            // kalapricecode = $("#gGhimat").val();
            // getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, KalaCode);
            //
            // if (item.MainUnit == 1) {
            //     amo = item.Amount1;
            //     Price1 = item.UnitPrice;
            // }
            // else if (item.MainUnit == 2) {
            //     amo = item.Amount2;
            //     Price2 = item.UnitPrice;
            // }
            // else if (item.MainUnit == 3) {
            //     amo = item.Amount3;
            //      Price3 = item.UnitPrice;
            //}
            $('#amounttext').text(amountTextUpdate);
            $('#unitName').val(amountValueUpdate);
            //flagEditBand = true;
            // $(this).AmountCalc();
        }
        $('.fix').attr('class', 'form-line focused fix');
        $('#comm').css("height", "41px");
        autosize.update($('#comm'));
        $('#btnkala').focus();
    });

    $('#modal-Band').on('hide.bs.modal', function () {
        self.flagupdateband = false;
        self.bundNumberImport = 0;
        flagEditBand = false;
    });

    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#amount").focus();
    });

    $('#insertband').click(function () {
        KalaCode = '';
        self.flagupdateband = false;
    })

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

    $('#refreshkala').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست کالاها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaList();
            }
        })
    })

    $.fn.CalcBand = function () {
        var unitName = $("#unitName").val();
        var amount;
        var unitPrice;
        var totalPrice;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        $("#unitPrice").val() == '' ? unitPrice = 0 : unitPrice = parseFloat(SlashToDot($("#unitPrice").val()));
        $("#totalPrice").val() == '' ? totalPrice = 0 : totalPrice = parseFloat(SlashToDot($("#totalPrice").val()));
        //if (flag == -1) flag = 0;
        var sum = 0;
        if (unitvalue == null) {
            unitvalue = 1;
        }
        if (unitvalue > 0) {
            if (amount > 0) {
                if (unitvalue == "1") {
                    flag == 1 ? sum = (amount * unitPrice).toFixed(DeghatR1) : sum = (totalPrice / amount).toFixed(DeghatR1);
                }
                else if (unitvalue == "2") {
                    flag == 1 ? sum = (amount * unitPrice).toFixed(DeghatR2) : sum = (totalPrice / amount).toFixed(DeghatR2);
                }
                else if (unitvalue == "3") {
                    flag == 1 ? sum = (amount * unitPrice).toFixed(DeghatR3) : sum = (totalPrice / amount).toFixed(DeghatR3);
                }
            }
            else
                sum = 0;

            if (flag == 1) {
                $("#unitPrice").css("backgroundColor", "white");
                $("#totalPrice").css("backgroundColor", "yellow");
                sum != 0 ? $("#totalPrice").val(NumberToNumberString(parseFloat(sum).toFixed(parseInt(sessionStorage.DeghatFct)))) : $("#totalPrice").val('');
            }
            else if (flag == 0) {
                $("#totalPrice").css("backgroundColor", "white");
                $("#unitPrice").css("backgroundColor", "yellow");
                sum != 0 ? $("#unitPrice").val(NumberToNumberString(sum)) : $("#unitPrice").val('');
            }
            $(this).CalcDiscount();
        }
    }

    $.fn.CalcDiscount = function () {
        //ondblclick = "javascript:this.value=StringNumberToNumber(this.value);"
        var totalPrice;
        var discountprice;
        var discountdarsad;
        $("#totalPrice").val() == '' ? totalPrice = 0 : totalPrice = parseFloat(SlashToDot($("#totalPrice").val()));
        $("#discountprice").val() == '' ? discountprice = 0 : discountprice = parseFloat(SlashToDot($("#discountprice").val()));
        $("#discountdarsad").val() == '' ? discountdarsad = 0 : discountdarsad = parseFloat(SlashToDot($("#discountdarsad").val()));
        if (totalPrice > 0) {
            if (flagdiscount == 0) {
                ((discountprice * 100) / totalPrice) != 0 ? $("#discountdarsad").val(NumberToNumberString(((discountprice * 100) / totalPrice).toFixed(2))) : $("#discountdarsad").val('');
                // $("#discountprice").css("backgroundColor", "white");
                // $("#discountdarsad").css("backgroundColor", "yellow");
            }
            else if (flagdiscount == 1) {
                //$("#discountprice").val(NumberToNumberString(((totalPrice * discountdarsad) / 100).toFixed(parseInt(sessionStorage.Deghat))));
                ((totalPrice * discountdarsad) / 100) != 0 ? $("#discountprice").val(NumberToNumberString(((totalPrice * discountdarsad) / 100).toFixed(parseInt(sessionStorage.DeghatFct)))) : $("#discountprice").val('');

                //$("#discountprice").css("backgroundColor", "yellow");
                //$("#discountdarsad").css("backgroundColor", "white");
            }
        }
        else {
            $("#discountdarsad").val('');
            $("#discountprice").val('');
        }
    }


    $("#unitName").change(function () {
        var amounttext;
        var amountvalue;
        if (flagEditBand == false) {
            amounttext = $("#unitName option:selected").text();
            amountvalue = $("#unitName option:selected").val();
        }
        else {
            amounttext = amountTextUpdate;
            amountvalue = amountValueUpdate;
            $("#unitName").val(amountvalue);
            flagEditBand = false;
        }

        if (amountvalue == 1) {
            $("#iconzarib1").css("backgroundColor", "#c0bfbf");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (amountvalue == 2) {
            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "#c0bfbf");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (amountvalue == 3) {

            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "#c0bfbf");
        }

        $("#amounttext").text(amounttext);
        $("#unitPrice").val(0);
        $(this).AmountCalc();
    });

    $("#unitPrice").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flag = 1;
        $(this).CalcBand();
    });

    $("#totalPrice").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flag = 0;
        $(this).CalcBand();
    });

    $("#discountprice").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flagdiscount = 0;
        $(this).CalcDiscount();
    });

    $("#discountdarsad").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flagdiscount = 1;
        $(this).CalcDiscount();
    });


    $.fn.AmountCalc = function () {

        var amount;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        oldprice = SlashToDot($("#unitPrice").val());
        oldtotalprice = SlashToDot($("#unitPrice").val());

        unitvalue = $("#unitName option:selected").val();

        if (unitvalue == "1") {
            $("#unitPrice").val() > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "2") {
            $("#unitPrice").val() > 0 ? $("#unitPrice").val(NumberToNumberString(Price2)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "3") {
            $("#unitPrice").val() > 0 ? $("#unitPrice").val(NumberToNumberString(Price3)) : $("#unitPrice").val('');
        }
        var a1 = 0;
        var a2 = 0;
        var a3 = 0;


        if (unitvalue == "1") {
            a1 = amount;
            zarib2 == 0 ? a2 = 0 : a2 = amount / zarib2;
            zarib3 == 0 ? a3 = 0 : a3 = amount / zarib3;
            //$("#unitPrice").val(NumberToNumberString(Price1));
            Price1 > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "2") {
            a1 = amount * zarib2;
            a2 = amount;
            zarib3 == 0 ? a3 = 0 : a3 = a1 / zarib3;
            Price2 > 0 ? $("#unitPrice").val(NumberToNumberString(Price2)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "3") {
            a1 = (amount * zarib3);// * (zarib2);
            a2 = a1 / zarib2;
            a3 = amount;
            Price3 > 0 ? $("#unitPrice").val(NumberToNumberString(Price3)) : $("#unitPrice").val('');
        }

        if (oldprice > 0)
            $("#unitPrice").val(NumberToNumberString(oldprice))

        a1 != 0 ? a1 = a1.toFixed(DeghatM1) : a1 = "";
        a2 != 0 ? a2 = a2.toFixed(DeghatM2) : a2 = "";
        a3 != 0 ? a3 = a3.toFixed(DeghatM3) : a3 = "";

        $(this).CalcBand();

        $('#amount1').text(NumberToNumberString(DotToSlash(a1)));
        $('#amount2').text(NumberToNumberString(DotToSlash(a2)));
        $('#amount3').text(NumberToNumberString(DotToSlash(a3)));
    };

    $("#amount").keyup(function () {
        //flag = 1;
        $('.fix').attr('class', 'form-line focused fix');
        $(this).AmountCalc();
        $(this).CalcBand();
    });

    self.OptionsCaptionAnbar = ko.computed(function () {
        return self.InvList().length > 0 ? translate('انبار را انتخاب کنید') : translate('انبار تعریف نشده است');
    });

    self.OptionsCaptionKalaPrice = ko.computed(function () {
        return translate('قیمت اطلاعات پایه');
    });

    /*  $("#allSearchHesab").click(function () {
          if ($("#allSearchHesab").is(':checked')) {
              $('#searchHesab').attr('placeholder', 'جستجو بر اساس همه موارد');
          }
          else {
              $('#searchHesab').attr('placeholder', sessionStorage.InOut == 1 ? 'جستجو بر اساس کد خریدار' : 'جستجو بر اساس کد فروشنده');
          }
      });
  
      $("#allSearchKala").click(function () {
          if ($("#allSearchKala").is(':checked')) {
              $('#searchKala').attr('placeholder', 'جستجو بر اساس همه موارد');
          }
          else {
              $('#searchKala').attr('placeholder', 'جستجو بر اساس کد کالا');
          }
      }); */

    self.mablaghAddminKeyDown = function (AddMinList, e) {
        if (e.shiftKey) {
            return
        }
        else {
            var key = e.charCode || e.keyCode || 0;
            //if (key == 110 || key == 190 || key == 111 || key == 191)
            //    key = 47;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 111 || key == 191 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
            );
        }
    }



    self.docNoKeyDown = function (AddMinList, e) {
        if (e.shiftKey) {
            return
        }
        else {
            var key = e.charCode || e.keyCode || 0;
            //if (key == 110 || key == 190 || key == 111 || key == 191)
            //    key = 47;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                (
                    ace == 'Web8' && (key == 109 || key == 111)
                )
                || key == 191 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
            );
        }
    }


    $("#inv").change(function () {
        flagFinalSave = false;

        if (firstUpdateShow == 0 && Serial > 0)
            self.UpdateFDocH();
        if (firstUpdateShow == 1)
            firstUpdateShow = 0;
    })



    $("#gGhimat").change(function () {
        a = $("#sumfactor").val();
        if ($("#sumfactor").val() != '' && viewAction == true && firstUpdateShow == 0) {

            Swal.fire({
                title: translate('تایید و ثبت نهایی تغییرات ؟'),
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
                    kalapricecode = $("#gGhimat").val();
                    if (kalapricecode == null) kalapricecode = "";
                    kalapricecode = $("#gGhimat").val();
                    flagKalaPrice = true;
                    self.UpdateFDocH();
                }
                else {
                    kalapricecode == '0' ? kalapricecode = '' : kalapricecode = kalapricecode;
                    $("#gGhimat").val(kalapricecode);
                    kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                }
            })
        }

    })





    sessionStorage.newFactor == "true" ? $("#AddNewFactor").show() : $("#AddNewFactor").hide();

    $('#AddNewFactor').click(function () {

        Swal.fire({
            title: '',
            text: $('#TitleHeaderFactor').text() + " " + translate("جدید ایجاد می شود . آیا مطمئن هستید ؟"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                flagSaveLogWin = false;
                $('#titlePage').text(textFactor + " " + translate("جدید"));
                getAddMinList(sessionStorage.sels, -1, '', 0,
                    $("#AddMinSharh1").val(),
                    $("#AddMinSharh2").val(),
                    $("#AddMinSharh3").val(),
                    $("#AddMinSharh4").val(),
                    $("#AddMinSharh5").val(),
                    $("#AddMinSharh6").val(),
                    $("#AddMinSharh7").val(),
                    $("#AddMinSharh8").val(),
                    $("#AddMinSharh9").val(),
                    $("#AddMinSharh10").val(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                closedDate = false;
                codeCust = '';
                sessionStorage.flagupdateHeader = 0;
                self.ClearFDocH();
                self.FDocBList([]); // لیست فاکتور
                self.FDocB([]); // لیست فاکتور

                // self.AddMinList([]); // لیست کسورات و افزایشات 
                self.FDocHList([]); // لیست اطلاعات تکمیلی فاکتور فروش 
                $('#foottextsum').text('');
                $('#foottextamount1').text('');
                $('#foottextamount2').text('');
                $('#foottextamount3').text('');
                $('#foottexttotalprice').text('');
                $('#foottextdiscount').text('');
                $('#sumfactor').val('');
                $('#discountCol').val('');
                $('#ghabelpardakht').val('');
                $('#textnumberfactor').hide();
                $('#docnoout').val('');
                sessionStorage.searchFDocH = "";
                $("#status").val(translate('موقت'));
                sessionStorage.Status = translate('موقت');
                $("#paymenttype").val(0);
                sessionStorage.Eghdam = sessionStorage.userName;
                zarib1 = 0;
                zarib2 = 0;
                zarib3 = 0;
                DeghatR1 = 0;
                DeghatR2 = 0;
                DeghatR3 = 0;
                DeghatM1 = 0;
                DeghatM2 = 0;
                DeghatM3 = 0;
                discountCol = 0;
                oldAddMinPrice = 0;
                amountTextUpdate = "";
                amountValueUpdate = "";
                FDocHAmount1 = 0;
                FDocHAmount2 = 0;
                FDocHAmount3 = 0;
                FDocHTotalPrice = 0;
                FDocHFinalPrice = 0;
                FDocHDiscount = 0;
                self.bundNumberImport = 0;
                unitvalue = "";
                KalaCode = '';
                kalapricecode = 0;
                bandnumber = 0;
                bandnumberedit = 0;
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
                self.InvCode = ko.observable(sessionStorage.InvDefult_Fct);
                self.BandNo();
                self.KalaCode();
                self.Amount1();
                self.Amount2();
                self.Amount3();
                self.UnitPrice();
                self.TotalPrice();
                self.Discount();
                self.MainUnit();
                self.Comm();
                self.OprCode("");
                self.MkzCode("");
                self.VstrCode("");
                self.ArzCode("");

                self.ArzRate(0);
                arzRate = 0;
                $('#ArzRate').val(0);

                codeOpr = '';
                codeMkz = '';
                codeVstr = '';
                codeArz = '';
                flaglog = "Y";
                if (sessionStorage.InvDefult_Fct != "null")
                    $("#inv").val(sessionStorage.InvDefult_Fct);

                $("#gGhimat").val(sessionStorage.GPriceDefult);

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



                //sessionStorage.sels == "true" ? sessionStorage.GPriceDefultS : sessionStorage.GPriceDefultP
                $(this).CheckAccess();
            }
        })
    });

    $("#allSearchHesab").click(function () {
        if ($("#allSearchHesab").is(':checked')) {
            $('#allSearchHesabText').text(translate('جستجو بر اساس همه موارد'));
            allSearchHesab = true;
        }

        else {
            $('#allSearchHesabText').text(sessionStorage.InOut == 2 ? translate('جستجو بر اساس کد خریدار') : translate('جستجو بر اساس کد فروشنده'));
            allSearchHesab = false;
        }
    });


    $("#allSearchKala").click(function () {
        if ($("#allSearchKala").is(':checked')) {
            $('#allSearchKalaText').text(translate('جستجو بر اساس همه موارد'));
            allSearchKala = true;
        }
        else {
            $('#allSearchKalaText').text(translate('جستجو بر اساس کد کالا'));
            allSearchKala = false;
        }
    });


    $('#action_headerfactor').attr('style', 'display: none');
    $('#action_bodyfactor').attr('style', 'display: none');
    $('#action_footerfactor').attr('style', 'display: none');
    $('#action_Fdoc').attr('style', 'display: none');
    $('#insertband').attr('style', 'display: none');
    $('#Barcode').attr('style', 'display: none');
    $('#btnCust').attr('style', 'display: none');
    $('#btnMkz').attr('style', 'display: none');
    $('#btnVstr').attr('style', 'display: none');
    $('#btnOpr').attr('style', 'display: none');
    $('#btnArz').attr('style', 'display: none');
    $('#gGhimat').attr('disabled', true);
    $('#inv').attr('disabled', true);


    var showPrice = false;



    $.fn.CheckAccess = function () {

        if (sessionStorage.AccessPrint_Factor == "false") {
            $('#Print_Factor').attr('style', 'display: none')
        }


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

    $(this).CheckAccess();








    $("#searchHesab").on("keydown", function search(e) {
        if (allSearchHesab == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105)
                );
            }
        }
    });

    $("#searchKala").on("keydown", function search(e) {
        if (allSearchKala == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||

                    (key >= 96 && key <= 105));
            }
        }
    });

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
        codeCust = sessionStorage.CustCode;
        self.CustCode(sessionStorage.CustCode);
        self.PriceCode(sessionStorage.PriceCode);
        kalapricecode = sessionStorage.PriceCode;

        $("#docnoout").val(sessionStorage.DocNo);
        $('#textnumberfactor').show();
        //$('#ghabelpardakht').text('');
        $('#nameHesab').val(sessionStorage.CustCode == '' ? '' : '(' + sessionStorage.CustCode + ') ' + sessionStorage.CustName);
        //$("#gGhimat").val(sessionStorage.PriceCode);

        // sessionStorage.Status = item.Status;
        // sessionStorage.PaymentType = item.PaymentType;

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
        $('#ArzRate').val(arzRate);

        getFDocH(Serial);
        getFDocB(Serial);

        getAddMinList(
            sessionStorage.sels,
            Serial,
            sessionStorage.CustCode,
            1,
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
        //sessionStorage.flagupdateHeader = 0;

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
    }

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


    $('#Print_Factor').click(function () {
        if (Serial == '')
            return showNotification(translate('ابتدا فاکتور را ذخیره کنید'), 0);
        createViewer();
        getFDocP(Serial);
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

                        tempData = ko.utils.arrayFilter(self.FDocBList(), function (item) {
                            result = item.KalaCode == DataKalaBarcode.Code
                            return result;
                        });
                        if (tempData.length == 0) { // بند کالا وجود نداشت
                            SetDataBarCode(DataKalaBarcode, 1);
                            $('#TitleBarcode').text(translate('بند جدید ایجاد شد'));
                        }
                        else {
                            dataBandKala = tempData[0];

                            if (dataBandKala.MainUnit == "1") {
                                amountB = dataBandKala.Amount1 + 1;
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

                            a1 != 0 ? a1 = a1.toFixed(DataKalaBarcode.DeghatM1) : a1 = "";
                            a2 != 0 ? a2 = a2.toFixed(DataKalaBarcode.DeghatM2) : a2 = "";
                            a3 != 0 ? a3 = a3.toFixed(DataKalaBarcode.DeghatM3) : a3 = "";


                            temp_FinalPrice = totalPrice - dataBandKala.Discount;
                            arzValue = 0
                            if (temp_FinalPrice > 0) {

                                if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                                    arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
                                }
                            }

                            var FDocBObject = {
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
                                ArzCode: codeArz,
                                ArzRate: arzRate,
                                ArzValue: arzValue,
                            };
                            SendFDocBU(FDocBObject);
                            if (acceptUpdate == true) {
                                $('#TitleBarcode').text(translate('بند شماره') + ' ' + dataBandKala.BandNo + ' ' + translate('ویرایش شد'));
                                $('#Barcode_Value').val('');
                                $('#Barcode_Value').focus();
                            }
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
                if (DataKalaBarcode != null) {
                    $('#TitleBarcode').text(translate('بند جدید ایجاد شد'));
                }
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
        GetBandNumber();
        if (Serial == '') {
            return showNotification(translate('اطلاعات اولیه فاکتور ثبت نشده است '), 0);
        }
        if (DataKalaBarcode == null) {
            return showNotification(translate('کالایی یافت نشد'), 0);
        }

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

        getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, kala.Code);

        if (defaultUnit == "1") {
            a1 = amountB;
            kala.zarib2 == 0 ? a2 = 0 : a2 = amountB / kala.zarib2;
            kala.zarib3 == 0 ? a3 = 0 : a3 = amountB / kala.zarib3;
            unitPrice = Price1;
            totalPrice = a1 * unitPrice;

        }
        else if (defaultUnit == "2") {
            a1 = amountB * kala.zarib2;
            a2 = amountB;
            kala.zarib3 == 0 ? a3 = 0 : a3 = amountB / kala.zarib2;
            unitPrice = Price2;
            totalPrice = a2 * unitPrice;
        }
        else if (defaultUnit == "3") {
            a1 = (amountB * kala.zarib2) * (kala.zarib2);
            a2 = amountB * kala.zarib2;
            a3 = amountB;
            unitPrice = Price3;
            totalPrice = a3 * unitPrice;
        }

        a1 != 0 ? a1 = a1.toFixed(kala.DeghatM1) : a1 = "";
        a2 != 0 ? a2 = a2.toFixed(kala.DeghatM2) : a2 = "";
        a3 != 0 ? a3 = a3.toFixed(kala.DeghatM3) : a3 = "";


        temp_FinalPrice = totalPrice;
        arzValue = 0
        if (temp_FinalPrice > 0) {

            if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
            }
        }


        var FDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumber,
            KalaCode: kala.Code,
            Amount1: a1,
            Amount2: a2,
            Amount3: a3,
            UnitPrice: unitPrice,
            TotalPrice: totalPrice,
            Discount: 0,
            MainUnit: defaultUnit,
            Comm: '',
            Up_Flag: 1,
            ModeCode: sessionStorage.ModeCode,
            flagLog: 'N',
            OprCode: codeOpr,
            MkzCode: codeMkz,
            ArzCode: codeArz,
            ArzRate: arzRate,
            ArzValue: arzValue,
        };
        if (self.bundNumberImport > 0) {
            bandnumber = self.bundNumberImport;
        }

        SendFDocBI(FDocBObject);
        $("#Barcode_Value").val('');
    }

















    /* $('#addPrinttest').click(function () {
         codeSelect = self.CodePrint();
         list = PrintFormsList();
         for (var i = 0; i < list.length; i++) {
             if (list[i].code == codeSelect) {
                 name = list[i].namefa;
                 data = list[i].Data;
             }
         }
     
     
     DataReport = self.FDocPList();
         if (DataReport.length == 0 || DataReport == null || DataReport == "") {
             return showNotification(translate('ابتدا گزارش گیری کنید', 0);
         }
     
         var dStart = new Date();
         var secondsStart = dStart.getTime();
         dateDifference = DateNow + secondsStart; // عدد یونیک
     
     
         report = new Stimulsoft.Report.StiReport();
     report.loadFile(data);
     
         report.dictionary.databases.clear();
         dataSet = new Stimulsoft.System.Data.DataSet("Database");
         DataReport = '{"Data":' + JSON.stringify(DataReport) + '}';
     
         dataSet.readJson(DataReport);
         report.regData(dataSet.dataSetName, "", dataSet);
     
         variablesDataSet = new Stimulsoft.System.Data.DataSet("variables");
         //"{"Data":[{"CoName":"","Amount1":11,"Amount2":0,"Amount3":0,"BandNo":1,"BandSpec":"","Comm":"232132\n21312","KalaCode":"16001","MainUnit":1,"MkzCode":"","OprCode":"","PrdCode":"","SerialNumber":129,"TotalPrice":0,"UnitPrice":0,"UP_Flag":true,"KalaName":"شکر","KalaZarib1":1,"KalaZarib2":1000,"KalaZarib3":1000000,"KalaUnitName1":"گرم","KalaUnitName2":"کیلو گرم","KalaUnitName3":"تن","KalaFanniNo":"","DeghatM1":2,"DeghatM2":2,"DeghatM3":2,"DeghatR1":2,"DeghatR2":2,"DeghatR3":2,"KGruCode":"101","MainUnitName":"گرم","DeghatR":2,"DocNo":"26","DocDate":"1384/03/30","Spec":"","InOut":2,"ThvlCode":"","ThvlName":"","InvCode":"1","InvName":"انبار مواد اولیه","ModeCode":"102","ModeName":"حواله خروج انبار","Footer":"","UnitName":"گرم","Amount":11,"EghdamName":"سوپروایزر","TanzimName":"سوپروایزر","TaeedName":"سوپروایزر","TasvibName":""}]}"
     variablesReport = '{"variables":[{' + printVariable + '}]}';
         variablesDataSet.readJson(variablesReport);
         report.regData(variablesDataSet.dataSetName, "", variablesDataSet);
     
     
         titlesObject = '';
         for (var i = 0; i < ListColumns.length; i++) {
             titlesObject += '"' + ListColumns[i].Code + '":"' + ListColumns[i].Name + '",';
         }
     
     
         titlesDataSet = new Stimulsoft.System.Data.DataSet("Titles");
         titlesReport = '{"Titles":[{' + titlesObject + '}]}';
         titlesDataSet.readJson(titlesReport);
         report.regData(titlesDataSet.dataSetName, "", titlesDataSet);
     
     
         report.dictionary.synchronize();
     
         viewer.report = report;
         //report.render();
     
         viewer.visible = true;
         $('#modal-Report').modal('show');
     
         viewer.onExit = function (e) {
             this.visible = false;
         }
         createDesigner();
     });
     */



























    $('#tarikh').keypress(function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });

    $('#Spec').keypress(function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });

    $('#footer').keypress(function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });


    $('#modal-OtherField').on('hide.bs.modal', function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });

    /*
     $('#inv').click(function () {
         $('#finalSave_Title').removeAttr('hidden', '');
     });
     
     $('#status').click(function () {
         $('#finalSave_Title').removeAttr('hidden', '');
     });
     
     $('#modeCode').click(function () {
         $('#finalSave_Title').removeAttr('hidden', '');
     });
     */

    $('#titleFinalSave').text(translate('ذخیره') + " " + $('#TitleHeaderFactor').text());





    function SetTanzimSanad() {

        var AFI_SaveFDoc_HZ = {
            SerialNumber: Serial,
            Tanzim: sessionStorage.userName,
        };

        ajaxFunction(SaveFDoc_HZUri + ace + '/' + sal + '/' + group, 'POST', AFI_SaveFDoc_HZ).done(function (data) {
            if (flagupdateHeader == 1) {
                sessionStorage.flagupdateHeader = 0;
                flagupdateHeader = 0;

                if (sessionStorage.IsReport == "true") {
                    sessionStorage.IsReport = "false";
                    close();
                }
                else {
                    window.location.href = sessionStorage.urlFDocH;
                }
            }
            else {
                showNotification($('#TitleHeaderFactor').text() + " " + translate('ذخیره شد'), 1);
                //showNotification('سند ذخیره شد ', 1);
            }
        });
    }


    $('#FinalSave').click(function () {



        if (self.UpdateFDocH() != "OK") {
            return null;
        }


        var TestFDocObject = {
            SerialNumber: Serial
        };

        ajaxFunction(TestFDocUri + ace + '/' + sal + '/' + group, 'POST', TestFDocObject).done(function (data) {

            var obj = JSON.parse(data);
            self.TestFDocList(obj);
            if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SH || sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SE) {
                //flagFinalSave = true;
                SetTanzimSanad();
            }
            else {
                if (data.length > 2) {
                    $('#modal-FinalSave').modal('show');
                    SetDataTestDocB()
                } else {
                    flagFinalSave = true;
                    SetTanzimSanad();
                    //self.UpdateFDocH();
                }
            }

        });
    });

    function SetDataTestDocB() {
        $("#BodyTestDocB").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestFDocList();
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
                textBody += '<p>' + $('#LableHesabCode').text() + " " + translate('انتخاب نشده است') + ' </p>';

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


    $('#FinalSave-Modal').click(function () {
        $('#modal-FinalSave').modal('hide');
        //self.UpdateFDocH();
        SetTanzimSanad();
    });

    $('#modal-FinalSave').on('shown.bs.modal', function () {
    });

    $("#nameOpr").keydown(function (e) {
        if (e.keyCode == 46) {
            $("#nameOpr").val('');
            codeOpr = '';
            self.OprCode("");
        }
    });

    $("#nameMkz").keydown(function (e) {
        if (e.keyCode == 46) {
            $("#nameMkz").val('');
            codeMkz = '';
            self.MkzCode("");
        }
    });

    $("#nameVstr").keydown(function (e) {
        if (e.keyCode == 46) {
            $("#nameVstr").val('');
            codeVstr = '';
            self.VstrCode("");
        }
    });




    $('#listOldBand').click(function () {
        self.sortTableFDocB();
        self.filterFDocB1(KalaCode);
        $('#modal-OldBand').modal('show');

    })


    pageSizeFDocB = localStorage.getItem('pageSizeFDocB') == null ? 100 : localStorage.getItem('pageSizeFDocB');
    self.pageSizeFDocB = ko.observable(pageSizeFDocB);
    self.currentPageIndexFDocB = ko.observable(0);

    self.filterFDocB0 = ko.observable("");
    self.filterFDocB1 = ko.observable("");
    self.filterFDocB2 = ko.observable("");
    self.filterFDocB3 = ko.observable("");
    self.filterFDocB4 = ko.observable("");
    self.filterFDocB5 = ko.observable("");
    self.filterFDocB6 = ko.observable("");
    self.filterFDocB7 = ko.observable("");
    self.filterFDocB8 = ko.observable("");
    self.filterFDocB9 = ko.observable("");

    self.filterFDocB = ko.computed(function () {

        self.currentPageIndexFDocB(0);

        var filter0 = self.filterFDocB0();
        var filter1 = self.filterFDocB1();
        var filter2 = self.filterFDocB2();
        var filter3 = self.filterFDocB3();
        var filter4 = self.filterFDocB4();
        var filter5 = self.filterFDocB5();
        var filter6 = self.filterFDocB6();
        var filter7 = self.filterFDocB7();
        var filter8 = self.filterFDocB8();
        var filter9 = self.filterFDocB9();


        if (!filter0 && !filter1 && !filter2 && !filter3 && !filter4 && !filter5 && !filter6 && !filter7 && !filter8 && !filter9) {
            return self.FDocB();
        } else {
            tempData = ko.utils.arrayFilter(self.FDocB(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.BandNo.toString().toLowerCase(), filter0) &&
                    ko.utils.stringStartsWith(item.KalaCode.toString().toLowerCase(), filter1) &&
                    (item.KalaName == null ? '' : item.KalaName.toString().search(filter2) >= 0) &&
                    (item.MainUnitName == null ? '' : item.MainUnitName.toString().search(filter3) >= 0) &&
                    ko.utils.stringStartsWith(item.Amount1.toString().toLowerCase(), filter4) &&
                    ko.utils.stringStartsWith(item.Amount2.toString().toLowerCase(), filter5) &&
                    ko.utils.stringStartsWith(item.Amount3.toString().toLowerCase(), filter6) &&
                    ko.utils.stringStartsWith(item.UnitPrice.toString().toLowerCase(), filter7) &&
                    ko.utils.stringStartsWith(item.TotalPrice.toString().toLowerCase(), filter8) &&
                    (item.Comm == null ? '' : item.Comm.toString().search(filter9) >= 0)

                return result;
            })
            return tempData;
        }
    });


    self.currentPageFDocB = ko.computed(function () {
        var pageSizeFDocB = parseInt(self.pageSizeFDocB(), 10),
            startIndex = pageSizeFDocB * self.currentPageIndexFDocB(),
            endIndex = startIndex + pageSizeFDocB;
        localStorage.setItem('pageSizeFDocB', pageSizeFDocB);
        return self.filterFDocB().slice(startIndex, endIndex);
    });


    self.nextPageFDocB = function () {
        if (((self.currentPageIndexFDocB() + 1) * self.pageSizeFDocB()) < self.filterFDocB().length) {
            self.currentPageIndexFDocB(self.currentPageIndexFDocB() + 1);
        }
    };

    self.previousPageFDocB = function () {
        if (self.currentPageIndexFDocB() > 0) {
            self.currentPageIndexFDocB(self.currentPageIndexFDocB() - 1);
        }
    };

    self.firstPageFDocB = function () {
        self.currentPageIndexFDocB(0);
    };

    self.lastPageFDocB = function () {
        countFDocB = parseInt(self.filterFDocB().length / self.pageSizeFDocB(), 10);
        self.currentPageIndexFDocB(countFDocB);
    };




    self.iconTypeBandNo = ko.observable("");
    self.iconTypeKalaCode = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
    self.iconTypeMainUnitName = ko.observable("");
    self.iconTypeAmount1 = ko.observable("");
    self.iconTypeAmount2 = ko.observable("");
    self.iconTypeAmount3 = ko.observable("");
    self.iconTypeUnitPrice = ko.observable("");
    self.iconTypeTotalPrice = ko.observable("");
    self.iconTypeComm = ko.observable("");



    self.sortTableFDocB = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortFDocB");
            self.sortType = localStorage.getItem("sortTypeFDocB");
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortFDocB", orderProp);
        localStorage.setItem("sortTypeFDocB", self.sortType);

        self.currentColumn(orderProp);
        self.FDocB.sort(function (left, right) {
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

        self.iconTypeBandNo('');
        self.iconTypeKalaCode('');
        self.iconTypeKalaName('');
        self.iconTypeMainUnitName('');
        self.iconTypeAmount1('');
        self.iconTypeAmount2('');
        self.iconTypeAmount3('');
        self.iconTypeUnitPrice('');
        self.iconTypeTotalPrice('');
        self.iconTypeComm('');

        if (orderProp == 'BandNo') self.iconTypeBandNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaCode') self.iconTypeKalaCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaName') self.iconTypeKalaName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MainUnitName') self.iconTypeMainUnitName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount1') self.iconTypeAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount2') self.iconTypeAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount3') self.iconTypeAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice') self.iconTypeUnitPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TotalPrice') self.iconTypeTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Comm') self.iconTypeComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    };

    self.selectFDocB = function (item) {
        var amo;
        //bandnumberedit = item.BandNo;
        getUnit(item.KalaCode);

        KalaCode = item.KalaCode;
        $('#codeKala').val(item.KalaCode);
        $('#nameKala').val('(' + item.KalaCode + ') ' + item.KalaName);

        amountTextUpdate = item.MainUnitName;
        amountValueUpdate = item.MainUnit;

        SearchKalaArry(item.KalaCode, self.KalaList());

        kalapricecode = $("#gGhimat").val();
        getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, item.KalaCode);

        if (item.MainUnit == 1) {
            amo = item.Amount1.toFixed(item.KalaDeghatM1);
            Price1 = item.UnitPrice.toFixed(item.KalaDeghatR1);
            $("#iconzarib1").css("backgroundColor", "#c0bfbf");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (item.MainUnit == 2) {
            amo = item.Amount2.toFixed(item.KalaDeghatM2);
            Price2 = item.UnitPrice.toFixed(item.KalaDeghatR2);
            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "#c0bfbf");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (item.MainUnit == 3) {
            amo = item.Amount3.toFixed(item.KalaDeghatM3);;
            Price3 = item.UnitPrice.toFixed(item.KalaDeghatR3);
            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "#c0bfbf");
        }

        amo != 0 ? $('#amount').val(NumberToNumberString(amo)) : $('#amount').val('');

        item.UnitPrice != 0 ? $('#unitPrice').val(NumberToNumberString(item.UnitPrice.toFixed(item.DeghatR))) : $('#unitPrice').val('');
        item.TotalPrice != 0 ? $('#totalPrice').val(NumberToNumberString(item.TotalPrice.toFixed(parseInt(sessionStorage.DeghatFct)))) : $('#totalPrice').val('');
        item.Discount != 0 ? $('#discountprice').val(NumberToNumberString(Math.abs(item.Discount))) : $('#discountprice').val('');
        ((Math.abs(item.Discount) * 100) / item.TotalPrice) != 0 && item.TotalPrice > 0 ? $('#discountdarsad').val(NumberToNumberString(((Math.abs(item.Discount) * 100) / item.TotalPrice).toFixed(2))) : $('#discountdarsad').val('');
        $('#comm').val(item.Comm);

        flag = item.UP_Flag;

        if (flag == 1) {
            $("#unitPrice").css("backgroundColor", "white");
            $("#totalPrice").css("backgroundColor", "yellow");
        }
        else if (flag == 0) {
            $("#totalPrice").css("backgroundColor", "white");
            $("#unitPrice").css("backgroundColor", "yellow");
        }

        $('#amount1').text(NumberToNumberString(item.Amount1));
        $('#amount2').text(NumberToNumberString(item.Amount2));
        $('#amount3').text(NumberToNumberString(item.Amount3));

        $('#modal-OldBand').modal('hide');
    }





    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "Factor", sessionStorage.SerialNumber);
    };

};

ko.applyBindings(new ViewModel());





