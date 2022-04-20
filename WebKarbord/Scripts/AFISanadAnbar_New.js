var TestFDocList; //لیست خطا ها
var cols;

//اطلاعات سلول
//var dataGrid = $("#gridContainer").dxDataGrid("instance");
//cellValue = dataGrid.cellValue(ro, 'KalaCode');

var ViewModel = function () {
    var self = this;




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


    var amountTextUpdate = "";
    var amountValueUpdate = "";

    var flagEditBand = false;

    var IDocHKAmount1 = 0;
    var IDocHAmount2 = 0;
    var IDocHAmount3 = 0;
    var IDocHTotalPrice = 0;
    var IDocHFinalPrice = 0;
    var IDocHDiscount = 0;
    var sumFactor = 0;


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
    var flagInsertIDocH = 0;

    var accessTaeed = false;
    var accessTasvib = false;
    var accessCancel = false;

    var firstUpdateShow;
    self.flagupdateband = false;
    var amountAfterBarCode;

    self.SerialNumber = ko.observable();
    var Serial = '';

    var KalaList;
    var IDocB;
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
    self.IDocBList = ko.observableArray([]); // لیست انبار
    self.IDocB = ko.observableArray([]); // لیست انبار
    self.InvList = ko.observableArray([]); // لیست انبارها
    self.IDocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی انبار فروش  

    self.StatusList = ko.observableArray([]); // لیست وضعیت 
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.VstrList = ko.observableArray([]); // لیست ویزیتور

    self.FDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    //self.TestFDocList = ko.observableArray([]); // لیست تست 
    self.TestFDoc_NewList = ko.observableArray([]); // لیست تست جدید
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 

    if (sessionStorage.InOut == 1) {
        $('#TitleHeaderAnbar').text(translate('سند وارده به انبار'));
        $('#titlePage').text(translate('سند وارده به انبار جدید'));
        $('#LableThvlCode').text(translate('نام تحویل دهنده'));
        $('#TitleModalThvl').text(translate('لیست تحویل دهند گان'));
        $('#TitleCodeTableModalThvl').text(translate('کد تحویل دهنده'));
        $('#TitleNameTableModalThvl').text(translate('نام تحویل دهنده'));
        $('#ViewSpec').attr('class', 'col-sm-3');
        ModeCodeExtraFields = 'IDOCI';

        amountAfterBarCode = sessionStorage.IDOCIAmountAfterBarCode

        if (localStorage.getItem("Access_SHOWPRICE_IIDOC") == 'true') {
            $('#ViewGGhimat').show();
            $('#emptyDivSanad').hide();
            $('#unitPriceShow').show();
            $('#totalPriceShow').show();
            $('#unitpriceshowgridtitle').show();
            $('#totalpriceshowgridtitle').show();
            $('#unitpriceshowgridbody').show();
            $('#totalpriceshowgridbody').show();
            $('#foottextunitprice').show();
            $('#foottexttotalprice').show();
        }
        else {
            $('#ViewGGhimat').hide();
            $('#emptyDivSanad').show();
            $('#unitPriceShow').hide();
            $('#totalPriceShow').hide();
            $('#unitpriceshowgridtitle').hide();
            $('#totalpriceshowgridtitle').hide();
            $('#unitpriceshowgridbody').hide();
            $('#totalpriceshowgridbody').hide();
            $('#foottextunitprice').hide();
            $('#foottexttotalprice').hide();
            $('#ViewSpec').attr('class', 'col-sm-5');
        }


    } else {
        $('#TitleHeaderAnbar').text(translate('سند صادره از انبار'));
        $('#titlePage').text(translate('سند صادره از انبار جدید'));
        $('#LableThvlCode').text(translate('تحویل گیرنده'));
        $('#TitleModalThvl').text(translate('لیست تحویل گیرند گان'));
        $('#TitleCodeTableModalThvl').text(translate('کد تحویل گیرنده'));
        $('#TitleNameTableModalThvl').text(translate('نام تحویل گیرنده'));
        $('#ViewSpec').attr('class', 'col-sm-5');
        ModeCodeExtraFields = 'IDOCO';

        amountAfterBarCode = sessionStorage.IDOCOAmountAfterBarCode

        $('#ViewGGhimat').hide();
        $('#unitPriceShow').hide();
        $('#totalPriceShow').hide();
        $('#unitpriceshowgridtitle').hide();
        $('#totalpriceshowgridtitle').hide();
        $('#unitpriceshowgridbody').hide();
        $('#totalpriceshowgridbody').hide();
        $('#foottextunitprice').hide();
        $('#foottexttotalprice').hide();
    }



    $("#Panel_Barcode_Amount").attr('hidden', '');


    if (amountAfterBarCode == "-1")
        $("#Barcode").attr('hidden', '');

    else if (amountAfterBarCode == "1")
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


    var IDocHUri = server + '/api/AFI_IDocHi/'; // آدرس هدر انبار 
    var IDocBUri = server + '/api/AFI_IDocBi/'; // آدرس بند انبار 
    var UpdatePriceUri = server + '/api/FDocData/UpdatePrice/'; // آدرس اعمال گروه قیمت
    var IDocHListUri = server + '/api/FDocData/IDocH/'; //آدرس اطلاعات انبار  
    var IDocBListUri = server + '/api/FDocData/IDocB/'; // آدرس لیست بند های انبار 
    var IDocHLastDateUri = server + '/api/FDocData/IDocH/LastDate/'; // آدرس آخرین تاریخ سند

    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس حساب
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var KalaPriceUri = server + '/api/Web_Data/KalaPrice/'; // آدرس گروه قیمت
    var KalaPriceBUri = server + '/api/Web_Data/KalaPriceB/'; //  آدرس  قیمت کالا بر اساس گروه قیمت
    var UnitUri = server + '/api/Web_Data/Unit/'; // آدرس واحد کالا 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 

    var TashimBandUri = server + '/api/Web_Data/TashimBand/'; // آدرس تسهیم بند 

    var PaymentUri = server + '/api/Web_Data/Payment/'; // آدرس نحوه پرداخت 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت پرداخت 

    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var FDocPUri = server + '/api/FDocData/FDocP/'; // آدرس ویوی چاپ سند 

    var TestFDocUri = server + '/api/FDocData/TestFDoc/'; // آدرس تست انبار 
    var TestFDoc_NewUri = server + '/api/FDocData/TestFDoc_New/'; // آدرس تست ایجاد انبار 
    var TestFDoc_EditUri = server + '/api/FDocData/TestFDoc_Edit/'; // آدرس تست ویرایش 

    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var VstrUri = server + '/api/Web_Data/Vstr/'; // آدرس ویزیتور 

    var V_Del_FDocUri = server + '/api/Web_Data/V_Del_FDoc/'; // آدرس ویزیتور 

    var SaveFDoc_HZUri = server + '/api/FDocData/SaveFDoc_HZ/'; // آدرس ویرایس ستون تنظیم
    var IDocHiUri = server + '/api/AFI_IDocHi/'; // آدرس ذخیره هدر انبار 
    var IDocBUri = server + '/api/AFI_IDocBi/'; // آدرس ذخیره بند انبار 


    var IDocBSaveAllUri = server + '/api/AFI_IDocBi/SaveAllDocB/'; // آدرس ذخیره یند انبار 
    var IDocBConvertUri = server + '/api/AFI_IDocBi/Convert/'; // آدرس ذخیره یند انباردر جدول اصلی 

    var UnitNameUri = server + '/api/Web_Data/Web_UnitName/'; // آدرس عنوان واحد ها 

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها


    function getExtraFieldsList() {
        var rprtId = sessionStorage.InOut == 1 ? 'IDocH_P' : 'IDocH_S';
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
            self.CustList(data);
        });
    }
    getCustList();


    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            self.OprList(data);
        });
    }

    getOprList();


    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            self.MkzList(data);
        });
    }

    getMkzList();



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



    //Get  Vstr List
    function getVstrList() {
        ajaxFunction(VstrUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            self.VstrList(data);
        });
    }


    getVstrList();

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

    self.OptionsCaptionKalaPrice = ko.computed(function () {
        return translate('قیمت اطلاعات پایه');
    });
    getKalaPriceList(true);


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
            return showNotification(translate('فقط انبار های تایید شده امکان تصویب دارند'), 0);
        }
    });


    //Get KalaPriceB List
    function getKalaPriceBList(codeKalaPrice, codeKala) {
        ajaxFunction(KalaPriceBUri + ace + '/' + sal + '/' + group + '/' + codeKalaPrice + '/' + codeKala, 'GET').done(function (data) {
            self.KalaPriceBList(data);
            if (self.KalaPriceBList().length > 0) { // اگر شامل گروه قیمت بود
                var dataPrice = self.KalaPriceBList()[0];
                Price1 = parseFloat(dataPrice.Price1);
                Price2 = parseFloat(dataPrice.Price2);
                Price3 = parseFloat(dataPrice.Price3);
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
            self.FDocPList(data);
        });
    }





    //Get IDocH
    function getIDocH(serialNumber) {
        ajaxFunction(IDocHListUri + ace + '/' + sal + '/' + group + '/' + serialNumber + '/' + sessionStorage.ModeCode, 'GET').done(function (data) {
            self.IDocHList(data);

            if (self.IDocHList().length > 0) { // اگر شامل اطلاعات انبار بود
                dataIDocH = self.IDocHList()[0];
                dataIDocH.Amount1 != null ? IDocHAmount1 = dataIDocH.Amount1 : IDocHAmount1 = 0;
                dataIDocH.Amount2 != null ? IDocHAmount2 = dataIDocH.Amount2 : IDocHAmount2 = 0;
                dataIDocH.Amount3 != null ? IDocHAmount3 = dataIDocH.Amount3 : IDocHAmount3 = 0;
                dataIDocH.TotalPrice != null ? IDocHTotalPrice = dataIDocH.TotalPrice : IDocHTotalPrice = 0;
                dataIDocH.Discount != null ? IDocHDiscount = dataIDocH.Discount : IDocHDiscount = 0;
                dataIDocH.FinalPrice != null ? IDocHFinalPrice = dataIDocH.FinalPrice : IDocHFinalPrice = 0;
                // IDocHAmount1 == 0 ? $('#foottextsum').text('') : $('#foottextsum').text(translate('جمع'));
                //IDocHAmount1 == 0 ? $('#foottextamount1').text('') : $('#foottextamount1').text(NumberToNumberString(IDocHAmount1.valueOf()));
                // IDocHAmount2 == 0 ? $('#foottextamount2').text('') : $('#foottextamount2').text(NumberToNumberString(IDocHAmount2.valueOf()));
                // IDocHAmount3 == 0 ? $('#foottextamount3').text('') : $('#foottextamount3').text(NumberToNumberString(IDocHAmount3.valueOf()));
                // IDocHTotalPrice == 0 ? $('#foottexttotalprice').text('') : $('#foottexttotalprice').text(NumberToNumberString(parseFloat(IDocHTotalPrice).toFixed(parseInt(sessionStorage.Deghat))));
                // IDocHDiscount == 0 ? $('#foottextdiscount').text('') : $('#foottextdiscount').text(NumberToNumberString(Math.abs(IDocHDiscount)));
                sumFactor = IDocHTotalPrice + IDocHDiscount;
                $('#sumFactor').text(NumberToNumberString(parseFloat(sumFactor).toFixed(parseInt(sessionStorage.Deghat))));
                $('#ghabelPardakht').text(NumberToNumberString(parseFloat(IDocHFinalPrice).toFixed(parseInt(sessionStorage.Deghat))))
            }
        });
    }


    function getIDocHLastDate() {
        ajaxFunction(IDocHLastDateUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.ModeCode, 'GET').done(function (data) {
            self.DocDate(data);
            $('#btntarikh').click(function () {
                $('#tarikh').change();
            });
        });
    }


    function GetBandNumber() {

        if (self.IDocBList().length > 0) {
            bandnumber = self.IDocBList().length + 1;
        } else {
            bandnumber = 1;
        }
    }







    var firstShowData = true;

    var rprtId = sessionStorage.InOut == 1 ? 'IDocB_P' : 'IDocB_S';

    function getIDocB(serialNumber) {
        ajaxFunction(IDocBListUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {

            for (var i = 0; i < data.length; i++) {
                KalaData = KalaList.filter(s => s.Code == data[i].KalaCode);
                if (KalaData.length > 0) {
                    data[i].dataKala = KalaData[0];
                }
            }
            IDocB = data;
            GetRprtCols_NewList(sessionStorage.userName);
        });

    }





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
            $('#gGhimat').attr('disabled', false);
            $('#inv').attr('disabled', false);
        }
    }

    CheckAccess();


  
    if (flagupdateHeader == 1) {

        flagInsertIDocH = 1;
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

        $('#nameOpr').val(sessionStorage.OprCode == '' ? '' : '(' + sessionStorage.OprCode + ') ' + sessionStorage.OprName);
        $('#nameMkz').val(sessionStorage.MkzCode == '' ? '' : '(' + sessionStorage.MkzCode + ') ' + sessionStorage.MkzName);
        $('#nameVstr').val(sessionStorage.VstrCode == '' ? '' : '(' + sessionStorage.VstrCode + ') ' + sessionStorage.VstrName);

        getIDocH(Serial);
        getIDocB(Serial);

     
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
            $('#gGhimat').attr('disabled', true);
            $('#inv').attr('disabled', true);
        }

        if (codeOpr == "!!!" || codeMkz == "!!!") {
            showNotification($('#TitleHeaderAnbar').text() + ' ' + translate('دارای پروژه و مرکز هزینه متفاوت است و امکان ثبت وجود ندارد'), 0);
        }

        dataGrid.focus(dataGrid.getCellElement(0, 4));
    }
    else {
        flagInsertIDocH = 0;
        if (parseInt(sal) < SalNow) {
            getIDocHLastDate();
        }
        getIDocB(0);
        dataGrid = $("#gridContainer").dxDataGrid("instance");
        // $("#SumBedehkar").val(0);
        //$("#SumBestankar").val(0);
        //$("#TafavotSanad").val(0);
        $("#footer").val('');
       
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
            IDocB[i] = tmp;
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
                s.Code == 'BandNo' ||
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
                s.Code == 'Discount'
            );
        }
        else {
            $("#p_Sum").hide();
          


            cols = cols.filter(s =>
                s.Code == 'BandNo' ||
                s.Code == 'KalaCode' ||
                s.Code == 'KalaName' ||
                //s.Code == 'MainUnit' ||
                s.Code == 'MainUnitName' ||
                s.Code == 'BandSpec' ||
                s.Code == 'Amount1' ||
                s.Code == 'Amount2' ||
                s.Code == 'Amount3' ||
                s.Code == 'Comm'
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

            if (
                data[i].Code == "BandNo"

            ) {
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

        f += ']'

        cols = JSON.parse(f)

        conutHide = 0;
        for (var i = 0; i < cols.length; i++) {
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

                            IDocB.splice(row, 1);

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
                            IDocB.splice(row, 0, dataJson);

                            for (var i = 0; i < IDocB.length; i++) {
                                IDocB[i].BandNo = i;
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
                            IDocB.splice(e.row.rowIndex, 0, clonedItem);

                            for (var i = 0; i < IDocB.length; i++) {
                                IDocB[i].BandNo = i;
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
            dataSource: IDocB,
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
                //    enabled: true,
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

                    IDocB.splice(fromIndex, 1);
                    IDocB.splice(toIndex, 0, e.itemData);
                    IDocB[toIndex].BandNo = visibleRows[fromIndex].data.BandNo

                    e.component.refresh();
                },
            },

            columns: data,

            summary: {
                //recalculateWhileEditing: ,
                totalItems: [{
                    column: 'KalaCode',
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

                if (keyCode == 'Enter' && columnName == 'button') {
                    rows = dataGrid.getVisibleRows().length;
                    if (ro == rows - 1) {

                        e.component.saveEditData();
                        const visibleRows = e.component.getVisibleRows();
                        IDocB.push({});
                        for (var i = 0; i < IDocB.length; i++) {
                            IDocB[i].BandNo = i;
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
                                IDocB.push({});
                                for (var i = 0; i < IDocB.length; i++) {
                                    IDocB[i].BandNo = i;
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
                                    return showNotification(translate('ابتدا انبار را ذخیره کنید'), 0);
                                getFDocP(Serial);
                                createViewer();

                                if (self.FDocPList().length == 0)
                                    return showNotification(translate('برای چاپ انبار حداقل یک بند الزامیست'), 0);

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
                                        flagInsertIDocH = 0;
                                        if (parseInt(sal) < SalNow) {
                                            getIDocHLastDate();
                                        }
                                        getIDocB(0);
                                        dataGrid = $("#gridContainer").dxDataGrid("instance");
                                        sumFactor = 0;
                                        $('#sumFactor').text(0);
                                        $('#discountCol').text(0);
                                        $('#ghabelPardakht').text(0);
                                        self.Spec('');
                                       

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
                                            IDocB[i] = tmp;
                                        }
                                        dataGrid.focus(dataGrid.getCellElement(0, 1));




                                        codeCust = '';





                                        closedDate = false;
                                        codeCust = '';
                                        sessionStorage.flagupdateHeader = 0;
                                        $('#docnoout').val('');
                                        sessionStorage.searchIDocH = "";
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
                                        flagInsertIDocH = 0;
                                        self.flagupdateband = false;
                                        self.SerialNumber();
                                        self.DocNoOut();
                                        self.DocDate();
                                        self.Spec();
                                        self.CustCode();
                                        self.PriceCode = ko.observable(sessionStorage.GPriceDefult);
                                        self.InvCode = ko.observable(sessionStorage.InvDefult);
                                        self.BandNo();
                                        self.KalaCode();
                                        self.OprCode("");
                                        self.MkzCode("");
                                        self.VstrCode("");
                                        codeOpr = '';
                                        codeMkz = '';
                                        codeVstrMkz = '';
                                        flaglog = "Y";
                                        if (sessionStorage.InvDefult != "null") $("#inv").val(sessionStorage.InvDefult);
                                        $("#gGhimat").val(sessionStorage.GPriceDefult);

                                        $('#nameCust').val("");
                                        $('#nameOpr').val("");
                                        $('#nameMkz').val("");
                                        $('#nameVstr').val("");

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

                    if (viewAction == false && (item.name == "save" || item.name == "revertButton" || item.name == "addRow")) {
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
                    a = IDocB;
                    alert(e.fullName + ': ' + e.value);
                    dataGrid.saveEditData();
                    const visibleRows = dataGrid.getVisibleRows();
                    a = IDocB;
                    a = IDocB;
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
                    if (IDocB[ro].UP_Flag == true || (IDocB[ro].UP_Flag == null && IDocB[ro].dataKala != null)) {
                        e.cellElement.css("background-color", '#fdf9b0');
                    }
                }

                if (e.rowType === "data" && e.column.dataField === "UnitPrice") {
                    ro = e.row.rowIndex;
                    if (IDocB[ro].UP_Flag == false) {
                        e.cellElement.css("background-color", '#fdf9b0');
                    }
                }

            },

            onEditorPreparing: function (e) {
                dataField = e.dataField;

                if (e.parentType == 'dataRow' && e.dataField == 'Amount1' || e.dataField == 'Amount2' || e.dataField == 'Amount3') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;

                        if (e.dataField == 'Amount1')
                            IDocB[ro].Amount1 = args.value;
                        else if (e.dataField == 'Amount2')
                            IDocB[ro].Amount2 = args.value;
                        else if (e.dataField == 'Amount3')
                            IDocB[ro].Amount3 = args.value;
                        dataGrid.saveEditData();
                        dataGrid.refresh();

                        CalcAmount(e.row.rowIndex, e.dataField);
                        CalcFactor();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'UnitPrice') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        IDocB[ro].UP_Flag = true;
                        IDocB[ro].UnitPrice = args.value;
                        CalcPrice(ro);
                        dataGrid.saveEditData();
                        dataGrid.refresh();
                        CalcFactor();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'TotalPrice') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        IDocB[ro].UP_Flag = false;
                        IDocB[ro].TotalPrice = args.value;
                        CalcPrice(ro);

                        dataGrid.saveEditData();
                        dataGrid.refresh();
                        CalcFactor();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'Discount') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        IDocB[ro].Discount = args.value;
                        CalcFactor();
                        dataGrid.saveEditData();
                        dataGrid.refresh();
                    }
                }



                /*if (e.parentType == 'dataRow' && e.dataField == 'MainUnitName') {
                    ro = e.row.rowIndex;

                    KalaUnitList = KalaUnitList.filter(s => s.UnitName == IDocB[ro].dataKala.UnitName1);
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
        for (var i = 0; i < IDocB.length; i++) {
            discount = IDocB[i].Discount == null || IDocB[i].Discount == '' ? 0 : parseFloat(IDocB[i].Discount);
            totalPrice = IDocB[i].TotalPrice == null || IDocB[i].TotalPrice == '' ? 0 : parseFloat(IDocB[i].TotalPrice);

            sumDiscount = sumDiscount + discount;
            sumTotalPrice = sumTotalPrice + totalPrice;
        }
        sumFactor = sumTotalPrice - sumDiscount;
        $("#sumFactor").text(NumberToNumberString(sumTotalPrice - sumDiscount));
    }






  





    var Serial_Test = 0;

    function ControlSave() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();

        docno = $("#docnoout").val();

       

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
        for (var i = 0; i < IDocB.length; i++) {
            if (IDocB[i].KalaCode != '') {
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


        var IDocHObject = {
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
           
            InvCode: inv,
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

        ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'POST', IDocHObject).done(function (response) {
            var res = response.split("@");
            Serial_Test = res[1];
        });


        data = IDocB;
        var obj = [];
        for (i = 0; i <= data.length - 1; i++) {
            item = data[i];

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
                flagLog: 'N',
                flagTest: 'Y'
            };

            obj.push(tmp);
        }

        ajaxFunction(IDocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial_Test, 'POST', obj, false).done(function (response) {

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
        ajaxFunction(IDocBUri + ace + '/' + sal + '/' + group + '/' + Serial + '/0/' + sessionStorage.ModeCode + '/Y', 'DELETE').done(function (response) {

        });
    }




    function SaveSanad() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();
        docno = $("#docnoout").val();
        kalapricecode = $("#gGhimat").val();

        if (kalapricecode == null) kalapricecode = "";

      

        if (Serial == 0) {

            var IDocHObject = {
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
               
                InvCode: inv,
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


            ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group, 'POST', IDocHObject).done(function (response) {
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
            var IDocHObject = {
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



            ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'PUT', IDocHObject).done(function (response) {
                sessionStorage.searchIDocH = docno;
                flaglog = 'N';
                DeleteBand();
                if (flagSaveLogWin == false) {
                    SaveLog('Fct5', EditMode_Chg, LogMode_FDoc, 0, docno, Serial);
                    flagSaveLogWin = true;
                }

            });
        }

        /*data = IDocB;
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
 
        ajaxFunction(IDocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST', obj, false).done(function (response) {
            showNotification(translate('سند ذخیره شد'), 1);
        });*/





        var ConvertObject = {
            SerialNumber: Serial,
            TempSerialNumber: Serial_Test,
            ModeCode: sessionStorage.ModeCode,
        };

        ajaxFunction(IDocBConvertUri + ace + '/' + sal + '/' + group, 'POST', ConvertObject, false).done(function (response) {
            showNotification(translate('سند ذخیره شد'), 1);
        });

    }










    CalcAmount = function (row, amountName) {
        item = IDocB[row];// Band.data;
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

        if (mainUnit == "1") IDocB[row].UnitPrice = Price1
        else if (mainUnit == "2") IDocB[row].UnitPrice = Price2
        else if (mainUnit == "3") IDocB[row].UnitPrice = Price3

        var a1 = 0;
        var a2 = 0;
        var a3 = 0;

        if (amountName == 'Amount1') {
            a1 = amount1;
            zarib2 == 0 ? a2 = 0 : a2 = amount1 / zarib2;
            zarib3 == 0 ? a3 = 0 : a3 = amount1 / zarib3;
            Price1 > 0 ? IDocB[row].UnitPrice = parseFloat(Price1).toFixed(deghatR1) : IDocB[row].UnitPrice = 0;
        }
        else if (amountName == 'Amount2') {
            a1 = amount2 * zarib2;
            a2 = amount2;
            zarib3 == 0 ? a3 = 0 : a3 = a1 / zarib3;
            Price2 > 0 ? IDocB[row].UnitPrice = parseFloat(Price2).toFixed(deghatR2) : IDocB[row].UnitPrice = 0;
        }
        else if (amountName == 'Amount3') {
            a1 = (amount3 * zarib3);// * (zarib2);
            a2 = a1 / zarib2;
            a3 = amount3;
            Price3 > 0 ? IDocB[row].UnitPrice = parseFloat(Price3).toFixed(deghatR3) : IDocB[row].UnitPrice = 0;
        }

        if (oldprice > 0)
            IDocB[row].UnitPrice = oldprice;

        a1 != 0 ? a1 = a1.toFixed(deghatM1) : a1 = 0;
        a2 != 0 ? a2 = a2.toFixed(deghatM2) : a2 = 0;
        a3 != 0 ? a3 = a3.toFixed(deghatM3) : a3 = 0;

        IDocB[row].Amount1 = a1;
        IDocB[row].Amount2 = a2;
        IDocB[row].Amount3 = a3;


        CalcPrice(row);
    }

    CalcPrice = function (row) {
        item = IDocB[row];// Band.data;
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

                sum != 0 ? IDocB[row].TotalPrice = parseFloat(sum).toFixed(parseInt(sessionStorage.Deghat)) : IDocB[row].TotalPrice = 0;
            }
            else {
                // $("#totalPrice").css("backgroundColor", "white");
                // $("#unitPrice").css("backgroundColor", "yellow");
                sum != 0 ? IDocB[row].UnitPrice = sum : IDocB[row].UnitPrice = 0;
            }
        }




    }










    setInterval(SaveColumnSanad, 3000);
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
        IDocB[ro].MainUnit = value;

        item = IDocB[ro];// Band.data;
        var mainUnit = parseInt(item.MainUnit);
        var unitPrice = parseFloat(item.UnitPrice);

        var deghatR1 = item.dataKala.DeghatR1;
        var deghatR2 = item.dataKala.DeghatR2;
        var deghatR3 = item.dataKala.DeghatR3;


        if (sessionStorage.sels == "true") {
            Price1 = parseFloat(IDocB[ro].dataKala.SPrice1);
            Price2 = parseFloat(IDocB[ro].dataKala.SPrice2);
            Price3 = parseFloat(IDocB[ro].dataKala.SPrice3);
        } else {
            Price1 = parseFloat(IDocB[ro].dataKala.PPrice1);
            Price2 = parseFloat(IDocB[ro].dataKala.PPrice2);
            Price3 = parseFloat(IDocB[ro].dataKala.PPrice3);
        }

        getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, IDocB[ro].dataKala.Code);

        if (value == "1") IDocB[ro].UnitPrice = Price1 = 0 ? 0 : Price1.toFixed(deghatR1)
        else if (value == "2") IDocB[ro].UnitPrice = Price2 = 0 ? 0 : Price2.toFixed(deghatR2)
        else if (value == "3") IDocB[ro].UnitPrice = Price3 = 0 ? 0 : Price3.toFixed(deghatR3)

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
                                IDocB[ro].dataKala = selectionChangedArgs.selectedRowsData[0];


                                // KalaUnitList = [{ 'id': 1, 'Name': '1' }, { 'id': 2, 'Name': '2' }, { 'id': 3, 'Name': '3' }];
                                // KalaUnitList = [{ 'Name': '1'}];
                                //temp = [];

                                /*  KalaUnitList = [];
                                  if (IDocB[ro].dataKala.UnitName1 != '')
                                      KalaUnitList.push({ 'ID': 1, 'Name': IDocB[ro].dataKala.UnitName1 });
  
                                  if (IDocB[ro].dataKala.UnitName1 != '')
                                      KalaUnitList.push({ 'ID': 2, 'Name': IDocB[ro].dataKala.UnitName2 });
  
                                  if (IDocB[ro].dataKala.UnitName1 != '')
                                      KalaUnitList.push({ 'ID': 3, 'Name': IDocB[ro].dataKala.UnitName3 });
                                      */

                                dataKala = selectionChangedArgs.selectedRowsData[0];
                                IDocB[ro].MainUnit = dataKala.DefaultUnit
                                dataGrid.cellValue(ro, "MainUnitName", dataKala.DefaultUnit == 1 ? IDocB[ro].dataKala.UnitName1 : dataKala.DefaultUnit == 2 ? IDocB[ro].dataKala.UnitName2 : IDocB[ro].dataKala.UnitName3);

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

                                getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, dataKala.Code);

                                dataGrid.cellValue(ro, "UnitPrice", Price1);

                                //KalaUnitList = [];
                                //
                                // KalaUnitList[0].Name = IDocB[ro].dataKala.UnitName1;
                                // KalaUnitList[1].Name = IDocB[ro].dataKala.UnitName2;
                                //KalaUnitList[2].Name = IDocB[ro].dataKala.UnitName3;





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
                                IDocB[ro].dataKala = selectionChangedArgs.selectedRowsData[0];
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
        if (IDocB[ro].dataKala != null) {

            getUnit(IDocB[ro].dataKala.Code);
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
                                    IDocB[ro].MainUnit = selectionChangedArgs.selectedRowsData[0].Code;
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


                    self.CustCode(item.Code)

                    flagKalaPrice = true;
                }
            })
        }
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
        }
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




    /* $("#gGhimat").change(function () {
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
                     self.UpdateIDocH();
                 }
                 else {
                     kalapricecode == '0' ? kalapricecode = '' : kalapricecode = kalapricecode;
                     $("#gGhimat").val(kalapricecode);
                     kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                 }
             })
         }
 
     })*/




};

ko.applyBindings(new ViewModel());
