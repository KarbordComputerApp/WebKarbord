var ViewModel = function () {
    var self = this;


    self.InvList = ko.observableArray([]); // لیست انبارها
    self.KalaList = ko.observableArray([]); // لیست کالاها
    self.CustList = ko.observableArray([]); // لیست مشتریان 
    self.CGruList = ko.observableArray([]); // لیست  گروه مشتریان 
    self.KGruList = ko.observableArray([]); // لیست گروه کالاها
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.FModeList = ko.observableArray([]); // لیست نوع فاکتور ها
    self.StatusList = ko.observableArray([]); // لیست نوع سند ها


    self.TrzFCust_PList = ko.observableArray([]); // لیست گزارش  

    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس مشتریان
    var CGruUri = server + '/api/Web_Data/CGru/'; // آدرس گروه مشتریان
    var KGruUri = server + '/api/Web_Data/KGru/'; // آدرس گروه کالا
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var FModeUri = server + '/api/FDocData/FMode/'; // آدرس نوع فاکتور ها 
    //var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 

    var TrzFCust_PUri = server + '/api/ReportFct/TrzFCust/'; // آدرس گزارش 

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    TestUser();


    getParamFct();

    self.AzDate = ko.observable(sessionStorage.BeginDateFct);
    self.TaDate = ko.observable(sessionStorage.EndDateFct);

    salFct = localStorage.getItem("SalFct");
    if (salFct != '' && salFct != null)
        sal = salFct;



    localStorage.setItem("SalFct", sal);

    for (var i = 0; i < salMaliList.length; i++) {
        $("#DropSalFct").append('<option  value="'
            + salMaliList[i].Code + '">'
            + salMaliList[i].Name + '</option>');
        $("#DropSalFct").val(sal);

    }

    $('#DropSalFct').change(function () {
        sal = $('#DropSalFct').val();
        getParamFct();
        localStorage.setItem("SalFct", sal);
        self.AzDate = ko.observable(sessionStorage.BeginDateFct);
        self.TaDate = ko.observable(sessionStorage.EndDateFct);
        $('#aztarikh').val(sessionStorage.BeginDateFct);
        $('#tatarikh').val(sessionStorage.EndDateFct);
    });



    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();


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





    $("#textTotal").text('');


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'TrzFCust_P';
    var columns = [
        'CustCode',
        'CustName',
        'CustF01',
        'CustF02',
        'CustF03',
        'CustF04',
        'CustF05',
        'CustF06',
        'CustF07',
        'CustF08',
        'CustF09',
        'CustF10',
        'CustF11',
        'CustF12',
        'CustF13',
        'CustF14',
        'CustF15',
        'CustF16',
        'CustF17',
        'CustF18',
        'CustF19',
        'CustF20',
        'Amount1',
        'Amount2',
        'Amount3',
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
        'AccBede',
        'AccBest',
        'AccMon'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting) {
        cols = getRprtCols(rprtId, sessionStorage.userName);
        ListColumns = cols;
        if (FlagSetting) {
            CreateTableReport(cols)
        }
        else {
            CreateTableColumn(columns);
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, cols);
            }
        }
        /*   ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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
        });*/

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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/TrzFCust_P", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/TrzFCust_P", columns, self.SettingColumnList());
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
            opt.value = SearchMode(translate('فاکتور خرید'), self.FModeList()) + '*' + SearchMode(translate('برگشت از خرید'), self.FModeList());
            opt.innerHTML = translate('فاکتور خرید با احتساب برگشتی');
            opt.selected = true;
            select.appendChild(opt);
        });
    }


    //Get  FMode List
    function getZeroList() {
        select = document.getElementById('zeroValue');

        opt = document.createElement('option');
        opt.value = '0';
        opt.innerHTML = translate('نمایش مانده های صفر');
        opt.selected = true;
        select.appendChild(opt);

        opt = document.createElement('option');
        opt.value = '1';
        opt.innerHTML = translate('عدم نمایش مانده های صفر');
        select.appendChild(opt);
    }




    //Get kala List
    function getKalaList() {
        whereKala = localStorage.getItem('whereKala');
        var KalaObject = {
            withimage: false,
            updatedate: null,
            Mode: 0,
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
        whereCust = localStorage.getItem('whereCust');
        var CustObject = {
            forSale: null,
            updatedate: null,
            Mode: 0,
            UserCode: sessionStorage.userName,
            Where: whereCust,
            CustCode: '' 
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
    //Get CGru List
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
    //Get TrzFCust_P



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


    function getTrzFCust_P() {
        SetFilter();
        var TrzFCust_PObject = {
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
        ajaxFunction(TrzFCust_PUri + ace + '/' + sal + '/' + group, 'POST', TrzFCust_PObject, true).done(function (response) {
            self.TrzFCust_PList(response);
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
        totalDiscount = 0;
        totalOnlyDiscountPrice = 0;
        totalFinalPrice = 0;
        totalTotalPrice = 0;

        totalAccBede = 0;
        totalAccBest = 0;

        for (var i = 0; i < list.length; ++i) {
            TrzFCust_PData = list[i];
            totalAmount1 += TrzFCust_PData.Amount1;
            totalAmount2 += TrzFCust_PData.Amount2;
            totalAmount3 += TrzFCust_PData.Amount3;

            totalAddMinPrice1 += TrzFCust_PData.AddMinPrice1;
            totalAddMinPrice2 += TrzFCust_PData.AddMinPrice2;
            totalAddMinPrice3 += TrzFCust_PData.AddMinPrice3;
            totalAddMinPrice4 += TrzFCust_PData.AddMinPrice4;
            totalAddMinPrice5 += TrzFCust_PData.AddMinPrice5;
            totalAddMinPrice6 += TrzFCust_PData.AddMinPrice6;
            totalAddMinPrice7 += TrzFCust_PData.AddMinPrice7;
            totalAddMinPrice8 += TrzFCust_PData.AddMinPrice8;
            totalAddMinPrice9 += TrzFCust_PData.AddMinPrice9;
            totalAddMinPrice10 += TrzFCust_PData.AddMinPrice10;

            totalDiscount += TrzFCust_PData.Discount;
            totalOnlyDiscountPrice += TrzFCust_PData.OnlyDiscountPrice;
            totalFinalPrice += TrzFCust_PData.FinalPrice;
            totalTotalPrice += TrzFCust_PData.TotalPrice;

            totalAccBede += TrzFCust_PData.AccBede;
            totalAccBest += TrzFCust_PData.AccBest;
        }

        //$("#textTotal").text('جمع');
        $("#totalAmount1").text(NumberToNumberString(totalAmount1));
        $("#totalAmount2").text(NumberToNumberString(totalAmount2));
        $("#totalAmount3").text(NumberToNumberString(totalAmount3));
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
        $("#totalDiscount").text(NumberToNumberString(totalDiscount.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalOnlyDiscountPrice").text(NumberToNumberString(totalOnlyDiscountPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalFinalPrice").text(NumberToNumberString(totalFinalPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalTotalPrice").text(NumberToNumberString(totalTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAccBede").text(NumberToNumberString(totalAccBede.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalAccBest").text(NumberToNumberString(totalAccBest.toFixed(parseInt(sessionStorage.Deghat))));

    }


    $("#CreateReport").click(function () {
        getTrzFCust_P();
        self.sortTableTrzFCust_P();
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

    self.currentPageTrzFCust_P = ko.observable();
    pageSizeTrzFCust_P = localStorage.getItem('pageSizeTrzFCust_P') == null ? 10 : localStorage.getItem('pageSizeTrzFCust_P');
    self.pageSizeTrzFCust_P = ko.observable(pageSizeTrzFCust_P);
    self.currentPageIndexTrzFCust_P = ko.observable(0);
    self.iconType = ko.observable("");

    self.filterCustCode = ko.observable("");
    self.filterCustName = ko.observable("");
    self.filterCustF01 = ko.observable("");
    self.filterCustF02 = ko.observable("");
    self.filterCustF03 = ko.observable("");
    self.filterCustF04 = ko.observable("");
    self.filterCustF05 = ko.observable("");
    self.filterCustF06 = ko.observable("");
    self.filterCustF07 = ko.observable("");
    self.filterCustF08 = ko.observable("");
    self.filterCustF09 = ko.observable("");
    self.filterCustF10 = ko.observable("");
    self.filterCustF11 = ko.observable("");
    self.filterCustF12 = ko.observable("");
    self.filterCustF13 = ko.observable("");
    self.filterCustF14 = ko.observable("");
    self.filterCustF15 = ko.observable("");
    self.filterCustF16 = ko.observable("");
    self.filterCustF17 = ko.observable("");
    self.filterCustF18 = ko.observable("");
    self.filterCustF19 = ko.observable("");
    self.filterCustF20 = ko.observable("");
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
    self.filterDiscount = ko.observable("");
    self.filterOnlyDiscountPrice = ko.observable("");
    self.filterFinalPrice = ko.observable("");
    self.filterTotalPrice = ko.observable("");
    self.filterAccBede = ko.observable("");
    self.filterAccBest = ko.observable("");
    self.filterAccMon = ko.observable("");



    self.filterTrzFCust_PList = ko.computed(function () {
        self.currentPageIndexTrzFCust_P(0);
        var filterCustCode = self.filterCustCode();
        var filterCustName = self.filterCustName();
        var filterCustF01 = self.filterCustF01();
        var filterCustF02 = self.filterCustF02();
        var filterCustF03 = self.filterCustF03();
        var filterCustF04 = self.filterCustF04();
        var filterCustF05 = self.filterCustF05();
        var filterCustF06 = self.filterCustF06();
        var filterCustF07 = self.filterCustF07();
        var filterCustF08 = self.filterCustF08();
        var filterCustF09 = self.filterCustF09();
        var filterCustF10 = self.filterCustF10();
        var filterCustF11 = self.filterCustF11();
        var filterCustF12 = self.filterCustF12();
        var filterCustF13 = self.filterCustF13();
        var filterCustF14 = self.filterCustF14();
        var filterCustF15 = self.filterCustF15();
        var filterCustF16 = self.filterCustF16();
        var filterCustF17 = self.filterCustF17();
        var filterCustF18 = self.filterCustF18();
        var filterCustF19 = self.filterCustF19();
        var filterCustF20 = self.filterCustF20();
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
        var filterDiscount = self.filterDiscount();
        var filterOnlyDiscountPrice = self.filterOnlyDiscountPrice();
        var filterFinalPrice = self.filterFinalPrice();
        var filterTotalPrice = self.filterTotalPrice();
        var filterAccBede = self.filterAccBede();
        var filterAccBest = self.filterAccBest();
        var filterAccMon = self.filterAccMon();


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
        filterDiscount = filterDiscount.replace("/", ".");
        filterOnlyDiscountPrice = filterOnlyDiscountPrice.replace("/", ".");
        filterFinalPrice = filterFinalPrice.replace("/", ".");
        filterTotalPrice = filterTotalPrice.replace("/", ".");
        filterAccBede = filterAccBede.replace("/", ".");
        filterAccBest = filterAccBest.replace("/", ".");
        filterAccMon = filterAccMon.replace("/", ".");



        tempData = ko.utils.arrayFilter(self.TrzFCust_PList(), function (item) {
            result =
                (item.CustCode == null ? '' : item.CustCode.toString().search(filterCustCode) >= 0) &&
                (item.CustName == null ? '' : item.CustName.toString().search(filterCustName) >= 0) &&
                (item.CustF01 == null ? '' : item.CustF01.toString().search(filterCustF01) >= 0) &&
                (item.CustF02 == null ? '' : item.CustF02.toString().search(filterCustF02) >= 0) &&
                (item.CustF03 == null ? '' : item.CustF03.toString().search(filterCustF03) >= 0) &&
                (item.CustF04 == null ? '' : item.CustF04.toString().search(filterCustF04) >= 0) &&
                (item.CustF05 == null ? '' : item.CustF05.toString().search(filterCustF05) >= 0) &&
                (item.CustF06 == null ? '' : item.CustF06.toString().search(filterCustF06) >= 0) &&
                (item.CustF07 == null ? '' : item.CustF07.toString().search(filterCustF07) >= 0) &&
                (item.CustF08 == null ? '' : item.CustF08.toString().search(filterCustF08) >= 0) &&
                (item.CustF09 == null ? '' : item.CustF09.toString().search(filterCustF09) >= 0) &&
                (item.CustF10 == null ? '' : item.CustF10.toString().search(filterCustF10) >= 0) &&
                (item.CustF11 == null ? '' : item.CustF11.toString().search(filterCustF11) >= 0) &&
                (item.CustF12 == null ? '' : item.CustF12.toString().search(filterCustF12) >= 0) &&
                (item.CustF13 == null ? '' : item.CustF13.toString().search(filterCustF13) >= 0) &&
                (item.CustF14 == null ? '' : item.CustF14.toString().search(filterCustF14) >= 0) &&
                (item.CustF15 == null ? '' : item.CustF15.toString().search(filterCustF15) >= 0) &&
                (item.CustF16 == null ? '' : item.CustF16.toString().search(filterCustF16) >= 0) &&
                (item.CustF17 == null ? '' : item.CustF17.toString().search(filterCustF17) >= 0) &&
                (item.CustF18 == null ? '' : item.CustF18.toString().search(filterCustF18) >= 0) &&
                (item.CustF19 == null ? '' : item.CustF19.toString().search(filterCustF19) >= 0) &&
                (item.CustF20 == null ? '' : item.CustF20.toString().search(filterCustF20) >= 0) &&
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
                ko.utils.stringStartsWith(item.Discount.toString().toLowerCase(), filterDiscount) &&
                ko.utils.stringStartsWith(item.OnlyDiscountPrice.toString().toLowerCase(), filterOnlyDiscountPrice) &&
                ko.utils.stringStartsWith(item.FinalPrice.toString().toLowerCase(), filterFinalPrice) &&
                ko.utils.stringStartsWith(item.TotalPrice.toString().toLowerCase(), filterTotalPrice) &&
                ko.utils.stringStartsWith(item.AccBede.toString().toLowerCase(), filterAccBede) &&
                ko.utils.stringStartsWith(item.AccBest.toString().toLowerCase(), filterAccBest) &&
                ko.utils.stringStartsWith(item.AccMon.toString().toLowerCase(), filterAccMon)
            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzFCust_P);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzFCust_P = 0;
        sessionStorage.searchTrzFCust_P = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzFCust_P(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzFCust_PList(), function (item) {
                indexTrzFCust_P += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzFCust_P < self.pageSizeTrzFCust_P())
                self.currentPageIndexTrzFCust_P(0);
            else {
                var a = Math.round((indexTrzFCust_P / self.pageSizeTrzFCust_P()), 0);
                if (a < (indexTrzFCust_P / self.pageSizeTrzFCust_P())) a += 1;
                self.currentPageIndexTrzFCust_P(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzFCust_P = ko.computed(function () {
        var pageSizeTrzFCust_P = parseInt(self.pageSizeTrzFCust_P(), 10),
            startIndex = pageSizeTrzFCust_P * self.currentPageIndexTrzFCust_P(),
            endIndex = startIndex + pageSizeTrzFCust_P;
        localStorage.setItem('pageSizeTrzFCust_P', pageSizeTrzFCust_P);
        return self.filterTrzFCust_PList().slice(startIndex, endIndex);
    });

    self.nextPageTrzFCust_P = function () {
        if (((self.currentPageIndexTrzFCust_P() + 1) * self.pageSizeTrzFCust_P()) < self.filterTrzFCust_PList().length) {
            self.currentPageIndexTrzFCust_P(self.currentPageIndexTrzFCust_P() + 1);
        }
    };

    self.previousPageTrzFCust_P = function () {
        if (self.currentPageIndexTrzFCust_P() > 0) {
            self.currentPageIndexTrzFCust_P(self.currentPageIndexTrzFCust_P() - 1);
        }
    };

    self.firstPageTrzFCust_P = function () {
        self.currentPageIndexTrzFCust_P(0);
    };


    self.lastPageTrzFCust_P = function () {
        tempCountTrzFCust_P = parseInt(self.filterTrzFCust_PList().length / self.pageSizeTrzFCust_P(), 10);
        if ((self.filterTrzFCust_PList().length % self.pageSizeTrzFCust_P()) == 0)
            self.currentPageIndexTrzFCust_P(tempCountTrzFCust_P - 1);
        else
            self.currentPageIndexTrzFCust_P(tempCountTrzFCust_P);
    };


    self.iconTypeCustCode = ko.observable("");
    self.iconTypeCustName = ko.observable("");
    self.iconTypeCustF01 = ko.observable("");
    self.iconTypeCustF01 = ko.observable("");
    self.iconTypeCustF02 = ko.observable("");
    self.iconTypeCustF03 = ko.observable("");
    self.iconTypeCustF04 = ko.observable("");
    self.iconTypeCustF05 = ko.observable("");
    self.iconTypeCustF06 = ko.observable("");
    self.iconTypeCustF07 = ko.observable("");
    self.iconTypeCustF08 = ko.observable("");
    self.iconTypeCustF09 = ko.observable("");
    self.iconTypeCustF10 = ko.observable("");
    self.iconTypeCustF11 = ko.observable("");
    self.iconTypeCustF12 = ko.observable("");
    self.iconTypeCustF13 = ko.observable("");
    self.iconTypeCustF14 = ko.observable("");
    self.iconTypeCustF15 = ko.observable("");
    self.iconTypeCustF16 = ko.observable("");
    self.iconTypeCustF17 = ko.observable("");
    self.iconTypeCustF18 = ko.observable("");
    self.iconTypeCustF19 = ko.observable("");
    self.iconTypeCustF20 = ko.observable("");
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
    self.iconTypeDiscount = ko.observable("");
    self.iconTypeOnlyDiscountPrice = ko.observable("");
    self.iconTypeFinalPrice = ko.observable("");
    self.iconTypeTotalPrice = ko.observable("");
    self.iconTypeAccBede = ko.observable("");
    self.iconTypeAccBest = ko.observable("");
    self.iconTypeAccMon = ko.observable("");


    self.sortTableTrzFCust_P = function (viewModel, e) {
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
        self.TrzFCust_PList.sort(function (left, right) {
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


        self.iconTypeCustCode('');
        self.iconTypeCustName('');
        self.iconTypeCustF01('');
        self.iconTypeCustF01('');
        self.iconTypeCustF02('');
        self.iconTypeCustF03('');
        self.iconTypeCustF04('');
        self.iconTypeCustF05('');
        self.iconTypeCustF06('');
        self.iconTypeCustF07('');
        self.iconTypeCustF08('');
        self.iconTypeCustF09('');
        self.iconTypeCustF10('');
        self.iconTypeCustF11('');
        self.iconTypeCustF12('');
        self.iconTypeCustF13('');
        self.iconTypeCustF14('');
        self.iconTypeCustF15('');
        self.iconTypeCustF16('');
        self.iconTypeCustF17('');
        self.iconTypeCustF18('');
        self.iconTypeCustF19('');
        self.iconTypeCustF20('');
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
        self.iconTypeDiscount('');
        self.iconTypeOnlyDiscountPrice('');
        self.iconTypeFinalPrice('');
        self.iconTypeTotalPrice('');
        self.iconTypeAccBede('');
        self.iconTypeAccBest('');
        self.iconTypeAccMon('');


        if (orderProp == 'CustCode') self.iconTypeCustCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF01') self.iconTypeCustF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF02') self.iconTypeCustF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF03') self.iconTypeCustF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF04') self.iconTypeCustF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF05') self.iconTypeCustF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF06') self.iconTypeCustF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF07') self.iconTypeCustF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF08') self.iconTypeCustF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF09') self.iconTypeCustF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF10') self.iconTypeCustF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF11') self.iconTypeCustF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF12') self.iconTypeCustF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF13') self.iconTypeCustF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF14') self.iconTypeCustF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF15') self.iconTypeCustF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF16') self.iconTypeCustF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF17') self.iconTypeCustF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF18') self.iconTypeCustF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF19') self.iconTypeCustF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF20') self.iconTypeCustF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
        if (orderProp == 'Discount') self.iconTypeDiscount((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OnlyDiscountPrice') self.iconTypeOnlyDiscountPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FinalPrice') self.iconTypeFinalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TotalPrice') self.iconTypeTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccBede') self.iconTypeAccBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccBest') self.iconTypeAccBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccMon') self.iconTypeAccMon((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");



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


    $('#refreshStatus').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست وضعیت سند") + " " + translate("به روز رسانی شود ؟"),
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
            endIndex = startIndex + pageSizeInv;
        localStorage.setItem('pageSizeInv', pageSizeInv);
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


    $('#refreshKGru').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست گروه های کالا") + " " + translate("به روز رسانی شود ؟"),
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
                //  + ' <td data-bind="text: FanniNo">' + item.FanniNo + '</td > '
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
                //  + ' <td data-bind="text: FanniNo">' + list[i].FanniNo + '</td > '
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


    $('#refreshCGru').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست گروه فروشندگان") + " " + translate("به روز رسانی شود ؟"),
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


    $('#refreshCust').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست فروشندگان") + " " + translate("به روز رسانی شود ؟"),
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
        if (Band.CustCode == "") {
            return showNotification("به دلیل ثبت نشدن فروشنده امکان نمایش وجود ندارد", 0)
        }

        SetFilter();
        localStorage.setItem("IsReport", "true");
        localStorage.setItem("AzTarikhReport", azTarikh);
        localStorage.setItem("TaTarikhReport", taTarikh);
        localStorage.setItem("ModeCodeReport", $("#modeCode").val());
        localStorage.setItem("ModeCode1Report", modeCode1);
        localStorage.setItem("ModeCode2Report", modeCode2);
        localStorage.setItem("InvCodeReport", invcode);
        localStorage.setItem("InvNameReport", invname);
        localStorage.setItem("KalaCodeReport", kalacode);
        localStorage.setItem("KalaNameReport", kalaname);
        localStorage.setItem("KGruCodeReport", kGrucode);
        localStorage.setItem("KGruNameReport", kGruname);
        localStorage.setItem("CustCodeReport", Band.CustCode);
        localStorage.setItem("CustNameReport", Band.CustName);
        localStorage.setItem("MkzCodeReport", mkzcode);
        localStorage.setItem("MkzNameReport", mkzname);
        localStorage.setItem("OprCodeReport", oprcode);
        localStorage.setItem("OprNameReport", oprname);
        window.open(sessionStorage.urlFDocR_P, '_blank');
    }

    //$("#FDocR_P").hide();
    self.AccessAction = function (nameRprt) {
        if (nameRprt == "FDocR_P")
            return $("#FDocR_P").css("display") != "none"
    }

    self.radif = function (index) {
        countShow = self.pageSizeTrzFCust_P();
        page = self.currentPageIndexTrzFCust_P();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTrzFCust_P">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('CustCode', data) +
            CreateTableTh('CustName', data) +
            CreateTableTh('CustF01', data) +
            CreateTableTh('CustF02', data) +
            CreateTableTh('CustF03', data) +
            CreateTableTh('CustF04', data) +
            CreateTableTh('CustF05', data) +
            CreateTableTh('CustF06', data) +
            CreateTableTh('CustF07', data) +
            CreateTableTh('CustF08', data) +
            CreateTableTh('CustF09', data) +
            CreateTableTh('CustF10', data) +
            CreateTableTh('CustF11', data) +
            CreateTableTh('CustF12', data) +
            CreateTableTh('CustF13', data) +
            CreateTableTh('CustF14', data) +
            CreateTableTh('CustF15', data) +
            CreateTableTh('CustF16', data) +
            CreateTableTh('CustF17', data) +
            CreateTableTh('CustF18', data) +
            CreateTableTh('CustF19', data) +
            CreateTableTh('CustF20', data) +
            CreateTableTh('Amount1', data) +
            CreateTableTh('Amount2', data) +
            CreateTableTh('Amount3', data) +
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
            CreateTableTh('AccBede', data) +
            CreateTableTh('AccBest', data) +
            CreateTableTh('AccMon', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageTrzFCust_P" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('CustCode', 0, 0, data) +
            CreateTableTd('CustName', 0, 0, data) +
            CreateTableTd('CustF01', 0, 0, data) +
            CreateTableTd('CustF02', 0, 0, data) +
            CreateTableTd('CustF03', 0, 0, data) +
            CreateTableTd('CustF04', 0, 0, data) +
            CreateTableTd('CustF05', 0, 0, data) +
            CreateTableTd('CustF06', 0, 0, data) +
            CreateTableTd('CustF07', 0, 0, data) +
            CreateTableTd('CustF08', 0, 0, data) +
            CreateTableTd('CustF09', 0, 0, data) +
            CreateTableTd('CustF10', 0, 0, data) +
            CreateTableTd('CustF11', 0, 0, data) +
            CreateTableTd('CustF12', 0, 0, data) +
            CreateTableTd('CustF13', 0, 0, data) +
            CreateTableTd('CustF14', 0, 0, data) +
            CreateTableTd('CustF15', 0, 0, data) +
            CreateTableTd('CustF16', 0, 0, data) +
            CreateTableTd('CustF17', 0, 0, data) +
            CreateTableTd('CustF18', 0, 0, data) +
            CreateTableTd('CustF19', 0, 0, data) +
            CreateTableTd('CustF20', 0, 0, data) +
            CreateTableTd('Amount1', 'DeghatM1', 1, data) +
            CreateTableTd('Amount2', 'DeghatM2', 1, data) +
            CreateTableTd('Amount3', 'DeghatM3', 1, data) +
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
            CreateTableTd('AccBede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AccBest', sessionStorage.Deghat, 2, data) +
            CreateTableTd('AccMon', sessionStorage.Deghat, 2, data) +

            ' <td>' +
            ' <a  data-bind="visible: $root.AccessAction(\'FDocR_P\') == true" class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            ' </a>' +
            ' <ul class="dropdown-menu">' +
            '    <li>' +
            '    <a data-bind="click: $root.ShowFDocR_P" style="font-size: 11px;">' +
            '        <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" /> ' + translate('ریز گردش اسناد خرید') +
            '    </a >' +
            ' </td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td style="background-color: #e37d228f !important;">' + translate('جمع') + '</td>' +
            CreateTableTdSum('CustCode', 0, data) +
            CreateTableTdSum('CustName', 1, data) +
            CreateTableTdSum('CustF01', 1, data) +
            CreateTableTdSum('CustF02', 1, data) +
            CreateTableTdSum('CustF03', 1, data) +
            CreateTableTdSum('CustF04', 1, data) +
            CreateTableTdSum('CustF05', 1, data) +
            CreateTableTdSum('CustF06', 1, data) +
            CreateTableTdSum('CustF07', 1, data) +
            CreateTableTdSum('CustF08', 1, data) +
            CreateTableTdSum('CustF09', 1, data) +
            CreateTableTdSum('CustF10', 1, data) +
            CreateTableTdSum('CustF11', 1, data) +
            CreateTableTdSum('CustF12', 1, data) +
            CreateTableTdSum('CustF13', 1, data) +
            CreateTableTdSum('CustF14', 1, data) +
            CreateTableTdSum('CustF15', 1, data) +
            CreateTableTdSum('CustF16', 1, data) +
            CreateTableTdSum('CustF17', 1, data) +
            CreateTableTdSum('CustF18', 1, data) +
            CreateTableTdSum('CustF19', 1, data) +
            CreateTableTdSum('CustF20', 1, data) +
            CreateTableTdSum('Amount1', 2, data) +
            CreateTableTdSum('Amount2', 2, data) +
            CreateTableTdSum('Amount3', 2, data) +
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
            CreateTableTdSum('AccBede', 2, data) +
            CreateTableTdSum('AccBest', 2, data) +
            CreateTableTdSum('AccMon', 2, data) +
            '<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('CustCode', data) +
            CreateTableTdSearch('CustName', data) +
            CreateTableTdSearch('CustF01', data) +
            CreateTableTdSearch('CustF02', data) +
            CreateTableTdSearch('CustF03', data) +
            CreateTableTdSearch('CustF04', data) +
            CreateTableTdSearch('CustF05', data) +
            CreateTableTdSearch('CustF06', data) +
            CreateTableTdSearch('CustF07', data) +
            CreateTableTdSearch('CustF08', data) +
            CreateTableTdSearch('CustF09', data) +
            CreateTableTdSearch('CustF10', data) +
            CreateTableTdSearch('CustF11', data) +
            CreateTableTdSearch('CustF12', data) +
            CreateTableTdSearch('CustF13', data) +
            CreateTableTdSearch('CustF14', data) +
            CreateTableTdSearch('CustF15', data) +
            CreateTableTdSearch('CustF16', data) +
            CreateTableTdSearch('CustF17', data) +
            CreateTableTdSearch('CustF18', data) +
            CreateTableTdSearch('CustF19', data) +
            CreateTableTdSearch('CustF20', data) +
            CreateTableTdSearch('Amount1', data) +
            CreateTableTdSearch('Amount2', data) +
            CreateTableTdSearch('Amount3', data) +
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
            CreateTableTdSearch('AccBede', data) +
            CreateTableTdSearch('AccBest', data) +
            CreateTableTdSearch('AccMon', data) +
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
            '    <i data-bind="attr: { class: iconType' + field + ' }" data-column="' + sortField + '" ></i> </span> ' +
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
                text = '<td style="background-color: #e37d228f !important; direction: ltr;" id="total' + field + '"></td>'
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
        setReport(self.TrzFCust_PList(), data, printVariable);
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
        setReport(self.TrzFCust_PList(), '', printVariable);
    });


    $('#Print').click(function () {
        createViewer();
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        status_R = "";
        if (list_StatusSelect.length == 0)
            status_R = "همه موارد";
        else {
            for (var i = 0; i < list_StatusSelect.length; i++) {
                if (i < list_StatusSelect.length - 1)
                    status_R += list_StatusSelect[i] + '-';
                else
                    status_R += list_StatusSelect[i];
            }
        }

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';
        printVariable += '"Status":"' + status_R + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportTrzFCust_P";
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
        setReport(self.TrzFCust_PList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });

    self.PageIndexCust = function (item) {
        return CountPage(self.filterCustList(), self.pageSizeCust(), item);
    };

    self.PageIndexCGru = function (item) {
        return CountPage(self.filterCGruList(), self.pageSizeCGru(), item);
    };


    self.PageIndexKala = function (item) {
        return CountPage(self.filterKalaList(), self.pageSizeKala(), item);
    };

    self.PageIndexKGru = function (item) {
        return CountPage(self.filterKGruList(), self.pageSizeKGru(), item);
    };

    self.PageIndexMkz = function (item) {
        return CountPage(self.filterMkzList(), self.pageSizeMkz(), item);
    };

    self.PageIndexOpr = function (item) {
        return CountPage(self.filterOprList(), self.pageSizeOpr(), item);
    };


    self.PageIndexStatus = function (item) {
        return CountPage(self.filterStatusList(), self.pageSizeStatus(), item);
    };

    self.PageIndexInv = function (item) {
        return CountPage(self.filterInvList(), self.pageSizeInv(), item);
    };

    self.PageIndexPrintForms = function (item) {
        return CountPage(self.filterPrintFormsList(), self.pageSizePrintForms(), item);
    };

    self.PageIndexTrzFCust_P = function (item) {
        return CountPage(self.filterTrzFCust_PList(), self.pageSizeTrzFCust_P(), item);
    };
};

ko.applyBindings(new ViewModel());

