﻿var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");
    sessionStorage.BeforeMoveFactor = false;


    $("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
    $("#groupTest").text('نام گروه' + sessionStorage.group);
    $("#salTest").text('سال مالی' + sessionStorage.sal);

    self.FDocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش  
    self.FDocHList1 = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش
    self.FModeList = ko.observableArray([]); // لیست نوع فاکتور ها
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.TestFDoc_DeleteList = ko.observableArray([]); // لیست تست حذف 

    self.StatusFactor = ko.observable();

    TestUser();

    var FDocHUri = server + '/api/FDocData/FDocH/'; // آدرس کسورات و افزایشات 
    var FDocHCountUri = server + '/api/FDocData/FDocH/'; // تعداد رکورد های فاکتور 
    var FDocHHiUri = server + '/api/AFI_FDocHi/'; // آدرس هدر فاکتور 
    var FModeUri = server + '/api/FDocData/FMode/'; // آدرس نوع فاکتور ها 
    var FMoveFactorUri = server + '/api/FDocData/MoveFactor/'; // آدرس انتقال فاکتور ها 
    var FTestMoveFactorUri = server + '/api/FDocData/TestMoveFactor/'; // آدرس تست انتقال فاکتور ها 
    var FChangeStatusUri = server + '/api/FDocData/ChangeStatus/'; // آدرس تغییر وضعیت اسناد 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 
    var FDoc_DeleteUri = server + '/api/FDocData/TestFDoc_Delete/'; // آدرس تست حذف 


    var allSearchFDocH = true;
    var inOut;
    var serial;
    var defultMove;
    var TitleListFactor;
    var docDate;

    var showFinalPrice = false;
    var accessTaeed = false;
    var accessTasvib = false;
    var accessCancel = false;


    sessionStorage.flagCopy = 'N';

    $("#Barcode").removeAttr('hidden', '');

    switch (sessionStorage.ModeCode.toString()) {
        case sessionStorage.MODECODE_FDOC_SO:
            {
                TitleListFactor = 'سفارش فروش';
                $('#TitleListFactor').text('سفارشات فروش');
                defultMove = sessionStorage.Move_SORD;
                inOut = 2;
                break;
            }
        case sessionStorage.MODECODE_FDOC_SP:
            {
                TitleListFactor = 'پیش فاکتور فروش';
                $('#TitleListFactor').text('پیش فاکتور های فروش');
                defultMove = sessionStorage.Move_SPFCT;
                inOut = 2;
                break;
            }
        case sessionStorage.MODECODE_FDOC_S:
            {
                TitleListFactor = 'فاکتور فروش';
                $('#TitleListFactor').text('فاکتور های فروش');
                defultMove = sessionStorage.Move_SFCT;
                inOut = 2;
                break;
            }
        case sessionStorage.MODECODE_FDOC_SR:
            {
                TitleListFactor = 'برگشت از فروش';
                $('#TitleListFactor').text('برگشتی های فروش');
                defultMove = '';//sessionStorage.Move_SRFCT;
                $("#menu1").attr('hidden', '');
                $("#TabMove").attr('hidden', '');
                inOut = 2;
                break;
            }

        case sessionStorage.MODECODE_FDOC_SH:
            {
                TitleListFactor = 'حواله فروش';
                $('#TitleListFactor').text('حواله های فروش');
                defultMove = sessionStorage.Move_SHVL;
                inOut = 2;
                //if (sessionStorage. == "-1") $("#Barcode").attr('hidden', '');
                break;
            }

        case sessionStorage.MODECODE_FDOC_SE:
            {
                TitleListFactor = 'برگه خروج';
                $('#TitleListFactor').text('برگه های خروج');
                defultMove = sessionStorage.Move_SEXT;
                inOut = 2;
                //if (sessionStorage. == "-1") $("#Barcode").attr('hidden', '');
                break;
            }

        case sessionStorage.MODECODE_FDOC_PO:
            {
                TitleListFactor = 'سفارش خرید';
                $('#TitleListFactor').text('سفارشات خرید');
                defultMove = sessionStorage.Move_PORD;
                inOut = 1;
                break;
            }

        case sessionStorage.MODECODE_FDOC_PP:
            {
                TitleListFactor = 'پیش فاکتور خرید';
                $('#TitleListFactor').text('پیش فاکتور های خرید');
                defultMove = sessionStorage.Move_PPFCT;
                inOut = 1;
                break;
            }

        case sessionStorage.MODECODE_FDOC_P:
            {
                TitleListFactor = 'فاکتور خرید';
                $('#TitleListFactor').text('فاکتور های خرید');
                defultMove = sessionStorage.Move_PFCT;
                inOut = 1;
                break;
            }

        case sessionStorage.MODECODE_FDOC_PR:
            {
                TitleListFactor = 'برگشت از خرید';
                $('#TitleListFactor').text('برگشتی های خرید');
                $("#menu1").attr('hidden', '');
                $("#TabMove").attr('hidden', '');
                defultMove = '';//sessionStorage.Move_PRFCT;
                inOut = 1;
            }
    }


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = inOut == 1 ? 'FDocH_P' : 'FDocH_S';
    var columns = [
        'DocNo',
        'DocDate',
        'CustName',
        'FinalPrice',
        'Spec',
        'Status',
        'Eghdam',
        'Tanzim',
        'Taeed',
        'Tasvib',
        'SerialNumber',
        'MkzCode',
        'MkzName',
        'OprCode',
        'OprName',
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



    $.fn.CheckAccess = function () {
        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SO) {
            accessTaeed = sessionStorage.Access_TAEED_SFORD == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_SFORD == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_SFORD == 'true'
            accessCancel = sessionStorage.Access_CANCEL_SFORD == 'true'
        }
        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SP) {
            accessTaeed = sessionStorage.Access_TAEED_SPDOC == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_SPDOC == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_SPDOC == 'true'
            accessCancel = sessionStorage.Access_CANCEL_SPDOC == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_S) {
            accessTaeed = sessionStorage.Access_TAEED_SFDOC == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_SFDOC == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_SFDOC == 'true'
            accessCancel = sessionStorage.Access_CANCEL_SFDOC == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR) {
            accessTaeed = sessionStorage.Access_TAEED_SRDOC == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_SRDOC == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_SRDOC == 'true'
            accessCancel = sessionStorage.Access_CANCEL_SRDOC == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SH) {
            accessTaeed = sessionStorage.Access_TAEED_SHVL == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_SHVL == 'true'
            accessCancel = sessionStorage.Access_CANCEL_SHVL == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SE) {
            accessTaeed = sessionStorage.Access_TAEED_SEXT == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_SEXT == 'true'
            accessCancel = sessionStorage.Access_CANCEL_SEXT == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PO) {
            accessTaeed = sessionStorage.Access_TAEED_PFORD == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_PFORD == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_PFORD == 'true'
            accessCancel = sessionStorage.Access_CANCEL_PFORD == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PP) {
            accessTaeed = sessionStorage.Access_TAEED_PPDOC == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_PPDOC == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_PPDOC == 'true'
            accessCancel = sessionStorage.Access_CANCEL_PPDOC == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_P) {
            accessTaeed = sessionStorage.Access_TAEED_PFDOC == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_PFDOC == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_PFDOC == 'true'
            accessCancel = sessionStorage.Access_CANCEL_PFDOC == 'true'
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR) {
            accessTaeed = sessionStorage.Access_TAEED_PRDOC == 'true'
            accessTasvib = sessionStorage.Access_TASVIB_PRDOC == 'true'
            showFinalPrice = sessionStorage.Access_SHOWPRICE_PRDOC == 'true'
            accessCancel = sessionStorage.Access_CANCEL_PRDOC == 'true'
        }
    }
    $(this).CheckAccess();



    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            self.SettingColumnList(data);
            // ListColumns = data;
            if (FlagSetting) {
                CreateTableReport(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }

            ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/' + 'FDocP' + '/' + username, 'GET').done(function (data) {
                ListColumns = data;
            });

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
        SaveColumn(sessionStorage.ace, sessionStorage.sal, sessionStorage.group, rprtId, "/AFIFactor/index", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
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
    getStatusList();


    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {
        selectStatus = $("#status").val();
        if (accessTaeed == false && selectStatus == 'تایید') {
            $("#status").val(lastStatus);
            return showNotification('دسترسی تایید ندارید', 0);
        }

        if (accessTasvib == false && selectStatus == 'تصویب') {
            $("#status").val(lastStatus);
            return showNotification('دسترسی تصویب ندارید', 0);
        }

        if (accessCancel == false && selectStatus == 'باطل') {
            $("#status").val(lastStatus);
            return showNotification('دسترسی باطل ندارید', 0);
        }

        if (sessionStorage.Status != 'تایید' && selectStatus == 'تصویب') {
            $("#status").val(lastStatus);
            return showNotification('فقط فاکتور های تایید شده امکان تصویب دارند', 0);
        }

    });


    self.ChangeStatusFactor = function (item) {
        serial = item.SerialNumber;
        sessionStorage.Status = item.Status;
        self.StatusFactor(item.Status);
        $('#titleChangeStatus').text(' تغییر وضعیت ' + TitleListFactor + ' ' + item.DocNo + ' به ');
        $('#modal-ChangeStatusFactor').modal();
    }


    $('#ChangeStatus').click(function () {
        var StatusChangeObject = {
            DMode: 0,
            UserCode: sessionStorage.userName,
            SerialNumber: serial,
            Status: self.StatusFactor(),
            ModeCode: sessionStorage.ModeCode,
        };
        $('#modal-ChangeStatusFactor').modal('hide');
        showNotification('در حال تغییر وضعیت لطفا منتظر بمانید', 1);

        ajaxFunction(FChangeStatusUri + ace + '/' + sal + '/' + group, 'POST', StatusChangeObject).done(function (response) {
            item = response;
            getFDocH($('#pageCountSelector').val());
        });

    });











    //Get FDocH 
    function getFDocH(select) {

        var FDocHMinObject = {
            ModeCode: sessionStorage.ModeCode,
            select: select,
            user: sessionStorage.userName,
            AccessSanad: sessionStorage.AccessSanad,
            updatedate: null
        }

        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'POST', FDocHMinObject).done(function (data) {
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.FDocHList(data);
        });
    }

    function getFDocH1(salselect) {
        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR)//53
            tempmode = sessionStorage.MODECODE_FDOC_S; //52
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR)//56
            tempmode = sessionStorage.MODECODE_FDOC_P; //55
        ajaxFunction(FDocHUri + ace + '/' + salselect + '/' + group + '/' + tempmode, 'GET').done(function (data) {
            self.FDocHList1(data);
        });
    }

    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR || sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR) {
        // getFDocH1(sessionStorage.sal);
    }

    getFDocH($('#pageCountSelector').val());

    //------------------------------------------------------
    self.currentPageFDocH = ko.observable();

    pageSizeFDocH = localStorage.getItem('pageSizeFDocH') == null ? 10 : localStorage.getItem('pageSizeFDocH');
    self.pageSizeFDocH = ko.observable(pageSizeFDocH);
    self.currentPageIndexFDocH = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");








    /* self.filterFDocH = ko.observable("");
     self.filterFDocHList = ko.computed(function () {
         self.currentPageIndexFDocH(0);
         var filter = self.filterFDocH().toUpperCase();
         if (!filter) {
             var a = self.FDocHList();
             return self.FDocHList();
         } else {
             return ko.utils.arrayFilter(self.FDocHList(), function (item) {
                 if ($("#allSearchFDocH").is(':checked')) {
                     result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter) ||
                         ko.utils.stringStartsWith(item.DocDate.toLowerCase(), filter) ||
                         ko.utils.stringStartsWith(item.CustName, filter) ||
                         //ko.utils.startIndex(item.FinalPrice.toString().toLowerCase(), filter) ||
                         ko.utils.stringStartsWith(item.Status, filter) ||
                         ko.utils.stringStartsWith(item.Eghdam, filter) ||
                         ko.utils.stringStartsWith(item.Tanzim, filter) ||
                         ko.utils.stringStartsWith(item.Taeed, filter) ||
                         ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filter)
                     return result;
                 }
                 else {
                     result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                     return result;
                 }
             });
         }
     });*/



    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterCustName = ko.observable("");
    self.filterFinalPrice = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterTanzim = ko.observable("");
    self.filterTaeed = ko.observable("");
    self.filterTasvib = ko.observable("");
    self.filterSerialNumber = ko.observable("");
    self.filterMkzCode = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprCode = ko.observable("");
    self.filterOprName = ko.observable("");
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


    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterDocNo(listFilter[0]);
        self.filterDocDate(listFilter[1]);
        self.filterCustName(listFilter[2]);
        self.filterFinalPrice(listFilter[3]);
        self.filterSpec(listFilter[4]);
        self.filterStatus(listFilter[5]);
        self.filterEghdam(listFilter[6]);
        self.filterTanzim(listFilter[7]);
        self.filterTaeed(listFilter[8]);
        self.filterTasvib(listFilter[9]);
        self.filterSerialNumber(listFilter[10]);
        self.filterMkzCode(listFilter[11]);
        self.filterMkzName(listFilter[12]);
        self.filterOprCode(listFilter[13]);
        self.filterOprName(listFilter[14]);
        self.filterF01(listFilter[15]);
        self.filterF02(listFilter[16]);
        self.filterF03(listFilter[17]);
        self.filterF04(listFilter[18]);
        self.filterF05(listFilter[19]);
        self.filterF06(listFilter[20]);
        self.filterF07(listFilter[21]);
        self.filterF08(listFilter[22]);
        self.filterF09(listFilter[23]);
        self.filterF10(listFilter[24]);
        self.filterF11(listFilter[25]);
        self.filterF12(listFilter[26]);
        self.filterF13(listFilter[27]);
        self.filterF14(listFilter[28]);
        self.filterF15(listFilter[29]);
        self.filterF16(listFilter[30]);
        self.filterF17(listFilter[31]);
        self.filterF18(listFilter[32]);
        self.filterF19(listFilter[33]);
        self.filterF20(listFilter[34]);
    }
    self.filterFDocHList = ko.computed(function () {
        self.currentPageIndexFDocH(0);
        var filterDocNo = self.filterDocNo();
        var filterDocDate = self.filterDocDate();
        var filterCustName = self.filterCustName();
        var filterFinalPrice = self.filterFinalPrice();
        var filterSpec = self.filterSpec();
        var filterStatus = self.filterStatus();
        var filterEghdam = self.filterEghdam().toUpperCase();
        var filterTanzim = self.filterTanzim().toUpperCase();
        var filterTaeed = self.filterTaeed().toUpperCase();
        var filterTasvib = self.filterTasvib().toUpperCase();
        var filterSerialNumber = self.filterSerialNumber();
        var filterMkzCode = self.filterMkzCode();
        var filterMkzName = self.filterMkzName();
        var filterOprCode = self.filterOprCode();
        var filterOprName = self.filterOprName();
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

        filterFinalPrice = filterFinalPrice.replace("/", ".");


        if (!filterDocNo && !filterDocDate && !filterCustName && !filterFinalPrice && !filterStatus && !filterEghdam && !filterTanzim && !filterTaeed && !filterTasvib && !filterSerialNumber &&
            !filterMkzCode && !filterMkzName && !filterOprCode && !filterOprName &&
            !filterSpec && !filterF01 && !filterF02 && !filterF03 && !filterF04 && !filterF05 && !filterF06 && !filterF07 && !filterF08 && !filterF09 && !filterF10 &&
            !filterF11 && !filterF12 && !filterF13 && !filterF14 && !filterF15 && !filterF16 && !filterF17 && !filterF18 && !filterF19 && !filterF20) {
            // $('#CountRecord').text(CountTable('FDocH', sessionStorage.ModeCode, null));
            $("#CountRecord").text(self.FDocHList().length);
            sessionStorage.setItem('listFilter', null);
            return self.FDocHList();
        } else {

            listFilter = [
                filterDocNo,
                filterDocDate,
                filterCustName,
                filterFinalPrice,
                filterSpec,
                filterStatus,
                filterEghdam,
                filterTanzim,
                filterTaeed,
                filterTasvib,
                filterSerialNumber,
                filterMkzCode,
                filterMkzName,
                filterOprCode,
                filterOprName,
                filterF01,
                filterF02,
                filterF03,
                filterF04,
                filterF05,
                filterF06,
                filterF07,
                filterF08,
                filterF09,
                filterF10,
                filterF11,
                filterF12,
                filterF13,
                filterF14,
                filterF15,
                filterF16,
                filterF17,
                filterF18,
                filterF19,
                filterF20
            ];
            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.FDocHList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                    ko.utils.stringStartsWith(item.DocDate.toString().toLowerCase(), filterDocDate) &&
                    (item.CustName == null ? '' : item.CustName.toString().search(filterCustName) >= 0) &&
                    ko.utils.stringStartsWith(item.FinalPrice.toString().toLowerCase(), filterFinalPrice) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                    (item.Eghdam == null ? '' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.Tanzim == null ? '' : item.Tanzim.toString().search(filterTanzim) >= 0) &&
                    (item.Taeed == null ? '' : item.Taeed.toString().search(filterTaeed) >= 0) &&
                    (item.Tasvib == null ? '' : item.Tasvib.toString().search(filterTasvib) >= 0) &&
                    ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filterSerialNumber) &&
                    (item.MkzCode == null ? '' : item.MkzCode.toString().search(filterMkzCode) >= 0) &&
                    (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                    (item.OprCode == null ? '' : item.OprCode.toString().search(filterOprCode) >= 0) &&
                    (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
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
    self.search(sessionStorage.searchFDocH);
    self.firstMatch = ko.dependentObservable(function () {
        var indexFDocH = 0;
        sessionStorage.searchFDocH = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexFDocH(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.FDocHList(), function (item) {
                indexFDocH += 1;
                return item.SortDocNo == search;
                //return ko.utils.stringStartsWith(item.SortDocNo.toString(), search);
            });
            if (indexFDocH < self.pageSizeFDocH())
                self.currentPageIndexFDocH(0);
            else {
                var a = Math.round((indexFDocH / self.pageSizeFDocH()), 0);
                if (a < (indexFDocH / self.pageSizeFDocH())) a += 1;
                self.currentPageIndexFDocH(a - 1);
            }
            return value;
        }
    });

    self.currentPageFDocH = ko.computed(function () {
        var pageSizeFDocH = parseInt(self.pageSizeFDocH(), 10),
            startIndex = pageSizeFDocH * self.currentPageIndexFDocH(),
            endIndex = startIndex + pageSizeFDocH;
        localStorage.setItem('pageSizeFDocH', pageSizeFDocH);
        return self.filterFDocHList().slice(startIndex, endIndex);
    });

    self.nextPageFDocH = function () {
        if (((self.currentPageIndexFDocH() + 1) * self.pageSizeFDocH()) < self.filterFDocHList().length) {
            self.currentPageIndexFDocH(self.currentPageIndexFDocH() + 1);
        }
    };

    self.previousPageFDocH = function () {
        if (self.currentPageIndexFDocH() > 0) {
            self.currentPageIndexFDocH(self.currentPageIndexFDocH() - 1);
        }
    };

    self.firstPageFDocH = function () {
        self.currentPageIndexFDocH(0);
    };

    self.lastPageFDocH = function () {
        tempCountFDocH = parseInt(self.filterFDocHList().length / self.pageSizeFDocH(), 10);
        if ((self.filterFDocHList().length % self.pageSizeFDocH()) == 0)
            self.currentPageIndexFDocH(tempCountFDocH - 1);
        else
            self.currentPageIndexFDocH(tempCountFDocH);
    };


    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeCustName = ko.observable("");
    self.iconTypeFinalPrice = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeTasvib = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");

    self.iconTypeMkzCode = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprCode = ko.observable("");
    self.iconTypeOprName = ko.observable("");

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


    self.sortTableFDocH = function (viewModel, e) {


        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortFdocH_" + sessionStorage.ModeCode);
            self.sortType = localStorage.getItem("sortTypeFdocH_" + sessionStorage.ModeCode);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortFdocH_" + sessionStorage.ModeCode, orderProp);
        localStorage.setItem("sortTypeFdocH_" + sessionStorage.ModeCode, self.sortType);

        self.search("");
        self.currentColumn(orderProp);
        self.FDocHList.sort(function (left, right) {

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

        self.iconTypeDocNo('');
        self.iconTypeDocDate('');
        self.iconTypeCustName('');
        self.iconTypeFinalPrice('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeTaeed('');
        self.iconTypeTasvib('');
        self.iconTypeSerialNumber('');

        self.iconTypeMkzCode('');
        self.iconTypeMkzName('');
        self.iconTypeOprCode('');
        self.iconTypeOprName('');
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
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FinalPrice') self.iconTypeFinalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tasvib') self.iconTypeTasvib((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzCode') self.iconTypeMkzCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprCode') self.iconTypeOprCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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










    self.currentPageFDocH1 = ko.observable();
    pageSizeFDocH1 = localStorage.getItem('pageSizeFDocH1') == null ? 10 : localStorage.getItem('pageSizeFDocH1');
    self.pageSizeFDocH1 = ko.observable(pageSizeFDocH1);
    self.currentPageIndexFDocH1 = ko.observable(0);
    self.sortType1 = "ascending";
    self.currentColumn1 = ko.observable("");
    self.iconType1 = ko.observable("");
    self.filterFDocH1 = ko.observable("");
    self.filterFDocHList1 = ko.computed(function () {
        self.currentPageIndexFDocH1(0);
        var filter = self.filterFDocH1().toLowerCase();
        if (!filter) {
            return self.FDocHList1();
        } else {
            return ko.utils.arrayFilter(self.FDocHList1(), function (item) {
                if ($("#allSearchFDocH1").is(':checked')) {
                    result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter) ||
                        ko.utils.stringStartsWith(item.DocDate.toLowerCase(), filter) ||
                        ko.utils.stringStartsWith(item.CustName, filter) ||
                        ko.utils.stringStartsWith(item.Spec, filter) ||
                        ko.utils.stringStartsWith(item.Tanzim, filter)
                    return result;
                }
                else {
                    result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                    return result;
                }
            });
        }
    });

    self.currentPageFDocH1 = ko.computed(function () {
        var pageSizeFDocH1 = parseInt(self.pageSizeFDocH1(), 10),
            startIndex = pageSizeFDocH1 * self.currentPageIndexFDocH1(),
            endIndex = startIndex + pageSizeFDocH1;
        localStorage.setItem('pageSizeFDocH1', pageSizeFDocH1);
        return self.filterFDocHList1().slice(startIndex, endIndex);
    });

    self.nextPageFDocH1 = function () {
        if (((self.currentPageIndexFDocH1() + 1) * self.pageSizeFDocH1()) < self.filterFDocHList1().length) {
            self.currentPageIndexFDocH1(self.currentPageIndexFDocH1() + 1);
        }
        //else {
        //    self.currentPageIndexFDocH1(0);
        //}
    };

    self.previousPageFDocH1 = function () {
        if (self.currentPageIndexFDocH1() > 0) {
            self.currentPageIndexFDocH1(self.currentPageIndexFDocH1() - 1);
        }
        //else {
        //    self.currentPageIndexFDocH1((Math.ceil(self.filterFDocHList1().length / self.pageSizeFDocH1())) - 1);
        //}
    };

    self.firstPageFDocH1 = function () {
        self.currentPageIndexFDocH1(0);
    };

    self.lastPageFDocH1 = function () {
        tempCountFDocH1 = parseInt(self.filterFDocHList1().length / self.pageSizeFDocH1(), 10);
        if ((self.filterFDocHList1().length % self.pageSizeFDocH1()) == 0)
            self.currentPageIndexFDocH1(tempCountFDocH1 - 1);
        else
            self.currentPageIndexFDocH1(tempCountFDocH1);
    };

    self.sortTableFDocH1 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn1(orderProp);
        self.FDocHList1.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);
            if (self.sortType1 == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType1 = (self.sortType1 == "ascending") ? "descending" : "ascending";
        self.iconType1((self.sortType1 == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    $('#refreshFDocH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست " + $('#TitleListFactor').text() + " به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getFDocH($('#pageCountSelector').val());
                self.sortTableFDocH();
                //$('#pageCountSelector').val(0);
                //Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست فاکتور ها به روز رسانی شد' });
            }
        })
    })

    $('#AddNewFactor').click(function () {
        sessionStorage.flagupdateHeader = 0;
        sessionStorage.Eghdam = sessionStorage.userName;
        sessionStorage.Status = 'موقت';
        sessionStorage.F01 = "";
        sessionStorage.F02 = "";
        sessionStorage.F03 = "";
        sessionStorage.F04 = "";
        sessionStorage.F05 = "";
        sessionStorage.F06 = "";
        sessionStorage.F07 = "";
        sessionStorage.F08 = "";
        sessionStorage.F09 = "";
        sessionStorage.F10 = "";
        sessionStorage.F11 = "";
        sessionStorage.F12 = "";
        sessionStorage.F13 = "";
        sessionStorage.F14 = "";
        sessionStorage.F15 = "";
        sessionStorage.F16 = "";
        sessionStorage.F17 = "";
        sessionStorage.F18 = "";
        sessionStorage.F19 = "";
        sessionStorage.F20 = "";
        //if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR || sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR) {
        //    $('#modal-SelectFactor').modal('show');
        //    if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR)
        //        $('#CaptionSelectFactor').text('برگشت از فروش متناظر با فاکتور فروش شماره');
        //    else
        //        $('#CaptionSelectFactor').text('برگشت از خرید متناظر با فاکتور خرید شماره');
        //}
        //else {
        window.location.href = sessionStorage.urlAddFDocH;
        //}
    });


    self.DeleteFactor = function (factorBand) {
        Swal.fire({
            title: 'تایید حذف',
            text: "آیا " + TitleListFactor + " انتخابی حذف شود ؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                serial = factorBand.SerialNumber;
                var TestFDoc_DeleteObject = {
                    SerialNumber: serial
                };

                ajaxFunction(FDoc_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestFDoc_DeleteObject).done(function (data) {
                    var obj = JSON.parse(data);
                    self.TestFDoc_DeleteList(obj);
                    if (data.length > 2) {
                        $('#modal-TestDelete').modal('show');
                        SetDataTestDocB();
                    }
                    else {
                        DeleteFactor();
                    }
                });

            }
        })
    };



    function SetDataTestDocB() {
        $("#BodyTestDoc_Delete").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestFDoc_DeleteList();
        for (var i = 0; i < list.length; i++) {
            textBody +=
                '<div class="body" style="padding:7px;">' +
                '    <div class="form-inline">';
            if (list[i].Test == 1) {
                countWarning += 1;
                textBody += ' <img src="/Content/img/Warning.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">هشدار :</p>'
            }
            else {
                countError += 1;
                textBody += ' <img src="/Content/img/Error.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">خطا :</p>'
            }

            if (list[i].TestName == "AccReg")
                textBody += '<p>این ' + TitleListFactor + ' ثبت حسابداری شده است و قابل حذف نیست</p>';

            else if (list[i].TestName == "InvReg")
                textBody += '<p>این ' + TitleListFactor + ' ثبت انبارداری شده است و قابل حذف نیست</p>';

            else if (list[i].TestCap != "")
                textBody += '<p>' + list[i].TestCap + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTestDoc_Delete').append(textBody);

        $('#CountWarning').text(countWarning);
        $('#CountError').text(countError);

        if (countError > 0) {
            $('#Delete-Modal').attr('hidden', '');
            $('#ShowCountError').removeAttr('hidden', '');
        }
        else {
            $('#Delete-Modal').removeAttr('hidden', '')
            $('#ShowCountError').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning').attr('hidden', '');
        }


    }



    function DeleteFactor() {
        ajaxFunction(FDocHHiUri + ace + '/' + sal + '/' + group + '/' + serial + '/' + sessionStorage.ModeCode, 'DELETE').done(function (response) {
            currentPage = self.currentPageIndexFDocH();
            getFDocH($('#pageCountSelector').val());
            self.currentPageIndexFDocH(currentPage);
            showNotification(TitleListFactor + ' حذف شد ', 1);
        });
    }


    $('#Delete-Modal').click(function () {
        DeleteFactor();
        $('#modal-TestDelete').modal('hide');
    });



    self.selectFactor1 = function (item) {
        $('#docnumber').val(item.DocNo);
        $("#docnumber").focus();
    };


    $('#sal').change(function () {
        // getFDocH1($('#sal').val());
    });


    $("#allSearchFDocH").click(function () {
        if ($("#allSearchFDocH").is(':checked')) {
            $('#allSearchFDocHText').text('جستجو بر اساس همه موارد');
            allSearchFDocH = true;
        }
        else {
            $('#allSearchFDocHText').text('جستجو بر اساس شماره سند');
            allSearchFDocH = false;
        }
    });

    if (sessionStorage.InOut == 2) {
        sessionStorage.sels = true;
        $('#TitleCustName').text('نام خریدار');
    } else {
        sessionStorage.sels = false;
        $('#TitleCustName').text('نام فروشنده');
    }




    $('#SaveFDocH1').click(function () {
        window.location.href = sessionStorage.urlFDocH;
    });

    $('#modal-Factor').on('shown.bs.modal', function () {
        if (sessionStorage.sels == "true")
            $('#TitleCustName1').text('نام خریدار');
        else
            $('#TitleCustName1').text('نام فروشنده');
        $('#searchFDocH1').val('');
        self.filterFDocH1('');
        self.filterFDocH1List();
        $('#searchFDocH1').focus();
    });

    $("#allSearchFDocH1").click(function () {
        if ($("#allSearchFDocH1").is(':checked')) {
            $('#searchFDocH1').attr('placeholder', 'جستجو بر اساس همه موارد');
        }
        else {
            $('#searchFDocH1').attr('placeholder', 'جستجو بر اساس شماره سند');
        }
    });

    self.PageCountView = function () {
        select = $('#pageCountSelector').val();
        getFDocH(select);
    }

    self.ShowMove = function (Eghdam) {
        if (sessionStorage.moveFactor == 'true' || sessionStorage.newFactor == 'true')
            return true;
        else
            return false;
    }

    self.ShowAction = function (Eghdam) {

        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SO) {
            if (sessionStorage.DEL_SFORD == 'true') {
                if (sessionStorage.AccessViewSefareshForosh == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }

        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SP) {
            if (sessionStorage.DEL_SPDOC == 'true') {
                if (sessionStorage.AccessViewPishFactorForosh == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }
        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_S) {
            if (sessionStorage.DEL_SDOC == 'true') {
                if (sessionStorage.AccessViewFactorForosh == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }

            }
            else
                return false;
        }

        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SR) {
            if (sessionStorage.DEL_SRDOC == 'true') {
                if (sessionStorage.AccessViewBackFactorForosh == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }

            }
            else
                return false;
        }

        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SH) {
            if (sessionStorage.DEL_SHVL == 'true') {
                if (sessionStorage.AccessViewHavaleForosh == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }

        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_SE) {
            if (sessionStorage.DEL_SEXT == 'true') {
                if (sessionStorage.AccessViewBargeKhoroj == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }

        if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PO) {
            if (sessionStorage.DEL_PFORD == 'true') {
                if (sessionStorage.AccessViewSefareshKharid == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }

        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PP) {
            if (sessionStorage.DEL_PPDOC == 'true') {
                if (sessionStorage.AccessViewPishFactorKharid == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }

            }
            else
                return false;
        }

        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_P) {
            if (sessionStorage.DEL_PDOC == 'true') {
                if (sessionStorage.AccessViewFactorKharid == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }

            }
            else
                return false;
        }

        else if (sessionStorage.ModeCode == sessionStorage.MODECODE_FDOC_PR) {
            if (sessionStorage.DEL_PRDOC == 'true') {
                if (sessionStorage.AccessViewBackFactorKharid == 'false') {
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

    $("#searchFDocH").on("keydown", function search(e) {
        var key = e.charCode || e.keyCode || 0;
        if (allSearchFDocH == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
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
        else {
            if (key == 68) {
                e.preventDefault();
                this.value = this.value + String.fromCharCode(1610);
            }
        }
    });


    self.UpdateHeader = function (item) {
        sessionStorage.flagupdateHeader = 1;

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

        sessionStorage.OprCode = item.OprCode;
        sessionStorage.OprName = item.OprName;

        sessionStorage.MkzCode = item.MkzCode;
        sessionStorage.MkzName = item.MkzName;

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

    self.MoveFactor = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;
        $('#modeCodeMove').val(defultMove);
        $('#modeCodePor').val(sessionStorage.ModeCode);

        $('#titleMove').text(' انتقال ' + TitleListFactor + ' ' + item.DocNo + ' به ');
        $('#titlePor').text(' کپی ' + TitleListFactor + ' ' + item.DocNo + ' در ');
        $('#modal-Move').modal();
    }

    getFModeList();
    //Get  FMode List
    function getFModeList() {
        ajaxFunction(FModeUri + ace + '/' + sal + '/' + group + '/0', 'GET').done(function (data) {
            self.FModeList(data);

            var textExc = '';

            textExc = '<select id="modeCodePor">';

            for (var i = 0; i < data.length; i++) {

                if (ace == "Web8") {
                    if (
                        (CheckAccess('NEW_SFORD') && data[i].Code == 'SORD') ||
                        (CheckAccess('NEW_SPDOC') && data[i].Code == 'SPFCT') ||
                        (CheckAccess('NEW_SFDOC') && data[i].Code == 'SFCT') ||
                        (CheckAccess('NEW_SRDOC') && data[i].Code == 'SRFCT') ||
                        (CheckAccess('NEW_SHVL') && data[i].Code == 'SHVL') ||
                        (CheckAccess('NEW_SEXT') && data[i].Code == 'SEXT') ||
                        (CheckAccess('NEW_PFORD') && data[i].Code == 'PORD') ||
                        (CheckAccess('NEW_PPDOC') && data[i].Code == 'PPFCT') ||
                        (CheckAccess('NEW_PFDOC') && data[i].Code == 'PFCT') ||
                        (CheckAccess('NEW_PRDOC') && data[i].Code == 'PRFCT')
                    ) {
                        textExc += '<option value="' + data[i].Code + '"';
                        if (data[i].InOut == 1) {
                            textExc += 'style="background-color: #f5e6ac" ';
                        }
                        textExc += '>' + data[i].Name + '</option>';
                    }
                }
                else {

                    if (
                        (CheckAccess('NEW_SPDOC') && data[i].Code == '51') ||
                        (CheckAccess('NEW_SFDOC') && data[i].Code == '52') ||
                        (CheckAccess('NEW_SRDOC') && data[i].Code == '53') ||
                        (CheckAccess('NEW_PPDOC') && data[i].Code == '54') ||
                        (CheckAccess('NEW_PFDOC') && data[i].Code == '55') ||
                        (CheckAccess('NEW_PRDOC') && data[i].Code == '56')
                    ) {
                        textExc += '<option value="' + data[i].Code + '"';
                        if (data[i].InOut == 1) {
                            textExc += 'style="background-color: #f5e6ac" ';
                        }
                        textExc += '>' + data[i].Name + '</option>';
                    }

                }

            }

            textExc += '</select>';

            $("#modeListPor").empty();
            $('#modeListPor').append(textExc);


            dataMove = ko.utils.arrayFilter(self.FModeList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.InOut.toString().toLowerCase(), sessionStorage.InOut) &&
                    !ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), sessionStorage.ModeCode)
                return result;
            })


            select = document.getElementById('modeCodeMove');


            for (var i = 0; i < dataMove.length; i++) {
                if (dataMove[i].Code != sessionStorage.ModeCode) {
                    if (
                        (CheckAccess('NEW_SFORD') && dataMove[i].Code == 'SORD') ||
                        (CheckAccess('NEW_SPDOC') && dataMove[i].Code == 'SPFCT') ||
                        (CheckAccess('NEW_SFDOC') && dataMove[i].Code == 'SFCT') ||
                        (CheckAccess('NEW_SRDOC') && dataMove[i].Code == 'SRFCT') ||
                        (CheckAccess('NEW_SHVL') && dataMove[i].Code == 'SHVL') ||
                        (CheckAccess('NEW_SEXT') && dataMove[i].Code == 'SEXT') ||
                        (CheckAccess('NEW_PFORD') && dataMove[i].Code == 'PORD') ||
                        (CheckAccess('NEW_PPDOC') && dataMove[i].Code == 'PPFCT') ||
                        (CheckAccess('NEW_PFDOC') && dataMove[i].Code == 'PFCT') ||
                        (CheckAccess('NEW_PRDOC') && dataMove[i].Code == 'PRFCT')
                    ) {
                        if ((sessionStorage.InOut == 2 && (dataMove[i].Code != 'SRFCT' || sessionStorage.ModeCode == 'SFCT')) ||
                            (sessionStorage.InOut == 1 && (dataMove[i].Code != 'PRFCT' || sessionStorage.ModeCode == 'PFCT'))
                        ) {
                            opt = document.createElement('option');
                            opt.value = dataMove[i].Code;
                            opt.innerHTML = dataMove[i].Name;
                            //opt.selected = true;
                            select.appendChild(opt);
                        }
                    }
                }
            }

            $('#darsadMove').val(100);

        });
    }

    var moveMode = 0;


    if (sessionStorage.newFactor == 'true') {
        $("#menu1").removeClass("active");
        $("#home").addClass("active");
    }
    else {
        $("#home").removeClass("active");
        $("#menu1").addClass("active");
    }

    if (ace == "Web1") {
        $("#menu1").attr('hidden', '');
        $("#TabMove").attr('hidden', '');
    }





    $('#TabPor').click(function () {
        moveMode = 0;
    });

    $('#TabMove').click(function () {
        moveMode = 1;
    });

    $('#Move').click(function () {

        darsadMove = 100;

        modeCodeMove = moveMode == 1 ? $('#modeCodeMove').val() : $('#modeCodePor').val()

        if (moveMode == 0) {
            sessionStorage.flagCopy = 'Y'
        }
        else if (moveMode == 1) {

            darsadMove = SlashToDot($('#darsadMove').val());

            if (darsadMove == '' || darsadMove == '0')
                return showNotification('درصد را وارد کنید', 0);

            if (parseFloat(darsadMove) > 100)
                return showNotification('بیشتر از 100 درصد', 0);

            ajaxFunction(FTestMoveFactorUri + ace + '/' + sal + '/' + group + '/' + serial + '/' + modeCodeMove, 'POST').done(function (response) {
                if (response == '')
                    testmove = true
                else {
                    Texttestmove = response;
                    testmove = false
                }
            });
        }
        if (moveMode == 1 && testmove == false)
            return showNotification(Texttestmove, 0);

        var MoveObject = {
            SerialNumber: serial,
            DocDate: docDate,
            UserCode: sessionStorage.userName,
            TahieShode: sessionStorage.ace,
            LastModeCode: sessionStorage.ModeCode,
            ModeCode: modeCodeMove,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: 1,
            StartNo: 0,
            EndNo: 0,
            BranchCode: 0,
            MoveMode: moveMode,
            Per: darsadMove,
        };


        $('#modal-Move').modal('hide');


        showNotification('در حال انتقال لطفا منتظر بمانید', 1);

        ajaxFunction(FMoveFactorUri + ace + '/' + sal + '/' + group, 'POST', MoveObject).done(function (response) {
            item = response;
            item = item[0];

            sessionStorage.ModeCode = modeCodeMove;

            switch (modeCodeMove.toString()) {
                case sessionStorage.MODECODE_FDOC_SO:
                    sessionStorage.InOut = 2;
                    break;
                case sessionStorage.MODECODE_FDOC_SP:
                    sessionStorage.InOut = 2;
                    break;
                case sessionStorage.MODECODE_FDOC_S:
                    sessionStorage.InOut = 2;
                    break;
                case sessionStorage.MODECODE_FDOC_SR:
                    sessionStorage.InOut = 2;
                    break;
                case sessionStorage.MODECODE_FDOC_SH:
                    sessionStorage.InOut = 2;
                    break;
                case sessionStorage.MODECODE_FDOC_SE:
                    sessionStorage.InOut = 2;
                    break;
                case sessionStorage.MODECODE_FDOC_PO:
                    sessionStorage.InOut = 1;
                    break;
                case sessionStorage.MODECODE_FDOC_PP:
                    sessionStorage.InOut = 1;
                    break;
                case sessionStorage.MODECODE_FDOC_P:
                    sessionStorage.InOut = 1;
                    break;
                case sessionStorage.MODECODE_FDOC_PR:
                    sessionStorage.InOut = 1;
                    break;
            }

            sessionStorage.searchFDocH = item.DocNo;

            sessionStorage.flagupdateHeader = 1;
            sessionStorage.SerialNumber = item.SerialNumber;
            sessionStorage.DocNo = item.DocNo;
            sessionStorage.DocDate = item.DocDate;
            sessionStorage.CustCode = item.CustCode;
            sessionStorage.CustName = item.CustName;
            sessionStorage.Spec = item.Spec;
            sessionStorage.PriceCode = item.KalaPriceCode;
            sessionStorage.InvCode = item.InvCode;
            sessionStorage.Eghdam = item.Eghdam;

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

            sessionStorage.OprCode = item.OprCode;
            sessionStorage.OprName = item.OprName;

            sessionStorage.MkzCode = item.MkzCode;
            sessionStorage.MkzName = item.MkzName;

            sessionStorage.Status = item.Status;
            sessionStorage.PaymentType = item.PaymentType;
            sessionStorage.Footer = item.Footer;
            sessionStorage.BeforeMoveFactor = true;

            window.location.href = sessionStorage.urlAddFDocH;
        });
    });































    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableFDocH">' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('CustName', data);

        if (showFinalPrice)
            dataTable += CreateTableTh('FinalPrice', data);

        dataTable +=
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('Tanzim', data) +
            CreateTableTh('Taeed', data) +
            CreateTableTh('Tasvib', data) +
            CreateTableTh('SerialNumber', data) +
            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
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
            ' <tbody data-bind="foreach: currentPageFDocH" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() }, style: { color : Tanzim.substring(0, 1) == \'*\' &&  Tanzim.substring(Tanzim.length - 1 , Tanzim.length) == \'*\' ? \'#840fbc\' : Status == \'باطل\' ? \'red\' : null}  " >' +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('CustName', 0, 0, data)

        if (showFinalPrice)
            dataTable += CreateTableTd('FinalPrice', sessionStorage.Deghat, 2, data)

        dataTable +=
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('Eghdam', 0, 0, data) +
            CreateTableTd('Tanzim', 0, 0, data) +
            CreateTableTd('Taeed', 0, 0, data) +
            CreateTableTd('Tasvib', 0, 0, data) +
            CreateTableTd('SerialNumber', 0, 0, data) +

            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +

            CreateTableTd('F01', 0, 4, data) +
            CreateTableTd('F02', 0, 4, data) +
            CreateTableTd('F03', 0, 4, data) +
            CreateTableTd('F04', 0, 4, data) +
            CreateTableTd('F05', 0, 4, data) +
            CreateTableTd('F06', 0, 4, data) +
            CreateTableTd('F07', 0, 4, data) +
            CreateTableTd('F08', 0, 4, data) +
            CreateTableTd('F09', 0, 4, data) +
            CreateTableTd('F10', 0, 4, data) +
            CreateTableTd('F11', 0, 4, data) +
            CreateTableTd('F12', 0, 4, data) +
            CreateTableTd('F13', 0, 4, data) +
            CreateTableTd('F14', 0, 4, data) +
            CreateTableTd('F15', 0, 4, data) +
            CreateTableTd('F16', 0, 4, data) +
            CreateTableTd('F17', 0, 4, data) +
            CreateTableTd('F18', 0, 4, data) +
            CreateTableTd('F19', 0, 4, data) +
            CreateTableTd('F20', 0, 4, data) +
            '<td>' +

            '<a class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            '</a>' +
            '<ul class="dropdown-menu">' +
            '    <li>' +
            '        <a id="MoveFactor" data-bind="click: $root.MoveFactor  , visible: $root.ShowMove(Eghdam)" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/sanad/synchronize-arrows-square-warning.png" width="16" height="16" style="margin-left:10px">' +
            '            کپی' +
            '        </a>' +
            '    </li>' +

            '    <li>' +
            '        <a id="ChangeStatusFactor" data-bind="click: $root.ChangeStatusFactor" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/sanad/synchronize-arrows-square-warning.png" width="16" height="16" style="margin-left:10px">' +
            '            تغییر وضعیت' +
            '        </a>' +
            '    </li>';

        if (sessionStorage.AccessPrint_Factor == "true") {
            dataTable +=
                '    <li>' +
                '        <a id="PrintFactor" data-bind="click: $root.PrintFactor" style="font-size: 11px;text-align: right;">' +
                '            <img src="/Content/img/sanad/streamline-icon-print-text@48x48.png" width="16" height="16" style="margin-left:10px">' +
                '            چاپ ' +
                '        </a>' +
                '    </li>';
        }


        dataTable += '</ul>' +

            '   <a id="UpdateFactor" data-bind="click: $root.UpdateHeader">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteFactor" data-bind="click: $root.DeleteFactor, visible: $root.ShowAction(Eghdam)">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('CustName', data)

        if (showFinalPrice)
            dataTable += CreateTableTdSearch('FinalPrice', data)

        dataTable +=
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('Tanzim', data) +
            CreateTableTdSearch('Taeed', data) +
            CreateTableTdSearch('Tasvib', data) +
            CreateTableTdSearch('SerialNumber', data) +
            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprCode', data) +
            CreateTableTdSearch('OprName', data) +
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
        $('#TableList').append(dataTable);
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
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ')) ), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + '.toFixed(' + Deghat + ')) ) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + '.toFixed(' + Deghat + ')) ) : \'0\'" style="text-align: right;"></td>'
                break;
            case 4:
                text += 'data-bind="text: ' + field + ' , click: $root.View' + field + ' " class="ellipsis"></td>';
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

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }"  type="text" class="type_' + type;
        text += ' form-control" style="height: 2.4rem; direction: ltr;text-align: right" /> </td>';

        return text;
    }



    var FDocPUri = server + '/api/FDocData/FDocP/'; // آدرس ویوی چاپ سند 
    self.FDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    //Get FDocP List
    function getFDocP(serialNumber) {
        ajaxFunction(FDocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.FDocPList(data);
        });
    }

    createViewer();


    /*

    self.PrintFactor = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;


        getFDocP(serial);
        if (self.FDocPList().length == 0)
            return showNotification('برای چاپ فاکتور حداقل یک بند الزامیست', 0);

        textFinalPrice = item.FinalPrice.toPersianLetter() + titlePrice;

        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';

        textAccess = 'دسترسی ندارید';
        switch (sessionStorage.ModeCode.toString()) {
            case sessionStorage.MODECODE_FDOC_SO:
                if (sessionStorage.Access_SHOWPRICE_SFORD == 'true')
                    setReport(self.FDocPList(), 'Factor_SFORD', variable)
                else
                    return showNotification(textAccess, 0);
                break;
            case sessionStorage.MODECODE_FDOC_SP:
                if (sessionStorage.Access_SHOWPRICE_SPDOC == 'true')
                    setReport(self.FDocPList(), 'Factor_SPDOC', variable);
                else
                    return showNotification(textAccess, 0);
                break;
            case sessionStorage.MODECODE_FDOC_S:
                if (sessionStorage.Access_SHOWPRICE_SFDOC == 'true')
                    setReport(self.FDocPList(), 'Factor_SFDOC', variable);
                else
                    return showNotification(textAccess, 0);
                break;
            case sessionStorage.MODECODE_FDOC_SR:
                if (sessionStorage.Access_SHOWPRICE_SRDOC == 'true')
                    setReport(self.FDocPList(), 'Factor_SRDOC', variable);
                else
                    return showNotification(textAccess, 0);
                break;
            case sessionStorage.MODECODE_FDOC_SH:
                setReport(self.FDocPList(), 'Factor_SHVL_NoPrice', variable);
                break;
            case sessionStorage.MODECODE_FDOC_SE:
                setReport(self.FDocPList(), 'Factor_SEXT_NoPrice', variable);
                break;
            case sessionStorage.MODECODE_FDOC_PO:
                if (sessionStorage.Access_SHOWPRICE_PFORD == 'true')
                    setReport(self.FDocPList(), 'Factor_PFORD', variable);
                else
                    return showNotification(textAccess, 0);
                break;
            case sessionStorage.MODECODE_FDOC_PP:
                if (sessionStorage.Access_SHOWPRICE_PPDOC == 'true')
                    setReport(self.FDocPList(), 'Factor_PPDOC', variable);
                else
                    return showNotification(textAccess, 0);
                break;
            case sessionStorage.MODECODE_FDOC_P:
                if (sessionStorage.Access_SHOWPRICE_PFDOC == 'true')
                    setReport(self.FDocPList(), 'Factor_PFDOC', variable);
                else
                    return showNotification(textAccess, 0);
                break;
            case sessionStorage.MODECODE_FDOC_PR:
                if (sessionStorage.Access_SHOWPRICE_PRDOC == 'true')
                    setReport(self.FDocPList(), 'Factor_PRDOC', variable);
                else
                    return showNotification(textAccess, 0);
                break;
        }

        setReport(self.FDocPList(), 'Free', variable);
    };*/

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


    self.PrintFactor = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;
        getFDocP(serial);
        if (self.FDocPList().length == 0)
            return showNotification('برای چاپ فاکتور حداقل یک بند الزامیست', 0);

        textFinalPrice = item.FinalPrice.toPersianLetter() + titlePrice;

        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';

        printName = null;
        sessionStorage.ModePrint = sessionStorage.ModeCode;
        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
        $('#modal-Print').modal('show');
    };



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



    self.currentPageIndexFDocH(parseInt(sessionStorage.lastPageSelect == null ? 0 : sessionStorage.lastPageSelect));

    self.sortTableFDocH();
};

ko.applyBindings(new ViewModel());

