var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");

    var allSearchIDocH = true;

    $("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
    $("#groupTest").text('نام گروه' + sessionStorage.group);
    $("#salTest").text('سال مالی' + sessionStorage.sal);

    self.IDocHList = ko.observableArray([]); // لیست اطلاعات انبار 
    self.InvList = ko.observableArray([]); // ليست انبار ها

    self.InvCode = ko.observable();
    var IDocHUri = server + '/api/Web_Data/IDocH/'; // آدرس لیست اسناد انبار 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var IDocHiUri = server + '/api/AFI_IDocHi/'; // آدرس هدر سند 

    var IDocHCountUri = server + '/api/Web_Data/IDocH/'; // تعداد رکورد های سند 

    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.InvList(data);
            //if (sessionStorage.invSelect != "0")              
            $('#invSelect').val(sessionStorage.invSelect);
            if (self.InvList().length > 0) {
                if (flagupdateHeader == 1) {
                    $("#inv").val(sessionStorage.InvCode);
                    self.InvCode(sessionStorage.InvCode);
                }
                else {
                    if (sessionStorage.InvDefult != "null")
                        $("#inv").val(sessionStorage.InvDefult);
                }
            }
        });
    }
    //var storedNames = JSON.parse(sessionStorage.getItem("inv"));
    // self.InvList(storedNames);

    //Get IDocH
    function getIDocH(select, invCode) {
        //$('#invSelect').val(sessionStorage.invSelect);         
        if (sessionStorage.invSelect == "" || sessionStorage.invSelect == "null" || sessionStorage.invSelect == null)
            invCode = 0;
        ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.ModeCode + '/top' + select + '/' + invCode + '/' + sessionStorage.userName + '/' + sessionStorage.AccessSanad, 'GET').done(function (data) {
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.IDocHList(data);
            ajaxFunction(IDocHCountUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.ModeCode, 'GET').done(function (dataCount) {
                $('#countAllRecord').text(dataCount);
            });
        });
    }

    self.OptionsCaptionAnbar = ko.computed(function () {
        //        return self.InvList().length > 1 ? 'همه انبار ها' : 'انبار تعریف نشده است';
        return 'همه انبار ها';

    });


    getInvList();
    $('#invSelect').val(sessionStorage.invSelect);
    getIDocH(0, sessionStorage.invSelect);

    //------------------------------------------------------
    self.currentPageIDocH = ko.observable();
    self.pageSizeIDocH = ko.observable(10);
    self.currentPageIndexIDocH = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypethvlname = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");


    /*    self.filterIDocH = ko.observable("");
        self.filterIDocHList = ko.computed(function () {
            self.currentPageIndexIDocH(0);
            var filter = self.filterIDocH().toUpperCase();
            if (!filter) {
                return self.IDocHList();
            } else {
                invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
    
    
                return ko.utils.arrayFilter(self.IDocHList(), function (item) {
                    if ($("#allSearchIDocH").is(':checked')) {
                        result =
                            //invSelect > 0 ? ko.utils.stringStartsWith(item.InvCode, invSelect)
                            //&&
                            (
                                ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter) ||
                                (item.InvName == null ? '' : item.InvName.toString().search(filter) >= 0) ||
                                (item.DocDate == null ? '' : item.DocDate.toString().search(filter) >= 0) ||
                                (item.thvlname == null ? '' : item.thvlname.toString().search(filter) >= 0) ||
                                (item.ModeName == null ? '' : item.ModeName.toString().search(filter) >= 0) ||
                                (item.Spec == null ? '' : item.Spec.toString().search(filter) >= 0) ||
                                (item.Status == null ? '' : item.Status.toString().search(filter) >= 0) ||
                                (item.Eghdam == null ? '' : item.Eghdam.toString().search(filter) >= 0) ||
                                (item.Taeed == null ? '' : item.Taeed.toString().search(filter) >= 0) ||
                                ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filter)
                            )
    
                        --(
                        ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter) ||
                        ko.utils.stringStartsWith(item.InvName.match(filter), filter) ||
                        ko.utils.stringStartsWith(item.DocDate, filter) ||
                        ko.utils.stringStartsWith(item.thvlname, filter) ||
                        ko.utils.stringStartsWith(item.ModeName, filter) ||
                        ko.utils.stringStartsWith(item.Spec, filter) ||
                        //ko.utils.startIndex(item.FinalPrice.toString().toLowerCase(), filter) ||
                        ko.utils.stringStartsWith(item.Status, filter) ||
                        ko.utils.stringStartsWith(item.Eghdam, filter) ||
                        ko.utils.stringStartsWith(item.Tanzim, filter) ||
                        ko.utils.stringStartsWith(item.Taeed, filter) ||
                        ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filter)
                        )--
                        return result;
                    }
                    else {
                        result = ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                        return result;
                    }
                });
            }
        });*/


    self.filterIDocH0 = ko.observable("");
    self.filterIDocH1 = ko.observable("");
    self.filterIDocH2 = ko.observable("");
    self.filterIDocH3 = ko.observable("");
    self.filterIDocH4 = ko.observable("");
    self.filterIDocH5 = ko.observable("");
    self.filterIDocH6 = ko.observable("");
    self.filterIDocH7 = ko.observable("");
    self.filterIDocH8 = ko.observable("");
    self.filterIDocH9 = ko.observable("");
    self.filterIDocH10 = ko.observable("");

    self.filterIDocHList = ko.computed(function () {

        self.currentPageIndexIDocH(0);
        var filter0 = self.filterIDocH0().toUpperCase();
        var filter1 = self.filterIDocH1().toUpperCase();
        var filter2 = self.filterIDocH2().toUpperCase();
        var filter3 = self.filterIDocH3().toUpperCase();
        var filter4 = self.filterIDocH4().toUpperCase();
        var filter5 = self.filterIDocH5().toUpperCase();
        var filter6 = self.filterIDocH6().toUpperCase();
        var filter7 = self.filterIDocH7().toUpperCase();
        var filter8 = self.filterIDocH8().toUpperCase();
        var filter9 = self.filterIDocH9().toUpperCase();
        var filter10 = self.filterIDocH10().toUpperCase();

        if (!filter0 && !filter1 && !filter2 && !filter3 && !filter4 && !filter5 && !filter6 && !filter7 && !filter8 && !filter9 && !filter10) {
            return self.IDocHList();
        } else {
            tempData = ko.utils.arrayFilter(self.IDocHList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filter0) &&
                    ko.utils.stringStartsWith(item.DocDate, filter1) &&
                    (item.InvName == null ? '' : item.InvName.toString().search(filter2) >= 0) &&
                    (item.thvlname == null ? '' : item.thvlname.toString().search(filter3) >= 0) &&
                    (item.ModeName == null ? '' : item.ModeName.toString().search(filter4) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter5) >= 0) &&
                    (item.Status == null ? 'null' : item.Status.toString().search(filter6) >= 0) &&
                    (item.Eghdam == null ? 'null' : item.Eghdam.toString().search(filter7) >= 0) &&
                    (item.Tanzim == null ? 'null' : item.Tanzim.toString().search(filter8) >= 0) &&
                    (item.Taeed == null ? 'null' : item.Taeed.toString().search(filter9) >= 0) &&
                    ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filter10)
                return result;
            })
            return tempData;
        }
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchIDocH);
    self.firstMatch = ko.dependentObservable(function () {
        var indexIDocH = 0;
        sessionStorage.searchIDocH = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexIDocH(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.IDocHList(), function (item) {
                indexIDocH += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexIDocH < self.pageSizeIDocH())
                self.currentPageIndexIDocH(0);
            else {
                var a = Math.round((indexIDocH / self.pageSizeIDocH()), 0);
                if (a < (indexIDocH / self.pageSizeIDocH())) a += 1;
                self.currentPageIndexIDocH(a - 1);
            }
            return value;
        }
    });


    self.currentPageIDocH = ko.computed(function () {
        var pageSizeIDocH = parseInt(self.pageSizeIDocH(), 10),
            startIndex = pageSizeIDocH * self.currentPageIndexIDocH(),
            endIndex = startIndex + pageSizeIDocH;
        return self.filterIDocHList().slice(startIndex, endIndex);
    });

    self.nextPageIDocH = function () {
        if (((self.currentPageIndexIDocH() + 1) * self.pageSizeIDocH()) < self.filterIDocHList().length) {
            self.currentPageIndexIDocH(self.currentPageIndexIDocH() + 1);
        }
        //else {
        //    self.currentPageIndexIDocH(0);
        //}
    };

    self.previousPageIDocH = function () {
        if (self.currentPageIndexIDocH() > 0) {
            self.currentPageIndexIDocH(self.currentPageIndexIDocH() - 1);
        }
        //else {
        //    self.currentPageIndexidoch((Math.ceil(self.filterIDocHList().length / self.pageSizeIDocH())) - 1);
        //}
    };

    self.firstPageIDocH = function () {
        self.currentPageIndexIDocH(0);
    };

    self.lastPageIDocH = function () {
        tempCountIDocH = parseInt(self.filterIDocHList().length / self.pageSizeIDocH(), 10);
        if ((self.filterIDocHList().length % self.pageSizeIDocH()) == 0)
            self.currentPageIndexIDocH(tempCountIDocH - 1);
        else
            self.currentPageIndexIDocH(tempCountIDocH);
    };

    self.sortTableIDocH = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.IDocHList.sort(function (left, right) {
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
        self.iconTypeInvName('');
        self.iconTypethvlname('');
        self.iconTypeModeName('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeTaeed('');
        self.iconTypeSerialNumber('');

        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'InvName') self.iconTypeInvName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'thvlname') self.iconTypethvlname((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    $('#AddNewSanadAnbar').click(function () {
        sessionStorage.flagupdateHeader = 0;
        invCode = $('#invSelect').val();
        //if (invCode == '' || invCode == null) 
        //{
        //    return showNotification('انبار را انتخاب کنيد');
        //} 
        //else
        //{
        sessionStorage.InvCode = invCode;
        window.location.href = sessionStorage.urlIDocH;
        //}
    });

    $('#refreshIdocH').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: 'لیست اسناد به روز رسانی شود ؟',
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getIDocH($('#pageCountSelector').val(), sessionStorage.invSelect == "" ? 0 : sessionStorage.invSelect);

                //$('#pageCountSelector').val(0);
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست اسناد به روز رسانی شد' });
            }
        })
    });

    self.DeleteIDocH = function (factorBand) {

        Swal.fire({
            title: 'تایید حذف ؟',
            text: "آیا سند انتخابی حذف شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group + '/' + factorBand.SerialNumber + '/' + sessionStorage.ModeCode, 'DELETE').done(function (response) {
                    getIDocH(0, sessionStorage.invSelect == "" ? 0 : sessionStorage.invSelect);
                    Swal.fire({ type: 'success', title: 'حذف موفق', text: ' سند حذف شد ' });
                });
            }
        })
    };



    self.UpdateHeader = function (item) {
        sessionStorage.flagupdateHeader = 1;
        sessionStorage.SerialNumber = item.SerialNumber;
        sessionStorage.DocNo = item.DocNo;
        sessionStorage.DocDate = item.DocDate;
        sessionStorage.ThvlCode = item.ThvlCode;

        sessionStorage.thvlname = item.thvlname == null ? '' : item.thvlname;
        sessionStorage.InvCode = item.InvCode;
        sessionStorage.Spec = item.Spec;
        sessionStorage.PriceCode = item.KalaPriceCode;
        sessionStorage.ModeCodeValue = item.ModeCode;
        sessionStorage.Status = item.Status;
        sessionStorage.PaymentType = item.PaymentType;
        sessionStorage.Footer = item.Footer;
        sessionStorage.Eghdam = item.Eghdam;
        window.location.href = sessionStorage.urlIDocH;

    }

    $("#allSearchIDocH").click(function () {
        if ($("#allSearchIDocH").is(':checked')) {
            $('#allSearchIDocHText').text('جستجو بر اساس همه موارد');
            allSearchIDocH = true;
        }
        else {
            $('#allSearchIDocHText').text('جستجو بر اساس شماره سند');
            allSearchIDocH = false;
        }
    });

    if (sessionStorage.ModeCode == 'in') {
        sessionStorage.sels = true;
        $('#Titlethvlname').text('نام تحویل دهنده');
        $('#TitleListAnbar').text('اسناد وارده به انبار');
    } else {
        sessionStorage.sels = false;
        $('#Titlethvlname').text('نام تحویل گیرنده');
        $('#TitleListAnbar').text('اسناد صادره از انبار');
    }


    $('#SaveIDocH1').click(function () {
        window.location.href = sessionStorage.urlFDocH;
    });

    $('#modal-Factor').on('shown.bs.modal', function () {
        if (sessionStorage.sels == "true")
            $('#Titlethvlname1').text('نام خریدار');
        else
            $('#Titlethvlname1').text('نام فروشنده');
        $('#searchIDocH1').val('');
        self.filterIDocH1('');
        self.filterIDocH1List();
        $('#searchIDocH1').focus();
    });

    $("#allSearchIDocH1").click(function () {
        if ($("#allSearchIDocH1").is(':checked')) {
            $('#searchIDocH1').attr('placeholder', 'جستجو بر اساس همه موارد');
        }
        else {
            $('#searchIDocH1').attr('placeholder', 'جستجو بر اساس شماره سند');
        }
    });


    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        invSelect = $('#invSelect').val() == '' ? 0 : $('#invSelect').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect);
    }



    self.ShowAction = function (Eghdam) {
        if (sessionStorage.ModeCode == 'in') {
            if (sessionStorage.AccessViewSanadAnbarVarede == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }
        else if (sessionStorage.ModeCode == 'out') {
            if (sessionStorage.AccessViewSanadAnbarSadere == 'false') {
                return Eghdam == sessionStorage.userName ? true : false
            }
            else {
                return true;
            }
        }
    }

    $("#searchIDocH").on("keydown", function search(e) {
        if (allSearchIDocH == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
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
    });

};

ko.applyBindings(new ViewModel());

