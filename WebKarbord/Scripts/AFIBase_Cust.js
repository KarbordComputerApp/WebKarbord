var ViewModel = function () {
    var self = this;

    self.CustList = ko.observableArray([]); // ليست خریداران/فروشندگان 
    self.SettingColumnList = ko.observableArray([]); // لیست ستون 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.CGruList = ko.observableArray([]); // ليست گروه خریداران/فروشندگان
    self.TestCust_DeleteList = ko.observableArray([]); // لیست تست حذف 


    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس خریداران/فروشندگان 
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var CGruUri = server + '/api/Web_Data/CGru/'; // آدرس گروه خریداران/فروشندگان
    var SaveCustUri = server + '/api/Web_Data/AFI_SaveCust/'; // آدرس ذخیره خریداران/فروشندگان
    var DelCustUri = server + '/api/Web_Data/AFI_DelCust/'; // آدرس حذف خریداران/فروشندگان
    var Cust_DeleteUri = server + '/api/Web_Data/TestCust_Delete/'; // آدرس تست حذف 


    TestUser();



    validation = CheckAccess('NEW_CUST');// New CUST
    sessionStorage.NEW_CUST = validation;
    validation == true ? $("#AddNewCust").show() : $("#AddNewCust").hide()

    validation = CheckAccess('CHG_CUST');// edit CUST
    sessionStorage.CHG_CUST = validation;

    validation = CheckAccess('DEL_CUST'); // delete CUST
    sessionStorage.DEL_CUST = validation;

    self.ShowAction = function (Code) {
        if (sessionStorage.DEL_CUST == 'true')
            return true;
        else
            return false;
    }



    var cGruCode = '';

    var isUpdate = false;


    var rprtId = 'Cust';


    var columns = [
        'Code',
        'Name',
        'Spec',
        'Eghdam',
        'CustF01',
        'CustF02',
        'CustF03',
        'CustF04',
        'CustF05',
        'CustF06',
        'CustF07',
        'CustF08',
        'CustF09',
        'CustF10',
        'CustF11',
        'CustF12',
        'CustF13',
        'CustF14',
        'CustF15',
        'CustF16',
        'CustF17',
        'CustF18',
        'CustF19',
        'CustF20'
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Cust", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Cust", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);



    getExtraFieldsList();


    function getCustList() {
        var CustObject = {
            forSale: null,
            updatedate: null,
            Mode: 255,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CustUri + ace + '/' + sal + '/' + group, 'POST', CustObject, false).done(function (data) {
            self.CustList(data);
        });
    }

    getCustList();

    //Get  CGru List
    function getCGruList() {
        var CGruObject = {
            Mode: 0,
            ModeGru: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(CGruUri + ace + '/' + sal + '/' + group, 'POST', CGruObject, true).done(function (data) {
            self.CGruList(data);
        });
    }

    $('#btnCGru').click(function () {
        if (self.CGruList().length == 0) {
            getCGruList();
        }
    });





    self.currentPageCust = ko.observable();

    pageSizeCust = localStorage.getItem('pageSizeCust') == null ? 10 : localStorage.getItem('pageSizeCust');
    self.pageSizeCust = ko.observable(pageSizeCust);
    self.currentPageIndexCust = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");








    self.filterCode = ko.observable("");
    self.filterName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterCustF01 = ko.observable("");
    self.filterCustF02 = ko.observable("");
    self.filterCustF03 = ko.observable("");
    self.filterCustF04 = ko.observable("");
    self.filterCustF05 = ko.observable("");
    self.filterCustF06 = ko.observable("");
    self.filterCustF07 = ko.observable("");
    self.filterCustF08 = ko.observable("");
    self.filterCustF09 = ko.observable("");
    self.filterCustF10 = ko.observable("");
    self.filterCustF11 = ko.observable("");
    self.filterCustF12 = ko.observable("");
    self.filterCustF13 = ko.observable("");
    self.filterCustF14 = ko.observable("");
    self.filterCustF15 = ko.observable("");
    self.filterCustF16 = ko.observable("");
    self.filterCustF17 = ko.observable("");
    self.filterCustF18 = ko.observable("");
    self.filterCustF19 = ko.observable("");
    self.filterCustF20 = ko.observable("");

    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterCode(listFilter[0]);
        self.filterName(listFilter[1]);
        self.filterSpec(listFilter[2]);
        self.filterEghdam(listFilter[3]);
        self.filterCustF01(listFilter[4]);
        self.filterCustF02(listFilter[5]);
        self.filterCustF03(listFilter[6]);
        self.filterCustF04(listFilter[7]);
        self.filterCustF05(listFilter[8]);
        self.filterCustF06(listFilter[9]);
        self.filterCustF07(listFilter[10]);
        self.filterCustF08(listFilter[11]);
        self.filterCustF09(listFilter[12]);
        self.filterCustF10(listFilter[13]);
        self.filterCustF11(listFilter[14]);
        self.filterCustF12(listFilter[15]);
        self.filterCustF13(listFilter[16]);
        self.filterCustF14(listFilter[17]);
        self.filterCustF15(listFilter[18]);
        self.filterCustF16(listFilter[19]);
        self.filterCustF17(listFilter[20]);
        self.filterCustF18(listFilter[21]);
        self.filterCustF19(listFilter[22]);
        self.filterCustF20(listFilter[23]);
    }
    self.filterCustList = ko.computed(function () {
        self.currentPageIndexCust(0);
        var filterCode = self.filterCode();
        var filterName = self.filterName();
        var filterSpec = self.filterSpec();
        var filterEghdam = self.filterEghdam();
        var filterCustF01 = self.filterCustF01();
        var filterCustF02 = self.filterCustF02();
        var filterCustF03 = self.filterCustF03();
        var filterCustF04 = self.filterCustF04();
        var filterCustF05 = self.filterCustF05();
        var filterCustF06 = self.filterCustF06();
        var filterCustF07 = self.filterCustF07();
        var filterCustF08 = self.filterCustF08();
        var filterCustF09 = self.filterCustF09();
        var filterCustF10 = self.filterCustF10();
        var filterCustF11 = self.filterCustF11();
        var filterCustF12 = self.filterCustF12();
        var filterCustF13 = self.filterCustF13();
        var filterCustF14 = self.filterCustF14();
        var filterCustF15 = self.filterCustF15();
        var filterCustF16 = self.filterCustF16();
        var filterCustF17 = self.filterCustF17();
        var filterCustF18 = self.filterCustF18();
        var filterCustF19 = self.filterCustF19();
        var filterCustF20 = self.filterCustF20();

        filterEghdam = filterEghdam.replace("/", ".");


        if (!filterCode && !filterName && !filterSpec && !filterEghdam && !filterCustF01 && !filterCustF02 && !filterCustF03 && !filterCustF04 && !filterCustF05 && !filterCustF06 && !filterCustF07 && !filterCustF08 && !filterCustF09 && !filterCustF10 &&
            !filterCustF11 && !filterCustF12 && !filterCustF13 && !filterCustF14 && !filterCustF15 && !filterCustF16 && !filterCustF17 && !filterCustF18 && !filterCustF19 && !filterCustF20) {
            $("#CountRecord").text(self.CustList().length);
            sessionStorage.setItem('listFilter', null);
            return self.CustList();
        } else {

            listFilter = [
                filterCode,
                filterName,
                filterSpec,
                filterEghdam,
                filterCustF01,
                filterCustF02,
                filterCustF03,
                filterCustF04,
                filterCustF05,
                filterCustF06,
                filterCustF07,
                filterCustF08,
                filterCustF09,
                filterCustF10,
                filterCustF11,
                filterCustF12,
                filterCustF13,
                filterCustF14,
                filterCustF15,
                filterCustF16,
                filterCustF17,
                filterCustF18,
                filterCustF19,
                filterCustF20
            ];
            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.CustList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filterCode) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filterName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Eghdam == null ? '' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.CustF01 == null ? '' : item.CustF01.toString().search(filterCustF01) >= 0) &&
                    (item.CustF02 == null ? '' : item.CustF02.toString().search(filterCustF02) >= 0) &&
                    (item.CustF03 == null ? '' : item.CustF03.toString().search(filterCustF03) >= 0) &&
                    (item.CustF04 == null ? '' : item.CustF04.toString().search(filterCustF04) >= 0) &&
                    (item.CustF05 == null ? '' : item.CustF05.toString().search(filterCustF05) >= 0) &&
                    (item.CustF06 == null ? '' : item.CustF06.toString().search(filterCustF06) >= 0) &&
                    (item.CustF07 == null ? '' : item.CustF07.toString().search(filterCustF07) >= 0) &&
                    (item.CustF08 == null ? '' : item.CustF08.toString().search(filterCustF08) >= 0) &&
                    (item.CustF09 == null ? '' : item.CustF09.toString().search(filterCustF09) >= 0) &&
                    (item.CustF10 == null ? '' : item.CustF10.toString().search(filterCustF10) >= 0) &&
                    (item.CustF11 == null ? '' : item.CustF11.toString().search(filterCustF11) >= 0) &&
                    (item.CustF12 == null ? '' : item.CustF12.toString().search(filterCustF12) >= 0) &&
                    (item.CustF13 == null ? '' : item.CustF13.toString().search(filterCustF13) >= 0) &&
                    (item.CustF14 == null ? '' : item.CustF14.toString().search(filterCustF14) >= 0) &&
                    (item.CustF15 == null ? '' : item.CustF15.toString().search(filterCustF15) >= 0) &&
                    (item.CustF16 == null ? '' : item.CustF16.toString().search(filterCustF16) >= 0) &&
                    (item.CustF17 == null ? '' : item.CustF17.toString().search(filterCustF17) >= 0) &&
                    (item.CustF18 == null ? '' : item.CustF18.toString().search(filterCustF18) >= 0) &&
                    (item.CustF19 == null ? '' : item.CustF19.toString().search(filterCustF19) >= 0) &&
                    (item.CustF20 == null ? '' : item.CustF20.toString().search(filterCustF20) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }

    });



    self.search = ko.observable("");
    self.search(sessionStorage.searchCust);
    self.firstMatch = ko.dependentObservable(function () {
        var indexCust = 0;
        sessionStorage.searchCust = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexCust(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.CustList(), function (item) {
                indexCust += 1;
                return item.Code == search;
            });
            if (indexCust < self.pageSizeCust())
                self.currentPageIndexCust(0);
            else {
                var a = Math.round((indexCust / self.pageSizeCust()), 0);
                if (a < (indexCust / self.pageSizeCust())) a += 1;
                self.currentPageIndexCust(a - 1);
            }
            return value;
        }
    });

    self.currentPageCust = ko.computed(function () {
        var pageSizeCust = parseInt(self.pageSizeCust(), 10),
            startIndex = pageSizeCust * self.currentPageIndexCust(),
            endIndex = startIndex + pageSizeCust;
        localStorage.setItem('pageSizeCust', pageSizeCust);
        return self.filterCustList().slice(startIndex, endIndex);
    });

    self.nextPageCust = function () {
        if (((self.currentPageIndexCust() + 1) * self.pageSizeCust()) < self.filterCustList().length) {
            self.currentPageIndexCust(self.currentPageIndexCust() + 1);
        }
    };

    self.previousPageCust = function () {
        if (self.currentPageIndexCust() > 0) {
            self.currentPageIndexCust(self.currentPageIndexCust() - 1);
        }
    };

    self.firstPageCust = function () {
        self.currentPageIndexCust(0);
    };

    self.lastPageCust = function () {
        tempCountCust = parseInt(self.filterCustList().length / self.pageSizeCust(), 10);
        if ((self.filterCustList().length % self.pageSizeCust()) == 0)
            self.currentPageIndexCust(tempCountCust - 1);
        else
            self.currentPageIndexCust(tempCountCust);
    };


    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeCustF01 = ko.observable("");
    self.iconTypeCustF02 = ko.observable("");
    self.iconTypeCustF03 = ko.observable("");
    self.iconTypeCustF04 = ko.observable("");
    self.iconTypeCustF05 = ko.observable("");
    self.iconTypeCustF06 = ko.observable("");
    self.iconTypeCustF07 = ko.observable("");
    self.iconTypeCustF08 = ko.observable("");
    self.iconTypeCustF09 = ko.observable("");
    self.iconTypeCustF10 = ko.observable("");
    self.iconTypeCustF11 = ko.observable("");
    self.iconTypeCustF12 = ko.observable("");
    self.iconTypeCustF13 = ko.observable("");
    self.iconTypeCustF14 = ko.observable("");
    self.iconTypeCustF15 = ko.observable("");
    self.iconTypeCustF16 = ko.observable("");
    self.iconTypeCustF17 = ko.observable("");
    self.iconTypeCustF18 = ko.observable("");
    self.iconTypeCustF19 = ko.observable("");
    self.iconTypeCustF20 = ko.observable("");


    self.sortTableCust = function (viewModel, e) {


        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortBase_Cust" + rprtId);
            self.sortType = localStorage.getItem("sortBaseType_Cust" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortBase_Cust" + rprtId, orderProp);
        localStorage.setItem("sortBaseType_Cust" + rprtId, self.sortType);

        self.search("");
        self.currentColumn(orderProp);
        self.CustList.sort(function (left, right) {

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
        self.iconTypeCustF01('');
        self.iconTypeCustF02('');
        self.iconTypeCustF03('');
        self.iconTypeCustF04('');
        self.iconTypeCustF05('');
        self.iconTypeCustF06('');
        self.iconTypeCustF07('');
        self.iconTypeCustF08('');
        self.iconTypeCustF09('');
        self.iconTypeCustF10('');
        self.iconTypeCustF11('');
        self.iconTypeCustF12('');
        self.iconTypeCustF13('');
        self.iconTypeCustF14('');
        self.iconTypeCustF15('');
        self.iconTypeCustF16('');
        self.iconTypeCustF17('');
        self.iconTypeCustF18('');
        self.iconTypeCustF19('');
        self.iconTypeCustF20('');

        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF01') self.iconTypeCustF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF02') self.iconTypeCustF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF03') self.iconTypeCustF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF04') self.iconTypeCustF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF05') self.iconTypeCustF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF06') self.iconTypeCustF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF07') self.iconTypeCustF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF08') self.iconTypeCustF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF09') self.iconTypeCustF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF10') self.iconTypeCustF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF11') self.iconTypeCustF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF12') self.iconTypeCustF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF13') self.iconTypeCustF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF14') self.iconTypeCustF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF15') self.iconTypeCustF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF16') self.iconTypeCustF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF17') self.iconTypeCustF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF18') self.iconTypeCustF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF19') self.iconTypeCustF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustF20') self.iconTypeCustF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };




    $('#refreshCust').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست خریداران/فروشندگان  به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getCustList();
                self.sortTableCust();
            }
        })
    })









    self.currentPageCGru = ko.observable();
    pageSizeCGru = localStorage.getItem('pageSizeCGru') == null ? 10 : localStorage.getItem('pageSizeCGru');
    self.pageSizeCGru = ko.observable(pageSizeCGru);
    self.currentPageIndexCGru = ko.observable(0);

    self.filterCGru0 = ko.observable("");
    self.filterCGru1 = ko.observable("");
    self.filterCGru2 = ko.observable("");

    self.filterCGruList = ko.computed(function () {

        self.currentPageIndexCGru(0);
        var filter0 = self.filterCGru0().toUpperCase();
        var filter1 = self.filterCGru1();
        var filter2 = self.filterCGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.CGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.CGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCGru = ko.computed(function () {
        var pageSizeCGru = parseInt(self.pageSizeCGru(), 10),
            startIndex = pageSizeCGru * self.currentPageIndexCGru(),
            endIndex = startIndex + pageSizeCGru;
        localStorage.setItem('pageSizeCGru', pageSizeCGru);
        return self.filterCGruList().slice(startIndex, endIndex);
    });

    self.nextPageCGru = function () {
        if (((self.currentPageIndexCGru() + 1) * self.pageSizeCGru()) < self.filterCGruList().length) {
            self.currentPageIndexCGru(self.currentPageIndexCGru() + 1);
        }
    };

    self.previousPageCGru = function () {
        if (self.currentPageIndexCGru() > 0) {
            self.currentPageIndexCGru(self.currentPageIndexCGru() - 1);
        }
    };

    self.firstPageCGru = function () {
        self.currentPageIndexCGru(0);
    };

    self.lastPageCGru = function () {
        countCGru = parseInt(self.filterCGruList().length / self.pageSizeCGru(), 10);
        if ((self.filterCGruList().length % self.pageSizeCGru()) == 0)
            self.currentPageIndexCGru(countCGru - 1);
        else
            self.currentPageIndexCGru(countCGru);
    };

    self.sortTableCGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.CGruList.sort(function (left, right) {
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



    $('#refreshCGru').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست گروه خریداران/فروشندگان به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getCGruList();
            }
        })
    })


    self.selectCGru = function (item) {
        cGruCode = item.Code;
        $('#nameCGru').val('(' + item.Code + ') ' + item.Name);
    }






    self.AddNewCust = function () {
        isUpdate = false;
        sessionStorage.NEW_CUST == 'true' ? $("#saveCust").show() : $("#saveCust").hide();
        cGruCode = '';
        $('#Code').attr('readonly', false);
        $('#Code').val('');
        $('#Name').val('');
        $('#Spec').val('');
        $('#MelliCode').val('');
        $('#EcoCode').val('');
        $('#Ostan').val('');
        $('#Shahrestan').val('');
        $('#Region').val('');
        $('#City').val('');
        $('#Street').val('');
        $('#Alley').val('');
        $('#Plack').val('');
        $('#ZipCode').val('');
        $('#Tel').val('');
        $('#Mobile').val('');
        $('#Fax').val('');
        $('#EtebarNaghd').val('');
        $('#EtebarCheck').val('');
        $('#Email').val('');
        $('#nameCGru').val('');

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
        $('#modal-Cust').modal('show');
    }

    self.UpdateCust = function (item) {
       // sessionStorage.CHG_CUST == 'true' ? $("#saveCust").show() : $("#saveCust").hide();
        isUpdate = true;

        item.EditBaseTrs == true && sessionStorage.CHG_CUST == 'true' ? $("#saveCust").show() : $("#saveCust").hide();
        $('#Code').val(item.Code);
        $('#Code').attr('readonly', true);
        $('#Name').val(item.Name);
        $('#Spec').val(item.Spec);
        $('#MelliCode').val(item.MelliCode);
        $('#EcoCode').val(item.EcoCode);
        $('#Ostan').val(item.Ostan);
        $('#Shahrestan').val(item.Shahrestan);
        $('#Region').val(item.Region);
        $('#City').val(item.City);
        $('#Street').val(item.Street);
        $('#Alley').val(item.Alley);
        $('#Plack').val(item.Plack);
        $('#ZipCode').val(item.ZipCode);
        $('#Tel').val(item.Tel);
        $('#Mobile').val(item.Mobile);
        $('#Fax').val(item.Fax);
        $('#EtebarNaghd').val(item.EtebarNaghd);
        $('#EtebarCheck').val(item.EtebarCheck);
        $('#Email').val(item.Email);
        $('#nameCGru').val('');
        cGruCode = item.CGruCode;
        if (cGruCode != '')
            $('#nameCGru').val('(' + item.CGruCode + ') ' + item.CGruName);


        sessionStorage.F01 = item.CustF01;
        sessionStorage.F02 = item.CustF02;
        sessionStorage.F03 = item.CustF03;
        sessionStorage.F04 = item.CustF04;
        sessionStorage.F05 = item.CustF05;
        sessionStorage.F06 = item.CustF06;
        sessionStorage.F07 = item.CustF07;
        sessionStorage.F08 = item.CustF08;
        sessionStorage.F09 = item.CustF09;
        sessionStorage.F10 = item.CustF10;
        sessionStorage.F11 = item.CustF11;
        sessionStorage.F12 = item.CustF12;
        sessionStorage.F13 = item.CustF13;
        sessionStorage.F14 = item.CustF14;
        sessionStorage.F15 = item.CustF15;
        sessionStorage.F16 = item.CustF16;
        sessionStorage.F17 = item.CustF17;
        sessionStorage.F18 = item.CustF18;
        sessionStorage.F19 = item.CustF19;
        sessionStorage.F20 = item.CustF20;

        $("#ExtraFields1").val(sessionStorage.CustF01);
        $("#ExtraFields2").val(sessionStorage.CustF02);
        $("#ExtraFields3").val(sessionStorage.CustF03);
        $("#ExtraFields4").val(sessionStorage.CustF04);
        $("#ExtraFields5").val(sessionStorage.CustF05);
        $("#ExtraFields6").val(sessionStorage.CustF06);
        $("#ExtraFields7").val(sessionStorage.CustF07);
        $("#ExtraFields8").val(sessionStorage.CustF08);
        $("#ExtraFields9").val(sessionStorage.CustF09);
        $("#ExtraFields10").val(sessionStorage.CustF10);
        $("#ExtraFields11").val(sessionStorage.CustF11);
        $("#ExtraFields12").val(sessionStorage.CustF12);
        $("#ExtraFields13").val(sessionStorage.CustF13);
        $("#ExtraFields14").val(sessionStorage.CustF14);
        $("#ExtraFields15").val(sessionStorage.CustF15);
        $("#ExtraFields16").val(sessionStorage.CustF16);
        $("#ExtraFields17").val(sessionStorage.CustF17);
        $("#ExtraFields18").val(sessionStorage.CustF18);
        $("#ExtraFields19").val(sessionStorage.CustF19);
        $("#ExtraFields20").val(sessionStorage.CustF20);

        $("#ExtraFields1").val(item.CustF01);
        $("#ExtraFields2").val(item.CustF02);
        $("#ExtraFields3").val(item.CustF03);
        $("#ExtraFields4").val(item.CustF04);
        $("#ExtraFields5").val(item.CustF05);
        $("#ExtraFields6").val(item.CustF06);
        $("#ExtraFields7").val(item.CustF07);
        $("#ExtraFields8").val(item.CustF08);
        $("#ExtraFields9").val(item.CustF09);
        $("#ExtraFields10").val(item.CustF10);
        $("#ExtraFields11").val(item.CustF11);
        $("#ExtraFields12").val(item.CustF12);
        $("#ExtraFields13").val(item.CustF13);
        $("#ExtraFields14").val(item.CustF14);
        $("#ExtraFields15").val(item.CustF15);
        $("#ExtraFields16").val(item.CustF16);
        $("#ExtraFields17").val(item.CustF17);
        $("#ExtraFields18").val(item.CustF18);
        $("#ExtraFields19").val(item.CustF19);
        $("#ExtraFields20").val(item.CustF20);
        $("#Code").focus();
        $('#modal-Cust').modal('show');
    }


    $('#saveCust').click(function () {
        code = $('#Code').val();
        name = $('#Name').val();
        fanniNo = $('#FanniNo').val();
        spec = $('#Spec').val();

        if (code == "") {
            return showNotification('کد خریدار/فروشنده را وارد کنید', 0)
        }
        if (name == "") {
            return showNotification('نام خریدار/فروشنده را وارد کنید', 0)
        }

        if (isUpdate == false) {
            listCode = ko.utils.arrayFilter(self.CustList(), function (item) {
                return item.Code == code;
            });

            if (listCode.length == 1)  {
                return showNotification('کد تکراری', 0)
            }
        }

        var SaveCust_Object = {
            BranchCode: 0,
            UserCode: sessionStorage.userName,
            Code: $('#Code').val(),
            Name: $('#Name').val(),
            Spec: $('#Spec').val(),

            MelliCode: $('#MelliCode').val(),
            EcoCode: $('#EcoCode').val(),
            Ostan: $('#Ostan').val(),
            Shahrestan: $('#Shahrestan').val(),
            Region: $('#Region').val(),
            City: $('#City').val(),
            Street: $('#Street').val(),
            Alley: $('#Alley').val(),
            Plack: $('#Plack').val(),
            ZipCode: $('#ZipCode').val(),
            Tel: $('#Tel').val(),
            Mobile: $('#Mobile').val(),
            Fax: $('#Fax').val(),
            EtebarNaghd: $('#EtebarNaghd').val(),
            EtebarCheck: $('#EtebarCheck').val(),
            CGruCode: cGruCode,
            Email: $('#Email').val(),
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

        ajaxFunction(SaveCustUri + ace + '/' + sal + '/' + group, 'POST', SaveCust_Object).done(function (data) {
            getCustList();
            $('#modal-Cust').modal('hide');
            showNotification('ذخيره شد ', 1);
        });

    });


    self.DeleteCust = function (item) {

        Swal.fire({
            title: 'تایید حذف ؟',
            text: "آیا خریداران/فروشندگان انتخابی حذف شود",
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
                var TestCust_DeleteObject = {
                    Code: code
                };

                ajaxFunction(Cust_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestCust_DeleteObject).done(function (data) {
                    var obj = JSON.parse(data);
                    self.TestCust_DeleteList(obj);
                    if (data.length > 2) {
                        $('#modal-TestDelete').modal('show');
                        SetDataTestCust();
                    }
                    else {
                        DeleteCust(code);
                    }
                });
            }
        })
    };

    function SetDataTestCust() {
        $("#BodyTestCust_Delete").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestCust_DeleteList();
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

        $('#BodyTestCust_Delete').append(textBody);

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

    function DeleteCust(code) {
        ajaxFunction(DelCustUri + ace + '/' + sal + '/' + group + '/' + code + '/', 'GET').done(function (response) {
            currentPage = self.currentPageIndexCust();
            getCustList();
            self.currentPageIndexCust(currentPage);
            showNotification('حذف شد ', 1);
        });
    }





    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableCust">' +
            CreateTableTh('Code', data) +
            CreateTableTh('Name', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Eghdam', data) +
           CreateTableTh('CustF01', data) +
            CreateTableTh('CustF02', data) +
            CreateTableTh('CustF03', data) +
            CreateTableTh('CustF04', data) +
            CreateTableTh('CustF05', data) +
            CreateTableTh('CustF06', data) +
            CreateTableTh('CustF07', data) +
            CreateTableTh('CustF08', data) +
            CreateTableTh('CustF09', data) +
            CreateTableTh('CustF10', data) +
            CreateTableTh('CustF11', data) +
            CreateTableTh('CustF12', data) +
            CreateTableTh('CustF13', data) +
            CreateTableTh('CustF14', data) +
            CreateTableTh('CustF15', data) +
            CreateTableTh('CustF16', data) +
            CreateTableTh('CustF17', data) +
            CreateTableTh('CustF18', data) +
            CreateTableTh('CustF19', data) +
            CreateTableTh('CustF20', data) +
            '<th>عملیات</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageCust" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() } "  >' +

            CreateTableTd('Code', 0, 0, data) +
            CreateTableTd('Name', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Eghdam', 0, 4, data) +
            CreateTableTd('CustF01', 0, 4, data) +
            CreateTableTd('CustF02', 0, 4, data) +
            CreateTableTd('CustF03', 0, 4, data) +
            CreateTableTd('CustF04', 0, 4, data) +
            CreateTableTd('CustF05', 0, 4, data) +
            CreateTableTd('CustF06', 0, 4, data) +
            CreateTableTd('CustF07', 0, 4, data) +
            CreateTableTd('CustF08', 0, 4, data) +
            CreateTableTd('CustF09', 0, 4, data) +
            CreateTableTd('CustF10', 0, 4, data) +
            CreateTableTd('CustF11', 0, 4, data) +
            CreateTableTd('CustF12', 0, 4, data) +
            CreateTableTd('CustF13', 0, 4, data) +
            CreateTableTd('CustF14', 0, 4, data) +
            CreateTableTd('CustF15', 0, 4, data) +
            CreateTableTd('CustF16', 0, 4, data) +
            CreateTableTd('CustF17', 0, 4, data) +
            CreateTableTd('CustF18', 0, 4, data) +
            CreateTableTd('CustF19', 0, 4, data) +
            CreateTableTd('CustF20', 0, 4, data) +
            '<td>' +
            '   <a id="UpdateCust" data-bind="click: $root.UpdateCust">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteCust" data-bind="click: $root.DeleteCust, visible: $root.ShowAction(Code)">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('Code', data) +
            CreateTableTdSearch('Name', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('CustF01', data) +
            CreateTableTdSearch('CustF02', data) +
            CreateTableTdSearch('CustF03', data) +
            CreateTableTdSearch('CustF04', data) +
            CreateTableTdSearch('CustF05', data) +
            CreateTableTdSearch('CustF06', data) +
            CreateTableTdSearch('CustF07', data) +
            CreateTableTdSearch('CustF08', data) +
            CreateTableTdSearch('CustF09', data) +
            CreateTableTdSearch('CustF10', data) +
            CreateTableTdSearch('CustF11', data) +
            CreateTableTdSearch('CustF12', data) +
            CreateTableTdSearch('CustF13', data) +
            CreateTableTdSearch('CustF14', data) +
            CreateTableTdSearch('CustF15', data) +
            CreateTableTdSearch('CustF16', data) +
            CreateTableTdSearch('CustF17', data) +
            CreateTableTdSearch('CustF18', data) +
            CreateTableTdSearch('CustF19', data) +
            CreateTableTdSearch('CustF20', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        $('#TableList').append(dataTable);
    }

    function CreateTableTh(field, data) {

        text = '<th ';
        TextField = FindTextField(field, data);

        //sortField = field == 'Code' ? 'SortCode' : field;// == 'Name' ? 'SortName' : field;
        sortField = field == 'Name' ? 'SortName' : field;// == 'Name' ? 'SortName' : field;
         

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




    self.sortTableCust();
};

ko.applyBindings(new ViewModel());

