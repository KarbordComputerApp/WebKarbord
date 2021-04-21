var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var flagupdateHeader = 0;
    var server = localStorage.getItem("ApiAddress");


    self.IDocRList = ko.observableArray([]); // لیست اطلاعات انبار 
    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.ThvlList = ko.observableArray([]); // ليست حساب ها
    self.KalaList = ko.observableArray([]); // ليست کالا ها

    self.InvCode = ko.observable(); 
    var IDocRUri = server + '/api/Web_Data/IDocR/'; // آدرس لیست اسناد انبار 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالا ها
    var ThvlUri = server + '/api/Web_Data/Thvl/'; // آدرس حساب

    self.AzDate = ko.observable();
    self.TaDate = ko.observable(ShamsiDate());

    $('#btnaztarikh').click(function () {
        $('#aztarikh').change();
    });

    $('#btntatarikh').click(function () {
        $('#tatarikh').change();
    });
    self.ThvlCode = ko.observable();
    self.InvCode = ko.observable();


    function AddModeCode() {
        select = document.getElementById('modeCode');
        for (var i = 1; i <= 11; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = 101;
                opt.innerHTML = 'موجودي اول دوره';
            }
            if (i == 2) {
                opt.value = 102;
                opt.innerHTML = 'رسيد ورود به انبار';
            }
            if (i == 3) {
                opt.value = 103;
                opt.innerHTML = 'برگشت فروش به انبار';
            }
            if (i == 4) {
                opt.value = 106;
                opt.innerHTML = 'انتقال به انبار';
            }
            if (i == 5) {
                opt.value = 108;
                opt.innerHTML = 'رسيد خريد';
            }
            if (i == 6) {
                opt.value = 110;
                opt.innerHTML = 'رسيد محصول';
            }

            if (i == 7) {
                opt.value = 104;
                opt.innerHTML = 'حواله خروج از انبار';
            }
            if (i == 8) {
                opt.value = 105;
                opt.innerHTML = 'برگشت خريد از انبار';
            }
            if (i == 9) {
                opt.value = 107;
                opt.innerHTML = 'انتقال از انبار';
            }
            if (i == 10) {
                opt.value = 109;
                opt.innerHTML = 'حواله فروش';
            }
            if (i == 11) {
                opt.value = 111;
                opt.innerHTML = 'حواله مواد';
            }
            select.appendChild(opt);
        }
    }

    AddModeCode();

    //Get Thvl List
    function getThvlList() {
        var ThvlObject = {
            Mode: 0,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(ThvlUri + ace + '/' + sal + '/' + group, 'POST', ThvlObject).done(function (data) {
            self.ThvlList(data);
        });
    }

    //Get kala List
    function getKalaList() {
        var KalaObject = {
            withimage: false,
            updatedate: null
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject).done(function (data) {
            self.KalaList(data);
        });
    }

    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/0/' + sessionStorage.userName , 'GET').done(function (data) {
            self.InvList(data);
        });
    }

    self.OptionsCaptionAnbar = ko.computed(function () {
        return self.InvList().length > 0 ? 'همه انبار ها' : 'انبار تعریف نشده است';
    });

    getInvList();
    getThvlList();
    getKalaList();


    self.currentPageThvl = ko.observable();
    self.currentPageKala = ko.observable();

    pageSizeThvl = localStorage.getItem('pageSizeThvl') == null ? 10 : localStorage.getItem('pageSizeThvl');
    self.pageSizeThvl = ko.observable(pageSizeThvl);

    pageSizeKala = localStorage.getItem('pageSizeKala') == null ? 10 : localStorage.getItem('pageSizeKala');
    self.pageSizeKala = ko.observable(pageSizeKala);
    self.currentPageIndexThvl = ko.observable(0);
    self.currentPageIndexKala = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");


    self.filterThvl = ko.observable("");
    self.filterThvlList = ko.computed(function () {
        self.currentPageIndexThvl(0);
        var filter = self.filterThvl().toLowerCase();
        if (!filter) {
            return self.ThvlList();
        } else {
            return ko.utils.arrayFilter(self.ThvlList(), function (item) {
                if ($("#allSearchThvl").is(':checked')) {
                    result = ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter) || ko.utils.stringStartsWith(item.Name.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Spec.toLowerCase(), filter)
                    //(item.Code.toLowerCase().search(filter) >= 0 || item.Name.toLowerCase().search(filter) >= 0 || item.Spec.toLowerCase().search(filter) >= 0)
                    return result;
                }
                else {
                    result = ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                    //return ko.utils.stringStartsWith(item.Name().toLowerCase(), filter);
                    return result;
                }
            });
        }
    });


    self.currentPageThvl = ko.computed(function () {
        var pageSizeThvl = parseInt(self.pageSizeThvl(), 10),
            startIndex = pageSizeThvl * self.currentPageIndexThvl(),
            endIndex = startIndex + pageSizeThvl;
        return self.filterThvlList().slice(startIndex, endIndex);
    });


    self.nextPageThvl = function () {
        if (((self.currentPageIndexThvl() + 1) * self.pageSizeThvl()) < self.filterThvlList().length) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() + 1);
        }
        //else {
        //    self.currentPageIndexThvl(0);
        //}
    };

    self.previousPageThvl = function () {
        if (self.currentPageIndexThvl() > 0) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() - 1);
        }
        //else {
        //    self.currentPageIndexThvl((Math.ceil(self.filterThvlList().length / self.pageSizeThvl())) - 1);
        //}
    };

    self.firstPageThvl = function () {
        self.currentPageIndexThvl(0);
    };

    self.lastPageThvl = function () {
        countThvl = parseInt(self.filterThvlList().length / self.pageSizeThvl(), 10);
        if ((self.filterThvlList().length % self.pageSizeThvl()) == 0)
              self.currentPageIndexThvl(countThvl - 1);
        else
              self.currentPageIndexThvl(countThvl);
    };

    self.sortTableThvl = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
       self.currentColumn(orderProp);
        self.ThvlList.sort(function (left, right) {
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



    self.filterKala = ko.observable("");
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
        //else {
        //    self.currentPageIndexKala(0);
        //}
    };

    self.previousPageKala = function () {
        if (self.currentPageIndexKala() > 0) {
            self.currentPageIndexKala(self.currentPageIndexKala() - 1);
        }
        //else {
        //    self.currentPageIndexKala((Math.ceil(self.filterKalaList().length / self.pageSizeKala())) - 1);
        //}
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
        if (orderProp == null)
            return null
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

    createViewer();

    /*$('#Print').click(function () {
        FromDate = $("#aztarikh").val().toEnglishDigit();
        ToDate = $("#tatarikh").val().toEnglishDigit();

        printVariable = '"ReportDate":"' + DateNow + '",';
        printVariable += '"FromDate":"' + FromDate + '",';
        printVariable += '"ToDate":"' + ToDate + '",';

        setReport(self.filterThvl(), 'Free', printVariable);
    });*/

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
        setReport(self.FDocPList(), data, printVariable);
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
            title: 'تایید حذف ؟',
            text: "آیا فرم چاپ انتخابی حذف شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                address = item.address;
                DeletePrintForm(address);
                GetPrintForms(sessionStorage.ModePrint);
            }
        })

    };

    $('#AddNewPrintForms').click(function () {
        printName = 'فرم جدید';
        printPublic = false;
        setReport(self.FDocPList(), '', printVariable);
    });


    $('#Print').click(function () {
        if (Serial == '')
            return showNotification('ابتدا فاکتور را ذخیره کنید', 0);
        getFDocP(Serial);
        if (self.FDocPList().length == 0)
            return showNotification('برای چاپ فاکتور حداقل یک بند الزامیست', 0);
        textFinalPrice = self.FDocPList()[0].FinalPrice.toPersianLetter() + titlePrice;
        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';
        printName = null;
        sessionStorage.ModePrint = sessionStorage.ModeCode;
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
        setReport(self.FDocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });
};

ko.applyBindings(new ViewModel());

