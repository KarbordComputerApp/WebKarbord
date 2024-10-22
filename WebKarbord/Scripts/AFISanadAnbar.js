﻿var ViewModel = function () {
    var self = this;

    sal = localStorage.getItem("SalInv");
    var arzCalcMode = localStorage.getItem("ArzCalcMode_Inv");
    var forSels = true;
    var flagupdateHeader;
    var flagOtherFieldShow;
    var flagSaveLogWin = false;

    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;

    if (sessionStorage.CHG == null) {
        sessionStorage.CHG = localStorage.getItem("CHG")
        //sessionStorage.AccessPrint_Factor = localStorage.getItem("AccessPrint_Factor")
    }

    useSanadOtherUser = localStorage.getItem("TestUse" + sessionStorage.ModeCode + sessionStorage.SerialNumber);

    TestUser();

    var flaglog = "Y";

    var sameNoAllMode = 0;

    var resTestNew = false;

    if (sessionStorage.flagCopy == 'Y')
        flaglog = "N";

    //sessionStorage.searchIDocH = "";

    var codeThvl = '';
    var codeOpr = '';
    var codeMkz = '';

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

    if (sessionStorage.InOut == "1") {
        invSelected = localStorage.getItem('InvSelectSanadAnbar_In') == null ? '' : localStorage.getItem('InvSelectSanadAnbar_In');
        modeCodeSelected = localStorage.getItem('ModeCodeSelectSanadAnbar_In') == null ? '' : localStorage.getItem('ModeCodeSelectSanadAnbar_In');
    }
    else {
        invSelected = localStorage.getItem('InvSelectSanadAnbar_Out') == null ? '' : localStorage.getItem('InvSelectSanadAnbar_Out');
        modeCodeSelected = localStorage.getItem('ModeCodeSelectSanadAnbar_Out') == null ? '' : localStorage.getItem('ModeCodeSelectSanadAnbar_Out');
    }

    var invSelect = "";
    var modeCodeSelect = "";

    $('#finalSave_Title').attr('hidden', '');


    var invCode = sessionStorage.InvCode;

    var totalPrice;

    var amountTextUpdate = "";
    var amountValueUpdate = "";


    var IDocHAmount1 = 0;
    var IDocHAmount2 = 0;
    var IDocHAmount3 = 0;
    var IDocHTotalPrice = 0;
    var IDocHFinalPrice = 0;

    self.bundNumberImport = 0;

    var unitvalue = "";

    var KalaCode = '';
    var kalapricecode = 0;

    var bandnumber = 0;
    var bandnumberedit = 0;

    var flagFinalSave = false;

    var flagKalaPrice = false;

    var flagEditBand = false;

    var accessTaeed = false;
    var accessTasvib = false;
    var accessCancel = false;

    var flag = -1;
    var flagInsertIDoch = 0;
    self.flagupdateband = false;

    var allSearchThvl = true;
    var allSearchKala = true;

    self.SerialNumber = ko.observable();
    var Serial = '';
    self.DocNoOut = ko.observable();

    self.DocDate = ko.observable(DateNow);
    self.Spec = ko.observable();
    self.ThvlCode = ko.observable();
    self.PriceCode = ko.observable();
    self.InvCode = ko.observable(invSelected);
    self.modeCode = ko.observable(modeCodeSelected);

    self.StatusSanad = ko.observable();


    self.OprCode = ko.observable();
    self.MkzCode = ko.observable();

    self.ArzCode = ko.observable();
    self.ArzRate = ko.observable();

    self.BandNo = ko.observable();
    self.KalaCode = ko.observable();
    self.Amount1 = ko.observable();
    self.Amount2 = ko.observable();
    self.Amount3 = ko.observable();
    self.UnitPrice = ko.observable();
    self.TotalPrice = ko.observable();
    self.MainUnit = ko.observable();
    self.Comm = ko.observable();

    self.Caption_KalaFileNo = ko.observable();
    self.Caption_KalaState = ko.observable();
    self.Caption_KalaExf1 = ko.observable();
    self.Caption_KalaExf2 = ko.observable();
    self.Caption_KalaExf3 = ko.observable();
    self.Caption_KalaExf4 = ko.observable();
    self.Caption_KalaExf5 = ko.observable();
    self.Caption_KalaExf6 = ko.observable();
    self.Caption_KalaExf7 = ko.observable();
    self.Caption_KalaExf8 = ko.observable();
    self.Caption_KalaExf9 = ko.observable();
    self.Caption_KalaExf10 = ko.observable();
    self.Caption_KalaExf11 = ko.observable();
    self.Caption_KalaExf12 = ko.observable();
    self.Caption_KalaExf13 = ko.observable();
    self.Caption_KalaExf14 = ko.observable();
    self.Caption_KalaExf15 = ko.observable();

    self.ThvlList = ko.observableArray([]); // لیست حساب ها
    self.KalaList = ko.observableArray([]); // لیست کالاها
    self.KalaPriceList = ko.observableArray([]); // لیست گروه قیمت
    self.KalaPriceBList = ko.observableArray([]); // قیمت کالا بر اساس گروه قیمت
    self.IDocBList = ko.observableArray([]); // لیست بند های سند
    self.IDocB = ko.observableArray([]); // لیست بند های سند
    self.UnitList = ko.observableArray([]); // لیست واحد ها
    self.InvList = ko.observableArray([]); // لیست انبارها
    self.IDocHList = ko.observableArray([]); // اطلاعات  سند  
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.IModeList = ko.observableArray([]); // نوع سند 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.IDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    self.TestIDocList = ko.observableArray([]); // لیست تست 
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.TestIDoc_NewList = ko.observableArray([]); // لیست تست جدید
    self.ArzList = ko.observableArray([]); // لیست ارز ها




    var amountAfterBarCode;

    if (sessionStorage.AccessPrint_SanadAnbar == "false") {
        $('#Print_SanadAnbar').attr('style', 'display: none')
    }

    $("#Barcode").removeAttr('hidden', '');


    if (sessionStorage.InOut == 1) {
        $('#TitleHeaderAnbar').text(translate('سند وارده به انبار'));
        $('#titlePage').text(translate('سند وارده به انبار جدید'));
        $('#LableThvlCode').text(translate('نام تحویل دهنده'));
        //$('#LableThvlCode').attr('placeholder', 'نام تحویل دهنده');
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
        //$('#LableThvlCode').attr('placeholder', 'نام تحویل گیرنده ');
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

    //Delete after Test
    //amountAfterBarCode = "2";

    if (amountAfterBarCode == "-1")
        $("#Barcode").attr('hidden', '');

    else if (amountAfterBarCode == "1")
        $("#Panel_Barcode_Amount").removeAttr('hidden', '');

    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var ThvlUri = server + '/api/Web_Data/Thvl/'; // آدرس حساب
    var KalaPriceBUri = server + '/api/Web_Data/KalaPriceB/'; //  آدرس  قیمت کالا بر اساس گروه قیمت
    var KalaPriceUri = server + '/api/Web_Data/KalaPrice/'; // آدرس گروه قیمت
    var IDocHiUri = server + '/api/AFI_IDocHi/'; // آدرس هدر سند 
    var IDocBiUri = server + '/api/AFI_IDocBi/'; // آدرس بند سند 
    var UnitUri = server + '/api/Web_Data/Unit/'; // آدرس واحد کالا 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var IDocHUri = server + '/api/IDocData/IDocH/'; // آدرس هدر سند 
    var IDocBUri = server + '/api/IDocData/IDocB/'; // آدرس لیست بند های سند 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت  
    var IDocHLastDateUri = server + '/api/IDocData/IDocH/LastDate/'; // آدرس آخرین تاریخ سند
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع سند
    var UpdatePriceUri = server + '/api/IDocData/UpdatePriceAnbar/'; // آدرس اعمال گروه قیمت
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var IDocPUri = server + '/api/IDocData/IDocP/'; // آدرس ویوی چاپ سند 

    var TestIDocUri = server + '/api/IDocData/TestIDoc/'; // آدرس تست سند 
    var TestIDoc_NewUri = server + '/api/IDocData/TestIDoc_New/'; // آدرس تست ایجاد 
    var TestIDoc_EditUri = server + '/api/IDocData/TestIDoc_Edit/'; // آدرس تست ویرایش 

    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 

    var SaveIDoc_HZUri = server + '/api/IDocData/SaveIDoc_HZ/'; // آدرس ویرایس ستون تنظیم

    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 

    //$('#docnoout').attr('readonly', false);

    //if (sessionStorage.InvDocNo == "1") {
    //    $('#docnoout').attr('readonly', true);
    //}

    var rprtId = 'IDocP';
    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    function getRprtColsList() {
        cols = getRprtCols('IDocP', sessionStorage.userName);
        ListColumns = cols;
        /* ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            ListColumns = data;
        });*/
    }
    getRprtColsList(false, sessionStorage.userName);

    //Get Thvl List
    function getThvlList() {
        whereThvl = localStorage.getItem('whereThvl');
        var ThvlObject = {
            Mode: 3,
            UserCode: sessionStorage.userName,
            Where: whereThvl, 
        }
        ajaxFunction(ThvlUri + ace + '/' + sal + '/' + group, 'POST', ThvlObject, true).done(function (data) {
            self.ThvlList(data);
        });
    }

    $('#btnThvl').click(function () {
        if (self.ThvlList().length == 0) {
            getThvlList();
        }
    });


    //Get kala List
    function getKalaList() {
        whereKala = localStorage.getItem('whereKala');
        var KalaObject = {
            withimage: false,
            updatedate: null,
            Mode: 3,
            UserCode: sessionStorage.userName,
            where: whereKala,
            KalaCode: ''
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject, true).done(function (data) {
            self.KalaList(data);
        });
    }
    $('#btnkala').click(function () {
        if (self.KalaList().length == 0) {
            getKalaList();
        }
    });

    //Get ExtraFields List
    /*function getExtraFieldsList() {
         ajaxFunction(ExtraFieldsUri + ace + '/' + sal + '/' + group + '/' + ModeCodeExtraFields, 'GET').done(function (data) {
             self.ExtraFieldsList(data);
         });
     }*/

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


    function getKalaExfList() {
        var rprtId = sessionStorage.InOut == 1 ? 'IDocB_I' : 'IDocB_O';
        cols = getRprtCols(rprtId, sessionStorage.userName);

        result = ko.utils.arrayFilter(cols, function (item) {
            result =
                (ko.utils.stringStartsWith(item.Code, 'KalaExf') ||
                    item.Code == 'KalaFileNo' ||
                    item.Code == 'KalaState') &&

                item.Name != ''
            return result;
        })

        kalaExfCaption = [];
        for (var i = 0; i < result.length; i++) {
            kalaExfCaption[result[i]['Code']] = result[i]['Name'];
        }
        self.Caption_KalaFileNo(kalaExfCaption['KalaFileNo'])
        self.Caption_KalaState(kalaExfCaption['KalaState'])
        self.Caption_KalaExf1(kalaExfCaption['KalaExf1'])
    }
    getKalaExfList();




    //Get KalaPrice List
    function getKalaPriceList(insert) {
        ajaxFunction(KalaPriceUri + ace + '/' + sal + '/' + group + '/' + insert, 'GET').done(function (data) {
            self.KalaPriceList(data);
            if (self.KalaPriceList().length > 0) {
                if (flagupdateHeader == 1)
                    sessionStorage.PriceCode > 0 ? $("#gGhimat").val(sessionStorage.PriceCode) : 0;
                else {
                    if (sessionStorage.InOut == 1) {
                        sessionStorage.GPriceDefultI == "0" ? $("#gGhimat").val(0) : $("#gGhimat").val(sessionStorage.GPriceDefultI);
                    }
                }
            }
        });
    }


    //Get Status List
    function getStatusList() {
        list = localStorage.getItem('InvStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('InvStatus'));
            self.StatusList(list)
        }
        else {
            progName = getProgName('P');
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
                self.StatusList(data);
                localStorage.setItem("InvStatus", JSON.stringify(data));
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
        if (sessionStorage.InOut == 1) {

            if (localStorage.getItem("Access_TAEED_IIDOC") == 'false' && selectStatus == translate('تایید')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی تایید ندارید'), 0);
            }

            if (localStorage.getItem("Access_TASVIB_IIDOC") == 'false' && selectStatus == translate('تصویب')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی تصویب ندارید'), 0);
            }

            if (localStorage.getItem("Access_CANCEL_IIDOC") == 'false' && selectStatus == translate('باطل')) {
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی باطل'), 0);
            }

        }

        if (sessionStorage.InOut == 2) {
            if (localStorage.getItem("Access_TAEED_IODOC") == 'false' && translate('تایید')) {
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی تایید'), 0);
            }

            if (localStorage.getItem("Access_TASVIB_IODOC") == 'false' && selectStatus == translate('تصویب')) {
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی تصویب'), 0);
            }

            if (localStorage.getItem("Access_CANCEL_IODOC") == 'false' && selectStatus == translate('باطل')) {
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی باطل'), 0);
            }
        }



        if (sessionStorage.Status != translate('تایید') && selectStatus == translate('تصویب')) {
            $("#status").val(lastStatus);
            return showNotification(translate('فقط اسناد تایید شده امکان تصویب دارند'), 0);
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

    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/3/' + sessionStorage.userName, 'GET').done(function (data) {
            self.InvList(data);
            //var storedNames = JSON.parse(localStorage.getItem("inv"));
            //self.InvList(storedNames);
            if (self.InvList().length > 0) {

                if (flagupdateHeader == 1) {
                    invSelect = sessionStorage.InvCode;
                }
                else {
                    if (sessionStorage.InvDefult_Inv == "null" || sessionStorage.InvDefult_Inv == "") {
                        //$("#inv").val(invSelected);
                        invSelect = invSelected;
                    }
                    else {
                        //$("#inv").val(sessionStorage.InvDefult);
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

    //Get Unit List
    function getUnit(codeKala) {
        ajaxFunction(UnitUri + ace + '/' + sal + '/' + group + '/' + codeKala, 'GET').done(function (data) {
            self.UnitList(data);
        });
    }




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

    //Get IDocP List
    function getIDocP(serialNumber) {
        ajaxFunction(IDocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber + '/' + sessionStorage.InOut, 'GET').done(function (data) {
            self.IDocPList(data);
        });
    }


    //Get IDocH 
    function getIDocH(serialNumber) {
        ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocHList(data);
            if (self.IDocHList().length > 0 && self.IDocBList().length > 0) { // اگر شامل اطلاعات سند بود
                $('#footertext').show();
                dataIDocH = self.IDocHList()[0];
                dataIDocH.Amount1 != null ? IDocHAmount1 = dataIDocH.Amount1 : IDocHAmount1 = 0;
                dataIDocH.Amount2 != null ? IDocHAmount2 = dataIDocH.Amount2 : IDocHAmount2 = 0;
                dataIDocH.Amount3 != null ? IDocHAmount3 = dataIDocH.Amount3 : IDocHAmount3 = 0;
                dataIDocH.TotalPrice != null ? IDocHTotalPrice = dataIDocH.TotalPrice : IDocHTotalPrice = 0;
                dataIDocH.FinalPrice != null ? IDocHFinalPrice = dataIDocH.FinalPrice : IDocHFinalPrice = 0;
                IDocHAmount1 == 0 ? $('#foottextsum').text('') : $('#foottextsum').text(translate('جمع'));
                IDocHAmount1 == 0 ? $('#foottextamount1').text('') : $('#foottextamount1').text(NumberToNumberString(IDocHAmount1.valueOf()));
                IDocHAmount2 == 0 ? $('#foottextamount2').text('') : $('#foottextamount2').text(NumberToNumberString(IDocHAmount2.valueOf()));
                IDocHAmount3 == 0 ? $('#foottextamount3').text('') : $('#foottextamount3').text(NumberToNumberString(IDocHAmount3.valueOf()));
                IDocHTotalPrice == 0 ? $('#foottexttotalprice').text('') : $('#foottexttotalprice').text(NumberToNumberString(parseFloat(IDocHTotalPrice).toFixed(parseInt(sessionStorage.DeghatInv))));
                $('#sumfactor').val(NumberToNumberString(parseFloat(IDocHTotalPrice).toFixed(parseInt(sessionStorage.DeghatInv))));
            }
            else {
                $('#footertext').hide();
            }
        });
    }
    //Get IDocB 
    function getIDocB(serialNumber) {
        ajaxFunction(IDocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocBList(data);
            self.IDocB(data);
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

    // $('#FromUser').prop('disabled', false);
    // $('#ToUser').prop('disabled', false);


    self.ClearIDocH = function ClearIDocH() {
        Serial = '';
        sessionStorage.flagupdateHeader = '0';
        flagupdateHeader = 0;
        self.DocNoOut('');
        self.DocDate($('#tarikh').val().toEnglishDigit());
        self.Spec('');
        self.ThvlCode('');
        $('#nameThvl').val('');
        self.PriceCode('');
        self.InvCode('');
        $('#nameArz').val('');

        self.OprCode('');
        self.MkzCode('');
        self.ArzCode('');

        self.ArzRate(0);
        arzRate = 0;
        $('#ArzRate').val(0);

        codeOpr = '';
        codeMkz = '';
        codeArz = '';
    };


    self.ClearIDocB = function ClearIDocB() {
        $('#codeKala').val('');
        $('#nameKala').val('');
        //$("#unitName").empty();
        self.KalaCode('');
        self.Amount1('');
        self.Amount2('');
        self.Amount3('');
        self.UnitPrice('');
        self.TotalPrice('');
        self.MainUnit('');
        self.Comm('');

        $('#txtzarib1').text(translate('مقدار 1'));
        $('#txtzarib2').text(translate('مقدار 2'));
        $('#txtzarib3').text(translate('مقدار 3'));
        $('#amounttext').text(translate('مقدار'));
        $("#unitName").empty();

        $('#viewunit').hide();
        $('#amount1').text('');
        $('#amount2').text('');
        $('#amount3').text('');
        $("#amount").val('');
        $("#unitPrice").val('');
        $("#totalPrice").val('');
        $("#comm").val('');


        $("#totalPrice").css("backgroundColor", "white");
        $("#unitPrice").css("backgroundColor", "white");
        flag = -1;
    };

    self.ImportBand = function (item) {
        //self.ClearIDocB();
        self.flagupdateband = false;
        self.bundNumberImport = item.BandNo;
    }


    self.ButtonIDocH = function ButtonIDocH(newIDocH) {
        old_KalaFileNo = "";
        old_KalaState = "";
        old_KalaExf1 = "";
        old_KalaExf2 = "";
        old_KalaExf3 = "";
        old_KalaExf4 = "";
        old_KalaExf5 = "";
        old_KalaExf6 = "";
        old_KalaExf7 = "";
        old_KalaExf8 = "";
        old_KalaExf9 = "";
        old_KalaExf10 = "";
        old_KalaExf11 = "";
        old_KalaExf12 = "";
        old_KalaExf13 = "";
        old_KalaExf14 = "";
        old_KalaExf15 = "";

        AddNewBand();
    }


    function AddNewBand() {
        KalaCode = '';
        self.flagupdateband = false;

        if (flagInsertIDoch == 0) {

            var tarikh = $("#tarikh").val().toEnglishDigit();
            var docNo = $("#docnoout").val();

            if (tarikh.length != 10)
                return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);

            if (tarikh == '')
                return showNotification(translate('تاریخ را وارد کنید'), 0);

            if ((tarikh >= sessionStorage.BeginDateInv) && (tarikh <= sessionStorage.EndDateInv)) { }
            else
                return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);


            TestIDoc_New(Serial, tarikh, docNo);
            if (resTestNew == true) {
                self.ClearIDocB();
                AddIDocH();
                flagInsertIDoch == 1 ? $('#modal-Band').modal() : null
            }



        } else {
            $('#modal-Band').modal()
        }
    }


    function TestIDoc_New(serialNumber, tarikh, docNo) {

        modeCode = $("#modeCode").val();
        inv = $('#inv').val();
        var TestIDoc_NewObject = {
            DocDate: tarikh,
            ModeCode: modeCode,
            DocNo: docNo == "" ? "Auto" : docNo,
            SerialNumber: serialNumber,
            InvCode: inv,
        };

        ajaxFunction(TestIDoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestIDoc_NewObject).done(function (data) {
            var obj = JSON.parse(data);
            self.TestIDoc_NewList(obj);
            if (obj.length >= 1) {
                if (obj.length == 1 && obj[0].Test == 1) {
                    resTestNew = true;
                    showNotification(obj[0].TestCap, 2);
                }
                else {
                    $('#modal-Test_New').modal('show');
                    SetDataTest_New();
                    resTestNew = false;
                }
            } else {
                resTestNew = true;
            }
        });
    }

    //self.OptionsCaptionKalaPrice = ko.computed(function () {
    //    return translate('قیمت اطلاعات پایه');
    //});

    function SetDataTest_New() {
        $("#BodyTest_New").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestIDoc_NewList();
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
            $('#Accept-Modal').attr('hidden', '');
            $('#ShowCountError_New').removeAttr('hidden', '');
        }
        else {
            $('#Accept-Modal').removeAttr('hidden', '')
            $('#ShowCountError_New').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning_New').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning_New').attr('hidden', '');
        }


    }



    /* 
 
     $("#Barcode_Value").keydown(function (e) {
         if (e.keyCode == 13) {
             barcode = $("#Barcode_Value").val();
             barcode1 = "(" + barcode + ")";
             if (barcode != '') {
                 tempData = ko.utils.arrayFilter(self.KalaList(), function (item) {
                     result = item.BarCode.indexOf(barcode1) >= 0
                     //result = item.BarCode == null ? '' : item.BarCode.toString().search(barcode) >= 0
                     return result;
                 });
 
                 if (tempData.length > 0) {
                     kala = tempData[0];
 
                     GetBandNumber();
                     if (Serial == '') {
                         return showNotification(translate('اطلاعات اولیه فاکتور ثبت نشده است ', 0);
                     }
 
                     defaultUnit = kala.DefaultUnit;
 
                     amount = 1;
 
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
                         a1 = amount;
                         kala.zarib2 == 0 ? a2 = 0 : a2 = amount / kala.zarib2;
                         kala.zarib3 == 0 ? a3 = 0 : a3 = amount / kala.zarib3;
                         unitPrice = Price1;
                         totalPrice = a1 * unitPrice;
 
                     }
                     else if (defaultUnit == "2") {
                         a1 = amount * kala.zarib2;
                         a2 = amount;
                         kala.zarib3 == 0 ? a3 = 0 : a3 = amount / kala.zarib2;
                         unitPrice = Price2;
                         totalPrice = a2 * unitPrice;
                     }
                     else if (defaultUnit == "3") {
                         a1 = (amount * kala.zarib2) * (kala.zarib2);
                         a2 = amount * kala.zarib2;
                         a3 = amount;
                         unitPrice = Price3;
                         totalPrice = a2 * unitPrice;
                     }
 
                     a1 != 0 ? a1 = a1.toFixed(kala.DeghatM1) : a1 = "";
                     a2 != 0 ? a2 = a2.toFixed(kala.DeghatM2) : a2 = "";
                     a3 != 0 ? a3 = a3.toFixed(kala.DeghatM3) : a3 = "";
 
 
 
                     var IDocBObject = {
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
                     };
                     if (self.bundNumberImport > 0) {
                         bandnumber = self.bundNumberImport;
                     }
                     SendIDocB(IDocBObject);
                     $("#Barcode_Value").val('');
 
                 }
             }
         }
     });*/

    self.ButtonIDocHBarcode = function ButtonIDocH(newIDocH) {
        if (flagInsertIDoch == 0) {




            var tarikh = $("#tarikh").val().toEnglishDigit();

            if (tarikh.length != 10)
                return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);

            if (tarikh == '')
                return showNotification(translate('تاریخ را وارد کنید'), 0);

            if ((tarikh >= sessionStorage.BeginDateInv) && (tarikh <= sessionStorage.EndDateInv)) { }
            else
                return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);

            var TestIDoc_NewObject = {
                DocDate: tarikh,
                ModeCode: sessionStorage.ModeCode
            };

            ajaxFunction(TestIDoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestIDoc_NewObject).done(function (data) {
                var obj = JSON.parse(data);
                self.TestIDoc_NewList(obj);
                if (data.length > 2) {
                    $('#modal-Test_New').modal('show');
                    SetDataTest_New();
                } else {
                    var a = AddIDocH(newIDocH);
                    flagInsertIDoch == 1 ? $('#modal-Barcode').modal() : null
                }
            });


        } else {
            $('#modal-Barcode').modal()
        }

        if (self.KalaList().length == 0) {
            getKalaList();
        }
    }

    var DataKalaBarcode = null;

    $("#Barcode_Value").keydown(function (e) {
        $('#TitleBarcode').text('');
        if (e.keyCode == 13) {
            barcode = $("#Barcode_Value").val();
            barcode1 = "(" + barcode + ")";
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
                /*

                tempData = ko.utils.arrayFilter(self.KalaList(), function (item) {
                    result = item.BarCode.indexOf(barcode1) >= 0
                    //result = item.BarCode == null ? '' : item.BarCode.toString().search('(' + barcode + ')') >= 0
                    return result;
                });*/





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

                        tempData = ko.utils.arrayFilter(self.IDocBList(), function (item) {
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

                            var IDocBObject = {
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

                                KalaFileNo: dataBandKala.KalaFileNo,
                                KalaState: dataBandKala.KalaState,
                                KalaExf1: dataBandKala.KalaExf1,
                                KalaExf2: dataBandKala.KalaExf2,
                                KalaExf3: dataBandKala.KalaExf3,
                                KalaExf4: dataBandKala.KalaExf4,
                                KalaExf5: dataBandKala.KalaExf5,
                                KalaExf6: dataBandKala.KalaExf6,
                                KalaExf7: dataBandKala.KalaExf7,
                                KalaExf8: dataBandKala.KalaExf8,
                                KalaExf9: dataBandKala.KalaExf9,
                                KalaExf10: dataBandKala.KalaExf10,
                                KalaExf11: dataBandKala.KalaExf11,
                                KalaExf12: dataBandKala.KalaExf12,
                                KalaExf13: dataBandKala.KalaExf13,
                                KalaExf14: dataBandKala.KalaExf14,
                                KalaExf15: dataBandKala.KalaExf15,

                            };
                            SendIDocBU(IDocBObject);
                            if (acceptUpdate == true) {
                                $('#TitleBarcode').text(translate('بند شماره') + ' ' + dataBandKala.BandNo + ' ' +translate('ویرایش شد'));
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
            return showNotification(translate('اطلاعات اولیه فاکتور ثبت نشده است'), 0);
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

        temp_FinalPrice = totalPrice ;
        arzValue = 0
        if (temp_FinalPrice > 0) {

            if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
            }
        }

        var IDocBObject = {
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
            KalaFileNo: "",
            KalaState: "",
            KalaExf1: "",
            KalaExf2: "",
            KalaExf3: "",
            KalaExf4: "",
            KalaExf5: "",
            KalaExf6: "",
            KalaExf7: "",
            KalaExf8: "",
            KalaExf9: "",
            KalaExf10: "",
            KalaExf11: "",
            KalaExf12: "",
            KalaExf13: "",
            KalaExf14: "",
            KalaExf15: "",
        };

        if (self.bundNumberImport > 0) {
            bandnumber = self.bundNumberImport;
        }

        SendIDocBI(IDocBObject);
        $("#Barcode_Value").val('');
    }









    //Add new IDocH 
    function AddIDocH(newIDocH) {

        sessionStorage.TaeedI = '';
        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $('#inv').val();
        modeCode = $("#modeCode").val();

        bandnumber = 0;
        docno = $("#docnoout").val();

        if (docno.length > 10) {
            return showNotification(translate('شماره نباید بیشتر از ده رقم باشد'), 0);
        }

        if (tarikh.length != 10) {
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را صحیح وارد کنید' });
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را وارد کنید' });
        }

        if ((tarikh >= sessionStorage.BeginDateInv) && (tarikh <= sessionStorage.EndDateInv)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ وارد شده با سال انتخابی همخوانی ندارد' });
        }

        if (inv == '' || inv == null) {
            return showNotification(translate('انبار را انتخاب کنید'), 0);
            // return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'انبار را انتخاب کنید' });
        }

        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را وارد کنید' });
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

        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = 0;
        var IDocHObject = {
            SerialNumber: 0,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            ThvlCode: codeThvl,//self.ThvlCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: modeCode,
            DocNoMode: ace == 'Web1' ? 1 : sessionStorage.AllInvSameNo == "1" ? 1 : sameNoAllMode == 1 ? 2 : 3,
            InsertMode: 0,
            DocNo: docno == "" ? 0 : docno,
            StartNo: 0,
            EndNo: 0,
            Tanzim: '*' + sessionStorage.userName + '*',
            TahieShode: TahieShode_Inv5,
            VstrCode: 'null',
            VstrPer: 0,
            PakhshCode: '',
            InvCode: inv,
            Eghdam: sessionStorage.userName,
            InOut: sessionStorage.InOut,
            Footer: $("#footer").val(),
            EghdamDate: 'null',
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
            flagLog: flaglog,
        };
        ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'POST', IDocHObject).done(function (response) {
            //$('#DatileFactor').show();
            //$('#Save').attr('disabled', true);
            var res = response.split("-");
            Serial = res[0];
            DocNoOut = res[1];

            if (flagSaveLogWin == false) {
                SaveLog('Inv5', EditMode_New, LogMode_IDoc, 0, DocNoOut, Serial);
                flagSaveLogWin = true;
            }

            $('#docnoout').val(DocNoOut);
            sessionStorage.searchIDocH = Serial;
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' مشخصات سند به شماره ' + DocNoOut + ' ذخیره شد ' });

            $('#inv').prop('disabled', true);

            if (ace == "Web8") {
                $('#modeCode').prop('disabled', true);
            }
            flaglog = 'N';
        });
        flagInsertIDoch = 1;
    };



    self.UpdateIDocH = function UpdateIDocH(newIDocH) {

        if (Serial == "" || self.IDocBList().length == 0)
            return showNotification(translate('سند دارای بند قابل ذخیره نیست'), 0);

        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();
        modeCode = $("#modeCode").val();

        if (tarikh.length != 10) {
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را صحیح وارد کنید' });
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را وارد کنید' });
        }

        if ((tarikh >= sessionStorage.BeginDateInv) && (tarikh <= sessionStorage.EndDateInv)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ وارد شده با سال انتخابی همخوانی ندارد' });
        }

        if (inv == '' || inv == null) {
            return showNotification(translate('انبار را انتخاب کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'انبار را انتخاب کنید' });
        }

        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاریخ را وارد کنید' });
        }

        if (self.DocNoOut == '') {
            // return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' شماره سند را وارد کنید ' });
            return showNotification(translate('شماره سند را وارد کنید'), 0);
        }

        //if (codeThvl == '') {
        //    showNotification(sessionStorage.InOut == 1 ? 'تحویل دهنده انتخاب نشده است' : 'تحویل گیرنده انتخاب نشده است', 2);
        //}

        if ($('#docnoout').val() == '') {
            //return showNotification(translate('ابتدا بند ها وارد کنید', 0);
            return showNotification(translate('شماره سند را وارد کنید'), 0);
        }

        TestIDoc_New(Serial, tarikh, $('#docnoout').val());
        if (resTestNew == false) {
            return null;
        }


        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = 0;

        status = $("#status").val();
        var IDocHObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            ThvlCode: codeThvl,//self.ThvlCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: modeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: $("#docnoout").val(),
            StartNo: 0,
            EndNo: 0,
            Tanzim: '*' + sessionStorage.userName + '*',
            TahieShode: TahieShode_Inv5,
            VstrCode: 'null',
            VstrPer: 0,
            PakhshCode: '',
            InvCode: inv,
            Status: status,
            //Taeed: sessionStorage.TaeedI == '' ? status == "تایید" ? sessionStorage.userName : '' : sessionStorage.TaeedI,
            //Tasvib: status == "تصویب" ? sessionStorage.userName : '',
            InOut: sessionStorage.InOut,
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
            MkzCode: codeMkz
        };

        ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'PUT', IDocHObject).done(function (response) {
            //            $('#DatileFactor').show();
            //           $('#Save').attr('disabled', true);
            //            var res = response.split("-");
            //            Serial = res[0];
            //            DocNoOut = res[1];
            //            $('#docnoout').val(DocNoOut);
            sessionStorage.searchIDocH = Serial;
            //flagInsertIDoch = 0;
            //FinalSave
            flaglog = 'N';

            if (flagSaveLogWin == false) {
                SaveLog('Inv5', EditMode_Chg, LogMode_IDoc, 0, $("#docnoout").val(), Serial);
                flagSaveLogWin = true;
            }

            //$('#finalSave_Title').attr('hidden', '');

            if (flagKalaPrice == true) {
                ajaxFunction(UpdatePriceUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST').done(function (response) {
                    self.IDocBList(response);
                    self.IDocB(response);
                    getIDocH(Serial);
                    flagFinalSave = false;
                    flagKalaPrice = false;
                    showNotification(translate('تغییرات با موفقیت انجام شد'), 1)
                });
            } else {
                getIDocH(Serial);
            }


            if (flagupdateHeader == 1 && flagFinalSave == true) {
                sessionStorage.flagupdateHeader = 0;
                flagupdateHeader = 0;
                window.location.href = sessionStorage.urlIDocH;
            }
            else if (flagupdateHeader == 1 && flagFinalSave == false) {

            }
            else if (flagupdateHeader == 0 && flagFinalSave == false) {

            }
            else {
                showNotification('سند ذخیره شد', 1);
                // Swal.fire({ type: 'success', title: 'ثبت موفق', text: 'سند' + ' ذخیره شد ' });
            }


        });
        return "OK";
    }

    //Add new IDocB  
    self.AddIDocB = function AddIDocB(newIDocB) {

        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();
        modeCode = $("#modeCode").val();
        //var serialNumber = $("#docnoout").val();
        //bandnumber = bandnumber + 1;
        GetBandNumber();
        bandnumber = bandnumber;
        if (Serial == '') {
            return showNotification(translate('اطلاعات اولیه سند ثبت نشده است'), 0);
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


        var nKala = $('#nameKala').val();
        var uKala = $("#unitName option:selected").val();
        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());

        /*if (flag == 0) {
            unitprice = totalPrice / amount;
        }*/

        comm = $("#comm").val();


        if (KalaCode == '' || nKala == '' || uKala == '') {
            return showNotification(translate('کالا را وارد کنید'), 0);
        }

        if (amount == '') {
            amount = 0;
        }

        if ((unitprice == '' && totalPrice == '') || (sessionStorage.InOut == 2)) {
            unitprice = 0;
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
                    if (sessionStorage.InOut == 1) {
                        if (sessionStorage.IDOCI_TestZeroAmount == "1")
                            showNotification(textZeroAmount, 2);
                        else if (sessionStorage.IDOCI_TestZeroAmount == "2")
                            return showNotification(textZeroAmount, 0);
                    }
                    else {
                        if (sessionStorage.IDOCO_TestZeroAmount == "1")
                            showNotification(textZeroAmount, 2);
                        else if (sessionStorage.IDOCO_TestZeroAmount == "2")
                            return showNotification(textZeroAmount, 0);
                    }
                }




        $('#Save').attr('disabled', 'disabled');

        temp_FinalPrice = totalPrice;
        arzValue = 0
        if (temp_FinalPrice > 0) {

            if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
            }
        }

        var IDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumber,
            KalaCode: KalaCode,
            Amount1: Amount1,//SlashToDot($('#amount1').text()),// self.Amount1(),
            Amount2: Amount2,//SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: Amount3,//SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice + '',
            TotalPrice: totalPrice + '',//self.TotalPrice(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag,
            InOut: sessionStorage.InOut,
            flagLog: flaglog,
            OprCode: codeOpr,
            MkzCode: codeMkz,
            ArzCode: codeArz,
            ArzRate: arzRate,
            ArzValue: arzValue,
            KalaFileNo: "",
            KalaState: "",
            KalaExf1: "",
            KalaExf2: "",
            KalaExf3: "",
            KalaExf4: "",
            KalaExf5: "",
            KalaExf6: "",
            KalaExf7: "",
            KalaExf8: "",
            KalaExf9: "",
            KalaExf10: "",
            KalaExf11: "",
            KalaExf12: "",
            KalaExf13: "",
            KalaExf14: "",
            KalaExf15: "",
        };
        if (self.bundNumberImport > 0) {
            bandnumber = self.bundNumberImport;
        }

        SendIDocBI(IDocBObject);

        /*ajaxFunction(IDocBiUri + ace + '/' + sal + '/' + group + '/' + bandnumber, 'POST', IDocBObject).done(function (response) {
            self.IDocBList(response);
            getIDocH(Serial);
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند شماره ' + bandnumber + ' ذخیره شد ' });
            self.flagupdateband = false;
            self.bundNumberImport = 0;
            self.ClearIDocB();
            flaglog = 'N';
            $('#Save').removeAttr('disabled');
            showNotification(' بند شماره ' + bandnumber + ' ذخیره شد ', 1);
        });
        $('#Save').removeAttr('disabled');*/

    };

    function SendIDocBI(IDocBObject) {

        ajaxFunction(IDocBiUri + ace + '/' + sal + '/' + group + '/' + bandnumber, 'POST', IDocBObject).done(function (response) {
            self.IDocBList(response);
            self.IDocB(response);
            getIDocH(Serial);
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند شماره ' + bandnumber + ' ذخیره شد ' });
            self.flagupdateband = false;
            self.bundNumberImport = 0;
            self.ClearIDocB();
            flaglog = 'N';
            $('#Save').removeAttr('disabled');
            KalaCode = '';
            showNotification(translate('بند شماره') + ' ' + bandnumber + ' ' + translate('ذخیره شد'), 1);
        });
    }

    acceptUpdate = false;
    //update IDocB
    self.UpdateIDocB = function UpdateIDocB(newIDocB) {
        //KalaCode = $("#codeKala").val();
        //        bandnumber = bandnumber + 1;
        if (Serial == '') {
            return showNotification(translate('بند شمارهاطلاعات اولیه سند ثبت نشده است'), 0);
            //return Swal.fire({ type: 'danger', title: 'اطلاعات ناقص', text: ' اطلاعات اولیه سند ثبت نشده است ' });
        }
        var cKala = $('#codeKala').val();
        var nKala = $('#nameKala').val();
        var uKala = $("#unitName option:selected").val();

        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());

        /*if (flag == 0) {
            unitprice = totalPrice / amount;
        }*/

        comm = $("#comm").val();

        if (cKala == '' || nKala == '' || uKala == '') {
            return showNotification(translate('کالا را وارد کنید'), 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'کالا را وارد کنید' });
        }


        if (amount == '') {
            amount = 0;
        }

        if ((unitprice == '' && totalPrice == '') || (sessionStorage.InOut == 2)) {
            unitprice = 0;
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
                    if (sessionStorage.InOut == 1) {
                        if (sessionStorage.IDOCI_TestZeroAmount == "1")
                            showNotification(textZeroAmount, 2);
                        else if (sessionStorage.IDOCI_TestZeroAmount == "2")
                            return showNotification(textZeroAmount, 0);
                    }
                    else {
                        if (sessionStorage.IDOCO_TestZeroAmount == "1")
                            showNotification(textZeroAmount, 2);
                        else if (sessionStorage.IDOCO_TestZeroAmount == "2")
                            return showNotification(textZeroAmount, 0);
                    }
                }


        temp_FinalPrice = totalPrice;
        arzValue = 0
        if (temp_FinalPrice > 0) {

            if (arzCalcMode == 1) { // مبلغ / نرخ ارز
                arzRate > 0 ? arzValue = temp_FinalPrice / arzRate : temp_FinalPrice;
            }
        }

        var IDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumberedit,
            KalaCode: KalaCode,
            Amount1: Amount1,//SlashToDot($('#amount1').text()),// self.Amount1(),
            Amount2: Amount2,//SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: Amount3,//SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice,
            TotalPrice: totalPrice,//self.TotalPrice(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag,
            InOut: sessionStorage.InOut,
            flagLog: flaglog,
            OprCode: codeOpr,
            MkzCode: codeMkz,
            ArzCode: codeArz,
            ArzRate: arzRate,
            ArzValue: arzValue,
            KalaFileNo: old_KalaFileNo,
            KalaState: old_KalaState,
            KalaExf1: old_KalaExf1,
            KalaExf2: old_KalaExf2,
            KalaExf3: old_KalaExf3,
            KalaExf4: old_KalaExf4,
            KalaExf5: old_KalaExf5,
            KalaExf6: old_KalaExf6,
            KalaExf7: old_KalaExf7,
            KalaExf8: old_KalaExf8,
            KalaExf9: old_KalaExf9,
            KalaExf10: old_KalaExf10,
            KalaExf11: old_KalaExf11,
            KalaExf12: old_KalaExf12,
            KalaExf13: old_KalaExf13,
            KalaExf14: old_KalaExf14,
            KalaExf15: old_KalaExf15,
        };


        acceptUpdate = false;
        SendIDocBU(IDocBObject);
        if (acceptUpdate == true) {
            showNotification(translate('بند شماره') + ' ' + bandnumberedit + ' ' + translate('ویرایش شد'), 1);
            KalaCode = '';
        }
    };


    function SendIDocBU(IDocBObject) {

        ajaxFunction(IDocBiUri + ace + '/' + sal + '/' + group + '/' + bandnumberedit, 'PUT', IDocBObject).done(function (response) {
            self.IDocBList(response);
            self.IDocB(response);
            getIDocH(Serial);
            self.flagupdateband = false;
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند شماره ' + bandnumberedit + ' ویرایش شد ' });
            flagFinalSave = false;
            //if (flagupdateHeader == 1) {
            //    self.UpdateIDocH();
            //}
            $('#modal-Band').modal('hide');
            self.ClearIDocB();
            flaglog = 'N';
            //showNotification(' بند شماره ' + bandnumberedit + ' ویرایش شد ', 1);
            acceptUpdate = true;
        });
    }

    self.SerialNumber('0');

    //$('#DatileFactor').hide();

    if (flagupdateHeader != 1) {
        if (parseInt(sal) < SalNow) {
            getIDocHLastDate();
        }
    }

    getIModeList();
    //getThvlList();
    //getKalaList();
    getExtraFieldsList();
    //AddModeCode();
    flagupdateHeader == 1 ? getKalaPriceList(false) : getKalaPriceList(true);
    getInvList();


    getStatusList();




    $('#action_header').attr('style', 'display: none');
    $('#action_body').attr('style', 'display: none');
    $('#action_footer').attr('style', 'display: none');
    $('#action_Hdoc').attr('style', 'display: none');
    $('#insertband').attr('style', 'display: none');
    $('#Barcode').attr('style', 'display: none');
    $('#btnThvl').attr('style', 'display: none');

    $('#btnMkz').attr('style', 'display: none');
    $('#btnOpr').attr('style', 'display: none');
    $('#btnArz').attr('style', 'display: none');
    $('#gGhimat').attr('disabled', true);



    var viewAction = false;



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

    if (accessTaeed == false && sessionStorage.Status == 'تایید')
        viewAction = false;

    if (accessTasvib == false && sessionStorage.Status == 'تصویب')
        viewAction = false;

    if (accessCancel == false && sessionStorage.Status == 'باطل')
        viewAction = false;

    if (useSanadOtherUser == 'UseUser')
        viewAction = false;

    if (viewAction) {
        $('#action_header').removeAttr('style');
        $('#action_body').removeAttr('style');
        $('#action_footer').removeAttr('style');
        $('#action_Hdoc').removeAttr('style');
        $('#insertband').removeAttr('style');
        $('#Barcode').removeAttr('style');
        $('#btnThvl').removeAttr('style');

        $('#btnMkz').removeAttr('style');
        $('#btnOpr').removeAttr('style');
        $('#btnArz').removeAttr('style');
        $('#gGhimat').removeAttr('disabled', false);

    }




    if (flagupdateHeader == 1) {
        flagInsertIDoch = 1;
        Serial = sessionStorage.SerialNumber;
        self.SerialNumber(Serial);
        self.DocNoOut(sessionStorage.DocNo);
        self.DocDate(sessionStorage.DocDate);


        $('#titlePage').text(sessionStorage.ModeName + " " + sessionStorage.DocNo.toPersianDigit() + " " + AppendAnbar(sessionStorage.InvName));

        $('#btntarikh').click(function () {
            $('#tarikh').change();
        });

        self.Spec(sessionStorage.Spec);
        self.ThvlCode(sessionStorage.ThvlCode);
        codeThvl = sessionStorage.ThvlCode;
        kalapricecode = sessionStorage.PriceCode;
        self.PriceCode(sessionStorage.PriceCode);
        self.InvCode(sessionStorage.InvCode);
        $("#inv").val(sessionStorage.InvCode);
        if (sessionStorage.ThvlCode != '')
            $('#nameThvl').val('(' + sessionStorage.ThvlCode + ') ' + sessionStorage.ThvlName);
        else
            $('#nameThvl').val('');

        $("#docnoout").val(sessionStorage.DocNo);
        //  $("#modeCode").val(sessionStorage.ModeCodeValue);

        self.PriceCode(sessionStorage.PriceCode);
        $("#gGhimat").val(sessionStorage.PriceCode);

        getIDocB(Serial);
        getIDocH(Serial);


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

        $("#modeCode").val(sessionStorage.ModeCodeValue);
        self.modeCode(sessionStorage.ModeCodeValue);

        $("#footer").val(sessionStorage.Footer);

        self.StatusSanad(sessionStorage.Status);
        $("#status").val(sessionStorage.Status);
        //sessionStorage.flagupdateHeader = 0;
        flagOtherFieldShow = true;




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
            $('#action_header').attr('style', 'display: none');
            $('#action_body').attr('style', 'display: none');
            $('#action_footer').attr('style', 'display: none');
            $('#action_Hdoc').attr('style', 'display: none');
            $('#insertband').attr('style', 'display: none');
            $('#Barcode').attr('style', 'display: none');
            $('#btn_Thvl').attr('style', 'display: none');
            $('#btnMkz').attr('style', 'display: none');
            $('#btnOpr').attr('style', 'display: none');
            $('#btnArz').attr('style', 'display: none');
            $('#gGhimat').attr('disabled', true);
        }

        if (codeOpr == "!!!" || codeMkz == "!!!") {
            showNotification(translate('دارای پروژه و مرکز هزینه متفاوت است و امکان ثبت وجود ندارد'), 0);
        }

    }

    //$(document).ready(function () { });
    //------------------------------------------------------
    self.currentPageThvl = ko.observable();
    self.currentPageKala = ko.observable();

    pageSizeThvl = localStorage.getItem('pageSizeThvl') == null ? 10 : localStorage.getItem('pageSizeThvl');
    pageSizeKala = localStorage.getItem('pageSizeKala') == null ? 10 : localStorage.getItem('pageSizeKala');

    self.pageSizeThvl = ko.observable(pageSizeThvl);
    self.pageSizeKala = ko.observable(pageSizeKala);

    self.currentPageIndexThvl = ko.observable(0);
    self.currentPageIndexKala = ko.observable(0);
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
        if ((self.filterThvlList().length % self.pageSizeThvl()) == 0)
            self.currentPageIndexThvl(countThvl - 1);
        else
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
    self.selectThvl = function (item) {


        codeThvl = item.Code;
        $('#nameThvl').val('(' + item.Code + ') ' + item.Name)
        //sessionStorage.GPriceDefult == "null" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefult);

        //if (sessionStorage.ModeCode == 'out' && item.CGruKalaPriceCode_S > 0)
        //    $("#gGhimat").val(item.CGruKalaPriceCode_S);
        //else if (sessionStorage.ModeCode == 'in' && item.CGruKalaPriceCode_P > 0)
        //    $("#gGhimat").val(item.CGruKalaPriceCode_P);

        //if (sessionStorage.ModeCode == 'out' && item.KalaPriceCode_S > 0)
        //    $("#gGhimat").val(item.KalaPriceCode_S);
        //else if (sessionStorage.ModeCode == 'in' && item.KalaPriceCode_P > 0)
        //    $("#gGhimat").val(item.KalaPriceCode_P);

        self.ThvlCode(item.Code)
        //if (Serial != '') {
        //    self.UpdateIDocH();
        //}

        if (Serial != '') {
            flagFinalSave = false;
            self.UpdateIDocH();
        }
        //$('#finalSave_Title').removeAttr('hidden', '');

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

    self.selectKala = function (item) {
        KalaCode = item.Code;
        self.ClearIDocB();
        getUnit(item.Code);
        kalapricecode = $("#gGhimat").val();
        Price1 = item.PPrice1;
        Price2 = item.PPrice2;
        Price3 = item.PPrice3;

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

        // if (sessionStorage.sels == "true") {
        //     Price1 = item.SPrice1;
        //     Price2 = item.SPrice2;
        //      Price3 = item.SPrice3;
        // } else {

        //  }

        $('#codeKala').val(item.Code);
        $('#nameKala').val('(' + item.Code + ') ' + item.Name);

        //$('#unitName').val(item.UnitName1);
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

                Price1 = myArray[i].PPrice1;
                Price2 = myArray[i].PPrice2;
                Price3 = myArray[i].PPrice3;
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
            getKalaPriceBList(kalapricecode, item.KalaCode);


            if (item.MainUnit == 1) {
                amo = item.Amount1.toFixed(item.KalaDeghatM1);;
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
                amo = item.Amount3.toFixed(item.KalaDeghatM3);
                Price3 = item.UnitPrice.toFixed(item.KalaDeghatR3);
                $("#iconzarib1").css("backgroundColor", "white");
                $("#iconzarib2").css("backgroundColor", "white");
                $("#iconzarib3").css("backgroundColor", "#c0bfbf");
            }
            amo != 0 ? $('#amount').val(NumberToNumberString(amo)) : $('#amount').val('');

            item.UnitPrice != 0 ? $('#unitPrice').val(NumberToNumberString(item.UnitPrice.toFixed(item.DeghatR))) : $('#unitPrice').val('');
            item.TotalPrice != 0 ? $('#totalPrice').val(NumberToNumberString(item.TotalPrice.toFixed(parseInt(sessionStorage.DeghatInv)))) : $('#totalPrice').val('');
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

            //if (self.flagupdateband == true)
            $('#modal-Band').modal();
        }
    };
    //-------------------------------------------


    self.DeleteBand = function (factorBand) {

        Swal.fire({
            title: mes_Delete,
            text: translate("آیا بند انتخابی حذف شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                ajaxFunction(IDocBiUri + ace + '/' + sal + '/' + group + '/' + factorBand.SerialNumber + '/' + factorBand.BandNo + '/' + sessionStorage.InOut + '/' + flaglog, 'DELETE').done(function (response) {
                    self.IDocBList(response);
                    self.IDocB(response);
                    getIDocH(Serial);
                    flagFinalSave = false;
                    flaglog = 'N';
                    //self.UpdateIDocH();
                    showNotification(translate('بند شماره') + ' ' + factorBand.BandNo + ' ' + translate('حذف شد'), 1);
                });
            }
        })
    };


    var old_KalaFileNo = "";
    var old_KalaState = "";
    var old_KalaExf1 = "";
    var old_KalaExf2 = "";
    var old_KalaExf3 = "";
    var old_KalaExf4 = "";
    var old_KalaExf5 = "";
    var old_KalaExf6 = "";
    var old_KalaExf7 = "";
    var old_KalaExf8 = "";
    var old_KalaExf9 = "";
    var old_KalaExf10 = "";
    var old_KalaExf11 = "";
    var old_KalaExf12 = "";
    var old_KalaExf13 = "";
    var old_KalaExf14 = "";
    var old_KalaExf15 = "";


    self.UpdateBand = function (factorBand) {
        old_KalaFileNo = factorBand.KalaFileNo;
        old_KalaState = factorBand.KalaState;
        old_KalaExf1 = factorBand.KalaExf1;
        old_KalaExf2 = factorBand.KalaExf2;
        old_KalaExf3 = factorBand.KalaExf3;
        old_KalaExf4 = factorBand.KalaExf4;
        old_KalaExf5 = factorBand.KalaExf5;
        old_KalaExf6 = factorBand.KalaExf6;
        old_KalaExf7 = factorBand.KalaExf7;
        old_KalaExf8 = factorBand.KalaExf8;
        old_KalaExf9 = factorBand.KalaExf9;
        old_KalaExf10 = factorBand.KalaExf10;
        old_KalaExf11 = factorBand.KalaExf11;
        old_KalaExf12 = factorBand.KalaExf12;
        old_KalaExf13 = factorBand.KalaExf13;
        old_KalaExf14 = factorBand.KalaExf14;
        old_KalaExf15 = factorBand.KalaExf15;
        self.flagupdateband = true;
    }



    $('#modal-Thvl').on('shown.bs.modal', function () {
        $('#searchThvl').val('');
        self.filterThvl('');
        self.filterThvlList();
        $('#searchThvl').focus();
    });

    $('#modal-kala').on('shown.bs.modal', function () {
        $('#searchKala').val('');
        $('.fix').attr('class', 'form-line focused fix');
        self.filterKala('');
        self.filterKalaList();
        $('#searchKala').focus();
    });


    $('#modal-Band').on('show.bs.modal', function () {

        if (self.flagupdateband == false) {
            self.ClearIDocB();
        } else {
            $('#amounttext').text(amountTextUpdate);
            $('#unitName').val(amountValueUpdate);
            flagEditBand = true;
            //$(this).AmountCalc();
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

    })

    $('#refreshThvl').click(function () {

        Swal.fire({
            title: mes_Refresh,
            //text: sessionStorage.InOut == 1 ? 'لیست تحویل دهندگان به روز رسانی شود ؟' : 'لیست تحویل گیرندگان به روز رسانی شود ؟',
            text: translate("لیست") + " " + (sessionStorage.InOut == 1 ? translate('تحویل دهندگان') : translate('تحویل گیرندگان')) + " " +
                + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getThvlList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: sessionStorage.ModeCode != 'in' ? 'لیست تحویل گیرندگان به روز رسانی شد' : 'لیست تحویل دهندگان به روز رسانی شد' });
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

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaList();
            }
        })
    })


    $("#unitName").click(function () {

        flagEditBand = false;
    });

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

            // $("#unitName").text(amounttext);
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


        /*if (amountvalue == 1) {
            $("#iconzarib1").show();
            $("#iconzarib2").hide();
            $("#iconzarib3").hide();
        }
        else if (amountvalue == 2) {
            $("#iconzarib1").hide();
            $("#iconzarib2").show();
            $("#iconzarib3").hide();
        }
        else if (amountvalue == 3) {
            $("#iconzarib1").hide();
            $("#iconzarib2").hide();
            $("#iconzarib3").show();
        }*/

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


    $.fn.AmountCalc = function () {

        var amount;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        oldprice = SlashToDot($("#unitPrice").val());
        //if ( $("#unitName option:selected").val() == null) 
        //  unitvalue = amountValueUpdate;
        //else     
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

    $.fn.CalcBand = function () {
        var unitName = $("#unitName").val();
        var amount;
        var unitPrice;
        var totalPrice;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        $("#unitPrice").val() == '' ? unitPrice = 0 : unitPrice = parseFloat(SlashToDot($("#unitPrice").val()));
        $("#totalPrice").val() == '' ? totalPrice = 0 : totalPrice = parseFloat(SlashToDot($("#totalPrice").val()));
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
                sum != 0 ? $("#totalPrice").val(NumberToNumberString(parseFloat(sum).toFixed(parseInt(sessionStorage.DeghatInv)))) : $("#totalPrice").val('');
            }
            else if (flag == 0) {
                $("#totalPrice").css("backgroundColor", "white");
                $("#unitPrice").css("backgroundColor", "yellow");
                sum != 0 ? $("#unitPrice").val(NumberToNumberString(sum)) : $("#unitPrice").val('');
            }
        }
    }

    $("#amount").keyup(function () {
        flag = 1;
        $('.fix').attr('class', 'form-line focused fix');
        $(this).AmountCalc();
        $(this).CalcBand();
    });

    self.OptionsCaptionAnbar = ko.computed(function () {
        return self.InvList().length > 0 ? translate('انبار را انتخاب کنید') : translate('انبار تعریف نشده است');
    });



    $("#allSearchThvl").click(function () {
        if ($("#allSearchThvl").is(':checked')) {
            $('#allSearchThvlText').text(translate('جستجو بر اساس همه موارد'));
            allSearchThvl = true;

        }
        else {
            $('#allSearchThvlText').text(sessionStorage.InOut == 1 ? translate('جستجو بر اساس کد تحویل دهنده') : translate('جستجو بر اساس کد تحویل گیرنده'));
            allSearchThvl = false;
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

    $("#gGhimat").change(function () {

        if ($("#textBandNo").text() > '0' && viewAction == true) {
            Swal.fire({
                title: 'تایید و ثبت نهایی تغییرات ؟',
                text: "قیمت تمام کالاها با قیمت های ثبت شده در گروه قیمت کالای انتخاب شده پر می شوند آیا مطمئن هستید ؟",
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
                    if (kalapricecode == null) kalapricecode = 0;
                    kalapricecode = $("#gGhimat").val();
                    flagKalaPrice = true;
                    self.UpdateIDocH();
                }
                else {
                    //kalapricecode == 0 ? kalapricecode = '' : kalapricecode = kalapricecode;
                    $("#gGhimat").val(kalapricecode);
                   // kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                }
            })
        }
    })


    if (sessionStorage.InOut == 1)
        sessionStorage.NEW_IIDOC == "true" ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide();
    else
        sessionStorage.NEW_IODOC == "true" ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide();


    $('#AddNewSanadAnbar').click(function () {
        AddNewSanad();   
    });

    function AddNewSanad() {
        Swal.fire({
            title: '',
            text: $('#TitleHeaderAnbar').text() + " جدید ایجاد می شود . آیا مطمئن هستید ؟",
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
                closedDate = false;
                sessionStorage.flagupdateHeader = 0;
                sessionStorage.Status = 'موقت';
                flaglog = "Y";
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
                window.location.href = sessionStorage.urlAddIDocH;
            }
        })
    }



    self.docNoKeyDown = function (AddMinList, e) {
        if (e.shiftKey) {
            return
        }
        else {
            var key = e.charCode || e.keyCode || 0;
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
            );
        }
    }





    $("#searchThvl").on("keydown", function search(e) {
        if (allSearchThvl == false) {
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

    // sessionStorage.SHOWPRICE_IIDOC = false

    /*  if (sessionStorage.InOut == 1 && sessionStorage.SHOWPRICE_IIDOC == "false") {
  
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
      else {
          $('#thUnitPrice').removeAttr('hidden', '');
          $('#thTotalPrice').removeAttr('hidden', '');
          $('#thDiscount').removeAttr('hidden', '');
          $('#tdUnitPrice').removeAttr('hidden', '');
          $('#tdTotalPrice').removeAttr('hidden', '');
          $('#tdDiscount').removeAttr('hidden', '');
          $('#foottextUnitPrice').removeAttr('hidden', '');
          $('#foottexttotalprice').removeAttr('hidden', '');
          $('#foottextdiscount').removeAttr('hidden', '');
      }*/


    /*$('#Print').click(function () {
        if (Serial == '')
            return showNotification(translate('ابتدا سند را ذخیره کنید', 0);
        getIDocP(Serial);

        if (self.IDocPList().length == 0)
            return showNotification(translate('برای چاپ سند حداقل یک بند الزامیست', 0);
        textFinalPrice = self.IDocPList()[0].TotalPrice.toPersianLetter() + titlePrice;

        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';


        if (sessionStorage.InOut == 1) {
            if (sessionStorage.Access_SHOWPRICE_IIDOC == 'true')
                setReport(self.IDocPList(), 'Sanad_IDoc', printVariable);
            else
                setReport(self.IDocPList(), 'Sanad_IDoc_NoPrice', printVariable);
        }
        else {
            setReport(self.IDocPList(), 'Sanad_ODoc_NoPrice', printVariable);
        }


    });*/

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


    $('#Print_SanadAnbar').click(function () {
        PrintSanad();    
    });

    function PrintSanad() {
        if (Serial == '')
            return showNotification(translate('ابتدا سند را ذخیره کنید'), 0);
        getIDocP(Serial);
        createViewer();
        if (self.IDocPList().length == 0)
            return showNotification(translate('برای چاپ سند حداقل یک بند الزامیست'), 0);
        textFinalPrice = self.IDocPList()[0].TotalPrice.toPersianLetter() + titlePrice;

        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';

        if (sessionStorage.InOut == 1) {
            if (localStorage.getItem("Access_SHOWPRICE_IIDOC") == 'true')
                sessionStorage.ModePrint = 'IDoc';
            else
                sessionStorage.ModePrint = 'IDoc_NoPrice';
        }
        else {
            sessionStorage.ModePrint = 'ODoc';
        }

        printName = null;
        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
        $('#modal-Print').modal('show');
    }

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


    $('#titleFinalSave').text(' ذخیره ' + $('#TitleHeaderAnbar').text());


    function SetTanzimSanad() {

        var AFI_SaveIDoc_HZ = {
            SerialNumber: Serial,
            Tanzim: sessionStorage.userName,
        };

        ajaxFunction(SaveIDoc_HZUri + ace + '/' + sal + '/' + group, 'POST', AFI_SaveIDoc_HZ).done(function (data) {
            if (flagupdateHeader == 1) {
                sessionStorage.flagupdateHeader = 0;
                flagupdateHeader = 0;
                if (sessionStorage.IsReport == "true") {
                    sessionStorage.IsReport = "false";
                    close();
                }
                else {
                    window.location.href = sessionStorage.urlIDocH;
                }
            }
            else {
                showNotification(translate('سند ذخیره شد'), 1);
            }
        });
    }


    $('#FinalSave').click(function () {
        SaveSanad();
    });

    function SaveSanad() {
        if (self.UpdateIDocH() != "OK") {
            return null;
        }
        //flagFinalSave = true;

        var TestIDocObject = {
            SerialNumber: Serial
        };

        ajaxFunction(TestIDocUri + ace + '/' + sal + '/' + group, 'POST', TestIDocObject).done(function (data) {
            var obj = JSON.parse(data);
            self.TestIDocList(obj);
            if (data.length > 2) {
                $('#modal-FinalSave').modal('show');
                SetDataTestDocB()
            } else {
                flagFinalSave = true;
                SetTanzimSanad();
            }
        });
    }

    function SetDataTestDocB() {
        $("#BodyTestDocB").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestIDocList();
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

            else if (list[i].TestName == 'Thvl')
                textBody += '<p>' + $('#LableThvlCode').text() + " " + translate('انتخاب نشده است') + ' </p>';


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





















    $('#listOldBand').click(function () {
        self.sortTableIDocB();
        self.filterIDocB1(KalaCode);
        $('#modal-OldBand').modal('show');

    })


    pageSizeIDocB = localStorage.getItem('pageSizeIDocB') == null ? 100 : localStorage.getItem('pageSizeIDocB');
    self.pageSizeIDocB = ko.observable(pageSizeIDocB);
    self.currentPageIndexIDocB = ko.observable(0);

    self.filterIDocB0 = ko.observable("");
    self.filterIDocB1 = ko.observable("");
    self.filterIDocB2 = ko.observable("");
    self.filterIDocB3 = ko.observable("");
    self.filterIDocB4 = ko.observable("");
    self.filterIDocB5 = ko.observable("");
    self.filterIDocB6 = ko.observable("");
    self.filterIDocB7 = ko.observable("");
    self.filterIDocB8 = ko.observable("");
    self.filterIDocB9 = ko.observable("");

    self.filterIDocB = ko.computed(function () {

        self.currentPageIndexIDocB(0);

        var filter0 = self.filterIDocB0();
        var filter1 = self.filterIDocB1();
        var filter2 = self.filterIDocB2();
        var filter3 = self.filterIDocB3();
        var filter4 = self.filterIDocB4();
        var filter5 = self.filterIDocB5();
        var filter6 = self.filterIDocB6();
        var filter7 = self.filterIDocB7();
        var filter8 = self.filterIDocB8();
        var filter9 = self.filterIDocB9();


        if (!filter0 && !filter1 && !filter2 && !filter3 && !filter4 && !filter5 && !filter6 && !filter7 && !filter8 && !filter9) {
            return self.IDocB();
        } else {
            tempData = ko.utils.arrayFilter(self.IDocB(), function (item) {
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


    self.currentPageIDocB = ko.computed(function () {
        var pageSizeIDocB = parseInt(self.pageSizeIDocB(), 10),
            startIndex = pageSizeIDocB * self.currentPageIndexIDocB(),
            endIndex = startIndex + pageSizeIDocB;
        localStorage.setItem('pageSizeIDocB', pageSizeIDocB);
        return self.filterIDocB().slice(startIndex, endIndex);
    });


    self.nextPageIDocB = function () {
        if (((self.currentPageIndexIDocB() + 1) * self.pageSizeIDocB()) < self.filterIDocB().length) {
            self.currentPageIndexIDocB(self.currentPageIndexIDocB() + 1);
        }
    };

    self.previousPageIDocB = function () {
        if (self.currentPageIndexIDocB() > 0) {
            self.currentPageIndexIDocB(self.currentPageIndexIDocB() - 1);
        }
    };

    self.firstPageIDocB = function () {
        self.currentPageIndexIDocB(0);
    };

    self.lastPageIDocB = function () {
        countIDocB = parseInt(self.filterIDocB().length / self.pageSizeIDocB(), 10);
        self.currentPageIndexIDocB(countIDocB);
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



    self.sortTableIDocB = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortIDocB");
            self.sortType = localStorage.getItem("sortTypeIDocB");
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortIDocB", orderProp);
        localStorage.setItem("sortTypeIDocB", self.sortType);

        self.currentColumn(orderProp);
        self.IDocB.sort(function (left, right) {
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

    self.selectIDocB = function (item) {
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
        getKalaPriceBList(kalapricecode, item.KalaCode);

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
        item.TotalPrice != 0 ? $('#totalPrice').val(NumberToNumberString(item.TotalPrice.toFixed(parseInt(sessionStorage.DeghatInv)))) : $('#totalPrice').val('');
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
        // a = window.performance.navigation;
        // if (a.type == 0) {
        RemoveUseSanad(ace, sal, "SanadAnbar", sessionStorage.SerialNumber, useSanadOtherUser != 'UseUser');
        // }
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
                SaveSanad();
            }

            if (e.keyCode == key_Esc && $('#modal-Print').is(':visible')) {
                $('#modal-Print').modal('hide');
            }
        }
    };

    self.PageIndexArz = function (item) {
        return CountPage(self.filterArzList(), self.pageSizeArz(), item);
    };

    self.PageIndexKala = function (item) {
        return CountPage(self.filterKalaList(), self.pageSizeKala(), item);
    };

    self.PageIndexMkz = function (item) {
        return CountPage(self.filterMkzList(), self.pageSizeMkz(), item);
    };

    self.PageIndexOpr = function (item) {
        return CountPage(self.filterOprList(), self.pageSizeOpr(), item);
    };

    self.PageIndexThvl  = function (item) {
        return CountPage(self.filterThvlList(), self.pageSizeThvl(), item);
    };

    self.PageIndexIDocB  = function (item) {
        return CountPage(self.filterIDocB(), self.pageSizeIDocB(), item);
    };

    self.PageIndexPrintForms = function (item) {
        return CountPage(self.filterPrintFormsList(), self.pageSizePrintForms(), item);
    };
};

ko.applyBindings(new ViewModel());










