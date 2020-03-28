var ViewModel = function() {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'ERJ1';
    var salErj = '0000';

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.ErjUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.DocB_LastList = ko.observableArray([]); // لیست گزارش  


    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var ErjUsersUri = server + '/api/Web_Data/Web_ErjUsers/'; // آدرس ارجاع شونده / دهنده
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var DocB_LastUri = server + '/api/Web_Data/ErjDocB_Last/'; // آدرس گزارش
    var DocB_LastCountUri = server + '/api/Web_Data/ErjDocB_LastCount/'; // تعداد رکورد های گزارش

    self.AzDocDate = ko.observable('');
    self.TaDocDate = ko.observable('');
    self.AzRjDate = ko.observable('');
    self.TaRjDate = ko.observable('');
    self.AzMhltDate = ko.observable('');
    self.TaMhltDate = ko.observable('');

    var allSearchErjCust = true;

    var ErjCustCode = '';
    var counterErjCust = 0;
    var counterKhdt = 0;
    self.Status = ko.observable();

    var list_ErjCustSelect = new Array()
    var list_KhdtSelect = new Array()

    $("#textTotal").text('');

    //Get ErjCust List
    function getErjCustList() {
        ajaxFunction(ErjCustUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function(data) {
            self.ErjCustList(data);
        });
    }

    //Get Khdt List
    function getKhdtList() {
        ajaxFunction(KhdtUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function(data) {
            self.KhdtList(data);
        });
    }

    //Get ErjUsers List
    function getErjUsersList() {
        ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function(data) {
            self.ErjUsersList(data);
        });
    }

    //Get ErjStatus List
    function getErjStatusList() {
        ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function(data) {
            self.ErjStatusList(data);
        });
    }


    getErjStatusList();
    getErjCustList();
    getKhdtList();
    getErjUsersList();

    function AddErjaMode() {
        select = document.getElementById('ErjaMode');
        for (var i = 1; i <= 2; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = i;
                opt.innerHTML = 'دریافتی';
                opt.selected = true;
            }
            if (i == 2) {
                opt.value = i;
                opt.innerHTML = 'ارسالی';
            }
            select.appendChild(opt);
        }
    }

    function AddDocBMode() {
        select = document.getElementById('DocBMode');
        for (var i = 1; i <= 6; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = i;
                opt.innerHTML = 'کليه ارجاعات و رونوشتها';
            }
            if (i == 2) {
                opt.value = i;
                opt.innerHTML = 'کليه ارجاعات اصلی';
            } 
            if (i == 3) {
                opt.value = i;
                opt.innerHTML = 'کليه رونوشتها';
            }
            if (i == 4) {
                opt.value = i;
                opt.innerHTML = 'اخرين ارجاع و رونوشتها';
                opt.selected = true;
            }
            if (i == 5) {
                opt.value = i;
                opt.innerHTML = 'اخرين ارجاعات اصلی';
            }
            if (i == 6) {
                opt.value = i;
                opt.innerHTML = 'اخرين رونوشتها';
            }
            select.appendChild(opt);
        }
    }


    AddDocBMode();
    AddErjaMode();


    //Get DocB_Last
    function getDocB_Last() {

        ErjaMode = $("#ErjaMode").val();
        if (ErjaMode == null) ErjaMode = -1;

        DocBMode = $("#DocBMode").val();
        if (DocBMode == null) DocBMode = -1;

        ToUser = $("#ToUser").val();
        if (ToUser == null) ToUser = "";

        FromUser = $("#FromUser").val();
        if (FromUser == null) FromUser = "";


        AzDocDate = $("#azDocDate").val().toEnglishDigit();
        TaDocDate = $("#taDocDate").val().toEnglishDigit();

        AzRjDate = $("#azRjDate").val().toEnglishDigit();
        TaRjDate = $("#taRjDate").val().toEnglishDigit();

        AzMhltDate = $("#azMhltDate").val().toEnglishDigit();
        TaMhltDate = $("#taMhltDate").val().toEnglishDigit();


        Status = $("#status").val();
        if (Status == null) Status = "";

        SrchSt = $("#SrchSt").val();
        if (SrchSt == null) SrchSt = "";

       

        var ErjCust = '';
        for (var i = 1; i <= counterErjCust; i++) {
            if (i < counterErjCust)
                ErjCust += list_ErjCustSelect[i] + '*';
            else
                ErjCust += list_ErjCustSelect[i];
        }

        var Khdt = '';
        for (var i = 1; i <= counterKhdt; i++) {
            if (i < counterKhdt)
                Khdt += list_KhdtSelect[i] + '*';
            else
                Khdt += list_KhdtSelect[i];
        }

        var DocB_LastObject = {
            erjaMode: ErjaMode,
            docBMode: DocBMode,
            fromUserCode: FromUser,
            toUserCode: ToUser,
            azDocDate: AzDocDate,
            taDocDate: TaDocDate,
            azRjDate: AzRjDate,
            taRjDate: TaRjDate,
            azMhltDate: AzMhltDate,
            taMhltDate: TaMhltDate,
            Status: Status,
            CustCode: ErjCust,
            KhdtCode: Khdt,
            SrchSt: SrchSt,
        };
        ajaxFunction(DocB_LastUri + aceErj + '/' + salErj + '/' + group, 'POST', DocB_LastObject).done(function(response) {
            self.DocB_LastList(response);
        });
    }


    $("#CreateReport").click(function() {
        getDocB_Last();
    });
































    self.currentPageErjCust = ko.observable();
    self.pageSizeErjCust = ko.observable(10);
    self.currentPageIndexErjCust = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.filterErjCust0 = ko.observable("");
    self.filterErjCust1 = ko.observable("");
    self.filterErjCust2 = ko.observable("");

    self.filterErjCustList = ko.computed(function() {
        self.currentPageIndexErjCust(0);
        var filter0 = self.filterErjCust0().toUpperCase();
        var filter1 = self.filterErjCust1().toUpperCase();
        var filter2 = self.filterErjCust2().toUpperCase();

        if (!filter0 && !filter1 && !filter2) {
            return self.ErjCustList();
        } else {
            tempData = ko.utils.arrayFilter(self.ErjCustList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });

    self.currentPageErjCust = ko.computed(function() {
        var pageSizeErjCust = parseInt(self.pageSizeErjCust(), 10),
            startIndex = pageSizeErjCust * self.currentPageIndexErjCust(),
            endIndex = startIndex + pageSizeErjCust;
        return self.filterErjCustList().slice(startIndex, endIndex);
    });

    self.nextPageErjCust = function() {
        if (((self.currentPageIndexErjCust() + 1) * self.pageSizeErjCust()) < self.filterErjCustList().length) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() + 1);
        }
    };

    self.previousPageErjCust = function() {
        if (self.currentPageIndexErjCust() > 0) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() - 1);
        }
    };

    self.firstPageErjCust = function() {
        self.currentPageIndexErjCust(0);
    };

    self.lastPageErjCust = function() {
        countErjCust = parseInt(self.filterErjCustList().length / self.pageSizeErjCust(), 10);
        if ((self.filterErjCustList().length % self.pageSizeErjCust()) == 0)
            self.currentPageIndexErjCust(countErjCust - 1);
        else
            self.currentPageIndexErjCust(countErjCust);
    };

    self.sortTableErjCust = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.ErjCustList.sort(function(left, right) {
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

    self.AddErjCust = function(item) {
        ErjCustCode = item.Code;
        find = false;
        list_ErjCustSelect.forEach(function(item, key) {
            if (item == ErjCustCode) {
                find = true;
            }
        });

        if (find == false) {
            counterErjCust = counterErjCust + 1;
            list_ErjCustSelect[counterErjCust] = item.Code;

            $('#TableListErjCust').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
        }
    };


    self.AddAllErjCust = function() {
        list_ErjCustSelect = new Array();
        list = self.ErjCustList();
        $("#TableBodyListErjCust").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableListErjCust').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_ErjCustSelect[i] = list[i].Code;
            counterErjCust = i + 1;
        }
    };

    self.DelAllErjCust = function() {
        list_ErjCustSelect = new Array();
        counterErjCust = 0;
        $("#TableBodyListErjCust").empty();
    };


    $('#modal-ErjCust').on('hide.bs.modal', function() {
        if (counterErjCust > 0)
            $('#nameErjCust').val(counterErjCust + ' مورد انتخاب شده ')
        else
            $('#nameErjCust').val('همه موارد');
    });

    $('#modal-ErjCust').on('shown.bs.modal', function() {
        $('.fix').attr('class', 'form-line focused fix');
    });


    $('#refreshErjCust').click(function() {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست مشتری ها به روز رسانی شود ؟",
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
                getErjCustList();
                $("div.loadingZone").hide();
            }
        })
    })

    self.currentPageKhdt = ko.observable();
    self.pageSizeKhdt = ko.observable(10);
    self.currentPageIndexKhdt = ko.observable(0);

    self.filterKhdt0 = ko.observable("");
    self.filterKhdt1 = ko.observable("");
    self.filterKhdt2 = ko.observable("");


    self.filterKhdtList = ko.computed(function() {

        self.currentPageIndexKhdt(0);
        var filter0 = self.filterKhdt0().toUpperCase();
        var filter1 = self.filterKhdt1().toUpperCase();
        var filter2 = self.filterKhdt2().toUpperCase();

        if (!filter0 && !filter1 && !filter2) {
            return self.KhdtList();
        } else {
            tempData = ko.utils.arrayFilter(self.KhdtList(), function(item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKhdt = ko.computed(function() {
        var pageSizeKhdt = parseInt(self.pageSizeKhdt(), 10),
            startIndex = pageSizeKhdt * self.currentPageIndexKhdt(),
            endIndex = startIndex + pageSizeKhdt;
        return self.filterKhdtList().slice(startIndex, endIndex);
    });

    self.nextPageKhdt = function() {
        if (((self.currentPageIndexKhdt() + 1) * self.pageSizeKhdt()) < self.filterKhdtList().length) {
            self.currentPageIndexKhdt(self.currentPageIndexKhdt() + 1);
        }
    };

    self.previousPageKhdt = function() {
        if (self.currentPageIndexKhdt() > 0) {
            self.currentPageIndexKhdt(self.currentPageIndexKhdt() - 1);
        }
    };

    self.firstPageKhdt = function() {
        self.currentPageIndexKhdt(0);
    };

    self.lastPageKhdt = function() {
        countKhdt = parseInt(self.filterKhdtList().length / self.pageSizeKhdt(), 10);
        if ((self.filterKhdtList().length % self.pageSizeKhdt()) == 0)
            self.currentPageIndexKhdt(countKhdt - 1);
        else
            self.currentPageIndexKhdt(countKhdt);
    };

    self.sortTableKhdt = function(viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.KhdtList.sort(function(left, right) {
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


    self.AddKhdt = function(item) {
        KhdtCode = item.Code;
        find = false;
        list_KhdtSelect.forEach(function(item, key) {
            if (item == KhdtCode) {
                find = true;
            }
        });

        if (find == false) {
            counterKhdt = counterKhdt + 1;
            list_KhdtSelect[counterKhdt] = item.Code;

            $('#TableListKhdt').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
        }
    };


    self.AddAllKhdt = function() {
        list_KhdtSelect = new Array();
        list = self.KhdtList();
        $("#TableBodyListKhdt").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableListKhdt').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_KhdtSelect[i] = list[i].Code;
            counterKhdt = i + 1;
        }
    };

    self.DelAllKhdt = function() {
        list_KhdtSelect = new Array();
        counterKhdt = 0;
        $("#TableBodyListKhdt").empty();
    };


    $('#modal-Khdt').on('hide.bs.modal', function() {
        if (counterKhdt > 0)
            $('#nameKhdt').val(counterKhdt + ' مورد انتخاب شده ')
        else
            $('#nameKhdt').val('همه موارد');
    });

    $('#modal-Khdt').on('shown.bs.modal', function() {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.delselectKhdt = function() {
        $(this).closest("tr").remove();
    };

    $('#refreshKhdt').click(function() {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "نوع کار ها به روز رسانی شود ؟",
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
                getKhdtList();
                $("div.loadingZone").hide();
            }
        })
    })

    $('.fix').attr('class', 'form-line date focused fix');
};

ko.applyBindings(new ViewModel());

