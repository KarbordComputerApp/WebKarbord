var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'Web2';
    var salErj = '0000';

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    var serialNumber = 0;
    var bandNo = 0;

    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.ErjUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 

    self.MahramanehList = ko.observableArray([]); // لیست محرمانه 
    self.ErjResultList = ko.observableArray([]); // لیست نتیجه 

    self.DocB_LastList = ko.observableArray([]); // لیست گزارش  
    self.ErjDocErja = ko.observableArray([]); // لیست پرونده  
    self.DocKList = ko.observableArray([]); // لیست گزارش پرونده


    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var ErjUsersUri = server + '/api/Web_Data/Web_ErjUsers/'; // آدرس ارجاع شونده / دهنده
    var MahramanehUri = server + '/api/Web_Data/Web_Mahramaneh/'; // آدرس محرمانه
    var ErjResultUri = server + '/api/Web_Data/Web_ErjResult/'; // آدرس نتیجه
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var DocB_LastUri = server + '/api/Web_Data/Web_ErjDocB_Last/'; // آدرس گزارش
    var ErjDocErjaUri = server + '/api/Web_Data/Web_ErjDocErja/'; // آدرس  پرونده
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var DocKUri = server + '/api/Web_Data/ErjDocK/'; // آدرس گزارش پرونده
    var DocBIUri = server + '/api/Web_Data/ErjDocB_I/'; // آدرس ذخیره ارجاع


    self.AzDocDate = ko.observable('');
    self.TaDocDate = ko.observable('');
    self.AzRjDate = ko.observable('');
    self.TaRjDate = ko.observable('');
    self.AzMhltDate = ko.observable('');
    self.TaMhltDate = ko.observable('');
    self.e_MhltErja = ko.observable('');
    self.ErjUsersCode = ko.observable();

    var allSearchErjCust = true;

    var ErjCustCode = '';
    var counterErjCust = 0;
    var counterKhdt = 0;
    self.Status = ko.observable();

    var ErjUsersRoneveshtCode = '';
    var counterErjUsersRonevesht = 0;
    var list_ErjUsersRoneveshtSelect = new Array();

    var list_ErjCustSelect = new Array()
    var list_KhdtSelect = new Array()

    $("#textTotal").text('');


    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'ErjDocB_Last';
    var columns = [
        'RjStatus',
        'RjDate',
        'RjMhltDate',
        'CustName',
        'KhdtName',
        'FromUserName',
        'Spec',
        'Status',
        'DocNo',
        'MhltDate'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            self.SettingColumnList(data);
            if (FlagSetting) {
                CreateTableReport(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }
        });

    }

    //Get RprtColsDefult List
    function getRprtColsDefultList() {
        ajaxFunction(RprtColsDefultUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(aceErj, salErj, group, rprtId, "/ReportERJ/ErjDocB_Last", columns, self.SettingColumnList());
    });

    $('#modal-SettingColumn').on('show.bs.modal', function () {
        counterColumn = 0;
        getRprtColsList(false, sessionStorage.userName);
    });

    $('#AllSettingColumns').change(function () {
        var allCheck = $('#AllSettingColumns').is(':checked');
        for (var i = 1; i <= columns.length; i++) {
            $('#SettingColumns' + i).prop('checked', allCheck);
        }
    });

    $('#DefultColumn').click(function () {
        $('#AllSettingColumns').prop('checked', false);
        getRprtColsDefultList();
    });

    getRprtColsList(true, sessionStorage.userName);






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
        });
    }

    //Get Mahramaneh List
    function getMahramanehList() {
        ajaxFunction(MahramanehUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.MahramanehList(data);
        });
    }

    //Get ErjResult List
    function getErjResultList(serialNumber) {
        ajaxFunction(ErjResultUri + aceErj + '/' + salErj + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.ErjResultList(data);
            item = data[0];
            $("#Result").val(item.RjResult);
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
    getMahramanehList();

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
        //for (var i = 1; i <= countBand; i++) {

        for (var i = countBand; i >= 1; i--) {
            self.FilterErjValue(i);
            listBand = self.FilterErj();
            text = ConvertComm(listBand[0].RjComm);

            countRonevesht = listBand.length

            if (countRonevesht > 1) {
                text += ' <br\> '
            }

            for (var j = 1; j < countRonevesht; j++) {
                text +=
                    '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                    + '   <div class=" form-inline" > <h6>' + listBand[j].FromUserName + '</h6>'
                    + '   <img src="/Content/img/new item/arrow-back-svgrepo-com.svg" style="width: 14px;margin-left: 3px; margin-right: 3px;" /> '
                    + '   <h6>' + listBand[j].ToUserName + '</h6></div>'
                    + '</div > '
                if (listBand[j].RjComm == '')
                    text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;"> هنوز رویت نشده';
                else {
                    text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                    text += ConvertComm(listBand[j].RjComm);
                }
                text += ' </div> ';
            }

            if (listBand[0].RooneveshtUsers != '') {

                text += '</br>'
                    + '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #d9d9d9 !important;color: #555555;border-radius: 10px;">'
                    + '   <div class=" form-inline" > <h6> رونوشت به : '
                    + listBand[0].RooneveshtUsers
                    + '</h6>'
                    + '</div > '
                text += ' </div> ';
            }

            $('#BodyErjDocErja').append(
                '<div style="border-top: 0px solid #fff !important;">'
                + '    <div>'
                + '        <div class="cardErj">'
                + '            <div class="header" style="background-color: #f5d3b4;">'
                + '<div class="form-inline"> '
                + '     <div class= "col-md-9 form-inline" > '
                + '         <h6>' + i + ' ) ' + listBand[0].FromUserName + '</h6>'
                + '         <img src="/Content/img/new item/arrow-back-svgrepo-com.svg" style="width: 14px;margin-left: 3px; margin-right: 3px;" /> '
                + '         <h6>' + listBand[0].ToUserName + '</h6> '
                + '     </div>'
                + '     <div class="col-md-3 form-inline"> '
                + '         <h6 style="padding-left: 10px">(1:0)</h6> '
                + '         <h6>1399/01/12</h6> '
                + '     </div> '
                + '</div>'
                + '</div>'
                + '            <div class="body" style="padding:10px;">'
                + text
                + '            </div>'
                + '        </div>'
                + '    </div>'
                + '</div>'
            );


        }
    }


    $("#CreateReport").click(function () {
        //$('#ToUser').val(sessionStorage.userName);
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


    self.filterRjStatus = ko.observable("");
    self.filterRjDate = ko.observable("");
    self.filterRjMhltDate = ko.observable("");
    self.filterCustName = ko.observable("");
    self.filterKhdtName = ko.observable("");
    self.filterFromUserName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterDocNo = ko.observable("");
    self.filterMhltDate = ko.observable("");

    self.filterDocB_LastList = ko.computed(function () {
        self.currentPageIndexDocB_Last(0);
        var filterRjStatus = self.filterRjStatus();
        var filterRjDate = self.filterRjDate();
        var filterRjMhltDate = self.filterRjMhltDate();
        var filterCustName = self.filterCustName();
        var filterKhdtName = self.filterKhdtName();
        var filterFromUserName = self.filterFromUserName();
        var filterSpec = self.filterSpec();
        var filterStatus = self.filterStatus().toUpperCase();
        var filterDocNo = self.filterDocNo();
        var filterMhltDate = self.filterMhltDate();


        tempData = ko.utils.arrayFilter(self.DocB_LastList(), function (item) {
            result =
                (item.RjStatus == null ? '' : item.RjStatus.toString().search(filterRjStatus) >= 0) &&
                (item.RjDate == null ? '' : item.RjDate.toString().search(filterRjDate) >= 0) &&
                (item.RjMhltDate == null ? '' : item.RjMhltDate.toString().search(filterRjMhltDate) >= 0) &&
                (item.CustName == null ? '' : item.CustName.toString().search(filterCustName) >= 0) &&
                (item.KhdtName == null ? '' : item.KhdtName.toString().search(filterKhdtName) >= 0) &&
                (item.FromUserName == null ? '' : item.FromUserName.toString().search(filterFromUserName) >= 0) &&
                (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                (item.DocNo == null ? '' : item.DocNo.toString().search(filterDocNo) >= 0) &&
                (item.MhltDate == null ? '' : item.MhltDate.toString().search(filterMhltDate) >= 0)
            return result;
        })
        $("#CountRecord").text(tempData.length);
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




    //RjStatus - RjDate - RjMhltDate - CustName - KhdtName - FromUserName - Spec - Status - DocNo - MhltDate
    //RjStatus - RjDate - RjMhltDate - CustName - KhdtName - FromUserName - Spec - Status - DocNo - MhltDate


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
        var filter1 = self.filterErjCust1();
        var filter2 = self.filterErjCust2();

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
            title: 'تایید به روز رسانی',
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
        var filter1 = self.filterKhdt1();
        var filter2 = self.filterKhdt2();

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
            title: 'تایید به روز رسانی',
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












    self.currentPageErjUsers = ko.observable();
    self.pageSizeErjUsers = ko.observable(10);
    self.currentPageIndexErjUsers = ko.observable(0);

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageErjUsers = ko.observable();
    self.filterErjUsers0 = ko.observable("");
    self.filterErjUsers1 = ko.observable("");
    self.filterErjUsers2 = ko.observable("");

    self.filterErjUsersList = ko.computed(function () {

        self.currentPageIndexErjUsers(0);
        var filter0 = self.filterErjUsers0().toUpperCase();
        var filter1 = self.filterErjUsers1();
        var filter2 = self.filterErjUsers2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ErjUsersList();
        } else {
            tempData = ko.utils.arrayFilter(self.ErjUsersList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filter0) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageErjUsers = ko.computed(function () {
        var pageSizeErjUsers = parseInt(self.pageSizeErjUsers(), 10),
            startIndex = pageSizeErjUsers * self.currentPageIndexErjUsers(),
            endIndex = startIndex + pageSizeErjUsers;
        return self.filterErjUsersList().slice(startIndex, endIndex);
    });

    self.nextPageErjUsers = function () {
        if (((self.currentPageIndexErjUsers() + 1) * self.pageSizeErjUsers()) < self.filterErjUsersList().length) {
            self.currentPageIndexErjUsers(self.currentPageIndexErjUsers() + 1);
        }
    };

    self.previousPageErjUsers = function () {
        if (self.currentPageIndexErjUsers() > 0) {
            self.currentPageIndexErjUsers(self.currentPageIndexErjUsers() - 1);
        }
    };

    self.firstPageErjUsers = function () {
        self.currentPageIndexErjUsers(0);
    };


    self.lastPageErjUsers = function () {
        countErjUsers = parseInt(self.filterErjUsersList().length / self.pageSizeErjUsers(), 10);
        if ((self.filterErjUsersList().length % self.pageSizeErjUsers()) == 0)
            self.currentPageIndexErjUsers(countErjUsers - 1);
        else
            self.currentPageIndexErjUsers(countErjUsers);
    };

    self.sortTableErjUsers = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.ErjUsersList.sort(function (left, right) {
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

    $('#refreshErjUsers').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست کاربران به روز رسانی شود ؟",
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
                getErjUsersList();
                $("div.loadingZone").hide();
            }
        })
    })

    self.selectErjUsers = function (item) {
        $('#nameErjBe').val('(' + item.Code + ') ' + item.Name);
        self.ErjUsersCode(item.Code);
    }


    $('#modal-ErjUsers').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });






    self.currentPageErjUsersRonevesht = ko.observable();
    self.pageSizeErjUsersRonevesht = ko.observable(10);
    self.currentPageIndexErjUsersRonevesht = ko.observable(0);

    self.filterErjUsersRonevesht0 = ko.observable("");
    self.filterErjUsersRonevesht1 = ko.observable("");
    self.filterErjUsersRonevesht2 = ko.observable("");


    self.filterErjUsersRoneveshtList = ko.computed(function () {

        self.currentPageIndexErjUsersRonevesht(0);
        var filter0 = self.filterErjUsersRonevesht0().toUpperCase();
        var filter1 = self.filterErjUsersRonevesht1();
        var filter2 = self.filterErjUsersRonevesht2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ErjUsersList();
        } else {
            tempData = ko.utils.arrayFilter(self.ErjUsersList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filter0) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageErjUsersRonevesht = ko.computed(function () {
        var pageSizeErjUsersRonevesht = parseInt(self.pageSizeErjUsersRonevesht(), 10),
            startIndex = pageSizeErjUsersRonevesht * self.currentPageIndexErjUsersRonevesht(),
            endIndex = startIndex + pageSizeErjUsersRonevesht;
        return self.filterErjUsersRoneveshtList().slice(startIndex, endIndex);
    });

    self.nextPageErjUsersRonevesht = function () {
        if (((self.currentPageIndexErjUsersRonevesht() + 1) * self.pageSizeErjUsersRonevesht()) < self.filterErjUsersRoneveshtList().length) {
            self.currentPageIndexErjUsersRonevesht(self.currentPageIndexErjUsersRonevesht() + 1);
        }
    };

    self.previousPageErjUsersRonevesht = function () {
        if (self.currentPageIndexErjUsersRonevesht() > 0) {
            self.currentPageIndexErjUsersRonevesht(self.currentPageIndexErjUsersRonevesht() - 1);
        }
    };

    self.firstPageErjUsersRonevesht = function () {
        self.currentPageIndexErjUsersRonevesht(0);
    };

    self.lastPageErjUsersRonevesht = function () {
        countErjUsersRonevesht = parseInt(self.filterErjUsersRoneveshtList().length / self.pageSizeErjUsersRonevesht(), 10);
        if ((self.filterErjUsersRoneveshtList().length % self.pageSizeErjUsersRonevesht()) == 0)
            self.currentPageIndexErjUsersRonevesht(countErjUsersRonevesht - 1);
        else
            self.currentPageIndexErjUsersRonevesht(countErjUsersRonevesht);
    };

    self.sortTableErjUsersRonevesht = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.ErjUsersList.sort(function (left, right) {
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


    $('#refreshErjUsersRonevesht').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست کاربران به روز رسانی شود ؟",
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
                getErjUsersRoneveshtList();
                $("div.loadingZone").hide();
            }
        })
    })


    self.AddErjUsersRonevesht = function (item) {

        ErjUsersRoneveshtCode = item.Code;
        find = false;
        list_ErjUsersRoneveshtSelect.forEach(function (item, key) {
            if (item == ErjUsersRoneveshtCode) {
                find = true;
            }
        });

        if (find == false) {
            $('#TableBodyListErjUsersRonevesht').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + item.Code + '</td > '
                + ' <td data-bind="text: Name">' + item.Name + '</td > '
                + ' <td data-bind="text: Spec">' + item.Spec + '</td > '
                + '</tr>'
            );
            list_ErjUsersRoneveshtSelect[counterErjUsersRonevesht] = item.Code;
            counterErjUsersRonevesht = counterErjUsersRonevesht + 1;
        }
    };


    self.AddAllErjUsersRonevesht = function () {
        list_ErjUsersRoneveshtSelect = new Array();
        list = self.ErjUsersList();
        $("#TableBodyListErjUsersRonevesht").empty();
        for (var i = 0; i < list.length; i++) {
            $('#TableBodyListErjUsersRonevesht').append(
                '  <tr data-bind="">'
                + ' <td data-bind="text: Code">' + list[i].Code + '</td > '
                + ' <td data-bind="text: Name">' + list[i].Name + '</td > '
                + ' <td data-bind="text: Spec">' + list[i].Spec + '</td > '
                + '</tr>'
            );
            list_ErjUsersRoneveshtSelect[i] = list[i].Code;
            counterErjUsersRonevesht = i + 1;
        }
    };


    self.DelAllErjUsersRonevesht = function () {
        list_ErjUsersRoneveshtSelect = new Array();
        counterErjUsersRonevesht = 0;
        $("#TableBodyListErjUsersRonevesht").empty();
    };


    $('#modal-ErjUsersRonevesht').on('hide.bs.modal', function () {
        if (counterErjUsersRonevesht > 0)
            $('#nameRoneveshtBe').val(counterErjUsersRonevesht + ' مورد انتخاب شده ')
        else
            $('#nameRoneveshtBe').val('هیچکس');
    });

    $('#modal-ErjUsersRonevesht').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });



    var specialComm = '';
    //Get DocK
    function getDocK(serialnumber) {

        var DocKObject = {
            userName: '',
            userMode: '',
            azTarikh: '',
            taTarikh: '',
            Status: '',
            CustCode: '',
            KhdtCode: '',
            SrchSt: '',
            SerialNumber: serialnumber,
        };
        ajaxFunction(DocKUri + aceErj + '/' + salErj + '/' + group, 'POST', DocKObject).done(function (response) {
            self.DocKList(response);
            item = response[0];
            $("#m_docno").val(item.DocNo);

            $("#m_DocDate").val(item.DocDate);
            $("#m_MhltDate").val(item.MhltDate);
            $("#m_Eghdam").val(item.Eghdam);
            $("#m_Mahramaneh").val(item.Mahramaneh);
            $("#m_Tanzim").val(item.Tanzim);

            $("#m_CustName").val(item.CustName);
            $("#m_KhdtName").val(item.KhdtName);
            $("#m_Spec").val(item.Spec);

            $("#eghdamComm").val(item.EghdamComm);
            $("#docDesc").val(item.DocDesc);

            specialComm = item.SpecialComm;
            $("#specialComm").val('برای نمایش کلیک کنید');
            TextHighlight("#specialComm");

            $("#finalComm").val(item.FinalComm);

            getErjResultList(serialnumber);


        });
    }

    $('#specialComm').click(function () {
        TextHighlightDel("#specialComm");
        $("#specialComm").val(specialComm);
    })


    self.ViewErjDocErja = function (Band) {
        serialNumber = Band.SerialNumber;
        getDocK(serialNumber)
        getErjDocErja(serialNumber);
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

    if (sessionStorage.userModeErj == 'USER') {
        $('#FromUser').prop('disabled', true);
        $('#ToUser').prop('disabled', true);
    }
    else {
        $('#FromUser').prop('disabled', false);
        $('#ToUser').prop('disabled', false);
    }






    var showHideInformation = false;

    var showHideSpec = false;
    var showHideEghdamComm = false;
    var showHideDocDesc = false;
    var showHideSpecialComm = false;
    var showHideFinalComm = false;

    var showHideResult = false;

    $('#modal-ErjDocErja').on('shown.bs.modal', function () {
        showHideInformation = false;
        showHideSpec = false;
        showHideEghdamComm = false;
        showHideDocDesc = false;
        showHideSpecialComm = false;
        showHideFinalComm = false;

        showHideResult = false;
        $(".auto-growth").css("height", "24px");
        $('#panelInformation').attr('hidden', '');
        $('#imgInformation').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        $('#imgSpec').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        $('#imgResult').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
    });

    $('#ShowHideInformation').click(function () {
        if (showHideInformation) {
            showHideInformation = false;
            $('#panelInformation').attr('hidden', '');
            $('#imgInformation').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        }
        else {
            showHideInformation = true;
            $('#panelInformation').removeAttr('hidden', '');
            $('#imgInformation').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
        }
    })



    $('#ShowHideSpec').click(function () {
        if (showHideSpec) {
            showHideSpec = false;
            $('#eghdamComm').css("height", "24px");
            $('#docDesc').css("height", "24px");
            $('#specialComm').css("height", "24px");
            $('#finalComm').css("height", "24px");
            $('#imgSpec').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        }
        else {
            showHideSpec = true;
            // autosize.update($('textarea'));
            autosize.update($('#eghdamComm'));
            autosize.update($('#docDesc'));
            autosize.update($('#specialComm'));
            autosize.update($('#finalComm'));
            $('#imgSpec').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
        }

    })

    $('#ShowHideEghdamComm').click(function () {
        if (showHideEghdamComm) {
            showHideEghdamComm = false;
            $('#eghdamComm').css("height", "24px");
        }
        else {
            showHideEghdamComm = true;
            autosize.update($('#eghdamComm'));
        }
    })

    $('#ShowHideDocDesc').click(function () {
        if (showHideDocDesc) {
            showHideDocDesc = false;
            $('#docDesc').css("height", "24px");
        }
        else {
            showHideDocDesc = true;
            autosize.update($('#docDesc'));
        }
    })

    $('#ShowHideSpecialComm').click(function () {
        if (showHideSpecialComm) {
            showHideSpecialComm = false;
            $('#specialComm').css("height", "24px");
        }
        else {
            showHideSpecialComm = true;
            autosize.update($('#specialComm'));
        }
    })

    $('#ShowHideFinalComm').click(function () {
        if (showHideFinalComm) {
            showHideFinalComm = false;
            $('#finalComm').css("height", "24px");
        }
        else {
            showHideFinalComm = true;
            autosize.update($('#finalComm'));
        }
    })




    $('#ShowHideResult').click(function () {
        if (showHideResult) {
            showHideResult = false;
            $('#Result').css("height", "24px");
            $('#imgResult').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        }
        else {
            showHideResult = true;
            $('#imgResult').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
            autosize.update($('#Result'));
        }

    })





    $('#modal-Erja').on('shown.bs.modal', function () {
        $('#e_Result').css("height", "409px");
        $('#e_Result').val($('#Result').val());
        $('#nameErjBe').val('انتخاب نشده');
        $('#nameRoneveshtBe').val('هیچکس');
        $('#RjMhltDate').val('');
        $('#RjTime_M').val('');
        $('#RjTime_H').val('');
    });













    $('#saveErja').click(function () {
        ErjDocB_I();
    })


    //Add new FDocH
    function ErjDocB_I() {
        rjDate = ShamsiDate();
        rjMhltDate = $("#RjMhltDate").val().toEnglishDigit();
        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();
        natijeh = $("#e_Result").val();

        fromUserCode = $("#FromUser").val();
        if (fromUserCode == "") fromUserCode = sessionStorage.userName;

        if (self.ErjUsersCode() == null) {
            return showNotification('ارجاع شونده را انتخاب کنید', 0);
        }

        toUserCode = self.ErjUsersCode();

        if (rjTime_H != '' || rjTime_M != '') {
            rjTime_H = rjTime_H == "" ? 0 : rjTime_H;
            rjTime_M = rjTime_M == "" ? 0 : rjTime_M;

            rjTime = rjTime_H + rjTime_M;
        }
        else {
            return showNotification('زمان صرف شده را وارد کنید', 0);
        }

        var ErjDocB_IObject = {
            SerialNumber: serialNumber,
            Natijeh: natijeh,
            FromUserCode: fromUserCode,
            ToUserCode: toUserCode,
            RjDate: rjDate,
            RjEndDate: rjDate,
            RjTime: rjTime,
            RjMhltDate: rjMhltDate
        };

        ajaxFunction(DocBIUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjDocB_IObject).done(function (response) {
            bandNo = response;
            $('#modal-Erja').modal('hide');
            $('#modal-ErjDocErja').modal('hide');
            getDocB_Last();

        });
        flagInsertFdoch = 1;
    };












    function CreateTableReport(data) {
        $("#TableReport").empty();
        $('#TableReport').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableDocB_Last">' +
            CreateTableTh('RjStatus', data) +
            CreateTableTh('RjDate', data) +
            CreateTableTh('RjMhltDate', data) +
            CreateTableTh('CustName', data) +
            CreateTableTh('KhdtName', data) +
            CreateTableTh('FromUserName', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('DocNo', data) +
            CreateTableTh('MhltDate', data) +
            '<th>عملیات</th>' +
            '      </tr>' +
            '   </thead >' +
            '<tbody data-bind="foreach: currentPageDocB_Last" data-dismiss="modal" style="cursor: default;">' +
            '   <tr data-bind="click: $parent.selectDocB_Last , css: { matched: $data === $root.firstMatch() }">' +
            CreateTableTd('RjStatus', 0, 1, data) +
            CreateTableTd('RjDate', 0, 0, data) +
            CreateTableTd('RjMhltDate', 0, 0, data) +
            CreateTableTd('CustName', 0, 0, data) +
            CreateTableTd('KhdtName', 0, 0, data) +
            CreateTableTd('FromUserName', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('MhltDate', 0, 0, data) +
            '<td>' +
            '    <a data-bind="click: $root.ViewErjDocErja" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-ErjDocErja" >' +
            '        <img src="/Content/img/list/SearchKala.png" width="20" height="20" style="margin-left:10px" />' +
            '    </a >' +
            '</td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            CreateTableTdSum('RjStatus', 0, data) +
            CreateTableTdSum('RjDate', 1, data) +
            CreateTableTdSum('RjMhltDate', 1, data) +
            CreateTableTdSum('CustName', 1, data) +
            CreateTableTdSum('KhdtName', 1, data) +
            CreateTableTdSum('FromUserName', 1, data) +
            CreateTableTdSum('Spec', 1, data) +
            CreateTableTdSum('Status', 1, data) +
            CreateTableTdSum('DocNo', 1, data) +
            CreateTableTdSum('MhltDate', 1, data) +
            ' </tr>' +
            '  <tr style="background-color: #efb68399;">' +
            CreateTableTdSearch('RjStatus', data) +
            CreateTableTdSearch('RjDate', data) +
            CreateTableTdSearch('RjMhltDate', data) +
            CreateTableTdSearch('CustName', data) +
            CreateTableTdSearch('KhdtName', data) +
            CreateTableTdSearch('FromUserName', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('MhltDate', data) +
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
            '<span data-column="' + field + '">' + TextField + '</span>' +
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
                text += 'data-bind="text: RjStatus,style: { color: DocBMode == 1  ? \'#e48f43\' : \'\'}"></td>';
                //text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10)), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
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

    createViewer();
    $('#Print').click(function () {
        setReport(self.filterDocB_LastList(), 'Free');
    });

    /*    $(function () {
            autosize(
                $("textarea.auto-growth"))
                $("input#input_text, textarea#textarea2").characterCounter()
    
                Dropzone.options.frmFileUpload = {
                    paramName: "file", maxFilesize: 2
                }
            )
    ); */

};

ko.applyBindings(new ViewModel());

