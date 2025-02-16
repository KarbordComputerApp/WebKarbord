var ViewModel = function () {
    var self = this;
    var flagupdateHeader = 0;

    self.AccList = ko.observableArray([]); // لیست حساب ها
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.ZGruAccList = ko.observableArray([]); // لیست گزوه زیرحساب ها
    self.ZAccList = ko.observableArray([]); // لیست زیرحساب ها
    self.AModeList = ko.observableArray([]); // لیست نوع سند ها
    self.StatusList = ko.observableArray([]); // لیست وضعیت سند ها

    self.GrdZAccList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var ZGruAccUri = server + '/api/Web_Data/ZGruAcc/'; // آدرس گروه زیر حساب 
    var ZAccUri = server + '/api/Web_Data/ZAcc/'; // آدرس زیرحساب 
    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند  
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت  

    var GrdZAccUri = server + '/api/ReportAcc/GrdZAcc/'; // آدرس گزارش 
    var GrdZAccCountUri = server + '/api/ReportAcc/GrdZAccCount/'; // تعداد رکورد های گزارش 
    // var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    TestUser();

    getParamAcc();

    self.AzDate = ko.observable(sessionStorage.BeginDateAcc);
    self.TaDate = ko.observable(sessionStorage.EndDateAcc);


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


    var zGruCode = '';
    var counterZGruAcc = 0;
    var list_ZGruAccSelect = new Array();
    var list_zGruNameSelect = new Array();

    var zAccCode = '';
    var counterZAcc = 0;
    var list_ZAccSelect = new Array();
    var list_ZAccNameSelect = new Array();

    var AModeCode = '';
    var counterAMode = 0;
    var list_AModeSelect = new Array();
    var list_AModeNameSelect = new Array();

    var statusCode = '';
    var counterStatus = 0;
    var list_StatusSelect = new Array();

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'GrdZAcc';
    var columns = [
        'ZAccCode',
        'ZAccName',
        'AccCode',
        'AccName',
        'Bede',
        'Best',
        'MonBede',
        'MonBest',
        'MonTotal'
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
        /*   ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/GrdZAcc", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/ReportAFI/GrdZAcc", columns, self.SettingColumnList());
    });

    getRprtColsList(true, sessionStorage.userName);




    function getAccList() {
        whereAcc = localStorage.getItem('whereAcc');
        var AccObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
            Where: whereAcc
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

    //Get ZGruAcc List
    function getZGruAccList() {
        ajaxFunction(ZGruAccUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.ZGruAccList(data);
        });
    }
    $('#btnZGruAcc').click(function () {
        if (self.ZGruAccList().length == 0) {
            getZGruAccList();
        }
    });

    //Get ZAcc List
    function getZAccList() {
        ajaxFunction(ZAccUri + ace + '/' + sal + '/' + group, 'POST', true, true).done(function (data) {
            self.ZAccList(data);
        });
    }
    $('#btnZAcc').click(function () {
        if (self.ZAccList().length == 0) {
            getZAccList();
        }
    });


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
    getStatusList();
    getAModeList();


    $('#nameAcc').val(translate('همه موارد'));
    $('#nameOpr').val(translate('همه موارد'));
    $('#nameMkz').val(translate('همه موارد'));
    $('#nameZGruAcc').val(translate('همه موارد'));
    $('#nameZAcc').val(translate('همه موارد'));
    $('#nameAMode').val(translate('همه موارد'));
    $('#nameStatus').val(translate('همه موارد'));


    var azTarikh;
    var taTarikh;
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
        zGruCode = '';
        zGruName = '';
        for (var i = 0; i <= counterZGruAcc - 1; i++) {
            if (i < counterZGruAcc - 1) {
                zGruCode += list_ZGruAccSelect[i] + '*';
                zGruName += list_zGruNameSelect[i] + '*';
            }
            else {
                zGruCode += list_ZGruAccSelect[i];
                zGruName += list_zGruNameSelect[i];
            }
        }


        zAccCode = '';
        zAccName = '';
        for (var i = 0; i <= counterZAcc - 1; i++) {
            if (i < counterZAcc - 1) {
                zAccCode += list_ZAccSelect[i] + '*';
                zAccName += list_ZAccNameSelect[i] + '*';
            }
            else {
                zAccCode += list_ZAccSelect[i];
                zAccName += list_ZAccNameSelect[i];
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

        statusCode = '';
        for (var i = 0; i <= counterStatus - 1; i++) {
            if (i < counterStatus - 1)
                statusCode += list_StatusSelect[i] + '*';
            else
                statusCode += list_StatusSelect[i];
        }
    }



    //Get GrdZAcc
    function getGrdZAcc() {
        SetFilter();


        var GrdZAccObject = {
            azTarikh: azTarikh,
            taTarikh: taTarikh,
            AModeCode: aModeCode,
            AccCode: accCode,
            ZGruCode: zGruCode,
            ZAccCode: zAccCode,
            MkzCode: mkzcode,
            OprCode: oprcode 
        };

        ajaxFunction(GrdZAccUri + ace + '/' + sal + '/' + group, 'POST', GrdZAccObject, true).done(function (response) {
            self.GrdZAccList(response);
            //calcsum(self.GrdZAccList());
        });
    }

    function calcsum(list) {
        totalBede = 0;
        totalBest = 0;
        totalMonBede = 0;
        totalMonBest = 0;
        totalMonTotal = 0;



        for (var i = 0; i < list.length; ++i) {
            GrdZAccData = list[i];
            if (GrdZAccData.Tag > 1) {
                totalBede += GrdZAccData.Bede;
                totalBest += GrdZAccData.Best;
                //totalMonBede += GrdZAccData.MonBede;
                //totalMonBest += GrdZAccData.MonBest;
                //totalMonTotal += GrdZAccData.MonTotal;
            }
        }

        totalMonTotal = totalBede - totalBest;
        totalMonBede = totalMonTotal >= 0 ? totalMonTotal : 0
        totalMonBest = totalMonTotal < 0 ? Math.abs(totalMonTotal) : 0

        // $("#textTotal").text('جمع');
        $("#totalBede").text(NumberToNumberString(totalBede));
        $("#totalBest").text(NumberToNumberString(totalBest));
        $("#totalMonBede").text(NumberToNumberString(totalMonBede));
        $("#totalMonBest").text(NumberToNumberString(totalMonBest));
        $("#totalMonTotal").text(NumberToNumberString(totalMonTotal));
    }

    $("#CreateReport").click(function () {
        getGrdZAcc();
        self.sortTableGrdZAcc();
    });








    //------------------------------------------------------
    self.currentPageGrdZAcc = ko.observable();
    pageSizeGrdZAcc = localStorage.getItem('pageSizeGrdZAcc') == null ? 10 : localStorage.getItem('pageSizeGrdZAcc');
    self.pageSizeGrdZAcc = ko.observable(pageSizeGrdZAcc);
    self.currentPageIndexGrdZAcc = ko.observable(0);
    self.iconType = ko.observable("");

    self.iconTypeZAccCode = ko.observable("");
    self.iconTypeZAccName = ko.observable("");
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

    self.filterZAccCode = ko.observable("");
    self.filterZAccName = ko.observable("");
    self.filterAccCode = ko.observable("");
    self.filterAccName = ko.observable("");
    self.filterBede = ko.observable("");
    self.filterBest = ko.observable("");
    self.filterMonBede = ko.observable("");
    self.filterMonBest = ko.observable("");
    self.filterMonTotal = ko.observable("");

    self.filterGrdZAccList = ko.computed(function () {

        self.currentPageIndexGrdZAcc(0);
        var filterZAccCode = self.filterZAccCode();
        var filterZAccName = self.filterZAccName();
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


        // , AccName, Bede, Best, MonBede, MonBest, MonTotal
        // AccCode, AccName, Bede, Best, MonBede, MonBest, MonTotal

        tempData = ko.utils.arrayFilter(self.GrdZAccList(), function (item) {
            result =
               // ko.utils.stringStartsWith(item.ZAccCode.toString().toLowerCase(), filterZAccCode) &&
                (item.ZAccCode == null ? '' : item.ZAccCode.toString().search(filterZAccCode) >= 0) &&
                (item.ZAccName == null ? '' : item.ZAccName.toString().search(filterZAccName) >= 0) &&
                (item.AccCode == null ? '' : item.AccCode.toString().search(filterAccCode) >= 0) &&
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
    self.search(sessionStorage.searchGrdZAcc);
    self.firstMatch = ko.dependentObservable(function () {
        var indexGrdZAcc = 0;
        sessionStorage.searchGrdZAcc = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexGrdZAcc(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.GrdZAccList(), function (item) {
                indexGrdZAcc += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexGrdZAcc < self.pageSizeGrdZAcc())
                self.currentPageIndexGrdZAcc(0);
            else {
                var a = Math.round((indexGrdZAcc / self.pageSizeGrdZAcc()), 0);
                if (a < (indexGrdZAcc / self.pageSizeGrdZAcc())) a += 1;
                self.currentPageIndexGrdZAcc(a - 1);
            }
            return value;
        }
    });


    self.currentPageGrdZAcc = ko.computed(function () {
        var pageSizeGrdZAcc = parseInt(self.pageSizeGrdZAcc(), 10),
            startIndex = pageSizeGrdZAcc * self.currentPageIndexGrdZAcc(),
            endIndex = startIndex + pageSizeGrdZAcc;
        localStorage.setItem('pageSizeGrdZAcc', pageSizeGrdZAcc);
        return self.filterGrdZAccList().slice(startIndex, endIndex);
    });

    self.nextPageGrdZAcc = function () {
        if (((self.currentPageIndexGrdZAcc() + 1) * self.pageSizeGrdZAcc()) < self.filterGrdZAccList().length) {
            self.currentPageIndexGrdZAcc(self.currentPageIndexGrdZAcc() + 1);
        }
    };

    self.previousPageGrdZAcc = function () {
        if (self.currentPageIndexGrdZAcc() > 0) {
            self.currentPageIndexGrdZAcc(self.currentPageIndexGrdZAcc() - 1);
        }
    };

    self.firstPageGrdZAcc = function () {
        self.currentPageIndexGrdZAcc(0);
    };

    self.lastPageGrdZAcc = function () {
        tempCountGrdZAcc = parseInt(self.filterGrdZAccList().length / self.pageSizeGrdZAcc(), 10);
        if ((self.filterGrdZAccList().length % self.pageSizeGrdZAcc()) == 0)
            self.currentPageIndexGrdZAcc(tempCountGrdZAcc - 1);
        else
            self.currentPageIndexGrdZAcc(tempCountGrdZAcc);
    };

    self.sortTableGrdZAcc = function (viewModel, e) {
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
        self.GrdZAccList.sort(function (left, right) {
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



        self.iconTypeZAccCode('');
        self.iconTypeZAccName('');
        self.iconTypeAccCode('');
        self.iconTypeAccName('');
        self.iconTypeBede('');
        self.iconTypeBest('');
        self.iconTypeMonBede('');
        self.iconTypeMonBest('');
        self.iconTypeMonTotal('');

        if (orderProp == 'ZAccCode') self.iconTypeZAccCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ZAccName') self.iconTypeZAccName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccCode') self.iconTypeAccCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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




















    self.currentPageZGruAcc = ko.observable();
    pageSizeZGruAcc = localStorage.getItem('pageSizeZGruAcc') == null ? 10 : localStorage.getItem('pageSizeZGruAcc');
    self.pageSizeZGruAcc = ko.observable(pageSizeZGruAcc);
    self.currentPageIndexZGruAcc = ko.observable(0);

    self.filterZGruAcc0 = ko.observable("");
    self.filterZGruAcc1 = ko.observable("");
    self.filterZGruAcc2 = ko.observable("");

    self.filterZGruAccList = ko.computed(function () {

        self.currentPageIndexZGruAcc(0);
        var filter0 = self.filterZGruAcc0().toUpperCase();
        var filter1 = self.filterZGruAcc1();
        var filter2 = self.filterZGruAcc2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ZGruAccList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZGruAccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageZGruAcc = ko.computed(function () {
        var pageSizeZGruAcc = parseInt(self.pageSizeZGruAcc(), 10),
            startIndex = pageSizeZGruAcc * self.currentPageIndexZGruAcc(),
            endIndex = startIndex + pageSizeZGruAcc;
        localStorage.setItem('pageSizeZGruAcc', pageSizeZGruAcc);
        return self.filterZGruAccList().slice(startIndex, endIndex);
    });

    self.nextPageZGruAcc = function () {
        if (((self.currentPageIndexZGruAcc() + 1) * self.pageSizeZGruAcc()) < self.filterZGruAccList().length) {
            self.currentPageIndexZGruAcc(self.currentPageIndexZGruAcc() + 1);
        }
    };

    self.previousPageZGruAcc = function () {
        if (self.currentPageIndexZGruAcc() > 0) {
            self.currentPageIndexZGruAcc(self.currentPageIndexZGruAcc() - 1);
        }
    };

    self.firstPageZGruAcc = function () {
        self.currentPageIndexZGruAcc(0);
    };

    self.lastPageZGruAcc = function () {
        countZGruAcc = parseInt(self.filterZGruAccList().length / self.pageSizeZGruAcc(), 10);
        if ((self.filterZGruAccList().length % self.pageSizeZGruAcc()) == 0)
            self.currentPageIndexZGruAcc(countZGruAcc - 1);
        else
            self.currentPageIndexZGruAcc(countZGruAcc);
    };

    self.sortTableZGruAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ZGruAccList.sort(function (left, right) {
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



    $('#refreshZGruAcc').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست گروه زیر حساب ها") + " " + translate("به روز رسانی شود ؟"),
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
                getZGruAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddZGruAcc = function (item) {

        zGruCode = item.Code;
        find = false;
        list_ZGruAccSelect.forEach(function (item, key) {
            if (item == zGruCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListZGruAcc').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_ZGruAccSelect[counterZGruAcc] = item.Code;
            list_zGruNameSelect[counterZGruAcc] = item.Name;
            counterZGruAcc = counterZGruAcc + 1;
        }
    };


    self.AddAllZGruAcc = function () {
        list_ZGruAccSelect = new Array();
        list_zGruNameSelect = new Array();
        list = self.ZGruAccList();
        $("#TableBodyListZGruAcc").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListZGruAcc').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_ZGruAccSelect[i] = list[i].Code;
            list_zGruNameSelect[i] = list[i].Name;
            counterZGruAcc = i + 1;
        }
    };


    self.DelAllZGruAcc = function () {
        list_ZGruAccSelect = new Array();
        list_zGruNameSelect = new Array();
        counterZGruAcc = 0;
        $("#TableBodyListZGruAcc").empty();
    };


    $('#modal-ZGruAcc').on('hide.bs.modal', function () {
        if (counterZGruAcc > 0)
            $('#nameZGruAcc').val(counterZGruAcc + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameZGruAcc').val(translate('همه موارد'));
    });

    $('#modal-ZGruAcc').on('shown.bs.modal', function () {
        $("#TableBodyListZGruAcc").empty();
        for (var i = 0; i < counterZGruAcc; i++) {
            if (list_ZGruAccSelect[i] != "") {
                $('#TableBodyListZGruAcc').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_ZGruAccSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_zGruNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });












    self.currentPageZAcc = ko.observable();
    pageSizeZAcc = localStorage.getItem('pageSizeZAcc') == null ? 10 : localStorage.getItem('pageSizeZAcc');
    self.pageSizeZAcc = ko.observable(pageSizeZAcc);
    self.currentPageIndexZAcc = ko.observable(0);

    self.filterZAcc0 = ko.observable("");
    self.filterZAcc1 = ko.observable("");
    self.filterZAcc2 = ko.observable("");

    self.filterZAccList = ko.computed(function () {

        self.currentPageIndexZAcc(0);
        var filter0 = self.filterZAcc0().toUpperCase();
        var filter1 = self.filterZAcc1();
        var filter2 = self.filterZAcc2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ZAccList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZAccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageZAcc = ko.computed(function () {
        var pageSizeZAcc = parseInt(self.pageSizeZAcc(), 10),
            startIndex = pageSizeZAcc * self.currentPageIndexZAcc(),
            endIndex = startIndex + pageSizeZAcc;
        localStorage.setItem('pageSizeZAcc', pageSizeZAcc);
        return self.filterZAccList().slice(startIndex, endIndex);
    });

    self.nextPageZAcc = function () {
        if (((self.currentPageIndexZAcc() + 1) * self.pageSizeZAcc()) < self.filterZAccList().length) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() + 1);
        }
    };

    self.previousPageZAcc = function () {
        if (self.currentPageIndexZAcc() > 0) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() - 1);
        }
    };

    self.firstPageZAcc = function () {
        self.currentPageIndexZAcc(0);
    };

    self.lastPageZAcc = function () {
        countZAcc = parseInt(self.filterZAccList().length / self.pageSizeZAcc(), 10);
        if ((self.filterZAccList().length % self.pageSizeZAcc()) == 0)
            self.currentPageIndexZAcc(countZAcc - 1);
        else
            self.currentPageIndexZAcc(countZAcc);
    };

    self.sortTableZAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ZAccList.sort(function (left, right) {
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



    $('#refreshZAcc').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست زیر حساب ها") + " " + translate("به روز رسانی شود ؟"),
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
                getZAccList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddZAcc = function (item) {

        ZAccCode = item.Code;
        find = false;
        list_ZAccSelect.forEach(function (item, key) {
            if (item == ZAccCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListZAcc').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + '</tr>'
            );
            list_ZAccSelect[counterZAcc] = item.Code;
            list_ZAccNameSelect[counterZAcc] = item.Name;
            counterZAcc = counterZAcc + 1;
        }
    };


    self.AddAllZAcc = function () {
        list_ZAccSelect = new Array();
        list_ZAccNameSelect = new Array();
        list = self.ZAccList();
        $("#TableBodyListZAcc").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListZAcc').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + '</tr>'
            );
            list_ZAccSelect[i] = list[i].Code;
            list_ZAccNameSelect[i] = list[i].Name;
            counterZAcc = i + 1;
        }
    };


    self.DelAllZAcc = function () {
        list_ZAccSelect = new Array();
        list_ZAccNameSelect = new Array();
        counterZAcc = 0;
        $("#TableBodyListZAcc").empty();
    };


    $('#modal-ZAcc').on('hide.bs.modal', function () {
        if (counterZAcc > 0)
            $('#nameZAcc').val(counterZAcc + ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameZAcc').val(translate('همه موارد'));
    });

    $('#modal-ZAcc').on('shown.bs.modal', function () {
        $("#TableBodyListZAcc").empty();
        for (var i = 0; i < counterZAcc; i++) {
            if (list_ZAccSelect[i] != "") {
                $('#TableBodyListZAcc').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Code">' + list_ZAccSelect[i] + '</td > '
                    + ' <td data-bind="text: Name">' + list_ZAccNameSelect[i] + '</td > '
                    + '</tr>'
                );
            }
        }
        $('.fix').attr('class', 'form-line focused fix');
    });











    self.iconTypeStatus = ko.observable("");

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
            text: translate("لیست وضعیت سند") + ' ' + translate("به روز رسانی شود ؟"),
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
                /* value = ko.utils.arrayFirst(self.StatusList(), function (item) {
                     return item.Status == list_StatusSelect[i];
                 });*/

                $('#TableBodyListStatus').append(
                    '<tr data-bind="">'
                    + ' <td data-bind="text: Status">' + list_StatusSelect[i] + '</td > '
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




    self.ShowGrdZAcc_Riz = function (Band) {
        SetFilter();
        localStorage.setItem("ZAccCodeReport", Band.ZAccCode);
        localStorage.setItem("ZAccNameReport", Band.ZAccName);
        localStorage.setItem("AccCodeReport", Band.AccCode);
        localStorage.setItem("AccNameReport", Band.AccName);
        localStorage.setItem("AzTarikhReport", azTarikh);
        localStorage.setItem("TaTarikhReport", taTarikh);
        localStorage.setItem("AModeCodeReport", aModeCode);
        localStorage.setItem("AModeNameReport", aModeName);
        localStorage.setItem("MkzCodeReport", mkzcode);
        localStorage.setItem("MkzNameReport", mkzname);
        localStorage.setItem("OprCodeReport", oprcode);
        localStorage.setItem("OprNameReport", oprname);
        window.open(sessionStorage.urlGrdZAcc, '_blank');
    }

  
    AccCodeReport = localStorage.getItem("AccCodeReport");
    localStorage.setItem("AccCodeReport", null);
    if (AccCodeReport != "null") {

        AccNameReport = localStorage.getItem("AccNameReport");
        counterAcc = 1;
        list_AccSelect[0] = AccCodeReport;
        list_AccNameSelect[0] = AccNameReport;
        $('#nameAcc').val(counterAcc + ' ' + translate('مورد انتخاب شده'));


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

        getGrdZAcc();
    }






    self.radif = function (index) {
        countShow = self.pageSizeGrdZAcc();
        page = self.currentPageIndexGrdZAcc();
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
            '       <tr data-bind="click: sortTableGrdZAcc">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('ZAccCode', data) +
            CreateTableTh('ZAccName', data) +
            CreateTableTh('AccCode', data) +
            CreateTableTh('AccName', data) +
            CreateTableTh('Bede', data) +
            CreateTableTh('Best', data) +
            CreateTableTh('MonBede', data) +
            CreateTableTh('MonBest', data) +
            CreateTableTh('MonTotal', data) +
           // '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind=" {foreach: currentPageGrdZAcc}" style="cursor: default;">' +
                '     <tr data-bind="style: { \'background-color\': Tag == 1 ? \'#f5efeb\' : \'\' }" >'



        createTable +=
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('ZAccCode', 0, 0, data) +
            CreateTableTd('ZAccName', 0, 0, data) +
            CreateTableTd('AccCode', 0, 0, data) +
            CreateTableTd('AccName', 0, 0, data) +
            CreateTableTd('Bede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('Best', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBede', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonBest', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MonTotal', sessionStorage.Deghat, 2, data) +
           /* '<td>' +
            '<a class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            '</a>' +
            '<ul class="dropdown-menu">' +
            '    <li>' +
            '        <a  data-bind="click: $root.ShowADocR , visible: $root.AccessAction(\'ADocR\') == true" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px">' +
            '            دفتر روزنامه' +
            '        </a>' +
            '    </li>' +
            '</td >' +*/
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td style="background-color: #e37d228f !important;">' + translate('جمع') + '</td>' +
            CreateTableTdSum('ZAccCode', 0, data) +
            CreateTableTdSum('ZAccName', 1, data) +
            CreateTableTdSum('AccCode', 0, data) +
            CreateTableTdSum('AccName', 1, data) +
            CreateTableTdSum('Bede', 2, data) +
            CreateTableTdSum('Best', 2, data) +
            CreateTableTdSum('MonBede', 2, data) +
            CreateTableTdSum('MonBest', 2, data) +
            CreateTableTdSum('MonTotal', 2, data) +
            //'<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('ZAccCode', data) +
            CreateTableTdSearch('ZAccName', data) +
            CreateTableTdSearch('AccCode', data) +
            CreateTableTdSearch('AccName', data) +
            CreateTableTdSearch('Bede', data) +
            CreateTableTdSearch('Best', data) +
            CreateTableTdSearch('MonBede', data) +
            CreateTableTdSearch('MonBest', data) +
            CreateTableTdSearch('MonTotal', data) +
            //'<td style="background-color: #efb683;"></td>' +
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
                field == 'AccCode' ? 'AccCode' :
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
        setReport(self.GrdZAccList(), data, printVariable);
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
        setReport(self.GrdZAccList(), '', printVariable);
    });


    $('#Print').click(function () {
        createViewer();
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        printName = null;
        sessionStorage.ModePrint = "ReportGrdZAcc";
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
        setReport(self.GrdZAccList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


    self.PageIndexAcc = function (item) {
        return CountPage(self.filterAccList(), self.pageSizeAcc(), item);
    };

    self.PageIndexMkz = function (item) {
        return CountPage(self.filterMkzList(), self.pageSizeMkz(), item);
    };

    self.PageIndexOpr = function (item) {
        return CountPage(self.filterOprList(), self.pageSizeOpr(), item);
    };

    self.PageIndexAMode = function (item) {
        return CountPage(self.filterAModeList(), self.pageSizeAMode(), item);
    };

    self.PageIndexPrintForms = function (item) {
        return CountPage(self.filterPrintFormsList(), self.pageSizePrintForms(), item);
    };

    self.PageIndexGrdZAcc = function (item) {
        return CountPage(self.filterGrdZAccList(), self.pageSizeGrdZAcc(), item);
    };

    self.PageIndexZGruAcc = function (item) {
        return CountPage(self.filterZGruAccList(), self.pageSizeZGruAcc(), item);
    };

    self.PageIndexZAcc = function (item) {
        return CountPage(self.filterZAccList(), self.pageSizeZAcc(), item);
    };

    self.PageIndexStatus = function (item) {
        return CountPage(self.filterStatusList(), self.pageSizeStatus(), item);
    };

};

ko.applyBindings(new ViewModel());