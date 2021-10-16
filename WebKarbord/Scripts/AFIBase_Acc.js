var ViewModel = function () {
    var self = this;

    self.AccList = ko.observableArray([]); // ليست حساب ها 
    self.SettingColumnList = ko.observableArray([]); // لیست ستون 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.AGruList = ko.observableArray([]); // ليست گروه حساب ها
    self.TestAcc_DeleteList = ko.observableArray([]); // لیست تست حذف 


    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها 
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var AGruUri = server + '/api/Web_Data/AGru/'; // آدرس گروه حساب ها
    var SaveAccUri = server + '/api/Web_Data/AFI_SaveAcc/'; // آدرس ذخیره حساب ها
    var DelAccUri = server + '/api/Web_Data/AFI_DelAcc/'; // آدرس حذف حساب ها
    var Acc_DeleteUri = server + '/api/Web_Data/TestAcc_Delete/'; // آدرس تست حذف 


    TestUser();



    validation = CheckAccess('NEW_Acc');// New Acc
    sessionStorage.NEW_Acc = validation;
    validation == true ? $("#AddNewAcc").show() : $("#AddNewAcc").hide()

    validation = CheckAccess('CHG_Acc');// edit Acc
    sessionStorage.CHG_Acc = validation;

    validation = CheckAccess('DEL_Acc'); // delete Acc
    sessionStorage.DEL_Acc = validation;

    self.ShowAction = function (Code) {
        if (sessionStorage.DEL_Acc == 'true')
            return true;
        else
            return false;
    }



    var aGruCode = '';
    var AccCode = '';

    var isUpdate = false;


    var rprtId = 'Acc';


    var columns = [
        'Code',
        'Name',
        'Spec',
        'Eghdam',
        'MkzCode',
        'MkzName',
        'OprCode',
        'OprName',
        'ArzCode',
        'ArzName',
        'ArzRate',
        'AccF01',
        'AccF02',
        'AccF03',
        'AccF04',
        'AccF05',
        'AccF06',
        'AccF07',
        'AccF08',
        'AccF09',
        'AccF10',
        'AccF11',
        'AccF12',
        'AccF13',
        'AccF14',
        'AccF15',
        'AccF16',
        'AccF17',
        'AccF18',
        'AccF19',
        'AccF20',
        'AGruCode',
        'AGruName'
    ];

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها




    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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

            ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
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


    //Get ExtraFields List
    function getExtraFieldsList() {
        ajaxFunction(ExtraFieldsUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            self.ExtraFieldsList(data);
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Acc", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Acc", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);



    getExtraFieldsList();


    function getAccList() {

        var AccObject = {
            Mode: 1,
            UserCode: sessionStorage.userName,
        }

        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'POST', AccObject, true).done(function (data) {
            self.AccList(data);
        });
    }

    getAccList();

    //Get  AGru List
    function getAGruList() {
        var AGruObject = {
            Mode: 0,
            ModeGru: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(AGruUri + ace + '/' + sal + '/' + group, 'POST', AGruObject, true).done(function (data) {
            self.AGruList(data);
        });
    }

    $('#btnAGru').click(function () {
        if (self.AGruList().length == 0) {
            getAGruList();
        }
    });





    self.currentPageAcc = ko.observable();

    pageSizeAcc = localStorage.getItem('pageSizeAcc') == null ? 10 : localStorage.getItem('pageSizeAcc');
    self.pageSizeAcc = ko.observable(pageSizeAcc);
    self.currentPageIndexAcc = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");








    self.filterCode = ko.observable("");
    self.filterName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterMkzCode = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprCode = ko.observable("");
    self.filterOprName = ko.observable("");
    self.filterArzCode = ko.observable("");
    self.filterArzName = ko.observable("");
    self.filterArzRate = ko.observable("");
    self.filterAccF01 = ko.observable("");
    self.filterAccF02 = ko.observable("");
    self.filterAccF03 = ko.observable("");
    self.filterAccF04 = ko.observable("");
    self.filterAccF05 = ko.observable("");
    self.filterAccF06 = ko.observable("");
    self.filterAccF07 = ko.observable("");
    self.filterAccF08 = ko.observable("");
    self.filterAccF09 = ko.observable("");
    self.filterAccF10 = ko.observable("");
    self.filterAccF11 = ko.observable("");
    self.filterAccF12 = ko.observable("");
    self.filterAccF13 = ko.observable("");
    self.filterAccF14 = ko.observable("");
    self.filterAccF15 = ko.observable("");
    self.filterAccF16 = ko.observable("");
    self.filterAccF17 = ko.observable("");
    self.filterAccF18 = ko.observable("");
    self.filterAccF19 = ko.observable("");
    self.filterAccF20 = ko.observable("");
    self.filterAGruCode = ko.observable("");
    self.filterAGruName = ko.observable("");



    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterCode(listFilter[0]);
        self.filterName(listFilter[1]);
        self.filterSpec(listFilter[2]);
        self.filterEghdam(listFilter[3]);
        self.filterMkzCode(listFilter[4]);
        self.filterMkzName(listFilter[5]);
        self.filterOprCode(listFilter[6]);
        self.filterOprName(listFilter[7]);
        self.filterArzCode(listFilter[8]);
        self.filterArzName(listFilter[9]);
        self.filterArzRate(listFilter[10]);

        self.filterAccF01(listFilter[12]);
        self.filterAccF02(listFilter[13]);
        self.filterAccF03(listFilter[14]);
        self.filterAccF04(listFilter[15]);
        self.filterAccF05(listFilter[16]);
        self.filterAccF06(listFilter[17]);
        self.filterAccF07(listFilter[18]);
        self.filterAccF08(listFilter[19]);
        self.filterAccF09(listFilter[20]);
        self.filterAccF10(listFilter[21]);
        self.filterAccF11(listFilter[22]);
        self.filterAccF12(listFilter[23]);
        self.filterAccF13(listFilter[24]);
        self.filterAccF14(listFilter[25]);
        self.filterAccF15(listFilter[26]);
        self.filterAccF16(listFilter[27]);
        self.filterAccF17(listFilter[28]);
        self.filterAccF18(listFilter[29]);
        self.filterAccF19(listFilter[30]);
        self.filterAccF20(listFilter[31]);
        self.filterAGruCode(listFilter[32]);
        self.filterAGruName(listFilter[32]);
    }
    self.filterAccList = ko.computed(function () {
        self.currentPageIndexAcc(0);
        var filterCode = self.filterCode();
        var filterName = self.filterName();
        var filterSpec = self.filterSpec();
        var filterEghdam = self.filterEghdam();

        var filterMkzCode = self.filterMkzCode();
        var filterMkzName = self.filterMkzName();
        var filterOprCode = self.filterOprCode();
        var filterOprName = self.filterOprName();
        var filterArzCode = self.filterArzCode();
        var filterArzName = self.filterArzName();
        var filterArzRate = self.filterArzRate();

        var filterAccF01 = self.filterAccF01();
        var filterAccF02 = self.filterAccF02();
        var filterAccF03 = self.filterAccF03();
        var filterAccF04 = self.filterAccF04();
        var filterAccF05 = self.filterAccF05();
        var filterAccF06 = self.filterAccF06();
        var filterAccF07 = self.filterAccF07();
        var filterAccF08 = self.filterAccF08();
        var filterAccF09 = self.filterAccF09();
        var filterAccF10 = self.filterAccF10();
        var filterAccF11 = self.filterAccF11();
        var filterAccF12 = self.filterAccF12();
        var filterAccF13 = self.filterAccF13();
        var filterAccF14 = self.filterAccF14();
        var filterAccF15 = self.filterAccF15();
        var filterAccF16 = self.filterAccF16();
        var filterAccF17 = self.filterAccF17();
        var filterAccF18 = self.filterAccF18();
        var filterAccF19 = self.filterAccF19();
        var filterAccF20 = self.filterAccF20();
        var filterAGruCode = self.filterAGruCode();
        var filterAGruName = self.filterAGruName();

        //filterEghdam = filterEghdam.replace("/", ".");

        if (!filterCode && !filterName && !filterSpec &&
            !filterEghdam &&
            !filterMkzCode &&
            !filterMkzName &&
            !filterOprCode &&
            !filterOprName &&
            !filterArzCode &&
            !filterArzName &&
            !filterArzRate &&
            !filterAccF01 && !filterAccF02 && !filterAccF03 && !filterAccF04 && !filterAccF05 && !filterAccF06 && !filterAccF07 && !filterAccF08 && !filterAccF09 && !filterAccF10 &&
            !filterAccF11 && !filterAccF12 && !filterAccF13 && !filterAccF14 && !filterAccF15 && !filterAccF16 && !filterAccF17 && !filterAccF18 && !filterAccF19 && !filterAccF20
            && !filterAGruCode && !filterAGruName
        ) {


            $("#CountRecord").text(self.AccList().length);
            sessionStorage.setItem('listFilter', null);
            return self.AccList();
        } else {

            listFilter = [
                filterCode,
                filterName,
                filterSpec,
                filterEghdam,
                filterMkzCode,
                filterMkzName,
                filterOprCode,
                filterOprName,
                filterArzCode,
                filterArzName,
                filterArzRate,
                filterAccF01,
                filterAccF02,
                filterAccF03,
                filterAccF04,
                filterAccF05,
                filterAccF06,
                filterAccF07,
                filterAccF08,
                filterAccF09,
                filterAccF10,
                filterAccF11,
                filterAccF12,
                filterAccF13,
                filterAccF14,
                filterAccF15,
                filterAccF16,
                filterAccF17,
                filterAccF18,
                filterAccF19,
                filterAccF20,
                filterAGruCode,
                filterAGruName
            ];


            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filterCode) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filterName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Eghdam == null ? '' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.MkzCode == null ? '' : item.MkzCode.toString().search(filterMkzCode) >= 0) &&
                    (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                    (item.OprCode == null ? '' : item.OprCode.toString().search(filterOprCode) >= 0) &&
                    (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
                    (item.ArzCode == null ? '' : item.ArzCode.toString().search(filterArzCode) >= 0) &&
                    (item.ArzName == null ? '' : item.ArzName.toString().search(filterArzName) >= 0) &&
                    (item.ArzRate == null ? '' : item.ArzRate.toString().search(filterArzRate) >= 0) &&

                    (item.AccF01 == null ? '' : item.AccF01.toString().search(filterAccF01) >= 0) &&
                    (item.AccF02 == null ? '' : item.AccF02.toString().search(filterAccF02) >= 0) &&
                    (item.AccF03 == null ? '' : item.AccF03.toString().search(filterAccF03) >= 0) &&
                    (item.AccF04 == null ? '' : item.AccF04.toString().search(filterAccF04) >= 0) &&
                    (item.AccF05 == null ? '' : item.AccF05.toString().search(filterAccF05) >= 0) &&
                    (item.AccF06 == null ? '' : item.AccF06.toString().search(filterAccF06) >= 0) &&
                    (item.AccF07 == null ? '' : item.AccF07.toString().search(filterAccF07) >= 0) &&
                    (item.AccF08 == null ? '' : item.AccF08.toString().search(filterAccF08) >= 0) &&
                    (item.AccF09 == null ? '' : item.AccF09.toString().search(filterAccF09) >= 0) &&
                    (item.AccF10 == null ? '' : item.AccF10.toString().search(filterAccF10) >= 0) &&
                    (item.AccF11 == null ? '' : item.AccF11.toString().search(filterAccF11) >= 0) &&
                    (item.AccF12 == null ? '' : item.AccF12.toString().search(filterAccF12) >= 0) &&
                    (item.AccF13 == null ? '' : item.AccF13.toString().search(filterAccF13) >= 0) &&
                    (item.AccF14 == null ? '' : item.AccF14.toString().search(filterAccF14) >= 0) &&
                    (item.AccF15 == null ? '' : item.AccF15.toString().search(filterAccF15) >= 0) &&
                    (item.AccF16 == null ? '' : item.AccF16.toString().search(filterAccF16) >= 0) &&
                    (item.AccF17 == null ? '' : item.AccF17.toString().search(filterAccF17) >= 0) &&
                    (item.AccF18 == null ? '' : item.AccF18.toString().search(filterAccF18) >= 0) &&
                    (item.AccF19 == null ? '' : item.AccF19.toString().search(filterAccF19) >= 0) &&
                    (item.AccF20 == null ? '' : item.AccF20.toString().search(filterAccF20) >= 0) &&
                    (item.AGruCode == null ? '' : item.AGruCode.toString().search(filterAGruCode) >= 0) &&
                    (item.AGruName == null ? '' : item.AGruName.toString().search(filterAGruName) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }

    });



    self.search = ko.observable("");
    self.search(sessionStorage.searchAcc);
    self.firstMatch = ko.dependentObservable(function () {
        var indexAcc = 0;
        sessionStorage.searchAcc = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexAcc(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.AccList(), function (item) {
                indexAcc += 1;
                return item.Code == search;
            });
            if (indexAcc < self.pageSizeAcc())
                self.currentPageIndexAcc(0);
            else {
                var a = Math.round((indexAcc / self.pageSizeAcc()), 0);
                if (a < (indexAcc / self.pageSizeAcc())) a += 1;
                self.currentPageIndexAcc(a - 1);
            }
            return value;
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
        tempCountAcc = parseInt(self.filterAccList().length / self.pageSizeAcc(), 10);
        if ((self.filterAccList().length % self.pageSizeAcc()) == 0)
            self.currentPageIndexAcc(tempCountAcc - 1);
        else
            self.currentPageIndexAcc(tempCountAcc);
    };


    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeMkzCode = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprCode = ko.observable("");
    self.iconTypeOprName = ko.observable("");
    self.iconTypeArzCode = ko.observable("");
    self.iconTypeArzName = ko.observable("");
    self.iconTypeArzRate = ko.observable("");
    self.iconTypeAccF01 = ko.observable("");
    self.iconTypeAccF02 = ko.observable("");
    self.iconTypeAccF03 = ko.observable("");
    self.iconTypeAccF04 = ko.observable("");
    self.iconTypeAccF05 = ko.observable("");
    self.iconTypeAccF06 = ko.observable("");
    self.iconTypeAccF07 = ko.observable("");
    self.iconTypeAccF08 = ko.observable("");
    self.iconTypeAccF09 = ko.observable("");
    self.iconTypeAccF10 = ko.observable("");
    self.iconTypeAccF11 = ko.observable("");
    self.iconTypeAccF12 = ko.observable("");
    self.iconTypeAccF13 = ko.observable("");
    self.iconTypeAccF14 = ko.observable("");
    self.iconTypeAccF15 = ko.observable("");
    self.iconTypeAccF16 = ko.observable("");
    self.iconTypeAccF17 = ko.observable("");
    self.iconTypeAccF18 = ko.observable("");
    self.iconTypeAccF19 = ko.observable("");
    self.iconTypeAccF20 = ko.observable("");
    self.iconTypeAGruCode = ko.observable("");
    self.iconTypeAGruName = ko.observable("");



    self.sortTableAcc = function (viewModel, e) {


        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortBase_Acc" + rprtId);
            self.sortType = localStorage.getItem("sortBaseType_Acc" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortBase_Acc" + rprtId, orderProp);
        localStorage.setItem("sortBaseType_Acc" + rprtId, self.sortType);

        self.search("");
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
        self.iconTypeEghdam('');

        self.iconTypeMkzCode('');
        self.iconTypeMkzName('');
        self.iconTypeOprCode('');
        self.iconTypeOprName('');
        self.iconTypeArzCode('');
        self.iconTypeArzName('');
        self.iconTypeArzRate('');

        self.iconTypeAccF01('');
        self.iconTypeAccF02('');
        self.iconTypeAccF03('');
        self.iconTypeAccF04('');
        self.iconTypeAccF05('');
        self.iconTypeAccF06('');
        self.iconTypeAccF07('');
        self.iconTypeAccF08('');
        self.iconTypeAccF09('');
        self.iconTypeAccF10('');
        self.iconTypeAccF11('');
        self.iconTypeAccF12('');
        self.iconTypeAccF13('');
        self.iconTypeAccF14('');
        self.iconTypeAccF15('');
        self.iconTypeAccF16('');
        self.iconTypeAccF17('');
        self.iconTypeAccF18('');
        self.iconTypeAccF19('');
        self.iconTypeAccF20('');
        self.iconTypeAGruCode('');
        self.iconTypeAGruName('');

        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzCode') self.iconTypeMkzCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprCode') self.iconTypeOprCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ArzCode') self.iconTypeArzCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ArzName') self.iconTypeArzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ArzRate') self.iconTypeArzRate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

        if (orderProp == 'AccF01') self.iconTypeAccF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF02') self.iconTypeAccF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF03') self.iconTypeAccF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF04') self.iconTypeAccF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF05') self.iconTypeAccF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF06') self.iconTypeAccF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF07') self.iconTypeAccF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF08') self.iconTypeAccF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF09') self.iconTypeAccF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF10') self.iconTypeAccF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF11') self.iconTypeAccF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF12') self.iconTypeAccF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF13') self.iconTypeAccF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF14') self.iconTypeAccF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF15') self.iconTypeAccF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF16') self.iconTypeAccF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF17') self.iconTypeAccF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF18') self.iconTypeAccF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF19') self.iconTypeAccF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccF20') self.iconTypeAccF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AGruCode') self.iconTypeAGruCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AGruName') self.iconTypeAGruName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    };




    $('#refreshAcc').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست حساب ها  به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getAccList();
                self.sortTableAcc();
            }
        })
    })









    self.currentPageAGru = ko.observable();
    pageSizeAGru = localStorage.getItem('pageSizeAGru') == null ? 10 : localStorage.getItem('pageSizeAGru');
    self.pageSizeAGru = ko.observable(pageSizeAGru);
    self.currentPageIndexAGru = ko.observable(0);

    self.filterAGru0 = ko.observable("");
    self.filterAGru1 = ko.observable("");
    self.filterAGru2 = ko.observable("");

    self.filterAGruList = ko.computed(function () {

        self.currentPageIndexAGru(0);
        var filter0 = self.filterAGru0().toUpperCase();
        var filter1 = self.filterAGru1();
        var filter2 = self.filterAGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.AGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.AGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageAGru = ko.computed(function () {
        var pageSizeAGru = parseInt(self.pageSizeAGru(), 10),
            startIndex = pageSizeAGru * self.currentPageIndexAGru(),
            endIndex = startIndex + pageSizeAGru;
        localStorage.setItem('pageSizeAGru', pageSizeAGru);
        return self.filterAGruList().slice(startIndex, endIndex);
    });

    self.nextPageAGru = function () {
        if (((self.currentPageIndexAGru() + 1) * self.pageSizeAGru()) < self.filterAGruList().length) {
            self.currentPageIndexAGru(self.currentPageIndexAGru() + 1);
        }
    };

    self.previousPageAGru = function () {
        if (self.currentPageIndexAGru() > 0) {
            self.currentPageIndexAGru(self.currentPageIndexAGru() - 1);
        }
    };

    self.firstPageAGru = function () {
        self.currentPageIndexAGru(0);
    };

    self.lastPageAGru = function () {
        countAGru = parseInt(self.filterAGruList().length / self.pageSizeAGru(), 10);
        if ((self.filterAGruList().length % self.pageSizeAGru()) == 0)
            self.currentPageIndexAGru(countAGru - 1);
        else
            self.currentPageIndexAGru(countAGru);
    };

    self.sortTableAGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.AGruList.sort(function (left, right) {
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
        select = $('#pageCountSelector').val();
    }



    $('#refreshAGru').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست گروه حساب ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getAGruList();
            }
        })
    })


    self.selectAGru = function (item) {
        aGruCode = item.Code;
        $('#nameAGru').val('(' + item.Code + ') ' + item.Name);
    }






    self.AddNewAcc = function () {

        isUpdate = false;
        sessionStorage.NEW_Acc == 'true' ? $("#saveAcc").show() : $("#saveAcc").hide();
        aGruCode = '';

        $('#Code').attr('readonly', false);
        $('#Code').val('');
        $('#Name').val('');
        $('#Spec').val('');
        $('#LtnName').val('');
        $('#nameAGru').val('');
        $('#PDMode').val(0);
        $('#Mahiat').val(0);
        $('#AccStatus').val(0);
        $('#EMail').val('');
        $('#Mobile').val('');
        $('#AccComm').val('');
        $('#Mkz').val(0);
        $('#Opr').val(0);
        $('#Arzi').val(0);
        $('#P_Amount').hide();
        $('#P_ZGru').hide();

        $('#ExtraFields1').val('');
        $('#ExtraFields2').val('');
        $('#ExtraFields3').val('');
        $('#ExtraFields4').val('');
        $('#ExtraFields5').val('');
        $('#ExtraFields6').val('');
        $('#ExtraFields7').val('');
        $('#ExtraFields8').val('');
        $('#ExtraFields9').val('');
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
        $('#P_Amount').hide();
        $('#P_ZGru').hide();
        $("#Code").focus();
        $('#modal-Acc').modal('show');
    }

    self.UpdateAcc = function (item) {
        sessionStorage.CHG_Acc == 'true' ? $("#saveAcc").show() : $("#saveAcc").hide();
        isUpdate = true;

        //item.EditBaseTrs == true && sessionStorage.CHG_Acc == 'true' ? $("#saveAcc").show() : $("#saveAcc").hide();
        $('#Code').val(item.Code);
        $('#Code').attr('readonly', true);
        $('#Name').val(item.Name);
        $('#Spec').val(item.Spec);
        $('#LtnName').val(item.LtnName);


        $('#nameAGru').val(item.AGruCode == '' ? '' : '(' + item.AGruCode + ') ' + item.AGruName);
        $('#PDMode').val(item.PDMode);
        $('#Mahiat').val(item.Mahiat);
        $('#AccStatus').val(item.AccStatus);
        $('#EMail').val(item.EMail);
        $('#Mobile').val(item.Mobile);
        $('#AccComm').val(item.AccComm);


        $('#Mkz').val(item.Mkz);
        $('#Opr').val(item.Opr);
        $('#Arzi').val(item.Arzi);
        //$('#Amount').val(item.Amount);
        $('#P_Amount').hide();

        $('#HasChild').val(item.HasChild);
        if (item.HasChild == 0)
            $('#P_ZGru').hide();
        else
            $('#P_ZGru').show();

        sessionStorage.F01 = item.AccF01;
        sessionStorage.F02 = item.AccF02;
        sessionStorage.F03 = item.AccF03;
        sessionStorage.F04 = item.AccF04;
        sessionStorage.F05 = item.AccF05;
        sessionStorage.F06 = item.AccF06;
        sessionStorage.F07 = item.AccF07;
        sessionStorage.F08 = item.AccF08;
        sessionStorage.F09 = item.AccF09;
        sessionStorage.F10 = item.AccF10;
        sessionStorage.F11 = item.AccF11;
        sessionStorage.F12 = item.AccF12;
        sessionStorage.F13 = item.AccF13;
        sessionStorage.F14 = item.AccF14;
        sessionStorage.F15 = item.AccF15;
        sessionStorage.F16 = item.AccF16;
        sessionStorage.F17 = item.AccF17;
        sessionStorage.F18 = item.AccF18;
        sessionStorage.F19 = item.AccF19;
        sessionStorage.F20 = item.AccF20;

        $("#ExtraFields1").val(sessionStorage.AccF01);
        $("#ExtraFields2").val(sessionStorage.AccF02);
        $("#ExtraFields3").val(sessionStorage.AccF03);
        $("#ExtraFields4").val(sessionStorage.AccF04);
        $("#ExtraFields5").val(sessionStorage.AccF05);
        $("#ExtraFields6").val(sessionStorage.AccF06);
        $("#ExtraFields7").val(sessionStorage.AccF07);
        $("#ExtraFields8").val(sessionStorage.AccF08);
        $("#ExtraFields9").val(sessionStorage.AccF09);
        $("#ExtraFields10").val(sessionStorage.AccF10);
        $("#ExtraFields11").val(sessionStorage.AccF11);
        $("#ExtraFields12").val(sessionStorage.AccF12);
        $("#ExtraFields13").val(sessionStorage.AccF13);
        $("#ExtraFields14").val(sessionStorage.AccF14);
        $("#ExtraFields15").val(sessionStorage.AccF15);
        $("#ExtraFields16").val(sessionStorage.AccF16);
        $("#ExtraFields17").val(sessionStorage.AccF17);
        $("#ExtraFields18").val(sessionStorage.AccF18);
        $("#ExtraFields19").val(sessionStorage.AccF19);
        $("#ExtraFields20").val(sessionStorage.AccF20);

        $("#ExtraFields1").val(item.AccF01);
        $("#ExtraFields2").val(item.AccF02);
        $("#ExtraFields3").val(item.AccF03);
        $("#ExtraFields4").val(item.AccF04);
        $("#ExtraFields5").val(item.AccF05);
        $("#ExtraFields6").val(item.AccF06);
        $("#ExtraFields7").val(item.AccF07);
        $("#ExtraFields8").val(item.AccF08);
        $("#ExtraFields9").val(item.AccF09);
        $("#ExtraFields10").val(item.AccF10);
        $("#ExtraFields11").val(item.AccF11);
        $("#ExtraFields12").val(item.AccF12);
        $("#ExtraFields13").val(item.AccF13);
        $("#ExtraFields14").val(item.AccF14);
        $("#ExtraFields15").val(item.AccF15);
        $("#ExtraFields16").val(item.AccF16);
        $("#ExtraFields17").val(item.AccF17);
        $("#ExtraFields18").val(item.AccF18);
        $("#ExtraFields19").val(item.AccF19);
        $("#ExtraFields20").val(item.AccF20);
        $("#Code").focus();

        AccCode = item.Code;
        if (TestUseSanad("Acc", AccCode, true,'') == true) {
            showNotification('حساب در تب دیگری در حال ویرایش است', 0)
        }
        else {
            $('#modal-Acc').modal('show');
        }
    }

    $('#Amount').change(function () {
        var Amount = $('#Amount').val();
        if (Amount == 0) {
            $('#P_Amount').hide();
        }
        else {
            $('#P_Amount').show();
        }
    });

    $('#HasChild').change(function () {
        var hasChild = $('#HasChild').val();
        if (hasChild == 0) {
            $('#P_ZGru').hide();
        }
        else {
            $('#P_ZGru').show();
        }
    });


    $('#modal-Acc').on('hide.bs.modal', function () {
        RemoveUseSanad("Acc", AccCode);
    });

    window.onbeforeunload = function () {
        RemoveUseSanad("Acc", AccCode);
    };


    $('#saveAcc').click(function () {
        code = $('#Code').val();
        name = $('#Name').val();

        if (code == "") {
            return showNotification('کد حساب را وارد کنید', 0)
        }
        if (name == "") {
            return showNotification('نام حساب را وارد کنید', 0)
        }

        if (isUpdate == false) {
            listCode = ko.utils.arrayFilter(self.AccList(), function (item) {
                return item.Code == code;
            });

            if (listCode.length == 1) {
                return showNotification('کد حساب تکراری', 0)
            }
        }

        var SaveAcc_Object = {
            BranchCode: 0,
            UserCode: sessionStorage.userName,
            Code: code,
            Name: name,
            Spec: $('#Spec').val(),
            LtnName: $('#LtnName').val(),
            AGruCode: aGruCode,

            PDMode: $('#PDMode').val(),
            Mahiat: $('#Mahiat').val(),
            AccStatus: $('#AccStatus').val(),
            EMail: $('#EMail').val(),
            Mobile: $('#Mobile').val(),
            HasChild: $('#HasChild').val(),
            //ZGru: $('#HasChild').val(),
            Arzi: $('#Arzi').val(),
            Mkz: $('#Mkz').val(),
            Opr: $('#Opr').val(),
            Amount: $('#Amount').val(),
            Vahed: $('#Vahed').val(),
            Deghat: $('#Deghat').val(),
            AccComm: $('#AccComm').val(),

            F01: $("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val(),
            F02: $("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val(),
            F03: $("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val(),
            F04: $("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val(),
            F05: $("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val(),
            F06: $("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val(),
            F07: $("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val(),
            F08: $("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val(),
            F09: $("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val(),
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
        };

        ajaxFunction(SaveAccUri + ace + '/' + sal + '/' + group, 'POST', SaveAcc_Object).done(function (data) {
            getAccList();
            $('#modal-Acc').modal('hide');
            showNotification('ذخيره شد ', 1);
        });

    });


    self.DeleteAcc = function (item) {

        AccCode = item.Code;
        if (TestUseSanad("Acc", AccCode, false,'') == true) {
            showNotification('حساب در تب دیگری در حال ویرایش است', 0)
        }
        else {

            Swal.fire({
                title: 'تایید حذف ؟',
                text: "آیا حساب انتخابی حذف شود",
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'خیر',
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'بله'
            }).then((result) => {
                if (result.value) {
                    code = item.Code;
                    /*var TestAcc_DeleteObject = {
                        Code: code
                    };

                    ajaxFunction(Acc_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestAcc_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestAcc_DeleteList(obj);
                        if (data.length > 2) {
                            $('#modal-TestDelete').modal('show');
                            SetDataTestAcc();
                        }
                        else {
                           
                        }
                    });*/
                    DeleteAcc(code);
                }
            })
        }
    };

    function SetDataTestAcc() {
        $("#BodyTestAcc_Delete").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestAcc_DeleteList();
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

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTestAcc_Delete').append(textBody);

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

    function DeleteAcc(code) {
        ajaxFunction(DelAccUri + ace + '/' + sal + '/' + group + '/' + code + '/', 'GET').done(function (response) {
            currentPage = self.currentPageIndexAcc();
            getAccList();
            self.currentPageIndexAcc(currentPage);
            showNotification('حذف شد ', 1);
        });
    }




    self.radif = function (index) {
        countShow = self.pageSizeAcc();
        page = self.currentPageIndexAcc();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableAcc">' +
            '<th>ردیف</th>' +
            CreateTableTh('Code', data) +
            CreateTableTh('Name', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('ArzCode', data) +
            CreateTableTh('ArzName', data) +
            CreateTableTh('ArzRate', data) +
            CreateTableTh('AGruCode', data) +
            CreateTableTh('AGruName', data) +
            CreateTableTh('AccF01', data) +
            CreateTableTh('AccF02', data) +
            CreateTableTh('AccF03', data) +
            CreateTableTh('AccF04', data) +
            CreateTableTh('AccF05', data) +
            CreateTableTh('AccF06', data) +
            CreateTableTh('AccF07', data) +
            CreateTableTh('AccF08', data) +
            CreateTableTh('AccF09', data) +
            CreateTableTh('AccF10', data) +
            CreateTableTh('AccF11', data) +
            CreateTableTh('AccF12', data) +
            CreateTableTh('AccF13', data) +
            CreateTableTh('AccF14', data) +
            CreateTableTh('AccF15', data) +
            CreateTableTh('AccF16', data) +
            CreateTableTh('AccF17', data) +
            CreateTableTh('AccF18', data) +
            CreateTableTh('AccF19', data) +
            CreateTableTh('AccF20', data) +
            '<th>عملیات</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageAcc" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() }, style: {color: Level == 1 ? \'#009688\': \'#212529\'}  "  >' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('Code', 0, 0, data) +
            CreateTableTd('Name', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Eghdam', 0, 0, data) +
            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +
            CreateTableTd('ArzCode', 0, 0, data) +
            CreateTableTd('ArzName', 0, 0, data) +
            CreateTableTd('ArzRate', 0, 0, data) +
            CreateTableTd('AGruCode', 0, 0, data) +
            CreateTableTd('AGruName', 0, 0, data) +
            CreateTableTd('AccF01', 0, 4, data) +
            CreateTableTd('AccF02', 0, 4, data) +
            CreateTableTd('AccF03', 0, 4, data) +
            CreateTableTd('AccF04', 0, 4, data) +
            CreateTableTd('AccF05', 0, 4, data) +
            CreateTableTd('AccF06', 0, 4, data) +
            CreateTableTd('AccF07', 0, 4, data) +
            CreateTableTd('AccF08', 0, 4, data) +
            CreateTableTd('AccF09', 0, 4, data) +
            CreateTableTd('AccF10', 0, 4, data) +
            CreateTableTd('AccF11', 0, 4, data) +
            CreateTableTd('AccF12', 0, 4, data) +
            CreateTableTd('AccF13', 0, 4, data) +
            CreateTableTd('AccF14', 0, 4, data) +
            CreateTableTd('AccF15', 0, 4, data) +
            CreateTableTd('AccF16', 0, 4, data) +
            CreateTableTd('AccF17', 0, 4, data) +
            CreateTableTd('AccF18', 0, 4, data) +
            CreateTableTd('AccF19', 0, 4, data) +
            CreateTableTd('AccF20', 0, 4, data) +
            '<td>' +
            '   <a id="UpdateAcc" data-bind="click: $root.UpdateAcc">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteAcc" data-bind="click: $root.DeleteAcc, visible: $root.ShowAction(Code)">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '<td style="background-color: #efb683;"></td>' +
            CreateTableTdSearch('Code', data) +
            CreateTableTdSearch('Name', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprCode', data) +
            CreateTableTdSearch('OprName', data) +
            CreateTableTdSearch('ArzCode', data) +
            CreateTableTdSearch('ArzName', data) +
            CreateTableTdSearch('ArzRate', data) +
            CreateTableTdSearch('AGruCode', data) +
            CreateTableTdSearch('AGruName', data) +
            CreateTableTdSearch('AccF01', data) +
            CreateTableTdSearch('AccF02', data) +
            CreateTableTdSearch('AccF03', data) +
            CreateTableTdSearch('AccF04', data) +
            CreateTableTdSearch('AccF05', data) +
            CreateTableTdSearch('AccF06', data) +
            CreateTableTdSearch('AccF07', data) +
            CreateTableTdSearch('AccF08', data) +
            CreateTableTdSearch('AccF09', data) +
            CreateTableTdSearch('AccF10', data) +
            CreateTableTdSearch('AccF11', data) +
            CreateTableTdSearch('AccF12', data) +
            CreateTableTdSearch('AccF13', data) +
            CreateTableTdSearch('AccF14', data) +
            CreateTableTdSearch('AccF15', data) +
            CreateTableTdSearch('AccF16', data) +
            CreateTableTdSearch('AccF17', data) +
            CreateTableTdSearch('AccF18', data) +
            CreateTableTdSearch('AccF19', data) +
            CreateTableTdSearch('AccF20', data) +
            '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        $('#TableList').append(dataTable);
    }

    function CreateTableTh(field, data) {

        text = '<th ';
        TextField = FindTextField(field, data);


        sortField = field;

        switch (field) {
            case "Code":
                sortField = 'SortCode';
                break;
            case "Name":
                sortField = 'SortName';
                break;
        }


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




    self.sortTableAcc();
};

ko.applyBindings(new ViewModel());

