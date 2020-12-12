var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");
    sessionStorage.BeforeMoveSanadAnbar = false;

    var allSearchIDocH = true;
    var defultMove;
    var docDate;
    var serial;
    var invSelected = 0;

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها
    self.IModeList = ko.observableArray([]); // لیست نوع فاکتور ها
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.IDocHList = ko.observableArray([]); // لیست اطلاعات انبار 
    self.InvList = ko.observableArray([]); // ليست انبار ها

    var rprtId = sessionStorage.InOut == 1 ? 'IDocH_I' : 'IDocH_O';

    var IMoveSanadUri = server + '/api/IDocData/MoveSanad/'; // آدرس انتقال اسناد 
    var IChangeStatusUri = server + '/api/IDocData/ChangeStatus/'; // آدرس تغییر وضعیت اسناد 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع اسناد 
    var IDocHUri = server + '/api/IDocData/IDocH/'; // آدرس لیست اسناد انبار 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var IDocHiUri = server + '/api/AFI_IDocHi/'; // آدرس هدر سند 
    var IDocHCountUri = server + '/api/IDocData/IDocH/'; // تعداد رکورد های سند 


    self.InvCode = ko.observable();
    self.InvCodeMove = ko.observable();
    self.StatusSanad = ko.observable();


    var columns = [
        'DocNo',
        'DocDate',
        'InvName',
        'ThvlName',
        'ModeName',
        'Spec',
        'Status',
        'Eghdam',
        'Tanzim',
        'Taeed',
        'Tasvib',
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

    //Get Status List
    function getStatusList() {
        progName = getProgName('P');
        ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
            self.StatusList(data);
        });
    }



    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {
        selectStatus = $("#status").val();
        if (sessionStorage.InOut == 1) {
            //accessTaeed
            // accessTasvib
            if (sessionStorage.Access_TAEED_IIDOC == 'false' && selectStatus == 'تایید') {
                $("#status").val(lastStatus);
                return showNotification('دسترسی تایید ندارید', 0);
            }

            if (sessionStorage.Access_TASVIB_IIDOC == 'false' && selectStatus == 'تصویب') {
                $("#status").val(lastStatus);
                return showNotification('دسترسی تصویب ندارید', 0);
            }

        }

        if (sessionStorage.InOut == 2) {
            if (sessionStorage.Access_TAEED_IODOC == 'false' && selectStatus == 'تایید') {
                $("#status").val(lastStatus);
                return showNotification('نیاز به دسترسی تایید', 0);
            }

            if (sessionStorage.Access_TASVIB_IODOC == 'false' && selectStatus == 'تصویب') {
                $("#status").val(lastStatus);
                return showNotification('نیاز به دسترسی تصویب', 0);
            }
        }


        if (sessionStorage.Status != 'تایید' && selectStatus == 'تصویب') {
            $("#status").val(lastStatus);
            return showNotification('فقط اسناد تایید شده امکان تصویب دارند', 0);
        }

    });


    $('#SaveColumns').click(function () {
        SaveColumn(sessionStorage.ace, sessionStorage.sal, sessionStorage.group, rprtId, "/AFISanadAnbar/index", columns, self.SettingColumnList());
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



    $("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
    $("#groupTest").text('نام گروه' + sessionStorage.group);
    $("#salTest").text('سال مالی' + sessionStorage.sal);



    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/3/' + sessionStorage.userName, 'GET').done(function (data) {
            self.InvList(data);
            //localStorage.setItem('InvSelectSanadAnbar', '');
            // last = localStorage.getItem('InvSelectSanadAnbar');
            invSelected = localStorage.getItem('InvSelectSanadAnbar') == null ? '' : localStorage.getItem('InvSelectSanadAnbar');

            if (self.InvList().length > 0) {
                if (flagupdateHeader == 1) {
                    $("#inv").val(sessionStorage.InvCode);
                    self.InvCode(sessionStorage.InvCode);
                }
                else {
                    if (sessionStorage.InvDefult != "null")
                        $("#inv").val(sessionStorage.InvDefult);
                }
            }

            self.InvCode(invSelected);

        });
    }
    //var storedNames = JSON.parse(sessionStorage.getItem("inv"));
    // self.InvList(storedNames);

    self.currentPageIndexIDocH = ko.observable(0);

    //Get IDocH
    function getIDocH(select, invCode) {

        if (invCode == "" || invCode == "null" || invCode == null)
            invCode = "";

        var IDocHMinObject = {
            InOut: sessionStorage.InOut,
            select: select,
            invSelect: invCode,
            user: sessionStorage.userName,
            accessSanad: sessionStorage.AccessSanad,
            updatedate: null
        }

        ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group, 'POST', IDocHMinObject).done(function (data) {
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.IDocHList(data);
            //self.currentPageIndexIDocH(0);
            //ajaxFunction(IDocHCountUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.InOut + '/Count', 'GET').done(function (dataCount) {
            //    $('#countAllRecord').text(dataCount);
            // });
            self.currentPageIndexIDocH(0);
            localStorage.setItem('InvSelectSanadAnbar', invCode);
            invSelected = invCode;
        });
    }

    self.OptionsCaptionAnbar = ko.computed(function () {
        //        return self.InvList().length > 1 ? 'همه انبار ها' : 'انبار تعریف نشده است';
        return 'همه انبار ها';

    });


    getInvList();
    getStatusList();

    getIDocH(0, invSelected);
    $('#invSelect').val(invSelected);

    //------------------------------------------------------
    self.currentPageIDocH = ko.observable();
    self.pageSizeIDocH = ko.observable(10);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterInvName = ko.observable("");
    self.filterThvlName = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterTanzim = ko.observable("");
    self.filterTaeed = ko.observable("");
    self.filterTasvib = ko.observable("");
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


    self.filterIDocHList = ko.computed(function () {
        self.currentPageIndexIDocH(0);
        var filterDocNo = self.filterDocNo();
        var filterDocDate = self.filterDocDate();
        var filterInvName = self.filterInvName();
        var filterThvlName = self.filterThvlName();
        var filterModeName = self.filterModeName();
        var filterSpec = self.filterSpec();
        var filterStatus = self.filterStatus();
        var filterEghdam = self.filterEghdam().toUpperCase();
        var filterTanzim = self.filterTanzim().toUpperCase();
        var filterTaeed = self.filterTaeed().toUpperCase();
        var filterTasvib = self.filterTasvib().toUpperCase();
        var filterSerialNumber = self.filterSerialNumber();
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

        if (!filterDocNo && !filterDocDate && !filterInvName && !filterThvlName && !filterModeName && !filterSpec && !filterStatus && !filterEghdam &&
            !filterTanzim && !filterTaeed && !filterTasvib && !filterSerialNumber &&
            !filterF01 && !filterF02 && !filterF03 && !filterF04 && !filterF05 && !filterF06 && !filterF07 && !filterF08 && !filterF09 && !filterF10 &&
            !filterF11 && !filterF12 && !filterF13 && !filterF14 && !filterF15 && !filterF16 && !filterF17 && !filterF18 && !filterF19 && !filterF20) {
            $("#CountRecord").text(self.IDocHList().length);
            // $('#CountRecord').text(CountTable('IDocH', null, sessionStorage.InOut));
            return self.IDocHList();
        } else {
            tempData = ko.utils.arrayFilter(self.IDocHList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                    ko.utils.stringStartsWith(item.DocDate.toString().toLowerCase(), filterDocDate) &&
                    (item.InvName == null ? '' : item.InvName.toString().search(filterInvName) >= 0) &&
                    (item.ThvlName == null ? '' : item.ThvlName.toString().search(filterThvlName) >= 0) &&
                    (item.ModeName == null ? '' : item.ModeName.toString().search(filterModeName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                    (item.Eghdam == null ? '' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.Tanzim == null ? '' : item.Tanzim.toString().search(filterTanzim) >= 0) &&
                    (item.Taeed == null ? '' : item.Taeed.toString().search(filterTaeed) >= 0) &&
                    (item.Tasvib == null ? '' : item.Tasvib.toString().search(filterTasvib) >= 0) &&
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
        }
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchIDocH);
    self.firstMatch = ko.dependentObservable(function () {
        var indexIDocH = 0;
        sessionStorage.searchIDocH = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexIDocH(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.IDocHList(), function (item) {
                indexIDocH += 1;
                return ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), search);
            });
            if (indexIDocH < self.pageSizeIDocH())
                self.currentPageIndexIDocH(0);
            else {
                var a = Math.round((indexIDocH / self.pageSizeIDocH()), 0);
                if (a < (indexIDocH / self.pageSizeIDocH())) a += 1;
                self.currentPageIndexIDocH(a - 1);
            }
            if (value == null)
                self.currentPageIndexIDocH(0);
            return value;
        }
    });


    self.currentPageIDocH = ko.computed(function () {
        var pageSizeIDocH = parseInt(self.pageSizeIDocH(), 10),
            startIndex = pageSizeIDocH * self.currentPageIndexIDocH(),
            endIndex = startIndex + pageSizeIDocH;
        return self.filterIDocHList().slice(startIndex, endIndex);
    });

    self.nextPageIDocH = function () {
        if (((self.currentPageIndexIDocH() + 1) * self.pageSizeIDocH()) < self.filterIDocHList().length) {
            self.currentPageIndexIDocH(self.currentPageIndexIDocH() + 1);
        }
        //else {
        //    self.currentPageIndexIDocH(0);
        //}
    };

    self.previousPageIDocH = function () {
        if (self.currentPageIndexIDocH() > 0) {
            self.currentPageIndexIDocH(self.currentPageIndexIDocH() - 1);
        }
        //else {
        //    self.currentPageIndexidoch((Math.ceil(self.filterIDocHList().length / self.pageSizeIDocH())) - 1);
        //}
    };

    self.firstPageIDocH = function () {
        self.currentPageIndexIDocH(0);
    };

    self.lastPageIDocH = function () {
        tempCountIDocH = parseInt(self.filterIDocHList().length / self.pageSizeIDocH(), 10);
        if ((self.filterIDocHList().length % self.pageSizeIDocH()) == 0)
            self.currentPageIndexIDocH(tempCountIDocH - 1);
        else
            self.currentPageIndexIDocH(tempCountIDocH);
    };



    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypeThvlName = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeTasvib = ko.observable("");
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

    self.sortTableIDocH = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.IDocHList.sort(function (left, right) {
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
        self.iconTypeInvName('');
        self.iconTypeThvlName('');
        self.iconTypeModeName('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeTaeed('');
        self.iconTypeTasvib('');
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

        if (orderProp == 'SortDocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'InvName') self.iconTypeInvName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlName') self.iconTypeThvlName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tasvib') self.iconTypeTasvib((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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

    $('#AddNewSanadAnbar').click(function () {
        sessionStorage.flagupdateHeader = 0;
        sessionStorage.Eghdam = sessionStorage.userName;
        sessionStorage.Status = 'موقت';
        invCode = $('#invSelect').val();
        //if (invCode == '' || invCode == null) 
        //{
        //    return showNotification('انبار را انتخاب کنيد');
        //} 
        //else
        //{
        sessionStorage.InvCode = invCode;
        window.location.href = sessionStorage.urlAddIDocH;

        //}
    });

    $('#refreshIdocH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: 'لیست اسناد به روز رسانی شود ؟',
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getIDocH($('#pageCountSelector').val(), invSelected);

                //$('#pageCountSelector').val(0);
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست اسناد به روز رسانی شد' });
            }
        })
    });

    self.DeleteIDocH = function (factorBand) {

        Swal.fire({
            title: 'تایید حذف ؟',
            text: "آیا سند انتخابی حذف شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group + '/' + factorBand.SerialNumber + '/' + sessionStorage.InOut, 'DELETE').done(function (response) {
                    currentPage = self.currentPageIndexIDocH();
                    getIDocH(0, invSelected);
                    self.currentPageIndexIDocH(currentPage);
                    showNotification( 'سند حذف شد ', 1);
                   // Swal.fire({ type: 'success', title: 'حذف موفق', text: ' سند حذف شد ' });
                });
            }
        })
    };



    self.UpdateHeader = function (item) {
        sessionStorage.flagupdateHeader = 1;
        sessionStorage.SerialNumber = item.SerialNumber;
        sessionStorage.DocNo = item.DocNo;
        sessionStorage.DocDate = item.DocDate;
        sessionStorage.ThvlCode = item.ThvlCode;

        sessionStorage.ThvlName = item.ThvlName == null ? '' : item.ThvlName;
        sessionStorage.InvCode = item.InvCode;
        sessionStorage.Spec = item.Spec;
        sessionStorage.PriceCode = item.KalaPriceCode;
        sessionStorage.ModeCodeValue = item.ModeCode;
        sessionStorage.Status = item.Status;
        sessionStorage.PaymentType = item.PaymentType;
        sessionStorage.Footer = item.Footer;
        sessionStorage.Eghdam = item.Eghdam;
        sessionStorage.TaeedI = item.Taeed;
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

        sessionStorage.lastPageSelect = self.currentPageIndexIDocH();

        window.location.href = sessionStorage.urlAddIDocH;


    }

    $("#allSearchIDocH").click(function () {
        if ($("#allSearchIDocH").is(':checked')) {
            $('#allSearchIDocHText').text('جستجو بر اساس همه موارد');
            allSearchIDocH = true;
        }
        else {
            $('#allSearchIDocHText').text('جستجو بر اساس شماره سند');
            allSearchIDocH = false;
        }
    });

    if (sessionStorage.InOut == 1) {
        sessionStorage.sels = true;
        $('#TitleThvlName').text('نام تحویل دهنده');
        $('#TitleListAnbar').text('اسناد وارده به انبار');
    } else {
        sessionStorage.sels = false;
        $('#TitleThvlName').text('نام تحویل گیرنده');
        $('#TitleListAnbar').text('اسناد صادره از انبار');
    }


    $('#SaveIDocH1').click(function () {
        window.location.href = sessionStorage.urlIDocH;
    });

    $('#modal-Factor').on('shown.bs.modal', function () {
        if (sessionStorage.sels == "true")
            $('#TitleThvlName1').text('نام خریدار');
        else
            $('#TitleThvlName1').text('نام فروشنده');
        $('#searchIDocH1').val('');
        self.filterIDocH1('');
        self.filterIDocH1List();
        $('#searchIDocH1').focus();
    });

    $("#allSearchIDocH1").click(function () {
        if ($("#allSearchIDocH1").is(':checked')) {
            $('#searchIDocH1').attr('placeholder', 'جستجو بر اساس همه موارد');
        }
        else {
            $('#searchIDocH1').attr('placeholder', 'جستجو بر اساس شماره سند');
        }
    });


    self.PageCountView = function () {
        invSelect = $('#invSelect').val() == '' ? '' : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }


    self.ShowMove = function (Eghdam) {
        if (sessionStorage.moveSanadAnbar == 'true')
            return true;
        else
            return false;
    }

    self.ShowAction = function (Eghdam) {


        if (sessionStorage.InOut == 1) {
            if (sessionStorage.DEL_IIDOC == 'true') {
                if (sessionStorage.AccessViewSanadAnbarVarede == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }
        else {
            if (sessionStorage.DEL_IODOC == 'true') {
                if (sessionStorage.AccessViewSanadAnbarSadere == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }
    }

    $("#searchIDocH").on("keydown", function search(e) {
        if (allSearchIDocH == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
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



    function AddAnbar(invName) {
        inc = invName.includes("انبار");
        if (inc == false) {
            invName = 'انبار ' + invName
        }
        return invName
    }

    self.MoveSanad = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;
        $('#modeCodePor').val(item.ModeCode);

        $('#titleMove').text(' انتقال ' + item.ModeName + ' ' + item.DocNo + ' ' + AddAnbar(item.InvName) + ' به ');
        $('#titlePor').text(' کپی ' + item.ModeName + ' ' + item.DocNo + ' ' + AddAnbar(item.InvName) + ' در ');

        if (invSelected == '') {
            temp = localStorage.getItem('InvSelectSanadAnbarMove')
            temp == null ? self.InvCodeMove('') : self.InvCodeMove(temp)
        }
        else
            self.InvCodeMove(invSelected)

        $('#modal-Move').modal();
    }



    getIModeList();
    //Get  IMode List
    function getIModeList() {
        ajaxFunction(IModeUri + ace + '/' + sal + '/' + group + '/0', 'GET').done(function (data) {
            self.IModeList(data);


            var textExc = '';

            textExc = '<select id="modeCodePor">';

            for (var i = 0; i < data.length; i++) {

                if (
                    (CheckAccess('NEW_IIDOC') && data[i].InOut == 1) ||
                    (CheckAccess('NEW_IODOC') && data[i].InOut == 2)
                ) {

                    textExc += '<option value="' + data[i].Code + '"';
                    if (data[i].InOut == 1) {
                        textExc += 'style="background-color: #f5e6ac" ';
                    }
                    textExc += '>' + data[i].Name + '</option>';

                }

            }

            textExc += '</select>';

            $("#modeListPor").empty();
            $('#modeListPor').append(textExc);



            dataMove = ko.utils.arrayFilter(self.IModeList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.InOut.toString().toLowerCase(), sessionStorage.InOut)
                return result;
            })

            select = document.getElementById('modeCodeMove');
            for (var i = 0; i < dataMove.length; i++) {
                opt = document.createElement('option');
                opt.value = dataMove[i].Code;
                opt.innerHTML = dataMove[i].Name;
                select.appendChild(opt);
            }

        });
    }


    $('#Move').click(function () {
        modeCodeMove = $('#modeCodePor').val();
        invSelectMove = $('#invSelectMove').val();
        localStorage.setItem('InvSelectSanadAnbarMove', invSelectMove);

        var MoveObject = {
            SerialNumber: serial,
            DocDate: docDate,
            UserCode: sessionStorage.userName,
            TahieShode: sessionStorage.ace,
            ModeCode: modeCodeMove,
            InvCode: invSelectMove,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: 1,
            StartNo: 0,
            EndNo: 0,
            BranchCode: 0,
            MoveMode: 0,
        };
        $('#modal-Move').modal('hide');
        showNotification('در حال انتقال لطفا منتظر بمانید', 1);

        ajaxFunction(IMoveSanadUri + ace + '/' + sal + '/' + group, 'POST', MoveObject).done(function (response) {
            item = response;
            item = item[0];

            sessionStorage.searchIDocH = item.SerialNumber;

            sessionStorage.flagupdateHeader = 1;
            sessionStorage.SerialNumber = item.SerialNumber;
            sessionStorage.DocNo = item.DocNo;
            sessionStorage.DocDate = item.DocDate;
            sessionStorage.ThvlCode = item.ThvlCode;
            sessionStorage.ThvlName = item.ThvlName == null ? '' : item.ThvlName;
            sessionStorage.InvCode = item.InvCode;
            sessionStorage.Spec = item.Spec;
            sessionStorage.PriceCode = item.KalaPriceCode;
            sessionStorage.ModeCodeValue = item.ModeCode;
            sessionStorage.Status = item.Status;
            sessionStorage.PaymentType = item.PaymentType;
            sessionStorage.Footer = item.Footer;
            sessionStorage.Eghdam = item.Eghdam;
            sessionStorage.InOut = item.InOut;


            // sessionStorage.ModeCodeValue = modeCodeMove;

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

            sessionStorage.Status = item.Status;
            sessionStorage.PaymentType = item.PaymentType;
            sessionStorage.Footer = item.Footer;
            sessionStorage.BeforeMoveSanadAnbar = true;

            window.location.href = sessionStorage.urlAddIDocH;
        });

    });




    self.ChangeStatusSanad = function (item) {
        serial = item.SerialNumber;
        sessionStorage.Status = item.Status;
        self.StatusSanad(item.Status);
        $('#titleChangeStatus').text(' تغییر وضعیت ' + item.ModeName + ' ' + item.DocNo + ' ' + AddAnbar(item.InvName) + ' به ');

        $('#modal-ChangeStatusSanad').modal();
    }


    $('#ChangeStatus').click(function () {
        var StatusChangeObject = {
            DMode: 0,
            UserCode: sessionStorage.userName,
            SerialNumber: serial,
            Status: self.StatusSanad(),
            InOut : sessionStorage.InOut
        };
        $('#modal-ChangeStatusSanad').modal('hide');
        showNotification('در حال تغییر وضعیت لطفا منتظر بمانید', 1);

        ajaxFunction(IChangeStatusUri + ace + '/' + sal + '/' + group, 'POST', StatusChangeObject).done(function (response) {
            item = response;
            getIDocH(0, invSelected);
        });

    });





    function CreateTableReport(data) {
        $("#TableList").empty();
        $('#TableList').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableIDocH">' +
            '<th>ردیف</th>' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('InvName', data) +
            CreateTableTh('ThvlName', data) +
            CreateTableTh('ModeName', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('Tanzim', data) +
            CreateTableTh('Taeed', data) +
            CreateTableTh('Tasvib', data) +
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
            ' <tbody data-bind="foreach: currentPageIDocH" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() }, style: { color : Tanzim.substring(0, 1) == \'*\' &&  Tanzim.substring(Tanzim.length - 1 , Tanzim.length) == \'*\' ? \'#840fbc\' : Status == \'باطل\' ? \'red\' : null}" >' +
            '<td data-bind="text:  $index() + 1"></td>' +
           // '<td data-bind="text: $data.DocNo"></td>' +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('InvName', 0, 0, data) +
            CreateTableTd('ThvlName', 0, 0, data) +
            CreateTableTd('ModeName', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('Eghdam', 0, 0, data) +
            CreateTableTd('Tanzim', 0, 0, data) +
            CreateTableTd('Taeed', 0, 0, data) +
            CreateTableTd('Tasvib', 0, 0, data) +
            CreateTableTd('SerialNumber', 0, 0, data) +
            CreateTableTd('F01', 0, 0, data) +
            CreateTableTd('F02', 0, 0, data) +
            CreateTableTd('F03', 0, 0, data) +
            CreateTableTd('F04', 0, 0, data) +
            CreateTableTd('F05', 0, 0, data) +
            CreateTableTd('F06', 0, 0, data) +
            CreateTableTd('F07', 0, 0, data) +
            CreateTableTd('F08', 0, 0, data) +
            CreateTableTd('F09', 0, 0, data) +
            CreateTableTd('F10', 0, 0, data) +
            CreateTableTd('F11', 0, 0, data) +
            CreateTableTd('F12', 0, 0, data) +
            CreateTableTd('F13', 0, 0, data) +
            CreateTableTd('F14', 0, 0, data) +
            CreateTableTd('F15', 0, 0, data) +
            CreateTableTd('F16', 0, 0, data) +
            CreateTableTd('F17', 0, 0, data) +
            CreateTableTd('F18', 0, 0, data) +
            CreateTableTd('F19', 0, 0, data) +
            CreateTableTd('F20', 0, 0, data) +
            '<td>' +

            '<a class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            '</a>' +
            '<ul class="dropdown-menu">' +
            '    <li>' +
            '        <a id="MoveSanad" data-bind="click: $root.MoveSanad  , visible: $root.ShowMove(Eghdam)" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/sanad/synchronize-arrows-square-warning.png" width="16" height="16" style="margin-left:10px">' +
            '            کپی' +
            '        </a>' +
            '    </li>' +

            '    <li>' +
            '        <a id="ChangeStatusSanad" data-bind="click: $root.ChangeStatusSanad" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/sanad/synchronize-arrows-square-warning.png" width="16" height="16" style="margin-left:10px">' +
            '            تغییر وضعیت' +
            '        </a>' +
            '    </li>' +

            '    <li>' +
            '        <a id="PrintSanad" data-bind="click: $root.PrintSanad" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/sanad/streamline-icon-print-text@48x48.png" width="16" height="16" style="margin-left:10px">' +
            '            چاپ ' +
            '        </a>' +
            '    </li>' +

            '    <li> <a href="javascript:void(0);" style="font-size: 11px;text-align: right;">' +
            '        ' +
            '    </a> </li> ' +
            '</ul>' +

            '   <a id="UpdateFactor" data-bind="click: $root.UpdateHeader">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteIDocH" data-bind="click: $root.DeleteIDocH, visible: $root.ShowAction(Eghdam)">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('InvName', data) +
            CreateTableTdSearch('ThvlName', data) +
            CreateTableTdSearch('ModeName', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('Tanzim', data) +
            CreateTableTdSearch('Taeed', data) +
            CreateTableTdSearch('Tasvib', data) +
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

        sortField = field == 'DocNo' ? 'SortDocNo' : field

        if (TextField == 0)
            text += 'Hidden ';
        text += 'data-column="' + sortField + '">' +
            '<span data-column="' + sortField + '" >' + TextField + '</span>' +
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

    function CreateTableTdSearch(field, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\'" type="text" class="form-control" style="height: 2.4rem;" /> </td>';
        return text;
    }

    self.currentPageIndexIDocH(parseInt(sessionStorage.lastPageSelect == null ? 0 : sessionStorage.lastPageSelect));


    /*createViewer();
    $('#Print').click(function () {
        variable = '"ReportDate":"' + DateNow + '",';
        setReport(self.filterIDocHList(), 'Free', variable);
    });*/


    var IDocPUri = server + '/api/IDocData/IDocP/'; // آدرس ویوی چاپ سند 
    self.IDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    //Get IDocP List
    function getIDocP(serialNumber) {
        ajaxFunction(IDocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocPList(data);
        });
    }

    createViewer();

    self.PrintSanad = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;

        getIDocP(serial);
        if (self.IDocPList().length == 0)
            return showNotification('برای چاپ سند حداقل یک بند الزامیست', 0);

        textFinalPrice = item.FinalPrice.toPersianLetter() + titlePrice; 

        variable = '"ReportDate":"' + DateNow + '",' +
                   '"TextFinalPrice":"' + textFinalPrice + '",';


        if (sessionStorage.InOut == 1) {
            if (sessionStorage.Access_SHOWPRICE_IIDOC == 'true')
                setReport(self.IDocPList(), 'Sanad_IDoc', variable);
            else
                setReport(self.IDocPList(), 'Sanad_IDoc_NoPrice', variable);
        }
        else {
            setReport(self.IDocPList(), 'Sanad_ODoc_NoPrice', variable);
        }
    }

    $('#PrintSanad').click(function () {
        


    });

};

ko.applyBindings(new ViewModel());

