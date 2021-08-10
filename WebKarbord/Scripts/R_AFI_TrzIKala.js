var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");


    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.KalaList = ko.observableArray([]); // ليست کالاها
    self.TGruList = ko.observableArray([]); // ليست گروه وارده صادره 
    self.ThvlList = ko.observableArray([]); // ليست وارده صادره 
    self.KGruList = ko.observableArray([]); // ليست گروه کالاها
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.StatusList = ko.observableArray([]); // ليست نوع سند ها
    self.IModeList = ko.observableArray([]); // ليست نوع سند

    self.TrzIList = ko.observableArray([]); // ليست گزارش



    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع اسناد 
    var TGruUri = server + '/api/Web_Data/TGru/'; // آدرس گروه وارده صادره
    var ThvlUri = server + '/api/Web_Data/Thvl/'; // آدرس وارده صادره
    var KGruUri = server + '/api/Web_Data/KGru/'; // آدرس گروه کالا
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 

    var TrzIUri = server + '/api/ReportInv/TrzI/'; // آدرس گزارش 
    var TrzICountUri = server + '/api/Web_Data/TrzICount/'; // تعداد رکورد های گزارش 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);
    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });
    self.InvCode = ko.observable();
    var allSearchKala = true;

    var KalaCode = '';
    var counterKala = 0;
    var list_KalaSelect = new Array();

    var InvCode = '';
    var counterInv = 0;
    var list_InvSelect = new Array();

    var KGruCode = '';
    var counterKGru = 0;
    var list_KGruSelect = new Array();

    var TGruCode = '';
    var counterTGru = 0;
    var list_TGruSelect = new Array();


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

    TestUser();

    var IModeCode = '';
    var counterIMode = 0;
    var list_IModeSelect = new Array();

    $("#textTotal").text('');

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'TrzIKala';
    var columns = [
        'KalaCode',
        'KalaName',
        'KalaUnitName1',
        'KalaUnitName2',
        'KalaUnitName3',
        'InvCode',
        'InvName',
        'KalaFanniNo',
        'AAmount1',
        'AAmount2',
        'AAmount3',
        'ATotalPrice',
        'VAmount1',
        'VAmount2',
        'VAmount3',
        'VTotalPrice',
        'SAmount1',
        'SAmount2',
        'SAmount3',
        'STotalPrice',
        'MAmount1',
        'MAmount2',
        'MAmount3',
        'MTotalPrice'
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
        SaveColumn(sessionStorage.ace, sessionStorage.sal, sessionStorage.group, rprtId, "/ReportAFI/TrzIKala", columns, self.SettingColumnList());
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
        SaveColumn(sessionStorage.ace, sessionStorage.sal, sessionStorage.group, rprtId, "/ReportAFI/TrzIKala", columns, self.SettingColumnList());
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


    self.OptionsCaptionAnbar = ko.computed(function () {
        return 'همه انبار ها';
    });



    //Get TGru List
    function getTGruList() {
        var TGruObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(TGruUri + ace + '/' + sal + '/' + group, 'POST', TGruObject,true).done(function (data) {
            self.TGruList(data);
        });
    }

    $('#btnTGru').click(function () {
        if (self.TGruList().length == 0) {
            getTGruList();
        }
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

    self.OptionsCaptionAnbar = ko.computed(function () {
        return 'همه انبار ها';
    });

    //Get TrzI
    function getTrzI() {
        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();



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

        var tGrucode = '';
        for (var i = 0; i <= counterTGru - 1; i++) {
            if (i < counterTGru - 1)
                tGrucode += list_TGruSelect[i] + '*';
            else
                tGrucode += list_TGruSelect[i];
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


        var TrzIObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            StatusCode: statuscode,
            ModeCode: imodecode,
            InvCode: invcode,
            KGruCode: kGrucode,
            KalaCode: kalacode,
            ThvlCode: thvlcode,
            TGruCode: tGrucode,
            MkzCode: mkzcode,
            OprCode: oprcode,
        };

        ajaxFunction(TrzIUri + ace + '/' + sal + '/' + group, 'POST', TrzIObject,true).done(function (response) {
            self.TrzIList(response);
            calcsum(self.TrzIList());
        });
    }

    function calcsum(list) {
        totalAAmount1 = 0;
        totalAAmount2 = 0;
        totalAAmount3 = 0;

        totalVAmount1 = 0;
        totalVAmount2 = 0;
        totalVAmount3 = 0;

        totalSAmount1 = 0;
        totalSAmount2 = 0;
        totalSAmount3 = 0;

        totalMAmount1 = 0;
        totalMAmount2 = 0;
        totalMAmount3 = 0;

        totalATotalPrice = 0;
        totalVTotalPrice = 0;
        totalSTotalPrice = 0;
        totalMTotalPrice = 0;

        KalaDeghat1 = 0;
        KalaDeghat2 = 0;
        KalaDeghat3 = 0;

        maxKalaDeghat1 = 0;
        maxKalaDeghat2 = 0;
        maxKalaDeghat3 = 0;

        for (var i = 0; i < list.length; ++i) {
            TrzIData = list[i];
            totalAAmount1 += TrzIData.AAmount1;
            totalAAmount2 += TrzIData.AAmount2;
            totalAAmount3 += TrzIData.AAmount3;

            totalVAmount1 += TrzIData.VAmount1;
            totalVAmount2 += TrzIData.VAmount2;
            totalVAmount3 += TrzIData.VAmount3;

            totalSAmount1 += TrzIData.SAmount1;
            totalSAmount2 += TrzIData.SAmount2;
            totalSAmount3 += TrzIData.SAmount3;

            totalMAmount1 += TrzIData.MAmount1;
            totalMAmount2 += TrzIData.MAmount2;
            totalMAmount3 += TrzIData.MAmount3;

            totalATotalPrice += TrzIData.ATotalPrice;
            totalVTotalPrice += TrzIData.VTotalPrice;
            totalSTotalPrice += TrzIData.STotalPrice;
            totalMTotalPrice += TrzIData.MTotalPrice;

            KalaDeghat1 = TrzIData.KalaDeghatM1;
            KalaDeghat2 = TrzIData.KalaDeghatM2;
            KalaDeghat3 = TrzIData.KalaDeghatM3;

            KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
            KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
            KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
        }

        // $("#textTotal").text('جمع');
        $("#totalAAmount1").text(NumberToNumberString(totalAAmount1.toFixed(maxKalaDeghat1)));
        $("#totalAAmount2").text(NumberToNumberString(totalAAmount2.toFixed(maxKalaDeghat2)));
        $("#totalAAmount3").text(NumberToNumberString(totalAAmount3.toFixed(maxKalaDeghat3)));
        $("#totalATotalPrice").text(NumberToNumberString(totalATotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        $("#totalVAmount1").text(NumberToNumberString(totalVAmount1.toFixed(maxKalaDeghat1)));
        $("#totalVAmount2").text(NumberToNumberString(totalVAmount2.toFixed(maxKalaDeghat2)));
        $("#totalVAmount3").text(NumberToNumberString(totalVAmount3.toFixed(maxKalaDeghat3)));
        $("#totalVTotalPrice").text(NumberToNumberString(totalVTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        $("#totalSAmount1").text(NumberToNumberString(totalSAmount1.toFixed(maxKalaDeghat1)));
        $("#totalSAmount2").text(NumberToNumberString(totalSAmount2.toFixed(maxKalaDeghat2)));
        $("#totalSAmount3").text(NumberToNumberString(totalSAmount3.toFixed(maxKalaDeghat3)));
        $("#totalSTotalPrice").text(NumberToNumberString(totalSTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        $("#totalMAmount1").text(NumberToNumberString(totalMAmount1.toFixed(maxKalaDeghat1)));
        $("#totalMAmount2").text(NumberToNumberString(totalMAmount2.toFixed(maxKalaDeghat2)));
        $("#totalMAmount3").text(NumberToNumberString(totalMAmount3.toFixed(maxKalaDeghat3)));
        $("#totalMTotalPrice").text(NumberToNumberString(totalMTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));
    }

    $("#CreateReport").click(function () {
        getTrzI();
        self.sortTableTrzI();
    });

    getInvList();
    //getKalaList();
    //getTGruList();
    //getKGruList();
    getStatusList();

    $('#nameKala').val('همه موارد');
    $('#nameInv').val('همه موارد');
    $('#nameKGru').val('همه موارد');
    $('#nameThvl').val('همه موارد');
    $('#nameTGru').val('همه موارد');
    $('#nameOpr').val('همه موارد');
    $('#nameMkz').val('همه موارد');
    $('#nameStatus').val(counterStatus + ' مورد انتخاب شده ');
    $('#nameIMode').val('همه موارد');

    //------------------------------------------------------
    self.currentPageTrzI = ko.observable();
    pageSizeTrzI = localStorage.getItem('pageSizeTrzI') == null ? 10 : localStorage.getItem('pageSizeTrzI');
    self.pageSizeTrzI = ko.observable(pageSizeTrzI);
    self.currentPageIndexTrzI = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");


    self.filterInvCode = ko.observable("");
    self.filterInvName = ko.observable("");
    self.filterKalaCode = ko.observable("");
    self.filterKalaName = ko.observable("");
    self.filterKalaUnitName1 = ko.observable("");
    self.filterKalaUnitName2 = ko.observable("");
    self.filterKalaUnitName3 = ko.observable("");
    self.filterKalaFanniNo = ko.observable("");

    self.filterAAmount1 = ko.observable("");
    self.filterAAmount2 = ko.observable("");
    self.filterAAmount3 = ko.observable("");
    self.filterATotalPrice = ko.observable("");
    self.filterVAmount1 = ko.observable("");
    self.filterVAmount2 = ko.observable("");
    self.filterVAmount3 = ko.observable("");
    self.filterVTotalPrice = ko.observable("");
    self.filterSAmount1 = ko.observable("");
    self.filterSAmount2 = ko.observable("");
    self.filterSAmount3 = ko.observable("");
    self.filterSTotalPrice = ko.observable("");
    self.filterMAmount1 = ko.observable("");
    self.filterMAmount2 = ko.observable("");
    self.filterMAmount3 = ko.observable("");
    self.filterMTotalPrice = ko.observable("");


    self.filterTrzIList = ko.computed(function () {

        self.currentPageIndexTrzI(0);

        var filterInvCode = self.filterInvCode();
        var filterInvName = self.filterInvName();
        var filterKalaCode = self.filterKalaCode();
        var filterKalaName = self.filterKalaName();
        var filterKalaUnitName1 = self.filterKalaUnitName1();
        var filterKalaUnitName2 = self.filterKalaUnitName2();
        var filterKalaUnitName3 = self.filterKalaUnitName3();
        var filterKalaFanniNo = self.filterKalaFanniNo();

        var filterAAmount1 = self.filterAAmount1();
        var filterAAmount2 = self.filterAAmount2();
        var filterAAmount3 = self.filterAAmount3();
        var filterATotalPrice = self.filterATotalPrice();
        var filterVAmount1 = self.filterVAmount1();
        var filterVAmount2 = self.filterVAmount2();
        var filterVAmount3 = self.filterVAmount3();
        var filterVTotalPrice = self.filterVTotalPrice();
        var filterSAmount1 = self.filterSAmount1();
        var filterSAmount2 = self.filterSAmount2();
        var filterSAmount3 = self.filterSAmount3();
        var filterSTotalPrice = self.filterSTotalPrice();
        var filterMAmount1 = self.filterMAmount1();
        var filterMAmount2 = self.filterMAmount2();
        var filterMAmount3 = self.filterMAmount3();
        var filterMTotalPrice = self.filterMTotalPrice();

        filterAAmount1 = filterAAmount1.replace("/", ".");
        filterAAmount2 = filterAAmount2.replace("/", ".");
        filterAAmount3 = filterAAmount3.replace("/", ".");
        filterATotalPrice = filterATotalPrice.replace("/", ".");

        filterVAmount1 = filterVAmount1.replace("/", ".");
        filterVAmount2 = filterVAmount2.replace("/", ".");
        filterVAmount3 = filterVAmount3.replace("/", ".");
        filterVTotalPrice = filterVTotalPrice.replace("/", ".");

        filterSAmount1 = filterSAmount1.replace("/", ".");
        filterSAmount2 = filterSAmount2.replace("/", ".");
        filterSAmount3 = filterSAmount3.replace("/", ".");
        filterSTotalPrice = filterSTotalPrice.replace("/", ".");

        filterMAmount1 = filterMAmount1.replace("/", ".");
        filterMAmount2 = filterMAmount2.replace("/", ".");
        filterMAmount3 = filterMAmount3.replace("/", ".");
        filterMTotalPrice = filterMTotalPrice.replace("/", ".");

        tempData = ko.utils.arrayFilter(self.TrzIList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.KalaCode.toString().toLowerCase(), filterKalaCode) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filterKalaName) >= 0) &&
                (item.KalaUnitName1 == null ? '' : item.KalaUnitName1.toString().search(filterKalaUnitName1) >= 0) &&
                (item.KalaUnitName2 == null ? '' : item.KalaUnitName2.toString().search(filterKalaUnitName2) >= 0) &&
                (item.KalaUnitName3 == null ? '' : item.KalaUnitName3.toString().search(filterKalaUnitName3) >= 0) &&
                ko.utils.stringStartsWith(item.InvCode.toString().toLowerCase(), filterInvCode) &&
                (item.InvName == null ? '' : item.InvName.toString().search(filterInvName) >= 0) &&
                (item.KalaFanniNo == null ? '' : item.KalaFanniNo.toString().search(filterKalaFanniNo) >= 0) &&

                ko.utils.stringStartsWith(item.AAmount1.toString().toLowerCase(), filterAAmount1) &&
                ko.utils.stringStartsWith(item.AAmount2.toString().toLowerCase(), filterAAmount2) &&
                ko.utils.stringStartsWith(item.AAmount3.toString().toLowerCase(), filterAAmount3) &&
                ko.utils.stringStartsWith(item.ATotalPrice.toString().toLowerCase(), filterATotalPrice) &&

                ko.utils.stringStartsWith(item.VAmount1.toString().toLowerCase(), filterVAmount1) &&
                ko.utils.stringStartsWith(item.VAmount2.toString().toLowerCase(), filterVAmount2) &&
                ko.utils.stringStartsWith(item.VAmount3.toString().toLowerCase(), filterVAmount3) &&
                ko.utils.stringStartsWith(item.VTotalPrice.toString().toLowerCase(), filterVTotalPrice) &&

                ko.utils.stringStartsWith(item.SAmount1.toString().toLowerCase(), filterSAmount1) &&
                ko.utils.stringStartsWith(item.SAmount2.toString().toLowerCase(), filterSAmount2) &&
                ko.utils.stringStartsWith(item.SAmount3.toString().toLowerCase(), filterSAmount3) &&
                ko.utils.stringStartsWith(item.STotalPrice.toString().toLowerCase(), filterSTotalPrice) &&

                ko.utils.stringStartsWith(item.MAmount1.toString().toLowerCase(), filterMAmount1) &&
                ko.utils.stringStartsWith(item.MAmount2.toString().toLowerCase(), filterMAmount2) &&
                ko.utils.stringStartsWith(item.MAmount3.toString().toLowerCase(), filterMAmount3) &&
                ko.utils.stringStartsWith(item.MTotalPrice.toString().toLowerCase(), filterMTotalPrice)

            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

        //}
    });


    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzI);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzI = 0;
        sessionStorage.searchTrzI = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzI(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzIList(), function (item) {
                indexTrzI += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzI < self.pageSizeTrzI())
                self.currentPageIndexTrzI(0);
            else {
                var a = Math.round((indexTrzI / self.pageSizeTrzI()), 0);
                if (a < (indexTrzI / self.pageSizeTrzI())) a += 1;
                self.currentPageIndexTrzI(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzI = ko.computed(function () {
        var pageSizeTrzI = parseInt(self.pageSizeTrzI(), 10),
            startIndex = pageSizeTrzI * self.currentPageIndexTrzI(),
            endIndex = startIndex + pageSizeTrzI;
        localStorage.setItem('pageSizeTrzI', pageSizeTrzI);
        return self.filterTrzIList().slice(startIndex, endIndex);
    });

    self.nextPageTrzI = function () {
        if (((self.currentPageIndexTrzI() + 1) * self.pageSizeTrzI()) < self.filterTrzIList().length) {
            self.currentPageIndexTrzI(self.currentPageIndexTrzI() + 1);
        }
    };

    self.previousPageTrzI = function () {
        if (self.currentPageIndexTrzI() > 0) {
            self.currentPageIndexTrzI(self.currentPageIndexTrzI() - 1);
        }
    };

    self.firstPageTrzI = function () {
        self.currentPageIndexTrzI(0);
    };

    self.lastPageTrzI = function () {
        tempCountTrzI = parseInt(self.filterTrzIList().length / self.pageSizeTrzI(), 10);
        if ((self.filterTrzIList().length % self.pageSizeTrzI()) == 0)
            self.currentPageIndexTrzI(tempCountTrzI - 1);
        else
            self.currentPageIndexTrzI(tempCountTrzI);
    };

    self.iconTypeInvCode = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypeKalaCode = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
    self.iconTypeKalaUnitName1 = ko.observable("");
    self.iconTypeKalaUnitName2 = ko.observable("");
    self.iconTypeKalaUnitName3 = ko.observable("");
    self.iconTypeKalaFanniNo = ko.observable("");
    self.iconTypeAAmount1 = ko.observable("");
    self.iconTypeAAmount2 = ko.observable("");
    self.iconTypeAAmount3 = ko.observable("");
    self.iconTypeATotalPrice = ko.observable("");
    self.iconTypeVAmount1 = ko.observable("");
    self.iconTypeVAmount2 = ko.observable("");
    self.iconTypeVAmount3 = ko.observable("");
    self.iconTypeVTotalPrice = ko.observable("");
    self.iconTypeSAmount1 = ko.observable("");
    self.iconTypeSAmount2 = ko.observable("");
    self.iconTypeSAmount3 = ko.observable("");
    self.iconTypeSTotalPrice = ko.observable("");
    self.iconTypeMAmount1 = ko.observable("");
    self.iconTypeMAmount2 = ko.observable("");
    self.iconTypeMAmount3 = ko.observable("");
    self.iconTypeMTotalPrice = ko.observable("");


    self.sortTableTrzI = function (viewModel, e) {
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
        self.TrzIList.sort(function (left, right) {
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
        self.iconTypeInvCode('');
        self.iconTypeInvName('');
        self.iconTypeKalaCode('');
        self.iconTypeKalaName('');
        self.iconTypeKalaUnitName1('');
        self.iconTypeKalaUnitName2('');
        self.iconTypeKalaUnitName3('');
        self.iconTypeKalaFanniNo('');
        self.iconTypeAAmount1('');
        self.iconTypeAAmount2('');
        self.iconTypeAAmount3('');
        self.iconTypeATotalPrice('');
        self.iconTypeVAmount1('');
        self.iconTypeVAmount2('');
        self.iconTypeVAmount3('');
        self.iconTypeVTotalPrice('');
        self.iconTypeSAmount1('');
        self.iconTypeSAmount2('');
        self.iconTypeSAmount3('');
        self.iconTypeSTotalPrice('');
        self.iconTypeMAmount1('');
        self.iconTypeMAmount2('');
        self.iconTypeMAmount3('');
        self.iconTypeMTotalPrice('');

        if (orderProp == 'SortInvCode') self.iconTypeInvCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortInvName') self.iconTypeInvName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortKalaCode') self.iconTypeKalaCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortKalaName') self.iconTypeKalaName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName1') self.iconTypeKalaUnitName1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName2') self.iconTypeKalaUnitName2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName3') self.iconTypeKalaUnitName3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaFanniNo') self.iconTypeKalaFanniNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AAmount1') self.iconTypeAAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AAmount2') self.iconTypeAAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AAmount3') self.iconTypeAAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ATotalPrice') self.iconTypeATotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount1') self.iconTypeVAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount2') self.iconTypeVAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount3') self.iconTypeVAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VTotalPrice') self.iconTypeVTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount1') self.iconTypeSAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount2') self.iconTypeSAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount3') self.iconTypeSAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'STotalPrice') self.iconTypeSTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount1') self.iconTypeMAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount2') self.iconTypeMAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount3') self.iconTypeMAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MTotalPrice') self.iconTypeMTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };












    self.currentPageInv = ko.observable();
    pageSizeInv = localStorage.getItem('pageSizeInv') == null ? 10 : localStorage.getItem('pageSizeInv');
    self.pageSizeInv = ko.observable(pageSizeInv);
    self.currentPageIndexInv = ko.observable(0);

    self.filterInv0 = ko.observable("");
    self.filterInv1 = ko.observable("");
    self.filterInv2 = ko.observable("");
    self.iconTypeStatus = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

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
        localStorage.setItem('pageSizeTrzI', pageSizeTrzI);
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














    self.currentPageTGru = ko.observable();
    pageSizeTGru = localStorage.getItem('pageSizeTGru') == null ? 10 : localStorage.getItem('pageSizeTGru');
    self.pageSizeTGru = ko.observable(pageSizeTGru);
    self.currentPageIndexTGru = ko.observable(0);

    self.filterTGru0 = ko.observable("");
    self.filterTGru1 = ko.observable("");
    self.filterTGru2 = ko.observable("");

    self.filterTGruList = ko.computed(function () {

        self.currentPageIndexTGru(0);
        var filter0 = self.filterTGru0().toUpperCase();
        var filter1 = self.filterTGru1();
        var filter2 = self.filterTGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.TGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.TGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageTGru = ko.computed(function () {
        var pageSizeTGru = parseInt(self.pageSizeTGru(), 10),
            startIndex = pageSizeTGru * self.currentPageIndexTGru(),
            endIndex = startIndex + pageSizeTGru;
        localStorage.setItem('pageSizeTGru', pageSizeTGru);
        return self.filterTGruList().slice(startIndex, endIndex);
    });

    self.nextPageTGru = function () {
        if (((self.currentPageIndexTGru() + 1) * self.pageSizeTGru()) < self.filterTGruList().length) {
            self.currentPageIndexTGru(self.currentPageIndexTGru() + 1);
        }
    };

    self.previousPageTGru = function () {
        if (self.currentPageIndexTGru() > 0) {
            self.currentPageIndexTGru(self.currentPageIndexTGru() - 1);
        }
    };

    self.firstPageTGru = function () {
        self.currentPageIndexTGru(0);
    };

    self.lastPageTGru = function () {
        countTGru = parseInt(self.filterTGruList().length / self.pageSizeTGru(), 10);
        if ((self.filterTGruList().length % self.pageSizeTGru()) == 0)
            self.currentPageIndexTGru(countTGru - 1);
        else
            self.currentPageIndexTGru(countTGru);
    };

    self.sortTableTGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.TGruList.sort(function (left, right) {
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



    $('#refreshTGru').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست گروه های تحویل دهنده / گیرنده به روز رسانی شود ؟",
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
                getTGruList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddTGru = function (item) {

        TGruCode = item.Code;
        find = false;
        list_TGruSelect.forEach(function (item, key) {
            if (item == TGruCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListTGru').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_TGruSelect[counterTGru] = item.Code;
            counterTGru = counterTGru + 1;
        }
    };


    self.AddAllTGru = function () {
        list_TGruSelect = new Array();
        list = self.TGruList();
        $("#TableBodyListTGru").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListTGru').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_TGruSelect[i] = list[i].Code;
            counterTGru = i + 1;
        }
    };


    self.DelAllTGru = function () {
        list_TGruSelect = new Array();
        counterTGru = 0;
        $("#TableBodyListTGru").empty();
    };


    $('#modal-TGru').on('hide.bs.modal', function () {
        if (counterTGru > 0)
            $('#nameTGru').val(counterTGru + ' مورد انتخاب شده ')
        else
            $('#nameTGru').val('همه موارد');
    });

    $('#modal-TGru').on('shown.bs.modal', function () {
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


    /* function getNoSanad() {
         select = document.getElementById('noSanadAnbar');
         for (var i = 0; i <= 2; i++) {
             opt = document.createElement('option');
             if (i == 0) {
                 opt.value = 0;
                 opt.innerHTML = 'همه موارد';
                 opt.selected = true;
             }
             if (i == 1) {
                 opt.value = 1;
                 opt.innerHTML = 'وارده به انبار';
 
             }
             if (i == 2) {
                 opt.value = 2;
                 opt.innerHTML = 'صادره از انبار';
             }
             select.appendChild(opt);
         }
     };*/

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









    $('.fix').attr('class', 'form-line date focused fix');


    var showPrice = false;

    self.radif = function (index) {
        countShow = self.pageSizeTrzI();
        page = self.currentPageIndexTrzI();
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
            '       <tr data-bind="click: sortTableTrzI">' +
            '<th>ردیف</th>' +
            CreateTableTh('KalaCode', data) +
            CreateTableTh('KalaName', data) +
            CreateTableTh('KalaUnitName1', data) +
            CreateTableTh('KalaUnitName2', data) +
            CreateTableTh('KalaUnitName3', data) +
            CreateTableTh('InvCode', data) +
            CreateTableTh('InvName', data) +
            CreateTableTh('KalaFanniNo', data) +
            CreateTableTh('AAmount1', data) +
            CreateTableTh('AAmount2', data) +
            CreateTableTh('AAmount3', data) +
            CreateTableTh('ATotalPrice', data) +
            CreateTableTh('VAmount1', data) +
            CreateTableTh('VAmount2', data) +
            CreateTableTh('VAmount3', data) +
            CreateTableTh('VTotalPrice', data) +
            CreateTableTh('SAmount1', data) +
            CreateTableTh('SAmount2', data) +
            CreateTableTh('SAmount3', data) +
            CreateTableTh('STotalPrice', data) +
            CreateTableTh('MAmount1', data) +
            CreateTableTh('MAmount2', data) +
            CreateTableTh('MAmount3', data) +
            CreateTableTh('MTotalPrice', data) +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind=" {foreach: currentPageTrzI}" style="cursor: default;">' +
            '     <tr >' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('KalaCode', 0, 0, data) +
            CreateTableTd('KalaName', 0, 0, data) +
            CreateTableTd('KalaUnitName1', 0, 0, data) +
            CreateTableTd('KalaUnitName2', 0, 0, data) +
            CreateTableTd('KalaUnitName3', 0, 0, data) +
            CreateTableTd('InvCode', 0, 0, data) +
            CreateTableTd('InvName', 0, 0, data) +
            CreateTableTd('KalaFanniNo', 0, 0, data) +
            CreateTableTd('AAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('AAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('AAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('ATotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('VAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('VAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('VAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('VTotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('SAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('SAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('SAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('STotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('MAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('MAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('MTotalPrice', sessionStorage.Deghat, 2, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td>جمع</td>' +
            CreateTableTdSum('KalaCode', 0, data) +
            CreateTableTdSum('KalaName', 1, data) +
            CreateTableTdSum('KalaUnitName1', 1, data) +
            CreateTableTdSum('KalaUnitName2', 1, data) +
            CreateTableTdSum('KalaUnitName3', 1, data) +
            CreateTableTdSum('InvCode', 1, data) +
            CreateTableTdSum('InvName', 1, data) +
            CreateTableTdSum('KalaFanniNo', 1, data) +
            CreateTableTdSum('AAmount1', 2, data) +
            CreateTableTdSum('AAmount2', 2, data) +
            CreateTableTdSum('AAmount3', 2, data) +
            CreateTableTdSum('ATotalPrice', 2, data) +
            CreateTableTdSum('VAmount1', 2, data) +
            CreateTableTdSum('VAmount2', 2, data) +
            CreateTableTdSum('VAmount3', 2, data) +
            CreateTableTdSum('VTotalPrice', 2, data) +
            CreateTableTdSum('SAmount1', 2, data) +
            CreateTableTdSum('SAmount2', 2, data) +
            CreateTableTdSum('SAmount3', 2, data) +
            CreateTableTdSum('STotalPrice', 2, data) +
            CreateTableTdSum('MAmount1', 2, data) +
            CreateTableTdSum('MAmount2', 2, data) +
            CreateTableTdSum('MAmount3', 2, data) +
            CreateTableTdSum('MTotalPrice', 2, data) +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('KalaCode', data) +
            CreateTableTdSearch('KalaName', data) +
            CreateTableTdSearch('KalaUnitName1', data) +
            CreateTableTdSearch('KalaUnitName2', data) +
            CreateTableTdSearch('KalaUnitName3', data) +
            CreateTableTdSearch('InvCode', data) +
            CreateTableTdSearch('InvName', data) +
            CreateTableTdSearch('KalaFanniNo', data) +
            CreateTableTdSearch('AAmount1', data) +
            CreateTableTdSearch('AAmount2', data) +
            CreateTableTdSearch('AAmount3', data) +
            CreateTableTdSearch('ATotalPrice', data) +
            CreateTableTdSearch('VAmount1', data) +
            CreateTableTdSearch('VAmount2', data) +
            CreateTableTdSearch('VAmount3', data) +
            CreateTableTdSearch('VTotalPrice', data) +
            CreateTableTdSearch('SAmount1', data) +
            CreateTableTdSearch('SAmount2', data) +
            CreateTableTdSearch('SAmount3', data) +
            CreateTableTdSearch('STotalPrice', data) +
            CreateTableTdSearch('MAmount1', data) +
            CreateTableTdSearch('MAmount2', data) +
            CreateTableTdSearch('MAmount3', data) +
            CreateTableTdSearch('MTotalPrice', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }

    function CreateTableTh(field, data) {
        if (field.includes('Price') == true && showPrice == false)
            return ''
        else {
            text = '<th ';

            TextField = FindTextField(field, data);

            if (field == 'KalaCode')
                sortField = 'SortKalaCode';
            else if (field == 'KalaName')
                sortField = 'SortKalaName';
            else if (field == 'InvCode')
                sortField = 'SortInvCode';
            else if (field == 'InvName')
                sortField = 'SortInvName';
            else
                sortField = field;

            if (TextField == 0)
                text += 'Hidden ';

            text += 'data-column="' + sortField + '">' +
                '<span data-column="' + sortField + '">' + TextField + '</span>' +
                '<span data-bind="attr: { class: currentColumn() == \'' + sortField + '\' ? \'isVisible\' : \'isHidden\' }">' +
                '    <i data-bind="attr: { class: iconType' + field + ' }"   data-column="' + sortField + '"></i> </span> ' +
                '</th>';
            return text;
        }
    }

    function CreateTableTd(field, Deghat, no, data) {
        if (field.includes('Price') == true && showPrice == false)
            return ''
        else {
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
                    text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' }"" style="text-align: right;"></td>'
                    break;
                case 3:
                    text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\'" style="text-align: right;"></td>'
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
        setReport(self.TrzIList(), data, printVariable);
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
        setReport(self.TrzIList(), '', printVariable);
    });


    $('#Print').click(function () {
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportTrzIKalaMaster";
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
        setReport(self.TrzIList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


};

ko.applyBindings(new ViewModel());

