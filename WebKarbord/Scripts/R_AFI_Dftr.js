var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.AccList = ko.observableArray([]); // ليست حساب ها
    self.MkzList = ko.observableArray([]); // ليست مرکز هزینه
    self.OprList = ko.observableArray([]); // ليست پروژه ها
    self.AModeList = ko.observableArray([]); // ليست نوع سند ها
    self.StatusList = ko.observableArray([]); // ليست نوع سند ها

    self.DftrList = ko.observableArray([]); // لیست گزارش 

    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند  
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت  
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 

    var DftrUri = server + '/api/ReportAcc/Dftr/'; // آدرس گزارش 

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


    var MkzCode = '';
    var counterMkz = 0;
    var list_MkzSelect = new Array();

    var OprCode = '';
    var counterOpr = 0;
    var list_OprSelect = new Array();

    var AModeCode = '';
    var counterAMode = 0;
    var list_AModeSelect = new Array();

    var StatusCode = '';
    var counterStatus = 0;
    var list_StatusSelect = new Array();

    //Get Acc List
    function getAccList() {
        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AccList(data);
        });
    }

    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.OprList(data);
        });
    }

    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.MkzList(data);
        });
    }

    //Get AMode List
    function getAModeList() {
        ajaxFunction(AModeUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AModeList(data);
        });
    }

    //Get Status List
    function getStatusList() {
        progName = getProgName('A');
        ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
            self.StatusList(data);
        });
    }


    //Get RprtCols List
    function getRprtColsList() {
        ajaxFunction(RprtColsUri + sessionStorage.ace + '/' + sessionStorage.sal + '/' + sessionStorage.group + '/Dftr/' + sessionStorage.userName, 'GET').done(function (data) {
            CreateTableReport(data);
        });
    }


    //Get getDftr
    function getDftr() {

        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

        azShomarh = $("#azshomarh").val();
        taShomarh = $("#tashomarh").val();

        dispBands = $("#DispBands").val();
        jamRooz = $("#JamRooz").val();


        var aModeCode = '';
        for (var i = 0; i <= counterAMode - 1; i++) {
            if (i < counterAMode - 1)
                aModeCode += list_AModeSelect[i] + '*';
            else
                aModeCode += list_AModeSelect[i];
        }


        var statusCode = '';
        for (var i = 0; i <= counterStatus - 1; i++) {
            if (i < counterStatus - 1)
                statusCode += list_StatusSelect[i] + '*';
            else
                statusCode += list_StatusSelect[i];
        }


        var mkzcode = '';
        for (var i = 0; i <= counterMkz - 1; i++) {
            if (i < counterMkz - 1)
                mkzcode += list_MkzSelect[i] + '*';
            else
                mkzcode += list_MkzSelect[i];
        }

        var oprcode = '';
        for (var i = 0; i <= counterOpr - 1; i++) {
            if (i < counterOpr - 1)
                oprcode += list_OprSelect[i] + '*';
            else
                oprcode += list_OprSelect[i];
        }


        var DftrObject = {
            azTarikh: tarikh1,
            taTarikh: tarikh2,
            azShomarh: azShomarh,
            taShomarh: taShomarh,
            AccCode: self.AccCode(),
            AModeCode: aModeCode,
            StatusCode :statusCode,
            MkzCode: mkzcode,
            OprCode: oprcode,
        };
        ajaxFunction(DftrUri + ace + '/' + sal + '/' + group, 'POST', DftrObject).done(function (response) {
            self.DftrList(response);
            //calcsum(self.DftrList());
            $("div.loader").hide();
        });
    }

    /*  function calcsum(list) {
           totalAmount1 = 0;
           totalAmount2 = 0;
           totalAmount3 = 0;
           totalDiscount = 0;
           totalAddMinPrice1 = 0;
           totalAddMinPrice2 = 0;
           totalAddMinPrice3 = 0;
           totalAddMinPrice4 = 0;
           totalAddMinPrice5 = 0;
           totalAddMinPrice6 = 0;
           totalAddMinPrice7 = 0;
           totalAddMinPrice8 = 0;
           totalAddMinPrice9 = 0;
           totalAddMinPrice10 = 0;
           totalUnitPrice = 0;
           totalTotalPrice = 0;
   
           KalaDeghat1 = 0;
           KalaDeghat2 = 0;
           KalaDeghat3 = 0;
   
           maxKalaDeghat1 = 0;
           maxKalaDeghat2 = 0;
           maxKalaDeghat3 = 0;
   
           for (var i = 0; i < list.length; ++i) {
               DftrData = list[i];
               totalAmount1 += DftrData.Amount1;
               totalAmount2 += DftrData.Amount2;
               totalAmount3 += DftrData.Amount3;
   
               totalDiscount += DftrData.Discount;
               totalAddMinPrice1 += DftrData.AddMinPrice1;
               totalAddMinPrice2 += DftrData.AddMinPrice2;
               totalAddMinPrice3 += DftrData.AddMinPrice3;
               totalAddMinPrice4 += DftrData.AddMinPrice4;
               totalAddMinPrice5 += DftrData.AddMinPrice5;
               totalAddMinPrice6 += DftrData.AddMinPrice6;
               totalAddMinPrice7 += DftrData.AddMinPrice7;
               totalAddMinPrice8 += DftrData.AddMinPrice8;
               totalAddMinPrice9 += DftrData.AddMinPrice9;
               totalAddMinPrice10 += DftrData.AddMinPrice10;
   
               // totalUnitPrice += DftrData.UnitPrice;
               totalTotalPrice += DftrData.TotalPrice;
   
               KalaDeghat1 = DftrData.DeghatM1 % 10;
               KalaDeghat2 = DftrData.DeghatM2 % 10;
               KalaDeghat3 = DftrData.DeghatM3 % 10;
   
               KalaDeghat1 > maxKalaDeghat1 ? maxKalaDeghat1 = KalaDeghat1 : maxKalaDeghat1 = maxKalaDeghat1;
               KalaDeghat2 > maxKalaDeghat2 ? maxKalaDeghat2 = KalaDeghat2 : maxKalaDeghat2 = maxKalaDeghat2;
               KalaDeghat3 > maxKalaDeghat3 ? maxKalaDeghat3 = KalaDeghat3 : maxKalaDeghat3 = maxKalaDeghat3;
           }
   
           $("#textTotal").text('جمع');
           $("#totalAmount1").text(NumberToNumberString(totalAmount1.toFixed(maxKalaDeghat1)));
           $("#totalAmount2").text(NumberToNumberString(totalAmount2.toFixed(maxKalaDeghat2)));
           $("#totalAmount3").text(NumberToNumberString(totalAmount3.toFixed(maxKalaDeghat3)));
           $("#totalDiscount").text(NumberToNumberString(totalDiscount.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice1").text(NumberToNumberString(totalAddMinPrice1.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice2").text(NumberToNumberString(totalAddMinPrice2.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice3").text(NumberToNumberString(totalAddMinPrice3.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice4").text(NumberToNumberString(totalAddMinPrice4.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice5").text(NumberToNumberString(totalAddMinPrice5.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice6").text(NumberToNumberString(totalAddMinPrice6.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice7").text(NumberToNumberString(totalAddMinPrice7.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice8").text(NumberToNumberString(totalAddMinPrice8.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice9").text(NumberToNumberString(totalAddMinPrice9.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalAddMinPrice10").text(NumberToNumberString(totalAddMinPrice10.toFixed(parseInt(sessionStorage.Deghat))));
           //$("#totalUnitPrice").text(NumberToNumberString(totalUnitPrice.toFixed(parseInt(sessionStorage.Deghat))));
           $("#totalTotalPrice").text(NumberToNumberString(totalTotalPrice.toFixed(parseInt(sessionStorage.Deghat))));
       }*/

    $("#CreateReport").click(function () {
        getDftr();
    });


    getRprtColsList(); 
    getAccList();
    getOprList();
    getMkzList();
    getAModeList();
    getStatusList();
    getDispBands();
    getJamRooz();


    $('#nameAcc').val('همه موارد');
    $('#nameOpr').val('همه موارد');
    $('#nameMkz').val('همه موارد');
    $('#nameAMode').val('همه موارد');


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


    self.selectAcc = function (item) {
        $('#nameAcc').val('(' + item.Code + ') ' + item.Name);
        self.AccCode(item.Code);
    }


    $('#modal-Acc').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageMkz = ko.observable();
    self.pageSizeMkz = ko.observable(10);
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
        self.currentColumn(orderProp);
        self.MkzList.sort(function (left, right) {
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



    $('#refreshMkz').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست مرکز هزینه به روز رسانی شود ؟",
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
                getMkzList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالا ها به روز رسانی شد' });
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[counterMkz] = item.Code;
            counterMkz = counterMkz + 1;
        }
    };


    self.AddAllMkz = function () {
        list_MkzSelect = new Array();
        list = self.MkzList();
        $("#TableBodyListMkz").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListMkz').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_MkzSelect[i] = list[i].Code;
            counterMkz = i + 1;
        }
    };


    self.DelAllMkz = function () {
        list_MkzSelect = new Array();
        counterMkz = 0;
        $("#TableBodyListMkz").empty();
    };


    $('#modal-Mkz').on('hide.bs.modal', function () {
        if (counterMkz > 0)
            $('#nameMkz').val(counterMkz + ' مورد انتخاب شده ')
        else
            $('#nameMkz').val('همه موارد');
    });

    $('#modal-Mkz').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageOpr = ko.observable();
    self.pageSizeOpr = ko.observable(10);
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
        self.currentColumn(orderProp);
        self.OprList.sort(function (left, right) {
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



    $('#refreshOpr').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست پروژه به روز رسانی شود ؟",
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
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[counterOpr] = item.Code;
            counterOpr = counterOpr + 1;
        }
    };


    self.AddAllOpr = function () {
        list_OprSelect = new Array();
        list = self.OprList();
        $("#TableBodyListOpr").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListOpr').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_OprSelect[i] = list[i].Code;
            counterOpr = i + 1;
        }
    };


    self.DelAllOpr = function () {
        list_OprSelect = new Array();
        counterOpr = 0;
        $("#TableBodyListOpr").empty();
    };


    $('#modal-Opr').on('hide.bs.modal', function () {
        if (counterOpr > 0)
            $('#nameOpr').val(counterOpr + ' مورد انتخاب شده ')
        else
            $('#nameOpr').val('همه موارد');
    });

    $('#modal-Opr').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });



    self.currentPageAMode = ko.observable();
    self.pageSizeAMode = ko.observable(10);
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
        self.currentColumn(orderProp);
        self.AModeList.sort(function (left, right) {
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



    $('#refreshAMode').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست نوع سند به روز رسانی شود ؟",
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
            counterAMode = counterAMode + 1;
        }
    };


    self.AddAllAMode = function () {
        list_AModeSelect = new Array();
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
            counterAMode = i + 1;
        }
    };


    self.DelAllAMode = function () {
        list_AModeSelect = new Array();
        counterAMode = 0;
        $("#TableBodyListAMode").empty();
    };


    $('#modal-AMode').on('hide.bs.modal', function () {
        if (counterAMode > 0)
            $('#nameAMode').val(counterAMode + ' مورد انتخاب شده ')
        else
            $('#nameAMode').val('همه موارد');
    });

    $('#modal-AMode').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });
















    self.currentPageStatus = ko.observable();
    self.pageSizeStatus = ko.observable(10);
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
        self.currentColumn(orderProp);
        self.StatusList.sort(function (left, right) {
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
            title: 'تایید به روز رسانی ؟',
            text: "لیست وضعیت به روز رسانی شود ؟",
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
                getStatusList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddStatus = function (item) {

        StatusCode = item.Code;
        find = false;
        list_StatusSelect.forEach(function (item, key) {
            if (item == StatusCode) {
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
            $('#nameStatus').val(counterStatus + ' مورد انتخاب شده ')
        else
            $('#nameStatus').val('همه موارد');
    });

    $('#modal-Status').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    function getDispBands() {
        select = document.getElementById('DispBands');
        for (var i = 0; i <= 1; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 0;
                opt.innerHTML = 'حساب های کل';
            }
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = 'ریز حساب ها';
                opt.selected = true;
            }
            select.appendChild(opt);
        }
    };

    function getJamRooz() {
        select = document.getElementById('JamRooz');
        for (var i = 0; i <= 1; i++) {
            opt = document.createElement('option');
            if (i == 0) {
                opt.value = 0;
                opt.innerHTML = 'با جمع روزانه';
            }
            if (i == 1) {
                opt.value = 1;
                opt.innerHTML = 'بدون جمع روزانه';
                opt.selected = true;
            }
            select.appendChild(opt);
        }
    };




    //------------------------------------------------------
    self.currentPageDftr = ko.observable();
    self.pageSizeDftr = ko.observable(10);
    self.currentPageIndexDftr = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterTaeed = ko.observable("");
    self.filterTasvib = ko.observable("");
    self.filterCustName = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprName = ko.observable("");
    self.filterKalaName = ko.observable("");
    self.filterKalaFileNo = ko.observable("");
    self.filterKalaState = ko.observable("");
    self.filterKalaExf1 = ko.observable("");
    self.filterKalaExf2 = ko.observable("");
    self.filterKalaExf3 = ko.observable("");
    self.filterMainUnitName = ko.observable("");
    self.filterAmount1 = ko.observable("");
    self.filterAmount2 = ko.observable("");
    self.filterAmount3 = ko.observable("");
    self.filterDiscount = ko.observable("");
    self.filterAddMinPrice1 = ko.observable("");
    self.filterAddMinPrice2 = ko.observable("");
    self.filterAddMinPrice3 = ko.observable("");
    self.filterAddMinPrice4 = ko.observable("");
    self.filterAddMinPrice5 = ko.observable("");
    self.filterAddMinPrice6 = ko.observable("");
    self.filterAddMinPrice7 = ko.observable("");
    self.filterAddMinPrice8 = ko.observable("");
    self.filterAddMinPrice9 = ko.observable("");
    self.filterAddMinPrice10 = ko.observable("");
    self.filterUnitPrice = ko.observable("");
    self.filterTotalPrice = ko.observable("");
    self.filterBandSpec = ko.observable("");
    self.filterComm = ko.observable("");
    self.filterSerialNumber = ko.observable("");
    self.filterBandNo = ko.observable("");


    self.filterDftrList = ko.computed(function () {
        self.currentPageIndexDftr(0);
        var filterDocNo = self.filterDocNo();
        var filterDocDate = self.filterDocDate();
        var filterModeName = self.filterModeName();
        var filterStatus = self.filterStatus();
        var filterTaeed = self.filterTaeed().toUpperCase();
        var filterTasvib = self.filterTasvib().toUpperCase();
        var filterCustName = self.filterCustName();
        var filterMkzName = self.filterMkzName();
        var filterOprName = self.filterOprName();
        var filterKalaName = self.filterKalaName();
        var filterKalaFileNo = self.filterKalaFileNo();
        var filterKalaState = self.filterKalaState();
        var filterKalaExf1 = self.filterKalaExf1();
        var filterKalaExf2 = self.filterKalaExf2();
        var filterKalaExf3 = self.filterKalaExf3();
        var filterMainUnitName = self.filterMainUnitName();
        var filterAmount1 = self.filterAmount1();
        var filterAmount2 = self.filterAmount2();
        var filterAmount3 = self.filterAmount3();
        var filterDiscount = self.filterDiscount();
        var filterAddMinPrice1 = self.filterAddMinPrice1();
        var filterAddMinPrice2 = self.filterAddMinPrice2();
        var filterAddMinPrice3 = self.filterAddMinPrice3();
        var filterAddMinPrice4 = self.filterAddMinPrice4();
        var filterAddMinPrice5 = self.filterAddMinPrice5();
        var filterAddMinPrice6 = self.filterAddMinPrice6();
        var filterAddMinPrice7 = self.filterAddMinPrice7();
        var filterAddMinPrice8 = self.filterAddMinPrice8();
        var filterAddMinPrice9 = self.filterAddMinPrice9();
        var filterAddMinPrice10 = self.filterAddMinPrice10();
        var filterUnitPrice = self.filterUnitPrice();
        var filterTotalPrice = self.filterTotalPrice();
        var filterBandSpec = self.filterBandSpec();
        var filterComm = self.filterComm();
        var filterSerialNumber = self.filterSerialNumber();
        var filterBandNo = self.filterBandNo();

        tempData = ko.utils.arrayFilter(self.DftrList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                (item.DocDate == null ? '' : item.DocDate.toString().search(filterDocDate) >= 0) &&
                (item.ModeName == null ? '' : item.ModeName.toString().search(filterModeName) >= 0) &&
                (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                (item.Taeed == null ? '' : item.Taeed.toString().search(filterTaeed) >= 0) &&
                (item.Tasvib == null ? '' : item.Tasvib.toString().search(filterTasvib) >= 0) &&
                (item.CustName == null ? '' : item.CustName.toString().search(filterCustName) >= 0) &&
                (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
                (item.KalaName == null ? '' : item.KalaName.toString().search(filterKalaName) >= 0) &&
                (item.KalaFileNo == null ? '' : item.KalaFileNo.toString().search(filterKalaFileNo) >= 0) &&
                (item.KalaState == null ? '' : item.KalaState.toString().search(filterKalaState) >= 0) &&
                (item.KalaExf1 == null ? '' : item.KalaExf1.toString().search(filterKalaExf1) >= 0) &&
                (item.KalaExf2 == null ? '' : item.KalaExf2.toString().search(filterKalaExf2) >= 0) &&
                (item.KalaExf3 == null ? '' : item.KalaExf3.toString().search(filterKalaExf3) >= 0) &&
                (item.MainUnitName == null ? '' : item.MainUnitName.toString().search(filterMainUnitName) >= 0) &&
                ko.utils.stringStartsWith(item.Amount1.toString().toLowerCase(), filterAmount1) &&
                ko.utils.stringStartsWith(item.Amount2.toString().toLowerCase(), filterAmount2) &&
                ko.utils.stringStartsWith(item.Amount3.toString().toLowerCase(), filterAmount3) &&
                ko.utils.stringStartsWith(item.Discount.toString().toLowerCase(), filterDiscount) &&
                ko.utils.stringStartsWith(item.AddMinPrice1.toString().toLowerCase(), filterAddMinPrice1) &&
                ko.utils.stringStartsWith(item.AddMinPrice2.toString().toLowerCase(), filterAddMinPrice2) &&
                ko.utils.stringStartsWith(item.AddMinPrice3.toString().toLowerCase(), filterAddMinPrice3) &&
                ko.utils.stringStartsWith(item.AddMinPrice4.toString().toLowerCase(), filterAddMinPrice4) &&
                ko.utils.stringStartsWith(item.AddMinPrice5.toString().toLowerCase(), filterAddMinPrice5) &&
                ko.utils.stringStartsWith(item.AddMinPrice6.toString().toLowerCase(), filterAddMinPrice6) &&
                ko.utils.stringStartsWith(item.AddMinPrice7.toString().toLowerCase(), filterAddMinPrice7) &&
                ko.utils.stringStartsWith(item.AddMinPrice8.toString().toLowerCase(), filterAddMinPrice8) &&
                ko.utils.stringStartsWith(item.AddMinPrice9.toString().toLowerCase(), filterAddMinPrice9) &&
                ko.utils.stringStartsWith(item.AddMinPrice10.toString().toLowerCase(), filterAddMinPrice10) &&
                ko.utils.stringStartsWith(item.UnitPrice.toString().toLowerCase(), filterUnitPrice) &&
                ko.utils.stringStartsWith(item.TotalPrice.toString().toLowerCase(), filterTotalPrice) &&
                (item.BandSpec == null ? '' : item.BandSpec.toString().search(filterBandSpec) >= 0) &&
                (item.Comm == null ? '' : item.Comm.toString().search(filterComm) >= 0) &&
                ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filterSerialNumber) &&
                ko.utils.stringStartsWith(item.BandNo.toString().toLowerCase(), filterBandNo)
            return result;
        })
        // calcsum(tempData);
        return tempData;

    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchDftr);
    self.firstMatch = ko.dependentObservable(function () {
        var indexDftr = 0;
        sessionStorage.searchDftr = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexDftr(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.DftrList(), function (item) {
                indexDftr += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexDftr < self.pageSizeDftr())
                self.currentPageIndexDftr(0);
            else {
                var a = Math.round((indexDftr / self.pageSizeDftr()), 0);
                if (a < (indexDftr / self.pageSizeDftr())) a += 1;
                self.currentPageIndexDftr(a - 1);
            }
            return value;
        }
    });


    self.currentPageDftr = ko.computed(function () {
        var pageSizeDftr = parseInt(self.pageSizeDftr(), 10),
            startIndex = pageSizeDftr * self.currentPageIndexDftr(),
            endIndex = startIndex + pageSizeDftr;
        return self.filterDftrList().slice(startIndex, endIndex);
    });

    self.nextPageDftr = function () {
        if (((self.currentPageIndexDftr() + 1) * self.pageSizeDftr()) < self.filterDftrList().length) {
            self.currentPageIndexDftr(self.currentPageIndexDftr() + 1);
        }
    };

    self.previousPageDftr = function () {
        if (self.currentPageIndexDftr() > 0) {
            self.currentPageIndexDftr(self.currentPageIndexDftr() - 1);
        }
    };

    self.firstPageDftr = function () {
        self.currentPageIndexDftr(0);
    };

    self.lastPageDftr = function () {
        tempCountDftr = parseInt(self.filterDftrList().length / self.pageSizeDftr(), 10);
        if ((self.filterDftrList().length % self.pageSizeDftr()) == 0)
            self.currentPageIndexDftr(tempCountDftr - 1);
        else
            self.currentPageIndexDftr(tempCountDftr);
    };

    self.sortTableDftr = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.DftrList.sort(function (left, right) {
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

        self.iconTypeDocDate('');
        self.iconTypeDocNo('');
        self.iconTypeModeName('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
        self.iconTypeTaeed('');
        self.iconTypeTasvib('');
        self.iconTypeCustName('');
        self.iconTypeMkzName('');
        self.iconTypeOprName('');
        self.iconTypeKalaName('');
        self.iconTypeKalaFileNo('');
        self.iconTypeKalaState('');
        self.iconTypeKalaExf1('');
        self.iconTypeKalaExf2('');
        self.iconTypeKalaExf3('');
        self.iconTypeMainUnitName('');
        self.iconTypeAmount1('');
        self.iconTypeAmount2('');
        self.iconTypeAmount3('');
        self.iconTypeDiscount('');
        self.iconTypeAddMinPrice1('');
        self.iconTypeAddMinPrice2('');
        self.iconTypeAddMinPrice3('');
        self.iconTypeAddMinPrice4('');
        self.iconTypeAddMinPrice5('');
        self.iconTypeAddMinPrice6('');
        self.iconTypeAddMinPrice7('');
        self.iconTypeAddMinPrice8('');
        self.iconTypeAddMinPrice9('');
        self.iconTypeAddMinPrice10('');
        self.iconTypeUnitPrice('');
        self.iconTypeTotalPrice('');
        self.iconTypeBandSpec('');
        self.iconTypeComm('');
        self.iconTypeSerialNumber('');
        self.iconTypeBandNo('');

        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tasvib') self.iconTypeTasvib((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaName') self.iconTypeKalaName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaFileNo') self.iconTypeKalaFileNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaState') self.iconTypeKalaState((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf1') self.iconTypeKalaExf1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf2') self.iconTypeKalaExf2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KalaExf3') self.iconTypeKalaExf3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MainUnitName') self.iconTypeMainUnitName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount1') self.iconTypeAmount1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount2') self.iconTypeAmount2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Amount3') self.iconTypeAmount3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Discount') self.iconTypeDiscount((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice1') self.iconTypeAddMinPrice1((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice2') self.iconTypeAddMinPrice2((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice3') self.iconTypeAddMinPrice3((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice4') self.iconTypeAddMinPrice4((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice5') self.iconTypeAddMinPrice5((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice6') self.iconTypeAddMinPrice6((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice7') self.iconTypeAddMinPrice7((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice8') self.iconTypeAddMinPrice8((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice9') self.iconTypeAddMinPrice9((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AddMinPrice10') self.iconTypeAddMinPrice10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'UnitPrice') self.iconTypeUnitPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TotalPrice') self.iconTypeTotalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'BandSpec') self.iconTypeBandSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Comm') self.iconTypeComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'BandNo') self.iconTypeBandNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    }




    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeDocDate = ko.observable("");
    self.iconTypeDocNo = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeTasvib = ko.observable("");
    self.iconTypeCustName = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprName = ko.observable("");
    self.iconTypeKalaName = ko.observable("");
    self.iconTypeKalaFileNo = ko.observable("");
    self.iconTypeKalaState = ko.observable("");
    self.iconTypeKalaExf1 = ko.observable("");
    self.iconTypeKalaExf2 = ko.observable("");
    self.iconTypeKalaExf3 = ko.observable("");
    self.iconTypeMainUnitName = ko.observable("");
    self.iconTypeAmount1 = ko.observable("");
    self.iconTypeAmount2 = ko.observable("");
    self.iconTypeAmount3 = ko.observable("");
    self.iconTypeDiscount = ko.observable("");

    self.iconTypeAddMinPrice1 = ko.observable("");
    self.iconTypeAddMinPrice2 = ko.observable("");
    self.iconTypeAddMinPrice3 = ko.observable("");
    self.iconTypeAddMinPrice4 = ko.observable("");
    self.iconTypeAddMinPrice5 = ko.observable("");
    self.iconTypeAddMinPrice6 = ko.observable("");
    self.iconTypeAddMinPrice7 = ko.observable("");
    self.iconTypeAddMinPrice8 = ko.observable("");
    self.iconTypeAddMinPrice9 = ko.observable("");
    self.iconTypeAddMinPrice10 = ko.observable("");

    self.iconTypeUnitPrice = ko.observable("");
    self.iconTypeTotalPrice = ko.observable("");
    self.iconTypeBandSpec = ko.observable("");
    self.iconTypeComm = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");
    self.iconTypeBandNo = ko.observable("");




    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableDftr">' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('AccCode', data) +
            CreateTableTh('AccName', data) +
            CreateTableTh('Comm', data) +
            CreateTableTh('Bede', data) +
            CreateTableTh('Best', data) +
            CreateTableTh('MonBede', data) +
            CreateTableTh('MonBest', data) +
            CreateTableTh('MonTotal', data) +
            CreateTableTh('CheckNo', data) +
            CreateTableTh('CheckDate', data) +
            CreateTableTh('Bank', data) +
            CreateTableTh('Shobe', data) +
            CreateTableTh('Jari', data) +
            CreateTableTh('TrafCode', data) +
            CreateTableTh('TrafName', data) +
            CreateTableTh('MkzCode', data) + 
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('Amount', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('ModeName', data) +           
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageDftr" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('AccCode', 0, 0, data) +
            CreateTableTd('AccName', 0, 0, data) +
            CreateTableTd('Comm', 0, 0, data) +
            CreateTableTd('Bede', 0, 0, data) +
            CreateTableTd('Best', 0, 0, data) +
            CreateTableTd('MonBede', 0, 0, data) +
            CreateTableTd('MonBest', 0, 0, data) +
            CreateTableTd('MonTotal', 0, 0, data) +
            CreateTableTd('CheckNo', 0, 0, data) +
            CreateTableTd('CheckDate', 0, 0, data) +
            CreateTableTd('Bank', 0, 0, data) +
            CreateTableTd('Shobe', 0, 0, data) +
            CreateTableTd('Jari', 0, 0, data) +
            CreateTableTd('TrafCode', 0, 0, data) +
            CreateTableTd('TrafName', 0, 0, data) +
            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +
            CreateTableTd('Amount', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Status', 0, 1, data) +
            CreateTableTd('ModeName', 0, 0, data) +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            CreateTableTdSum('DocNo', 0, data) +
            CreateTableTdSum('DocDate', 1, data) +
            CreateTableTdSum('AccCode', 1, data) +
            CreateTableTdSum('AccName', 1, data) +
            CreateTableTdSum('Comm', 1, data) +
            CreateTableTdSum('Bede', 1, data) +
            CreateTableTdSum('Best', 1, data) +
            CreateTableTdSum('MonBede', 1, data) +
            CreateTableTdSum('MonBest', 1, data) +
            CreateTableTdSum('MonTotal', 1, data) +
            CreateTableTdSum('CheckNo', 1, data) +
            CreateTableTdSum('CheckDate', 1, data) +
            CreateTableTdSum('Bank', 1, data) +
            CreateTableTdSum('Shobe', 1, data) +
            CreateTableTdSum('Jari', 1, data) +
            CreateTableTdSum('TrafCode', 1, data) +
            CreateTableTdSum('TrafName', 1, data) +
            CreateTableTdSum('MkzCode', 1, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('OprCode', 1, data) +
            CreateTableTdSum('OprName', 1, data) +
            CreateTableTdSum('Amount', 1, data) +
            CreateTableTdSum('Spec', 1, data) +
            CreateTableTdSum('Status', 2, data) +
            CreateTableTdSum('ModeName', 1, data) +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('AccCode', data) +
            CreateTableTdSearch('AccName', data) +
            CreateTableTdSearch('Comm', data) +
            CreateTableTdSearch('Bede', data) +
            CreateTableTdSearch('Best', data) +
            CreateTableTdSearch('MonBede', data) +
            CreateTableTdSearch('MonBest', data) +
            CreateTableTdSearch('MonTotal', data) +
            CreateTableTdSearch('CheckNo', data) +
            CreateTableTdSearch('CheckDate', data) +
            CreateTableTdSearch('Bank', data) +
            CreateTableTdSearch('Shobe', data) +
            CreateTableTdSearch('Jari', data) +
            CreateTableTdSearch('TrafCode', data) +
            CreateTableTdSearch('TrafName', data) +
            CreateTableTdSearch('ModeName', data) +
            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprCode', data) +
            CreateTableTdSearch('OprName', data) +
            CreateTableTdSearch('Amount', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
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
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10))"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ').toFixed(parseInt(' + Deghat + '))) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
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

