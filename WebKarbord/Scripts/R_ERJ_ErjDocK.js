var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'Web2';//sessionStorage.ace;
    var salErj = '0000';//sessionStorage.sal;

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.DocKList = ko.observableArray([]); // لیست گزارش  


    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    var DocKUri = server + '/api/Web_Data/ErjDocK/'; // آدرس گزارش
    //var DocKCountUri = server + '/api/Web_Data/ErjDocKCount/'; // تعداد رکورد های گزارش

    TestUser();

    shamsiDate = ShamsiDate();
    //self.AzDate = ko.observable(sal + '/01/01');
    self.AzDate = ko.observable(shamsiDate.substring(0, 4) - 1 + '/01/01');
    self.TaDate = ko.observable(shamsiDate);

    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });


    var allSearchErjCust = true;

    var ErjCustCode = '';
    var counterErjCust = 0;
    var counterKhdt = 0;
    self.Status = ko.observable();

    var list_ErjCustSelect = new Array()
    var list_KhdtSelect = new Array()

    $("#textTotal").text('');


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'ErjDocK';
    var columns = [
        'DocNo',
        'DocDate',
        'MahramanehName',
        'Eghdam',
        'Tanzim',
        'AmalDate',
        'MhltDate',
        'EndDate',
        'CustCode',
        'CustName',
        'DocDesc',
        'EghdamComm',
        'FinalComm',
        'SpecialComm',
        'Status',
        'Spec',
        'KhdtName',
        'RjTime',
        'SerialNumber',
        'F01',
        'F02',
        'F03',
        'F04',
        'F05',
        'F06',
        'F07',
        'F08',
        'F09',
        'F10',
        'F11',
        'F12',
        'F13',
        'F14',
        'F15',
        'F16',
        'F17',
        'F18',
        'F19',
        'F20'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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
        ajaxFunction(RprtColsDefultUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(aceErj, salErj, group, rprtId, "/ReportERJ/ErjDocK", columns, self.SettingColumnList());
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






    //Get ErjCust List
    function getErjCustList() {
        ajaxFunction(ErjCustUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjCustList(data);
        });
    }

    //Get Khdt List
    function getKhdtList() {
        ajaxFunction(KhdtUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.KhdtList(data);
        });
    }

    //Get ErjStatus List
    function getErjStatusList() {
        ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjStatusList(data);
        });
    }

    //Get DocK
    function getDocK() {
        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        Status = $("#status").val();
        if (Status == null) Status = "";

        SrchSt = $("#SrchSt").val();
        if (SrchSt == null) SrchSt = "";

        var ErjCust = '';
        for (var i = 0; i <= counterErjCust - 1; i++) {
            if (i < counterErjCust - 1)
                ErjCust += list_ErjCustSelect[i] + '*';
            else
                ErjCust += list_ErjCustSelect[i];
        }

        var Khdt = '';
        for (var i = 0; i <= counterKhdt - 1; i++) {
            if (i < counterKhdt - 1)
                Khdt += list_KhdtSelect[i] + '*';
            else
                Khdt += list_KhdtSelect[i];
        }

        var DocKObject = {
            userName: sessionStorage.userName,
            userMode: sessionStorage.userModeErj,
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            Status: Status,
            CustCode: ErjCust,
            KhdtCode: Khdt,
            SrchSt: SrchSt,
            SerialNumber: 0,
        };
        ajaxFunction(DocKUri + aceErj + '/' + salErj + '/' + group, 'POST', DocKObject,true).done(function (response) {
            self.DocKList(response);
        });
    }


    $("#CreateReport").click(function () {
        getDocK();
        self.sortTableDocK();
    });

    getErjStatusList();
    getErjCustList();
    getKhdtList();

    $('#nameErjCust').val('همه موارد');
    $('#nameKhdt').val('همه موارد');


    self.currentPageDocK = ko.observable();
    pageSizeDocK = localStorage.getItem('pageSizeDocK') == null ? 10 : localStorage.getItem('pageSizeDocK');
    self.pageSizeDocK = ko.observable(pageSizeDocK);
    self.currentPageIndexDocK = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterMahramanehName = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterTanzim = ko.observable("");
    self.filterAmalDate = ko.observable("");
    self.filterMhltDate = ko.observable("");
    self.filterEndDate = ko.observable("");
    self.filterCustCode = ko.observable("");
    self.filterCustName = ko.observable("");
    self.filterDocDesc = ko.observable("");
    self.filterEghdamComm = ko.observable("");
    self.filterFinalComm = ko.observable("");
    self.filterSpecialComm = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterKhdtName = ko.observable("");
    self.filterRjTime = ko.observable("");
    self.filterSerialNumber = ko.observable("");
    self.filterF01 = ko.observable("");
    self.filterF02 = ko.observable("");
    self.filterF03 = ko.observable("");
    self.filterF04 = ko.observable("");
    self.filterF05 = ko.observable("");
    self.filterF06 = ko.observable("");
    self.filterF07 = ko.observable("");
    self.filterF08 = ko.observable("");
    self.filterF09 = ko.observable("");
    self.filterF10 = ko.observable("");
    self.filterF11 = ko.observable("");
    self.filterF12 = ko.observable("");
    self.filterF13 = ko.observable("");
    self.filterF14 = ko.observable("");
    self.filterF15 = ko.observable("");
    self.filterF16 = ko.observable("");
    self.filterF17 = ko.observable("");
    self.filterF18 = ko.observable("");
    self.filterF19 = ko.observable("");
    self.filterF20 = ko.observable("");

    self.filterDocKList = ko.computed(function () {

        self.currentPageIndexDocK(0);
        var filterDocNo = self.filterDocNo().toUpperCase();
        var filterDocDate = self.filterDocDate().toUpperCase();
        var filterMahramanehName = self.filterMahramanehName().toUpperCase();
        var filterEghdam = self.filterEghdam().toUpperCase();
        var filterTanzim = self.filterTanzim().toUpperCase();
        var filterAmalDate = self.filterAmalDate().toUpperCase();
        var filterMhltDate = self.filterMhltDate().toUpperCase();
        var filterEndDate = self.filterEndDate().toUpperCase();
        var filterCustCode = self.filterCustCode().toUpperCase();
        var filterCustName = self.filterCustName().toUpperCase();
        var filterDocDesc = self.filterDocDesc().toUpperCase();
        var filterEghdamComm = self.filterEghdamComm().toUpperCase();
        var filterFinalComm = self.filterFinalComm().toUpperCase();
        var filterSpecialComm = self.filterSpecialComm().toUpperCase();
        var filterStatus = self.filterStatus().toUpperCase();
        var filterSpec = self.filterSpec().toUpperCase();
        var filterKhdtName = self.filterKhdtName().toUpperCase();
        var filterRjTime = self.filterRjTime().toUpperCase();
        var filterSerialNumber = self.filterSerialNumber().toUpperCase();
        var filterF01 = self.filterF01();
        var filterF02 = self.filterF02();
        var filterF03 = self.filterF03();
        var filterF04 = self.filterF04();
        var filterF05 = self.filterF05();
        var filterF06 = self.filterF06();
        var filterF07 = self.filterF07();
        var filterF08 = self.filterF08();
        var filterF09 = self.filterF09();
        var filterF10 = self.filterF10();
        var filterF11 = self.filterF11();
        var filterF12 = self.filterF12();
        var filterF13 = self.filterF13();
        var filterF14 = self.filterF14();
        var filterF15 = self.filterF15();
        var filterF16 = self.filterF16();
        var filterF17 = self.filterF17();
        var filterF18 = self.filterF18();
        var filterF19 = self.filterF19();
        var filterF20 = self.filterF20();

        tempData = ko.utils.arrayFilter(self.DocKList(), function (item) {
            result =
                (item.DocNo == null ? '' : item.DocNo.toString().search(filterDocNo) >= 0) &&
                (item.DocDate == null ? '' : item.DocDate.toString().search(filterDocDate) >= 0) &&
                (item.MahramanehName == null ? '' : item.MahramanehName.toString().search(filterMahramanehName) >= 0) &&
                (item.Eghdam == null ? '' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                (item.Tanzim == null ? '' : item.Tanzim.toString().search(filterTanzim) >= 0) &&
                (item.AmalDate == null ? '' : item.AmalDate.toString().search(filterAmalDate) >= 0) &&
                (item.MhltDate == null ? '' : item.MhltDate.toString().search(filterMhltDate) >= 0) &&
                (item.EndDate == null ? '' : item.EndDate.toString().search(filterEndDate) >= 0) &&
                (item.CustCode == null ? '' : item.CustCode.toString().search(filterCustCode) >= 0) &&
                (item.CustName == null ? '' : item.CustName.toString().search(filterCustName) >= 0) &&
                (item.DocDesc == null ? '' : item.DocDesc.toString().search(filterDocDesc) >= 0) &&
                (item.EghdamComm == null ? '' : item.EghdamComm.toString().search(filterEghdamComm) >= 0) &&
                (item.FinalComm == null ? '' : item.FinalComm.toString().search(filterFinalComm) >= 0) &&
                (item.SpecialComm == null ? '' : item.SpecialComm.toString().search(filterSpecialComm) >= 0) &&
                (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                (item.KhdtName == null ? '' : item.KhdtName.toString().search(filterKhdtName) >= 0) &&
                ko.utils.stringStartsWith(item.RjTime.toString().toLowerCase(), filterRjTime) &&
                ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filterSerialNumber) &&
                (item.F01 == null ? '' : item.F01.toString().search(filterF01) >= 0) &&
                (item.F02 == null ? '' : item.F02.toString().search(filterF02) >= 0) &&
                (item.F03 == null ? '' : item.F03.toString().search(filterF03) >= 0) &&
                (item.F04 == null ? '' : item.F04.toString().search(filterF04) >= 0) &&
                (item.F05 == null ? '' : item.F05.toString().search(filterF05) >= 0) &&
                (item.F06 == null ? '' : item.F06.toString().search(filterF06) >= 0) &&
                (item.F07 == null ? '' : item.F07.toString().search(filterF07) >= 0) &&
                (item.F08 == null ? '' : item.F08.toString().search(filterF08) >= 0) &&
                (item.F09 == null ? '' : item.F09.toString().search(filterF09) >= 0) &&
                (item.F10 == null ? '' : item.F10.toString().search(filterF10) >= 0) &&
                (item.F11 == null ? '' : item.F11.toString().search(filterF11) >= 0) &&
                (item.F12 == null ? '' : item.F12.toString().search(filterF12) >= 0) &&
                (item.F13 == null ? '' : item.F13.toString().search(filterF13) >= 0) &&
                (item.F14 == null ? '' : item.F14.toString().search(filterF14) >= 0) &&
                (item.F15 == null ? '' : item.F15.toString().search(filterF15) >= 0) &&
                (item.F16 == null ? '' : item.F16.toString().search(filterF16) >= 0) &&
                (item.F17 == null ? '' : item.F17.toString().search(filterF17) >= 0) &&
                (item.F18 == null ? '' : item.F18.toString().search(filterF18) >= 0) &&
                (item.F19 == null ? '' : item.F19.toString().search(filterF19) >= 0) &&
                (item.F20 == null ? '' : item.F20.toString().search(filterF20) >= 0)

            return result;
        })
        $("#CountRecord").text(tempData.length);
        return tempData;
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchDocK);
    self.firstMatch = ko.dependentObservable(function () {
        var indexDocK = 0;
        sessionStorage.searchDocK = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexDocK(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.DocKList(), function (item) {
                indexDocK += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexDocK < self.pageSizeDocK())
                self.currentPageIndexDocK(0);
            else {
                var a = Math.round((indexDocK / self.pageSizeDocK()), 0);
                if (a < (indexDocK / self.pageSizeDocK())) a += 1;
                self.currentPageIndexDocK(a - 1);
            }
            return value;
        }
    });


    self.currentPageDocK = ko.computed(function () {
        var pageSizeDocK = parseInt(self.pageSizeDocK(), 10),
            startIndex = pageSizeDocK * self.currentPageIndexDocK(),
            endIndex = startIndex + pageSizeDocK;
        localStorage.setItem('pageSizeDocK', pageSizeDocK);
  return self.filterDocKList().slice(startIndex, endIndex);
    });

    self.nextPageDocK = function () {
        if (((self.currentPageIndexDocK() + 1) * self.pageSizeDocK()) < self.filterDocKList().length) {
            self.currentPageIndexDocK(self.currentPageIndexDocK() + 1);
        }
    };

    self.previousPageDocK = function () {
        if (self.currentPageIndexDocK() > 0) {
            self.currentPageIndexDocK(self.currentPageIndexDocK() - 1);
        }
    };

    self.firstPageDocK = function () {
        self.currentPageIndexDocK(0);
    };

    self.lastPageDocK = function () {
        tempCountDocK = parseInt(self.filterDocKList().length / self.pageSizeDocK(), 10);
        if ((self.filterDocKList().length % self.pageSizeDocK()) == 0)
            self.currentPageIndexDocK(tempCountDocK - 1);
        else
            self.currentPageIndexDocK(tempCountDocK);
    };




    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeMahramanehName = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeAmalDate = ko.observable("");
    self.iconTypeMhltDate = ko.observable("");
    self.iconTypeEndDate = ko.observable("");
    self.iconTypeCustCode = ko.observable("");
    self.iconTypeCustName = ko.observable("");
    self.iconTypeDocDesc = ko.observable("");
    self.iconTypeEghdamComm = ko.observable("");
    self.iconTypeFinalComm = ko.observable("");
    self.iconTypeSpecialComm = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeKhdtName = ko.observable("");
    self.iconTypeRjTime = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");
    self.iconTypeF01 = ko.observable("");
    self.iconTypeF02 = ko.observable("");
    self.iconTypeF03 = ko.observable("");
    self.iconTypeF04 = ko.observable("");
    self.iconTypeF05 = ko.observable("");
    self.iconTypeF06 = ko.observable("");
    self.iconTypeF07 = ko.observable("");
    self.iconTypeF08 = ko.observable("");
    self.iconTypeF09 = ko.observable("");
    self.iconTypeF10 = ko.observable("");
    self.iconTypeF11 = ko.observable("");
    self.iconTypeF12 = ko.observable("");
    self.iconTypeF13 = ko.observable("");
    self.iconTypeF14 = ko.observable("");
    self.iconTypeF15 = ko.observable("");
    self.iconTypeF16 = ko.observable("");
    self.iconTypeF17 = ko.observable("");
    self.iconTypeF18 = ko.observable("");
    self.iconTypeF19 = ko.observable("");
    self.iconTypeF20 = ko.observable("");

    self.sortTableDocK = function (viewModel, e) {

        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sort" + rprtId);
            self.sortType = localStorage.getItem("sortType" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sort" + rprtId , orderProp);
        localStorage.setItem("sortType" + rprtId, self.sortType);




        self.currentColumn(orderProp);
        self.DocKList.sort(function (left, right) {
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



        self.iconTypeDocNo('');
        self.iconTypeDocDate('');
        self.iconTypeMahramanehName('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeAmalDate('');
        self.iconTypeMhltDate('');
        self.iconTypeEndDate('');
        self.iconTypeCustCode('');
        self.iconTypeCustName('');
        self.iconTypeDocDesc('');
        self.iconTypeEghdamComm('');
        self.iconTypeFinalComm('');
        self.iconTypeSpecialComm('');
        self.iconTypeStatus('');
        self.iconTypeSpec('');
        self.iconTypeKhdtName('');
        self.iconTypeRjTime('');
        self.iconTypeSerialNumber('');
        self.iconTypeF01('');
        self.iconTypeF02('');
        self.iconTypeF03('');
        self.iconTypeF04('');
        self.iconTypeF05('');
        self.iconTypeF06('');
        self.iconTypeF07('');
        self.iconTypeF08('');
        self.iconTypeF09('');
        self.iconTypeF10('');
        self.iconTypeF11('');
        self.iconTypeF12('');
        self.iconTypeF13('');
        self.iconTypeF14('');
        self.iconTypeF15('');
        self.iconTypeF16('');
        self.iconTypeF17('');
        self.iconTypeF18('');
        self.iconTypeF19('');
        self.iconTypeF20('');



        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MahramanehName') self.iconTypeMahramanehName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AmalDate') self.iconTypeAmalDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MhltDate') self.iconTypeMhltDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'EndDate') self.iconTypeEndDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustCode') self.iconTypeCustCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDesc') self.iconTypeDocDesc((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'EghdamComm') self.iconTypeEghdamComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FinalComm') self.iconTypeFinalComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SpecialComm') self.iconTypeSpecialComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KhdtName') self.iconTypeKhdtName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'RjTime') self.iconTypeRjTime((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F01') self.iconTypeF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F02') self.iconTypeF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F03') self.iconTypeF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F04') self.iconTypeF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F05') self.iconTypeF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F06') self.iconTypeF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F07') self.iconTypeF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F08') self.iconTypeF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F09') self.iconTypeF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F10') self.iconTypeF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F11') self.iconTypeF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F12') self.iconTypeF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F13') self.iconTypeF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F14') self.iconTypeF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F15') self.iconTypeF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F16') self.iconTypeF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F17') self.iconTypeF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F18') self.iconTypeF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F19') self.iconTypeF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F20') self.iconTypeF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    self.currentPageErjCust = ko.observable();
    pageSizeErjCust = localStorage.getItem('pageSizeErjCust') == null ? 10 : localStorage.getItem('pageSizeErjCust');
    self.pageSizeErjCust = ko.observable(pageSizeErjCust);
    self.currentPageIndexErjCust = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.filterErjCust0 = ko.observable("");
    self.filterErjCust1 = ko.observable("");
    self.filterErjCust2 = ko.observable("");

    self.filterErjCustList = ko.computed(function () {
        self.currentPageIndexErjCust(0);
        var filter0 = self.filterErjCust0().toUpperCase();
        var filter1 = self.filterErjCust1();
        var filter2 = self.filterErjCust2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ErjCustList();
        } else {
            tempData = ko.utils.arrayFilter(self.ErjCustList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });

    self.currentPageErjCust = ko.computed(function () {
        var pageSizeErjCust = parseInt(self.pageSizeErjCust(), 10),
            startIndex = pageSizeErjCust * self.currentPageIndexErjCust(),
            endIndex = startIndex + pageSizeErjCust;
        localStorage.setItem('pageSizeDocK', pageSizeDocK);
  return self.filterErjCustList().slice(startIndex, endIndex);
    });

    self.nextPageErjCust = function () {
        if (((self.currentPageIndexErjCust() + 1) * self.pageSizeErjCust()) < self.filterErjCustList().length) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() + 1);
        }
    };

    self.previousPageErjCust = function () {
        if (self.currentPageIndexErjCust() > 0) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() - 1);
        }
    };

    self.firstPageErjCust = function () {
        self.currentPageIndexErjCust(0);
    };

    self.lastPageErjCust = function () {
        countErjCust = parseInt(self.filterErjCustList().length / self.pageSizeErjCust(), 10);
        if ((self.filterErjCustList().length % self.pageSizeErjCust()) == 0)
            self.currentPageIndexErjCust(countErjCust - 1);
        else
            self.currentPageIndexErjCust(countErjCust);
    };

    self.sortTableErjCust = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
       self.currentColumn(orderProp);
        self.ErjCustList.sort(function (left, right) {
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

    self.AddErjCust = function (item) {
        ErjCustCode = item.Code;
        find = false;
        list_ErjCustSelect.forEach(function (item, key) {
            if (item == ErjCustCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableListErjCust').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_ErjCustSelect[counterErjCust] = item.Code;
            counterErjCust = counterErjCust + 1;
        }
    };


    self.AddAllErjCust = function () {
        list_ErjCustSelect = new Array();
        list = self.ErjCustList();
        $("#TableBodyListErjCust").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableListErjCust').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_ErjCustSelect[i] = list[i].Code;
            counterErjCust = i + 1;
        }
    };

    self.DelAllErjCust = function () {
        list_ErjCustSelect = new Array();
        counterErjCust = 0;
        $("#TableBodyListErjCust").empty();
    };


    $('#modal-ErjCust').on('hide.bs.modal', function () {
        if (counterErjCust > 0)
            $('#nameErjCust').val(counterErjCust + ' مورد انتخاب شده ')
        else
            $('#nameErjCust').val('همه موارد');
    });

    $('#modal-ErjCust').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    $('#refreshErjCust').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست مشتری ها به روز رسانی شود ؟",
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
                getErjCustList();
                $("div.loadingZone").hide();
            }
        })
    })

    self.currentPageKhdt = ko.observable();
    pageSizeKhdt = localStorage.getItem('pageSizeKhdt') == null ? 10 : localStorage.getItem('pageSizeKhdt');
    self.pageSizeKhdt = ko.observable(pageSizeKhdt);
    self.currentPageIndexKhdt = ko.observable(0);

    self.filterKhdt0 = ko.observable("");
    self.filterKhdt1 = ko.observable("");
    self.filterKhdt2 = ko.observable("");


    self.filterKhdtList = ko.computed(function () {

        self.currentPageIndexKhdt(0);
        var filter0 = self.filterKhdt0().toUpperCase();
        var filter1 = self.filterKhdt1();
        var filter2 = self.filterKhdt2();

        if (!filter0 && !filter1 && !filter2) {
            return self.KhdtList();
        } else {
            tempData = ko.utils.arrayFilter(self.KhdtList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKhdt = ko.computed(function () {
        var pageSizeKhdt = parseInt(self.pageSizeKhdt(), 10),
            startIndex = pageSizeKhdt * self.currentPageIndexKhdt(),
            endIndex = startIndex + pageSizeKhdt;
        localStorage.setItem('pageSizeKhdt', pageSizeKhdt);
   return self.filterKhdtList().slice(startIndex, endIndex);
    });

    self.nextPageKhdt = function () {
        if (((self.currentPageIndexKhdt() + 1) * self.pageSizeKhdt()) < self.filterKhdtList().length) {
            self.currentPageIndexKhdt(self.currentPageIndexKhdt() + 1);
        }
    };

    self.previousPageKhdt = function () {
        if (self.currentPageIndexKhdt() > 0) {
            self.currentPageIndexKhdt(self.currentPageIndexKhdt() - 1);
        }
    };

    self.firstPageKhdt = function () {
        self.currentPageIndexKhdt(0);
    };

    self.lastPageKhdt = function () {
        countKhdt = parseInt(self.filterKhdtList().length / self.pageSizeKhdt(), 10);
        if ((self.filterKhdtList().length % self.pageSizeKhdt()) == 0)
            self.currentPageIndexKhdt(countKhdt - 1);
        else
            self.currentPageIndexKhdt(countKhdt);
    };

    self.sortTableKhdt = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
       self.currentColumn(orderProp);
        self.KhdtList.sort(function (left, right) {
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


    self.AddKhdt = function (item) {
        KhdtCode = item.Code;
        find = false;
        list_KhdtSelect.forEach(function (item, key) {
            if (item == KhdtCode) {
                find = true;
            }
        });

        if (find == false) {

            $('#TableListKhdt').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_KhdtSelect[counterKhdt] = item.Code;
            counterKhdt = counterKhdt + 1;
        }
    };


    self.AddAllKhdt = function () {
        list_KhdtSelect = new Array();
        list = self.KhdtList();
        $("#TableBodyListKhdt").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableListKhdt').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_KhdtSelect[i] = list[i].Code;
            counterKhdt = i + 1;
        }
    };

    self.DelAllKhdt = function () {
        list_KhdtSelect = new Array();
        counterKhdt = 0;
        $("#TableBodyListKhdt").empty();
    };


    $('#modal-Khdt').on('hide.bs.modal', function () {
        if (counterKhdt > 0)
            $('#nameKhdt').val(counterKhdt + ' مورد انتخاب شده ')
        else
            $('#nameKhdt').val('همه موارد');
    });

    $('#modal-Khdt').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.delselectKhdt = function () {
        $(this).closest("tr").remove();
    };

    $('#refreshKhdt').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "نوع کار ها به روز رسانی شود ؟",
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
                getKhdtList();
                $("div.loadingZone").hide();
            }
        })
    })

    $('.fix').attr('class', 'form-line date focused fix');




    self.ViewDocDesc = function (Band) {
        $('#titleComm').text('توضیحات عمومی');
        $('#modal-Comm').modal('show');
        $('#comm').val(Band.DocDesc);
    }

    self.ViewEghdamComm = function (Band) {
        $('#titleComm').text('توضیحات اقدام کننده');
        $('#modal-Comm').modal('show');
        $('#comm').val(Band.EghdamComm);
    }

    self.ViewFinalComm = function (Band) {
        $('#titleComm').text('توضیحات نهایی');
        $('#modal-Comm').modal('show');
        $('#comm').val(Band.FinalComm);
    }

    self.ViewSpecialComm = function (Band) {
        if (Band.FinalCommTrs == 1) {
            $('#titleComm').text('توضیحات مدیران');
            $('#modal-Comm').modal('show');
            $('#comm').val(Band.SpecialComm);
        }
        else {
            showNotification('دسترسی ندارید', 0);
        }
    }


    self.radif = function (index) {
        countShow = self.pageSizeDocK();
        page = self.currentPageIndexDocK();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableDocK">' +
            '<th>ردیف</th>' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('MahramanehName', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('Tanzim', data) +
            CreateTableTh('AmalDate', data) +
            CreateTableTh('MhltDate', data) +
            CreateTableTh('EndDate', data) +
            CreateTableTh('CustCode', data) +
            CreateTableTh('CustName', data) +
            CreateTableTh('DocDesc', data) +
            CreateTableTh('EghdamComm', data) +
            CreateTableTh('FinalComm', data) +
            CreateTableTh('SpecialComm', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('KhdtName', data) +
            CreateTableTh('RjTime', data) +
            CreateTableTh('SerialNumber', data) +
            CreateTableTh('F01', data) +
            CreateTableTh('F02', data) +
            CreateTableTh('F03', data) +
            CreateTableTh('F04', data) +
            CreateTableTh('F05', data) +
            CreateTableTh('F06', data) +
            CreateTableTh('F07', data) +
            CreateTableTh('F08', data) +
            CreateTableTh('F09', data) +
            CreateTableTh('F10', data) +
            CreateTableTh('F11', data) +
            CreateTableTh('F12', data) +
            CreateTableTh('F13', data) +
            CreateTableTh('F14', data) +
            CreateTableTh('F15', data) +
            CreateTableTh('F16', data) +
            CreateTableTh('F17', data) +
            CreateTableTh('F18', data) +
            CreateTableTh('F19', data) +
            CreateTableTh('F20', data) +
            '      </tr>' +
            '   </thead >' +
            '<tbody data-bind="foreach: currentPageDocK" data-dismiss="modal" style="cursor: default;">' +
            '    <tr data-bind="click: $parent.selectDocK , css: { matched: $data === $root.firstMatch() },' +
            '       style: {color: Status == \'پایان یافته\'  ? ' +
            '\'#15a01b\'' +
            ': Status == \'باطل\' ? \'red\' : \'\' }">' +



           // '<td><div style="display: flex; padding-top: 5px;"><span data-bind="text: $root.radif($index()) "> </span> ' +
          //  '<i data-bind="style: {\'display\': DocBExists == \'1\'  ? \'none\' : \'unset\'}" class="material-icons" style="color: #3f4d58;font-size:18px;padding-right:10px">folder_open</i>' +//   <span data-bind="text: RjReadSt == \'T\' ? \'X\' : null"></span> ' +
           // '</div></td>' +


            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +


            CreateTableTd('DocNo', 0, 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, 0, data) +
            CreateTableTd('MahramanehName', 0, 0, 0, data) +
            CreateTableTd('Eghdam', 0, 0, 0, data) +
            CreateTableTd('Tanzim', 0, 0, 0, data) +
            CreateTableTd('AmalDate', 0, 0, 0, data) +
            CreateTableTd('MhltDate', 0, 0, 0, data) +
            CreateTableTd('EndDate', 0, 0, 0, data) +
            CreateTableTd('CustCode', 0, 0, '#f2f2f2', data) +
            CreateTableTd('CustName', 0, 0, '#f2f2f2', data) +
            CreateTableTd('DocDesc', 0, 4, 0, data) +
            CreateTableTd('EghdamComm', 0, 4, 0, data) +
            CreateTableTd('FinalComm', 0, 4, 0, data) +
            CreateTableTd('SpecialComm', 0, 5, '#f2f2f2', data) +
            CreateTableTd('Status', 0, 0, 0, data) +
            CreateTableTd('Spec', 0, 0, 0, data) +
            CreateTableTd('KhdtName', 0, 0, '#f2f2f2', data) +
            CreateTableTd('RjTime', 0, 0, 0, data) +
            CreateTableTd('SerialNumber', 0, 0, 0, data) +
            CreateTableTd('F01', 0, 0, 0, data) +
            CreateTableTd('F02', 0, 0, 0, data) +
            CreateTableTd('F03', 0, 0, 0, data) +
            CreateTableTd('F04', 0, 0, 0, data) +
            CreateTableTd('F05', 0, 0, 0, data) +
            CreateTableTd('F06', 0, 0, 0, data) +
            CreateTableTd('F07', 0, 0, 0, data) +
            CreateTableTd('F08', 0, 0, 0, data) +
            CreateTableTd('F09', 0, 0, 0, data) +
            CreateTableTd('F10', 0, 0, 0, data) +
            CreateTableTd('F11', 0, 0, 0, data) +
            CreateTableTd('F12', 0, 0, 0, data) +
            CreateTableTd('F13', 0, 0, 0, data) +
            CreateTableTd('F14', 0, 0, 0, data) +
            CreateTableTd('F15', 0, 0, 0, data) +
            CreateTableTd('F16', 0, 0, 0, data) +
            CreateTableTd('F17', 0, 0, 0, data) +
            CreateTableTd('F18', 0, 0, 0, data) +
            CreateTableTd('F19', 0, 0, 0, data) +
            CreateTableTd('F20', 0, 0, 0, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td></td>' +
            CreateTableTdSum('DocNo', 0, data) +
            CreateTableTdSum('DocDate', 1, data) +
            CreateTableTdSum('MahramanehName', 1, data) +
            CreateTableTdSum('Eghdam', 1, data) +
            CreateTableTdSum('Tanzim', 1, data) +
            CreateTableTdSum('AmalDate', 1, data) +
            CreateTableTdSum('MhltDate', 1, data) +
            CreateTableTdSum('EndDate', 1, data) +
            CreateTableTdSum('CustCode', 1, data) +
            CreateTableTdSum('CustName', 1, data) +
            CreateTableTdSum('DocDesc', 1, data) +
            CreateTableTdSum('EghdamComm', 1, data) +
            CreateTableTdSum('FinalComm', 1, data) +
            CreateTableTdSum('SpecialComm', 1, data) +
            CreateTableTdSum('Status', 1, data) +
            CreateTableTdSum('Spec', 1, data) +
            CreateTableTdSum('KhdtName', 1, data) +
            CreateTableTdSum('RjTime', 1, data) +
            CreateTableTdSum('SerialNumber', 1, data) +
            CreateTableTdSum('F01', 1, data) +
            CreateTableTdSum('F02', 1, data) +
            CreateTableTdSum('F03', 1, data) +
            CreateTableTdSum('F04', 1, data) +
            CreateTableTdSum('F05', 1, data) +
            CreateTableTdSum('F06', 1, data) +
            CreateTableTdSum('F07', 1, data) +
            CreateTableTdSum('F08', 1, data) +
            CreateTableTdSum('F09', 1, data) +
            CreateTableTdSum('F10', 1, data) +
            CreateTableTdSum('F11', 1, data) +
            CreateTableTdSum('F12', 1, data) +
            CreateTableTdSum('F13', 1, data) +
            CreateTableTdSum('F14', 1, data) +
            CreateTableTdSum('F15', 1, data) +
            CreateTableTdSum('F16', 1, data) +
            CreateTableTdSum('F17', 1, data) +
            CreateTableTdSum('F18', 1, data) +
            CreateTableTdSum('F19', 1, data) +
            CreateTableTdSum('F20', 1, data) +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('MahramanehName', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('Tanzim', data) +
            CreateTableTdSearch('AmalDate', data) +
            CreateTableTdSearch('MhltDate', data) +
            CreateTableTdSearch('EndDate', data) +
            CreateTableTdSearch('CustCode', data) +
            CreateTableTdSearch('CustName', data) +
            CreateTableTdSearch('DocDesc', data) +
            CreateTableTdSearch('EghdamComm', data) +
            CreateTableTdSearch('FinalComm', data) +
            CreateTableTdSearch('SpecialComm', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('KhdtName', data) +
            CreateTableTdSearch('RjTime', data) +
            CreateTableTdSearch('SerialNumber', data) +
            CreateTableTdSearch('F01', data) +
            CreateTableTdSearch('F02', data) +
            CreateTableTdSearch('F03', data) +
            CreateTableTdSearch('F04', data) +
            CreateTableTdSearch('F05', data) +
            CreateTableTdSearch('F06', data) +
            CreateTableTdSearch('F07', data) +
            CreateTableTdSearch('F08', data) +
            CreateTableTdSearch('F09', data) +
            CreateTableTdSearch('F10', data) +
            CreateTableTdSearch('F11', data) +
            CreateTableTdSearch('F12', data) +
            CreateTableTdSearch('F13', data) +
            CreateTableTdSearch('F14', data) +
            CreateTableTdSearch('F15', data) +
            CreateTableTdSearch('F16', data) +
            CreateTableTdSearch('F17', data) +
            CreateTableTdSearch('F18', data) +
            CreateTableTdSearch('F19', data) +
            CreateTableTdSearch('F20', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }

    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);
        sortField = field == 'DocNo' ? 'DocNo' : field
        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + sortField + '">' +
            '<span data-column="' + sortField + '">' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + sortField + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }"  data-column="' + sortField + '" ></i> </span> ' +
            '</th>';
        return text;
    }

    function CreateTableTd(field, Deghat, no, color, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        color = "\'" + color + "\'";

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + ' , style: {\'background-color\': ' + color + ' != \'0\' ? ' + color + ' : null  }"></td>';
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
            case 4:
                text += 'data-bind="text: ' + field + ' , click: $root.View' + field + ' " class="ellipsis"></td>';
                break;
            case 5:
                text += 'data-bind="click: $root.View' + field + ', style: {\'background-color\': ' + color + ' != \'0\' ? ' + color + ' : null  } " style="font-size: 10px;color: #a7a3a3cc;font-style: italic" >برای نمایش کلیک کنید</td>';
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

    /*$('#Print').click(function () {
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        setReport(self.filterDocKList(), 'Free', printVariable);
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
        setReport(self.FDocPList(), '', printVariable);
    });


    $('#Print').click(function () {
        if (Serial == '')
            return showNotification('ابتدا فاکتور را ذخیره کنید', 0);
        getFDocP(Serial);
        if (self.FDocPList().length == 0)
            return showNotification('برای چاپ فاکتور حداقل یک بند الزامیست', 0);
        textFinalPrice = self.FDocPList()[0].FinalPrice.toPersianLetter() + titlePrice;
        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';
        printName = null;
        sessionStorage.ModePrint = sessionStorage.ModeCode;
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
        setReport(self.FDocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });

   
};

ko.applyBindings(new ViewModel());

