var ViewModel = function () {
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
    self.ErjDocErja = ko.observableArray([]); // لیست پرونده  


    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var ErjUsersUri = server + '/api/Web_Data/Web_ErjUsers/'; // آدرس ارجاع شونده / دهنده
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var DocB_LastUri = server + '/api/Web_Data/Web_ErjDocB_Last/'; // آدرس گزارش
    var DocB_LastCountUri = server + '/api/Web_Data/Web_ErjDocB_LastCount/'; // تعداد رکورد های گزارش
    var ErjDocErjaUri = server + '/api/Web_Data/Web_ErjDocErja/'; // آدرس  پرونده

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

    //Get ErjUsers List
    function getErjUsersList() {
        ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjUsersList(data);
            $('#ToUser').val(sessionStorage.userName);
            $('#FromUser').val('');

            //getDocB_Last();
        });
    }

    //Get ErjStatus List
    function getErjStatusList() {
        ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
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
        for (var i = 0; i <= counterErjCust - 1; i++) {
            if (i < counterErjCust - 1)
                ErjCust += list_ErjCustSelect[i] + '*';
            else
                ErjCust += list_ErjCustSelect[i];
        }

        var Khdt = '';
        for (var i = 0; i <= counterKhdt - 1; i++) {
            if (i < counterKhdt - 1)
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
            status: Status,
            custCode: ErjCust,
            khdtCode: Khdt,
            srchSt: SrchSt,
        };
        ajaxFunction(DocB_LastUri + aceErj + '/' + salErj + '/' + group, 'POST', DocB_LastObject).done(function (response) {
            self.DocB_LastList(response);
        });
    }

    //Get ErjDocErja
    function getErjDocErja(serialNumber) {
        var ErjDocErjaObject = {
            SerialNumber: serialNumber,
        };
        ajaxFunction(ErjDocErjaUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjDocErjaObject).done(function (response) {
            self.ErjDocErja(response);
            SetDataErjDocErja();
        });
    }


    self.FilterErjValue = ko.observable("");
    self.FilterErj = ko.computed(function () {
        var filter = self.FilterErjValue();
        return ko.utils.arrayFilter(self.ErjDocErja(), function (item) {
            return item.BandNo == filter;
        });
    });


    function ConvertComm(comm) {
        var res = comm.split("\r\n");
        tempText = '';
        for (var i = 0; i < res.length; i++) {
            tempText += '<p>' + res[i] + '</p> '
        }
        return tempText;
    }

    function SetDataErjDocErja() {
        list = self.ErjDocErja();
        countBand = list[list.length - 1].BandNo;
        $("#BodyErjDocErja").empty();
        for (var i = 1; i <= countBand; i++) {

            self.FilterErjValue(i);
            listBand = self.FilterErj();
            text = ConvertComm(listBand[0].RjComm);

            countRonevesht = listBand.length

            if (countRonevesht > 1) {
                text += ' <br\> '
            }

            for (var j = 1; j < countRonevesht; j++) {
                text +=
                    '  <div style="padding: 5px;margin: 0px 10px 0px 10px ;background-color: #29ceff !important; color: navy;"> '
                    + '   <div class=" form-inline" > <h6>' + listBand[j].FromUserName + '</h6>'
                    + '                    <h6>--></h6>'
                    + '                    <h6>' + listBand[j].ToUserName + '</h6></div>'
                    + '</div > '
                text += ' <div style="margin: 0px 15px 0px 10px"> ';
                if (listBand[j].RjComm == '')
                    text += '!! هنوز رویت نشده !!';
                else
                    text += ConvertComm(listBand[j].RjComm);
                text += ' </div> ';
            }

            if (listBand[0].RooneveshtUsers != '') {

                text += '</br>'
                    + '  <div style="padding: 5px;margin: 0px 10px 0px 10px ;background-color: #81f403 !important; color: navy;"> '
                    + '   <div class=" form-inline" > <h6> رونوشت به :'
                    + listBand[0].RooneveshtUsers
                    + '</h6>'
                    + '</div > '
                text += ' </div> ';
            }

            $('#BodyErjDocErja').append(
                '<div style="border-top: 0px solid #fff !important;">'
                + '    <div style="padding: 10px">'
                + '        <div class="cardErj">'
                + '            <div class="header bg-light-blue">'
                + '                    <div class=" form-inline"> <h6>' + i + ' ) ' + listBand[0].FromUserName + '</h6>'
                + '                    <h6>--></h6>'
                + '                    <h6>' + listBand[0].ToUserName + '</h6></div>'
                + '                    <div class="pull-left form-inline">'
                + '                        <h6 style ="padding-left: 10px">(' + listBand[0].RjTimeSt + ')</h6>'
                + '                        <h6>' + listBand[0].RjDate + '</h6>'
                + '                    </div>'
                + '                </div>'

                + '            <div class="body" style="padding:5px; border: #03a9f4 solid 1px;">'
                + text
                + '            </div>'
                + '        </div>'
                + '    </div>'
                + '</div>'
            );


        }
    }


    $("#CreateReport").click(function () {
        getDocB_Last();
    });

    $('#nameErjCust').val('همه موارد');
    $('#nameKhdt').val('همه موارد');

    self.currentPageDocB_Last = ko.observable();
    self.pageSizeDocB_Last = ko.observable(10);
    self.currentPageIndexDocB_Last = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");
    self.iconType = ko.observable("");

    self.filterDocB_Last0 = ko.observable("");
    self.filterDocB_Last1 = ko.observable("");
    self.filterDocB_Last2 = ko.observable("");
    self.filterDocB_Last3 = ko.observable("");
    self.filterDocB_Last4 = ko.observable("");
    self.filterDocB_Last5 = ko.observable("");
    self.filterDocB_Last6 = ko.observable("");
    self.filterDocB_Last7 = ko.observable("");
    self.filterDocB_Last8 = ko.observable("");
    self.filterDocB_Last9 = ko.observable("");

    self.filterDocB_LastList = ko.computed(function () {

        self.currentPageIndexDocB_Last(0);
        var filter0 = self.filterDocB_Last0().toUpperCase();
        var filter1 = self.filterDocB_Last1().toUpperCase();
        var filter2 = self.filterDocB_Last2().toUpperCase();
        var filter3 = self.filterDocB_Last3().toUpperCase();
        var filter4 = self.filterDocB_Last4().toUpperCase();
        var filter5 = self.filterDocB_Last5().toUpperCase();
        var filter6 = self.filterDocB_Last6().toUpperCase();
        var filter7 = self.filterDocB_Last7().toUpperCase();
        var filter8 = self.filterDocB_Last8().toUpperCase();
        var filter9 = self.filterDocB_Last9().toUpperCase();

        tempData = ko.utils.arrayFilter(self.DocB_LastList(), function (item) {
            result =
                (item.RjStatus == null ? '' : item.RjStatus.toString().search(filter0) >= 0) &&
                (item.RjDate == null ? '' : item.RjDate.toString().search(filter1) >= 0) &&
                (item.RjMhltDate == null ? '' : item.RjMhltDate.toString().search(filter2) >= 0) &&
                (item.CustName == null ? '' : item.CustName.toString().search(filter3) >= 0) &&
                (item.KhdtName == null ? '' : item.KhdtName.toString().search(filter4) >= 0) &&
                (item.FromUserName == null ? '' : item.FromUserName.toString().search(filter5) >= 0) &&
                (item.Spec == null ? '' : item.Spec.toString().search(filter6) >= 0) &&
                (item.Status == null ? '' : item.Status.toString().search(filter7) >= 0) &&
                (item.DocNo == null ? '' : item.DocNo.toString().search(filter8) >= 0) &&
                (item.MhltDate == null ? '' : item.MhltDate.toString().search(filter9) >= 0)
            return result;
        })
        return tempData;
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchDocB_Last);
    self.firstMatch = ko.dependentObservable(function () {
        var indexDocB_Last = 0;
        sessionStorage.searchDocB_Last = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexDocB_Last(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.DocB_LastList(), function (item) {
                indexDocB_Last += 1;
                return ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), search);
            });
            if (indexDocB_Last < self.pageSizeDocB_Last())
                self.currentPageIndexDocB_Last(0);
            else {
                var a = Math.round((indexDocB_Last / self.pageSizeDocB_Last()), 0);
                if (a < (indexDocB_Last / self.pageSizeDocB_Last())) a += 1;
                self.currentPageIndexDocB_Last(a - 1);
            }
            return value;
        }
    });


    self.currentPageDocB_Last = ko.computed(function () {
        var pageSizeDocB_Last = parseInt(self.pageSizeDocB_Last(), 10),
            startIndex = pageSizeDocB_Last * self.currentPageIndexDocB_Last(),
            endIndex = startIndex + pageSizeDocB_Last;
        return self.filterDocB_LastList().slice(startIndex, endIndex);
    });

    self.nextPageDocB_Last = function () {
        if (((self.currentPageIndexDocB_Last() + 1) * self.pageSizeDocB_Last()) < self.filterDocB_LastList().length) {
            self.currentPageIndexDocB_Last(self.currentPageIndexDocB_Last() + 1);
        }
    };

    self.previousPageDocB_Last = function () {
        if (self.currentPageIndexDocB_Last() > 0) {
            self.currentPageIndexDocB_Last(self.currentPageIndexDocB_Last() - 1);
        }
    };

    self.firstPageDocB_Last = function () {
        self.currentPageIndexDocB_Last(0);
    };

    self.lastPageDocB_Last = function () {
        tempCountDocB_Last = parseInt(self.filterDocB_LastList().length / self.pageSizeDocB_Last(), 10);
        if ((self.filterDocB_LastList().length % self.pageSizeDocB_Last()) == 0)
            self.currentPageIndexDocB_Last(tempCountDocB_Last - 1);
        else
            self.currentPageIndexDocB_Last(tempCountDocB_Last);
    };


    self.iconTypeRjStatus = ko.observable("");
    self.iconTypeRjDate = ko.observable("");
    self.iconTypeRjMhltDate = ko.observable("");
    self.iconTypeCustName = ko.observable("");
    self.iconTypeKhdtName = ko.observable("");
    self.iconTypeFromUserName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeDocNo = ko.observable("");
    self.iconTypeMhltDate = ko.observable("");

    self.sortTableDocB_Last = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.DocB_LastList.sort(function (left, right) {
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



        self.iconTypeRjStatus('');
        self.iconTypeRjDate('');
        self.iconTypeRjMhltDate('');
        self.iconTypeCustName('');
        self.iconTypeKhdtName('');
        self.iconTypeFromUserName('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
        self.iconTypeDocNo('');
        self.iconTypeMhltDate('');



        if (orderProp == 'RjStatus') self.iconTypeRjStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'RjDate') self.iconTypeRjDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'RjMhltDate') self.iconTypeRjMhltDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KhdtName') self.iconTypeKhdtName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FromUserName') self.iconTypeFromUserName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MhltDate') self.iconTypeMhltDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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

    self.AddErjCust = function (item) {
        ErjCustCode = item.Code;
        find = false;
        list_ErjCustSelect.forEach(function (item, key) {
            if (item == ErjCustCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableListErjCust').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_ErjCustSelect[counterErjCust] = item.Code;
            counterErjCust += 1;
        }
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
            counterErjCust = i + 1;
        }
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


    self.AddKhdt = function (item) {
        KhdtCode = item.Code;
        find = false;
        list_KhdtSelect.forEach(function (item, key) {
            if (item == KhdtCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableListKhdt').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_KhdtSelect[counterKhdt] = item.Code;
            counterKhdt += 1;
        }
    };


    self.AddAllKhdt = function () {
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

    self.DelAllKhdt = function () {
        list_KhdtSelect = new Array();
        counterKhdt = 0;
        $("#TableBodyListKhdt").empty();
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

    $('#ErjaMode').change(function () {
        var erjaMode = $('#ErjaMode').val();
        if (erjaMode == 1) {
            $('#ToUser').val(sessionStorage.userName);
            $('#FromUser').val('');
        }
        else {
            $('#ToUser').val('');
            $('#FromUser').val(sessionStorage.userName);
        }

    })

    $('.fix').attr('class', 'form-line date focused fix');


    self.ViewErjDocErja = function (Band) {
        var a = 1;
        $("#eghdamComm").val(Band.EghdamComm);
        $("#docDesc").val(Band.DocDesc);
        $("#specialComm").val(Band.SpecialComm);
        $("#finalComm").val(Band.FinalComm);
        getErjDocErja(Band.SerialNumber);
    }


    $('#btn-eghdamComm').click(function () {
        text = $('#eghdamComm').val();
        $("#comm").val(text);
    })

    $('#btn-DocDesc').click(function () {
        text = $('#docDesc').val();
        $("#comm").val(text);
    })

    $('#btn-specialComm').click(function () {
        text = $('#specialComm').val();
        $("#comm").val(text);
    })

    $('#btn-finalComm').click(function () {
        text = $('#finalComm').val();
        $("#comm").val(text);
    })

};

ko.applyBindings(new ViewModel());

