var TestIDocList; //لیست خطا ها
var cols;

//اطلاعات سلول
//var dataGrid = $("#gridContainer").dxDataGrid("instance");
//cellValue = dataGrid.cellValue(ro, 'KalaCode');

var ViewModel = function () {
    var self = this;
    var forSels = true;
    var raveshInv = 0;

    sal = localStorage.getItem("SalInv");
    var arzCalcMode = localStorage.getItem("ArzCalcMode_Inv");
    var viewAction = false;
    var allSearchThvl = true;
    var allSearchKala = true;
    var flagSaveLogWin = false;

    var flagupdateHeader;
    var flagOtherFieldShow;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;

    if (sessionStorage.CHG == null) {
        sessionStorage.CHG = localStorage.getItem("CHG")
    }

    useSanadOtherUser = localStorage.getItem("TestUse" + sessionStorage.ModeCode + sessionStorage.SerialNumber);

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

    $('#textnumberSanad').hide();
    $('#finalSave_Title').attr('hidden', '');

    TestUser();



    var codeThvl = '';
    var codeOpr = '';
    var codeMkz = '';

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


    var amountTextUpdate = "";
    var amountValueUpdate = "";

    var flagEditBand = false;

    var IDocHKAmount1 = 0;
    var IDocHAmount2 = 0;
    var IDocHAmount3 = 0;
    var IDocHTotalPrice = 0;
    var IDocHFinalPrice = 0;
    var sumSanad = 0;


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

    var flagInsertIDocH = 0;

    var codeArz = '';
    var arzRate = 0;
    $('#ArzRate').val(0);


    var accessTaeed = false;
    var accessTasvib = false;
    var accessCancel = false;

    var firstUpdateShow;
    self.flagupdateband = false;
    var amountAfterBarCode;

    self.SerialNumber = ko.observable();
    var Serial = '';

    var KalaList;
    var kalaFileNoList;
    var kalaStateList;
    var KalaExf1List;
    var KalaExf2List;
    var KalaExf3List;
    var KalaExf4List;
    var KalaExf5List;
    var KalaExf6List;
    var KalaExf7List;
    var KalaExf8List;
    var KalaExf9List;
    var KalaExf10List;
    var KalaExf11List;
    var KalaExf12List;
    var KalaExf13List;
    var KalaExf14List;
    var KalaExf15List;

    //var enableKalaExf = false;
    var isSelectedKalaExf = true;   // کلید تایپ یا انتخاب در ویژگی کالا

    var fctSerialNumber = 0;

    var accSerialNumber = 0;
    var fctReg = FctRegNotSave;


    var IDocB;
    var KalaUnitList = [];// [{ 'ID': 1, 'Name': 'a' }, { 'ID': 2, 'Name': 'b' }, { 'ID': 3, 'Name': 'c' }];
    //var KalaUnitList = [{}];
    // var KalaUnitList = [{ 'Name': '1'}];

    self.DocNoOut = ko.observable();

    self.DocDate = ko.observable(DateNow);
    self.Spec = ko.observable();
    self.ThvlCode = ko.observable();

    self.OprCode = ko.observable();
    self.MkzCode = ko.observable();

    self.ArzCode = ko.observable();
    self.ArzRate = ko.observable();


    self.PriceCode = ko.observable();

    self.StatusSanad = ko.observable();
    self.PaymentSanad = ko.observable();

    self.BandNo = ko.observable();
    self.KalaCode = ko.observable();
    self.Amount1 = ko.observable();
    self.Amount2 = ko.observable();
    self.Amount3 = ko.observable();
    self.UnitPrice = ko.observable();
    self.TotalPrice = ko.observable();
    self.MainUnit = ko.observable();
    self.Comm = ko.observable();

    self.ThvlList = ko.observableArray([]); // لیست تحویل دهنده گیرنده ها
    self.KalaList = ko.observableArray([]); // لیست کالاها
    self.KalaPriceList = ko.observableArray([]); // لیست گروه قیمت
    self.KalaPriceBList = ko.observableArray([]); // قیمت کالا بر اساس گروه قیمت
    self.IDocBList = ko.observableArray([]); // لیست انبار
    self.IDocB = ko.observableArray([]); // لیست انبار
    self.InvList = ko.observableArray([]); // لیست انبارها
    self.IDocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی انبار فروش  

    self.StatusList = ko.observableArray([]); // لیست وضعیت 
    self.IModeList = ko.observableArray([]); // نوع سند 
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.KalaExf_OutList = ko.observableArray([]); // لیست ویژگی ها


    self.KalaFileNoList = ko.observableArray([]); // لیست ویژگی ها
    self.KalaStateList = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf1List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf2List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf3List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf4List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf5List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf6List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf7List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf8List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf9List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf10List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf11List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf12List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf13List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf14List = ko.observableArray([]); // لیست ویژگی ها
    self.KalaExf15List = ko.observableArray([]); // لیست ویژگی ها



    self.IDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    //self.TestIDocList = ko.observableArray([]); // لیست تست 
    self.TestIDoc_NewList = ko.observableArray([]); // لیست تست جدید
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 

    self.ArzList = ko.observableArray([]); // لیست ارز ها


    var showPrice = localStorage.getItem("Access_SHOWPRICE_IIDOC") == 'true';
    var textSanad;

    var autoFctReg = '';
    var autoAccReg = 0;


    var relatedGroupDefault = false;

    if (sessionStorage.InOut == 1) {
        textSanad = translate('سند وارده به انبار')
        $('#TitleHeaderAnbar').text(textSanad);
        $('#titlePage').text(translate('سند وارده به انبار جدید'));
        $('#LableThvlCode').text(translate('تحویل دهنده'));
        $('#TitleModalThvl').text(translate('لیست تحویل دهندگان'));
        $('#TitleCodeTableModalThvl').text(translate('کد تحویل دهنده'));
        $('#TitleNameTableModalThvl').text(translate('نام تحویل دهنده'));
        ModeCodeExtraFields = 'IDOCI';

        amountAfterBarCode = sessionStorage.IDOCIAmountAfterBarCode

        sessionStorage.NEW_IIDOC == "true" ? sessionStorage.newSanad = "true" : sessionStorage.newSanad = "false";

        relatedGroupDefault = localStorage.getItem("RelatedGroupDefault_IDOCI");

        invSelected = localStorage.getItem('InvSelectSanadAnbar_In') == null ? '' : localStorage.getItem('InvSelectSanadAnbar_In');
        modeCodeSelected = localStorage.getItem('ModeCodeSelectSanadAnbar_In') == null ? '' : localStorage.getItem('ModeCodeSelectSanadAnbar_In');

        if (showPrice) {
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
        }

        isSelectedKalaExf = true;

        autoFctReg = sessionStorage.IDOCI_AutoFctReg;
        autoAccReg = sessionStorage.IDOCI_AutoAccReg;

    } else {
        textSanad = translate('سند صادره از انبار')
        $('#TitleHeaderAnbar').text(textSanad);
        $('#titlePage').text(translate('سند صادره از انبار جدید'));
        $('#LableThvlCode').text(translate('تحویل گیرنده'));
        $('#TitleModalThvl').text(translate('لیست تحویل گیرندگان'));
        $('#TitleCodeTableModalThvl').text(translate('کد تحویل گیرنده'));
        $('#TitleNameTableModalThvl').text(translate('نام تحویل گیرنده'));
        ModeCodeExtraFields = 'IDOCO';

        amountAfterBarCode = sessionStorage.IDOCOAmountAfterBarCode
        relatedGroupDefault = localStorage.getItem("RelatedGroupDefault_IDOCO");
        sessionStorage.NEW_IODOC == "true" ? sessionStorage.newSanad = "true" : sessionStorage.newSanad = "false";

        invSelected = localStorage.getItem('InvSelectSanadAnbar_Out') == null ? '' : localStorage.getItem('InvSelectSanadAnbar_Out');
        modeCodeSelected = localStorage.getItem('ModeCodeSelectSanadAnbar_Out') == null ? '' : localStorage.getItem('ModeCodeSelectSanadAnbar_Out');

        $('#ViewGGhimat').hide();
        $('#unitPriceShow').hide();
        $('#totalPriceShow').hide();
        $('#unitpriceshowgridtitle').hide();
        $('#totalpriceshowgridtitle').hide();
        $('#unitpriceshowgridbody').hide();
        $('#totalpriceshowgridbody').hide();
        $('#foottextunitprice').hide();
        $('#foottexttotalprice').hide();
        isSelectedKalaExf = false;

        autoFctReg = sessionStorage.IDOCO_AutoFctReg;
        autoAccReg = sessionStorage.IDOCO_AutoAccReg;
    }

    var RelatedGroup = localStorage.getItem("RelatedGroup_Inv");
    $("#p_RelatedGroupActive").hide();
    if (parseInt(RelatedGroup) > 0) {
        $("#p_RelatedGroupActive").show();
        $('#relatedGroupActive').prop('checked', relatedGroupDefault == "1" ? true : false);
    }


    self.InvCode = ko.observable(invSelected);
    self.modeCode = ko.observable(modeCodeSelected);

    $("#Panel_Barcode_Amount").attr('hidden', '');

    if (amountAfterBarCode == "1")
        $("#Panel_Barcode_Amount").removeAttr('hidden', '');


    /*if (sessionStorage.InOut == 2) {
        $('#LableThvlCode').text(translate('فروشنده'));
        $('#LableThvlCode').text(translate('نام فروشنده'));
        $('#TitleModalThvl').text(translate('لیست فروشندگان'));
        $('#TitleCodeTableModalThvl').text(translate('کد فروشنده'));
        $('#TitleNameTableModalThvl').text(translate('نام فروشنده'));
        sessionStorage.sels = "true";
        sessionStorage.NEW_IODOC == "true" ? sessionStorage.newSanad = "true" : sessionStorage.newSanad = "false";
    } else {
        $('#TitleHeaderAnbar').text(translate('سند وارده به انبار'));
        $('#titlePage').text(translate('سند وارده به انبار جدید'));
        $('#LableThvlCode').text(translate('نام تحویل دهنده'));
        $('#TitleModalThvl').text(translate('لیست تحویل دهند گان'));
        $('#TitleCodeTableModalThvl').text(translate('کد تحویل دهنده'));
        $('#TitleNameTableModalThvl').text(translate('نام تحویل دهنده'));

        sessionStorage.sels = "false";
        sessionStorage.NEW_IIDOC == "true" ? sessionStorage.newSanad = "true" : sessionStorage.newSanad = "false";
    }*/
    if (sessionStorage.InOut == 2) {
        sessionStorage.sels = "true";
    } else {
        sessionStorage.sels = "false";
    }

    if (ace == "Web8") {
        if (flagupdateHeader == 1) {
            $('#inv').prop('disabled', true);
            $('#modeCode').prop('disabled', true);
        }
        else {
            $('#inv').prop('disabled', false);
            $('#modeCode').prop('disabled', false);
        }
    }

    if (ace == "Web1") {
        if (flagupdateHeader == 1) {
            $('#inv').prop('disabled', true);
        }
        else {
            $('#inv').prop('disabled', false);
        }
    }




    var IDocHUri = server + '/api/AFI_IDocHi/'; // آدرس هدر انبار 
    var IDocBUri = server + '/api/AFI_IDocBi/'; // آدرس بند انبار 
    var UpdatePriceUri = server + '/api/IDocData/UpdatePrice/'; // آدرس اعمال گروه قیمت
    var IDocHListUri = server + '/api/IDocData/IDocH/'; //آدرس اطلاعات انبار  
    var IDocBListUri = server + '/api/IDocData/IDocB/'; // آدرس لیست بند های انبار 
    var IDocHLastDateUri = server + '/api/IDocData/IDocH/LastDate/'; // آدرس آخرین تاریخ سند

    var ThvlUri = server + '/api/Web_Data/Thvl/'; // آدرس حساب
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var KalaPriceUri = server + '/api/Web_Data/KalaPrice/'; // آدرس گروه قیمت
    var KalaPriceBUri = server + '/api/Web_Data/KalaPriceB/'; //  آدرس  قیمت کالا بر اساس گروه قیمت
    var UnitUri = server + '/api/Web_Data/Unit/'; // آدرس واحد کالا 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 


    var PaymentUri = server + '/api/Web_Data/Payment/'; // آدرس نحوه پرداخت 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت پرداخت 
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع سند


    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var IDocPUri = server + '/api/IDocData/IDocP/'; // آدرس ویوی چاپ سند 

    var TestIDocUri = server + '/api/IDocData/TestIDoc/'; // آدرس تست انبار 
    var TestIDoc_NewUri = server + '/api/IDocData/TestIDoc_New/'; // آدرس تست ایجاد انبار 
    var TestIDoc_EditUri = server + '/api/IDocData/TestIDoc_Edit/'; // آدرس تست ویرایش 

    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var KalaExf_Inv_OutUri = server + '/api/IDocData/KalaExf_Inv_Out/'; // آدرس ویژگی کالا در صادره 

    var V_Del_IDocUri = server + '/api/Web_Data/V_Del_IDoc/'; // آدرس ویزیتور 

    var SaveIDoc_HZUri = server + '/api/IDocData/SaveIDoc_HZ/'; // آدرس ویرایس ستون تنظیم
    var IDocHiUri = server + '/api/AFI_IDocHi/'; // آدرس ذخیره هدر انبار 
    var IDocBUri = server + '/api/AFI_IDocBi/'; // آدرس ذخیره بند انبار 


    var IDocBSaveAllUri = server + '/api/AFI_IDocBi/SaveAllDocB/'; // آدرس ذخیره یند انبار 
    var IDocBConvertUri = server + '/api/AFI_IDocBi/Convert/'; // آدرس ذخیره یند انباردر جدول اصلی 

    var UnitNameUri = server + '/api/Web_Data/Web_UnitName/'; // آدرس عنوان واحد ها 
    var IChangeStatusUri = server + '/api/IDocData/ChangeStatus/'; // آدرس تغییر وضعیت اسناد 

    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 

    var TrzIUri = server + '/api/ReportInv/TrzI/'; // آدرس مانده کالا 
    var TrzIExfUri = server + '/api/ReportInv/TrzIExf/'; // آدرس گزارش 
    var KalaExf_InvUri = server + '/api/IDocData/KalaExf_Inv/'; // آدرس لیست وسژگی کالا 
    var KalaMjdUri = server + '/api/Web_Data/KalaMjd/'; // آدرس لیست  موجودی کالا 
    var SaveExtraFieldListsUri = server + '/api/Web_Data/SaveExtraFieldLists/'; // آدرس ذخیره 


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها


    function getExtraFieldsList() {
        rprtId = sessionStorage.InOut == 1 ? 'IDocH_I' : 'IDocH_O';
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

    //Get Thvl List
    function getThvlList() {
        whereThvl = localStorage.getItem('whereThvl');
        var ThvlObject = {
            Mode: 3,
            UserCode: sessionStorage.userName,
            Where: whereThvl,
        }
        ajaxFunction(ThvlUri + ace + '/' + sal + '/' + group, 'POST', ThvlObject, true).done(function (data) {
            self.ThvlList(data == null ? [] : data);
        });
    }

    $('#btnThvl').click(function () {
        if (self.ThvlList().length == 0) {
            getThvlList();
        }
    });


    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            self.OprList(data == null ? [] : data);
        });
    }

    function getKalaExf_OutList(invCode, kalaCode) {
        var KalaExf_Inv_OutObject = {
            InvCode: invCode,
            KalaCode: kalaCode
        }

        ajaxFunction(KalaExf_Inv_OutUri + ace + '/' + sal + '/' + group, 'POST', KalaExf_Inv_OutObject, false).done(function (data) {
            self.KalaExf_OutList(data == null ? [] : data);
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
        whereKala = localStorage.getItem('whereKala');
        var KalaObject = {
            withimage: false,
            updatedate: null,
            Mode: 2,
            UserCode: sessionStorage.userName,
            where: whereKala,
            KalaCode: ''
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject, false).done(function (data) {
            self.KalaList(data);
            KalaList = data;
        });
    }



    getKalaList();

    //Get kalaExf List
    function getKalaExf_InvList(field) {
        var KalaExf_InvObject = {
            fieldName: field
        }
        ajaxFunction(KalaExf_InvUri + ace + '/' + sal + '/' + group, 'POST', KalaExf_InvObject, false).done(function (data) {
            if (field == 'KalaFileNo') {
                self.KalaFileNoList(data);
                kalaFileNoList = data;
            }
            else if (field == 'KalaState') {
                self.KalaStateList(data);
                kalaStateList = data;
            }
            else if (field == 'KalaExf1') {
                self.KalaExf1List(data);
                KalaExf1List = data;
            }
            else if (field == 'KalaExf2') {
                self.KalaExf2List(data);
                KalaExf2List = data;
            }
            else if (field == 'KalaExf3') {
                self.KalaExf3List(data);
                KalaExf3List = data;
            }
            else if (field == 'KalaExf4') {
                self.KalaExf4List(data);
                KalaExf4List = data;
            }
            else if (field == 'KalaExf5') {
                self.KalaExf5List(data);
                KalaExf5List = data;
            }
            else if (field == 'KalaExf6') {
                self.KalaExf6List(data);
                KalaExf6List = data;
            }
            else if (field == 'KalaExf7') {
                self.KalaExf7List(data);
                KalaExf7List = data;
            }
            else if (field == 'KalaExf8') {
                self.KalaExf8List(data);
                KalaExf8List = data;
            }
            else if (field == 'KalaExf9') {
                self.KalaExf9List(data);
                KalaExf9List = data;
            }
            else if (field == 'KalaExf10') {
                self.KalaExf10List(data);
                KalaExf10List = data;
            }
            else if (field == 'KalaExf11') {
                self.KalaExf11List(data);
                KalaExf11List = data;
            }
            else if (field == 'KalaExf12') {
                self.KalaExf12List(data);
                KalaExf12List = data;
            }
            else if (field == 'KalaExf13') {
                self.KalaExf13List(data);
                KalaExf13List = data;
            }
            else if (field == 'KalaExf14') {
                self.KalaExf14List(data);
                KalaExf14List = data;
            }
            else if (field == 'KalaExf15') {
                self.KalaExf15List(data);
                KalaExf15List = data;
            }
        });
    }

    if (sessionStorage.InOut == 1 && ace == 'Web8') {
        getKalaExf_InvList('KalaFileNo');
        getKalaExf_InvList('KalaState');
        getKalaExf_InvList('KalaExf1');
        getKalaExf_InvList('KalaExf2');
        getKalaExf_InvList('KalaExf3');
        getKalaExf_InvList('KalaExf4');
        getKalaExf_InvList('KalaExf5');
        getKalaExf_InvList('KalaExf6');
        getKalaExf_InvList('KalaExf7');
        getKalaExf_InvList('KalaExf8');
        getKalaExf_InvList('KalaExf9');
        getKalaExf_InvList('KalaExf10');
        getKalaExf_InvList('KalaExf11');
        getKalaExf_InvList('KalaExf12');
        getKalaExf_InvList('KalaExf13');
        getKalaExf_InvList('KalaExf14');
        getKalaExf_InvList('KalaExf15');
    }


    function getStatusList() {
        list = localStorage.getItem('InvStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('InvStatus'));
            self.StatusList(list)
        }
        else {
            progName = getProgName('A');
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
                self.StatusList(data);
                localStorage.setItem("InvStatus", JSON.stringify(data));
            });
        }
    }

    getStatusList();



    //Get IMode List
    function getIModeList() {

        var IModeObject = {
            Mode: 3,
            InOut: sessionStorage.InOut,
            UserCode: sessionStorage.userName,
        }

        ajaxFunction(IModeUri + ace + '/' + sal + '/' + group, 'POST', IModeObject).done(function (data) {
            self.IModeList(data);

        });
    }

    getIModeList();




    var invSelect = "";

    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/2/' + sessionStorage.userName, 'GET').done(function (data) {

            self.InvList(data);
            if (self.InvList().length > 0) {

                if (flagupdateHeader == 1) {
                    invSelect = sessionStorage.InvCode;
                }
                else {
                    if (sessionStorage.InvDefult_Inv == "null" || sessionStorage.InvDefult_Inv == "") {
                        invSelect = invSelected;
                    }
                    else {
                        invSelect = sessionStorage.InvDefult_Inv;
                    }
                }
            }

            $('#docnoout').attr('readonly', false);
            var list = data;
            for (var i = 0; i < list.length; i++) {
                if (list[i].Code == invSelect) {
                    raveshInv = list[i].Ravesh;
                    sameNoAllMode = list[i].SameNoAllMode;
                    if (list[i].AutoDocNo == 1) {
                        $('#docnoout').attr('readonly', true);
                    }
                }
            }
        });
    }

    /*
    function GetTrzIKala(kalaCode, mainUnit) {
        taTarikh = $("#tarikh").val().toEnglishDigit();

        var TrzIObject = {
            azTarikh: '',
            taTarikh: taTarikh,
            StatusCode: '',
            ModeCode: '',
            InvCode: '',
            KGruCode: '',
            KalaCode: kalaCode,
            ThvlCode: '',
            TGruCode: '',
            MkzCode: '',
            OprCode: '',
        };

        ajaxFunction(TrzIUri + ace + '/' + sal + '/' + group, 'POST', TrzIObject, true).done(function (data) {
            mAmount = 0;
            mTotalPrice = 0;
            if (data == notAccess) {
                $('#MAmount').text("به گزارش دسترسی ندارید");
                $('#MTotalPrice').text("به گزارش دسترسی ندارید");
                $('#MAmount').css('color', 'red');
                $('#MTotalPrice').css('color', 'red');
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    if (mainUnit == 1) {
                        mAmount += data[i].MAmount1;
                    }
                    else if (mainUnit == 2) {
                        mAmount += data[i].MAmount2;
                    }
                    else if (mainUnit == 3) {
                        mAmount += data[i].MAmount3;
                    }
                    mTotalPrice += data[i].MTotalPrice;
                }
                $("#MAmount").text(NumberToNumberString(mAmount));
                $("#MTotalPrice").text(NumberToNumberString(mTotalPrice));
            }

        });
    }
    function GetTrzIKalaExf(invCode, kalaCode, mainUnit,
        kalaFileNo,
        kalaState,
        kalaExf1,
        kalaExf2,
        kalaExf3,
        kalaExf4,
        kalaExf5,
        kalaExf6,
        kalaExf7,
        kalaExf8,
        kalaExf9,
        kalaExf10,
        kalaExf11,
        kalaExf12,
        kalaExf13,
        kalaExf14,
        kalaExf15
    ) {
        taTarikh = $("#tarikh").val().toEnglishDigit();

        var TrzIExfObject = {
            azTarikh: '',
            taTarikh: taTarikh,
            StatusCode: 'موقت ,تایید ,تصویب',
            ModeCode: '',
            InvCode: invCode,
            KGruCode: '',
            KalaCode: kalaCode,
            ThvlCode: '',
            TGruCode: '',
            MkzCode: '',
            OprCode: '',
        };

        ajaxFunction(TrzIExfUri + ace + '/' + sal + '/' + group, 'POST', TrzIExfObject, true).done(function (data) {

            mAmount = 0;
            mTotalPrice = 0;
            if (data == notAccess) {
                $('#MAmount').text("به گزارش دسترسی ندارید");
                $('#MTotalPrice').text("به گزارش دسترسی ندارید");
                $('#MAmount').css('color', 'red');
                $('#MTotalPrice').css('color', 'red');
            }
            else {
                data = data.filter(
                    s =>
                        s.InvCode == invCode &&
                        s.KalaFileNo == kalaFileNo &&
                        s.KalaState == kalaState &&
                        s.KalaExf1 == kalaExf1 &&
                        s.KalaExf2 == kalaExf2 &&
                        s.KalaExf3 == kalaExf3 &&
                        s.KalaExf4 == kalaExf4 &&
                        s.KalaExf5 == kalaExf5 &&
                        s.KalaExf6 == kalaExf6 &&
                        s.KalaExf7 == kalaExf7 &&
                        s.KalaExf8 == kalaExf8 &&
                        s.KalaExf9 == kalaExf9 &&
                        s.KalaExf10 == kalaExf10 &&
                        s.KalaExf11 == kalaExf11 &&
                        s.KalaExf12 == kalaExf12 &&
                        s.KalaExf13 == kalaExf13 &&
                        s.KalaExf14 == kalaExf14 &&
                        s.KalaExf15 == kalaExf15
                );
                for (var i = 0; i < data.length; i++) {
                    if (mainUnit == 1) {
                        mAmount += data[i].MAmount1;
                    }
                    else if (mainUnit == 2) {
                        mAmount += data[i].MAmount2;
                    }
                    else if (mainUnit == 3) {
                        mAmount += data[i].MAmount3;
                    }
                    mTotalPrice += data[i].MTotalPrice;
                }
                $("#MAmount").text(NumberToNumberString(mAmount));
                $("#MTotalPrice").text(NumberToNumberString(mTotalPrice));
            }

        });
    }

    */

    var mAmount_Mjd
    var mTotalPrice_Mjd
    function GetKalaMjd(
        kalaCode,
        mainUnit,
        kalaFileNo,
        kalaState,
        kalaExf1,
        kalaExf2,
        kalaExf3,
        kalaExf4,
        kalaExf5,
        kalaExf6,
        kalaExf7,
        kalaExf8,
        kalaExf9,
        kalaExf10,
        kalaExf11,
        kalaExf12,
        kalaExf13,
        kalaExf14,
        kalaExf15
    ) {

        taTarikh = $("#tarikh").val().toEnglishDigit();
        if (taTarikh == null || taTarikh == "") {
            taTarikh = self.DocDate();
        }

        invMjd = $("#inv").val();
        if (invMjd == null || invMjd == "") {
            invMjd = invSelect;
        }

        var KalaMjdObject = {
            FromDate: '',
            ToDate: taTarikh,
            MainUnit: mainUnit,
            InvCode: invMjd,
            KalaCode: kalaCode,
            KalaFileNo: kalaFileNo,
            KalaState: kalaState,
            KalaExf1: kalaExf1,
            KalaExf2: kalaExf2,
            KalaExf3: kalaExf3,
            KalaExf4: kalaExf4,
            KalaExf5: kalaExf5,
            KalaExf6: kalaExf6,
            KalaExf7: kalaExf7,
            KalaExf8: kalaExf8,
            KalaExf9: kalaExf9,
            KalaExf10: kalaExf10,
            KalaExf11: kalaExf11,
            KalaExf12: kalaExf12,
            KalaExf13: kalaExf13,
            KalaExf14: kalaExf14,
            KalaExf15: kalaExf15
        };
        mAmount_Mjd = 0;
        mTotalPrice_Mjd = 0;

        ajaxFunction(KalaMjdUri + ace + '/' + sal + '/' + group, 'POST', KalaMjdObject, false).done(function (data) {
            if (data == notAccess) {
                $('#MAmount').text("به گزارش دسترسی ندارید");
                $('#MTotalPrice').text("به گزارش دسترسی ندارید");
                $('#MAmount').css('color', 'red');
                $('#MTotalPrice').css('color', 'red');
            }
            else {
                if (data.length > 0) {
                    mAmount_Mjd = data[0].Amount == null ? 0 : data[0].Amount;
                    mTotalPrice_Mjd = data[0].TotalPrice == null ? 0 : data[0].TotalPrice;
                }
                //$("#MAmount").text(NumberToNumberString(mAmount_Mjd));
                //$("#MTotalPrice").text(NumberToNumberString(mTotalPrice_Mjd));
            }

        });
    }




    self.OptionsCaptionAnbar = ko.computed(function () {
        return self.InvList().length > 0 ? translate('انبار را انتخاب کنید') : translate('انبار تعریف نشده است');
    });


    $("#inv").change(function () {
        if (flagupdateHeader != 1 && invSelect == "") {
            invSelect = $("#inv").val();
            $('#docnoout').attr('readonly', false);
            var list = self.InvList();
            for (var i = 0; i < list.length; i++) {
                if (list[i].Code == invSelect) {
                    raveshInv = list[i].Ravesh;
                    sameNoAllMode = list[i].SameNoAllMode;
                    if (sessionStorage.InOut == "2") {
                        if (raveshInv == 2) {
                            $("#gridContainer").dxDataGrid("columnOption", "UnitPrice", "allowEditing", true);
                            $("#gridContainer").dxDataGrid("columnOption", "TotalPrice", "allowEditing", true);
                        } else {
                            $("#gridContainer").dxDataGrid("columnOption", "UnitPrice", "allowEditing", false);
                            $("#gridContainer").dxDataGrid("columnOption", "TotalPrice", "allowEditing", false);
                            for (var j = 0; j < IDocB.length; j++) {
                                IDocB[j].UnitPrice = 0;
                                IDocB[j].TotalPrice = 0;
                                $("#gridContainer").dxDataGrid("instance").refresh();
                            }
                        }
                    }

                    if (list[i].AutoDocNo == 1) {
                        $('#docnoout').val("");
                        $('#docnoout').attr('readonly', true);
                    }
                }
            }
        }
        invSelect = "";

    });

    getInvList();


    //Get KalaPrice List
    function getKalaPriceList(insert) {
        ajaxFunction(KalaPriceUri + ace + '/' + sal + '/' + group + '/' + insert, 'GET').done(function (data) {

            self.KalaPriceList(data);
            if (self.KalaPriceList().length > 0) {
                if (flagupdateHeader == 1) {
                    firstUpdateShow = 1;
                    sessionStorage.PriceCode > 0 ? $("#gGhimat").val(sessionStorage.PriceCode) : null;
                }
                else {
                    firstUpdateShow = 0;
                    if (sessionStorage.InOut == 1) {
                        sessionStorage.GPriceDefultI == "0" ? $("#gGhimat").val(0) : $("#gGhimat").val(sessionStorage.GPriceDefultI);
                    }
                }

            }
        });
    }

    //self.OptionsCaptionKalaPrice = ko.computed(function () {
    //    return translate('قیمت اطلاعات پایه');
    //});

    flagupdateHeader == 1 ? getKalaPriceList(false) : getKalaPriceList(true);


    $("#sumSanad").text('');
    $("#gGhimat").change(function () {
        //a = $("#sumSanad").text();
        if ($("#sumSanad").text() != '' && viewAction == true && firstUpdateShow == 0) {
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
                    kalapricecode = $("#gGhimat").val();
                    //kalapricecode == '0' ? kalapricecode = '' : kalapricecode = kalapricecode;
                    $("#gGhimat").val(kalapricecode);
                    //kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                }
            })
        }

        if (firstUpdateShow == 1)
            firstUpdateShow = 0;

    })

    function SetKalaPrice() {
        kalapricecode = $("#gGhimat").val();
        //kalapricecode = $("#gGhimat").val();

        flagKalaPrice = true;

        for (var i = 0; i < IDocB.length; i++) {
            if (IDocB[i].KalaCode != "" && IDocB[i].KalaCode != null) {


                if (kalapricecode == null || kalapricecode == 0) {
                    if (raveshInv == 2 || sessionStorage.InOut == "2") {
                        Price1 = 0;
                        Price2 = 0;
                        Price3 = 0;
                    }
                    else {
                        Price1 = parseFloat(IDocB[i].dataKala.PPrice1);
                        Price2 = parseFloat(IDocB[i].dataKala.PPrice2);
                        Price3 = parseFloat(IDocB[i].dataKala.PPrice3);
                    }

                    if (IDocB[i].MainUnit == 1) IDocB[i].UnitPrice = Price1;
                    else if (IDocB[i].MainUnit == 2) IDocB[i].UnitPrice = Price2;
                    else if (IDocB[i].MainUnit == 3) IDocB[i].UnitPrice = Price3;
                }
                else {
                    ajaxFunction(KalaPriceBUri + ace + '/' + sal + '/' + group + '/' + kalapricecode + '/' + IDocB[i].KalaCode, 'GET').done(function (data) {
                        IDocB[i].UP_Flag = true;
                        IDocB[i].UnitPrice = 0;
                        if (data.length > 0) {
                            if (IDocB[i].MainUnit == 1) IDocB[i].UnitPrice = data[0].Price1;
                            else if (IDocB[i].MainUnit == 2) IDocB[i].UnitPrice = data[0].Price2;
                            else if (IDocB[i].MainUnit == 3) IDocB[i].UnitPrice = data[0].Price3;
                        }
                    });
                }
                CalcPrice(i);
            }
        }

        dataGrid.refresh();
        CalcSanad();
    }








    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {
        if (lastStatus != "") {
            if (Serial == 0) {
                $("#status").val(lastStatus);
                return showNotification(translate('ابتدا سند را ذخیره کنید'), 0);
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
                return showNotification(translate('فقط انبار های تایید شده امکان تصویب دارند'), 0);
            }


            var StatusChangeObject = {
                DMode: 0,
                UserCode: sessionStorage.userName,
                SerialNumber: Serial,
                Status: selectStatus,
            };

            ajaxFunction(IChangeStatusUri + ace + '/' + sal + '/' + group, 'POST', StatusChangeObject).done(function (response) {
                item = response;
                sessionStorage.Status = selectStatus;
                lastStatus = "";
                showNotification(translate('وضعیت ' + textSanad + ' ' + selectStatus + ' شد'), 1);
            });
        }
    });


    //Get KalaPriceB List
    function getKalaPriceBList(codeKala) {
        kalapricecode = $("#gGhimat").val();
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

            if (sessionStorage.InOut == "2") {// صادره بود
                Price1 = 0;
                Price2 = 0;
                Price3 = 0;
            }

            if (self.flagupdateband == false)
                Price1 > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        });
    }



    //Get IDocP List
    function getIDocP(serialNumber) {
        ajaxFunction(IDocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber + '/' + sessionStorage.InOut, 'GET').done(function (data) {
            self.IDocPList(data);
        });
    }





    //Get IDocH
    function getIDocH(serialNumber) {
        ajaxFunction(IDocHListUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocHList(data);
            if (self.IDocHList().length > 0) { // اگر شامل اطلاعات انبار بود
                dataIDocH = self.IDocHList()[0];
                dataIDocH.Amount1 != null ? IDocHAmount1 = dataIDocH.Amount1 : IDocHAmount1 = 0;
                dataIDocH.Amount2 != null ? IDocHAmount2 = dataIDocH.Amount2 : IDocHAmount2 = 0;
                dataIDocH.Amount3 != null ? IDocHAmount3 = dataIDocH.Amount3 : IDocHAmount3 = 0;
                dataIDocH.TotalPrice != null ? IDocHTotalPrice = dataIDocH.TotalPrice : IDocHTotalPrice = 0;
                dataIDocH.FinalPrice != null ? IDocHFinalPrice = dataIDocH.FinalPrice : IDocHFinalPrice = 0;
                $('#sumSanad').text(NumberToNumberString(parseFloat(IDocHTotalPrice).toFixed(parseInt(sessionStorage.DeghatInv))));
                $('#relatedGroupActive').prop('checked', dataIDocH.RelatedGroupActive);
            }
        });
    }



    function getIDocHLastDate() {
        ajaxFunction(IDocHLastDateUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.InOut, 'GET').done(function (data) {
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

    var rprtId = sessionStorage.InOut == 1 ? 'IDocB_I' : 'IDocB_O';

    function getIDocB(serialNumber) {
        ajaxFunction(IDocBListUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {

            for (var i = 0; i < data.length; i++) {
                KalaData = KalaList.filter(s => s.Code == data[i].KalaCode);
                if (KalaData.length > 0) {
                    data[i].dataKala = KalaData[0];
                }

                GetKalaMjd(
                    data[i].KalaCode,
                    data[i].MainUnit,
                    data[i].KalaFileNo,
                    data[i].KalaState,
                    data[i].KalaExf1,
                    data[i].KalaExf2,
                    data[i].KalaExf3,
                    data[i].KalaExf4,
                    data[i].KalaExf5,
                    data[i].KalaExf6,
                    data[i].KalaExf7,
                    data[i].KalaExf8,
                    data[i].KalaExf9,
                    data[i].KalaExf10,
                    data[i].KalaExf11,
                    data[i].KalaExf12,
                    data[i].KalaExf13,
                    data[i].KalaExf14,
                    data[i].KalaExf15
                );
                data[i].KalaMjd = mAmount_Mjd;
                data[i].TotalPriceMjd = mTotalPrice_Mjd;
            }

            dataLink = data.filter(s => s.LinkSerialNumber > 0 && s.LinkProg.toUpperCase() != 'INV5');
            if (dataLink.length != 0) {
                LockSanad();
                showNotification(translate('سند دارای بند های لینک می باشد و امکان ویرایش وجود ندارد'), 0);
            }


            IDocB = data;
            GetRprtCols_NewList(sessionStorage.userName);

        });

    }





    function CheckAccess() {
        if (sessionStorage.InOut == 1) {
            accessTaeed = localStorage.getItem("Access_TAEED_IIDOC") == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_IIDOC") == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_IIDOC") == 'true'

            if (localStorage.getItem("AccessViewSanadAnbarVarede") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else {
            accessTaeed = localStorage.getItem("Access_TAEED_IODOC") == 'true'
            accessTasvib = localStorage.getItem("Access_TASVIB_IODOC") == 'true'
            accessCancel = localStorage.getItem("Access_CANCEL_IODOC") == 'true'

            if (localStorage.getItem("AccessViewSanadAnbarSadere") == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }

        }

        if (sessionStorage.CHG == 'false' && sessionStorage.BeforeMoveSanadAnbar == "false" && flagupdateHeader == 1) {
            viewAction = false;
        } else {
            sessionStorage.BeforeMoveSanadAnbar = false;
        }

        if (accessTaeed == false && sessionStorage.Status == translate('تایید'))
            viewAction = false;

        if (accessTasvib == false && sessionStorage.Status == translate('تصویب'))
            viewAction = false;

        if (accessCancel == false && sessionStorage.Status == translate('باطل'))
            viewAction = false;

        if (useSanadOtherUser == 'UseUser')
            viewAction = false;


        if (viewAction) {
            $('#action_header').removeAttr('style');
            $('#action_body').removeAttr('style');
            $('#action_footer').removeAttr('style');
            $('#action_IDoc').removeAttr('style');
            $('#btnThvl').removeAttr('style');
            $('#insertband').removeAttr('style');
            $('#Barcode').removeAttr('style');
            $('#btnMkz').removeAttr('style');
            $('#btnOpr').removeAttr('style');
            $('#gGhimat').attr('disabled', false);
            //$('#inv').attr('disabled', false);
        }
    }

    CheckAccess();

    var isUpdateFactor = true;

    function LockSanad() {
        $('#btnThvl').attr('style', 'display: none');
        $('#btnVstr').attr('style', 'display: none');
        $('#btnMkz').attr('style', 'display: none');
        $('#btnOpr').attr('style', 'display: none');
        $('#btnArz').attr('style', 'display: none');
        $('#CalcAddmin').attr('style', 'display: none');
        $('#Btn_TasfiyeFactor').attr('style', 'display: none');
        $('#gGhimat').attr('disabled', true);
        $('#status').attr('disabled', true);
        $('#inv').attr('disabled', true);
        isUpdateFactor = false;
    }
    if (flagupdateHeader == 1) {

        flagInsertIDocH = 1;
        Serial = sessionStorage.SerialNumber;
        self.SerialNumber(Serial);
        self.InvCode(sessionStorage.InvCode);
        self.modeCode(sessionStorage.ModeCodeValue);
        self.DocNoOut(sessionStorage.DocNo);
        self.DocDate(sessionStorage.DocDate);
        $('#btntarikh').click(function () {
            $('#tarikh').change();
        });
        self.Spec(sessionStorage.Spec);
        $("#footer").val(sessionStorage.Footer);
        codeThvl = sessionStorage.ThvlCode;
        self.ThvlCode(sessionStorage.ThvlCode);


        self.PriceCode(sessionStorage.PriceCode);
        kalapricecode = sessionStorage.PriceCode;

        $("#docnoout").val(sessionStorage.DocNo);
        $('#textnumberSanad').show();
        $('#nameThvl').val(sessionStorage.ThvlCode == '' ? '' : '(' + sessionStorage.ThvlCode + ') ' + sessionStorage.ThvlName);

        self.OprCode(sessionStorage.OprCode);
        codeOpr = sessionStorage.OprCode;

        self.MkzCode(sessionStorage.MkzCode);
        codeMkz = sessionStorage.MkzCode;

        fctSerialNumber = sessionStorage.FctSerialNumber;

        accSerialNumber = sessionStorage.AccSerialNumber;
        fctReg = sessionStorage.fctReg;

        self.ArzCode(sessionStorage.ArzCode);
        codeArz = sessionStorage.ArzCode;

        self.ArzRate(parseFloat(sessionStorage.ArzRate));
        arzRate = parseFloat(sessionStorage.ArzRate);

        $('#nameOpr').val(sessionStorage.OprCode == '' ? '' : '(' + sessionStorage.OprCode + ') ' + sessionStorage.OprName);
        $('#nameMkz').val(sessionStorage.MkzCode == '' ? '' : '(' + sessionStorage.MkzCode + ') ' + sessionStorage.MkzName);
        $('#nameArz').val(sessionStorage.ArzName == '' || sessionStorage.ArzName == 'null' ? '' : '(' + sessionStorage.ArzCode + ') ' + sessionStorage.ArzName);
        $('#ArzRate').val(arzRate);



        if (codeOpr == "!!!" || codeMkz == "!!!" || closedDate == true || accSerialNumber > 0 || fctSerialNumber > 0 || fctReg == FctRegSave) {
            LockSanad();
        }

        if (codeOpr == "!!!" || codeMkz == "!!!") {
            showNotification($('#TitleHeaderAnbar').text() + ' ' + translate('دارای پروژه و مرکز هزینه متفاوت است و امکان ثبت وجود ندارد'), 0);
        }

        if (accSerialNumber > 0) {
            showNotification($('#TitleHeaderAnbar').text() + ' ' + translate('دارای سند حسابداری می باشد و امکان ثبت وجود ندارد'), 0);
        }

        if (fctSerialNumber > 0) {
            showNotification($('#TitleHeaderAnbar').text() + ' ' + translate('دارای سند خرید و فروش می باشد و امکان ثبت وجود ندارد'), 0);
        }

        //if (fctReg == FctRegSave) {
        //    showNotification($('#TitleHeaderAnbar').text() + ' ' + translate('دارای سند حسابداری می باشد و امکان ثبت وجود ندارد'), 0);
        //}

        getIDocH(Serial);
        getIDocB(Serial);


        $("#footer").val(sessionStorage.Footer);
        flagOtherFieldShow = true;
        self.StatusSanad(sessionStorage.Status);
        $("#status").val(sessionStorage.Status);

        self.PaymentSanad(sessionStorage.PaymentType);
        $("#paymenttype").val(sessionStorage.PaymentType);

        $('#titlePage').text(sessionStorage.ModeName + " " + sessionStorage.DocNo.toPersianDigit() + " " + AppendAnbar(sessionStorage.InvName));



        var closedDate = false;

        var TestIDoc_EditObject = {
            Serialnumber: Serial
        }

        ajaxFunction(TestIDoc_EditUri + ace + '/' + sal + '/' + group, 'POST', TestIDoc_EditObject, false).done(function (data) {
            list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                if (list[i].TestName == "YTrs") {
                    closedDate = true;
                    showNotification(translate(list[i].TestCap), 0);
                }
            }

        });



        dataGrid.focus(dataGrid.getCellElement(0, 4));
    }
    else {
        flagInsertIDocH = 0;
        if (parseInt(sal) < SalNow) {
            getIDocHLastDate();
        }
        getIDocB(0);
        dataGrid = $("#gridContainer").dxDataGrid("instance");
        $('#mandehHesab').text(0);
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
        if (showPrice && sessionStorage.InOut == 1) {
            cols = cols.filter(s =>
                // s.Code == 'BandNo' ||
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
                (s.Code == 'KalaFileNo' && s.Name != '') ||
                (s.Code == 'KalaState' && s.Name != '') ||
                (s.Code == 'KalaExf1' && s.Name != '') ||
                (s.Code == 'KalaExf2' && s.Name != '') ||
                (s.Code == 'KalaExf3' && s.Name != '') ||
                (s.Code == 'KalaExf4' && s.Name != '') ||
                (s.Code == 'KalaExf5' && s.Name != '') ||
                (s.Code == 'KalaExf6' && s.Name != '') ||
                (s.Code == 'KalaExf7' && s.Name != '') ||
                (s.Code == 'KalaExf8' && s.Name != '') ||
                (s.Code == 'KalaExf9' && s.Name != '') ||
                (s.Code == 'KalaExf10' && s.Name != '') ||
                (s.Code == 'KalaExf11' && s.Name != '') ||
                (s.Code == 'KalaExf12' && s.Name != '') ||
                (s.Code == 'KalaExf13' && s.Name != '') ||
                (s.Code == 'KalaExf14' && s.Name != '') ||
                (s.Code == 'KalaExf15' && s.Name != '') ||
                s.Code == 'ArzValue'
            );
        }
        else {
            $("#p_Sum").hide();

            cols = cols.filter(s =>
                // s.Code == 'BandNo' ||
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
                (s.Code == 'KalaFileNo' && s.Name != '') ||
                (s.Code == 'KalaState' && s.Name != '') ||
                (s.Code == 'KalaExf1' && s.Name != '') ||
                (s.Code == 'KalaExf2' && s.Name != '') ||
                (s.Code == 'KalaExf3' && s.Name != '') ||
                (s.Code == 'KalaExf4' && s.Name != '') ||
                (s.Code == 'KalaExf5' && s.Name != '') ||
                (s.Code == 'KalaExf6' && s.Name != '') ||
                (s.Code == 'KalaExf7' && s.Name != '') ||
                (s.Code == 'KalaExf8' && s.Name != '') ||
                (s.Code == 'KalaExf9' && s.Name != '') ||
                (s.Code == 'KalaExf10' && s.Name != '') ||
                (s.Code == 'KalaExf11' && s.Name != '') ||
                (s.Code == 'KalaExf12' && s.Name != '') ||
                (s.Code == 'KalaExf13' && s.Name != '') ||
                (s.Code == 'KalaExf14' && s.Name != '') ||
                (s.Code == 'KalaExf15' && s.Name != '') ||
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
                    cols[i].Code == 'TotalPrice'
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

            /*else if (data[i].Code == "KalaFileNo" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaFileNoList", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaState" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaStateList", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf1" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf1List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf2" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf2List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf3" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf3List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf4" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf4List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf5" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf5List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf6" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf6List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf7" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf7List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf8" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf8List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf9" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf9List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf10" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf10List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf11" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf11List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf12" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf12List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf13" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf13List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf14" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf14List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            else if (data[i].Code == "KalaExf15" && isSelectedKalaExf) { f += ',"lookup": {"dataSource": "kalaExf15List", "valueExpr": "Name", "displayExpr": "Name"}'; }
            */

            if (data[i].Code == "BandNo" || data[i].Code == "ArzValue") {
                f += ',"allowEditing": false'
            }


            if (
                data[i].Code == "KalaFileNo" ||
                data[i].Code == "KalaState" ||
                data[i].Code == "KalaExf1" ||
                data[i].Code == "KalaExf2" ||
                data[i].Code == "KalaExf3" ||
                data[i].Code == "KalaExf4" ||
                data[i].Code == "KalaExf5" ||
                data[i].Code == "KalaExf6" ||
                data[i].Code == "KalaExf7" ||
                data[i].Code == "KalaExf8" ||
                data[i].Code == "KalaExf9" ||
                data[i].Code == "KalaExf10" ||
                data[i].Code == "KalaExf11" ||
                data[i].Code == "KalaExf12" ||
                data[i].Code == "KalaExf13" ||
                data[i].Code == "KalaExf14" ||
                data[i].Code == "KalaExf15") {
                f += ',"allowEditing": false'
            }


            if (raveshInv != 2 && sessionStorage.InOut == "2" && (data[i].Code == "UnitPrice" || data[i].Code == "TotalPrice")) {
                raveshInv = raveshInv;
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
        f += ',{"caption":"#","allowEditing": false}';

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

                            IDocB.splice(row, 1);

                            e.component.saveEditData();
                            CalcSanad();
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
                            CalcSanad();
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
                if (e == null) {
                    a = 1;
                } else if (e.column == null) {
                    a = 2;
                } else if (e.column.dataField == null) {
                    a = 3;
                }
                else {
                    fieldName = e.column.dataField;
                }
                //if (fieldName == 'KalaState') {
                //    $("#modal-KalaState").modal('show');
                // }

                if (ro >= 0) {
                    if (columnName == 'KalaFileNo' && isSelectedKalaExf) { $("#modal-KalaFileNo").modal('show'); }
                    if (columnName == 'KalaState' && isSelectedKalaExf) { $("#modal-KalaState").modal('show'); }
                    if (columnName == 'KalaExf1' && isSelectedKalaExf) { $("#modal-KalaExf1").modal('show'); }
                    if (columnName == 'KalaExf2' && isSelectedKalaExf) { $("#modal-KalaExf2").modal('show'); }
                    if (columnName == 'KalaExf3' && isSelectedKalaExf) { $("#modal-KalaExf3").modal('show'); }
                    if (columnName == 'KalaExf4' && isSelectedKalaExf) { $("#modal-KalaExf4").modal('show'); }
                    if (columnName == 'KalaExf5' && isSelectedKalaExf) { $("#modal-KalaExf5").modal('show'); }
                    if (columnName == 'KalaExf6' && isSelectedKalaExf) { $("#modal-KalaExf6").modal('show'); }
                    if (columnName == 'KalaExf7' && isSelectedKalaExf) { $("#modal-KalaExf7").modal('show'); }
                    if (columnName == 'KalaExf8' && isSelectedKalaExf) { $("#modal-KalaExf8").modal('show'); }
                    if (columnName == 'KalaExf9' && isSelectedKalaExf) { $("#modal-KalaExf9").modal('show'); }
                    if (columnName == 'KalaExf10' && isSelectedKalaExf) { $("#modal-KalaExf10").modal('show'); }
                    if (columnName == 'KalaExf11' && isSelectedKalaExf) { $("#modal-KalaExf11").modal('show'); }
                    if (columnName == 'KalaExf12' && isSelectedKalaExf) { $("#modal-KalaExf12").modal('show'); }
                    if (columnName == 'KalaExf13' && isSelectedKalaExf) { $("#modal-KalaExf13").modal('show'); }
                    if (columnName == 'KalaExf14' && isSelectedKalaExf) { $("#modal-KalaExf14").modal('show'); }
                    if (columnName == 'KalaExf15' && isSelectedKalaExf) { $("#modal-KalaExf15").modal('show'); }

                    $("#MAmount").text(NumberToNumberString(IDocB[ro].KalaMjd == null ? 0 : IDocB[ro].KalaMjd));
                    $("#MTotalPrice").text(NumberToNumberString(IDocB[ro].TotalPriceMjd == null ? 0 : IDocB[ro].TotalPriceMjd));
                }


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
                        IDocB.push({});
                        for (var i = 0; i < IDocB.length; i++) {
                            IDocB[i].BandNo = i;
                        }
                        dataGrid.refresh(true);

                    }
                };
                if (ro >= 0) {

                    if (keyCode == ' ' && columnName == 'KalaFileNo' && isSelectedKalaExf) {
                        $("#modal-KalaFileNo").modal('show');
                    }

                    if (keyCode == ' ' && columnName == 'KalaState' && isSelectedKalaExf) {
                        $("#modal-KalaState").modal('show');
                    }

                    if (keyCode == ' ' && columnName == 'KalaExf1' && isSelectedKalaExf) { $("#modal-KalaExf1").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf2' && isSelectedKalaExf) { $("#modal-KalaExf2").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf3' && isSelectedKalaExf) { $("#modal-KalaExf3").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf4' && isSelectedKalaExf) { $("#modal-KalaExf4").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf5' && isSelectedKalaExf) { $("#modal-KalaExf5").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf6' && isSelectedKalaExf) { $("#modal-KalaExf6").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf7' && isSelectedKalaExf) { $("#modal-KalaExf7").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf8' && isSelectedKalaExf) { $("#modal-KalaExf8").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf9' && isSelectedKalaExf) { $("#modal-KalaExf9").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf10' && isSelectedKalaExf) { $("#modal-KalaExf10").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf11' && isSelectedKalaExf) { $("#modal-KalaExf11").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf12' && isSelectedKalaExf) { $("#modal-KalaExf12").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf13' && isSelectedKalaExf) { $("#modal-KalaExf13").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf14' && isSelectedKalaExf) { $("#modal-KalaExf14").modal('show'); }
                    if (keyCode == ' ' && columnName == 'KalaExf15' && isSelectedKalaExf) { $("#modal-KalaExf15").modal('show'); }
                }
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
                    isUpdateFactor == true ? {
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
                    } : '',

                    isUpdateFactor == true ? {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'addRow',
                        options: {
                            icon: 'add',
                            hint: 'بند جدید',
                            onClick() {
                                AddNewBand();
                            },
                        },
                    } : '',

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'print',
                        options: {
                            icon: 'print',
                            hint: 'چاپ',
                            onClick() {
                                PrintSanad();
                            },
                        },
                    },
                    isUpdateFactor == true ? {
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
                    } : '',

                    isUpdateFactor == true ? {
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
                    } : '',

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'AddNewSanad',
                        options: {
                            icon: '/Content/img/sanad/streamline-icon-pencil-write-3-alternate@48x48.png',
                            hint: 'سند جدید',
                            onClick() {
                                AddNewSanad();
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'DefultColumn',
                        options: {
                            icon: 'columnproperties',
                            hint: 'پیش فرض ستون ها',
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



                    if (sessionStorage.newSanad == "false" && item.name == "AddNewSanad")
                        item.visible = false;


                    if (sessionStorage.AccessPrint_SanadAnbar == "false" && item.name == "print") {
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
                if (e.rowType === "header" || (e.rowType === "data" && (e.column.dataField === "#" || e.column.dataField === "button"))) {
                    e.cellElement.css("background-color", '#d9d9d9');
                    e.cellElement.css("color", 'black');
                }

                if (e.rowType === "data" && e.column.dataField === "KalaCode" && Serial > 0) {
                    const visibleRows = dataGrid.getVisibleRows();
                    if (visibleRows[e.rowIndex].data.dataKala == null) {
                        dataKala = KalaList.filter(s => s.Code == visibleRows[e.rowIndex].data.KalaCode);
                        visibleRows[e.rowIndex].data.dataKala = visibleRows[e.rowIndex].data.dataKala;
                    }
                }

                if (e.rowType === "data" && e.column.dataField === "TotalPrice") {
                    ro = e.row.rowIndex;
                    if (IDocB[ro] != null) {
                        if (IDocB[ro].UP_Flag == true || (IDocB[ro].UP_Flag == null && IDocB[ro].dataKala != null)) {
                            e.cellElement.css("background-color", '#fdf9b0');
                        }
                    }
                }

                if (e.rowType === "data" && e.column.dataField === "UnitPrice") {
                    ro = e.row.rowIndex;
                    if (IDocB[ro] != null) {
                        if (IDocB[ro].UP_Flag == false) {
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
                        value = args.value == null ? 0 : args.value;
                        if (e.dataField == 'Amount1')
                            IDocB[ro].Amount1 = value;
                        else if (e.dataField == 'Amount2')
                            IDocB[ro].Amount2 = value;
                        else if (e.dataField == 'Amount3')
                            IDocB[ro].Amount3 = value;
                        dataGrid.saveEditData();
                        dataGrid.refresh();

                        CalcAmount(e.row.rowIndex, e.dataField);
                        CalcSanad();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'UnitPrice') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        IDocB[ro].UP_Flag = true;
                        value = args.value == null ? 0 : args.value;
                        IDocB[ro].UnitPrice = value;
                        CalcPrice(ro);
                        dataGrid.saveEditData();
                        dataGrid.refresh();
                        CalcSanad();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'TotalPrice') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        IDocB[ro].UP_Flag = false;
                        value = args.value == null ? 0 : args.value;
                        IDocB[ro].TotalPrice = value;
                        CalcPrice(ro);

                        dataGrid.saveEditData();
                        dataGrid.refresh();
                        CalcSanad();
                    }
                }
            }

        }).dxDataGrid('instance');
    }



    function CalcSanad() {
        totalPrice = 0;
        sumTotalPrice = 0;
        for (var i = 0; i < IDocB.length; i++) {
            totalPrice = IDocB[i].TotalPrice == null || IDocB[i].TotalPrice == '' ? 0 : parseFloat(IDocB[i].TotalPrice);
            sumTotalPrice = sumTotalPrice + totalPrice;
        }
        $("#sumSanad").text(NumberToNumberString(sumTotalPrice));
    }








    function AddNewSanad() {
        Swal.fire({
            title: '',
            text: textSanad + " " + translate("جدید ایجاد می شود . آیا مطمئن هستید ؟"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                $('#titlePage').text(textSanad + " " + translate("جدید"));
                Serial = 0;
                Serial_Test = 0;
                flagInsertIDocH = 0;
                if (parseInt(sal) < SalNow) {
                    getIDocHLastDate();
                }
                getIDocB(0);
                dataGrid = $("#gridContainer").dxDataGrid("instance");
                sumSanad = 0;
                $('#sumSanad').text(0);
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
                        Comm: '',
                        BandNo: i
                    };
                    IDocB[i] = tmp;
                }
                dataGrid.focus(dataGrid.getCellElement(0, 1));

                codeThvl = '';
                closedDate = false;
                codeThvl = '';
                sessionStorage.flagupdateHeader = 0;
                $('#docnoout').val('');
                sessionStorage.searchIDocH = "";
                $("#status").val(translate('موقت'));
                sessionStorage.Status = translate('موقت');
                $("#paymenttype").val(0);
                $("#footer").val('');
                sessionStorage.Eghdam = sessionStorage.userName;




                kalapricecode = 0;
                flagFinalSave = false;
                flag = -1;
                flagInsertIDocH = 0;
                self.flagupdateband = false;
                self.SerialNumber();
                self.DocNoOut();
                self.DocDate();
                self.Spec();
                self.ThvlCode();

                $('#inv').prop('disabled', false);
                $('#modeCode').prop('disabled', false);

                self.PriceCode = ko.observable(sessionStorage.GPriceDefult);
                self.InvCode = ko.observable(invSelect);
                self.BandNo();
                self.KalaCode();
                self.OprCode("");
                self.MkzCode("");
                self.ArzCode("");

                self.ArzRate("");
                arzRate = 0;
                $('#ArzRate').val(0);

                codeOpr = '';
                codeMkz = '';
                flaglog = "Y";
                if (sessionStorage.InvDefult_Inv != "null") $("#inv").val(sessionStorage.InvDefult_Inv);
                $("#gGhimat").val(sessionStorage.GPriceDefult != null && sessionStorage.GPriceDefult != '' ? sessionStorage.GPriceDefult : 0);

                if (parseInt(RelatedGroup) > 0) {
                    $('#relatedGroupActive').prop('checked', relatedGroupDefault == "1" ? true : false);
                }

                $('#nameThvl').val("");
                $('#nameOpr').val("");
                $('#nameMkz').val("");
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

                $("#ExtraFields01").val("");
                $("#ExtraFields02").val("");
                $("#ExtraFields03").val("");
                $("#ExtraFields04").val("");
                $("#ExtraFields05").val("");
                $("#ExtraFields06").val("");
                $("#ExtraFields07").val("");
                $("#ExtraFields08").val("");
                $("#ExtraFields09").val("");
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
                isUpdateFactor = true;
            }
        })
    }

    function AddNewBand() {
        $("#gridContainer").dxDataGrid("saveEditData");
        // e.component.saveEditData();
        IDocB.push({});
        for (var i = 0; i < IDocB.length; i++) {
            IDocB[i].BandNo = i;
        }
        dataGrid.refresh(true);
    }

    function PrintSanad() {
        if (Serial == '')
            return showNotification(translate('ابتدا انبار را ذخیره کنید'), 0);
        getIDocP(Serial);
        createViewer();

        if (self.IDocPList().length == 0)
            return showNotification(translate('برای چاپ انبار حداقل یک بند الزامیست'), 0);

        textFinalPrice = self.IDocPList()[0].TotalPrice.toPersianLetter() + titlePrice;
        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';
        printName = null;

        if (sessionStorage.InOut == 1) {
            if (localStorage.getItem("Access_SHOWPRICE_IIDOC") == 'true')
                sessionStorage.ModePrint = 'IDoc';
            else
                sessionStorage.ModePrint = 'IDoc_NoPrice';
        }
        else {
            sessionStorage.ModePrint = 'ODoc';
        }

        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
        $('#modal-Print').modal('show');
    }


    var Serial_Test = 0;

    function ControlSave() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();

        docno = $("#docnoout").val();
        modeCode = $("#modeCode").val();
        $('#relatedGroupActive').is(':checked') == true ? relatedActive = 1 : relatedActive = 0;

        if (docno.length > 10) {
            return showNotification(translate('شماره نباید بیشتر از ده رقم باشد'), 0);
        }

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
        }

        if ((tarikh >= sessionStorage.BeginDateInv) && (tarikh <= sessionStorage.EndDateInv)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
        }

        if (inv == '' || inv == null) {
            return showNotification(translate('انبار را انتخاب کنید'), 0);
        }


        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
        }

        if (codeThvl == '') {
            if (sessionStorage.InOut == 1) {
                if (sessionStorage.IDOCI_TestThvl == "1")
                    showNotification(translate('تحویل دهنده انتخاب نشده است'), 2);
                else if (sessionStorage.IDOCI_TestThvl == "2")
                    return showNotification(translate('تحویل دهنده انتخاب نشده است'), 0);
            }
            else {
                if (sessionStorage.IDOCO_TestThvl == "1")
                    showNotification(translate('تحویل گیرنده انتخاب نشده است'), 2);
                else if (sessionStorage.IDOCO_TestThvl == "2")
                    return showNotification(translate('تحویل گیرنده انتخاب نشده است'), 0);
            }
        }



        var isFree = true;
        for (var i = 0; i < IDocB.length; i++) {
            if (IDocB[i].KalaCode != '') {
                isFree = false
            }
        }


        if (isFree == true) {
            return showNotification(translate(textSanad + ' دارای بند قابل ذخیره نیست'), 0);
        }


        rows = dataGrid.getVisibleRows();
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].data.KalaCode == '' || rows[i].data.KalaCode == null) {
                dataGrid.deleteRow(i);
            }
        }

        dataGrid.saveEditData();
        //dataGrid.refresh();


        var V_Del_IDocObject = {
            SerialNumber: Serial_Test,
        };

        ajaxFunction(V_Del_IDocUri + ace + '/' + sal + '/' + group, 'POST', V_Del_IDocObject).done(function (response) {

        });


        var IDocHObject = {
            SerialNumber: 0,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            ThvlCode: codeThvl,//self.ThvlCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: modeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: docno,
            StartNo: 0,
            EndNo: 0,
            Tanzim: sessionStorage.userName,
            TahieShode: TahieShode_Inv5,
            VstrPer: 0,
            PakhshCode: '',
            Footer: $("#footer").val(),
            InvCode: inv,
            Eghdam: sessionStorage.userName,
            EghdamDate: 'null',
            InOut: sessionStorage.InOut,
            F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val(),
            F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val(),
            F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val(),
            F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val(),
            F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val(),
            F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val(),
            F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val(),
            F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val(),
            F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val(),
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
            VstrCode: 0,
            flagTest: 'Y',
            RelatedGroupActive: relatedActive,
        };

        ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'POST', IDocHObject).done(function (response) {
            var res = response.split("-");
            Serial_Test = res[1];
        });


        data = IDocB;
        var obj = [];
        for (i = 0; i <= data.length - 1; i++) {
            item = data[i];
            if (item.KalaCode != "") {

                temp_FinalPrice = item.TotalPrice;
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
                    MainUnit: item.MainUnit == null ? 1 : item.MainUnit,
                    Comm: item.Comm == null ? "" : item.Comm,
                    BandSpec: item.BandSpec == null ? "" : item.BandSpec,
                    Up_Flag: item.UP_Flag == null ? true : item.UP_Flag,
                    ModeCode: modeCode,
                    InvCode: inv,
                    OprCode: codeOpr,
                    MkzCode: codeMkz,
                    ArzCode: codeArz,
                    ArzRate: arzRate,
                    ArzValue: arzValue,
                    flagLog: 'N',
                    KalaFileNo: item.KalaFileNo,
                    KalaState: item.KalaState,
                    KalaExf1: item.KalaExf1,
                    KalaExf2: item.KalaExf2,
                    KalaExf3: item.KalaExf3,
                    KalaExf4: item.KalaExf4,
                    KalaExf5: item.KalaExf5,
                    KalaExf6: item.KalaExf6,
                    KalaExf7: item.KalaExf7,
                    KalaExf8: item.KalaExf8,
                    KalaExf9: item.KalaExf9,
                    KalaExf10: item.KalaExf10,
                    KalaExf11: item.KalaExf11,
                    KalaExf12: item.KalaExf12,
                    KalaExf13: item.KalaExf13,
                    KalaExf14: item.KalaExf14,
                    KalaExf15: item.KalaExf15,
                    flagTest: 'Y',
                    LinkSerialNumber: item.LinkSerialNumber,
                    LinkYear: item.LinkYear,
                    LinkBandNo: item.LinkBandNo,
                    LinkProg: item.LinkProg,
                };

                obj.push(tmp);
            }
        }

        ajaxFunction(IDocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial_Test, 'POST', obj, false).done(function (response) {

        });

        var TestIDocObject = {
            SerialNumber: Serial_Test,
            Last_SerialNumber: Serial,
            flagTest: 'Y'
        };

        ajaxFunction(TestIDocUri + ace + '/' + sal + '/' + group, 'POST', TestIDocObject).done(function (data) {
            var obj = JSON.parse(data);
            TestIDocList = obj;

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
        list = TestIDocList;
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

            else if (list[i].TestName == 'Thvl')
                textBody += '<p>' + $('#LableThvlCode').text() + " " + translate('انتخاب نشده است') + ' </p>';

            else if (list[i].TestName == 'Inv')
                textBody += '<p>' + translate('انبار انتخاب نشده است') + ' </p>';

            else if (list[i].TestName == 'NegativeAmount')
                textBody += '<p>' + translate('بند شماره') + " " + list[i].BandNo + " " + translate('موجودی کالا منفی می شود') + ' </p>';

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
        ajaxFunction(IDocBUri + ace + '/' + sal + '/' + group + '/' + Serial + '/0/' + sessionStorage.InOut + '/Y', 'DELETE').done(function (response) {

        });
    }


    function SaveSanad() {
        if (isUpdateFactor) {
            tarikh = $("#tarikh").val().toEnglishDigit();
            status = $("#status").val();
            inv = $("#inv").val();
            docno = $("#docnoout").val();

            modeCode = $("#modeCode").val();
            kalapricecode = $("#gGhimat").val();

            $('#relatedGroupActive').is(':checked') == true ? relatedActive = 1 : relatedActive = 0;

            if (Serial == 0) {

                var IDocHObject = {
                    SerialNumber: 0,
                    DocDate: tarikh,
                    Spec: self.Spec(),
                    ThvlCode: codeThvl,
                    KalaPriceCode: kalapricecode,
                    UserCode: sessionStorage.userName,
                    BranchCode: 0,
                    ModeCode: modeCode,
                    DocNoMode: 1,
                    InsertMode: 0,
                    DocNo: docno,
                    StartNo: 0,
                    EndNo: 0,
                    Tanzim: sessionStorage.userName,
                    TahieShode: TahieShode_Inv5,
                    VstrPer: 0,
                    PakhshCode: '',
                    Footer: $("#footer").val(),
                    InvCode: inv,
                    Eghdam: sessionStorage.userName,
                    EghdamDate: 'null',
                    flagLog: flaglog,
                    VstrCode: 0,
                    InOut: sessionStorage.InOut,
                    F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val() == "" ? sessionStorage.F01 : $("#ExtraFields01").val(),
                    F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val() == "" ? sessionStorage.F02 : $("#ExtraFields02").val(),
                    F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val() == "" ? sessionStorage.F03 : $("#ExtraFields03").val(),
                    F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val() == "" ? sessionStorage.F04 : $("#ExtraFields04").val(),
                    F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val() == "" ? sessionStorage.F05 : $("#ExtraFields05").val(),
                    F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val() == "" ? sessionStorage.F06 : $("#ExtraFields06").val(),
                    F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val() == "" ? sessionStorage.F07 : $("#ExtraFields07").val(),
                    F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val() == "" ? sessionStorage.F08 : $("#ExtraFields08").val(),
                    F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val() == "" ? sessionStorage.F09 : $("#ExtraFields09").val(),
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
                    flagTest: 'N',
                    RelatedGroupActive: relatedActive,
                };


                ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group, 'POST', IDocHObject).done(function (response) {
                    var mes = TestAccessRes(response);
                    if (mes != "")
                        return showNotification(translate(mes), 0);

                    var res = response.split("-");
                    Serial = res[0];
                    DocNoOut = res[1];
                    $('#docnoout').val(DocNoOut);
                    flaglog = 'N';
                    if (flagSaveLogWin == false) {
                        SaveLog('Inv5', EditMode_New, LogMode_IDoc, 0, DocNoOut, Serial);
                        flagSaveLogWin = true;
                    }
                });

            }
            else {
                var IDocHObject = {
                    SerialNumber: Serial,
                    DocDate: tarikh,
                    Spec: self.Spec(),
                    ThvlCode: codeThvl,
                    KalaPriceCode: kalapricecode,
                    UserCode: sessionStorage.userName,
                    BranchCode: 0,
                    ModeCode: modeCode,
                    DocNoMode: 1,
                    InsertMode: 0,
                    DocNo: docno,
                    StartNo: 0,
                    EndNo: 0,
                    Tanzim: sessionStorage.userName,
                    TahieShode: TahieShode_Inv5,
                    VstrPer: 0,
                    PakhshCode: '',
                    InOut: sessionStorage.InOut,
                    InvCode: inv,
                    Status: status,
                    //Taeed: sessionStorage.TaeedF == '' ? status == translate("تایید") ? sessionStorage.userName : '' : sessionStorage.TaeedF,
                    //Tasvib: status == translate("تصویب") ? sessionStorage.userName : '',
                    PaymentType: $("#paymenttype").val(),
                    Footer: $("#footer").val(),
                    deghat: parseInt(sessionStorage.DeghatInv),
                    F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val() == "" ? sessionStorage.F01 : $("#ExtraFields01").val(),
                    F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val() == "" ? sessionStorage.F02 : $("#ExtraFields02").val(),
                    F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val() == "" ? sessionStorage.F03 : $("#ExtraFields03").val(),
                    F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val() == "" ? sessionStorage.F04 : $("#ExtraFields04").val(),
                    F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val() == "" ? sessionStorage.F05 : $("#ExtraFields05").val(),
                    F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val() == "" ? sessionStorage.F06 : $("#ExtraFields06").val(),
                    F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val() == "" ? sessionStorage.F07 : $("#ExtraFields07").val(),
                    F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val() == "" ? sessionStorage.F08 : $("#ExtraFields08").val(),
                    F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val() == "" ? sessionStorage.F09 : $("#ExtraFields09").val(),
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
                    VstrCode: 0,
                    New: 'Y',
                    RelatedGroupActive: relatedActive,
                };



                ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'PUT', IDocHObject).done(function (response) {
                    var mes = TestAccessRes(response);
                    if (mes != "")
                        return showNotification(translate(mes), 0);

                    sessionStorage.searchIDocH = docno;
                    flaglog = 'N';
                    DeleteBand();
                    if (flagSaveLogWin == false) {
                        SaveLog('Inv5', EditMode_Chg, LogMode_IDoc, 0, docno, Serial);
                        flagSaveLogWin = true;
                    }
                });
            }


            var ConvertObject = {
                SerialNumber: Serial,
                TempSerialNumber: Serial_Test,
            };

            ajaxFunction(IDocBConvertUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.InOut, 'POST', ConvertObject, false).done(function (response) {
                var mes = TestAccessRes(response);
                if (mes != "")
                    return showNotification(translate(mes), 0);

                $('#inv').prop('disabled', true);
                $('#modeCode').prop('disabled', true);
                showNotification(translate('سند ذخیره شد'), 1);

            });
        } else {
            showNotification("به دلیل وجود اسناد لینک امکان ذخیره مجدد وجود ندارد", 0);
        }

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

                sum != 0 ? IDocB[row].TotalPrice = parseFloat(sum).toFixed(parseInt(sessionStorage.DeghatInv)) : IDocB[row].TotalPrice = 0;
            }
            else {
                // $("#totalPrice").css("backgroundColor", "white");
                // $("#unitPrice").css("backgroundColor", "yellow");
                sum != 0 ? IDocB[row].UnitPrice = sum : IDocB[row].UnitPrice = 0;
            }

            temp_FinalPrice = IDocB[row].TotalPrice;
            if (temp_FinalPrice > 0) {

                if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                    arzRate > 0 ? IDocB[row].ArzValue = temp_FinalPrice / arzRate : IDocB[row].ArzValue = 0;
                }
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
                if (colInfo.dataField != 'button' && colInfo.dataField != '#') {
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

        if (raveshInv == 2 || sessionStorage.InOut == "2") {
            Price1 = 0;
            Price2 = 0;
            Price3 = 0;
        }
        else {
            Price1 = parseFloat(IDocB[ro].dataKala.PPrice1);
            Price2 = parseFloat(IDocB[ro].dataKala.PPrice2);
            Price3 = parseFloat(IDocB[ro].dataKala.PPrice3);
        }



        getKalaPriceBList(IDocB[ro].dataKala.Code);

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



                                if (raveshInv == 2 || sessionStorage.InOut == "2") {
                                    Price1 = 0;
                                    Price2 = 0;
                                    Price3 = 0;
                                }
                                else {
                                    Price1 = parseFloat(dataKala.PPrice1);
                                    Price2 = parseFloat(dataKala.PPrice2);
                                    Price3 = parseFloat(dataKala.PPrice3);
                                }


                                //getKalaPriceBList(dataKala.Code);

                                dataGrid.cellValue(ro, "UnitPrice", defaultUnit == 1 ? Price1 : defaultUnit == 2 ? Price2 : Price3);


                                //GetTrzIKala(dataKala.Code, defaultUnit);

                                GetKalaMjd(
                                    dataKala.Code,
                                    IDocB[ro].KalaFileNo,
                                    IDocB[ro].KalaState,
                                    IDocB[ro].KalaExf1,
                                    IDocB[ro].KalaExf2,
                                    IDocB[ro].KalaExf3,
                                    IDocB[ro].KalaExf4,
                                    IDocB[ro].KalaExf5,
                                    IDocB[ro].KalaExf6,
                                    IDocB[ro].KalaExf7,
                                    IDocB[ro].KalaExf8,
                                    IDocB[ro].KalaExf9,
                                    IDocB[ro].KalaExf10,
                                    IDocB[ro].KalaExf11,
                                    IDocB[ro].KalaExf12,
                                    IDocB[ro].KalaExf13,
                                    IDocB[ro].KalaExf14,
                                    IDocB[ro].KalaExf15
                                );
                                IDocB[ro].KalaMjd = mAmount_Mjd;
                                IDocB[ro].TotalPriceMjd = mTotalPrice_Mjd;

                                $("#MAmount").text(NumberToNumberString(IDocB[ro].KalaMjd));
                                $("#MTotalPrice").text(NumberToNumberString(IDocB[ro].TotalPriceMjd));

                                //KalaUnitList = [];
                                //
                                // KalaUnitList[0].Name = IDocB[ro].dataKala.UnitName1;
                                // KalaUnitList[1].Name = IDocB[ro].dataKala.UnitName2;
                                //KalaUnitList[2].Name = IDocB[ro].dataKala.UnitName3;



                                if (sessionStorage.InOut == 2 && ace == 'Web8') {
                                    getKalaExf_OutList($("#inv").val(), dataKala.Code);
                                    if (self.KalaExf_OutList().length > 0) {
                                        $('#modal-KalaExf_Out').modal('show');
                                    }
                                    else {
                                        IDocB[ro].KalaFileNo = "";
                                        IDocB[ro].KalaState = "";
                                        IDocB[ro].KalaExf1 = "";
                                        IDocB[ro].KalaExf2 = "";
                                        IDocB[ro].KalaExf3 = "";
                                        IDocB[ro].KalaExf4 = "";
                                        IDocB[ro].KalaExf5 = "";
                                        IDocB[ro].KalaExf6 = "";
                                        IDocB[ro].KalaExf7 = "";
                                        IDocB[ro].KalaExf8 = "";
                                        IDocB[ro].KalaExf9 = "";
                                        IDocB[ro].KalaExf10 = "";
                                        IDocB[ro].KalaExf11 = "";
                                        IDocB[ro].KalaExf12 = "";
                                        IDocB[ro].KalaExf13 = "";
                                        IDocB[ro].KalaExf14 = "";
                                        IDocB[ro].KalaExf15 = "";
                                        dataGrid.cellValue(ro, "KalaFileNo", "")
                                        dataGrid.cellValue(ro, "KalaState", "")
                                        dataGrid.cellValue(ro, "KalaExf1", "")
                                        dataGrid.cellValue(ro, "KalaExf2", "")
                                        dataGrid.cellValue(ro, "KalaExf3", "")
                                        dataGrid.cellValue(ro, "KalaExf4", "")
                                        dataGrid.cellValue(ro, "KalaExf5", "")
                                        dataGrid.cellValue(ro, "KalaExf6", "")
                                        dataGrid.cellValue(ro, "KalaExf7", "")
                                        dataGrid.cellValue(ro, "KalaExf8", "")
                                        dataGrid.cellValue(ro, "KalaExf9", "")
                                        dataGrid.cellValue(ro, "KalaExf10", "")
                                        dataGrid.cellValue(ro, "KalaExf11", "")
                                        dataGrid.cellValue(ro, "KalaExf12", "")
                                        dataGrid.cellValue(ro, "KalaExf13", "")
                                        dataGrid.cellValue(ro, "KalaExf14", "")
                                        dataGrid.cellValue(ro, "KalaExf15", "")
                                    }
                                }



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
                        /*if (dKala != null) {
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
                        }*/

                        if (dKala != null) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");

                                dataGrid.cellValue(ro, "KalaCode", selectionChangedArgs.selectedRowsData[0].Code);

                                const visibleRows = dataGrid.getVisibleRows();
                                visibleRows[ro].data.dataKala = selectionChangedArgs.selectedRowsData[0];
                                IDocB[ro].dataKala = selectionChangedArgs.selectedRowsData[0];


                                dataKala = selectionChangedArgs.selectedRowsData[0];
                                IDocB[ro].MainUnit = dataKala.DefaultUnit
                                dataGrid.cellValue(ro, "MainUnitName", dataKala.DefaultUnit == 1 ? IDocB[ro].dataKala.UnitName1 : dataKala.DefaultUnit == 2 ? IDocB[ro].dataKala.UnitName2 : IDocB[ro].dataKala.UnitName3);

                                defaultUnit = dataKala.DefaultUnit;

                                if (raveshInv == 2 || sessionStorage.InOut == "2") {
                                    Price1 = 0;
                                    Price2 = 0;
                                    Price3 = 0;
                                }
                                else {
                                    Price1 = parseFloat(dataKala.PPrice1);
                                    Price2 = parseFloat(dataKala.PPrice2);
                                    Price3 = parseFloat(dataKala.PPrice3);
                                }

                                getKalaPriceBList(dataKala.Code);

                                dataGrid.cellValue(ro, "UnitPrice", defaultUnit == 1 ? Price1 : defaultUnit == 2 ? Price2 : Price3);

                                //GetTrzIKala(dataKala.Code, defaultUnit);


                                GetKalaMjd(
                                    dataKala.Code,
                                    defaultUnit,
                                    IDocB[ro].KalaFileNo,
                                    IDocB[ro].KalaState,
                                    IDocB[ro].KalaExf1,
                                    IDocB[ro].KalaExf2,
                                    IDocB[ro].KalaExf3,
                                    IDocB[ro].KalaExf4,
                                    IDocB[ro].KalaExf5,
                                    IDocB[ro].KalaExf6,
                                    IDocB[ro].KalaExf7,
                                    IDocB[ro].KalaExf8,
                                    IDocB[ro].KalaExf9,
                                    IDocB[ro].KalaExf10,
                                    IDocB[ro].KalaExf11,
                                    IDocB[ro].KalaExf12,
                                    IDocB[ro].KalaExf13,
                                    IDocB[ro].KalaExf14,
                                    IDocB[ro].KalaExf15
                                );
                                IDocB[ro].KalaMjd = mAmount_Mjd;
                                IDocB[ro].TotalPriceMjd = mTotalPrice_Mjd;

                                $("#MAmount").text(NumberToNumberString(IDocB[ro].KalaMjd));
                                $("#MTotalPrice").text(NumberToNumberString(IDocB[ro].TotalPriceMjd));

                                if (sessionStorage.InOut == 2 && ace == 'Web8') {
                                    getKalaExf_OutList($("#inv").val(), dataKala.Code);
                                    if (self.KalaExf_OutList().length > 0) {
                                        $('#modal-KalaExf_Out').modal('show');
                                    }
                                    else {
                                        IDocB[ro].KalaFileNo = "";
                                        IDocB[ro].KalaState = "";
                                        IDocB[ro].KalaExf1 = "";
                                        IDocB[ro].KalaExf2 = "";
                                        IDocB[ro].KalaExf3 = "";
                                        IDocB[ro].KalaExf4 = "";
                                        IDocB[ro].KalaExf5 = "";
                                        IDocB[ro].KalaExf6 = "";
                                        IDocB[ro].KalaExf7 = "";
                                        IDocB[ro].KalaExf8 = "";
                                        IDocB[ro].KalaExf9 = "";
                                        IDocB[ro].KalaExf10 = "";
                                        IDocB[ro].KalaExf11 = "";
                                        IDocB[ro].KalaExf12 = "";
                                        IDocB[ro].KalaExf13 = "";
                                        IDocB[ro].KalaExf14 = "";
                                        IDocB[ro].KalaExf15 = "";
                                        dataGrid.cellValue(ro, "KalaFileNo", "")
                                        dataGrid.cellValue(ro, "KalaState", "")
                                        dataGrid.cellValue(ro, "KalaExf1", "")
                                        dataGrid.cellValue(ro, "KalaExf2", "")
                                        dataGrid.cellValue(ro, "KalaExf3", "")
                                        dataGrid.cellValue(ro, "KalaExf4", "")
                                        dataGrid.cellValue(ro, "KalaExf5", "")
                                        dataGrid.cellValue(ro, "KalaExf6", "")
                                        dataGrid.cellValue(ro, "KalaExf7", "")
                                        dataGrid.cellValue(ro, "KalaExf8", "")
                                        dataGrid.cellValue(ro, "KalaExf9", "")
                                        dataGrid.cellValue(ro, "KalaExf10", "")
                                        dataGrid.cellValue(ro, "KalaExf11", "")
                                        dataGrid.cellValue(ro, "KalaExf12", "")
                                        dataGrid.cellValue(ro, "KalaExf13", "")
                                        dataGrid.cellValue(ro, "KalaExf14", "")
                                        dataGrid.cellValue(ro, "KalaExf15", "")
                                    }
                                }

                                e.component.close();
                                dataGrid.focus(dataGrid.getCellElement(ro, 'Amount' + (defaultUnit == null ? 1 : defaultUnit)));
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

                                    if (raveshInv == 2 || sessionStorage.InOut == "2") {
                                        Price1 = 0;
                                        Price2 = 0;
                                        Price3 = 0;
                                    }
                                    else {
                                        Price1 = parseFloat(dataKala.PPrice1);
                                        Price2 = parseFloat(dataKala.PPrice2);
                                        Price3 = parseFloat(dataKala.PPrice3);
                                    }

                                    getKalaPriceBList(dataKala.Code);

                                    dataGrid.cellValue(ro, "UnitPrice", IDocB[ro].MainUnit == 1 ? Price1 : IDocB[ro].MainUnit == 2 ? Price2 : Price3);
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }


    function dropDownBoxEditorKalaFileNo(cellElement, cellInfo) {

        //cellElement.attr('readonly', false);
        ro = cellInfo.rowIndex;
        var e_Template;
        if (IDocB[ro].dataKala != null) {
            var res = $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaFileNoList,
                value: cellInfo.value,
                showClearButton: false,
                readOnly: false,
                stylingMode: "contained",
                //disabled: true,
                valueExpr: 'Name',
                displayExpr: 'Name',

                onItemClick(e) {
                    var a = 1;
                },
                contentTemplate(e) {
                    e_Template = e;
                    return $('<div>').dxDataGrid({
                        dataSource: kalaFileNoList,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaFileNo = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },


            });




            var a = res.find('.dx-dropdowneditor-input-wrapper');
            var input = a.find('input').next().first().find('input');
            input.ready(function () {
                input.attr('readonly', false);
            });
            input.keyup(function () {
                value = input.val();
                valueDropDownKalaExf = value;
                //var d = res.dxDropDownBox("instance");
                //d.option('displayValue', [valueDropDownKalaExf]);
                //IDocB[ro].KalaFileNo = valueDropDownKalaExf;
                //var dataGrid = $("#gridContainer").dxDataGrid("instance");
                //dataGrid.cellValue(ro, "KalaFileNo", valueDropDownKalaExf);
                //dataGrid.repaintRows();
                //$("#gridContainer").dxDataGrid("instance").refresh();


            });

            res.change(function () {
                //var list = kalaFileNoList.filter(c => Name == valueDropDownKalaExf)
                //if (list.length == 0) {
                //    kalaFileNoList.add({ Name: valueDropDownKalaExf });
                //}


                var d = res.dxDropDownBox("instance");
                d.option('displayValue', [valueDropDownKalaExf]);
                d.option('value', valueDropDownKalaExf);
                IDocB[ro].KalaFileNo = valueDropDownKalaExf;

            });
            input.change(function () {
                //cellElement.text(valueDropDownKalaExf);
                //e_Template.component.option('value', valueDropDownKalaExf);
                //cellInfo.setValue(valueDropDownKalaExf);
                //cellInfo.value = valueDropDownKalaExf;
                //IDocB[ro].KalaFileNo = valueDropDownKalaExf;
                //cellInfo.setValue(valueDropDownKalaExf);
                //var dataGrid = $("#gridContainer").dxDataGrid("instance");
                //dataGrid.cellValue(ro, "KalaFileNo", valueDropDownKalaExf);


                //valueDropDownKalaExf = null;
                //e_Template.component.close();

                //dataGrid.refresh();
                // kalaFileNoList.add({ Name: valueDropDownKalaExf });
                //var d = res.dxDropDownBox("instance");
                //d.option('displayValue', [valueDropDownKalaExf]);
                //d.option('value', valueDropDownKalaExf);
                //IDocB[ro].KalaFileNo = valueDropDownKalaExf;
                //cellInfo.setValue(valueDropDownKalaExf);
                //var dataGrid = $("#gridContainer").dxDataGrid("instance");


                //cellInfo.setValue('11200');
                //dataGrid.cellValue(ro, "KalaFileNo", 2000);
            })

            return res;
        }
    }
    /*
    function dropDownBoxEditorKalaState(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaStateList,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaStateList,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaState = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    
    function dropDownBoxEditorKalaExf1(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf1List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf1List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf1 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf2(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf2List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf2List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf2 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf3(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf3List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf3List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf3 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf4(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf4List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf4List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf4 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf5(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf5List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf5List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf5 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf6(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf6List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf6List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf6 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf7(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf7List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf7List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf7 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf8(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf8List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf8List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf8 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf9(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf9List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf9List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf9 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf10(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf10List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf10List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf10 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf11(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf11List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf11List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf11 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf12(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf12List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf12List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf12 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf13(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf13List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf13List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf13 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf14(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf14List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf14List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf14 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    function dropDownBoxEditorKalaExf15(cellElement, cellInfo) {
        ro = cellInfo.rowIndex;
        if (IDocB[ro].dataKala != null) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: kalaExf15List,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: kalaExf15List,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Name', caption: "عنوان" },
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
                                    IDocB[ro].KalaExf15 = selectionChangedArgs.selectedRowsData[0].Name;
                                    e.component.close();
                                }
                            }
                        },
                    });
                },
            });
        }
    }
    */

    function FilterUnitName(dataKala) {
        if (dataKala != null) {
            return ["UnitName", "=", dataKala.UnitName1]
        }
    }














    //$(document).ready(function () { });
    //------------------------------------------------------
    self.currentPageThvl = ko.observable();

    pageSizeThvl = localStorage.getItem('pageSizeThvl') == null ? 10 : localStorage.getItem('pageSizeThvl');

    self.pageSizeThvl = ko.observable(pageSizeThvl);
    self.currentPageIndexThvl = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");


    self.filterThvl0 = ko.observable("");
    self.filterThvl1 = ko.observable("");
    self.filterThvl2 = ko.observable("");


    self.filterThvlList = ko.computed(function () {

        self.currentPageIndexThvl(0);
        var filter0 = self.filterThvl0().toUpperCase();
        var filter1 = self.filterThvl1();
        var filter2 = self.filterThvl2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ThvlList();
        } else {
            tempData = ko.utils.arrayFilter(self.ThvlList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageThvl = ko.computed(function () {
        var pageSizeThvl = parseInt(self.pageSizeThvl(), 10),
            startIndex = pageSizeThvl * self.currentPageIndexThvl(),
            endIndex = startIndex + pageSizeThvl;
        localStorage.setItem('pageSizeThvl', pageSizeThvl);
        return self.filterThvlList().slice(startIndex, endIndex);
    });


    self.nextPageThvl = function () {
        if (((self.currentPageIndexThvl() + 1) * self.pageSizeThvl()) < self.filterThvlList().length) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() + 1);
        }
    };

    self.previousPageThvl = function () {
        if (self.currentPageIndexThvl() > 0) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() - 1);
        }
    };

    self.firstPageThvl = function () {
        self.currentPageIndexThvl(0);
    };

    self.lastPageThvl = function () {
        countThvl = parseInt(self.filterThvlList().length / self.pageSizeThvl(), 10);
        self.currentPageIndexThvl(countThvl);
    };

    self.sortTableThvl = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ThvlList.sort(function (left, right) {

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



    self.selectThvl = function (item) {

        //if (Serial != '') {
        Swal.fire({
            title: translate('تایید و ثبت نهایی تغییرات ؟'),
            text: translate('در صورت تغییر') + " " + (sessionStorage.InOut == 2 ? translate('تحویل گیرنده') : translate('تحویل دهنده')) + " " + translate('تغییرات پیش فرض اعمال و ثبت نهایی می شود . آیا عملیات انجام شود؟'),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                codeThvl = item.Code;
                $('#nameThvl').val('(' + item.Code + ') ' + item.Name)


                if (sessionStorage.sels == "true")
                    sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val(0) : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                else
                    sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val(0) : $("#gGhimat").val(sessionStorage.GPriceDefultP);


                if (sessionStorage.InOut == 2 && item.CGruKalaPriceCode_S > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_S);
                else if (sessionStorage.InOut == 1 && item.CGruKalaPriceCode_P > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_P);

                if (sessionStorage.InOut == 2 && item.KalaPriceCode_S > 0)
                    $("#gGhimat").val(item.KalaPriceCode_S);
                else if (sessionStorage.InOut == 1 && item.KalaPriceCode_P > 0)
                    $("#gGhimat").val(item.KalaPriceCode_P);


                self.ThvlCode(item.Code)
                SetKalaPrice();
                flagKalaPrice = true;
            }
        })
        /* }
         else {
             codeThvl = item.Code;
             $('#nameThvl').val('(' + item.Code + ') ' + item.Name)
            
              
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
             self.ThvlCode(item.Code)
         }*/
        $('#nameThvl').focus();
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


    $('#modal-Thvl').on('shown.bs.modal', function () {
        $('#searchThvl').val('');
        self.filterThvlList();
        $('#searchThvl').focus();
    });


    $('#refreshThvl').click(function () {

        Swal.fire({
            title: mes_Refresh,
            text: (sessionStorage.InOut == 2 ? translate("لیست تحویل گیرنده گان ") : translate("لیست تحویل دهندگان ")) + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getThvlList();
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









    self.currentPageKalaExf_Out = ko.observable();
    pageSizeKalaExf_Out = localStorage.getItem('pageSizeKalaExf_Out') == null ? 10 : localStorage.getItem('pageSizeKalaExf_Out');
    self.pageSizeKalaExf_Out = ko.observable(pageSizeKalaExf_Out);
    self.currentPageIndexKalaExf_Out = ko.observable(0);

    self.filterKalaExf_Out0 = ko.observable("");
    self.filterKalaExf_Out1 = ko.observable("");
    self.filterKalaExf_Out2 = ko.observable("");

    self.filterKalaExf_OutList = ko.computed(function () {

        self.currentPageIndexKalaExf_Out(0);
        var filter0 = self.filterKalaExf_Out0().toUpperCase();
        var filter1 = self.filterKalaExf_Out1();
        var filter2 = self.filterKalaExf_Out2();

        if (!filter0 && !filter1 && !filter2) {
            return self.KalaExf_OutList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf_OutList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf_Out = ko.computed(function () {
        var pageSizeKalaExf_Out = parseInt(self.pageSizeKalaExf_Out(), 10),
            startIndex = pageSizeKalaExf_Out * self.currentPageIndexKalaExf_Out(),
            endIndex = startIndex + pageSizeKalaExf_Out;
        localStorage.setItem('pageSizeKalaExf_Out', pageSizeKalaExf_Out);
        return self.filterKalaExf_OutList().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf_Out = function () {
        if (((self.currentPageIndexKalaExf_Out() + 1) * self.pageSizeKalaExf_Out()) < self.filterKalaExf_OutList().length) {
            self.currentPageIndexKalaExf_Out(self.currentPageIndexKalaExf_Out() + 1);
        }
    };

    self.previousPageKalaExf_Out = function () {
        if (self.currentPageIndexKalaExf_Out() > 0) {
            self.currentPageIndexKalaExf_Out(self.currentPageIndexKalaExf_Out() - 1);
        }
    };

    self.firstPageKalaExf_Out = function () {
        self.currentPageIndexKalaExf_Out(0);
    };

    self.lastPageKalaExf_Out = function () {
        countKalaExf_Out = parseInt(self.filterKalaExf_OutList().length / self.pageSizeKalaExf_Out(), 10);
        if ((self.filterKalaExf_OutList().length % self.pageSizeKalaExf_Out()) == 0)
            self.currentPageIndexKalaExf_Out(countKalaExf_Out - 1);
        else
            self.currentPageIndexKalaExf_Out(countKalaExf_Out);
    };

    self.sortTableKalaExf_Out = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf_OutList.sort(function (left, right) {
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


    $('#refreshKalaExf_Out').click(function () {
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
                getKalaExf_OutList();
            }
        })
    })


    self.selectKalaExf_Out = function (item) {
        var a = ro;
        var docb
        IDocB[ro].KalaFileNo = item.KalaFileNo;
        IDocB[ro].KalaState = item.KalaState;
        IDocB[ro].KalaExf1 = item.KalaExf1;
        IDocB[ro].KalaExf2 = item.KalaExf2;
        IDocB[ro].KalaExf3 = item.KalaExf3;
        IDocB[ro].KalaExf4 = item.KalaExf4;
        IDocB[ro].KalaExf5 = item.KalaExf5;
        IDocB[ro].KalaExf6 = item.KalaExf6;
        IDocB[ro].KalaExf7 = item.KalaExf7;
        IDocB[ro].KalaExf8 = item.KalaExf8;
        IDocB[ro].KalaExf9 = item.KalaExf9;
        IDocB[ro].KalaExf10 = item.KalaExf10;
        IDocB[ro].KalaExf11 = item.KalaExf11;
        IDocB[ro].KalaExf12 = item.KalaExf12;
        IDocB[ro].KalaExf13 = item.KalaExf13;
        IDocB[ro].KalaExf14 = item.KalaExf14;
        IDocB[ro].KalaExf15 = item.KalaExf15;

        dataGrid.cellValue(ro, "KalaFileNo", item.KalaFileNo)
        dataGrid.cellValue(ro, "KalaState", item.KalaState)
        dataGrid.cellValue(ro, "KalaExf1", item.KalaExf1)
        dataGrid.cellValue(ro, "KalaExf2", item.KalaExf2)
        dataGrid.cellValue(ro, "KalaExf3", item.KalaExf3)
        dataGrid.cellValue(ro, "KalaExf4", item.KalaExf4)
        dataGrid.cellValue(ro, "KalaExf5", item.KalaExf5)
        dataGrid.cellValue(ro, "KalaExf6", item.KalaExf6)
        dataGrid.cellValue(ro, "KalaExf7", item.KalaExf7)
        dataGrid.cellValue(ro, "KalaExf8", item.KalaExf8)
        dataGrid.cellValue(ro, "KalaExf9", item.KalaExf9)
        dataGrid.cellValue(ro, "KalaExf10", item.KalaExf10)
        dataGrid.cellValue(ro, "KalaExf11", item.KalaExf11)
        dataGrid.cellValue(ro, "KalaExf12", item.KalaExf12)
        dataGrid.cellValue(ro, "KalaExf13", item.KalaExf13)
        dataGrid.cellValue(ro, "KalaExf14", item.KalaExf14)
        dataGrid.cellValue(ro, "KalaExf15", item.KalaExf15)


        GetKalaMjd(
            item.Code,
            defaultUnit,
            item.KalaFileNo,
            item.KalaState,
            item.KalaExf1,
            item.KalaExf2,
            item.KalaExf3,
            item.KalaExf4,
            item.KalaExf5,
            item.KalaExf6,
            item.KalaExf7,
            item.KalaExf8,
            item.KalaExf9,
            item.KalaExf10,
            item.KalaExf11,
            item.KalaExf12,
            item.KalaExf13,
            item.KalaExf14,
            item.KalaExf15
        );
        IDocB[ro].KalaMjd = mAmount_Mjd;
        IDocB[ro].TotalPriceMjd = mTotalPrice_Mjd;

        $("#MAmount").text(NumberToNumberString(IDocB[ro].KalaMjd));
        $("#MTotalPrice").text(NumberToNumberString(IDocB[ro].TotalPriceMjd));


        /*      GetTrzIKalaExf(
                  $("#inv").val(),
                  item.Code,
                  defaultUnit,
                  item.KalaFileNo,
                  item.KalaState,
                  item.KalaExf1,
                  item.KalaExf2,
                  item.KalaExf3,
                  item.KalaExf4,
                  item.KalaExf5,
                  item.KalaExf6,
                  item.KalaExf7,
                  item.KalaExf8,
                  item.KalaExf9,
                  item.KalaExf10,
                  item.KalaExf11,
                  item.KalaExf12,
                  item.KalaExf13,
                  item.KalaExf14,
                  item.KalaExf15
              )*/

    }


    $('#modal-KalaExf_Out').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });







    self.currentPageKalaFileNo = ko.observable();
    pageSizeKalaFileNo = localStorage.getItem('pageSizeKalaFileNo') == null ? 10 : localStorage.getItem('pageSizeKalaFileNo');
    self.pageSizeKalaFileNo = ko.observable(pageSizeKalaFileNo);
    self.currentPageIndexKalaFileNo = ko.observable(0);

    self.filterKalaFileNo0 = ko.observable("");

    self.filterKalaFileNoList = ko.computed(function () {

        self.currentPageIndexKalaFileNo(0);
        var filter0 = self.filterKalaFileNo0().toUpperCase();

        if (!filter0) {
            return self.KalaFileNoList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaFileNoList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaFileNo = ko.computed(function () {
        var pageSizeKalaFileNo = parseInt(self.pageSizeKalaFileNo(), 10),
            startIndex = pageSizeKalaFileNo * self.currentPageIndexKalaFileNo(),
            endIndex = startIndex + pageSizeKalaFileNo;
        localStorage.setItem('pageSizeKalaFileNo', pageSizeKalaFileNo);
        return self.filterKalaFileNoList().slice(startIndex, endIndex);
    });

    self.nextPageKalaFileNo = function () {
        if (((self.currentPageIndexKalaFileNo() + 1) * self.pageSizeKalaFileNo()) < self.filterKalaFileNoList().length) {
            self.currentPageIndexKalaFileNo(self.currentPageIndexKalaFileNo() + 1);
        }
    };

    self.previousPageKalaFileNo = function () {
        if (self.currentPageIndexKalaFileNo() > 0) {
            self.currentPageIndexKalaFileNo(self.currentPageIndexKalaFileNo() - 1);
        }
    };

    self.firstPageKalaFileNo = function () {
        self.currentPageIndexKalaFileNo(0);
    };

    self.lastPageKalaFileNo = function () {
        countKalaFileNo = parseInt(self.filterKalaFileNoList().length / self.pageSizeKalaFileNo(), 10);
        if ((self.filterKalaFileNoList().length % self.pageSizeKalaFileNo()) == 0)
            self.currentPageIndexKalaFileNo(countKalaFileNo - 1);
        else
            self.currentPageIndexKalaFileNo(countKalaFileNo);
    };

    self.sortTableKalaFileNo = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaFileNoList.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaFileNo = function (item) {
        IDocB[ro].KalaFileNo = item.Name;
        dataGrid.cellValue(ro, "KalaFileNo", item.Name);
        codeKalaFileNo = 0;
        $('#modal-KalaFileNo').modal('hide');
    }


    $('#modal-KalaFileNo').on('shown.bs.modal', function () {
        $("#E_KalaFileNo").val('');
        codeKalaFileNo = 0;
        $('.fix').attr('class', 'form-line focused fix');
    });


    $('#refreshKalaFileNo').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaFileNo');
            }
        })
    })


    self.PageIndexKalaFileNo = function (item) {
        return CountPage(self.filterKalaFileNoList(), self.pageSizeKalaFileNo(), item);
    };

    $('#btnAddKalaFileNo').click(function () {
        var value = $("#E_KalaFileNo").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaFileNo',
                Code: codeKalaFileNo,
                Name: value
            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaFileNo');
                }
                else {
                    var data = kalaFileNoList.filter(s => s.Name == value);
                    if (data.length == 0) {
                        kalaFileNoList.add({ Name: value });
                        self.KalaFileNoList(kalaFileNoList);
                    }
                }

            });
        }
        codeKalaFileNo = 0;
        $("#E_KalaFileNo").val('');
    })

    var codeKalaFileNo = 0;
    self.UpdateKalaFileNo = function (item) {
        codeKalaFileNo = item.Code;
        $("#E_KalaFileNo").val(item.Name);
    }






    self.currentPageKalaState = ko.observable();
    pageSizeKalaState = localStorage.getItem('pageSizeKalaState') == null ? 10 : localStorage.getItem('pageSizeKalaState');
    self.pageSizeKalaState = ko.observable(pageSizeKalaState);
    self.currentPageIndexKalaState = ko.observable(0);

    self.filterKalaState0 = ko.observable("");

    self.filterKalaStateList = ko.computed(function () {

        self.currentPageIndexKalaState(0);
        var filter0 = self.filterKalaState0().toUpperCase();

        if (!filter0) {
            return self.KalaStateList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaStateList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaState = ko.computed(function () {
        var pageSizeKalaState = parseInt(self.pageSizeKalaState(), 10),
            startIndex = pageSizeKalaState * self.currentPageIndexKalaState(),
            endIndex = startIndex + pageSizeKalaState;
        localStorage.setItem('pageSizeKalaState', pageSizeKalaState);
        return self.filterKalaStateList().slice(startIndex, endIndex);
    });

    self.nextPageKalaState = function () {
        if (((self.currentPageIndexKalaState() + 1) * self.pageSizeKalaState()) < self.filterKalaStateList().length) {
            self.currentPageIndexKalaState(self.currentPageIndexKalaState() + 1);
        }
    };

    self.previousPageKalaState = function () {
        if (self.currentPageIndexKalaState() > 0) {
            self.currentPageIndexKalaState(self.currentPageIndexKalaState() - 1);
        }
    };

    self.firstPageKalaState = function () {
        self.currentPageIndexKalaState(0);
    };

    self.lastPageKalaState = function () {
        countKalaState = parseInt(self.filterKalaStateList().length / self.pageSizeKalaState(), 10);
        if ((self.filterKalaStateList().length % self.pageSizeKalaState()) == 0)
            self.currentPageIndexKalaState(countKalaState - 1);
        else
            self.currentPageIndexKalaState(countKalaState);
    };

    self.sortTableKalaState = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaStateList.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaState = function (item) {
        IDocB[ro].KalaState = item.Name;
        dataGrid.cellValue(ro, "KalaState", item.Name);
        codeKalaState = 0;
        $('#modal-KalaState').modal('hide');

    }


    $('#modal-KalaState').on('shown.bs.modal', function () {
        $("#E_KalaState").val('');
        codeKalaState = 0;
        $('.fix').attr('class', 'form-line focused fix');
    });


    $('#refreshKalaState').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaState');
            }
        })
    })

    self.PageIndexKalaState = function (item) {
        return CountPage(self.filterKalaStateList(), self.pageSizeKalaState(), item);
    };

    $('#btnAddKalaState').click(function () {
        var value = $("#E_KalaState").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaState',
                Code: codeKalaState,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaState');
                }
                else {
                    var data = kalaStateList.filter(s => s.Name == value);
                    if (data.length == 0) {
                        kalaStateList.add({ Name: value });
                        self.KalaStateList(kalaStateList);
                    }
                }

            });
            codeKalaState = 0;
            $("#E_KalaState").val('');
        }
    })

    var codeKalaState = 0;
    self.UpdateKalaState = function (item) {
        codeKalaState = item.Code;
        $("#E_KalaState").val(item.Name);
    }





    self.currentPageKalaExf1 = ko.observable();
    pageSizeKalaExf1 = localStorage.getItem('pageSizeKalaExf1') == null ? 10 : localStorage.getItem('pageSizeKalaExf1');
    self.pageSizeKalaExf1 = ko.observable(pageSizeKalaExf1);
    self.currentPageIndexKalaExf1 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf1List = ko.computed(function () {

        self.currentPageIndexKalaExf1(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf1List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf1List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf1 = ko.computed(function () {
        var pageSizeKalaExf1 = parseInt(self.pageSizeKalaExf1(), 10),
            startIndex = pageSizeKalaExf1 * self.currentPageIndexKalaExf1(),
            endIndex = startIndex + pageSizeKalaExf1;
        localStorage.setItem('pageSizeKalaExf1', pageSizeKalaExf1);
        return self.filterKalaExf1List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf1 = function () {
        if (((self.currentPageIndexKalaExf1() + 1) * self.pageSizeKalaExf1()) < self.filterKalaExf1List().length) {
            self.currentPageIndexKalaExf1(self.currentPageIndexKalaExf1() + 1);
        }
    };

    self.previousPageKalaExf1 = function () {
        if (self.currentPageIndexKalaExf1() > 0) {
            self.currentPageIndexKalaExf1(self.currentPageIndexKalaExf1() - 1);
        }
    };

    self.firstPageKalaExf1 = function () {
        self.currentPageIndexKalaExf1(0);
    };

    self.lastPageKalaExf1 = function () {
        countKalaExf1 = parseInt(self.filterKalaExf1List().length / self.pageSizeKalaExf1(), 10);
        if ((self.filterKalaExf1List().length % self.pageSizeKalaExf1()) == 0)
            self.currentPageIndexKalaExf1(countKalaExf1 - 1);
        else
            self.currentPageIndexKalaExf1(countKalaExf1);
    };

    self.sortTableKalaExf1 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf1List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf1 = function (item) {
        IDocB[ro].KalaExf1 = item.Name;
        dataGrid.cellValue(ro, "KalaExf1", item.Name);
        codeKalaExf1 = 0;
        $('#modal-KalaExf1').modal('hide');
    }


    $('#modal-KalaExf1').on('shown.bs.modal', function () {
        $("#E_KalaExf1").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf1 = 0;
    });


    $('#refreshKalaExf1').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf1');
            }
        })
    })

    self.PageIndexKalaExf1 = function (item) {
        return CountPage(self.filterKalaExf1List(), self.pageSizeKalaExf1(), item);
    };

    $('#btnAddKalaExf1').click(function () {
        var value = $("#E_KalaExf1").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf1',
                Code: codeKalaExf1,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf1');
                }
                else {
                    var data = KalaExf1List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf1List.add({ Name: value });
                        self.KalaExf1List(KalaExf1List);
                    }
                }

            });
            codeKalaExf1 = 0;
            $("#E_KalaExf1").val('');
        }
    })



    var codeKalaExf1 = 0;
    self.UpdateKalaExf1 = function (item) {
        codeKalaExf1 = item.Code;
        $("#E_KalaExf1").val(item.Name);
    }

















    self.currentPageKalaExf2 = ko.observable();
    pageSizeKalaExf2 = localStorage.getItem('pageSizeKalaExf2') == null ? 10 : localStorage.getItem('pageSizeKalaExf2');
    self.pageSizeKalaExf2 = ko.observable(pageSizeKalaExf2);
    self.currentPageIndexKalaExf2 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf2List = ko.computed(function () {

        self.currentPageIndexKalaExf2(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf2List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf2List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf2 = ko.computed(function () {
        var pageSizeKalaExf2 = parseInt(self.pageSizeKalaExf2(), 10),
            startIndex = pageSizeKalaExf2 * self.currentPageIndexKalaExf2(),
            endIndex = startIndex + pageSizeKalaExf2;
        localStorage.setItem('pageSizeKalaExf2', pageSizeKalaExf2);
        return self.filterKalaExf2List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf2 = function () {
        if (((self.currentPageIndexKalaExf2() + 1) * self.pageSizeKalaExf2()) < self.filterKalaExf2List().length) {
            self.currentPageIndexKalaExf2(self.currentPageIndexKalaExf2() + 1);
        }
    };

    self.previousPageKalaExf2 = function () {
        if (self.currentPageIndexKalaExf2() > 0) {
            self.currentPageIndexKalaExf2(self.currentPageIndexKalaExf2() - 1);
        }
    };

    self.firstPageKalaExf2 = function () {
        self.currentPageIndexKalaExf2(0);
    };

    self.lastPageKalaExf2 = function () {
        countKalaExf2 = parseInt(self.filterKalaExf2List().length / self.pageSizeKalaExf2(), 10);
        if ((self.filterKalaExf2List().length % self.pageSizeKalaExf2()) == 0)
            self.currentPageIndexKalaExf2(countKalaExf2 - 1);
        else
            self.currentPageIndexKalaExf2(countKalaExf2);
    };

    self.sortTableKalaExf2 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf2List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf2 = function (item) {
        IDocB[ro].KalaExf2 = item.Name;
        dataGrid.cellValue(ro, "KalaExf2", item.Name);
        codeKalaExf2 = 0;
        $('#modal-KalaExf2').modal('hide');
    }


    $('#modal-KalaExf2').on('shown.bs.modal', function () {
        $("#E_KalaExf2").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf2 = 0;
    });


    $('#refreshKalaExf2').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf2');
            }
        })
    })

    self.PageIndexKalaExf2 = function (item) {
        return CountPage(self.filterKalaExf2List(), self.pageSizeKalaExf2(), item);
    };

    $('#btnAddKalaExf2').click(function () {
        var value = $("#E_KalaExf2").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf2',
                Code: codeKalaExf2,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf2');
                }
                else {
                    var data = KalaExf2List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf2List.add({ Name: value });
                        self.KalaExf2List(KalaExf2List);
                    }
                }

            });
            codeKalaExf2 = 0;
            $("#E_KalaExf2").val('');
        }
    })
    var codeKalaExf2 = 0;
    self.UpdateKalaExf2 = function (item) {
        codeKalaExf2 = item.Code;
        $("#E_KalaExf2").val(item.Name);
    }









    self.currentPageKalaExf3 = ko.observable();
    pageSizeKalaExf3 = localStorage.getItem('pageSizeKalaExf3') == null ? 10 : localStorage.getItem('pageSizeKalaExf3');
    self.pageSizeKalaExf3 = ko.observable(pageSizeKalaExf3);
    self.currentPageIndexKalaExf3 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf3List = ko.computed(function () {

        self.currentPageIndexKalaExf3(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf3List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf3List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf3 = ko.computed(function () {
        var pageSizeKalaExf3 = parseInt(self.pageSizeKalaExf3(), 10),
            startIndex = pageSizeKalaExf3 * self.currentPageIndexKalaExf3(),
            endIndex = startIndex + pageSizeKalaExf3;
        localStorage.setItem('pageSizeKalaExf3', pageSizeKalaExf3);
        return self.filterKalaExf3List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf3 = function () {
        if (((self.currentPageIndexKalaExf3() + 1) * self.pageSizeKalaExf3()) < self.filterKalaExf3List().length) {
            self.currentPageIndexKalaExf3(self.currentPageIndexKalaExf3() + 1);
        }
    };

    self.previousPageKalaExf3 = function () {
        if (self.currentPageIndexKalaExf3() > 0) {
            self.currentPageIndexKalaExf3(self.currentPageIndexKalaExf3() - 1);
        }
    };

    self.firstPageKalaExf3 = function () {
        self.currentPageIndexKalaExf3(0);
    };

    self.lastPageKalaExf3 = function () {
        countKalaExf3 = parseInt(self.filterKalaExf3List().length / self.pageSizeKalaExf3(), 10);
        if ((self.filterKalaExf3List().length % self.pageSizeKalaExf3()) == 0)
            self.currentPageIndexKalaExf3(countKalaExf3 - 1);
        else
            self.currentPageIndexKalaExf3(countKalaExf3);
    };

    self.sortTableKalaExf3 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf3List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf3 = function (item) {
        IDocB[ro].KalaExf3 = item.Name;
        dataGrid.cellValue(ro, "KalaExf3", item.Name);
        codeKalaExf3 = 0;
        $('#modal-KalaExf3').modal('hide');
    }


    $('#modal-KalaExf3').on('shown.bs.modal', function () {
        $("#E_KalaExf3").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf3 = 0;
    });


    $('#refreshKalaExf3').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf3');
            }
        })
    })

    self.PageIndexKalaExf3 = function (item) {
        return CountPage(self.filterKalaExf3List(), self.pageSizeKalaExf3(), item);
    };

    $('#btnAddKalaExf3').click(function () {
        var value = $("#E_KalaExf3").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf3',
                Code: codeKalaExf3,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf3');
                }
                else {
                    var data = KalaExf3List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf3List.add({ Name: value });
                        self.KalaExf3List(KalaExf3List);
                    }
                }

            });
            codeKalaExf3 = 0;
            $("#E_KalaExf3").val('');
        }
    })


    var codeKalaExf3 = 0;
    self.UpdateKalaExf3 = function (item) {
        codeKalaExf3 = item.Code;
        $("#E_KalaExf3").val(item.Name);
    }








    self.currentPageKalaExf4 = ko.observable();
    pageSizeKalaExf4 = localStorage.getItem('pageSizeKalaExf4') == null ? 10 : localStorage.getItem('pageSizeKalaExf4');
    self.pageSizeKalaExf4 = ko.observable(pageSizeKalaExf4);
    self.currentPageIndexKalaExf4 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf4List = ko.computed(function () {

        self.currentPageIndexKalaExf4(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf4List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf4List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf4 = ko.computed(function () {
        var pageSizeKalaExf4 = parseInt(self.pageSizeKalaExf4(), 10),
            startIndex = pageSizeKalaExf4 * self.currentPageIndexKalaExf4(),
            endIndex = startIndex + pageSizeKalaExf4;
        localStorage.setItem('pageSizeKalaExf4', pageSizeKalaExf4);
        return self.filterKalaExf4List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf4 = function () {
        if (((self.currentPageIndexKalaExf4() + 1) * self.pageSizeKalaExf4()) < self.filterKalaExf4List().length) {
            self.currentPageIndexKalaExf4(self.currentPageIndexKalaExf4() + 1);
        }
    };

    self.previousPageKalaExf4 = function () {
        if (self.currentPageIndexKalaExf4() > 0) {
            self.currentPageIndexKalaExf4(self.currentPageIndexKalaExf4() - 1);
        }
    };

    self.firstPageKalaExf4 = function () {
        self.currentPageIndexKalaExf4(0);
    };

    self.lastPageKalaExf4 = function () {
        countKalaExf4 = parseInt(self.filterKalaExf4List().length / self.pageSizeKalaExf4(), 10);
        if ((self.filterKalaExf4List().length % self.pageSizeKalaExf4()) == 0)
            self.currentPageIndexKalaExf4(countKalaExf4 - 1);
        else
            self.currentPageIndexKalaExf4(countKalaExf4);
    };

    self.sortTableKalaExf4 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf4List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf4 = function (item) {
        IDocB[ro].KalaExf4 = item.Name;
        dataGrid.cellValue(ro, "KalaExf4", item.Name);
        codeKalaExf4 = 0;
        $('#modal-KalaExf4').modal('hide');
    }


    $('#modal-KalaExf4').on('shown.bs.modal', function () {
        $("#E_KalaExf4").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf4 = 0;
    });


    $('#refreshKalaExf4').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf4');
            }
        })
    })

    self.PageIndexKalaExf4 = function (item) {
        return CountPage(self.filterKalaExf4List(), self.pageSizeKalaExf4(), item);
    };

    $('#btnAddKalaExf4').click(function () {
        var value = $("#E_KalaExf4").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf4',
                Code: codeKalaExf4,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf4');
                }
                else {
                    var data = KalaExf4List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf4List.add({ Name: value });
                        self.KalaExf4List(KalaExf4List);
                    }
                }

            });
            codeKalaExf4 = 0;
            $("#E_KalaExf4").val('');
        }
    })


    var codeKalaExf4 = 0;
    self.UpdateKalaExf4 = function (item) {
        codeKalaExf4 = item.Code;
        $("#E_KalaExf4").val(item.Name);
    }









    self.currentPageKalaExf5 = ko.observable();
    pageSizeKalaExf5 = localStorage.getItem('pageSizeKalaExf5') == null ? 10 : localStorage.getItem('pageSizeKalaExf5');
    self.pageSizeKalaExf5 = ko.observable(pageSizeKalaExf5);
    self.currentPageIndexKalaExf5 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf5List = ko.computed(function () {

        self.currentPageIndexKalaExf5(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf5List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf5List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf5 = ko.computed(function () {
        var pageSizeKalaExf5 = parseInt(self.pageSizeKalaExf5(), 10),
            startIndex = pageSizeKalaExf5 * self.currentPageIndexKalaExf5(),
            endIndex = startIndex + pageSizeKalaExf5;
        localStorage.setItem('pageSizeKalaExf5', pageSizeKalaExf5);
        return self.filterKalaExf5List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf5 = function () {
        if (((self.currentPageIndexKalaExf5() + 1) * self.pageSizeKalaExf5()) < self.filterKalaExf5List().length) {
            self.currentPageIndexKalaExf5(self.currentPageIndexKalaExf5() + 1);
        }
    };

    self.previousPageKalaExf5 = function () {
        if (self.currentPageIndexKalaExf5() > 0) {
            self.currentPageIndexKalaExf5(self.currentPageIndexKalaExf5() - 1);
        }
    };

    self.firstPageKalaExf5 = function () {
        self.currentPageIndexKalaExf5(0);
    };

    self.lastPageKalaExf5 = function () {
        countKalaExf5 = parseInt(self.filterKalaExf5List().length / self.pageSizeKalaExf5(), 10);
        if ((self.filterKalaExf5List().length % self.pageSizeKalaExf5()) == 0)
            self.currentPageIndexKalaExf5(countKalaExf5 - 1);
        else
            self.currentPageIndexKalaExf5(countKalaExf5);
    };

    self.sortTableKalaExf5 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf5List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf5 = function (item) {
        IDocB[ro].KalaExf5 = item.Name;
        dataGrid.cellValue(ro, "KalaExf5", item.Name);
        codeKalaExf5 = 0;
        $('#modal-KalaExf5').modal('hide');
    }


    $('#modal-KalaExf5').on('shown.bs.modal', function () {
        $("#E_KalaExf5").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf5 = 0;
    });


    $('#refreshKalaExf5').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf5');
            }
        })
    })

    self.PageIndexKalaExf5 = function (item) {
        return CountPage(self.filterKalaExf5List(), self.pageSizeKalaExf5(), item);
    };

    $('#btnAddKalaExf5').click(function () {
        var value = $("#E_KalaExf5").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf5',
                Code: codeKalaExf5,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf5');
                }
                else {
                    var data = KalaExf5List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf5List.add({ Name: value });
                        self.KalaExf5List(KalaExf5List);
                    }
                }

            });
            codeKalaExf5 = 0;
            $("#E_KalaExf5").val('');
        }
    })

    var codeKalaExf5 = 0;
    self.UpdateKalaExf5 = function (item) {
        codeKalaExf5 = item.Code;
        $("#E_KalaExf5").val(item.Name);
    }










    self.currentPageKalaExf6 = ko.observable();
    pageSizeKalaExf6 = localStorage.getItem('pageSizeKalaExf6') == null ? 10 : localStorage.getItem('pageSizeKalaExf6');
    self.pageSizeKalaExf6 = ko.observable(pageSizeKalaExf6);
    self.currentPageIndexKalaExf6 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf6List = ko.computed(function () {

        self.currentPageIndexKalaExf6(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf6List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf6List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf6 = ko.computed(function () {
        var pageSizeKalaExf6 = parseInt(self.pageSizeKalaExf6(), 10),
            startIndex = pageSizeKalaExf6 * self.currentPageIndexKalaExf6(),
            endIndex = startIndex + pageSizeKalaExf6;
        localStorage.setItem('pageSizeKalaExf6', pageSizeKalaExf6);
        return self.filterKalaExf6List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf6 = function () {
        if (((self.currentPageIndexKalaExf6() + 1) * self.pageSizeKalaExf6()) < self.filterKalaExf6List().length) {
            self.currentPageIndexKalaExf6(self.currentPageIndexKalaExf6() + 1);
        }
    };

    self.previousPageKalaExf6 = function () {
        if (self.currentPageIndexKalaExf6() > 0) {
            self.currentPageIndexKalaExf6(self.currentPageIndexKalaExf6() - 1);
        }
    };

    self.firstPageKalaExf6 = function () {
        self.currentPageIndexKalaExf6(0);
    };

    self.lastPageKalaExf6 = function () {
        countKalaExf6 = parseInt(self.filterKalaExf6List().length / self.pageSizeKalaExf6(), 10);
        if ((self.filterKalaExf6List().length % self.pageSizeKalaExf6()) == 0)
            self.currentPageIndexKalaExf6(countKalaExf6 - 1);
        else
            self.currentPageIndexKalaExf6(countKalaExf6);
    };

    self.sortTableKalaExf6 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf6List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf6 = function (item) {
        IDocB[ro].KalaExf6 = item.Name;
        dataGrid.cellValue(ro, "KalaExf6", item.Name);
        codeKalaExf6 = 0;
        $('#modal-KalaExf6').modal('hide');
    }


    $('#modal-KalaExf6').on('shown.bs.modal', function () {
        $("#E_KalaExf6").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf6 = 0;
    });


    $('#refreshKalaExf6').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf6');
            }
        })
    })

    self.PageIndexKalaExf6 = function (item) {
        return CountPage(self.filterKalaExf6List(), self.pageSizeKalaExf6(), item);
    };

    $('#btnAddKalaExf6').click(function () {
        var value = $("#E_KalaExf6").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf6',
                Code: codeKalaExf6,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf6');
                }
                else {
                    var data = KalaExf6List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf6List.add({ Name: value });
                        self.KalaExf6List(KalaExf6List);
                    }
                }

            });
            codeKalaExf6 = 0;
            $("#E_KalaExf6").val('');
        }
    })

    var codeKalaExf6 = 0;
    self.UpdateKalaExf6 = function (item) {
        codeKalaExf6 = item.Code;
        $("#E_KalaExf6").val(item.Name);
    }




    self.currentPageKalaExf7 = ko.observable();
    pageSizeKalaExf7 = localStorage.getItem('pageSizeKalaExf7') == null ? 10 : localStorage.getItem('pageSizeKalaExf7');
    self.pageSizeKalaExf7 = ko.observable(pageSizeKalaExf7);
    self.currentPageIndexKalaExf7 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf7List = ko.computed(function () {

        self.currentPageIndexKalaExf7(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf7List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf7List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf7 = ko.computed(function () {
        var pageSizeKalaExf7 = parseInt(self.pageSizeKalaExf7(), 10),
            startIndex = pageSizeKalaExf7 * self.currentPageIndexKalaExf7(),
            endIndex = startIndex + pageSizeKalaExf7;
        localStorage.setItem('pageSizeKalaExf7', pageSizeKalaExf7);
        return self.filterKalaExf7List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf7 = function () {
        if (((self.currentPageIndexKalaExf7() + 1) * self.pageSizeKalaExf7()) < self.filterKalaExf7List().length) {
            self.currentPageIndexKalaExf7(self.currentPageIndexKalaExf7() + 1);
        }
    };

    self.previousPageKalaExf7 = function () {
        if (self.currentPageIndexKalaExf7() > 0) {
            self.currentPageIndexKalaExf7(self.currentPageIndexKalaExf7() - 1);
        }
    };

    self.firstPageKalaExf7 = function () {
        self.currentPageIndexKalaExf7(0);
    };

    self.lastPageKalaExf7 = function () {
        countKalaExf7 = parseInt(self.filterKalaExf7List().length / self.pageSizeKalaExf7(), 10);
        if ((self.filterKalaExf7List().length % self.pageSizeKalaExf7()) == 0)
            self.currentPageIndexKalaExf7(countKalaExf7 - 1);
        else
            self.currentPageIndexKalaExf7(countKalaExf7);
    };

    self.sortTableKalaExf7 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf7List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf7 = function (item) {
        IDocB[ro].KalaExf7 = item.Name;
        dataGrid.cellValue(ro, "KalaExf7", item.Name);
        codeKalaExf7 = 0;
        $('#modal-KalaExf7').modal('hide');
    }


    $('#modal-KalaExf7').on('shown.bs.modal', function () {
        $("#E_KalaExf7").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf7 = 0;
    });


    $('#refreshKalaExf7').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf7');
            }
        })
    })

    self.PageIndexKalaExf7 = function (item) {
        return CountPage(self.filterKalaExf7List(), self.pageSizeKalaExf7(), item);
    };

    $('#btnAddKalaExf7').click(function () {
        var value = $("#E_KalaExf7").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf7',
                Code: codeKalaExf7,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf7');
                }
                else {
                    var data = KalaExf7List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf7List.add({ Name: value });
                        self.KalaExf7List(KalaExf7List);
                    }
                }

            });
            codeKalaExf7 = 0;
            $("#E_KalaExf7").val('');
        }
    })

    var codeKalaExf7 = 0;
    self.UpdateKalaExf7 = function (item) {
        codeKalaExf7 = item.Code;
        $("#E_KalaExf7").val(item.Name);
    }




    self.currentPageKalaExf8 = ko.observable();
    pageSizeKalaExf8 = localStorage.getItem('pageSizeKalaExf8') == null ? 10 : localStorage.getItem('pageSizeKalaExf8');
    self.pageSizeKalaExf8 = ko.observable(pageSizeKalaExf8);
    self.currentPageIndexKalaExf8 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf8List = ko.computed(function () {

        self.currentPageIndexKalaExf8(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf8List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf8List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf8 = ko.computed(function () {
        var pageSizeKalaExf8 = parseInt(self.pageSizeKalaExf8(), 10),
            startIndex = pageSizeKalaExf8 * self.currentPageIndexKalaExf8(),
            endIndex = startIndex + pageSizeKalaExf8;
        localStorage.setItem('pageSizeKalaExf8', pageSizeKalaExf8);
        return self.filterKalaExf8List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf8 = function () {
        if (((self.currentPageIndexKalaExf8() + 1) * self.pageSizeKalaExf8()) < self.filterKalaExf8List().length) {
            self.currentPageIndexKalaExf8(self.currentPageIndexKalaExf8() + 1);
        }
    };

    self.previousPageKalaExf8 = function () {
        if (self.currentPageIndexKalaExf8() > 0) {
            self.currentPageIndexKalaExf8(self.currentPageIndexKalaExf8() - 1);
        }
    };

    self.firstPageKalaExf8 = function () {
        self.currentPageIndexKalaExf8(0);
    };

    self.lastPageKalaExf8 = function () {
        countKalaExf8 = parseInt(self.filterKalaExf8List().length / self.pageSizeKalaExf8(), 10);
        if ((self.filterKalaExf8List().length % self.pageSizeKalaExf8()) == 0)
            self.currentPageIndexKalaExf8(countKalaExf8 - 1);
        else
            self.currentPageIndexKalaExf8(countKalaExf8);
    };

    self.sortTableKalaExf8 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf8List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf8 = function (item) {
        IDocB[ro].KalaExf8 = item.Name;
        dataGrid.cellValue(ro, "KalaExf8", item.Name);
        codeKalaExf8 = 0;
        $('#modal-KalaExf8').modal('hide');
    }


    $('#modal-KalaExf8').on('shown.bs.modal', function () {
        $("#E_KalaExf8").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf8 = 0;
    });


    $('#refreshKalaExf8').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf8');
            }
        })
    })

    self.PageIndexKalaExf8 = function (item) {
        return CountPage(self.filterKalaExf8List(), self.pageSizeKalaExf8(), item);
    };

    $('#btnAddKalaExf8').click(function () {
        var value = $("#E_KalaExf8").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf8',
                Code: codeKalaExf8,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf8');
                }
                else {
                    var data = KalaExf8List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf8List.add({ Name: value });
                        self.KalaExf8List(KalaExf8List);
                    }
                }

            });
            codeKalaExf8 = 0;
            $("#E_KalaExf8").val('');
        }
    })

    var codeKalaExf8 = 0;
    self.UpdateKalaExf8 = function (item) {
        codeKalaExf8 = item.Code;
        $("#E_KalaExf8").val(item.Name);
    }

    self.currentPageKalaExf9 = ko.observable();
    pageSizeKalaExf9 = localStorage.getItem('pageSizeKalaExf9') == null ? 10 : localStorage.getItem('pageSizeKalaExf9');
    self.pageSizeKalaExf9 = ko.observable(pageSizeKalaExf9);
    self.currentPageIndexKalaExf9 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf9List = ko.computed(function () {

        self.currentPageIndexKalaExf9(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf9List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf9List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf9 = ko.computed(function () {
        var pageSizeKalaExf9 = parseInt(self.pageSizeKalaExf9(), 10),
            startIndex = pageSizeKalaExf9 * self.currentPageIndexKalaExf9(),
            endIndex = startIndex + pageSizeKalaExf9;
        localStorage.setItem('pageSizeKalaExf9', pageSizeKalaExf9);
        return self.filterKalaExf9List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf9 = function () {
        if (((self.currentPageIndexKalaExf9() + 1) * self.pageSizeKalaExf9()) < self.filterKalaExf9List().length) {
            self.currentPageIndexKalaExf9(self.currentPageIndexKalaExf9() + 1);
        }
    };

    self.previousPageKalaExf9 = function () {
        if (self.currentPageIndexKalaExf9() > 0) {
            self.currentPageIndexKalaExf9(self.currentPageIndexKalaExf9() - 1);
        }
    };

    self.firstPageKalaExf9 = function () {
        self.currentPageIndexKalaExf9(0);
    };

    self.lastPageKalaExf9 = function () {
        countKalaExf9 = parseInt(self.filterKalaExf9List().length / self.pageSizeKalaExf9(), 10);
        if ((self.filterKalaExf9List().length % self.pageSizeKalaExf9()) == 0)
            self.currentPageIndexKalaExf9(countKalaExf9 - 1);
        else
            self.currentPageIndexKalaExf9(countKalaExf9);
    };

    self.sortTableKalaExf9 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf9List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf9 = function (item) {
        IDocB[ro].KalaExf9 = item.Name;
        dataGrid.cellValue(ro, "KalaExf9", item.Name);
        codeKalaExf9 = 0;
        $('#modal-KalaExf9').modal('hide');
    }


    $('#modal-KalaExf9').on('shown.bs.modal', function () {
        $("#E_KalaExf9").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf9 = 0;
    });


    $('#refreshKalaExf9').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf9');
            }
        })
    })

    self.PageIndexKalaExf9 = function (item) {
        return CountPage(self.filterKalaExf9List(), self.pageSizeKalaExf9(), item);
    };

    $('#btnAddKalaExf9').click(function () {
        var value = $("#E_KalaExf9").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf9',
                Code: codeKalaExf9,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf9');
                }
                else {
                    var data = KalaExf9List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf9List.add({ Name: value });
                        self.KalaExf9List(KalaExf9List);
                    }
                }

            });
            codeKalaExf9 = 0;
            $("#E_KalaExf9").val('');
        }
    })
    var codeKalaExf9 = 0;
    self.UpdateKalaExf9 = function (item) {
        codeKalaExf9 = item.Code;
        $("#E_KalaExf9").val(item.Name);
    }

    self.currentPageKalaExf10 = ko.observable();
    pageSizeKalaExf10 = localStorage.getItem('pageSizeKalaExf10') == null ? 10 : localStorage.getItem('pageSizeKalaExf10');
    self.pageSizeKalaExf10 = ko.observable(pageSizeKalaExf10);
    self.currentPageIndexKalaExf10 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf10List = ko.computed(function () {

        self.currentPageIndexKalaExf10(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf10List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf10List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf10 = ko.computed(function () {
        var pageSizeKalaExf10 = parseInt(self.pageSizeKalaExf10(), 10),
            startIndex = pageSizeKalaExf10 * self.currentPageIndexKalaExf10(),
            endIndex = startIndex + pageSizeKalaExf10;
        localStorage.setItem('pageSizeKalaExf10', pageSizeKalaExf10);
        return self.filterKalaExf10List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf10 = function () {
        if (((self.currentPageIndexKalaExf10() + 1) * self.pageSizeKalaExf10()) < self.filterKalaExf10List().length) {
            self.currentPageIndexKalaExf10(self.currentPageIndexKalaExf10() + 1);
        }
    };

    self.previousPageKalaExf10 = function () {
        if (self.currentPageIndexKalaExf10() > 0) {
            self.currentPageIndexKalaExf10(self.currentPageIndexKalaExf10() - 1);
        }
    };

    self.firstPageKalaExf10 = function () {
        self.currentPageIndexKalaExf10(0);
    };

    self.lastPageKalaExf10 = function () {
        countKalaExf10 = parseInt(self.filterKalaExf10List().length / self.pageSizeKalaExf10(), 10);
        if ((self.filterKalaExf10List().length % self.pageSizeKalaExf10()) == 0)
            self.currentPageIndexKalaExf10(countKalaExf10 - 1);
        else
            self.currentPageIndexKalaExf10(countKalaExf10);
    };

    self.sortTableKalaExf10 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf10List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf10 = function (item) {
        IDocB[ro].KalaExf10 = item.Name;
        dataGrid.cellValue(ro, "KalaExf10", item.Name);
        codeKalaExf10 = 0;
        $('#modal-KalaExf10').modal('hide');
    }


    $('#modal-KalaExf10').on('shown.bs.modal', function () {
        $("#E_KalaExf10").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf10 = 0;
    });


    $('#refreshKalaExf10').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf10');
            }
        })
    })

    self.PageIndexKalaExf10 = function (item) {
        return CountPage(self.filterKalaExf10List(), self.pageSizeKalaExf10(), item);
    };

    $('#btnAddKalaExf10').click(function () {
        var value = $("#E_KalaExf10").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf10',
                Code: codeKalaExf10,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf10');
                }
                else {
                    var data = KalaExf10List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf10List.add({ Name: value });
                        self.KalaExf10List(KalaExf10List);
                    }
                }

            });
            codeKalaExf10 = 0;
            $("#E_KalaExf10").val('');
        }
    })

    var codeKalaExf10 = 0;
    self.UpdateKalaExf10 = function (item) {
        codeKalaExf10 = item.Code;
        $("#E_KalaExf10").val(item.Name);
    }
    self.currentPageKalaExf11 = ko.observable();
    pageSizeKalaExf11 = localStorage.getItem('pageSizeKalaExf11') == null ? 10 : localStorage.getItem('pageSizeKalaExf11');
    self.pageSizeKalaExf11 = ko.observable(pageSizeKalaExf11);
    self.currentPageIndexKalaExf11 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf11List = ko.computed(function () {

        self.currentPageIndexKalaExf11(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf11List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf11List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf11 = ko.computed(function () {
        var pageSizeKalaExf11 = parseInt(self.pageSizeKalaExf11(), 10),
            startIndex = pageSizeKalaExf11 * self.currentPageIndexKalaExf11(),
            endIndex = startIndex + pageSizeKalaExf11;
        localStorage.setItem('pageSizeKalaExf11', pageSizeKalaExf11);
        return self.filterKalaExf11List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf11 = function () {
        if (((self.currentPageIndexKalaExf11() + 1) * self.pageSizeKalaExf11()) < self.filterKalaExf11List().length) {
            self.currentPageIndexKalaExf11(self.currentPageIndexKalaExf11() + 1);
        }
    };

    self.previousPageKalaExf11 = function () {
        if (self.currentPageIndexKalaExf11() > 0) {
            self.currentPageIndexKalaExf11(self.currentPageIndexKalaExf11() - 1);
        }
    };

    self.firstPageKalaExf11 = function () {
        self.currentPageIndexKalaExf11(0);
    };

    self.lastPageKalaExf11 = function () {
        countKalaExf11 = parseInt(self.filterKalaExf11List().length / self.pageSizeKalaExf11(), 10);
        if ((self.filterKalaExf11List().length % self.pageSizeKalaExf11()) == 0)
            self.currentPageIndexKalaExf11(countKalaExf11 - 1);
        else
            self.currentPageIndexKalaExf11(countKalaExf11);
    };

    self.sortTableKalaExf11 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf11List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf11 = function (item) {
        IDocB[ro].KalaExf11 = item.Name;
        dataGrid.cellValue(ro, "KalaExf11", item.Name);
        codeKalaExf11 = 0;
        $('#modal-KalaExf11').modal('hide');
    }


    $('#modal-KalaExf11').on('shown.bs.modal', function () {
        $("#E_KalaExf11").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf11 = 0;
    });


    $('#refreshKalaExf11').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf11');
            }
        })
    })

    self.PageIndexKalaExf11 = function (item) {
        return CountPage(self.filterKalaExf11List(), self.pageSizeKalaExf11(), item);
    };

    $('#btnAddKalaExf11').click(function () {
        var value = $("#E_KalaExf11").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf11',
                Code: codeKalaExf11,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf11');
                }
                else {
                    var data = KalaExf11List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf11List.add({ Name: value });
                        self.KalaExf11List(KalaExf11List);
                    }
                }

            });
            codeKalaExf11 = 0;
            $("#E_KalaExf11").val('');
        }

    })

    var codeKalaExf11 = 0;
    self.UpdateKalaExf11 = function (item) {
        codeKalaExf11 = item.Code;
        $("#E_KalaExf11").val(item.Name);
    }
    self.currentPageKalaExf12 = ko.observable();
    pageSizeKalaExf12 = localStorage.getItem('pageSizeKalaExf12') == null ? 10 : localStorage.getItem('pageSizeKalaExf12');
    self.pageSizeKalaExf12 = ko.observable(pageSizeKalaExf12);
    self.currentPageIndexKalaExf12 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf12List = ko.computed(function () {

        self.currentPageIndexKalaExf12(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf12List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf12List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf12 = ko.computed(function () {
        var pageSizeKalaExf12 = parseInt(self.pageSizeKalaExf12(), 10),
            startIndex = pageSizeKalaExf12 * self.currentPageIndexKalaExf12(),
            endIndex = startIndex + pageSizeKalaExf12;
        localStorage.setItem('pageSizeKalaExf12', pageSizeKalaExf12);
        return self.filterKalaExf12List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf12 = function () {
        if (((self.currentPageIndexKalaExf12() + 1) * self.pageSizeKalaExf12()) < self.filterKalaExf12List().length) {
            self.currentPageIndexKalaExf12(self.currentPageIndexKalaExf12() + 1);
        }
    };

    self.previousPageKalaExf12 = function () {
        if (self.currentPageIndexKalaExf12() > 0) {
            self.currentPageIndexKalaExf12(self.currentPageIndexKalaExf12() - 1);
        }
    };

    self.firstPageKalaExf12 = function () {
        self.currentPageIndexKalaExf12(0);
    };

    self.lastPageKalaExf12 = function () {
        countKalaExf12 = parseInt(self.filterKalaExf12List().length / self.pageSizeKalaExf12(), 10);
        if ((self.filterKalaExf12List().length % self.pageSizeKalaExf12()) == 0)
            self.currentPageIndexKalaExf12(countKalaExf12 - 1);
        else
            self.currentPageIndexKalaExf12(countKalaExf12);
    };

    self.sortTableKalaExf12 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf12List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf12 = function (item) {
        IDocB[ro].KalaExf12 = item.Name;
        dataGrid.cellValue(ro, "KalaExf12", item.Name);
        codeKalaExf12 = 0;
        $('#modal-KalaExf12').modal('hide');
    }


    $('#modal-KalaExf12').on('shown.bs.modal', function () {
        $("#E_KalaExf12").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf12 = 0;
    });


    $('#refreshKalaExf12').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf12');
            }
        })
    })

    self.PageIndexKalaExf12 = function (item) {
        return CountPage(self.filterKalaExf12List(), self.pageSizeKalaExf12(), item);
    };

    $('#btnAddKalaExf12').click(function () {
        var value = $("#E_KalaExf12").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf12',
                Code: codeKalaExf12,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf12');
                }
                else {
                    var data = KalaExf12List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf12List.add({ Name: value });
                        self.KalaExf12List(KalaExf12List);
                    }
                }

            });
            codeKalaExf12 = 0;
            $("#E_KalaExf12").val('');
        }
    })
    var codeKalaExf12 = 0;
    self.UpdateKalaExf12 = function (item) {
        codeKalaExf12 = item.Code;
        $("#E_KalaExf12").val(item.Name);
    }


    self.currentPageKalaExf13 = ko.observable();
    pageSizeKalaExf13 = localStorage.getItem('pageSizeKalaExf13') == null ? 10 : localStorage.getItem('pageSizeKalaExf13');
    self.pageSizeKalaExf13 = ko.observable(pageSizeKalaExf13);
    self.currentPageIndexKalaExf13 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf13List = ko.computed(function () {

        self.currentPageIndexKalaExf13(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf13List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf13List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf13 = ko.computed(function () {
        var pageSizeKalaExf13 = parseInt(self.pageSizeKalaExf13(), 10),
            startIndex = pageSizeKalaExf13 * self.currentPageIndexKalaExf13(),
            endIndex = startIndex + pageSizeKalaExf13;
        localStorage.setItem('pageSizeKalaExf13', pageSizeKalaExf13);
        return self.filterKalaExf13List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf13 = function () {
        if (((self.currentPageIndexKalaExf13() + 1) * self.pageSizeKalaExf13()) < self.filterKalaExf13List().length) {
            self.currentPageIndexKalaExf13(self.currentPageIndexKalaExf13() + 1);
        }
    };

    self.previousPageKalaExf13 = function () {
        if (self.currentPageIndexKalaExf13() > 0) {
            self.currentPageIndexKalaExf13(self.currentPageIndexKalaExf13() - 1);
        }
    };

    self.firstPageKalaExf13 = function () {
        self.currentPageIndexKalaExf13(0);
    };

    self.lastPageKalaExf13 = function () {
        countKalaExf13 = parseInt(self.filterKalaExf13List().length / self.pageSizeKalaExf13(), 10);
        if ((self.filterKalaExf13List().length % self.pageSizeKalaExf13()) == 0)
            self.currentPageIndexKalaExf13(countKalaExf13 - 1);
        else
            self.currentPageIndexKalaExf13(countKalaExf13);
    };

    self.sortTableKalaExf13 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf13List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf13 = function (item) {
        IDocB[ro].KalaExf13 = item.Name;
        dataGrid.cellValue(ro, "KalaExf13", item.Name);
        codeKalaExf13 = 0;
        $('#modal-KalaExf13').modal('hide');
    }


    $('#modal-KalaExf13').on('shown.bs.modal', function () {
        $("#E_KalaExf13").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf13 = 0;
    });


    $('#refreshKalaExf13').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf13');
            }
        })
    })

    self.PageIndexKalaExf13 = function (item) {
        return CountPage(self.filterKalaExf13List(), self.pageSizeKalaExf13(), item);
    };

    $('#btnAddKalaExf13').click(function () {
        var value = $("#E_KalaExf13").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf13',
                Code: codeKalaExf13,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf13');
                }
                else {
                    var data = KalaExf13List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf13List.add({ Name: value });
                        self.KalaExf13List(KalaExf13List);
                    }
                }

            });
            codeKalaExf13 = 0;
            $("#E_KalaExf13").val('');
        }
    })

    var codeKalaExf13 = 0;
    self.UpdateKalaExf13 = function (item) {
        codeKalaExf13 = item.Code;
        $("#E_KalaExf13").val(item.Name);
    }



    self.currentPageKalaExf14 = ko.observable();
    pageSizeKalaExf14 = localStorage.getItem('pageSizeKalaExf14') == null ? 10 : localStorage.getItem('pageSizeKalaExf14');
    self.pageSizeKalaExf14 = ko.observable(pageSizeKalaExf14);
    self.currentPageIndexKalaExf14 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf14List = ko.computed(function () {

        self.currentPageIndexKalaExf14(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf14List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf14List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf14 = ko.computed(function () {
        var pageSizeKalaExf14 = parseInt(self.pageSizeKalaExf14(), 10),
            startIndex = pageSizeKalaExf14 * self.currentPageIndexKalaExf14(),
            endIndex = startIndex + pageSizeKalaExf14;
        localStorage.setItem('pageSizeKalaExf14', pageSizeKalaExf14);
        return self.filterKalaExf14List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf14 = function () {
        if (((self.currentPageIndexKalaExf14() + 1) * self.pageSizeKalaExf14()) < self.filterKalaExf14List().length) {
            self.currentPageIndexKalaExf14(self.currentPageIndexKalaExf14() + 1);
        }
    };

    self.previousPageKalaExf14 = function () {
        if (self.currentPageIndexKalaExf14() > 0) {
            self.currentPageIndexKalaExf14(self.currentPageIndexKalaExf14() - 1);
        }
    };

    self.firstPageKalaExf14 = function () {
        self.currentPageIndexKalaExf14(0);
    };

    self.lastPageKalaExf14 = function () {
        countKalaExf14 = parseInt(self.filterKalaExf14List().length / self.pageSizeKalaExf14(), 10);
        if ((self.filterKalaExf14List().length % self.pageSizeKalaExf14()) == 0)
            self.currentPageIndexKalaExf14(countKalaExf14 - 1);
        else
            self.currentPageIndexKalaExf14(countKalaExf14);
    };

    self.sortTableKalaExf14 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf14List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf14 = function (item) {
        IDocB[ro].KalaExf14 = item.Name;
        dataGrid.cellValue(ro, "KalaExf14", item.Name);
        codeKalaExf14 = 0;
        $('#modal-KalaExf14').modal('hide');
    }


    $('#modal-KalaExf14').on('shown.bs.modal', function () {
        $("#E_KalaExf14").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf14 = 0;
    });


    $('#refreshKalaExf14').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf14');
            }
        })
    })

    self.PageIndexKalaExf14 = function (item) {
        return CountPage(self.filterKalaExf14List(), self.pageSizeKalaExf14(), item);
    };

    $('#btnAddKalaExf14').click(function () {
        var value = $("#E_KalaExf14").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf14',
                Code: codeKalaExf14,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf14');
                }
                else {
                    var data = KalaExf14List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf14List.add({ Name: value });
                        self.KalaExf14List(KalaExf14List);
                    }
                }

            });
            codeKalaExf14 = 0;
            $("#E_KalaExf14").val('');
        }
    })
    var codeKalaExf14 = 0;
    self.UpdateKalaExf14 = function (item) {
        codeKalaExf14 = item.Code;
        $("#E_KalaExf14").val(item.Name);
    }




    self.currentPageKalaExf15 = ko.observable();
    pageSizeKalaExf15 = localStorage.getItem('pageSizeKalaExf15') == null ? 10 : localStorage.getItem('pageSizeKalaExf15');
    self.pageSizeKalaExf15 = ko.observable(pageSizeKalaExf15);
    self.currentPageIndexKalaExf15 = ko.observable(0);

    self.filterKalaExf0 = ko.observable("");

    self.filterKalaExf15List = ko.computed(function () {

        self.currentPageIndexKalaExf15(0);
        var filter0 = self.filterKalaExf0().toUpperCase();

        if (!filter0) {
            return self.KalaExf15List();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaExf15List(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKalaExf15 = ko.computed(function () {
        var pageSizeKalaExf15 = parseInt(self.pageSizeKalaExf15(), 10),
            startIndex = pageSizeKalaExf15 * self.currentPageIndexKalaExf15(),
            endIndex = startIndex + pageSizeKalaExf15;
        localStorage.setItem('pageSizeKalaExf15', pageSizeKalaExf15);
        return self.filterKalaExf15List().slice(startIndex, endIndex);
    });

    self.nextPageKalaExf15 = function () {
        if (((self.currentPageIndexKalaExf15() + 1) * self.pageSizeKalaExf15()) < self.filterKalaExf15List().length) {
            self.currentPageIndexKalaExf15(self.currentPageIndexKalaExf15() + 1);
        }
    };

    self.previousPageKalaExf15 = function () {
        if (self.currentPageIndexKalaExf15() > 0) {
            self.currentPageIndexKalaExf15(self.currentPageIndexKalaExf15() - 1);
        }
    };

    self.firstPageKalaExf15 = function () {
        self.currentPageIndexKalaExf15(0);
    };

    self.lastPageKalaExf15 = function () {
        countKalaExf15 = parseInt(self.filterKalaExf15List().length / self.pageSizeKalaExf15(), 10);
        if ((self.filterKalaExf15List().length % self.pageSizeKalaExf15()) == 0)
            self.currentPageIndexKalaExf15(countKalaExf15 - 1);
        else
            self.currentPageIndexKalaExf15(countKalaExf15);
    };

    self.sortTableKalaExf15 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.KalaExf15List.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectKalaExf15 = function (item) {
        IDocB[ro].KalaExf15 = item.Name;
        dataGrid.cellValue(ro, "KalaExf15", item.Name);
        codeKalaExf15 = 0;
        $('#modal-KalaExf15').modal('hide');
    }


    $('#modal-KalaExf15').on('shown.bs.modal', function () {
        $("#E_KalaExf15").val('');
        $('.fix').attr('class', 'form-line focused fix');
        codeKalaExf15 = 0;
    });


    $('#refreshKalaExf15').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ویژگی") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaExf_InvList('KalaExf15');
            }
        })
    })

    self.PageIndexKalaExf15 = function (item) {
        return CountPage(self.filterKalaExf15List(), self.pageSizeKalaExf15(), item);
    };

    $('#btnAddKalaExf15').click(function () {
        var value = $("#E_KalaExf15").val();
        if (value != '') {
            var SaveExtraFieldListsObject = {
                KalaExfName: 'KalaExf15',
                Code: codeKalaExf15,
                Name: value

            }
            ajaxFunction(SaveExtraFieldListsUri + ace + '/' + sal + '/' + group, 'POST', SaveExtraFieldListsObject, false).done(function (data) {
                if (data == true) {
                    getKalaExf_InvList('KalaExf15');
                }
                else {
                    var data = KalaExf15List.filter(s => s.Name == value);
                    if (data.length == 0) {
                        KalaExf15List.add({ Name: value });
                        self.KalaExf15List(KalaExf15List);
                    }
                }

            });
            codeKalaExf15 = 0;
            $("#E_KalaExf15").val('');
        }
    })

    var codeKalaExf15 = 0;
    self.UpdateKalaExf15 = function (item) {
        codeKalaExf15 = item.Code;
        $("#E_KalaExf15").val(item.Name);
    }



















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
                        for (var i = 0; i < IDocB.length; i++) {
                            if (IDocB[i].KalaCode == DataKalaBarcode.Code) {
                                ro = i;
                                break;
                            }
                        }

                        if (ro == -1) { // بند کالا وجود نداشت
                            SetDataBarCode(DataKalaBarcode, 1);
                            $('#TitleBarcode').text(translate('بند جدید ایجاد شد'));
                        }
                        else {
                            dataBandKala = IDocB[ro];

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

                            IDocB[ro].Amount1 = a1;
                            IDocB[ro].Amount2 = a2;
                            IDocB[ro].Amount3 = a3;
                            IDocB[ro].UnitPrice = unitPrice;
                            IDocB[ro].TotalPrice = totalPrice;


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
        if (kalapricecode == null) kalapricecode = 0;

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
        for (var i = 0; i < IDocB.length; i++) {
            if (IDocB[i].KalaCode == '' || IDocB[i].KalaCode == null) {
                ro = i;
                break;
            }
        }
        if (ro == -1) {
            dataGrid.saveEditData();
            IDocB.push({});

            for (var i = 0; i < IDocB.length; i++) {
                IDocB[i].BandNo = i;
            }
            i = i - 1;
            dataGrid.refresh(true);
        }
        IDocB[i].dataKala = [];
        IDocB[i].dataKala = kala;
        IDocB[i].KalaCode = kala.Code;
        IDocB[i].KalaName = kala.Name;
        IDocB[i].MainUnit = kala.DefaultUnit;
        IDocB[i].MainUnitName = mainUnitName;
        IDocB[i].Amount1 = a1;
        IDocB[i].Amount2 = a2;
        IDocB[i].Amount3 = a3;
        IDocB[i].UnitPrice = unitPrice;
        IDocB[i].TotalPrice = totalPrice;
        IDocB[i].UP_Flag = true;
        dataGrid.refresh(true);

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
        setReport(self.IDocPList(), data, printVariable);
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
        setReport(self.IDocPList(), '', printVariable);
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
        setReport(self.IDocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });






    $('#modal-OtherField').on('shown.bs.modal', function () {
        if (flagOtherFieldShow == true) {
            $("#ExtraFields01").val(sessionStorage.F01);
            $("#ExtraFields02").val(sessionStorage.F02);
            $("#ExtraFields03").val(sessionStorage.F03);
            $("#ExtraFields04").val(sessionStorage.F04);
            $("#ExtraFields05").val(sessionStorage.F05);
            $("#ExtraFields06").val(sessionStorage.F06);
            $("#ExtraFields07").val(sessionStorage.F07);
            $("#ExtraFields08").val(sessionStorage.F08);
            $("#ExtraFields09").val(sessionStorage.F09);
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
        RemoveUseSanad(ace, sal, "SanadAnbar", sessionStorage.SerialNumber, useSanadOtherUser != 'UseUser');
    };


    document.onkeydown = function (e) {
        if (e.ctrlKey) {
            if (sessionStorage.newSanad == "true") {
                if (e.keyCode == key_Insert)
                    AddNewSanad();
            }
        }
        else if (e.altKey) {
            if (e.keyCode == key_R) {
                AddNewBand();
            }
            if (sessionStorage.AccessPrint_SanadAnbar == "true") {
                if (e.keyCode == key_P) {
                    PrintSanad();
                }
            }
        }
        else if (e.shiftKey) {

        }
        else {
            if (e.keyCode == key_F2) {
                SaveColumnSanad();
                ControlSave();
            }

            if (e.keyCode == key_Esc && $('#modal-Print').is(':visible')) {
                $('#modal-Print').modal('hide');
            }
        }
    };

    self.PageIndexArz = function (item) {
        return CountPage(self.filterArzList(), self.pageSizeArz(), item);
    };

    self.PageIndexKalaExf_Out = function (item) {
        return CountPage(self.filterKalaExf_OutList(), self.pageSizeKalaExf_Out(), item);
    };


    /*  self.PageIndexKalaState = function (item) {
          return CountPage(self.filterKalaStateList(), self.pageSizeKalaState(), item);
      };*/


    self.PageIndexMkz = function (item) {
        return CountPage(self.filterMkzList(), self.pageSizeMkz(), item);
    };

    self.PageIndexOpr = function (item) {
        return CountPage(self.filterOprList(), self.pageSizeOpr(), item);
    };

    self.PageIndexThvl = function (item) {
        return CountPage(self.filterThvlList(), self.pageSizeThvl(), item);
    };

    self.PageIndexPrintForms = function (item) {
        return CountPage(self.filterPrintFormsList(), self.pageSizePrintForms(), item);
    };




};

ko.applyBindings(new ViewModel());