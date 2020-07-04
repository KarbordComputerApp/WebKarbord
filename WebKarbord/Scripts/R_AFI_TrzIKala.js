var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");

    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.KalaList = ko.observableArray([]); // ليست کالا ها
    self.TrzIList = ko.observableArray([]); // لیست گزارش  

    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالا ها
    var TrzIUri = server + '/api/Web_Data/TrzI/'; // آدرس گزارش 
    var TrzICountUri = server + '/api/Web_Data/TrzICount/'; // تعداد رکورد های گزارش 
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(sessionStorage.EndDate);
    self.InvCode = ko.observable();
    var allSearchKala = true;

    var KalaCode = '';
    var counterKala = 0;
    var list_KalaSelect = new Array()

    var InvCode = '';
    var counterInv = 0;
    var list_InvSelect = new Array()

    $("#textTotal").text('');

    //Get RprtCols List
    function getRprtColsList() {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/TrzIKala/' + sessionStorage.userName, 'GET').done(function (data) {
            CreateTableReport(data);
        });
    }

    //Get kala List
    function getKalaList() {
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.KalaList(data);
        });
    }

    //Get Inv List 
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.InvList(data);
        });
    }

    self.OptionsCaptionAnbar = ko.computed(function () {
        return 'همه انبار ها';
    });

    //Get TrzI
    function getTrzI() {
        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();


        var invcode = '';
        for (var i = 0; i <= counterInv - 1; i++) {
            if (i < counterInv - 1)
                invcode += list_InvSelect[i] + '*';
            else
                invcode += list_InvSelect[i];
        }

        var kalacode = '';
        for (var i = 0; i <= counterKala - 1; i++) {
            if (i < counterKala - 1)
                kalacode += list_KalaSelect[i] + '*';
            else
                kalacode += list_KalaSelect[i];
        }


        var TrzIObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            InvCode: invcode,
            KGruCode: '0',
            KalaCode: kalacode
        };
        ajaxFunction(TrzIUri + ace + '/' + sal + '/' + group, 'POST', TrzIObject).done(function (response) {
            self.TrzIList(response);
            calcsum(self.TrzIList());
        });
    }

    function calcsum(list) {
        totalAAmount1 = 0;
        totalAAmount2 = 0;
        totalAAmount3 = 0;

        totalVAmount1 = 0;
        totalVAmount2 = 0;
        totalVAmount3 = 0;

        totalSAmount1 = 0;
        totalSAmount2 = 0;
        totalSAmount3 = 0;

        totalMAmount1 = 0;
        totalMAmount2 = 0;
        totalMAmount3 = 0;

        totalATotalPrice = 0;
        totalVTotalPrice = 0;
        totalSTotalPrice = 0;
        totalMTotalPrice = 0;

        KalaDeghat1 = 0;
        KalaDeghat2 = 0;
        KalaDeghat3 = 0;

        maxKalaDeghat1 = 0;
        maxKalaDeghat2 = 0;
        maxKalaDeghat3 = 0;

        for (var i = 0; i < list.length; ++i) {
            TrzIData = list[i];
            totalAAmount1 += TrzIData.AAmount1;
            totalAAmount2 += TrzIData.AAmount2;
            totalAAmount3 += TrzIData.AAmount3;

            totalVAmount1 += TrzIData.VAmount1;
            totalVAmount2 += TrzIData.VAmount2;
            totalVAmount3 += TrzIData.VAmount3;

            totalSAmount1 += TrzIData.SAmount1;
            totalSAmount2 += TrzIData.SAmount2;
            totalSAmount3 += TrzIData.SAmount3;

            totalMAmount1 += TrzIData.MAmount1;
            totalMAmount2 += TrzIData.MAmount2;
            totalMAmount3 += TrzIData.MAmount3;

            totalATotalPrice += TrzIData.ATotalPrice;
            totalVTotalPrice += TrzIData.VTotalPrice;
            totalSTotalPrice += TrzIData.STotalPrice;
            totalMTotalPrice += TrzIData.MTotalPrice;

            KalaDeghat1 = TrzIData.KalaDeghat1 % 10;
            KalaDeghat2 = TrzIData.KalaDeghat2 % 10;
            KalaDeghat3 = TrzIData.KalaDeghat3 % 10;

            KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
            KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
            KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
        }

        $("#textTotal").text('جمع');
        $("#totalAAmount1").text(NumberToNumberString(totalAAmount1.toFixed(maxKalaDeghat1)));
        $("#totalAAmount2").text(NumberToNumberString(totalAAmount2.toFixed(maxKalaDeghat2)));
        $("#totalAAmount3").text(NumberToNumberString(totalAAmount3.toFixed(maxKalaDeghat3)));
        $("#totalATotalPrice").text(NumberToNumberString(totalATotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        $("#totalVAmount1").text(NumberToNumberString(totalVAmount1.toFixed(maxKalaDeghat1)));
        $("#totalVAmount2").text(NumberToNumberString(totalVAmount2.toFixed(maxKalaDeghat2)));
        $("#totalVAmount3").text(NumberToNumberString(totalVAmount3.toFixed(maxKalaDeghat3)));
        $("#totalVTotalPrice").text(NumberToNumberString(totalVTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        $("#totalSAmount1").text(NumberToNumberString(totalSAmount1.toFixed(maxKalaDeghat1)));
        $("#totalSAmount2").text(NumberToNumberString(totalSAmount2.toFixed(maxKalaDeghat2)));
        $("#totalSAmount3").text(NumberToNumberString(totalSAmount3.toFixed(maxKalaDeghat3)));
        $("#totalSTotalPrice").text(NumberToNumberString(totalSTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));

        $("#totalMAmount1").text(NumberToNumberString(totalMAmount1.toFixed(maxKalaDeghat1)));
        $("#totalMAmount2").text(NumberToNumberString(totalMAmount2.toFixed(maxKalaDeghat2)));
        $("#totalMAmount3").text(NumberToNumberString(totalMAmount3.toFixed(maxKalaDeghat3)));
        $("#totalMTotalPrice").text(NumberToNumberString(totalMTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));
    }

    $("#CreateReport").click(function () {
        getTrzI();
    });

    getRprtColsList();
    getInvList();
    getKalaList();

    $('#nameKala').val('همه موارد');
    $('#nameInv').val('همه موارد');

    //------------------------------------------------------
    self.currentPageTrzI = ko.observable();
    self.pageSizeTrzI = ko.observable(10);
    self.currentPageIndexTrzI = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");


    self.filterInvCode = ko.observable("");
    self.filterInvName = ko.observable("");
    self.filterKalaCode = ko.observable("");
    self.filterKalaName = ko.observable("");
    self.filterKalaFanniNo = ko.observable("");

    self.filterAAmount1 = ko.observable("");
    self.filterAAmount2 = ko.observable("");
    self.filterAAmount3 = ko.observable("");
    self.filterATotalPrice = ko.observable("");
    self.filterVAmount1 = ko.observable("");
    self.filterVAmount2 = ko.observable("");
    self.filterVAmount3 = ko.observable("");
    self.filterVTotalPrice = ko.observable("");
    self.filterSAmount1 = ko.observable("");
    self.filterSAmount2 = ko.observable("");
    self.filterSAmount3 = ko.observable("");
    self.filterSTotalPrice = ko.observable("");
    self.filterMAmount1 = ko.observable("");
    self.filterMAmount2 = ko.observable("");
    self.filterMAmount3 = ko.observable("");
    self.filterMTotalPrice = ko.observable("");


    self.filterTrzIList = ko.computed(function () {

        self.currentPageIndexTrzI(0);

        var filterInvCode = self.filterInvCode();
        var filterInvName = self.filterInvName();
        var filterKalaCode = self.filterKalaCode();
        var filterKalaName = self.filterKalaName();
        var filterKalaFanniNo = self.filterKalaFanniNo();

        var filterAAmount1 = self.filterAAmount1();
        var filterAAmount2 = self.filterAAmount2();
        var filterAAmount3 = self.filterAAmount3();
        var filterATotalPrice = self.filterATotalPrice();
        var filterVAmount1 = self.filterVAmount1();
        var filterVAmount2 = self.filterVAmount2();
        var filterVAmount3 = self.filterVAmount3();
        var filterVTotalPrice = self.filterVTotalPrice();
        var filterSAmount1 = self.filterSAmount1();
        var filterSAmount2 = self.filterSAmount2();
        var filterSAmount3 = self.filterSAmount3();
        var filterSTotalPrice = self.filterSTotalPrice();
        var filterMAmount1 = self.filterMAmount1();
        var filterMAmount2 = self.filterMAmount2();
        var filterMAmount3 = self.filterMAmount3();
        var filterMTotalPrice = self.filterMTotalPrice();

        tempData = ko.utils.arrayFilter(self.TrzIList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.KalaCode.toString().toLowerCase(), filterKalaCode) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filterKalaName) >= 0) &&
                ko.utils.stringStartsWith(item.InvCode.toString().toLowerCase(), filterInvCode) &&
                (item.InvName == null ? '' : item.InvName.toString().search(filterInvName) >= 0) &&
                (item.KalaFanniNo == null ? '' : item.KalaFanniNo.toString().search(filterKalaFanniNo) >= 0) &&

                ko.utils.stringStartsWith(item.AAmount1.toString().toLowerCase(), filterAAmount1) &&
                ko.utils.stringStartsWith(item.AAmount2.toString().toLowerCase(), filterAAmount2) &&
                ko.utils.stringStartsWith(item.AAmount3.toString().toLowerCase(), filterAAmount3) &&
                ko.utils.stringStartsWith(item.ATotalPrice.toString().toLowerCase(), filterATotalPrice) &&

                ko.utils.stringStartsWith(item.VAmount1.toString().toLowerCase(), filterVAmount1) &&
                ko.utils.stringStartsWith(item.VAmount2.toString().toLowerCase(), filterVAmount2) &&
                ko.utils.stringStartsWith(item.VAmount3.toString().toLowerCase(), filterVAmount3) &&
                ko.utils.stringStartsWith(item.VTotalPrice.toString().toLowerCase(), filterVTotalPrice) &&

                ko.utils.stringStartsWith(item.SAmount1.toString().toLowerCase(), filterSAmount1) &&
                ko.utils.stringStartsWith(item.SAmount2.toString().toLowerCase(), filterSAmount2) &&
                ko.utils.stringStartsWith(item.SAmount3.toString().toLowerCase(), filterSAmount3) &&
                ko.utils.stringStartsWith(item.STotalPrice.toString().toLowerCase(), filterSTotalPrice) &&

                ko.utils.stringStartsWith(item.MAmount1.toString().toLowerCase(), filterMAmount1) &&
                ko.utils.stringStartsWith(item.MAmount2.toString().toLowerCase(), filterMAmount2) &&
                ko.utils.stringStartsWith(item.MAmount3.toString().toLowerCase(), filterMAmount3) &&
                ko.utils.stringStartsWith(item.MTotalPrice.toString().toLowerCase(), filterMTotalPrice)

            return result;
        })
        calcsum(tempData);
        $("#CountRecord").text(tempData.length);
        return tempData;

        //}
    });


    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzI);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzI = 0;
        sessionStorage.searchTrzI = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzI(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzIList(), function (item) {
                indexTrzI += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzI < self.pageSizeTrzI())
                self.currentPageIndexTrzI(0);
            else {
                var a = Math.round((indexTrzI / self.pageSizeTrzI()), 0);
                if (a < (indexTrzI / self.pageSizeTrzI())) a += 1;
                self.currentPageIndexTrzI(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzI = ko.computed(function () {
        var pageSizeTrzI = parseInt(self.pageSizeTrzI(), 10),
            startIndex = pageSizeTrzI * self.currentPageIndexTrzI(),
            endIndex = startIndex + pageSizeTrzI;
        return self.filterTrzIList().slice(startIndex, endIndex);
    });

    self.nextPageTrzI = function () {
        if (((self.currentPageIndexTrzI() + 1) * self.pageSizeTrzI()) < self.filterTrzIList().length) {
            self.currentPageIndexTrzI(self.currentPageIndexTrzI() + 1);
        }
    };

    self.previousPageTrzI = function () {
        if (self.currentPageIndexTrzI() > 0) {
            self.currentPageIndexTrzI(self.currentPageIndexTrzI() - 1);
        }
    };

    self.firstPageTrzI = function () {
        self.currentPageIndexTrzI(0);
    };

    self.lastPageTrzI = function () {
        tempCountTrzI = parseInt(self.filterTrzIList().length / self.pageSizeTrzI(), 10);
        if ((self.filterTrzIList().length % self.pageSizeTrzI()) == 0)
            self.currentPageIndexTrzI(tempCountTrzI - 1);
        else
            self.currentPageIndexTrzI(tempCountTrzI);
    };

    self.iconTypeInvCode = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypeKalaCode = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
    self.iconTypeKalaFanniNo = ko.observable("");
    self.iconTypeAAmount1 = ko.observable("");
    self.iconTypeAAmount2 = ko.observable("");
    self.iconTypeAAmount3 = ko.observable("");
    self.iconTypeATotalPrice = ko.observable("");
    self.iconTypeVAmount1 = ko.observable("");
    self.iconTypeVAmount2 = ko.observable("");
    self.iconTypeVAmount3 = ko.observable("");
    self.iconTypeVTotalPrice = ko.observable("");
    self.iconTypeSAmount1 = ko.observable("");
    self.iconTypeSAmount2 = ko.observable("");
    self.iconTypeSAmount3 = ko.observable("");
    self.iconTypeSTotalPrice = ko.observable("");
    self.iconTypeMAmount1 = ko.observable("");
    self.iconTypeMAmount2 = ko.observable("");
    self.iconTypeMAmount3 = ko.observable("");
    self.iconTypeMTotalPrice = ko.observable("");


    self.sortTableTrzI = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.TrzIList.sort(function (left, right) {
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
        self.iconTypeInvCode('');
        self.iconTypeInvName('');
        self.iconTypeKalaCode('');
        self.iconTypeKalaName('');
        self.iconTypeKalaFanniNo('');
        self.iconTypeAAmount1('');
        self.iconTypeAAmount2('');
        self.iconTypeAAmount3('');
        self.iconTypeATotalPrice('');
        self.iconTypeVAmount1('');
        self.iconTypeVAmount2('');
        self.iconTypeVAmount3('');
        self.iconTypeVTotalPrice('');
        self.iconTypeSAmount1('');
        self.iconTypeSAmount2('');
        self.iconTypeSAmount3('');
        self.iconTypeSTotalPrice('');
        self.iconTypeMAmount1('');
        self.iconTypeMAmount2('');
        self.iconTypeMAmount3('');
        self.iconTypeMTotalPrice('');

        if (orderProp == 'InvCode') self.iconTypeInvCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'InvName') self.iconTypeInvName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaCode') self.iconTypeKalaCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaName') self.iconTypeKalaName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaFanniNo') self.iconTypeKalaFanniNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AAmount1') self.iconTypeAAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AAmount2') self.iconTypeAAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AAmount3') self.iconTypeAAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ATotalPrice') self.iconTypeATotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount1') self.iconTypeVAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount2') self.iconTypeVAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VAmount3') self.iconTypeVAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'VTotalPrice') self.iconTypeVTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount1') self.iconTypeSAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount2') self.iconTypeSAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SAmount3') self.iconTypeSAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'STotalPrice') self.iconTypeSTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount1') self.iconTypeMAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount2') self.iconTypeMAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MAmount3') self.iconTypeMAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MTotalPrice') self.iconTypeMTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };



    self.currentPageInv = ko.observable();
    self.pageSizeInv = ko.observable(10);
    self.currentPageIndexInv = ko.observable(0);

    self.filterInv0 = ko.observable("");
    self.filterInv1 = ko.observable("");
    self.filterInv2 = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.filterInvList = ko.computed(function () {

        self.currentPageIndexInv(0);
        var filter0 = self.filterInv0().toUpperCase();
        var filter1 = self.filterInv1();
        var filter2 = self.filterInv2();

        if (!filter0 && !filter1 && !filter2) {
            return self.InvList();
        } else {
            tempData = ko.utils.arrayFilter(self.InvList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageInv = ko.computed(function () {
        var pageSizeInv = parseInt(self.pageSizeInv(), 10),
            startIndex = pageSizeInv * self.currentPageIndexInv(),
            endIndex = startIndex + pageSizeInv;
        return self.filterInvList().slice(startIndex, endIndex);
    });

    self.nextPageInv = function () {
        if (((self.currentPageIndexInv() + 1) * self.pageSizeInv()) < self.filterInvList().length) {
            self.currentPageIndexInv(self.currentPageIndexInv() + 1);
        }
    };

    self.previousPageInv = function () {
        if (self.currentPageIndexInv() > 0) {
            self.currentPageIndexInv(self.currentPageIndexInv() - 1);
        }
    };

    self.firstPageInv = function () {
        self.currentPageIndexInv(0);
    };

    self.lastPageInv = function () {
        countInv = parseInt(self.filterInvList().length / self.pageSizeInv(), 10);
        if ((self.filterInvList().length % self.pageSizeInv()) == 0)
            self.currentPageIndexInv(countInv - 1);
        else
            self.currentPageIndexInv(countInv);
    };

    self.sortTableInv = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.InvList.sort(function (left, right) {
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


        self.iconType((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }

    $("#allSearchInv").click(function () {
        if ($("#allSearchInv").is(':checked')) {
            $('#allSearchInvText').text('جستجو بر اساس همه موارد');
            allSearchInv = true;
        }
        else {
            $('#allSearchInvText').text('جستجو بر اساس کد کالا');
            allSearchInv = false;
        }
    });

    $("#searchInv").on("keydown", function search(e) {
        if (allSearchInv == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
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
    });


    $('#refreshInv').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست انبار ها به روز رسانی شود ؟",
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
                getInvList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالا ها به روز رسانی شد' });
            }
        })
    })


    self.AddInv = function (item) {

        InvCode = item.Code;
        find = false;
        list_InvSelect.forEach(function (item, key) {
            if (item == InvCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListInv').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_InvSelect[counterInv] = item.Code;
            counterInv = counterInv + 1;
        }
    };


    self.AddAllInv = function () {
        list_InvSelect = new Array();
        list = self.InvList();
        $("#TableBodyListInv").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListInv').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_InvSelect[i] = list[i].Code;
            counterInv = i + 1;
        }
    };


    self.DelAllInv = function () {
        list_InvSelect = new Array();
        counterInv = 0;
        $("#TableBodyListInv").empty();
    };


    $('#modal-Inv').on('hide.bs.modal', function () {
        if (counterInv > 0)
            $('#nameInv').val(counterInv + ' مورد انتخاب شده ')
        else
            $('#nameInv').val('همه موارد');
    });

    $('#modal-Inv').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageKala = ko.observable();
    self.pageSizeKala = ko.observable(10);
    self.currentPageIndexKala = ko.observable(0);

    self.filterKala0 = ko.observable("");
    self.filterKala1 = ko.observable("");
    self.filterKala2 = ko.observable("");
    self.filterKala3 = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeFanniNo = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.filterKalaList = ko.computed(function () {

        self.currentPageIndexKala(0);
        var filter0 = self.filterKala0().toUpperCase();
        var filter1 = self.filterKala1();
        var filter2 = self.filterKala2();
        var filter3 = self.filterKala3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.KalaList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.FanniNo == null ? '' : item.FanniNo.toString().search(filter2) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter3) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKala = ko.computed(function () {
        var pageSizeKala = parseInt(self.pageSizeKala(), 10),
            startIndex = pageSizeKala * self.currentPageIndexKala(),
            endIndex = startIndex + pageSizeKala;
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
        countKala = parseInt(self.filterKalaList().length / self.pageSizeKala(), 10);
        if ((self.filterKalaList().length % self.pageSizeKala()) == 0)
            self.currentPageIndexKala(countKala - 1);
        else
            self.currentPageIndexKala(countKala);
    };

    self.sortTableKala = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.KalaList.sort(function (left, right) {
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
        self.iconTypeFanniNo('');
        self.iconTypeSpec('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FanniNo') self.iconTypeFanniNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }

    $("#allSearchKala").click(function () {
        if ($("#allSearchKala").is(':checked')) {
            $('#allSearchKalaText').text('جستجو بر اساس همه موارد');
            allSearchKala = true;
        }
        else {
            $('#allSearchKalaText').text('جستجو بر اساس کد کالا');
            allSearchKala = false;
        }
    });

    $("#searchKala").on("keydown", function search(e) {
        if (allSearchKala == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
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
    });


    $('#refreshkala').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست کالا ها به روز رسانی شود ؟",
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
                getKalaList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالا ها به روز رسانی شد' });
            }
        })
    })


    self.AddKala = function (item) {

        KalaCode = item.Code;
        find = false;
        list_KalaSelect.forEach(function (item, key) {
            if (item == KalaCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListKala').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: FanniNo">' + item.FanniNo + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_KalaSelect[counterKala] = item.Code;
            counterKala = counterKala + 1;
        }
    };


    self.AddAllKala = function () {
        list_KalaSelect = new Array();
        list = self.KalaList();
        $("#TableBodyListKala").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListKala').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: FanniNo">' + list[i].FanniNo + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_KalaSelect[i] = list[i].Code;
            counterKala = i + 1;
        }
    };


    self.DelAllKala = function () {
        list_KalaSelect = new Array();
        counterKala = 0;
        $("#TableBodyListKala").empty();
    };


    $('#modal-kala').on('hide.bs.modal', function () {
        if (counterKala > 0)
            $('#nameKala').val(counterKala + ' مورد انتخاب شده ')
        else
            $('#nameKala').val('همه موارد');
    });

    $('#modal-kala').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    $('.fix').attr('class', 'form-line date focused fix');



    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableTrzI">' +
            CreateTableTh('KalaCode', data) +
            CreateTableTh('KalaName', data) +
            CreateTableTh('InvCode', data) +
            CreateTableTh('InvName', data) +
            CreateTableTh('KalaFanniNo', data) +
            CreateTableTh('AAmount1', data) +
            CreateTableTh('AAmount2', data) +
            CreateTableTh('AAmount3', data) +
            CreateTableTh('ATotalPrice', data) +
            CreateTableTh('VAmount1', data) +
            CreateTableTh('VAmount2', data) +
            CreateTableTh('VAmount3', data) +
            CreateTableTh('VTotalPrice', data) +
            CreateTableTh('SAmount1', data) +
            CreateTableTh('SAmount2', data) +
            CreateTableTh('SAmount3', data) +
            CreateTableTh('STotalPrice', data) +
            CreateTableTh('MAmount1', data) +
            CreateTableTh('MAmount2', data) +
            CreateTableTh('MAmount3', data) +
            CreateTableTh('MTotalPrice', data) +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind=" {foreach: currentPageTrzI}" style="cursor: default;">' +
            '     <tr >' +
            CreateTableTd('KalaCode', 0, 0, data) +
            CreateTableTd('KalaName', 0, 0, data) +
            CreateTableTd('InvCode', 0, 0, data) +
            CreateTableTd('InvName', 0, 0, data) +
            CreateTableTd('KalaFanniNo', 0, 0, data) +
            CreateTableTd('AAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('AAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('AAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('ATotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('VAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('VAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('VAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('VTotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('SAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('SAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('SAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('STotalPrice', sessionStorage.Deghat, 2, data) +
            CreateTableTd('MAmount1', 'KalaDeghat1', 1, data) +
            CreateTableTd('MAmount2', 'KalaDeghat2', 1, data) +
            CreateTableTd('MAmount3', 'KalaDeghat3', 1, data) +
            CreateTableTd('MTotalPrice', sessionStorage.Deghat, 2, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            CreateTableTdSum('KalaCode', 0, data) +
            CreateTableTdSum('KalaName', 1, data) +
            CreateTableTdSum('InvCode', 1, data) +
            CreateTableTdSum('InvName', 1, data) +
            CreateTableTdSum('KalaFanniNo', 1, data) +
            CreateTableTdSum('AAmount1', 2, data) +
            CreateTableTdSum('AAmount2', 2, data) +
            CreateTableTdSum('AAmount3', 2, data) +
            CreateTableTdSum('ATotalPrice', 2, data) +
            CreateTableTdSum('VAmount1', 2, data) +
            CreateTableTdSum('VAmount2', 2, data) +
            CreateTableTdSum('VAmount3', 2, data) +
            CreateTableTdSum('VTotalPrice', 2, data) +
            CreateTableTdSum('SAmount1', 2, data) +
            CreateTableTdSum('SAmount2', 2, data) +
            CreateTableTdSum('SAmount3', 2, data) +
            CreateTableTdSum('STotalPrice', 2, data) +
            CreateTableTdSum('MAmount1', 2, data) +
            CreateTableTdSum('MAmount2', 2, data) +
            CreateTableTdSum('MAmount3', 2, data) +
            CreateTableTdSum('MTotalPrice', 2, data) +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('KalaCode', data) +
            CreateTableTdSearch('KalaName', data) +
            CreateTableTdSearch('InvCode', data) +
            CreateTableTdSearch('InvName', data) +
            CreateTableTdSearch('KalaFanniNo', data) +
            CreateTableTdSearch('AAmount1', data) +
            CreateTableTdSearch('AAmount2', data) +
            CreateTableTdSearch('AAmount3', data) +
            CreateTableTdSearch('ATotalPrice', data) +
            CreateTableTdSearch('VAmount1', data) +
            CreateTableTdSearch('VAmount2', data) +
            CreateTableTdSearch('VAmount3', data) +
            CreateTableTdSearch('VTotalPrice', data) +
            CreateTableTdSearch('SAmount1', data) +
            CreateTableTdSearch('SAmount2', data) +
            CreateTableTdSearch('SAmount3', data) +
            CreateTableTdSearch('STotalPrice', data) +
            CreateTableTdSearch('MAmount1', data) +
            CreateTableTdSearch('MAmount2', data) +
            CreateTableTdSearch('MAmount3', data) +
            CreateTableTdSearch('MTotalPrice', data) +
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

