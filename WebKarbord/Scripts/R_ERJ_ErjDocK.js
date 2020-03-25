var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'ERJ1';//sessionStorage.ace;
    var salErj = '0000';//sessionStorage.sal;

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.DocKList = ko.observableArray([]); // لیست گزارش  


    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 

    var DocKUri = server + '/api/Web_Data/ErjDocK/'; // آدرس گزارش
    var DocKCountUri = server + '/api/Web_Data/ErjDocKCount/'; // تعداد رکورد های گزارش

    self.AzDate = ko.observable('');
    self.TaDate = ko.observable('');

    

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
        ajaxFunction(ErjCustUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjCustList(data);
        });
    }

    //Get Khdt List
    function getKhdtList() {
        ajaxFunction(KhdtUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.KhdtList(data);
        });
    }

    //Get ErjStatus List
    function getErjStatusList() {
        ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjStatusList(data);
        });
    }

    //Get DocK
    function getDocK() {
        tarikh1 = $("#aztarikh").val().toEnglishDigit();
        tarikh2 = $("#tatarikh").val().toEnglishDigit();

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

        var DocKObject = {
            azTarikh: tarikh1,  
            taTarikh: tarikh2,
            Status: Status,  
            CustCode: ErjCust,
            KhdtCode: Khdt,
            SrchSt: SrchSt,
        };
        ajaxFunction(DocKUri + aceErj + '/' + salErj + '/' + group, 'POST', DocKObject).done(function (response) {
            self.DocKList(response);
        });
    }


    $("#CreateReport").click(function () {
        getDocK();
    });


    getErjStatusList();
    getErjCustList();
    getKhdtList();

    $('#nameErjCust').val('همه موارد');
    $('#nameKhdt').val('همه موارد');


    self.currentPageDocK = ko.observable();
    self.pageSizeDocK = ko.observable(10);
    self.currentPageIndexDocK = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterDocK0 = ko.observable("");
    self.filterDocK1 = ko.observable(""); 
    self.filterDocK2 = ko.observable("");
    self.filterDocK3 = ko.observable("");
    self.filterDocK4 = ko.observable("");
    self.filterDocK5 = ko.observable("");
    self.filterDocK6 = ko.observable("");
    self.filterDocK7 = ko.observable("");
    self.filterDocK8 = ko.observable("");
    self.filterDocK9 = ko.observable("");
    self.filterDocK10 = ko.observable("");
    self.filterDocK11 = ko.observable("");
    self.filterDocK12 = ko.observable("");
    self.filterDocK13 = ko.observable("");
    self.filterDocK14 = ko.observable("");
    self.filterDocK15 = ko.observable("");
    self.filterDocK16 = ko.observable("");
    self.filterDocK17 = ko.observable("");
    self.filterDocK18 = ko.observable("");

    self.filterDocKList = ko.computed(function () {

        self.currentPageIndexDocK(0);
        var filter0 = self.filterDocK0().toUpperCase();
        var filter1 = self.filterDocK1().toUpperCase();
        var filter2 = self.filterDocK2().toUpperCase();
        var filter3 = self.filterDocK3().toUpperCase();
        var filter4 = self.filterDocK4().toUpperCase();
        var filter5 = self.filterDocK5().toUpperCase();
        var filter6 = self.filterDocK6().toUpperCase();
        var filter7 = self.filterDocK7().toUpperCase();
        var filter8 = self.filterDocK8().toUpperCase();
        var filter9 = self.filterDocK9().toUpperCase();
        var filter10 = self.filterDocK10().toUpperCase();
        var filter11 = self.filterDocK11().toUpperCase();
        var filter12 = self.filterDocK12().toUpperCase();
        var filter13 = self.filterDocK13().toUpperCase();
        var filter14 = self.filterDocK14().toUpperCase();
        var filter15 = self.filterDocK15().toUpperCase();
        var filter16 = self.filterDocK16().toUpperCase();
        var filter17 = self.filterDocK17().toUpperCase();
        var filter18 = self.filterDocK18().toUpperCase();


        tempData = ko.utils.arrayFilter(self.DocKList(), function (item) {
             result =
              (item.DocNo == null ? '' : item.DocNo.toString().search(filter0) >= 0) &&
             (item.DocDate == null ? '' : item.DocDate.toString().search(filter1) >= 0) &&
             (item.MahramanehName == null ? '' : item.MahramanehName.toString().search(filter2) >= 0) &&
             (item.Eghdam == null ? '' : item.Eghdam.toString().search(filter3) >= 0) &&
             (item.Tanzim == null ? '' : item.Tanzim.toString().search(filter4) >= 0) &&
             (item.AmalDate == null ? '' : item.AmalDate.toString().search(filter5) >= 0) &&
             (item.MhltDate == null ? '' : item.MhltDate.toString().search(filter6) >= 0) &&
             (item.EndDate == null ? '' : item.EndDate.toString().search(filter7) >= 0) &&
             (item.CustCode == null ? '' : item.CustCode.toString().search(filter8) >= 0) &&
             (item.CustName == null ? '' : item.CustName.toString().search(filter9) >= 0) &&
             (item.DocDesc == null ? '' : item.DocDesc.toString().search(filter10) >= 0) &&
             (item.EghdamComm == null ? '' : item.EghdamComm.toString().search(filter11) >= 0) &&
             (item.FinalComm == null ? '' : item.FinalComm.toString().search(filter12) >= 0) &&
             (item.SpecialComm == null ? '' : item.SpecialComm.toString().search(filter13) >= 0) &&
             (item.Status == null ? '' : item.Status.toString().search(filter14) >= 0) &&
             (item.Spec == null ? '' : item.Spec.toString().search(filter15) >= 0) &&
             (item.KhdtName == null ? '' : item.KhdtName.toString().search(filter16) >= 0) &&
            // (item.RjTime == null ? '' : item.RjTime.toString().search(filter17) >= 0) &&
             ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filter18) 

            return result;
        })
        return tempData;
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchDocK);
    self.firstMatch = ko.dependentObservable(function () {
        var indexDocK = 0;
        sessionStorage.searchDocK = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexDocK(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.DocKList(), function (item) {
                indexDocK += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexDocK < self.pageSizeDocK())
                self.currentPageIndexDocK(0);
            else {
                var a = Math.round((indexDocK / self.pageSizeDocK()), 0);
                if (a < (indexDocK / self.pageSizeDocK())) a += 1;
                self.currentPageIndexDocK(a - 1);
            }
            return value;
        }
    });


    self.currentPageDocK = ko.computed(function () {
        var pageSizeDocK = parseInt(self.pageSizeDocK(), 10),
            startIndex = pageSizeDocK * self.currentPageIndexDocK(),
            endIndex = startIndex + pageSizeDocK;
        return self.filterDocKList().slice(startIndex, endIndex);
    });

    self.nextPageDocK = function () {
        if (((self.currentPageIndexDocK() + 1) * self.pageSizeDocK()) < self.filterDocKList().length) {
            self.currentPageIndexDocK(self.currentPageIndexDocK() + 1);
        }
    };

    self.previousPageDocK = function () {
        if (self.currentPageIndexDocK() > 0) {
            self.currentPageIndexDocK(self.currentPageIndexDocK() - 1);
        }
    };

    self.firstPageDocK = function () {
        self.currentPageIndexDocK(0);
    };

    self.lastPageDocK = function () {
        tempCountDocK = parseInt(self.filterDocKList().length / self.pageSizeDocK(), 10);
        if ((self.filterDocKList().length % self.pageSizeDocK()) == 0)
            self.currentPageIndexDocK(tempCountDocK - 1);
        else
            self.currentPageIndexDocK(tempCountDocK);
    };




    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeMahramanehName = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeAmalDate = ko.observable("");
    self.iconTypeMhltDate = ko.observable("");
    self.iconTypeEndDate = ko.observable("");
    self.iconTypeCustCode = ko.observable("");
    self.iconTypeCustName = ko.observable("");
    self.iconTypeDocDesc = ko.observable("");
    self.iconTypeEghdamComm = ko.observable("");
    self.iconTypeFinalComm = ko.observable("");
    self.iconTypeSpecialComm = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeKhdtName = ko.observable("");
    //self.RjTime = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");

    self.sortTableDocK = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.DocKList.sort(function (left, right) {
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
        self.iconTypeMahramanehName('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeAmalDate('');
        self.iconTypeMhltDate('');
        self.iconTypeEndDate('');
        self.iconTypeCustCode('');
        self.iconTypeCustName('');
        self.iconTypeDocDesc('');
        self.iconTypeEghdamComm('');
        self.iconTypeFinalComm('');
        self.iconTypeSpecialComm('');
        self.iconTypeStatus('');
        self.iconTypeSpec('');
        self.iconTypeKhdtName('');
       // self.iconTypeRjTime('');
        self.iconTypeSerialNumber('');

                          

        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MahramanehName') self.iconTypeMahramanehName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AmalDate') self.iconTypeAmalDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MhltDate') self.iconTypeMhltDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'EndDate') self.iconTypeEndDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustCode') self.iconTypeCustCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDesc') self.iconTypeDocDesc((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'EghdamComm') self.iconTypeEghdamComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FinalComm') self.iconTypeFinalComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SpecialComm') self.iconTypeSpecialComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KhdtName') self.iconTypeKhdtName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
       // if (orderProp == 'RjTime') self.iconTypeRjTime((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };











































































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


    self.filterErjCustList = ko.computed(function () {

        self.currentPageIndexErjCust(0);
        var filter0 = self.filterErjCust0().toUpperCase();
        var filter1 = self.filterErjCust1().toUpperCase();
        var filter2 = self.filterErjCust2().toUpperCase();


        if (!filter0 && !filter1 && !filter2) {
            return self.ErjCustList();
        } else {
            tempData = ko.utils.arrayFilter(self.ErjCustList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageErjCust = ko.computed(function () {
        var pageSizeErjCust = parseInt(self.pageSizeErjCust(), 10),
            startIndex = pageSizeErjCust * self.currentPageIndexErjCust(),
            endIndex = startIndex + pageSizeErjCust;
        return self.filterErjCustList().slice(startIndex, endIndex);
    });

    self.nextPageErjCust = function () { 
        if (((self.currentPageIndexErjCust() + 1) * self.pageSizeErjCust()) < self.filterErjCustList().length) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() + 1);
        }
    };

    self.previousPageErjCust = function () { 
        if (self.currentPageIndexErjCust() > 0) {
            self.currentPageIndexErjCust(self.currentPageIndexErjCust() - 1);
        }
    };

    self.firstPageErjCust = function () {
        self.currentPageIndexErjCust(0);
    };

    self.lastPageErjCust = function () {
        countErjCust = parseInt(self.filterErjCustList().length / self.pageSizeErjCust(), 10);
        if ((self.filterErjCustList().length % self.pageSizeErjCust()) == 0)
            self.currentPageIndexErjCust(countErjCust - 1);
        else
            self.currentPageIndexErjCust(countErjCust);
    };

    self.sortTableErjCust = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.ErjCustList.sort(function (left, right) {
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



   // self.SelectErjCustList = function (item) {
      //  alert(document.getElementById("TableSelectedErjCust").rows.item(0).innerHTML);
    //};

    //function highlight(e) {
    //    if (selected[0]) selected[0].className = '';
    //    e.target.parentNode.className = 'selected';
    //}

   // var tableErjCust = document.getElementById('TableErjCust'),
    //    selected = tableErjCust.getElementsByClassName('selected');
    //tableErjCust.onclick = highlight;

    // var tableListErjCust = document.getElementById('TableListErjCust'),
   //     selected = tableListErjCust.getElementsByClassName('selected');
    //tableListErjCust.onclick = highlight;



    self.AddErjCust = function (item) {
        ErjCustCode = item.Code;
        find = false;
        list_ErjCustSelect.forEach(function (item, key) {
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
        //$('#nameErjCust').val('(' + item.Code + ') ' + item.Name);
        //$('.fix').attr('class', 'form-line date focused fix');
    };


    self.AddAllErjCust = function () {
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
            counterErjCust = i+1;
        }
    };

    self.DelErjCust = function () {
        ///$("#TableSelectedErjCust td").parent().remove();
        var table = document.getElementById("TableListErjCust");
        table.deleteRow(1);
    };

    self.DelAllErjCust = function () {
        list_ErjCustSelect = new Array();
        counterErjCust = 0;
        $("#TableBodyListErjCust").empty();
    };

    $('#modal-ErjCust').on('hide.bs.modal', function () {
        if (counterErjCust > 0)
            $('#nameErjCust').val(counterErjCust + ' مورد انتخاب شده ')
        else
            $('#nameErjCust').val('همه موارد');
    });

    $('#modal-ErjCust').on('shown.bs.modal', function () {
            $('.fix').attr('class', 'form-line focused fix');
    });


    self.delErjCust = function () {
        $(this).closest("tr").remove();
        //$('#nameErjCust').val('(' + item.Code + ') ' + item.Name);
        //$('.fix').attr('class', 'form-line date focused fix');
    };

    $('#refreshErjCust').click(function () {
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


    self.filterKhdtList = ko.computed(function () {

        self.currentPageIndexKhdt(0);
        var filter0 = self.filterKhdt0().toUpperCase();
        var filter1 = self.filterKhdt1().toUpperCase();
        var filter2 = self.filterKhdt2().toUpperCase();


        if (!filter0 && !filter1 && !filter2) {
            return self.KhdtList();
        } else {
            tempData = ko.utils.arrayFilter(self.KhdtList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageKhdt = ko.computed(function () {
        var pageSizeKhdt = parseInt(self.pageSizeKhdt(), 10),
            startIndex = pageSizeKhdt * self.currentPageIndexKhdt(),
            endIndex = startIndex + pageSizeKhdt;
        return self.filterKhdtList().slice(startIndex, endIndex);
    });

    self.nextPageKhdt = function () {
        if (((self.currentPageIndexKhdt() + 1) * self.pageSizeKhdt()) < self.filterKhdtList().length) {
            self.currentPageIndexKhdt(self.currentPageIndexKhdt() + 1);
        }
    };

    self.previousPageKhdt = function () {
        if (self.currentPageIndexKhdt() > 0) {
            self.currentPageIndexKhdt(self.currentPageIndexKhdt() - 1);
        }
    };

    self.firstPageKhdt = function () {
        self.currentPageIndexKhdt(0);
    };

    self.lastPageKhdt = function () {
        countKhdt = parseInt(self.filterKhdtList().length / self.pageSizeKhdt(), 10);
        if ((self.filterKhdtList().length % self.pageSizeKhdt()) == 0)
            self.currentPageIndexKhdt(countKhdt - 1);
        else
            self.currentPageIndexKhdt(countKhdt);
    };

    self.sortTableKhdt = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.KhdtList.sort(function (left, right) {
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


    self.selectKhdt = function (item) {
        KhdtCode = item.Code;
        find = false;
        list_KhdtSelect.forEach(function (item, key) {
            if (item == KhdtCode) {
                find = true;
            }
        });

        if (find == false) {
            counterKhdt = counterKhdt + 1;
            list_KhdtSelect[counterKhdt] = item.Code;

            $('#TableSelectedKhdt').append(
                '<tr data-bind=" event: { dblclick: delselectKhdt }">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
        }
        //$('#nameKhdt').val('(' + item.Code + ') ' + item.Name);
        //$('.fix').attr('class', 'form-line date focused fix');
    };



    $('#modal-Khdt').on('hide.bs.modal', function () {
        if (counterKhdt > 0)
            $('#nameKhdt').val(counterKhdt + ' مورد انتخاب شده ')
        else
            $('#nameKhdt').val('همه موارد');
    });

    $('#modal-Khdt').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.delselectKhdt = function () {
        $(this).closest("tr").remove();
        //$('#nameKhdt').val('(' + item.Code + ') ' + item.Name);
        //$('.fix').attr('class', 'form-line date focused fix');
    };

    $('#refreshKhdt').click(function () {
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

