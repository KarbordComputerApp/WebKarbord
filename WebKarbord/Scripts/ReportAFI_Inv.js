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
        //var storedNames = JSON.parse(sessionStorage.getItem("Thvl"));
        //self.ThvlList(storedNames);
        ajaxFunction(ThvlUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.ThvlList(data);
        });
    }

    //Get kala List
    function getKalaList() {
        //var storedNames = JSON.parse(sessionStorage.getItem("kala"));
        //self.KalaList(storedNames);
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
        return self.InvList().length > 0 ? 'همه انبار ها' : 'انبار تعریف نشده است';
    });

    getInvList();
    getThvlList();
    getKalaList();


    self.currentPageThvl = ko.observable();
    self.currentPageKala = ko.observable();

    self.pageSizeThvl = ko.observable(10);
    self.pageSizeKala = ko.observable(10);
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

};

ko.applyBindings(new ViewModel());

