var ViewModel = function () {
    var self = this;

    self.AccList = ko.observableArray([]); // لیست حساب ها
    self.CheckStatusList = ko.observableArray([]); // لیست نوع چک ها

    self.TChkList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
   // var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    var TChkUri = server + '/api/ReportAcc/TChk/'; // آدرس گزارش 
    var CheckStatusUri = server + '/api/ADocData/CheckStatus/'; // آدرس وضعیت  

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.AzDate = ko.observable("");
    self.TaDate = ko.observable("");

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();
    self.AccCode = ko.observable();

    TestUser();


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
    });

    getParamAcc();

    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });


    var AccCode = '';
    var counterAcc = 0;
    var list_AccSelect = new Array();


    var CheckStatusCode = '';
    var counterCheckStatus = 0;
    var list_CheckStatusSelect = new Array();



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'TChk';
    var columns = [
        'CheckNo',
        'CheckDate',
        'AccCode',
        'AccName',
        'Bank',
        'Shobe',
        'Jari',
        'TrafCode',
        'TrafName',
        'Value',
        'CheckStatusSt',
        'CheckRadif',
        'CheckComm',
        'CheckVosoolDate',
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
        /* ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/TChk", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/TChk", columns, self.SettingColumnList());
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

    //Get CheckStatus List
    function getCheckStatusList(PDMode) {
        ajaxFunction(CheckStatusUri + ace + '/' + sal + '/' + group + '/' + PDMode + '/1', 'GET').done(function (data) {
            self.CheckStatusList(data);
        });
    }




    //Get TChk
    function getTChk() {
        

        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        azShomarh = $("#azshomarh").val();
        taShomarh = $("#tashomarh").val();

        pDMode = $("#PDMode").val();

        var accCode = '';
        for (var i = 0; i <= counterAcc - 1; i++) {
            if (i < counterAcc - 1)
                accCode += list_AccSelect[i] + '*';
            else
                accCode += list_AccSelect[i];
        }


        var checkStatus = '';
        for (var i = 0; i <= counterCheckStatus - 1; i++) {
            if (i < counterCheckStatus - 1)
                checkStatus += list_CheckStatusSelect[i] + '*';
            else
                checkStatus += list_CheckStatusSelect[i];
        }

        var TChkObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            azShomarh: azShomarh,
            taShomarh: taShomarh,
            AccCode: accCode,
            PDMode: pDMode,
            CheckStatus: checkStatus,
        };
        ajaxFunction(TChkUri + ace + '/' + sal + '/' + group, 'POST', TChkObject,true).done(function (response) {
            self.TChkList(response);
        });
    }

    function calcsum(list) {
        totalvalue = 0;
        for (var i = 0; i < list.length; ++i) {
            TChkData = list[i];
            totalvalue += TChkData.Value;
        }

        //$("#textTotal").text('جمع');
        $("#totalValue").text(NumberToNumberString(totalvalue));
    }

    $("#CreateReport").click(function () {
        getTChk();
        self.sortTableTChk();
    });


    getPDMode();
    getCheckStatusList(1);

    $('#nameAcc').val(translate('همه موارد'));
    $('#nameCheckStatus').val(translate('همه موارد'));

    self.currentPageCheckStatus = ko.observable();
    pageSizeCheckStatus = localStorage.getItem('pageSizeCheckStatus') == null ? 10 : localStorage.getItem('pageSizeCheckStatus');
    self.pageSizeCheckStatus = ko.observable(pageSizeCheckStatus);
    self.currentPageIndexCheckStatus = ko.observable(0);

    self.filterCheckStatus0 = ko.observable("");

    self.filterCheckStatusList = ko.computed(function () {

        self.currentPageIndexCheckStatus(0);
        var filter0 = self.filterCheckStatus0();

        if (!filter0) {
            return self.CheckStatusList();
        } else {
            tempData = ko.utils.arrayFilter(self.CheckStatusList(), function (item) {
                result =
                    item.Name == null ? '' : item.Name.toString().search(filter0) >= 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCheckStatus = ko.computed(function () {
        var pageSizeCheckStatus = parseInt(self.pageSizeCheckStatus(), 10),
            startIndex = pageSizeCheckStatus * self.currentPageIndexCheckStatus(),
            endIndex = startIndex + pageSizeCheckStatus;
        localStorage.setItem('pageSizeCheckStatus', pageSizeCheckStatus);
   return self.filterCheckStatusList().slice(startIndex, endIndex);
    });

    self.nextPageCheckStatus = function () {
        if (((self.currentPageIndexCheckStatus() + 1) * self.pageSizeCheckStatus()) < self.filterCheckStatusList().length) {
            self.currentPageIndexCheckStatus(self.currentPageIndexCheckStatus() + 1);
        }
    };

    self.previousPageCheckStatus = function () {
        if (self.currentPageIndexCheckStatus() > 0) {
            self.currentPageIndexCheckStatus(self.currentPageIndexCheckStatus() - 1);
        }
    };

    self.firstPageCheckStatus = function () {
        self.currentPageIndexCheckStatus(0);
    };

    self.lastPageCheckStatus = function () {
        countCheckStatus = parseInt(self.filterCheckStatusList().length / self.pageSizeCheckStatus(), 10);
        if ((self.filterCheckStatusList().length % self.pageSizeCheckStatus()) == 0)
            self.currentPageIndexCheckStatus(countCheckStatus - 1);
        else
            self.currentPageIndexCheckStatus(countCheckStatus);
    };

    self.sortTableCheckStatus = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.CheckStatusList.sort(function (left, right) {
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


        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshCheckStatus').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست وضعیت چک") + " " + translate("به روز رسانی شود ؟"),
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
                getCheckStatusList(1);
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddCheckStatus = function (item) {

        CheckStatusCode = item.Code;
        find = false;
        list_CheckStatusSelect.forEach(function (item, key) {
            if (item == CheckStatusCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListCheckStatus').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_CheckStatusSelect[counterCheckStatus] = item.Code;
            counterCheckStatus = counterCheckStatus + 1;
        }
    };


    self.AddAllCheckStatus = function () {
        list_CheckStatusSelect = new Array();
        list = self.CheckStatusList();
        $("#TableBodyListCheckStatus").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListCheckStatus').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_CheckStatusSelect[i] = list[i].Code;
            counterCheckStatus = i + 1;
        }
    };


    self.DelAllCheckStatus = function () {
        list_CheckStatusSelect = new Array();
        counterCheckStatus = 0;
        $('#nameCheckStatus').val(translate('همه موارد'));
        $("#TableBodyListCheckStatus").empty();
    };


    $('#modal-CheckStatus').on('hide.bs.modal', function () {
        if (counterCheckStatus > 0)
            $('#nameCheckStatus').val(counterCheckStatus +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameCheckStatus').val(translate('همه موارد'));
    });

    $('#modal-CheckStatus').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




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

    self.filterAccList = ko.computed(function () {

        self.currentPageIndexAcc(0);
        var filter0 = self.filterAcc0().toUpperCase();
        var filter1 = self.filterAcc1();
        var filter2 = self.filterAcc2();

        if (!filter0 && !filter1 && !filter2) {
            return self.AccList();
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
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
        if (orderProp == null)
            return null
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


    self.AddAcc = function (item) {

        AccCode = item.Code;
        find = false;
        list_AccSelect.forEach(function (item, key) {
            if (item == AccCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListAcc').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_AccSelect[counterAcc] = item.Code;
            counterAcc = counterAcc + 1;
        }
    };


    self.AddAllAcc = function () {
        list_AccSelect = new Array();
        list = self.AccList();
        $("#TableBodyListAcc").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListAcc').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_AccSelect[i] = list[i].Code;
            counterAcc = i + 1;
        }
    };


    self.DelAllAcc = function () {
        list_AccSelect = new Array();
        counterAcc = 0;
        $("#TableBodyListAcc").empty();
    };


    $('#modal-Acc').on('hide.bs.modal', function () {
        if (counterAcc > 0)
            $('#nameAcc').val(counterAcc +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameAcc').val(translate('همه موارد'));
    });

    $('#modal-Acc').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    function getPDMode() {
        select = document.getElementById('PDMode');
        for (var i = 1; i <= 2; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = translate('پرداختنی');
                opt.selected = true;
            }
            if (i == 2) {
                opt.value = 2;
                opt.innerHTML = translate('دریافتنی');
            }
            select.appendChild(opt);
        }
    };



    $("#PDMode").change(function () {
        value = $("#PDMode").val();
        self.DelAllCheckStatus();
        getCheckStatusList(value);
    });


    //------------------------------------------------------
    self.currentPageTChk = ko.observable();
    pageSizeTChk = localStorage.getItem('pageSizeTChk') == null ? 10 : localStorage.getItem('pageSizeTChk');
    self.pageSizeTChk = ko.observable(pageSizeTChk);
    self.currentPageIndexTChk = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterCheckNo = ko.observable("");
    self.filterCheckDate = ko.observable("");
    self.filterAccCode = ko.observable("");
    self.filterAccName = ko.observable("");
    self.filterBank = ko.observable("");
    self.filterShobe = ko.observable("");
    self.filterJari = ko.observable("");
    self.filterTrafCode = ko.observable("");
    self.filterTrafName = ko.observable("");
    self.filterValue = ko.observable("");
    self.filterCheckStatusSt = ko.observable("");
    self.filterCheckRadif = ko.observable("");
    self.filterCheckComm = ko.observable("");
    self.filterCheckVosoolDate = ko.observable("");





    self.filterTChkList = ko.computed(function () {
        self.currentPageIndexTChk(0);
        var filterCheckNo = self.filterCheckNo();
        var filterCheckDate = self.filterCheckDate();
        var filterAccCode = self.filterAccCode();
        var filterAccName = self.filterAccName();
        var filterBank = self.filterBank();
        var filterShobe = self.filterShobe();
        var filterJari = self.filterJari();
        var filterTrafCode = self.filterTrafCode();
        var filterTrafName = self.filterTrafName();
        var filterValue = self.filterValue();
        var filterCheckStatusSt = self.filterCheckStatusSt();
        var filterCheckRadif = self.filterCheckRadif();
        var filterCheckComm = self.filterCheckComm();
        var filterCheckVosoolDate = self.filterCheckVosoolDate();

        filterValue = filterValue.replace("/", ".");

        tempData = ko.utils.arrayFilter(self.TChkList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.CheckNo.toString().toLowerCase(), filterCheckNo) &&
                (item.CheckDate == null ? '' : item.CheckDate.toString().search(filterCheckDate) >= 0) &&
                (item.AccCode == null ? '' : item.AccCode.toString().search(filterAccCode) >= 0) &&
                (item.AccName == null ? '' : item.AccName.toString().search(filterAccName) >= 0) &&
                (item.Bank == null ? '' : item.Bank.toString().search(filterBank) >= 0) &&
                (item.Shobe == null ? '' : item.Shobe.toString().search(filterShobe) >= 0) &&
                (item.Jari == null ? '' : item.Jari.toString().search(filterJari) >= 0) &&
                ko.utils.stringStartsWith(item.TrafCode.toString().toLowerCase(), filterTrafCode) &&
                (item.TrafName == null ? '' : item.TrafName.toString().search(filterTrafName) >= 0) &&
                ko.utils.stringStartsWith(item.Value.toString().toLowerCase(), filterValue) &&
                (item.CheckStatusSt == null ? '' : item.CheckStatusSt.toString().search(filterCheckStatusSt) >= 0) &&
                ko.utils.stringStartsWith(item.CheckRadif.toString().toLowerCase(), filterCheckRadif) &&
                (item.CheckComm == null ? '' : item.CheckComm.toString().search(filterCheckComm) >= 0) &&
                (item.CheckVosoolDate == null ? '' : item.CheckVosoolDate.toString().search(filterCheckVosoolDate) >= 0)

            return result;
        })
        $("#CountRecord").text(tempData.length);
        calcsum(tempData);
        return tempData;

    });




    self.search = ko.observable("");
    self.search(sessionStorage.searchTChk);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTChk = 0;
        sessionStorage.searchTChk = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTChk(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TChkList(), function (item) {
                indexTChk += 1;
                return ko.utils.stringStartsWith(item.CheckNo.toString().toLowerCase(), search);
            });
            if (indexTChk < self.pageSizeTChk())
                self.currentPageIndexTChk(0);
            else {
                var a = Math.round((indexTChk / self.pageSizeTChk()), 0);
                if (a < (indexTChk / self.pageSizeTChk())) a += 1;
                self.currentPageIndexTChk(a - 1);
            }
            return value;
        }
    });


    self.currentPageTChk = ko.computed(function () {
        var pageSizeTChk = parseInt(self.pageSizeTChk(), 10),
            startIndex = pageSizeTChk * self.currentPageIndexTChk(),
            endIndex = startIndex + pageSizeTChk;
        localStorage.setItem('pageSizeTChk', pageSizeTChk);
   return self.filterTChkList().slice(startIndex, endIndex);
    });

    self.nextPageTChk = function () {
        if (((self.currentPageIndexTChk() + 1) * self.pageSizeTChk()) < self.filterTChkList().length) {
            self.currentPageIndexTChk(self.currentPageIndexTChk() + 1);
        }
    };

    self.previousPageTChk = function () {
        if (self.currentPageIndexTChk() > 0) {
            self.currentPageIndexTChk(self.currentPageIndexTChk() - 1);
        }
    };

    self.firstPageTChk = function () {
        self.currentPageIndexTChk(0);
    };

    self.lastPageTChk = function () {
        tempCountTChk = parseInt(self.filterTChkList().length / self.pageSizeTChk(), 10);
        if ((self.filterTChkList().length % self.pageSizeTChk()) == 0)
            self.currentPageIndexTChk(tempCountTChk - 1);
        else
            self.currentPageIndexTChk(tempCountTChk);
    };

    self.sortTableTChk = function (viewModel, e) {
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
        self.TChkList.sort(function (left, right) {
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

        self.iconTypeCheckNo('');
        self.iconTypeCheckDate('');
        self.iconTypeAccCode('');
        self.iconTypeAccName('');
        self.iconTypeBank('');
        self.iconTypeShobe('');
        self.iconTypeJari('');
        self.iconTypeTrafCode('');
        self.iconTypeTrafName('');
        self.iconTypeValue('');
        self.iconTypeCheckStatusSt('');
        self.iconTypeCheckRadif('');
        self.iconTypeCheckComm('');
        self.iconTypeCheckVosoolDate('');


        if (orderProp == 'CheckNo') self.iconTypeCheckNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckDate') self.iconTypeCheckDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortAccCode') self.iconTypeAccCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccName') self.iconTypeAccName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bank') self.iconTypeBank((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Shobe') self.iconTypeShobe((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Jari') self.iconTypeJari((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafCode') self.iconTypeTrafCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafName') self.iconTypeTrafName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Value') self.iconTypeValue((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckStatusSt') self.iconTypeCheckStatusSt((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckRadif') self.iconTypeCheckRadif((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckComm') self.iconTypeCheckComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckVosoolDate') self.iconTypeCheckVosoolDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    }


    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCheckDate = ko.observable("");
    self.iconTypeCheckNo = ko.observable("");
    self.iconTypeAccCode = ko.observable("");
    self.iconTypeAccName = ko.observable("");
    self.iconTypeBank = ko.observable("");
    self.iconTypeShobe = ko.observable("");
    self.iconTypeJari = ko.observable("");
    self.iconTypeTrafCode = ko.observable("");
    self.iconTypeTrafName = ko.observable("");
    self.iconTypeValue = ko.observable("");
    self.iconTypeCheckStatusSt = ko.observable("");
    self.iconTypeCheckRadif = ko.observable("");
    self.iconTypeCheckComm = ko.observable("");
    self.iconTypeCheckVosoolDate = ko.observable("");


    self.radif = function (index) {
        countShow = self.pageSizeTChk();
        page = self.currentPageIndexTChk();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTChk">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('CheckNo', data) +
            CreateTableTh('CheckDate', data) +
            CreateTableTh('AccCode', data) +
            CreateTableTh('AccName', data) +
            CreateTableTh('Bank', data) +
            CreateTableTh('Shobe', data) +
            CreateTableTh('Jari', data) +
            CreateTableTh('TrafCode', data) +
            CreateTableTh('TrafName', data) +
            CreateTableTh('Value', data) +
            CreateTableTh('CheckStatusSt', data) +
            CreateTableTh('CheckRadif', data) +
            CreateTableTh('CheckComm', data) +
            CreateTableTh('CheckVosoolDate', data) +
            //'<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageTChk" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('CheckNo', 0, 0, data) +
            CreateTableTd('CheckDate', 0, 0, data) +
            CreateTableTd('AccCode', 0, 0, data) +
            CreateTableTd('AccName', 0, 0, data) +
            CreateTableTd('Bank', 0, 0, data) +
            CreateTableTd('Shobe', 0, 0, data) +
            CreateTableTd('Jari', 0, 0, data) +
            CreateTableTd('TrafCode', 0, 0, data) +
            CreateTableTd('TrafName', 0, 0, data) +
            CreateTableTd('Value', sessionStorage.Deghat, 2, data) +
            CreateTableTd('CheckStatusSt', 0, 0, data) +
            CreateTableTd('CheckRadif', 0, 0, data) +
            CreateTableTd('CheckComm', 0, 0, data) +
            CreateTableTd('CheckVosoolDate', 0, 0, data) +
            /*'<td>' +
            '    <a data-bind="click: $root.ShowAFISanad">' +
            '        <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px" />' +
            '    </a >' +
            '</td >' +*/
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            
            '<td style="background-color: #e37d228f !important;">' + translate('جمع') + '</td>' +
            CreateTableTdSum('CheckNo', 0, data) +
            CreateTableTdSum('CheckDate', 1, data) +
            CreateTableTdSum('AccCode', 1, data) +
            CreateTableTdSum('AccName', 1, data) +
            CreateTableTdSum('Bank', 1, data) +
            CreateTableTdSum('Shobe', 1, data) +
            CreateTableTdSum('Jari', 1, data) +
            CreateTableTdSum('TrafCode', 1, data) +
            CreateTableTdSum('TrafName', 1, data) +
            CreateTableTdSum('Value', 2, data) +
            CreateTableTdSum('CheckStatusSt', 1, data) +
            CreateTableTdSum('CheckRadif', 1, data) +
            CreateTableTdSum('CheckComm', 1, data) +
            CreateTableTdSum('CheckVosoolDate', 1, data) +
            //'<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('CheckNo', data) +
            CreateTableTdSearch('CheckDate', data) +
            CreateTableTdSearch('AccCode', data) +
            CreateTableTdSearch('AccName', data) +
            CreateTableTdSearch('Bank', data) +
            CreateTableTdSearch('Shobe', data) +
            CreateTableTdSearch('Jari', data) +
            CreateTableTdSearch('TrafCode', data) +
            CreateTableTdSearch('TrafName', data) +
            CreateTableTdSearch('Value', data) +
            CreateTableTdSearch('CheckStatusSt', data) +
            CreateTableTdSearch('CheckRadif', data) +
            CreateTableTdSearch('CheckComm', data) +
            CreateTableTdSearch('CheckVosoolDate', data) +
            //'<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }





    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);

        sortField =
            field == 'MkzCode' ? 'SortMkzCode' :
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

        CheckStatusSt1 = 'نامشخص';
        CheckStatusSt2 = 'نزد صندوق';
        CheckStatusSt3 = 'در جریان وصول';
        CheckStatusSt4 = 'برگشتی';
        CheckStatusSt5 = 'عودت';
        CheckStatusSt6 = 'واگذار شده';
        CheckStatusSt7 = 'پاس شده';
        CheckStatusSt8 = 'صادر شده';
        CheckStatusSt9 = 'وصول شده';

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + ', style: { color: ' + field + ' == \'نامشخص\' ? \'red\' : ' + field + ' == \'پاس شده\' || ' + field + ' == \'وصول شده\'  ? \'green\' : ' + field + ' == \'برگشتی\' || ' + field + ' == \'عودت\' || ' + field + ' == \'واگذار شده\'  ? \'#ec8121\' :  \'black\' }"></td>';
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
        text += ' form-control" style="height: 2.4rem;direction: ltr;text-align: right;" /> </td>';
        return text;
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
        setReport(self.TChkList(), data, printVariable);
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
        setReport(self.TChkList(), '', printVariable);
    });


    $('#Print').click(function () {
        createViewer();
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportTChk";
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
        setReport(self.TChkList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });

   

};

ko.applyBindings(new ViewModel());

