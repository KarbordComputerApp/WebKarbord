var TestIDocList; //لیست خطا ها
var cols;

//اطلاعات سلول
//var dataGrid = $("#gridContainer").dxDataGrid("instance");
//cellValue = dataGrid.cellValue(ro, 'KalaCode');

var ViewModel = function () {
    var self = this;
    var forSels = true;

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

    self.IDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    //self.TestIDocList = ko.observableArray([]); // لیست تست 
    self.TestIDoc_NewList = ko.observableArray([]); // لیست تست جدید
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 

    self.ArzList = ko.observableArray([]); // لیست ارز ها


    var showPrice = localStorage.getItem("Access_SHOWPRICE_IIDOC") == 'true';
    var textSanad;

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
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject, false).done(function (data) {
            self.KalaList(data);
            KalaList = data;
        });
    }



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
                    sameNoAllMode = list[i].SameNoAllMode;
                    if (list[i].AutoDocNo == 1) {
                        $('#docnoout').attr('readonly', true);
                    }
                }
            }
        });
    }


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
                    sameNoAllMode = list[i].SameNoAllMode;
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
                        sessionStorage.GPriceDefultI == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultI);
                    }
                }

            }
        });
    }

    self.OptionsCaptionKalaPrice = ko.computed(function () {
        return translate('قیمت اطلاعات پایه');
    });

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
                    kalapricecode == '0' ? kalapricecode = '' : kalapricecode = kalapricecode;
                    $("#gGhimat").val(kalapricecode);
                    kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                }
            })
        }

        if (firstUpdateShow == 1)
            firstUpdateShow = 0;

    })

    function SetKalaPrice() {
        kalapricecode = $("#gGhimat").val() == "" ? 0 : $("#gGhimat").val();
        //kalapricecode = $("#gGhimat").val();

        flagKalaPrice = true;

        for (var i = 0; i < IDocB.length; i++) {
            if (IDocB[i].KalaCode != "" && IDocB[i].KalaCode != null) {


                if (kalapricecode == null || kalapricecode == "") {
                    if (sessionStorage.sels == "true") {
                        Price1 = parseFloat(IDocB[i].dataKala.SPrice1);
                        Price2 = parseFloat(IDocB[i].dataKala.SPrice2);
                        Price3 = parseFloat(IDocB[i].dataKala.SPrice3);
                    } else {
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



    //Get IDocP List
    function getIDocP(serialNumber) {
        ajaxFunction(IDocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocPList(data);
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
                dataIDocH.FinalPrice != null ? IDocHFinalPrice = dataIDocH.FinalPrice : IDocHFinalPrice = 0;
                $('#sumSanad').text(NumberToNumberString(parseFloat(IDocHTotalPrice).toFixed(parseInt(sessionStorage.DeghatInv))));
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

        self.ArzCode(sessionStorage.ArzCode);
        codeArz = sessionStorage.ArzCode;

        self.ArzRate(parseFloat(sessionStorage.ArzRate));
        arzRate = parseFloat(sessionStorage.ArzRate);

        $('#nameOpr').val(sessionStorage.OprCode == '' ? '' : '(' + sessionStorage.OprCode + ') ' + sessionStorage.OprName);
        $('#nameMkz').val(sessionStorage.MkzCode == '' ? '' : '(' + sessionStorage.MkzCode + ') ' + sessionStorage.MkzName);
        $('#nameArz').val(sessionStorage.ArzName == '' || sessionStorage.ArzName == 'null' ? '' : '(' + sessionStorage.ArzCode + ') ' + sessionStorage.ArzName);
        $('#ArzRate').val(arzRate);

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



        if (codeOpr == "!!!" || codeMkz == "!!!" || closedDate == true) {
            $('#action_headerSanad').attr('style', 'display: none');
            $('#action_bodySanad').attr('style', 'display: none');
            $('#action_footerSanad').attr('style', 'display: none');
            $('#action_IDoc').attr('style', 'display: none');
            $('#insertband').attr('style', 'display: none');
            $('#Barcode').attr('style', 'display: none');
            $('#btnThvl').attr('style', 'display: none');
            $('#btnMkz').attr('style', 'display: none');
            $('#btnOpr').attr('style', 'display: none');
            $('#gGhimat').attr('disabled', true);
            // $('#inv').attr('disabled', true);
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
                }

                if (e.column == null) {
                    a = 2;
                }
                if (e.column.dataField == null) {
                    a = 3;
                }

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
                                        $("#gGhimat").val(sessionStorage.GPriceDefult);

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

                        if (e.dataField == 'Amount1')
                            IDocB[ro].Amount1 = args.value;
                        else if (e.dataField == 'Amount2')
                            IDocB[ro].Amount2 = args.value;
                        else if (e.dataField == 'Amount3')
                            IDocB[ro].Amount3 = args.value;
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
                        IDocB[ro].UnitPrice = args.value;
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
                        IDocB[ro].TotalPrice = args.value;
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












    var Serial_Test = 0;

    function ControlSave() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();

        docno = $("#docnoout").val();
        modeCode = $("#modeCode").val();


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
            TahieShode: ace,
            VstrPer: 0,
            PakhshCode: '',
            Footer: $("#footer").val(),
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
            VstrCode: 0,
            flagTest: 'Y'
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
                    flagTest: 'Y'
                };

                obj.push(tmp);
            }
        }

        ajaxFunction(IDocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial_Test, 'POST', obj, false).done(function (response) {

        });

        var TestIDocObject = {
            SerialNumber: Serial_Test,
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
        tarikh = $("#tarikh").val().toEnglishDigit();
        status = $("#status").val();
        inv = $("#inv").val();
        docno = $("#docnoout").val();

        modeCode = $("#modeCode").val();
        kalapricecode = $("#gGhimat").val() == "" ? 0 : $("#gGhimat").val();





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
                TahieShode: ace,
                VstrPer: 0,
                PakhshCode: '',
                Footer: $("#footer").val(),
                InvCode: inv,
                Eghdam: sessionStorage.userName,
                EghdamDate: 'null',
                flagLog: flaglog,
                VstrCode: 0,
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
                TahieShode: ace,
                VstrPer: 0,
                PakhshCode: '',

                InvCode: inv,
                Status: status,
                Taeed: sessionStorage.TaeedF == '' ? status == translate("تایید") ? sessionStorage.userName : '' : sessionStorage.TaeedF,
                Tasvib: status == translate("تصویب") ? sessionStorage.userName : '',
                PaymentType: $("#paymenttype").val(),
                Footer: $("#footer").val(),
                deghat: parseInt(sessionStorage.DeghatInv),
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
                VstrCode: 0,
                New: 'Y'
            };



            ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'PUT', IDocHObject).done(function (response) {
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
            $('#inv').prop('disabled', true);
            $('#modeCode').prop('disabled', true);
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

                                GetTrzIKala(dataKala.Code, defaultUnit);
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

    self.PageCountView = function () {
        sessionStorage.invSelect_Inv = $('#invSelect').val();
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
        sessionStorage.invSelect_Inv = $('#invSelect').val();
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
        RemoveUseSanad(ace, sal, "SanadAnbar", sessionStorage.SerialNumber);
    };


    document.onkeydown = function (e) {
        if (e.keyCode == key_F2) {
            SaveColumnSanad();
            ControlSave();
        }
    };

};

ko.applyBindings(new ViewModel());
