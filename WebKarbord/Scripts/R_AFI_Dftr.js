var ViewModel = function () {
    var self = this;

    self.AccList = ko.observableArray([]); // لیست حساب ها
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.AModeList = ko.observableArray([]); // لیست نوع سند ها
    self.StatusList = ko.observableArray([]); // لیست نوع سند ها

    self.DftrList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند  
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت  
   // var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    var DftrUri = server + '/api/ReportAcc/Dftr/'; // آدرس گزارش 

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.AzDate = ko.observable(sessionStorage.BeginDateAcc);
    self.TaDate = ko.observable(sessionStorage.EndDateAcc);

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();
    self.AccCode = ko.observable();


    salAcc = localStorage.getItem("SalAcc");
    if (salAcc != '' && salAcc != null)
        sal = salAcc;



    localStorage.setItem("SalAcc", sal);

    for (var i = 0; i < salMaliList.length; i++) {
        $("#DropSalAcc").append('<option  value="'
            + salMaliList[i].Code + '">'
            + salMaliList[i].Name + '</option>');
        $("#DropSalAcc").val(sal);

    }

    $('#DropSalAcc').change(function () {
        sal = $('#DropSalAcc').val();
        getParamAcc();
        localStorage.setItem("SalAcc", sal);
        self.AzDate = ko.observable(sessionStorage.BeginDateAcc);
        self.TaDate = ko.observable(sessionStorage.EndDateAcc);
        $('#aztarikh').val(sessionStorage.BeginDateAcc);
        $('#tatarikh').val(sessionStorage.EndDateAcc);
    });

    getParamAcc();


    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });

    TestUser();

    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();
    var list_MkzNameSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();
    var list_OprNameSelect = new Array();

    var AModeCode = '';
    var counterAMode = 0;
    var list_AModeSelect = new Array();
    var list_AModeNameSelect = new Array();

    var StatusCode = '';
    var counterStatus = 0;
    var list_StatusSelect = new Array();



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'Dftr';
    var columns = [
        'DocDate',
        'AccCode',
        'AccName',
        'Comm',
        'Bede',
        'Best',
        'MonBede',
        'MonBest',
        'MonTotal',
        'CheckNo',
        'CheckDate',
        'Bank',
        'Shobe',
        'Jari',
        'TrafCode',
        'TrafName',
        'MkzCode',
        'MkzName',
        'OprCode',
        'OprName',
        'Amount',
        'Spec',
        'Status',
        'ModeName',
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
        cols = getRprtCols(rprtId, sessionStorage.userName);
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
        /*  ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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
        ajaxFunction(RprtColsDefultUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/Dftr", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/Dftr", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);





    function getAccList() {
        var AccObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }

        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'POST', AccObject, true).done(function (data) {
            self.AccList(data);
        });
    }

    $('#btnAcc').click(function () {
        if (self.AccList().length == 0) {
            getAccList();
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
    //Get AMode List
    function getAModeList() {
        ajaxFunction(AModeUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AModeList(data);
        });
    }

    //Get Status List
    function getStatusList() {
        list = localStorage.getItem('AccStatus');
        if (list != null) {
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



    //Get getDftr
    function getDftr() {

        azTarikh = self.AzDate().toEnglishDigit();//$("#aztarikh").val().toEnglishDigit();
        taTarikh = self.TaDate().toEnglishDigit();//$("#tatarikh").val().toEnglishDigit();

        //tarikh1 = $("#aztarikh").val().toEnglishDigit();
        //tarikh2 = $("#tatarikh").val().toEnglishDigit();

        azShomarh = $("#azshomarh").val();
        taShomarh = $("#tashomarh").val();

        dispBands = $("#DispBands").val();
        jamRooz = $("#JamRooz").val();

        naghl = $("#naghl").val();

        codeAcc = self.AccCode();

        if (codeAcc == null) {
            return showNotification(translate('حساب را انتخاب کنید'), 0);
        }


        var aModeCode = '';
        for (var i = 0; i <= counterAMode - 1; i++) {
            if (i < counterAMode - 1)
                aModeCode += list_AModeSelect[i] + '*';
            else
                aModeCode += list_AModeSelect[i];
        }


        var statusCode = '';
        for (var i = 0; i <= counterStatus - 1; i++) {
            if (i < counterStatus - 1)
                statusCode += list_StatusSelect[i] + '*';
            else
                statusCode += list_StatusSelect[i];
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


        var DftrObject = {
            azTarikh: azTarikh,
            taTarikh: taTarikh,
            azShomarh: azShomarh,
            taShomarh: taShomarh,
            AccCode: codeAcc,
            AModeCode: aModeCode,
            StatusCode: statusCode,
            MkzCode: mkzcode,
            OprCode: oprcode,
            DispBands: $('#DispBands').val(),
            JamRooz: $('#JamRooz').val(),
            Naghl: naghl,
        };

        ajaxFunction(DftrUri + ace + '/' + sal + '/' + group, 'POST', DftrObject, true).done(function (response) {
            self.DftrList(response);

        });
    }

    function calcsum(list) {
        totalBede = 0;
        totalBest = 0;
        totalMonBede = 0;
        totalMonBest = 0;
        totalMonTotal = 0;

        for (var i = 0; i < list.length; ++i) {
            DftrData = list[i];
            totalBede += DftrData.Bede;
            totalBest += DftrData.Best;
            //totalMonBede += DftrData.MonBede;
            //totalMonBest += DftrData.MonBest;
            //totalMonTotal += DftrData.MonTotal;
        }

        // $("#textTotal").text('جمع');
        $("#totalBede").text(NumberToNumberString(totalBede.toFixed(parseInt(sessionStorage.Deghat))));
        $("#totalBest").text(NumberToNumberString(totalBest.toFixed(parseInt(sessionStorage.Deghat))));

        totalMonTotal = totalBede - totalBest;
        if (totalMonTotal > 0) {
            $("#totalMonBede").text(NumberToNumberString(totalMonTotal.toFixed(parseInt(sessionStorage.Deghat))));
            $("#totalMonBest").text('0');
        }
        else {
            $("#totalMonBede").text('0');
            $("#totalMonBest").text(NumberToNumberString(Math.abs(totalMonTotal.toFixed(parseInt(sessionStorage.Deghat)))));

        }
        $("#totalMonTotal").text(NumberToNumberString(totalMonTotal.toFixed(parseInt(sessionStorage.Deghat))));

    }

    $("#CreateReport").click(function () {
        getDftr();
        self.sortTableDftr();
    });


    getNaghl();
    getAModeList();
    getStatusList();
    getDispBands();
    getJamRooz();


    $('#nameAcc').val(translate('همه موارد'));
    $('#nameOpr').val(translate('همه موارد'));
    $('#nameMkz').val(translate('همه موارد'));
    $('#nameAMode').val(translate('همه موارد'));


    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");


    self.currentPageAcc = ko.observable();
    pageSizeAcc = localStorage.getItem('pageSizeAcc') == null ? 10 : localStorage.getItem('pageSizeAcc');
    self.pageSizeAcc = ko.observable(pageSizeAcc);
    self.currentPageIndexAcc = ko.observable(0);

    self.filterAcc0 = ko.observable("");
    self.filterAcc1 = ko.observable("");
    self.filterAcc2 = ko.observable("");
    self.filterAcc3 = ko.observable("");

    self.filterAccList = ko.computed(function () {

        self.currentPageIndexAcc(0);
        var filter0 = self.filterAcc0().toUpperCase();
        var filter1 = self.filterAcc1();
        var filter2 = self.filterAcc2();
        var filter3 = self.filterAcc3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.AccList();
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    ko.utils.stringStartsWith(item.Level.toString().toLowerCase(), filter3)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageAcc = ko.computed(function () {
        var pageSizeAcc = parseInt(self.pageSizeAcc(), 10),
            startIndex = pageSizeAcc * self.currentPageIndexAcc(),
            endIndex = startIndex + pageSizeAcc;
        localStorage.setItem('pageSizeAcc', pageSizeAcc);
        return self.filterAccList().slice(startIndex, endIndex);
    });

    self.nextPageAcc = function () {
        if (((self.currentPageIndexAcc() + 1) * self.pageSizeAcc()) < self.filterAccList().length) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() + 1);
        }
    };

    self.previousPageAcc = function () {
        if (self.currentPageIndexAcc() > 0) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() - 1);
        }
    };

    self.firstPageAcc = function () {
        self.currentPageIndexAcc(0);
    };

    self.lastPageAcc = function () {
        countAcc = parseInt(self.filterAccList().length / self.pageSizeAcc(), 10);
        if ((self.filterAccList().length % self.pageSizeAcc()) == 0)
            self.currentPageIndexAcc(countAcc - 1);
        else
            self.currentPageIndexAcc(countAcc);
    };

    self.sortTableAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.AccList.sort(function (left, right) {
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



    $('#refreshAcc').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست حساب ها") + " " + translate("به روز رسانی شود ؟"),
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
                getAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.selectAcc = function (item) {
        $('#nameAcc').val('(' + item.Code + ') ' + item.Name);
        self.AccCode(item.Code);
    }


    $('#modal-Acc').on('shown.bs.modal', function () {
        dispBands = $("#DispBands").val();
        dispBands == 1 ? self.filterAcc3("1") : dispBands == 2 ? self.filterAcc3("2") : self.filterAcc3("")
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
        if (orderProp == null) {
            return null
        }
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
            list_MkzNameSelect[counterMkz] = item.Name;
            counterMkz = counterMkz + 1;
        }
    };


    self.AddAllMkz = function () {
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


    self.DelAllMkz = function () {
        list_MkzSelect = new Array();
        list_MkzNameSelect = new Array();
        counterMkz = 0;
        $("#TableBodyListMkz").empty();
    };


    $('#modal-Mkz').on('hide.bs.modal', function () {
        if (counterMkz > 0)
            $('#nameMkz').val(counterMkz + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameMkz').val(translate('همه موارد'));
    });

    $('#modal-Mkz').on('shown.bs.modal', function () {
        $("#TableBodyListMkz").empty();
        for (var i = 0; i < counterMkz; i++) {
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
        if (orderProp == null) {
            return null
        }
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
            list_OprNameSelect[counterOpr] = item.Name;
            counterOpr = counterOpr + 1;
        }
    };


    self.AddAllOpr = function () {
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


    self.DelAllOpr = function () {
        list_OprSelect = new Array();
        list_OprNameSelect = new Array();
        counterOpr = 0;
        $("#TableBodyListOpr").empty();
    };


    $('#modal-Opr').on('hide.bs.modal', function () {
        if (counterOpr > 0)
            $('#nameOpr').val(counterOpr + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameOpr').val(translate('همه موارد'));
    });

    $('#modal-Opr').on('shown.bs.modal', function () {
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



    self.currentPageAMode = ko.observable();
    pageSizeAMode = localStorage.getItem('pageSizeAMode') == null ? 10 : localStorage.getItem('pageSizeAMode');
    self.pageSizeAMode = ko.observable(pageSizeAMode);
    self.currentPageIndexAMode = ko.observable(0);

    self.filterAMode0 = ko.observable("");
    self.filterAMode1 = ko.observable("");
    self.filterAMode2 = ko.observable("");

    self.filterAModeList = ko.computed(function () {

        self.currentPageIndexAMode(0);
        var filter0 = self.filterAMode0().toUpperCase();
        var filter1 = self.filterAMode1();
        var filter2 = self.filterAMode2();

        if (!filter0 && !filter1 && !filter2) {
            return self.AModeList();
        } else {
            tempData = ko.utils.arrayFilter(self.AModeList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageAMode = ko.computed(function () {
        var pageSizeAMode = parseInt(self.pageSizeAMode(), 10),
            startIndex = pageSizeAMode * self.currentPageIndexAMode(),
            endIndex = startIndex + pageSizeAMode;
        localStorage.setItem('pageSizeAMode', pageSizeAMode);
        return self.filterAModeList().slice(startIndex, endIndex);
    });

    self.nextPageAMode = function () {
        if (((self.currentPageIndexAMode() + 1) * self.pageSizeAMode()) < self.filterAModeList().length) {
            self.currentPageIndexAMode(self.currentPageIndexAMode() + 1);
        }
    };

    self.previousPageAMode = function () {
        if (self.currentPageIndexAMode() > 0) {
            self.currentPageIndexAMode(self.currentPageIndexAMode() - 1);
        }
    };

    self.firstPageAMode = function () {
        self.currentPageIndexAMode(0);
    };

    self.lastPageAMode = function () {
        countAMode = parseInt(self.filterAModeList().length / self.pageSizeAMode(), 10);
        if ((self.filterAModeList().length % self.pageSizeAMode()) == 0)
            self.currentPageIndexAMode(countAMode - 1);
        else
            self.currentPageIndexAMode(countAMode);
    };

    self.sortTableAMode = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.AModeList.sort(function (left, right) {
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

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshAMode').click(function () {
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
                getAModeList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddAMode = function (item) {

        AModeCode = item.Code;
        find = false;
        list_AModeSelect.forEach(function (item, key) {
            if (item == AModeCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListAMode').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_AModeSelect[counterAMode] = item.Code;
            list_AModeNameSelect[counterAMode] = item.Name;
            counterAMode = counterAMode + 1;
        }
    };


    self.AddAllAMode = function () {
        list_AModeSelect = new Array();
        list_AModeNameSelect = new Array();
        list = self.AModeList();
        $("#TableBodyListAMode").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListAMode').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_AModeSelect[i] = list[i].Code;
            list_AModeNameSelect[i] = list[i].Name;
            counterAMode = i + 1;
        }
    };


    self.DelAllAMode = function () {
        list_AModeSelect = new Array();
        list_AModeNameSelect = new Array();
        counterAMode = 0;
        $("#TableBodyListAMode").empty();
    };


    $('#modal-AMode').on('hide.bs.modal', function () {
        if (counterAMode > 0)
            $('#nameAMode').val(counterAMode + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameAMode').val(translate('همه موارد'));
    });

    $('#modal-AMode').on('shown.bs.modal', function () {
        $("#TableBodyListAMode").empty();
        for (var i = 0; i < counterAMode; i++) {
            if (list_AModeSelect[i] != "") {
                $('#TableBodyListAMode').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_AModeSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_AModeNameSelect[i] + '</td > '
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


    self.AddStatus = function (item) {
        Status = item.Status;
        find = false;
        list_StatusSelect.forEach(function (item, key) {
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
            $('#nameStatus').val(counterStatus + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameStatus').val(translate('همه موارد'));
    });

    $('#modal-Status').on('shown.bs.modal', function () {
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


    function getDispBands() {
        select = document.getElementById('DispBands');
        for (var i = 0; i <= 2; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 0;
                opt.innerHTML = translate('ریز حساب ها');
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = translate('حساب های کل');
            }
            if (i == 2) {
                opt.value = 2;
                opt.innerHTML = translate('حساب های معین');
            }

            select.appendChild(opt);
        }
    };

    function getJamRooz() {
        select = document.getElementById('JamRooz');
        for (var i = 0; i <= 1; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 0;
                opt.innerHTML = translate('بدون جمع روزانه');
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = translate('با جمع روزانه');
            }

            select.appendChild(opt);
        }
    };




    //------------------------------------------------------
    self.currentPageDftr = ko.observable();
    pageSizeDftr = localStorage.getItem('pageSizeDftr') == null ? 10 : localStorage.getItem('pageSizeDftr');
    self.pageSizeDftr = ko.observable(pageSizeDftr);
    self.currentPageIndexDftr = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterAccCode = ko.observable("");
    self.filterAccName = ko.observable("");
    self.filterComm = ko.observable("");
    self.filterBede = ko.observable("");
    self.filterBest = ko.observable("");
    self.filterMonBede = ko.observable("");
    self.filterMonBest = ko.observable("");
    self.filterMonTotal = ko.observable("");
    self.filterCheckNo = ko.observable("");
    self.filterCheckDate = ko.observable("");
    self.filterBank = ko.observable("");
    self.filterShobe = ko.observable("");
    self.filterJari = ko.observable("");
    self.filterTrafCode = ko.observable("");
    self.filterTrafName = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterMkzCode = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprCode = ko.observable("");
    self.filterOprName = ko.observable("");
    self.filterAmount = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterStatus = ko.observable("");
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

    self.filterDftrList = ko.computed(function () {
        self.currentPageIndexDftr(0);
        var filterDocNo = self.filterDocNo();
        var filterDocDate = self.filterDocDate();
        var filterAccCode = self.filterAccCode();
        var filterAccName = self.filterAccName();
        var filterComm = self.filterComm();
        var filterBede = self.filterBede();
        var filterBest = self.filterBest();
        var filterMonBede = self.filterMonBede();
        var filterMonBest = self.filterMonBest();
        var filterMonTotal = self.filterMonTotal();
        var filterCheckNo = self.filterCheckNo();
        var filterCheckDate = self.filterCheckDate();
        var filterBank = self.filterBank();
        var filterShobe = self.filterShobe();
        var filterJari = self.filterJari();
        var filterTrafCode = self.filterTrafCode();
        var filterTrafName = self.filterTrafName();
        var filterMkzCode = self.filterMkzCode();
        var filterMkzName = self.filterMkzName();
        var filterOprCode = self.filterOprCode();
        var filterOprName = self.filterOprName();
        var filterAmount = self.filterAmount();
        var filterSpec = self.filterSpec();
        var filterStatus = self.filterStatus();
        var filterModeName = self.filterModeName();
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


        filterBede = filterBede.replace("/", ".");
        filterBest = filterBest.replace("/", ".");

        filterMonBede = filterMonBede.replace("/", ".");
        filterMonBest = filterMonBest.replace("/", ".");
        filterMonTotal = filterMonTotal.replace("/", ".");

        tempData = ko.utils.arrayFilter(self.DftrList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                (item.DocDate == null ? '' : item.DocDate.toString().search(filterDocDate) >= 0) &&
                (item.AccCode == null ? '' : item.AccCode.toString().search(filterAccCode) >= 0) &&
                (item.AccName == null ? '' : item.AccName.toString().search(filterAccName) >= 0) &&
                (item.Comm == null ? '' : item.Comm.toString().search(filterComm) >= 0) &&
                ko.utils.stringStartsWith(item.Bede.toString().toLowerCase(), filterBede) &&
                ko.utils.stringStartsWith(item.Best.toString().toLowerCase(), filterBest) &&
                ko.utils.stringStartsWith(item.MonBede.toString().toLowerCase(), filterMonBede) &&
                ko.utils.stringStartsWith(item.MonBest.toString().toLowerCase(), filterMonBest) &&
                ko.utils.stringStartsWith(item.MonTotal.toString().toLowerCase(), filterMonTotal) &&
                ko.utils.stringStartsWith(item.CheckNo.toString().toLowerCase(), filterCheckNo) &&
                (item.CheckDate == null ? '' : item.CheckDate.toString().search(filterCheckDate) >= 0) &&
                (item.Bank == null ? '' : item.Bank.toString().search(filterBank) >= 0) &&
                (item.Shobe == null ? '' : item.Shobe.toString().search(filterShobe) >= 0) &&
                (item.Jari == null ? '' : item.Jari.toString().search(filterJari) >= 0) &&
                ko.utils.stringStartsWith(item.TrafCode.toString().toLowerCase(), filterTrafCode) &&
                (item.TrafName == null ? '' : item.TrafName.toString().search(filterTrafName) >= 0) &&
                (item.ModeName == null ? '' : item.ModeName.toString().search(filterModeName) >= 0) &&
                ko.utils.stringStartsWith(item.MkzCode.toString().toLowerCase(), filterMkzCode) &&
                (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                ko.utils.stringStartsWith(item.OprCode.toString().toLowerCase(), filterOprCode) &&
                (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
                ko.utils.stringStartsWith(item.Amount.toString().toLowerCase(), filterAmount) &&
                (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
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
        calcsum(tempData);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchDftr);
    self.firstMatch = ko.dependentObservable(function () {
        var indexDftr = 0;
        sessionStorage.searchDftr = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexDftr(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.DftrList(), function (item) {
                indexDftr += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexDftr < self.pageSizeDftr())
                self.currentPageIndexDftr(0);
            else {
                var a = Math.round((indexDftr / self.pageSizeDftr()), 0);
                if (a < (indexDftr / self.pageSizeDftr())) a += 1;
                self.currentPageIndexDftr(a - 1);
            }
            return value;
        }
    });


    self.currentPageDftr = ko.computed(function () {
        var pageSizeDftr = parseInt(self.pageSizeDftr(), 10),
            startIndex = pageSizeDftr * self.currentPageIndexDftr(),
            endIndex = startIndex + pageSizeDftr;
        localStorage.setItem('pageSizeDftr', pageSizeDftr);
        return self.filterDftrList().slice(startIndex, endIndex);
    });

    self.nextPageDftr = function () {
        if (((self.currentPageIndexDftr() + 1) * self.pageSizeDftr()) < self.filterDftrList().length) {
            self.currentPageIndexDftr(self.currentPageIndexDftr() + 1);
        }
    };

    self.previousPageDftr = function () {
        if (self.currentPageIndexDftr() > 0) {
            self.currentPageIndexDftr(self.currentPageIndexDftr() - 1);
        }
    };

    self.firstPageDftr = function () {
        self.currentPageIndexDftr(0);
    };

    self.lastPageDftr = function () {
        tempCountDftr = parseInt(self.filterDftrList().length / self.pageSizeDftr(), 10);
        if ((self.filterDftrList().length % self.pageSizeDftr()) == 0)
            self.currentPageIndexDftr(tempCountDftr - 1);
        else
            self.currentPageIndexDftr(tempCountDftr);
    };

    self.sortTableDftr = function (viewModel, e) {

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
        self.DftrList.sort(function (left, right) {
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
        self.iconTypeAccCode('');
        self.iconTypeAccName('');
        self.iconTypeComm('');
        self.iconTypeBede('');
        self.iconTypeBest('');
        self.iconTypeMonBede('');
        self.iconTypeMonBest('');
        self.iconTypeMonTotal('');
        self.iconTypeCheckNo('');
        self.iconTypeCheckDate('');
        self.iconTypeBank('');
        self.iconTypeShobe('');
        self.iconTypeJari('');
        self.iconTypeTrafCode('');
        self.iconTypeTrafName('');
        self.iconTypeModeName('');
        self.iconTypeMkzCode('');
        self.iconTypeMkzName('');
        self.iconTypeOprCode('');
        self.iconTypeOprName('');
        self.iconTypeAmount('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
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
        if (orderProp == 'SortAccCode') self.iconTypeAccCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccName') self.iconTypeAccName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Comm') self.iconTypeComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bede') self.iconTypeBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Best') self.iconTypeBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonBede') self.iconTypeMonBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonBest') self.iconTypeMonBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonTotal') self.iconTypeMonTotal((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckNo') self.iconTypeCheckNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckDate') self.iconTypeCheckDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bank') self.iconTypeBank((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Shobe') self.iconTypeShobe((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Jari') self.iconTypeJari((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafCode') self.iconTypeTrafCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafName') self.iconTypeTrafName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortMkzCode') self.iconTypeMkzCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprCode') self.iconTypeOprCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount') self.iconTypeAmount((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
    }


    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeDocDate = ko.observable("");
    self.iconTypeDocNo = ko.observable("");
    self.iconTypeAccCode = ko.observable("");
    self.iconTypeAccName = ko.observable("");
    self.iconTypeComm = ko.observable("");
    self.iconTypeBede = ko.observable("");
    self.iconTypeBest = ko.observable("");
    self.iconTypeMonBede = ko.observable("");
    self.iconTypeMonBest = ko.observable("");
    self.iconTypeMonTotal = ko.observable("");
    self.iconTypeCheckNo = ko.observable("");
    self.iconTypeCheckDate = ko.observable("");
    self.iconTypeBank = ko.observable("");
    self.iconTypeShobe = ko.observable("");
    self.iconTypeJari = ko.observable("");
    self.iconTypeTrafCode = ko.observable("");
    self.iconTypeTrafName = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeMkzCode = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprCode = ko.observable("");
    self.iconTypeOprName = ko.observable("");
    self.iconTypeAmount = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
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



    function getNaghl() {
        select = document.getElementById('naghl');
        for (var i = 0; i <= 1; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 0;
                opt.innerHTML = translate('محاسبه نشود');
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = translate('محاسبه شود');

            }
            select.appendChild(opt);
        }
    };


    self.ShowAFISanad = function (Band) {
        serial = Band.SerialNumber;

        if (TestUseSanad(ace, sal, "SanadHesab", serial, false, Band.DocNo)) {
            // showNotification('سند در تب دیگری وجود دارد', 0)
        }
        else {
            localStorage.setItem("DocNoAFISanad", Band.DocNo);
            window.open(sessionStorage.urlAFISanadIndex, '_blank');
        }
    }



    AccCodeReport = localStorage.getItem("AccCodeReport");
    localStorage.setItem("AccCodeReport", null);
    if (AccCodeReport != "null") {
        self.AccCode(AccCodeReport);
        AccNameReport = localStorage.getItem("AccNameReport");
        $('#nameAcc').val('(' + AccCodeReport + ') ' + AccNameReport);

        azTarikh = localStorage.getItem("AzTarikhReport");
        self.AzDate(azTarikh);

        taTarikh = localStorage.getItem("TaTarikhReport");
        self.TaDate(taTarikh);

        aModeCode = localStorage.getItem("AModeCodeReport");
        if (aModeCode != "") {
            aModeName = localStorage.getItem("AModeNameReport");
            list_AModeSelect = aModeCode.split("*");
            list_AModeNameSelect = aModeName.split("*");
            counterAMode = list_AModeSelect.length;
            $('#nameAMode').val(counterAMode + ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameAMode').val(translate('همه موارد'));


        mkzCode = localStorage.getItem("MkzCodeReport");
        if (mkzCode != "") {
            mkzName = localStorage.getItem("MkzNameReport");
            list_MkzSelect = mkzCode.split("*");
            list_MkzNameSelect = mkzName.split("*");

            counterMkz = list_MkzSelect.length;
            $('#nameMkz').val(counterMkz + ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameMkz').val(translate('همه موارد'))


        oprCode = localStorage.getItem("OprCodeReport");
        if (oprCode != "") {
            oprName = localStorage.getItem("OprNameReport");
            list_OprSelect = oprCode.split("*");
            list_OprNameSelect = oprName.split("*");

            counterOpr = list_OprSelect.length;
            $('#nameOpr').val(counterOpr + ' ' + translate('مورد انتخاب شده'));
        }
        else
            $('#nameOpr').val(translate('همه موارد'));

        getDftr();
    }




    //$("#ADOC").hide();
    self.AccessAction = function (Eghdam) {
        if (localStorage.getItem("AccessSanad_ADOC") == 'false') {
            res = Eghdam == sessionStorage.userName ? true : false
        }
        else {
            res = true;
        }
        if (res == true)
            res = $("#ADOC").css("display") != "none" && localStorage.getItem("VIEW_ADOC") == 'true'

        return res;
    }


    self.radif = function (index) {
        countShow = self.pageSizeDftr();
        page = self.currentPageIndexDftr();
        calc = (countShow * page) + 1;
        return index + calc;
    }


    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableDftr">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('AccCode', data) +
            CreateTableTh('AccName', data) +
            CreateTableTh('Comm', data) +
            CreateTableTh('Bede', data) +
            CreateTableTh('Best', data) +
            CreateTableTh('MonBede', data) +
            CreateTableTh('MonBest', data) +
            CreateTableTh('MonTotal', data) +
            CreateTableTh('CheckNo', data) +
            CreateTableTh('CheckDate', data) +
            CreateTableTh('Bank', data) +
            CreateTableTh('Shobe', data) +
            CreateTableTh('Jari', data) +
            CreateTableTh('TrafCode', data) +
            CreateTableTh('TrafName', data) +
            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('Amount', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('ModeName', data) +
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
            ' <tbody data-bind="foreach: currentPageDftr" data-dismiss="modal" style="cursor: default;">' +
            '     <tr  data-bind=" style: {\'background-color\':  DocNo == \'0\'  ? \'#efb68399\' : null  } ">' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('AccCode', 0, 0, data) +
            CreateTableTd('AccName', 0, 0, data) +
            CreateTableTd('Comm', 0, 0, data) +
            CreateTableTd('Bede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('Best', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBest', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonTotal', sessionStorage.Deghat, 2, data) +
            CreateTableTd('CheckNo', 0, 0, data) +
            CreateTableTd('CheckDate', 0, 0, data) +
            CreateTableTd('Bank', 0, 0, data) +
            CreateTableTd('Shobe', 0, 0, data) +
            CreateTableTd('Jari', 0, 0, data) +
            CreateTableTd('TrafCode', 0, 0, data) +
            CreateTableTd('TrafName', 0, 0, data) +
            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +
            CreateTableTd('Amount', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('ModeName', 0, 0, data) +
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
            ' <td>' +
            ' <a data-bind="visible: $root.AccessAction(Eghdam)" class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            ' </a>' +
            ' <ul class="dropdown-menu">' +
            '    <li>' +
            '    <a data-bind="click: $root.ShowAFISanad" style="font-size: 11px;">' +
            '        <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" />' + translate('نمایش سند') +
            '    </a>' +
            ' </td>' +
            '</tr>' +

            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td style="background-color: #e37d228f !important;">' + translate('جمع') + '</td>' +
            CreateTableTdSum('DocNo', 0, data) +
            CreateTableTdSum('DocDate', 1, data) +
            CreateTableTdSum('AccCode', 1, data) +
            CreateTableTdSum('AccName', 1, data) +
            CreateTableTdSum('Comm', 1, data) +
            CreateTableTdSum('Bede', 2, data) +
            CreateTableTdSum('Best', 2, data) +
            CreateTableTdSum('MonBede', 2, data) +
            CreateTableTdSum('MonBest', 2, data) +
            CreateTableTdSum('MonTotal', 2, data) +
            CreateTableTdSum('CheckNo', 1, data) +
            CreateTableTdSum('CheckDate', 1, data) +
            CreateTableTdSum('Bank', 1, data) +
            CreateTableTdSum('Shobe', 1, data) +
            CreateTableTdSum('Jari', 1, data) +
            CreateTableTdSum('TrafCode', 1, data) +
            CreateTableTdSum('TrafName', 1, data) +
            CreateTableTdSum('MkzCode', 1, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('OprCode', 1, data) +
            CreateTableTdSum('OprName', 1, data) +
            CreateTableTdSum('Amount', 1, data) +
            CreateTableTdSum('Spec', 1, data) +
            CreateTableTdSum('Status', 1, data) +
            CreateTableTdSum('ModeName', 1, data) +
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
            '<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('AccCode', data) +
            CreateTableTdSearch('AccName', data) +
            CreateTableTdSearch('Comm', data) +
            CreateTableTdSearch('Bede', data) +
            CreateTableTdSearch('Best', data) +
            CreateTableTdSearch('MonBede', data) +
            CreateTableTdSearch('MonBest', data) +
            CreateTableTdSearch('MonTotal', data) +
            CreateTableTdSearch('CheckNo', data) +
            CreateTableTdSearch('CheckDate', data) +
            CreateTableTdSearch('Bank', data) +
            CreateTableTdSearch('Shobe', data) +
            CreateTableTdSearch('Jari', data) +
            CreateTableTdSearch('TrafCode', data) +
            CreateTableTdSearch('TrafName', data) +
            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprCode', data) +
            CreateTableTdSearch('OprName', data) +
            CreateTableTdSearch('Amount', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('ModeName', data) +
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

        sortField = field == 'MkzCode' ? 'SortMkzCode' :
            field == 'AccCode' ? 'SortAccCode' :
                field

        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + sortField + '">' +
            '<span data-column="' + sortField + '">' + TextField + '</span>' +
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
                text += 'data-bind="text: ' + field + ' " ></td>';
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
        text += ' form-control" style="height: 2.4rem;direction: ltr;text-align: right;" /> </td>'; return text;
    }

    function CallPrint(strid) {
        var prtContent = document.getElementById(strid);
        var WinPrint = window.open('', '', 'letf=0,top=0,width=1,height=1,t  oolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
        prtContent.innerHTML = strOldOne;
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
        setReport(self.DftrList(), data, printVariable);
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

    $('#AddNewPrintForms').click(function () {
        printName = translate('فرم جدید');
        printPublic = false;
        setReport(self.DftrList(), '', printVariable);
    });


    $('#Print').click(function () {
        createViewer();
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        FromShomarh = $("#azshomarh").val();
        ToShomarh = $("#tashomarh").val();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        printVariable += '"FromDocNo":"' + FromShomarh + '",';
        printVariable += '"ToDocNo":"' + ToShomarh + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportDftr";
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
        setReport(self.DftrList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


};

ko.applyBindings(new ViewModel());

