var ViewModel = function () {
    var self = this;
    var flagupdateHeader = 0;

    self.AccList = ko.observableArray([]); // لیست حساب ها
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.AModeList = ko.observableArray([]); // لیست نوع سند ها

    self.AGMkzList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند  

    var AGMkzUri = server + '/api/ReportAcc/AGMkz/'; // آدرس گزارش 
    var AGMkzCountUri = server + '/api/ReportAcc/AGMkzCount/'; // تعداد رکورد های گزارش 
   // var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    TestUser();

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);

    //$('#aztarikh').val(sessionStorage.BeginDate);
    //$('#tatarikh').val(sessionStorage.EndDate);
    // $('#tatarikh').change();



    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });


    var AccCode = '';
    var counterAcc = 0;
    var list_AccSelect = new Array();
    var list_AccNameSelect = new Array();

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



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'AGMkz';
    var columns = [
        'MkzCode',
        'MkzName',
        'AccCode',
        'AccName',
        'Bede',
        'Best',
        'MonBede',
        'MonBest',
        'MonTotal'
    ];

    //Get RprtCols 
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/AGMkz", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/AGMkz", columns, self.SettingColumnList());
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



    getAModeList();
    getLevel();


    $('#nameAcc').val(translate('همه موارد'));
    $('#nameOpr').val(translate('همه موارد'));
    $('#nameMkz').val(translate('همه موارد'));
    $('#nameAMode').val(translate('همه موارد'));



    var azTarikh;
    var taTarikh;
    var level;
    var accCode;
    var accName;
    var aModeCode;
    var aModeName;
    var mkzcode;
    var mkzname;
    var oprcode;
    var oprname;

    function SetFilter() {
        azTarikh = self.AzDate().toEnglishDigit();//$("#aztarikh").val().toEnglishDigit();
        taTarikh = self.TaDate().toEnglishDigit();// $("#tatarikh").val().toEnglishDigit();

        level = $("#Level").val();

        accCode = '';
        accName = '';
        for (var i = 0; i <= counterAcc - 1; i++) {
            if (i < counterAcc - 1) {
                accCode += list_AccSelect[i] + '*';
                accName += list_AccNameSelect[i] + '*';
            }
            else {
                accCode += list_AccSelect[i];
                accName += list_AccNameSelect[i];
            }
        }


        aModeCode = '';
        aModeName = '';
        for (var i = 0; i <= counterAMode - 1; i++) {
            if (i < counterAMode - 1) {
                aModeCode += list_AModeSelect[i] + '*';
                aModeName += list_AModeNameSelect[i] + '*';
            }
            else {
                aModeCode += list_AModeSelect[i];
                aModeName += list_AModeNameSelect[i];
            }
        }


        mkzcode = '';
        mkzname = '';
        for (var i = 0; i <= counterMkz - 1; i++) {
            if (i < counterMkz - 1) {
                mkzcode += list_MkzSelect[i] + '*';
                mkzname += list_MkzNameSelect[i] + '*';
            }
            else {
                mkzcode += list_MkzSelect[i];
                mkzname += list_MkzNameSelect[i];
            }
        }

        oprcode = '';
        oprname = '';
        for (var i = 0; i <= counterOpr - 1; i++) {
            if (i < counterOpr - 1) {
                oprcode += list_OprSelect[i] + '*';
                oprname += list_OprNameSelect[i] + '*';
            }
            else {
                oprcode += list_OprSelect[i];
                oprname += list_OprNameSelect[i];
            }
        }
    }



    //Get AGMkz
    function getAGMkz() {
        SetFilter();
        var AGMkzObject = {
            azTarikh: azTarikh,
            taTarikh: taTarikh,
            AModeCode: aModeCode,
            AccCode: accCode,
            MkzCode: mkzcode,
            OprCode: oprcode,
            Level: level
        };

        ajaxFunction(AGMkzUri + ace + '/' + sal + '/' + group, 'POST', AGMkzObject, true).done(function (response) {
            self.AGMkzList(response);
            //calcsum(self.AGMkzList());
        });
    }

    function calcsum(list) {
        totalBede = 0;
        totalBest = 0;
        totalMonBede = 0;
        totalMonBest = 0;
        totalMonTotal = 0;

        for (var i = 0; i < list.length; ++i) {
            AGMkzData = list[i];

            if (AGMkzData.Tag == 1) {
                totalBede += AGMkzData.Bede;
                totalBest += AGMkzData.Best;
            }
        }

        totalMonBede = totalBede > totalBest ? totalBede - totalBest : 0;
        totalMonBest = totalBede < totalBest ? totalBest - totalBede : 0;
        totalMonTotal = totalMonBede > 0 ? totalMonBede : totalMonBest * -1;

        // $("#textTotal").text('جمع');
        $("#totalBede").text(NumberToNumberString(totalBede));
        $("#totalBest").text(NumberToNumberString(totalBest));
        $("#totalMonBede").text(NumberToNumberString(totalMonBede));
        $("#totalMonBest").text(NumberToNumberString(totalMonBest));
        $("#totalMonTotal").text(totalMonTotal >= 0 ? NumberToNumberString(totalMonTotal) : '(' + NumberToNumberString(Math.abs(totalMonTotal)) + ')');
    }

    $("#CreateReport").click(function () {
        getAGMkz();
        self.sortTableAGMkz();
    });







    //Level AccCode  AccName Bede Best MonBede MonBest  MonTotal




    //------------------------------------------------------
    self.currentPageAGMkz = ko.observable();
    pageSizeAGMkz = localStorage.getItem('pageSizeAGMkz') == null ? 10 : localStorage.getItem('pageSizeAGMkz');
    self.pageSizeAGMkz = ko.observable(pageSizeAGMkz);
    self.currentPageIndexAGMkz = ko.observable(0);
    self.iconType = ko.observable("");

    self.iconTypeMkzCode = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeAccCode = ko.observable("");
    self.iconTypeAccName = ko.observable("");
    self.iconTypeBede = ko.observable("");
    self.iconTypeBest = ko.observable("");
    self.iconTypeMonBede = ko.observable("");
    self.iconTypeMonBest = ko.observable("");
    self.iconTypeMonTotal = ko.observable("");


    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal
    // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal

    self.filterMkzCode = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterAccCode = ko.observable("");
    self.filterAccName = ko.observable("");
    self.filterBede = ko.observable("");
    self.filterBest = ko.observable("");
    self.filterMonBede = ko.observable("");
    self.filterMonBest = ko.observable("");
    self.filterMonTotal = ko.observable("");

    self.filterAGMkzList = ko.computed(function () {

        self.currentPageIndexAGMkz(0);
        var filterMkzCode = self.filterMkzCode();
        var filterMkzName = self.filterMkzName();
        var filterAccCode = self.filterAccCode();
        var filterAccName = self.filterAccName();
        var filterBede = self.filterBede();
        var filterBest = self.filterBest();
        var filterMonBede = self.filterMonBede();
        var filterMonBest = self.filterMonBest();
        var filterMonTotal = self.filterMonTotal();

        filterBede = filterBede.replace("/", ".");
        filterBest = filterBest.replace("/", ".");
        filterMonBede = filterMonBede.replace("/", ".");
        filterMonBest = filterMonBest.replace("/", ".");
        filterMonTotal = filterMonTotal.replace("/", ".");


        tempData = ko.utils.arrayFilter(self.AGMkzList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.MkzCode.toString().toLowerCase(), filterMkzCode) &&
                (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                ko.utils.stringStartsWith(item.AccCode.toString().toLowerCase(), filterAccCode) &&
                (item.AccName == null ? '' : item.AccName.toString().search(filterAccName) >= 0) &&
                ko.utils.stringStartsWith(item.Bede.toString().toLowerCase(), filterBede) &&
                ko.utils.stringStartsWith(item.Best.toString().toLowerCase(), filterBest) &&
                ko.utils.stringStartsWith(item.MonBede.toString().toLowerCase(), filterMonBede) &&
                ko.utils.stringStartsWith(item.MonBest.toString().toLowerCase(), filterMonBest) &&
                ko.utils.stringStartsWith(item.MonTotal.toString().toLowerCase(), filterMonTotal)
            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchAGMkz);
    self.firstMatch = ko.dependentObservable(function () {
        var indexAGMkz = 0;
        sessionStorage.searchAGMkz = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexAGMkz(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.AGMkzList(), function (item) {
                indexAGMkz += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexAGMkz < self.pageSizeAGMkz())
                self.currentPageIndexAGMkz(0);
            else {
                var a = Math.round((indexAGMkz / self.pageSizeAGMkz()), 0);
                if (a < (indexAGMkz / self.pageSizeAGMkz())) a += 1;
                self.currentPageIndexAGMkz(a - 1);
            }
            return value;
        }
    });


    self.currentPageAGMkz = ko.computed(function () {
        var pageSizeAGMkz = parseInt(self.pageSizeAGMkz(), 10),
            startIndex = pageSizeAGMkz * self.currentPageIndexAGMkz(),
            endIndex = startIndex + pageSizeAGMkz;
        localStorage.setItem('pageSizeAGMkz', pageSizeAGMkz);
        return self.filterAGMkzList().slice(startIndex, endIndex);
    });

    self.nextPageAGMkz = function () {
        if (((self.currentPageIndexAGMkz() + 1) * self.pageSizeAGMkz()) < self.filterAGMkzList().length) {
            self.currentPageIndexAGMkz(self.currentPageIndexAGMkz() + 1);
        }
    };

    self.previousPageAGMkz = function () {
        if (self.currentPageIndexAGMkz() > 0) {
            self.currentPageIndexAGMkz(self.currentPageIndexAGMkz() - 1);
        }
    };

    self.firstPageAGMkz = function () {
        self.currentPageIndexAGMkz(0);
    };

    self.lastPageAGMkz = function () {
        tempCountAGMkz = parseInt(self.filterAGMkzList().length / self.pageSizeAGMkz(), 10);
        if ((self.filterAGMkzList().length % self.pageSizeAGMkz()) == 0)
            self.currentPageIndexAGMkz(tempCountAGMkz - 1);
        else
            self.currentPageIndexAGMkz(tempCountAGMkz);
    };

    self.sortTableAGMkz = function (viewModel, e) {
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
        self.AGMkzList.sort(function (left, right) {
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



        self.iconTypeMkzCode('');
        self.iconTypeMkzName('');
        self.iconTypeAccCode('');
        self.iconTypeAccName('');
        self.iconTypeBede('');
        self.iconTypeBest('');
        self.iconTypeMonBede('');
        self.iconTypeMonBest('');
        self.iconTypeMonTotal('');

        if (orderProp == 'SortMkzCode') self.iconTypeMkzCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortAccCode') self.iconTypeAccCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccName') self.iconTypeAccName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bede') self.iconTypeBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Best') self.iconTypeBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonBede') self.iconTypeMonBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonBest') self.iconTypeMonBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MonTotal') self.iconTypeMonTotal((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    }


    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageAcc = ko.observable();
    pageSizeAcc = localStorage.getItem('pageSizeAcc') == null ? 10 : localStorage.getItem('pageSizeAcc');
    self.pageSizeAcc = ko.observable(pageSizeAcc);
    self.currentPageIndexAcc = ko.observable(0);

    self.filterAcc0 = ko.observable("");
    self.filterAcc1 = ko.observable("");
    self.filterAcc2 = ko.observable("");
    //self.filterAcc3 = ko.observable("");

    self.filterAccList = ko.computed(function () {

        self.currentPageIndexAcc(0);
        var filter0 = self.filterAcc0().toUpperCase();
        var filter1 = self.filterAcc1();
        var filter2 = self.filterAcc2();
        //var filter3 = self.filterAcc3();

        if (!filter0 && !filter1 && !filter2) {
            return self.AccList();
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) //&&
                    //ko.utils.stringStartsWith(item.Level.toString().toLowerCase(), filter3)
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
            list_AccNameSelect[counterAcc] = item.Name;
            counterAcc = counterAcc + 1;
        }
    };


    self.AddAllAcc = function () {
        list_AccSelect = new Array();
        list_AccNameSelect = new Array();
        list = self.filterAccList();
        $("#TableBodyListAcc").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListAcc').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_AccSelect[i] = list[i].Code;
            list_AccNameSelect[i] = list[i].Name;
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
            $('#nameAcc').val(counterAcc + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameAcc').val(translate('همه موارد'));
    });

    $('#modal-Acc').on('shown.bs.modal', function () {

        level = $("#Level").val();
        //level == 1 ? self.filterAcc3("1") : self.filterAcc3("")

        $("#TableBodyListAcc").empty();
        for (var i = 0; i < counterAcc; i++) {
            if (list_AccSelect[i] != "") {
                $('#TableBodyListAcc').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_AccSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_AccNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }

        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageMkz = ko.observable();
    pageSizeMkz = localStorage.getItem('pageSizeMkz') == null ? 10 : localStorage.getItem('pageSizeMkz');
    self.pageSizeMkz = ko.observable(pageSizeMkz);
    self.currentPageIndexMkz = ko.observable(0);

    self.filterMkz0 = ko.observable("");
    self.filterMkz1 = ko.observable("");
    self.filterMkz2 = ko.observable("");
    self.filterMkz3 = ko.observable("");

    self.filterMkzList = ko.computed(function () {

        self.currentPageIndexMkz(0);
        var filter0 = self.filterMkz0().toUpperCase();
        var filter1 = self.filterMkz1();
        var filter2 = self.filterMkz2();
        var filter3 = self.filterMkz3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.MkzList();
        } else {
            tempData = ko.utils.arrayFilter(self.MkzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                        (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                        (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                        filter3 != '' ? item.Level <= filter3 : ''
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
        if (orderProp == null)
            return null
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

        level = $("#Level").val();
        self.filterMkz3(level);

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
        if (orderProp == null)
            return null
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
        if (orderProp == null)
            return null
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


   /* self.ShowADocR = function (Band) {
        SetFilter();
        localStorage.setItem("AzTarikhReport", azTarikh);
        localStorage.setItem("TaTarikhReport", taTarikh);
        localStorage.setItem("AccCodeReport", Band.AccCode);
        localStorage.setItem("AccNameReport", Band.AccName);
        localStorage.setItem("AModeCodeReport", aModeCode);
        localStorage.setItem("AModeNameReport", aModeName);
        localStorage.setItem("MkzCodeReport", Band.MkzCode);
        localStorage.setItem("MkzNameReport", Band.MkzName);
        localStorage.setItem("OprCodeReport", oprcode);
        localStorage.setItem("OprNameReport", oprname);
        window.open(sessionStorage.urlADocR, '_blank');
    }*/

    self.ShowDftr = function (Band) {
        SetFilter();
        localStorage.setItem("AzTarikhReport", azTarikh);
        localStorage.setItem("TaTarikhReport", taTarikh);
        localStorage.setItem("AccCodeReport", Band.AccCode);
        localStorage.setItem("AccNameReport", Band.AccName);
        localStorage.setItem("AModeCodeReport", aModeCode);
        localStorage.setItem("AModeNameReport", aModeName);
        localStorage.setItem("MkzCodeReport", Band.MkzCode);
        localStorage.setItem("MkzNameReport", Band.MkzName);
        localStorage.setItem("OprCodeReport", oprcode);
        localStorage.setItem("OprNameReport", oprname);
        window.open(sessionStorage.urlDftr, '_blank');
    }



    AccCodeReport = localStorage.getItem("AccCodeReport");
    localStorage.setItem("AccCodeReport", null);
    if (AccCodeReport != "null") {

        AccNameReport = localStorage.getItem("AccNameReport");
        counterAcc = 1;
        list_AccSelect[0] = AccCodeReport;
        list_AccNameSelect[0] = AccNameReport;
        $('#nameAcc').val(counterAcc + ' ' + translate('مورد انتخاب شده'));



        old_LevelReport = parseInt(localStorage.getItem("LevelReport"));
        $("#Level").val(old_LevelReport + 1);


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

        getAGMkz();
    }






    self.radif = function (index) {
        countShow = self.pageSizeAGMkz();
        page = self.currentPageIndexAGMkz();
        calc = (countShow * page) + 1;
        return index + calc;
    }


    self.AccessAction = function (nameRprt) {
        if (nameRprt == "ADocR")
            res = $("#ADocR").css("display") != "none"
        else if (nameRprt == "Dftr")
            res = $("#Dftr").css("display") != "none"

        return res;
    }

    //$("#ADocR").hide();
    //$("#Dftr").hide();

    function CreateTableReport(data) {
        $("#TableReport").empty();

        createTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableAGMkz">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('AccCode', data) +
            CreateTableTh('AccName', data) +
            CreateTableTh('Bede', data) +
            CreateTableTh('Best', data) +
            CreateTableTh('MonBede', data) +
            CreateTableTh('MonBest', data) +
            CreateTableTh('MonTotal', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind=" {foreach: currentPageAGMkz}" style="cursor: default;">' +
            '     <tr data-bind="style: { \'background-color\': Tag == 0 ? \'#f5efeb\' : \'\' }" >' +

            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('AccCode', 0, 0, data) +
            CreateTableTd('AccName', 0, 0, data) +
            CreateTableTd('Bede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('Best', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBest', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonTotal', sessionStorage.Deghat, 2, data) +
            '<td>' +
           '<a data-bind="visible: $root.AccessAction(\'ADocR\') == true && AccCode != \'\' " class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            '</a>' +
            '<ul class="dropdown-menu">' +
            '    <li>' +
            '        <a  data-bind="click: $root.ShowDftr" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px">' +
            '            دفتر حساب' +
            '        </a>' +
            '    </li>' +
            '</td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td style="background-color: #e37d228f !important;">' + translate('جمع') + '</td>' +
            CreateTableTdSum('MkzCode', 0, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('AccCode', 0, data) +
            CreateTableTdSum('AccName', 1, data) +
            CreateTableTdSum('Bede', 2, data) +
            CreateTableTdSum('Best', 2, data) +
            CreateTableTdSum('MonBede', 2, data) +
            CreateTableTdSum('MonBest', 2, data) +
            CreateTableTdSum('MonTotal', 2, data) +
            '<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('AccCode', data) +
            CreateTableTdSearch('AccName', data) +
            CreateTableTdSearch('Bede', data) +
            CreateTableTdSearch('Best', data) +
            CreateTableTdSearch('MonBede', data) +
            CreateTableTdSearch('MonBest', data) +
            CreateTableTdSearch('MonTotal', data) +
            '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        $('#TableReport').append(
            createTable
        );
    }

    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);

        sortField = field == 'DocNo' ? 'SortDocNo' :
            field == 'MkzCode' ? 'SortMkzCode' :
                field == 'AccCode' ? 'SortAccCode' :
                    field

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








    function getLevel() {
        select = document.getElementById('Level');
        for (var i = 0; i <= 2; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 1;
                opt.innerHTML = translate('سطح 1');
                opt.selected = true;
            }
            if (i == 1) {
                opt.value = 2;
                opt.innerHTML = translate('سطح 2');
            }
            if (i == 2) {
                opt.value = 3;
                opt.innerHTML = translate('سطح 3');
            }
            select.appendChild(opt);
        }
    };




    $('.fix').attr('class', 'form-line date focused fix');

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
        setReport(self.AGMkzList(), data, printVariable);
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
        setReport(self.AGMkzList(), '', printVariable);
    });


    $('#Print').click(function () {
        createViewer();
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportAGMkz";
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
        setReport(self.AGMkzList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


};

ko.applyBindings(new ViewModel());