var ViewModel = function () {
    var self = this;

    self.InvList = ko.observableArray([]); // ليست انبارها
    self.KalaList = ko.observableArray([]); // ليست کالاها
    self.CustList = ko.observableArray([]); // ليست مشتریان 
    self.CGruList = ko.observableArray([]); // ليست  گروه مشتریان 
    self.KGruList = ko.observableArray([]); // ليست گروه کالاها
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.FModeList = ko.observableArray([]); // لیست نوع فاکتور ها
    self.StatusList = ko.observableArray([]); // ليست نوع سند ها


    self.TrzFKala_PList = ko.observableArray([]); // لیست گزارش  

    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس مشتریان
    var CGruUri = server + '/api/Web_Data/CGru/'; // آدرس گروه مشتریان
    var KGruUri = server + '/api/Web_Data/KGru/'; // آدرس گروه کالا
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var FModeUri = server + '/api/FDocData/FMode/'; // آدرس نوع فاکتور ها 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 

    var TrzFKala_PUri = server + '/api/ReportFct/TrzFKala/'; // آدرس گزارش 

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);
    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();

    TestUser();

    var allSearchKala = true;

    var StatusCode = '';
    var counterStatus = 0;
    var list_StatusSelect = new Array();

    if (ace == Web8) {
        counterStatus = 3;
        list_StatusSelect = ["موقت", "تایید", "تصویب"];
    }
    else {
        counterStatus = 2;
        list_StatusSelect = ["موقت", "تایید"];
    }

    var KalaCode = '';
    var counterKala = 0;
    var list_KalaSelect = new Array();
    var list_KalaNameSelect = new Array();

    var InvCode = '';
    var counterInv = 0;
    var list_InvSelect = new Array();
    var list_InvNameSelect = new Array();

    var KGruCode = '';
    var counterKGru = 0;
    var list_KGruSelect = new Array();
    var list_KGruNameSelect = new Array();

    var CustCode = '';
    var counterCust = 0;
    var list_CustSelect = new Array();
    var list_CustNameSelect = new Array();

    var CGruCode = '';
    var counterCGru = 0;
    var list_CGruSelect = new Array();
    var list_CGruNameSelect = new Array();

    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();
    var list_MkzNameSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();
    var list_OprNameSelect = new Array();




    //CreateTableReport(RprtColsList);
    $("#textTotal").text('');


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'TrzFKala_P';
    var columns = [
        'KalaCode',
        'KalaName',
        'KalaF01',
        'KalaF02',
        'KalaF03',
        'KalaF04',
        'KalaF05',
        'KalaF06',
        'KalaF07',
        'KalaF08',
        'KalaF09',
        'KalaF10',
        'KalaF11',
        'KalaF12',
        'KalaF13',
        'KalaF14',
        'KalaF15',
        'KalaF16',
        'KalaF17',
        'KalaF18',
        'KalaF19',
        'KalaF20',
        'KalaUnitName1',
        'Amount1',
        'UnitPrice1',
        'KalaUnitName2',
        'Amount2',
        'UnitPrice2',
        'KalaUnitName3',
        'Amount3',
        'UnitPrice3',
        'TotalPrice',
        'Discount',
        'AddMinPrice1',
        'AddMinPrice2',
        'AddMinPrice3',
        'AddMinPrice4',
        'AddMinPrice5',
        'AddMinPrice6',
        'AddMinPrice7',
        'AddMinPrice8',
        'AddMinPrice9',
        'AddMinPrice10',
        'OnlyDiscountPrice',
        'FinalPrice',
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            ListColumns = data;
            if (FlagSetting) {
                CreateTableReport(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }
        });

    }

    //Get RprtColsDefult List
    function getRprtColsDefultList() {
        ajaxFunction(RprtColsDefultUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/TrzFKala_P", columns, self.SettingColumnList());
    });

    $('#modal-SettingColumn').on('show.bs.modal', function () {
        counterColumn = 0;
        getRprtColsList(false, sessionStorage.userName);
    });

    $('#AllSettingColumns').change(function () {
        var allCheck = $('#AllSettingColumns').is(':checked');
        for (var i = 1; i <= columns.length; i++) {
            $('#SettingColumns' + i).prop('checked', allCheck);
        }
    });

    $('#DefultColumn').click(function () {
        $('#AllSettingColumns').prop('checked', false);
        getRprtColsDefultList();
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/TrzFKala_P", columns, self.SettingColumnList());
    });

    getRprtColsList(true, sessionStorage.userName);




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

    //Get  FMode List
    function getFModeList() {
        ajaxFunction(FModeUri + ace + '/' + sal + '/' + group + '/1', 'GET').done(function (data) {
            self.FModeList(data);

            select = document.getElementById('modeCode');
            for (var i = 0; i < data.length; i++) {
                opt = document.createElement('option');
                opt.value = data[i].Code;
                opt.innerHTML = data[i].Name;
                select.appendChild(opt);
            }

            opt = document.createElement('option');
            opt.value = SearchMode('فاکتور خرید', self.FModeList()) + '*' + SearchMode('برگشت از خرید', self.FModeList());
            opt.innerHTML = 'فاکتور خرید با احتساب برگشتی';
            opt.selected = true;
            select.appendChild(opt);
        });
    }


    //Get  FMode List
    function getZeroList() {
        select = document.getElementById('zeroValue');

        opt = document.createElement('option');
        opt.value = '0';
        opt.innerHTML = 'نمایش مانده های صفر';
        opt.selected = true;
        select.appendChild(opt);

        opt = document.createElement('option');
        opt.value = '1';
        opt.innerHTML = 'عدم نمایش مانده های صفر';
        select.appendChild(opt);
    }




    //Get kala List
    function getKalaList() {
        var KalaObject = {
            withimage: false,
            updatedate: null,
            Mode: 0,
            UserCode: sessionStorage.userName,
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
    //Get Inv List 
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/0/' + sessionStorage.userName, 'GET').done(function (data) {
            self.InvList(data);
        });
    }

    //Get  KGru List
    function getKGruList() {
        var KGruObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(KGruUri + ace + '/' + sal + '/' + group, 'POST', KGruObject, true).done(function (data) {
            self.KGruList(data);
        });
    }

    $('#btnKGru').click(function () {
        if (self.KGruList().length == 0) {
            getKGruList();
        }
    });

    self.OptionsCaptionAnbar = ko.computed(function () {
        return 'همه انبارها';
    });


    //Get Cust List
    function getCustList() {
        var CustObject = {
            forSale: null,
            updatedate: null,
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CustUri + ace + '/' + sal + '/' + group, 'POST', CustObject, true).done(function (data) {
            self.CustList(data);
        });
    }
    $('#btnCust').click(function () {
        if (self.CustList().length == 0) {
            getCustList();
        }
    });

    function getCGruList() {
        var CGruObject = {
            Mode: 0,
            ModeGru: 2,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CGruUri + ace + '/' + sal + '/' + group, 'POST', CGruObject, true).done(function (data) {
            self.CGruList(data);
        });
    }
    $('#btnCGru').click(function () {
        if (self.CGruList().length == 0) {
            getCGruList();
        }
    });
    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.OprList(data);
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
            self.MkzList(data);
        });
    }
    $('#btnMkz').click(function () {
        if (self.MkzList().length == 0) {
            getMkzList();
        }
    });




    var azTarikh;
    var taTarikh;
    var azShomarh;
    var taShomarh;
    var zeroValue;
    var modeCode1;
    var modeCode2;
    var statusCode;
    var invcode;
    var invname;
    var kalacode;
    var kalaname;
    var kGrucode;
    var kGruname;
    var Custcode;
    var Custname;
    var CGrucode;
    var CGruname;
    var mkzcode;
    var mkzname;
    var oprcode;
    var oprname;


    function SetFilter() {
        azTarikh = self.AzDate().toEnglishDigit();//$("#aztarikh").val().toEnglishDigit();
        taTarikh = self.TaDate().toEnglishDigit();//$("#tatarikh").val().toEnglishDigit();

        azShomarh = $("#azshomarh").val();
        taShomarh = $("#tashomarh").val();

        zeroValue = $("#zeroValue").val();

        modeCode = $("#modeCode").val().split("*");
        modeCode1 = modeCode[0];
        modeCode2 = modeCode[1];
        if (modeCode.length == 1)
            modeCode2 = '';

        statusCode = '';
        for (var i = 0; i <= counterStatus - 1; i++) {
            if (i < counterStatus - 1)
                statusCode += list_StatusSelect[i] + '*';
            else
                statusCode += list_StatusSelect[i];
        }

        invcode = '';
        invname = '';
        for (var i = 0; i <= counterInv - 1; i++) {
            if (i < counterInv - 1) {
                invcode += list_InvSelect[i] + '*';
                invname += list_InvNameSelect[i] + '*';
            }
            else {
                invcode += list_InvSelect[i];
                invname += list_InvNameSelect[i];
            }
        }

        kGrucode = '';
        kGruname = '';
        for (var i = 0; i <= counterKGru - 1; i++) {
            if (i < counterKGru - 1) {
                kGrucode += list_KGruSelect[i] + '*';
                kGruname += list_KGruNameSelect[i] + '*';
            }
            else {
                kGrucode += list_KGruSelect[i];
                kGruname += list_KGruNameSelect[i];
            }
        }

        kalacode = '';
        kalaname = '';
        for (var i = 0; i <= counterKala - 1; i++) {
            if (i < counterKala - 1) {
                kalacode += list_KalaSelect[i] + '*';
                kalaname += list_KalaNameSelect[i] + '*';
            }
            else {
                kalacode += list_KalaSelect[i];
                kalaname += list_KalaNameSelect[i];
            }
        }

        Custcode = '';
        Custname = '';
        for (var i = 0; i <= counterCust - 1; i++) {
            if (i < counterCust - 1) {
                Custcode += list_CustSelect[i] + '*';
                Custname += list_CustNameSelect[i] + '*';
            }
            else {
                Custcode += list_CustSelect[i];
                Custname += list_CustNameSelect[i];
            }
        }

        CGrucode = '';
        CGruname = '';
        for (var i = 0; i <= counterCGru - 1; i++) {
            if (i < counterCGru - 1) {
                CGrucode += list_CGruSelect[i] + '*';
                CGruname += list_CGruNameSelect[i] + '*';
            }
            else {
                CGrucode += list_CGruSelect[i];
                CGruname += list_CGruNameSelect[i];
            }
        }

        mkzcode = '';
        mkzname = '';
        for (var i = 0; i <= counterMkz - 1; i++) {
            if (i < counterMkz - 1) {
                mkzcode += list_MkzSelect[i] + '*';
                mkzname += list_MkzNameSelect[i] + '*';
            }
            else {
                mkzcode += list_MkzSelect[i];
                mkzname += list_MkzNameSelect[i];
            }
        }

        oprcode = '';
        oprname = '';
        for (var i = 0; i <= counterOpr - 1; i++) {
            if (i < counterOpr - 1) {
                oprcode += list_OprSelect[i] + '*';
                oprname += list_OprNameSelect[i] + '*';
            }
            else {
                oprcode += list_OprSelect[i];
                oprname += list_OprNameSelect[i];
            }
        }

    }



    //Get TrzFKala_P
    function getTrzFKala_P() {


        /*tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        azShomarh = $("#azshomarh").val();
        taShomarh = $("#tashomarh").val();

        zeroValue = $("#zeroValue").val();

        modeCode = $("#modeCode").val().split("*");
        modeCode1 = modeCode[0];
        modeCode2 = modeCode[1];
        if (modeCode.length == 1)
            modeCode2 = '';

        var statusCode = '';
        for (var i = 0; i <= counterStatus - 1; i++) {
            if (i < counterStatus - 1)
                statusCode += list_StatusSelect[i] + '*';
            else
                statusCode += list_StatusSelect[i];
        }

        var invcode = '';
        for (var i = 0; i <= counterInv - 1; i++) {
            if (i < counterInv - 1)
                invcode += list_InvSelect[i] + '*';
            else
                invcode += list_InvSelect[i];
        }

        var kGrucode = '';
        for (var i = 0; i <= counterKGru - 1; i++) {
            if (i < counterKGru - 1)
                kGrucode += list_KGruSelect[i] + '*';
            else
                kGrucode += list_KGruSelect[i];
        }

        var kalacode = '';
        for (var i = 0; i <= counterKala - 1; i++) {
            if (i < counterKala - 1)
                kalacode += list_KalaSelect[i] + '*';
            else
                kalacode += list_KalaSelect[i];
        }

        var Custcode = '';
        for (var i = 0; i <= counterCust - 1; i++) {
            if (i < counterCust - 1)
                Custcode += list_CustSelect[i] + '*';
            else
                Custcode += list_CustSelect[i];
        }

        var CGrucode = '';
        for (var i = 0; i <= counterCGru - 1; i++) {
            if (i < counterCGru - 1)
                CGrucode += list_CGruSelect[i] + '*';
            else
                CGrucode += list_CGruSelect[i];
        }

        var mkzcode = '';
        for (var i = 0; i <= counterMkz - 1; i++) {
            if (i < counterMkz - 1)
                mkzcode += list_MkzSelect[i] + '*';
            else
                mkzcode += list_MkzSelect[i];
        }

        var oprcode = '';
        for (var i = 0; i <= counterOpr - 1; i++) {
            if (i < counterOpr - 1)
                oprcode += list_OprSelect[i] + '*';
            else
                oprcode += list_OprSelect[i];
        }*/

        SetFilter();
        var TrzFKala_PObject = {
            ModeCode1: modeCode1,
            ModeCode2: modeCode2,
            azTarikh: azTarikh,
            taTarikh: taTarikh,
            azShomarh: azShomarh,
            taShomarh: taShomarh,
            CustCode: Custcode,
            CGruCode: CGrucode,
            MkzCode: mkzcode,
            OprCode: oprcode,
            InvCode: invcode,
            StatusCode: statusCode,
            ZeroValue: zeroValue,
            KGruCode: kGrucode,
            KalaCode: kalacode,
        };
        ajaxFunction(TrzFKala_PUri + ace + '/' + sal + '/' + group, 'POST', TrzFKala_PObject, true).done(function (response) {
            self.TrzFKala_PList(response);
        });
    }

    function calcsum(list) {
        totalAmount1 = 0;
        totalAmount2 = 0;
        totalAmount3 = 0;
        totalAddMinPrice1 = 0;
        totalAddMinPrice2 = 0;
        totalAddMinPrice3 = 0;
        totalAddMinPrice4 = 0;
        totalAddMinPrice5 = 0;
        totalAddMinPrice6 = 0;
        totalAddMinPrice7 = 0;
        totalAddMinPrice8 = 0;
        totalAddMinPrice9 = 0;
        totalAddMinPrice10 = 0;
        totalUnitPrice1 = 0;
        totalUnitPrice2 = 0;
        totalUnitPrice3 = 0;
        totalDiscount = 0;
        totalOnlyDiscountPrice = 0;
        totalFinalPrice = 0;
        totalTotalPrice = 0;

        KalaDeghat1 = 0;
        KalaDeghat2 = 0;
        KalaDeghat3 = 0;

        PriceDeghat1 = 0;
        PriceDeghat2 = 0;
        PriceDeghat3 = 0;

        maxKalaDeghat1 = 0;
        maxKalaDeghat2 = 0;
        maxKalaDeghat3 = 0;

        maxPriceDeghat1 = 0;
        maxPriceDeghat2 = 0;
        maxPriceDeghat3 = 0;

        for (var i = 0; i < list.length; ++i) {
            TrzFKala_PData = list[i];
            totalAmount1 += TrzFKala_PData.Amount1;
            totalAmount2 += TrzFKala_PData.Amount2;
            totalAmount3 += TrzFKala_PData.Amount3;

            totalAddMinPrice1 += TrzFKala_PData.AddMinPrice1;
            totalAddMinPrice2 += TrzFKala_PData.AddMinPrice2;
            totalAddMinPrice3 += TrzFKala_PData.AddMinPrice3;
            totalAddMinPrice4 += TrzFKala_PData.AddMinPrice4;
            totalAddMinPrice5 += TrzFKala_PData.AddMinPrice5;
            totalAddMinPrice6 += TrzFKala_PData.AddMinPrice6;
            totalAddMinPrice7 += TrzFKala_PData.AddMinPrice7;
            totalAddMinPrice8 += TrzFKala_PData.AddMinPrice8;
            totalAddMinPrice9 += TrzFKala_PData.AddMinPrice9;
            totalAddMinPrice10 += TrzFKala_PData.AddMinPrice10;

            totalDiscount += TrzFKala_PData.Discount;
            totalOnlyDiscountPrice += TrzFKala_PData.OnlyDiscountPrice;
            totalFinalPrice += TrzFKala_PData.FinalPrice;
            totalTotalPrice += TrzFKala_PData.TotalPrice;

            KalaDeghat1 = TrzFKala_PData.KalaDeghatM1;
            KalaDeghat2 = TrzFKala_PData.KalaDeghatM2;
            KalaDeghat3 = TrzFKala_PData.KalaDeghatM3;

            KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
            KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
            KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
        }

        //$("#textTotal").text('جمع');
        $("#totalAmount1").text(NumberToNumberString(totalAmount1.toFixed(maxKalaDeghat1)));
        $("#totalAmount2").text(NumberToNumberString(totalAmount2.toFixed(maxKalaDeghat2)));
        $("#totalAmount3").text(NumberToNumberString(totalAmount3.toFixed(maxKalaDeghat3)));
        $("#totalAddMinPrice1").text(NumberToNumberString(totalAddMinPrice1.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice2").text(NumberToNumberString(totalAddMinPrice2.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice3").text(NumberToNumberString(totalAddMinPrice3.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice4").text(NumberToNumberString(totalAddMinPrice4.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice5").text(NumberToNumberString(totalAddMinPrice5.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice6").text(NumberToNumberString(totalAddMinPrice6.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice7").text(NumberToNumberString(totalAddMinPrice7.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice8").text(NumberToNumberString(totalAddMinPrice8.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice9").text(NumberToNumberString(totalAddMinPrice9.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAddMinPrice10").text(NumberToNumberString(totalAddMinPrice10.toFixed(parseInt(sessionStorage.Deghat))));
        //$("#totalUnitPrice").text(NumberToNumberString(totalUnitPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalDiscount").text(NumberToNumberString(totalDiscount.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalOnlyDiscountPrice").text(NumberToNumberString(totalOnlyDiscountPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalFinalPrice").text(NumberToNumberString(totalFinalPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalTotalPrice").text(NumberToNumberString(totalTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

    }


    $("#CreateReport").click(function () {
        getTrzFKala_P();
        self.sortTableTrzFKala_P();
    });

    getFModeList();
    getInvList();
    //getKalaList();
    //getCustList();
    getStatusList();
    //getCGruList();
    //getKGruList();
    getZeroList();

    $('#nameKala').val(translate('همه موارد'));
    $('#nameInv').val(translate('همه موارد'));
    $('#nameKGru').val(translate('همه موارد'));
    $('#nameCust').val(translate('همه موارد'));
    $('#nameCGru').val(translate('همه موارد'));
    $('#nameOpr').val(translate('همه موارد'));
    $('#nameMkz').val(translate('همه موارد'));
    $('#nameStatus').val(counterStatus +  ' ' + translate('مورد انتخاب شده'));

    self.currentPageTrzFKala_P = ko.observable();
    pageSizeTrzFKala_P = localStorage.getItem('pageSizeTrzFKala_P') == null ? 10 : localStorage.getItem('pageSizeTrzFKala_P');
    self.pageSizeTrzFKala_P = ko.observable(pageSizeTrzFKala_P);
    self.currentPageIndexTrzFKala_P = ko.observable(0);
    self.iconType = ko.observable("");

    self.filterKalaCode = ko.observable("");
    self.filterKalaName = ko.observable("");
    self.filterKalaF01 = ko.observable("");
    self.filterKalaF02 = ko.observable("");
    self.filterKalaF03 = ko.observable("");
    self.filterKalaF04 = ko.observable("");
    self.filterKalaF05 = ko.observable("");
    self.filterKalaF06 = ko.observable("");
    self.filterKalaF07 = ko.observable("");
    self.filterKalaF08 = ko.observable("");
    self.filterKalaF09 = ko.observable("");
    self.filterKalaF10 = ko.observable("");
    self.filterKalaF11 = ko.observable("");
    self.filterKalaF12 = ko.observable("");
    self.filterKalaF13 = ko.observable("");
    self.filterKalaF14 = ko.observable("");
    self.filterKalaF15 = ko.observable("");
    self.filterKalaF16 = ko.observable("");
    self.filterKalaF17 = ko.observable("");
    self.filterKalaF18 = ko.observable("");
    self.filterKalaF19 = ko.observable("");
    self.filterKalaF20 = ko.observable("");
    self.filterKalaUnitName1 = ko.observable("");
    self.filterKalaUnitName2 = ko.observable("");
    self.filterKalaUnitName3 = ko.observable("");
    self.filterAmount1 = ko.observable("");
    self.filterAmount2 = ko.observable("");
    self.filterAmount3 = ko.observable("");
    self.filterAddMinPrice1 = ko.observable("");
    self.filterAddMinPrice2 = ko.observable("");
    self.filterAddMinPrice3 = ko.observable("");
    self.filterAddMinPrice4 = ko.observable("");
    self.filterAddMinPrice5 = ko.observable("");
    self.filterAddMinPrice6 = ko.observable("");
    self.filterAddMinPrice7 = ko.observable("");
    self.filterAddMinPrice8 = ko.observable("");
    self.filterAddMinPrice9 = ko.observable("");
    self.filterAddMinPrice10 = ko.observable("");
    self.filterUnitPrice1 = ko.observable("");
    self.filterUnitPrice2 = ko.observable("");
    self.filterUnitPrice3 = ko.observable("");
    self.filterDiscount = ko.observable("");
    self.filterOnlyDiscountPrice = ko.observable("");
    self.filterFinalPrice = ko.observable("");
    self.filterTotalPrice = ko.observable("");

    self.filterTrzFKala_PList = ko.computed(function () {
        self.currentPageIndexTrzFKala_P(0);
        var filterKalaCode = self.filterKalaCode();
        var filterKalaName = self.filterKalaName();
        var filterKalaF01 = self.filterKalaF01();
        var filterKalaF02 = self.filterKalaF02();
        var filterKalaF03 = self.filterKalaF03();
        var filterKalaF04 = self.filterKalaF04();
        var filterKalaF05 = self.filterKalaF05();
        var filterKalaF06 = self.filterKalaF06();
        var filterKalaF07 = self.filterKalaF07();
        var filterKalaF08 = self.filterKalaF08();
        var filterKalaF09 = self.filterKalaF09();
        var filterKalaF10 = self.filterKalaF10();
        var filterKalaF11 = self.filterKalaF11();
        var filterKalaF12 = self.filterKalaF12();
        var filterKalaF13 = self.filterKalaF13();
        var filterKalaF14 = self.filterKalaF14();
        var filterKalaF15 = self.filterKalaF15();
        var filterKalaF16 = self.filterKalaF16();
        var filterKalaF17 = self.filterKalaF17();
        var filterKalaF18 = self.filterKalaF18();
        var filterKalaF19 = self.filterKalaF19();
        var filterKalaF20 = self.filterKalaF20();
        var filterKalaUnitName1 = self.filterKalaUnitName1();
        var filterKalaUnitName2 = self.filterKalaUnitName2();
        var filterKalaUnitName3 = self.filterKalaUnitName3();
        var filterAmount1 = self.filterAmount1();
        var filterAmount2 = self.filterAmount2();
        var filterAmount3 = self.filterAmount3();
        var filterAddMinPrice1 = self.filterAddMinPrice1();
        var filterAddMinPrice2 = self.filterAddMinPrice2();
        var filterAddMinPrice3 = self.filterAddMinPrice3();
        var filterAddMinPrice4 = self.filterAddMinPrice4();
        var filterAddMinPrice5 = self.filterAddMinPrice5();
        var filterAddMinPrice6 = self.filterAddMinPrice6();
        var filterAddMinPrice7 = self.filterAddMinPrice7();
        var filterAddMinPrice8 = self.filterAddMinPrice8();
        var filterAddMinPrice9 = self.filterAddMinPrice9();
        var filterAddMinPrice10 = self.filterAddMinPrice10();
        var filterUnitPrice1 = self.filterUnitPrice1();
        var filterUnitPrice2 = self.filterUnitPrice2();
        var filterUnitPrice3 = self.filterUnitPrice3();
        var filterDiscount = self.filterDiscount();
        var filterOnlyDiscountPrice = self.filterOnlyDiscountPrice();
        var filterFinalPrice = self.filterFinalPrice();
        var filterTotalPrice = self.filterTotalPrice();


        filterAmount1 = filterAmount1.replace("/", ".");
        filterAmount2 = filterAmount2.replace("/", ".");
        filterAmount3 = filterAmount3.replace("/", ".");
        filterAddMinPrice1 = filterAddMinPrice1.replace("/", ".");
        filterAddMinPrice2 = filterAddMinPrice2.replace("/", ".");
        filterAddMinPrice3 = filterAddMinPrice3.replace("/", ".");
        filterAddMinPrice4 = filterAddMinPrice4.replace("/", ".");
        filterAddMinPrice5 = filterAddMinPrice5.replace("/", ".");
        filterAddMinPrice6 = filterAddMinPrice6.replace("/", ".");
        filterAddMinPrice7 = filterAddMinPrice7.replace("/", ".");
        filterAddMinPrice8 = filterAddMinPrice8.replace("/", ".");
        filterAddMinPrice9 = filterAddMinPrice9.replace("/", ".");
        filterAddMinPrice10 = filterAddMinPrice10.replace("/", ".");
        filterUnitPrice1 = filterUnitPrice1.replace("/", ".");
        filterUnitPrice2 = filterUnitPrice2.replace("/", ".");
        filterUnitPrice3 = filterUnitPrice3.replace("/", ".");
        filterDiscount = filterDiscount.replace("/", ".");
        filterOnlyDiscountPrice = filterOnlyDiscountPrice.replace("/", ".");
        filterFinalPrice = filterFinalPrice.replace("/", ".");
        filterTotalPrice = filterTotalPrice.replace("/", ".");

        tempData = ko.utils.arrayFilter(self.TrzFKala_PList(), function (item) {
            result =
                (item.KalaCode == null ? '' : item.KalaCode.toString().search(filterKalaCode) >= 0) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filterKalaName) >= 0) &&
                (item.KalaF01 == null ? '' : item.KalaF01.toString().search(filterKalaF01) >= 0) &&
                (item.KalaF02 == null ? '' : item.KalaF01.toString().search(filterKalaF02) >= 0) &&
                (item.KalaF03 == null ? '' : item.KalaF01.toString().search(filterKalaF03) >= 0) &&
                (item.KalaF04 == null ? '' : item.KalaF01.toString().search(filterKalaF04) >= 0) &&
                (item.KalaF05 == null ? '' : item.KalaF01.toString().search(filterKalaF05) >= 0) &&
                (item.KalaF06 == null ? '' : item.KalaF01.toString().search(filterKalaF06) >= 0) &&
                (item.KalaF07 == null ? '' : item.KalaF01.toString().search(filterKalaF07) >= 0) &&
                (item.KalaF08 == null ? '' : item.KalaF01.toString().search(filterKalaF08) >= 0) &&
                (item.KalaF09 == null ? '' : item.KalaF01.toString().search(filterKalaF09) >= 0) &&
                (item.KalaF10 == null ? '' : item.KalaF01.toString().search(filterKalaF10) >= 0) &&
                (item.KalaF11 == null ? '' : item.KalaF01.toString().search(filterKalaF11) >= 0) &&
                (item.KalaF12 == null ? '' : item.KalaF01.toString().search(filterKalaF12) >= 0) &&
                (item.KalaF13 == null ? '' : item.KalaF01.toString().search(filterKalaF13) >= 0) &&
                (item.KalaF14 == null ? '' : item.KalaF01.toString().search(filterKalaF14) >= 0) &&
                (item.KalaF15 == null ? '' : item.KalaF01.toString().search(filterKalaF15) >= 0) &&
                (item.KalaF16 == null ? '' : item.KalaF01.toString().search(filterKalaF16) >= 0) &&
                (item.KalaF17 == null ? '' : item.KalaF01.toString().search(filterKalaF17) >= 0) &&
                (item.KalaF18 == null ? '' : item.KalaF01.toString().search(filterKalaF18) >= 0) &&
                (item.KalaF19 == null ? '' : item.KalaF01.toString().search(filterKalaF19) >= 0) &&
                (item.KalaF20 == null ? '' : item.KalaF01.toString().search(filterKalaF20) >= 0) &&
                (item.KalaUnitName1 == null ? '' : item.KalaUnitName1.toString().search(filterKalaUnitName1) >= 0) &&
                (item.KalaUnitName2 == null ? '' : item.KalaUnitName2.toString().search(filterKalaUnitName2) >= 0) &&
                (item.KalaUnitName3 == null ? '' : item.KalaUnitName3.toString().search(filterKalaUnitName3) >= 0) &&
                ko.utils.stringStartsWith(item.Amount1.toString().toLowerCase(), filterAmount1) &&
                ko.utils.stringStartsWith(item.Amount2.toString().toLowerCase(), filterAmount2) &&
                ko.utils.stringStartsWith(item.Amount3.toString().toLowerCase(), filterAmount3) &&
                ko.utils.stringStartsWith(item.AddMinPrice1.toString().toLowerCase(), filterAddMinPrice1) &&
                ko.utils.stringStartsWith(item.AddMinPrice2.toString().toLowerCase(), filterAddMinPrice2) &&
                ko.utils.stringStartsWith(item.AddMinPrice3.toString().toLowerCase(), filterAddMinPrice3) &&
                ko.utils.stringStartsWith(item.AddMinPrice4.toString().toLowerCase(), filterAddMinPrice4) &&
                ko.utils.stringStartsWith(item.AddMinPrice5.toString().toLowerCase(), filterAddMinPrice5) &&
                ko.utils.stringStartsWith(item.AddMinPrice6.toString().toLowerCase(), filterAddMinPrice6) &&
                ko.utils.stringStartsWith(item.AddMinPrice7.toString().toLowerCase(), filterAddMinPrice7) &&
                ko.utils.stringStartsWith(item.AddMinPrice8.toString().toLowerCase(), filterAddMinPrice8) &&
                ko.utils.stringStartsWith(item.AddMinPrice9.toString().toLowerCase(), filterAddMinPrice9) &&
                ko.utils.stringStartsWith(item.AddMinPrice10.toString().toLowerCase(), filterAddMinPrice10) &&
                ko.utils.stringStartsWith(item.UnitPrice1.toString().toLowerCase(), filterUnitPrice1) &&
                ko.utils.stringStartsWith(item.UnitPrice2.toString().toLowerCase(), filterUnitPrice2) &&
                ko.utils.stringStartsWith(item.UnitPrice3.toString().toLowerCase(), filterUnitPrice3) &&
                ko.utils.stringStartsWith(item.Discount.toString().toLowerCase(), filterDiscount) &&
                ko.utils.stringStartsWith(item.OnlyDiscountPrice.toString().toLowerCase(), filterOnlyDiscountPrice) &&
                ko.utils.stringStartsWith(item.FinalPrice.toString().toLowerCase(), filterFinalPrice) &&
                ko.utils.stringStartsWith(item.TotalPrice.toString().toLowerCase(), filterTotalPrice)
            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzFKala_P);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzFKala_P = 0;
        sessionStorage.searchTrzFKala_P = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzFKala_P(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzFKala_PList(), function (item) {
                indexTrzFKala_P += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzFKala_P < self.pageSizeTrzFKala_P())
                self.currentPageIndexTrzFKala_P(0);
            else {
                var a = Math.round((indexTrzFKala_P / self.pageSizeTrzFKala_P()), 0);
                if (a < (indexTrzFKala_P / self.pageSizeTrzFKala_P())) a += 1;
                self.currentPageIndexTrzFKala_P(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzFKala_P = ko.computed(function () {
        var pageSizeTrzFKala_P = parseInt(self.pageSizeTrzFKala_P(), 10),
            startIndex = pageSizeTrzFKala_P * self.currentPageIndexTrzFKala_P(),
            endIndex = startIndex + pageSizeTrzFKala_P;
        localStorage.setItem('pageSizeTrzFKala_P', pageSizeTrzFKala_P);
        return self.filterTrzFKala_PList().slice(startIndex, endIndex);
    });

    self.nextPageTrzFKala_P = function () {
        if (((self.currentPageIndexTrzFKala_P() + 1) * self.pageSizeTrzFKala_P()) < self.filterTrzFKala_PList().length) {
            self.currentPageIndexTrzFKala_P(self.currentPageIndexTrzFKala_P() + 1);
        }
    };

    self.previousPageTrzFKala_P = function () {
        if (self.currentPageIndexTrzFKala_P() > 0) {
            self.currentPageIndexTrzFKala_P(self.currentPageIndexTrzFKala_P() - 1);
        }
    };

    self.firstPageTrzFKala_P = function () {
        self.currentPageIndexTrzFKala_P(0);
    };

    self.lastPageTrzFKala_P = function () {
        tempCountTrzFKala_P = parseInt(self.filterTrzFKala_PList().length / self.pageSizeTrzFKala_P(), 10);
        if ((self.filterTrzFKala_PList().length % self.pageSizeTrzFKala_P()) == 0)
            self.currentPageIndexTrzFKala_P(tempCountTrzFKala_P - 1);
        else
            self.currentPageIndexTrzFKala_P(tempCountTrzFKala_P);
    };


    self.iconTypeKalaCode = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
    self.iconTypeKalaF01 = ko.observable("");
    self.iconTypeKalaF01 = ko.observable("");
    self.iconTypeKalaF02 = ko.observable("");
    self.iconTypeKalaF03 = ko.observable("");
    self.iconTypeKalaF04 = ko.observable("");
    self.iconTypeKalaF05 = ko.observable("");
    self.iconTypeKalaF06 = ko.observable("");
    self.iconTypeKalaF07 = ko.observable("");
    self.iconTypeKalaF08 = ko.observable("");
    self.iconTypeKalaF09 = ko.observable("");
    self.iconTypeKalaF10 = ko.observable("");
    self.iconTypeKalaF11 = ko.observable("");
    self.iconTypeKalaF12 = ko.observable("");
    self.iconTypeKalaF13 = ko.observable("");
    self.iconTypeKalaF14 = ko.observable("");
    self.iconTypeKalaF15 = ko.observable("");
    self.iconTypeKalaF16 = ko.observable("");
    self.iconTypeKalaF17 = ko.observable("");
    self.iconTypeKalaF18 = ko.observable("");
    self.iconTypeKalaF19 = ko.observable("");
    self.iconTypeKalaF20 = ko.observable("");
    self.iconTypeKalaUnitName1 = ko.observable("");
    self.iconTypeKalaUnitName2 = ko.observable("");
    self.iconTypeKalaUnitName3 = ko.observable("");
    self.iconTypeAmount1 = ko.observable("");
    self.iconTypeAmount2 = ko.observable("");
    self.iconTypeAmount3 = ko.observable("");
    self.iconTypeAddMinPrice1 = ko.observable("");
    self.iconTypeAddMinPrice2 = ko.observable("");
    self.iconTypeAddMinPrice3 = ko.observable("");
    self.iconTypeAddMinPrice4 = ko.observable("");
    self.iconTypeAddMinPrice5 = ko.observable("");
    self.iconTypeAddMinPrice6 = ko.observable("");
    self.iconTypeAddMinPrice7 = ko.observable("");
    self.iconTypeAddMinPrice8 = ko.observable("");
    self.iconTypeAddMinPrice9 = ko.observable("");
    self.iconTypeAddMinPrice10 = ko.observable("");
    self.iconTypeUnitPrice1 = ko.observable("");
    self.iconTypeUnitPrice2 = ko.observable("");
    self.iconTypeUnitPrice3 = ko.observable("");
    self.iconTypeDiscount = ko.observable("");
    self.iconTypeOnlyDiscountPrice = ko.observable("");
    self.iconTypeFinalPrice = ko.observable("");
    self.iconTypeTotalPrice = ko.observable("");

    self.sortTableTrzFKala_P = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sort" + rprtId);
            self.sortType = localStorage.getItem("sortType" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sort" + rprtId, orderProp);
        localStorage.setItem("sortType" + rprtId, self.sortType);

        self.currentColumn(orderProp);
        self.TrzFKala_PList.sort(function (left, right) {
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


        self.iconTypeKalaCode('');
        self.iconTypeKalaName('');
        self.iconTypeKalaF01('');
        self.iconTypeKalaF01('');
        self.iconTypeKalaF02('');
        self.iconTypeKalaF03('');
        self.iconTypeKalaF04('');
        self.iconTypeKalaF05('');
        self.iconTypeKalaF06('');
        self.iconTypeKalaF07('');
        self.iconTypeKalaF08('');
        self.iconTypeKalaF09('');
        self.iconTypeKalaF10('');
        self.iconTypeKalaF11('');
        self.iconTypeKalaF12('');
        self.iconTypeKalaF13('');
        self.iconTypeKalaF14('');
        self.iconTypeKalaF15('');
        self.iconTypeKalaF16('');
        self.iconTypeKalaF17('');
        self.iconTypeKalaF18('');
        self.iconTypeKalaF19('');
        self.iconTypeKalaF20('');
        self.iconTypeKalaUnitName1('');
        self.iconTypeKalaUnitName2('');
        self.iconTypeKalaUnitName3('');
        self.iconTypeAmount1('');
        self.iconTypeAmount2('');
        self.iconTypeAmount3('');
        self.iconTypeAddMinPrice1('');
        self.iconTypeAddMinPrice2('');
        self.iconTypeAddMinPrice3('');
        self.iconTypeAddMinPrice4('');
        self.iconTypeAddMinPrice5('');
        self.iconTypeAddMinPrice6('');
        self.iconTypeAddMinPrice7('');
        self.iconTypeAddMinPrice8('');
        self.iconTypeAddMinPrice9('');
        self.iconTypeAddMinPrice10('');
        self.iconTypeUnitPrice1('');
        self.iconTypeUnitPrice2('');
        self.iconTypeUnitPrice3('');
        self.iconTypeDiscount('');
        self.iconTypeOnlyDiscountPrice('');
        self.iconTypeFinalPrice('');
        self.iconTypeTotalPrice('');

        if (orderProp == 'KalaCode') self.iconTypeKalaCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaName') self.iconTypeKalaName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF01') self.iconTypeKalaF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF02') self.iconTypeKalaF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF03') self.iconTypeKalaF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF04') self.iconTypeKalaF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF05') self.iconTypeKalaF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF06') self.iconTypeKalaF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF07') self.iconTypeKalaF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF08') self.iconTypeKalaF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF09') self.iconTypeKalaF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF10') self.iconTypeKalaF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF11') self.iconTypeKalaF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF12') self.iconTypeKalaF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF13') self.iconTypeKalaF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF14') self.iconTypeKalaF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF15') self.iconTypeKalaF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF16') self.iconTypeKalaF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF17') self.iconTypeKalaF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF18') self.iconTypeKalaF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF19') self.iconTypeKalaF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF20') self.iconTypeKalaF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName1') self.iconTypeKalaUnitName1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName2') self.iconTypeKalaUnitName2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName3') self.iconTypeKalaUnitName3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount1') self.iconTypeAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount2') self.iconTypeAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount3') self.iconTypeAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice1') self.iconTypeAddMinPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice2') self.iconTypeAddMinPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice3') self.iconTypeAddMinPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice4') self.iconTypeAddMinPrice4((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice5') self.iconTypeAddMinPrice5((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice6') self.iconTypeAddMinPrice6((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice7') self.iconTypeAddMinPrice7((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice8') self.iconTypeAddMinPrice8((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice9') self.iconTypeAddMinPrice9((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice10') self.iconTypeAddMinPrice10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice1') self.iconTypeUnitPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice2') self.iconTypeUnitPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice3') self.iconTypeUnitPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Discount') self.iconTypeDiscount((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OnlyDiscountPrice') self.iconTypeOnlyDiscountPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FinalPrice') self.iconTypeFinalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TotalPrice') self.iconTypeTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    }


    self.currentPageInv = ko.observable();
    pageSizeInv = localStorage.getItem('pageSizeInv') == null ? 10 : localStorage.getItem('pageSizeInv');
    self.pageSizeInv = ko.observable(pageSizeInv);
    self.currentPageIndexInv = ko.observable(0);

    self.filterInv0 = ko.observable("");
    self.filterInv1 = ko.observable("");
    self.filterInv2 = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");


    self.currentPageStatus = ko.observable();
    pageSizeStatus = localStorage.getItem('pageSizeStatus') == null ? 10 : localStorage.getItem('pageSizeStatus');
    self.pageSizeStatus = ko.observable(pageSizeStatus);
    self.currentPageIndexStatus = ko.observable(0);

    self.filterStatus0 = ko.observable("");

    self.filterStatusList = ko.computed(function () {

        self.currentPageIndexStatus(0);
        var filter0 = self.filterStatus0();

        if (!filter0) {
            return self.StatusList();
        } else {
            tempData = ko.utils.arrayFilter(self.StatusList(), function (item) {
                result =
                    item.Status == null ? '' : item.Status.toString().search(filter0) >= 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageStatus = ko.computed(function () {
        var pageSizeStatus = parseInt(self.pageSizeStatus(), 10),
            startIndex = pageSizeStatus * self.currentPageIndexStatus(),
            endIndex = startIndex + pageSizeStatus;
        localStorage.setItem('pageSizeStatus', pageSizeStatus);
        return self.filterStatusList().slice(startIndex, endIndex);
    });

    self.nextPageStatus = function () {
        if (((self.currentPageIndexStatus() + 1) * self.pageSizeStatus()) < self.filterStatusList().length) {
            self.currentPageIndexStatus(self.currentPageIndexStatus() + 1);
        }
    };

    self.previousPageStatus = function () {
        if (self.currentPageIndexStatus() > 0) {
            self.currentPageIndexStatus(self.currentPageIndexStatus() - 1);
        }
    };

    self.firstPageStatus = function () {
        self.currentPageIndexStatus(0);
    };

    self.lastPageStatus = function () {
        countStatus = parseInt(self.filterStatusList().length / self.pageSizeStatus(), 10);
        if ((self.filterStatusList().length % self.pageSizeStatus()) == 0)
            self.currentPageIndexStatus(countStatus - 1);
        else
            self.currentPageIndexStatus(countStatus);
    };

    self.sortTableStatus = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.StatusList.sort(function (left, right) {
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

        self.iconTypeStatus('');


        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshStatus').click(function () {
        Swal.fire({
            title: mes_Refresh,
                        text: translate("لیست وضعیت") + " " + translate("به روز رسانی شود ؟"),
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
                getStatusList();
                $("div.loadingZone").hide();
            }
        })
    })

    contentListStatus =
        '<tr>' +
        '    <td>موقت</td>' +
        '</tr>' +
        '<tr>' +
        '    <td>تایید</td>' +
        '</tr>';

    contentListStatus += ace == Web8 ? '<tr><td>تصویب</td></tr>' : ''

    $('#TableBodyListStatus').append(contentListStatus);

    self.AddStatus = function (item) {

        Status = item.Status;
        find = false;
        list_StatusSelect.forEach(function (item, key) {
            if (item == Status) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListStatus').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Status">' + item.Status + '</td > '
                + '</tr>'
            );
            list_StatusSelect[counterStatus] = item.Status;
            counterStatus = counterStatus + 1;
        }
    };


    self.AddAllStatus = function () {
        list_StatusSelect = new Array();
        list = self.StatusList();
        $("#TableBodyListStatus").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListStatus').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Status">' + list[i].Status + '</td > '
                + '</tr>'
            );
            list_StatusSelect[i] = list[i].Status;
            counterStatus = i + 1;
        }
    };


    self.DelAllStatus = function () {
        list_StatusSelect = new Array();
        counterStatus = 0;
        $("#TableBodyListStatus").empty();
    };


    $('#modal-Status').on('hide.bs.modal', function () {
        if (counterStatus > 0)
            $('#nameStatus').val(counterStatus +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameStatus').val(translate('همه موارد'));
    });

    $('#modal-Status').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });







    self.filterInvList = ko.computed(function () {

        self.currentPageIndexInv(0);
        var filter0 = self.filterInv0().toUpperCase();
        var filter1 = self.filterInv1();
        var filter2 = self.filterInv2();

        if (!filter0 && !filter1 && !filter2) {
            return self.InvList();
        } else {
            tempData = ko.utils.arrayFilter(self.InvList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageInv = ko.computed(function () {
        var pageSizeInv = parseInt(self.pageSizeInv(), 10),
            startIndex = pageSizeInv * self.currentPageIndexInv(),
            endIndex = startIndex + pageSizeInv;
        localStorage.setItem('pageSizeInv', pageSizeInv);
        return self.filterInvList().slice(startIndex, endIndex);
    });

    self.nextPageInv = function () {
        if (((self.currentPageIndexInv() + 1) * self.pageSizeInv()) < self.filterInvList().length) {
            self.currentPageIndexInv(self.currentPageIndexInv() + 1);
        }
    };

    self.previousPageInv = function () {
        if (self.currentPageIndexInv() > 0) {
            self.currentPageIndexInv(self.currentPageIndexInv() - 1);
        }
    };

    self.firstPageInv = function () {
        self.currentPageIndexInv(0);
    };

    self.lastPageInv = function () {
        countInv = parseInt(self.filterInvList().length / self.pageSizeInv(), 10);
        if ((self.filterInvList().length % self.pageSizeInv()) == 0)
            self.currentPageIndexInv(countInv - 1);
        else
            self.currentPageIndexInv(countInv);
    };

    self.sortTableInv = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.InvList.sort(function (left, right) {
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


        self.iconType((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }


    $('#refreshInv').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست انبارها") + " " + translate("به روز رسانی شود ؟"),
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
                getInvList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddInv = function (item) {

        InvCode = item.Code;
        find = false;
        list_InvSelect.forEach(function (item, key) {
            if (item == InvCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListInv').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_InvSelect[counterInv] = item.Code;
            list_InvNameSelect[counterInv] = item.Name;
            counterInv = counterInv + 1;
        }
    };


    self.AddAllInv = function () {
        list_InvSelect = new Array();
        list_InvNameSelect = new Array();
        list = self.InvList();
        $("#TableBodyListInv").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListInv').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_InvSelect[i] = list[i].Code;
            list_InvNameSelect[i] = list[i].Name;
            counterInv = i + 1;
        }
    };


    self.DelAllInv = function () {
        list_InvSelect = new Array();
        list_InvNameSelect = new Array();
        counterInv = 0;
        $("#TableBodyListInv").empty();
    };


    $('#modal-Inv').on('hide.bs.modal', function () {
        if (counterInv > 0)
            $('#nameInv').val(counterInv +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameInv').val(translate('همه موارد'));
    });

    $('#modal-Inv').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageKGru = ko.observable();
    pageSizeKGru = localStorage.getItem('pageSizeKGru') == null ? 10 : localStorage.getItem('pageSizeKGru');
    self.pageSizeKGru = ko.observable(pageSizeKGru);
    self.currentPageIndexKGru = ko.observable(0);

    self.filterKGru0 = ko.observable("");
    self.filterKGru1 = ko.observable("");
    self.filterKGru2 = ko.observable("");

    self.filterKGruList = ko.computed(function () {

        self.currentPageIndexKGru(0);
        var filter0 = self.filterKGru0().toUpperCase();
        var filter1 = self.filterKGru1();
        var filter2 = self.filterKGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.KGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.KGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKGru = ko.computed(function () {
        var pageSizeKGru = parseInt(self.pageSizeKGru(), 10),
            startIndex = pageSizeKGru * self.currentPageIndexKGru(),
            endIndex = startIndex + pageSizeKGru;
        localStorage.setItem('pageSizeKGru', pageSizeKGru);
        return self.filterKGruList().slice(startIndex, endIndex);
    });

    self.nextPageKGru = function () {
        if (((self.currentPageIndexKGru() + 1) * self.pageSizeKGru()) < self.filterKGruList().length) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() + 1);
        }
    };

    self.previousPageKGru = function () {
        if (self.currentPageIndexKGru() > 0) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() - 1);
        }
    };

    self.firstPageKGru = function () {
        self.currentPageIndexKGru(0);
    };

    self.lastPageKGru = function () {
        countKGru = parseInt(self.filterKGruList().length / self.pageSizeKGru(), 10);
        if ((self.filterKGruList().length % self.pageSizeKGru()) == 0)
            self.currentPageIndexKGru(countKGru - 1);
        else
            self.currentPageIndexKGru(countKGru);
    };

    self.sortTableKGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.KGruList.sort(function (left, right) {
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



    $('#refreshKGru').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست گروه کالا") + " " + translate("به روز رسانی شود ؟"),
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
                getKGruList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddKGru = function (item) {

        KGruCode = item.Code;
        find = false;
        list_KGruSelect.forEach(function (item, key) {
            if (item == KGruCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListKGru').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_KGruSelect[counterKGru] = item.Code;
            list_KGruNameSelect[counterKGru] = item.Name;
            counterKGru = counterKGru + 1;
        }
    };


    self.AddAllKGru = function () {
        list_KGruSelect = new Array();
        list_KGruNameSelect = new Array();
        list = self.KGruList();
        $("#TableBodyListKGru").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKGru').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_KGruSelect[i] = list[i].Code;
            list_KGruNameSelect[i] = list[i].Name;
            counterKGru = i + 1;
        }
    };


    self.DelAllKGru = function () {
        list_KGruSelect = new Array();
        list_KGruNameSelect = new Array();
        counterKGru = 0;
        $("#TableBodyListKGru").empty();
    };


    $('#modal-KGru').on('hide.bs.modal', function () {
        if (counterKGru > 0)
            $('#nameKGru').val(counterKGru +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameKGru').val(translate('همه موارد'));
    });

    $('#modal-KGru').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageKala = ko.observable();
    pageSizeKala = localStorage.getItem('pageSizeKala') == null ? 10 : localStorage.getItem('pageSizeKala');
    self.pageSizeKala = ko.observable(pageSizeKala);
    self.currentPageIndexKala = ko.observable(0);

    self.filterKala0 = ko.observable("");
    self.filterKala1 = ko.observable("");
    self.filterKala2 = ko.observable("");
    self.filterKala3 = ko.observable("");

    self.iconTypeFanniNo = ko.observable("");

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

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeFanniNo('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FanniNo') self.iconTypeFanniNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }


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
                $("div.loadingZone").show();
                getKalaList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddKala = function (item) {

        KalaCode = item.Code;
        find = false;
        list_KalaSelect.forEach(function (item, key) {
            if (item == KalaCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListKala').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                //+ ' <td data-bind="text: FanniNo">' + item.FanniNo + '</td > '
                + '</tr>'
            );
            list_KalaSelect[counterKala] = item.Code;
            list_KalaNameSelect[counterKala] = item.Name;
            counterKala = counterKala + 1;
        }
    };


    self.AddAllKala = function () {
        list_KalaSelect = new Array();
        list_KalaNameSelect = new Array();
        list = self.KalaList();
        $("#TableBodyListKala").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKala').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                //+ ' <td data-bind="text: FanniNo">' + list[i].FanniNo + '</td > '
                + '</tr>'
            );
            list_KalaSelect[i] = list[i].Code;
            list_KalaNameSelect[i] = list[i].Name;
            counterKala = i + 1;
        }
    };


    self.DelAllKala = function () {
        list_KalaSelect = new Array();
        list_KalaNameSelect = new Array();
        counterKala = 0;
        $("#TableBodyListKala").empty();
    };


    $('#modal-kala').on('hide.bs.modal', function () {
        if (counterKala > 0)
            $('#nameKala').val(counterKala +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameKala').val(translate('همه موارد'));
    });

    $('#modal-kala').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageCGru = ko.observable();
    pageSizeCGru = localStorage.getItem('pageSizeCGru') == null ? 10 : localStorage.getItem('pageSizeCGru');
    self.pageSizeCGru = ko.observable(pageSizeCGru);
    self.currentPageIndexCGru = ko.observable(0);

    self.filterCGru0 = ko.observable("");
    self.filterCGru1 = ko.observable("");
    self.filterCGru2 = ko.observable("");

    self.filterCGruList = ko.computed(function () {

        self.currentPageIndexCGru(0);
        var filter0 = self.filterCGru0().toUpperCase();
        var filter1 = self.filterCGru1();
        var filter2 = self.filterCGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.CGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.CGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCGru = ko.computed(function () {
        var pageSizeCGru = parseInt(self.pageSizeCGru(), 10),
            startIndex = pageSizeCGru * self.currentPageIndexCGru(),
            endIndex = startIndex + pageSizeCGru;
        localStorage.setItem('pageSizeCGru', pageSizeCGru);
        return self.filterCGruList().slice(startIndex, endIndex);
    });

    self.nextPageCGru = function () {
        if (((self.currentPageIndexCGru() + 1) * self.pageSizeCGru()) < self.filterCGruList().length) {
            self.currentPageIndexCGru(self.currentPageIndexCGru() + 1);
        }
    };

    self.previousPageCGru = function () {
        if (self.currentPageIndexCGru() > 0) {
            self.currentPageIndexCGru(self.currentPageIndexCGru() - 1);
        }
    };

    self.firstPageCGru = function () {
        self.currentPageIndexCGru(0);
    };

    self.lastPageCGru = function () {
        countCGru = parseInt(self.filterCGruList().length / self.pageSizeCGru(), 10);
        if ((self.filterCGruList().length % self.pageSizeCGru()) == 0)
            self.currentPageIndexCGru(countCGru - 1);
        else
            self.currentPageIndexCGru(countCGru);
    };

    self.sortTableCGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.CGruList.sort(function (left, right) {
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



    $('#refreshCGru').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست تحویل دهنده/گیرنده") + " " + translate("به روز رسانی شود ؟"),
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
                getCGruList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddCGru = function (item) {

        CGruCode = item.Code;
        find = false;
        list_CGruSelect.forEach(function (item, key) {
            if (item == CGruCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListCGru').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_CGruSelect[counterCGru] = item.Code;
            list_CGruNameSelect[counterCGru] = item.Name;
            counterCGru = counterCGru + 1;
        }
    };


    self.AddAllCGru = function () {
        list_CGruSelect = new Array();
        list_CGruNameSelect = new Array();
        list = self.CGruList();
        $("#TableBodyListCGru").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListCGru').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_CGruSelect[i] = list[i].Code;
            list_CGruNameSelect[i] = list[i].Name;
            counterCGru = i + 1;
        }
    };


    self.DelAllCGru = function () {
        list_CGruSelect = new Array();
        list_CGruNameSelect = new Array();
        counterCGru = 0;
        $("#TableBodyListCGru").empty();
    };


    $('#modal-CGru').on('hide.bs.modal', function () {
        if (counterCGru > 0)
            $('#nameCGru').val(counterCGru +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameCGru').val(translate('همه موارد'));
    });

    $('#modal-CGru').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });










    self.currentPageCust = ko.observable();
    pageSizeCust = localStorage.getItem('pageSizeCust') == null ? 10 : localStorage.getItem('pageSizeCust');
    self.pageSizeCust = ko.observable(pageSizeCust);
    self.currentPageIndexCust = ko.observable(0);

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
        if ((self.filterCustList().length % self.pageSizeCust()) == 0)
            self.currentPageIndexCust(countCust - 1);
        else
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

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshCust').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست تحویل دهنده/گیرنده") + " " + translate("به روز رسانی شود ؟"),
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
                getCustList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddCust = function (item) {

        CustCode = item.Code;
        find = false;
        list_CustSelect.forEach(function (item, key) {
            if (item == CustCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListCust').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_CustSelect[counterCust] = item.Code;
            list_CustNameSelect[counterCust] = item.Name;
            counterCust = counterCust + 1;
        }
    };


    self.AddAllCust = function () {
        list_CustSelect = new Array();
        list_CustNameSelect = new Array();
        list = self.CustList();
        $("#TableBodyListCust").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListCust').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_CustSelect[i] = list[i].Code;
            list_CustNameSelect[i] = list[i].Name;
            counterCust = i + 1;
        }
    };


    self.DelAllCust = function () {
        list_CustSelect = new Array();
        list_CustNameSelect = new Array();
        counterCust = 0;
        $("#TableBodyListCust").empty();
    };


    $('#modal-Cust').on('hide.bs.modal', function () {
        if (counterCust > 0)
            $('#nameCust').val(counterCust +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameCust').val(translate('همه موارد'));
    });

    $('#modal-Cust').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


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


    self.AddOpr = function (item) {

        OprCode = item.Code;
        find = false;
        list_OprSelect.forEach(function (item, key) {
            if (item == OprCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListOpr').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_OprSelect[counterOpr] = item.Code;
            list_OprNameSelect[counterOpr] = item.Name;
            counterOpr = counterOpr + 1;
        }
    };


    self.AddAllOpr = function () {
        list_OprSelect = new Array();
        list_OprNameSelect = new Array();
        list = self.OprList();
        $("#TableBodyListOpr").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListOpr').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_OprSelect[i] = list[i].Code;
            list_OprNameSelect[i] = list[i].Name;
            counterOpr = i + 1;
        }
    };


    self.DelAllOpr = function () {
        list_OprSelect = new Array();
        list_OprNameSelect = new Array();
        counterOpr = 0;
        $("#TableBodyListOpr").empty();
    };


    $('#modal-Opr').on('hide.bs.modal', function () {
        if (counterOpr > 0)
            $('#nameOpr').val(counterOpr +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameOpr').val(translate('همه موارد'));
    });

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


    self.AddMkz = function (item) {

        MkzCode = item.Code;
        find = false;
        list_MkzSelect.forEach(function (item, key) {
            if (item == MkzCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListMkz').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_MkzSelect[counterMkz] = item.Code;
            list_MkzNameSelect[counterMkz] = item.Name;
            counterMkz = counterMkz + 1;
        }
    };


    self.AddAllMkz = function () {
        list_MkzSelect = new Array();
        list_MkzNameSelect = new Array();
        list = self.MkzList();
        $("#TableBodyListMkz").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListMkz').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_MkzSelect[i] = list[i].Code;
            list_MkzNameSelect[i] = list[i].Name;
            counterMkz = i + 1;
        }
    };


    self.DelAllMkz = function () {
        list_MkzSelect = new Array();
        list_MkzNameSelect = new Array();
        counterMkz = 0;
        $("#TableBodyListMkz").empty();
    };


    $('#modal-Mkz').on('hide.bs.modal', function () {
        if (counterMkz > 0)
            $('#nameMkz').val(counterMkz +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameMkz').val(translate('همه موارد'));
    });

    $('#modal-Mkz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    $('.fix').attr('class', 'form-line date focused fix');


    self.ShowFDocR_P = function (Band) {
        SetFilter();
        localStorage.setItem("IsReport", "true");
        localStorage.setItem("AzTarikhReport", azTarikh);
        localStorage.setItem("TaTarikhReport", taTarikh);
        localStorage.setItem("ModeCodeReport", $("#modeCode").val());
        localStorage.setItem("ModeCode1Report", modeCode1);
        localStorage.setItem("ModeCode2Report", modeCode2);
        localStorage.setItem("InvCodeReport", invcode);
        localStorage.setItem("InvNameReport", invname);
        localStorage.setItem("KalaCodeReport", Band.KalaCode);
        localStorage.setItem("KalaNameReport", Band.KalaName);
        localStorage.setItem("KGruCodeReport", kGrucode);
        localStorage.setItem("KGruNameReport", kGruname);
        localStorage.setItem("CustCodeReport", Custcode);
        localStorage.setItem("CustNameReport", Custname);
        localStorage.setItem("MkzCodeReport", mkzcode);
        localStorage.setItem("MkzNameReport", mkzname);
        localStorage.setItem("OprCodeReport", oprcode);
        localStorage.setItem("OprNameReport", oprname);

        window.open(sessionStorage.urlFDocR_P, '_blank');
    }

    // $("#FDocR_P").hide();
    self.AccessAction = function (nameRprt) {
        if (nameRprt == "FDocR_P")
            return $("#FDocR_P").css("display") != "none"
    }

    self.radif = function (index) {
        countShow = self.pageSizeTrzFKala_P();
        page = self.currentPageIndexTrzFKala_P();
        calc = (countShow * page) + 1;
        return index + calc;
    }


    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTrzFKala_P">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('KalaCode', data) +
            CreateTableTh('KalaName', data) +
            CreateTableTh('KalaF01', data) +
            CreateTableTh('KalaF02', data) +
            CreateTableTh('KalaF03', data) +
            CreateTableTh('KalaF04', data) +
            CreateTableTh('KalaF05', data) +
            CreateTableTh('KalaF06', data) +
            CreateTableTh('KalaF07', data) +
            CreateTableTh('KalaF08', data) +
            CreateTableTh('KalaF09', data) +
            CreateTableTh('KalaF10', data) +
            CreateTableTh('KalaF11', data) +
            CreateTableTh('KalaF12', data) +
            CreateTableTh('KalaF13', data) +
            CreateTableTh('KalaF14', data) +
            CreateTableTh('KalaF15', data) +
            CreateTableTh('KalaF16', data) +
            CreateTableTh('KalaF17', data) +
            CreateTableTh('KalaF18', data) +
            CreateTableTh('KalaF19', data) +
            CreateTableTh('KalaF20', data) +
            CreateTableTh('KalaUnitName1', data) +
            CreateTableTh('Amount1', data) +
            CreateTableTh('UnitPrice1', data) +
            CreateTableTh('KalaUnitName2', data) +
            CreateTableTh('Amount2', data) +
            CreateTableTh('UnitPrice2', data) +
            CreateTableTh('KalaUnitName3', data) +
            CreateTableTh('Amount3', data) +
            CreateTableTh('UnitPrice3', data) +
            CreateTableTh('TotalPrice', data) +
            CreateTableTh('Discount', data) +
            CreateTableTh('AddMinPrice1', data) +
            CreateTableTh('AddMinPrice2', data) +
            CreateTableTh('AddMinPrice3', data) +
            CreateTableTh('AddMinPrice4', data) +
            CreateTableTh('AddMinPrice5', data) +
            CreateTableTh('AddMinPrice6', data) +
            CreateTableTh('AddMinPrice7', data) +
            CreateTableTh('AddMinPrice8', data) +
            CreateTableTh('AddMinPrice9', data) +
            CreateTableTh('AddMinPrice10', data) +
            CreateTableTh('OnlyDiscountPrice', data) +
            CreateTableTh('FinalPrice', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageTrzFKala_P" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('KalaCode', 0, 0, data) +
            CreateTableTd('KalaName', 0, 0, data) +
            CreateTableTd('KalaF01', 0, 0, data) +
            CreateTableTd('KalaF02', 0, 0, data) +
            CreateTableTd('KalaF03', 0, 0, data) +
            CreateTableTd('KalaF04', 0, 0, data) +
            CreateTableTd('KalaF05', 0, 0, data) +
            CreateTableTd('KalaF06', 0, 0, data) +
            CreateTableTd('KalaF07', 0, 0, data) +
            CreateTableTd('KalaF08', 0, 0, data) +
            CreateTableTd('KalaF09', 0, 0, data) +
            CreateTableTd('KalaF10', 0, 0, data) +
            CreateTableTd('KalaF11', 0, 0, data) +
            CreateTableTd('KalaF12', 0, 0, data) +
            CreateTableTd('KalaF13', 0, 0, data) +
            CreateTableTd('KalaF14', 0, 0, data) +
            CreateTableTd('KalaF15', 0, 0, data) +
            CreateTableTd('KalaF16', 0, 0, data) +
            CreateTableTd('KalaF17', 0, 0, data) +
            CreateTableTd('KalaF18', 0, 0, data) +
            CreateTableTd('KalaF19', 0, 0, data) +
            CreateTableTd('KalaF20', 0, 0, data) +
            CreateTableTd('KalaUnitName1', 0, 0, data) +
            CreateTableTd('Amount1', 'DeghatM1', 1, data) +
            CreateTableTd('UnitPrice1', 'DeghatR1', 2, data) +
            CreateTableTd('KalaUnitName2', 0, 0, data) +
            CreateTableTd('Amount2', 'DeghatM2', 1, data) +
            CreateTableTd('UnitPrice2', 'DeghatR2', 2, data) +
            CreateTableTd('KalaUnitName3', 0, 0, data) +
            CreateTableTd('Amount3', 'DeghatM3', 1, data) +
            CreateTableTd('UnitPrice3', 'DeghatR3', 2, data) +
            CreateTableTd('TotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('Discount', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice1', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice2', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice3', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice4', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice5', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice6', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice7', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice8', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice9', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AddMinPrice10', sessionStorage.Deghat, 2, data) +
            CreateTableTd('OnlyDiscountPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('FinalPrice', sessionStorage.Deghat, 2, data) +
            ' <td>' +
            ' <a  data-bind="visible: $root.AccessAction(\'FDocR_P\') == true" class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            ' </a>' +
            ' <ul class="dropdown-menu">' +
            '    <li>' +
            '    <a data-bind="click: $root.ShowFDocR_P" style="font-size: 11px;">' +
            '        <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" /> ريز گردش اسناد خرید' +
            '    </a >' +
            ' </td >' +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td style="background-color: #e37d228f !important;">جمع</td>' +
            CreateTableTdSum('KalaCode', 0, data) +
            CreateTableTdSum('KalaName', 1, data) +
            CreateTableTdSum('KalaF01', 1, data) +
            CreateTableTdSum('KalaF02', 1, data) +
            CreateTableTdSum('KalaF03', 1, data) +
            CreateTableTdSum('KalaF04', 1, data) +
            CreateTableTdSum('KalaF05', 1, data) +
            CreateTableTdSum('KalaF06', 1, data) +
            CreateTableTdSum('KalaF07', 1, data) +
            CreateTableTdSum('KalaF08', 1, data) +
            CreateTableTdSum('KalaF09', 1, data) +
            CreateTableTdSum('KalaF10', 1, data) +
            CreateTableTdSum('KalaF11', 1, data) +
            CreateTableTdSum('KalaF12', 1, data) +
            CreateTableTdSum('KalaF13', 1, data) +
            CreateTableTdSum('KalaF14', 1, data) +
            CreateTableTdSum('KalaF15', 1, data) +
            CreateTableTdSum('KalaF16', 1, data) +
            CreateTableTdSum('KalaF17', 1, data) +
            CreateTableTdSum('KalaF18', 1, data) +
            CreateTableTdSum('KalaF19', 1, data) +
            CreateTableTdSum('KalaF20', 1, data) +
            CreateTableTdSum('KalaUnitName1', 1, data) +
            CreateTableTdSum('Amount1', 2, data) +
            CreateTableTdSum('UnitPrice1', 2, data) +
            CreateTableTdSum('KalaUnitName2', 1, data) +
            CreateTableTdSum('Amount2', 2, data) +
            CreateTableTdSum('UnitPrice2', 2, data) +
            CreateTableTdSum('KalaUnitName3', 1, data) +
            CreateTableTdSum('Amount3', 2, data) +
            CreateTableTdSum('UnitPrice3', 2, data) +
            CreateTableTdSum('TotalPrice', 2, data) +
            CreateTableTdSum('Discount', 2, data) +
            CreateTableTdSum('AddMinPrice1', 2, data) +
            CreateTableTdSum('AddMinPrice2', 2, data) +
            CreateTableTdSum('AddMinPrice3', 2, data) +
            CreateTableTdSum('AddMinPrice4', 2, data) +
            CreateTableTdSum('AddMinPrice5', 2, data) +
            CreateTableTdSum('AddMinPrice6', 2, data) +
            CreateTableTdSum('AddMinPrice7', 2, data) +
            CreateTableTdSum('AddMinPrice8', 2, data) +
            CreateTableTdSum('AddMinPrice9', 2, data) +
            CreateTableTdSum('AddMinPrice10', 2, data) +
            CreateTableTdSum('OnlyDiscountPrice', 2, data) +
            CreateTableTdSum('FinalPrice', 2, data) +
            '<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('KalaCode', data) +
            CreateTableTdSearch('KalaName', data) +
            CreateTableTdSearch('KalaF01', data) +
            CreateTableTdSearch('KalaF02', data) +
            CreateTableTdSearch('KalaF03', data) +
            CreateTableTdSearch('KalaF04', data) +
            CreateTableTdSearch('KalaF05', data) +
            CreateTableTdSearch('KalaF06', data) +
            CreateTableTdSearch('KalaF07', data) +
            CreateTableTdSearch('KalaF08', data) +
            CreateTableTdSearch('KalaF09', data) +
            CreateTableTdSearch('KalaF10', data) +
            CreateTableTdSearch('KalaF11', data) +
            CreateTableTdSearch('KalaF12', data) +
            CreateTableTdSearch('KalaF13', data) +
            CreateTableTdSearch('KalaF14', data) +
            CreateTableTdSearch('KalaF15', data) +
            CreateTableTdSearch('KalaF16', data) +
            CreateTableTdSearch('KalaF17', data) +
            CreateTableTdSearch('KalaF18', data) +
            CreateTableTdSearch('KalaF19', data) +
            CreateTableTdSearch('KalaF20', data) +
            CreateTableTdSearch('KalaUnitName1', data) +
            CreateTableTdSearch('Amount1', data) +
            CreateTableTdSearch('UnitPrice1', data) +
            CreateTableTdSearch('KalaUnitName2', data) +
            CreateTableTdSearch('Amount2', data) +
            CreateTableTdSearch('UnitPrice2', data) +
            CreateTableTdSearch('KalaUnitName3', data) +
            CreateTableTdSearch('Amount3', data) +
            CreateTableTdSearch('UnitPrice3', data) +
            CreateTableTdSearch('TotalPrice', data) +
            CreateTableTdSearch('Discount', data) +
            CreateTableTdSearch('AddMinPrice1', data) +
            CreateTableTdSearch('AddMinPrice2', data) +
            CreateTableTdSearch('AddMinPrice3', data) +
            CreateTableTdSearch('AddMinPrice4', data) +
            CreateTableTdSearch('AddMinPrice5', data) +
            CreateTableTdSearch('AddMinPrice6', data) +
            CreateTableTdSearch('AddMinPrice7', data) +
            CreateTableTdSearch('AddMinPrice8', data) +
            CreateTableTdSearch('AddMinPrice9', data) +
            CreateTableTdSearch('AddMinPrice10', data) +
            CreateTableTdSearch('OnlyDiscountPrice', data) +
            CreateTableTdSearch('FinalPrice', data) +
            '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }

    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);
        sortField = field == 'DocNo' ? 'SortDocNo' : field
        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + sortField + '">' +
            '<span data-column="' + sortField + '">' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + sortField + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }"  data-column="' + sortField + '" ></i> </span> ' +
            '</th>';
        return text;
    }

    function CreateTableTd(field, Deghat, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\'" style="text-align: right;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSum(field, no, data) {
        text = '<td style="background-color: #e37d228f !important;"';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'id="textTotal"></td>';
                break;
            case 1:
                text += '></td>'
                break;
            case 2:
                text += 'id="total' + field + '" style="direction: ltr;"></td>'
                break;
        }
        return text;
    }

    self.SearchKeyDown = function (viewModel, e) {
        return KeyPressSearch(e);
    }

    function CreateTableTdSearch(field, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        type = FindTypeField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }" type="text" class="type_' + type;
        text += ' form-control" style="height: 2.4rem;direction: ltr;text-align: right;" /> </td>';
        return text;
    }

    createViewer();


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
        setReport(self.TrzFKala_PList(), data, printVariable);
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
        setReport(self.TrzFKala_PList(), '', printVariable);
    });


    $('#Print').click(function () {
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportTrzFKala_P";
        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
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
        setReport(self.TrzFKala_PList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


};

ko.applyBindings(new ViewModel());

