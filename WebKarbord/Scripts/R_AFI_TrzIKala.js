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

    self.AzDate = ko.observable(sessionStorage.BeginDate);
    self.TaDate = ko.observable(ShamsiDate());
    self.InvCode = ko.observable();
    var allSearchKala = true;

    var KalaCode = '0';
    var counter = 0;

    var list_KalaSelect = new Array()

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

    //Get TrzI
    function getTrzI() {
        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        var TrzIObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            InvCode: self.InvCode() > 0 ? self.InvCode() : 0,
            KGruCode: '0',
            KalaCode: KalaCode
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

    getInvList();
    getKalaList();

    //------------------------------------------------------
    self.currentPageTrzI = ko.observable();
    self.pageSizeTrzI = ko.observable(10);
    self.currentPageIndexTrzI = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterTrzI0 = ko.observable("");
    self.filterTrzI1 = ko.observable("");
    self.filterTrzI2 = ko.observable("");
    self.filterTrzI3 = ko.observable("");
    self.filterTrzI4 = ko.observable("");
    self.filterTrzI5 = ko.observable("");
    self.filterTrzI6 = ko.observable("");
    self.filterTrzI7 = ko.observable("");
    self.filterTrzI8 = ko.observable("");
    self.filterTrzI9 = ko.observable("");
    self.filterTrzI10 = ko.observable("");
    self.filterTrzI11 = ko.observable("");
    self.filterTrzI12 = ko.observable("");
    self.filterTrzI13 = ko.observable("");
    self.filterTrzI14 = ko.observable("");
    self.filterTrzI15 = ko.observable("");
    self.filterTrzI16 = ko.observable("");
    self.filterTrzI17 = ko.observable("");
    self.filterTrzI18 = ko.observable("");
    self.filterTrzI19 = ko.observable("");

    self.filterTrzIList = ko.computed(function () {

        self.currentPageIndexTrzI(0);
        var filter0 = self.filterTrzI0().toUpperCase();
        var filter1 = self.filterTrzI1().toUpperCase();
        var filter2 = self.filterTrzI2().toUpperCase();
        var filter3 = self.filterTrzI3().toUpperCase();
        var filter4 = self.filterTrzI4().toUpperCase();
        var filter5 = self.filterTrzI5().toUpperCase();
        var filter6 = self.filterTrzI6().toUpperCase();
        var filter7 = self.filterTrzI7().toUpperCase();
        var filter8 = self.filterTrzI8().toUpperCase();
        var filter9 = self.filterTrzI9().toUpperCase();
        var filter10 = self.filterTrzI10().toUpperCase();
        var filter11 = self.filterTrzI11().toUpperCase();
        var filter12 = self.filterTrzI12().toUpperCase();
        var filter13 = self.filterTrzI13().toUpperCase();
        var filter14 = self.filterTrzI14().toUpperCase();
        var filter15 = self.filterTrzI15().toUpperCase();
        var filter16 = self.filterTrzI16().toUpperCase();
        var filter17 = self.filterTrzI17().toUpperCase();
        var filter18 = self.filterTrzI18().toUpperCase();
        var filter19 = self.filterTrzI19().toUpperCase();

        // if (!filter0) {
        //    calcsum(self.TrzIList());
        //    return self.TrzIList();
        //} else {

        tempData = ko.utils.arrayFilter(self.TrzIList(), function (item) {
            result =
                //(item.InvName == null ? '' : item.InvName.toString().search(filter3) >= 0) &&
                ko.utils.stringStartsWith(item.KalaCode.toString().toLowerCase(), filter0) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filter1) >= 0) &&
                (item.InvCode == null ? '' : item.InvCode.toString().search(filter2) >= 0) &&
                (item.InvName == null ? '' : item.InvName.toString().search(filter3) >= 0) &&

                ko.utils.stringStartsWith(item.AAmount1.toString().toLowerCase(), filter4) &&
                ko.utils.stringStartsWith(item.AAmount2.toString().toLowerCase(), filter5) &&
                ko.utils.stringStartsWith(item.AAmount3.toString().toLowerCase(), filter6) &&
                // ko.utils.startIndex(item.ATotalPrice.toString().toLowerCase(), filter7) &&
                (item.ATotalPrice == null ? '' : item.ATotalPrice.toString().search(filter7) >= 0) &&

                ko.utils.stringStartsWith(item.VAmount1.toString().toLowerCase(), filter8) &&
                ko.utils.stringStartsWith(item.VAmount2.toString().toLowerCase(), filter9) &&
                ko.utils.stringStartsWith(item.VAmount3.toString().toLowerCase(), filter10) &&
                ko.utils.stringStartsWith(item.VTotalPrice.toString().toLowerCase(), filter11) &&

                ko.utils.stringStartsWith(item.SAmount1.toString().toLowerCase(), filter12) &&
                ko.utils.stringStartsWith(item.SAmount2.toString().toLowerCase(), filter13) &&
                ko.utils.stringStartsWith(item.SAmount3.toString().toLowerCase(), filter14) &&
                //ko.utils.startIndex(item.STotalPrice.toString().toLowerCase(), filter15) &&

                ko.utils.stringStartsWith(item.MAmount1.toString().toLowerCase(), filter16) &&
                ko.utils.stringStartsWith(item.MAmount2.toString().toLowerCase(), filter17) &&
                ko.utils.stringStartsWith(item.MAmount3.toString().toLowerCase(), filter18) //&&
            // ko.utils.startIndex(item.MTotalPrice.toString().toLowerCase(), filter19)
            return result;
        })
        calcsum(tempData);
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


    self.currentPageKala = ko.observable();
    self.pageSizeKala = ko.observable(10);
    self.currentPageIndexKala = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeInvCode = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypeKalaCode = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
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

    self.filterKala0 = ko.observable("");
    self.filterKala1 = ko.observable("");
    self.filterKala2 = ko.observable("");
    self.filterKala3 = ko.observable("");

    self.filterKalaList = ko.computed(function () {

        self.currentPageIndexKala(0);
        var filter0 = self.filterKala0().toUpperCase();
        var filter1 = self.filterKala1().toUpperCase();
        var filter2 = self.filterKala2().toUpperCase();
        var filter3 = self.filterKala3().toUpperCase();

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
        self.iconType((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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


    self.selectKala = function (item) {
        kalaCode = item.Code;
        find = false;
        list_KalaSelect.forEach(function (item, key) {
            if (item == kalaCode) {
                find = true;
            }
        });

        if (find == false) {
            counter = counter + 1;
            list_KalaSelect[counter] = item.Code;

            $('#TableSelectedKala').append(
                '<tr data-bind=" event: { dblclick: delselectkala }">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: FanniNo">' + item.FanniNo + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
        }
        //$('#nameKala').val('(' + item.Code + ') ' + item.Name);
        //$('.fix').attr('class', 'form-line date focused fix');
    };

    $('#modal-kala').on('hide.bs.modal', function () {
        if (counter > 0)
            $('#nameKala').val(counter + ' مورد انتخاب شده ')
    });


    self.delselectkala = function () {
        $(this).closest("tr").remove();
        //$('#nameKala').val('(' + item.Code + ') ' + item.Name);
        //$('.fix').attr('class', 'form-line date focused fix');
    };

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


    $('.fix').attr('class', 'form-line date focused fix');

};

ko.applyBindings(new ViewModel());

