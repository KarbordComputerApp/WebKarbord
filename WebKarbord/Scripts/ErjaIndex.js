﻿var ViewModel = function () {
    var self = this;

    var khdtHasTime = 1;
    var useSanadOtherUser;

    if (sessionStorage.AccessSanadErj == null) {
        sessionStorage.AccessSanadErj = localStorage.getItem("AccessSanadErj");
        sessionStorage.lastPageSelect = localStorage.getItem("lastPageSelect");
    }

    self.ErjDocHList = ko.observableArray([]); // لیست گزارش  
    self.FarayandList = ko.observableArray([]); // لیست فرایند 
    self.RelatedDocsList = ko.observableArray([]); // لیست گزارش  
    self.MahramanehList = ko.observableArray([]); // لیست محرمانه 
    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.ErjDocYearsList = ko.observableArray([]); // لیست سال پرونده ها 
    self.ErjDocErja = ko.observableArray([]); // لیست پرونده  
    self.ErjResultList = ko.observableArray([]); // لیست نتیجه 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.ErjUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.RepToUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.DocAttachList = ko.observableArray([]); // ليست پیوست
    self.TestDoc_DeleteList = ko.observableArray([]); // لیست تست حذف 




    //var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var FarayandUri = server + '/api/Web_Data/Farayand/'; // آدرس فرایند 
    var ErjDocHUri = server + '/api/Web_Data/ErjDocH/'; // آدرس گزارش
    var MahramanehUri = server + '/api/Web_Data/Web_Mahramaneh/'; // آدرس محرمانه
    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var ErjDocYearsUri = server + '/api/Web_Data/ErjDocYears/'; // آدرس سال پرونده ها 
    var Web_ErjSaveDoc_Del_Uri = server + '/api/ErjDocH/'; // حذف پرونده
    var Web_ErjSaveDoc_HUri = server + '/api/ErjDocH/'; // آدرس ذخیره پرونده
    var ErjDocErjaUri = server + '/api/Web_Data/Web_ErjDocErja/'; // آدرس  پرونده
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var ErjUsersUri = server + '/api/Web_Data/Web_ErjUsers/'; // آدرس کاربران زمان ارجاع

    var RepToUsersUri = server + '/api/Web_Data/Web_RepToUsers/'; // آدرس ارجاع شونده 
    var RepFromUsersUri = server + '/api/Web_Data/Web_RepFromUsers/'; // آدرس ارجاع دهنده 

    var DocAttachUri = server + '/api/Web_Data/DocAttach/'; // آدرس لیست پیوست 
    //var DownloadAttachUri = server + '/api/Web_Data/DownloadAttach/'; // آدرس  دانلود پیوست 

    var ErjSaveDoc_BSaveUri = server + '/api/Web_Data/ErjSaveDoc_BSave/'; // آدرس ذخیره ارجاع
    var ErjSaveDoc_CSaveUri = server + '/api/Web_Data/ErjSaveDoc_CSave/'; // آدرس ذخیره رونوشت

    var ErjResultUri = server + '/api/Web_Data/Web_ErjResult/'; // آدرس نتیجه

    // var ErjDocAttach_SaveUri = server + '/api/Web_Data/ErjDocAttach_Save/'; // ذخیره پیوست
    var ErjDocAttach_SaveUri = server + '/api/FileUpload/UploadFile/'; // ذخیره پیوست
    var ErjDocAttach_DelUri = server + '/api/Web_Data/ErjDocAttach_Del/'; // حذف پیوست
    var Doc_DeleteUri = server + '/api/ErjDocH/TestDoc_Delete/'; // آدرس تست حذف

    TestUser();

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
    self.ErjUsersCode = ko.observable();


    self.DocYearsSelect = ko.observable();
    self.StatusParvandehSelect = ko.observable();

    self.FarayandCode = ko.observable();

    var ErjUsersRoneveshtCode = '';
    var counterErjUsersRonevesht = 0;
    var list_ErjUsersRoneveshtSelect = new Array();

    var bandNo = 0;
    var serialNumber = 0;
    var SpecialCommTrs;
    var specialComm = '';



    var flag_IsChange = false;
    var flag_Save = false;
    var old_DocDate = '';
    var old_MhltDate = '';
    var old_AmalDate = '';
    var old_EndDate = '';
    var old_Spec = '';
    var old_CustCode = '';
    var old_KhdtCode = '';
    var old_RelatedDocs = '';
    var old_Mahramaneh = '';
    var old_Status = '';
    var old_EghdamComm = '';
    var old_DocDesc = '';
    var old_FinalComm = '';
    var old_SpecialComm = '';
    var editDoc = false;



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


    DocNoReport = localStorage.getItem("DocNoErjReport");
    DocNoReport = DocNoReport == null ? DocNoReport = "null" : DocNoReport
    if (DocNoReport != "null") {
        localStorage.setItem("DocNoErjReport", null);
        $("#DocNoSearch").val(DocNoReport);
        ShowDataUpdate(DocNoReport);
    }


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
    function getRprtColsList(FlagSetting) {
        cols = getRprtColsErj(rprtId, sessionStorage.userName);
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
        /*  ajaxFunction(RprtColsUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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
        ajaxFunction(RprtColsDefultUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    //Get ErjCust List
    function getErjCustList() {
        var ErjCustObject = {
            userCode: sessionStorage.userName,
            mode: 1,
        }

        ajaxFunction(ErjCustUri + aceErj + '/' + salErj + '/' + group + '/', 'Post', ErjCustObject).done(function (data) {
            self.ErjCustList(data);
        });
    }
    //;


    $('#btnErjCust').click(function () {
        if (self.ErjCustList().length == 0) {
            getErjCustList();
        }
    });




    function getKhdtList() {
        ajaxFunction(KhdtUri + aceErj + '/' + salErj + '/' + group, 'GET', true, true).done(function (data) {
            self.KhdtList(data);
        });
    }

    $('#btnKhdt').click(function () {
        if (self.KhdtList().length == 0) {
            getKhdtList();
        }
    });

    //getKhdtList();

    //Get ErjStatus List
    function getErjStatusList() {
        list = localStorage.getItem('ErjStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('ErjStatus'));
            self.ErjStatusList(list)
        }
        else {
            ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
                self.ErjStatusList(data);
                localStorage.setItem("ErjStatus", JSON.stringify(data));
            });
        }

        StatusParvandehSelect = localStorage.getItem('StatusParvandehSelect') == null ? '' : localStorage.getItem('StatusParvandehSelect');
        self.StatusParvandehSelect(StatusParvandehSelect);
    }
    getErjStatusList();


    //Get ErjDocYears List
    function getErjDocYearsList() {
        list = localStorage.getItem('ErjDocYears');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('ErjDocYears'));
            self.ErjDocYearsList(list)
        }
        else {
            ajaxFunction(ErjDocYearsUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
                self.ErjDocYearsList(data);
                localStorage.setItem("ErjDocYears", JSON.stringify(data));
            });
        }
        DocYearsSelect = localStorage.getItem('DocYearsSelect') == null ? '' : localStorage.getItem('DocYearsSelect');
        self.DocYearsSelect(DocYearsSelect);
    }
    getErjDocYearsList();


    function getErjUsersList(serial) {
        var ErjUsersObject = {
            userCode: sessionStorage.userName,
            SerialNumber: serial,
        }

        ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group + '/', 'Post', ErjUsersObject).done(function (data) {
            self.ErjUsersList(data);
        });
    }

    $('#btnErjBe').click(function () {
        //if (self.ErjUsersList().length == 0) {
        getErjUsersList(serialNumber);
        //}
    });


    $('#btnRoneveshtBe').click(function () {
        //if (self.ErjUsersList().length == 0) {
        getErjUsersList(serialNumber);
        //}
    });

    /*//Get ErjUsers List
     function getErjUsersList(Reload) {
 
         list = localStorage.getItem('ErjUsers');
         if (list != null && Reload == false) {
             list = JSON.parse(localStorage.getItem('ErjUsers'));
             self.ErjUsersList(list)
         }
         else {
             ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                 self.ErjUsersList(data);
                 localStorage.setItem("ErjUsers", JSON.stringify(data));
             });
         }
     }
 
     getErjUsersList(true);
     */



    //Get ErjResult List
    function getErjResultList(serialNumber, bMode, toUser, band) {
        var ErjResultObject = {
            SerialNumber: serialNumber,
            BandNo: band,
            DocBMode: bMode,
            ToUserCode: toUser,
        }

        ajaxFunction(ErjResultUri + aceErj + '/' + salErj + '/' + group + '/', 'Post', ErjResultObject).done(function (data) {
            if (data.length > 0) {
                if (bMode == null)
                    self.ErjResultList(data);

                item = data[0];

                bandNo = item.BandNo;
            }
            // $("#Result").val(item.RjResult);
        });
    }

    //Get RepToUsers List
    function getRepToUsersList() {
        ajaxFunction(RepToUsersUri + aceErj + '/' + salErj + '/' + group + '/' + sessionStorage.userName, 'GET').done(function (data) {
            self.RepToUsersList(data);
            $('#ToUser').val(sessionStorage.userName);
            $('#FromUser').val(' ');
        });
    }
    //getRepToUsersList();


    var doc_KhdtCode = 0;

    //Get Farayand List
    function getFarayandList(KhdtCode) {
        ajaxFunction(FarayandUri + aceErj + '/' + salErj + '/' + group + '/' + KhdtCode, 'GET').done(function (data) {
            self.FarayandList(data);
            localStorage.setItem("Farayand", JSON.stringify(data));
        });
    }


    //Get DocAttach List
    function getDocAttachList(serial) {
        var DocAttachObject = {
            ProgName: 'ERJ1',
            Group: group,
            Year: salErj,
            ModeCode: '1',
            SerialNumber: serial,
            BandNo: 0,
            ByData: 0
        }

        ajaxFunction(DocAttachUri , 'POST', DocAttachObject).done(function (data) {
            self.DocAttachList(data);
        });
    }


    //Get ExtraFields List
    /* function getExtraFieldsList() {
         ajaxFunction(ExtraFieldsUri + aceErj + '/' + salErj + '/' + group + '/DOC', 'GET').done(function (data) {
             self.ExtraFieldsList(data);
         });
     }*/

    function getExtraFieldsList() {
        //cols = getRprtColsErj('DOC', sessionStorage.userName);
        result = ko.utils.arrayFilter(cols, function (item) {
            result =
                (ko.utils.stringStartsWith(item.Code, 'F0') ||
                    ko.utils.stringStartsWith(item.Code, 'F1') ||
                    ko.utils.stringStartsWith(item.Code, 'F2')) &&
                item.Name != ''
            return result;
        })
        self.ExtraFieldsList(result);
    }




    $('#SaveColumns').click(function () {
        SaveColumn(aceErj, salErj, group, rprtId, "/ERJ/index", columns, self.SettingColumnList());
        //localStorage.setItem('listFilter', null);
    });

    $('#modal-SettingColumn').on('show.bs.modal', function () {
        counterColumn = 0;
        getRprtColsList(false);
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
        SaveColumn(aceErj, salErj, group, rprtId, "/ERJ/index", columns, self.SettingColumnList());
        //localStorage.setItem('listFilter', null);
    });


    if (DocNoReport == "null") {
        getRprtColsList(true);
        getExtraFieldsList();
    }


    //Get Mahramaneh List
    function getMahramanehList() {

        list = localStorage.getItem('Mahramaneh');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('Mahramaneh'));
            self.MahramanehList(list)
        }
        else {
            ajaxFunction(MahramanehUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
                self.MahramanehList(data);
                localStorage.setItem("Mahramaneh", JSON.stringify(data));
            });
        }
    }


    getMahramanehList();

    self.currentPageIndexErjDocH = ko.observable(0);

    //Get ErjDocH
    function getErjDocH(select, page, status, sal, docno, changeSelector) {
        lastSelect = select;
        tarikh1 = '';
        tarikh2 = '';
        Status = '';
        SrchSt = '';
        ErjCust = '';
        Khdt = '';

        if (sal == null)
            sal = '';

        if (status == null)
            status = '';


        sort = localStorage.getItem("sort" + rprtId);
        sortType = localStorage.getItem("sortType" + rprtId);


        var ErjDocHObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
            select: select,
            AccessSanad: sessionStorage.AccessSanadErj,
            Sal: sal,
            Status: status,
            DocNo: docno,
            Sort: sort,
            ModeSort: sortType == "ascending" ? "ASC" : "DESC"
        };

        ajaxFunction(ErjDocHUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjDocHObject, false).done(function (response) {
            self.ErjDocHList(response);
            self.RelatedDocsList(response);
            self.currentPageIndexErjDocH(page);

            localStorage.setItem('DocYearsSelect', sal);
            localStorage.setItem('StatusParvandehSelect', status);
        });

        if (sort == "" || sort == "null" || sort == null) {
            sort = "DocDate";
            sortType = "descending";
        }

        if (sort == "SortDocNo") {
            sort = "DocNo"
        }
        if (changeSelector == false) {
            TextField = FindTextField(sort, ListColumns);
            $('#pageCountSelector').empty();
            select = document.getElementById('pageCountSelector');
            for (var i = 1; i <= 2; i++) {
                opt = document.createElement('option');
                if (i == 1) {
                    opt.value = 0;
                    if (sortType == "descending")
                        textSort = ' ' + translate('100 رکورد آخر به ترتیب');
                    else
                        textSort = ' ' + translate('100 رکورد اول به ترتیب');

                    opt.innerHTML = ' ' + textSort + '"' + TextField + '"';
                }
                if (i == 2) {
                    opt.value = 3;
                    opt.innerHTML = translate('تمام رکوردها');
                }
                select.appendChild(opt);
            }
            $('#pageCountSelector').val(lastSelect);
        }

    }

    if (DocNoReport == "null") {
        getErjDocH($('#pageCountSelector').val(), 0, self.StatusParvandehSelect(), self.DocYearsSelect(), '', false);
    }

    $('#refreshErjDocH').click(function () {

        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست پرونده ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getErjDocH($('#pageCountSelector').val(), 0, self.StatusParvandehSelect(), self.DocYearsSelect(), '', false);
                self.sortTableErjDocH();
            }
        })
    })


    self.PageCountView = function () {
        select = $('#pageCountSelector').val();
        getErjDocH(select, 0, self.StatusParvandehSelect(), self.DocYearsSelect(), '', true);
        self.sortTableErjDocH();
    }






    var flagupdate = 0;

    self.currentPageErjDocH = ko.observable();
    pageSizeErjDocH = localStorage.getItem('pageSizeErjDocH') == null ? 10 : localStorage.getItem('pageSizeErjDocH');
    self.pageSizeErjDocH = ko.observable(pageSizeErjDocH);

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

        if (e != null) {
            self.currentColumn(orderProp);
            self.ErjDocHList.sort(function (left, right) {
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

            localStorage.setItem("sort" + rprtId, orderProp);
            localStorage.setItem("sortType" + rprtId, self.sortType);
        }


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



    self.AddNewDocH = function () {
        AddNewSanad();
    }


    function AddNewSanad() {
        //sessionStorage.flagupdate = 0;
        //sessionStorage.Eghdam = sessionStorage.userName;
        //docBMode = Band.DocBMode;
        //serialNumber = Band.SerialNumber;
        // p_docno
        serialNumber = 0;
        khdtHasTime = 1;
        self.p_DocDate(DateNow);
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

        $('#P_Action').show();
        $('#p_docno').val('');
        $('#nameErjCust').val('');
        $('#nameKhdt').val('');
        $('#p_RelatedDocs').val('');
        $('#p_EghdamComm').val('');
        $('#p_DocDesc').val('');
        $('#p_SpecialComm').val('');
        $('#p_FinalComm').val('');
        $('#p_Mahramaneh').val(0);
        $('#p_Status').val('فعال');
        $("#BodyErjDocH").empty();
        $('#ErjDocErja').removeAttr('hidden', '');
        $('#ErjDocErja').prop('disabled', true);
        $('#ExtraFields01').val('');
        $('#ExtraFields02').val('');
        $('#ExtraFields03').val('');
        $('#ExtraFields04').val('');
        $('#ExtraFields05').val('');
        $('#ExtraFields06').val('');
        $('#ExtraFields07').val('');
        $('#ExtraFields08').val('');
        $('#ExtraFields09').val('');
        $('#ExtraFields10').val('');
        $('#ExtraFields11').val('');
        $('#ExtraFields12').val('');
        $('#ExtraFields13').val('');
        $('#ExtraFields14').val('');
        $('#ExtraFields15').val('');
        $('#ExtraFields16').val('');
        $('#ExtraFields17').val('');
        $('#ExtraFields18').val('');
        $('#ExtraFields19').val('');
        $('#ExtraFields20').val('');

        $('#p_EghdamComm').attr('readonly', false);

        $('#saveErjDocH').removeAttr('hidden', '');
        $('#AddNewDocAttach').removeAttr('hidden', '');

        $('#modal-ErjDocH').modal('show');
    }



    self.DeleteErjDocH = function (ErjDocHBand) {
        serialNumber = ErjDocHBand.SerialNumber;
        if (TestUseSanad(aceErj, salErj, "ErjDocH", serialNumber, false, ErjDocHBand.DocNo) == true) {
            // showNotification('پرونده در تب دیگری در حال ویرایش است', 0)
        }
        else {

            Swal.fire({
                title: translate('تایید حذف'),
                text: translate("آیا پرونده انتخابی حذف شود ؟"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {

                    serial = ErjDocHBand.SerialNumber;
                    var TestDoc_DeleteObject = {
                        SerialNumber: serial
                    };

                    ajaxFunction(Doc_DeleteUri + aceErj + '/' + salErj + '/' + group, 'POST', TestDoc_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestDoc_DeleteList(obj);
                        if (data.length > 2) {
                            $('#modal-TestDelete').modal('show');
                            SetDataTestDocB();
                        }
                        else {
                            DeleteParvandeh();
                        }
                    });
                }
            })
        }
    };



    function SetDataTestDocB() {
        $("#BodyTestDoc_Delete").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestDoc_DeleteList();
        for (var i = 0; i < list.length; i++) {
            textBody +=
                '<div class="body" style="padding:7px;">' +
                '    <div class="form-inline">';
            if (list[i].Test == 1) {
                countWarning += 1;
                textBody += ' <img src="/Content/img/Warning.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('هشدار :') + '</p>'
            }
            else {
                countError += 1;
                textBody += ' <img src="/Content/img/Error.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('خطا :') + '</p>'
            }

            if (list[i].TestName == "DocR")
                textBody += '<p>این پرونده دارای پرونده مرتبط است و قابل حذف نیست</p>';

            else if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

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

    function DeleteParvandeh() {
        ajaxFunction(Web_ErjSaveDoc_Del_Uri + aceErj + '/' + salErj + '/' + group + '/' + serial, 'DELETE').done(function (response) {
            currentPage = self.currentPageIndexErjDocH();
            getErjDocH($('#pageCountSelector').val(), currentPage, self.StatusParvandehSelect(), self.DocYearsSelect(), '', false);
            self.sortTableErjDocH();
            self.currentPageIndexErjDocH(currentPage);
            showNotification(translate('پرونده حذف شد'), 1);
        });
    }



    $('#Delete-Modal').click(function () {
        DeleteParvandeh();
        $('#modal-TestDelete').modal('hide');
    });







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
    function ErjSaveDoc_HI() {
        docNo = $("#p_docno").val();

        rjDate = DateNow;
        p_DocDate = $("#p_DocDate").val().toEnglishDigit();
        p_MhltDate = $("#p_MhltDate").val().toEnglishDigit();
        p_AmalDate = $("#p_AmalDate").val().toEnglishDigit();
        p_EndDate = $("#p_EndDate").val().toEnglishDigit();

        custCode = self.ErjCustCode();
        khdtCode = self.KhdtCode();

        if (p_DocDate == '')
            return showNotification(translate('تاریخ پرونده انتخاب نشده است'), 0);

        if (custCode == '')
            return showNotification(translate('مشتری انتخاب نشده است'), 0);

        if (khdtCode == '')
            return showNotification(translate('نوع کار انتخاب نشده است'), 0);

        doc_KhdtCode = self.KhdtCode();

        if ($("#p_SpecialComm").css('font-style') == 'italic')
            special = specialComm;
        else
            special = $("#p_SpecialComm").val();


        Web_ErjSaveDoc_HObject = {
            ModeCode: 0,
            DocNo: docNo == "" ? 0 : docNo,
            SerialNumber: docNo == "" ? 0 : docNo,
            DocDate: p_DocDate,
            MhltDate: p_MhltDate,
            AmalDate: p_AmalDate,
            EndDate: p_EndDate,
            BranchCode: 0,
            UserCode: sessionStorage.userName,
            Eghdam: self.p_Eghdam(),
            Tanzim: sessionStorage.userName,
            TahieShode: 'ERJ1Web2',
            Status: $("#p_Status").val(),
            Spec: self.p_Spec(),
            CustCode: self.ErjCustCode(),
            KhdtCode: self.KhdtCode(),
            EghdamComm: $("#p_EghdamComm").val(),
            DocDesc: $("#p_DocDesc").val(),
            FinalComm: $("#p_FinalComm").val(),
            SpecialComm: special,
            RelatedDocs: $("#p_RelatedDocs").val(),
            Mahramaneh: $("#p_Mahramaneh").val(),
            F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val(),
            F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val(),
            F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val(),
            F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val(),
            F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val(),
            F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val(),
            F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val(),
            F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val(),
            F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val(),
            F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val(),
            F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val(),
            F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val(),
            F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val(),
            F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val(),
            F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val(),
            F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val(),
            F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val(),
            F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val(),
            F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val(),
            F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val(),
        }



        ajaxFunction(Web_ErjSaveDoc_HUri + aceErj + '/' + salErj + '/' + group, 'POST', Web_ErjSaveDoc_HObject).done(function (response) {
            lastDoc = $("#p_docno").val();
            serialNumber = response;
            currentPage = self.currentPageIndexErjDocH();
            if (DocNoReport == "null") {
                getErjDocH($('#pageCountSelector').val(), currentPage, self.StatusParvandehSelect(), self.DocYearsSelect(), '', false);
            }
            self.sortTableErjDocH();
            self.currentPageIndexErjDocH(currentPage);
            if (lastDoc == "") {
                $('#ErjDocErja').prop('disabled', false);
                $("#p_docno").val(response);
                showNotification(translate('پرونده') + ' ' + response + ' ' + translate('ایجاد شد'), 1);

            }
            else {
                showNotification(translate('پرونده') + ' ' + response + ' ' + translate('ذخیره شد'), 1);

            }
            flag_Save = true;
        });
    };


    $('#saveErjDocH').click(function () {
        ErjSaveDoc_HI();
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

    $('#refreshErjCust').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست مشتریان") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
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


    $('#refreshKhdt').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست نوع کار ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKhdtList();
            }
        })
    })



    self.selectKhdt = function (item) {
        $('#nameKhdt').val('(' + item.Code + ') ' + item.Name)
        self.KhdtCode(item.Code)
        doc_KhdtCode = item.Code;
        khdtHasTime = item.KhdtHasTime;
    };
















    var StatementsUri = server + '/api/Web_Data/Statements'; // آدرس عبارات تعریف شده
    var DeleteStatementsUri = server + '/api/Web_Data/DeleteStatements'; // حذف عبارت تعریف شده
    self.StatementsList = ko.observableArray([]); // لیست عبارات تعریف شده


    function getStatementList() {
        Statements = [];
        temp = '';
        ajaxFunction(StatementsUri, 'GET', true).done(function (data) {
            self.StatementsList(data);
        });
    };

    self.DeletStatements = function (Band) {
        Swal.fire({
            title: translate('تایید حذف'),
            text: translate("آیا عبارت انتخابی حذف شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                DeleteStatementsObject = {
                    'Code': Band.Code
                };
                ajaxFunction(DeleteStatementsUri, 'POST', DeleteStatementsObject).done(function (response) {
                    getStatementList();
                });
            }
        })
    }

    $('.insertComm').click(function () {
        getStatementList();
        $('#modal-Statements').modal('show');
    })


    self.currentPageStatements = ko.observable();
    pageSizeStatements = localStorage.getItem('pageSizeStatements') == null ? 10 : localStorage.getItem('pageSizeStatements');
    self.pageSizeStatements = ko.observable(pageSizeStatements);
    self.currentPageIndexStatements = ko.observable(0);

    self.filterStatements0 = ko.observable("");


    self.filterStatementsList = ko.computed(function () {

        self.currentPageIndexStatements(0);
        var filter0 = self.filterStatements0().toUpperCase();

        if (!filter0) {
            return self.StatementsList();
        } else {
            tempData = ko.utils.arrayFilter(self.StatementsList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageStatements = ko.computed(function () {
        var pageSizeStatements = parseInt(self.pageSizeStatements(), 10),
            startIndex = pageSizeStatements * self.currentPageIndexStatements(),
            endIndex = startIndex + pageSizeStatements;
        localStorage.setItem('pageSizeStatements', pageSizeStatements);
        return self.filterStatementsList().slice(startIndex, endIndex);
    });

    self.nextPageStatements = function () {
        if (((self.currentPageIndexStatements() + 1) * self.pageSizeStatements()) < self.filterStatementsList().length) {
            self.currentPageIndexStatements(self.currentPageIndexStatements() + 1);
        }
    };

    self.previousPageStatements = function () {
        if (self.currentPageIndexStatements() > 0) {
            self.currentPageIndexStatements(self.currentPageIndexStatements() - 1);
        }
    };

    self.firstPageStatements = function () {
        self.currentPageIndexStatements(0);
    };

    self.lastPageStatements = function () {
        countStatements = parseInt(self.filterStatementsList().length / self.pageSizeStatements(), 10);
        if ((self.filterStatementsList().length % self.pageSizeStatements()) == 0)
            self.currentPageIndexStatements(countStatements - 1);
        else
            self.currentPageIndexStatements(countStatements);
    };

    self.sortTableStatements = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.StatementsList.sort(function (left, right) {
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

        self.iconTypeName('');

        if (orderProp == 'Name') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    /*  $('#refreshStatements').click(function () {
          Swal.fire({
              title: mes_Refresh,
              text: translate("لیست نوع کار ها") + " " + translate("به روز رسانی شود ؟"),
              type: 'info',
              showCancelButton: true,
              cancelButtonColor: '#3085d6',
              cancelButtonText: text_No,
              allowOutsideClick: false,
              confirmButtonColor: '#d33',
              confirmButtonText: text_Yes
          }).then((result) => {
              if (result.value) {
                  getStatementsList();
              }
          })
      })*/

    var idInsertCommErja = null;
    self.selectStatements = function (item) {
        insertAtCaret(item.Name, idInsertCommErja);
        $('#modal-Statements').modal('hide');
    };


    var StatementsSaveUri = server + '/api/Web_Data/SaveStatements'; // آدرس  ذخیره عبارات تعریف شده

    function SaveStatements(comm) {
        if (comm != "" && comm != "null") {

        }
    }


    $(".saveStatement").hide();

    $("#commPublic").select(function () {
        $(".saveStatement").show();
    });

    $(".saveStatement").on("click", function () {

        var txtarea = document.getElementById(idInsertCommErja == null ? "commPublic" : idInsertCommErja);
        var start = txtarea.selectionStart;
        var finish = txtarea.selectionEnd;
        var val = txtarea.value.substring(start, finish);

        if (val != "") {
            getStatementList();
            res = ko.utils.arrayFilter(self.StatementsList(), function (item) {
                result = item.Name == val
                return result;
            });

            if (res.length == 0) {
                obj = {
                    'Comm': val,
                };
                ajaxFunction(StatementsSaveUri, 'POST', obj).done(function (response) {

                });
            }
        }
        $(".saveStatement").hide();
    });



























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
    self.filterRelatedDocs4 = ko.observable("");

    self.iconTypeRelatedDocsDocNo = ko.observable("");
    self.iconTypeRelatedDocsDocDate = ko.observable("");
    self.iconTypeRelatedDocsCustName = ko.observable("");
    self.iconTypeRelatedDocsKhdtName = ko.observable("");
    self.iconTypeRelatedDocsSpec = ko.observable("");




    self.filterRelatedDocsList = ko.computed(function () {

        self.currentPageIndexRelatedDocs(0);
        var filter0 = self.filterRelatedDocs0().toUpperCase();
        var filter1 = self.filterRelatedDocs1();
        var filter2 = self.filterRelatedDocs2();
        var filter3 = self.filterRelatedDocs3();
        var filter4 = self.filterRelatedDocs4();

        if (!filter0 && !filter1 && !filter2 && !filter3 && !filter4) {
            return self.RelatedDocsList();
        } else {
            tempData = ko.utils.arrayFilter(self.RelatedDocsList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter0) &&
                    (item.DocDate == null ? '' : item.DocDate.toString().search(filter1) >= 0) &&
                    (item.CustName == null ? '' : item.CustName.toString().search(filter2) >= 0) &&
                    (item.KhdtName == null ? '' : item.KhdtName.toString().search(filter3) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter4) >= 0)
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

        self.iconTypeRelatedDocsDocNo('');
        self.iconTypeRelatedDocsDocDate('');
        self.iconTypeRelatedDocsCustName('');
        self.iconTypeRelatedDocsKhdtName('');
        self.iconTypeRelatedDocsSpec('');

        if (orderProp == 'DocNo') self.iconTypeRelatedDocsDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeRelatedDocsDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeRelatedDocsCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KhdtName') self.iconTypeRelatedDocsKhdtName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeRelatedDocsSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
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
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
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
        if (counterRelatedDocs > 0) {
            RelatedDocs = '';
            for (var i = 0; i < counterRelatedDocs; i++) {
                if (i < counterRelatedDocs - 1)
                    RelatedDocs = RelatedDocs + list_RelatedDocsSelect[i] + '-';
                else
                    RelatedDocs = RelatedDocs + list_RelatedDocsSelect[i];
            }

            $('#p_RelatedDocs').val(RelatedDocs)
        }
        else
            $('#p_RelatedDocs').val('');
    });

    $('#modal-RelatedDocs').on('shown.bs.modal', function () {

        $("#TableBodyListRelatedDocs").empty();
        Related = $('#p_RelatedDocs').val();

        res = Related.split("-");
        counterRelatedDocs = res.length;

        for (var i = 0; i < counterRelatedDocs; i++) {
            if (res[i] != "") {

                value = ko.utils.arrayFirst(self.RelatedDocsList(), function (item) {
                    return item.DocNo == res[i];
                });

                list_RelatedDocsSelect[i] = res[i];
                $('#TableListRelatedDocs').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: DocNo">' + res[i] + '</td > '
                    + ' <td data-bind="text: DocDate">' + value.DocDate + '</td > '
                    + ' <td data-bind="text: CustName">' + value.CustName + '</td > '
                    + ' <td data-bind="text: KhdtName">' + value.KhdtName + '</td > '
                    + ' <td data-bind="text: Spec">' + value.Spec + '</td > '
                    + '</tr>'
                );
            }
            else {
                counterRelatedDocs = 0;
                list_RelatedDocsSelect = [];
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.delselectRelatedDocs = function () {
        $(this).closest("tr").remove();
    };

    $('#refreshRelatedDocs').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست پرونده ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getErjDocH($('#pageCountSelector').val(), 0, self.StatusParvandehSelect(), self.DocYearsSelect(), '', false);
                self.sortTableErjDocH();
            }
        })
    })










    self.currentPageErjUsers = ko.observable();
    pageSizeErjUsers = localStorage.getItem('pageSizeErjUsers') == null ? 10 : localStorage.getItem('pageSizeErjUsers');
    self.pageSizeErjUsers = ko.observable(pageSizeErjUsers);
    self.currentPageIndexErjUsers = ko.observable(0);

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageErjUsers = ko.observable();
    self.filterErjUsers0 = ko.observable("");
    self.filterErjUsers1 = ko.observable("");
    self.filterErjUsers2 = ko.observable("");

    self.filterErjUsersList = ko.computed(function () {

        self.currentPageIndexErjUsers(0);
        var filter0 = self.filterErjUsers0().toUpperCase();
        var filter1 = self.filterErjUsers1();
        var filter2 = self.filterErjUsers2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ErjUsersList();
        } else {
            tempData = ko.utils.arrayFilter(self.ErjUsersList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filter0) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageErjUsers = ko.computed(function () {
        var pageSizeErjUsers = parseInt(self.pageSizeErjUsers(), 10),
            startIndex = pageSizeErjUsers * self.currentPageIndexErjUsers(),
            endIndex = startIndex + pageSizeErjUsers;
        localStorage.setItem('pageSizeErjUsers', pageSizeErjUsers);
        return self.filterErjUsersList().slice(startIndex, endIndex);
    });

    self.nextPageErjUsers = function () {
        if (((self.currentPageIndexErjUsers() + 1) * self.pageSizeErjUsers()) < self.filterErjUsersList().length) {
            self.currentPageIndexErjUsers(self.currentPageIndexErjUsers() + 1);
        }
    };

    self.previousPageErjUsers = function () {
        if (self.currentPageIndexErjUsers() > 0) {
            self.currentPageIndexErjUsers(self.currentPageIndexErjUsers() - 1);
        }
    };

    self.firstPageErjUsers = function () {
        self.currentPageIndexErjUsers(0);
    };


    self.lastPageErjUsers = function () {
        countErjUsers = parseInt(self.filterErjUsersList().length / self.pageSizeErjUsers(), 10);
        if ((self.filterErjUsersList().length % self.pageSizeErjUsers()) == 0)
            self.currentPageIndexErjUsers(countErjUsers - 1);
        else
            self.currentPageIndexErjUsers(countErjUsers);
    };

    self.sortTableErjUsers = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ErjUsersList.sort(function (left, right) {
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

    $('#refreshErjUsers').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست کاربران") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getErjUsersList(serialNumber);
            }
        })
    })

    self.selectErjUsers = function (item) {
        $('#nameErjBe').val('(' + item.Code + ') ' + item.Name);
        self.ErjUsersCode(item.Code);
    }


    $('#modal-ErjUsers').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });






    self.currentPageErjUsersRonevesht = ko.observable();
    pageSizeErjUsersRonevesht = localStorage.getItem('pageSizeErjUsersRonevesht') == null ? 10 : localStorage.getItem('pageSizeErjUsersRonevesht');
    self.pageSizeErjUsersRonevesht = ko.observable(pageSizeErjUsersRonevesht);
    self.currentPageIndexErjUsersRonevesht = ko.observable(0);

    self.filterErjUsersRonevesht0 = ko.observable("");
    self.filterErjUsersRonevesht1 = ko.observable("");
    self.filterErjUsersRonevesht2 = ko.observable("");


    self.filterErjUsersRoneveshtList = ko.computed(function () {

        self.currentPageIndexErjUsersRonevesht(0);
        var filter0 = self.filterErjUsersRonevesht0().toUpperCase();
        var filter1 = self.filterErjUsersRonevesht1();
        var filter2 = self.filterErjUsersRonevesht2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ErjUsersList();
        } else {
            tempData = ko.utils.arrayFilter(self.ErjUsersList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filter0) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageErjUsersRonevesht = ko.computed(function () {
        var pageSizeErjUsersRonevesht = parseInt(self.pageSizeErjUsersRonevesht(), 10),
            startIndex = pageSizeErjUsersRonevesht * self.currentPageIndexErjUsersRonevesht(),
            endIndex = startIndex + pageSizeErjUsersRonevesht;
        localStorage.setItem('pageSizeErjUsersRonevesht', pageSizeErjUsersRonevesht);
        return self.filterErjUsersRoneveshtList().slice(startIndex, endIndex);
    });

    self.nextPageErjUsersRonevesht = function () {
        if (((self.currentPageIndexErjUsersRonevesht() + 1) * self.pageSizeErjUsersRonevesht()) < self.filterErjUsersRoneveshtList().length) {
            self.currentPageIndexErjUsersRonevesht(self.currentPageIndexErjUsersRonevesht() + 1);
        }
    };

    self.previousPageErjUsersRonevesht = function () {
        if (self.currentPageIndexErjUsersRonevesht() > 0) {
            self.currentPageIndexErjUsersRonevesht(self.currentPageIndexErjUsersRonevesht() - 1);
        }
    };

    self.firstPageErjUsersRonevesht = function () {
        self.currentPageIndexErjUsersRonevesht(0);
    };

    self.lastPageErjUsersRonevesht = function () {
        countErjUsersRonevesht = parseInt(self.filterErjUsersRoneveshtList().length / self.pageSizeErjUsersRonevesht(), 10);
        if ((self.filterErjUsersRoneveshtList().length % self.pageSizeErjUsersRonevesht()) == 0)
            self.currentPageIndexErjUsersRonevesht(countErjUsersRonevesht - 1);
        else
            self.currentPageIndexErjUsersRonevesht(countErjUsersRonevesht);
    };

    self.sortTableErjUsersRonevesht = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ErjUsersList.sort(function (left, right) {
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



    $('#refreshErjUsersRonevesht').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست کاربران") + " " + translate("به روز رسانی شود ؟"),
            text: translate("لیست کاربران") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getErjUsersList(serialNumber);
            }
        })
    })


    self.AddErjUsersRonevesht = function (item) {

        ErjUsersRoneveshtCode = item.Code;
        find = false;
        list_ErjUsersRoneveshtSelect.forEach(function (item, key) {
            if (item == ErjUsersRoneveshtCode) {
                find = true;
            }
        });

        //if (item.Code == self.ErjUsersCode()) {
        //    find = true;
        //}

        if (find == false) {
            $('#TableBodyListErjUsersRonevesht').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_ErjUsersRoneveshtSelect[counterErjUsersRonevesht] = item.Code;
            counterErjUsersRonevesht = counterErjUsersRonevesht + 1;
        }
    };


    self.AddAllErjUsersRonevesht = function () {
        list_ErjUsersRoneveshtSelect = new Array();
        list = self.ErjUsersList();
        $("#TableBodyListErjUsersRonevesht").empty();
        for (var i = 0; i < list.length; i++) {
            //if (list[i].Code != self.ErjUsersCode()) {
            $('#TableBodyListErjUsersRonevesht').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_ErjUsersRoneveshtSelect[i] = list[i].Code;
            counterErjUsersRonevesht = i + 1;
            // }
        }
    };


    self.DelAllErjUsersRonevesht = function () {
        list_ErjUsersRoneveshtSelect = new Array();
        counterErjUsersRonevesht = 0;
        $("#TableBodyListErjUsersRonevesht").empty();
    };


    $('#modal-ErjUsersRonevesht').on('hide.bs.modal', function () {
        if (counterErjUsersRonevesht > 0)
            $('#nameRoneveshtBe').val(counterErjUsersRonevesht + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameRoneveshtBe').val(translate('هیچکس'));
    });

    $('#modal-ErjUsersRonevesht').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });












    self.currentPageFarayand = ko.observable();
    pageSizeFarayand = localStorage.getItem('pageSizeFarayand') == null ? 10 : localStorage.getItem('pageSizeFarayand');
    self.pageSizeFarayand = ko.observable(pageSizeFarayand);
    self.currentPageIndexFarayand = ko.observable(0);

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageFarayand = ko.observable();
    self.filterFarayand0 = ko.observable("");
    self.filterFarayand1 = ko.observable("");
    self.filterFarayand2 = ko.observable("");

    self.filterFarayandList = ko.computed(function () {

        self.currentPageIndexFarayand(0);
        var filter0 = self.filterFarayand0().toUpperCase();
        var filter1 = self.filterFarayand1();
        var filter2 = self.filterFarayand2();

        if (!filter0 && !filter1 && !filter2) {
            return self.FarayandList();
        } else {
            tempData = ko.utils.arrayFilter(self.FarayandList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filter0) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageFarayand = ko.computed(function () {
        var pageSizeFarayand = parseInt(self.pageSizeFarayand(), 10),
            startIndex = pageSizeFarayand * self.currentPageIndexFarayand(),
            endIndex = startIndex + pageSizeFarayand;
        localStorage.setItem('pageSizeFarayand', pageSizeFarayand);
        return self.filterFarayandList().slice(startIndex, endIndex);
    });

    self.nextPageFarayand = function () {
        if (((self.currentPageIndexFarayand() + 1) * self.pageSizeFarayand()) < self.filterFarayandList().length) {
            self.currentPageIndexFarayand(self.currentPageIndexFarayand() + 1);
        }
    };

    self.previousPageFarayand = function () {
        if (self.currentPageIndexFarayand() > 0) {
            self.currentPageIndexFarayand(self.currentPageIndexFarayand() - 1);
        }
    };

    self.firstPageFarayand = function () {
        self.currentPageIndexFarayand(0);
    };


    self.lastPageFarayand = function () {
        countFarayand = parseInt(self.filterFarayandList().length / self.pageSizeFarayand(), 10);
        if ((self.filterFarayandList().length % self.pageSizeFarayand()) == 0)
            self.currentPageIndexFarayand(countFarayand - 1);
        else
            self.currentPageIndexFarayand(countFarayand);
    };

    self.sortTableFarayand = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.FarayandList.sort(function (left, right) {
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    };

    $('#refreshFarayand').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست فرایندها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getFarayandList(doc_KhdtCode);
            }
        })
    })

    self.selectFarayand = function (item) {
        $('#nameFarayand').val(item.Name);
        self.FarayandCode(item.Code);
    }


    $('#modal-Farayand').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });






    pageSizeDocAttach = localStorage.getItem('pageSizeDocAttach') == null ? 10 : localStorage.getItem('pageSizeDocAttach');
    self.pageSizeDocAttach = ko.observable(pageSizeDocAttach);
    self.currentPageIndexKhdt = ko.observable(0);

    self.currentPageIndexDocAttach = ko.observable(0);
    self.filterDocAttach0 = ko.observable("");

    self.filterDocAttachList = ko.computed(function () {

        self.currentPageIndexDocAttach(0);
        var filter0 = self.filterDocAttach0();

        if (!filter0) {
            return self.DocAttachList();
        } else {
            tempData = ko.utils.arrayFilter(self.DocAttachList(), function (item) {
                result =
                    (item.Comm == null ? '' : item.Comm.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageDocAttach = ko.computed(function () {
        var pageSizeDocAttach = parseInt(self.pageSizeDocAttach(), 10),
            startIndex = pageSizeDocAttach * self.currentPageIndexDocAttach(),
            endIndex = startIndex + pageSizeDocAttach;
        localStorage.setItem('pageSizeDocAttach', pageSizeDocAttach);
        return self.filterDocAttachList().slice(startIndex, endIndex);
    });

    self.nextPageDocAttach = function () {
        if (((self.currentPageIndexDocAttach() + 1) * self.pageSizeDocAttach()) < self.filterDocAttachList().length) {
            self.currentPageIndexDocAttach(self.currentPageIndexDocAttach() + 1);
        }
    };

    self.previousPageDocAttach = function () {
        if (self.currentPageIndexDocAttach() > 0) {
            self.currentPageIndexDocAttach(self.currentPageIndexDocAttach() - 1);
        }
    };

    self.firstPageDocAttach = function () {
        self.currentPageIndexDocAttach(0);
    };


    self.lastPageDocAttach = function () {
        countDocAttach = parseInt(self.filterDocAttachList().length / self.pageSizeDocAttach(), 10);
        if ((self.filterDocAttachList().length % self.pageSizeDocAttach()) == 0)
            self.currentPageIndexDocAttach(countDocAttach - 1);
        else
            self.currentPageIndexDocAttach(countDocAttach);
    };


    self.iconTypeComm = ko.observable("");

    self.sortTableDocAttach = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.DocAttachList.sort(function (left, right) {
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
        if (orderProp == 'Comm') self.iconTypeNameComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshDocAttach').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست پیوست ها") + " " + translate("به روز رسانی شود ؟"),
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
                getDocAttachList(serialNumber);
                $("div.loadingZone").hide();
            }
        })
    })




    localStorage.getItem("ATTACH") == "true" ? $('#attachFile').show() : $('#attachFile').hide()
    localStorage.getItem("NEW_ATTACH") == "true" ? $('#AddNewDocAttach').show() : $('#AddNewDocAttach').hide()

    $('#attachFile').click(function () {
        if (serialNumber > 0) {
            $('#modal-DocAttach').modal('show');
            getDocAttachList(serialNumber);

        }
        else
            showNotification(translate('ابتدا پرونده را ذخیره کنید'), 2);
    });

    self.selectDocAttach = function (item) {

        var fileName = item.FName.split(".");

        var DownloadAttachObject = {
            ProgName: 'ERJ1',
            Group: group,
            Year: salErj,
            ModeCode: '1',
            SerialNumber: item.SerialNumber,
            BandNo: item.BandNo,
            ByData: 1
        }

        ajaxFunction(DocAttachUri, 'POST', DownloadAttachObject, true).done(function (data) {
            var sampleArr = base64ToArrayBuffer(data[0].Atch);
            saveByteArray(fileName[0] + ".zip", sampleArr);
        });
    }

    self.DeleteDocAttach = function (Band) {
        Swal.fire({
            title: translate('تایید حذف'),
            text: translate("آیا پیوست انتخابی حذف شود ؟"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {

                Web_DocAttach_Save = {
                    SerialNumber: Band.SerialNumber,
                    ProgName: 'ERJ1',
                    ModeCode: 1,
                    BandNo: Band.BandNo,
                };

                ajaxFunction(ErjDocAttach_DelUri + aceErj + '/' + salErj + '/' + group, 'POST', Web_DocAttach_Save).done(function (response) {
                    getDocAttachList(serialNumber);
                    showNotification(translate('پیوست حذف شد'), 1);
                });
            }
        })
    };

    $("#AddNewDocAttach").on('click', function (e) {
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });

    this.fileUpload = function (data, e) {
        var dataFile;
        var file = e.target.files[0];
        var name = file.name;
        var size = file.size;
        Swal.fire({
            title: translate('تایید آپلود ؟'),
            text: translate("آیا") + ' ' + name + ' ' + translate("به پیوست افزوده شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                var file = document.getElementById("upload");

                fileFullName = file.files[0].name;
                fileData = fileFullName.split(".");
                fileName = fileData[0];
                fileType = '.' + fileData[1];

                var zip = new JSZip();


                zip.file('temp' + fileType, file.files[0]);
                zip.generateAsync({ type: "Blob", compression: "DEFLATE" }).then(function (content) {

                    var file = new File([content], fileFullName, { type: "zip" });

                    //file = $("#upload")[0].files[0];


                    attachDate = DateNow;

                    var formData = new FormData();

                    formData.append("SerialNumber", serialNumber);
                    formData.append("ProgName", "ERJ1");
                    formData.append("ModeCode", 1);
                    formData.append("BandNo", 0);
                    formData.append("Code", "");
                    formData.append("Comm", translate("مدرک پیوست") + ' - ' + attachDate + " - " + sessionStorage.userNameFa + " - " + fileName);
                    formData.append("FName", fileFullName);
                    formData.append("Atch", file);

                    ajaxFunctionUpload(ErjDocAttach_SaveUri + aceErj + '/' + salErj + '/' + group, formData, true).done(function (response) {
                        getDocAttachList(serialNumber);
                    })
                });
            }
        })



    };

    //del DocAttach  حذف پیوست
    function ErjDocAttach_Del(bandNoImput) {
        Web_DocAttach_Del = {
            SerialNumber: serialNumber,
            ProgName: '',
            ModeCode: '',
            BandNo: bandNoImput
        };
        ajaxFunction(ErjDocAttach_DelUri + aceErj + '/' + salErj + '/' + group, 'POST', Web_DocAttach_Del).done(function (response) {
        });
    };


    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }


































    $('#modal-Erja').on('shown.bs.modal', function () {
        idInsertCommErja = 'e_Result'
        $('#e_Result').css("height", "409px");
        $('#e_Result').val($('#Result').val());
        $('#nameErjBe').val(translate('انتخاب نشده'));
        $('#nameRoneveshtBe').val(translate('هیچکس'));
        $('#RjMhltDate').val('');
        $('#RjTime_M').val('');
        $('#RjTime_H').val('');
        $('#nameFarayand').val('');
        getFarayandList(doc_KhdtCode);
    });

    $('#modal-Erja').on('hide.bs.modal', function () {
        idInsertCommErja = null;
    });

    $('#saveErja').click(function () {

        natijeh = $("#e_Result").val();
        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();

        if (self.ErjUsersCode() == null) {
            return showNotification(translate('ارجاع شونده را انتخاب کنید'), 0);
        }

        if ((khdtHasTime == 1) && (rjTime_H == '' && rjTime_M == '' || rjTime_H == '0' && rjTime_M == '0')) {
            rjTime_H = '';
            rjTime_M = '';
            return showNotification(translate('زمان صرف شده را وارد کنید'), 0);
        }

        if (natijeh == '') {
            return showNotification(translate('متن ارجاع را وارد کنید'), 0);
        }

        ErjSaveDoc_BSave(0);

        if (counterErjUsersRonevesht > 0) {
            ErjSaveDoc_CSave(0, false);
        }

        getErjDocErja(serialNumber);
        $('#modal-Erja').modal('hide');
        list_ErjUsersRoneveshtSelect = new Array();
        counterErjUsersRonevesht = 0;
        $('#modal-ErjDocErja').modal('hide');
        $('#modal-ErjDocH').modal('hide');
        currentPage = self.currentPageIndexErjDocH();
        getErjDocH($('#pageCountSelector').val(), currentPage, self.StatusParvandehSelect(), self.DocYearsSelect(), '', false);
        self.sortTableErjDocH();

        //getErjDocH($('#pageCountSelector').val(), 0);
        //self.sortTableErjDocH();
    })


    //Add DocB  ذخیره ارجاعات
    function ErjSaveDoc_BSave(bandNoImput) {
        rjDate = DateNow;
        rjMhltDate = $("#RjMhltDate").val().toEnglishDigit();
        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();

        fromUserCode = sessionStorage.userName;
        toUserCode = self.ErjUsersCode();

        rjTime = 0;
        if (rjTime_H != '' || rjTime_M != '') {

            if (rjTime_M != '') {
                rjTime_M = parseInt(rjTime_M);
                rjTime_M = rjTime_M / 60;
            }
            else {
                rjTime_M = parseInt('0');
            }

            if (rjTime_H != '') {
                rjTime_H = parseInt(rjTime_H);
            }
            else {
                rjTime_H = parseInt("0");
            }


            rjTime = rjTime_H + rjTime_M;
        }


        var ErjSaveDoc_BSaveObject;
        if (bandNoImput == 0) { // erja
            natijeh = $("#e_Result").val();

            if (natijeh == '') {
                return showNotification(translate('متن ارجاع را وارد کنید'), 0);
            }
            getTimeServer();
            ErjSaveDoc_BSaveObject = {
                SerialNumber: serialNumber,
                Natijeh: natijeh,
                FromUserCode: fromUserCode,
                ToUserCode: toUserCode,
                RjDate: '',//rjDate,
                RjTime: rjTime,
                RjMhltDate: rjMhltDate,
                BandNo: bandNoImput,
                RjStatus: $("#m_StatusErja").val(),
                FarayandCode: self.FarayandCode(),
                RjHour: timeNow
            };
        }

        ajaxFunction(ErjSaveDoc_BSaveUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_BSaveObject).done(function (response) {
            $("#TableBodyListErjUsersRonevesht").empty();
        });
        flagInsertFdoch = 1;
        //getErjUsersList();
    };



    //Add DocC  ذخیره رونوشت
    function ErjSaveDoc_CSave() {
        rjDate = DateNow;
        // toUserCode = 1; // انتخاب شده ها برای رونوشت
        var notUsers = false;
        toUser = self.ErjUsersCode();
        fromUserCode = sessionStorage.userName;

        var obj = [];

        for (i = 1; i <= list_ErjUsersRoneveshtSelect.length; i++) {
            if (list_ErjUsersRoneveshtSelect[i - 1] != toUser) {
                tmp = {
                    'SerialNumber': serialNumber,
                    'BandNo': 1,
                    'Natijeh': '',
                    'ToUserCode': list_ErjUsersRoneveshtSelect[i - 1],
                    'RjDate': rjDate,
                    'RjTime': 0
                };
                obj.push(tmp);
            } else {
                notUsers = true;
            }
        }


        ajaxFunction(ErjSaveDoc_CSaveUri + aceErj + '/' + salErj + '/' + group, 'POST', obj).done(function (response) {
            $('#modal-Erja').modal('hide');
            $('#modal-ErjDocErja').modal('hide');
            $('#modal-ErjDocH').modal('hide');
        });
        flagInsertFdoch = 1;

        if (notUsers == true) {
            // showNotification('امکان رونوشت به کاربر اجاع شونده وجود', 0);
        }

    };


    self.ViewSpec = function (Band) {
        ViewSpec(Band.Spec)
    }

    self.ViewCustName = function (Band) {
        ViewCustName(Band.CustName)
    }


    self.ViewCommAttach = function (Band) {
        ViewCommAttach(Band.Comm)
    }

    $('#p_SpecialComm').click(function () {
        if (SpecialCommTrs == 1) {
            if ($("#p_SpecialComm").css('font-style') == 'italic') {
                $("#p_SpecialComm").attr('readonly', false);
                TextHighlightDel("#p_SpecialComm");
                $("#p_SpecialComm").val(specialComm);
            }
        }
        else if (access[0].TrsName != 'ADMIN')
            showNotification(translate('دسترسی ندارید'), 0);
    })


    $('#ShowEghdamComm').click(function () {
        $('#titleComm').text(translate('توضیحات اقدام'));
        $('#codeComm').text('EghdamComm');
        $('#modal-Comm').modal('show');
        $('#commPublic').val($('#p_EghdamComm').val());
    });

    $('#ShowDocDesc').click(function () {
        $('#titleComm').text(translate('توضیحات عمومی'));
        $('#modal-Comm').modal('show');
        $('#codeComm').text('DocDesc');
        $('#commPublic').val($('#p_DocDesc').val());
    });

    $('#ShowSpecialComm').click(function () {
        $('#codeComm').text('SpecialComm');
        if (SpecialCommTrs == 1) {
            if ($("#p_SpecialComm").css('font-style') == 'italic') {
                $("#p_SpecialComm").attr('readonly', false);
                TextHighlightDel("#p_SpecialComm");
                $("#p_SpecialComm").val(specialComm);
            }
            $('#titleComm').text(translate('توضیحات مدیران'));
            $('#modal-Comm').modal('show');
            $('#commPublic').attr("style", "");
            $('#commPublic').val($('#p_SpecialComm').val());
        }
        /*
        $('#titleComm').text('مدیران');
        $('#modal-Comm').modal('show');
        $('#commPublic').val($('#p_SpecialComm').val());*/
    });

    $('#ShowFinalComm').click(function () {
        $('#codeComm').text('FinalComm');
        $('#titleComm').text(translate('توضیحات نهایی'));
        $('#modal-Comm').modal('show');
        $('#commPublic').val($('#p_FinalComm').val());
    });




    $('#modal-Comm').on('hide.bs.modal', function () {
        codeComm = $('#codeComm').text();
        val = $('#commPublic').val();
        if (codeComm == "EghdamComm") {
            $('#p_EghdamComm').val(val)
        }

        else if (codeComm == "DocDesc") {
            $('#p_DocDesc').val(val)
        }

        else if (codeComm == "SpecialComm") {
            $('#p_SpecialComm').val(val)
        }

        else if (codeComm == "FinalComm") {
            $('#p_FinalComm').val(val)
        }

        $('#codeComm').text("");
    });









    $("#DocNoSearch").keydown(function (e) {
        if (e.keyCode == 13) {
            docnoSearch = $("#DocNoSearch").val();
            if (docnoSearch == '') {
                return showNotification(translate('شماره پرونده را وارد کنید'), 2);
            }
            ShowDataUpdate(docnoSearch);
        }
    });

    $("#btn_DocNoSearch").click(function (e) {
        docnoSearch = $("#DocNoSearch").val();
        if (docnoSearch == '') {
            return showNotification(translate('شماره پرونده را وارد کنید'), 2);
        }
        ShowDataUpdate(docnoSearch);
    });




    function ShowDataUpdate(docno) {


        var ErjDocHObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
            select: 3,
            AccessSanad: sessionStorage.AccessSanadErj,
            Sal: '',
            Status: '',
            DocNo: docno,
        };

        ajaxFunction(ErjDocHUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjDocHObject, true).done(function (response) {
            if (response.length == 0) {
                return showNotification(translate('پرونده یافت نشد'), 0);
            }

            if (response.length > 1) {
                return showNotification(translate('بیش از یک پرونده وجود دارد'), 0);
            }

            var data = response[0];

            useSanadOtherUser = false;

            testUseSanad = TestUseSanad(aceErj, salErj, "ErjDocH", data["SerialNumber"], true, data["DocNo"]);
            if (testUseSanad == true) {
                // showNotification('در تب دیگری وجود دارد', 0)
            }
            else {
                if (testUseSanad == null) {
                    useSanadOtherUser = true;
                }

                if (data.ShowDocTrs == 0) {
                    return showNotification(translate('شما به این پرونده دسترسی ندارید'), 0);
                }

                editDoc = data.EditDocTrs && localStorage.getItem("CHG_ErjDOC")
                editDoc == true || editDoc == "true" ? $("#P_Action").show() : $("#P_Action").hide();

                flag_Save = false;
                old_DocDate = data["DocDate"];
                old_MhltDate = data["MhltDate"];
                old_AmalDate = data["AmalDate"];
                old_EndDate = data["EndDate"];
                old_Spec = data["Spec"];
                old_CustCode = data["CustCode"];
                old_CustCode = data["CustCode"];
                old_KhdtCode = data["KhdtCode"];
                old_RelatedDocs = data["RelatedDocs"];
                old_Mahramaneh = data["Mahramaneh"];
                old_Status = data["Status"];


                self.p_DocDate(data["DocDate"]);
                self.p_MhltDate(data["MhltDate"]);
                self.p_AmalDate(data["AmalDate"]);
                self.p_EndDate(data["EndDate"]);

                self.p_Eghdam(data["Eghdam"]);
                self.p_Tanzim(data["Tanzim"]);

                self.p_EghdamName(data["EghdamName"]);
                self.p_TanzimName(data["TanzimName"]);
                self.p_Spec(data["Spec"]);
                self.ErjCustCode(data["CustCode"]);
                self.KhdtCode(data["KhdtCode"]);

                if (data["RelatedDocs"] == "0") {
                    $('#p_RelatedDocs').val('');
                    self.p_RelatedDocs("");
                }
                else {
                    $('#p_RelatedDocs').val(data["RelatedDocs"]);
                    self.p_RelatedDocs(data["RelatedDocs"]);
                }

                $('#p_docno').val(data["DocNo"]);
                $('#nameErjCust').val(data["CustName"]);
                $('#nameKhdt').val(data["KhdtName"]);

                $('#p_EghdamComm').val(data["EghdamComm"]);

                if (data["EghdamName"] == sessionStorage.userName)
                    $('#p_EghdamComm').attr('readonly', false);
                else
                    $('#p_EghdamComm').attr('readonly', true);

                $('#p_DocDesc').val(data["DocDesc"]);
                $('#p_SpecialComm').val(data["SpecialComm"]);
                $('#p_FinalComm').val(data["FinalComm"]);
                $('#p_Mahramaneh').val(data["Mahramaneh"]);
                $('#p_Status').val(data["Status"]);

                specialComm = data["SpecialComm"];
                SpecialCommTrs = data["SpecialCommTrs"];
                $("#p_SpecialComm").val(translate('برای نمایش کلیک کنید'));
                $("#p_SpecialComm").attr('readonly', true);
                TextHighlight("#p_SpecialComm");

                old_EghdamComm = $('#p_EghdamComm').val();
                old_DocDesc = $('#p_DocDesc').val();
                old_FinalComm = $('#p_FinalComm').val();
                old_SpecialComm = data["SpecialComm"];

                sessionStorage.F01 = data["F01"];
                sessionStorage.F02 = data["F02"];
                sessionStorage.F03 = data["F03"];
                sessionStorage.F04 = data["F04"];
                sessionStorage.F05 = data["F05"];
                sessionStorage.F06 = data["F06"];
                sessionStorage.F07 = data["F07"];
                sessionStorage.F08 = data["F08"];
                sessionStorage.F09 = data["F09"];
                sessionStorage.F10 = data["F10"];
                sessionStorage.F11 = data["F11"];
                sessionStorage.F12 = data["F12"];
                sessionStorage.F13 = data["F13"];
                sessionStorage.F14 = data["F14"];
                sessionStorage.F15 = data["F15"];
                sessionStorage.F16 = data["F16"];
                sessionStorage.F17 = data["F17"];
                sessionStorage.F18 = data["F18"];
                sessionStorage.F19 = data["F19"];
                sessionStorage.F20 = data["F20"];

                $("#ExtraFields01").val(sessionStorage.F01);
                $("#ExtraFields02").val(sessionStorage.F02);
                $("#ExtraFields03").val(sessionStorage.F03);
                $("#ExtraFields04").val(sessionStorage.F04);
                $("#ExtraFields05").val(sessionStorage.F05);
                $("#ExtraFields06").val(sessionStorage.F06);
                $("#ExtraFields07").val(sessionStorage.F07);
                $("#ExtraFields08").val(sessionStorage.F08);
                $("#ExtraFields09").val(sessionStorage.F09);
                $("#ExtraFields10").val(sessionStorage.F10);
                $("#ExtraFields11").val(sessionStorage.F11);
                $("#ExtraFields12").val(sessionStorage.F12);
                $("#ExtraFields13").val(sessionStorage.F13);
                $("#ExtraFields14").val(sessionStorage.F14);
                $("#ExtraFields15").val(sessionStorage.F15);
                $("#ExtraFields16").val(sessionStorage.F16);
                $("#ExtraFields17").val(sessionStorage.F17);
                $("#ExtraFields18").val(sessionStorage.F18);
                $("#ExtraFields19").val(sessionStorage.F19);
                $("#ExtraFields20").val(sessionStorage.F20);

                $("#ExtraFields01").val(data["F01"]);
                $("#ExtraFields02").val(data["F02"]);
                $("#ExtraFields03").val(data["F03"]);
                $("#ExtraFields04").val(data["F04"]);
                $("#ExtraFields05").val(data["F05"]);
                $("#ExtraFields06").val(data["F06"]);
                $("#ExtraFields07").val(data["F07"]);
                $("#ExtraFields08").val(data["F08"]);
                $("#ExtraFields09").val(data["F09"]);
                $("#ExtraFields10").val(data["F10"]);
                $("#ExtraFields11").val(data["F11"]);
                $("#ExtraFields12").val(data["F12"]);
                $("#ExtraFields13").val(data["F13"]);
                $("#ExtraFields14").val(data["F14"]);
                $("#ExtraFields15").val(data["F15"]);
                $("#ExtraFields16").val(data["F16"]);
                $("#ExtraFields17").val(data["F17"]);
                $("#ExtraFields18").val(data["F18"]);
                $("#ExtraFields19").val(data["F19"]);
                $("#ExtraFields20").val(data["F20"]);

                docBMode = data["DocBMode"];
                serialNumber = data["SerialNumber"];
                getErjResultList(serialNumber, null, null, null)
                getErjDocErja(serialNumber);


                if (self.ErjDocErja().length == 0) {
                    $('#ErjDocErja').removeAttr('hidden', '');

                    //$('#ErjDocErja').prop('disabled', false);
                }
                else {
                    $('#ErjDocErja').attr('hidden', '');
                    //$('#ErjDocErja').prop('disabled', true);
                }


                $('#saveErjDocH').removeAttr('hidden', '');
                $('#AddNewDocAttach').removeAttr('hidden', '');

                if (useSanadOtherUser == true) {
                    $('#saveErjDocH').attr('hidden', '');
                    $('#ErjDocErja').attr('hidden', '');
                    $('#AddNewDocAttach').attr('hidden', '');
                }

                $('#modal-ErjDocH').modal('show');
            }

        });
    }


   

    self.UpdateErjDocH = function (item) {

        serialNumber = item.SerialNumber;
        useSanadOtherUser = false;

        testUseSanad = TestUseSanad(aceErj, salErj, "ErjDocH", serialNumber, true, item.DocNo);
        if (testUseSanad == true) {
            // showNotification('در تب دیگری وجود دارد', 0)
        }
        else {
            if (testUseSanad == null) {
                useSanadOtherUser = true;
            }

            editDoc = item.EditDocTrs && localStorage.getItem("CHG_ErjDOC")
            editDoc == true || editDoc == "true" ? $("#P_Action").show() : $("#P_Action").hide();

            flag_Save = false;
            old_DocDate = item.DocDate;
            old_MhltDate = item.MhltDate;
            old_AmalDate = item.AmalDate;
            old_EndDate = item.EndDate;
            old_Spec = item.Spec;
            old_CustCode = item.CustCode;
            old_CustCode = item.CustCode;
            old_KhdtCode = item.KhdtCode;
            old_RelatedDocs = item.RelatedDocs;
            old_Mahramaneh = item.Mahramaneh;
            old_Status = item.Status;
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

            khdtHasTime = item.KhdtHasTime;

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
            doc_KhdtCode = item.KhdtCode;
            if (item.RelatedDocs == "0") {
                $('#p_RelatedDocs').val('');
                self.p_RelatedDocs("");
            }
            else {
                $('#p_RelatedDocs').val(item.RelatedDocs);
                self.p_RelatedDocs(item.RelatedDocs);
            }

            $('#p_docno').val(item.DocNo);
            $('#nameErjCust').val(item.CustName);
            $('#nameKhdt').val(item.KhdtName);

            $('#p_EghdamComm').val(item.EghdamComm);

            if (item.Eghdam == sessionStorage.userName)
                $('#p_EghdamComm').attr('readonly', false);
            else
                $('#p_EghdamComm').attr('readonly', true);

            $('#p_DocDesc').val(item.DocDesc);
            //$('#p_SpecialComm').val(item.SpecialComm);
            $('#p_FinalComm').val(item.FinalComm);
            $('#p_Mahramaneh').val(item.Mahramaneh);
            $('#p_Status').val(item.Status);

            specialComm = item.SpecialComm;
            SpecialCommTrs = item.SpecialCommTrs;
            $("#p_SpecialComm").val(translate('برای نمایش کلیک کنید'));
            $("#p_SpecialComm").attr('readonly', true);
            TextHighlight("#p_SpecialComm");

            old_EghdamComm = $('#p_EghdamComm').val();
            old_DocDesc = $('#p_DocDesc').val();
            old_FinalComm = $('#p_FinalComm').val();
            old_SpecialComm = item.SpecialComm;


            $("#ExtraFields01").val(sessionStorage.F01);
            $("#ExtraFields02").val(sessionStorage.F02);
            $("#ExtraFields03").val(sessionStorage.F03);
            $("#ExtraFields04").val(sessionStorage.F04);
            $("#ExtraFields05").val(sessionStorage.F05);
            $("#ExtraFields06").val(sessionStorage.F06);
            $("#ExtraFields07").val(sessionStorage.F07);
            $("#ExtraFields08").val(sessionStorage.F08);
            $("#ExtraFields09").val(sessionStorage.F09);
            $("#ExtraFields10").val(sessionStorage.F10);
            $("#ExtraFields11").val(sessionStorage.F11);
            $("#ExtraFields12").val(sessionStorage.F12);
            $("#ExtraFields13").val(sessionStorage.F13);
            $("#ExtraFields14").val(sessionStorage.F14);
            $("#ExtraFields15").val(sessionStorage.F15);
            $("#ExtraFields16").val(sessionStorage.F16);
            $("#ExtraFields17").val(sessionStorage.F17);
            $("#ExtraFields18").val(sessionStorage.F18);
            $("#ExtraFields19").val(sessionStorage.F19);
            $("#ExtraFields20").val(sessionStorage.F20);

            $("#ExtraFields01").val(item.F01);
            $("#ExtraFields02").val(item.F02);
            $("#ExtraFields03").val(item.F03);
            $("#ExtraFields04").val(item.F04);
            $("#ExtraFields05").val(item.F05);
            $("#ExtraFields06").val(item.F06);
            $("#ExtraFields07").val(item.F07);
            $("#ExtraFields08").val(item.F08);
            $("#ExtraFields09").val(item.F09);
            $("#ExtraFields10").val(item.F10);
            $("#ExtraFields11").val(item.F11);
            $("#ExtraFields12").val(item.F12);
            $("#ExtraFields13").val(item.F13);
            $("#ExtraFields14").val(item.F14);
            $("#ExtraFields15").val(item.F15);
            $("#ExtraFields16").val(item.F16);
            $("#ExtraFields17").val(item.F17);
            $("#ExtraFields18").val(item.F18);
            $("#ExtraFields19").val(item.F19);
            $("#ExtraFields20").val(item.F20);

            docBMode = item.DocBMode;
            serialNumber = item.SerialNumber;
            getErjResultList(serialNumber, null, null, null)
            getErjDocErja(serialNumber);


            if (self.ErjDocErja().length == 0) {
                $('#ErjDocErja').removeAttr('hidden', '');

                //$('#ErjDocErja').prop('disabled', false);
            }
            else {
                $('#ErjDocErja').attr('hidden', '');
                //$('#ErjDocErja').prop('disabled', true);
            }


            $('#saveErjDocH').removeAttr('hidden', '');
            $('#AddNewDocAttach').removeAttr('hidden', '');

            if (useSanadOtherUser == true) {
                $('#saveErjDocH').attr('hidden', '');
                $('#ErjDocErja').attr('hidden', '');
                $('#AddNewDocAttach').attr('hidden', '');
            }


            $('#modal-ErjDocH').modal('show');
        }
    }


    window.onbeforeunload = function () {
        RemoveUseSanad(aceErj, salErj, "ErjDocH", serialNumber, useSanadOtherUser == false );
    };


    //window.addEventListener("beforeunload", function (event) {
    //    a = 111;
    //});


    function getErjDocErja(serialNumber) {
        var ErjDocErjaObject = {
            SerialNumber: serialNumber,
        };
        ajaxFunction(ErjDocErjaUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjDocErjaObject).done(function (response) {
            self.ErjDocErja(response);
            SetDataErjDocErja();
        });
    }



    self.FilterErjValue = ko.observable("");
    self.FilterErj = ko.computed(function () {
        var filter = self.FilterErjValue();
        return ko.utils.arrayFilter(self.ErjDocErja(), function (item) {
            return item.BandNo == filter;
        });
    });


    function ConvertComm(comm) {
       /* var res = comm.split("\r\n");
        if (res.length == 1)
            var res = comm.split("\n");
        tempText = '';
        for (var i = 0; i < res.length; i++) {
            r = res[i] == "" ? "‍‍" : res[i];
            tempText += '<p>' + r + '</p> '
        }
        return tempText;*/

        var res = comm.replaceAll("\r\n", '<br>');
        return '<p>' + res + '</p>';
    }

    function SetDataErjDocErja() {
        list = self.ErjDocErja();
        $("#BodyErjDocH").empty();
        listLastBand = self.ErjResultList();
        if (list.length > 0) {
            listLastBand = self.ErjResultList();
            countBand = list[list.length - 1].BandNo;
            textLastBand = '';
            for (var j = 0; j < listLastBand.length; j++) {
                if (listLastBand[j].DocBMode == 0 && listLastBand[j].RjResult != '') {
                    /* textLastBand +=
                         '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                     textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('نتیجه ثبت شده توسط :') + '</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div > '*/
                }
                else if (listLastBand[j].DocBMode == 1) {
                    textLastBand +=
                        '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                    textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('رونوشت به :') + '</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div >'

                }


                if (listLastBand[j].RjResult == '') {
                    if (listLastBand[j].DocBMode > 0) {
                        textLastBand += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">' + "‍‍";
                        textLastBand += ' </div> ';
                    }
                }
                else if (listLastBand[j].DocBMode != 0) {
                    textLastBand += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                    textLastBand += ConvertComm(listLastBand[j].RjResult);
                    textLastBand += ' </div> ';
                }


            }

            for (var i = 1; i <= countBand; i++) {

                self.FilterErjValue(i);
                listBand = self.FilterErj();
                text = ConvertComm(listBand[0].RjComm);

                countRonevesht = listBand.length

                if (countRonevesht > 1) {
                    // text += ' <br\> '
                }

                for (var j = 1; j < countRonevesht; j++) {
                    text +=
                        '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                        + '   <div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('نتیجه رونوشت از :') + '</h6> <h6>' + listBand[j].FromUserName + '</h6>'
                        + '   </div>'
                        + '</div > '
                    if (listBand[j].RjComm == '')
                        text += ' <div style="margin: 0px 15px 0px 0px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">' + "‍‍";
                    else {
                        text += ' <div style="margin: 0px 15px 0px 0px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                        text += ConvertComm(listBand[j].RjComm);
                    }
                    text += ' </div> ';
                }



                if (listBand[0].RooneveshtUsers != '' && i < countBand) {

                    text += ''//'</br>'
                        + '  <div style="padding: 3px;margin: 0px 10px 0px 0px;background-color: #d9d9d9 !important;color: #555555;border-radius: 10px;">'
                        + '   <div class=" form-inline" > <h6>' + translate(' رونوشت به : ')
                        + listBand[0].RooneveshtUsers
                        + '</h6>'
                        + '</div > '
                    text += ' </div> ';
                }


                textBody =
                    '<div style="border-top: 0px solid #fff !important;">'
                    + '    <div>'
                    + '        <div class="cardErj">'
                    + '            <div class="header" style="background-color: #f5d3b4;padding-right: 3px;padding-left: 0px;">'
                    + '<div class="form-inline"> '
                    + '     <div class= "col-md form-inline" > '
                    + '         <h6 style="font-size: 11px;">' + i + ') ' + listBand[0].FromUserName + '</h6>'
                    + '         <img src="/Content/img/new item/arrow-back-svgrepo-com.svg" style="width: 11px;margin-left: 0px; margin-right: 0px;" /> '
                    + '         <h6 style="font-size: 11px;">' + listBand[0].ToUserName + '</h6> '
                    + '     </div>'

                + '     <div class="col-md form-inline"  style="direction:ltr"> '
                + '         <h6 >' + listBand[0].RjDate + '</h6> '
                + '         <h6 style="padding-left: 5px;">' + listBand[0].RjTimeSt + '</h6> '
                + '         <h6 style="padding-left: 5px;">' + listBand[0].RjHour + '</h6> '
                + '     </div> '


                    + '</div>';



                if (listBand[0].FarayandName != "") {
                    textBody += '<div class="form-inline" style = "margin-top: 5px;"> '
                        + '     <div class= "col-md-12 form-inline" > '
                        + '         <h6>' + translate('فرایند : ') + listBand[0].FarayandName + '</h6>'
                        + '     </div>'
                        + '</div>';
                }


                textBody += '</div>'
                    + '<div class="body" style="padding:5px;">';

                textBody += text
                if (i == countBand)
                    textBody += textLastBand

                textBody += '</div>'
                    + '        </div>'
                    + '    </div>'
                    + '</div>'

                $('#BodyErjDocH').append(textBody);
            }
            if (i > 0)
                bandNo = i
            else
                bandNo = 1;
        }
    }

    $("#modal-ErjDocH").on('shown.bs.modal', function () {
        $("#commPublic").prop("readonly", false);
        setTimeout(function () {
            var element = document.getElementById("BodyErjDocH");
            element.scrollTop = element.scrollHeight;
        }, 100);
    });




    $("#Close_ModalErjDocH").click(function (e) {

        if (flag_Save == false && (editDoc == true || editDoc == "true") && useSanadOtherUser == false) {


            if ($("#p_SpecialComm").css('font-style') == 'italic')
                special = specialComm;
            else
                special = $("#p_SpecialComm").val();

            flag_IsChange1 = ($("#p_DocDate").val().toEnglishDigit() != old_DocDate);
            flag_IsChange2 = ($("#p_MhltDate").val().toEnglishDigit() != old_MhltDate);
            flag_IsChange3 = ($("#p_AmalDate").val().toEnglishDigit() != old_AmalDate);
            flag_IsChange4 = ($("#p_EndDate").val().toEnglishDigit() != old_EndDate);
            flag_IsChange5 = (self.ErjCustCode() != old_CustCode);
            flag_IsChange6 = (self.KhdtCode() != old_KhdtCode);
            flag_IsChange7 = ($("#p_Status").val() != old_Status);
            flag_IsChange8 = (self.p_Spec() != old_Spec);
            flag_IsChange9 = ($("#p_EghdamComm").val() != old_EghdamComm);
            flag_IsChange10 = (special != old_SpecialComm);
            flag_IsChange11 = ($("#p_DocDesc").val() != old_DocDesc);
            flag_IsChange12 = ($("#p_FinalComm").val() != old_FinalComm);
            flag_IsChange13 = ($("#p_RelatedDocs").val() != old_RelatedDocs);
            flag_IsChange14 = ($("#p_Mahramaneh").val() != old_Mahramaneh);
            flag_IsChange15 = (($("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val()) != sessionStorage.F01);
            flag_IsChange16 = (($("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val()) != sessionStorage.F02);
            flag_IsChange17 = (($("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val()) != sessionStorage.F03);
            flag_IsChange18 = (($("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val()) != sessionStorage.F04);
            flag_IsChange19 = (($("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val()) != sessionStorage.F05);
            flag_IsChange20 = (($("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val()) != sessionStorage.F06);
            flag_IsChange21 = (($("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val()) != sessionStorage.F07);
            flag_IsChange22 = (($("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val()) != sessionStorage.F08);
            flag_IsChange23 = (($("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val()) != sessionStorage.F09);
            flag_IsChange24 = (($("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val()) != sessionStorage.F10);
            flag_IsChange25 = (($("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val()) != sessionStorage.F11);
            flag_IsChange26 = (($("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val()) != sessionStorage.F12);
            flag_IsChange27 = (($("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val()) != sessionStorage.F13);
            flag_IsChange28 = (($("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val()) != sessionStorage.F14);
            flag_IsChange29 = (($("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val()) != sessionStorage.F15);
            flag_IsChange30 = (($("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val()) != sessionStorage.F16);
            flag_IsChange31 = (($("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val()) != sessionStorage.F17);
            flag_IsChange32 = (($("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val()) != sessionStorage.F18);
            flag_IsChange33 = (($("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val()) != sessionStorage.F19);
            flag_IsChange34 = (($("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val()) != sessionStorage.F20);



            if (flag_IsChange1 || flag_IsChange2 || flag_IsChange3 || flag_IsChange4 || flag_IsChange5 || flag_IsChange6 ||
                flag_IsChange7 || flag_IsChange8 || flag_IsChange9 || flag_IsChange10 || flag_IsChange11 ||
                flag_IsChange12 || flag_IsChange13 || flag_IsChange14 || flag_IsChange15 || flag_IsChange16 ||
                flag_IsChange17 || flag_IsChange18 || flag_IsChange19 || flag_IsChange20 || flag_IsChange21 ||
                flag_IsChange22 || flag_IsChange23 || flag_IsChange24 || flag_IsChange25 || flag_IsChange26 ||
                flag_IsChange27 || flag_IsChange28 || flag_IsChange29 || flag_IsChange30 || flag_IsChange31 ||
                flag_IsChange32 || flag_IsChange33 || flag_IsChange34) {


                Swal.fire({
                    title: translate('ثبت تغییرات'),
                    text: translate("پرونده تغییر کرده است آیا ذخیره شود ؟"),
                    type: 'warning',

                    showCancelButton: true,
                    cancelButtonColor: '#3085d6',
                    cancelButtonText: text_No,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText: text_Yes,
                    showDenyButton: true,
                    showCancelButton: true
                }).then((result) => {
                    if (result.value == true) {
                        ErjSaveDoc_HI();
                        $('#modal-ErjDocH').modal('hide');
                    } else if (result.dismiss == "cancel") {
                        $('#modal-ErjDocH').modal('hide');
                    }
                })



            }
            else {
                $('#modal-ErjDocH').modal('hide');
            }
        } else {
            $('#modal-ErjDocH').modal('hide');
        }


    });

    $("#modal-ErjDocH").on('hide.bs.modal', function () {
        $("#commPublic").prop("readonly", true);
        RemoveUseSanad(aceErj, salErj, "ErjDocH", serialNumber, useSanadOtherUser == false);

        if (DocNoReport != "null" && DocNoReport != null) {
            close();
        }

    });


    self.ShowAction = function (DeleteDocTrs) {
        if (localStorage.getItem("DEL_ErjDOC") == 'true' && DeleteDocTrs == 1)
            return true;
        else
            return false;
    }


    self.ShowActionUpdate = function (ShowDocTrs, EditDocTrs) {

        // if (localStorage.getItem("CHG_ErjDOC") == 'true' && EditDocTrs == 1)
        if ((localStorage.getItem("CHG_ErjDOC") == 'true' && EditDocTrs == 1) || ShowDocTrs == 1)
            return true;
        else
            return false;
    }


    self.ShowDeleteDocAttach = function () {
        if (self.p_Eghdam() == sessionStorage.userName) {
            if (localStorage.getItem("DEL_ATTACH") == "true") {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }

    self.ShowViewDocAttach = function () {
        if (localStorage.getItem("VIEW_ATTACH") == "true") {
            return true;
        }
        else
            return false;
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
            '<th>' + translate('ردیف') + '</th>' +
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
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            '<tbody data-bind="foreach: currentPageErjDocH" data-dismiss="modal" style="cursor: default;">' +
            '    <tr data-bind="event:{dblclick: $root.UpdateErjDocH} ,click: $parent.selectErjDocH , css: { matched: $data === $root.firstMatch() },' +
            '       style: {color: Status == \'پایان یافته\'  ? ' +
            '\'#15a01b\'' +
            ': Status == \'باطل\' ? \'red\' : DocBExists == \'0\'  ? \'#673ab7\' : \'\' }">' +

            /* '<td style="background-color: ' + colorRadif + ';">' +
             //<div style="display: flex; padding-top: 5px;">
             //'<span data-bind="text: $root.radif($index()) "> </span> ' +
             '<i data-bind="style: {\'display\': DocBExists == \'1\'  ? \'none\' : \'unset\'}" class="material-icons" style="color: #3f4d58;font-size:9px">lens</i>' +//   <span data-bind="text: RjReadSt == \'T\' ? \'X\' : null"></span> ' +
             '</td>' +
             */
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('DocNo', 0, 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, 0, data) +
            CreateTableTd('MahramanehName', 0, 0, 0, data) +
            CreateTableTd('Eghdam', 0, 0, 0, data) +
            CreateTableTd('Tanzim', 0, 0, 0, data) +
            CreateTableTd('AmalDate', 0, 0, 0, data) +
            CreateTableTd('MhltDate', 0, 6, 0, data) +
            CreateTableTd('EndDate', 0, 0, 0, data) +
            CreateTableTd('CustCode', 0, 0, '#f2f2f2', data) +
            CreateTableTd('CustName', 0, 4, '#f2f2f2', data) +
            CreateTableTd('Status', 0, 0, 0, data) +
            CreateTableTd('Spec', 0, 4, 0, data) +
            CreateTableTd('KhdtName', 0, 0, '#f2f2f2', data) +
            CreateTableTd('SerialNumber', 0, 0, 0, data) +
            CreateTableTd('F01', 0, 4, 0, data) +
            CreateTableTd('F02', 0, 4, 0, data) +
            CreateTableTd('F03', 0, 4, 0, data) +
            CreateTableTd('F04', 0, 4, 0, data) +
            CreateTableTd('F05', 0, 4, 0, data) +
            CreateTableTd('F06', 0, 4, 0, data) +
            CreateTableTd('F07', 0, 4, 0, data) +
            CreateTableTd('F08', 0, 4, 0, data) +
            CreateTableTd('F09', 0, 4, 0, data) +
            CreateTableTd('F10', 0, 4, 0, data) +
            CreateTableTd('F11', 0, 4, 0, data) +
            CreateTableTd('F12', 0, 4, 0, data) +
            CreateTableTd('F13', 0, 4, 0, data) +
            CreateTableTd('F14', 0, 4, 0, data) +
            CreateTableTd('F15', 0, 4, 0, data) +
            CreateTableTd('F16', 0, 4, 0, data) +
            CreateTableTd('F17', 0, 4, 0, data) +
            CreateTableTd('F18', 0, 4, 0, data) +
            CreateTableTd('F19', 0, 4, 0, data) +
            CreateTableTd('F20', 0, 4, 0, data) +
            '<td>' +
            '   <a id="UpdateErjDocH" data-bind="click: $root.UpdateErjDocH, visible: $root.ShowActionUpdate(ShowDocTrs,EditDocTrs) , attr: {title:text_Update}">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteErjDocH" data-bind="click: $root.DeleteErjDocH, visible: $root.ShowAction(DeleteDocTrs) , attr: {title:text_Delete}">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td style="background-color: #efb683;"></td>' +
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
            '<td style="background-color: #efb683;"></td>' +
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

        shamsiDateTemp = "\'" + DateNow + "\'";

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

            case 6:
                text += 'data-bind="text: ' + field + ',style: { color: ' + field + ' < ' + shamsiDateTemp + '   ? \'red\' : \'\'}"></td>';
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


    document.onkeydown = function (e) {
        if (e.ctrlKey) {
            if ($('#AddNewErjDocH').css('display') != 'none') {
                if (e.keyCode == key_Insert)
                    AddNewSanad();
            }
        }
        else if (e.altKey) {
        }
        else if (e.shiftKey) {

        }
        else {
            if (e.keyCode == key_F2 && $('#modal-ErjDocH').is(':visible')) {
                ErjSaveDoc_HI();
            }
            if (e.keyCode == key_Esc && $('#modal-ErjDocH').is(':visible')) {
                $('#modal-ErjDocH').modal('hide');
            }
        }
    };

    self.PageIndexDocAttach = function (item) {
        return CountPage(self.filterDocAttachList(), self.pageSizeDocAttach(), item);
    };

    self.PageIndexErjUsers = function (item) {
        return CountPage(self.filterErjUsersList(), self.pageSizeErjUsers(), item);
    };


    self.PageIndexErjUsersRonevesht = function (item) {
        return CountPage(self.filterErjUsersRoneveshtList(), self.pageSizeErjUsersRonevesht(), item);
    };
    
    self.PageIndexFarayand = function (item) {
        return CountPage(self.filterFarayandList(), self.pageSizeFarayand(), item);
    };
    
    self.PageIndexStatements = function (item) {
        return CountPage(self.filterStatementsList(), self.pageSizeStatements(), item);
    };  
    
    self.PageIndexErjDocH = function (item) {
        return CountPage(self.filterErjDocHList(), self.pageSizeErjDocH(), item);
    }; 
    
    self.PageIndexKhdt = function (item) {
        return CountPage(self.filterKhdtList(), self.pageSizeKhdt(), item);
    };  
    
    self.PageIndexErjCust = function (item) {
        return CountPage(self.filterErjCustList(), self.pageSizeErjCust(), item);
    }; 
    
    self.PageIndexRelatedDocs = function (item) {
        return CountPage(self.filterRelatedDocsList(), self.pageSizeRelatedDocs(), item);
    };

};

ko.applyBindings(new ViewModel());

