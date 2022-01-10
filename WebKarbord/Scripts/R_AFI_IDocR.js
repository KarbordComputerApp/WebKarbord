var ViewModel = function() {
    var self = this;
    var flagupdateHeader = 0;
    self.InvList = ko.observableArray([]); // لیست انبارها
    self.KalaList = ko.observableArray([]); // لیست کالاها
    self.ThvlList = ko.observableArray([]); // لیست وارده صادره 
    self.KGruList = ko.observableArray([]); // لیست گروه کالاها
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.StatusList = ko.observableArray([]); // لیست نوع سند ها
    self.IModeList = ko.observableArray([]); // لیست نوع سند


    self.IDocRList = ko.observableArray([]); // لیست گزارش  

    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع اسناد 
    var ThvlUri = server + '/api/Web_Data/Thvl/'; // آدرس وارده صادره
    var KGruUri = server + '/api/Web_Data/KGru/'; // آدرس گروه کالا
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var IDocRUri = server + '/api/ReportInv/IDocR/'; // آدرس گزارش 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 


    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);
    $('#btnaztarikh').click(function() {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function() {
        $('#tatarikh').change();
    });

    TestUser();

    self.InvCode = ko.observable();
    var allSearchKala = true;

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

    var ThvlCode = '';
    var counterThvl = 0;
    var list_ThvlSelect = new Array();
    var list_ThvlNameSelect = new Array();

    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();
    var list_MkzNameSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();
    var list_OprNameSelect = new Array();

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
    var list_IModeNameSelect = new Array();



    $("#textTotal").text('');



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'IDocR';
    var columns = [
        'DocDate',
        'DocNo',
        'ModeName',
        'InvName',
        'Spec',
        'Status',
        'Taeed',
        'Tasvib',
        'ThvlName',
        'MkzName',
        'OprName',
        'SerialNumber',
        'BandNo',
        'KalaName',
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
        'MainUnitName',
        'KalaUnitName1',
        'KalaUnitName2',
        'KalaUnitName3',
        'Amount1',
        'Amount2',
        'Amount3',
        'UnitPrice',
        'TotalPrice',
        'BandSpec',
        'Comm'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function(data) {
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
        ajaxFunction(RprtColsDefultUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function(data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function() {
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/IDocR", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    $('#modal-SettingColumn').on('show.bs.modal', function() {
        counterColumn = 0;
        getRprtColsList(false, sessionStorage.userName);
    });

    $('#AllSettingColumns').change(function() {
        var allCheck = $('#AllSettingColumns').is(':checked');
        for (var i = 1; i <= columns.length; i++) {
            $('#SettingColumns' + i).prop('checked', allCheck);
        }
    });

    $('#DefultColumn').click(function() {
        $('#AllSettingColumns').prop('checked', false);
        getRprtColsDefultList();
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/IDocR", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);

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
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject, true).done(function(data) {
            self.KalaList(data);
        });
    }

    $('#btnkala').click(function() {
        if (self.KalaList().length == 0) {
            getKalaList();
        }
    });
    //Get Inv List 
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/0/' + sessionStorage.userName, 'GET').done(function(data) {
            self.InvList(data);
        });
    }

    //Get  KGru List
    function getKGruList() {
        var KGruObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(KGruUri + ace + '/' + sal + '/' + group, 'POST', KGruObject, true).done(function(data) {
            self.KGruList(data);
        });
    }

    $('#btnKGru').click(function() {
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
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function(data) {
                self.StatusList(data);
                localStorage.setItem("InvStatus", JSON.stringify(data));
            });
        }
    }


    self.OptionsCaptionAnbar = ko.computed(function() {
        return 'همه انبارها';
    });


    //Get Thvl List
    function getThvlList() {
        var ThvlObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(ThvlUri + ace + '/' + sal + '/' + group, 'POST', ThvlObject, true).done(function(data) {
            self.ThvlList(data);
        });
    }

    $('#btnThvl').click(function() {
        if (self.ThvlList().length == 0) {
            getThvlList();
        }
    });

    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function(data) {
            self.OprList(data);
        });
    }
    $('#btnOpr').click(function() {
        if (self.OprList().length == 0) {
            getOprList();
        }
    });
    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function(data) {
            self.MkzList(data);
        });
    }
    $('#btnMkz').click(function() {
        if (self.MkzList().length == 0) {
            getMkzList();
        }
    });
    //Get IDocR
    function getIDocR() {
        //tarikh1 = $("#aztarikh").val().toEnglishDigit();
        //tarikh2 = $("#tatarikh").val().toEnglishDigit();

        azTarikh = self.AzDate().toEnglishDigit();//$("#aztarikh").val().toEnglishDigit();
        taTarikh = self.TaDate().toEnglishDigit();//$("#tatarikh").val().toEnglishDigit();

        //noSanadAnbar = $("#noSanadAnbar").val();

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


        var IDocRObject = {
            azTarikh: azTarikh,
            taTarikh: taTarikh,
            DocNo: 0,
            StatusCode: statuscode,
            ModeCode: imodecode,
            InvCode: invcode,
            KGruCode: kGrucode,
            KalaCode: kalacode,
            ThvlCode: thvlcode,
            MkzCode: mkzcode,
            OprCode: oprcode,
        };
        ajaxFunction(IDocRUri + ace + '/' + sal + '/' + group, 'POST', IDocRObject, true).done(function(response) {
            self.IDocRList(response);
            //  calcsum(self.IDocRList());
        });
    }

    function calcsum(list) {
        totalAmount1 = 0;
        totalAmount2 = 0;
        totalAmount3 = 0;
        totalUnitPrice = 0;
        totalTotalPrice = 0;

        KalaDeghat1 = 0;
        KalaDeghat2 = 0;
        KalaDeghat3 = 0;

        maxKalaDeghat1 = 0;
        maxKalaDeghat2 = 0;
        maxKalaDeghat3 = 0;

        for (var i = 0; i < list.length; ++i) {
            IDocRData = list[i];
            totalAmount1 += IDocRData.Amount1;
            totalAmount2 += IDocRData.Amount2;
            totalAmount3 += IDocRData.Amount3;

            totalUnitPrice += IDocRData.UnitPrice;
            totalTotalPrice += IDocRData.TotalPrice;

            KalaDeghat1 = IDocRData.KalaDeghatM1;
            KalaDeghat2 = IDocRData.KalaDeghatM2;
            KalaDeghat3 = IDocRData.KalaDeghatM3;

            KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
            KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
            KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
        }

        //$("#textTotal").text('جمع');
        $("#totalAmount1").text(NumberToNumberString(totalAmount1.toFixed(maxKalaDeghat1)));
        $("#totalAmount2").text(NumberToNumberString(totalAmount2.toFixed(maxKalaDeghat2)));
        $("#totalAmount3").text(NumberToNumberString(totalAmount3.toFixed(maxKalaDeghat3)));
        $("#totalUnitPrice").text(NumberToNumberString(totalUnitPrice.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalTotalPrice").text(NumberToNumberString(totalTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));
    }

    $("#CreateReport").click(function() {
        getIDocR();
        self.sortTableIDocR();
    });

    getInvList();
    //getKalaList();
    // getNoSanad();

    //getKGruList();
    getStatusList();

    $('#nameKala').val(translate('همه موارد'));
    $('#nameInv').val(translate('همه موارد'));
    $('#nameKGru').val(translate('همه موارد'));
    $('#nameThvl').val(translate('همه موارد'));
    $('#nameOpr').val(translate('همه موارد'));
    $('#nameMkz').val(translate('همه موارد'));
    $('#nameStatus').val(counterStatus +  ' ' + translate('مورد انتخاب شده'));
    $('#nameIMode').val(translate('همه موارد'));

    //------------------------------------------------------
    self.currentPageIDocR = ko.observable();
    pageSizeIDocR = localStorage.getItem('pageSizeIDocR') == null ? 10 : localStorage.getItem('pageSizeIDocR');
    self.pageSizeIDocR = ko.observable(pageSizeIDocR);
    self.currentPageIndexIDocR = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterDocDate = ko.observable("");
    self.filterDocNo = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterInvName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterTaeed = ko.observable("");
    self.filterTasvib = ko.observable("");
    self.filterThvlName = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprName = ko.observable("");
    self.filterSerialNumber = ko.observable("");
    self.filterBandNo = ko.observable("");
    self.filterKalaName = ko.observable("");
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
    self.filterMainUnitName = ko.observable("");
    self.filterKalaUnitName1 = ko.observable("");
    self.filterKalaUnitName2 = ko.observable("");
    self.filterKalaUnitName3 = ko.observable("");
    self.filterAmount1 = ko.observable("");
    self.filterAmount2 = ko.observable("");
    self.filterAmount3 = ko.observable("");
    self.filterUnitPrice = ko.observable("");
    self.filterTotalPrice = ko.observable("");
    self.filterBandSpec = ko.observable("");
    self.filterComm = ko.observable("");

    self.filterIDocRList = ko.computed(function() {

        self.currentPageIndexIDocR(0);
        var filterDocDate = self.filterDocDate();
        var filterDocNo = self.filterDocNo();
        var filterModeName = self.filterModeName();
        var filterInvName = self.filterInvName();
        var filterSpec = self.filterSpec();
        var filterStatus = self.filterStatus();
        var filterTaeed = self.filterTaeed().toUpperCase();
        var filterTasvib = self.filterTasvib().toUpperCase();
        var filterThvlName = self.filterThvlName().toUpperCase();
        var filterMkzName = self.filterMkzName();
        var filterOprName = self.filterOprName();
        var filterSerialNumber = self.filterSerialNumber();
        var filterBandNo = self.filterBandNo();
        var filterKalaName = self.filterKalaName();
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

        var filterMainUnitName = self.filterMainUnitName();
        var filterKalaUnitName1 = self.filterKalaUnitName1();
        var filterKalaUnitName2 = self.filterKalaUnitName2();
        var filterKalaUnitName3 = self.filterKalaUnitName3();
        var filterAmount1 = self.filterAmount1();
        var filterAmount2 = self.filterAmount2();
        var filterAmount3 = self.filterAmount3();
        var filterUnitPrice = self.filterUnitPrice();
        var filterTotalPrice = self.filterTotalPrice();
        var filterBandSpec = self.filterBandSpec();
        var filterComm = self.filterComm();

        filterAmount1 = filterAmount1.replace("/", ".");
        filterAmount2 = filterAmount2.replace("/", ".");
        filterAmount3 = filterAmount3.replace("/", ".");
        filterUnitPrice = filterUnitPrice.replace("/", ".");
        filterTotalPrice = filterTotalPrice.replace("/", ".");

        tempData = ko.utils.arrayFilter(self.IDocRList(), function(item) {
            result =
                (item.DocDate == null ? '' : item.DocDate.toString().search(filterDocDate) >= 0) &&
                ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                (item.ModeName == null ? '' : item.ModeName.toString().search(filterModeName) >= 0) &&
                (item.InvName == null ? '' : item.InvName.toString().search(filterInvName) >= 0) &&
                (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                (item.Taeed == null ? '' : item.Taeed.toString().search(filterTaeed) >= 0) &&
                (item.Tasvib == null ? '' : item.Tasvib.toString().search(filterTasvib) >= 0) &&
                (item.ThvlName == null ? '' : item.ThvlName.toString().search(filterThvlName) >= 0) &&
                (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
                ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filterSerialNumber) &&
                ko.utils.stringStartsWith(item.BandNo.toString().toLowerCase(), filterBandNo) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filterKalaName) >= 0) &&

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

                (item.MainUnitName == null ? '' : item.MainUnitName.toString().search(filterMainUnitName) >= 0) &&
                (item.KalaUnitName1 == null ? '' : item.KalaUnitName1.toString().search(filterKalaUnitName1) >= 0) &&
                (item.KalaUnitName2 == null ? '' : item.KalaUnitName2.toString().search(filterKalaUnitName2) >= 0) &&
                (item.KalaUnitName3 == null ? '' : item.KalaUnitName3.toString().search(filterKalaUnitName3) >= 0) &&
                ko.utils.stringStartsWith(item.Amount1.toString().toLowerCase(), filterAmount1) &&
                ko.utils.stringStartsWith(item.Amount2.toString().toLowerCase(), filterAmount2) &&
                ko.utils.stringStartsWith(item.Amount3.toString().toLowerCase(), filterAmount3) &&
                ko.utils.stringStartsWith(item.UnitPrice.toString(), filterUnitPrice) &&
                ko.utils.stringStartsWith(item.TotalPrice.toString().toLowerCase(), filterTotalPrice) &&
                (item.BandSpec == null ? '' : item.BandSpec.toString().search(filterBandSpec) >= 0) &&
                (item.Comm == null ? '' : item.Comm.toString().search(filterComm) >= 0)
            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchIDocR);
    self.firstMatch = ko.dependentObservable(function() {
        var indexIDocR = 0;
        sessionStorage.searchIDocR = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexIDocR(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.IDocRList(), function(item) {
                indexIDocR += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexIDocR < self.pageSizeIDocR())
                self.currentPageIndexIDocR(0);
            else {
                var a = Math.round((indexIDocR / self.pageSizeIDocR()), 0);
                if (a < (indexIDocR / self.pageSizeIDocR())) a += 1;
                self.currentPageIndexIDocR(a - 1);
            }
            return value;
        }
    });


    self.currentPageIDocR = ko.computed(function() {
        var pageSizeIDocR = parseInt(self.pageSizeIDocR(), 10),
            startIndex = pageSizeIDocR * self.currentPageIndexIDocR(),
            endIndex = startIndex + pageSizeIDocR;
        localStorage.setItem('pageSizeIDocR', pageSizeIDocR);
        return self.filterIDocRList().slice(startIndex, endIndex);
    });

    self.nextPageIDocR = function() {
        if (((self.currentPageIndexIDocR() + 1) * self.pageSizeIDocR()) < self.filterIDocRList().length) {
            self.currentPageIndexIDocR(self.currentPageIndexIDocR() + 1);
        }
    };

    self.previousPageIDocR = function() {
        if (self.currentPageIndexIDocR() > 0) {
            self.currentPageIndexIDocR(self.currentPageIndexIDocR() - 1);
        }
    };

    self.firstPageIDocR = function() {
        self.currentPageIndexIDocR(0);
    };

    self.lastPageIDocR = function() {
        tempCountIDocR = parseInt(self.filterIDocRList().length / self.pageSizeIDocR(), 10);
        if ((self.filterIDocRList().length % self.pageSizeIDocR()) == 0)
            self.currentPageIndexIDocR(tempCountIDocR - 1);
        else
            self.currentPageIndexIDocR(tempCountIDocR);
    };

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeDocDate = ko.observable("");
    self.iconTypeDocNo = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeTasvib = ko.observable("");
    self.iconTypeThvlName = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprName = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");
    self.iconTypeBandNo = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
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
    self.iconTypeMainUnitName = ko.observable("");
    self.iconTypeKalaUnitName1 = ko.observable("");
    self.iconTypeKalaUnitName2 = ko.observable("");
    self.iconTypeKalaUnitName3 = ko.observable("");
    self.iconTypeAmount1 = ko.observable("");
    self.iconTypeAmount2 = ko.observable("");
    self.iconTypeAmount3 = ko.observable("");
    self.iconTypeUnitPrice = ko.observable("");
    self.iconTypeTotalPrice = ko.observable("");
    self.iconTypeBandSpec = ko.observable("");
    self.iconTypeComm = ko.observable("");





    self.sortTableIDocR = function(viewModel, e) {

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
        self.IDocRList.sort(function(left, right) {
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

        self.iconTypeDocDate('');
        self.iconTypeDocNo('');
        self.iconTypeModeName('');
        self.iconTypeInvName('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
        self.iconTypeTaeed('');
        self.iconTypeTasvib('');
        self.iconTypeThvlName('');
        self.iconTypeMkzName('');
        self.iconTypeOprName('');
        self.iconTypeSerialNumber('');
        self.iconTypeBandNo('');
        self.iconTypeKalaName('');

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

        self.iconTypeMainUnitName('');
        self.iconTypeKalaUnitName1('');
        self.iconTypeKalaUnitName2('');
        self.iconTypeKalaUnitName3('');
        self.iconTypeAmount1('');
        self.iconTypeAmount2('');
        self.iconTypeAmount3('');
        self.iconTypeUnitPrice('');
        self.iconTypeTotalPrice('');
        self.iconTypeBandSpec('');
        self.iconTypeComm('');

        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'InvName') self.iconTypeInvName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tasvib') self.iconTypeTasvib((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlName') self.iconTypeThvlName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'BandNo') self.iconTypeBandNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaName') self.iconTypeKalaName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

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

        if (orderProp == 'MainUnitName') self.iconTypeMainUnitName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName1') self.iconTypeKalaUnitName1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName2') self.iconTypeKalaUnitName2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaUnitName3') self.iconTypeKalaUnitName3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount1') self.iconTypeAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount2') self.iconTypeAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount3') self.iconTypeAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice') self.iconTypeUnitPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TotalPrice') self.iconTypeTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'BandSpec') self.iconTypeBandSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Comm') self.iconTypeComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

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

    self.filterInvList = ko.computed(function() {

        self.currentPageIndexInv(0);
        var filter0 = self.filterInv0().toUpperCase();
        var filter1 = self.filterInv1();
        var filter2 = self.filterInv2();

        if (!filter0 && !filter1 && !filter2) {
            return self.InvList();
        } else {
            tempData = ko.utils.arrayFilter(self.InvList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageInv = ko.computed(function() {
        var pageSizeInv = parseInt(self.pageSizeInv(), 10),
            startIndex = pageSizeInv * self.currentPageIndexInv(),
            endIndex = startIndex + pageSizeInv;
        localStorage.setItem('pageSizeInv', pageSizeInv);
        return self.filterInvList().slice(startIndex, endIndex);
    });

    self.nextPageInv = function() {
        if (((self.currentPageIndexInv() + 1) * self.pageSizeInv()) < self.filterInvList().length) {
            self.currentPageIndexInv(self.currentPageIndexInv() + 1);
        }
    };

    self.previousPageInv = function() {
        if (self.currentPageIndexInv() > 0) {
            self.currentPageIndexInv(self.currentPageIndexInv() - 1);
        }
    };

    self.firstPageInv = function() {
        self.currentPageIndexInv(0);
    };

    self.lastPageInv = function() {
        countInv = parseInt(self.filterInvList().length / self.pageSizeInv(), 10);
        if ((self.filterInvList().length % self.pageSizeInv()) == 0)
            self.currentPageIndexInv(countInv - 1);
        else
            self.currentPageIndexInv(countInv);
    };

    self.sortTableInv = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.InvList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }


    $('#refreshInv').click(function() {
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


    self.AddInv = function(item) {

        InvCode = item.Code;
        find = false;
        list_InvSelect.forEach(function(item, key) {
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


    self.AddAllInv = function() {
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


    self.DelAllInv = function() {
        list_InvSelect = new Array();
        list_InvNameSelect = new Array();
        counterInv = 0;
        $("#TableBodyListInv").empty();
    };


    $('#modal-Inv').on('hide.bs.modal', function() {
        if (counterInv > 0)
            $('#nameInv').val(counterInv +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameInv').val(translate('همه موارد'));
    });

    $('#modal-Inv').on('shown.bs.modal', function() {

        $("#TableBodyListInv").empty();
        for (var i = 0; i < counterInv; i++) {
            if (list_InvSelect[i] != "") {

                $('#TableBodyListInv').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_InvSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_InvNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }

        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageKGru = ko.observable();
    pageSizeKGru = localStorage.getItem('pageSizeKGru') == null ? 10 : localStorage.getItem('pageSizeKGru');
    self.pageSizeKGru = ko.observable(pageSizeKGru);
    self.currentPageIndexKGru = ko.observable(0);

    self.filterKGru0 = ko.observable("");
    self.filterKGru1 = ko.observable("");
    self.filterKGru2 = ko.observable("");

    self.filterKGruList = ko.computed(function() {

        self.currentPageIndexKGru(0);
        var filter0 = self.filterKGru0().toUpperCase();
        var filter1 = self.filterKGru1();
        var filter2 = self.filterKGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.KGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.KGruList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKGru = ko.computed(function() {
        var pageSizeKGru = parseInt(self.pageSizeKGru(), 10),
            startIndex = pageSizeKGru * self.currentPageIndexKGru(),
            endIndex = startIndex + pageSizeKGru;
        localStorage.setItem('pageSizeKGru', pageSizeKGru);
        return self.filterKGruList().slice(startIndex, endIndex);
    });

    self.nextPageKGru = function() {
        if (((self.currentPageIndexKGru() + 1) * self.pageSizeKGru()) < self.filterKGruList().length) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() + 1);
        }
    };

    self.previousPageKGru = function() {
        if (self.currentPageIndexKGru() > 0) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() - 1);
        }
    };

    self.firstPageKGru = function() {
        self.currentPageIndexKGru(0);
    };

    self.lastPageKGru = function() {
        countKGru = parseInt(self.filterKGruList().length / self.pageSizeKGru(), 10);
        if ((self.filterKGruList().length % self.pageSizeKGru()) == 0)
            self.currentPageIndexKGru(countKGru - 1);
        else
            self.currentPageIndexKGru(countKGru);
    };

    self.sortTableKGru = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.KGruList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshKGru').click(function() {
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


    self.AddKGru = function(item) {

        KGruCode = item.Code;
        find = false;
        list_KGruSelect.forEach(function(item, key) {
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


    self.AddAllKGru = function() {
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


    self.DelAllKGru = function() {
        list_KGruSelect = new Array();
        list_KGruNameSelect = new Array();
        counterKGru = 0;
        $("#TableBodyListKGru").empty();
    };


    $('#modal-KGru').on('hide.bs.modal', function() {
        if (counterKGru > 0)
            $('#nameKGru').val(counterKGru +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameKGru').val(translate('همه موارد'));
    });

    $('#modal-KGru').on('shown.bs.modal', function() {
        $("#TableBodyListKGru").empty();
        for (var i = 0; i < counterKGru; i++) {
            if (list_KGruSelect[i] != "") {

                $('#TableBodyListKGru').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_KGruSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_KGruNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
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

    self.filterKalaList = ko.computed(function() {

        self.currentPageIndexKala(0);
        var filter0 = self.filterKala0().toUpperCase();
        var filter1 = self.filterKala1();
        var filter2 = self.filterKala2();
        var filter3 = self.filterKala3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.KalaList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaList(), function(item) {
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


    self.currentPageKala = ko.computed(function() {
        var pageSizeKala = parseInt(self.pageSizeKala(), 10),
            startIndex = pageSizeKala * self.currentPageIndexKala(),
            endIndex = startIndex + pageSizeKala;
        localStorage.setItem('pageSizeKala', pageSizeKala);
        return self.filterKalaList().slice(startIndex, endIndex);
    });

    self.nextPageKala = function() {
        if (((self.currentPageIndexKala() + 1) * self.pageSizeKala()) < self.filterKalaList().length) {
            self.currentPageIndexKala(self.currentPageIndexKala() + 1);
        }
    };

    self.previousPageKala = function() {
        if (self.currentPageIndexKala() > 0) {
            self.currentPageIndexKala(self.currentPageIndexKala() - 1);
        }
    };

    self.firstPageKala = function() {
        self.currentPageIndexKala(0);
    };

    self.lastPageKala = function() {
        countKala = parseInt(self.filterKalaList().length / self.pageSizeKala(), 10);
        if ((self.filterKalaList().length % self.pageSizeKala()) == 0)
            self.currentPageIndexKala(countKala - 1);
        else
            self.currentPageIndexKala(countKala);
    };

    self.sortTableKala = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.KalaList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }


    $('#refreshkala').click(function() {
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


    self.AddKala = function(item) {

        KalaCode = item.Code;
        find = false;
        list_KalaSelect.forEach(function(item, key) {
            if (item == KalaCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListKala').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                // + ' <td data-bind="text: FanniNo">' + item.FanniNo + '</td > '
                + '</tr>'
            );
            list_KalaSelect[counterKala] = item.Code;
            list_KalaNameSelect[counterKala] = item.Name;
            counterKala = counterKala + 1;
        }
    };


    self.AddAllKala = function() {
        list_KalaSelect = new Array();
        list_KalaNameSelect = new Array();
        list = self.KalaList();
        $("#TableBodyListKala").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKala').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                //   + ' <td data-bind="text: FanniNo">' + list[i].FanniNo + '</td > '
                + '</tr>'
            );
            list_KalaSelect[i] = list[i].Code;
            list_KalaNameSelect[i] = list[i].Name;
            counterKala = i + 1;
        }
    };


    self.DelAllKala = function() {
        list_KalaSelect = new Array();
        list_KalaNameSelect = new Array();
        counterKala = 0;
        $("#TableBodyListKala").empty();
    };


    $('#modal-kala').on('hide.bs.modal', function() {
        if (counterKala > 0)
            $('#nameKala').val(counterKala +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameKala').val(translate('همه موارد'));
    });

    $('#modal-kala').on('shown.bs.modal', function() {
        $("#TableBodyListKala").empty();
        for (var i = 0; i < counterKala; i++) {
            if (list_KalaSelect[i] != "") {
                $('#TableBodyListKala').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_KalaSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_KalaNameSelect[i] + '</td > '
                    //+ ' <td data-bind="text: FanniNo">' + value.FanniNo + '</td > '
                    + '</tr>'
                );
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });



    self.currentPageThvl = ko.observable();
    pageSizeThvl = localStorage.getItem('pageSizeThvl') == null ? 10 : localStorage.getItem('pageSizeThvl');
    self.pageSizeThvl = ko.observable(pageSizeThvl);
    self.currentPageIndexThvl = ko.observable(0);

    self.filterThvl0 = ko.observable("");
    self.filterThvl1 = ko.observable("");
    self.filterThvl2 = ko.observable("");

    self.filterThvlList = ko.computed(function() {

        self.currentPageIndexThvl(0);
        var filter0 = self.filterThvl0().toUpperCase();
        var filter1 = self.filterThvl1();
        var filter2 = self.filterThvl2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ThvlList();
        } else {
            tempData = ko.utils.arrayFilter(self.ThvlList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageThvl = ko.computed(function() {
        var pageSizeThvl = parseInt(self.pageSizeThvl(), 10),
            startIndex = pageSizeThvl * self.currentPageIndexThvl(),
            endIndex = startIndex + pageSizeThvl;
        localStorage.setItem('pageSizeThvl', pageSizeThvl);
        return self.filterThvlList().slice(startIndex, endIndex);
    });

    self.nextPageThvl = function() {
        if (((self.currentPageIndexThvl() + 1) * self.pageSizeThvl()) < self.filterThvlList().length) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() + 1);
        }
    };

    self.previousPageThvl = function() {
        if (self.currentPageIndexThvl() > 0) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() - 1);
        }
    };

    self.firstPageThvl = function() {
        self.currentPageIndexThvl(0);
    };

    self.lastPageThvl = function() {
        countThvl = parseInt(self.filterThvlList().length / self.pageSizeThvl(), 10);
        if ((self.filterThvlList().length % self.pageSizeThvl()) == 0)
            self.currentPageIndexThvl(countThvl - 1);
        else
            self.currentPageIndexThvl(countThvl);
    };

    self.sortTableThvl = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ThvlList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshThvl').click(function() {
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
                getThvlList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddThvl = function(item) {

        ThvlCode = item.Code;
        find = false;
        list_ThvlSelect.forEach(function(item, key) {
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
            list_ThvlNameSelect[counterThvl] = item.Name;
            counterThvl = counterThvl + 1;
        }
    };


    self.AddAllThvl = function() {
        list_ThvlSelect = new Array();
        list_ThvlNameSelect = new Array();
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
            list_ThvlNameSelect[i] = list[i].Name;
            counterThvl = i + 1;
        }
    };


    self.DelAllThvl = function() {
        list_ThvlSelect = new Array();
        list_ThvlNameSelect = new Array();
        counterThvl = 0;
        $("#TableBodyListThvl").empty();
    };


    $('#modal-Thvl').on('hide.bs.modal', function() {
        if (counterThvl > 0)
            $('#nameThvl').val(counterThvl +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameThvl').val(translate('همه موارد'));
    });

    $('#modal-Thvl').on('shown.bs.modal', function() {
        $("#TableBodyListThvl").empty();
        for (var i = 0; i < counterThvl; i++) {
            if (list_ThvlSelect[i] != "") {

                $('#TableBodyListThvl').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_ThvlSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_ThvlNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageMkz = ko.observable();
    pageSizeMkz = localStorage.getItem('pageSizeMkz') == null ? 10 : localStorage.getItem('pageSizeMkz');
    self.pageSizeMkz = ko.observable(pageSizeMkz);
    self.currentPageIndexMkz = ko.observable(0);

    self.filterMkz0 = ko.observable("");
    self.filterMkz1 = ko.observable("");
    self.filterMkz2 = ko.observable("");

    self.filterMkzList = ko.computed(function() {

        self.currentPageIndexMkz(0);
        var filter0 = self.filterMkz0().toUpperCase();
        var filter1 = self.filterMkz1();
        var filter2 = self.filterMkz2();

        if (!filter0 && !filter1 && !filter2) {
            return self.MkzList();
        } else {
            tempData = ko.utils.arrayFilter(self.MkzList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageMkz = ko.computed(function() {
        var pageSizeMkz = parseInt(self.pageSizeMkz(), 10),
            startIndex = pageSizeMkz * self.currentPageIndexMkz(),
            endIndex = startIndex + pageSizeMkz;
        localStorage.setItem('pageSizeMkz', pageSizeMkz);
        return self.filterMkzList().slice(startIndex, endIndex);
    });

    self.nextPageMkz = function() {
        if (((self.currentPageIndexMkz() + 1) * self.pageSizeMkz()) < self.filterMkzList().length) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() + 1);
        }
    };

    self.previousPageMkz = function() {
        if (self.currentPageIndexMkz() > 0) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() - 1);
        }
    };

    self.firstPageMkz = function() {
        self.currentPageIndexMkz(0);
    };

    self.lastPageMkz = function() {
        countMkz = parseInt(self.filterMkzList().length / self.pageSizeMkz(), 10);
        if ((self.filterMkzList().length % self.pageSizeMkz()) == 0)
            self.currentPageIndexMkz(countMkz - 1);
        else
            self.currentPageIndexMkz(countMkz);
    };

    self.sortTableMkz = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.MkzList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshMkz').click(function() {
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


    self.AddMkz = function(item) {

        MkzCode = item.Code;
        find = false;
        list_MkzSelect.forEach(function(item, key) {
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


    self.AddAllMkz = function() {
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


    self.DelAllMkz = function() {
        list_MkzSelect = new Array();
        list_MkzNameSelect = new Array();
        counterMkz = 0;
        $("#TableBodyListMkz").empty();
    };


    $('#modal-Mkz').on('hide.bs.modal', function() {
        if (counterMkz > 0)
            $('#nameMkz').val(counterMkz +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameMkz').val(translate('همه موارد'));
    });

    $('#modal-Mkz').on('shown.bs.modal', function() {
        $("#TableBodyListMkz").empty();
        for (var i = 0; i < counterMkz; i++) {
            if (list_MkzSelect[i] != "") {
                $('#TableBodyListMkz').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_MkzSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_MkzNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageOpr = ko.observable();
    pageSizeOpr = localStorage.getItem('pageSizeOpr') == null ? 10 : localStorage.getItem('pageSizeOpr');
    self.pageSizeOpr = ko.observable(pageSizeOpr);
    self.currentPageIndexOpr = ko.observable(0);

    self.filterOpr0 = ko.observable("");
    self.filterOpr1 = ko.observable("");
    self.filterOpr2 = ko.observable("");

    self.filterOprList = ko.computed(function() {

        self.currentPageIndexOpr(0);
        var filter0 = self.filterOpr0().toUpperCase();
        var filter1 = self.filterOpr1();
        var filter2 = self.filterOpr2();

        if (!filter0 && !filter1 && !filter2) {
            return self.OprList();
        } else {
            tempData = ko.utils.arrayFilter(self.OprList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageOpr = ko.computed(function() {
        var pageSizeOpr = parseInt(self.pageSizeOpr(), 10),
            startIndex = pageSizeOpr * self.currentPageIndexOpr(),
            endIndex = startIndex + pageSizeOpr;
        localStorage.setItem('pageSizeOpr', pageSizeOpr);
        return self.filterOprList().slice(startIndex, endIndex);
    });

    self.nextPageOpr = function() {
        if (((self.currentPageIndexOpr() + 1) * self.pageSizeOpr()) < self.filterOprList().length) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() + 1);
        }
    };

    self.previousPageOpr = function() {
        if (self.currentPageIndexOpr() > 0) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() - 1);
        }
    };

    self.firstPageOpr = function() {
        self.currentPageIndexOpr(0);
    };

    self.lastPageOpr = function() {
        countOpr = parseInt(self.filterOprList().length / self.pageSizeOpr(), 10);
        if ((self.filterOprList().length % self.pageSizeOpr()) == 0)
            self.currentPageIndexOpr(countOpr - 1);
        else
            self.currentPageIndexOpr(countOpr);
    };

    self.sortTableOpr = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.OprList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshOpr').click(function() {
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


    self.AddOpr = function(item) {

        OprCode = item.Code;
        find = false;
        list_OprSelect.forEach(function(item, key) {
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


    self.AddAllOpr = function() {
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


    self.DelAllOpr = function() {
        list_OprSelect = new Array();
        list_OprNameSelect = new Array();
        counterOpr = 0;
        $("#TableBodyListOpr").empty();
    };


    $('#modal-Opr').on('hide.bs.modal', function() {
        if (counterOpr > 0)
            $('#nameOpr').val(counterOpr +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameOpr').val(translate('همه موارد'));
    });

    $('#modal-Opr').on('shown.bs.modal', function() {
        $("#TableBodyListOpr").empty();
        for (var i = 0; i < counterOpr; i++) {
            if (list_OprSelect[i] != "") {
                $('#TableBodyListOpr').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_OprSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_OprNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });



    self.currentPageStatus = ko.observable();
    pageSizeStatus = localStorage.getItem('pageSizeStatus') == null ? 10 : localStorage.getItem('pageSizeStatus');
    self.pageSizeStatus = ko.observable(pageSizeStatus);
    self.currentPageIndexStatus = ko.observable(0);

    self.filterStatus0 = ko.observable("");

    self.filterStatusList = ko.computed(function() {

        self.currentPageIndexStatus(0);
        var filter0 = self.filterStatus0();

        if (!filter0) {
            return self.StatusList();
        } else {
            tempData = ko.utils.arrayFilter(self.StatusList(), function(item) {
                result =
                    item.Status == null ? '' : item.Status.toString().search(filter0) >= 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageStatus = ko.computed(function() {
        var pageSizeStatus = parseInt(self.pageSizeStatus(), 10),
            startIndex = pageSizeStatus * self.currentPageIndexStatus(),
            endIndex = startIndex + pageSizeStatus;
        localStorage.setItem('pageSizeStatus', pageSizeStatus);
        return self.filterStatusList().slice(startIndex, endIndex);
    });

    self.nextPageStatus = function() {
        if (((self.currentPageIndexStatus() + 1) * self.pageSizeStatus()) < self.filterStatusList().length) {
            self.currentPageIndexStatus(self.currentPageIndexStatus() + 1);
        }
    };

    self.previousPageStatus = function() {
        if (self.currentPageIndexStatus() > 0) {
            self.currentPageIndexStatus(self.currentPageIndexStatus() - 1);
        }
    };

    self.firstPageStatus = function() {
        self.currentPageIndexStatus(0);
    };

    self.lastPageStatus = function() {
        countStatus = parseInt(self.filterStatusList().length / self.pageSizeStatus(), 10);
        if ((self.filterStatusList().length % self.pageSizeStatus()) == 0)
            self.currentPageIndexStatus(countStatus - 1);
        else
            self.currentPageIndexStatus(countStatus);
    };

    self.sortTableStatus = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.StatusList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshStatus').click(function() {
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


    self.AddStatus = function(item) {

        Status = item.Status;
        find = false;
        list_StatusSelect.forEach(function(item, key) {
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

    self.AddAllStatus = function() {
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


    self.DelAllStatus = function() {
        list_StatusSelect = new Array();
        counterStatus = 0;
        $("#TableBodyListStatus").empty();
    };


    $('#modal-Status').on('hide.bs.modal', function() {
        if (counterStatus > 0)
            $('#nameStatus').val(counterStatus +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameStatus').val(translate('همه موارد'));
    });

    $('#modal-Status').on('shown.bs.modal', function() {
        $("#TableBodyListStatus").empty();
        for (var i = 0; i < counterStatus; i++) {
            if (list_StatusSelect[i] != "") {
                $('#TableBodyListStatus').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Status">' + list_StatusSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
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

        ajaxFunction(IModeUri + ace + '/' + sal + '/' + group, 'POST', IModeObject).done(function(data) {
            self.IModeList(data);
        });
    }


    self.currentPageIMode = ko.observable();
    pageSizeIMode = localStorage.getItem('pageSizeIMode') == null ? 10 : localStorage.getItem('pageSizeIMode');
    self.pageSizeIMode = ko.observable(pageSizeIMode);
    self.currentPageIndexIMode = ko.observable(0);

    self.filterIMode0 = ko.observable("");
    self.filterIMode1 = ko.observable("");

    self.filterIModeList = ko.computed(function() {

        self.currentPageIndexIMode(0);
        var filter0 = self.filterIMode0().toUpperCase();
        var filter1 = self.filterIMode1();

        if (!filter0 && !filter1) {
            return self.IModeList();
        } else {
            tempData = ko.utils.arrayFilter(self.IModeList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageIMode = ko.computed(function() {
        var pageSizeIMode = parseInt(self.pageSizeIMode(), 10),
            startIndex = pageSizeIMode * self.currentPageIndexIMode(),
            endIndex = startIndex + pageSizeIMode;
        localStorage.setItem('pageSizeIMode', pageSizeIMode);
        return self.filterIModeList().slice(startIndex, endIndex);
    });

    self.nextPageIMode = function() {
        if (((self.currentPageIndexIMode() + 1) * self.pageSizeIMode()) < self.filterIModeList().length) {
            self.currentPageIndexIMode(self.currentPageIndexIMode() + 1);
        }
    };

    self.previousPageIMode = function() {
        if (self.currentPageIndexIMode() > 0) {
            self.currentPageIndexIMode(self.currentPageIndexIMode() - 1);
        }
    };

    self.firstPageIMode = function() {
        self.currentPageIndexIMode(0);
    };

    self.lastPageIMode = function() {
        countIMode = parseInt(self.filterIModeList().length / self.pageSizeIMode(), 10);
        if ((self.filterIModeList().length % self.pageSizeIMode()) == 0)
            self.currentPageIndexIMode(countIMode - 1);
        else
            self.currentPageIndexIMode(countIMode);
    };

    self.sortTableIMode = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.IModeList.sort(function(left, right) {
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

    self.PageCountView = function() {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshIMode').click(function() {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست انواع سند") + " " + translate("به روز رسانی شود ؟"),
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
                getIModeList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddIMode = function(item) {

        IModeCode = item.Code;
        find = false;
        list_IModeSelect.forEach(function(item, key) {
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
            list_IModeNameSelect[counterIMode] = item.Name;
            counterIMode = counterIMode + 1;
        }
    };


    self.AddAllIMode = function() {
        list_IModeSelect = new Array();
        list_IModeNameSelect = new Array();
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
            list_IModeNameSelect[i] = list[i].Name;
            counterIMode = i + 1;
        }
    };


    self.DelAllIMode = function() {
        list_IModeSelect = new Array();
        list_IModeNameSelect = new Array();
        counterIMode = 0;
        $("#TableBodyListIMode").empty();
    };


    $('#modal-IMode').on('hide.bs.modal', function() {
        if (counterIMode > 0)
            $('#nameIMode').val(counterIMode +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameIMode').val(translate('همه موارد'));
    });

    $('#modal-IMode').on('shown.bs.modal', function() {
        $("#TableBodyListIMode").empty();
        for (var i = 0; i < counterIMode; i++) {
            if (list_IModeSelect[i] != "") {

                $('#TableBodyListIMode').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_IModeSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_IModeNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });



    $('.fix').attr('class', 'form-line date focused fix');





    self.ShowAFISanadAnbar = function(Band) {
        if (TestUseSanad(ace, sal,"SanadAnbar", Band.SerialNumber, false, Band.DocNo) == true) {
           // showNotification('در تب دیگری وجود دارد', 0)
        }
        else {
            localStorage.setItem("InvCodeAFISanadAnbar", Band.InvCode);
            localStorage.setItem("InOutAFISanadAnbar", Band.InOut);
            localStorage.setItem("ModeCodeAFISanadAnbar", Band.ModeCode);
            localStorage.setItem("DocNoAFISanadAnbar", Band.DocNo);
            window.open(sessionStorage.urlAFISanadAnbarIndex, '_blank');
        }
    }

    IsReport = localStorage.getItem("IsReport");
    localStorage.setItem("IsReport", null);


    if (IsReport == "true") {
        azTarikh = localStorage.getItem("AzTarikhReport");
        self.AzDate(azTarikh);

        taTarikh = localStorage.getItem("TaTarikhReport");
        self.TaDate(taTarikh);


        InvCode = localStorage.getItem("InvCodeReport");
        if (InvCode != "") {
            InvName = localStorage.getItem("InvNameReport");
            list_InvSelect = InvCode.split("*");
            list_InvNameSelect = InvName.split("*");
            counterInv = list_InvSelect.length;
            $('#nameInv').val(counterInv +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameInv').val(translate('همه موارد'));


        KGruCode = localStorage.getItem("KGruCodeReport");
        if (KGruCode != "") {
            KGruName = localStorage.getItem("KGruNameReport");
            list_KGruSelect = KGruCode.split("*");
            list_KGruNameSelect = KGruName.split("*");
            counterKGru = list_KGruSelect.length;
            $('#nameKGru').val(counterKGru +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameKGru').val(translate('همه موارد'));



        KalaCode = localStorage.getItem("KalaCodeReport");
        if (KalaCode != "") {
            KalaName = localStorage.getItem("KalaNameReport");
            list_KalaSelect = KalaCode.split("*");
            list_KalaNameSelect = KalaName.split("*");
            counterKala = list_KalaSelect.length;
            $('#nameKala').val(counterKala +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameKala').val(translate('همه موارد'))


        ThvlCode = localStorage.getItem("ThvlCodeReport");
        if (ThvlCode != "") {
            ThvlName = localStorage.getItem("ThvlNameReport");
            list_ThvlSelect = ThvlCode.split("*");
            list_ThvlNameSelect = ThvlName.split("*");
            counterThvl = list_ThvlSelect.length;
            $('#nameThvl').val(counterThvl +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameThvl').val(translate('همه موارد'));


        StatusCode = localStorage.getItem("StatusCodeReport");
        if (StatusCode != "") {
            list_StatusSelect = StatusCode.split("*");
            counterStatus = list_StatusSelect.length;
            $('#nameStatus').val(counterStatus +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameStatus').val(translate('همه موارد'));


        ImodeCode = localStorage.getItem("IModeCodeReport");
        if (ImodeCode != "") {
            ImodeName = localStorage.getItem("IModeNameReport");
            list_IModeSelect = ImodeCode.split("*");
            list_IModeNameSelect = ImodeName.split("*");
            counterIMode = list_IModeSelect.length;
            $('#nameIMode').val(counterIMode +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameIMode').val(translate('همه موارد'));


        mkzCode = localStorage.getItem("MkzCodeReport");
        if (mkzCode != "") {
            mkzName = localStorage.getItem("MkzNameReport");
            list_MkzSelect = mkzCode.split("*");
            list_MkzNameSelect = mkzName.split("*");
            counterMkz = list_MkzSelect.length;
            $('#nameMkz').val(counterMkz +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameMkz').val(translate('همه موارد'));

        oprCode = localStorage.getItem("OprCodeReport");
        if (oprCode != "") {
            oprName = localStorage.getItem("OprNameReport");
            list_OprSelect = oprCode.split("*");
            list_OprNameSelect = oprName.split("*");
            counterOpr = list_OprSelect.length;
            $('#nameOpr').val(counterOpr +  ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameOpr').val(translate('همه موارد'));


        getIDocR();
    }






    // $("#IDOC_I").hide();
    //$("#IDOC_O").hide();
    self.AccessAction = function (InOut, Eghdam) {
        if (InOut == '1') {
            if (localStorage.getItem("AccessSanad_IIDOC") == 'false') {
                res = Eghdam == sessionStorage.userName ? true : false
            }
            else {
                res = true;
            }
            if (res == true)
                res = $("#IDOC_I").css("display") != "none" && localStorage.getItem("VIEW_IIDOC") == 'true'
        }
        else if (InOut == '2') {
            if (localStorage.getItem("AccessSanad_IODOC") == 'false') {
                res = Eghdam == sessionStorage.userName ? true : false
            }
            else {
                res = true;
            }
            if (res == true)
            res = $("#IDOC_O").css("display") != "none" && localStorage.getItem("VIEW_IODOC") == 'true'
        }
        return res;
    }


    var showPrice = false;

    self.radif = function(index) {
        countShow = self.pageSizeIDocR();
        page = self.currentPageIndexIDocR();
        calc = (countShow * page) + 1;
        return index + calc;
    }





    function CreateTableReport(data) {
        $("#TableReport").empty();

        showPrice = localStorage.getItem("FDoc_REP_PRICE") == 'true';
        //showPrice = false;

        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableIDocR">' +

            '<th style="position: sticky;right: 0px;">' + translate('ردیف') + '</th>' +
            //'<th style="position: sticky;right: 0px;width:100px"><div class= "row" style="width: 100px;"> <div class="col-md-6">ردیف</div><div class="col-md-6">عملیات</div></div></th> ' +
            CreateTableTh('DocDate', data) +
            CreateTableTh('DocNo', data) +
            CreateTableTh('ModeName', data) +
            CreateTableTh('InvName', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('Taeed', data) +
            CreateTableTh('Tasvib', data) +
            CreateTableTh('ThvlName', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('SerialNumber', data) +
            CreateTableTh('BandNo', data) +
            CreateTableTh('KalaName', data) +
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
            CreateTableTh('MainUnitName', data) +
            CreateTableTh('KalaUnitName1', data) +
            CreateTableTh('KalaUnitName2', data) +
            CreateTableTh('KalaUnitName3', data) +
            CreateTableTh('Amount1', data) +
            CreateTableTh('Amount2', data) +
            CreateTableTh('Amount3', data) +
            CreateTableTh('UnitPrice', data) +
            CreateTableTh('TotalPrice', data) +
            CreateTableTh('BandSpec', data) +
            CreateTableTh('Comm', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind=" {foreach: currentPageIDocR}" style="cursor: default;">' +
            '   <tr data-bind=" style: {\'background-color\':  Status == \'باطل\'  ? \'#ff252540\' : null  } " > ' +


            /*'<td style="background-color: ' + colorRadif + '; position: sticky;right: 0px;">' +
            '   <div class= "row">' +
            '     <div class="col-md-6" data-bind="text: $root.radif($index())"></div>' +
            '     <div class="col-md-6">' +
            '        <a data-bind="click: $root.ShowAFISanadAnbar">' +
            '           <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" />' +
            '        </a>' +
            '     </div>' +
            '   </div>' +
            '</td>' +*/


            //'<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + '; position: sticky;right: 0px;">' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';">' +


            /*'<td style="position: sticky;right: 0px;">' +
            '    <a data-bind="click: $root.ShowAFISanadAnbar">' +
            '        <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" />' +
            '    </a >' +
            '</td >' +

            +'</td>' +*/

            /*'<td style="position: sticky;right: 0px;">' +
            '    <a data-bind="click: $root.ShowAFISanadAnbar">' +
            '        <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" />' +
            '    </a >' +
            '</td >' +*/



            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('ModeName', 0, 0, data) +
            CreateTableTd('InvName', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('Taeed', 0, 0, data) +
            CreateTableTd('Tasvib', 0, 0, data) +
            CreateTableTd('ThvlName', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +
            CreateTableTd('SerialNumber', 0, 0, data) +
            CreateTableTd('BandNo', 0, 0, data) +
            CreateTableTd('KalaName', 0, 0, data) +
            CreateTableTd('KalaFileNo', 0, 0, data) +
            CreateTableTd('KalaState', 0, 0, data) +
            CreateTableTd('KalaExf1', 0, 0, data) +
            CreateTableTd('KalaExf2', 0, 0, data) +
            CreateTableTd('KalaExf3', 0, 0, data) +
            CreateTableTd('KalaExf4', 0, 0, data) +
            CreateTableTd('KalaExf5', 0, 0, data) +
            CreateTableTd('KalaExf6', 0, 0, data) +
            CreateTableTd('KalaExf7', 0, 0, data) +
            CreateTableTd('KalaExf8', 0, 0, data) +
            CreateTableTd('KalaExf9', 0, 0, data) +
            CreateTableTd('KalaExf10', 0, 0, data) +
            CreateTableTd('KalaExf11', 0, 0, data) +
            CreateTableTd('KalaExf12', 0, 0, data) +
            CreateTableTd('KalaExf13', 0, 0, data) +
            CreateTableTd('KalaExf14', 0, 0, data) +
            CreateTableTd('KalaExf15', 0, 0, data) +
            CreateTableTd('MainUnitName', 0, 0, data) +
            CreateTableTd('KalaUnitName1', 0, 0, data) +
            CreateTableTd('KalaUnitName2', 0, 0, data) +
            CreateTableTd('KalaUnitName3', 0, 0, data) +
            CreateTableTd('Amount1', 'DeghatM1', 1, data) +
            CreateTableTd('Amount2', 'DeghatM2', 1, data) +
            CreateTableTd('Amount3', 'DeghatM3', 1, data) +
            CreateTableTd('UnitPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('TotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('BandSpec', 0, 0, data) +
            CreateTableTd('Comm', 0, 0, data) +
            ' <td>' +
            ' <a data-bind="visible: $root.AccessAction(InOut,Eghdam)" class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            ' </a>' +
            ' <ul class="dropdown-menu">' +
            '    <li>' +
            '      <a data-bind="click: $root.ShowAFISanadAnbar" style="font-size: 11px;">' +
            '          <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" />' + translate('نمایش سند') +
            '      </a >' +
            '    </li>' +
            ' </ul>' +
            ' </td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td style="background-color: #e37d228f !important;">' + translate('جمع') + '</td>' +
            CreateTableTdSum('DocDate', 0, data) +
            CreateTableTdSum('DocNo', 1, data) +
            CreateTableTdSum('ModeName', 1, data) +
            CreateTableTdSum('InvName', 1, data) +
            CreateTableTdSum('Spec', 1, data) +
            CreateTableTdSum('Status', 1, data) +
            CreateTableTdSum('Taeed', 1, data) +
            CreateTableTdSum('Tasvib', 1, data) +
            CreateTableTdSum('ThvlName', 1, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('OprName', 1, data) +
            CreateTableTdSum('SerialNumber', 1, data) +
            CreateTableTdSum('BandNo', 1, data) +
            CreateTableTdSum('KalaName', 1, data) +
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
            CreateTableTdSum('MainUnitName', 1, data) +
            CreateTableTdSum('KalaUnitName1', 1, data) +
            CreateTableTdSum('KalaUnitName2', 1, data) +
            CreateTableTdSum('KalaUnitName3', 1, data) +
            CreateTableTdSum('Amount1', 2, data) +
            CreateTableTdSum('Amount2', 2, data) +
            CreateTableTdSum('Amount3', 2, data) +
            CreateTableTdSum('UnitPrice', 2, data) +
            CreateTableTdSum('TotalPrice', 2, data) +
            CreateTableTdSum('BandSpec', 1, data) +
            CreateTableTdSum('Comm', 1, data) +
            '<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('ModeName', data) +
            CreateTableTdSearch('InvName', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('Taeed', data) +
            CreateTableTdSearch('Tasvib', data) +
            CreateTableTdSearch('ThvlName', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprName', data) +
            CreateTableTdSearch('SerialNumber', data) +
            CreateTableTdSearch('BandNo', data) +
            CreateTableTdSearch('KalaName', data) +
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
            CreateTableTdSearch('MainUnitName', data) +
            CreateTableTdSearch('KalaUnitName1', data) +
            CreateTableTdSearch('KalaUnitName2', data) +
            CreateTableTdSearch('KalaUnitName3', data) +
            CreateTableTdSearch('Amount1', data) +
            CreateTableTdSearch('Amount2', data) +
            CreateTableTdSearch('Amount3', data) +
            CreateTableTdSearch('UnitPrice', data) +
            CreateTableTdSearch('TotalPrice', data) +
            CreateTableTdSearch('BandSpec', data) +
            CreateTableTdSearch('Comm', data) +
            '<td></td>' +
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

            sortField = field == 'DocNo' ? 'DocNo' : field

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
    }

    self.SearchKeyDown = function(viewModel, e) {
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
            text += ' form-control" style="height: 2.4rem;direction: ltr;text-align: right;" /> </td>'; return text;
        }
    }


    createViewer();


    pageSizePrintForms = localStorage.getItem('pageSizePrintForms') == null ? 10 : localStorage.getItem('pageSizePrintForms');
    self.pageSizePrintForms = ko.observable(pageSizePrintForms);
    self.currentPageIndexKhdt = ko.observable(0);

    self.currentPageIndexPrintForms = ko.observable(0);
    self.filterPrintForms0 = ko.observable("");
    self.filterPrintForms1 = ko.observable("");

    self.filterPrintFormsList = ko.computed(function() {

        self.currentPageIndexPrintForms(0);
        var filter0 = self.filterPrintForms0();
        var filter1 = self.filterPrintForms1();

        if (!filter0 && !filter1) {
            return PrintFormsList();
        } else {
            tempData = ko.utils.arrayFilter(PrintFormsList(), function(item) {
                result =
                    (item.namefa == null ? '' : item.namefa.toString().search(filter0) >= 0) &&
                    (item.Selected == null ? '' : item.Selected.toString().search(filter1) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPagePrintForms = ko.computed(function() {
        var pageSizePrintForms = parseInt(self.pageSizePrintForms(), 10),
            startIndex = pageSizePrintForms * self.currentPageIndexPrintForms(),
            endIndex = startIndex + pageSizePrintForms;
        localStorage.setItem('pageSizePrintForms', pageSizePrintForms);
        return self.filterPrintFormsList().slice(startIndex, endIndex);
    });

    self.nextPagePrintForms = function() {
        if (((self.currentPageIndexPrintForms() + 1) * self.pageSizePrintForms()) < self.filterPrintFormsList().length) {
            self.currentPageIndexPrintForms(self.currentPageIndexPrintForms() + 1);
        }
    };

    self.previousPagePrintForms = function() {
        if (self.currentPageIndexPrintForms() > 0) {
            self.currentPageIndexPrintForms(self.currentPageIndexPrintForms() - 1);
        }
    };

    self.firstPagePrintForms = function() {
        self.currentPageIndexPrintForms(0);
    };


    self.lastPagePrintForms = function() {
        countPrintForms = parseInt(self.filterPrintFormsList().length / self.pageSizePrintForms(), 10);
        if ((self.filterPrintFormsList().length % self.pageSizePrintForms()) == 0)
            self.currentPageIndexPrintForms(countPrintForms - 1);
        else
            self.currentPageIndexPrintForms(countPrintForms);
    };


    self.iconTypenamefa = ko.observable("");

    self.sortTablePrintForms = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        PrintFormsList.sort(function(left, right) {
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

    self.radifPrint = function(index) {
        countShow = self.pageSizePrintForms();
        page = self.currentPageIndexPrintForms();
        calc = (countShow * page) + 1;
        return index + calc;
    }


    self.ShowActionPrint = function(isPublic) {
        return isPublic == 1 ? false : true;
    }


    self.ShowPrintForms = function(item) {
        printName = item.namefa;
        address = item.address;
        data = item.Data;
        printPublic = item.isPublic == 1 ? true : false;
        setReport(self.IDocRList(), data, printVariable);
    };


    self.SelectedPrintForms = function(item) {
        SelectedPrintForm(item.address, item.isPublic);
        GetPrintForms(sessionStorage.ModePrint);
        return true;
    };

    self.SelectedAccessGhimat = function(item) {
        SelectedAccessGhimatPrintForm(item.address, item.isPublic);
        GetPrintForms(sessionStorage.ModePrint);
        return true;
    };

    self.DeletePrintForms = function(item) {
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

    $('#AddNewPrintForms').click(function() {
        printName = translate('فرم جدید');
        printPublic = false;
        setReport(self.IDocRList(), '', printVariable);
    });


    $('#Print').click(function() {
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportIDocR";
        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
    });

    $('#DesignPrint').click(function() {
        self.filterPrintForms1("");
        $('#modal-Print').modal('hide');
        $('#modal-PrintForms').modal('show');
    });

    $('#AcceptPrint').click(function() {
        codeSelect = self.CodePrint();
        list = PrintFormsList();
        for (var i = 0; i < list.length; i++) {
            if (list[i].code == codeSelect) {
                name = list[i].namefa;
                data = list[i].Data;
            }
        }
        setReport(self.IDocRList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


};

ko.applyBindings(new ViewModel());

