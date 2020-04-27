var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");

    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.KalaList = ko.observableArray([]); // ليست کالا ها
    self.TrzIExfList = ko.observableArray([]); // لیست گزارش  

    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالا ها
    var TrzIExfUri = server + '/api/Web_Data/TrzIExf/'; // آدرس گزارش 
    var TrzIExfCountUri = server + '/api/Web_Data/TrzIExfCount/'; // تعداد رکورد های گزارش 

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(ShamsiDate());
    self.InvCode = ko.observable();
    var allSearchKala = true;

    var KalaCode = '';
    var counterKala = 0;
    var list_KalaSelect = new Array()

    var InvCode = '';
    var counterInv = 0;
    var list_InvSelect = new Array()

    $("#textTotal").text('');

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

    //Get TrzIExf
    function getTrzIExf() {
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


        var TrzIExfObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            InvCode: invcode,
            KGruCode: '0',
            KalaCode: kalacode
        };
        ajaxFunction(TrzIExfUri + ace + '/' + sal + '/' + group, 'POST', TrzIExfObject).done(function (response) {
            self.TrzIExfList(response);
            calcsum(self.TrzIExfList());
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

            TrzIExfData = list[i];
            if (TrzIExfData.Tag == 2) {
                totalAAmount1 += TrzIExfData.AAmount1;
                totalAAmount2 += TrzIExfData.AAmount2;
                totalAAmount3 += TrzIExfData.AAmount3;

                totalVAmount1 += TrzIExfData.VAmount1;
                totalVAmount2 += TrzIExfData.VAmount2;
                totalVAmount3 += TrzIExfData.VAmount3;

                totalSAmount1 += TrzIExfData.SAmount1;
                totalSAmount2 += TrzIExfData.SAmount2;
                totalSAmount3 += TrzIExfData.SAmount3;

                totalMAmount1 += TrzIExfData.MAmount1;
                totalMAmount2 += TrzIExfData.MAmount2;
                totalMAmount3 += TrzIExfData.MAmount3;

                totalATotalPrice += TrzIExfData.ATotalPrice;
                totalVTotalPrice += TrzIExfData.VTotalPrice;
                totalSTotalPrice += TrzIExfData.STotalPrice;
                totalMTotalPrice += TrzIExfData.MTotalPrice;

                KalaDeghat1 = TrzIExfData.KalaDeghat1 % 10;
                KalaDeghat2 = TrzIExfData.KalaDeghat2 % 10;
                KalaDeghat3 = TrzIExfData.KalaDeghat3 % 10;

                KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
                KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
                KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
            }
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
        getTrzIExf();
    });

    getInvList();
    getKalaList();

    $('#nameKala').val('همه موارد');
    $('#nameInv').val('همه موارد');

    //------------------------------------------------------
    self.currentPageTrzIExf = ko.observable();
    self.pageSizeTrzIExf = ko.observable(10);
    self.currentPageIndexTrzIExf = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterTrzIExf0 = ko.observable("");
    self.filterTrzIExf1 = ko.observable("");
    self.filterTrzIExf2 = ko.observable("");
    self.filterTrzIExf3 = ko.observable("");
    self.filterTrzIExf4 = ko.observable("");
    self.filterTrzIExf5 = ko.observable("");
    self.filterTrzIExf6 = ko.observable("");
    self.filterTrzIExf7 = ko.observable("");
    self.filterTrzIExf8 = ko.observable("");
    self.filterTrzIExf9 = ko.observable("");
    self.filterTrzIExf10 = ko.observable("");
    self.filterTrzIExf11 = ko.observable("");
    self.filterTrzIExf12 = ko.observable("");
    self.filterTrzIExf13 = ko.observable("");
    self.filterTrzIExf14 = ko.observable("");
    self.filterTrzIExf15 = ko.observable("");
    self.filterTrzIExf16 = ko.observable("");
    self.filterTrzIExf17 = ko.observable("");
    self.filterTrzIExf18 = ko.observable("");
    self.filterTrzIExf19 = ko.observable("");
    self.filterTrzIExf20 = ko.observable("");
    self.filterTrzIExf21 = ko.observable("");
    self.filterTrzIExf22 = ko.observable("");
    self.filterTrzIExf23 = ko.observable("");
    self.filterTrzIExf24 = ko.observable("");
    self.filterTrzIExf25 = ko.observable("");

    self.filterTrzIExfList = ko.computed(function () {

        self.currentPageIndexTrzIExf(0);
        var filter0 = self.filterTrzIExf0().toUpperCase();
        var filter1 = self.filterTrzIExf1();
        var filter2 = self.filterTrzIExf2().toUpperCase();
        var filter3 = self.filterTrzIExf3();
        var filter4 = self.filterTrzIExf4();
        var filter5 = self.filterTrzIExf5();
        var filter6 = self.filterTrzIExf6();
        var filter7 = self.filterTrzIExf7();
        var filter8 = self.filterTrzIExf8();
        var filter9 = self.filterTrzIExf9().toUpperCase();
        var filter10 = self.filterTrzIExf10().toUpperCase();
        var filter11 = self.filterTrzIExf11().toUpperCase();
        var filter12 = self.filterTrzIExf12().toUpperCase();
        var filter13 = self.filterTrzIExf13().toUpperCase();
        var filter14 = self.filterTrzIExf14().toUpperCase();
        var filter15 = self.filterTrzIExf15().toUpperCase();
        var filter16 = self.filterTrzIExf16().toUpperCase();
        var filter17 = self.filterTrzIExf17().toUpperCase();
        var filter18 = self.filterTrzIExf18().toUpperCase();
        var filter19 = self.filterTrzIExf19().toUpperCase();
        var filter20 = self.filterTrzIExf20().toUpperCase();
        var filter21 = self.filterTrzIExf21().toUpperCase();
        var filter22 = self.filterTrzIExf22().toUpperCase();
        var filter23 = self.filterTrzIExf23().toUpperCase();
        var filter24 = self.filterTrzIExf24().toUpperCase();
        var filter25 = self.filterTrzIExf25().toUpperCase();


        tempData = ko.utils.arrayFilter(self.TrzIExfList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.KalaCode.toString().toLowerCase(), filter0) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filter1) >= 0) &&
                (item.InvCode == null ? '' : item.InvCode.toString().search(filter2) >= 0) &&
                (item.InvName == null ? '' : item.InvName.toString().search(filter3) >= 0) &&

                (item.KalaFileNo == null ? '' : item.KalaFileNo.toString().search(filter4) >= 0) &&
                (item.KalaState == null ? '' : item.KalaState.toString().search(filter5) >= 0) &&
                (item.KalaExf1 == null ? '' : item.KalaExf1.toString().search(filter6) >= 0) &&
                (item.KalaExf2 == null ? '' : item.KalaExf2.toString().search(filter7) >= 0) &&
                (item.KalaExf3 == null ? '' : item.KalaExf3.toString().search(filter8) >= 0) &&

                ko.utils.stringStartsWith(item.AAmount1.toString().toLowerCase(), filter9) &&
                ko.utils.stringStartsWith(item.AAmount2.toString().toLowerCase(), filter10) &&
                ko.utils.stringStartsWith(item.AAmount3.toString().toLowerCase(), filter11) &&
                // ko.utils.startIndex(item.ATotalPrice.toString().toLowerCase(), filter12) &&
                (item.ATotalPrice == null ? '' : item.ATotalPrice.toString().search(filter13) >= 0) &&

                ko.utils.stringStartsWith(item.VAmount1.toString().toLowerCase(), filter14) &&
                ko.utils.stringStartsWith(item.VAmount2.toString().toLowerCase(), filter15) &&
                ko.utils.stringStartsWith(item.VAmount3.toString().toLowerCase(), filter16) &&
                ko.utils.stringStartsWith(item.VTotalPrice.toString().toLowerCase(), filter17) &&

                ko.utils.stringStartsWith(item.SAmount1.toString().toLowerCase(), filter18) &&
                ko.utils.stringStartsWith(item.SAmount2.toString().toLowerCase(), filter19) &&
                ko.utils.stringStartsWith(item.SAmount3.toString().toLowerCase(), filter20) &&
                //ko.utils.startIndex(item.STotalPrice.toString().toLowerCase(), filter21) &&

                ko.utils.stringStartsWith(item.MAmount1.toString().toLowerCase(), filter22) &&
                ko.utils.stringStartsWith(item.MAmount2.toString().toLowerCase(), filter23) &&
                ko.utils.stringStartsWith(item.MAmount3.toString().toLowerCase(), filter24) //&&
            // ko.utils.startIndex(item.MTotalPrice.toString().toLowerCase(), filter25)
            return result;
        })
        calcsum(tempData);
        return tempData;

        //}
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchTrzIExf);
    self.firstMatch = ko.dependentObservable(function () {
        var indexTrzIExf = 0;
        sessionStorage.searchTrzIExf = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexTrzIExf(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.TrzIExfList(), function (item) {
                indexTrzIExf += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexTrzIExf < self.pageSizeTrzIExf())
                self.currentPageIndexTrzIExf(0);
            else {
                var a = Math.round((indexTrzIExf / self.pageSizeTrzIExf()), 0);
                if (a < (indexTrzIExf / self.pageSizeTrzIExf())) a += 1;
                self.currentPageIndexTrzIExf(a - 1);
            }
            return value;
        }
    });


    self.currentPageTrzIExf = ko.computed(function () {
        var pageSizeTrzIExf = parseInt(self.pageSizeTrzIExf(), 10),
            startIndex = pageSizeTrzIExf * self.currentPageIndexTrzIExf(),
            endIndex = startIndex + pageSizeTrzIExf;
        return self.filterTrzIExfList().slice(startIndex, endIndex);
    });

    self.nextPageTrzIExf = function () {
        if (((self.currentPageIndexTrzIExf() + 1) * self.pageSizeTrzIExf()) < self.filterTrzIExfList().length) {
            self.currentPageIndexTrzIExf(self.currentPageIndexTrzIExf() + 1);
        }
    };

    self.previousPageTrzIExf = function () {
        if (self.currentPageIndexTrzIExf() > 0) {
            self.currentPageIndexTrzIExf(self.currentPageIndexTrzIExf() - 1);
        }
    };

    self.firstPageTrzIExf = function () {
        self.currentPageIndexTrzIExf(0);
    };

    self.lastPageTrzIExf = function () {
        tempCountTrzIExf = parseInt(self.filterTrzIExfList().length / self.pageSizeTrzIExf(), 10);
        if ((self.filterTrzIExfList().length % self.pageSizeTrzIExf()) == 0)
            self.currentPageIndexTrzIExf(tempCountTrzIExf - 1);
        else
            self.currentPageIndexTrzIExf(tempCountTrzIExf);
    };

    self.sortTableTrzIExf = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.TrzIExfList.sort(function (left, right) {
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

        self.iconTypeKalaFileNo('');
        self.iconTypeKalaState('');
        self.iconTypeKalaExf1('');
        self.iconTypeKalaExf2('');
        self.iconTypeKalaExf3('');

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

        if (orderProp == 'KalaFileNo') self.iconTypeKalaFileNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaState') self.iconTypeKalaState((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf1') self.iconTypeKalaExf1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf2') self.iconTypeKalaExf2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf3') self.iconTypeKalaExf3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");



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


    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeInvCode = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypeKalaCode = ko.observable("");
    self.iconTypeKalaName = ko.observable("");

    self.iconTypeKalaFileNo = ko.observable("");
    self.iconTypeKalaState = ko.observable("");
    self.iconTypeKalaExf1 = ko.observable("");
    self.iconTypeKalaExf2 = ko.observable("");
    self.iconTypeKalaExf3 = ko.observable("");

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


    /*  self.filterKala = ko.observable("");
      self.filterKalaList = ko.computed(function () {
          self.currentPageIndexKala(0);
          var filter = self.filterKala().toLowerCase();
          if (!filter) {
              return self.KalaList();
          } else {
              return ko.utils.arrayFilter(self.KalaList(), function (item) {
                  if ($("#allSearchKala").is(':checked')) {
                      result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Name.toLowerCase(), filter) || ko.utils.stringStartsWith(item.FanniNo.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Spec.toLowerCase(), filter)
                      return result;
                  }
                  else {
                      result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                      return result;
                  }
              });
          }

      });*/


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

};

ko.applyBindings(new ViewModel());

