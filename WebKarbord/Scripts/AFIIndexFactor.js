var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");


    $("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
    $("#groupTest").text('نام گروه' + sessionStorage.group);
    $("#salTest").text('سال مالی' + sessionStorage.sal);

    self.FDocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش  
    self.FDocHList1 = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش

    var FDocHUri = server + '/api/Web_Data/FDocH/'; // آدرس کسورات و افزایشات 
    var FDocHHiUri = server + '/api/AFI_FDocHi/'; // آدرس هدر فاکتور 
    var FDocHCountUri = server + '/api/Web_Data/FDocH/'; // تعداد رکورد های فاکتور 

    var allSearchFDocH = true;

    //Get FDocH 
    function getFDocH(select) {
        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.ModeCode + '/top' + select + '/' + sessionStorage.userName + '/' + sessionStorage.AccessSanad, 'GET').done(function (data) {
            //$("div.loadingZone").show();
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.FDocHList(data);

            ajaxFunction(FDocHCountUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.ModeCode, 'GET').done(function (dataCount) {
                $('#countAllRecord').text(dataCount);
            });

            // if (self.FDocHList().length > 0) {
            //     $('#countAllRecord').text(self.FDocHList().length);
            // }
        });
    }

    function getFDocH1(salselect) {
        if (sessionStorage.ModeCode == 53)
            tempmode = 52;
        else if (sessionStorage.ModeCode == 56)
            tempmode = 55;
        ajaxFunction(FDocHUri + ace + '/' + salselect + '/' + group + '/' + tempmode, 'GET').done(function (data) {
            self.FDocHList1(data);
        });
    }
    
    if (sessionStorage.ModeCode == 53 || sessionStorage.ModeCode == 56) {
        // getFDocH1(sessionStorage.sal);
    }

    getFDocH($('#pageCountSelector').val());

    //------------------------------------------------------
    self.currentPageFDocH = ko.observable();
    self.pageSizeFDocH = ko.observable(10);
    self.currentPageIndexFDocH = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");





    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeCustName = ko.observable("");
    self.iconTypeFinalPrice = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");






    /* self.filterFDocH = ko.observable("");
     self.filterFDocHList = ko.computed(function () {
         self.currentPageIndexFDocH(0);
         var filter = self.filterFDocH().toUpperCase();
         if (!filter) {
             var a = self.FDocHList();
             return self.FDocHList();
         } else {
             return ko.utils.arrayFilter(self.FDocHList(), function (item) {
                 if ($("#allSearchFDocH").is(':checked')) {
                     result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter) ||
                         ko.utils.stringStartsWith(item.DocDate.toLowerCase(), filter) ||
                         ko.utils.stringStartsWith(item.CustName, filter) ||
                         //ko.utils.startIndex(item.FinalPrice.toString().toLowerCase(), filter) ||
                         ko.utils.stringStartsWith(item.Status, filter) ||
                         ko.utils.stringStartsWith(item.Eghdam, filter) ||
                         ko.utils.stringStartsWith(item.Tanzim, filter) ||
                         ko.utils.stringStartsWith(item.Taeed, filter) ||
                         ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filter)
                     return result;
                 }
                 else {
                     result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                     return result;
                 }
             });
         }
     });*/


    self.filterFDocH0 = ko.observable("");
    self.filterFDocH1 = ko.observable("");
    self.filterFDocH2 = ko.observable("");
    self.filterFDocH3 = ko.observable("");
    self.filterFDocH4 = ko.observable("");
    self.filterFDocH5 = ko.observable("");
    self.filterFDocH6 = ko.observable("");
    self.filterFDocH7 = ko.observable("");
    self.filterFDocH8 = ko.observable("");


    


    self.filterFDocHList = ko.computed(function () {

        self.currentPageIndexFDocH(0);
        var filter0 = self.filterFDocH0().toUpperCase();
        var filter1 = self.filterFDocH1().toUpperCase();
        var filter2 = self.filterFDocH2().toUpperCase();
        var filter3 = self.filterFDocH3().toUpperCase();
        var filter4 = self.filterFDocH4().toUpperCase();
        var filter5 = self.filterFDocH5().toUpperCase();
        var filter6 = self.filterFDocH6().toUpperCase();
        var filter7 = self.filterFDocH7().toUpperCase();
        var filter8 = self.filterFDocH8().toUpperCase();



        if (!filter0 && !filter1 && !filter2 && !filter3 && !filter4 && !filter5 && !filter6 && !filter7 && !filter8) {
            return self.FDocHList();
        } else {
            tempData = ko.utils.arrayFilter(self.FDocHList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter0) &&
                    ko.utils.stringStartsWith(item.DocDate.toString().toLowerCase(), filter1) &&
                    (item.CustName == null ? '' : item.CustName.toString().search(filter2) >= 0) &&
                    //ko.utils.startIndex(item.FinalPrice.toString().toLowerCase(), filter3) &&
                    (item.Status == null ? 'null' : item.Status.toString().search(filter4) >= 0) &&
                    (item.Eghdam == null ? 'null' : item.Eghdam.toString().search(filter5) >= 0) &&
                    (item.Tanzim == null ? 'null' : item.Tanzim.toString().search(filter6) >= 0) &&
                    (item.Taeed == null ? 'null' : item.Taeed.toString().search(filter7) >= 0) &&
                    ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filter8)// &&
                return result;
            })
            return tempData;
        }
    });



    self.search = ko.observable("");
    self.search(sessionStorage.searchFDocH);
    self.firstMatch = ko.dependentObservable(function () {
        var indexFDocH = 0;
        sessionStorage.searchFDocH = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexFDocH(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.FDocHList(), function (item) {
                indexFDocH += 1;
                return item.SortDocNo == search;
                //return ko.utils.stringStartsWith(item.SortDocNo.toString(), search);
            });
            if (indexFDocH < self.pageSizeFDocH())
                self.currentPageIndexFDocH(0);
            else {
                var a = Math.round((indexFDocH / self.pageSizeFDocH()), 0);
                if (a < (indexFDocH / self.pageSizeFDocH())) a += 1;
                self.currentPageIndexFDocH(a - 1);
            }
            return value;
        }
    });

    self.currentPageFDocH = ko.computed(function () {
        var pageSizeFDocH = parseInt(self.pageSizeFDocH(), 10),
            startIndex = pageSizeFDocH * self.currentPageIndexFDocH(),
            endIndex = startIndex + pageSizeFDocH;
        return self.filterFDocHList().slice(startIndex, endIndex);
    });

    self.nextPageFDocH = function () {
        if (((self.currentPageIndexFDocH() + 1) * self.pageSizeFDocH()) < self.filterFDocHList().length) {
            self.currentPageIndexFDocH(self.currentPageIndexFDocH() + 1);
        }
    };

    self.previousPageFDocH = function () { 
        if (self.currentPageIndexFDocH() > 0) {
            self.currentPageIndexFDocH(self.currentPageIndexFDocH() - 1);
        }
    };

    self.firstPageFDocH = function () {
        self.currentPageIndexFDocH(0);
    };

    self.lastPageFDocH = function () {
        tempCountFDocH = parseInt(self.filterFDocHList().length / self.pageSizeFDocH(), 10);
        if ((self.filterFDocHList().length % self.pageSizeFDocH()) == 0)
            self.currentPageIndexFDocH(tempCountFDocH - 1);
        else
            self.currentPageIndexFDocH(tempCountFDocH);
    };

    self.sortTableFDocH = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        //if (orderProp == "") {
        //    orderProp = "";
        // }
        self.search("");
        self.currentColumn(orderProp);
        self.FDocHList.sort(function (left, right) {
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

        self.iconTypeDocNo('');
        self.iconTypeDocDate('');
        self.iconTypeCustName('');
        self.iconTypeFinalPrice('');
        self.iconTypeStatus('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeTaeed('');
        self.iconTypeSerialNumber('');

        if (orderProp == 'SortDocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FinalPrice') self.iconTypeFinalPrice((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.currentPageFDocH1 = ko.observable();
    self.pageSizeFDocH1 = ko.observable(10);
    self.currentPageIndexFDocH1 = ko.observable(0);
    self.sortType1 = "ascending";
    self.currentColumn1 = ko.observable("");
    self.iconType1 = ko.observable("");
    self.filterFDocH1 = ko.observable("");
    self.filterFDocHList1 = ko.computed(function () {
        self.currentPageIndexFDocH1(0);
        var filter = self.filterFDocH1().toLowerCase();
        if (!filter) {
            return self.FDocHList1();
        } else {
            return ko.utils.arrayFilter(self.FDocHList1(), function (item) {
                if ($("#allSearchFDocH1").is(':checked')) {
                    result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter) ||
                        ko.utils.stringStartsWith(item.DocDate.toLowerCase(), filter) ||
                        ko.utils.stringStartsWith(item.CustName, filter) ||
                        ko.utils.stringStartsWith(item.Spec, filter) ||
                        ko.utils.stringStartsWith(item.Tanzim, filter)
                    return result;
                }
                else {
                    result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                    return result;
                }
            });
        }
    });

    self.currentPageFDocH1 = ko.computed(function () {
        var pageSizeFDocH1 = parseInt(self.pageSizeFDocH1(), 10),
            startIndex = pageSizeFDocH1 * self.currentPageIndexFDocH1(),
            endIndex = startIndex + pageSizeFDocH1;
        return self.filterFDocHList1().slice(startIndex, endIndex);
    });

    self.nextPageFDocH1 = function () {
        if (((self.currentPageIndexFDocH1() + 1) * self.pageSizeFDocH1()) < self.filterFDocHList1().length) {
            self.currentPageIndexFDocH1(self.currentPageIndexFDocH1() + 1);
        }
        //else {
        //    self.currentPageIndexFDocH1(0);
        //}
    };

    self.previousPageFDocH1 = function () {
        if (self.currentPageIndexFDocH1() > 0) {
            self.currentPageIndexFDocH1(self.currentPageIndexFDocH1() - 1);
        }
        //else {
        //    self.currentPageIndexFDocH1((Math.ceil(self.filterFDocHList1().length / self.pageSizeFDocH1())) - 1);
        //}
    };

    self.firstPageFDocH1 = function () {
        self.currentPageIndexFDocH1(0);
    };

    self.lastPageFDocH1 = function () {
        tempCountFDocH1 = parseInt(self.filterFDocHList1().length / self.pageSizeFDocH1(), 10);
        if ((self.filterFDocHList1().length % self.pageSizeFDocH1()) == 0)
            self.currentPageIndexFDocH1(tempCountFDocH1 - 1);
        else
            self.currentPageIndexFDocH1(tempCountFDocH1);
    };

    self.sortTableFDocH1 = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn1(orderProp);
        self.FDocHList1.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType1 == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType1 = (self.sortType1 == "ascending") ? "descending" : "ascending";
        self.iconType1((self.sortType1 == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    $('#refreshFDocH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست فاکتور ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getFDocH($('#pageCountSelector').val());
                //$('#pageCountSelector').val(0);
                //Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست فاکتور ها به روز رسانی شد' });
            }
        })
    })

    $('#AddNewFactor').click(function () {
        sessionStorage.flagupdateHeader = 0;
        sessionStorage.Eghdam = sessionStorage.userName;
        if (sessionStorage.ModeCode == "53" || sessionStorage.ModeCode == "56") {
            $('#modal-SelectFactor').modal('show');
            if (sessionStorage.ModeCode == "53")
                $('#CaptionSelectFactor').text('برگشت از فروش متناظر با فاکتور فروش شماره');
            else
                $('#CaptionSelectFactor').text('برگشت از خرید متناظر با فاکتور خرید شماره');
        }
        else {
            window.location.href = sessionStorage.urlFDocH;
        }
    });


    self.DeleteFactor = function (factorBand) {
        Swal.fire({
            title: 'تایید حذف ؟',
            text: "آیا فاکتور انتخابی حذف شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                ajaxFunction(FDocHHiUri + ace + '/' + sal + '/' + group + '/' + factorBand.SerialNumber + '/' + sessionStorage.ModeCode, 'DELETE').done(function (response) {
                    //self.IDocHList(response);
                    getFDocH($('#pageCountSelector').val());
                    Swal.fire({ type: 'success', title: 'حذف موفق', text: ' فاکتور حذف شد ' });
                });
            }
        })
    };


    self.selectFactor1 = function (item) {
        $('#docnumber').val(item.DocNo);
        $("#docnumber").focus();
    };

    self.UpdateHeader = function (item) {
        sessionStorage.flagupdateHeader = 1;
        sessionStorage.SerialNumber = item.SerialNumber;
        sessionStorage.DocNo = item.DocNo;
        sessionStorage.DocDate = item.DocDate;
        sessionStorage.CustCode = item.CustCode;
        sessionStorage.CustName = item.CustName;
        sessionStorage.Spec = item.Spec;
        sessionStorage.PriceCode = item.KalaPriceCode;
        sessionStorage.InvCode = item.InvCode;
        sessionStorage.Eghdam = item.Eghdam;

        sessionStorage.AddMinSpec1 = item.AddMinSpec1//== "" ? null : item.AddMinSpec1;
        sessionStorage.AddMinSpec2 = item.AddMinSpec2// == "" ? null : item.AddMinSpec2;
        sessionStorage.AddMinSpec3 = item.AddMinSpec3// == "" ? null : item.AddMinSpec3;
        sessionStorage.AddMinSpec4 = item.AddMinSpec4// == "" ? null : item.AddMinSpec4;
        sessionStorage.AddMinSpec5 = item.AddMinSpec5// == "" ? null : item.AddMinSpec5;
        sessionStorage.AddMinSpec6 = item.AddMinSpec6// == "" ? null : item.AddMinSpec6;
        sessionStorage.AddMinSpec7 = item.AddMinSpec7// == "" ? null : item.AddMinSpec7;
        sessionStorage.AddMinSpec8 = item.AddMinSpec8// == "" ? null : item.AddMinSpec8;
        sessionStorage.AddMinSpec9 = item.AddMinSpec9// == "" ? null : item.AddMinSpec9;
        sessionStorage.AddMinSpec10 = item.AddMinSpec10 //== "" ? null : item.AddMinSpec10;

        sessionStorage.AddMin1 = item.AddMinPrice1 == null ? 0 : item.AddMinPrice1;
        sessionStorage.AddMin2 = item.AddMinPrice2 == null ? 0 : item.AddMinPrice2;
        sessionStorage.AddMin3 = item.AddMinPrice3 == null ? 0 : item.AddMinPrice3;
        sessionStorage.AddMin4 = item.AddMinPrice4 == null ? 0 : item.AddMinPrice4;
        sessionStorage.AddMin5 = item.AddMinPrice5 == null ? 0 : item.AddMinPrice5;
        sessionStorage.AddMin6 = item.AddMinPrice6 == null ? 0 : item.AddMinPrice6;
        sessionStorage.AddMin7 = item.AddMinPrice7 == null ? 0 : item.AddMinPrice7;
        sessionStorage.AddMin8 = item.AddMinPrice8 == null ? 0 : item.AddMinPrice8;
        sessionStorage.AddMin9 = item.AddMinPrice9 == null ? 0 : item.AddMinPrice9;
        sessionStorage.AddMin10 = item.AddMinPrice10 == null ? 0 : item.AddMinPrice10;

        sessionStorage.Status = item.Status;
        sessionStorage.PaymentType = item.PaymentType;
        sessionStorage.Footer = item.Footer;
        window.location.href = sessionStorage.urlFDocH;
    }


    $('#sal').change(function () {
        // getFDocH1($('#sal').val());
    });


    $("#allSearchFDocH").click(function () {
        if ($("#allSearchFDocH").is(':checked')) {
            $('#allSearchFDocHText').text('جستجو بر اساس همه موارد');
            allSearchFDocH = true;
        }
        else {
            $('#allSearchFDocHText').text('جستجو بر اساس شماره سند');
            allSearchFDocH = false;
        }
    });

    if (sessionStorage.ModeCode < 54) {
        sessionStorage.sels = true;
        $('#TitleCustName').text('نام خریدار');
    } else {
        sessionStorage.sels = false;
        $('#TitleCustName').text('نام فروشنده');
    }


    switch (sessionStorage.ModeCode.toString()) {
        case "51":
            $('#TitleListFactor').text('پیش فاکتور فروش');
            break;
        case "52":
            $('#TitleListFactor').text('فاکتور فروش');
            break;
        case "53":
            $('#TitleListFactor').text('برگشت از فروش');
            break;
        case "54":
            $('#TitleListFactor').text('پیش فاکتور خرید');
            break;
        case "55":
            $('#TitleListFactor').text('فاکتور خرید');
            break;
        case "56":
            $('#TitleListFactor').text('برگشت از خرید');
    }

    $('#SaveFDocH1').click(function () {
        window.location.href = sessionStorage.urlFDocH;
    });

    $('#modal-Factor').on('shown.bs.modal', function () {
        if (sessionStorage.sels == "true")
            $('#TitleCustName1').text('نام خریدار');
        else
            $('#TitleCustName1').text('نام فروشنده');
        $('#searchFDocH1').val('');
        self.filterFDocH1('');
        self.filterFDocH1List();
        $('#searchFDocH1').focus();
    });

    $("#allSearchFDocH1").click(function () {
        if ($("#allSearchFDocH1").is(':checked')) {
            $('#searchFDocH1').attr('placeholder', 'جستجو بر اساس همه موارد');
        }
        else {
            $('#searchFDocH1').attr('placeholder', 'جستجو بر اساس شماره سند');
        }
    });

    self.PageCountView = function () {
        select = $('#pageCountSelector').val();
        getFDocH(select);
    }

    self.ShowAction = function (Eghdam) {
        if (sessionStorage.ModeCode == '51') {
            if (sessionStorage.AccessViewPishFactorForosh == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }
        else if (sessionStorage.ModeCode == '52') {
            if (sessionStorage.AccessViewFactorForosh == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }

        else if (sessionStorage.ModeCode == '53') {
            if (sessionStorage.AccessViewBackFactorForosh == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }

        else if (sessionStorage.ModeCode == '54') {
            if (sessionStorage.AccessViewPishFactorKharid == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }

        else if (sessionStorage.ModeCode == '55') {
            if (sessionStorage.AccessViewFactorKharid == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }

        else if (sessionStorage.ModeCode == '56') {
            if (sessionStorage.AccessViewBackFactorKharid == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }
    }

    $("#searchFDocH").on("keydown", function search(e) {
        var key = e.charCode || e.keyCode || 0;
        if (allSearchFDocH == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
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
        else {
            if (key == 68) {
                e.preventDefault();
                this.value = this.value + String.fromCharCode(1610);
            }
        }
    });



};

ko.applyBindings(new ViewModel());

