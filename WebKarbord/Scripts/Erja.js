var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'Web2';
    var salErj = '0000';

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    var serialNumber = 0;
    var serialNumberAttach = 0;
    var bandNo = 0;
    var docBMode = 0;

    var finalCommTrs;

    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.ErjUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.RepToUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.RepFromUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 

    self.MahramanehList = ko.observableArray([]); // لیست محرمانه 
    self.RooneveshtUsersList = ko.observableArray([]); // لیست افرادی که رونوشت دارند
    self.ErjResultList = ko.observableArray([]); // لیست نتیجه 

    self.DocB_LastList = ko.observableArray([]); // لیست گزارش  
    self.ErjDocErja = ko.observableArray([]); // لیست پرونده  
    self.DocKList = ko.observableArray([]); // لیست گزارش پرونده

    self.DocAttachList = ko.observableArray([]); // ليست پیوست

    TestUser();

    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان

    var ErjUsersUri = server + '/api/Web_Data/Web_ErjUsers/'; // آدرس کاربران زمان ارجاع

    var RepToUsersUri = server + '/api/Web_Data/Web_RepToUsers/'; // آدرس ارجاع شونده 
    var RepFromUsersUri = server + '/api/Web_Data/Web_RepFromUsers/'; // آدرس ارجاع دهنده 


    var MahramanehUri = server + '/api/Web_Data/Web_Mahramaneh/'; // آدرس محرمانه
    var RooneveshtUsersListUri = server + '/api/Web_Data/Web_RooneveshtUsersList/'; // لیست افرادی که رونوشت دارند
    var ErjResultUri = server + '/api/Web_Data/Web_ErjResult/'; // آدرس نتیجه
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var DocB_LastUri = server + '/api/Web_Data/Web_ErjDocB_Last/'; // آدرس گزارش
    var ErjDocErjaUri = server + '/api/Web_Data/Web_ErjDocErja/'; // آدرس  پرونده
    var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var DocKUri = server + '/api/Web_Data/ErjDocK/'; // آدرس گزارش پرونده
    var ErjSaveDoc_BSaveUri = server + '/api/Web_Data/ErjSaveDoc_BSave/'; // آدرس ذخیره ارجاع
    var ErjSaveDoc_HStatusUri = server + '/api/Web_Data/ErjSaveDoc_HStatus/'; // آدرس ذخیره وضعیت
    var ErjSaveDoc_CSaveUri = server + '/api/Web_Data/ErjSaveDoc_CSave/'; // آدرس ذخیره رونوشت
    var ErjSaveDoc_CDUri = server + '/api/Web_Data/ErjSaveDoc_CD/'; // آدرس حذف رونوشت

    var ErjSaveDoc_RjRead_Uri = server + '/api/Web_Data/ErjSaveDoc_RjRead/'; // آدرس ذخیره دیدن ارجاع

    var DocAttachUri = server + '/api/Web_Data/DocAttach/'; // آدرس لیست پیوست 
    var DownloadAttachUri = server + '/api/Web_Data/DownloadAttach/'; // آدرس  دانلود پیوست 

    var ErjDocAttach_SaveUri = server + '/api/FileUpload/UploadFile/'; // ذخیره پیوست
    var ErjDocAttach_DelUri = server + '/api/Web_Data/ErjDocAttach_Del/'; // حذف پیوست


    self.AzDocDate = ko.observable('');
    self.TaDocDate = ko.observable('');
    self.AzRjDate = ko.observable('');
    self.TaRjDate = ko.observable('');
    self.AzMhltDate = ko.observable('');
    self.TaMhltDate = ko.observable('');
    self.e_MhltErja = ko.observable('');
    self.ErjUsersCode = ko.observable();
    self.ToUserCode = ko.observable();

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
    var ErjaMode;




    function AddDocBMode() {
        select = document.getElementById('DocBMode');
        for (var i = 1; i <= 3; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = 4;
                opt.innerHTML = 'کلیه ارجاعات';
            }
            if (i == 2) {
                opt.value = 5;
                opt.innerHTML = 'فقط ارجاعات اصلی';
                opt.selected = true;
            }
            if (i == 3) {
                opt.value = 6;
                opt.innerHTML = 'فقط رونوشت ها';
            }
            select.appendChild(opt);
        }
    }

    if (sessionStorage.ModeCodeErja == "1") {
        $("#title_erja").text('ارجاعات پرونده دریافتی');
        $("#titleSaveErja").text('ارجاع جدید');
        AddDocBMode();
        $('#showDocBMode').css('display', 'block');

    }
    else {
        $("#title_erja").text('ارجاعات پرونده ارسالی');
        $("#titleSaveErja").text('تغییر ارجاع');
        $('#showDocBMode').css('display', 'none');
    }


    //showDocBMode




    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'ErjDocB_Last';
    var columns = [
        'RjStatus',
        'RjDate',
        'RjMhltDate',
        'CustName',
        'KhdtName',
        'FromUserName',
        'ToUserName',
        'Spec',
        'Status',
        'DocNo',
        'MhltDate'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting, username) {
        ajaxFunction(RprtColsUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            self.SettingColumnList(data);
            ListColumns = data;
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
        SaveColumn(aceErj, salErj, group, rprtId, "/ERJ/Erja", columns, self.SettingColumnList());
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
        ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group + '/' + sessionStorage.userName, 'GET').done(function (data) {
            self.ErjUsersList(data);
            //$('#ToUser').val(sessionStorage.userName);
            //$('#FromUser').val(' ');
        });
    }

    //Get RepToUsers List
    function getRepToUsersList() {
        ajaxFunction(RepToUsersUri + aceErj + '/' + salErj + '/' + group + '/' + sessionStorage.userName, 'GET').done(function (data) {
            self.RepToUsersList(data);
            $('#ToUser').val(sessionStorage.userName);
            $('#FromUser').val(' ');
        });
    }

    //Get RepFromUsers List
    function getRepFromUsersList() {
        ajaxFunction(RepFromUsersUri + aceErj + '/' + salErj + '/' + group + '/' + sessionStorage.userName, 'GET').done(function (data) {
            self.RepFromUsersList(data);
            $('#FromUser').val(sessionStorage.userName);
            $('#ToUser').val(' ');
        });
    }

    //Get Mahramaneh List
    function getMahramanehList() {
        ajaxFunction(MahramanehUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.MahramanehList(data);
        });
    }


    //Get RooneveshtUsersList
    function getRooneveshtUsersList(serial, bandNo) {

        var RooneveshtUsersList_Object = {
            SerialNumber: serial,
            BandNo: bandNo
        }

        ajaxFunction(RooneveshtUsersListUri + aceErj + '/' + salErj + '/' + group, 'POST', RooneveshtUsersList_Object).done(function (data) {
            self.RooneveshtUsersList(data);
        });
    }

    //Get ErjResult List
    function getErjResultList(serialNumber, bMode, toUser) {
        ajaxFunction(ErjResultUri + aceErj + '/' + salErj + '/' + group + '/' + serialNumber + '/' + bMode + '/' + toUser, 'GET').done(function (data) {
            if (bMode == null)
                self.ErjResultList(data);
            item = data[0];
            bandNo = item.BandNo;
            $("#Result").val(item.RjResult);
        });
    }

    //Get ErjStatus List
    function getErjStatusList() {
        ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjStatusList(data);
        });
    }

    //Get DocAttach List
    function getDocAttachList(serial) {
        var DocAttachObject = {
            ModeCode: 1,
            SerialNumber: serial
        }
        ajaxFunction(DocAttachUri + aceErj + '/' + salErj + '/' + group, 'POST', DocAttachObject).done(function (data) {
            self.DocAttachList(data);
        });
    }



    getErjStatusList();
    getErjCustList();
    getKhdtList();
    getErjUsersList();
    getRepToUsersList();
    getRepFromUsersList();
    getMahramanehList();



    /*function AddDocBMode() {
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
                opt.innerHTML = 'آخرين ارجاعات و رونوشتها';
                opt.selected = true;
            }
            if (i == 5) {
                opt.value = i;
                opt.innerHTML = 'آخرين ارجاعات اصلی';
            }
            if (i == 6) {
                opt.value = i;
                opt.innerHTML = 'آخرين رونوشتها';
            }
            select.appendChild(opt);
        }
    }*/



    //Get DocB_Last
    function getDocB_Last() {
        DocBMode = $("#DocBMode").val();
        if (DocBMode == null) DocBMode = -1;

        mode = sessionStorage.ModeCodeErja;

        var DocB_LastObject = {
            erjaMode: mode,
            docBMode: mode == 1 ? DocBMode : "5",
            fromUserCode: mode == 1 ? '' : sessionStorage.userName,
            toUserCode: mode == 1 ? sessionStorage.userName : '',
            azDocDate: '',
            taDocDate: '',
            azRjDate: '',
            taRjDate: '',
            azMhltDate: '',
            taMhltDate: '',
            status: 'فعال',
            custCode: '',
            khdtCode: '',
            srchSt: '',
        };
        ajaxFunction(DocB_LastUri + aceErj + '/' + salErj + '/' + group, 'POST', DocB_LastObject, true).done(function (response) {
            self.DocB_LastList(response);
        });
    }

    getDocB_Last();

    self.DocBModeChange = function () {
        getDocB_Last();
    }



    $('#refreshErja').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست ارجاعات به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getDocB_Last();
            }
        })
    })


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
        if (res.length == 1)
         var res = comm.split("\n");
        tempText = '';
        for (var i = 0; i < res.length; i++) {
            tempText += '<p>' + res[i] + '</p> '
        }
        return tempText;
    }

    function SetDataErjDocErja() {
        list = self.ErjDocErja();

        listLastBand = self.ErjResultList();
        countBand = list[list.length - 1].BandNo;
        textLastBand = '';
        for (var j = 0; j < listLastBand.length; j++) {
            if (listLastBand[j].DocBMode == 0 && listLastBand[j].RjResult != '') {
                textLastBand +=
                    '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">نتیجه ثبت شده توسط :</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div > '
            }
            else if (listLastBand[j].DocBMode == 1) {
                textLastBand +=
                    '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">رونوشت به :</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div >'

                if (listLastBand[j].ToUserCode == sessionStorage.userName) {
                    $('#Result').val(listLastBand[j].RjResult);
                }

            }


            if (listLastBand[j].RjResult == '') {
                if (listLastBand[j].DocBMode > 0) {
                    textLastBand += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">.';
                    textLastBand += ' </div> ';
                }
            }
            else {
                textLastBand += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                textLastBand += ConvertComm(listLastBand[j].RjResult);
                textLastBand += ' </div> ';
            }


        }


        $("#BodyErjDocErja").empty();


        for (var i = 1; i <= countBand; i++) {

            //for (var i = countBand; i >= 1; i--) {
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
                    + '   <div class=" form-inline" > <h6 style="padding-left: 4px;">نتیجه رونوشت از :</h6> <h6>' + listBand[j].FromUserName + '</h6>'
                    + '   </div>'
                    + '</div > '
                if (listBand[j].RjComm == '')
                    text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">.';
                else {
                    text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                    text += ConvertComm(listBand[j].RjComm);
                }
                text += ' </div> ';
            }



            if (listBand[0].RooneveshtUsers != '' && i < countBand) {

                text += '</br>'
                    + '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #d9d9d9 !important;color: #555555;border-radius: 10px;">'
                    + '   <div class=" form-inline" > <h6> رونوشت به : '
                    + listBand[0].RooneveshtUsers
                    + '</h6>'
                    + '</div > '
                text += ' </div> ';
            }


            textBody =
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
                + '         <h6 style="padding-left: 10px">' + listBand[0].RjTimeSt + '</h6> '
                + '         <h6>' + listBand[0].RjDate + '</h6> '
                + '     </div> '
                + '</div>'
                + '</div>'
                + '<div class="body" style="padding:10px;">'

            textBody += text
            if (i == countBand)
                textBody += textLastBand

            textBody += '</div>'
                + '        </div>'
                + '    </div>'
                + '</div>'


            $('#BodyErjDocErja').append(textBody);
        }
    }


    $("#CreateReport").click(function () {
        getDocB_Last();
        self.sortTableDocB_Last();
    });







    $('#nameErjCust').val('همه موارد');
    $('#nameKhdt').val('همه موارد');

    self.currentPageDocB_Last = ko.observable();
    pageSizeDocB_Last = localStorage.getItem('pageSizeDocB_Last' + sessionStorage.ModeCodeErja) == null ? 10 : localStorage.getItem('pageSizeDocB_Last' + sessionStorage.ModeCodeErja);
    self.pageSizeDocB_Last = ko.observable(pageSizeDocB_Last);
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
    self.filterToUserName = ko.observable("");
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
        var filterToUserName = self.filterToUserName();
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
                (item.ToUserName == null ? '' : item.ToUserName.toString().search(filterToUserName) >= 0) &&
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
        localStorage.setItem('pageSizeDocB_Last' + sessionStorage.ModeCodeErja, pageSizeDocB_Last);
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
    self.iconTypeToUserName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeDocNo = ko.observable("");
    self.iconTypeMhltDate = ko.observable("");

    self.sortTableDocB_Last = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sort" + rprtId);
            self.sortType = localStorage.getItem("sortType" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sort" + rprtId, orderProp);
        localStorage.setItem("sortType" + rprtId, self.sortType);
        self.currentColumn(orderProp);
        self.DocB_LastList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);
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
        self.iconTypeToUserName('');
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
        if (orderProp == 'ToUserName') self.iconTypeToUserName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MhltDate') self.iconTypeMhltDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    self.currentPageErjCust = ko.observable();
    pageSizeErjCust = localStorage.getItem('pageSizeErjCust') == null ? 10 : localStorage.getItem('pageSizeErjCust');
    self.pageSizeErjCust = ko.observable(pageSizeErjCust);
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
        localStorage.setItem('pageSizeErjCust', pageSizeErjCust);
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
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ErjCustList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);
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
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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















    pageSizeDocAttach = localStorage.getItem('pageSizeDocAttach') == null ? 10 : localStorage.getItem('pageSizeDocAttach');
    self.pageSizeDocAttach = ko.observable(pageSizeDocAttach);
    self.currentPageIndexKhdt = ko.observable(0);

    self.currentPageIndexDocAttach = ko.observable(0);
    self.filterDocAttach0 = ko.observable("");

    self.filterDocAttachList = ko.computed(function () {

        self.currentPageIndexDocAttach(0);
        var filter0 = self.filterDocAttach0();

        if (!filter0) {
            return self.DocAttachList();
        } else {
            tempData = ko.utils.arrayFilter(self.DocAttachList(), function (item) {
                result =
                    (item.Comm == null ? '' : item.Comm.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageDocAttach = ko.computed(function () {
        var pageSizeDocAttach = parseInt(self.pageSizeDocAttach(), 10),
            startIndex = pageSizeDocAttach * self.currentPageIndexDocAttach(),
            endIndex = startIndex + pageSizeDocAttach;
        localStorage.setItem('pageSizeDocAttach', pageSizeDocAttach);
        return self.filterDocAttachList().slice(startIndex, endIndex);
    });

    self.nextPageDocAttach = function () {
        if (((self.currentPageIndexDocAttach() + 1) * self.pageSizeDocAttach()) < self.filterDocAttachList().length) {
            self.currentPageIndexDocAttach(self.currentPageIndexDocAttach() + 1);
        }
    };

    self.previousPageDocAttach = function () {
        if (self.currentPageIndexDocAttach() > 0) {
            self.currentPageIndexDocAttach(self.currentPageIndexDocAttach() - 1);
        }
    };

    self.firstPageDocAttach = function () {
        self.currentPageIndexDocAttach(0);
    };


    self.lastPageDocAttach = function () {
        countDocAttach = parseInt(self.filterDocAttachList().length / self.pageSizeDocAttach(), 10);
        if ((self.filterDocAttachList().length % self.pageSizeDocAttach()) == 0)
            self.currentPageIndexDocAttach(countDocAttach - 1);
        else
            self.currentPageIndexDocAttach(countDocAttach);
    };


    self.iconTypeComm = ko.observable("");

    self.sortTableDocAttach = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.DocAttachList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);
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
        if (orderProp == 'Comm') self.iconTypeNameComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };




    $('#refreshDocAttach').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "پیوست ها به روز رسانی شود ؟",
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
                getDocAttachList(serialNumber);
                $("div.loadingZone").hide();
            }
        })
    })


    self.ViewDocAttach = function (Band) {
        serialNumber = Band.SerialNumber;
        getDocAttachList(Band.SerialNumber);
    }

    $('#attachFile').click(function () {
        getDocAttachList(serialNumber);
    });


    self.DeleteDocAttach = function (Band) {
        Swal.fire({
            title: 'تایید حذف',
            text: "آیا پیوست انتخابی حذف شود ؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {

                Web_DocAttach_Save = {
                    SerialNumber: Band.SerialNumber,
                    ProgName: 'ERJ1',
                    ModeCode: 1,
                    BandNo: Band.BandNo,
                };

                ajaxFunction(ErjDocAttach_DelUri + aceErj + '/' + salErj + '/' + group, 'POST', Web_DocAttach_Save).done(function (response) {
                    getDocAttachList(serialNumber);
                    showNotification('پیوست حذف شد', 1);
                });
            }
        })
    };

    $("#AddNewDocAttach").on('click', function (e) {
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });

    this.fileUpload = function (data, e) {
        var dataFile;
        var file = e.target.files[0];
        var name = file.name;
        var size = file.size;
        Swal.fire({
            title: 'تایید آپلود ؟',
            text: "آیا " + name + " به پیوست افزوده شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                var file = document.getElementById("upload");

                fileFullName = file.files[0].name;
                fileData = fileFullName.split(".");
                fileName = fileData[0];
                fileType = '.' + fileData[1];

                var zip = new JSZip();


                zip.file('temp' + fileType, file.files[0]);
                zip.generateAsync({ type: "Blob", compression: "DEFLATE" }).then(function (content) {

                    var file = new File([content], fileFullName, { type: "zip" });

                    //file = $("#upload")[0].files[0];


                    attachDate = ShamsiDate();

                    var formData = new FormData();

                    formData.append("SerialNumber", serialNumber);
                    formData.append("ProgName", "ERJ1");
                    formData.append("ModeCode", 1);
                    formData.append("BandNo", 0);
                    formData.append("Code", "");
                    formData.append("Comm", "مدرک پیوست - " + attachDate + " - " + sessionStorage.userNameFa + " - " + fileName);
                    formData.append("FName", fileFullName);
                    formData.append("Atch", file);

                    ajaxFunctionUpload(ErjDocAttach_SaveUri + aceErj + '/' + salErj + '/' + group, formData, true).done(function (response) {
                        getDocAttachList(serialNumber);
                    })
                });
            }
        })



    };

    //del DocAttach  حذف پیوست
    function ErjDocAttach_Del(bandNoImput) {
        Web_DocAttach_Del = {
            SerialNumber: serialNumber,
            ProgName: '',
            ModeCode: '',
            BandNo: bandNoImput
        };
        ajaxFunction(ErjDocAttach_DelUri + aceErj + '/' + salErj + '/' + group, 'POST', Web_DocAttach_Del).done(function (response) {
        });
    };





    self.selectDocAttach = function (item) {

        var fileName = item.FName.split(".");
        var DownloadAttachObject = {
            SerialNumber: item.SerialNumber,
            BandNo: item.BandNo
        }

        ajaxFunction(DownloadAttachUri + aceErj + '/' + salErj + '/' + group, 'POST', DownloadAttachObject, true).done(function (data) {
            var sampleArr = base64ToArrayBuffer(data);
            saveByteArray(fileName[0] + ".zip", sampleArr);
        });
    }


    self.currentPageKhdt = ko.observable();
    pageSizeKhdt = localStorage.getItem('pageSizeKhdt') == null ? 10 : localStorage.getItem('pageSizeKhdt');
    self.pageSizeKhdt = ko.observable(pageSizeKhdt);
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
        localStorage.setItem('pageSizeKhdt', pageSizeKhdt);
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
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.KhdtList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);
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
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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


    $('.fix').attr('class', 'form-line date focused fix');












    self.currentPageErjUsers = ko.observable();
    pageSizeErjUsers = localStorage.getItem('pageSizeErjUsers') == null ? 10 : localStorage.getItem('pageSizeErjUsers');
    self.pageSizeErjUsers = ko.observable(pageSizeErjUsers);
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
        localStorage.setItem('pageSizeErjUsers', pageSizeErjUsers);
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
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ErjUsersList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);
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
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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
    pageSizeErjUsersRonevesht = localStorage.getItem('pageSizeErjUsersRonevesht') == null ? 10 : localStorage.getItem('pageSizeErjUsersRonevesht');
    self.pageSizeErjUsersRonevesht = ko.observable(pageSizeErjUsersRonevesht);
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
        localStorage.setItem('pageSizeErjUsersRonevesht', pageSizeErjUsersRonevesht);
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
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ErjUsersList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);
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
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
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


    self.ToUserCode(sessionStorage.userName);



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
            $("#m_RelatedDocs").val(item.RelatedDocs);


            $("#eghdamComm").val(item.EghdamComm);
            $("#docDesc").val(item.DocDesc);

            specialComm = item.SpecialComm;
            $("#specialComm").val('برای نمایش کلیک کنید');
            TextHighlight("#specialComm");

            $("#finalComm").val(item.FinalComm);
            finalCommTrs = item.FinalCommTrs;

            //getErjResultList(serialnumber, docBMode, self.ToUserCode());
            getErjResultList(serialnumber, null, null)

        });
    }

    $('#specialComm').click(function () {
        if (finalCommTrs == 1) {
            TextHighlightDel("#specialComm");
            $("#specialComm").val(specialComm);
        }
        else
            showNotification('دسترسی ندارید', 0);
    })


    self.ViewErjDocErja = function (Band) {
        docBMode = Band.DocBMode;
        serialNumber = Band.SerialNumber;
        getDocK(serialNumber)
        getErjDocErja(serialNumber);

        $('#m_StatusParvandeh').val(Band.Status);
        $('#m_StatusErja').val(Band.RjStatus);

        $('#erja').removeAttr('hidden', '');
        $('#saveParvandeh').removeAttr('hidden', '');
        $('#panel_Result').removeAttr('hidden', '');
        $('#m_StatusParvandeh').prop('disabled', false);
        $('#m_StatusErja').prop('disabled', false);

        if (docBMode == 1) { // رونوشت
            $('#panelFooterParvandeh').attr('hidden', '');
            $('#erja').attr('hidden', '');
        }
        else {
            $('#panelFooterParvandeh').removeAttr('hidden', '');
            $('#erja').removeAttr('hidden', '');
        }

        if (Band.ToUserCode != sessionStorage.userName || sessionStorage.ModeCodeErja == "2") {
            $('#erja').attr('hidden', '');
            $('#panel_Result').attr('hidden', '');
            $('#saveParvandeh').attr('hidden', '');
            $('#m_StatusParvandeh').prop('disabled', true);
            $('#m_StatusErja').prop('disabled', true);
        }


        if (Band.RjReadSt == 'T' && sessionStorage.ModeCodeErja == "1") {
            ErjSaveDoc_RjRead_Object = {
                DocBMode: Band.DocBMode,
                SerialNumber: Band.SerialNumber,
                BandNo: Band.BandNo,
                RjReadSt: 'F'
            };

            ajaxFunction(ErjSaveDoc_RjRead_Uri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_RjRead_Object).done(function (response) { });
        }
    }



    self.UpdateErjDocErja = function (Band) {
        serialNumber = Band.SerialNumber;
        getErjDocErja(serialNumber);

        list = self.ErjDocErja();
        var result = ko.utils.arrayFirst(list, function (product) {
            return product.DocBMode == 0 && product.BandNo === Math.max.apply(null, ko.utils.arrayMap(list, function (e) {
                return e.BandNo;
            }));
        });


        bandNo = result.BandNo;

        getRooneveshtUsersList(serialNumber, bandNo);
        listUsers = self.RooneveshtUsersList();
        countUsers = listUsers.length;

        list_ErjUsersRoneveshtSelect = new Array();
        counterErjUsersRonevesht = countUsers;

        $("#TableBodyListErjUsersRonevesht").empty();
        for (var i = 0; i < countUsers; i++) {
            list_ErjUsersRoneveshtSelect[i] = listUsers[i].ToUserCode;

            $('#TableBodyListErjUsersRonevesht').append(
                '<tr data-bind="">'
                + ' <td data-bind="text: Code">' + listUsers[i].ToUserCode + '</td > '
                + ' <td data-bind="text: Name">' + listUsers[i].ToUserName + '</td > '
                + ' <td data-bind="text: Spec"> </td >'
                + '</tr>'
            );
        }


        $('#e_Result').val(result.RjComm);

        $('#nameErjBe').val(result.ToUserName);
        self.ErjUsersCode(result.ToUserCode);

        if (countUsers == 0)
            $('#nameRoneveshtBe').val('هیچکس');
        else
            $('#nameRoneveshtBe').val(countUsers + ' مورد انتخاب شده ');

        $('#RjMhltDate').val(Band.RjMhltDate);

        rjTime = result.RjTimeSt.split(":");
        $('#RjTime_H').val(rjTime[0]);
        $('#RjTime_M').val(rjTime[1]);

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

    /*  if (sessionStorage.userModeErj == 'USER') {
          $('#FromUser').prop('disabled', true);
          $('#ToUser').prop('disabled', true);
      }
      else {
          $('#FromUser').prop('disabled', false);
          $('#ToUser').prop('disabled', false);
      }
      */






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

        if (serialNumber > 0) {
            autosize.update($('#Result'));
        }

    });


    $('#modal-ErjDocErja').on('hide.bs.modal', function () {
        getDocB_Last();
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
        if (sessionStorage.ModeCodeErja == "1") {
            flagSave = null;
            ErjSaveDoc_BSave(bandNo);
            $('#e_Result').val($('#Result').val());
            $('#nameErjBe').val('انتخاب نشده');
            $('#nameRoneveshtBe').val('هیچکس');
            $('#RjMhltDate').val('');
            $('#RjTime_M').val('');
            $('#RjTime_H').val('');
        }
        $('.fix').attr('class', 'form-line focused fix');
    });


    $('#saveErja').click(function () {

        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();

        if (self.ErjUsersCode() == null) {
            return showNotification('ارجاع شونده را انتخاب کنید', 0);
        }

        if (rjTime_H == '' && rjTime_M == '' || rjTime_H == '0' && rjTime_M == '0') {
            return showNotification('زمان صرف شده را وارد کنید', 0);
        }

        natijeh = $("#e_Result").val();

        if (natijeh == '') {
            return showNotification('متن ارجاع را وارد کنید', 0);
        }

        flagSave = false;
        //ErjSaveDoc_BSave(bandNo);

        if (sessionStorage.ModeCodeErja == "1") {
            ErjSaveDoc_BSave(0);
        } else {
            ErjSaveDoc_BSave(bandNo);
        }

        if (counterErjUsersRonevesht > 0) {
            if (sessionStorage.ModeCodeErja == "2") {
                ErjSaveDoc_CD(bandNo);
                ErjSaveDoc_CSave(bandNo, false);
            }
            else
                ErjSaveDoc_CSave(bandNo + 1, false);
        }
        list_ErjUsersRoneveshtSelect = new Array();
        counterErjUsersRonevesht = 0;
    })

    var flagSave;

    $('#saveParvandeh').click(function () {
        flagSave = true;
        if (docBMode == 1) { // رونوشت
            ErjSaveDoc_CD(bandNo);
            ErjSaveDoc_CSave(bandNo, true);
        }
        else {
            ErjSaveDoc_BSave(bandNo);
        }
    })



    //Add DocB  ذخیره ارجاعات
    function ErjSaveDoc_BSave(bandNoImput) {
        rjDate = ShamsiDate();
        rjMhltDate = $("#RjMhltDate").val().toEnglishDigit();
        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();

        fromUserCode = sessionStorage.userName;


        if (self.ErjUsersCode() == null && bandNoImput == 0) {
            //   return showNotification('ارجاع شونده را انتخاب کنید', 0);
        }

        toUserCode = self.ErjUsersCode();

        if (bandNoImput == 0 || sessionStorage.ModeCodeErja == "2") {
            if (rjTime_H != '' || rjTime_M != '') {

                if (rjTime_M != '') {
                    rjTime_M = parseInt(rjTime_M);
                    rjTime_M = rjTime_M / 60;
                }
                else {
                    rjTime_M = parseInt('0');
                }

                if (rjTime_H != '') {
                    rjTime_H = parseInt(rjTime_H);
                }
                else {
                    rjTime_H = parseInt("0");
                }


                rjTime = rjTime_H + rjTime_M;
            }
            else {
                //  return showNotification('زمان صرف شده را وارد کنید', 0);
            }
        }

        var ErjSaveDoc_BSaveObject;
        if (bandNoImput == 0 || sessionStorage.ModeCodeErja == "2") { // erja
            natijeh = $("#e_Result").val();

            if (natijeh == '') {
                //   return showNotification('متن ارجاع را وارد کنید', 0);
            }


            ErjSaveDoc_BSaveObject = {
                SerialNumber: serialNumber,
                Natijeh: natijeh,
                FromUserCode: fromUserCode,
                ToUserCode: toUserCode,
                RjDate: rjDate,
                RjTime: rjTime,
                RjMhltDate: rjMhltDate,
                BandNo: bandNoImput,
                SrMode: sessionStorage.ModeCodeErja == "1" ? 0 : 1
            };
        }
        else // save
        {
            natijeh = $("#Result").val();
            //if (natijeh == '') {
            //    return showNotification('متن ارجاع را وارد کنید', 0);
            //}
            ErjSaveDoc_BSaveObject = {
                SerialNumber: serialNumber,
                Natijeh: natijeh,
                FromUserCode: '',
                ToUserCode: '',
                RjDate: rjDate,
                RjTime: 0,
                RjMhltDate: '',
                BandNo: bandNoImput,
                SrMode: sessionStorage.ModeCodeErja == "1" ? 0 : 1
            };

            status = $("#m_StatusParvandeh").val();

            ErjSaveDoc_HStatusObject = {
                SerialNumber: serialNumber,
                Status: status
            };
            ajaxFunction(ErjSaveDoc_HStatusUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_HStatusObject).done(function (response) {

            });

        }


        ajaxFunction(ErjSaveDoc_BSaveUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_BSaveObject).done(function (response) {
            //bandNo = response;

            if (flagSave == true) {
                $('#modal-ErjDocErja').modal('hide');
            }
            else if (flagSave == false) {
                $('#modal-Erja').modal('hide');
                $('#modal-ErjDocErja').modal('hide');
            }

            // list_ErjUsersRoneveshtSelect = new Array();
            // counterErjUsersRonevesht = 0;
            $("#TableBodyListErjUsersRonevesht").empty();

            if (flagSave != null)
                getDocB_Last();

        });
        flagInsertFdoch = 1;
    };















    //Add DocC  ذخیره رونوشت
    function ErjSaveDoc_CSave(bandNoImput, isSave) {
        rjDate = ShamsiDate();
        // toUserCode = 1; // انتخاب شده ها برای رونوشت

        fromUserCode = sessionStorage.userName;
        toUser = self.ErjUsersCode();

        var obj = [];

        if (isSave == false) { // رونوشت به

            for (i = 1; i <= list_ErjUsersRoneveshtSelect.length; i++) {
                if (list_ErjUsersRoneveshtSelect[i - 1] != toUser) {
                    tmp = {
                        'SerialNumber': serialNumber,
                        'BandNo': bandNoImput,
                        'Natijeh': '',
                        'ToUserCode': list_ErjUsersRoneveshtSelect[i - 1],
                        'RjDate': rjDate
                    };
                    obj.push(tmp);
                } else {
                    notUsers = true;
                }
            }
        }
        else // ذخیره پرونده های رونوشت
        {
            natijeh = $("#Result").val();
            if (natijeh == '') {
                return showNotification('متن نتیجه را وارد کنید', 0);
            }
            //if (list_ErjUsersRoneveshtSelect[i - 1] != toUser) {
            tmp = {
                'SerialNumber': serialNumber,
                'BandNo': bandNoImput,
                'Natijeh': natijeh,
                'ToUserCode': fromUserCode,
                'RjDate': rjDate
            };
            obj.push(tmp);
            //}
        }

        ajaxFunction(ErjSaveDoc_CSaveUri + aceErj + '/' + salErj + '/' + group, 'POST', obj).done(function (response) {
            $('#modal-Erja').modal('hide');
            $('#modal-ErjDocErja').modal('hide');
            //getDocB_Last();
        });
        flagInsertFdoch = 1;
    };



    //Delete DocC  حذف رونوشت
    function ErjSaveDoc_CD(bandNoImput) {
        obj = {
            'SerialNumber': serialNumber,
            'BandNo': bandNoImput,
        };
        ajaxFunction(ErjSaveDoc_CDUri + aceErj + '/' + salErj + '/' + group, 'POST', obj).done(function (response) {
        });
    };



    self.radif = function (index) {
        countShow = self.pageSizeDocB_Last();
        page = self.currentPageIndexDocB_Last();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableReport").empty();

        html =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableDocB_Last">' +
            '<th>ردیف</th>' +
            CreateTableTh('RjStatus', data) +
            CreateTableTh('RjDate', data) +
            CreateTableTh('RjMhltDate', data) +
            CreateTableTh('CustName', data) +
            CreateTableTh('KhdtName', data) +
            CreateTableTh('FromUserName', data) +
            CreateTableTh('ToUserName', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('DocNo', data) +
            CreateTableTh('MhltDate', data) +
            '<th>عملیات</th>' +
            '      </tr>' +
            '   </thead >' +

            '<tbody data-bind="foreach: currentPageDocB_Last" data-dismiss="modal" style="cursor: default;">' +
            '   <tr data-bind="click: $parent.selectDocB_Last , css: { matched: $data === $root.firstMatch() }">' +
            //'<td style="background-color: ' + colorRadif + ';">' +
            //style: {\'text-decoration\': RjReadSt == \'T\'  ? \'underline\' : null , \'font-size\': RjReadSt == \'T\'  ? \'13px\' : \'11px\' } 

        '<td style="background-color: ' + colorRadif + ';">' +
            '<div style="display: flex; padding-top: 5px;"><span data-bind="text: $root.radif($index()) "> </span> ' +
            '<i data-bind="style: {\'display\': RjReadSt == \'F\'  ? \'none\' : \'unset\'}" class="material-icons" style="color: #3f4d58;height: 16px;font-size:16px;padding-right:10px;">notifications_none</i>' +//   <span data-bind="text: RjReadSt == \'T\' ? \'X\' : null"></span> ' +
            '</div></td>' +

            CreateTableTd('RjStatus', 0, 1, data) +
            CreateTableTd('RjDate', 0, 0, data) +
            CreateTableTd('RjMhltDate', 0, 0, data) +
            CreateTableTd('CustName', 0, 0, data) +
            CreateTableTd('KhdtName', 0, 0, data) +
            CreateTableTd('FromUserName', 0, 0, data) +
            CreateTableTd('ToUserName', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('MhltDate', 0, 0, data) +
            '<td>';

        if (sessionStorage.ModeCodeErja == "1") // دریافتی
            html +=
                '<a data-bind="click: $root.ViewErjDocErja" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-ErjDocErja" >' +
                '    <i class="far fa-share" style="font-size: 12px;"></i>  ' +
                '    </a >';
        else // ارسالی
            html +=
                '<a data-bind="click: $root.UpdateErjDocErja" id="UpdateErja" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-Erja" >' +
                '   <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px">' +
                '</a >' +
                '<a data-bind="click: $root.ViewErjDocErja" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-ErjDocErja" >' +
                '      <img src="/Content/img/view.svg" width = "18" height = "18" style = "margin-left:10px"/>   ' +
                '</a >';


        html +=
            '    <a data-bind="click: $root.ViewDocAttach , visible: DocAttachExists == 1" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-DocAttach" >' +
            '        <img src="/Content/img/list/attach_file.png" width="18" height="18" style="margin-left:10px" />' +
            '    </a >' +
            '</td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +


            /*' <tr style="background-color:#e37d228f;">' +
            '<td></td>' +
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
            ' </tr>' +*/
            '  <tr style="background-color: #efb68399;">' +
            '<td>جستجو</td>' +
            CreateTableTdSearch('RjStatus', data) +
            CreateTableTdSearch('RjDate', data) +
            CreateTableTdSearch('RjMhltDate', data) +
            CreateTableTdSearch('CustName', data) +
            CreateTableTdSearch('KhdtName', data) +
            CreateTableTdSearch('FromUserName', data) +
            CreateTableTdSearch('ToUserName', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('MhltDate', data) +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'

        $('#TableReport').append(html);
    }

    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);
        //sortField = field == 'DocNo' ? 'SortDocNo' : field
        sortField = field;
        if (TextField == 0)
            text += 'Hidden ';

        text += 'data-column="' + sortField + '">' +
            '<span data-column="' + sortField + '">' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + sortField + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }"  data-column="' + sortField + '" ></i> </span> ' +
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

    self.SearchKeyDown = function (viewModel, e) {
        return KeyPressSearch(e);
    }

    function CreateTableTdSearch(field, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        type = FindTypeField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }" type="text" class="type_' + type;
        text += ' form-control" style="height: 2.4rem;direction: ltr;text-align: right;" /> </td>'; return text;
    }

    createViewer();


    $('#Print').click(function () {
        printVariable = '"ReportDate":"' + DateNow + '",';
        setReport(self.filterDocB_LastList(), 'Free', printVariable);
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


    $("#AddParvandeh").click(function () {

    });


};

ko.applyBindings(new ViewModel());

