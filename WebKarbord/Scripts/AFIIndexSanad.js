var ViewModel = function () {
    var self = this;

    var flagupdateHeader = 0;

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها
    self.ADocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش  
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.ADocPList = ko.observableArray([]); // لیست ویوی چاپ 
    self.TestADoc_DeleteList = ko.observableArray([]); // لیست تست حذف 

    DocNoReport = localStorage.getItem("DocNoAFISanad");
    if (DocNoReport != "null" && DocNoReport != null) {

        localStorage.setItem("ModeCode", "ADOC");
    }


    if (sessionStorage.ModeCode == null || ShowNewTab != "ShowNewTab") {
        sessionStorage.lastPageSelect = localStorage.getItem("lastPageSelect");
        sessionStorage.ModeCode = localStorage.getItem("ModeCode");

        if (sessionStorage.ModeCode == 'ADOC') {
            validation = CheckAccess('NEW_ADOC');// new Sanad Hesab
            //validation == true ? $("#AddNewSanad").show() : $("#AddNewSanad").hide();
            validation == true ? sessionStorage.NEW_ADOC = true : sessionStorage.NEW_ADOC = false;//localStorage.setItem("NEW_ADOC", "true") : localStorage.setItem("NEW_ADOC", "false");

            localStorage.setItem("moveSanad", validation);
            sessionStorage.moveSanad = validation;

            validation = CheckAccess('CHG_ADOC');// edit Sanad Hesab
            validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")
            validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
            validation == true ? $("#UpdateSanad").show() : $("#UpdateSanad").hide()

            validation = CheckAccess('DEL_ADOC'); // delete Sanad Hesab
            //validation == true ? $("#DeleteSanad").show() : $("#DeleteSanad").hide()

            validation == true ? sessionStorage.DEL_ADOC = true : sessionStorage.DEL_ADOC = false
            validation == true ? localStorage.setItem("DEL_ADOC", "true") : localStorage.setItem("DEL_ADOC", "false")


            validation = CheckAccess('TAEED_ADOC');// AccessTaeed
            validation == true ? sessionStorage.Access_TAEED_ADOC = true : sessionStorage.Access_TAEED_ADOC = false
            validation == true ? localStorage.setItem("Access_TAEED_ADOC", "true") : localStorage.setItem("Access_TAEED_ADOC", "false")

            validation = CheckAccess('DAEM_ADOC');// AccessDaem
            validation == true ? sessionStorage.Access_DAEM_ADOC = true : sessionStorage.Access_DAEM_ADOC = false
            validation == true ? localStorage.setItem("Access_DAEM_ADOC", "true") : localStorage.setItem("Access_DAEM_ADOC", "false")

            validation = CheckAccess('OTHERUSER_VIEW_ADOC');
            validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
            validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")

            validation = CheckAccess('PRN_ADOC'); // Print Sanad Hesab
            validation == true ? sessionStorage.AccessPrint_SanadHesab = true : sessionStorage.AccessPrint_SanadHesab = false
            validation == true ? localStorage.setItem("AccessPrint_SanadHesab", "true") : localStorage.setItem("AccessPrint_SanadHesab", "false")


            validation = CheckAccess('OTHERUSER_CHG_ADOC');// AccessViewADoc
            if (validation == true) {
                sessionStorage.AccessViewSanad = true;
                localStorage.setItem("AccessViewSanad", "true");
            }
            else {
                sessionStorage.AccessViewSanad = false;
                localStorage.setItem("AccessViewSanad", "false");
            }
        }

    }

    self.StatusSanad = ko.observable();

    sessionStorage.BeforeMoveSanad = false;

    sessionStorage.NEW_ADOC == "true" ? $("#AddNewSanad").show() : $("#AddNewSanad").hide();

    TestUser();

    var ADocHUri = server + '/api/ADocData/ADocH/'; // آدرس لیست سند ها 
    var ADocHiUri = server + '/api/AFI_ADocHi/'; // آدرس هدر های سند 
    var AMoveSanadUri = server + '/api/ADocData/MoveSanad/'; // آدرس انتقال اسناد ها 
    var AChangeStatusUri = server + '/api/ADocData/ChangeStatus/'; // آدرس تغییر وضعیت اسناد 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 
    var ADocPUri = server + '/api/ADocData/ADocP/'; // آدرس ویوی چاپ سند 
    var ADoc_DeleteUri = server + '/api/ADocData/TestADoc_Delete/'; // آدرس تست حذف 
    var TestADoc_NewUri = server + '/api/ADocData/TestADoc_New/'; // آدرس تست ایجاد  
    var TestADoc_EditUri = server + '/api/ADocData/TestADoc_Edit/'; // آدرس تست ویرایش 

    var allSearchADocH = true;
    var docDate;
    var serial;


    //DocNoReport = localStorage.getItem("DocNoAFISanad");
    


    var accessTaeed = localStorage.getItem("Access_TAEED_ADOC") == 'true'
    var accessDaem = localStorage.getItem("Access_DAEM_ADOC") == 'true'



    var rprtId = 'ADocH';
    var columns = [
        'DocNo',
        'DocDate',
        'Spec',
        'Eghdam',
        'Tanzim',
        'Taeed',
        'ModeName',
        'Status',
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
        ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            self.SettingColumnList(data);
            //ListColumns = data;
            if (FlagSetting) {
                CreateTableReport(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }


            ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + 'ADocP' + '/' + username, 'GET').done(function (data) {
                ListColumns = data;
            });

        });

    }

    //Get RprtColsDefult List
    function getRprtColsDefultList() {
        ajaxFunction(RprtColsDefultUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }


    //Get ADocP List
    function getADocP(serialNumber) {
        ajaxFunction(ADocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.ADocPList(data);
        });
    }


    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/AFISanad/index", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    $('#modal-SettingColumn').on('show.bs.modal', function () {
        counterColumn = 0;
        getRprtColsList(false, localStorage.getItem("userName"));
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
        SaveColumn(ace, sal, group, rprtId, "/AFISanad/index", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    if (DocNoReport == "null") {
        getRprtColsList(true, localStorage.getItem("userName"));
    }




    //Get ADocH 
    function getADocH(select, changeSelector) {
        lastSelect = select;
        sort = localStorage.getItem("sortAdocH");
        sortType = localStorage.getItem("sortTypeAdocH");

        var ADocHObject = {
            Select: select,
            User: sessionStorage.userName,
            AccessSanad: localStorage.getItem("AccessSanad"),
            Sort: sort,
            SerialNumber : "",
            ModeSort: sortType == "ascending" ? "ASC" : "DESC"
        }

        ajaxFunction(ADocHUri + ace + '/' + sal + '/' + group, 'POST', ADocHObject).done(function (data) {
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.ADocHList(data);
        });


        if (sort == "" || sort == "null" || sort == null) {
            sort = "DocDate";
            sortType = "descending";
        }

        if (sort == "SortDocNo") {
            sort = "DocNo"
        }

        if (changeSelector == false) {
            TextField = FindTextField(sort, self.SettingColumnList());
            $('#pageCountSelector').empty();
            select = document.getElementById('pageCountSelector');
            for (var i = 1; i <= 2; i++) {
                opt = document.createElement('option');
                if (i == 1) {
                    opt.value = 0;
                    if (sortType == "descending")
                        textSort = '100 رکورد  آخر به ترتیب ';
                    else
                        textSort = '100 رکورد اول به ترتیب ';

                    opt.innerHTML = ' ' + textSort + '"' + TextField + '"';
                }
                if (i == 2) {
                    opt.value = 3;
                    opt.innerHTML = 'تمام رکوردها';
                }
                select.appendChild(opt);
            }
            $('#pageCountSelector').val(lastSelect);
        }

       /* ajaxFunction(ADocHUri + ace + '/' + sal + '/' + group + '/top' + select + '/' + localStorage.getItem("userName") + '/' + localStorage.getItem("AccessSanad"), 'GET').done(function (data) {
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.ADocHList(data);
        });*/
    }











    //Get Status List
    function getStatusList() {
        list = localStorage.getItem('AccStatus');
        if (list != null ) {
            list = JSON.parse(localStorage.getItem('AccStatus'));
            self.StatusList(list)
        }
        else {
            progName = getProgName('A');
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
                self.StatusList(data);
                localStorage.setItem("AccStatus", JSON.stringify(data));
            });
        }
    }



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

        if (accessDaem == false && selectStatus == 'دائم') {
            $("#status").val(lastStatus);
            return showNotification('دسترسی دائم ندارید', 0);
        }

    });
    self.ChangeStatusSanad = function (item) {
        serial = item.SerialNumber;

        var closedDate = false;

        var TestADoc_EditObject = {
            Serialnumber: serial
        }

        ajaxFunction(TestADoc_EditUri + ace + '/' + sal + '/' + group, 'POST', TestADoc_EditObject, false).done(function (data) {
            list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                if (list[i].TestName == "YTrs") {
                    closedDate = true;
                    return showNotification(list[i].TestCap, 0);
                }
            }
        });

        if (closedDate == false) {
            sessionStorage.Status = item.Status;
            self.StatusSanad(item.Status);
            $('#titleChangeStatus').text(' تغییر وضعیت سند ' + item.DocNo + ' به ');
            $('#modal-ChangeStatusSanad').modal();
        }
    }


    $('#ChangeStatus').click(function () {
        var StatusChangeObject = {
            DMode: 0,
            UserCode: localStorage.getItem("userName"),
            SerialNumber: serial,
            Status: self.StatusSanad(),
        };
        $('#modal-ChangeStatusSanad').modal('hide');
        showNotification('در حال تغییر وضعیت لطفا منتظر بمانید', 1);

        ajaxFunction(AChangeStatusUri + ace + '/' + sal + '/' + group, 'POST', StatusChangeObject).done(function (response) {
            item = response;
            currentPage = self.currentPageIndexADocH();
            getADocH($('#pageCountSelector').val(),false);
            self.sortTableADocH();
            self.currentPageIndexADocH(currentPage);
        });

    });



    getStatusList();

    if (DocNoReport == "null") {
        getADocH($('#pageCountSelector').val(), false);
    }

    //------------------------------------------------------
    self.currentPageADocH = ko.observable();

    pageSizeADocH = localStorage.getItem('pageSizeADocH') == null ? 10 : localStorage.getItem('pageSizeADocH');
    self.pageSizeADocH = ko.observable(pageSizeADocH);

    self.currentPageIndexADocH = ko.observable(0);

    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterTanzim = ko.observable("");
    self.filterTaeed = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterStatus = ko.observable("");
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

    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterDocNo(listFilter[0]);
        self.filterDocDate(listFilter[1]);
        self.filterSpec(listFilter[2]);
        self.filterEghdam(listFilter[3]);
        self.filterTanzim(listFilter[4]);
        self.filterTaeed(listFilter[5]);
        self.filterModeName(listFilter[6]);
        self.filterStatus(listFilter[7]);
        self.filterSerialNumber(listFilter[8]);
        self.filterF01(listFilter[9]);
        self.filterF02(listFilter[10]);
        self.filterF03(listFilter[11]);
        self.filterF04(listFilter[12]);
        self.filterF05(listFilter[13]);
        self.filterF06(listFilter[14]);
        self.filterF07(listFilter[15]);
        self.filterF08(listFilter[16]);
        self.filterF09(listFilter[17]);
        self.filterF10(listFilter[18]);
        self.filterF11(listFilter[19]);
        self.filterF12(listFilter[20]);
        self.filterF13(listFilter[21]);
        self.filterF14(listFilter[22]);
        self.filterF15(listFilter[23]);
        self.filterF16(listFilter[24]);
        self.filterF17(listFilter[25]);
        self.filterF18(listFilter[26]);
        self.filterF19(listFilter[27]);
        self.filterF20(listFilter[28]);
    }

    self.filterADocHList = ko.computed(function () {
        self.currentPageIndexADocH(0);
        var filterDocNo = self.filterDocNo();
        var filterDocDate = self.filterDocDate();
        var filterSpec = self.filterSpec();
        var filterEghdam = self.filterEghdam().toUpperCase();
        var filterTanzim = self.filterTanzim().toUpperCase();
        var filterTaeed = self.filterTaeed().toUpperCase();
        var filterModeName = self.filterModeName();
        var filterStatus = self.filterStatus();
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


        if (!filterDocNo && !filterDocDate && !filterSpec && !filterEghdam && !filterTanzim && !filterTaeed && !filterModeName &&
            !filterStatus && !filterSerialNumber &&
            !filterF01 && !filterF02 && !filterF03 && !filterF04 && !filterF05 && !filterF06 && !filterF07 && !filterF08 && !filterF09 && !filterF10 &&
            !filterF11 && !filterF12 && !filterF13 && !filterF14 && !filterF15 && !filterF16 && !filterF17 && !filterF18 && !filterF19 && !filterF20) {
            $("#CountRecord").text(self.ADocHList().length);
            // $('#CountRecord').text(CountTable('ADocH', null, null));
            sessionStorage.setItem('listFilter', null);
            return self.ADocHList();
        } else {
            listFilter = [
                filterDocNo,
                filterDocDate,
                filterSpec,
                filterEghdam,
                filterTanzim,
                filterTaeed,
                filterModeName,
                filterStatus,
                filterSerialNumber,
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
            //list = JSON.parse(sessionStorage.getItem('listFilter'));
            tempData = ko.utils.arrayFilter(self.ADocHList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                    (item.DocDate == null ? '' : item.DocDate.toString().search(filterDocDate) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Eghdam == null ? 'null' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.Tanzim == null ? 'null' : item.Tanzim.toString().search(filterTanzim) >= 0) &&
                    (item.Taeed == null ? 'null' : item.Taeed.toString().search(filterTaeed) >= 0) &&
                    (item.ModeName == null ? 'null' : item.ModeName.toString().search(filterModeName) >= 0) &&
                    (item.Status == null ? 'null' : item.Status.toString().search(filterStatus) >= 0) &&
                    ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filterSerialNumber) &&
                    (item.F01 == null ? 'null' : item.F01.toString().search(filterF01) >= 0) &&
                    (item.F02 == null ? 'null' : item.F02.toString().search(filterF02) >= 0) &&
                    (item.F03 == null ? 'null' : item.F03.toString().search(filterF03) >= 0) &&
                    (item.F04 == null ? 'null' : item.F04.toString().search(filterF04) >= 0) &&
                    (item.F05 == null ? 'null' : item.F05.toString().search(filterF05) >= 0) &&
                    (item.F06 == null ? 'null' : item.F06.toString().search(filterF06) >= 0) &&
                    (item.F07 == null ? 'null' : item.F07.toString().search(filterF07) >= 0) &&
                    (item.F08 == null ? 'null' : item.F08.toString().search(filterF08) >= 0) &&
                    (item.F09 == null ? 'null' : item.F09.toString().search(filterF09) >= 0) &&
                    (item.F10 == null ? 'null' : item.F10.toString().search(filterF10) >= 0) &&
                    (item.F11 == null ? 'null' : item.F11.toString().search(filterF11) >= 0) &&
                    (item.F12 == null ? 'null' : item.F12.toString().search(filterF12) >= 0) &&
                    (item.F13 == null ? 'null' : item.F13.toString().search(filterF13) >= 0) &&
                    (item.F14 == null ? 'null' : item.F14.toString().search(filterF14) >= 0) &&
                    (item.F15 == null ? 'null' : item.F15.toString().search(filterF15) >= 0) &&
                    (item.F16 == null ? 'null' : item.F16.toString().search(filterF16) >= 0) &&
                    (item.F17 == null ? 'null' : item.F17.toString().search(filterF17) >= 0) &&
                    (item.F18 == null ? 'null' : item.F18.toString().search(filterF18) >= 0) &&
                    (item.F19 == null ? 'null' : item.F19.toString().search(filterF19) >= 0) &&
                    (item.F20 == null ? 'null' : item.F20.toString().search(filterF20) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }
    });



    self.search = ko.observable("");
    self.search(sessionStorage.searchADocH);
    self.firstMatch = ko.dependentObservable(function () {
        var indexADocH = 0;
        sessionStorage.searchADocH = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexADocH(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.ADocHList(), function (item) {
                indexADocH += 1;
                return item.SerialNumber == search;
                //return ko.utils.stringStartsWith(item.SortDocNo.toString(), search);
            });
            if (indexADocH < self.pageSizeADocH())
                self.currentPageIndexADocH(0);
            else {
                var a = Math.round((indexADocH / self.pageSizeADocH()), 0);
                if (a < (indexADocH / self.pageSizeADocH())) a += 1;
                self.currentPageIndexADocH(a - 1);
            }
            return value;
        }
    });

    self.currentPageADocH = ko.computed(function () {
        var pageSizeADocH = parseInt(self.pageSizeADocH(), 10),
            startIndex = pageSizeADocH * self.currentPageIndexADocH(),
            endIndex = startIndex + pageSizeADocH;
        localStorage.setItem('pageSizeADocH', pageSizeADocH);
        return self.filterADocHList().slice(startIndex, endIndex);
    });

    self.nextPageADocH = function () {
        if (((self.currentPageIndexADocH() + 1) * self.pageSizeADocH()) < self.filterADocHList().length) {
            self.currentPageIndexADocH(self.currentPageIndexADocH() + 1);
        }
    };

    self.previousPageADocH = function () {
        if (self.currentPageIndexADocH() > 0) {
            self.currentPageIndexADocH(self.currentPageIndexADocH() - 1);
        }
    };

    self.firstPageADocH = function () {
        self.currentPageIndexADocH(0);
    };

    self.lastPageADocH = function () {
        tempCountADocH = parseInt(self.filterADocHList().length / self.pageSizeADocH(), 10);
        if ((self.filterADocHList().length % self.pageSizeADocH()) == 0)
            self.currentPageIndexADocH(tempCountADocH - 1);
        else
            self.currentPageIndexADocH(tempCountADocH);
    };



    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeStatus = ko.observable("");
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



    self.sortTableADocH = function (viewModel, e) {

        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortAdocH");
            self.sortType = localStorage.getItem("sortTypeAdocH");
        }

        if (orderProp == null)
            return null



        if (e != null) {
            self.currentColumn(orderProp);
            self.ADocHList.sort(function (left, right) {

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

            localStorage.setItem("sortAdocH", orderProp);
            localStorage.setItem("sortTypeAdocH", self.sortType);
        }

        self.iconTypeDocNo('');
        self.iconTypeDocDate('');
        self.iconTypeSpec('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeTaeed('');
        self.iconTypeModeName('');
        self.iconTypeStatus('');
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
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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



    $('#refreshADocH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست سند ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getADocH($('#pageCountSelector').val(), false);
                self.sortTableADocH();
            }
        })
    })

    $('#AddNewSanad').click(function () {
        sessionStorage.flagupdateHeader = 0;
        sessionStorage.Eghdam = localStorage.getItem("userName");
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
        window.location.href = sessionStorage.urlAddADocH;
    });


    self.DeleteSanad = function (SanadBand) {
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

                serial = SanadBand.SerialNumber;
                var TestADoc_DeleteObject = {
                    SerialNumber: serial
                };

                ajaxFunction(ADoc_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestADoc_DeleteObject).done(function (data) {
                    var obj = JSON.parse(data);
                    self.TestADoc_DeleteList(obj);
                    if (data.length > 2) {
                        $('#modal-TestDelete').modal('show');
                        SetDataTestDocB();
                    }
                    else {
                        DeleteSanad();
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
        list = self.TestADoc_DeleteList();
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

            if (list[i].TestCap != "")
                textBody += '<p>' + list[i].TestCap + '</p>';

            /*if (list[i].TestName == "Opr")
                textBody += '<p>بند شماره ' + list[i].BandNo + ' پروژه مشخص نشده است ' + ' </p>';
            else if (list[i].TestName == "Mkz")
                textBody += '<p>بند شماره ' + list[i].BandNo + ' مرکز هزینه مشخص نشده است ' + ' </p>';
            else if (list[i].TestName == "Arz")
                textBody += '<p>بند شماره ' + list[i].BandNo + ' دارای حساب ارزی می باشد ولی ارز آن مشخص نیست ' + ' </p>';
            else if (list[i].TestName == "Mahiat")
                //  textBody += '<span>بند شماره ' + list[i].BandNo + ' مانده حساب  <span>' + list[i].AccCode + '</span> مغایر با ماهیت آن می شود ' + ' </span>';
                textBody += '<p>بند شماره ' + list[i].BandNo + ' مانده حساب  </p>' + '<p style="padding-left: 5px;padding-right: 5px;">' + list[i].AccCode + ' </p>' + '<p> مغایر با ماهیت آن می شود </p>';

            else if (list[i].TestName == "Balance")
                textBody += '<p> سند بالانس نیست . بدهکار : ' + totalBede + ' ' + ' بستانکار : ' + totalBest + ' </p>';

            else if (list[i].TestName == "ZeroBand")
                textBody += '<p>بند شماره ' + list[i].BandNo + ' مبلغ بدهکار و بستانکار صفر است ' + ' </p>';


            else if (list[i].TestName == "Traf")
                textBody += '<p>بند شماره ' + list[i].BandNo + ' طرف حساب انتخاب نشده است ' + ' </p>';

            else if (list[i].TestName == "Check")
                textBody += '<p>بند شماره ' + list[i].BandNo + ' اطلاعات چک وارد نشده است ' + ' </p>';
*/

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

    function DeleteSanad() {
        ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group + '/' + serial, 'DELETE').done(function (response) {
            currentPage = self.currentPageIndexADocH();
            getADocH($('#pageCountSelector').val(), false);
            self.currentPageIndexADocH(currentPage);
            showNotification('سند حذف شد ', 1);
        });
    }


    $('#Delete-Modal').click(function () {
        DeleteSanad();
        $('#modal-TestDelete').modal('hide');
    });



    self.UpdateHeader = function (item) {
        sessionStorage.flagupdateHeader = 1;
        sessionStorage.SerialNumber = item.SerialNumber;
        sessionStorage.DocNo = item.DocNo;
        sessionStorage.DocDate = item.DocDate;
        sessionStorage.Spec = item.Spec;
        sessionStorage.Tanzim = item.Tanzim;
        sessionStorage.Taeed = item.Taeed;
        sessionStorage.Eghdam = item.Eghdam;
        sessionStorage.Tasvib = item.Tasvib;
        sessionStorage.Status = item.Status;
        sessionStorage.Eghdam = item.Eghdam;
        sessionStorage.ModeCodeSanad = item.ModeCode;

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

        sessionStorage.lastPageSelect = self.currentPageIndexADocH();

        window.location.href = sessionStorage.urlAddADocH;
    }












    $("#DocNoSearch").keydown(function (e) {
        if (e.keyCode == 13) {
            docnoSearch = $("#DocNoSearch").val();
            if (docnoSearch == '') {
                return showNotification('شماره سند را وارد کنید', 2);
            }
            ShowDataUpdate(docnoSearch);
        }
    });

    $("#btn_DocNoSearch").click(function (e) {
        docnoSearch = $("#DocNoSearch").val();
        if (docnoSearch == '') {
            return showNotification('شماره سند را وارد کنید', 2);
        }
        ShowDataUpdate(docnoSearch);
    });


    if (DocNoReport != "null" && DocNoReport != null) {
        localStorage.setItem("DocNoAFISanad", null);
        sessionStorage.IsReport = "true";
        ShowDataUpdate(DocNoReport);
    }


    function ShowDataUpdate(docNo) {

        var ADocHObject = {
            Select: 3,
            User: sessionStorage.userName,
            AccessSanad: localStorage.getItem("AccessSanad"),
            Sort: '',
            DocNo: docNo,
            ModeSort: 'DESC'
        }

        ajaxFunction(ADocHUri + ace + '/' + sal + '/' + group, 'POST', ADocHObject, true).done(function (response) {
            if (response.length == 0) {
                return showNotification('سند یافت نشد', 0);
            }

            if (response.length > 1) {
                return showNotification('بیش از یک سند وجود دارد', 0);
            }

            var data = response[0];

            sessionStorage.flagupdateHeader = 1;
            sessionStorage.SerialNumber = data.SerialNumber;
            sessionStorage.DocNo = data.DocNo;
            sessionStorage.DocDate = data.DocDate;
            sessionStorage.Spec = data.Spec;
            sessionStorage.Tanzim = data.Tanzim;
            sessionStorage.Taeed = data.Taeed;
            sessionStorage.Eghdam = data.Eghdam;
            sessionStorage.Tasvib = data.Tasvib;
            sessionStorage.Status = data.Status;
            sessionStorage.Eghdam = data.Eghdam;
            sessionStorage.ModeCodeSanad = data.ModeCode;

            sessionStorage.F01 = data.F01;
            sessionStorage.F02 = data.F02;
            sessionStorage.F03 = data.F03;
            sessionStorage.F04 = data.F04;
            sessionStorage.F05 = data.F05;
            sessionStorage.F06 = data.F06;
            sessionStorage.F07 = data.F07;
            sessionStorage.F08 = data.F08;
            sessionStorage.F09 = data.F09;
            sessionStorage.F10 = data.F10;
            sessionStorage.F11 = data.F11;
            sessionStorage.F12 = data.F12;
            sessionStorage.F13 = data.F13;
            sessionStorage.F14 = data.F14;
            sessionStorage.F15 = data.F15;
            sessionStorage.F16 = data.F16;
            sessionStorage.F17 = data.F17;
            sessionStorage.F18 = data.F18;
            sessionStorage.F19 = data.F19;
            sessionStorage.F20 = data.F20;
            sessionStorage.lastPageSelect = self.currentPageIndexADocH();
            window.location.href = sessionStorage.urlAddADocH;
        });
    }


    self.ShowAction = function (Eghdam) {
        if (localStorage.getItem("DEL_ADOC") == 'true') {
            if (localStorage.getItem("AccessViewSanad") == 'false') {
                return Eghdam == localStorage.getItem("userName") ? true : false
            }
            else {
                return true;
            }
        }
        else
            return false;
    }

    self.ShowMove = function (Eghdam) {
        if (localStorage.getItem("moveSanad") == 'true')
            return true;
        else
            return false;
    }


    $("#searchADocH").on("keydown", function search(e) {
        var key = e.charCode || e.keyCode || 0;
        if (allSearchADocH == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
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


    self.PageCountView = function () {
        select = $('#pageCountSelector').val();
        getADocH(select,true);
    }



    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableADocH">' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('Tanzim', data) +
            CreateTableTh('Taeed', data) +
            CreateTableTh('ModeName', data) +
            CreateTableTh('Status', data) +
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
            ' <tbody data-bind="foreach: currentPageADocH" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() }, style: {color :  Status == \'باطل\' ? \'red\' : Tanzim.substring(0, 1) == \'*\' &&  Tanzim.substring(Tanzim.length - 1 , Tanzim.length) == \'*\' || Balance == 1 ? \'#840fbc\' : null} " >' +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('Spec', 0, 4, data) +
            CreateTableTd('Eghdam', 0, 0, data) +
            CreateTableTd('Tanzim', 0, 0, data) +
            CreateTableTd('Taeed', 0, 0, data) +
            CreateTableTd('ModeName', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('SerialNumber', 0, 0, data) +
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
            '    </li>';

        if (localStorage.getItem("AccessPrint_SanadHesab") == "true") {
            dataTable +=
                '    <li>' +
                '        <a id="PrintSanad" data-bind="click: $root.PrintSanad" style="font-size: 11px;text-align: right;">' +
                '            <img src="/Content/img/sanad/streamline-icon-print-text@48x48.png" width="16" height="16" style="margin-left:10px">' +
                '            چاپ ' +
                '        </a>' +
                '    </li>';
        }

        dataTable +=
            '</ul>' +
            '<a id = "UpdateSanad" data-bind="click: $root.UpdateHeader" >' +
            '<img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px"/></a >' +
            '<a id="DeleteSanad" data-bind="click: $root.DeleteSanad, visible: $root.ShowAction(Eghdam)">' +
            '<img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16"/></a>' +
            '</td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('Tanzim', data) +
            CreateTableTdSearch('Taeed', data) +
            CreateTableTdSearch('ModeName', data) +
            CreateTableTdSearch('Status', data) +
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
            '</table >';

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
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\'" style="text-align: right;"></td>'
                break;
            case 4:
                text += 'data-bind="text: ' + field + ' , click: $root.View' + field + ' " class="ellipsis"></td>';
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

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }"  type="text" class="type_' + type + ' ';
        text += ' form-control" style="height: 2.4rem; direction: ltr;text-align: right; " /> </td>';
        return text;
    }

    createViewer();



    /*$('#Print').click(function () {
        printVariable = '"ReportDate":"' + DateNow + '",';
        setReport(self.filterADocHList(), 'ADoc', printVariable);
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
        setReport(self.ADocPList(), data, printVariable);
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
        setReport(self.ADocPList(), '', printVariable);
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
        setReport(self.ADocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });



    self.MoveSanad = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;
        $('#titleMove').text(' کپی سند حسابداری ' + item.DocNo + ' در ');
        $('#modal-Move').modal();
    }

    $('#Move').click(function () {
        modeCodeMove = $('#modeCodeMove').val();


        var closedDate = false;
        var TestADoc_NewObject = {
            DocDate: docDate,
            ModeCode: modeCodeMove
        };

        ajaxFunction(TestADoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestADoc_NewObject).done(function (data) {
            list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                if (list[i].TestName == "YTrs") {
                    closedDate = true;
                    showNotification(list[i].TestCap, 0);
                }
            }
        });

        if (closedDate == false) {

            sessionStorage.flagCopy = 'Y'
            var MoveObject = {
                SerialNumber: serial,
                DocDate: docDate,
                UserCode: localStorage.getItem("userName"),
                TahieShode: ace,
                DocNoMode: 1,
                InsertMode: 0,
                DocNo: 1,
                StartNo: 0,
                EndNo: 0,
                BranchCode: 0,
                MoveMode: 0,
            };

            $('#modal-Move').modal('hide');
            showNotification('در حال ایجاد لطفا منتظر بمانید', 1);

            ajaxFunction(AMoveSanadUri + ace + '/' + sal + '/' + group, 'POST', MoveObject).done(function (response) {
                item = response;
                item = item[0];

                sessionStorage.flagupdateHeader = 1;
                sessionStorage.SerialNumber = item.SerialNumber;
                sessionStorage.DocNo = item.DocNo;
                sessionStorage.DocDate = item.DocDate;
                sessionStorage.Spec = item.Spec;
                sessionStorage.Tanzim = item.Tanzim;
                sessionStorage.Taeed = item.Taeed;
                sessionStorage.Eghdam = item.Eghdam;
                sessionStorage.Tasvib = item.Tasvib;
                sessionStorage.Status = item.Status;
                sessionStorage.Eghdam = item.Eghdam;
                sessionStorage.ModeCodeSanad = item.ModeCode;

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
                sessionStorage.BeforeMoveSanad = true;

                window.location.href = sessionStorage.urlAddADocH;
            });
        }

    });

    self.currentPageIndexADocH(parseInt(sessionStorage.lastPageSelect == null ? 0 : sessionStorage.lastPageSelect));



    self.PrintSanad = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;

        getADocP(serial);
        if (self.ADocPList().length == 0)
            return showNotification('برای چاپ سند حداقل یک بند الزامیست', 0);


        printVariable = '"ReportDate":"' + DateNow + '",';
        printName = null;
        sessionStorage.ModePrint = "ADoc";
        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
        $('#modal-Print').modal('show');
    }

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
        setReport(self.ADocPList(), data, printVariable);
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
        setReport(self.ADocPList(), '', printVariable);
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
        setReport(self.ADocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


    self.ViewSpec = function (Band) {
        ViewSpec(Band.Spec)
    }


    self.sortTableADocH();

};

ko.applyBindings(new ViewModel());

