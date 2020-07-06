var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.AccList = ko.observableArray([]); // ليست حساب ها
    self.CheckStatusList = ko.observableArray([]); // ليست نوع چک ها

    self.TChkList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    var TChkUri = server + '/api/ReportAcc/TChk/'; // آدرس گزارش 
    var CheckStatusUri = server + '/api/ADocData/CheckStatus/'; // آدرس وضعیت  

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.AzDate = ko.observable("");
    self.TaDate = ko.observable("");

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();
    self.AccCode = ko.observable();

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

    //Get Acc List
    function getAccList() {
        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AccList(data);
        });
    }


    //Get CheckStatus List
    function getCheckStatusList(PDMode) {
        ajaxFunction(CheckStatusUri + ace + '/' + sal + '/' + group + '/' + PDMode, 'GET').done(function (data) {
            self.CheckStatusList(data);
        });
    }


    //Get RprtCols List
    function getRprtColsList() {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/TChk/' + sessionStorage.userName, 'GET').done(function (data) {
            CreateTableReport(data);
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
        ajaxFunction(TChkUri + ace + '/' + sal + '/' + group, 'POST', TChkObject).done(function (response) {
            self.TChkList(response);
        });
    }

    function calcsum(list) {
        totalvalue = 0;
        for (var i = 0; i < list.length; ++i) {
            TChkData = list[i];
            totalvalue += TChkData.Value;
        }

        $("#textTotal").text('جمع');
        $("#totalValue").text(NumberToNumberString(totalvalue));
    }

    $("#CreateReport").click(function () {
        getTChk();
    });


    getRprtColsList();
    getPDMode();
    getAccList();
    getCheckStatusList(1);

    $('#nameAcc').val('همه موارد');
    $('#nameCheckStatus').val('همه موارد');

    self.currentPageCheckStatus = ko.observable();
    self.pageSizeCheckStatus = ko.observable(10);
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
        self.currentColumn(orderProp);
        self.CheckStatusList.sort(function (left, right) {
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

        self.iconTypeName('');


        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshCheckStatus').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست وضعیت چک به روز رسانی شود ؟",
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
        $('#nameCheckStatus').val('همه موارد');
        $("#TableBodyListCheckStatus").empty();
    };


    $('#modal-CheckStatus').on('hide.bs.modal', function () {
        if (counterCheckStatus > 0)
            $('#nameCheckStatus').val(counterCheckStatus + ' مورد انتخاب شده ')
        else
            $('#nameCheckStatus').val('همه موارد');
    });

    $('#modal-CheckStatus').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");


    self.currentPageAcc = ko.observable();
    self.pageSizeAcc = ko.observable(10);
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
        self.currentColumn(orderProp);
        self.AccList.sort(function (left, right) {
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

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    $('#refreshAcc').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست حساب ها به روز رسانی شود ؟",
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
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
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
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
            $('#nameAcc').val(counterAcc + ' مورد انتخاب شده ')
        else
            $('#nameAcc').val('همه موارد');
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
                opt.innerHTML = 'پرداختنی';
                opt.selected = true;
            }
            if (i == 2) {
                opt.value = 2;
                opt.innerHTML = 'دریافتنی';
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
    self.pageSizeTChk = ko.observable(10);
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
                (item.CheckStatusSt == null ? '' : item.CheckStatusSt.toString().search(filterCheckStatusSt) >= 0)
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
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.TChkList.sort(function (left, right) {
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



        if (orderProp == 'CheckNo') self.iconTypeCheckNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckDate') self.iconTypeCheckDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccCode') self.iconTypeAccCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccName') self.iconTypeAccName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bank') self.iconTypeBank((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Shobe') self.iconTypeShobe((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Jari') self.iconTypeJari((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafCode') self.iconTypeTrafCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafName') self.iconTypeTrafName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Value') self.iconTypeValue((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckStatusSt') self.iconTypeCheckStatusSt((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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

    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTChk">' +
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
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageTChk" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
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
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
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
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
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
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }



    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + field + '">' +
            '<span data-column="' + field + '">' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + field + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }" ></i> </span> ' +
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
                text += 'data-bind="text: ' + field + ', style: { color: ' + field + ' == \'پاس شده\' ? \'blue\' : \'black\' }"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10)), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\'" style="text-align: right;"></td>'
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
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\'" type="text" class="form-control" style="height: 2.4rem;" /> </td>';
        return text;
    }


};

ko.applyBindings(new ViewModel());

