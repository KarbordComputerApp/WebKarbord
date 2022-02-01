var ViewModel = function () {
    var self = this;

    var serialNumber = 0;
    var serialNumberAttach = 0;
    var bandNo = 0;
    var docBMode = 0;

    var SpecialCommTrs;

    if (sessionStorage.ModeCodeErja == null) {
        sessionStorage.ModeCodeErja = localStorage.getItem("ModeCodeErja");

    }


    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.FarayandList = ko.observableArray([]); // لیست فرایند 
    self.ErjUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.RepToUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.RepFromUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.MahramanehList = ko.observableArray([]); // لیست محرمانه 
    self.RooneveshtUsersList = ko.observableArray([]); // لیست افرادی که رونوشت دارند
    self.ErjResultList = ko.observableArray([]); // لیست نتیجه 

    self.DocB_LastList = ko.observableArray([]); // لیست گزارش  
    self.ErjDocErja = ko.observableArray([]); // لیست پرونده  
    self.DocKList = ko.observableArray([]); // لیست گزارش پرونده

    self.DocAttachList = ko.observableArray([]); // لیست پیوست

    TestUser();

    var ErjUsersUri = server + '/api/Web_Data/Web_ErjUsers/'; // آدرس کاربران زمان ارجاع

    var RepToUsersUri = server + '/api/Web_Data/Web_RepToUsers/'; // آدرس ارجاع شونده 
    var RepFromUsersUri = server + '/api/Web_Data/Web_RepFromUsers/'; // آدرس ارجاع دهنده 
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 

    var MahramanehUri = server + '/api/Web_Data/Web_Mahramaneh/'; // آدرس محرمانه
    var RooneveshtUsersListUri = server + '/api/Web_Data/Web_RooneveshtUsersList/'; // لیست افرادی که رونوشت دارند
    var ErjResultUri = server + '/api/Web_Data/Web_ErjResult/'; // آدرس نتیجه
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var FarayandUri = server + '/api/Web_Data/Farayand/'; // آدرس فرایند 
    var DocB_LastUri = server + '/api/Web_Data/Web_ErjDocB_Last/'; // آدرس گزارش
    var ErjDocErjaUri = server + '/api/Web_Data/Web_ErjDocErja/'; // آدرس  پرونده
    //var RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var DocKUri = server + '/api/Web_Data/ErjDocK/'; // آدرس گزارش پرونده
    var ErjSaveDoc_BSaveUri = server + '/api/Web_Data/ErjSaveDoc_BSave/'; // آدرس ذخیره ارجاع
    var ErjSaveDoc_HStatusUri = server + '/api/Web_Data/ErjSaveDoc_HStatus/'; // آدرس ذخیره وضعیت
    var ErjSaveDoc_CSaveUri = server + '/api/Web_Data/ErjSaveDoc_CSave/'; // آدرس ذخیره رونوشت
    var ErjSaveDoc_CDUri = server + '/api/Web_Data/ErjSaveDoc_CD/'; // آدرس حذف رونوشت
    var ErjSaveDoc_RooneveshtsUri = server + '/api/Web_Data/ErjSaveDoc_Rooneveshts/'; // آدرس ویرایش رونوشت

    var ErjSaveDoc_RjRead_Uri = server + '/api/Web_Data/ErjSaveDoc_RjRead/'; // آدرس ذخیره دیدن ارجاع

    var DocAttachUri = server + '/api/Web_Data/DocAttach/'; // آدرس لیست پیوست 
    var DownloadAttachUri = server + '/api/Web_Data/DownloadAttach/'; // آدرس  دانلود پیوست 

    var ErjDocAttach_SaveUri = server + '/api/FileUpload/UploadFile/'; // ذخیره پیوست
    var ErjDocAttach_DelUri = server + '/api/Web_Data/ErjDocAttach_Del/'; // حذف پیوست

    var Web_ErjSaveDoc_HUUri = server + '/api/ErjDocH/ErjSaveDoc_HU/'; // آدرس ویرایش پرونده


    self.AzDocDate = ko.observable('');
    self.TaDocDate = ko.observable('');
    self.AzRjDate = ko.observable('');
    self.TaRjDate = ko.observable('');
    self.AzMhltDate = ko.observable('');
    self.TaMhltDate = ko.observable('');
    self.e_MhltErja = ko.observable('');
    self.ErjUsersCode = ko.observable();
    self.ToUserCode = ko.observable();
    self.FarayandCode = ko.observable();

    self.Status = ko.observable();

    var ErjUsersRoneveshtCode = '';
    var counterErjUsersRonevesht = 0;
    var list_ErjUsersRoneveshtSelect = new Array();

    var ErjaMode;

    var lastUserErjCode = '';
    var lastUserErjName = '';


    var flag_IsChange = false;
    var flag_Save = false;
    var old_Spec = '';
    var old_StatusParvandeh = '';
    var old_StatusErja = '';
    var old_EghdamComm = '';
    var old_DocDesc = '';
    var old_FinalComm = '';
    var old_SpecialComm = '';
    var old_RjResult = '';
    var old_CodeFarayand = '';
    var old_CodeErjBe = '';
    var old_CodeRoneveshtBe = '';
    var old_RjMhltDate = '';
    var old_RjTime_M = '';
    var old_RjTime_H = '';



    function AddDocBMode() {
        select = document.getElementById('DocBMode');
        for (var i = 1; i <= 3; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = 4;
                opt.innerHTML = translate('کلیه ارجاعات');
            }
            if (i == 2) {
                opt.value = 5;
                opt.innerHTML = translate('فقط ارجاعات اصلی');
                opt.selected = true;
            }
            if (i == 3) {
                opt.value = 6;
                opt.innerHTML = translate('فقط رونوشت ها');
            }
            select.appendChild(opt);
        }
    }

    if (sessionStorage.ModeCodeErja == "1") {
        $("#title_erja").text(translate('ارجاعات پرونده دریافتی'));
        $("#titlePage").text(translate('ارجاعات پرونده دریافتی'));
        $("#titleSaveErja").text(translate('ارجاع جدید'));
        AddDocBMode();
        $('#showDocBMode').css('display', 'block');

    }
    else {
        $("#title_erja").text(translate('ارجاعات پرونده ارسالی'));
        $("#titlePage").text(translate('ارجاعات پرونده ارسالی'));
        $("#titleSaveErja").text(translate('تغییر ارجاع'));
        $('#showDocBMode').css('display', 'none');
    }


    //showDocBMode




    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    //var rprtId = 'ErjDocB_Last';
    var rprtId = sessionStorage.ModeCodeErja == '1' ? 'ErjDocB_Last_D' : 'ErjDocB_Last_E';

    var columns = [];

    if (sessionStorage.ModeCodeErja == '1') {
        columns = [
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
            'MhltDate',
            //'FarayandCode',
            'FarayandName'
        ];
    }
    else {
        columns = [
            'RjDate',
            'RjMhltDate',
            'CustName',
            'KhdtName',
            'FromUserName',
            'ToUserName',
            'Spec',
            'Status',
            'DocNo',
            'MhltDate',
            //'FarayandCode',
            'FarayandName'
        ];
    }


    //Get RprtCols List
    function getRprtColsList(FlagSetting) {
        cols = getRprtColsErj(rprtId, sessionStorage.userName);
        ListColumns = cols;
        if (FlagSetting) {
            CreateTableReport(data)
        }
        else {
            CreateTableColumn(columns);
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        }
        /*
        ajaxFunction(RprtColsUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            data = TranslateData(data);
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
        */

    }

    //Get RprtColsDefult List
    function getRprtColsDefultList() {
       ajaxFunction(RprtColsDefultUri + aceErj + '/' + salErj + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data, rprtId);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(aceErj, salErj, group, rprtId, "/ERJ/Erja", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
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
        SaveColumn(aceErj, salErj, group, rprtId, "/ERJ/Erja", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);


   /* //Get ExtraFields List
    function getExtraFieldsList() {
        ajaxFunction(ExtraFieldsUri + aceErj + '/' + salErj + '/' + group + '/DOC', 'GET').done(function (data) {
            self.ExtraFieldsList(data);
        });
    }*/

    function getExtraFieldsList() {
        
        cols = getRprtColsErj('ErjDocH', sessionStorage.userName);

        result = ko.utils.arrayFilter(cols, function (item) {
            result =
                (ko.utils.stringStartsWith(item.Code, 'F0') ||
                    ko.utils.stringStartsWith(item.Code, 'F1') ||
                    ko.utils.stringStartsWith(item.Code, 'F2')) &&
                item.Name != ''
            return result;
        })
        self.ExtraFieldsList(result);
    }

    getExtraFieldsList();


    //Get ErjUsers List
    function getErjUsersList() {

        ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group + '/' + sessionStorage.userName, 'GET').done(function (data) {
            self.ErjUsersList(data);
        });

        /*list = localStorage.getItem('ErjUsers');
        if (list != null && Reload == false) {
            list = JSON.parse(localStorage.getItem('ErjUsers'));
            self.ErjUsersList(list)
        }
        else {
            ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group + '/' + sessionStorage.userName, 'GET').done(function (data) {
                self.ErjUsersList(data);
                localStorage.setItem("ErjUsers", JSON.stringify(data));
            });
        }*/
    }

    $('#btnErjBe').click(function () {
        if (self.ErjUsersList().length == 0) {
            getErjUsersList();
        }
    });


    $('#btnRoneveshtBe').click(function () {
        if (self.ErjUsersList().length == 0) {
            getErjUsersList();
        }
    });


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
        list = localStorage.getItem('Mahramaneh');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('Mahramaneh'));
            self.MahramanehList(list)
        }
        else {
            ajaxFunction(MahramanehUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
                self.MahramanehList(data);
                localStorage.setItem("Mahramaneh", JSON.stringify(data));
            });
        }
    }


    //Get RooneveshtUsersList
    function getRooneveshtUsersList(serial, bandNo) {

        var RooneveshtUsersList_Object = {
            SerialNumber: serial,
            BandNo: bandNo
        }

        ajaxFunction(RooneveshtUsersListUri + aceErj + '/' + salErj + '/' + group, 'POST', RooneveshtUsersList_Object).done(function (data) {
            self.RooneveshtUsersList(data);
            //old_CodeRoneveshtBe = data;
        });
    }

    //Get ErjResult List
    function getErjResultList(serialNumber, bMode, toUser, band) {

        var ErjResultObject = {
            SerialNumber: serialNumber,
            BandNo: band,
            DocBMode: bMode,
            ToUserCode: toUser,
        }

        ajaxFunction(ErjResultUri + aceErj + '/' + salErj + '/' + group + '/', 'Post', ErjResultObject).done(function (data) {
          
                if (bMode == null)
                    self.ErjResultList(data);
                item = data[0];

                bandNo = item.BandNo;
                $("#Result").val(item.RjResult);
                old_RjResult = $("#Result").val();
        });
    }


    //Get ErjStatus List
    function getErjStatusList() {

        list = localStorage.getItem('ErjStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('ErjStatus'));
            self.ErjStatusList(list)
        }
        else {
            ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
                self.ErjStatusList(data);
                localStorage.setItem("ErjStatus", JSON.stringify(data));
            });
        }
    }

    var doc_KhdtCode = 0;

    //Get Farayand List
    function getFarayandList(KhdtCode) {
        /*list = localStorage.getItem('Farayand');
        if (list != null && Reload == false) {
            list = JSON.parse(localStorage.getItem('Farayand'));
            self.FarayandList(list)
        }
        else {*/
        ajaxFunction(FarayandUri + aceErj + '/' + salErj + '/' + group + '/' + KhdtCode, 'GET').done(function (data) {
            self.FarayandList(data);
            localStorage.setItem("Farayand", JSON.stringify(data));
        });
        // }
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
    //getFarayandList(false);
    //getRepToUsersList();
    //getRepFromUsersList();
    getMahramanehList();



    /*function AddDocBMode() {
        select = document.getElementById('DocBMode');
        for (var i = 1; i <= 6; i++) {
            opt = document.createElement('option');
            if (i == 1) {
                opt.value = i;
                opt.innerHTML = 'کلیه ارجاعات و رونوشتها';
            }
            if (i == 2) {
                opt.value = i;
                opt.innerHTML = 'کلیه ارجاعات اصلی';
            }
            if (i == 3) {
                opt.value = i;
                opt.innerHTML = 'کلیه رونوشتها';
            }
            if (i == 4) {
                opt.value = i;
                opt.innerHTML = 'آخرین ارجاعات و رونوشتها';
                opt.selected = true;
            }
            if (i == 5) {
                opt.value = i;
                opt.innerHTML = 'آخرین ارجاعات اصلی';
            }
            if (i == 6) {
                opt.value = i;
                opt.innerHTML = 'آخرین رونوشتها';
            }
            select.appendChild(opt);
        }
    }*/

    //RjMhltDate


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
        ajaxFunction(DocB_LastUri + aceErj + '/' + salErj + '/' + group, 'POST', DocB_LastObject, false).done(function (response) {
            self.DocB_LastList(response);
        });
        // self.sortTableDocB_Last();
    }

    getDocB_Last();

    self.DocBModeChange = function () {
        getDocB_Last();
        self.sortTableDocB_Last();
    }



    $('#refreshErja').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ارجاعات") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getDocB_Last();
                self.sortTableDocB_Last();
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
            r = res[i] == "" ? "‍‍" : res[i];
            tempText += '<p>' + r + '</p> '
        }
        return tempText;
    }

    var lastBand = 0;
    function SetDataErjDocErja() {
        list = self.ErjDocErja();

        listLastBand = self.ErjResultList();
        countBand = list[list.length - 1].BandNo;
        textLastBand = '';
        for (var j = 0; j < listLastBand.length; j++) {
            if (listLastBand[j].DocBMode == 0 && listLastBand[j].RjResult != '') {
                textLastBand +=
                    '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('نتیجه ثبت شده توسط :')+'</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div > '
            }
            else if (listLastBand[j].DocBMode == 1) {
                lastBand = listLastBand[j].BandNo;
                //lastRonevesht += listLastBand[j].ToUserCode + ',';
                textLastBand +=
                    '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #e2e1e17d !important;color: #39414b;border-radius: 10px;"> '
                textLastBand += '<div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('رونوشت به :')+'</h6> <h6>' + listLastBand[j].ToUserName + '</h6> </div></div >'

                if (listLastBand[j].ToUserCode == sessionStorage.userName) {
                    $('#Result').val(listLastBand[j].RjResult);
                }

            }


            if (listLastBand[j].RjResult == '') {
                if (listLastBand[j].DocBMode > 0) {
                    textLastBand += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">' + "‍‍";
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
                + '   <div class=" form-inline" > <h6 style="padding-left: 4px;">' + translate('نتیجه رونوشت از :')+'</h6> <h6>' + listBand[j].FromUserName + '</h6>'
                    + '   </div>'
                    + '</div > '
                if (listBand[j].RjComm == '')
                    text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;color: #a7a3a3cc;font-style: italic;background-color: #e2e1e12e;border-radius: 10px;">' + "‍‍";
                else {
                    text += ' <div style="margin: 0px 15px 0px 10px;font-size: 12px;background-color: #e2e1e12e;border-radius: 10px;"> ';
                    text += ConvertComm(listBand[j].RjComm);
                }
                text += ' </div> ';
            }



            if (listBand[0].RooneveshtUsers != '' && i < countBand) {

                text += '</br>'
                    + '  <div style="padding: 3px;margin: 0px 10px 0px 10px;background-color: #d9d9d9 !important;color: #555555;border-radius: 10px;">'
                    + '   <div class=" form-inline" > <h6> ' + translate('رونوشت به : ')
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
                + '</div>';


            if (listBand[0].FarayandName != "") {
                textBody += '<div class="form-inline" style = "margin-top: 5px;"> '
                    + '     <div class= "col-md-12 form-inline" > '
                    + '         <h6>' + translate('فرایند : ')+ listBand[0].FarayandName + '</h6>'
                    + '     </div>'
                    + '</div>';
            }





            textBody += '</div>'
                + '<div class="body" style="padding:10px;">';

            textBody += text
            if (i == countBand)
                textBody += textLastBand

            textBody += '</div>'
                + '        </div>'
                + '    </div>'
                + '</div>'


            $('#BodyErjDocErja').append(textBody);
        }
        lastUserErjCode = listBand[0].FromUserCode;
        lastUserErjName = listBand[0].FromUserName;


        // updateScroll();
    }


    /*function updateScroll() {
        var element = document.getElementById("BodyErjDocErja");
        element.scrollTop = element.scrollHeight;
    }

    setInterval(updateScroll, 1000);*/

    var element = document.getElementById("BodyErjDocErja");
    element.scrollTop = element.scrollHeight;



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
    self.filterFarayandCode = ko.observable("");
    self.filterFarayandName = ko.observable("");


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
        var filterFarayandCode = self.filterFarayandCode();
        var filterFarayandName = self.filterFarayandName();



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
                (item.MhltDate == null ? '' : item.MhltDate.toString().search(filterMhltDate) >= 0) &&
                (item.FarayandCode == null ? '' : item.FarayandCode.toString().search(filterFarayandCode) >= 0) &&
                (item.FarayandName == null ? '' : item.FarayandName.toString().search(filterFarayandName) >= 0)
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
    self.iconTypeFarayandCode = ko.observable("");
    self.iconTypeFarayandName = ko.observable("");


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


        self.search("");
        self.currentColumn(orderProp);

        a = self.DocB_LastList();

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
        self.iconTypeFarayandCode('');
        self.iconTypeFarayandName('');



        if (orderProp == 'SortRjStatus') self.iconTypeRjStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortRjDate') self.iconTypeRjDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'RjMhltDate') self.iconTypeRjMhltDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CustName') self.iconTypeCustName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'KhdtName') self.iconTypeKhdtName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FromUserName') self.iconTypeFromUserName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ToUserName') self.iconTypeToUserName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MhltDate') self.iconTypeMhltDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FarayandCode') self.iconTypeFarayandCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FarayandName') self.iconTypeFarayandName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };














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
            title: mes_Refresh,
            text: translate("لیست پیوست ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
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
            title: translate('تایید حذف'),
            text: translate("آیا پیوست انتخابی حذف شود ؟"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
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
                    showNotification(translate('پیوست حذف شد'), 1);
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
            title: translate('تایید آپلود ؟'),
            text: translate("آیا") + ' ' + name +' '+ translate("به پیوست افزوده شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
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


                    attachDate = DateNow;

                    var formData = new FormData();

                    formData.append("SerialNumber", serialNumber);
                    formData.append("ProgName", "ERJ1");
                    formData.append("ModeCode", 1);
                    formData.append("BandNo", 0);
                    formData.append("Code", "");
                    formData.append("Comm", translate("مدرک پیوست")+ ' - ' + attachDate + " - " + sessionStorage.userNameFa + " - " + fileName);
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
            title: mes_Refresh,
            text: translate("لیست کاربران") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getErjUsersList();
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
            title: mes_Refresh,
            text: translate("لیست کاربران") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getErjUsersList();
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
            $('#nameRoneveshtBe').val(counterErjUsersRonevesht +  ' ' + translate('مورد انتخاب شده'))
        else
            $('#nameRoneveshtBe').val(translate('هیچکس'));
    });

    $('#modal-ErjUsersRonevesht').on('shown.bs.modal', function () {
        $('.fix').attr('class', 'form-line focused fix');
    });












    self.currentPageFarayand = ko.observable();
    pageSizeFarayand = localStorage.getItem('pageSizeFarayand') == null ? 10 : localStorage.getItem('pageSizeFarayand');
    self.pageSizeFarayand = ko.observable(pageSizeFarayand);
    self.currentPageIndexFarayand = ko.observable(0);

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.currentPageFarayand = ko.observable();
    self.filterFarayand0 = ko.observable("");
    self.filterFarayand1 = ko.observable("");
    self.filterFarayand2 = ko.observable("");

    self.filterFarayandList = ko.computed(function () {

        self.currentPageIndexFarayand(0);
        var filter0 = self.filterFarayand0().toUpperCase();
        var filter1 = self.filterFarayand1();
        var filter2 = self.filterFarayand2();

        if (!filter0 && !filter1 && !filter2) {
            return self.FarayandList();
        } else {
            tempData = ko.utils.arrayFilter(self.FarayandList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filter0) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageFarayand = ko.computed(function () {
        var pageSizeFarayand = parseInt(self.pageSizeFarayand(), 10),
            startIndex = pageSizeFarayand * self.currentPageIndexFarayand(),
            endIndex = startIndex + pageSizeFarayand;
        localStorage.setItem('pageSizeFarayand', pageSizeFarayand);
        return self.filterFarayandList().slice(startIndex, endIndex);
    });

    self.nextPageFarayand = function () {
        if (((self.currentPageIndexFarayand() + 1) * self.pageSizeFarayand()) < self.filterFarayandList().length) {
            self.currentPageIndexFarayand(self.currentPageIndexFarayand() + 1);
        }
    };

    self.previousPageFarayand = function () {
        if (self.currentPageIndexFarayand() > 0) {
            self.currentPageIndexFarayand(self.currentPageIndexFarayand() - 1);
        }
    };

    self.firstPageFarayand = function () {
        self.currentPageIndexFarayand(0);
    };


    self.lastPageFarayand = function () {
        countFarayand = parseInt(self.filterFarayandList().length / self.pageSizeFarayand(), 10);
        if ((self.filterFarayandList().length % self.pageSizeFarayand()) == 0)
            self.currentPageIndexFarayand(countFarayand - 1);
        else
            self.currentPageIndexFarayand(countFarayand);
    };

    self.sortTableFarayand = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.FarayandList.sort(function (left, right) {
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
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    };

    $('#refreshFarayand').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست فرایندها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getFarayandList(doc_KhdtCode);
            }
        })
    })

    self.selectFarayand = function (item) {
        $('#nameFarayand').val(item.Name);
        self.FarayandCode(item.Code);
    }


    $('#modal-Farayand').on('shown.bs.modal', function () {
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
            doc_KhdtCode = item.KhdtCode;
            $("#m_CustName").val(item.CustName);
            $("#m_KhdtName").val(item.KhdtName);
            $("#m_Spec").val(item.Spec);
            $("#m_RelatedDocs").val(item.RelatedDocs);


            $("#eghdamComm").val(item.EghdamComm);

            if (item.Eghdam == sessionStorage.userName)
                $('#eghdamComm').attr('readonly', false);
            else
                $('#eghdamComm').attr('readonly', true);

            $("#docDesc").val(item.DocDesc);

            specialComm = item.SpecialComm;
            SpecialCommTrs = item.SpecialCommTrs;
            $("#specialComm").val(translate('برای نمایش کلیک کنید'));
            $("#specialComm").attr('readonly', true);

            TextHighlight("#specialComm");

            $("#finalComm").val(item.FinalComm);

            sessionStorage.F01 = item.F01;
            sessionStorage.F02 = item.F02;
            sessionStorage.F03 = item.F03;
            sessionStorage.F04 = item.F04;
            sessionStorage.F05 = item.F05;
            sessionStorage.F06 = item.F06;
            sessionStorage.F07 = item.F07;
            sessionStorage.F08 = item.F08;
            sessionStorage.F09 = item.F09;
            sessionStorage.F10 = item.F10;
            sessionStorage.F11 = item.F11;
            sessionStorage.F12 = item.F12;
            sessionStorage.F13 = item.F13;
            sessionStorage.F14 = item.F14;
            sessionStorage.F15 = item.F15;
            sessionStorage.F16 = item.F16;
            sessionStorage.F17 = item.F17;
            sessionStorage.F18 = item.F18;
            sessionStorage.F19 = item.F19;
            sessionStorage.F20 = item.F20;


            flag_Save = false;
            old_Spec = item.Spec;
            old_EghdamComm = $("#eghdamComm").val();
            old_DocDesc = $("#docDesc").val();
            old_FinalComm = $("#finalComm").val();
            old_SpecialComm = item.SpecialComm;

            $("#ExtraFields1").val(sessionStorage.F01);
            $("#ExtraFields2").val(sessionStorage.F02);
            $("#ExtraFields3").val(sessionStorage.F03);
            $("#ExtraFields4").val(sessionStorage.F04);
            $("#ExtraFields5").val(sessionStorage.F05);
            $("#ExtraFields6").val(sessionStorage.F06);
            $("#ExtraFields7").val(sessionStorage.F07);
            $("#ExtraFields8").val(sessionStorage.F08);
            $("#ExtraFields9").val(sessionStorage.F09);
            $("#ExtraFields10").val(sessionStorage.F10);
            $("#ExtraFields11").val(sessionStorage.F11);
            $("#ExtraFields12").val(sessionStorage.F12);
            $("#ExtraFields13").val(sessionStorage.F13);
            $("#ExtraFields14").val(sessionStorage.F14);
            $("#ExtraFields15").val(sessionStorage.F15);
            $("#ExtraFields16").val(sessionStorage.F16);
            $("#ExtraFields17").val(sessionStorage.F17);
            $("#ExtraFields18").val(sessionStorage.F18);
            $("#ExtraFields19").val(sessionStorage.F19);
            $("#ExtraFields20").val(sessionStorage.F20);

            $("#ExtraFields1").val(item.F01);
            $("#ExtraFields2").val(item.F02);
            $("#ExtraFields3").val(item.F03);
            $("#ExtraFields4").val(item.F04);
            $("#ExtraFields5").val(item.F05);
            $("#ExtraFields6").val(item.F06);
            $("#ExtraFields7").val(item.F07);
            $("#ExtraFields8").val(item.F08);
            $("#ExtraFields9").val(item.F09);
            $("#ExtraFields10").val(item.F10);
            $("#ExtraFields11").val(item.F11);
            $("#ExtraFields12").val(item.F12);
            $("#ExtraFields13").val(item.F13);
            $("#ExtraFields14").val(item.F14);
            $("#ExtraFields15").val(item.F15);
            $("#ExtraFields16").val(item.F16);
            $("#ExtraFields17").val(item.F17);
            $("#ExtraFields18").val(item.F18);
            $("#ExtraFields19").val(item.F19);
            $("#ExtraFields20").val(item.F20);


            //getErjResultList(serialnumber, docBMode, self.ToUserCode());
            getErjResultList(serialnumber, null, null, null)

        });
    }

    $('#specialComm').click(function () {
        if (SpecialCommTrs == 1) {
            if ($("#specialComm").css('font-style') == 'italic') {
                TextHighlightDel("#specialComm");
                $("#specialComm").attr('readonly', false);
                $("#specialComm").val(specialComm);
            }
        }
        else
            showNotification(translate('دسترسی ندارید'), 0);
    })


    $('#erja').click(function () {
         $('#p_Result').css('display', 'none');
        $('#modal-Erja').modal('show');
        
    });

    self.ViewErjDocErja = function (Band) {
        serialNumber = Band.SerialNumber;
        if (TestUseSanad(aceErj, salErj, "ErjDocH", serialNumber, true, Band.DocNo) == true) {
            // showNotification('پرونده در تب دیگری در حال ویرایش است', 0)
        }
        else {
            docBMode = Band.DocBMode;
            serialNumber = Band.SerialNumber;
            getDocK(serialNumber)
            getErjDocErja(serialNumber);

            $('#m_StatusParvandeh').val(Band.Status);
            $('#m_StatusErja').val(Band.RjStatus);

            old_StatusParvandeh = Band.Status;
            old_StatusErja = Band.RjStatus;



            $('#erja').removeAttr('hidden', '');
            $('#saveParvandeh').removeAttr('hidden', '');
            $('#panel_Result').removeAttr('hidden', '');
            $('#m_StatusParvandeh').prop('disabled', false);
            $('#m_StatusErja').prop('disabled', false);

            if (docBMode == 1) { // رونوشت
                $('#panelFooterParvandeh').attr('hidden', '');
                $('#panelFooterRonevesht').removeAttr('hidden', '');
                $('#erja').attr('hidden', '');

                $('#p_SaptDate').val(DateNow);
                $('#p_RjTime_M').val('');
                $('#p_RjTime_H').val('');


                if (Band.RjTime > 0) {
                    $('#p_SaptDate').val(Band.RjDate);
                    rjtimeRonevesht = Band.RjTimeSt.split(":");
                    $('#p_RjTime_H').val(rjtimeRonevesht[0]);
                    $('#p_RjTime_M').val(rjtimeRonevesht[1]);
                }

            }
            else {
                $('#panelFooterParvandeh').removeAttr('hidden', '');
                $('#panelFooterRonevesht').attr('hidden', '');
                $('#erja').removeAttr('hidden', '');
            }

            if (Band.ToUserCode != sessionStorage.userName || sessionStorage.ModeCodeErja == "2") {
                flag_Save = true;
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

                ajaxFunction(ErjSaveDoc_RjRead_Uri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_RjRead_Object).done(function (response) {
                    //AlertErja();
                });
            }
            $('#modal-ErjDocErja').modal('show');
        }
    }


    window.onbeforeunload = function () {
        RemoveUseSanad(aceErj, salErj,"ErjDocH", serialNumber);
    };


    self.UpdateErjDocErja = function (Band) {
        $('#p_Result').css('display', 'none');

        serialNumber = Band.SerialNumber;
        if (TestUseSanad(aceErj, salErj, "ErjDocH", serialNumber, true, Band.DocNo) == true) {
            // showNotification('پرونده در تب دیگری در حال ویرایش است', 0)
        }
        else {

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
                    //+ ' <td data-bind="text: Spec"> </td >'
                    + '</tr>'
                );
            }



            var ErjResultObject = {
                SerialNumber: serialNumber,
                BandNo: bandNo,
                DocBMode: null,
                ToUserCode: result.ToUserCode,
            }

            ajaxFunction(ErjResultUri + aceErj + '/' + salErj + '/' + group + '/', 'Post', ErjResultObject).done(function (data) {
                $("#p_Result").empty();
                counter = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].RjResult != '') {
                        counter++;
                        html =
                            '<div class="header" style="background-color: #f5d3b4;">' +
                            '    <div class="row form-inline modal-header" style="padding:0px;">' +
                            '        <h6>';
                        if (data[i].DocBMode == 1) {
                            html += ' ' + translate('نتیجه رونوشت از') + ' ' +  data[i].ToUserName;
                        }
                        else {
                            html += ' ' + translate('نتیجه ارجاع از') + ' ' +  data[i].ToUserName
                        }
                        html +=
                            '</h6>' +
                            '    </div>' +
                            '</div>' +
                            '<div class="body" style="padding:5px;">' +
                            '    <div class="form-group" style="margin-bottom: 0.5rem;">' +
                            '        <div class="form-line">' +
                            '            <textarea class="form-control no-resize auto-growth string" style="border-bottom-width:0px;" readonly>' + data[i].RjResult + '</textarea>' +
                            '        </div>' +
                            '    </div>' +
                            '</div>'
                        $('#p_Result').append(html);
                    }
                }
                if (counter > 0) {
                    $('#p_Result').css('display', 'block');
                }
                $('#modal-Erja').modal('show');
            });





            $('#e_Result').val(result.RjComm);

            $('#nameFarayand').val(Band.FarayandName);
            self.FarayandCode(Band.FarayandCode);


            $('#nameErjBe').val('(' + result.ToUserCode + ') ' + result.ToUserName);
            self.ErjUsersCode(result.ToUserCode);

            if (countUsers == 0)
                $('#nameRoneveshtBe').val(translate('هیچکس'));
            else
                $('#nameRoneveshtBe').val(countUsers +  ' ' + translate('مورد انتخاب شده'));

            $('#RjMhltDate').val(Band.RjMhltDate);

            rjTime = result.RjTimeSt.split(":");
            $('#RjTime_H').val(rjTime[0]);
            $('#RjTime_M').val(rjTime[1]);


            old_RjResult = $('#e_Result').val();
            old_CodeFarayand = Band.FarayandCode;
            old_CodeErjBe = result.ToUserCode;
            old_CodeRoneveshtBe = list_ErjUsersRoneveshtSelect;
            old_RjMhltDate = Band.RjMhltDate;
            old_RjTime_H = rjTime[0];
            old_RjTime_M = rjTime[1];
        }
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





    var showHideInformation = false;

    var showHideSpec = false;
    var showHideEghdamComm = false;
    var showHideDocDesc = false;
    var showHideSpecialComm = false;
    var showHideFinalComm = false;

    var showHideResult = false;

    $("#modal-ErjDocErja").on('shown.bs.modal', function () {

        $("#comm").prop("readonly", false);
        setTimeout(function () {
            var element = document.getElementById("BodyErjDocErja");
            element.scrollTop = element.scrollHeight;
        }, 100);

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


    $("#modal-ErjDocErja").on('hide.bs.modal', function () {
        $("#comm").prop("readonly", true);
        getDocB_Last();
        self.sortTableDocB_Last();
        
            RemoveUseSanad(aceErj, salErj, "ErjDocH", serialNumber);
    });



    $("#Close_ModalErjDocErja").click(function (e) {
        if (flag_Save == false) {
            if ($("#specialComm").css('font-style') == 'italic')
                special = specialComm;
            else
                special = $("#specialComm").val();

            flag_IsChange1 = ($("#m_Spec").val() != old_Spec);
            flag_IsChange2 = ($("#m_StatusParvandeh").val() != old_StatusParvandeh);
            flag_IsChange3 = ($("#m_StatusErja").val() != old_StatusErja);
            flag_IsChange4 = ($("#eghdamComm").val() != old_EghdamComm);
            flag_IsChange5 = (special != old_SpecialComm);
            flag_IsChange6 = ($("#docDesc").val() != old_DocDesc);
            flag_IsChange7 = ($("#finalComm").val() != old_FinalComm);
            flag_IsChange8 = (($("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val()) != sessionStorage.F01);
            flag_IsChange9 = (($("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val()) != sessionStorage.F02);
            flag_IsChange10 = (($("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val()) != sessionStorage.F03);
            flag_IsChange11 = (($("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val()) != sessionStorage.F04);
            flag_IsChange12 = (($("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val()) != sessionStorage.F05);
            flag_IsChange13 = (($("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val()) != sessionStorage.F06);
            flag_IsChange14 = (($("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val()) != sessionStorage.F07);
            flag_IsChange15 = (($("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val()) != sessionStorage.F08);
            flag_IsChange16 = (($("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val()) != sessionStorage.F09);
            flag_IsChange17 = (($("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val()) != sessionStorage.F10);
            flag_IsChange18 = (($("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val()) != sessionStorage.F11);
            flag_IsChange19 = (($("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val()) != sessionStorage.F12);
            flag_IsChange20 = (($("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val()) != sessionStorage.F13);
            flag_IsChange21 = (($("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val()) != sessionStorage.F14);
            flag_IsChange22 = (($("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val()) != sessionStorage.F15);
            flag_IsChange23 = (($("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val()) != sessionStorage.F16);
            flag_IsChange24 = (($("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val()) != sessionStorage.F17);
            flag_IsChange25 = (($("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val()) != sessionStorage.F18);
            flag_IsChange26 = (($("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val()) != sessionStorage.F19);
            flag_IsChange27 = (($("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val()) != sessionStorage.F20);

            flag_IsChange28 = ($("#Result").val() != old_RjResult);



            if (flag_IsChange1 || flag_IsChange2 || flag_IsChange3 || flag_IsChange4 || flag_IsChange5 || flag_IsChange6 ||
                flag_IsChange7 || flag_IsChange8 || flag_IsChange9 || flag_IsChange10 || flag_IsChange11 ||
                flag_IsChange12 || flag_IsChange13 || flag_IsChange14 || flag_IsChange15 || flag_IsChange16 ||
                flag_IsChange17 || flag_IsChange18 || flag_IsChange19 || flag_IsChange20 || flag_IsChange21 ||
                flag_IsChange22 || flag_IsChange23 || flag_IsChange24 || flag_IsChange25 || flag_IsChange26 ||
                flag_IsChange27 || flag_IsChange28) {


                Swal.fire({
                    title: translate('ثبت تغییرات'),
                    text: translate("پرونده تغییر کرده است آیا ذخیره شود ؟"),
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#3085d6',
                    cancelButtonText: text_No,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText: text_Yes,
                    showDenyButton: true,
                    showCancelButton: true
                }).then((result) => {
                    if (result.value == true) {
                        SaveParvandeh();
                        $('#modal-ErjDocErja').modal('hide');
                    } else if (result.dismiss == "cancel") {
                        $('#modal-ErjDocErja').modal('hide');
                    }
                })
            }
            else {
                $('#modal-ErjDocErja').modal('hide');
            }
        } else {
            $('#modal-ErjDocErja').modal('hide');
        }


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

            if (SpecialCommTrs == 1) {
                if ($("#specialComm").css('font-style') == 'italic') {
                    $("#specialComm").attr('readonly', false);
                    TextHighlightDel("#specialComm");
                    $("#specialComm").val(specialComm);
                }
            }
            autosize.update($('#specialComm'));
            autosize.update($('#finalComm'));
            $('#imgSpec').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
        }

    })



    $('#ShowEghdamComm').click(function () {
        $('#titleComm').text(translate('اقدام'));
        $('#modal-Comm').modal('show');
        $('#comm').attr("style", "");
        $('#comm').val($('#eghdamComm').val());
    });

    $('#ShowDocDesc').click(function () {
        $('#titleComm').text(translate('عمومی'));
        $('#modal-Comm').modal('show');
        $('#comm').attr("style", "");
        $('#comm').val($('#docDesc').val());
    });

    $('#ShowSpecialComm').click(function () {
        if (SpecialCommTrs == 1) {
            if ($("#specialComm").css('font-style') == 'italic') {
                $("#specialComm").attr('readonly', false);
                TextHighlightDel("#specialComm");
                $("#specialComm").val(specialComm);
            }
            $('#titleComm').text(translate('مدیران'));
            $('#modal-Comm').modal('show');
            $('#comm').attr("style", "");
            $('#comm').val($('#specialComm').val());
        }
    });

    $('#ShowFinalComm').click(function () {
        $('#titleComm').text(translate('نهایی'));
        $('#modal-Comm').modal('show');
        $('#comm').attr("style", "");
        $('#comm').val($('#finalComm').val());
    });

    /*$('#ShowHideEghdamComm').click(function () {
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
    })*/




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

    var flagSave;
    var flagIsSave



    $('#modal-Erja').on('shown.bs.modal', function () {
        //$('#p_Result').css('display', 'none');
        flagIsSave = false;
        $('#e_Result').css("height", "409px");
        if (sessionStorage.ModeCodeErja == "1") {
            flagSave = null;
            ErjSaveDoc_BSave(bandNo);
            $('#e_Result').val($('#Result').val());
            if (lastUserErjCode != '' && lastUserErjName != '') {
                $('#nameErjBe').val('(' + lastUserErjCode + ') ' + lastUserErjName);
                self.ErjUsersCode(lastUserErjCode);
            }
            else {
                $('#nameErjBe').val(translate('انتخاب نشده'));
            }
            $('#nameFarayand').val('');
            $('#nameRoneveshtBe').val(translate('هیچکس'));
            $('#RjMhltDate').val('');
            $('#RjTime_M').val('');
            $('#RjTime_H').val('');

            old_RjResult = $('#e_Result').val();
            old_CodeFarayand = self.FarayandCode();
            old_CodeErjBe = self.ErjUsersCode();
            old_CodeRoneveshtBe = '';
            old_RjMhltDate = '';
            old_RjTime_H = '';
            old_RjTime_M = '';

        }
        getFarayandList(doc_KhdtCode);
        $('.fix').attr('class', 'form-line focused fix');
    });


    $('#modal-Erja').on('hide.bs.modal', function () {
        if (flagIsSave == true) {
            flagIsSave = false;
            if (sessionStorage.ModeCodeErja == "1") {
                ErjSaveDoc_BSave(0);
            } else {
                ErjSaveDoc_BSave(bandNo);
            }

            // if (counterErjUsersRonevesht > 0) {
            if (sessionStorage.ModeCodeErja == "2") {
                ErjSaveDoc_Rooneveshts(bandNo);
                //ErjSaveDoc_CD(bandNo);
                //ErjSaveDoc_CSave(bandNo, false);
            }
            else
                ErjSaveDoc_CSave(bandNo + 1, false);
            //}
            list_ErjUsersRoneveshtSelect = new Array();
            counterErjUsersRonevesht = 0;
        }
        if (sessionStorage.ModeCodeErja == "2") {
            RemoveUseSanad(aceErj, salErj, "ErjDocH", serialNumber);
        }
    });




    $("#Close_ModalErj").click(function (e) {
        if (flagIsSave == false) {
            flag_IsChange1 = ($("#e_Result").val() != old_RjResult);
            flag_IsChange2 = (self.FarayandCode() != old_CodeFarayand);
            flag_IsChange3 = (self.ErjUsersCode() != old_CodeErjBe);
            flag_IsChange4 = (list_ErjUsersRoneveshtSelect != old_CodeRoneveshtBe);
            flag_IsChange5 = ($("#RjMhltDate").val() != old_RjMhltDate);
            flag_IsChange6 = ($("#RjTime_M").val() != old_RjTime_M);
            flag_IsChange7 = ($("#RjTime_H").val() != old_RjTime_H);




            if (flag_IsChange1 || flag_IsChange2 || flag_IsChange3 || flag_IsChange4 || flag_IsChange5 || flag_IsChange6 ||
                flag_IsChange7) {
                Swal.fire({
                    title: translate('ثبت تغییرات'),
                    text: translate("ارجاع تغییر کرده است آیا ذخیره شود ؟"),
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#3085d6',
                    cancelButtonText: text_No,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText: text_Yes,
                    showDenyButton: true,
                    showCancelButton: true
                }).then((result) => {
                    if (result.value == true) {
                        SaveErja();
                    } else if (result.dismiss == "cancel") {
                        $('#modal-Erja').modal('hide');
                    }
                })
            }
            else {
                $('#modal-Erja').modal('hide');
            }
        } else {
            $('#modal-Erja').modal('hide');
        }


    });




    function SaveErja() {
        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();

        if (self.ErjUsersCode() == null) {
            return showNotification(translate('ارجاع شونده را انتخاب کنید'), 0);
        }

        if (rjTime_H == '' && rjTime_M == '' || rjTime_H == '0' && rjTime_M == '0') {
            return showNotification(translate('زمان صرف شده را وارد کنید'), 0);
        }

        natijeh = $("#e_Result").val();

        if (natijeh == '') {
            return showNotification(translate('متن ارجاع را وارد کنید'), 0);
        }

        flagSave = false;
        flagIsSave = true;

        //showNotification('در حال ارجاع ، لطفا منتظر بمانید', 3);

        $('#modal-Erja').modal('hide');
        $('#modal-ErjDocErja').modal('hide');
        //ErjSaveDoc_BSave(bandNo);


        /*
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
        */
    }

    $('#saveErja').click(function () {
        SaveErja();
    })







    function SaveParvandeh() {
        flagSave = true;
        if (docBMode == 1) { // رونوشت
            trs = localStorage.getItem("userModeErj");
            if (trs == 'ADMIN') {
                SaveDoch();
            }

            ErjSaveDoc_CD(bandNo);
            ErjSaveDoc_CSave(bandNo, true);
        }
        else {
            ErjSaveDoc_BSave(bandNo);
        }
    }


    $('#saveParvandeh').click(function () {
        SaveParvandeh();
        /*// $('html').css('cursor', 'wait');
        flagSave = true;
        if (docBMode == 1) { // رونوشت
            // ErjSaveDoc_BSave(bandNo);

            trs = localStorage.getItem("userModeErj");
            if (trs == 'ADMIN') {
                SaveDoch();
            }

            ErjSaveDoc_CD(bandNo);
            ErjSaveDoc_CSave(bandNo, true);
        }
        else {
            //$('#modal-ErjDocErja').modal('hide');
            ErjSaveDoc_BSave(bandNo);
        }
        // $('html').css('cursor', 'default');*/
    })



    function SaveDoch() {
        status = $("#m_StatusParvandeh").val();

        if ($("#specialComm").css('font-style') == 'italic')
            special = specialComm;
        else
            special = $("#specialComm").val();



        ErjSaveDoc_HUObject = { // ذخیره اطلاعات پرونده
            SerialNumber: serialNumber,
            Tanzim: sessionStorage.userName,
            Status: status,
            Spec: $("#m_Spec").val(),
            DocDesc: $("#docDesc").val(),
            EghdamComm: $("#eghdamComm").val(),
            FinalComm: $("#finalComm").val(),
            SpecialComm: special,
            F01: $("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val(),
            F02: $("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val(),
            F03: $("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val(),
            F04: $("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val(),
            F05: $("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val(),
            F06: $("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val(),
            F07: $("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val(),
            F08: $("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val(),
            F09: $("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val(),
            F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val(),
            F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val(),
            F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val(),
            F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val(),
            F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val(),
            F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val(),
            F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val(),
            F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val(),
            F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val(),
            F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val(),
            F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val(),
        };

        ajaxFunction(Web_ErjSaveDoc_HUUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_HUObject).done(function (response) {
            flag_Save = true;
        });
    }

    //Add DocB  ذخیره ارجاعات
    function ErjSaveDoc_BSave(bandNoImput) {
        rjDate = DateNow;
        rjMhltDate = $("#RjMhltDate").val().toEnglishDigit();
        rjTime_H = $("#RjTime_H").val();
        rjTime_M = $("#RjTime_M").val();

        fromUserCode = sessionStorage.userName;


        if (self.ErjUsersCode() == null && bandNoImput == 0) {
            //   return showNotification(translate('ارجاع شونده را انتخاب کنید', 0);
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
                //  return showNotification(translate('زمان صرف شده را وارد کنید', 0);
            }
        }

        var ErjSaveDoc_BSaveObject;
        if (bandNoImput == 0 || sessionStorage.ModeCodeErja == "2") { // erja
            natijeh = $("#e_Result").val();

            if (natijeh == '') {
                //   return showNotification(translate('متن ارجاع را وارد کنید', 0);
            }


            ErjSaveDoc_BSaveObject = {
                SerialNumber: serialNumber,
                Natijeh: natijeh,
                FromUserCode: fromUserCode,
                ToUserCode: toUserCode,
                RjDate: '',//rjDate,
                RjTime: rjTime,
                RjMhltDate: rjMhltDate,
                BandNo: bandNoImput,
                SrMode: sessionStorage.ModeCodeErja == "1" ? 0 : 1,
                RjStatus: $("#m_StatusErja").val(),
                FarayandCode: self.FarayandCode(),
            };
        }
        else // save
        {

            SaveDoch();
            status = $("#m_StatusParvandeh").val();

            /* ErjSaveDoc_HUObject = { // ذخیره اطلاعات پرونده
                 SerialNumber: serialNumber,
                 Tanzim: sessionStorage.userName,
                 Status: status,
                 Spec: $("#m_Spec").val(),
                 DocDesc: $("#docDesc").val(),
                 EghdamComm: $("#eghdamComm").val(),
                 FinalComm: $("#finalComm").val(),
                 SpecialComm: $("#specialComm").val(),
                 F01: $("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val(),
                 F02: $("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val(),
                 F03: $("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val(),
                 F04: $("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val(),
                 F05: $("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val(),
                 F06: $("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val(),
                 F07: $("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val(),
                 F08: $("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val(),
                 F09: $("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val(),
                 F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val(),
                 F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val(),
                 F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val(),
                 F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val(),
                 F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val(),
                 F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val(),
                 F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val(),
                 F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val(),
                 F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val(),
                 F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val(),
                 F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val(),
             };
 
             ajaxFunction(Web_ErjSaveDoc_HUUri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_HUObject).done(function (response) {
 
             });*/


            natijeh = $("#Result").val();

            ErjSaveDoc_BSaveObject = {
                SerialNumber: serialNumber,
                Natijeh: natijeh,
                FromUserCode: '',
                ToUserCode: '',
                RjDate: '',//rjDate,
                RjTime: 0,
                RjMhltDate: '',
                BandNo: bandNoImput,
                SrMode: sessionStorage.ModeCodeErja == "1" ? 0 : 1,
                RjStatus: $("#m_StatusErja").val(),
                FarayandCode: 0,
            };



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
                showNotification(translate('پرونده') + ' ' + serialNumber + ' ' + translate('ذخیره شد'), 1);
                //$('#modal-ErjDocErja').modal('hide');
            }
            else if (flagSave == false) {
                //$('#modal-Erja').modal('hide');
                // $('#modal-ErjDocErja').modal('hide');
               // AlertErja();
            }

            // list_ErjUsersRoneveshtSelect = new Array();
            // counterErjUsersRonevesht = 0;
            $("#TableBodyListErjUsersRonevesht").empty();

            if (flagSave != null) {
                getDocB_Last();
                self.sortTableDocB_Last();
            }

        });
        flagInsertFdoch = 1;
    };















    //Add DocC  ذخیره رونوشت
    function ErjSaveDoc_CSave(bandNoImput, isSave) {

        rjDate = DateNow;
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
                        'RjDate': rjDate,
                        'RjTime': 0
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
            rjDate = $("#p_SaptDate").val().toEnglishDigit();
            rjTime_H = $("#p_RjTime_H").val();
            rjTime_M = $("#p_RjTime_M").val();

            if (rjTime_H == '' && rjTime_M == '' || rjTime_H == '0' && rjTime_M == '0') {
                return showNotification(translate('زمان صرف شده را وارد کنید'), 0);
            }

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


            if (natijeh == '') {
                return showNotification(translate('متن نتیجه را وارد کنید'), 0);
            }




            //if (list_ErjUsersRoneveshtSelect[i - 1] != toUser) {
            tmp = {
                'SerialNumber': serialNumber,
                'BandNo': bandNoImput,
                'Natijeh': natijeh,
                'ToUserCode': fromUserCode,
                'RjDate': rjDate,
                'RjTime': rjTime
            };
            obj.push(tmp);
            //}
        }

        ajaxFunction(ErjSaveDoc_CSaveUri + aceErj + '/' + salErj + '/' + group, 'POST', obj).done(function (response) {
            $('#modal-Erja').modal('hide');
            showNotification(translate('پرونده') + ' ' + serialNumber + ' ' + translate('ذخیره شد'), 1);

            //$('#modal-ErjDocErja').modal('hide');
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



    //Update ویرایش رونوشت ها در ارسالی
    function ErjSaveDoc_Rooneveshts(bandNoImput) {

        fromUserCode = sessionStorage.userName;
        toUserCode = self.ErjUsersCode();
        toUserCodes = '';
        for (var i = 0; i < list_ErjUsersRoneveshtSelect.length; i++) {
            if (i < list_ErjUsersRoneveshtSelect.length - 1)
                toUserCodes += list_ErjUsersRoneveshtSelect[i] + ',';
            else
                toUserCodes += list_ErjUsersRoneveshtSelect[i];

        }

        Web_ErjSaveDoc_Rooneveshts = {
            'SerialNumber': serialNumber,
            // 'FromUserCode': fromUserCode,
            'ToUserCodes': toUserCodes,
            'BandNo': bandNoImput,
            //  'RjDate': '',
        };
        ajaxFunction(ErjSaveDoc_RooneveshtsUri + aceErj + '/' + salErj + '/' + group, 'POST', Web_ErjSaveDoc_Rooneveshts).done(function (response) {
        });
    };




    self.ViewSpec = function (Band) {
        ViewSpec(Band.Spec)
    }


    self.MarkErja = function (Band) {

    }

    self.UnRaedErja = function (Band) {
        ErjSaveDoc_RjRead_Object = {
            DocBMode: Band.DocBMode,
            SerialNumber: Band.SerialNumber,
            BandNo: Band.BandNo,
            RjReadSt: 'T'
        };

        ajaxFunction(ErjSaveDoc_RjRead_Uri + aceErj + '/' + salErj + '/' + group, 'POST', ErjSaveDoc_RjRead_Object).done(function (response) {
            //AlertErja();
            getDocB_Last();
            self.sortTableDocB_Last();
        });

    }

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
        '<th>' + translate('ردیف') + '</th>';

        if (sessionStorage.ModeCodeErja == '1') {
            html += CreateTableTh('RjStatus', data);
        }

        html +=
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
            CreateTableTh('FarayandCode', data) +
            CreateTableTh('FarayandName', data) +

            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +

            '<tbody data-bind="foreach: currentPageDocB_Last" data-dismiss="modal" style="cursor: default;">' +
            '   <tr data-bind="click: $parent.selectDocB_Last , css: { matched: $data === $root.firstMatch() }">' +
            //'<td style="background-color: ' + colorRadif + ';">' +
            //style: {\'text-decoration\': RjReadSt == \'T\'  ? \'underline\' : null , \'font-size\': RjReadSt == \'T\'  ? \'13px\' : \'11px\' } 

            '<td style="background-color: ' + colorRadif + ';">' +
            '<div style="display: flex; padding-top: 5px;"><span data-bind="text: $root.radif($index()) "> </span> ' +
            '<i data-bind="style: {\'display\': RjReadSt == \'F\'  ? \'none\' : \'unset\'}" class="material-icons" style="color: #3f4d58;height: 16px;font-size:16px;padding-right:10px;">notifications_none</i>' +//   <span data-bind="text: RjReadSt == \'T\' ? \'X\' : null"></span> ' +
            '</div></td>';

        if (sessionStorage.ModeCodeErja == '1') {
            html += CreateTableTd('RjStatus', 0, 1, data);
        }

        html += CreateTableTd('RjDate', 0, 0, data) +
            CreateTableTd('RjMhltDate', 0, 3, data) +
            CreateTableTd('CustName', 0, 4, data) +
            CreateTableTd('KhdtName', 0, 0, data) +
            CreateTableTd('FromUserName', 0, 0, data) +
            CreateTableTd('ToUserName', 0, 0, data) +
            CreateTableTd('Spec', 0, 4, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('MhltDate', 0, 2, data) +
            CreateTableTd('FarayandCode', 0, 0, data) +
            CreateTableTd('FarayandName', 0, 0, data) +
            '<td>';

        if (sessionStorage.ModeCodeErja == "1") // دریافتی
            html +=
                '<a class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
                '    <span class="caret"></span>' +
                '</a>' +
                '<ul class="dropdown-menu">' +
                /*'    <li>' +
                '        <a id="MarkErja" data-bind="click: $root.MarkErja" style="font-size: 11px;text-align: right;">' +
                '        <i  class="material-icons" style="color: #3f4d58;height: 16px;font-size:16px;padding-right:10px;">bookmark</i>' +
                '            علامت زدن' +
                '        </a>' +
                '    </li>' +*/
                '    <li data-bind="style: {\'display\': RjReadSt == \'T\'  ? \'none\' : \'unset\'}">' +
                '        <a id="UnRaedErja" data-bind="click: $root.UnRaedErja" style="font-size: 11px;text-align: right;">' +
                '        <i  class="material-icons" style="color: #3f4d58;height: 16px;font-size:16px">notifications_none</i>' +
            translate('خوانده نشده') +
                '        </a>' +
                '    </li>' +
                '</ul>' +
                //'<a data-bind="click: $root.ViewErjDocErja" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-ErjDocErja" data-backdrop="static" data-keyboard="false" style=" margin-left: 10px;">' +
                '<a data-bind="click: $root.ViewErjDocErja" data-backdrop="static" data-keyboard="false" style=" margin-left: 10px;">' +
                '    <i class="far fa-share" style="font-size: 12px;"></i>  ' +
                '    </a >';
        else // ارسالی
            html +=
                //'<a data-bind="click: $root.UpdateErjDocErja" id="UpdateErja" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-Erja" >' +
                '<a data-bind="click: $root.UpdateErjDocErja" id="UpdateErja" >' +
                '   <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px">' +
                '</a >' +
                //'<a data-bind="click: $root.ViewErjDocErja" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-ErjDocErja" data-backdrop="static" data-keyboard="false">' +
                '<a data-bind="click: $root.ViewErjDocErja" data-backdrop="static" data-keyboard="false">' +
                '      <img src="/Content/img/view.svg" width = "18" height = "18" style = "margin-left:10px"/>   ' +
                '</a >';


        html +=
            '    <a data-bind="click: $root.ViewDocAttach , visible: DocAttachExists == 1" class= "dropdown-toggle" data-toggle="modal" data-target="#modal-DocAttach" data-backdrop="static" data-keyboard="false" >' +
            '        <img src="/Content/img/list/attach_file.png" width="18" height="18" style="margin-left:10px" />' +
            '    </a >' +
            '</td >' +
            '</tr>' +
            '</tbody>' +

            ' <tfoot>' +
        '<td style="background-color: #efb683;">' + translate('جستجو') + '</td>';
        if (sessionStorage.ModeCodeErja == '1') {
            html += CreateTableTdSearch('RjStatus', data);
        }
        html +=
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
            CreateTableTdSearch('FarayandCode', data) +
            CreateTableTdSearch('FarayandName', data) +
            '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'

        $('#TableReport').append(html);
    }

    function CreateTableTh(field, data) {

        text = '<th ';

        TextField = FindTextField(field, data);

        sortField = field == 'RjStatus' ? 'SortRjStatus' :


            field == 'RjDate' ? 'SortRjDate' :  field

        //sortField = field;
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

        shamsiDateTemp = "\'" + DateNow + "\'";

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'data-bind="text: RjStatus,style: { color: DocBMode == 1  ? \'#e48f43\' : \'\'}"></td>';
                //text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ' % 10)), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'data-bind="text: ' + field + ',style: { color: ' + field + ' < ' + shamsiDateTemp + '   ? \'red\' : \'\'}"></td>';
                break;

            case 3:
                text += 'data-bind="text: ' + field + ',style: { color: ' + field + ' < ' + shamsiDateTemp + '   ? \'red\' : \'\'}"></td>';
                break;

            case 4:
                text += 'data-bind="text: ' + field + ' , click: $root.View' + field + ' " class="ellipsis"></td>';
                break;
        }
        return text;
    }

    function CreateTableTdSum(field, no, data) {
        text = '<td style="background-color: #e37d228f !important;"';

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

    self.ViewCustName = function (Band) {
        ViewCustName(Band.CustName)
    }



    $("#lastRonevesht").click(function () {

        getRooneveshtUsersList(serialNumber, lastBand);
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
                //+ ' <td data-bind="text: Spec"> </td >'
                + '</tr>'
            );
        }
    });




    self.sortTableDocB_Last();
};

ko.applyBindings(new ViewModel());

