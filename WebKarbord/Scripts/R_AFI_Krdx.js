var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");

    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.KalaList = ko.observableArray([]); // ليست کالاها
    self.ThvlList = ko.observableArray([]); // ليست وارده صادره 
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه   

    self.IModeList = ko.observableArray([]); // ليست نوع سند
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.StatusList = ko.observableArray([]); // ليست نوع سند ها
    self.KrdxList = ko.observableArray([]); // لیست گزارش  


    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var ThvlUri = server + '/api/Web_Data/Thvl/'; // آدرس وارده صادره
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع اسناد 
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var KrdxUri = server + '/api/ReportInv/Krdx/'; // آدرس گزارش 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 


    TestUser();

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);
    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });

    self.InvCode = ko.observable();
    self.InvName = ko.observable();
    self.KalaCode = ko.observable();
    self.KalaName = ko.observable();
    var allSearchKala = true;


    var ThvlCode = '';
    var counterThvl = 0;
    var list_ThvlSelect = new Array();

    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();

    var StatusCode = '';
    var counterStatus;
    var list_StatusSelect;

    if (ace == Web8) {
        counterStatus = 3;
        list_StatusSelect = ["موقت", "تایید", "تصویب"];
    }
    else {
        counterStatus = 2;
        list_StatusSelect = ["موقت", "تایید"];
    }

    var IModeCode = '';
    var counterIMode = 0;
    var list_IModeSelect = new Array();

    $("#textTotal").text('');



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'Krdx';
    var columns = [
        'DocDate',
        //'InvName',
        'ModeName',
        'Spec',
        'ThvlCode',
        'ThvlName',
        'Status',
        'DimX',
        'DimY',
        'DimZ',
        'KalaFileNo',
        'KalaState',
        'KalaExf1',
        'KalaExf2',
        'KalaExf3',
        'KalaExf4',
        'KalaExf5',
        'KalaExf6',
        'KalaExf7',
        'KalaExf8',
        'KalaExf9',
        'KalaExf10',
        'KalaExf11',
        'KalaExf12',
        'KalaExf13',
        'KalaExf14',
        'KalaExf15',
        'InDocNo',
        'VAmount1',
        'VUnitPrice1',
        'VAmount2',
        'VUnitPrice2',
        'VAmount3',
        'VUnitPrice3',
        'VTotalPrice',
        'iAddMin1',
        'iAddMin2',
        'iAddMin3',
        'OutDocNo',
        'SAmount1',
        'SUnitPrice1',
        'SAmount2',
        'SUnitPrice2',
        'SAmount3',
        'SUnitPrice3',
        'STotalPrice',
        'MAmount1',
        'MUnitPrice1',
        'MAmount2',
        'MUnitPrice2',
        'MAmount3',
        'MUnitPrice3',
        'MTotalPrice',
        'MkzCode',
        'MkzName',
        'OprCode',
        'OprName',
        'IDocF01',
        'IDocF02',
        'IDocF03',
        'IDocF04',
        'IDocF05',
        'IDocF06',
        'IDocF07',
        'IDocF08',
        'IDocF09',
        'IDocF10',
        'IDocF11',
        'IDocF12',
        'IDocF13',
        'IDocF14',
        'IDocF15',
        'IDocF16',
        'IDocF17',
        'IDocF18',
        'IDocF19',
        'IDocF20',
        /*    'Kalaf01',
            'Kalaf02',
            'Kalaf03',
            'Kalaf04',
            'Kalaf05',
            'Kalaf06',
            'Kalaf07',
            'Kalaf08',
            'Kalaf09',
            'Kalaf10',
            'Kalaf11',
            'Kalaf12',
            'Kalaf13',
            'Kalaf14',
            'Kalaf15',
            'Kalaf16',
            'Kalaf17',
            'Kalaf18',
            'Kalaf19',
            'Kalaf20'*/
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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
        ajaxFunction(RprtColsDefultUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + rprtId, 'GET').done(function (data) {
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(sessionStorage.ace, sessionStorage.sal, sessionStorage.group, rprtId, "/ReportAFI/Krdx", columns, self.SettingColumnList());
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


    self.OptionsCaptionAnbar = ko.computed(function () {
        return 'همه انبار ها';
    });


    //Get Thvl List
    function getThvlList() {
        var ThvlObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(ThvlUri + ace + '/' + sal + '/' + group, 'POST', ThvlObject,true).done(function (data) {
            self.ThvlList(data);
        });
    }
    $('#btnThvl').click(function () {
        if (self.ThvlList().length == 0) {
            getThvlList();
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

    //Get Krdx
    function getKrdx() {
        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        naghl = $("#naghl").val();

        kalaCode = self.KalaCode();

        invCode = self.InvCode();

        if (invCode == null) {
            return showNotification('انبار را انتخاب کنید', 0);
        }

        if (kalaCode == null) {
            return showNotification('کالا را انتخاب کنید', 0);
        }



        var thvlcode = '';
        for (var i = 0; i <= counterThvl - 1; i++) {
            if (i < counterThvl - 1)
                thvlcode += list_ThvlSelect[i] + '*';
            else
                thvlcode += list_ThvlSelect[i];
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

        var statuscode = '';
        for (var i = 0; i <= counterStatus - 1; i++) {
            if (i < counterStatus - 1)
                statuscode += list_StatusSelect[i] + '*';
            else
                statuscode += list_StatusSelect[i];
        }

        var imodecode = '';
        for (var i = 0; i <= counterIMode - 1; i++) {
            if (i < counterIMode - 1)
                imodecode += list_IModeSelect[i] + '*';
            else
                imodecode += list_IModeSelect[i];
        }


        var KrdxObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            ModeCode: imodecode,
            InvCode: invCode,
            KGruCode: '',
            KalaCode: kalaCode,
            ThvlCode: thvlcode,
            MkzCode: mkzcode,
            OprCode: oprcode,
            StatusCode: statuscode,
            Naghl: naghl,
        };
        ajaxFunction(KrdxUri + ace + '/' + sal + '/' + group, 'POST', KrdxObject,true).done(function (response) {
            self.KrdxList(response);
            //  calcsum(self.KrdxList());
        });
    }

    function calcsum(list) {


        totalVAmount1 = 0;
        totalVAmount2 = 0;
        totalVAmount3 = 0;
        totalVTotalPrice = 0;

        totalSAmount1 = 0;
        totalSAmount2 = 0;
        totalSAmount3 = 0;
        totalSTotalPrice = 0;

        /*totalMAmount1 = 0;
        totalMAmount2 = 0;
        totalMAmount3 = 0;
        totalMTotalPrice = 0;*/

        KalaDeghat1 = 0;
        KalaDeghat2 = 0;
        KalaDeghat3 = 0;

        maxKalaDeghat1 = 0;
        maxKalaDeghat2 = 0;
        maxKalaDeghat3 = 0;

        for (var i = 0; i < list.length; ++i) {
            KrdxData = list[i];
            totalVAmount1 += KrdxData.VAmount1;
            totalVAmount2 += KrdxData.VAmount2;
            totalVAmount3 += KrdxData.VAmount3;
            totalVTotalPrice += KrdxData.VTotalPrice;

            totalSAmount1 += KrdxData.SAmount1;
            totalSAmount2 += KrdxData.SAmount2;
            totalSAmount3 += KrdxData.SAmount3;
            totalSTotalPrice += KrdxData.STotalPrice;


            KalaDeghat1 = KrdxData.KalaDeghatM1;
            KalaDeghat2 = KrdxData.KalaDeghatM2;
            KalaDeghat3 = KrdxData.KalaDeghatM3;

            KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
            KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
            KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
        }

        // $("#textTotal").text('جمع');
        $("#totalVAmount1").text(NumberToNumberString(totalVAmount1.toFixed(maxKalaDeghat1)));
        $("#totalVAmount2").text(NumberToNumberString(totalVAmount2.toFixed(maxKalaDeghat2)));
        $("#totalVAmount3").text(NumberToNumberString(totalVAmount3.toFixed(maxKalaDeghat3)));
        $("#totalVTotalPrice").text(NumberToNumberString(totalVTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        $("#totalSAmount1").text(NumberToNumberString(totalSAmount1.toFixed(maxKalaDeghat1)));
        $("#totalSAmount2").text(NumberToNumberString(totalSAmount2.toFixed(maxKalaDeghat2)));
        $("#totalSAmount3").text(NumberToNumberString(totalSAmount3.toFixed(maxKalaDeghat3)));
        $("#totalSTotalPrice").text(NumberToNumberString(totalSTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        /* totalMAmount1 = totalVAmount1 - totalSAmount1;
         totalMAmount2 = totalVAmount2 - totalSAmount2;
         totalMAmount3 = totalVAmount3 - totalSAmount3;
         totalMTotalPrice = totalVTotalPrice - totalSTotalPrice;
 
         $("#totalMAmount1").text(NumberToNumberString(totalMAmount1.toFixed(maxKalaDeghat1)));
         $("#totalMAmount2").text(NumberToNumberString(totalMAmount2.toFixed(maxKalaDeghat2)));
         $("#totalMAmount3").text(NumberToNumberString(totalMAmount3.toFixed(maxKalaDeghat3)));
         $("#totalMTotalPrice").text(NumberToNumberString(totalMTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));*/
    }

    $("#CreateReport").click(function () {
        getKrdx();
        self.sortTableKrdx();
    });

    getInvList();
    //getKalaList();
    getByKalaExf();
    getNaghl();
    getStatusList();

    $('#nameKala').val('');
    $('#nameInv').val('');
    $('#nameThvl').val('همه موارد');
    $('#nameOpr').val('همه موارد');
    $('#nameMkz').val('همه موارد');
    $('#nameIMode').val('همه موارد');
    $('#nameStatus').val(counterStatus + ' مورد انتخاب شده ');

    //------------------------------------------------------
    self.currentPageKrdx = ko.observable();
    pageSizeKrdx = localStorage.getItem('pageSizeKrdx') == null ? 10 : localStorage.getItem('pageSizeKrdx');
    self.pageSizeKrdx = ko.observable(pageSizeKrdx);
    self.currentPageIndexKrdx = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterDocDate = ko.observable("");
    // self.filterInvName = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterThvlCode = ko.observable("");
    self.filterThvlName = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterDimX = ko.observable("");
    self.filterDimY = ko.observable("");
    self.filterDimZ = ko.observable("");
    self.filterKalaFileNo = ko.observable("");
    self.filterKalaState = ko.observable("");
    self.filterKalaExf1 = ko.observable("");
    self.filterKalaExf2 = ko.observable("");
    self.filterKalaExf3 = ko.observable("");
    self.filterKalaExf4 = ko.observable("");
    self.filterKalaExf5 = ko.observable("");
    self.filterKalaExf6 = ko.observable("");
    self.filterKalaExf7 = ko.observable("");
    self.filterKalaExf8 = ko.observable("");
    self.filterKalaExf9 = ko.observable("");
    self.filterKalaExf10 = ko.observable("");
    self.filterKalaExf11 = ko.observable("");
    self.filterKalaExf12 = ko.observable("");
    self.filterKalaExf13 = ko.observable("");
    self.filterKalaExf14 = ko.observable("");
    self.filterKalaExf15 = ko.observable("");
    self.filterInDocNo = ko.observable("");
    self.filterVAmount1 = ko.observable("");
    self.filterVAmount2 = ko.observable("");
    self.filterVAmount3 = ko.observable("");
    self.filterVUnitPrice1 = ko.observable("");
    self.filterVUnitPrice2 = ko.observable("");
    self.filterVUnitPrice3 = ko.observable("");
    self.filterVTotalPrice = ko.observable("");
    self.filteriAddMin1 = ko.observable("");
    self.filteriAddMin2 = ko.observable("");
    self.filteriAddMin3 = ko.observable("");
    self.filterOutDocNo = ko.observable("");
    self.filterSAmount1 = ko.observable("");
    self.filterSAmount2 = ko.observable("");
    self.filterSAmount3 = ko.observable("");
    self.filterSUnitPrice1 = ko.observable("");
    self.filterSUnitPrice2 = ko.observable("");
    self.filterSUnitPrice3 = ko.observable("");
    self.filterSTotalPrice = ko.observable("");
    self.filterMAmount1 = ko.observable("");
    self.filterMAmount2 = ko.observable("");
    self.filterMAmount3 = ko.observable("");
    self.filterMUnitPrice1 = ko.observable("");
    self.filterMUnitPrice2 = ko.observable("");
    self.filterMUnitPrice3 = ko.observable("");
    self.filterMTotalPrice = ko.observable("");
    self.filterMkzCode = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprCode = ko.observable("");
    self.filterOprName = ko.observable("");
    self.filterIDocF01 = ko.observable("");
    self.filterIDocF02 = ko.observable("");
    self.filterIDocF03 = ko.observable("");
    self.filterIDocF04 = ko.observable("");
    self.filterIDocF05 = ko.observable("");
    self.filterIDocF06 = ko.observable("");
    self.filterIDocF07 = ko.observable("");
    self.filterIDocF08 = ko.observable("");
    self.filterIDocF09 = ko.observable("");
    self.filterIDocF10 = ko.observable("");
    self.filterIDocF11 = ko.observable("");
    self.filterIDocF12 = ko.observable("");
    self.filterIDocF13 = ko.observable("");
    self.filterIDocF14 = ko.observable("");
    self.filterIDocF15 = ko.observable("");
    self.filterIDocF16 = ko.observable("");
    self.filterIDocF17 = ko.observable("");
    self.filterIDocF18 = ko.observable("");
    self.filterIDocF19 = ko.observable("");
    self.filterIDocF20 = ko.observable("");
    /*  self.filterKalaf01 = ko.observable("");
    self.filterKalaf02 = ko.observable("");
    self.filterKalaf03 = ko.observable("");
    self.filterKalaf04 = ko.observable("");
    self.filterKalaf05 = ko.observable("");
    self.filterKalaf06 = ko.observable("");
    self.filterKalaf07 = ko.observable("");
    self.filterKalaf08 = ko.observable("");
    self.filterKalaf09 = ko.observable("");
    self.filterKalaf10 = ko.observable("");
    self.filterKalaf11 = ko.observable("");
    self.filterKalaf12 = ko.observable("");
    self.filterKalaf13 = ko.observable("");
    self.filterKalaf14 = ko.observable("");
    self.filterKalaf15 = ko.observable("");
    self.filterKalaf16 = ko.observable("");
    self.filterKalaf17 = ko.observable("");
    self.filterKalaf18 = ko.observable("");
    self.filterKalaf19 = ko.observable("");
    self.filterKalaf20 = ko.observable("");*/

    self.filterKrdxList = ko.computed(function () {

        self.currentPageIndexKrdx(0);

        var filterDocDate = self.filterDocDate();
        //var filterInvName = self.filterInvName();
        var filterModeName = self.filterModeName();
        var filterSpec = self.filterSpec();
        var filterThvlCode = self.filterThvlCode();
        var filterThvlName = self.filterThvlName();
        var filterStatus = self.filterStatus();
        var filterDimX = self.filterDimX();
        var filterDimY = self.filterDimY();
        var filterDimZ = self.filterDimZ();
        var filterKalaFileNo = self.filterKalaFileNo();
        var filterKalaState = self.filterKalaState();
        var filterKalaExf1 = self.filterKalaExf1();
        var filterKalaExf2 = self.filterKalaExf2();
        var filterKalaExf3 = self.filterKalaExf3();
        var filterKalaExf4 = self.filterKalaExf4();
        var filterKalaExf5 = self.filterKalaExf5();
        var filterKalaExf6 = self.filterKalaExf6();
        var filterKalaExf7 = self.filterKalaExf7();
        var filterKalaExf8 = self.filterKalaExf8();
        var filterKalaExf9 = self.filterKalaExf9();
        var filterKalaExf10 = self.filterKalaExf10();
        var filterKalaExf11 = self.filterKalaExf11();
        var filterKalaExf12 = self.filterKalaExf12();
        var filterKalaExf13 = self.filterKalaExf13();
        var filterKalaExf14 = self.filterKalaExf14();
        var filterKalaExf15 = self.filterKalaExf15();
        var filterInDocNo = self.filterInDocNo();
        var filterVAmount1 = self.filterVAmount1();
        var filterVAmount2 = self.filterVAmount2();
        var filterVAmount3 = self.filterVAmount3();
        var filterVUnitPrice1 = self.filterVUnitPrice1();
        var filterVUnitPrice2 = self.filterVUnitPrice2();
        var filterVUnitPrice3 = self.filterVUnitPrice3();
        var filterVTotalPrice = self.filterVTotalPrice();
        var filteriAddMin1 = self.filteriAddMin1();
        var filteriAddMin2 = self.filteriAddMin2();
        var filteriAddMin3 = self.filteriAddMin3();
        var filterOutDocNo = self.filterOutDocNo();
        var filterSAmount1 = self.filterSAmount1();
        var filterSAmount2 = self.filterSAmount2();
        var filterSAmount3 = self.filterSAmount3();
        var filterSUnitPrice1 = self.filterSUnitPrice1();
        var filterSUnitPrice2 = self.filterSUnitPrice2();
        var filterSUnitPrice3 = self.filterSUnitPrice3();
        var filterSTotalPrice = self.filterSTotalPrice();

        var filterMAmount1 = self.filterMAmount1();
        var filterMAmount2 = self.filterMAmount2();
        var filterMAmount3 = self.filterMAmount3();
        var filterMUnitPrice1 = self.filterMUnitPrice1();
        var filterMUnitPrice2 = self.filterMUnitPrice2();
        var filterMUnitPrice3 = self.filterMUnitPrice3();
        var filterMTotalPrice = self.filterMTotalPrice();

        var filterMkzCode = self.filterMkzCode();
        var filterMkzName = self.filterMkzName();
        var filterOprCode = self.filterOprCode();
        var filterOprName = self.filterOprName();

        var filterIDocF01 = self.filterIDocF01();
        var filterIDocF02 = self.filterIDocF02();
        var filterIDocF03 = self.filterIDocF03();
        var filterIDocF04 = self.filterIDocF04();
        var filterIDocF05 = self.filterIDocF05();
        var filterIDocF06 = self.filterIDocF06();
        var filterIDocF07 = self.filterIDocF07();
        var filterIDocF08 = self.filterIDocF08();
        var filterIDocF09 = self.filterIDocF09();
        var filterIDocF10 = self.filterIDocF10();
        var filterIDocF11 = self.filterIDocF11();
        var filterIDocF12 = self.filterIDocF12();
        var filterIDocF13 = self.filterIDocF13();
        var filterIDocF14 = self.filterIDocF14();
        var filterIDocF15 = self.filterIDocF15();
        var filterIDocF16 = self.filterIDocF16();
        var filterIDocF17 = self.filterIDocF17();
        var filterIDocF18 = self.filterIDocF18();
        var filterIDocF19 = self.filterIDocF19();
        var filterIDocF20 = self.filterIDocF20();
        /*   var filterKalaf01 = self.filterKalaf01();
         var filterKalaf02 = self.filterKalaf02();
         var filterKalaf03 = self.filterKalaf03();
         var filterKalaf04 = self.filterKalaf04();
         var filterKalaf05 = self.filterKalaf05();
         var filterKalaf06 = self.filterKalaf06();
         var filterKalaf07 = self.filterKalaf07();
         var filterKalaf08 = self.filterKalaf08();
         var filterKalaf09 = self.filterKalaf09();
         var filterKalaf10 = self.filterKalaf10();
         var filterKalaf11 = self.filterKalaf11();
         var filterKalaf12 = self.filterKalaf12();
         var filterKalaf13 = self.filterKalaf13();
         var filterKalaf14 = self.filterKalaf14();
         var filterKalaf15 = self.filterKalaf15();
         var filterKalaf16 = self.filterKalaf16();
         var filterKalaf17 = self.filterKalaf17();
         var filterKalaf18 = self.filterKalaf18();
         var filterKalaf19 = self.filterKalaf19();
         var filterKalaf20 = self.filterKalaf20();*/

        filterVAmount1 = filterVAmount1.replace("/", ".");
        filterVAmount2 = filterVAmount2.replace("/", ".");
        filterVAmount3 = filterVAmount3.replace("/", ".");
        filterVUnitPrice1 = filterVUnitPrice1.replace("/", ".");
        filterVUnitPrice2 = filterVUnitPrice2.replace("/", ".");
        filterVUnitPrice3 = filterVUnitPrice3.replace("/", ".");
        filterVTotalPrice = filterVTotalPrice.replace("/", ".");
        filteriAddMin1 = filteriAddMin1.replace("/", ".");
        filteriAddMin2 = filteriAddMin2.replace("/", ".");
        filteriAddMin3 = filteriAddMin3.replace("/", ".");
        filterOutDocNo = filterOutDocNo.replace("/", ".");
        filterSAmount1 = filterSAmount1.replace("/", ".");
        filterSAmount2 = filterSAmount2.replace("/", ".");
        filterSAmount3 = filterSAmount3.replace("/", ".");
        filterSUnitPrice1 = filterSUnitPrice1.replace("/", ".");
        filterSUnitPrice2 = filterSUnitPrice2.replace("/", ".");
        filterSUnitPrice3 = filterSUnitPrice3.replace("/", ".");
        filterSTotalPrice = filterSTotalPrice.replace("/", ".");

        filterMAmount1 = filterMAmount1.replace("/", ".");
        filterMAmount2 = filterMAmount2.replace("/", ".");
        filterMAmount3 = filterMAmount3.replace("/", ".");
        filterMUnitPrice1 = filterMUnitPrice1.replace("/", ".");
        filterMUnitPrice2 = filterMUnitPrice2.replace("/", ".");
        filterMUnitPrice3 = filterMUnitPrice3.replace("/", ".");
        filterMTotalPrice = filterMTotalPrice.replace("/", ".");


        tempData = ko.utils.arrayFilter(self.KrdxList(), function (item) {
            result =
                (item.DocDate == null ? '' : item.DocDate.toString().search(filterDocDate) >= 0) &&
                (item.ModeName == null ? '' : item.ModeName.toString().search(filterModeName) >= 0) &&
                (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                (item.ThvlCode == null ? '' : item.ThvlCode.toString().search(filterThvlCode) >= 0) &&
                (item.ThvlName == null ? '' : item.ThvlName.toString().search(filterThvlName) >= 0) &&
                (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                ko.utils.stringStartsWith(item.DimX.toString().toLowerCase(), filterDimX) &&
                ko.utils.stringStartsWith(item.DimY.toString().toLowerCase(), filterDimY) &&
                ko.utils.stringStartsWith(item.DimZ.toString().toLowerCase(), filterDimZ) &&
                (item.KalaFileNo == null ? '' : item.KalaFileNo.toString().search(filterKalaFileNo) >= 0) &&
                (item.KalaState == null ? '' : item.KalaState.toString().search(filterKalaState) >= 0) &&
                (item.KalaExf1 == null ? '' : item.KalaExf1.toString().search(filterKalaExf1) >= 0) &&
                (item.KalaExf2 == null ? '' : item.KalaExf2.toString().search(filterKalaExf2) >= 0) &&
                (item.KalaExf3 == null ? '' : item.KalaExf3.toString().search(filterKalaExf3) >= 0) &&
                (item.KalaExf4 == null ? '' : item.KalaExf4.toString().search(filterKalaExf4) >= 0) &&
                (item.KalaExf5 == null ? '' : item.KalaExf5.toString().search(filterKalaExf5) >= 0) &&
                (item.KalaExf6 == null ? '' : item.KalaExf6.toString().search(filterKalaExf6) >= 0) &&
                (item.KalaExf7 == null ? '' : item.KalaExf7.toString().search(filterKalaExf7) >= 0) &&
                (item.KalaExf8 == null ? '' : item.KalaExf8.toString().search(filterKalaExf8) >= 0) &&
                (item.KalaExf9 == null ? '' : item.KalaExf9.toString().search(filterKalaExf9) >= 0) &&
                (item.KalaExf10 == null ? '' : item.KalaExf10.toString().search(filterKalaExf10) >= 0) &&
                (item.KalaExf11 == null ? '' : item.KalaExf11.toString().search(filterKalaExf11) >= 0) &&
                (item.KalaExf12 == null ? '' : item.KalaExf12.toString().search(filterKalaExf12) >= 0) &&
                (item.KalaExf13 == null ? '' : item.KalaExf13.toString().search(filterKalaExf13) >= 0) &&
                (item.KalaExf14 == null ? '' : item.KalaExf14.toString().search(filterKalaExf14) >= 0) &&
                (item.KalaExf15 == null ? '' : item.KalaExf15.toString().search(filterKalaExf15) >= 0) &&
                ko.utils.stringStartsWith(item.InDocNo.toString().toLowerCase(), filterInDocNo) &&
                ko.utils.stringStartsWith(item.VAmount1.toString().toLowerCase(), filterVAmount1) &&
                ko.utils.stringStartsWith(item.VAmount2.toString().toLowerCase(), filterVAmount2) &&
                ko.utils.stringStartsWith(item.VAmount3.toString().toLowerCase(), filterVAmount3) &&
                ko.utils.stringStartsWith(item.VUnitPrice1.toString().toLowerCase(), filterVUnitPrice1) &&
                ko.utils.stringStartsWith(item.VUnitPrice2.toString().toLowerCase(), filterVUnitPrice2) &&
                ko.utils.stringStartsWith(item.VUnitPrice3.toString().toLowerCase(), filterVUnitPrice3) &&
                ko.utils.stringStartsWith(item.VTotalPrice.toString().toLowerCase(), filterVTotalPrice) &&
                (item.iAddMin1 == null ? '' : item.iAddMin1.toString().search(filteriAddMin1) >= 0) &&
                (item.iAddMin2 == null ? '' : item.iAddMin2.toString().search(filteriAddMin2) >= 0) &&
                (item.iAddMin3 == null ? '' : item.iAddMin3.toString().search(filteriAddMin3) >= 0) &&
                ko.utils.stringStartsWith(item.OutDocNo.toString().toLowerCase(), filterOutDocNo) &&
                ko.utils.stringStartsWith(item.SAmount1.toString().toLowerCase(), filterSAmount1) &&
                ko.utils.stringStartsWith(item.SAmount2.toString().toLowerCase(), filterSAmount2) &&
                ko.utils.stringStartsWith(item.SAmount3.toString().toLowerCase(), filterSAmount3) &&
                ko.utils.stringStartsWith(item.SUnitPrice1.toString().toLowerCase(), filterSUnitPrice1) &&
                ko.utils.stringStartsWith(item.SUnitPrice2.toString().toLowerCase(), filterSUnitPrice2) &&
                ko.utils.stringStartsWith(item.SUnitPrice3.toString().toLowerCase(), filterSUnitPrice3) &&
                ko.utils.stringStartsWith(item.STotalPrice.toString().toLowerCase(), filterSTotalPrice) &&
                ko.utils.stringStartsWith(item.MAmount1.toString().toLowerCase(), filterMAmount1) &&
                ko.utils.stringStartsWith(item.MAmount2.toString().toLowerCase(), filterMAmount2) &&
                ko.utils.stringStartsWith(item.MAmount3.toString().toLowerCase(), filterMAmount3) &&
                ko.utils.stringStartsWith(item.MUnitPrice1.toString().toLowerCase(), filterMUnitPrice1) &&
                ko.utils.stringStartsWith(item.MUnitPrice2.toString().toLowerCase(), filterMUnitPrice2) &&
                ko.utils.stringStartsWith(item.MUnitPrice3.toString().toLowerCase(), filterMUnitPrice3) &&
                ko.utils.stringStartsWith(item.MTotalPrice.toString().toLowerCase(), filterMTotalPrice) &&

                (item.MkzCode == null ? '' : item.MkzCode.toString().search(filterMkzCode) >= 0) &&
                (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                (item.OprCode == null ? '' : item.OprCode.toString().search(filterOprCode) >= 0) &&
                (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
                (item.IDocF01 == null ? '' : item.IDocF01.toString().search(filterIDocF01) >= 0) &&
                (item.IDocF02 == null ? '' : item.IDocF02.toString().search(filterIDocF02) >= 0) &&
                (item.IDocF03 == null ? '' : item.IDocF03.toString().search(filterIDocF03) >= 0) &&
                (item.IDocF04 == null ? '' : item.IDocF04.toString().search(filterIDocF04) >= 0) &&
                (item.IDocF05 == null ? '' : item.IDocF05.toString().search(filterIDocF05) >= 0) &&
                (item.IDocF06 == null ? '' : item.IDocF06.toString().search(filterIDocF06) >= 0) &&
                (item.IDocF07 == null ? '' : item.IDocF07.toString().search(filterIDocF07) >= 0) &&
                (item.IDocF08 == null ? '' : item.IDocF08.toString().search(filterIDocF08) >= 0) &&
                (item.IDocF09 == null ? '' : item.IDocF09.toString().search(filterIDocF09) >= 0) &&
                (item.IDocF10 == null ? '' : item.IDocF10.toString().search(filterIDocF10) >= 0) &&
                (item.IDocF11 == null ? '' : item.IDocF11.toString().search(filterIDocF11) >= 0) &&
                (item.IDocF12 == null ? '' : item.IDocF12.toString().search(filterIDocF12) >= 0) &&
                (item.IDocF13 == null ? '' : item.IDocF13.toString().search(filterIDocF13) >= 0) &&
                (item.IDocF14 == null ? '' : item.IDocF14.toString().search(filterIDocF14) >= 0) &&
                (item.IDocF15 == null ? '' : item.IDocF15.toString().search(filterIDocF15) >= 0) &&
                (item.IDocF16 == null ? '' : item.IDocF16.toString().search(filterIDocF16) >= 0) &&
                (item.IDocF17 == null ? '' : item.IDocF17.toString().search(filterIDocF17) >= 0) &&
                (item.IDocF18 == null ? '' : item.IDocF18.toString().search(filterIDocF18) >= 0) &&
                (item.IDocF19 == null ? '' : item.IDocF19.toString().search(filterIDocF19) >= 0) &&
                (item.IDocF20 == null ? '' : item.IDocF20.toString().search(filterIDocF20) >= 0)
            /*   (item.Kalaf01 == null ? '' : item.Kalaf01.toString().search(filterKalaf01) >= 0) &&
             (item.Kalaf02 == null ? '' : item.Kalaf02.toString().search(filterKalaf02) >= 0) &&
             (item.Kalaf03 == null ? '' : item.Kalaf03.toString().search(filterKalaf03) >= 0) &&
             (item.Kalaf04 == null ? '' : item.Kalaf04.toString().search(filterKalaf04) >= 0) &&
             (item.Kalaf05 == null ? '' : item.Kalaf05.toString().search(filterKalaf05) >= 0) &&
             (item.Kalaf06 == null ? '' : item.Kalaf06.toString().search(filterKalaf06) >= 0) &&
             (item.Kalaf07 == null ? '' : item.Kalaf07.toString().search(filterKalaf07) >= 0) &&
             (item.Kalaf08 == null ? '' : item.Kalaf08.toString().search(filterKalaf08) >= 0) &&
             (item.Kalaf09 == null ? '' : item.Kalaf09.toString().search(filterKalaf09) >= 0) &&
             (item.Kalaf10 == null ? '' : item.Kalaf10.toString().search(filterKalaf10) >= 0) &&
             (item.Kalaf11 == null ? '' : item.Kalaf11.toString().search(filterKalaf11) >= 0) &&
             (item.Kalaf12 == null ? '' : item.Kalaf12.toString().search(filterKalaf12) >= 0) &&
             (item.Kalaf13 == null ? '' : item.Kalaf13.toString().search(filterKalaf13) >= 0) &&
             (item.Kalaf14 == null ? '' : item.Kalaf14.toString().search(filterKalaf14) >= 0) &&
             (item.Kalaf15 == null ? '' : item.Kalaf15.toString().search(filterKalaf15) >= 0) &&
             (item.Kalaf16 == null ? '' : item.Kalaf16.toString().search(filterKalaf16) >= 0) &&
             (item.Kalaf17 == null ? '' : item.Kalaf17.toString().search(filterKalaf17) >= 0) &&
             (item.Kalaf18 == null ? '' : item.Kalaf18.toString().search(filterKalaf18) >= 0) &&
             (item.Kalaf19 == null ? '' : item.Kalaf19.toString().search(filterF19) >= 0) &&
             (item.Kalaf20 == null ? '' : item.Kalaf20.toString().search(filterF20) >= 0)*/

            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchKrdx);
    self.firstMatch = ko.dependentObservable(function () {
        var indexKrdx = 0;
        sessionStorage.searchKrdx = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexKrdx(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.KrdxList(), function (item) {
                indexKrdx += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexKrdx < self.pageSizeKrdx())
                self.currentPageIndexKrdx(0);
            else {
                var a = Math.round((indexKrdx / self.pageSizeKrdx()), 0);
                if (a < (indexKrdx / self.pageSizeKrdx())) a += 1;
                self.currentPageIndexKrdx(a - 1);
            }
            return value;
        }
    });


    self.currentPageKrdx = ko.computed(function () {
        var pageSizeKrdx = parseInt(self.pageSizeKrdx(), 10),
            startIndex = pageSizeKrdx * self.currentPageIndexKrdx(),
            endIndex = startIndex + pageSizeKrdx;
        localStorage.setItem('pageSizeKrdx', pageSizeKrdx);
  return self.filterKrdxList().slice(startIndex, endIndex);
    });

    self.nextPageKrdx = function () {
        if (((self.currentPageIndexKrdx() + 1) * self.pageSizeKrdx()) < self.filterKrdxList().length) {
            self.currentPageIndexKrdx(self.currentPageIndexKrdx() + 1);
        }
    };

    self.previousPageKrdx = function () {
        if (self.currentPageIndexKrdx() > 0) {
            self.currentPageIndexKrdx(self.currentPageIndexKrdx() - 1);
        }
    };

    self.firstPageKrdx = function () {
        self.currentPageIndexKrdx(0);
    };

    self.lastPageKrdx = function () {
        tempCountKrdx = parseInt(self.filterKrdxList().length / self.pageSizeKrdx(), 10);
        if ((self.filterKrdxList().length % self.pageSizeKrdx()) == 0)
            self.currentPageIndexKrdx(tempCountKrdx - 1);
        else
            self.currentPageIndexKrdx(tempCountKrdx);
    };

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeDocDate = ko.observable("");
    //self.iconTypeInvName = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeThvlCode = ko.observable("");
    self.iconTypeThvlName = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeDimX = ko.observable("");
    self.iconTypeDimY = ko.observable("");
    self.iconTypeDimZ = ko.observable("");
    self.iconTypeKalaFileNo = ko.observable("");
    self.iconTypeKalaState = ko.observable("");
    self.iconTypeKalaExf1 = ko.observable("");
    self.iconTypeKalaExf2 = ko.observable("");
    self.iconTypeKalaExf3 = ko.observable("");
    self.iconTypeKalaExf4 = ko.observable("");
    self.iconTypeKalaExf5 = ko.observable("");
    self.iconTypeKalaExf6 = ko.observable("");
    self.iconTypeKalaExf7 = ko.observable("");
    self.iconTypeKalaExf8 = ko.observable("");
    self.iconTypeKalaExf9 = ko.observable("");
    self.iconTypeKalaExf10 = ko.observable("");
    self.iconTypeKalaExf11 = ko.observable("");
    self.iconTypeKalaExf12 = ko.observable("");
    self.iconTypeKalaExf13 = ko.observable("");
    self.iconTypeKalaExf14 = ko.observable("");
    self.iconTypeKalaExf15 = ko.observable("");
    self.iconTypeInDocNo = ko.observable("");
    self.iconTypeVAmount1 = ko.observable("");
    self.iconTypeVAmount2 = ko.observable("");
    self.iconTypeVAmount3 = ko.observable("");
    self.iconTypeVUnitPrice1 = ko.observable("");
    self.iconTypeVUnitPrice2 = ko.observable("");
    self.iconTypeVUnitPrice3 = ko.observable("");
    self.iconTypeVTotalPrice = ko.observable("");
    self.iconTypeiAddMin1 = ko.observable("");
    self.iconTypeiAddMin2 = ko.observable("");
    self.iconTypeiAddMin3 = ko.observable("");
    self.iconTypeOutDocNo = ko.observable("");
    self.iconTypeSAmount1 = ko.observable("");
    self.iconTypeSAmount2 = ko.observable("");
    self.iconTypeSAmount3 = ko.observable("");
    self.iconTypeSUnitPrice1 = ko.observable("");
    self.iconTypeSUnitPrice2 = ko.observable("");
    self.iconTypeSUnitPrice3 = ko.observable("");
    self.iconTypeSTotalPrice = ko.observable("");

    self.iconTypeMAmount1 = ko.observable("");
    self.iconTypeMAmount2 = ko.observable("");
    self.iconTypeMAmount3 = ko.observable("");
    self.iconTypeMUnitPrice1 = ko.observable("");
    self.iconTypeMUnitPrice2 = ko.observable("");
    self.iconTypeMUnitPrice3 = ko.observable("");
    self.iconTypeMTotalPrice = ko.observable("");

    self.iconTypeMkzCode = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprCode = ko.observable("");
    self.iconTypeOprName = ko.observable("");
    self.iconTypeIDocF01 = ko.observable("");
    self.iconTypeIDocF02 = ko.observable("");
    self.iconTypeIDocF03 = ko.observable("");
    self.iconTypeIDocF04 = ko.observable("");
    self.iconTypeIDocF05 = ko.observable("");
    self.iconTypeIDocF06 = ko.observable("");
    self.iconTypeIDocF07 = ko.observable("");
    self.iconTypeIDocF08 = ko.observable("");
    self.iconTypeIDocF09 = ko.observable("");
    self.iconTypeIDocF10 = ko.observable("");
    self.iconTypeIDocF11 = ko.observable("");
    self.iconTypeIDocF12 = ko.observable("");
    self.iconTypeIDocF13 = ko.observable("");
    self.iconTypeIDocF14 = ko.observable("");
    self.iconTypeIDocF15 = ko.observable("");
    self.iconTypeIDocF16 = ko.observable("");
    self.iconTypeIDocF17 = ko.observable("");
    self.iconTypeIDocF18 = ko.observable("");
    self.iconTypeIDocF19 = ko.observable("");
    self.iconTypeIDocF20 = ko.observable("");
    /* self.iconTypeKalaf01 = ko.observable("");
   self.iconTypeKalaf02 = ko.observable("");
   self.iconTypeKalaf03 = ko.observable("");
   self.iconTypeKalaf04 = ko.observable("");
   self.iconTypeKalaf05 = ko.observable("");
   self.iconTypeKalaf06 = ko.observable("");
   self.iconTypeKalaf07 = ko.observable("");
   self.iconTypeKalaf08 = ko.observable("");
   self.iconTypeKalaf09 = ko.observable("");
   self.iconTypeKalaf10 = ko.observable("");
   self.iconTypeKalaf11 = ko.observable("");
   self.iconTypeKalaf12 = ko.observable("");
   self.iconTypeKalaf13 = ko.observable("");
   self.iconTypeKalaf14 = ko.observable("");
   self.iconTypeKalaf15 = ko.observable("");
   self.iconTypeKalaf16 = ko.observable("");
   self.iconTypeKalaf17 = ko.observable("");
   self.iconTypeKalaf18 = ko.observable("");
   self.iconTypeKalaf19 = ko.observable("");
   self.iconTypeKalaf20 = ko.observable("");*/


    self.sortTableKrdx = function (viewModel, e) {
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
        self.KrdxList.sort(function (left, right) {
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

        //DocDate,InvName,ModeName,Spec,ThvlCode,ThvlName,Status,DimX,DimY,DimZ,KalaFileNo,KalaState,KalaExf1,InDocNo,VAmount1,VUnitPrice1,VAmount2,VUnitPrice2,VAmount3,VUnitPrice3,VTotalPrice,iAddMin1,iAddMin2,iAddMin3,OutDocNo,SAmount1,SUnitPrice1,SAmount2,SUnitPrice2,SAmount3,SUnitPrice3,STotalPrice,MkzCode,MkzName,OprCode,OprName,F01,Kalaf01,
        //DocDate,InvName,ModeName,Spec,ThvlCode,ThvlName,Status,DimX,DimY,DimZ,KalaFileNo,KalaState,KalaExf1,InDocNo,VAmount1,VUnitPrice1,VAmount2,VUnitPrice2,VAmount3,VUnitPrice3,VTotalPrice,iAddMin1,iAddMin2,iAddMin3,OutDocNo,SAmount1,SUnitPrice1,SAmount2,SUnitPrice2,SAmount3,SUnitPrice3,STotalPrice,MkzCode,MkzName,OprCode,OprName,F01,Kalaf01,
        //DocDate,InvName,ModeName,Spec,ThvlCode,ThvlName,Status,DimX,DimY,DimZ,KalaFileNo,KalaState,KalaExf1,InDocNo,VAmount1,VUnitPrice1,VAmount2,VUnitPrice2,VAmount3,VUnitPrice3,VTotalPrice,iAddMin1,iAddMin2,iAddMin3,OutDocNo,SAmount1,SUnitPrice1,SAmount2,SUnitPrice2,SAmount3,SUnitPrice3,STotalPrice,MkzCode,MkzName,OprCode,OprName,F01,Kalaf01,

        self.iconTypeDocDate('');
        //self.iconTypeInvName('');
        self.iconTypeModeName('');
        self.iconTypeSpec('');
        self.iconTypeThvlCode('');
        self.iconTypeThvlName('');
        self.iconTypeStatus('');
        self.iconTypeDimX('');
        self.iconTypeDimY('');
        self.iconTypeDimZ('');
        self.iconTypeKalaFileNo('');
        self.iconTypeKalaState('');
        self.iconTypeKalaExf1('');
        self.iconTypeKalaExf2('');
        self.iconTypeKalaExf3('');
        self.iconTypeKalaExf4('');
        self.iconTypeKalaExf5('');
        self.iconTypeKalaExf6('');
        self.iconTypeKalaExf7('');
        self.iconTypeKalaExf8('');
        self.iconTypeKalaExf9('');
        self.iconTypeKalaExf10('');
        self.iconTypeKalaExf11('');
        self.iconTypeKalaExf12('');
        self.iconTypeKalaExf13('');
        self.iconTypeKalaExf14('');
        self.iconTypeKalaExf15('');
        self.iconTypeInDocNo('');
        self.iconTypeVAmount1('');
        self.iconTypeVAmount2('');
        self.iconTypeVAmount3('');
        self.iconTypeVUnitPrice1('');
        self.iconTypeVUnitPrice2('');
        self.iconTypeVUnitPrice3('');
        self.iconTypeVTotalPrice('');
        self.iconTypeiAddMin1('');
        self.iconTypeiAddMin2('');
        self.iconTypeiAddMin3('');
        self.iconTypeOutDocNo('');
        self.iconTypeSAmount1('');
        self.iconTypeSAmount2('');
        self.iconTypeSAmount3('');
        self.iconTypeSUnitPrice1('');
        self.iconTypeSUnitPrice2('');
        self.iconTypeSUnitPrice3('');
        self.iconTypeSTotalPrice('');

        self.iconTypeMAmount1('');
        self.iconTypeMAmount2('');
        self.iconTypeMAmount3('');
        self.iconTypeMUnitPrice1('');
        self.iconTypeMUnitPrice2('');
        self.iconTypeMUnitPrice3('');
        self.iconTypeMTotalPrice('');

        self.iconTypeMkzCode('');
        self.iconTypeMkzName('');
        self.iconTypeOprCode('');
        self.iconTypeOprName('');
        self.iconTypeIDocF01('');
        self.iconTypeIDocF02('');
        self.iconTypeIDocF03('');
        self.iconTypeIDocF04('');
        self.iconTypeIDocF05('');
        self.iconTypeIDocF06('');
        self.iconTypeIDocF07('');
        self.iconTypeIDocF08('');
        self.iconTypeIDocF09('');
        self.iconTypeIDocF10('');
        self.iconTypeIDocF11('');
        self.iconTypeIDocF12('');
        self.iconTypeIDocF13('');
        self.iconTypeIDocF14('');
        self.iconTypeIDocF15('');
        self.iconTypeIDocF16('');
        self.iconTypeIDocF17('');
        self.iconTypeIDocF18('');
        self.iconTypeIDocF19('');
        self.iconTypeIDocF20('');
        /*   self.iconTypeKalaf01('');
         self.iconTypeKalaf02('');
         self.iconTypeKalaf03('');
         self.iconTypeKalaf04('');
         self.iconTypeKalaf05('');
         self.iconTypeKalaf06('');
         self.iconTypeKalaf07('');
         self.iconTypeKalaf08('');
         self.iconTypeKalaf09('');
         self.iconTypeKalaf10('');
         self.iconTypeKalaf11('');
         self.iconTypeKalaf12('');
         self.iconTypeKalaf13('');
         self.iconTypeKalaf14('');
         self.iconTypeKalaf15('');
         self.iconTypeKalaf16('');
         self.iconTypeKalaf17('');
         self.iconTypeKalaf18('');
         self.iconTypeKalaf19('');
         self.iconTypeKalaf20('');*/


        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        // if (orderProp == 'InvName') self.iconTypeInvName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlCode') self.iconTypeThvlCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlName') self.iconTypeThvlName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DimX') self.iconTypeDimX((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DimY') self.iconTypeDimY((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DimZ') self.iconTypeDimZ((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaFileNo') self.iconTypeKalaFileNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaState') self.iconTypeKalaState((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf1') self.iconTypeKalaExf1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf2') self.iconTypeKalaExf2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf3') self.iconTypeKalaExf3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf4') self.iconTypeKalaExf4((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf5') self.iconTypeKalaExf5((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf6') self.iconTypeKalaExf6((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf7') self.iconTypeKalaExf7((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf8') self.iconTypeKalaExf8((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf9') self.iconTypeKalaExf9((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf10') self.iconTypeKalaExf10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf11') self.iconTypeKalaExf11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf12') self.iconTypeKalaExf12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf13') self.iconTypeKalaExf13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf14') self.iconTypeKalaExf14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf15') self.iconTypeKalaExf15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

        if (orderProp == 'InDocNo') self.iconTypeInDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount1') self.iconTypeVAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount2') self.iconTypeVAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount3') self.iconTypeVAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VUnitPrice1') self.iconTypeVUnitPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VUnitPrice2') self.iconTypeVUnitPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VUnitPrice3') self.iconTypeVUnitPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VTotalPrice') self.iconTypeVTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'iAddMin1') self.iconTypeiAddMin1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'iAddMin2') self.iconTypeiAddMin2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'iAddMin3') self.iconTypeiAddMin3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OutDocNo') self.iconTypeOutDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount1') self.iconTypeSAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount2') self.iconTypeSAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount3') self.iconTypeSAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SUnitPrice1') self.iconTypeSUnitPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SUnitPrice2') self.iconTypeSUnitPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SUnitPrice3') self.iconTypeSUnitPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'STotalPrice') self.iconTypeSTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

        if (orderProp == 'MAmount1') self.iconTypeMAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount2') self.iconTypeMAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount3') self.iconTypeMAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MUnitPrice1') self.iconTypeMUnitPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MUnitPrice2') self.iconTypeMUnitPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MUnitPrice3') self.iconTypeMUnitPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MTotalPrice') self.iconTypeMTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

        if (orderProp == 'SortMkzCode') self.iconTypeMkzCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprCode') self.iconTypeOprCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

        if (orderProp == 'IDocF01') self.iconTypeIDocF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF02') self.iconTypeIDocF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF03') self.iconTypeIDocF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF04') self.iconTypeIDocF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF05') self.iconTypeIDocF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF06') self.iconTypeIDocF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF07') self.iconTypeIDocF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF08') self.iconTypeIDocF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF09') self.iconTypeIDocF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF10') self.iconTypeIDocF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF11') self.iconTypeIDocF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF12') self.iconTypeIDocF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF13') self.iconTypeIDocF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF14') self.iconTypeIDocF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF15') self.iconTypeIDocF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF16') self.iconTypeIDocF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF17') self.iconTypeIDocF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF18') self.iconTypeIDocF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF19') self.iconTypeIDocF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'IDocF20') self.iconTypeIDocF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        /*  if (orderProp == 'Kalaf01') self.iconTypeKalaf01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf02') self.iconTypeKalaf02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf03') self.iconTypeKalaf03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf04') self.iconTypeKalaf04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf05') self.iconTypeKalaf05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf06') self.iconTypeKalaf06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf07') self.iconTypeKalaf07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf08') self.iconTypeKalaf08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf09') self.iconTypeKalaf09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf10') self.iconTypeKalaf10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf11') self.iconTypeKalaf11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf12') self.iconTypeKalaf12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf13') self.iconTypeKalaf13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf14') self.iconTypeKalaf14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf15') self.iconTypeKalaf15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf16') self.iconTypeKalaf16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf17') self.iconTypeKalaf17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf18') self.iconTypeKalaf18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf19') self.iconTypeKalaf19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Kalaf20') self.iconTypeKalaf20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");*/

    }






    self.currentPageInv = ko.observable();
    pageSizeInv = localStorage.getItem('pageSizeInv') == null ? 10 : localStorage.getItem('pageSizeInv');
    self.pageSizeInv = ko.observable(pageSizeInv);
    self.currentPageIndexInv = ko.observable(0);

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageInv = ko.observable();
    self.filterInv0 = ko.observable("");
    self.filterInv1 = ko.observable("");
    self.filterInv2 = ko.observable("");

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

    };

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
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالاها به روز رسانی شد' });
            }
        })
    })

    self.selectInv = function (item) {
        $('#nameInv').val('(' + item.Code + ') ' + item.Name);
        self.InvCode(item.Code);
        self.InvName(item.Name);
    }


    $('#modal-Inv').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });













    self.currentPageKala = ko.observable();
    pageSizeKala = localStorage.getItem('pageSizeKala') == null ? 10 : localStorage.getItem('pageSizeKala');
    self.pageSizeKala = ko.observable(pageSizeKala);
    self.currentPageIndexKala = ko.observable(0);

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeFanniNo = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageKala = ko.observable();
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
            title: 'تایید به روز رسانی',
            text: "لیست کالاها به روز رسانی شود ؟",
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
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالاها به روز رسانی شد' });
            }
        })
    })

    self.selectKala = function (item) {
        $('#nameKala').val('(' + item.Code + ') ' + item.Name);
        self.KalaCode(item.Code);
        self.KalaName(item.Name);
    }


    $('#modal-Kala').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });



    self.currentPageThvl = ko.observable();
    pageSizeThvl = localStorage.getItem('pageSizeThvl') == null ? 10 : localStorage.getItem('pageSizeThvl');
    self.pageSizeThvl = ko.observable(pageSizeThvl);
    self.currentPageIndexThvl = ko.observable(0);

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

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshThvl').click(function () {
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
                getThvlList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddThvl = function (item) {

        ThvlCode = item.Code;
        find = false;
        list_ThvlSelect.forEach(function (item, key) {
            if (item == ThvlCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListThvl').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_ThvlSelect[counterThvl] = item.Code;
            counterThvl = counterThvl + 1;
        }
    };


    self.AddAllThvl = function () {
        list_ThvlSelect = new Array();
        list = self.ThvlList();
        $("#TableBodyListThvl").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListThvl').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_ThvlSelect[i] = list[i].Code;
            counterThvl = i + 1;
        }
    };


    self.DelAllThvl = function () {
        list_ThvlSelect = new Array();
        counterThvl = 0;
        $("#TableBodyListThvl").empty();
    };


    $('#modal-Thvl').on('hide.bs.modal', function () {
        if (counterThvl > 0)
            $('#nameThvl').val(counterThvl + ' مورد انتخاب شده ')
        else
            $('#nameThvl').val('همه موارد');
    });

    $('#modal-Thvl').on('shown.bs.modal', function () {
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



    function getByKalaExf() {
        select = document.getElementById('byKalaExf');
        for (var i = 0; i <= 1; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 0;
                opt.innerHTML = 'با ویژگی کالا';
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = 'بدون ویژگی کالا';

            }
            select.appendChild(opt);
        }
    };

    function getNaghl() {
        select = document.getElementById('naghl');
        for (var i = 0; i <= 1; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 0;
                opt.innerHTML = 'محاسبه نشود';
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = 'محاسبه شود';

            }
            select.appendChild(opt);
        }
    };



    $('.fix').attr('class', 'form-line date focused fix');


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
        if (orderProp == null) {
            return null
        }
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
            title: 'تایید به روز رسانی',
            text: "لیست وضعیت سند به روز رسانی شود ؟",
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







    getIModeList();
    //Get IMode List
    function getIModeList() {

        var IModeObject = {
            Mode: 0,
            InOut: 0,
            UserCode: sessionStorage.userName,
        }

        ajaxFunction(IModeUri + ace + '/' + sal + '/' + group, 'POST', IModeObject).done(function (data) {
           // a = data;
           // var strCopy = data.split('~');
           // var strCopy1 = strCopy[0].split('!');
            self.IModeList(data);
        });
    }

    self.currentPageIMode = ko.observable();
    pageSizeIMode = localStorage.getItem('pageSizeIMode') == null ? 10 : localStorage.getItem('pageSizeIMode');
    self.pageSizeIMode = ko.observable(pageSizeIMode);
    self.currentPageIndexIMode = ko.observable(0);

    self.filterIMode0 = ko.observable("");
    self.filterIMode1 = ko.observable("");

    self.filterIModeList = ko.computed(function () {

        self.currentPageIndexIMode(0);
        var filter0 = self.filterIMode0().toUpperCase();
        var filter1 = self.filterIMode1();

        if (!filter0 && !filter1) {
            return self.IModeList();
        } else {
            tempData = ko.utils.arrayFilter(self.IModeList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageIMode = ko.computed(function () {
        var pageSizeIMode = parseInt(self.pageSizeIMode(), 10),
            startIndex = pageSizeIMode * self.currentPageIndexIMode(),
            endIndex = startIndex + pageSizeIMode;
        localStorage.setItem('pageSizeIMode', pageSizeIMode);
  return self.filterIModeList().slice(startIndex, endIndex);
    });

    self.nextPageIMode = function () {
        if (((self.currentPageIndexIMode() + 1) * self.pageSizeIMode()) < self.filterIModeList().length) {
            self.currentPageIndexIMode(self.currentPageIndexIMode() + 1);
        }
    };

    self.previousPageIMode = function () {
        if (self.currentPageIndexIMode() > 0) {
            self.currentPageIndexIMode(self.currentPageIndexIMode() - 1);
        }
    };

    self.firstPageIMode = function () {
        self.currentPageIndexIMode(0);
    };

    self.lastPageIMode = function () {
        countIMode = parseInt(self.filterIModeList().length / self.pageSizeIMode(), 10);
        if ((self.filterIModeList().length % self.pageSizeIMode()) == 0)
            self.currentPageIndexIMode(countIMode - 1);
        else
            self.currentPageIndexIMode(countIMode);
    };

    self.sortTableIMode = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.IModeList.sort(function (left, right) {
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


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshIMode').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست انواع سند به روز رسانی شود ؟",
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
                getIModeList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddIMode = function (item) {

        IModeCode = item.Code;
        find = false;
        list_IModeSelect.forEach(function (item, key) {
            if (item == IModeCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListIMode').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_IModeSelect[counterIMode] = item.Code;
            counterIMode = counterIMode + 1;
        }
    };


    self.AddAllIMode = function () {
        list_IModeSelect = new Array();
        list = self.IModeList();
        $("#TableBodyListIMode").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListIMode').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_IModeSelect[i] = list[i].Code;
            counterIMode = i + 1;
        }
    };


    self.DelAllIMode = function () {
        list_IModeSelect = new Array();
        counterIMode = 0;
        $("#TableBodyListIMode").empty();
    };


    $('#modal-IMode').on('hide.bs.modal', function () {
        if (counterIMode > 0)
            $('#nameIMode').val(counterIMode + ' مورد انتخاب شده ')
        else
            $('#nameIMode').val('همه موارد');
    });

    $('#modal-IMode').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });



    var showPrice = false;

    self.radif = function (index) {
        countShow = self.pageSizeKrdx();
        page = self.currentPageIndexKrdx();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableReport").empty();

        showPrice = sessionStorage.FDoc_REP_PRICE == 'true';
        //showPrice = false;
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableKrdx">' +
            '<th>ردیف</th>' +
            CreateTableTh('DocDate', data) +
            //CreateTableTh('InvName', data) +
            CreateTableTh('ModeName', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('ThvlCode', data) +
            CreateTableTh('ThvlName', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('DimX', data) +
            CreateTableTh('DimY', data) +
            CreateTableTh('DimZ', data) +
            CreateTableTh('KalaFileNo', data) +
            CreateTableTh('KalaState', data) +
            CreateTableTh('KalaExf1', data) +
            CreateTableTh('KalaExf2', data) +
            CreateTableTh('KalaExf3', data) +
            CreateTableTh('KalaExf4', data) +
            CreateTableTh('KalaExf5', data) +
            CreateTableTh('KalaExf6', data) +
            CreateTableTh('KalaExf7', data) +
            CreateTableTh('KalaExf8', data) +
            CreateTableTh('KalaExf9', data) +
            CreateTableTh('KalaExf10', data) +
            CreateTableTh('KalaExf11', data) +
            CreateTableTh('KalaExf12', data) +
            CreateTableTh('KalaExf13', data) +
            CreateTableTh('KalaExf14', data) +
            CreateTableTh('KalaExf15', data) +
            CreateTableTh('InDocNo', data) +
            CreateTableTh('VAmount1', data) +
            CreateTableTh('VUnitPrice1', data) +
            CreateTableTh('VAmount2', data) +
            CreateTableTh('VUnitPrice2', data) +
            CreateTableTh('VAmount3', data) +
            CreateTableTh('VUnitPrice3', data) +
            CreateTableTh('VTotalPrice', data) +
            CreateTableTh('iAddMin1', data) +
            CreateTableTh('iAddMin2', data) +
            CreateTableTh('iAddMin3', data) +
            CreateTableTh('OutDocNo', data) +
            CreateTableTh('SAmount1', data) +
            CreateTableTh('SUnitPrice1', data) +
            CreateTableTh('SAmount2', data) +
            CreateTableTh('SUnitPrice2', data) +
            CreateTableTh('SAmount3', data) +
            CreateTableTh('SUnitPrice3', data) +
            CreateTableTh('STotalPrice', data) +

            CreateTableTh('MAmount1', data) +
            CreateTableTh('MUnitPrice1', data) +
            CreateTableTh('MAmount2', data) +
            CreateTableTh('MUnitPrice2', data) +
            CreateTableTh('MAmount3', data) +
            CreateTableTh('MUnitPrice3', data) +
            CreateTableTh('MTotalPrice', data) +

            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('IDocF01', data) +
            CreateTableTh('IDocF02', data) +
            CreateTableTh('IDocF03', data) +
            CreateTableTh('IDocF04', data) +
            CreateTableTh('IDocF05', data) +
            CreateTableTh('IDocF06', data) +
            CreateTableTh('IDocF07', data) +
            CreateTableTh('IDocF08', data) +
            CreateTableTh('IDocF09', data) +
            CreateTableTh('IDocF10', data) +
            CreateTableTh('IDocF11', data) +
            CreateTableTh('IDocF12', data) +
            CreateTableTh('IDocF13', data) +
            CreateTableTh('IDocF14', data) +
            CreateTableTh('IDocF15', data) +
            CreateTableTh('IDocF16', data) +
            CreateTableTh('IDocF17', data) +
            CreateTableTh('IDocF18', data) +
            CreateTableTh('IDocF19', data) +
            CreateTableTh('IDocF20', data) +
            /*   CreateTableTh('Kalaf01', data) +
             CreateTableTh('Kalaf02', data) +
             CreateTableTh('Kalaf03', data) +
             CreateTableTh('Kalaf04', data) +
             CreateTableTh('Kalaf05', data) +
             CreateTableTh('Kalaf06', data) +
             CreateTableTh('Kalaf07', data) +
             CreateTableTh('Kalaf08', data) +
             CreateTableTh('Kalaf09', data) +
             CreateTableTh('Kalaf10', data) +
             CreateTableTh('Kalaf11', data) +
             CreateTableTh('Kalaf12', data) +
             CreateTableTh('Kalaf13', data) +
             CreateTableTh('Kalaf14', data) +
             CreateTableTh('Kalaf15', data) +
             CreateTableTh('Kalaf16', data) +
             CreateTableTh('Kalaf17', data) +
             CreateTableTh('Kalaf18', data) +
             CreateTableTh('Kalaf19', data) +
             CreateTableTh('Kalaf20', data) +*/
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind=" {foreach: currentPageKrdx}" style="cursor: default;">' +
            '     <tr data-bind=" style: {color:  Status == \'باطل\'  ? \'#ff252540\' : null ,  \'background-color\':  DocNo == \'0\'  ? \'#efb68399\' : null } " >' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('DocDate', 0, 0, 0, data) +
            // CreateTableTd('InvName', 0, 0,0, data) +
            CreateTableTd('ModeName', 0, 0, 0, data) +
            CreateTableTd('Spec', 0, 0, 0, data) +
            CreateTableTd('ThvlCode', 0, 0, 0, data) +
            CreateTableTd('ThvlName', 0, 0, 0, data) +
            CreateTableTd('Status', 0, 0, 0, data) +
            CreateTableTd('DimX', 0, 0, 0, data) +
            CreateTableTd('DimY', 0, 0, 0, data) +
            CreateTableTd('DimZ', 0, 0, 0, data) +
            CreateTableTd('KalaFileNo', 0, 0, 0, data) +
            CreateTableTd('KalaState', 0, 0, 0, data) +
            CreateTableTd('KalaExf1', 0, 0, 0, data) +
            CreateTableTd('KalaExf2', 0, 0, 0, data) +
            CreateTableTd('KalaExf3', 0, 0, 0, data) +
            CreateTableTd('KalaExf4', 0, 0, 0, data) +
            CreateTableTd('KalaExf5', 0, 0, 0, data) +
            CreateTableTd('KalaExf6', 0, 0, 0, data) +
            CreateTableTd('KalaExf7', 0, 0, 0, data) +
            CreateTableTd('KalaExf8', 0, 0, 0, data) +
            CreateTableTd('KalaExf9', 0, 0, 0, data) +
            CreateTableTd('KalaExf10', 0, 0, 0, data) +
            CreateTableTd('KalaExf11', 0, 0, 0, data) +
            CreateTableTd('KalaExf12', 0, 0, 0, data) +
            CreateTableTd('KalaExf13', 0, 0, 0, data) +
            CreateTableTd('KalaExf14', 0, 0, 0, data) +
            CreateTableTd('KalaExf15', 0, 0, 0, data) +
            CreateTableTd('InDocNo', 0, 0, 'cornsilk', data) +
            CreateTableTd('VAmount1', 'DeghatM1', 1, 'cornsilk', data) +
            CreateTableTd('VUnitPrice1', 'DeghatR1', 2, 'cornsilk', data) +
            CreateTableTd('VAmount2', 'DeghatM2', 1, 'cornsilk', data) +
            CreateTableTd('VUnitPrice2', 'DeghatR2', 2, 'cornsilk', data) +
            CreateTableTd('VAmount3', 'DeghatM3', 1, 'cornsilk', data) +
            CreateTableTd('VUnitPrice3', 'DeghatR3', 2, 'cornsilk', data) +
            CreateTableTd('VTotalPrice', sessionStorage.Deghat, 2, 'cornsilk', data) +
            CreateTableTd('iAddMin1', 0, 0, 0, data) +
            CreateTableTd('iAddMin2', 0, 0, 0, data) +
            CreateTableTd('iAddMin3', 0, 0, 0, data) +
            CreateTableTd('OutDocNo', 0, 0, 0, data) +
            CreateTableTd('SAmount1', 'DeghatM1', 1, 0, data) +
            CreateTableTd('SUnitPrice1', 'DeghatR1', 2, 0, data) +
            CreateTableTd('SAmount2', 'DeghatM2', 1, 0, data) +
            CreateTableTd('SUnitPrice2', 'DeghatR2', 2, 0, data) +
            CreateTableTd('SAmount3', 'DeghatM3', 1, 0, data) +
            CreateTableTd('SUnitPrice3', 'DeghatR3', 2, 0, data) +
            CreateTableTd('STotalPrice', sessionStorage.Deghat, 2, 0, data) +

            CreateTableTd('MAmount1', 'DeghatM1', 1, 'cornsilk', data) +
            CreateTableTd('MUnitPrice1', 'DeghatR1', 2, 'cornsilk', data) +
            CreateTableTd('MAmount2', 'DeghatM2', 1, 'cornsilk', data) +
            CreateTableTd('MUnitPrice2', 'DeghatR2', 2, 'cornsilk', data) +
            CreateTableTd('MAmount3', 'DeghatM3', 1, 'cornsilk', data) +
            CreateTableTd('MUnitPrice3', 'DeghatR3', 2, 'cornsilk', data) +
            CreateTableTd('MTotalPrice', sessionStorage.Deghat, 2, 'cornsilk', data) +

            CreateTableTd('MkzCode', 0, 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, 0, data) +
            CreateTableTd('OprName', 0, 0, 0, data) +
            CreateTableTd('IDocF01', 0, 0, 0, data) +
            CreateTableTd('IDocF02', 0, 0, 0, data) +
            CreateTableTd('IDocF03', 0, 0, 0, data) +
            CreateTableTd('IDocF04', 0, 0, 0, data) +
            CreateTableTd('IDocF05', 0, 0, 0, data) +
            CreateTableTd('IDocF06', 0, 0, 0, data) +
            CreateTableTd('IDocF07', 0, 0, 0, data) +
            CreateTableTd('IDocF08', 0, 0, 0, data) +
            CreateTableTd('IDocF09', 0, 0, 0, data) +
            CreateTableTd('IDocF10', 0, 0, 0, data) +
            CreateTableTd('IDocF11', 0, 0, 0, data) +
            CreateTableTd('IDocF12', 0, 0, 0, data) +
            CreateTableTd('IDocF13', 0, 0, 0, data) +
            CreateTableTd('IDocF14', 0, 0, 0, data) +
            CreateTableTd('IDocF15', 0, 0, 0, data) +
            CreateTableTd('IDocF16', 0, 0, 0, data) +
            CreateTableTd('IDocF17', 0, 0, 0, data) +
            CreateTableTd('IDocF18', 0, 0, 0, data) +
            CreateTableTd('IDocF19', 0, 0, 0, data) +
            CreateTableTd('IDocF20', 0, 0, 0, data) +
            /* CreateTableTd('Kalaf01', 0, 0, data) +
           CreateTableTd('Kalaf02', 0, 0, data) +
           CreateTableTd('Kalaf03', 0, 0, data) +
           CreateTableTd('Kalaf04', 0, 0, data) +
           CreateTableTd('Kalaf05', 0, 0, data) +
           CreateTableTd('Kalaf06', 0, 0, data) +
           CreateTableTd('Kalaf07', 0, 0, data) +
           CreateTableTd('Kalaf08', 0, 0, data) +
           CreateTableTd('Kalaf09', 0, 0, data) +
           CreateTableTd('Kalaf10', 0, 0, data) +
           CreateTableTd('Kalaf11', 0, 0, data) +
           CreateTableTd('Kalaf12', 0, 0, data) +
           CreateTableTd('Kalaf13', 0, 0, data) +
           CreateTableTd('Kalaf14', 0, 0, data) +
           CreateTableTd('Kalaf15', 0, 0, data) +
           CreateTableTd('Kalaf16', 0, 0, data) +
           CreateTableTd('Kalaf17', 0, 0, data) +
           CreateTableTd('Kalaf18', 0, 0, data) +
           CreateTableTd('Kalaf19', 0, 0, data) +
           CreateTableTd('Kalaf20', 0, 0, data) +*/

            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td>جمع</td>' +
            CreateTableTdSum('DocDate', 0, data) +
            //CreateTableTdSum('InvName', 1, data) +
            CreateTableTdSum('ModeName', 1, data) +
            CreateTableTdSum('Spec', 1, data) +
            CreateTableTdSum('ThvlCode', 1, data) +
            CreateTableTdSum('ThvlName', 1, data) +
            CreateTableTdSum('Status', 1, data) +
            CreateTableTdSum('DimX', 1, data) +
            CreateTableTdSum('DimY', 1, data) +
            CreateTableTdSum('DimZ', 1, data) +
            CreateTableTdSum('KalaFileNo', 1, data) +
            CreateTableTdSum('KalaState', 1, data) +
            CreateTableTdSum('KalaExf1', 1, data) +
            CreateTableTdSum('KalaExf2', 1, data) +
            CreateTableTdSum('KalaExf3', 1, data) +
            CreateTableTdSum('KalaExf4', 1, data) +
            CreateTableTdSum('KalaExf5', 1, data) +
            CreateTableTdSum('KalaExf6', 1, data) +
            CreateTableTdSum('KalaExf7', 1, data) +
            CreateTableTdSum('KalaExf8', 1, data) +
            CreateTableTdSum('KalaExf9', 1, data) +
            CreateTableTdSum('KalaExf10', 1, data) +
            CreateTableTdSum('KalaExf11', 1, data) +
            CreateTableTdSum('KalaExf12', 1, data) +
            CreateTableTdSum('KalaExf13', 1, data) +
            CreateTableTdSum('KalaExf14', 1, data) +
            CreateTableTdSum('KalaExf15', 1, data) +
            CreateTableTdSum('InDocNo', 1, data) +
            CreateTableTdSum('VAmount1', 2, data) +
            CreateTableTdSum('VUnitPrice1', 2, data) +
            CreateTableTdSum('VAmount2', 2, data) +
            CreateTableTdSum('VUnitPrice2', 2, data) +
            CreateTableTdSum('VAmount3', 2, data) +
            CreateTableTdSum('VUnitPrice3', 2, data) +
            CreateTableTdSum('VTotalPrice', 2, data) +
            CreateTableTdSum('iAddMin1', 1, data) +
            CreateTableTdSum('iAddMin2', 1, data) +
            CreateTableTdSum('iAddMin3', 1, data) +
            CreateTableTdSum('OutDocNo', 1, data) +
            CreateTableTdSum('SAmount1', 2, data) +
            CreateTableTdSum('SUnitPrice1', 2, data) +
            CreateTableTdSum('SAmount2', 2, data) +
            CreateTableTdSum('SUnitPrice2', 2, data) +
            CreateTableTdSum('SAmount3', 2, data) +
            CreateTableTdSum('SUnitPrice3', 2, data) +
            CreateTableTdSum('STotalPrice', 2, data) +

            CreateTableTdSum('MAmount1', 2, data) +
            CreateTableTdSum('MUnitPrice1', 2, data) +
            CreateTableTdSum('MAmount2', 2, data) +
            CreateTableTdSum('MUnitPrice2', 2, data) +
            CreateTableTdSum('MAmount3', 2, data) +
            CreateTableTdSum('MUnitPrice3', 2, data) +
            CreateTableTdSum('MTotalPrice', 2, data) +

            CreateTableTdSum('MkzCode', 1, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('OprCode', 1, data) +
            CreateTableTdSum('OprName', 1, data) +
            CreateTableTdSum('IDocF01', 1, data) +
            CreateTableTdSum('IDocF02', 1, data) +
            CreateTableTdSum('IDocF03', 1, data) +
            CreateTableTdSum('IDocF04', 1, data) +
            CreateTableTdSum('IDocF05', 1, data) +
            CreateTableTdSum('IDocF06', 1, data) +
            CreateTableTdSum('IDocF07', 1, data) +
            CreateTableTdSum('IDocF08', 1, data) +
            CreateTableTdSum('IDocF09', 1, data) +
            CreateTableTdSum('IDocF10', 1, data) +
            CreateTableTdSum('IDocF11', 1, data) +
            CreateTableTdSum('IDocF12', 1, data) +
            CreateTableTdSum('IDocF13', 1, data) +
            CreateTableTdSum('IDocF14', 1, data) +
            CreateTableTdSum('IDocF15', 1, data) +
            CreateTableTdSum('IDocF16', 1, data) +
            CreateTableTdSum('IDocF17', 1, data) +
            CreateTableTdSum('IDocF18', 1, data) +
            CreateTableTdSum('IDocF19', 1, data) +
            CreateTableTdSum('IDocF20', 1, data) +
            /* CreateTableTdSum('Kalaf01', 1, data) +
           CreateTableTdSum('Kalaf02', 1, data) +
           CreateTableTdSum('Kalaf03', 1, data) +
           CreateTableTdSum('Kalaf04', 1, data) +
           CreateTableTdSum('Kalaf05', 1, data) +
           CreateTableTdSum('Kalaf06', 1, data) +
           CreateTableTdSum('Kalaf07', 1, data) +
           CreateTableTdSum('Kalaf08', 1, data) +
           CreateTableTdSum('Kalaf09', 1, data) +
           CreateTableTdSum('Kalaf10', 1, data) +
           CreateTableTdSum('Kalaf11', 1, data) +
           CreateTableTdSum('Kalaf12', 1, data) +
           CreateTableTdSum('Kalaf13', 1, data) +
           CreateTableTdSum('Kalaf14', 1, data) +
           CreateTableTdSum('Kalaf15', 1, data) +
           CreateTableTdSum('Kalaf16', 1, data) +
           CreateTableTdSum('Kalaf17', 1, data) +
           CreateTableTdSum('Kalaf18', 1, data) +
           CreateTableTdSum('Kalaf19', 1, data) +
           CreateTableTdSum('Kalaf20', 1, data) +*/
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('DocDate', data) +
            //CreateTableTdSearch('InvName', data) +
            CreateTableTdSearch('ModeName', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('ThvlCode', data) +
            CreateTableTdSearch('ThvlName', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('DimX', data) +
            CreateTableTdSearch('DimY', data) +
            CreateTableTdSearch('DimZ', data) +
            CreateTableTdSearch('KalaFileNo', data) +
            CreateTableTdSearch('KalaState', data) +
            CreateTableTdSearch('KalaExf1', data) +
            CreateTableTdSearch('KalaExf2', data) +
            CreateTableTdSearch('KalaExf3', data) +
            CreateTableTdSearch('KalaExf4', data) +
            CreateTableTdSearch('KalaExf5', data) +
            CreateTableTdSearch('KalaExf6', data) +
            CreateTableTdSearch('KalaExf7', data) +
            CreateTableTdSearch('KalaExf8', data) +
            CreateTableTdSearch('KalaExf9', data) +
            CreateTableTdSearch('KalaExf10', data) +
            CreateTableTdSearch('KalaExf11', data) +
            CreateTableTdSearch('KalaExf12', data) +
            CreateTableTdSearch('KalaExf13', data) +
            CreateTableTdSearch('KalaExf14', data) +
            CreateTableTdSearch('KalaExf15', data) +
            CreateTableTdSearch('InDocNo', data) +
            CreateTableTdSearch('VAmount1', data) +
            CreateTableTdSearch('VUnitPrice1', data) +
            CreateTableTdSearch('VAmount2', data) +
            CreateTableTdSearch('VUnitPrice2', data) +
            CreateTableTdSearch('VAmount3', data) +
            CreateTableTdSearch('VUnitPrice3', data) +
            CreateTableTdSearch('VTotalPrice', data) +
            CreateTableTdSearch('iAddMin1', data) +
            CreateTableTdSearch('iAddMin2', data) +
            CreateTableTdSearch('iAddMin3', data) +
            CreateTableTdSearch('OutDocNo', data) +
            CreateTableTdSearch('SAmount1', data) +
            CreateTableTdSearch('SUnitPrice1', data) +
            CreateTableTdSearch('SAmount2', data) +
            CreateTableTdSearch('SUnitPrice2', data) +
            CreateTableTdSearch('SAmount3', data) +
            CreateTableTdSearch('SUnitPrice3', data) +
            CreateTableTdSearch('STotalPrice', data) +

            CreateTableTdSearch('MAmount1', data) +
            CreateTableTdSearch('MUnitPrice1', data) +
            CreateTableTdSearch('MAmount2', data) +
            CreateTableTdSearch('MUnitPrice2', data) +
            CreateTableTdSearch('MAmount3', data) +
            CreateTableTdSearch('MUnitPrice3', data) +
            CreateTableTdSearch('MTotalPrice', data) +

            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprCode', data) +
            CreateTableTdSearch('OprName', data) +
            CreateTableTdSearch('IDocF01', data) +
            CreateTableTdSearch('IDocF02', data) +
            CreateTableTdSearch('IDocF03', data) +
            CreateTableTdSearch('IDocF04', data) +
            CreateTableTdSearch('IDocF05', data) +
            CreateTableTdSearch('IDocF06', data) +
            CreateTableTdSearch('IDocF07', data) +
            CreateTableTdSearch('IDocF08', data) +
            CreateTableTdSearch('IDocF09', data) +
            CreateTableTdSearch('IDocF10', data) +
            CreateTableTdSearch('IDocF11', data) +
            CreateTableTdSearch('IDocF12', data) +
            CreateTableTdSearch('IDocF13', data) +
            CreateTableTdSearch('IDocF14', data) +
            CreateTableTdSearch('IDocF15', data) +
            CreateTableTdSearch('IDocF16', data) +
            CreateTableTdSearch('IDocF17', data) +
            CreateTableTdSearch('IDocF18', data) +
            CreateTableTdSearch('IDocF19', data) +
            CreateTableTdSearch('IDocF20', data) +
            /* CreateTableTdSearch('Kalaf01', data) +
           CreateTableTdSearch('Kalaf02', data) +
           CreateTableTdSearch('Kalaf03', data) +
           CreateTableTdSearch('Kalaf04', data) +
           CreateTableTdSearch('Kalaf05', data) +
           CreateTableTdSearch('Kalaf06', data) +
           CreateTableTdSearch('Kalaf07', data) +
           CreateTableTdSearch('Kalaf08', data) +
           CreateTableTdSearch('Kalaf09', data) +
           CreateTableTdSearch('Kalaf10', data) +
           CreateTableTdSearch('Kalaf11', data) +
           CreateTableTdSearch('Kalaf12', data) +
           CreateTableTdSearch('Kalaf13', data) +
           CreateTableTdSearch('Kalaf14', data) +
           CreateTableTdSearch('Kalaf15', data) +
           CreateTableTdSearch('Kalaf16', data) +
           CreateTableTdSearch('Kalaf17', data) +
           CreateTableTdSearch('Kalaf18', data) +
           CreateTableTdSearch('Kalaf19', data) +
           CreateTableTdSearch('Kalaf20', data) +  */
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }

    //DocDate,InvName,ModeName,Spec,ThvlCode,ThvlName,Status,DimX,DimY,DimZ,KalaFileNo,KalaState,KalaExf1,InDocNo,VAmount1,VUnitPrice1,VAmount2,VUnitPrice2,VAmount3,VUnitPrice3,VTotalPrice,iAddMin1,iAddMin2,iAddMin3,OutDocNo,SAmount1,SUnitPrice1,SAmount2,SUnitPrice2,SAmount3,SUnitPrice3,STotalPrice,MkzCode,MkzName,OprCode,OprName,F01,Kalaf01,

    function CreateTableTh(field, data) {
        if (field.includes('Price') == true && showPrice == false)
            return ''
        else {
            text = '<th ';

            TextField = FindTextField(field, data);

            sortField = field == 'DocNo' ? 'SortDocNo' :
                field == 'MkzCode' ? 'SortMkzCode' :
                    field == 'AccCode' ? 'SortAccCode' :
                        field

            if (TextField == 0)
                text += 'Hidden ';

            text += 'data-column="' + sortField + '">' +
                '<span data-column="' + sortField + '">' + TextField + '</span>' +
                '<span data-bind="attr: { class: currentColumn() == \'' + sortField + '\' ? \'isVisible\' : \'isHidden\' }">' +
                '    <i data-bind="attr: { class: iconType' + field + ' }"  data-column="' + sortField + '"></i> </span> ' +
                '</th>';
            return text;
        }
    }

    function CreateTableTd(field, Deghat, no, color, data) {
        if (field.includes('Price') == true && showPrice == false)
            return ''
        else {
            text = '<td ';

            color = "\'" + color + "\'";

            TextField = FindTextField(field, data);
            if (TextField == 0)
                text += 'Hidden ';

            switch (no) {
                case 0:
                    text += 'data-bind="text: ' + field + ' , style: {\'background-color\': ' + color + ' != \'0\' ? ' + color + ' : null  }"></td>';
                    break;
                case 1:
                    text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' , \'background-color\': ' + color + ' != \'0\' ? ' + color + ' : null  }"></td>'
                    break;
                case 2:
                    text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' , \'background-color\': ' + color + ' != \'0\' ? ' + color + ' : null }"" style="text-align: right;"></td>'
                    break;
                case 3:
                    text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\' , style: {\'background-color\': ' + color + ' != \'0\' ? ' + color + ' : null  }" style="text-align: right;"></td>'
                    break;
            }
            return text;
        }
    }

    function CreateTableTdSum(field, no, data) {
        if (field.includes('Price') == true && showPrice == false)
            return ''
        else {
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
    }

    self.SearchKeyDown = function (viewModel, e) {
        return KeyPressSearch(e);
    }

    function CreateTableTdSearch(field, data) {
        if (field.includes('Price') == true && showPrice == false)
            return ''
        else {
            text = '<td ';

            TextField = FindTextField(field, data);
            type = FindTypeField(field, data);
            if (TextField == 0)
                text += 'Hidden ';

            text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }" type="text" class="type_' + type;
            text += ' form-control" style="height: 2.4rem;direction: ltr;text-align: right;" /> </td>';
            return text;
        }
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
        setReport(self.KrdxList(), data, printVariable);
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
            title: 'تایید حذف ؟',
            text: "آیا فرم چاپ انتخابی حذف شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                address = item.address;
                DeletePrintForm(address);
                GetPrintForms(sessionStorage.ModePrint);
            }
        })

    };

    $('#AddNewPrintForms').click(function () {
        printName = 'فرم جدید';
        printPublic = false;
        setReport(self.KrdxList(), '', printVariable);
    });


    $('#Print').click(function () {

        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';
        printVariable += '"InvCode":"' + self.InvCode() + '",';
        printVariable += '"InvName":"' + self.InvName() + '",';
        printVariable += '"KalaCode":"' + self.KalaCode() + '",';
        printVariable += '"KalaName":"' + self.KalaName() + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportKrdx";
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
        setReport(self.KrdxList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });

   
};

ko.applyBindings(new ViewModel());

