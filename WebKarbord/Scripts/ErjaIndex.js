var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'Web2';
    var salErj = '0000';

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.ErjDocHList = ko.observableArray([]); // لیست گزارش  
    self.MahramanehList = ko.observableArray([]); // لیست محرمانه 

    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var ErjDocHUri = server + '/api/Web_Data/ErjDocH/'; // آدرس گزارش
    var MahramanehUri = server + '/api/Web_Data/Web_Mahramaneh/'; // آدرس محرمانه

    TestUser();

    shamsiDate = ShamsiDate();
    self.AzDate = ko.observable(shamsiDate.substring(0, 4) - 1 + '/01/01');
    self.TaDate = ko.observable(shamsiDate);

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
        sessionStorage.searchErjDocH= "";
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



    self.AddNewErjDocH = function (Band) {
        sessionStorage.flagupdate = 0;
        sessionStorage.Eghdam = sessionStorage.userName;

        docBMode = Band.DocBMode;
        serialNumber = Band.SerialNumber;
        getDocK(serialNumber)
        getErjDocErja(serialNumber);
        if (docBMode == 1) { // رونوشت
            $('#panelFooterErjDocH').attr('hidden', '');
            $('#erja').attr('hidden', '');
        }
        else {
            $('#panelFooterErjDocH').removeAttr('hidden', '');
            $('#erja').removeAttr('hidden', '');
        }
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
                
            }
        })
    };

    self.UpdateErjDocH = function (item) {
        sessionStorage.flagupdate = 1;

        sessionStorage.SerialNumber = item.SerialNumber;
        sessionStorage.DocNo = item.DocNo;
        sessionStorage.DocDate = item.DocDate;
        sessionStorage.CustCode = item.CustCode;
        sessionStorage.CustName = item.CustName;
        sessionStorage.Spec = item.Spec;
        sessionStorage.PriceCode = item.KalaPriceCode;
        sessionStorage.InvCode = item.InvCode;
        sessionStorage.Eghdam = item.Eghdam;
        sessionStorage.TaeedF = item.Taeed;

        sessionStorage.AddMinSpec1 = item.AddMinSpec1//== "" ? null : item.AddMinSpec1;
        sessionStorage.AddMinSpec2 = item.AddMinSpec2// == "" ? null : item.AddMinSpec2;
        sessionStorage.AddMinSpec3 = item.AddMinSpec3// == "" ? null : item.AddMinSpec3;
        sessionStorage.AddMinSpec4 = item.AddMinSpec4// == "" ? null : item.AddMinSpec4;
        sessionStorage.AddMinSpec5 = item.AddMinSpec5// == "" ? null : item.AddMinSpec5;
        sessionStorage.AddMinSpec6 = item.AddMinSpec6// == "" ? null : item.AddMinSpec6;
        sessionStorage.AddMinSpec7 = item.AddMinSpec7// == "" ? null : item.AddMinSpec7;
        sessionStorage.AddMinSpec8 = item.AddMinSpec8// == "" ? null : item.AddMinSpec8;
        sessionStorage.AddMinSpec9 = item.AddMinSpec9// == "" ? null : item.AddMinSpec9;
        sessionStorage.AddMinSpec10 = item.AddMinSpec10 //== "" ? null : item.AddMinSpec10;

        sessionStorage.AddMin1 = item.AddMinPrice1 == null ? 0 : item.AddMinPrice1;
        sessionStorage.AddMin2 = item.AddMinPrice2 == null ? 0 : item.AddMinPrice2;
        sessionStorage.AddMin3 = item.AddMinPrice3 == null ? 0 : item.AddMinPrice3;
        sessionStorage.AddMin4 = item.AddMinPrice4 == null ? 0 : item.AddMinPrice4;
        sessionStorage.AddMin5 = item.AddMinPrice5 == null ? 0 : item.AddMinPrice5;
        sessionStorage.AddMin6 = item.AddMinPrice6 == null ? 0 : item.AddMinPrice6;
        sessionStorage.AddMin7 = item.AddMinPrice7 == null ? 0 : item.AddMinPrice7;
        sessionStorage.AddMin8 = item.AddMinPrice8 == null ? 0 : item.AddMinPrice8;
        sessionStorage.AddMin9 = item.AddMinPrice9 == null ? 0 : item.AddMinPrice9;
        sessionStorage.AddMin10 = item.AddMinPrice10 == null ? 0 : item.AddMinPrice10;

        sessionStorage.F01 = item.F01;
        sessionStorage.F02 = item.F02;
        sessionStorage.F03 = item.F03;
        sessionStorage.F04 = item.F04;
        sessionStorage.F05 = item.F05;
        sessionStorage.F06 = item.F06;
        sessionStorage.F07 = item.F07;
        sessionStorage.F08 = item.F08;
        sessionStorage.F09 = item.F09;
        sessionStorage.F10 = item.F10;
        sessionStorage.F11 = item.F11;
        sessionStorage.F12 = item.F12;
        sessionStorage.F13 = item.F13;
        sessionStorage.F14 = item.F14;
        sessionStorage.F15 = item.F15;
        sessionStorage.F16 = item.F16;
        sessionStorage.F17 = item.F17;
        sessionStorage.F18 = item.F18;
        sessionStorage.F19 = item.F19;
        sessionStorage.F20 = item.F20;
        sessionStorage.ModeCode = item.ModeCode;

        sessionStorage.Status = item.Status;
        sessionStorage.PaymentType = item.PaymentType;
        sessionStorage.Footer = item.Footer;

        sessionStorage.lastPageSelect = self.currentPageIndexFDocH();

        window.location.href = sessionStorage.urlAddFDocH;
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

