var ViewModel = function () {
    var self = this;

    self.KalaList = ko.observableArray([]); // ليست کالاها
    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.KGruList = ko.observableArray([]); // ليست گروه کالاها
    self.TestKalaList = ko.observableArray([]); // لیست تست حذف 


    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالاها
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var KGruUri = server + '/api/Web_Data/KGru/'; // آدرس گروه کالا
    var SaveKalaUri = server + '/api/Web_Data/AFI_SaveKala/'; // آدرس ذخیره کالا
    var DelKalaUri = server + '/api/Web_Data/AFI_DelKala/'; // آدرس حذف کالا
    var TestKala_DeleteUri = server + '/api/Web_Data/TestKala_Delete/'; // آدرس تست حذف 
    var TestKalaUri = server + '/api/Web_Data/TestKala/'; // آدرس تست 
    TestUser();


    validation = CheckAccess('NEW_KALA', Fct_or_Inv);// New Kala
    sessionStorage.NEW_KALA = validation;
    validation == true ? $("#AddNewKala").show() : $("#AddNewKala").hide()

    validation = CheckAccess('CHG_KALA', Fct_or_Inv);// edit Kala
    sessionStorage.CHG_KALA = validation;

    validation = CheckAccess('DEL_KALA', Fct_or_Inv); // delete Kala
    sessionStorage.DEL_KALA = validation;

    self.ShowAction = function (Code) {
        if (sessionStorage.DEL_KALA == 'true')
            return true;
        else
            return false;
    }


    var kGruCode = '';
    var kalaCode = '';

    var isUpdate = false;

    var rprtId = 'Kala';


    var columns = [
        'Code',
        'Name',
        'Spec',
        'Eghdam',
        //'EghdamDate',
        'KalaF01',
        'KalaF02',
        'KalaF03',
        'KalaF04',
        'KalaF05',
        'KalaF06',
        'KalaF07',
        'KalaF08',
        'KalaF09',
        'KalaF10',
        'KalaF11',
        'KalaF12',
        'KalaF13',
        'KalaF14',
        'KalaF15',
        'KalaF16',
        'KalaF17',
        'KalaF18',
        'KalaF19',
        'KalaF20'
    ];

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها



    var cols;
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


    /* //Get ExtraFields List
     function getExtraFieldsList() {
         ajaxFunction(ExtraFieldsUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function (data) {
             self.ExtraFieldsList(data);
         });
     }*/

    function getExtraFieldsList() {
        result = ko.utils.arrayFilter(cols, function (item) {
            result =
                ko.utils.stringStartsWith(item.Code, 'KalaF') &&
                item.Name != ''
            return result;
        })
        self.ExtraFieldsList(result);
    }

    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Kala", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Kala", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);



    getExtraFieldsList();

    function getKalaList() {
        var KalaObject = {
            withimage: false,
            updatedate: null,
            Mode: 255,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject, false).done(function (data) {
            self.KalaList(data == null ? [] : data);
        });
    }
    getKalaList();


    //Get  KGru List
    function getKGruList() {
        var KGruObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(KGruUri + ace + '/' + sal + '/' + group, 'POST', KGruObject, true).done(function (data) {
            self.KGruList(data);
        });
    }

    $('#btnKGru').click(function () {
        if (self.KGruList().length == 0) {
            getKGruList();
        }
    });



    self.currentPageKala = ko.observable();

    pageSizeKala = localStorage.getItem('pageSizeKala') == null ? 10 : localStorage.getItem('pageSizeKala');
    self.pageSizeKala = ko.observable(pageSizeKala);
    self.currentPageIndexKala = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");








    self.filterCode = ko.observable("");
    self.filterName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterKalaF01 = ko.observable("");
    self.filterKalaF02 = ko.observable("");
    self.filterKalaF03 = ko.observable("");
    self.filterKalaF04 = ko.observable("");
    self.filterKalaF05 = ko.observable("");
    self.filterKalaF06 = ko.observable("");
    self.filterKalaF07 = ko.observable("");
    self.filterKalaF08 = ko.observable("");
    self.filterKalaF09 = ko.observable("");
    self.filterKalaF10 = ko.observable("");
    self.filterKalaF11 = ko.observable("");
    self.filterKalaF12 = ko.observable("");
    self.filterKalaF13 = ko.observable("");
    self.filterKalaF14 = ko.observable("");
    self.filterKalaF15 = ko.observable("");
    self.filterKalaF16 = ko.observable("");
    self.filterKalaF17 = ko.observable("");
    self.filterKalaF18 = ko.observable("");
    self.filterKalaF19 = ko.observable("");
    self.filterKalaF20 = ko.observable("");

    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterCode(listFilter[0]);
        self.filterName(listFilter[1]);
        self.filterSpec(listFilter[2]);
        self.filterEghdam(listFilter[3]);
        self.filterKalaF01(listFilter[4]);
        self.filterKalaF02(listFilter[5]);
        self.filterKalaF03(listFilter[6]);
        self.filterKalaF04(listFilter[7]);
        self.filterKalaF05(listFilter[8]);
        self.filterKalaF06(listFilter[9]);
        self.filterKalaF07(listFilter[10]);
        self.filterKalaF08(listFilter[11]);
        self.filterKalaF09(listFilter[12]);
        self.filterKalaF10(listFilter[13]);
        self.filterKalaF11(listFilter[14]);
        self.filterKalaF12(listFilter[15]);
        self.filterKalaF13(listFilter[16]);
        self.filterKalaF14(listFilter[17]);
        self.filterKalaF15(listFilter[18]);
        self.filterKalaF16(listFilter[19]);
        self.filterKalaF17(listFilter[20]);
        self.filterKalaF18(listFilter[21]);
        self.filterKalaF19(listFilter[22]);
        self.filterKalaF20(listFilter[23]);
    }
    self.filterKalaList = ko.computed(function () {
        self.currentPageIndexKala(0);
        var filterCode = self.filterCode();
        var filterName = self.filterName();
        var filterSpec = self.filterSpec();
        var filterEghdam = self.filterEghdam();
        var filterKalaF01 = self.filterKalaF01();
        var filterKalaF02 = self.filterKalaF02();
        var filterKalaF03 = self.filterKalaF03();
        var filterKalaF04 = self.filterKalaF04();
        var filterKalaF05 = self.filterKalaF05();
        var filterKalaF06 = self.filterKalaF06();
        var filterKalaF07 = self.filterKalaF07();
        var filterKalaF08 = self.filterKalaF08();
        var filterKalaF09 = self.filterKalaF09();
        var filterKalaF10 = self.filterKalaF10();
        var filterKalaF11 = self.filterKalaF11();
        var filterKalaF12 = self.filterKalaF12();
        var filterKalaF13 = self.filterKalaF13();
        var filterKalaF14 = self.filterKalaF14();
        var filterKalaF15 = self.filterKalaF15();
        var filterKalaF16 = self.filterKalaF16();
        var filterKalaF17 = self.filterKalaF17();
        var filterKalaF18 = self.filterKalaF18();
        var filterKalaF19 = self.filterKalaF19();
        var filterKalaF20 = self.filterKalaF20();

        filterEghdam = filterEghdam.replace("/", ".");


        if (!filterCode && !filterName && !filterSpec && !filterEghdam && !filterKalaF01 && !filterKalaF02 && !filterKalaF03 && !filterKalaF04 && !filterKalaF05 && !filterKalaF06 && !filterKalaF07 && !filterKalaF08 && !filterKalaF09 && !filterKalaF10 &&
            !filterKalaF11 && !filterKalaF12 && !filterKalaF13 && !filterKalaF14 && !filterKalaF15 && !filterKalaF16 && !filterKalaF17 && !filterKalaF18 && !filterKalaF19 && !filterKalaF20) {
            $("#CountRecord").text(self.KalaList().length);
            sessionStorage.setItem('listFilter', null);
            return self.KalaList();
        } else {

            listFilter = [
                filterCode,
                filterName,
                filterSpec,
                filterEghdam,
                filterKalaF01,
                filterKalaF02,
                filterKalaF03,
                filterKalaF04,
                filterKalaF05,
                filterKalaF06,
                filterKalaF07,
                filterKalaF08,
                filterKalaF09,
                filterKalaF10,
                filterKalaF11,
                filterKalaF12,
                filterKalaF13,
                filterKalaF14,
                filterKalaF15,
                filterKalaF16,
                filterKalaF17,
                filterKalaF18,
                filterKalaF19,
                filterKalaF20
            ];
            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.KalaList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filterCode) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filterName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Eghdam == null ? '' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.KalaF01 == null ? '' : item.KalaF01.toString().search(filterKalaF01) >= 0) &&
                    (item.KalaF02 == null ? '' : item.KalaF02.toString().search(filterKalaF02) >= 0) &&
                    (item.KalaF03 == null ? '' : item.KalaF03.toString().search(filterKalaF03) >= 0) &&
                    (item.KalaF04 == null ? '' : item.KalaF04.toString().search(filterKalaF04) >= 0) &&
                    (item.KalaF05 == null ? '' : item.KalaF05.toString().search(filterKalaF05) >= 0) &&
                    (item.KalaF06 == null ? '' : item.KalaF06.toString().search(filterKalaF06) >= 0) &&
                    (item.KalaF07 == null ? '' : item.KalaF07.toString().search(filterKalaF07) >= 0) &&
                    (item.KalaF08 == null ? '' : item.KalaF08.toString().search(filterKalaF08) >= 0) &&
                    (item.KalaF09 == null ? '' : item.KalaF09.toString().search(filterKalaF09) >= 0) &&
                    (item.KalaF10 == null ? '' : item.KalaF10.toString().search(filterKalaF10) >= 0) &&
                    (item.KalaF11 == null ? '' : item.KalaF11.toString().search(filterKalaF11) >= 0) &&
                    (item.KalaF12 == null ? '' : item.KalaF12.toString().search(filterKalaF12) >= 0) &&
                    (item.KalaF13 == null ? '' : item.KalaF13.toString().search(filterKalaF13) >= 0) &&
                    (item.KalaF14 == null ? '' : item.KalaF14.toString().search(filterKalaF14) >= 0) &&
                    (item.KalaF15 == null ? '' : item.KalaF15.toString().search(filterKalaF15) >= 0) &&
                    (item.KalaF16 == null ? '' : item.KalaF16.toString().search(filterKalaF16) >= 0) &&
                    (item.KalaF17 == null ? '' : item.KalaF17.toString().search(filterKalaF17) >= 0) &&
                    (item.KalaF18 == null ? '' : item.KalaF18.toString().search(filterKalaF18) >= 0) &&
                    (item.KalaF19 == null ? '' : item.KalaF19.toString().search(filterKalaF19) >= 0) &&
                    (item.KalaF20 == null ? '' : item.KalaF20.toString().search(filterKalaF20) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }

    });



    self.search = ko.observable("");
    self.search(sessionStorage.searchKala);
    self.firstMatch = ko.dependentObservable(function () {
        var indexKala = 0;
        sessionStorage.searchKala = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexKala(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.KalaList(), function (item) {
                indexKala += 1;
                return item.Code == search;
            });
            if (indexKala < self.pageSizeKala())
                self.currentPageIndexKala(0);
            else {
                var a = Math.round((indexKala / self.pageSizeKala()), 0);
                if (a < (indexKala / self.pageSizeKala())) a += 1;
                self.currentPageIndexKala(a - 1);
            }
            return value;
        }
    });

    self.currentPageKala = ko.computed(function () {
        var pageSizeKala = parseInt(self.pageSizeKala(), 10),
            startIndex = pageSizeKala * self.currentPageIndexKala(),
            endIndex = startIndex + pageSizeKala;
        localStorage.setItem('pageSizeKala', pageSizeKala);
        return self.filterKalaList().slice(startIndex, endIndex);
    });

    self.nextPageKala = function () {
        if (((self.currentPageIndexKala() + 1) * self.pageSizeKala()) < self.filterKalaList().length) {
            self.currentPageIndexKala(self.currentPageIndexKala() + 1);
        }
    };

    self.previousPageKala = function () {
        if (self.currentPageIndexKala() > 0) {
            self.currentPageIndexKala(self.currentPageIndexKala() - 1);
        }
    };

    self.firstPageKala = function () {
        self.currentPageIndexKala(0);
    };

    self.lastPageKala = function () {
        tempCountKala = parseInt(self.filterKalaList().length / self.pageSizeKala(), 10);
        if ((self.filterKalaList().length % self.pageSizeKala()) == 0)
            self.currentPageIndexKala(tempCountKala - 1);
        else
            self.currentPageIndexKala(tempCountKala);
    };


    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeKalaF01 = ko.observable("");
    self.iconTypeKalaF02 = ko.observable("");
    self.iconTypeKalaF03 = ko.observable("");
    self.iconTypeKalaF04 = ko.observable("");
    self.iconTypeKalaF05 = ko.observable("");
    self.iconTypeKalaF06 = ko.observable("");
    self.iconTypeKalaF07 = ko.observable("");
    self.iconTypeKalaF08 = ko.observable("");
    self.iconTypeKalaF09 = ko.observable("");
    self.iconTypeKalaF10 = ko.observable("");
    self.iconTypeKalaF11 = ko.observable("");
    self.iconTypeKalaF12 = ko.observable("");
    self.iconTypeKalaF13 = ko.observable("");
    self.iconTypeKalaF14 = ko.observable("");
    self.iconTypeKalaF15 = ko.observable("");
    self.iconTypeKalaF16 = ko.observable("");
    self.iconTypeKalaF17 = ko.observable("");
    self.iconTypeKalaF18 = ko.observable("");
    self.iconTypeKalaF19 = ko.observable("");
    self.iconTypeKalaF20 = ko.observable("");


    self.sortTableKala = function (viewModel, e) {


        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortBase_Kala" + rprtId);
            self.sortType = localStorage.getItem("sortBaseType_Kala" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortBase_Kala" + rprtId, orderProp);
        localStorage.setItem("sortBaseType_Kala" + rprtId, self.sortType);

        self.search("");
        self.currentColumn(orderProp);
        self.KalaList.sort(function (left, right) {

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
        self.iconTypeKalaF01('');
        self.iconTypeKalaF02('');
        self.iconTypeKalaF03('');
        self.iconTypeKalaF04('');
        self.iconTypeKalaF05('');
        self.iconTypeKalaF06('');
        self.iconTypeKalaF07('');
        self.iconTypeKalaF08('');
        self.iconTypeKalaF09('');
        self.iconTypeKalaF10('');
        self.iconTypeKalaF11('');
        self.iconTypeKalaF12('');
        self.iconTypeKalaF13('');
        self.iconTypeKalaF14('');
        self.iconTypeKalaF15('');
        self.iconTypeKalaF16('');
        self.iconTypeKalaF17('');
        self.iconTypeKalaF18('');
        self.iconTypeKalaF19('');
        self.iconTypeKalaF20('');

        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF01') self.iconTypeKalaF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF02') self.iconTypeKalaF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF03') self.iconTypeKalaF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF04') self.iconTypeKalaF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF05') self.iconTypeKalaF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF06') self.iconTypeKalaF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF07') self.iconTypeKalaF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF08') self.iconTypeKalaF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF09') self.iconTypeKalaF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF10') self.iconTypeKalaF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF11') self.iconTypeKalaF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF12') self.iconTypeKalaF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF13') self.iconTypeKalaF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF14') self.iconTypeKalaF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF15') self.iconTypeKalaF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF16') self.iconTypeKalaF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF17') self.iconTypeKalaF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF18') self.iconTypeKalaF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF19') self.iconTypeKalaF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaF20') self.iconTypeKalaF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };




    $('#refreshKala').click(function () {

        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست کالاها") + " " + translate("به روز رسانی شود ؟"),

            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKalaList();
                self.sortTableKala();
            }
        })
    })














    self.currentPageKGru = ko.observable();
    pageSizeKGru = localStorage.getItem('pageSizeKGru') == null ? 10 : localStorage.getItem('pageSizeKGru');
    self.pageSizeKGru = ko.observable(pageSizeKGru);
    self.currentPageIndexKGru = ko.observable(0);

    self.filterKGru0 = ko.observable("");
    self.filterKGru1 = ko.observable("");
    self.filterKGru2 = ko.observable("");

    self.filterKGruList = ko.computed(function () {

        self.currentPageIndexKGru(0);
        var filter0 = self.filterKGru0().toUpperCase();
        var filter1 = self.filterKGru1();
        var filter2 = self.filterKGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.KGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.KGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKGru = ko.computed(function () {
        var pageSizeKGru = parseInt(self.pageSizeKGru(), 10),
            startIndex = pageSizeKGru * self.currentPageIndexKGru(),
            endIndex = startIndex + pageSizeKGru;
        localStorage.setItem('pageSizeKGru', pageSizeKGru);
        return self.filterKGruList().slice(startIndex, endIndex);
    });

    self.nextPageKGru = function () {
        if (((self.currentPageIndexKGru() + 1) * self.pageSizeKGru()) < self.filterKGruList().length) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() + 1);
        }
    };

    self.previousPageKGru = function () {
        if (self.currentPageIndexKGru() > 0) {
            self.currentPageIndexKGru(self.currentPageIndexKGru() - 1);
        }
    };

    self.firstPageKGru = function () {
        self.currentPageIndexKGru(0);
    };

    self.lastPageKGru = function () {
        countKGru = parseInt(self.filterKGruList().length / self.pageSizeKGru(), 10);
        if ((self.filterKGruList().length % self.pageSizeKGru()) == 0)
            self.currentPageIndexKGru(countKGru - 1);
        else
            self.currentPageIndexKGru(countKGru);
    };

    self.sortTableKGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.KGruList.sort(function (left, right) {
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



    $('#refreshKGru').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست گروه کالا") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getKGruList();
            }
        })
    })


    self.selectKGru = function (item) {
        kGruCode = item.Code;
        $('#nameKGru').val('(' + item.Code + ') ' + item.Name);
    }


    $('#zarib1').val(translate("واحد اصلی"));


    self.AddNewKala = function () {
        isUpdate = false;
        sessionStorage.NEW_KALA == 'true' ? $("#saveKala").show() : $("#saveKala").hide()
        kGruCode = '';
        $('#Code').val('');
        $('#Name').val('');
        $('#FanniNo').val('');
        $('#Spec').val('');
        $('#nameKGru').val('');

        $('#Code').attr('readonly', false);

        $('#UnitName1').val('');
        $('#UnitName2').val('');
        $('#UnitName3').val('');
        $('#DeghatM1').val('');
        $('#DeghatM2').val('');
        $('#DeghatM3').val('');
        $('#DeghatR1').val('');
        $('#DeghatR2').val('');
        $('#DeghatR3').val('');
        // $('#zarib1').val('');
        $('#zarib2').val('');
        $('#zarib3').val('');
        $('#DefaultUnit1').css('display', 'block');
        $('#DefaultUnit2').css('display', 'none');
        $('#DefaultUnit3').css('display', 'none');

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

        $("#Code").focus();
        $('#modal-Kala').modal('show');
    }


    function SetDataKala(item) {
        isUpdate = true;
        $('#Code').val(item.Code);
        $('#Code').attr('readonly', true);
        $('#Name').val(item.Name);
        $('#FanniNo').val(item.FanniNo);
        $('#Spec').val(item.Spec);
        $('#nameKGru').val('');

        $('#UnitName1').val(item.UnitName1);
        $('#UnitName2').val(item.UnitName2);
        $('#UnitName3').val(item.UnitName3);
        $('#DeghatM1').val(item.DeghatM1);
        $('#DeghatM2').val(item.DeghatM2);
        $('#DeghatM3').val(item.DeghatM3);
        $('#DeghatR1').val(item.DeghatR1);
        $('#DeghatR2').val(item.DeghatR2);
        $('#DeghatR3').val(item.DeghatR3);
        //$('#zarib1').val(item.zarib1);
        $('#zarib2').val(item.zarib2);
        $('#zarib3').val(item.zarib3);

        $('#DefaultUnit1').css('display', 'none');
        $('#DefaultUnit2').css('display', 'none');
        $('#DefaultUnit3').css('display', 'none');

        if (item.DefaultUnit == "1") {
            $('#DefaultUnit1').css('display', 'block');
        } else if (item.DefaultUnit == "2") {
            $('#DefaultUnit2').css('display', 'block');
        } else if (item.DefaultUnit == "3") {
            $('#DefaultUnit3').css('display', 'block');
        };




        kGruCode = item.KGruCode;
        if (kGruCode != '')
            $('#nameKGru').val('(' + item.KGruCode + ') ' + item.KGruName);


        sessionStorage.F01 = item.KalaF01;
        sessionStorage.F02 = item.KalaF02;
        sessionStorage.F03 = item.KalaF03;
        sessionStorage.F04 = item.KalaF04;
        sessionStorage.F05 = item.KalaF05;
        sessionStorage.F06 = item.KalaF06;
        sessionStorage.F07 = item.KalaF07;
        sessionStorage.F08 = item.KalaF08;
        sessionStorage.F09 = item.KalaF09;
        sessionStorage.F10 = item.KalaF10;
        sessionStorage.F11 = item.KalaF11;
        sessionStorage.F12 = item.KalaF12;
        sessionStorage.F13 = item.KalaF13;
        sessionStorage.F14 = item.KalaF14;
        sessionStorage.F15 = item.KalaF15;
        sessionStorage.F16 = item.KalaF16;
        sessionStorage.F17 = item.KalaF17;
        sessionStorage.F18 = item.KalaF18;
        sessionStorage.F19 = item.KalaF19;
        sessionStorage.F20 = item.KalaF20;

        $("#ExtraFields1").val(sessionStorage.KalaF01);
        $("#ExtraFields2").val(sessionStorage.KalaF02);
        $("#ExtraFields3").val(sessionStorage.KalaF03);
        $("#ExtraFields4").val(sessionStorage.KalaF04);
        $("#ExtraFields5").val(sessionStorage.KalaF05);
        $("#ExtraFields6").val(sessionStorage.KalaF06);
        $("#ExtraFields7").val(sessionStorage.KalaF07);
        $("#ExtraFields8").val(sessionStorage.KalaF08);
        $("#ExtraFields9").val(sessionStorage.KalaF09);
        $("#ExtraFields10").val(sessionStorage.KalaF10);
        $("#ExtraFields11").val(sessionStorage.KalaF11);
        $("#ExtraFields12").val(sessionStorage.KalaF12);
        $("#ExtraFields13").val(sessionStorage.KalaF13);
        $("#ExtraFields14").val(sessionStorage.KalaF14);
        $("#ExtraFields15").val(sessionStorage.KalaF15);
        $("#ExtraFields16").val(sessionStorage.KalaF16);
        $("#ExtraFields17").val(sessionStorage.KalaF17);
        $("#ExtraFields18").val(sessionStorage.KalaF18);
        $("#ExtraFields19").val(sessionStorage.KalaF19);
        $("#ExtraFields20").val(sessionStorage.KalaF20);

        $("#ExtraFields1").val(item.KalaF01);
        $("#ExtraFields2").val(item.KalaF02);
        $("#ExtraFields3").val(item.KalaF03);
        $("#ExtraFields4").val(item.KalaF04);
        $("#ExtraFields5").val(item.KalaF05);
        $("#ExtraFields6").val(item.KalaF06);
        $("#ExtraFields7").val(item.KalaF07);
        $("#ExtraFields8").val(item.KalaF08);
        $("#ExtraFields9").val(item.KalaF09);
        $("#ExtraFields10").val(item.KalaF10);
        $("#ExtraFields11").val(item.KalaF11);
        $("#ExtraFields12").val(item.KalaF12);
        $("#ExtraFields13").val(item.KalaF13);
        $("#ExtraFields14").val(item.KalaF14);
        $("#ExtraFields15").val(item.KalaF15);
        $("#ExtraFields16").val(item.KalaF16);
        $("#ExtraFields17").val(item.KalaF17);
        $("#ExtraFields18").val(item.KalaF18);
        $("#ExtraFields19").val(item.KalaF19);
        $("#ExtraFields20").val(item.KalaF20);

    }

    self.UpdateKala = function (item) {
        sessionStorage.CHG_KALA == 'true' ? $("#saveKala").show() : $("#saveKala").hide()
        SetDataKala(item);

        // $("#Code").focus();

        /*var listKalaUse = localStorage.getItem("listKalaUse");
        kalaCode = item.Code;

        data = ',' + kalaCode;
        list = listKalaUse.split(',');
        find = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == kalaCode) {
                find = true;
            }
        }

        if (find == true) {
            return showNotification(translate('در حال استفاده', 0)
        }
        else {
            localStorage.setItem("listKalaUse", list + data);
            $('#modal-Kala').modal('show');
        }*/
        kalaCode = item.Code;
        if (TestUseSanad(ace, sal, "Kala", kalaCode, true, '') == true) {
            showNotification(translate('کالا') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {
            $('#modal-Kala').modal('show');
        }

    }


    $('#modal-Kala').on('show.bs.modal', function () {
        if (ace == 'Web8') {
            $('#showFanniNo').css('display', 'none');
        }
    });

    $('#modal-Kala').on('hide.bs.modal', function () {
        RemoveUseSanad(ace, sal, "Kala", kalaCode);
        /*listKalaUse = localStorage.getItem("listKalaUse");
        listKalaUse = listKalaUse.replace(',' + kalaCode, '');
        localStorage.setItem("listKalaUse", listKalaUse);*/
    });







    $('#B_DefaultUnit1').click(function () {
        $('#DefaultUnit1').css('display', 'block');
        $('#DefaultUnit2').css('display', 'none');
        $('#DefaultUnit3').css('display', 'none');
    })

    $('#B_DefaultUnit2').click(function () {
        $('#DefaultUnit1').css('display', 'none');
        $('#DefaultUnit2').css('display', 'block');
        $('#DefaultUnit3').css('display', 'none');
    })

    $('#B_DefaultUnit3').click(function () {
        $('#DefaultUnit1').css('display', 'none');
        $('#DefaultUnit2').css('display', 'none');
        $('#DefaultUnit3').css('display', 'block');
    })


    function SaveKala() {
        code = $('#Code').val();
        name = $('#Name').val();

        if (code == "") {
            return showNotification(translate('کد کالا را وارد کنید'), 0)
        }

        if (name == "") {
            return showNotification(translate('نام کالا را وارد کنید'), 0)
        }

        /* if (isUpdate == false) {
             listCode = ko.utils.arrayFilter(self.KalaList(), function (item) {
                 return item.Code == code;
             });
 
             if (listCode.length == 1) {
                 return showNotification(translate('کد کالا تکراری', 0)
             }
         }*/

        if ($('#DefaultUnit1').css('display') == 'block') defaultUnit = 1;
        else if ($('#DefaultUnit2').css('display') == 'block') defaultUnit = 2;
        else if ($('#DefaultUnit3').css('display') == 'block') defaultUnit = 3;


        var TestKala_Object = {
            Code: code
        };

        ajaxFunction(TestKalaUri + ace + '/' + sal + '/' + group, 'POST', TestKala_Object).done(function (data) {
            var obj = JSON.parse(data);
            self.TestKalaList(obj);
            if (data.length > 2) {
                $('#modal-Test').modal('show');
                SetDataTestKala(false);
            }
            else {

                var SaveKala_Object = {
                    BranchCode: 0,
                    UserCode: sessionStorage.userName,
                    Code: code,
                    Name: name,
                    FanniNo: $('#FanniNo').val(),
                    Spec: $('#Spec').val(),
                    KGruCode: kGruCode,
                    DefaultUnit: defaultUnit,
                    UnitName1: $('#UnitName1').val(),
                    UnitName2: $('#UnitName2').val(),
                    UnitName3: $('#UnitName3').val(),
                    /*Weight1: 1,
                    Weight2: 1,
                    Weight3: 1,
                    SPrice1: 1,
                    SPrice2: 1,
                    SPrice3: 1,
                    PPrice1: 1,
                    PPrice2: 1,
                    PPrice3: 1,*/
                    Zarib1: 1,//$('#zarib1').val(),
                    Zarib2: $('#zarib2').val(),
                    Zarib3: $('#zarib3').val(),
                    DeghatM1: $('#DeghatM1').val(),
                    DeghatM2: $('#DeghatM2').val(),
                    DeghatM3: $('#DeghatM3').val(),
                    DeghatR1: $('#DeghatR1').val(),
                    DeghatR2: $('#DeghatR2').val(),
                    DeghatR3: $('#DeghatR3').val(),
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

                ajaxFunction(SaveKalaUri + ace + '/' + sal + '/' + group, 'POST', SaveKala_Object).done(function (data) {
                    getKalaList();
                    $('#modal-Kala').modal('hide');
                    SaveLog(Fct_or_Inv, isUpdate == true ? EditMode_Chg : EditMode_New, LogMode_KALA, code, 0, 0);
                    showNotification(translate('ذخيره شد'), 1);
                });
            }
        });
    }

    $('#saveKala').click(function () {
        SaveKala();
    });


    self.DeleteKala = function (item) {
        kalaCode = item.Code;
        if (TestUseSanad(ace, sal, "Kala", kalaCode, false, '') == true) {
            showNotification(translate('کالا') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {
            Swal.fire({
                title: mes_Delete,
                text: translate("آیا کالای انتخابی حذف شود"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    code = item.Code;
                    var TestKala_DeleteObject = {
                        Code: code
                    };

                    ajaxFunction(TestKala_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestKala_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestKalaList(obj);
                        if (data.length > 2) {
                            $('#modal-Test').modal('show');
                            SetDataTestKala(true);
                        }
                        else {
                            DeleteKala(code);
                        }
                    });
                }
            })
        }
    };


    function SetDataTestKala(deleteKala) {
        $("#BodyTestKala").empty();
        deleteKala == true ? $("#titleTestKala").text('حذف کالا') : $("#titleTestKala").text('ذخیره کالا');
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestKalaList();
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

            if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTestKala').append(textBody);

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

    function DeleteKala(code) {
        ajaxFunction(DelKalaUri + ace + '/' + sal + '/' + group + '/' + code + '/', 'GET').done(function (response) {
            currentPage = self.currentPageIndexKala();
            getKalaList();
            self.currentPageIndexKala(currentPage);
            SaveLog(Fct_or_Inv, EditMode_Del, LogMode_KALA, code, 0, 0);
            showNotification(translate('حذف شد'), 1);
        });
    }






    $("#Code").focusout(function () {
        code = $("#Code").val();

        if ($(this).attr('readonly') != 'readonly' && code != '') {

            listCode = ko.utils.arrayFilter(self.KalaList(), function (item) {
                return item.Code == code;
            });

            if (listCode.length == 1) {
                SetDataKala(listCode[0]);
                $("#Name").focus();
            }
        }

    });





    self.radif = function (index) {
        countShow = self.pageSizeKala();
        page = self.currentPageIndexKala();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableKala">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('Code', data) +
            CreateTableTh('Name', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('KalaF01', data) +
            CreateTableTh('KalaF02', data) +
            CreateTableTh('KalaF03', data) +
            CreateTableTh('KalaF04', data) +
            CreateTableTh('KalaF05', data) +
            CreateTableTh('KalaF06', data) +
            CreateTableTh('KalaF07', data) +
            CreateTableTh('KalaF08', data) +
            CreateTableTh('KalaF09', data) +
            CreateTableTh('KalaF10', data) +
            CreateTableTh('KalaF11', data) +
            CreateTableTh('KalaF12', data) +
            CreateTableTh('KalaF13', data) +
            CreateTableTh('KalaF14', data) +
            CreateTableTh('KalaF15', data) +
            CreateTableTh('KalaF16', data) +
            CreateTableTh('KalaF17', data) +
            CreateTableTh('KalaF18', data) +
            CreateTableTh('KalaF19', data) +
            CreateTableTh('KalaF20', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageKala" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() } "  >' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('Code', 0, 0, data) +
            CreateTableTd('Name', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Eghdam', 0, 4, data) +
            CreateTableTd('KalaF01', 0, 4, data) +
            CreateTableTd('KalaF02', 0, 4, data) +
            CreateTableTd('KalaF03', 0, 4, data) +
            CreateTableTd('KalaF04', 0, 4, data) +
            CreateTableTd('KalaF05', 0, 4, data) +
            CreateTableTd('KalaF06', 0, 4, data) +
            CreateTableTd('KalaF07', 0, 4, data) +
            CreateTableTd('KalaF08', 0, 4, data) +
            CreateTableTd('KalaF09', 0, 4, data) +
            CreateTableTd('KalaF10', 0, 4, data) +
            CreateTableTd('KalaF11', 0, 4, data) +
            CreateTableTd('KalaF12', 0, 4, data) +
            CreateTableTd('KalaF13', 0, 4, data) +
            CreateTableTd('KalaF14', 0, 4, data) +
            CreateTableTd('KalaF15', 0, 4, data) +
            CreateTableTd('KalaF16', 0, 4, data) +
            CreateTableTd('KalaF17', 0, 4, data) +
            CreateTableTd('KalaF18', 0, 4, data) +
            CreateTableTd('KalaF19', 0, 4, data) +
            CreateTableTd('KalaF20', 0, 4, data) +
            '<td>' +
            '   <a id="UpdateKala" data-bind="click: $root.UpdateKala">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteKala" data-bind="click: $root.DeleteKala, visible: $root.ShowAction(Code)">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td style="background-color: #efb683;"></td>' +
            CreateTableTdSearch('Code', data) +
            CreateTableTdSearch('Name', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('KalaF01', data) +
            CreateTableTdSearch('KalaF02', data) +
            CreateTableTdSearch('KalaF03', data) +
            CreateTableTdSearch('KalaF04', data) +
            CreateTableTdSearch('KalaF05', data) +
            CreateTableTdSearch('KalaF06', data) +
            CreateTableTdSearch('KalaF07', data) +
            CreateTableTdSearch('KalaF08', data) +
            CreateTableTdSearch('KalaF09', data) +
            CreateTableTdSearch('KalaF10', data) +
            CreateTableTdSearch('KalaF11', data) +
            CreateTableTdSearch('KalaF12', data) +
            CreateTableTdSearch('KalaF13', data) +
            CreateTableTdSearch('KalaF14', data) +
            CreateTableTdSearch('KalaF15', data) +
            CreateTableTdSearch('KalaF16', data) +
            CreateTableTdSearch('KalaF17', data) +
            CreateTableTdSearch('KalaF18', data) +
            CreateTableTdSearch('KalaF19', data) +
            CreateTableTdSearch('KalaF20', data) +
            '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        $('#TableList').append(dataTable);
    }

    function CreateTableTh(field, data) {

        text = '<th ';
        TextField = FindTextField(field, data);

        //sortField = field == 'Code' ? 'SortCode' : field
        sortField = field == 'Name' ? 'SortName' : field

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


    self.sortTableKala();

    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "Kala", kalaCode);
        /*listKalaUse = localStorage.getItem("listKalaUse");
        listKalaUse = listKalaUse.replace(',' + kalaCode, '');
        localStorage.setItem("listKalaUse", listKalaUse);*/

        /*var confirmClose = confirm();
        if (confirmClose == false) {
            listForms = localStorage.getItem("listForms");
            if (listForms != null) {
                listForms = listForms.replace('!!form_BaseKala', '');
                localStorage.setItem("listForms", listForms);
            }
        }*/
    };

};

ko.applyBindings(new ViewModel());

