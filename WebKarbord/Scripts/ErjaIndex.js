var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'Web2';
    var salErj = '0000';

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.ErjDocHList = ko.observableArray([]); // لیست گزارش  
    self.RelatedDocsList = ko.observableArray([]); // لیست گزارش  
    self.MahramanehList = ko.observableArray([]); // لیست محرمانه 
    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 

    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var ErjDocHUri = server + '/api/Web_Data/ErjDocH/'; // آدرس گزارش
    var MahramanehUri = server + '/api/Web_Data/Web_Mahramaneh/'; // آدرس محرمانه
    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var Web_ErjSaveDoc_Del_Uri = server + '/api/ErjDocH/'; // حذف پرونده
    var Web_ErjSaveDoc_HUri = server + '/api/ErjDocH/'; // آدرس ذخیره پرونده

    TestUser();

    shamsiDate = ShamsiDate();
    //self.AzDate = ko.observable(shamsiDate.substring(0, 4) - 1 + '/01/01');
    //self.TaDate = ko.observable(shamsiDate);

    self.p_DocDate = ko.observable('');
    self.p_MhltDate = ko.observable('');
    self.p_AmalDate = ko.observable('');
    self.p_EndDate = ko.observable('');

    self.p_Eghdam = ko.observable('');
    self.p_Tanzim = ko.observable('');

    self.p_EghdamName = ko.observable('');
    self.p_TanzimName = ko.observable('');

    self.p_Spec = ko.observable('');
    self.ErjCustCode = ko.observable();
    self.KhdtCode = ko.observable();
    self.p_RelatedDocs = ko.observable();

    self.p_Status = ko.observable();


    $('#btnp_DocDate').click(function () {
        $('#p_DocDate').change();
    });

    $('#btnp_MhltDate').click(function () {
        $('#p_MhltDate').change();
    });

    $('#btnp_AmalDate').click(function () {
        $('#p_AmalDate').change();
    });

    $('#btnp_EndDate').click(function () {
        $('#p_EndDate').change();
    });



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'ErjDocH';
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
        'Status',
        'Spec',
        'KhdtName',
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

    //Get ErjCust List
    function getErjCustList() {
        ajaxFunction(ErjCustUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjCustList(data);
        });
    }
    getErjCustList();


    function getKhdtList() {
        ajaxFunction(KhdtUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.KhdtList(data);
        });
    }
    getKhdtList();

    //Get ErjStatus List
    function getErjStatusList() {
        ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjStatusList(data);
        });
    }
    getErjStatusList();

    $('#SaveColumns').click(function () {
        SaveColumn(aceErj, salErj, group, rprtId, "/ERJ/index", columns, self.SettingColumnList());
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



    //Get Mahramaneh List
    function getMahramanehList() {
        ajaxFunction(MahramanehUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.MahramanehList(data);
        });
    }

    getMahramanehList();

    //Get ErjDocH
    function getErjDocH(select) {
        tarikh1 = '';
        tarikh2 = '';
        Status = '';
        SrchSt = '';
        ErjCust = '';
        Khdt = '';

        var ErjDocHObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
            select: select,
            AccessSanad: true,
        };
        ajaxFunction(ErjDocHUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjDocHObject).done(function (response) {
            self.ErjDocHList(response);
            self.RelatedDocsList(response);
        });
    }


    getErjDocH($('#pageCountSelector').val());


    $('#refreshErjDocH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست پرونده ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getErjDocH($('#pageCountSelector').val());
                self.sortTableErjDocH();
            }
        })
    })


    self.PageCountView = function () {
        select = $('#pageCountSelector').val();
        getErjDocH(select);
    }






    var flagupdate = 0;

    self.currentPageErjDocH = ko.observable();
    pageSizeErjDocH = localStorage.getItem('pageSizeErjDocH') == null ? 10 : localStorage.getItem('pageSizeErjDocH');
    self.pageSizeErjDocH = ko.observable(pageSizeErjDocH);
    self.currentPageIndexErjDocH = ko.observable(0);
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
    self.filterStatus = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterKhdtName = ko.observable("");
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

    self.filterErjDocHList = ko.computed(function () {

        self.currentPageIndexErjDocH(0);
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
        var filterStatus = self.filterStatus().toUpperCase();
        var filterSpec = self.filterSpec().toUpperCase();
        var filterKhdtName = self.filterKhdtName().toUpperCase();
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

        tempData = ko.utils.arrayFilter(self.ErjDocHList(), function (item) {
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
                (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                (item.KhdtName == null ? '' : item.KhdtName.toString().search(filterKhdtName) >= 0) &&
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
    self.search(sessionStorage.searchErjDocH);
    self.firstMatch = ko.dependentObservable(function () {
        var indexErjDocH = 0;
        sessionStorage.searchErjDocH = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexErjDocH(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.ErjDocHList(), function (item) {
                indexErjDocH += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexErjDocH < self.pageSizeErjDocH())
                self.currentPageIndexErjDocH(0);
            else {
                var a = Math.round((indexErjDocH / self.pageSizeErjDocH()), 0);
                if (a < (indexErjDocH / self.pageSizeErjDocH())) a += 1;
                self.currentPageIndexErjDocH(a - 1);
            }
            return value;
        }
    });



    self.currentPageErjDocH = ko.computed(function () {
        var pageSizeErjDocH = parseInt(self.pageSizeErjDocH(), 10),
            startIndex = pageSizeErjDocH * self.currentPageIndexErjDocH(),
            endIndex = startIndex + pageSizeErjDocH;
        localStorage.setItem('pageSizeErjDocH', pageSizeErjDocH);
        var a = self.filterErjDocHList().slice(startIndex, endIndex);
        return self.filterErjDocHList().slice(startIndex, endIndex);
    });


    self.nextPageErjDocH = function () {
        if (((self.currentPageIndexErjDocH() + 1) * self.pageSizeErjDocH()) < self.filterErjDocHList().length) {
            self.currentPageIndexErjDocH(self.currentPageIndexErjDocH() + 1);
        }
    };

    self.previousPageErjDocH = function () {
        if (self.currentPageIndexErjDocH() > 0) {
            self.currentPageIndexErjDocH(self.currentPageIndexErjDocH() - 1);
        }
    };

    self.firstPageErjDocH = function () {
        self.currentPageIndexErjDocH(0);
    };

    self.lastPageErjDocH = function () {
        tempCountErjDocH = parseInt(self.filterErjDocHList().length / self.pageSizeErjDocH(), 10);
        if ((self.filterErjDocHList().length % self.pageSizeErjDocH()) == 0)
            self.currentPageIndexErjDocH(tempCountErjDocH - 1);
        else
            self.currentPageIndexErjDocH(tempCountErjDocH);
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
    self.iconTypeStatus = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeKhdtName = ko.observable("");
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

    self.sortTableErjDocH = function (viewModel, e) {

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
        self.ErjDocHList.sort(function (left, right) {
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
        self.iconTypeStatus('');
        self.iconTypeSpec('');
        self.iconTypeKhdtName('');
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
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KhdtName') self.iconTypeKhdtName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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



    self.AddNewDocH = function (Band) {
        //sessionStorage.flagupdate = 0;
        //sessionStorage.Eghdam = sessionStorage.userName;
        //docBMode = Band.DocBMode;
        //serialNumber = Band.SerialNumber;
        // p_docno
        self.p_DocDate(shamsiDate);
        self.p_MhltDate('');
        self.p_AmalDate('');
        self.p_EndDate('');
        self.p_Eghdam(sessionStorage.userName);
        self.p_Tanzim(sessionStorage.userName);
        self.p_EghdamName(sessionStorage.userNameFa);
        self.p_TanzimName(sessionStorage.userNameFa);
        self.p_Spec('');
        self.ErjCustCode('');
        self.KhdtCode('');
        self.p_RelatedDocs('');

        $('#p_docno').val('');
        $('#nameErjCust').val('');
        $('#nameKhdt').val('');
        $('#p_EghdamComm').val('');
        $('#p_DocDesc').val('');
        $('#p_SpecialComm').val('');
        $('#p_FinalComm').val('');
        $('#p_Mahramaneh').val('فعال');
    }



    self.DeleteErjDocH = function (ErjDocHBand) {
        Swal.fire({
            title: 'تایید حذف',
            text: "آیا پرونده انتخابی حذف شود ؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {

                ajaxFunction(Web_ErjSaveDoc_Del_Uri + aceErj + '/' + salErj + '/' + group + '/' + ErjDocHBand.SerialNumber, 'DELETE').done(function (response) {
                    currentPage = self.currentPageIndexErjDocH();
                    getErjDocH($('#pageCountSelector').val());
                    self.currentPageIndexErjDocH(currentPage);
                    showNotification('پرونده حذف شد', 1);
                });


            }
        })
    };



    self.UpdateErjDocH = function (item) {

        self.p_DocDate(item.DocDate);
        self.p_MhltDate(item.MhltDate);
        self.p_AmalDate(item.AmalDate);
        self.p_EndDate(item.EndDate);

        self.p_Eghdam(item.Eghdam);
        self.p_Tanzim(item.Tanzim);

        self.p_EghdamName(item.EghdamName);
        self.p_TanzimName(item.TanzimName);
        self.p_Spec(item.Spec);
        self.ErjCustCode(item.CustCode);
        self.KhdtCode(item.KhdtCode);
        self.p_RelatedDocs(item.RelatedDocs);

        $('#p_docno').val(item.DocNo);
        $('#nameErjCust').val(item.CustName);
        $('#nameKhdt').val(item.KhdtName);
        $('#p_EghdamComm').val('');
        $('#p_DocDesc').val(item.DocDesc);
        $('#p_SpecialComm').val('');
        $('#p_FinalComm').val('');
        $('#p_Mahramaneh').val(item.Mahramaneh);
        $('#p_Status').val(item.Status);

        $('#modal-ErjDocH').modal('show');
    }




    $("#searchErjDocH").on("keydown", function search(e) {
        if (allSearchErjDocH == false) {
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


















    //Add   ذخیره پرونده
    function ErjSaveDoc_BSave(bandNoImput) {
        docNo = $("#p_docno").val();

        rjDate = ShamsiDate();
        p_DocDate = $("#p_DocDate").val().toEnglishDigit();
        p_MhltDate = $("#p_MhltDate").val().toEnglishDigit();
        p_AmalDate = $("#p_AmalDate").val().toEnglishDigit();
        p_EndDate = $("#p_EndDate").val().toEnglishDigit();

        /*     
                if (self.ErjUsersCode() == null && bandNoImput == 0) {
                    return showNotification('ارجاع شونده را انتخاب کنید', 0);
                }
        
               
                var ErjSaveDoc_BSaveObject;
                if (bandNoImput == 0) { // erja
                    natijeh = $("#e_Result").val();
        
                    if (natijeh == '') {
                        return showNotification('متن ارجاع را وارد کنید', 0);
                    }*/

        Web_ErjSaveDoc_HObject = {
            ModeCode: 0,
            DocNo: docNo == "" ? 0 : docNo,
            SerialNumber: docNo == "" ? 0 : docNo,
            DocDate: p_DocDate,
            MhltDate: p_MhltDate,
            BranchCode: 0,
            UserCode: sessionStorage.userName,
            Eghdam: self.p_Eghdam(),
            Tanzim: self.p_Tanzim(),
            TahieShode: 'Web',
            Status: $("#p_Status").val(),
            Spec: self.p_Spec(),
            CustCode: self.ErjCustCode(),
            KhdtCode: self.KhdtCode(),
            DocDesc: $("#p_EghdamComm").val(),
            EghdamComm: $("#p_DocDesc").val(),
            FinalCommComm: $("#p_SpecialComm").val(),
            SpecialComm: $("#p_FinalComm").val(),
            RelatedDocs: '',
            Mahramaneh: $("#p_Mahramaneh").val(),
            F01: '',
            F02: '',
            F03: '',
            F04: '',
            F05: '',
            F06: '',
            F07: '',
            F08: '',
            F09: '',
            F10: '',
            F11: '',
            F12: '',
            F13: '',
            F14: '',
            F15: '',
            F16: '',
            F17: '',
            F18: '',
            F19: '',
            F20: '',
        }



        ajaxFunction(Web_ErjSaveDoc_HUri + aceErj + '/' + salErj + '/' + group, 'POST', Web_ErjSaveDoc_HObject).done(function (response) {
            //bandNo = response;
            /*
            if (flagSave == true) {
                $('#modal-ErjDocErja').modal('hide');
            }
            else if (flagSave == false) {
                $('#modal-Erja').modal('hide');
                $('#modal-ErjDocErja').modal('hide');
            }

            list_ErjUsersRoneveshtSelect = new Array();
            counterErjUsersRonevesht = 0;
            $("#TableBodyListErjUsersRonevesht").empty();

            if (flagSave != null)
                getDocB_Last();*/

        });
        //flagInsertFdoch = 1;
    };


    $('#saveErjDocH').click(function () {
        ErjSaveDoc_BSave(0);
    })




















    self.currentPageIndexErjCust = ko.observable(0);
    pageSizeErjCust = localStorage.getItem('pageSizeErjCust') == null ? 10 : localStorage.getItem('pageSizeErjCust');
    self.pageSizeErjCust = ko.observable(pageSizeErjCust);

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
        localStorage.setItem('pageSizeErjCust', pageSizeErjCust);
        return self.filterErjCustList().slice(startIndex, endIndex);
    });


    self.nextPageErjCust = function () {
        if (((self.currentPageIndexErjCust() + 1) * self.pageSizeErjCust()) < self.filterErjCustList().length) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() + 1);
        }
        //else {
        //    self.currentPageIndexErjCust(0);
        //}
    };

    self.previousPageErjCust = function () {
        if (self.currentPageIndexErjCust() > 0) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() - 1);
        }
        //else {
        //    self.currentPageIndexErjCust((Math.ceil(self.filterErjCustList().length / self.pageSizeErjCust())) - 1);
        //}
    };

    self.firstPageErjCust = function () {
        self.currentPageIndexErjCust(0);
    };

    self.lastPageErjCust = function () {
        countErjCust = parseInt(self.filterErjCustList().length / self.pageSizeErjCust(), 10);
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


    $('#refreshErjCust').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: 'لیست مشتریان به روز رسانی شود ؟',
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getErjCustList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: sessionStorage.InOut == 1 ? 'لیست خریداران به روز رسانی شد' : 'لیست فروشندگان به روز رسانی شد' });
            }
        })
    })


    self.selectErjCust = function (item) {
        $('#nameErjCust').val('(' + item.Code + ') ' + item.Name)
        self.ErjCustCode(item.Code)
    };
























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
                getKhdtList();
            }
        })
    })



    self.selectKhdt = function (item) {
        $('#nameKhdt').val('(' + item.Code + ') ' + item.Name)
        self.KhdtCode(item.Code)
    };


















    var counterRelatedDocs = 0;
    var list_RelatedDocsSelect = new Array()



    self.currentPageRelatedDocs = ko.observable();
    pageSizeRelatedDocs = localStorage.getItem('pageSizeRelatedDocs') == null ? 10 : localStorage.getItem('pageSizeRelatedDocs');
    self.pageSizeRelatedDocs = ko.observable(pageSizeRelatedDocs);
    self.currentPageIndexRelatedDocs = ko.observable(0);

    self.filterRelatedDocs0 = ko.observable("");
    self.filterRelatedDocs1 = ko.observable("");
    self.filterRelatedDocs2 = ko.observable("");
    self.filterRelatedDocs3 = ko.observable("");

    self.iconTypeRelatedDocsDocNo = ko.observable("");
    self.iconTypeRelatedDocsDocDate = ko.observable("");
    self.iconTypeRelatedDocsCustName = ko.observable("");
    self.iconTypeRelatedDocsKhdtName = ko.observable("");




    self.filterRelatedDocsList = ko.computed(function () {

        self.currentPageIndexRelatedDocs(0);
        var filter0 = self.filterRelatedDocs0().toUpperCase();
        var filter1 = self.filterRelatedDocs1();
        var filter2 = self.filterRelatedDocs2();
        var filter3 = self.filterRelatedDocs3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.RelatedDocsList();
        } else {
            tempData = ko.utils.arrayFilter(self.RelatedDocsList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter0) &&
                    (item.DocDate == null ? '' : item.DocDate.toString().search(filter1) >= 0) &&
                    (item.CustName == null ? '' : item.CustName.toString().search(filter2) >= 0) &&
                    (item.KhdtName == null ? '' : item.KhdtName.toString().search(filter3) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageRelatedDocs = ko.computed(function () {
        var pageSizeRelatedDocs = parseInt(self.pageSizeRelatedDocs(), 10),
            startIndex = pageSizeRelatedDocs * self.currentPageIndexRelatedDocs(),
            endIndex = startIndex + pageSizeRelatedDocs;
        localStorage.setItem('pageSizeRelatedDocs', pageSizeRelatedDocs);
        return self.filterRelatedDocsList().slice(startIndex, endIndex);
    });

    self.nextPageRelatedDocs = function () {
        if (((self.currentPageIndexRelatedDocs() + 1) * self.pageSizeRelatedDocs()) < self.filterRelatedDocsList().length) {
            self.currentPageIndexRelatedDocs(self.currentPageIndexRelatedDocs() + 1);
        }
    };

    self.previousPageRelatedDocs = function () {
        if (self.currentPageIndexRelatedDocs() > 0) {
            self.currentPageIndexRelatedDocs(self.currentPageIndexRelatedDocs() - 1);
        }
    };

    self.firstPageRelatedDocs = function () {
        self.currentPageIndexRelatedDocs(0);
    };

    self.lastPageRelatedDocs = function () {
        countRelatedDocs = parseInt(self.filterRelatedDocsList().length / self.pageSizeRelatedDocs(), 10);
        if ((self.filterRelatedDocsList().length % self.pageSizeRelatedDocs()) == 0)
            self.currentPageIndexRelatedDocs(countRelatedDocs - 1);
        else
            self.currentPageIndexRelatedDocs(countRelatedDocs);
    };

    self.sortTableRelatedDocs = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.RelatedDocsList.sort(function (left, right) {
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

        self.iconTypeRelatedDocsDocNo('');
        self.iconTypeRelatedDocsDocDate('');
        self.iconTypeRelatedDocsCustName('');
        self.iconTypeRelatedDocsKhdtName('');

        if (orderProp == 'DocNo') self.iconTypeRelatedDocsDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeRelatedDocsDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeRelatedDocsCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KhdtName') self.iconTypeRelatedDocsKhdtName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    self.AddRelatedDocs = function (item) {
        RelatedDocsDocNo = item.DocNo;
        find = false;
        list_RelatedDocsSelect.forEach(function (item, key) {
            if (item == RelatedDocsDocNo) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableListRelatedDocs').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: DocNo">' + item.DocNo + '</td > '
                + ' <td data-bind="text: DocDate">' + item.DocDate + '</td > '
                + ' <td data-bind="text: CustName">' + item.CustName + '</td > '
                + ' <td data-bind="text: KhdtName">' + item.KhdtName + '</td > '
                + '</tr>'
            );
            list_RelatedDocsSelect[counterRelatedDocs] = item.DocNo;
            counterRelatedDocs += 1;
        }
    };


    self.AddAllRelatedDocs = function () {
        list_RelatedDocsSelect = new Array();
        list = self.RelatedDocsList();
        $("#TableBodyListRelatedDocs").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableListRelatedDocs').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: DocNo">' + list[i].DocNo + '</td > '
                + ' <td data-bind="text: DocDate">' + list[i].DocDate + '</td > '
                + ' <td data-bind="text: CustName">' + list[i].CustName + '</td > '
                + ' <td data-bind="text: KhdtName">' + list[i].KhdtName + '</td > '
                + '</tr>'
            );
            list_RelatedDocsSelect[i] = list[i].DocNo;
            counterRelatedDocs = i + 1;
        }
    };

    self.DelAllRelatedDocs = function () {
        list_RelatedDocsSelect = new Array();
        counterRelatedDocs = 0;
        $("#TableBodyListRelatedDocs").empty();
    };


    $('#modal-RelatedDocs').on('hide.bs.modal', function () {
        if (counterRelatedDocs > 0)
            $('#p_RelatedDocs').val(counterRelatedDocs + ' مورد انتخاب شده ')
        else
            $('#p_RelatedDocs').val('');
    });

    $('#modal-RelatedDocs').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.delselectRelatedDocs = function () {
        $(this).closest("tr").remove();
    };

    $('#refreshRelatedDocs').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "پرونده ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getErjDocH(3);
            }
        })
    })































    self.ShowAction = function (Eghdam) {
        return true;
    }


    self.radif = function (index) {
        countShow = self.pageSizeErjDocH();
        page = self.currentPageIndexErjDocH();
        calc = (countShow * page) + 1;
        return index + calc;
    }


    function CreateTableReport(data) {
        $("#TableList").empty();
        $('#TableList').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableErjDocH">' +
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
            CreateTableTh('Status', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('KhdtName', data) +
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
            '<th>عملیات</th>' +
            '      </tr>' +
            '   </thead >' +
            '<tbody data-bind="foreach: currentPageErjDocH" data-dismiss="modal" style="cursor: default;">' +
            '    <tr data-bind="click: $parent.selectErjDocH , css: { matched: $data === $root.firstMatch() },' +
            '       style: {color: Status == \'پايان يافته\'  ? ' +
            '\'#15a01b\'' +
            ': Status == \'باطل\' ? \'red\' : \'\' }">' +
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
            CreateTableTd('Status', 0, 0, 0, data) +
            CreateTableTd('Spec', 0, 0, 0, data) +
            CreateTableTd('KhdtName', 0, 0, '#f2f2f2', data) +
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
            '<td>' +
            '   <a id="UpdateErjDocH" data-bind="click: $root.UpdateErjDocH">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteErjDocH" data-bind="click: $root.DeleteErjDocH, visible: $root.ShowAction(Eghdam)">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
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
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('KhdtName', data) +
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


    self.SearchKeyDown = function (viewModel, e) {
        return KeyPressSearch(e);
    }


    self.currentPageIndexErjDocH(parseInt(sessionStorage.lastPageSelect == null ? 0 : sessionStorage.lastPageSelect));

    self.sortTableErjDocH();
};

ko.applyBindings(new ViewModel());

