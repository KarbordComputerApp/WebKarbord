var ViewModel = function () {
    var self = this;
    var flagupdateHeader = 0;
    sessionStorage.BeforeMoveSanadAnbar = false;

    var allSearchIDocH = true;
    var defultMove;
    var docDate;
    var serial;
    var invSelected = 0;
    var modeCodeSelected = 0;
    var docnoDelete = 0;

    DocNoReport = localStorage.getItem("DocNoAFISanadAnbar");
    if (DocNoReport != "null" && DocNoReport != null) {
        sessionStorage.removeItem("ModeCode");
        inOut = localStorage.getItem("InOutAFISanadAnbar");
        localStorage.setItem("InOut", inOut);
    }


    if (sessionStorage.ModeCode == null || ShowNewTab != "ShowNewTab") {
        sessionStorage.ModeCode = localStorage.getItem("ModeCode");
        sessionStorage.InOut = localStorage.getItem("InOut");
        sessionStorage.moveSanadAnbar = localStorage.getItem("moveSanadAnbar");
        sessionStorage.AccessPrint_SanadAnbar = localStorage.getItem("AccessPrint_SanadAnbar");
        //sessionStorage.AccessSanad = localStorage.getItem("AccessSanad");
        sessionStorage.lastPageSelect = localStorage.getItem("lastPageSelect");

        if (sessionStorage.InOut == 1) {
            validation = CheckAccess('NEW_IIDOC','Inv5');// new varedae anbar
            sessionStorage.newSanadAnbar = validation;
            validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
            validation == true ? sessionStorage.NEW_IIDOC = true : sessionStorage.NEW_IIDOC = false;


            sessionStorage.moveSanadAnbar = validation;
            localStorage.setItem("moveSanadAnbar", validation);

            validation = CheckAccess('CHG_IIDOC', 'Inv5');// edit varedae anbar
            validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
            validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
            validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")

            validation = CheckAccess('DEL_IIDOC', 'Inv5'); // delete varedae anbar
            validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
            validation == true ? sessionStorage.DEL_IIDOC = true : sessionStorage.DEL_IIDOC = false
            validation == true ? localStorage.setItem("DEL_IIDOC", "true") : localStorage.setItem("DEL_IIDOC", "false")


            //validation = CheckAccess('VIEW_IIDOC'); // VIEW IIDOC 
            //validation == true ? localStorage.setItem("VIEW_IIDOC", "true") : localStorage.setItem("VIEW_IIDOC", "false")


            validation = CheckAccess('PRN_IIDOC', 'Inv5'); // Print
            validation == true ? sessionStorage.AccessPrint_SanadAnbar = true : sessionStorage.AccessPrint_SanadAnbar = false
            validation == true ? localStorage.setItem("AccessPrint_SanadAnbar", "true") : localStorage.setItem("AccessPrint_SanadAnbar", "false")


            validation = CheckAccess('SHOWPRICE_IIDOC', 'Inv5');// AccessPrice
            validation == true ? sessionStorage.Access_SHOWPRICE_IIDOC = true : sessionStorage.Access_SHOWPRICE_IIDOC = false
            validation == true ? localStorage.setItem("Access_SHOWPRICE_IIDOC", "true") : localStorage.setItem("Access_SHOWPRICE_IIDOC", "false")

            validation = CheckAccess('TAEED_IIDOC', 'Inv5');// AccessTaeed
            validation == true ? sessionStorage.Access_TAEED_IIDOC = true : sessionStorage.Access_TAEED_IIDOC = false
            validation == true ? localStorage.setItem("Access_TAEED_IIDOC", "true") : localStorage.setItem("Access_TAEED_IIDOC", "false")

            validation = CheckAccess('CANCEL_IIDOC', 'Inv5');// AccessCANCEL  باطل
            validation == true ? sessionStorage.Access_CANCEL_IIDOC = true : sessionStorage.Access_CANCEL_IIDOC = false
            validation == true ? localStorage.setItem("Access_CANCEL_IIDOC", "true") : localStorage.setItem("Access_CANCEL_IIDOC", "false")

            validation = CheckAccess('TASVIB_IIDOC', 'Inv5');// AccessTasvib
            validation == true ? sessionStorage.Access_TASVIB_IIDOC = true : sessionStorage.Access_TASVIB_IIDOC = false
            validation == true ? localStorage.setItem("Access_TASVIB_IIDOC", "true") : localStorage.setItem("Access_TASVIB_IIDOC", "false")


            //validation = CheckAccess('OTHERUSER_VIEW_IIDOC');// AccessSanad
            //validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
            //validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
            sessionStorage.AccessSanad = localStorage.getItem("AccessSanad_IIDOC");

            validation = CheckAccess('OTHERUSER_CHG_IIDOC', 'Inv5');// AccessViewSanad
            if (validation == true) {
                sessionStorage.AccessViewSanadAnbarVarede = true;
                localStorage.setItem("AccessViewSanadAnbarVarede", "true")
            }
            else {
                sessionStorage.AccessViewSanadAnbarVarede = false;
                localStorage.setItem("AccessViewSanadAnbarVarede", "false")
            }
        }

        if (sessionStorage.InOut == 2) {
            validation = CheckAccess('NEW_IODOC', 'Inv5');// new sadere anbar
            validation == true ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide()
            validation == true ? sessionStorage.NEW_IODOC = true : sessionStorage.NEW_IODOC = false;

            sessionStorage.moveSanadAnbar = validation;
            localStorage.setItem("moveSanadAnbar", validation);


            validation = CheckAccess('CHG_IODOC', 'Inv5');// edit sadere anbar
            validation == true ? $("#UpdateSanadAnbar").show() : $("#UpdateSanadAnbar").hide()
            validation == true ? sessionStorage.CHG = true : sessionStorage.CHG = false
            validation == true ? localStorage.setItem("CHG", "true") : localStorage.setItem("CHG", "false")

            validation = CheckAccess('DEL_IODOC', 'Inv5'); // delete sadere anbar
            validation == true ? $("#DeleteSanadAnbar").show() : $("#DeleteSanadAnbar").hide()
            validation == true ? sessionStorage.DEL_IODOC = true : sessionStorage.DEL_IODOC = false
            validation == true ? localStorage.setItem("DEL_IODOC", "true") : localStorage.setItem("DEL_IODOC", "false")

            //validation = CheckAccess('VIEW_IODOC'); // VIEW IODOC 
            //validation == true ? localStorage.setItem("VIEW_IODOC", "true") : localStorage.setItem("VIEW_IODOC", "false")

            validation = CheckAccess('PRN_IODOC', 'Inv5'); // Print
            validation == true ? sessionStorage.AccessPrint_SanadAnbar = true : sessionStorage.AccessPrint_SanadAnbar = false
            validation == true ? localStorage.setItem("AccessPrint_SanadAnbar", "true") : localStorage.setItem("AccessPrint_SanadAnbar", "false")


            validation = CheckAccess('SHOWPRICE_IODOC', 'Inv5');// AccessPrice
            validation == true ? sessionStorage.Access_SHOWPRICE_IODOC = true : sessionStorage.Access_SHOWPRICE_IODOC = false
            validation == true ? localStorage.setItem("Access_SHOWPRICE_IODOC", "true") : localStorage.setItem("Access_SHOWPRICE_IODOC", "false")

            validation = CheckAccess('TAEED_IODOC', 'Inv5');// AccessTaeed
            validation == true ? sessionStorage.Access_TAEED_IODOC = true : sessionStorage.Access_TAEED_IODOC = false
            validation == true ? localStorage.setItem("Access_TAEED_IODOC", "true") : localStorage.setItem("Access_TAEED_IODOC", "false")

            validation = CheckAccess('CANCEL_IODOC', 'Inv5');// AccessCANCEL  باطل
            validation == true ? sessionStorage.Access_CANCEL_IODOC = true : sessionStorage.Access_CANCEL_IODOC = false
            validation == true ? localStorage.setItem("Access_CANCEL_IODOC", "true") : localStorage.setItem("Access_CANCEL_IODOC", "false")

            validation = CheckAccess('TASVIB_IODOC', 'Inv5');// AccessTasvib
            validation == true ? sessionStorage.Access_TASVIB_IODOC = true : sessionStorage.Access_TASVIB_IODOC = false
            validation == true ? localStorage.setItem("Access_TASVIB_IODOC", "true") : localStorage.setItem("Access_TASVIB_IODOC", "false")

            //validation = CheckAccess('OTHERUSER_VIEW_IODOC');// AccessSanad
           // validation == true ? sessionStorage.AccessSanad = true : sessionStorage.AccessSanad = false
           // validation == true ? localStorage.setItem("AccessSanad", "true") : localStorage.setItem("AccessSanad", "false")
            sessionStorage.AccessSanad = localStorage.getItem("AccessSanad_IODOC");

            validation = CheckAccess('OTHERUSER_CHG_IODOC', 'Inv5');// AccessViewSanad
            if (validation == true) {
                sessionStorage.AccessViewSanadAnbarSadere = true;
                localStorage.setItem("AccessViewSanadAnbarSadere", "true")
            }
            else {
                sessionStorage.AccessViewSanadAnbarSadere = false;
                localStorage.setItem("AccessViewSanadAnbarSadere", "false")
            }

        }

    }


    if (sessionStorage.InOut == 1)
        sessionStorage.NEW_IIDOC == "true" ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide();
    else
        sessionStorage.NEW_IODOC == "true" ? $("#AddNewSanadAnbar").show() : $("#AddNewSanadAnbar").hide();



    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها
    self.IModeAllList = ko.observableArray([]); // لیست نوع اسناد انبار
    self.IModeList = ko.observableArray([]); // لیست نوع اسناد انبار
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.IDocHList = ko.observableArray([]); // لیست اطلاعات انبار 
    self.InvList = ko.observableArray([]); // لیست انبارها
    self.TestIDoc_DeleteList = ko.observableArray([]); // لیست تست حذف 
    self.TestIDoc_NewList = ko.observableArray([]); // لیست تست جدید

    var rprtId = sessionStorage.InOut == 1 ? 'IDocH_I' : 'IDocH_O';

    TestUser();
    var IMoveSanadUri = server + '/api/IDocData/MoveSanad/'; // آدرس انتقال اسناد 
    var IChangeStatusUri = server + '/api/IDocData/ChangeStatus/'; // آدرس تغییر وضعیت اسناد 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت 
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع اسناد 
    var IDocHUri = server + '/api/IDocData/IDocH/'; // آدرس لیست اسناد انبار 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var IDocHiUri = server + '/api/AFI_IDocHi/'; // آدرس هدر سند 
    var IDocHCountUri = server + '/api/IDocData/IDocH/'; // تعداد رکورد های سند 
    var IDoc_DeleteUri = server + '/api/IDocData/TestIDoc_Delete/'; // آدرس تست حذف 
    var TestIDoc_NewUri = server + '/api/IDocData/TestIDoc_New/'; // آدرس تست ایجاد 
    var TestIDoc_EditUri = server + '/api/IDocData/TestIDoc_Edit/'; // آدرس تست ویرایش 



    self.InvCode = ko.observable();
    self.IModeCode = ko.observable();
    self.InvCodeMove = ko.observable();
    self.StatusSanad = ko.observable();


    var columns = [
        'DocNo',
        'DocDate',
        'InvName',
        'ThvlName',
        'ModeName',
        'Spec',
        'Status',
        'Eghdam',
        'Tanzim',
        'Taeed',
        'Tasvib',
        'SerialNumber',
        'MkzCode',
        'MkzName',
        'OprCode',
        'OprName',
        'ThvlEcoCode',
        'ThvlMelliCode',
        'ThvlOstan',
        'ThvlShahrestan',
        'ThvlCity',
        'ThvlRegion',
        'ThvlStreet',
        'ThvlAlley',
        'ThvlPlack',
        'ThvlZipCode',
        'ThvlTel',
        'ThvlMobile',
        'ThvlFax',
        'ThvlEMail',
        'ThvlAddress',
        'F01',
        'F02',
        'F03',
        'F04',
        'F05',
        'F06',
        'F07',
        'F08',
        'F09',
        'F10',
        'F11',
        'F12',
        'F13',
        'F14',
        'F15',
        'F16',
        'F17',
        'F18',
        'F19',
        'F20'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting) {
        cols = getRprtCols(rprtId, sessionStorage.userName);
        if (FlagSetting) {
            CreateTableReport(cols)
        }
        else {
            CreateTableColumn(columns);
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, cols);
            }
        }

        cols = getRprtCols('IDocP', sessionStorage.userName);
        ListColumns = cols;
        /* ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            //ListColumns = data;
            if (FlagSetting) {
                CreateTableReport(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }

            ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + 'IDocP' + '/' + username, 'GET').done(function (data) {
                ListColumns = data;
            });

        });*/

    }

    //Get RprtColsDefult List
    function getRprtColsDefultList() {
        ajaxFunction(RprtColsDefultUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    //Get Status List
    function getStatusList() {
        list = localStorage.getItem('InvStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('InvStatus'));
            self.StatusList(list)
        }
        else {
            progName = getProgName('P');
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
                self.StatusList(data);
                localStorage.setItem("InvStatus", JSON.stringify(data));
            });
        }
    }



    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {
        selectStatus = $("#status").val();
        if (sessionStorage.InOut == 1) {

            if (localStorage.getItem("Access_TAEED_IIDOC") == 'false' && selectStatus == translate('تایید')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی تایید ندارید'), 0);
            }

            if (localStorage.getItem("Access_TASVIB_IIDOC") == 'false' && selectStatus == translate('تصویب')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی تصویب ندارید'), 0);
            }

            if (localStorage.getItem("Access_CANCEL_IIDOC") == 'false' && selectStatus == translate('باطل')) {
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی باطل'), 0);
            }

        }

        if (sessionStorage.InOut == 2) {
            if (localStorage.getItem("Access_TAEED_IODOC") == 'false' && selectStatus == translate('تایید')) {
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی تایید'), 0);
            }

            if (localStorage.getItem("Access_TASVIB_IODOC") == 'false' && selectStatus == translate('تصویب') ){
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی تصویب'), 0);
            }

            if (localStorage.getItem("Access_CANCEL_IODOC") == 'false' && selectStatus == translate('باطل')) {
                $("#status").val(lastStatus);
                return showNotification(translate('نیاز به دسترسی باطل'), 0);
            }

        }


        if (sessionStorage.Status != translate('تایید') && selectStatus == translate('تصویب')) {
            $("#status").val(lastStatus);
            return showNotification(translate('فقط اسناد تایید شده امکان تصویب دارند'), 0);
        }

    });


    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/AFISanadAnbar/index", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/AFISanadAnbar/index", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    if (DocNoReport == "null") {
        getRprtColsList(true, sessionStorage.userName);
    }



    /*$("#aceTest").text('نام نرم افزار' + ace);
    $("#groupTest").text('نام گروه' + group);
    $("#salTest").text('سال مالی' + sal);*/



    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group + '/3/' + sessionStorage.userName, 'GET').done(function (data) {
            self.InvList(data);
            //localStorage.setItem('InvSelectSanadAnbar', '');
            // last = localStorage.getItem('InvSelectSanadAnbar');
            if (sessionStorage.InOut == "1") {
                invSelected = localStorage.getItem('InvSelectSanadAnbar_In') == null ? '' : localStorage.getItem('InvSelectSanadAnbar_In');
            }
            else {
                invSelected = localStorage.getItem('InvSelectSanadAnbar_Out') == null ? '' : localStorage.getItem('InvSelectSanadAnbar_Out');
            }

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

            self.InvCode(invSelected);

        });
    }




    //Get  IMode List
    function getIModeList() {


        var IModeObject = {
            Mode: 3,
            InOut: sessionStorage.InOut,
            UserCode: sessionStorage.userName,
        }

        ajaxFunction(IModeUri + ace + '/' + sal + '/' + group, 'POST', IModeObject).done(function (data) {
            self.IModeList(data);

            if (sessionStorage.InOut == "1") {
                modeCodeSelected = localStorage.getItem('ModeCodeSelectSanadAnbar_In') == null ? '' : localStorage.getItem('ModeCodeSelectSanadAnbar_In');
            }
            else {
                modeCodeSelected = localStorage.getItem('ModeCodeSelectSanadAnbar_Out') == null ? '' : localStorage.getItem('ModeCodeSelectSanadAnbar_Out');
            }
            self.IModeCode(modeCodeSelected);
        });
    }

    getIModeList();


    //Get  IMode List
    function getIModeAllList() {


        var IModeObject = {
            Mode: 3,
            InOut: 0,
            UserCode: sessionStorage.userName,
        }

        ajaxFunction(IModeUri + ace + '/' + sal + '/' + group, 'POST', IModeObject).done(function (data) {
            self.IModeAllList(data);

            var textExc = '';

            textExc = '<select id="modeCodePor">';

            for (var i = 0; i < data.length; i++) {

                if (
                    (CheckAccess('NEW_IIDOC', 'Inv5') && data[i].InOut == 1) ||
                    (CheckAccess('NEW_IODOC', 'Inv5') && data[i].InOut == 2)
                ) {

                    textExc += '<option value="' + data[i].Code + '"';
                    if (data[i].InOut == 1) {
                        textExc += 'style="background-color: #f5e6ac" ';
                    }
                    textExc += '>' + data[i].Name + '</option>';

                }

            }

            textExc += '</select>';

            $("#modeListPor").empty();
            $('#modeListPor').append(textExc);

            dataMove = ko.utils.arrayFilter(self.IModeAllList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.InOut.toString().toLowerCase(), sessionStorage.InOut)
                return result;
            })

            select = document.getElementById('modeCodeMove');
            for (var i = 0; i < dataMove.length; i++) {
                opt = document.createElement('option');
                opt.value = dataMove[i].Code;
                opt.innerHTML = dataMove[i].Name;
                select.appendChild(opt);
            }

        });
    }

    getIModeAllList();

    //var storedNames = JSON.parse(sessionStorage.getItem("inv"));
    // self.InvList(storedNames);

    self.currentPageIndexIDocH = ko.observable(0);

    //Get IDocH
    function getIDocH(select, invCode, modeCode, changeSelector) {
        lastSelect = select;
        sort = localStorage.getItem("sortIdocH_" + sessionStorage.InOut);
        sortType = localStorage.getItem("sortTypeIdocH_" + sessionStorage.InOut);

        if (invCode == "" || invCode == "null" || invCode == null)
            invCode = "";



        invName = '';
        list = self.InvList();
        for (var i = 0; i < list.length; i++) {
            if (list[i].Code == invCode)
                invName = list[i].Name;
        }

        if (invName == '') {
            invCode = "";
            invName = translate('همه انبارها')
        }



        if (modeCode == "" || modeCode == "null" || modeCode == null)
            modeCode = "";

        modeName = '';
        list = self.IModeList();
        for (var i = 0; i < list.length; i++) {
            if (list[i].Code == modeCode)
                modeName = list[i].Name;
        }

        if (modeName == '') {
            modeCode = "";
            modeName = sessionStorage.InOut == 1 ? translate('همه انواع سند وارده') : translate('همه انواع سند صادره');
        }


        var IDocHMinObject = {
            InOut: sessionStorage.InOut,
            select: select,
            invSelect: invCode,
            user: sessionStorage.userName,
            accessSanad: sessionStorage.AccessSanad,
            updatedate: null,
            ModeCode: modeCode == "" ? null : modeCode,
            Sort: sort,
            ModeSort: sortType == "ascending" ? "ASC" : "DESC",
            DocNo: '',
        }

        ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group, 'POST', IDocHMinObject, true).done(function (data) {
            flagupdateHeader = 0;
            sessionStorage.flagupdateHeader = 0;
            self.IDocHList(data);
            //self.currentPageIndexIDocH(0);
            //ajaxFunction(IDocHCountUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.InOut + '/Count', 'GET').done(function (dataCount) {
            //    $('#countAllRecord').text(dataCount);
            // });
            self.currentPageIndexIDocH(0);

            if (sessionStorage.InOut == "1") {
                localStorage.setItem('InvSelectSanadAnbar_In', invCode);
                localStorage.setItem('ModeCodeSelectSanadAnbar_In', modeCode);
            }
            else {
                localStorage.setItem('InvSelectSanadAnbar_Out', invCode);
                localStorage.setItem('ModeCodeSelectSanadAnbar_Out', modeCode);
            }

            invSelected = invCode;
            modeCodeSelected = modeCode;

            if (sessionStorage.InOut == 1)
                textNoSanad = ' ' + translate('وارده') + ' ';
            else
                textNoSanad = ' ' + translate('صادره') + ' ';


            if (invCode == "")
                $('#titlePage').text(translate('اسناد') + ' ' + textNoSanad + ' ' + translate('همه انبارها'));
            else
                $('#titlePage').text(translate('اسناد') + ' ' + textNoSanad + AppendAnbar(invName));

        });


        if (sort == "" || sort == "null" || sort == null) {
            sort = "DocDate";
            sortType = "descending";
        }

        if (sort == "SortDocNo") {
            sort = "DocNo"
        }

        if (changeSelector == false) {
            TextField = FindTextField(sort, ListColumns);
            $('#pageCountSelector').empty();
            select = document.getElementById('pageCountSelector');
            for (var i = 1; i <= 2; i++) {
                opt = document.createElement('option');
                if (i == 1) {
                    opt.value = 0;
                    if (sortType == "descending")
                        textSort = ' ' + translate('100 رکورد آخر به ترتیب');
                    else
                        textSort = ' ' + translate('100 رکورد اول به ترتیب');

                    opt.innerHTML = ' ' + textSort + '"' + TextField + '"';
                }
                if (i == 2) {
                    opt.value = 3;
                    opt.innerHTML = translate('تمام رکوردها');
                }
                select.appendChild(opt);
            }
            $('#pageCountSelector').val(lastSelect);
        }
    }

    self.OptionsCaptionAnbar = ko.computed(function () {
        //        return self.InvList().length > 1 ? 'همه انبارها' : 'انبار تعریف نشده است';
        return translate('همه انبارها');
    });


    self.OptionsCaptionIMode = ko.computed(function () {
        if (sessionStorage.InOut == 1)
            return translate('همه انواع سند وارده');
        else
            return translate('همه انواع سند صادره');
    });


    getInvList();
    getStatusList();

    if (DocNoReport == "null") {
        getIDocH(0, invSelected, modeCodeSelected, false);
    }

    $('#invSelect').val(invSelected);
    $('#IMode').val(modeCodeSelected);

    //------------------------------------------------------
    self.currentPageIDocH = ko.observable();

    pageSizeIDocH = localStorage.getItem('pageSizeIDocH') == null ? 10 : localStorage.getItem('pageSizeIDocH');
    self.pageSizeIDocH = ko.observable(pageSizeIDocH);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.filterDocNo = ko.observable("");
    self.filterDocDate = ko.observable("");
    self.filterInvName = ko.observable("");
    self.filterThvlName = ko.observable("");
    self.filterModeName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterStatus = ko.observable("");
    self.filterEghdam = ko.observable("");
    self.filterTanzim = ko.observable("");
    self.filterTaeed = ko.observable("");
    self.filterTasvib = ko.observable("");
    self.filterSerialNumber = ko.observable("");
    self.filterMkzCode = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprCode = ko.observable("");
    self.filterOprName = ko.observable("");
    self.filterThvlRegion = ko.observable("");
    self.filterThvlEcoCode = ko.observable("");
    self.filterThvlMelliCode = ko.observable("");
    self.filterThvlOstan = ko.observable("");
    self.filterThvlShahrestan = ko.observable("");
    self.filterThvlCity = ko.observable("");
    self.filterThvlStreet = ko.observable("");
    self.filterThvlAlley = ko.observable("");
    self.filterThvlPlack = ko.observable("");
    self.filterThvlZipCode = ko.observable("");
    self.filterThvlTel = ko.observable("");
    self.filterThvlMobile = ko.observable("");
    self.filterThvlFax = ko.observable("");
    self.filterThvlEMail = ko.observable("");
    self.filterThvlAddress = ko.observable("");

    self.filterF01 = ko.observable("");
    self.filterF02 = ko.observable("");
    self.filterF03 = ko.observable("");
    self.filterF04 = ko.observable("");
    self.filterF05 = ko.observable("");
    self.filterF06 = ko.observable("");
    self.filterF07 = ko.observable("");
    self.filterF08 = ko.observable("");
    self.filterF09 = ko.observable("");
    self.filterF10 = ko.observable("");
    self.filterF11 = ko.observable("");
    self.filterF12 = ko.observable("");
    self.filterF13 = ko.observable("");
    self.filterF14 = ko.observable("");
    self.filterF15 = ko.observable("");
    self.filterF16 = ko.observable("");
    self.filterF17 = ko.observable("");
    self.filterF18 = ko.observable("");
    self.filterF19 = ko.observable("");
    self.filterF20 = ko.observable("");

    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterDocNo(listFilter[0]);
        self.filterDocDate(listFilter[1]);
        self.filterInvName(listFilter[2]);
        self.filterThvlName(listFilter[3]);
        self.filterModeName(listFilter[4]);
        self.filterSpec(listFilter[5]);
        self.filterStatus(listFilter[6]);
        self.filterEghdam(listFilter[7]);
        self.filterTanzim(listFilter[8]);
        self.filterTaeed(listFilter[9]);
        self.filterTasvib(listFilter[10]);
        self.filterSerialNumber(listFilter[11]);
        self.filterMkzCode(listFilter[12]);
        self.filterMkzName(listFilter[13]);
        self.filterOprCode(listFilter[14]);
        self.filterOprName(listFilter[15]);
        self.filterThvlRegion(listFilter[16]);
        self.filterThvlOstan(listFilter[17]);
        self.filterThvlShahrestan(listFilter[18]);
        self.filterThvlCity(listFilter[19]);
        self.filterThvlStreet(listFilter[20]);
        self.filterThvlAlley(listFilter[21]);
        self.filterThvlPlack(listFilter[22]);
        self.filterThvlZipCode(listFilter[23]);
        self.filterThvlTel(listFilter[24]);
        self.filterThvlMobile(listFilter[25]);
        self.filterThvlFax(listFilter[26]);
        self.filterThvlEMail(listFilter[27]);
        self.filterThvlAddress(listFilter[28]);
        self.filterF01(listFilter[29]);
        self.filterF02(listFilter[30]);
        self.filterF03(listFilter[31]);
        self.filterF04(listFilter[32]);
        self.filterF05(listFilter[33]);
        self.filterF06(listFilter[34]);
        self.filterF07(listFilter[35]);
        self.filterF08(listFilter[36]);
        self.filterF09(listFilter[37]);
        self.filterF10(listFilter[38]);
        self.filterF11(listFilter[39]);
        self.filterF12(listFilter[40]);
        self.filterF13(listFilter[41]);
        self.filterF14(listFilter[42]);
        self.filterF15(listFilter[43]);
        self.filterF16(listFilter[44]);
        self.filterF17(listFilter[45]);
        self.filterF18(listFilter[46]);
        self.filterF19(listFilter[47]);
        self.filterF20(listFilter[48]);
        self.filterThvlEcoCode(listFilter[49]);
        self.filterThvlMelliCode(listFilter[50]);

    }



    self.filterIDocHList = ko.computed(function () {
        self.currentPageIndexIDocH(0);
        var filterDocNo = self.filterDocNo();
        var filterDocDate = self.filterDocDate();
        var filterInvName = self.filterInvName();
        var filterThvlName = self.filterThvlName();
        var filterModeName = self.filterModeName();
        var filterSpec = self.filterSpec();
        var filterStatus = self.filterStatus();
        var filterEghdam = self.filterEghdam().toUpperCase();
        var filterTanzim = self.filterTanzim().toUpperCase();
        var filterTaeed = self.filterTaeed().toUpperCase();
        var filterTasvib = self.filterTasvib().toUpperCase();
        var filterSerialNumber = self.filterSerialNumber();
        var filterMkzCode = self.filterMkzCode();
        var filterMkzName = self.filterMkzName();
        var filterOprCode = self.filterOprCode();
        var filterOprName = self.filterOprName();
        var filterThvlRegion = self.filterThvlRegion();
        var filterThvlOstan = self.filterThvlOstan();
        var filterThvlShahrestan = self.filterThvlShahrestan();
        var filterThvlCity = self.filterThvlCity();
        var filterThvlStreet = self.filterThvlStreet();
        var filterThvlAlley = self.filterThvlAlley();
        var filterThvlPlack = self.filterThvlPlack();
        var filterThvlZipCode = self.filterThvlZipCode();
        var filterThvlTel = self.filterThvlTel();
        var filterThvlMobile = self.filterThvlMobile();
        var filterThvlFax = self.filterThvlFax();
        var filterThvlEMail = self.filterThvlEMail();
        var filterThvlAddress = self.filterThvlAddress();
        var filterF01 = self.filterF01();
        var filterF02 = self.filterF02();
        var filterF03 = self.filterF03();
        var filterF04 = self.filterF04();
        var filterF05 = self.filterF05();
        var filterF06 = self.filterF06();
        var filterF07 = self.filterF07();
        var filterF08 = self.filterF08();
        var filterF09 = self.filterF09();
        var filterF10 = self.filterF10();
        var filterF11 = self.filterF11();
        var filterF12 = self.filterF12();
        var filterF13 = self.filterF13();
        var filterF14 = self.filterF14();
        var filterF15 = self.filterF15();
        var filterF16 = self.filterF16();
        var filterF17 = self.filterF17();
        var filterF18 = self.filterF18();
        var filterF19 = self.filterF19();
        var filterF20 = self.filterF20();
        var filterThvlEcoCode = self.filterThvlEcoCode();
        var filterThvlMelliCode = self.filterThvlMelliCode();

        if (!filterDocNo && !filterDocDate && !filterInvName && !filterThvlName && !filterModeName && !filterSpec && !filterStatus && !filterEghdam &&
            !filterTanzim && !filterTaeed && !filterTasvib && !filterSerialNumber && !filterMkzCode && !filterMkzName && !filterOprCode && !filterOprName &&
            !filterThvlRegion && !filterThvlOstan && !filterThvlShahrestan && !filterThvlCity && !filterThvlStreet && !filterThvlAlley && !filterThvlPlack && !filterThvlZipCode && !filterThvlTel && !filterThvlMobile
            && !filterThvlFax && !filterThvlEMail && !filterThvlAddress &&
            !filterF01 && !filterF02 && !filterF03 && !filterF04 && !filterF05 && !filterF06 && !filterF07 && !filterF08 && !filterF09 && !filterF10 &&
            !filterF11 && !filterF12 && !filterF13 && !filterF14 && !filterF15 && !filterF16 && !filterF17 && !filterF18 && !filterF19 && !filterF20 && !filterThvlEcoCode && !filterThvlMelliCode) {
            $("#CountRecord").text(self.IDocHList().length);
            // $('#CountRecord').text(CountTable('IDocH', null, sessionStorage.InOut));
            sessionStorage.setItem('listFilter', null);
            return self.IDocHList();
        } else {
            listFilter = [
                filterDocNo,
                filterDocDate,
                filterInvName,
                filterThvlName,
                filterModeName,
                filterSpec,
                filterStatus,
                filterEghdam,
                filterTanzim,
                filterTaeed,
                filterTasvib,
                filterSerialNumber,
                filterMkzCode,
                filterMkzName,
                filterOprCode,
                filterOprName,
                filterThvlRegion,
                filterThvlOstan,
                filterThvlShahrestan,
                filterThvlCity,
                filterThvlStreet,
                filterThvlAlley,
                filterThvlPlack,
                filterThvlZipCode,
                filterThvlTel,
                filterThvlMobile,
                filterThvlFax,
                filterThvlEMail,
                filterThvlAddress,
                filterF01,
                filterF02,
                filterF03,
                filterF04,
                filterF05,
                filterF06,
                filterF07,
                filterF08,
                filterF09,
                filterF10,
                filterF11,
                filterF12,
                filterF13,
                filterF14,
                filterF15,
                filterF16,
                filterF17,
                filterF18,
                filterF19,
                filterF20,
                filterThvlEcoCode,
                filterThvlMelliCode
            ];
            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.IDocHList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.DocNo.toString().toLowerCase(), filterDocNo) &&
                    ko.utils.stringStartsWith(item.DocDate.toString().toLowerCase(), filterDocDate) &&
                    (item.InvName == null ? '' : item.InvName.toString().search(filterInvName) >= 0) &&
                    (item.ThvlName == null ? '' : item.ThvlName.toString().search(filterThvlName) >= 0) &&
                    (item.ModeName == null ? '' : item.ModeName.toString().search(filterModeName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.Status == null ? '' : item.Status.toString().search(filterStatus) >= 0) &&
                    (item.Eghdam == null ? '' : item.Eghdam.toString().search(filterEghdam) >= 0) &&
                    (item.Tanzim == null ? '' : item.Tanzim.toString().search(filterTanzim) >= 0) &&
                    (item.Taeed == null ? '' : item.Taeed.toString().search(filterTaeed) >= 0) &&
                    (item.Tasvib == null ? '' : item.Tasvib.toString().search(filterTasvib) >= 0) &&
                    ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), filterSerialNumber) &&
                    (item.MkzCode == null ? '' : item.MkzCode.toString().search(filterMkzCode) >= 0) &&
                    (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                    (item.OprCode == null ? '' : item.OprCode.toString().search(filterOprCode) >= 0) &&
                    (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
                    (item.ThvlRegion == null ? '' : item.ThvlRegion.toString().search(filterThvlRegion) >= 0) &&
                    (item.ThvlOstan == null ? '' : item.ThvlOstan.toString().search(filterThvlOstan) >= 0) &&
                    (item.ThvlShahrestan == null ? '' : item.ThvlShahrestan.toString().search(filterThvlShahrestan) >= 0) &&
                    (item.ThvlCity == null ? '' : item.ThvlCity.toString().search(filterThvlCity) >= 0) &&
                    (item.ThvlStreet == null ? '' : item.ThvlStreet.toString().search(filterThvlStreet) >= 0) &&
                    (item.ThvlAlley == null ? '' : item.ThvlAlley.toString().search(filterThvlAlley) >= 0) &&
                    (item.ThvlPlack == null ? '' : item.ThvlPlack.toString().search(filterThvlPlack) >= 0) &&
                    (item.ThvlZipCode == null ? '' : item.ThvlZipCode.toString().search(filterThvlZipCode) >= 0) &&
                    (item.ThvlTel == null ? '' : item.ThvlTel.toString().search(filterThvlTel) >= 0) &&
                    (item.ThvlMobile == null ? '' : item.ThvlMobile.toString().search(filterThvlMobile) >= 0) &&
                    (item.ThvlFax == null ? '' : item.ThvlFax.toString().search(filterThvlFax) >= 0) &&
                    (item.ThvlEMail == null ? '' : item.ThvlEMail.toString().search(filterThvlEMail) >= 0) &&
                    (item.ThvlAddress == null ? '' : item.ThvlAddress.toString().search(filterThvlAddress) >= 0) &&
                    (item.F01 == null ? '' : item.F01.toString().search(filterF01) >= 0) &&
                    (item.F02 == null ? '' : item.F02.toString().search(filterF02) >= 0) &&
                    (item.F03 == null ? '' : item.F03.toString().search(filterF03) >= 0) &&
                    (item.F04 == null ? '' : item.F04.toString().search(filterF04) >= 0) &&
                    (item.F05 == null ? '' : item.F05.toString().search(filterF05) >= 0) &&
                    (item.F06 == null ? '' : item.F06.toString().search(filterF06) >= 0) &&
                    (item.F07 == null ? '' : item.F07.toString().search(filterF07) >= 0) &&
                    (item.F08 == null ? '' : item.F08.toString().search(filterF08) >= 0) &&
                    (item.F09 == null ? '' : item.F09.toString().search(filterF09) >= 0) &&
                    (item.F10 == null ? '' : item.F10.toString().search(filterF10) >= 0) &&
                    (item.F11 == null ? '' : item.F11.toString().search(filterF11) >= 0) &&
                    (item.F12 == null ? '' : item.F12.toString().search(filterF12) >= 0) &&
                    (item.F13 == null ? '' : item.F13.toString().search(filterF13) >= 0) &&
                    (item.F14 == null ? '' : item.F14.toString().search(filterF14) >= 0) &&
                    (item.F15 == null ? '' : item.F15.toString().search(filterF15) >= 0) &&
                    (item.F16 == null ? '' : item.F16.toString().search(filterF16) >= 0) &&
                    (item.F17 == null ? '' : item.F17.toString().search(filterF17) >= 0) &&
                    (item.F18 == null ? '' : item.F18.toString().search(filterF18) >= 0) &&
                    (item.F19 == null ? '' : item.F19.toString().search(filterF19) >= 0) &&
                    (item.F20 == null ? '' : item.F20.toString().search(filterF20) >= 0) &&
                    (item.ThvlEcoCode == null ? '' : item.ThvlEcoCode.toString().search(filterThvlEcoCode) >= 0) &&
                    (item.ThvlMelliCode == null ? '' : item.ThvlMelliCode.toString().search(filterThvlMelliCode) >= 0)

                return result;
            })
            $("#CountRecord").text(tempData.length);
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
                return ko.utils.stringStartsWith(item.SerialNumber.toString().toLowerCase(), search);
            });
            if (indexIDocH < self.pageSizeIDocH())
                self.currentPageIndexIDocH(0);
            else {
                var a = Math.round((indexIDocH / self.pageSizeIDocH()), 0);
                if (a < (indexIDocH / self.pageSizeIDocH())) a += 1;
                self.currentPageIndexIDocH(a - 1);
            }
            if (value == null)
                self.currentPageIndexIDocH(0);
            return value;
        }
    });


    self.currentPageIDocH = ko.computed(function () {
        var pageSizeIDocH = parseInt(self.pageSizeIDocH(), 10),
            startIndex = pageSizeIDocH * self.currentPageIndexIDocH(),
            endIndex = startIndex + pageSizeIDocH;
        localStorage.setItem('pageSizeIDocH', pageSizeIDocH);
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



    self.iconTypeDocNo = ko.observable("");
    self.iconTypeDocDate = ko.observable("");
    self.iconTypeInvName = ko.observable("");
    self.iconTypeThvlName = ko.observable("");
    self.iconTypeModeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeEghdam = ko.observable("");
    self.iconTypeTanzim = ko.observable("");
    self.iconTypeTaeed = ko.observable("");
    self.iconTypeTasvib = ko.observable("");
    self.iconTypeSerialNumber = ko.observable("");
    self.iconTypeMkzCode = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprCode = ko.observable("");
    self.iconTypeOprName = ko.observable("");
    self.iconTypeThvlRegion = ko.observable("");
    self.iconTypeThvlOstan = ko.observable("");
    self.iconTypeThvlShahrestan = ko.observable("");
    self.iconTypeThvlCity = ko.observable("");
    self.iconTypeThvlStreet = ko.observable("");
    self.iconTypeThvlAlley = ko.observable("");
    self.iconTypeThvlPlack = ko.observable("");
    self.iconTypeThvlZipCode = ko.observable("");
    self.iconTypeThvlTel = ko.observable("");
    self.iconTypeThvlMobile = ko.observable("");
    self.iconTypeThvlFax = ko.observable("");
    self.iconTypeThvlEMail = ko.observable("");
    self.iconTypeThvlAddress = ko.observable("");
    self.iconTypeF01 = ko.observable("");
    self.iconTypeF02 = ko.observable("");
    self.iconTypeF03 = ko.observable("");
    self.iconTypeF04 = ko.observable("");
    self.iconTypeF05 = ko.observable("");
    self.iconTypeF06 = ko.observable("");
    self.iconTypeF07 = ko.observable("");
    self.iconTypeF08 = ko.observable("");
    self.iconTypeF09 = ko.observable("");
    self.iconTypeF10 = ko.observable("");
    self.iconTypeF11 = ko.observable("");
    self.iconTypeF12 = ko.observable("");
    self.iconTypeF13 = ko.observable("");
    self.iconTypeF14 = ko.observable("");
    self.iconTypeF15 = ko.observable("");
    self.iconTypeF16 = ko.observable("");
    self.iconTypeF17 = ko.observable("");
    self.iconTypeF18 = ko.observable("");
    self.iconTypeF19 = ko.observable("");
    self.iconTypeF20 = ko.observable("");
    self.iconTypeThvlEcoCode = ko.observable("");
    self.iconTypeThvlMelliCode = ko.observable("");


    self.sortTableIDocH = function (viewModel, e) {


        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortIdocH_" + sessionStorage.InOut);
            self.sortType = localStorage.getItem("sortTypeIdocH_" + sessionStorage.InOut);
        }

        if (orderProp == null)
            return null

        if (e != null) {

            self.currentColumn(orderProp);
            self.IDocHList.sort(function (left, right) {
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
            localStorage.setItem("sortIdocH_" + sessionStorage.InOut, orderProp);
            localStorage.setItem("sortTypeIdocH_" + sessionStorage.InOut, self.sortType);
        }

        self.iconTypeDocNo('');
        self.iconTypeDocDate('');
        self.iconTypeInvName('');
        self.iconTypeThvlName('');
        self.iconTypeModeName('');
        self.iconTypeSpec('');
        self.iconTypeStatus('');
        self.iconTypeEghdam('');
        self.iconTypeTanzim('');
        self.iconTypeTaeed('');
        self.iconTypeTasvib('');
        self.iconTypeSerialNumber('');
        self.iconTypeMkzCode('');
        self.iconTypeMkzName('');
        self.iconTypeOprCode('');
        self.iconTypeOprName('');
        self.iconTypeThvlRegion('');
        self.iconTypeThvlOstan('');
        self.iconTypeThvlShahrestan('');
        self.iconTypeThvlCity('');
        self.iconTypeThvlStreet('');
        self.iconTypeThvlAlley('');
        self.iconTypeThvlPlack('');
        self.iconTypeThvlZipCode('');
        self.iconTypeThvlTel('');
        self.iconTypeThvlMobile('');
        self.iconTypeThvlFax('');
        self.iconTypeThvlEMail('');
        self.iconTypeThvlAddress('');
        self.iconTypeF01('');
        self.iconTypeF02('');
        self.iconTypeF03('');
        self.iconTypeF04('');
        self.iconTypeF05('');
        self.iconTypeF06('');
        self.iconTypeF07('');
        self.iconTypeF08('');
        self.iconTypeF09('');
        self.iconTypeF10('');
        self.iconTypeF11('');
        self.iconTypeF12('');
        self.iconTypeF13('');
        self.iconTypeF14('');
        self.iconTypeF15('');
        self.iconTypeF16('');
        self.iconTypeF17('');
        self.iconTypeF18('');
        self.iconTypeF19('');
        self.iconTypeF20('');
        self.iconTypeThvlEcoCode('');
        self.iconTypeThvlMelliCode('');

        if (orderProp == 'SortDocNo') self.iconTypeDocNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'DocDate') self.iconTypeDocDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'InvName') self.iconTypeInvName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlName') self.iconTypeThvlName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ModeName') self.iconTypeModeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Status') self.iconTypeStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Eghdam') self.iconTypeEghdam((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tanzim') self.iconTypeTanzim((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Taeed') self.iconTypeTaeed((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Tasvib') self.iconTypeTasvib((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SerialNumber') self.iconTypeSerialNumber((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzCode') self.iconTypeMkzCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprCode') self.iconTypeOprCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlRegion') self.iconTypeThvlRegion((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlOstan') self.iconTypeThvlOstan((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlShahrestan') self.iconTypeThvlShahrestan((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlCity') self.iconTypeThvlCity((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlStreet') self.iconTypeThvlStreet((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlAlley') self.iconTypeThvlAlley((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlPlack') self.iconTypeThvlPlack((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlZipCode') self.iconTypeThvlZipCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlTel') self.iconTypeThvlTel((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlMobile') self.iconTypeThvlMobile((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlFax') self.iconTypeThvlFax((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlEMail') self.iconTypeThvlEMail((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlAddress') self.iconTypeThvlAddress((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F01') self.iconTypeF01((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F02') self.iconTypeF02((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F03') self.iconTypeF03((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F04') self.iconTypeF04((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F05') self.iconTypeF05((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F06') self.iconTypeF06((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F07') self.iconTypeF07((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F08') self.iconTypeF08((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F09') self.iconTypeF09((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F10') self.iconTypeF10((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F11') self.iconTypeF11((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F12') self.iconTypeF12((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F13') self.iconTypeF13((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F14') self.iconTypeF14((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F15') self.iconTypeF15((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F16') self.iconTypeF16((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F17') self.iconTypeF17((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F18') self.iconTypeF18((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F19') self.iconTypeF19((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'F20') self.iconTypeF20((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlEcoCode') self.iconTypeThvlEcoCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ThvlMelliCode') self.iconTypeThvlMelliCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    $('#AddNewSanadAnbar').click(function () {
        sessionStorage.flagupdateHeader = 0;
        sessionStorage.Eghdam = sessionStorage.userName;
        sessionStorage.Status = 'موقت';
        invCode = $('#invSelect').val();
        sessionStorage.F01 = "";
        sessionStorage.F02 = "";
        sessionStorage.F03 = "";
        sessionStorage.F04 = "";
        sessionStorage.F05 = "";
        sessionStorage.F06 = "";
        sessionStorage.F07 = "";
        sessionStorage.F08 = "";
        sessionStorage.F09 = "";
        sessionStorage.F10 = "";
        sessionStorage.F11 = "";
        sessionStorage.F12 = "";
        sessionStorage.F13 = "";
        sessionStorage.F14 = "";
        sessionStorage.F15 = "";
        sessionStorage.F16 = "";
        sessionStorage.F17 = "";
        sessionStorage.F18 = "";
        sessionStorage.F19 = "";
        sessionStorage.F20 = "";
        //if (invCode == '' || invCode == null) 
        //{
        //    return showNotification(translate('انبار را انتخاب کنید');
        //} 
        //else
        //{
        sessionStorage.InvCode = invCode;
        window.location.href = sessionStorage.urlAddIDocH_New;

        //}
    });


    /*$('#AddNewSanadAnbar_New').click(function () {
        sessionStorage.flagupdateHeader = 0;
        sessionStorage.Eghdam = sessionStorage.userName;
        sessionStorage.Status = 'موقت';
        invCode = $('#invSelect').val();
        sessionStorage.F01 = "";
        sessionStorage.F02 = "";
        sessionStorage.F03 = "";
        sessionStorage.F04 = "";
        sessionStorage.F05 = "";
        sessionStorage.F06 = "";
        sessionStorage.F07 = "";
        sessionStorage.F08 = "";
        sessionStorage.F09 = "";
        sessionStorage.F10 = "";
        sessionStorage.F11 = "";
        sessionStorage.F12 = "";
        sessionStorage.F13 = "";
        sessionStorage.F14 = "";
        sessionStorage.F15 = "";
        sessionStorage.F16 = "";
        sessionStorage.F17 = "";
        sessionStorage.F18 = "";
        sessionStorage.F19 = "";
        sessionStorage.F20 = "";
        //if (invCode == '' || invCode == null) 
        //{
        //    return showNotification(translate('انبار را انتخاب کنید');
        //} 
        //else
        //{
        sessionStorage.InvCode = invCode;
        window.location.href = sessionStorage.urlAddIDocH_New;

        //}
    });*/


    $('#refreshIdocH').click(function () {

        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست اسناد") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getIDocH($('#pageCountSelector').val(), invSelected, modeCodeSelected, false);
                // self.sortTableIDocH();
                //$('#pageCountSelector').val(0);
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست اسناد به روز رسانی شد' });
            }
        })
    });

    self.DeleteIDocH = function (SanadBand) {
        if (TestUseSanad(ace, sal,"SanadAnbar", SanadBand.SerialNumber, false, SanadBand.DocNo) == true) {
            //showNotification('در تب دیگری وجود دارد', 0)
        }
        else {
            Swal.fire({
                title: mes_Delete,
                text: translate("آیا سند انتخابی حذف شود"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    serial = SanadBand.SerialNumber;
                    docnoDelete = SanadBand.DocNo; 
                    var TestIDoc_DeleteObject = {
                        SerialNumber: serial
                    };

                    ajaxFunction(IDoc_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestIDoc_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestIDoc_DeleteList(obj);
                        

                        if (data.length > 2) {
                            $('#modal-TestDelete').modal('show');
                            SetDataTestDocB();
                        }
                        else {
                            DeleteSanadAnbar();
                        }
                    });
                }
            })
        }
    };


    function SetDataTestDocB() {
        $("#BodyTestDoc_Delete").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestIDoc_DeleteList();
        for (var i = 0; i < list.length; i++) {
            textBody +=
                '<div class="body" style="padding:7px;">' +
                '    <div class="form-inline">';
            if (list[i].Test == 1) {
                countWarning += 1;
                textBody += ' <img src="/Content/img/Warning.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('هشدار :') + '</p>'
            }
            else {
                countError += 1;
                textBody += ' <img src="/Content/img/Error.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('خطا :') + '</p>'
            }

            if (list[i].TestName == "AccReg")
                textBody += '<p>' + translate('این سند انبار ثبت حسابداری شده است و قابل حذف نیست')+'</p>';

            else if (list[i].TestName == "FctReg")
                textBody += '<p>' + translate('این سند انبار ثبت خرید و فروش شده است و قابل حذف نیست')+'</p>';

            else if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTestDoc_Delete').append(textBody);

        $('#CountWarning').text(countWarning);
        $('#CountError').text(countError);

        if (countError > 0) {
            $('#Delete-Modal').attr('hidden', '');
            $('#ShowCountError').removeAttr('hidden', '');
        }
        else {
            $('#Delete-Modal').removeAttr('hidden', '')
            $('#ShowCountError').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning').attr('hidden', '');
        }


    }

    function DeleteSanadAnbar() {
        ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group + '/' + serial + '/' + sessionStorage.InOut, 'DELETE').done(function (response) {
            currentPage = self.currentPageIndexIDocH();
            getIDocH(0, invSelected, modeCodeSelected, false);
            self.currentPageIndexIDocH(currentPage);
            SaveLog('Inv5', EditMode_Del, LogMode_IDoc, 0, docnoDelete, serial);

            showNotification(translate('سند حذف شد'), 1);
        });
    }


    $('#Delete-Modal').click(function () {
        DeleteSanadAnbar();
        $('#modal-TestDelete').modal('hide');
    });





    self.UpdateHeader = function (item) {
        if (TestUseSanad(ace, sal,"SanadAnbar", item.SerialNumber, true, item.DocNo) == true) {
            //showNotification('در تب دیگری وجود دارد', 0)
        }
        else {
            sessionStorage.flagupdateHeader = 1;
            sessionStorage.SerialNumber = item.SerialNumber;
            sessionStorage.DocNo = item.DocNo;
            sessionStorage.DocDate = item.DocDate;
            sessionStorage.ThvlCode = item.ThvlCode;
            sessionStorage.ThvlName = item.ThvlName == null ? '' : item.ThvlName;
            sessionStorage.InvCode = item.InvCode;
            sessionStorage.InvName = item.InvName;
            sessionStorage.Spec = item.Spec;
            sessionStorage.PriceCode = item.KalaPriceCode;
            sessionStorage.ModeCodeValue = item.ModeCode;
            sessionStorage.ModeName = item.ModeName;
            sessionStorage.Status = item.Status;
            sessionStorage.PaymentType = item.PaymentType;
            sessionStorage.Footer = item.Footer;
            sessionStorage.Eghdam = item.Eghdam;
            sessionStorage.TaeedI = item.Taeed;
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
            sessionStorage.OprCode = item.OprCode;
            sessionStorage.OprName = item.OprName;
            sessionStorage.MkzCode = item.MkzCode;
            sessionStorage.MkzName = item.MkzName;

            sessionStorage.lastPageSelect = self.currentPageIndexIDocH();
            window.location.href = sessionStorage.urlAddIDocH_New;
        }

    }





    $("#DocNoSearch").keydown(function (e) {
        if (e.keyCode == 13) {
            docnoSearch = $("#DocNoSearch").val();
            if (docnoSearch == '') {
                return showNotification(translate('شماره سند') + " " + TitleListAnbarSearch + " "+ translate('را وارد کنید'), 2);
            }
            ShowDataUpdate(docnoSearch, $("#invSelect").val(), $("#IMode").val());
        }
    });

    $("#btn_DocNoSearch").click(function (e) {
        docnoSearch = $("#DocNoSearch").val();
        if (docnoSearch == '') {
            return showNotification(translate('شماره سند') + TitleListAnbarSearch + " "+ translate('را وارد کنید'), 2);
        }
        ShowDataUpdate(docnoSearch, $("#invSelect").val(), $("#IMode").val());
    });

    if (DocNoReport != "null") {
        invCode = localStorage.getItem("InvCodeAFISanadAnbar");
        modeCode = localStorage.getItem("ModeCodeAFISanadAnbar");
        ShowDataUpdate(DocNoReport, invCode, modeCode);
        sessionStorage.IsReport = "true";
        localStorage.setItem("DocNoAFISanadAnbar", null)
    }


    function ShowDataUpdate(docNo, inv, modeCode) {
        if (inv == "" || inv == "null" || inv == null)
            inv = "";

        if (modeCode == "" || modeCode == "null" || modeCode == null)
            modeCode = "";

        var IDocHMinObject = {
            InOut: sessionStorage.InOut,
            select: 3,
            invSelect: inv,
            user: sessionStorage.userName,
            accessSanad: sessionStorage.AccessSanad,
            updatedate: null,
            ModeCode: modeCode == "" ? null : modeCode,
            Sort: '',
            ModeSort: '',
            DocNo: docNo,
        }

        ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group, 'POST', IDocHMinObject, true).done(function (response) {
            if (response.length == 0) {
                return showNotification(translate('سند') + TitleListAnbarSearch + translate('یافت نشد'), 0);
            }

            if (response.length > 1) {
                return showNotification(translate('بیش از یک سند') + TitleListAnbarSearch + translate('وجود دارد'), 0);
            }

            if (sessionStorage.InOut == 1) {
                if (localStorage.getItem("VIEW_IIDOC") == 'false')
                    return showNotification(translate('دسترسی ندارید'), 0);
            }
            else if (sessionStorage.InOut == 2) {
                if (localStorage.getItem("VIEW_IODOC") == 'false')
                    return showNotification(translate('دسترسی ندارید'), 0);
            }

            var data = response[0];

            if (TestUseSanad(ace, sal,"SanadAnbar", data.SerialNumber, true, data.DocNo) == true) {
              //  showNotification('در تب دیگری وجود دارد', 0)
            }
            else {
                sessionStorage.flagupdateHeader = 1;

                sessionStorage.SerialNumber = data.SerialNumber;
                sessionStorage.DocNo = data.DocNo;
                sessionStorage.DocDate = data.DocDate;
                sessionStorage.ThvlCode = data.ThvlCode;

                sessionStorage.ThvlName = data.ThvlName == null ? '' : data.ThvlName;
                sessionStorage.InvCode = data.InvCode;
                sessionStorage.InvName = data.InvName;
                sessionStorage.Spec = data.Spec;
                sessionStorage.PriceCode = data.KalaPriceCode;
                sessionStorage.ModeCodeValue = data.ModeCode;
                sessionStorage.ModeName = data.ModeName;
                sessionStorage.Status = data.Status;
                sessionStorage.PaymentType = data.PaymentType;
                sessionStorage.Footer = data.Footer;
                sessionStorage.Eghdam = data.Eghdam;
                sessionStorage.TaeedI = data.Taeed;
                sessionStorage.F01 = data.F01;
                sessionStorage.F02 = data.F02;
                sessionStorage.F03 = data.F03;
                sessionStorage.F04 = data.F04;
                sessionStorage.F05 = data.F05;
                sessionStorage.F06 = data.F06;
                sessionStorage.F07 = data.F07;
                sessionStorage.F08 = data.F08;
                sessionStorage.F09 = data.F09;
                sessionStorage.F10 = data.F10;
                sessionStorage.F11 = data.F11;
                sessionStorage.F12 = data.F12;
                sessionStorage.F13 = data.F13;
                sessionStorage.F14 = data.F14;
                sessionStorage.F15 = data.F15;
                sessionStorage.F16 = data.F16;
                sessionStorage.F17 = data.F17;
                sessionStorage.F18 = data.F18;
                sessionStorage.F19 = data.F19;
                sessionStorage.F20 = data.F20;

                sessionStorage.OprCode = data.OprCode;
                sessionStorage.OprName = data.OprName;

                sessionStorage.MkzCode = data.MkzCode;
                sessionStorage.MkzName = data.MkzName;

                sessionStorage.lastPageSelect = self.currentPageIndexIDocH();

                window.location.href = sessionStorage.urlAddIDocH_New;
            }

        });
    }



    $("#allSearchIDocH").click(function () {
        if ($("#allSearchIDocH").is(':checked')) {
            $('#allSearchIDocHText').text(translate('جستجو بر اساس همه موارد'));
            allSearchIDocH = true;
        }
        else {
            $('#allSearchIDocHText').text(translate('جستجو بر اساس شماره سند'));
            allSearchIDocH = false;
        }
    });

    var TitleListAnbarSearch = '';

    if (sessionStorage.InOut == 1) {

        sessionStorage.sels = true;
        $('#TitleThvlName').text(translate('نام تحویل دهنده'));
        $('#TitleListAnbar').text(translate('اسناد وارده به انبار'));
        TitleListAnbarSearch = ' ' + translate('وارده') + ' ';

        // $('#titlePage').text('اسناد وارده');

    } else {
        sessionStorage.sels = false;
        $('#TitleThvlName').text(translate('نام تحویل گیرنده'));
        $('#TitleListAnbar').text(translate('اسناد صادره از انبار'));
        TitleListAnbarSearch = ' ' +translate('صادره') + ' ';
        // $('#titlePage').text('اسناد صادره');
    }

    $('#TitleListAnbarSearch').text(TitleListAnbarSearch);


    $('#SaveIDocH1').click(function () {
        window.location.href = sessionStorage.urlIDocH;
    });

    $('#modal-Factor').on('shown.bs.modal', function () {
        if (sessionStorage.sels == "true")
            $('#TitleThvlName1').text(translate('نام خریدار'));
        else
            $('#TitleThvlName1').text(translate('نام فروشنده'));
        $('#searchIDocH1').val('');
        self.filterIDocH1('');
        self.filterIDocH1List();
        $('#searchIDocH1').focus();
    });

    $("#allSearchIDocH1").click(function () {
        if ($("#allSearchIDocH1").is(':checked')) {
            $('#searchIDocH1').attr('placeholder', translate('جستجو بر اساس همه موارد'));
        }
        else {
            $('#searchIDocH1').attr('placeholder', translate('جستجو بر اساس شماره سند'));
        }
    });


    self.PageCountView = function () {
        invSelect = $('#invSelect').val() == '' ? '' : $('#invSelect').val();
        modeSelect = $('#IMode').val() == '' ? '' : $('#IMode').val();
        select = $('#pageCountSelector').val();
        getIDocH(select, invSelect, modeSelect, true);
    }


    self.ShowMove = function (Eghdam) {
        if (sessionStorage.moveSanadAnbar == 'true')
            return true;
        else
            return false;
    }

    self.ShowAction = function (Eghdam) {
        if (sessionStorage.InOut == 1) {
            if (localStorage.getItem("DEL_IIDOC") == 'true') {
                if (localStorage.getItem("AccessViewSanadAnbarVarede") == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }
        else {
            if (localStorage.getItem("DEL_IODOC") == 'true') {
                if (localStorage.getItem("AccessViewSanadAnbarSadere") == 'false') {
                    return Eghdam == sessionStorage.userName ? true : false
                }
                else {
                    return true;
                }
            }
            else
                return false;
        }
    }

    self.ViewSanad = function () {
        if (sessionStorage.InOut == 1) {
            if (localStorage.getItem("VIEW_IIDOC") == 'true')
                return true;
            else
                return false;
        }
        else if (sessionStorage.InOut == 2) {
            if (localStorage.getItem("VIEW_IODOC") == 'true')
                return true;
            else
                return false;
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



    self.MoveSanad = function (item) {
        serial = item.SerialNumber;
        docDate = item.DocDate;

        $('#modeCodePor').val(item.ModeCode);

        $('#titleMove').text(translate('انتقال') + ' ' + item.ModeName + ' ' + item.DocNo + ' ' + AppendAnbar(item.InvName)+ ' ' + translate('به'));
        $('#titlePor').text(translate('کپی') + ' ' + item.ModeName + ' ' + item.DocNo + ' ' + AppendAnbar(item.InvName) + ' ' + translate('در'));

        if (invSelected == '') {
            temp = localStorage.getItem('InvSelectSanadAnbarMove')
            temp == null ? self.InvCodeMove('') : self.InvCodeMove(temp)
        }
        else
            self.InvCodeMove(invSelected)




        $('#modal-Move').modal();
    }




    $('#Move').click(function () {
        modeCodeMove = $('#modeCodePor').val();
        invSelectMove = $('#invSelectMove').val();
        localStorage.setItem('InvSelectSanadAnbarMove', invSelectMove);

        list = self.InvList();
        for (var i = 0; i < list.length; i++) {
            if (list[i].Code == invSelectMove)
                sameNoAllMode = list[i].SameNoAllMode;
        }

        var closedDate = false;
        var TestIDoc_NewObject = {
            DocDate: docDate,
            ModeCode: modeCodeMove
        };

        ajaxFunction(TestIDoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestIDoc_NewObject).done(function (data) {
            list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                if (list[i].TestName == "YTrs") {
                    closedDate = true;
                    showNotification(translate(list[i].TestCap), 0);
                }
            }
        });

        if (closedDate == false) {

            sessionStorage.flagCopy = 'Y'
            var MoveObject = {
                SerialNumber: serial,
                DocDate: docDate,
                UserCode: sessionStorage.userName,
                TahieShode: ace,
                ModeCode: modeCodeMove,
                InvCode: invSelectMove,
                DocNoMode: ace == 'Web1' ? 1 :
                    sessionStorage.AllInvSameNo == "1" ? 1 :
                        sameNoAllMode == 1 ? 2 : 3,
                InsertMode: 0,
                DocNo: 1,
                StartNo: 0,
                EndNo: 0,
                BranchCode: 0,
                MoveMode: 0,
            };
            $('#modal-Move').modal('hide');
            showNotification(translate('در حال انتقال لطفا منتظر بمانید'), 1);

            ajaxFunction(IMoveSanadUri + ace + '/' + sal + '/' + group, 'POST', MoveObject).done(function (response) {
                item = response;
                item = item[0];

                sessionStorage.searchIDocH = item.SerialNumber;

                serialNumber = item.SerialNumber;

                if (TestUseSanad(ace, sal, "SanadAnbar", item.SerialNumber, false, item.DocNo) == true) {
                    // showNotification('در تب دیگری وجود دارد', 0)
                }
                else {
                    localStorage.setItem("InvCodeAFISanadAnbar", item.InvCode);
                    localStorage.setItem("InOutAFISanadAnbar", item.InOut);
                    localStorage.setItem("ModeCodeAFISanadAnbar", item.ModeCode);
                    localStorage.setItem("DocNoAFISanadAnbar", item.DocNo);
                    window.open(sessionStorage.urlAFISanadAnbarIndex, '_blank');
                    getIDocH($('#pageCountSelector').val(), invSelected, modeCodeSelected, false);
                }

                /*sessionStorage.flagupdateHeader = 1;
                sessionStorage.SerialNumber = item.SerialNumber;
                sessionStorage.DocNo = item.DocNo;
                sessionStorage.DocDate = item.DocDate;
                sessionStorage.ThvlCode = item.ThvlCode;
                sessionStorage.ThvlCode = item.ThvlCode;
                sessionStorage.ThvlName = item.ThvlName == null ? '' : item.ThvlName;
                sessionStorage.InvCode = item.InvCode;
                sessionStorage.InvName = item.InvName;
                sessionStorage.Spec = item.Spec;
                sessionStorage.PriceCode = item.KalaPriceCode;
                sessionStorage.ModeName = item.ModeName;
                sessionStorage.ModeCodeValue = item.ModeCode;
                sessionStorage.Status = item.Status;
                sessionStorage.PaymentType = item.PaymentType;
                sessionStorage.Footer = item.Footer;
                sessionStorage.Eghdam = item.Eghdam;
                sessionStorage.InOut = item.InOut;

                sessionStorage.OprCode = item.OprCode;
                sessionStorage.OprName = item.OprName;

                sessionStorage.MkzCode = item.MkzCode;
                sessionStorage.MkzName = item.MkzName;


                // sessionStorage.ModeCodeValue = modeCodeMove;

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

                sessionStorage.Status = item.Status;
                sessionStorage.PaymentType = item.PaymentType;
                sessionStorage.Footer = item.Footer;
                sessionStorage.BeforeMoveSanadAnbar = true;

                window.location.href = sessionStorage.urlAddIDocH;*/
            });
        }

    });

    
    self.ChangeStatusSanad = function (item) {
        serial = item.SerialNumber;

        if (TestUseSanad(ace, sal,"SanadAnbar", serial, true, item.DocNo) == true) {
           // showNotification('در تب دیگری وجود دارد', 0)
        }
        else {

            var closedDate = false;
            var TestIDoc_EditObject = {
                Serialnumber: serial
            }

            ajaxFunction(TestIDoc_EditUri + ace + '/' + sal + '/' + group, 'POST', TestIDoc_EditObject, false).done(function (data) {
                list = JSON.parse(data);
                for (var i = 0; i < list.length; i++) {
                    if (list[i].TestName == "YTrs") {
                        closedDate = true;
                        return showNotification(translate(list[i].TestCap), 0);
                    }
                }
            });

            if (closedDate == false) {
                sessionStorage.Status = item.Status;
                self.StatusSanad(item.Status);
                $('#titleChangeStatus').text(translate('تغییر وضعیت') + ' ' + item.ModeName + ' ' + item.DocNo + ' ' + AppendAnbar(item.InvName) + ' ' + translate('به'));
                $('#modal-ChangeStatusSanad').modal();
            }
        }
    }


    $('#modal-ChangeStatusSanad').on('hide.bs.modal', function () {
        RemoveUseSanad(ace, sal,"SanadAnbar", serial);
    });

    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal,"SanadAnbar", serial);
    };



    $('#ChangeStatus').click(function () {
        var StatusChangeObject = {
            DMode: 0,
            UserCode: sessionStorage.userName,
            SerialNumber: serial,
            Status: self.StatusSanad(),
            InOut: sessionStorage.InOut
        };
        $('#modal-ChangeStatusSanad').modal('hide');
        showNotification(translate('در حال تغییر وضعیت لطفا منتظر بمانید'), 1);

        ajaxFunction(IChangeStatusUri + ace + '/' + sal + '/' + group, 'POST', StatusChangeObject).done(function (response) {
            item = response;


            currentPage = self.currentPageIndexIDocH();
            getIDocH(0, invSelected, modeCodeSelected, false);
            self.sortTableIDocH();
            self.currentPageIndexIDocH(currentPage);

        });

    });


    self.radif = function (index) {
        countShow = self.pageSizeIDocH();
        page = self.currentPageIndexIDocH();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableList").empty();

        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
        '       <tr data-bind="click: sortTableIDocH">' +
        '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('DocNo', data) +
            CreateTableTh('DocDate', data) +
            CreateTableTh('InvName', data) +
            CreateTableTh('ThvlName', data) +
            CreateTableTh('ModeName', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Status', data) +
            CreateTableTh('Eghdam', data) +
            CreateTableTh('Tanzim', data) +
            CreateTableTh('Taeed', data) +
            CreateTableTh('Tasvib', data) +
            CreateTableTh('SerialNumber', data) +
            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('ThvlEcoCode', data) +
            CreateTableTh('ThvlMelliCode', data) +
            CreateTableTh('ThvlOstan', data) +
            CreateTableTh('ThvlShahrestan', data) +
            CreateTableTh('ThvlCity', data) +
            CreateTableTh('ThvlRegion', data) +
            CreateTableTh('ThvlStreet', data) +
            CreateTableTh('ThvlAlley', data) +
            CreateTableTh('ThvlPlack', data) +
            CreateTableTh('ThvlZipCode', data) +
            CreateTableTh('ThvlTel', data) +
            CreateTableTh('ThvlMobile', data) +
            CreateTableTh('ThvlFax', data) +
            CreateTableTh('ThvlEMail', data) +
            CreateTableTh('ThvlAddress', data) +
            CreateTableTh('F01', data) +
            CreateTableTh('F02', data) +
            CreateTableTh('F03', data) +
            CreateTableTh('F04', data) +
            CreateTableTh('F05', data) +
            CreateTableTh('F06', data) +
            CreateTableTh('F07', data) +
            CreateTableTh('F08', data) +
            CreateTableTh('F09', data) +
            CreateTableTh('F10', data) +
            CreateTableTh('F11', data) +
            CreateTableTh('F12', data) +
            CreateTableTh('F13', data) +
            CreateTableTh('F14', data) +
            CreateTableTh('F15', data) +
            CreateTableTh('F16', data) +
            CreateTableTh('F17', data) +
            CreateTableTh('F18', data) +
            CreateTableTh('F19', data) +
            CreateTableTh('F20', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageIDocH" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() }, style: { color : Status == \'باطل\' ? \'red\' : Tanzim.substring(0, 1) == \'*\' &&  Tanzim.substring(Tanzim.length - 1 , Tanzim.length) == \'*\' ? \'#840fbc\' : null}" >' +
        '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            //'<td data-bind="text:  $index() + 1"></td>' +
            // '<td data-bind="text: $data.DocNo"></td>' +
            CreateTableTd('DocNo', 0, 0, data) +
            CreateTableTd('DocDate', 0, 0, data) +
            CreateTableTd('InvName', 0, 0, data) +
            CreateTableTd('ThvlName', 0, 0, data) +
            CreateTableTd('ModeName', 0, 0, data) +
            CreateTableTd('Spec', 0, 4, data) +
            CreateTableTd('Status', 0, 0, data) +
            CreateTableTd('Eghdam', 0, 0, data) +
            CreateTableTd('Tanzim', 0, 0, data) +
            CreateTableTd('Taeed', 0, 0, data) +
            CreateTableTd('Tasvib', 0, 0, data) +
            CreateTableTd('SerialNumber', 0, 0, data) +
            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +
            CreateTableTd('ThvlEcoCode', 0, 0, data) +
            CreateTableTd('ThvlMelliCode', 0, 0, data) +
            CreateTableTd('ThvlOstan', 0, 0, data) +
            CreateTableTd('ThvlShahrestan', 0, 0, data) +
            CreateTableTd('ThvlCity', 0, 0, data) +
            CreateTableTd('ThvlRegion', 0, 0, data) +
            CreateTableTd('ThvlStreet', 0, 0, data) +
            CreateTableTd('ThvlAlley', 0, 0, data) +
            CreateTableTd('ThvlPlack', 0, 0, data) +
            CreateTableTd('ThvlZipCode', 0, 0, data) +
            CreateTableTd('ThvlTel', 0, 0, data) +
            CreateTableTd('ThvlMobile', 0, 0, data) +
            CreateTableTd('ThvlFax', 0, 0, data) +
            CreateTableTd('ThvlEMail', 0, 0, data) +
            CreateTableTd('ThvlAddress', 0, 0, data) +
            CreateTableTd('F01', 0, 4, data) +
            CreateTableTd('F02', 0, 4, data) +
            CreateTableTd('F03', 0, 4, data) +
            CreateTableTd('F04', 0, 4, data) +
            CreateTableTd('F05', 0, 4, data) +
            CreateTableTd('F06', 0, 4, data) +
            CreateTableTd('F07', 0, 4, data) +
            CreateTableTd('F08', 0, 4, data) +
            CreateTableTd('F09', 0, 4, data) +
            CreateTableTd('F10', 0, 4, data) +
            CreateTableTd('F11', 0, 4, data) +
            CreateTableTd('F12', 0, 4, data) +
            CreateTableTd('F13', 0, 4, data) +
            CreateTableTd('F14', 0, 4, data) +
            CreateTableTd('F15', 0, 4, data) +
            CreateTableTd('F16', 0, 4, data) +
            CreateTableTd('F17', 0, 4, data) +
            CreateTableTd('F18', 0, 4, data) +
            CreateTableTd('F19', 0, 4, data) +
            CreateTableTd('F20', 0, 4, data) +
            '<td>' +

            '<a class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">' +
            '    <span class="caret"></span>' +
            '</a>' +
            '<ul class="';

        if (lang == 'en')
            dataTable += 'dropdown-menu dropdown-menultr'
        else
            dataTable += 'dropdown-menu'

        dataTable += '">' +
            '    <li>' +
            '        <a id="MoveSanad" data-bind="click: $root.MoveSanad  , visible: $root.ShowMove(Eghdam)" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/sanad/synchronize-arrows-square-warning.png" width="16" height="16" style="margin-left:10px">' +
            translate('کپی') +
            '        </a>' +
            '    </li>' +

            '    <li>' +
            '        <a id="ChangeStatusSanad" data-bind="click: $root.ChangeStatusSanad" style="font-size: 11px;text-align: right;">' +
            '            <img src="/Content/img/sanad/synchronize-arrows-square-warning.png" width="16" height="16" style="margin-left:10px">' +
        translate('تغییر وضعیت') +
            '        </a>' +
            '    </li>';
        if (sessionStorage.AccessPrint_SanadAnbar == "true") {

            dataTable +=
                '    <li>' +
                '        <a id="PrintSanad" data-bind="click: $root.PrintSanad" style="font-size: 11px;text-align: right;">' +
                '            <img src="/Content/img/sanad/streamline-icon-print-text@48x48.png" width="16" height="16" style="margin-left:10px">' +
            translate( 'چاپ') +
                '        </a>' +
                '    </li>';
        }

        dataTable +=
            '</ul>' +
            '   <a id="UpdateFactor" data-bind="click: $root.UpdateHeader, visible: $root.ViewSanad()">';


        if (sessionStorage.CHG == "true")
            dataTable += '<img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px"/></a>';
        else
            dataTable += '<img src="/Content/img/view.svg" width="18" height="18" style="margin-left:10px"/></a>';


        dataTable += 
            '<a id="DeleteIDocH" data-bind="click: $root.DeleteIDocH, visible: $root.ShowAction(Eghdam)">' +
            '<img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +
            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
        '  <tr style="background-color: #efb68399;">' +
        '<td style="background-color: #efb683;"></td>' +
            CreateTableTdSearch('DocNo', data) +
            CreateTableTdSearch('DocDate', data) +
            CreateTableTdSearch('InvName', data) +
            CreateTableTdSearch('ThvlName', data) +
            CreateTableTdSearch('ModeName', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Status', data) +
            CreateTableTdSearch('Eghdam', data) +
            CreateTableTdSearch('Tanzim', data) +
            CreateTableTdSearch('Taeed', data) +
            CreateTableTdSearch('Tasvib', data) +
            CreateTableTdSearch('SerialNumber', data) +
            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprCode', data) +
            CreateTableTdSearch('OprName', data) +
            CreateTableTdSearch('ThvlEcoCode', data) +
            CreateTableTdSearch('ThvlMelliCode', data) +
            CreateTableTdSearch('ThvlOstan', data) +
            CreateTableTdSearch('ThvlShahrestan', data) +
            CreateTableTdSearch('ThvlCity', data) +
            CreateTableTdSearch('ThvlRegion', data) +
            CreateTableTdSearch('ThvlStreet', data) +
            CreateTableTdSearch('ThvlAlley', data) +
            CreateTableTdSearch('ThvlPlack', data) +
            CreateTableTdSearch('ThvlZipCode', data) +
            CreateTableTdSearch('ThvlTel', data) +
            CreateTableTdSearch('ThvlMobile', data) +
            CreateTableTdSearch('ThvlFax', data) +
            CreateTableTdSearch('ThvlEMail', data) +
            CreateTableTdSearch('ThvlAddress', data) +
            CreateTableTdSearch('F01', data) +
            CreateTableTdSearch('F02', data) +
            CreateTableTdSearch('F03', data) +
            CreateTableTdSearch('F04', data) +
            CreateTableTdSearch('F05', data) +
            CreateTableTdSearch('F06', data) +
            CreateTableTdSearch('F07', data) +
            CreateTableTdSearch('F08', data) +
            CreateTableTdSearch('F09', data) +
            CreateTableTdSearch('F10', data) +
            CreateTableTdSearch('F11', data) +
            CreateTableTdSearch('F12', data) +
            CreateTableTdSearch('F13', data) +
            CreateTableTdSearch('F14', data) +
            CreateTableTdSearch('F15', data) +
            CreateTableTdSearch('F16', data) +
            CreateTableTdSearch('F17', data) +
            CreateTableTdSearch('F18', data) +
            CreateTableTdSearch('F19', data) +
        CreateTableTdSearch('F20', data) +
        '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >';

        $('#TableList').append(dataTable);
    }

    function CreateTableTh(field, data) {

        text = '<th ';
        TextField = FindTextField(field, data);

        sortField = field == 'DocNo' ? 'SortDocNo' : field

        if (TextField == 0)
            text += 'Hidden ';
        text += 'data-column="' + sortField + '">' +
            '<span data-column="' + sortField + '" >' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + sortField + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }" data-column="' + sortField + '" ></i> </span> ' +
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
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\'" style="text-align: right;"></td>'
                break;
            case 4:
                text += 'data-bind="text: ' + field + ' , click: $root.View' + field + ' " class="ellipsis"></td>';
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

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }"  type="text" class="type_' + type + ' ';
        text += ' form-control" style="height: 2.4rem;; direction: ltr;text-align: right; " /> </td>';

        return text;
    }

    self.currentPageIndexIDocH(parseInt(sessionStorage.lastPageSelect == null ? 0 : sessionStorage.lastPageSelect));




    var IDocPUri = server + '/api/IDocData/IDocP/'; // آدرس ویوی چاپ سند 
    self.IDocPList = ko.observableArray([]); // لیست ویوی چاپ 
    //Get IDocP List
    function getIDocP(serialNumber) {
        ajaxFunction(IDocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocPList(data);
        });
    }


    self.PrintSanad = function (item) {

        serial = item.SerialNumber;
        docDate = item.DocDate;

        getIDocP(serial);
        if (self.IDocPList().length == 0)
            return showNotification(translate('برای چاپ سند حداقل یک بند الزامیست'), 0);

        createViewer();
        textFinalPrice = item.FinalPrice.toPersianLetter() + titlePrice;

        printVariable = '"ReportDate":"' + DateNow + '",' +
            '"TextFinalPrice":"' + textFinalPrice + '",';


        if (sessionStorage.InOut == 1) {
            if (localStorage.getItem("Access_SHOWPRICE_IIDOC") == 'true')
                sessionStorage.ModePrint = 'IDoc';
            else
                sessionStorage.ModePrint = 'IDoc_NoPrice';
        }
        else {
            sessionStorage.ModePrint = 'ODoc';
        }




        printName = null;
        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
        $('#modal-Print').modal('show');
    }

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
        setReport(self.IDocPList(), data, printVariable);
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
            title: mes_Delete,
            text: translate("آیا فرم چاپ انتخابی حذف شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                address = item.address;
                DeletePrintForm(address);
                GetPrintForms(sessionStorage.ModePrint);
            }
        })

    };

    $('#AddNewPrintForms').click(function () {
        printName = translate('فرم جدید');
        printPublic = false;
        setReport(self.IDocPList(), '', printVariable);
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
        setReport(self.IDocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });


    self.ViewSpec = function (Band) {
        ViewSpec(Band.Spec)
    }

    self.sortTableIDocH();


};

ko.applyBindings(new ViewModel());

