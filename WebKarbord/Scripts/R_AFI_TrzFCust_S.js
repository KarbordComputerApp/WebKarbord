var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");


    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.KalaList = ko.observableArray([]); // ليست کالا ها
    self.CustList = ko.observableArray([]); // ليست مشتریان 
    self.CGruList = ko.observableArray([]); // ليست  گروه مشتریان 
    self.KGruList = ko.observableArray([]); // ليست گروه کالا ها
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.FModeList = ko.observableArray([]); // لیست نوع فاکتور ها
    self.StatusList = ko.observableArray([]); // ليست نوع سند ها


    self.TrzFCust_SList = ko.observableArray([]); // لیست گزارش  

    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالا ها
    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس مشتریان
    var CGruUri = server + '/api/Web_Data/CGru/'; // آدرس گروه مشتریان
    var KGruUri = server + '/api/Web_Data/KGru/'; // آدرس گروه کالا
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var FModeUri = server + '/api/FDocData/FMode/'; // آدرس نوع فاکتور ها 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 

    var TrzFCust_SUri = server + '/api/ReportFct/TrzFCust/'; // آدرس گزارش 

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

    TestUser();

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();


    var allSearchKala = true;

    var StatusCode = '';
    var counterStatus = 0;
    var list_StatusSelect = new Array();

    var KalaCode = '';
    var counterKala = 0;
    var list_KalaSelect = new Array();

    var InvCode = '';
    var counterInv = 0;
    var list_InvSelect = new Array();

    var KGruCode = '';
    var counterKGru = 0;
    var list_KGruSelect = new Array();

    var CustCode = '';
    var counterCust = 0;
    var list_CustSelect = new Array();

    var CGruCode = '';
    var counterCGru = 0;
    var list_CGruSelect = new Array();

    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();


    $("#textTotal").text('');


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'TrzFCust_S';
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
        'FinalPrice'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            self.SettingColumnList(data);
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
        ajaxFunction(RprtColsDefultUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + rprtId, 'GET').done(function (data) {
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(sessionStorage.ace, sessionStorage.sal, sessionStorage.group, rprtId, "/ReportAFI/TrzFCust_S", columns, self.SettingColumnList());
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
    });

    getRprtColsList(true, sessionStorage.userName);












    //Get Status List
    function getStatusList() {
        progName = getProgName('S');
        ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
            self.StatusList(data);
        });
    }

    //Get  FMode List
    function getFModeList() {
        ajaxFunction(FModeUri + ace + '/' + sal + '/' + group + '/2', 'GET').done(function (data) {
            self.FModeList(data);

            select = document.getElementById('modeCode');
            for (var i = 0; i < data.length; i++) {
                opt = document.createElement('option');
                opt.value = data[i].Code;
                opt.innerHTML = data[i].Name;
                select.appendChild(opt);
            }

            opt = document.createElement('option');
            opt.value = SearchMode('فاکتور فروش', self.FModeList()) + '*' + SearchMode('برگشت از فروش', self.FModeList());
            opt.innerHTML = 'فاکتور فروش با احتساب برگشتی';
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
            updatedate: null
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject).done(function (data) {
            self.KalaList(data);
        });
    }

    //Get Inv List 
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/0/' + sessionStorage.userName , 'GET').done(function (data) {
            self.InvList(data);
        });
    }

    //Get  KGru List
    function getKGruList() {
        var KGruObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(KGruUri + ace + '/' + sal + '/' + group, 'POST', KGruObject).done(function (data) {
            self.KGruList(data);
        });
    }

    self.OptionsCaptionAnbar = ko.computed(function () {
        return 'همه انبار ها';
    });


    //Get Cust List
    function getCustList() {

        var CustObject = {
            forSale: null,
            updatedate: null,
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CustUri + ace + '/' + sal + '/' + group, 'POST', CustObject).done(function (data) {
            self.CustList(data);
        });
    }


    function getCGruList() {
        var CGruObject = {
            Mode: 0,
            ModeGru: 1,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CGruUri + ace + '/' + sal + '/' + group, 'POST', CGruObject).done(function (data) {
            self.CGruList(data);
        });
    }

    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.OprList(data);
        });
    }

    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.MkzList(data);
        });
    }

    //Get TrzFCust_S
    function getTrzFCust_S() {


        tarikh1 = $("#aztarikh").val().toEnglishDigit();
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
        }


        var TrzFCust_SObject = {
            ModeCode1: modeCode1,
            ModeCode2: modeCode2,
            azTarikh: tarikh1,
            taTarikh: tarikh2,
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
        ajaxFunction(TrzFCust_SUri + ace + '/' + sal + '/' + group, 'POST', TrzFCust_SObject).done(function (response) {
            self.TrzFCust_SList(response);
            $("div.loader").hide();
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

        for (var i = 0; i < list.length; ++i) {
            TrzFCust_SData = list[i];
            totalAmount1 += TrzFCust_SData.Amount1;
            totalAmount2 += TrzFCust_SData.Amount2;
            totalAmount3 += TrzFCust_SData.Amount3;

            totalAddMinPrice1 += TrzFCust_SData.AddMinPrice1;
            totalAddMinPrice2 += TrzFCust_SData.AddMinPrice2;
            totalAddMinPrice3 += TrzFCust_SData.AddMinPrice3;
            totalAddMinPrice4 += TrzFCust_SData.AddMinPrice4;
            totalAddMinPrice5 += TrzFCust_SData.AddMinPrice5;
            totalAddMinPrice6 += TrzFCust_SData.AddMinPrice6;
            totalAddMinPrice7 += TrzFCust_SData.AddMinPrice7;
            totalAddMinPrice8 += TrzFCust_SData.AddMinPrice8;
            totalAddMinPrice9 += TrzFCust_SData.AddMinPrice9;
            totalAddMinPrice10 += TrzFCust_SData.AddMinPrice10;

            totalDiscount += TrzFCust_SData.Discount;
            totalOnlyDiscountPrice += TrzFCust_SData.OnlyDiscountPrice;
            totalFinalPrice += TrzFCust_SData.FinalPrice;
            totalTotalPrice += TrzFCust_SData.TotalPrice;

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

    }


    $("#CreateReport").click(function () {
      
        $('#loadingsite').css('display', 'block');
        getTrzFCust_S();
        self.sortTableTrzFCust_S();
        $('#loadingsite').css('display', 'none');
    });

    getFModeList();
    getInvList();
    getKalaList();
    getCustList();
    getStatusList();
    getCGruList();
    getKGruList();
    getOprList();
    getMkzList();
    getZeroList();

    $('#nameKala').val('همه موارد');
    $('#nameInv').val('همه موارد');
    $('#nameKGru').val('همه موارد');
    $('#nameCust').val('همه موارد');
    $('#nameCGru').val('همه موارد');
    $('#nameOpr').val('همه موارد');
    $('#nameMkz').val('همه موارد');
    $('#nameStatus').val('همه موارد');

    self.currentPageTrzFCust_S = ko.observable();
    pageSizeTrzFCust_S = localStorage.getItem('pageSizeTrzFCust_S') == null ? 10 : localStorage.getItem('pageSizeTrzFCust_S');
    self.pageSizeTrzFCust_S = ko.observable(pageSizeTrzFCust_S);
    self.currentPageIndexTrzFCust_S = ko.observable(0);
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

    self.filterTrzFCust_SList = ko.computed(function () {
        self.currentPageIndexTrzFCust_S(0);
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

        tempData = ko.utils.arrayFilter(self.TrzFCust_SList(), function (item) {
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
                ko.utils.stringStartsWith(item.TotalPrice.toString().toLowerCase(), filterTotalPrice)
            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzFCust_S);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzFCust_S = 0;
        sessionStorage.searchTrzFCust_S = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzFCust_S(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzFCust_SList(), function (item) {
                indexTrzFCust_S += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzFCust_S < self.pageSizeTrzFCust_S())
                self.currentPageIndexTrzFCust_S(0);
            else {
                var a = Math.round((indexTrzFCust_S / self.pageSizeTrzFCust_S()), 0);
                if (a < (indexTrzFCust_S / self.pageSizeTrzFCust_S())) a += 1;
                self.currentPageIndexTrzFCust_S(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzFCust_S = ko.computed(function () {
        var pageSizeTrzFCust_S = parseInt(self.pageSizeTrzFCust_S(), 10),
            startIndex = pageSizeTrzFCust_S * self.currentPageIndexTrzFCust_S(),
            endIndex = startIndex + pageSizeTrzFCust_S;
        localStorage.setItem('pageSizeTrzFCust_S', pageSizeTrzFCust_S);
  return self.filterTrzFCust_SList().slice(startIndex, endIndex);
    });

    self.nextPageTrzFCust_S = function () {
        if (((self.currentPageIndexTrzFCust_S() + 1) * self.pageSizeTrzFCust_S()) < self.filterTrzFCust_SList().length) {
            self.currentPageIndexTrzFCust_S(self.currentPageIndexTrzFCust_S() + 1);
        }
    };

    self.previousPageTrzFCust_S = function () {
        if (self.currentPageIndexTrzFCust_S() > 0) {
            self.currentPageIndexTrzFCust_S(self.currentPageIndexTrzFCust_S() - 1);
        }
    };

    self.firstPageTrzFCust_S = function () {
        self.currentPageIndexTrzFCust_S(0);
    };

    self.lastPageTrzFCust_S = function () {
        tempCountTrzFCust_S = parseInt(self.filterTrzFCust_SList().length / self.pageSizeTrzFCust_S(), 10);
        if ((self.filterTrzFCust_SList().length % self.pageSizeTrzFCust_S()) == 0)
            self.currentPageIndexTrzFCust_S(tempCountTrzFCust_S - 1);
        else
            self.currentPageIndexTrzFCust_S(tempCountTrzFCust_S);
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

    self.sortTableTrzFCust_S = function (viewModel, e) {
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
        self.TrzFCust_SList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
            title: 'تایید به روز رسانی',
            text: "لیست وضعیت به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getStatusList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddStatus = function (item) {

        StatusCode = item.Code;
        find = false;
        list_StatusSelect.forEach(function (item, key) {
            if (item == StatusCode) {
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
            $('#nameStatus').val(counterStatus + ' مورد انتخاب شده ')
        else
            $('#nameStatus').val('همه موارد');
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
        self.currentColumn(orderProp);
        self.InvList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
            title: 'تایید به روز رسانی',
            text: "لیست انبار ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_InvSelect[counterInv] = item.Code;
            counterInv = counterInv + 1;
        }
    };


    self.AddAllInv = function () {
        list_InvSelect = new Array();
        list = self.InvList();
        $("#TableBodyListInv").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListInv').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_InvSelect[i] = list[i].Code;
            counterInv = i + 1;
        }
    };


    self.DelAllInv = function () {
        list_InvSelect = new Array();
        counterInv = 0;
        $("#TableBodyListInv").empty();
    };


    $('#modal-Inv').on('hide.bs.modal', function () {
        if (counterInv > 0)
            $('#nameInv').val(counterInv + ' مورد انتخاب شده ')
        else
            $('#nameInv').val('همه موارد');
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
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
            title: 'تایید به روز رسانی',
            text: "لیست گروه کالا به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_KGruSelect[counterKGru] = item.Code;
            counterKGru = counterKGru + 1;
        }
    };


    self.AddAllKGru = function () {
        list_KGruSelect = new Array();
        list = self.KGruList();
        $("#TableBodyListKGru").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKGru').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_KGruSelect[i] = list[i].Code;
            counterKGru = i + 1;
        }
    };


    self.DelAllKGru = function () {
        list_KGruSelect = new Array();
        counterKGru = 0;
        $("#TableBodyListKGru").empty();
    };


    $('#modal-KGru').on('hide.bs.modal', function () {
        if (counterKGru > 0)
            $('#nameKGru').val(counterKGru + ' مورد انتخاب شده ')
        else
            $('#nameKGru').val('همه موارد');
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
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
            title: 'تایید به روز رسانی',
            text: "لیست کالا ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
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
                + ' <td data-bind="text: FanniNo">' + item.FanniNo + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_KalaSelect[counterKala] = item.Code;
            counterKala = counterKala + 1;
        }
    };


    self.AddAllKala = function () {
        list_KalaSelect = new Array();
        list = self.KalaList();
        $("#TableBodyListKala").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKala').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: FanniNo">' + list[i].FanniNo + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_KalaSelect[i] = list[i].Code;
            counterKala = i + 1;
        }
    };


    self.DelAllKala = function () {
        list_KalaSelect = new Array();
        counterKala = 0;
        $("#TableBodyListKala").empty();
    };


    $('#modal-kala').on('hide.bs.modal', function () {
        if (counterKala > 0)
            $('#nameKala').val(counterKala + ' مورد انتخاب شده ')
        else
            $('#nameKala').val('همه موارد');
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
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
            title: 'تایید به روز رسانی',
            text: "لیست تحویل دهنده / گیرنده به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_CGruSelect[counterCGru] = item.Code;
            counterCGru = counterCGru + 1;
        }
    };


    self.AddAllCGru = function () {
        list_CGruSelect = new Array();
        list = self.CGruList();
        $("#TableBodyListCGru").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListCGru').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_CGruSelect[i] = list[i].Code;
            counterCGru = i + 1;
        }
    };


    self.DelAllCGru = function () {
        list_CGruSelect = new Array();
        counterCGru = 0;
        $("#TableBodyListCGru").empty();
    };


    $('#modal-CGru').on('hide.bs.modal', function () {
        if (counterCGru > 0)
            $('#nameCGru').val(counterCGru + ' مورد انتخاب شده ')
        else
            $('#nameCGru').val('همه موارد');
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
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
            title: 'تایید به روز رسانی',
            text: "لیست تحویل دهنده / گیرنده به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_CustSelect[counterCust] = item.Code;
            counterCust = counterCust + 1;
        }
    };


    self.AddAllCust = function () {
        list_CustSelect = new Array();
        list = self.CustList();
        $("#TableBodyListCust").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListCust').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_CustSelect[i] = list[i].Code;
            counterCust = i + 1;
        }
    };


    self.DelAllCust = function () {
        list_CustSelect = new Array();
        counterCust = 0;
        $("#TableBodyListCust").empty();
    };


    $('#modal-Cust').on('hide.bs.modal', function () {
        if (counterCust > 0)
            $('#nameCust').val(counterCust + ' مورد انتخاب شده ')
        else
            $('#nameCust').val('همه موارد');
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
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
            title: 'تایید به روز رسانی',
            text: "لیست پروژه به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[counterOpr] = item.Code;
            counterOpr = counterOpr + 1;
        }
    };


    self.AddAllOpr = function () {
        list_OprSelect = new Array();
        list = self.OprList();
        $("#TableBodyListOpr").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListOpr').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[i] = list[i].Code;
            counterOpr = i + 1;
        }
    };


    self.DelAllOpr = function () {
        list_OprSelect = new Array();
        counterOpr = 0;
        $("#TableBodyListOpr").empty();
    };


    $('#modal-Opr').on('hide.bs.modal', function () {
        if (counterOpr > 0)
            $('#nameOpr').val(counterOpr + ' مورد انتخاب شده ')
        else
            $('#nameOpr').val('همه موارد');
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
            leftVal = left[orderProp];
            rightVal = right[orderProp];
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
            title: 'تایید به روز رسانی',
            text: "لیست مرکز هزینه به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getMkzList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالا ها به روز رسانی شد' });
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[counterMkz] = item.Code;
            counterMkz = counterMkz + 1;
        }
    };


    self.AddAllMkz = function () {
        list_MkzSelect = new Array();
        list = self.MkzList();
        $("#TableBodyListMkz").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListMkz').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[i] = list[i].Code;
            counterMkz = i + 1;
        }
    };


    self.DelAllMkz = function () {
        list_MkzSelect = new Array();
        counterMkz = 0;
        $("#TableBodyListMkz").empty();
    };


    $('#modal-Mkz').on('hide.bs.modal', function () {
        if (counterMkz > 0)
            $('#nameMkz').val(counterMkz + ' مورد انتخاب شده ')
        else
            $('#nameMkz').val('همه موارد');
    });

    $('#modal-Mkz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    $('.fix').attr('class', 'form-line date focused fix');



    self.radif = function (index) {
        countShow = self.pageSizeTrzFCust_S();
        page = self.currentPageIndexTrzFCust_S();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTrzFCust_S">' +
            '<th>ردیف</th>' +
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
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageTrzFCust_S" data-dismiss="modal" style="cursor: default;">' +
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
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td>جمع</td>' +
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
            '    <i data-bind="attr: { class: iconType' + field + ' }"  data-column="' + sortField + '"></i> </span> ' +
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
        text = '<td ';

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
    $('#Print').click(function () {
        variable = '"ReportDate":"' + DateNow + '",';
        setReport(self.filterTrzFCust_SList(), 'Report_TrzFCust_S', variable);
    });

    

};

ko.applyBindings(new ViewModel());

