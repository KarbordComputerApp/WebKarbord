var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.AccList = ko.observableArray([]); // ليست طرف حساب ها
    self.CheckStatusList = ko.observableArray([]); // ليست نوع چک ها

    self.CheckInfList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس طرف حساب ها
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    var CheckInfUri = server + '/api/ReportAcc/CheckInf/'; // آدرس گزارش 
    var CheckStatusUri = server + '/api/ADocData/CheckStatus/'; // آدرس وضعیت  

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);

    self.AzShomarh = ko.observable();
    self.TaShomarh = ko.observable();
    self.AccCode = ko.observable();

    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });



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
    function getCheckStatusList() {
        progName = getProgName('A');
        ajaxFunction(CheckStatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
            self.CheckStatusList(data);
        });
    }


    //Get RprtCols List
    function getRprtColsList() {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/CheckInf/' + sessionStorage.userName, 'GET').done(function (data) {
            CreateTableReport(data);
        });
    }


    $("#CreateReport").click(function () {
        getCheckInf();
    });


    getAccList();
    getCheckStatusList();

    $('#nameAcc').val('همه موارد');

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
            text: "لیست طرف حساب ها به روز رسانی شود ؟",
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


    self.selectAcc = function (item) {
        $('#nameAcc').val('(' + item.Code + ') ' + item.Name);
        self.AccCode(item.Code);
    }


    $('#modal-Acc').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


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
                    item.CheckStatus == null ? '' : item.CheckStatus.toString().search(filter0) >= 0
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

        self.iconTypeCheckStatus('');


        if (orderProp == 'CheckStatus') self.iconTypeCheckStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
                getCheckStatusList();
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
                + ' <td data-bind="text: CheckStatus">' + item.CheckStatus + '</td > '
                + '</tr>'
            );
            list_CheckStatusSelect[counterCheckStatus] = item.CheckStatus;
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
                + ' <td data-bind="text: CheckStatus">' + list[i].CheckStatus + '</td > '
                + '</tr>'
            );
            list_CheckStatusSelect[i] = list[i].CheckStatus;
            counterCheckStatus = i + 1;
        }
    };


    self.DelAllCheckStatus = function () {
        list_CheckStatusSelect = new Array();
        counterCheckStatus = 0;
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
            text: "لیست طرف حساب ها به روز رسانی شود ؟",
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




    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + field + '">' +
            '<span>' + TextField + '</span>' +
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

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10))"></td>'
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

