var ViewModel = function () {
    var self = this;

    sal = localStorage.getItem("SalAcc");

    var flagupdateHeader;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;
    sessionStorage.searchADocH = "";
    self.bundNumberImport = 0;

    var flaglog = "Y";

    if (sessionStorage.flagCopy == 'Y')
        flaglog = "N";

    self.StatusSanad = ko.observable();

    TestUser();
    var viewAction = false;
    var resTestNew = false;

    var AccCode = "";
    var AccZCode = "";

    var TrafCode = "";
    var TrafZCode = "";

    var ArzCode = "";
    var OprCode = "";
    var MkzCode = "";

    var bandnumber = 0;
    var bandnumberedit = 0;
    var flagFinalSave = false;
    var flagEditBand = false;
    var flag = -1;
    var flagInsertADocH;
    var zGruAcc = "";
    var allSearchAcc = true;
    var allSearchAcc = true;
    var Serial = '';
    var PDModeAcc = 0;
    self.flagupdateband = false;
    var flagOtherFieldShow;

    var flagSearchAcc = 0;
    var flagSearchZAcc = 0;
    var flagSearchTraf = 0;
    var flagSearchTrafZ = 0;

    var flagSearchOpr = 0;
    var flagSearchMkz = 0;
    var flagSearchArz = 0;
    var flagSearchBank = 0;
    var flagSearchShobe = 0;
    var flagSearchJari = 0;
    var flagSearchCheck = 0;

    var accessTaeed = false;
    var accessDaem = false;

    var closedDate = false;

    function ClearSearch() {
        flagSearchAcc = 0;
        flagSearchZAcc = 0;
        flagSearchTraf = 0;
        flagSearchTrafZ = 0;
        flagSearchOpr = 0;
        flagSearchMkz = 0;
        flagSearchArz = 0;
        flagSearchBank = 0;
        flagSearchShobe = 0;
        flagSearchJari = 0;
        flagSearchCheck = 0;
    }

    ClearSearch();

    $('#titlePage').text(translate("سند حسابداری جدید"));

    $('#finalSave_Title').attr('hidden', '');

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    var rprtId = 'ADocB';
    var columns = [
        'BandNo',
        'AccFullCode',
        'AccFullName',
        'Comm',
        'Bede',
        'Best',
        'CheckNo',
        'CheckDate',
        'Bank',
        'Shobe',
        'Jari',
        'TrafFullCode',
        'TrafFullName',
        'MkzCode',
        'MkzName',
        'OprCode',
        'OprName',
        'BandSpec',
        'ArzCode',
        'ArzValue',
        'ArzRate',
        'ArzName'
    ];


    //Get RprtCols List
    function getRprtColsList(FlagSetting) {
        cols = getRprtCols(rprtId, sessionStorage.userName);
        ListColumns = cols;
        if (FlagSetting) {
            CreateTableSanad(cols)
        }
        else {
            CreateTableColumn(columns);
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, cols);
            }
        }
        /* ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            ListColumns = data;
            if (FlagSetting) {
                CreateTableSanad(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }
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

    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/AFISanad/AddAdoc", columns, self.SettingColumnList());
        localStorage.setItem('listFilter', null);
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
        SaveColumn(ace, sal, group, rprtId, "/AFISanad/AddAdoc", columns, self.SettingColumnList());
        localStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);







    self.AModeCode = ko.observable();
    self.SerialNumber = ko.observable();
    self.DocNoOut = ko.observable();
    self.DocDate = ko.observable(DateNow);
    self.Spec = ko.observable();

    self.BandNo = ko.observable();
    self.AccCode = ko.observable();
    self.AccZCode = ko.observable();

    self.ArzCode = ko.observable();
    self.ArzRate = ko.observable();
    self.ArzValue = ko.observable();
    self.OprCode = ko.observable();
    self.MkzCode = ko.observable();
    self.Comm = ko.observable();
    self.BandSpec = ko.observable();

    self.CheckNo = ko.observable();
    self.CheckDateBand = ko.observable();
    self.Bank = ko.observable();
    self.Shobe = ko.observable();
    self.Jari = ko.observable();
    self.Value = ko.observable();
    self.BaratNo = ko.observable();
    self.CheckStatusCode = ko.observable();
    self.TrafCode = ko.observable();
    self.TrafZCode = ko.observable();
    self.CheckRadif = ko.observable();
    self.CheckVosoolDate = ko.observable();
    self.CheckComm = ko.observable();


    self.AccList = ko.observableArray([]); // لیست حساب ها
    self.ZAccList = ko.observableArray([]); // لیست زیر حساب ها
    self.ADocBList = ko.observableArray([]); // لیست بند های سند
    self.ADocB = ko.observableArray([]); // لیست بند های سند
    self.ADocHList = ko.observableArray([]); // اطلاعات  سند  
    self.AModeList = ko.observableArray([]); // نوع سند  
    self.CheckStatusList = ko.observableArray([]); // لیست نوع چک ها
    self.MkzList = ko.observableArray([]); // لیست مرکز هزینه
    self.OprList = ko.observableArray([]); // لیست پروژه ها
    self.ArzList = ko.observableArray([]); // لیست ارز ها
    self.CheckList = ko.observableArray([]); // لیست چک ها
    self.BankList = ko.observableArray([]); // لیست چک ها
    self.ShobeList = ko.observableArray([]); // لیست چک ها
    self.JariList = ko.observableArray([]); // لیست چک ها
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 
    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها 
    self.ADocPList = ko.observableArray([]); // لیست ویوی چاپ 
    self.TestADocList = ko.observableArray([]); // لیست تست 
    self.TestADoc_NewList = ko.observableArray([]); // لیست تست جدید


    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var ZAccUri = server + '/api/Web_Data/ZAcc/'; // آدرس حساب ها
    var ADocHUri = server + '/api/ADocData/ADocH/'; // آدرس هدر سند 
    var ADocHiUri = server + '/api/AFI_ADocHi/'; // آدرس ذخیره هدر سند 
    var ADocBUri = server + '/api/ADocData/ADocB/'; // آدرس بند سند 
    var ADocBiUri = server + '/api/AFI_ADocBi/'; // آدرس ذخیره یند سند 
    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند
   // var ColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها 
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 
    var CheckUri = server + '/api/ADocData/CheckList/'; // آدرس لیست چک  
    var BankUri = server + '/api/ADocData/Bank/'; // آدرس لیست بانک  
    var ShobeUri = server + '/api/ADocData/Shobe/'; // آدرس لیست شعبه  
    var JariUri = server + '/api/ADocData/Jari/'; // آدرس لیست جاری 
    var ADocHLastDateUri = server + '/api/ADocData/ADocH/LastDate/'; // آدرس آخرین تاریخ سند
    var CheckStatusUri = server + '/api/ADocData/CheckStatus/'; // آدرس وضعیت چک
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت سند 
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 
    var ADocPUri = server + '/api/ADocData/ADocP/'; // آدرس ویوی چاپ سند 

    var TestADocUri = server + '/api/ADocData/TestADoc/'; // آدرس تست سند 
    var TestADoc_NewUri = server + '/api/ADocData/TestADoc_New/'; // آدرس تست ایجاد  
    var TestADoc_EditUri = server + '/api/ADocData/TestADoc_Edit/'; // آدرس تست ویرایش 
    var SaveADoc_HZUri = server + '/api/ADocData/SaveADoc_HZ/'; // آدرس ویرایس ستون تنظیم 



    //Get ExtraFields List
    /*function getExtraFieldsList() {
         ajaxFunction(ExtraFieldsUri + ace + '/' + sal + '/' + group + '/adoc', 'GET').done(function (data) {
             self.ExtraFieldsList(data);
         });
     }*/


    //Get Status List
    function getStatusList() {
        list = localStorage.getItem('AccStatus');
        if (list != null) {
            list = JSON.parse(localStorage.getItem('AccStatus'));
            self.StatusList(list)
        }
        else {
            progName = getProgName('A');
            ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
                self.StatusList(data);
                localStorage.setItem("AccStatus", JSON.stringify(data));
            });
        }
    }



    //Get Acc List
    function getAccList() {
        whereAcc = localStorage.getItem('whereAcc');
        var AccObject = {
            Mode: 1,
            UserCode: sessionStorage.userName,
            Where: whereAcc
        }

        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'POST', AccObject, true).done(function (data) {
            self.AccList(data);
        });
    }

    $('#btnAcc').click(function () {
        if (self.AccList().length == 0) {
            getAccList();
        }
    });

    $('#btnTraf').click(function () {
        if (self.AccList().length == 0) {
            getAccList();
        }
    });


    //Get ZAcc List
    function getZAccList(filter) {
        if (filter == null)
            filter = null;
        ajaxFunction(ZAccUri + ace + '/' + sal + '/' + group + '/' + filter, 'GET').done(function (data) {
            self.ZAccList(data);
        });
    }


    //Get AMode List
    function getAModeList() {
        ajaxFunction(AModeUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AModeList(data);
        });
    }


    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.OprList(data);
        });
    }

    $('#btnOpr').click(function () {
        if (self.OprList().length == 0) {
            getOprList();
        }
    });

    //Get Arz List
    function getArzList() {
        ajaxFunction(ArzUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.ArzList(data);
        });
    }

    $('#btnArz').click(function () {
        if (self.ArzList().length == 0) {
            getArzList();
        }
    });
    //Get CheckList List
    function getCheckList(PDMode) {
        ajaxFunction(CheckUri + ace + '/' + sal + '/' + group + '/' + PDMode, 'GET').done(function (data) {
            self.CheckList(data);
        });
    }

    //Get BankList List
    function getBankList() {
        ajaxFunction(BankUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.BankList(data);
        });
    }

    $('#btnBank').click(function () {
        if (self.BankList().length == 0) {
            getBankList();
        }
    });

    //Get ShobeList List
    function getShobeList() {
        ajaxFunction(ShobeUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.ShobeList(data);
        });
    }

    $('#btnShobe').click(function () {
        if (self.ShobeList().length == 0) {
            getShobeList();
        }
    });

    //Get JariList List
    function getJariList() {
        ajaxFunction(JariUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.JariList(data);
        });
    }

    $('#btnJari').click(function () {
        if (self.JariList().length == 0) {
            getJariList();
        }
    });


    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.MkzList(data);
        });
    }

    $('#btnMkz').click(function () {
        if (self.MkzList().length == 0) {
            getMkzList();
        }
    });

    //Get SanadCols List
    function getColsSanadList() {
        cols = getRprtCols('ADocB', sessionStorage.userName);
        CreateTableSanad(cols)

        cols = getRprtCols('ADocP', sessionStorage.userName);
        ListColumns = cols;

        /* ajaxFunction(ColsUri + ace + '/' + sal + '/' + group + '/ADocB/' + sessionStorage.userName, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            CreateTableSanad(data);
        });*/
    }

    //Get CheckCols List
    function getColsCheckList() {
        colsCheck = getRprtCols('CheckList', sessionStorage.userName);
        CreateTableCheck(colsCheck)
        /* ajaxFunction(ColsUri + ace + '/' + sal + '/' + group + '/CheckList/' + sessionStorage.userName, 'GET').done(function (data) {
            data = TranslateData(data);
            CreateTableCheck(data);
        });*/

    }

    function getExtraFieldsList() {
        cols = getRprtCols('ADocH', sessionStorage.userName);
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

    function getADocHLastDate() {
        ajaxFunction(ADocHLastDateUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.DocDate(data);
            $('#btntarikh').click(function () {
                $('#tarikh').change();
            });
        });

    }





    //Get CheckStatus List
    function getCheckStatusList(PDMode) {
        list = localStorage.getItem('CheckStatus' + PDMode);
        if (list != null) {
            list = JSON.parse(localStorage.getItem('CheckStatus' + PDMode));
            self.CheckStatusList(list)
        }
        else {
            ajaxFunction(CheckStatusUri + ace + '/' + sal + '/' + group + '/' + PDMode + '/0', 'GET').done(function (data) {
                self.CheckStatusList(data);
                localStorage.setItem('CheckStatus' + PDMode, JSON.stringify(data));
            });
        }
    }

    //Get ADocH 
    function getADocH(serialNumber) {
        ajaxFunction(ADocHUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.ADocHList(data);
        });
    }

    //Get ADocB 
    function getADocB(serialNumber) {
        ajaxFunction(ADocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.ADocBList(data);
            self.ADocB(data);
            calcsum(data);
        });
    }



    //Get ADocP List
    function getADocP(serialNumber) {
        ajaxFunction(ADocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.ADocPList(data);
        });
    }

    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {

        selectStatus = $("#status").val();
        if (accessTaeed == false && selectStatus == translate('تایید')) {
            $("#status").val(lastStatus);
            return showNotification(translate('دسترسی تایید ندارید'), 0);
        }

        if (accessDaem == false && selectStatus == translate('دائم')) {
            $("#status").val(lastStatus);
            return showNotification(translate('دسترسی دائم ندارید'), 0);
        }

        /*
        if (sessionStorage.Status != 'تایید' && selectStatus == 'تصویب') {
            $("#status").val(lastStatus);
            return showNotification(translate('فقط اسناد تایید شده امکان تصویب دارند', 0);
        }
        */


    });

    getColsSanadList();
    getColsCheckList();
    //getAccList();
    getAModeList();
    //getOprList();
    //getArzList();
    // getMkzList();
    //getBankList();
    //getShobeList();
    //getJariList();
    getCheckStatusList(1);
    getStatusList();
    getExtraFieldsList();

    self.ClearADocH = function ClearADocH() {
        Serial = '';
        sessionStorage.flagupdateHeader = '0';
        flagupdateHeader = 0;
        self.DocNoOut('');
        self.DocDate($('#tarikh').val().toEnglishDigit());
        self.Spec('');
    };

    if (flagupdateHeader == 1) {
        flagInsertADocH = 1;
        Serial = sessionStorage.SerialNumber;
        self.SerialNumber(Serial);
        self.DocNoOut(sessionStorage.DocNo);
        self.DocDate(sessionStorage.DocDate);

        $('#btntarikh').click(function () {
            $('#tarikh').change();
        });
        self.Spec(sessionStorage.Spec);
        $("#docnoout").text(sessionStorage.DocNo);
        self.AModeCode(sessionStorage.ModeCodeSanad);

        $("#modeCode").val(sessionStorage.ModeCodeSanad);
        getADocB(Serial);

        self.StatusSanad(sessionStorage.Status);
        $("#status").val(sessionStorage.Status);
        flagOtherFieldShow = true;


        $('#titlePage').text(translate("سند حسابداری شماره") + ' ' + sessionStorage.DocNo.toPersianDigit());

        var TestADoc_EditObject = {
            Serialnumber: Serial
        }

        ajaxFunction(TestADoc_EditUri + ace + '/' + sal + '/' + group, 'POST', TestADoc_EditObject, false).done(function (data) {
            list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                if (list[i].TestName == "YTrs") {
                    closedDate = true;
                    showNotification(translate(list[i].TestCap), 0);
                }
            }

        });


    }
    else {
        flagInsertADocH = 0;

        if (parseInt(sal) < SalNow) {
            getADocHLastDate();
        }
    }


    function calcsum(list) {
        totalBede = 0;
        totalBest = 0;
        totalArzValue = 0;

        for (var i = 0; i < list.length; ++i) {
            ADocBData = list[i];
            totalBede += ADocBData.Bede;
            totalBest += ADocBData.Best;
            totalArzValue += ADocBData.ArzValue;
        }

        $("#textTotal").text(translate('جمع'));
        $("#totalBede").text(NumberToNumberString(totalBede));
        $("#totalBest").text(NumberToNumberString(totalBest));
        $("#totalArzValue").text(NumberToNumberString(totalArzValue));
        tafavotSanad = totalBede - totalBest;


        if (tafavotSanad >= 0) {
            $("#TafavotSanad").css("color", "blue");
            $("#TafavotSanad").val(NumberToNumberString(tafavotSanad));
        }
        else {
            $("#TafavotSanad").css("color", "red");
            $("#TafavotSanad").val('(' + NumberToNumberString(Math.abs(tafavotSanad)) + ')');
        }
    }

    sessionStorage.NEW_ADOC == "true" ? $("#AddNewSanad").show() : $("#AddNewSanad").hide();

    $('#AddNewSanad').click(function () {

        AddNewSanad();
    });

    function AddNewSanad() {
        Swal.fire({
            title: '',
            text: translate("سند جدید ایجاد می شود . آیا مطمئن هستید ؟"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                $('#titlePage').text(translate("سند حسابداری جدید"));
                closedDate = false;
                sessionStorage.flagupdateHeader = 0;
                AccCode = "";
                AccZCode = "";
                TrafCode = "";
                TrafZCode = "";
                ArzCode = "";
                OprCode = "";
                MkzCode = "";
                bandnumber = 0;
                bandnumberedit = 0;
                flagFinalSave = false;
                flagEditBand = false;
                flag = -1;
                bandnumber = 0;
                bandnumberedit = 0;
                flagFinalSave = false;
                flagInsertADocH = 0;
                zGruAcc = "";
                allSearchAcc = true;
                allSearchAcc = true;
                Serial = '';
                PDModeAcc = 0;
                self.flagupdateband = false;
                flagOtherFieldShow = false;
                ClearSearch();
                self.ClearADocH();
                self.ADocBList([]);
                self.ADocB([]);
                self.ADocHList([]);
                $('#totalBede').text('');
                $('#totalBest').text('');
                $('#textTotal').text('');
                $('#TafavotSanad').val('');
                $('#docnoout').text(translate('جدید'));
                sessionStorage.searchADocH = "";
                self.StatusSanad(translate('موقت'));
                $("#status").val(translate('موقت'));
                sessionStorage.Status = translate('موقت');

                sessionStorage.Eghdam = sessionStorage.userName;
                self.bundNumberImport = 0;
                flaglog = "Y";
                $(this).CheckAccess();
            }
        })
    }



    self.filterBandNo = ko.observable("");
    self.filterAccFullCode = ko.observable("");
    self.filterAccFullName = ko.observable("");
    self.filterComm = ko.observable("");
    self.filterBede = ko.observable("");
    self.filterBest = ko.observable("");
    self.filterCheckNo = ko.observable("");
    self.filterCheckDate = ko.observable("");
    self.filterBank = ko.observable("");
    self.filterShobe = ko.observable("");
    self.filterJari = ko.observable("");
    self.filterTrafFullCode = ko.observable("");
    self.filterTrafFullName = ko.observable("");
    self.filterMkzCode = ko.observable("");
    self.filterMkzName = ko.observable("");
    self.filterOprCode = ko.observable("");
    self.filterOprName = ko.observable("");
    self.filterBandSpec = ko.observable("");
    self.filterArzCode = ko.observable("");
    self.filterArzValue = ko.observable("");
    self.filterArzRate = ko.observable("");
    self.filterArzName = ko.observable("");


    self.filterADocBList = ko.computed(function () {
        var filterBandNo = self.filterBandNo();
        var filterAccFullCode = self.filterAccFullCode();
        var filterAccFullName = self.filterAccFullName();
        var filterComm = self.filterComm();
        var filterBede = self.filterBede();
        var filterBest = self.filterBest();
        var filterCheckNo = self.filterCheckNo();
        var filterCheckDate = self.filterCheckDate();
        var filterBank = self.filterBank();
        var filterShobe = self.filterShobe();
        var filterJari = self.filterJari();
        var filterTrafFullCode = self.filterTrafFullCode();
        var filterTrafFullName = self.filterTrafFullName();
        var filterMkzCode = self.filterMkzCode();
        var filterMkzName = self.filterMkzName();
        var filterOprCode = self.filterOprCode();
        var filterOprName = self.filterOprName();
        var filterBandSpec = self.filterBandSpec();
        var filterArzCode = self.filterArzCode();
        var filterArzValue = self.filterArzValue();
        var filterArzRate = self.filterArzRate();
        var filterArzName = self.filterArzName();


        tempData = ko.utils.arrayFilter(self.ADocBList(), function (item) {
            result =
                ko.utils.stringStartsWith(item.BandNo.toString().toLowerCase(), filterBandNo) &&
                ko.utils.stringStartsWith(item.Bede.toString().toLowerCase(), filterBede) &&
                ko.utils.stringStartsWith(item.Best.toString().toLowerCase(), filterBest) &&
                ko.utils.stringStartsWith(item.CheckNo.toString().toLowerCase(), filterCheckNo) &&
                ko.utils.stringStartsWith(item.ArzValue.toString().toLowerCase(), filterArzValue) &&
                ko.utils.stringStartsWith(item.ArzRate.toString().toLowerCase(), filterArzRate) &&
                (item.AccFullCode == null ? '' : item.AccFullCode.toString().search(filterAccFullCode) >= 0) &&
                (item.AccFullName == null ? '' : item.AccFullName.toString().search(filterAccFullName) >= 0) &&
                (item.Comm == null ? '' : item.Comm.toString().search(filterComm) >= 0) &&
                (item.CheckDate == null ? '' : item.CheckDate.toString().search(filterCheckDate) >= 0) &&
                (item.Bank == null ? '' : item.Bank.toString().search(filterBank) >= 0) &&
                (item.Shobe == null ? '' : item.Shobe.toString().search(filterShobe) >= 0) &&
                (item.Jari == null ? '' : item.Jari.toString().search(filterJari) >= 0) &&
                (item.TrafFullCode == null ? '' : item.TrafFullCode.toString().search(filterTrafFullCode) >= 0) &&
                (item.TrafFullName == null ? '' : item.TrafFullName.toString().search(filterTrafFullName) >= 0) &&
                (item.MkzCode == null ? '' : item.MkzCode.toString().search(filterMkzCode) >= 0) &&
                (item.MkzName == null ? '' : item.MkzName.toString().search(filterMkzName) >= 0) &&
                (item.OprCode == null ? '' : item.OprCode.toString().search(filterOprCode) >= 0) &&
                (item.OprName == null ? '' : item.OprName.toString().search(filterOprName) >= 0) &&
                (item.BandSpec == null ? '' : item.BandSpec.toString().search(filterBandSpec) >= 0) &&
                (item.ArzCode == null ? '' : item.ArzCode.toString().search(filterArzCode) >= 0) &&
                (item.ArzName == null ? '' : item.ArzName.toString().search(filterArzName) >= 0)
            return result;
        })
        // calcsum(tempData);
        return tempData;

    });







    self.currentColumn = ko.observable("");
    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeStatus = ko.observable("");
    self.iconTypeRate = ko.observable("");


    self.currentPageAcc = ko.observable();
    pageSizeAcc = localStorage.getItem('pageSizeAcc') == null ? 10 : localStorage.getItem('pageSizeAcc');
    self.pageSizeAcc = ko.observable(pageSizeAcc);

    self.currentPageIndexAcc = ko.observable(0);

    self.filterAcc0 = ko.observable("");
    self.filterAcc1 = ko.observable("");
    self.filterAcc2 = ko.observable("");

    self.filterAccList = ko.computed(function () {

        self.currentPageIndexAcc(0);
        var filter0 = self.filterAcc0().toUpperCase();
        var filter1 = self.filterAcc1();
        var filter2 = self.filterAcc2();

        if (!filter0 && !filter1 && !filter2) {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageAcc = ko.computed(function () {
        var pageSizeAcc = parseInt(self.pageSizeAcc(), 10),
            startIndex = pageSizeAcc * self.currentPageIndexAcc(),
            endIndex = startIndex + pageSizeAcc;
        localStorage.setItem('pageSizeAcc', pageSizeAcc);
        return self.filterAccList().slice(startIndex, endIndex);
    });

    self.nextPageAcc = function () {
        if (((self.currentPageIndexAcc() + 1) * self.pageSizeAcc()) < self.filterAccList().length) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() + 1);
        }
    };

    self.previousPageAcc = function () {
        if (self.currentPageIndexAcc() > 0) {
            self.currentPageIndexAcc(self.currentPageIndexAcc() - 1);
        }
    };

    self.firstPageAcc = function () {
        self.currentPageIndexAcc(0);
    };

    self.lastPageAcc = function () {
        countAcc = parseInt(self.filterAccList().length / self.pageSizeAcc(), 10);
        if ((self.filterAccList().length % self.pageSizeAcc()) == 0)
            self.currentPageIndexAcc(countAcc - 1);
        else
            self.currentPageIndexAcc(countAcc);
    };



    self.sortTableAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.AccList.sort(function (left, right) {

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


        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshAcc').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست حساب ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getAccList();
            }
        })
    })


    self.selectAcc = function (item) {

        AccZCode = '';
        ArzCode = '';
        OprCode = '';
        MkzCode = '';
        TrafCode = '';
        TrafZCode = '';
        PDModeAcc = 0;
        ArzRate = 0;

        zGruAcc = "";
        $('#nameZAcc').val('');
        if (item.HasChild == 0 || item.NextLevelFromZAcc == 1) {
            if (item.NextLevelFromZAcc == 1) {
                $("#panelAcc").removeClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
                $("#panelAcc").addClass("col-lg-3 col-md-3 col-sm-12 col-xs-12");
                $('#panelZAcc').removeAttr('hidden', '');
                getZAccList(item.ZGru == '' ? null : item.ZGru);
                $('#modal-ZAcc').modal('show');
            }
            else {
                $('#panelZAcc').attr('hidden', '');
                $("#panelAcc").removeClass("col-lg-3 col-md-3 col-sm-12 col-xs-12");
                $("#panelAcc").addClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
                AccZCode = '';
            }

            PDModeAcc = item.PDMode;
            if (item.PDMode > 0) {
                getCheckList(PDModeAcc);
                ShowCheck();
            }
            else {
                HiddenCheck();
                $('#CheckNo').val('');
                $('#checkDateBand').val('');
                $('#nameBank').val('');
                $('#nameShobe').val('');
                $('#nameJari').val('');
                $('#Value').val('');
                $('#BaratNo').val('');
                $('#checkStatus').val('');
                $('#nameTraf').val('');
                $('#nameTrafZ').val('');
                $('#CheckRadif').val('');
                $('#checkVosoolDate').val('');
                $('#CheckComm').val('');
            }



            if (item.Arzi > 0) {
                $('#panelArz').removeAttr('hidden', '');
                if (item.ArzCode != '') {
                    $('#nameArz').val('(' + item.ArzCode + ') ' + item.ArzName);
                    $('#ArzRate').val(item.ArzRate);
                    ArzCode = item.ArzCode;
                }
                else {
                    $('#nameArz').val('');
                }
            }
            else {
                $('#panelArz').attr('hidden', '');
                $('#panelArz').val('');
            }


            if (item.Mkz > 0) {
                $('#panelMkz').removeAttr('hidden', '');
                if (item.MkzCode != '') {
                    MkzCode = item.MkzCode;
                    $('#nameMkz').val('(' + item.MkzCode + ') ' + item.MkzName);
                }
                else {
                    $('#nameMkz').val('');
                }
            }
            else {
                $('#panelMkz').attr('hidden', '');
                $('#nameMkz').val('');
            }

            if (item.Opr > 0) {
                $('#panelOpr').removeAttr('hidden', '');
                if (item.OprCode != '') {
                    OprCode = item.OprCode;
                    $('#nameOpr').val('(' + item.OprCode + ') ' + item.OprName);
                }
                else {
                    $('#nameOpr').val('');
                }
            }
            else {
                $('#panelOpr').attr('hidden', '');
                $('#panelOpr').val('');
            }

            $('#nameAcc').val('(' + item.Code + ') ' + item.Name);
            AccCode = item.Code;
            $('#modal-Acc').modal('toggle');
        }
        else
            return showNotification(translate('این حساب قابل انتخاب نیست'), 0);
    }


    $('#modal-Acc').on('shown.bs.modal', function () {
        if (flagSearchAcc == 0 && self.flagupdateband == false) {
            self.filterAcc0("");
            self.filterAcc1("");
            self.filterAcc2("");
            self.currentPageIndexAcc(0);
            flagSearchAcc = 1;
        }
        else if (flagSearchAcc == 0 && self.flagupdateband == true) {
            self.filterAcc0(AccCode);
            self.filterAcc1("");
            self.filterAcc2("");
        }
        $('.fix').attr('class', 'form-line focused fix');
    });






    self.currentPageZAcc = ko.observable();
    pageSizeZAcc = localStorage.getItem('pageSizeZAcc') == null ? 10 : localStorage.getItem('pageSizeZAcc');
    self.pageSizeZAcc = ko.observable(pageSizeZAcc);
    self.currentPageIndexZAcc = ko.observable(0);

    self.filterZAcc0 = ko.observable("");
    self.filterZAcc1 = ko.observable("");
    self.filterZAcc2 = ko.observable("");

    self.filterZAccList = ko.computed(function () {
        self.currentPageIndexZAcc(0);
        var filter0 = self.filterZAcc0().toUpperCase();
        var filter1 = self.filterZAcc1();
        var filter2 = self.filterZAcc2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ZAccList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZAccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageZAcc = ko.computed(function () {
        var pageSizeZAcc = parseInt(self.pageSizeZAcc(), 10),
            startIndex = pageSizeZAcc * self.currentPageIndexZAcc(),
            endIndex = startIndex + pageSizeZAcc;
        localStorage.setItem('pageSizeZAcc', pageSizeZAcc);
        return self.filterZAccList().slice(startIndex, endIndex);
    });

    self.nextPageZAcc = function () {
        if (((self.currentPageIndexZAcc() + 1) * self.pageSizeZAcc()) < self.filterZAccList().length) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() + 1);
        }
    };

    self.previousPageZAcc = function () {
        if (self.currentPageIndexZAcc() > 0) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() - 1);
        }
    };

    self.firstPageZAcc = function () {
        self.currentPageIndexZAcc(0);
    };

    self.lastPageZAcc = function () {
        countZAcc = parseInt(self.filterZAccList().length / self.pageSizeZAcc(), 10);
        if ((self.filterZAccList().length % self.pageSizeZAcc()) == 0)
            self.currentPageIndexZAcc(countZAcc - 1);
        else
            self.currentPageIndexZAcc(countZAcc);
    };

    self.sortTableZAcc = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ZAccList.sort(function (left, right) {
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


    $('#refreshZAcc').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست زیر حساب ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getZAccList();
            }
        })
    })


    self.selectZAcc = function (item) {
        $('#nameZAcc').val('(' + item.Code + ') ' + item.Name);
        AccZCode = item.Code;
        $('#modal-ZAcc').modal('toggle');
    }


    $('#modal-ZAcc').on('shown.bs.modal', function () {

        if (flagSearchZAcc == 0 && self.flagupdateband == false) {
            self.filterZAcc0("");
            self.filterZAcc1("");
            self.filterZAcc2("");
            self.currentPageIndexZAcc(0);
            flagSearchZAcc = 1;
        } else if (flagSearchZAcc == 0 && self.flagupdateband == true) {
            self.filterZAcc0(AccZCode);
            self.filterZAcc1("");
            self.filterZAcc2("");
        }
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageTraf = ko.observable();

    pageSizeTraf = localStorage.getItem('pageSizeTraf') == null ? 10 : localStorage.getItem('pageSizeTraf');
    self.pageSizeTraf = ko.observable(pageSizeTraf);
    self.currentPageIndexTraf = ko.observable(0);

    self.filterTraf0 = ko.observable("");
    self.filterTraf1 = ko.observable("");
    self.filterTraf2 = ko.observable("");

    self.filterTrafList = ko.computed(function () {

        self.currentPageIndexTraf(0);
        var filter0 = self.filterTraf0().toUpperCase();
        var filter1 = self.filterTraf1();
        var filter2 = self.filterTraf2();

        if (!filter0 && !filter1 && !filter2) {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        } else {
            tempData = ko.utils.arrayFilter(self.AccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    item.AutoCreate == 0
                return result;
            })
            return tempData;
        }
    });


    self.currentPageTraf = ko.computed(function () {
        var pageSizeTraf = parseInt(self.pageSizeTraf(), 10),
            startIndex = pageSizeTraf * self.currentPageIndexTraf(),
            endIndex = startIndex + pageSizeTraf;
        localStorage.setItem('pageSizeTraf', pageSizeTraf);
        return self.filterTrafList().slice(startIndex, endIndex);
    });

    self.nextPageTraf = function () {
        if (((self.currentPageIndexTraf() + 1) * self.pageSizeTraf()) < self.filterTrafList().length) {
            self.currentPageIndexTraf(self.currentPageIndexTraf() + 1);
        }
    };

    self.previousPageTraf = function () {
        if (self.currentPageIndexTraf() > 0) {
            self.currentPageIndexTraf(self.currentPageIndexTraf() - 1);
        }
    };

    self.firstPageTraf = function () {
        self.currentPageIndexTraf(0);
    };

    self.lastPageTraf = function () {
        countTraf = parseInt(self.filterTrafList().length / self.pageSizeTraf(), 10);
        if ((self.filterTrafList().length % self.pageSizeTraf()) == 0)
            self.currentPageIndexTraf(countTraf - 1);
        else
            self.currentPageIndexTraf(countTraf);
    };

    self.sortTableTraf = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.AccList.sort(function (left, right) {
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


    $('#refreshTraf').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست طرف حساب ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {

                getAccList();

            }
        })
    })


    self.selectTraf = function (item) {
        zGruTraf = "";
        $('#nameZAcc').val('');
        if (item.HasChild == 0 || item.NextLevelFromZAcc == 1) {
            if (item.NextLevelFromZAcc == 1) {
                $('#btnTrafZ').removeAttr('hidden', '');
                getZAccList(item.ZGru == '' ? null : item.ZGru);
                $('#modal-TrafZ').modal('show');
            }
            else {
                $('#btnTrafZ').attr('hidden', '');
                TrafZCode = '';
            }


            $('#nameTraf').val('(' + item.Code + ') ' + item.Name);
            TrafCode = item.Code;
            $('#modal-Traf').modal('toggle');
        }
        else
            return showNotification(translate('این طرف حساب قابل انتخاب نیست'), 0);
    }


    $('#modal-Traf').on('shown.bs.modal', function () {
        if (flagSearchTraf == 0 && self.flagupdateband == false) {
            self.filterTraf0("");
            self.filterTraf1("");
            self.filterTraf2("");
            self.currentPageIndexTraf(0);
            flagSearchTraf = 1;
        } else if (flagSearchTraf == 0 && self.flagupdateband == true) {
            self.filterTraf0(TrafCode);
            self.filterTraf1("");
            self.filterTraf2("");
        }

        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageTrafZ = ko.observable();

    pageSizeTrafZ = localStorage.getItem('pageSizeTrafZ') == null ? 10 : localStorage.getItem('pageSizeTrafZ');
    self.pageSizeTrafZ = ko.observable(pageSizeTrafZ);
    self.currentPageIndexTrafZ = ko.observable(0);

    self.filterTrafZ0 = ko.observable("");
    self.filterTrafZ1 = ko.observable("");
    self.filterTrafZ2 = ko.observable("");

    self.filterTrafZList = ko.computed(function () {

        self.currentPageIndexTrafZ(0);
        var filter0 = self.filterTrafZ0().toUpperCase();
        var filter1 = self.filterTrafZ1();
        var filter2 = self.filterTrafZ2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ZAccList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZAccList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageTrafZ = ko.computed(function () {
        var pageSizeTrafZ = parseInt(self.pageSizeTrafZ(), 10),
            startIndex = pageSizeTrafZ * self.currentPageIndexTrafZ(),
            endIndex = startIndex + pageSizeTrafZ;
        localStorage.setItem('pageSizeTrafZ', pageSizeTrafZ);
        return self.filterTrafZList().slice(startIndex, endIndex);
    });

    self.nextPageTrafZ = function () {
        if (((self.currentPageIndexTrafZ() + 1) * self.pageSizeTrafZ()) < self.filterTrafZList().length) {
            self.currentPageIndexTrafZ(self.currentPageIndexTrafZ() + 1);
        }
    };

    self.previousPageTrafZ = function () {
        if (self.currentPageIndexTrafZ() > 0) {
            self.currentPageIndexTrafZ(self.currentPageIndexTrafZ() - 1);
        }
    };

    self.firstPageTrafZ = function () {
        self.currentPageIndexTrafZ(0);
    };

    self.lastPageTrafZ = function () {
        countTrafZ = parseInt(self.filterTrafZList().length / self.pageSizeTrafZ(), 10);
        if ((self.filterTrafZList().length % self.pageSizeTrafZ()) == 0)
            self.currentPageIndexTrafZ(countTrafZ - 1);
        else
            self.currentPageIndexTrafZ(countTrafZ);
    };

    self.sortTableTrafZ = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ZAccList.sort(function (left, right) {
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


    $('#refreshTrafZ').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست زیر حساب ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getZAccList();
            }
        })
    })


    self.selectTrafZ = function (item) {
        $('#nameTrafZ').val('(' + item.Code + ') ' + item.Name);
        TrafZCode = item.Code;
        $('#modal-TrafZ').modal('toggle');
    }


    $('#modal-TrafZ').on('shown.bs.modal', function () {
        if (flagSearchTrafZ == 0 && self.flagupdateband == false) {
            self.filterTrafZ0("");
            self.filterTrafZ1("");
            self.filterTrafZ2("");
            self.currentPageIndexTrafZ(0);
            flagSearchTrafZ = 1;
        } else if (flagSearchTrafZ == 0 && self.flagupdateband == true) {
            self.filterTrafZ0(TrafZCode);
            self.filterTrafZ1("");
            self.filterTrafZ2("");
        }
        $('.fix').attr('class', 'form-line focused fix');
    });


    self.currentPageOpr = ko.observable();
    pageSizeOpr = localStorage.getItem('pageSizeOpr') == null ? 10 : localStorage.getItem('pageSizeOpr');
    self.pageSizeOpr = ko.observable(pageSizeOpr);
    self.currentPageIndexOpr = ko.observable(0);

    self.filterOpr0 = ko.observable("");
    self.filterOpr1 = ko.observable("");
    self.filterOpr2 = ko.observable("");

    self.filterOprList = ko.computed(function () {

        self.currentPageIndexOpr(0);
        var filter0 = self.filterOpr0().toUpperCase();
        var filter1 = self.filterOpr1();
        var filter2 = self.filterOpr2();

        if (!filter0 && !filter1 && !filter2) {
            return self.OprList();
        } else {
            tempData = ko.utils.arrayFilter(self.OprList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });

    self.currentPageOpr = ko.computed(function () {
        var pageSizeOpr = parseInt(self.pageSizeOpr(), 10),
            startIndex = pageSizeOpr * self.currentPageIndexOpr(),
            endIndex = startIndex + pageSizeOpr;
        localStorage.setItem('pageSizeOpr', pageSizeOpr);
        return self.filterOprList().slice(startIndex, endIndex);
    });

    self.nextPageOpr = function () {
        if (((self.currentPageIndexOpr() + 1) * self.pageSizeOpr()) < self.filterOprList().length) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() + 1);
        }
    };

    self.previousPageOpr = function () {
        if (self.currentPageIndexOpr() > 0) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() - 1);
        }
    };

    self.firstPageOpr = function () {
        self.currentPageIndexOpr(0);
    };

    self.lastPageOpr = function () {
        countOpr = parseInt(self.filterOprList().length / self.pageSizeOpr(), 10);
        if ((self.filterOprList().length % self.pageSizeOpr()) == 0)
            self.currentPageIndexOpr(countOpr - 1);
        else
            self.currentPageIndexOpr(countOpr);
    };
    self.sortTableOpr = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.OprList.sort(function (left, right) {
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


    $('#refreshOpr').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست پروژه ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getOprList();

            }
        })
    })


    self.selectOpr = function (item) {
        $('#nameOpr').val('(' + item.Code + ') ' + item.Name);
        OprCode = item.Code;
    }


    $('#modal-Opr').on('shown.bs.modal', function () {
        if (flagSearchOpr == 0 && self.flagupdateband == false) {
            self.filterOpr0("");
            self.filterOpr1("");
            self.filterOpr2("");
            self.currentPageIndexOpr(0);
            flagSearchOpr = 1;
        }
        else if (flagSearchOpr == 0 && self.flagupdateband == true) {
            self.filterOpr0(OprCode);
            self.filterOpr1("");
            self.filterOpr2("");
        }
        $('.fix').attr('class', 'form-line focused fix');
    });




    self.currentPageMkz = ko.observable();
    pageSizeMkz = localStorage.getItem('pageSizeMkz') == null ? 10 : localStorage.getItem('pageSizeMkz');
    self.pageSizeMkz = ko.observable(pageSizeMkz);
    self.currentPageIndexMkz = ko.observable(0);

    self.filterMkz0 = ko.observable("");
    self.filterMkz1 = ko.observable("");
    self.filterMkz2 = ko.observable("");

    self.filterMkzList = ko.computed(function () {

        self.currentPageIndexMkz(0);
        var filter0 = self.filterMkz0().toUpperCase();
        var filter1 = self.filterMkz1();
        var filter2 = self.filterMkz2();

        if (!filter0 && !filter1 && !filter2) {
            return self.MkzList();
        } else {
            tempData = ko.utils.arrayFilter(self.MkzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageMkz = ko.computed(function () {
        var pageSizeMkz = parseInt(self.pageSizeMkz(), 10),
            startIndex = pageSizeMkz * self.currentPageIndexMkz(),
            endIndex = startIndex + pageSizeMkz;
        localStorage.setItem('pageSizeMkz', pageSizeMkz);
        return self.filterMkzList().slice(startIndex, endIndex);
    });

    self.nextPageMkz = function () {
        if (((self.currentPageIndexMkz() + 1) * self.pageSizeMkz()) < self.filterMkzList().length) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() + 1);
        }
    };

    self.previousPageMkz = function () {
        if (self.currentPageIndexMkz() > 0) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() - 1);
        }
    };

    self.firstPageMkz = function () {
        self.currentPageIndexMkz(0);
    };

    self.lastPageMkz = function () {
        countMkz = parseInt(self.filterMkzList().length / self.pageSizeMkz(), 10);
        if ((self.filterMkzList().length % self.pageSizeMkz()) == 0)
            self.currentPageIndexMkz(countMkz - 1);
        else
            self.currentPageIndexMkz(countMkz);
    };

    self.sortTableMkz = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.MkzList.sort(function (left, right) {
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


        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshMkz').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست مراکز هزینه ") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getMkzList();
            }
        })
    })


    self.selectMkz = function (item) {
        $('#nameMkz').val('(' + item.Code + ') ' + item.Name);
        MkzCode = item.Code;
    }


    $('#modal-Mkz').on('shown.bs.modal', function () {
        if (flagSearchMkz == 0 && self.flagupdateband == false) {
            self.filterMkz0("");
            self.filterMkz1("");
            self.filterMkz2("");
            self.currentPageIndexMkz(0);
            flagSearchMkz = 1;
        } else if (flagSearchMkz == 0 && self.flagupdateband == true) {
            self.filterMkz0(MkzCode);
            self.filterMkz1("");
            self.filterMkz2("");
        }
        $('.fix').attr('class', 'form-line focused fix');
    });













    self.currentPageArz = ko.observable();
    pageSizeArz = localStorage.getItem('pageSizeArz') == null ? 10 : localStorage.getItem('pageSizeArz');
    self.pageSizeArz = ko.observable(pageSizeArz);
    self.currentPageIndexArz = ko.observable(0);

    self.filterArz0 = ko.observable("");
    self.filterArz1 = ko.observable("");
    self.filterArz2 = ko.observable("");
    self.filterArz3 = ko.observable("");

    self.filterArzList = ko.computed(function () {

        self.currentPageIndexArz(0);
        var filter0 = self.filterArz0().toUpperCase();
        var filter1 = self.filterArz1();
        var filter2 = self.filterArz2();
        var filter3 = self.filterArz3();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.ArzList();
        } else {
            tempData = ko.utils.arrayFilter(self.ArzList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0) &&
                    ko.utils.stringStartsWith(item.Rate.toString().toLowerCase(), filter3)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageArz = ko.computed(function () {
        var pageSizeArz = parseInt(self.pageSizeArz(), 10),
            startIndex = pageSizeArz * self.currentPageIndexArz(),
            endIndex = startIndex + pageSizeArz;
        localStorage.setItem('pageSizeArz', pageSizeArz);
        return self.filterArzList().slice(startIndex, endIndex);
    });

    self.nextPageArz = function () {
        if (((self.currentPageIndexArz() + 1) * self.pageSizeArz()) < self.filterArzList().length) {
            self.currentPageIndexArz(self.currentPageIndexArz() + 1);
        }
    };

    self.previousPageArz = function () {
        if (self.currentPageIndexArz() > 0) {
            self.currentPageIndexArz(self.currentPageIndexArz() - 1);
        }
    };

    self.firstPageArz = function () {
        self.currentPageIndexArz(0);
    };

    self.lastPageArz = function () {
        countArz = parseInt(self.filterArzList().length / self.pageSizeArz(), 10);
        if ((self.filterArzList().length % self.pageSizeArz()) == 0)
            self.currentPageIndexArz(countArz - 1);
        else
            self.currentPageIndexArz(countArz);
    };

    self.sortTableArz = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ArzList.sort(function (left, right) {
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
        self.iconTypeRate('');


        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Rate') self.iconTypeRate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshArz').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ارز") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getArzList();
            }
        })
    })


    self.selectArz = function (item) {
        $('#nameArz').val('(' + item.Code + ') ' + item.Name);
        ArzCode = item.Code;
        $('#ArzRate').val(item.Rate);
        CalcArz();
    }


    $('#modal-Arz').on('shown.bs.modal', function () {
        if (flagSearchArz == 0 && self.flagupdateband == false) {
            self.filterArz0("");
            self.filterArz1("");
            self.filterArz2("");
            self.currentPageIndexArz(0);
            flagSearchArz = 1;
        } else if (flagSearchArz == 0 && self.flagupdateband == true) {
            self.filterArz0(ArzCode);
            self.filterArz1("");
            self.filterArz2("");
        }
        $('.fix').attr('class', 'form-line focused fix');
    });








    self.currentPageBank = ko.observable();
    pageSizeBank = localStorage.getItem('pageSizeBank') == null ? 10 : localStorage.getItem('pageSizeBank');
    self.pageSizeBank = ko.observable(pageSizeBank);
    self.currentPageIndexBank = ko.observable(0);

    self.filterBank0 = ko.observable("");

    self.filterBankList = ko.computed(function () {

        self.currentPageIndexBank(0);
        var filter0 = self.filterBank0();

        if (!filter0) {
            return self.BankList();
        } else {
            tempData = ko.utils.arrayFilter(self.BankList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageBank = ko.computed(function () {
        var pageSizeBank = parseInt(self.pageSizeBank(), 10),
            startIndex = pageSizeBank * self.currentPageIndexBank(),
            endIndex = startIndex + pageSizeBank;
        localStorage.setItem('pageSizeBank', pageSizeBank);
        return self.filterBankList().slice(startIndex, endIndex);
    });

    self.nextPageBank = function () {
        if (((self.currentPageIndexBank() + 1) * self.pageSizeBank()) < self.filterBankList().length) {
            self.currentPageIndexBank(self.currentPageIndexBank() + 1);
        }
    };

    self.previousPageBank = function () {
        if (self.currentPageIndexBank() > 0) {
            self.currentPageIndexBank(self.currentPageIndexBank() - 1);
        }
    };

    self.firstPageBank = function () {
        self.currentPageIndexBank(0);
    };

    self.lastPageBank = function () {
        countBank = parseInt(self.filterBankList().length / self.pageSizeBank(), 10);
        if ((self.filterBankList().length % self.pageSizeBank()) == 0)
            self.currentPageIndexBank(countBank - 1);
        else
            self.currentPageIndexBank(countBank);
    };

    self.sortTableBank = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.BankList.sort(function (left, right) {
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

        self.iconTypeName('');

        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshBank').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست بانک") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getBankList();
            }
        })
    })


    self.selectBank = function (item) {
        $('#nameBank').val(item.Name);
    }


    $('#modal-Bank').on('shown.bs.modal', function () {
        if (flagSearchBank == 0 && self.flagupdateband == false) {
            filterBank0("");
            self.currentPageIndexBank(0);
            flagSearchBank = 1;
        } else if (flagSearchBank == 0 && self.flagupdateband == true) {
            self.filterBank0($('#nameBank').val());
        }
        $('.fix').attr('class', 'form-line focused fix');

    });










    self.currentPageShobe = ko.observable();
    pageSizeShobe = localStorage.getItem('pageSizeShobe') == null ? 10 : localStorage.getItem('pageSizeShobe');
    self.pageSizeShobe = ko.observable(pageSizeShobe);
    self.currentPageIndexShobe = ko.observable(0);

    self.filterShobe0 = ko.observable("");

    self.filterShobeList = ko.computed(function () {

        self.currentPageIndexShobe(0);
        var filter0 = self.filterShobe0();

        if (!filter0) {
            return self.ShobeList();
        } else {
            tempData = ko.utils.arrayFilter(self.ShobeList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageShobe = ko.computed(function () {
        var pageSizeShobe = parseInt(self.pageSizeShobe(), 10),
            startIndex = pageSizeShobe * self.currentPageIndexShobe(),
            endIndex = startIndex + pageSizeShobe;
        localStorage.setItem('pageSizeShobe', pageSizeShobe);
        return self.filterShobeList().slice(startIndex, endIndex);
    });

    self.nextPageShobe = function () {
        if (((self.currentPageIndexShobe() + 1) * self.pageSizeShobe()) < self.filterShobeList().length) {
            self.currentPageIndexShobe(self.currentPageIndexShobe() + 1);
        }
    };

    self.previousPageShobe = function () {
        if (self.currentPageIndexShobe() > 0) {
            self.currentPageIndexShobe(self.currentPageIndexShobe() - 1);
        }
    };

    self.firstPageShobe = function () {
        self.currentPageIndexShobe(0);
    };

    self.lastPageShobe = function () {
        countShobe = parseInt(self.filterShobeList().length / self.pageSizeShobe(), 10);
        if ((self.filterShobeList().length % self.pageSizeShobe()) == 0)
            self.currentPageIndexShobe(countShobe - 1);
        else
            self.currentPageIndexShobe(countShobe);
    };

    self.sortTableShobe = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.ShobeList.sort(function (left, right) {
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

        self.iconTypeName('');

        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshShobe').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست شعبه") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getShobeList();
            }
        })
    })


    self.selectShobe = function (item) {
        $('#nameShobe').val(item.Name);
    }


    $('#modal-Shobe').on('shown.bs.modal', function () {
        if (flagSearchShobe == 0 && self.flagupdateband == false) {
            filterShobe0("");
            self.currentPageIndexShobe(0);
            flagSearchShobe = 1;
        } else if (flagSearchShobe == 0 && self.flagupdateband == true) {
            self.filterShobe0($('#nameShobe').val());
        }

        $('.fix').attr('class', 'form-line focused fix');
    });













    self.currentPageJari = ko.observable();
    pageSizeJari = localStorage.getItem('pageSizeJari') == null ? 10 : localStorage.getItem('pageSizeJari');
    self.pageSizeJari = ko.observable(pageSizeJari);
    self.currentPageIndexJari = ko.observable(0);

    self.filterJari0 = ko.observable("");

    self.filterJariList = ko.computed(function () {

        self.currentPageIndexJari(0);
        var filter0 = self.filterJari0();


        if (!filter0) {
            return self.JariList();
        } else {
            tempData = ko.utils.arrayFilter(self.JariList(), function (item) {
                result =
                    (item.Name == null ? '' : item.Name.toString().search(filter0) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageJari = ko.computed(function () {
        var pageSizeJari = parseInt(self.pageSizeJari(), 10),
            startIndex = pageSizeJari * self.currentPageIndexJari(),
            endIndex = startIndex + pageSizeJari;
        localStorage.setItem('pageSizeJari', pageSizeJari);
        return self.filterJariList().slice(startIndex, endIndex);
    });

    self.nextPageJari = function () {
        if (((self.currentPageIndexJari() + 1) * self.pageSizeJari()) < self.filterJariList().length) {
            self.currentPageIndexJari(self.currentPageIndexJari() + 1);
        }
    };

    self.previousPageJari = function () {
        if (self.currentPageIndexJari() > 0) {
            self.currentPageIndexJari(self.currentPageIndexJari() - 1);
        }
    };

    self.firstPageJari = function () {
        self.currentPageIndexJari(0);
    };

    self.lastPageJari = function () {
        countJari = parseInt(self.filterJariList().length / self.pageSizeJari(), 10);
        if ((self.filterJariList().length % self.pageSizeJari()) == 0)
            self.currentPageIndexJari(countJari - 1);
        else
            self.currentPageIndexJari(countJari);
    };

    self.sortTableJari = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.JariList.sort(function (left, right) {
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


        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshJari').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست جاری") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getJariList();
            }
        })
    })


    self.selectJari = function (item) {
        $('#nameJari').val(item.Name);
    }


    $('#modal-Jari').on('shown.bs.modal', function () {
        if (flagSearchJari == 0 && self.flagupdateband == false) {
            filterJari0("");
            self.currentPageIndexJari(0);
            flagSearchJari = 1;
        } else if (flagSearchJari == 0 && self.flagupdateband == true) {
            self.filterJari0($('#nameJari').val());
        }

        $('.fix').attr('class', 'form-line focused fix');
    });



    self.currentPageCheck = ko.observable();
    pageSizeCheck = localStorage.getItem('pageSizeCheck') == null ? 10 : localStorage.getItem('pageSizeCheck');
    self.pageSizeCheck = ko.observable(pageSizeCheck);
    self.currentPageIndexCheck = ko.observable(0);

    self.filterCheckNo = ko.observable("");
    self.filterCheckDate = ko.observable("");
    self.filterValue = ko.observable("");
    self.filterBank = ko.observable("");
    self.filterShobe = ko.observable("");
    self.filterJari = ko.observable("");
    self.filterBaratNo = ko.observable("");
    self.filterCheckStatus = ko.observable("");
    self.filterCheckStatusSt = ko.observable("");
    self.filterCheckRadif = ko.observable("");
    self.filterCheckComm = ko.observable("");

    self.filterTrafFullCode = ko.observable("");
    self.filterTrafFullName = ko.observable("");
    self.filterCheckVosoolDate = ko.observable("");

    self.filterCheckList = ko.computed(function () {

        self.currentPageIndexCheck(0);
        var filterCheckNo = self.filterCheckNo();
        var filterCheckDate = self.filterCheckDate();
        var filterValue = self.filterValue();
        var filterBank = self.filterBank();
        var filterShobe = self.filterShobe();
        var filterJari = self.filterJari();
        var filterBaratNo = self.filterBaratNo();
        var filterCheckStatus = self.filterCheckStatus();
        var filterCheckStatusSt = self.filterCheckStatusSt();
        var filterCheckRadif = self.filterCheckRadif();
        var filterCheckComm = self.filterCheckComm();
        var filterTrafFullCode = self.filterTrafFullCode();
        var filterTrafFullName = self.filterTrafFullName();
        var filterCheckVosoolDate = self.filterCheckVosoolDate();

        if (!filterCheckNo && !filterCheckDate && !filterValue && !filterBank && !filterShobe && !filterJari && !filterBaratNo
            && !filterCheckStatus && !filterCheckStatusSt && !filterCheckRadif && !filterCheckComm && !filterTrafFullCode && !filterTrafFullName && !filterCheckVosoolDate) {
            return self.CheckList();
        } else {
            tempData = ko.utils.arrayFilter(self.CheckList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.CheckNo.toString().toLowerCase(), filterCheckNo) &&
                    (item.CheckDate == null ? '' : item.CheckDate.toString().search(filterCheckDate) >= 0) &&
                    ko.utils.stringStartsWith(item.Value.toString().toLowerCase(), filterValue) &&
                    (item.Bank == null ? '' : item.Bank.toString().search(filterBank) >= 0) &&
                    (item.Shobe == null ? '' : item.Shobe.toString().search(filterShobe) >= 0) &&
                    (item.Jari == null ? '' : item.Jari.toString().search(filterJari) >= 0) &&
                    ko.utils.stringStartsWith(item.BaratNo.toString().toLowerCase(), filterBaratNo) &&
                    (item.CheckStatus == null ? '' : item.CheckStatus.toString().search(filterCheckStatus) >= 0) &&
                    (item.CheckStatusSt == null ? '' : item.CheckStatusSt.toString().search(filterCheckStatusSt) >= 0) &&
                    ko.utils.stringStartsWith(item.CheckRadif.toString().toLowerCase(), filterCheckRadif) &&
                    (item.CheckComm == null ? '' : item.CheckComm.toString().search(filterCheckComm) >= 0) &&
                    ko.utils.stringStartsWith(item.TrafFullCode.toString().toLowerCase(), filterTrafFullCode) &&
                    (item.TrafFullName == null ? '' : item.TrafFullName.toString().search(filterTrafFullName) >= 0)// &&
                //(item.CheckVosoolDate == null ? '' : item.CheckVosoolDate.toString().search(filterCheckVosoolDate) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCheck = ko.computed(function () {
        var pageSizeCheck = parseInt(self.pageSizeCheck(), 10),
            startIndex = pageSizeCheck * self.currentPageIndexCheck(),
            endIndex = startIndex + pageSizeCheck;
        localStorage.setItem('pageSizeCheck', pageSizeCheck);
        return self.filterCheckList().slice(startIndex, endIndex);
    });

    self.nextPageCheck = function () {
        if (((self.currentPageIndexCheck() + 1) * self.pageSizeCheck()) < self.filterCheckList().length) {
            self.currentPageIndexCheck(self.currentPageIndexCheck() + 1);
        }
    };

    self.previousPageCheck = function () {
        if (self.currentPageIndexCheck() > 0) {
            self.currentPageIndexCheck(self.currentPageIndexCheck() - 1);
        }
    };

    self.firstPageCheck = function () {
        self.currentPageIndexCheck(0);
    };

    self.lastPageCheck = function () {
        countCheck = parseInt(self.filterCheckList().length / self.pageSizeCheck(), 10);
        if ((self.filterCheckList().length % self.pageSizeCheck()) == 0)
            self.currentPageIndexCheck(countCheck - 1);
        else
            self.currentPageIndexCheck(countCheck);
    };

    self.iconTypeCode = ko.observable("");

    self.iconTypeCheckNo = ko.observable("");
    self.iconTypeCheckDate = ko.observable("");
    self.iconTypeValue = ko.observable("");
    self.iconTypeBank = ko.observable("");
    self.iconTypeShobe = ko.observable("");
    self.iconTypeJari = ko.observable("");
    self.iconTypeBaratNo = ko.observable("");
    self.iconTypeCheckStatus = ko.observable("");
    self.iconTypeCheckStatusSt = ko.observable("");
    self.iconTypeCheckRadif = ko.observable("");
    self.iconTypeCheckComm = ko.observable("");
    self.iconTypeTrafFullCode = ko.observable("");
    self.iconTypeTrafFullName = ko.observable("");
    self.iconTypeCheckVosoolDate = ko.observable("");
    self.sortTableCheck = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null) {
            return null
        }
        self.currentColumn(orderProp);
        self.CheckList.sort(function (left, right) {
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

        self.iconTypeCheckNo('');
        self.iconTypeCheckDate('');
        self.iconTypeValue('');
        self.iconTypeBank('');
        self.iconTypeShobe('');
        self.iconTypeJari('');
        self.iconTypeBaratNo('');
        self.iconTypeCheckStatus('');
        self.iconTypeCheckStatusSt('');
        self.iconTypeCheckRadif('');
        self.iconTypeCheckComm('');
        self.iconTypeTrafFullCode('');
        self.iconTypeTrafFullName('');
        self.iconTypeCheckVosoolDate('');

        if (orderProp == 'CheckNo') self.iconTypeCheckNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckDate') self.iconTypeCheckDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Value') self.iconTypeValue((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bank') self.iconTypeBank((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Shobe') self.iconTypeShobe((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Jari') self.iconTypeJari((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'BaratNo') self.iconTypeBaratNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckStatus') self.iconTypeCheckStatus((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckStatusSt') self.iconTypeCheckStatusSt((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckRadif') self.iconTypeCheckRadif((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckComm') self.iconTypeCheckComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafFullCode') self.iconTypeTrafFullCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafFullName') self.iconTypeTrafFullName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckVosoolDate') self.iconTypeCheckVosoolDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshCheck').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست چک ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getCheckList(PDModeAcc);
            }
        })
    })


    self.selectCheck = function (item) {
        TrafCode = item.TrafCode;
        TrafZCode = item.TrafZCode;
        $('#CheckNo').val(item.CheckNo);
        $('#checkDateBand').val(item.CheckDate);
        $('#Value').val(NumberToNumberString(item.Value));
        $('#nameBank').val(item.Bank);
        $('#nameShobe').val(item.Shobe);
        $('#nameJari').val(item.Jari);
        $('#BaratNo').val(item.BaratNo);
        $('#CheckRadif').val(item.CheckRadif);
        $('#checkVosoolDate').val(item.CheckVosoolDate);
        if (item.TrafCode != '') {
            $('#nameTraf').val('(' + item.TrafCode + ') ' + item.TrafName);
        }
        else {
            $('#nameTraf').val('');
        }

        if (item.TrafZCode != '') {
            $('#nameTrafZ').val('(' + item.TrafZCode + ') ' + item.TrafZName);
        }
        else {
            $('#nameTrafZ').val('');
        }
        $('#CheckComm').val(item.CheckComm);

        CalcValue(0);

        $('#modal-Check').modal('toggle');
    }


    $('#modal-Check').on('shown.bs.modal', function () {
        if (flagSearchCheck == 0 && self.flagupdateband == false) {
            self.filterCheckNo("");
            self.filterCheckDate("");
            self.filterValue("");
            self.filterBank("");
            self.filterShobe("");
            self.filterJari("");
            self.filterBaratNo("");
            self.filterCheckStatus("");
            self.filterCheckStatusSt("");
            self.filterCheckRadif("");
            self.filterCheckComm("");
            self.currentPageIndexCheck(0);
            flagSearchCheck = 1;
        } else if (flagSearchCheck == 0 && self.flagupdateband == true) {
            a = $('#CheckNo').val();
            self.filterCheckNo(a);
            self.filterCheckDate("");
            self.filterValue("");
            self.filterBank("");
            self.filterShobe("");
            self.filterJari("");
            self.filterBaratNo("");
            self.filterCheckStatus("");
            self.filterCheckStatusSt("");
            self.filterCheckRadif("");
            self.filterCheckComm("");
            self.currentPageIndexCheck(0);
        }

        $('.fix').attr('class', 'form-line focused fix');
    });


    self.ClearADocB = function ClearADocB() {
        $('#nameAcc').val('');
        $('#nameZAcc').val('');
        $('#bede').val('');
        $('#best').val('');
        $('#nameArz').val('');
        $('#ArzRate').val('');
        $('#ArzValue').val('');
        $('#nameOpr').val('');
        $('#nameMkz').val('');
        $('#comm').val('');
        $('#bandSpec').val('');

        $('#CheckNo').val('');
        $('#checkDateBand').val('');
        $('#nameBank').val('');
        $('#nameShobe').val('');
        $('#nameJari').val('');
        $('#Value').val('');
        $('#BaratNo').val('');
        $('#checkStatus').val('');
        $('#nameTraf').val('');
        $('#nameTrafZ').val('');
        $('#CheckRadif').val('');
        $('#checkVosoolDate').val('');
        $('#CheckComm').val('');

        AccCode = "";
        AccZCode = "";
        TrafCode = "";
        TrafZCode = "";
        ArzCode = "";
        OprCode = "";
        MkzCode = "";
    };


    $('#modal-Band').on('show.bs.modal', function () {
        if (self.flagupdateband == false) {
            self.ClearADocB();
        } else {
            flagEditBand = true;
        }
        $('.fix').attr('class', 'form-line focused fix');
        $('#comm').css("height", "201px");
        $('#bandSpec').css("height", "25px");
        autosize.update($('#comm'));
        autosize.update($('#bandSpec'));
        $('#btnAcc').focus();
    });

    $('#modal-Band').on('hide.bs.modal', function () {
        self.flagupdateband = false;
        self.bundNumberImport = 0;
        flagEditBand = false;
    });


    $('#insertband').click(function () {
        self.flagupdateband = false;
    })



    self.ImportBand = function (item) {


        $('#panelZAcc').attr('hidden', '');
        $('#panelArz').attr('hidden', '');
        $('#panelOpr').attr('hidden', '');
        $('#panelMkz').attr('hidden', '');

        $("#panelAcc").addClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
        $('#comm').attr('rows', '18');


        HiddenCheck();
        self.ClearADocB();
        self.flagupdateband = false;
        self.bundNumberImport = item.BandNo;
    }

    self.UpdateBand = function (SanadBand) {
        self.flagupdateband = true;
    }

    function GetBandNumber() {
        if (self.ADocBList().length > 0) {
            bandnumber = self.ADocBList().length + 1;
        } else {
            bandnumber = 1;
        }
    }

    function HiddenCheck() {
        $('#panelCheck').attr('hidden', '');
        $("#panelSanad").removeClass("col-md-8");
        $("#panelSanad").addClass("col-md-12");
    }

    function ShowCheck() {
        $('#panelCheck').removeAttr('hidden', '');
        $("#panelSanad").removeClass("col-md-12");
        $("#panelSanad").addClass("col-md-8");
    }

    self.ButtonADocH = function ButtonADocH() {
        AddNewBand();
    }


    function AddNewBand() {
        ClearSearch();
        $('#panelZAcc').attr('hidden', '');
        $('#panelArz').attr('hidden', '');
        $('#panelOpr').attr('hidden', '');
        $('#panelMkz').attr('hidden', '');

        $("#panelAcc").addClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
        $('#comm').attr('rows', '18');

        HiddenCheck();
        self.ClearADocB();
        if (flagInsertADocH == 0) {

            var tarikh = $("#tarikh").val().toEnglishDigit();
            var docNo = $("#docnoout").val();

            if (tarikh.length != 10)
                return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);

            if (tarikh == '')
                return showNotification(translate('تاریخ را وارد کنید'), 0);

            if ((tarikh >= sessionStorage.BeginDateAcc) && (tarikh <= sessionStorage.EndDateAcc)) { }
            else
                return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);


            TestADoc_New(Serial, tarikh, docNo);
            if (resTestNew == true) {
                AddADocH();
                flagInsertADocH == 1 ? $('#modal-Band').modal() : null
            }

        } else {

            $('#modal-Band').modal();
        }
    }


    function TestADoc_New(serialNumber, tarikh, docNo) {
        var TestADoc_NewObject = {
            DocDate: tarikh,
            ModeCode: sessionStorage.ModeCode,
            DocNo: docNo == "" ? "Auto" : docNo,
            SerialNumber: serialNumber,
        };

        ajaxFunction(TestADoc_NewUri + ace + '/' + sal + '/' + group, 'POST', TestADoc_NewObject).done(function (data) {
            var obj = JSON.parse(data);
            self.TestADoc_NewList(obj);
            if (data.length > 2) {
                $('#modal-Test_New').modal('show');
                SetDataTest_New();
                resTestNew = false;
            } else {
                resTestNew = true;
            }
        });
    }

    function SetDataTest_New() {
        $("#BodyTest_New").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestADoc_NewList();
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

            if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTest_New').append(textBody);

        $('#CountWarning_New').text(countWarning);
        $('#CountError_New').text(countError);

        if (countError > 0) {
            $('#Delete-Modal').attr('hidden', '');
            $('#ShowCountError_New').removeAttr('hidden', '');
        }
        else {
            $('#Delete-Modal').removeAttr('hidden', '')
            $('#ShowCountError_New').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning_New').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning_New').attr('hidden', '');
        }


    }


    //Add new ADocH 
    function AddADocH(newADocH) {
        var tarikh = $("#tarikh").val().toEnglishDigit();
        modeCode = $("#modeCode").val();
        bandnumber = 0;
        status = $("#status").val();

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
        }

        if ((tarikh >= sessionStorage.BeginDateAcc) && (tarikh <= sessionStorage.EndDateAcc)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
        }

        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
        }

        if (self.DocNoOut == '') {
            return showNotification(translate('شماره سند را وارد کنید'), 0);
        }

        var ADocObject = {
            DocNoMode: 1,
            InsertMode: 0,
            ModeCode: modeCode,
            DocNo: 0,
            StartNo: 0,
            EndNo: 0,
            SerialNumber: 0,
            DocDate: tarikh,
            BranchCode: 0,
            UserCode: sessionStorage.userName,
            Tanzim: '*' + sessionStorage.userName + '*',
            //Taeed: status == "تایید" ? sessionStorage.userName : '',
            //Tasvib: '',
            TahieShode: ace,
            Eghdam: sessionStorage.userName,
            Status: status,
            Spec: self.Spec(),
            Footer: $("#footer").val(),
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
            flagLog: flaglog,
        };

        ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group, 'POST', ADocObject).done(function (response) {
            var res = response.split("-");
            Serial = res[0];
            DocNoOut = res[1];
            $('#docnoout').text(DocNoOut);
            flagInsertADocH = 1;
            flaglog = 'N';
        });
        flagInsertADoc = 1;
    };



    self.UpdateADocH = function UpdateADocH(newADocH) {

        var tarikh = $("#tarikh").val().toEnglishDigit();
        modeCode = $("#modeCode").val();
        status = $("#status").val();

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
        }

        if ((tarikh >= sessionStorage.BeginDateAcc) && (tarikh <= sessionStorage.EndDateAcc)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
        }

        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
        }

        if (self.DocNoOut == '') {
            return showNotification(translate('شماره سند را وارد کنید'), 0);
        }

        if ($('#docnoout').text() == '0') {
            return showNotification(translate('ابتدا بند ها وارد کنید'), 0);
        }


        var docNo = $("#docnoout").text();
        TestADoc_New(Serial, tarikh, docNo);
        if (resTestNew == false) {
            return null;
        }

        var ADocObject = {
            SerialNumber: Serial,
            ModeCode: modeCode,
            DocNo: docNo,
            DocDate: tarikh,
            BranchCode: 0,
            UserCode: sessionStorage.userName,
            Tanzim: '*' + sessionStorage.userName + '*',
            //Taeed: status == "تایید" ? sessionStorage.userName : '',
            //Tasvib: '',
            TahieShode: ace,
            Status: status,
            Spec: self.Spec(),
            Footer: $("#footer").val(),
            F01: $("#ExtraFields1").val() == null ? '' : $("#ExtraFields1").val() == "" ? sessionStorage.F01 : $("#ExtraFields1").val(),
            F02: $("#ExtraFields2").val() == null ? '' : $("#ExtraFields2").val() == "" ? sessionStorage.F02 : $("#ExtraFields2").val(),
            F03: $("#ExtraFields3").val() == null ? '' : $("#ExtraFields3").val() == "" ? sessionStorage.F03 : $("#ExtraFields3").val(),
            F04: $("#ExtraFields4").val() == null ? '' : $("#ExtraFields4").val() == "" ? sessionStorage.F04 : $("#ExtraFields4").val(),
            F05: $("#ExtraFields5").val() == null ? '' : $("#ExtraFields5").val() == "" ? sessionStorage.F05 : $("#ExtraFields5").val(),
            F06: $("#ExtraFields6").val() == null ? '' : $("#ExtraFields6").val() == "" ? sessionStorage.F06 : $("#ExtraFields6").val(),
            F07: $("#ExtraFields7").val() == null ? '' : $("#ExtraFields7").val() == "" ? sessionStorage.F07 : $("#ExtraFields7").val(),
            F08: $("#ExtraFields8").val() == null ? '' : $("#ExtraFields8").val() == "" ? sessionStorage.F08 : $("#ExtraFields8").val(),
            F09: $("#ExtraFields9").val() == null ? '' : $("#ExtraFields9").val() == "" ? sessionStorage.F09 : $("#ExtraFields9").val(),
            F10: $("#ExtraFields10").val() == null ? '' : $("#ExtraFields10").val() == "" ? sessionStorage.F10 : $("#ExtraFields10").val(),
            F11: $("#ExtraFields11").val() == null ? '' : $("#ExtraFields11").val() == "" ? sessionStorage.F11 : $("#ExtraFields11").val(),
            F12: $("#ExtraFields12").val() == null ? '' : $("#ExtraFields12").val() == "" ? sessionStorage.F12 : $("#ExtraFields12").val(),
            F13: $("#ExtraFields13").val() == null ? '' : $("#ExtraFields13").val() == "" ? sessionStorage.F13 : $("#ExtraFields13").val(),
            F14: $("#ExtraFields14").val() == null ? '' : $("#ExtraFields14").val() == "" ? sessionStorage.F14 : $("#ExtraFields14").val(),
            F15: $("#ExtraFields15").val() == null ? '' : $("#ExtraFields15").val() == "" ? sessionStorage.F15 : $("#ExtraFields15").val(),
            F16: $("#ExtraFields16").val() == null ? '' : $("#ExtraFields16").val() == "" ? sessionStorage.F16 : $("#ExtraFields16").val(),
            F17: $("#ExtraFields17").val() == null ? '' : $("#ExtraFields17").val() == "" ? sessionStorage.F17 : $("#ExtraFields17").val(),
            F18: $("#ExtraFields18").val() == null ? '' : $("#ExtraFields18").val() == "" ? sessionStorage.F18 : $("#ExtraFields18").val(),
            F19: $("#ExtraFields19").val() == null ? '' : $("#ExtraFields19").val() == "" ? sessionStorage.F19 : $("#ExtraFields19").val(),
            F20: $("#ExtraFields20").val() == null ? '' : $("#ExtraFields20").val() == "" ? sessionStorage.F20 : $("#ExtraFields20").val(),
            flagLog: flaglog,
        };

        ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group, 'PUT', ADocObject).done(function (response) {
            sessionStorage.searchADocH = Serial;
            getADocH(Serial);

            // $('#finalSave_Title').attr('hidden', '');

            flaglog = 'N';


        });
        return "OK";
    };



    self.selectSanad = function (item) {
        if (self.flagupdateband == true) {
            bandnumberedit = item.BandNo;
            AccCode = item.AccCode;
            AccZCode = item.AccZCode;
            ArzCode = item.ArzCode;
            OprCode = item.OprCode;
            MkzCode = item.MkzCode;
            TrafCode = item.TrafCode;
            TrafZCode = item.TrafZCode;
            PDModeAcc = item.PDMode;

            if (AccZCode != '') {
                $("#panelAcc").removeClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
                $("#panelAcc").addClass("col-lg-3 col-md-3 col-sm-12 col-xs-12");
                $('#panelZAcc').removeAttr('hidden', '');
                getZAccList(item.ZGru == '' ? null : item.ZGru);
            }
            else {
                $('#panelZAcc').attr('hidden', '');
                $("#panelAcc").removeClass("col-lg-3 col-md-3 col-sm-12 col-xs-12");
                $("#panelAcc").addClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
            }

            if (PDModeAcc > 0) {
                getCheckList(PDModeAcc);
                ShowCheck();
                PDModeAcc == 1 ? $('#Value').val(NumberToNumberString(item.Best)) : $('#Value').val(NumberToNumberString(item.Bede));
            }
            else {
                HiddenCheck();
            }

            if (item.Arzi > 0) {
                $('#panelArz').removeAttr('hidden', '');
            }
            else {
                $('#panelArz').attr('hidden', '');
                $('#panelArz').val('');
            }


            if (item.Mkz > 0) {
                $('#panelMkz').removeAttr('hidden', '');
            }
            else {
                $('#panelMkz').attr('hidden', '');
                $('#nameMkz').val('');
            }

            if (item.Opr > 0) {
                $('#panelOpr').removeAttr('hidden', '');
            }
            else {
                $('#panelOpr').attr('hidden', '');
                $('#panelOpr').val('');
            }

            $('#nameAcc').val('(' + item.AccCode + ') ' + item.AccName);
            $('#nameZAcc').val(item.AccZCode == '' ? '' : '(' + item.AccZCode + ') ' + item.AccZName);
            $('#bede').val(NumberToNumberString(item.Bede));
            $('#best').val(NumberToNumberString(item.Best));
            $('#nameArz').val(item.ArzCode == '' ? '' : '(' + item.ArzCode + ') ' + item.ArzName);
            $('#ArzRate').val(item.ArzRate);
            $('#ArzValue').val(item.ArzValue);
            $('#nameOpr').val(item.OprCode == '' ? '' : '(' + item.OprCode + ') ' + item.OprName);
            $('#nameMkz').val(item.MkzCode == '' ? '' : '(' + item.MkzCode + ') ' + item.MkzName);
            $('#comm').val(item.Comm);
            $('#bandSpec').val(item.BandSpec);

            $('#CheckNo').val(item.CheckNo);
            $('#checkDateBand').val(item.CheckDate);
            $('#nameBank').val(item.Bank);
            $('#nameShobe').val(item.Shobe);
            $('#nameJari').val(item.Jari);
            $('#BaratNo').val(item.BaratNo);
            $('#checkStatus').val(item.CheckStatus);
            $('#nameTraf').val(item.TrafCode == '' ? '' : '(' + item.TrafCode + ') ' + item.TrafName);
            $('#nameTrafZ').val(item.TrafZCode == '' ? '' : '(' + item.TrafZCode + ') ' + item.TrafZName);
            $('#CheckRadif').val(item.CheckRadif);
            $('#checkVosoolDate').val(item.CheckVosoolDate);
            $('#CheckComm').val(item.CheckComm);

            $('#modal-Band').modal();
        }
    };


    function SearchHesabArry(Code, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].Code === Code) {
                return true;
            }
        }
    }

    function CalcArz() {
        $('.fix').attr('class', 'form-line focused fix');
        bede = SlashToDot($("#bede").val());
        best = SlashToDot($("#best").val());

        if (ArzCode != '')
            ArzRate = SlashToDot($("#ArzRate").val());

        if (best > 0 && ArzRate > 0) {
            $("#ArzValue").val(NumberToNumberString(best / ArzRate));
        }
        else if (bede > 0 && ArzRate > 0) {
            $("#ArzValue").val(NumberToNumberString(bede / ArzRate));
        }
        else {
            $("#ArzValue").val(0);
        }
    }


    function CalcValue(flag) {
        if (PDModeAcc > 0) {
            bede = $("#bede").val();
            best = $("#best").val();
            value = SlashToDot($('#Value').val());
            if (PDModeAcc == 1 && flag == 0) {
                $("#bede").val(0);
                $("#best").val(NumberToNumberString(value));
                //value > 0 ? $("#best").val(NumberToNumberString(value)) : $('#Value').val(best);
            }
            else if (PDModeAcc == 2 && flag == 0) {
                $("#best").val(0);
                $("#bede").val(NumberToNumberString(value));
                //value > 0 ? $("#bede").val(NumberToNumberString(value)) : $('#Value').val(bede);
            }

            $('.fix').attr('class', 'form-line focused fix');
        }
    }

    $("#bede").keyup(function (e) {
        if ($("#bede").val() != '0')
            $("#best").val(0);
        CalcArz();
        CalcValue(1);
    });

    $("#best").keyup(function (e) {
        if ($("#best").val() != '0')
            $("#bede").val(0);
        CalcArz();
        CalcValue(1);
    });

    $("#ArzRate").keyup(function (e) {
        CalcArz();
    });

    $('#Value').keyup(function (e) {
        $("#best").val(0);
        CalcValue(0);
    });


    //AddADocB
    self.AddADocB = function AddADocB(newADocB) {
        tarikh = $("#tarikh").val().toEnglishDigit();
        modeCode = $("#modeCode").val();
        GetBandNumber();
        bandnumber = bandnumber;
        if (Serial == '') {
            return showNotification(translate('اطلاعات اولیه سند ثبت نشده است'), 0);
        }

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
        }

        if ((tarikh >= sessionStorage.BeginDateAcc) && (tarikh <= sessionStorage.EndDateAcc)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
        }

        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
        }

        if (AccCode == '') {
            return showNotification(translate('حساب را انتخاب کنید'), 0);
        }

        bede = SlashToDot($("#bede").val()) == "" ? "0" : SlashToDot($("#bede").val());
        best = SlashToDot($("#best").val()) == "" ? "0" : SlashToDot($("#best").val());

        if (best == "0" && bede == "0") {
            if (best == "0" && bede == "0") {
                if (sessionStorage.ADOC_TestZeroPrice == "1")
                    showNotification(translate('مبلغ بدهکار یا بستانکار را وارد کنید'), 2);
                else if (sessionStorage.ADOC_TestZeroPrice == "2")
                    return showNotification(translate('مبلغ بدهکار یا بستانکار را وارد کنید'), 0);
            }
        }


        if (PDModeAcc > 0) {

            if ($("#CheckNo").val() == "") {
                if (sessionStorage.ADOC_TestCheck == "1")
                    showNotification(translate('اطلاعات چک انتخاب نشده است'), 2);
                else if (sessionStorage.ADOC_TestCheck == "2")
                    return showNotification(translate('اطلاعات چک انتخاب نشده است'), 0)
            }

            if (TrafCode == "") {
                if (sessionStorage.ADOC_TestTraf == "1")
                    showNotification(translate('طرف حساب انتخاب نشده است'), 2);
                else if (sessionStorage.ADOC_TestTraf == "2")
                    return showNotification(translate('طرف حساب انتخاب نشده است'), 0)
            }


        }


        $('#Save').attr('disabled', '');


        var ADocBObject = {
            SerialNumber: Serial,
            BandNo: bandnumber,
            AccCode: AccCode,
            AccZCode: AccZCode,
            Bede: bede,
            Best: best,
            Comm: $("#comm").val(),
            BandSpec: $("#bandSpec").val(),
            CheckNo: $("#CheckNo").val(),
            CheckDate: $("#checkDateBand").val().toEnglishDigit(),
            Bank: $("#nameBank").val(),
            Shobe: $("#nameShobe").val(),
            Jari: $("#nameJari").val(),
            BaratNo: $("#BaratNo").val(),
            TrafCode: TrafCode,
            TrafZCode: TrafZCode,
            CheckRadif: $("#CheckRadif").val(),
            CheckComm: $("#CheckComm").val(),
            CheckStatus: $("#checkStatus").val(),
            CheckVosoolDate: $("#checkVosoolDate").val().toEnglishDigit(),
            OprCode: OprCode,
            MkzCode: MkzCode,
            ArzCode: ArzCode,
            ArzRate: SlashToDot($("#ArzRate").val()),
            arzValue: SlashToDot($("#ArzValue").val()),
            flagLog: flaglog,
        };
        if (self.bundNumberImport > 0) {
            bandnumber = self.bundNumberImport;
        }

        ajaxFunction(ADocBiUri + ace + '/' + sal + '/' + group + '/' + bandnumber, 'POST', ADocBObject).done(function (response) {
            self.ADocBList(response);
            self.ADocB(response);
            //getADocH(Serial);
            calcsum(response);
            ClearSearch();
            self.flagupdateband = false;
            self.bundNumberImport = 0;
            self.ClearADocB();
            flaglog = 'N';
            $('#Save').removeAttr('disabled');
            showNotification(translate('بند شماره') + ' ' + bandnumber + ' ' + translate('ذخیره شد'), 1);
        });
        $('#Save').removeAttr('disabled');
    };


    //update ADocB
    self.UpdateADocB = function UpdateADocB(newADocB) {
        tarikh = $("#tarikh").val().toEnglishDigit();
        modeCode = $("#modeCode").val();
        if (Serial == '') {
            return showNotification(translate('اطلاعات اولیه سند ثبت نشده است'), 0);
        }

        if (tarikh.length != 10) {
            return showNotification(translate('تاریخ را صحیح وارد کنید'), 0);
        }

        if (tarikh == '') {
            return showNotification(translate('تاریخ را وارد کنید'), 0);
        }

        if ((tarikh >= sessionStorage.BeginDateAcc) && (tarikh <= sessionStorage.EndDateAcc)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
        }

        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
        }

        if (AccCode == '') {
            return showNotification(translate('حساب را انتخاب کنید'), 0);
        }

        bede = SlashToDot($("#bede").val()) == "" ? "0" : SlashToDot($("#bede").val());
        best = SlashToDot($("#best").val()) == "" ? "0" : SlashToDot($("#best").val());



        if (best == "0" && bede == "0") {
            if (sessionStorage.ADOC_TestZeroPrice == "1")
                showNotification(translate('مبلغ بدهکار یا بستانکار را وارد کنید'), 2);
            else if (sessionStorage.ADOC_TestZeroPrice == "2")
                return showNotification(translate('مبلغ بدهکار یا بستانکار را وارد کنید'), 0);
        }

        var ADocBObject = {
            SerialNumber: Serial,
            BandNo: bandnumberedit,
            AccCode: AccCode,
            AccZCode: AccZCode,
            Bede: bede,
            Best: best,
            Comm: $("#comm").val(),
            BandSpec: $("#bandSpec").val(),
            CheckNo: $("#CheckNo").val(),
            CheckDate: $("#checkDateBand").val(),
            Bank: $("#nameBank").val(),
            Shobe: $("#nameShobe").val(),
            Jari: $("#nameJari").val(),
            BaratNo: $("#BaratNo").val(),
            TrafCode: TrafCode,
            TrafZCode: TrafZCode,
            CheckRadif: $("#CheckRadif").val(),
            CheckComm: $("#CheckComm").val(),
            CheckStatus: $("#checkStatus").val(),
            CheckVosoolDate: $("#checkVosoolDate").val(),
            OprCode: OprCode,
            MkzCode: MkzCode,
            ArzCode: ArzCode,
            ArzRate: SlashToDot($("#ArzRate").val()),
            arzValue: SlashToDot($("#ArzValue").val()),
            flagLog: flaglog,
        };
        ajaxFunction(ADocBiUri + ace + '/' + sal + '/' + group, 'PUT', ADocBObject).done(function (response) {
            self.ADocBList(response);
            self.ADocB(response);
            // getADocH(Serial);
            calcsum(response);
            self.flagupdateband = false;
            flagFinalSave = false;
            //ClearSearch();
            $('#modal-Band').modal('hide');
            self.ClearADocB();
            flaglog = 'N';
            showNotification(translate('بند شماره') + ' ' + bandnumberedit + ' ' + translate('ویرایش شد'), 1);
        });
    };


    self.DeleteBand = function (SanadBand) {

        Swal.fire({
            title: mes_Delete,
            text: translate("آیا بند انتخابی حذف شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                ajaxFunction(ADocBiUri + ace + '/' + sal + '/' + group + '/' + SanadBand.SerialNumber + '/' + SanadBand.BandNo + '/' + flaglog, 'DELETE').done(function (response) {
                    self.ADocBList(response);
                    self.ADocB(response);
                    calcsum(response);
                    flagFinalSave = false;
                    flaglog = 'N';
                    showNotification(translate('بند شماره') + ' ' + SanadBand.BandNo + ' ' + translate('حذف شد'), 1);
                });
            }
        })
    };

    function SetTanzimSanad() {

        var AFI_SaveADoc_HZ = {
            SerialNumber: Serial,
            Tanzim: sessionStorage.userName,
        };

        ajaxFunction(SaveADoc_HZUri + ace + '/' + sal + '/' + group, 'POST', AFI_SaveADoc_HZ).done(function (data) {
            if (flagupdateHeader == 1) {
                sessionStorage.flagupdateHeader = 0;
                flagupdateHeader = 0;
                if (sessionStorage.IsReport == "true") {
                    sessionStorage.IsReport = "false";
                    close();
                }
                else {
                    window.location.href = sessionStorage.urlADocH;
                }
            }
            else {
                showNotification(translate('سند ذخیره شد'), 1);
            }
        });
    }



    $('#FinalSave').click(function () {
        SaveSanad();
    });

    function SaveSanad() {
        if (Serial == "" || self.ADocBList().length == 0)
            return showNotification(translate('سند خالی قابل ذخیره نیست'), 0);


        $('#titleFinalSave').text(translate('ذخیره سند حسابداری'));

        if (self.UpdateADocH() != "OK") {
            return null;
        }

        var TestADocObject = {
            SerialNumber: Serial
        };

        ajaxFunction(TestADocUri + ace + '/' + sal + '/' + group, 'POST', TestADocObject).done(function (data) {
            var obj = JSON.parse(data);
            self.TestADocList(obj);
            if (data.length > 2) {
                $('#modal-FinalSave').modal('show');
                SetDataTestDocB();
            } else {
                //self.UpdateADocH();
                SetTanzimSanad();
            }
        });
    }

    function SetDataTestDocB() {
        $("#BodyTestDocB").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestADocList();
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

            tBand = translate('بند شماره') + ' ';
            if (list[i].TestName == "Opr")
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('پروژه مشخص نشده است') + ' </p>';
            else if (list[i].TestName == "Mkz")
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('مرکز هزینه مشخص نشده است') + ' </p>';
            else if (list[i].TestName == "Arz")
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('دارای حساب ارزی می باشد ولی ارز آن مشخص نیست') + ' </p>';
            else if (list[i].TestName == "Mahiat")
                //  textBody += '<span>بند شماره ' + list[i].BandNo + ' مانده حساب  <span>' + list[i].AccCode + '</span> مغایر با ماهیت آن می شود ' + ' </span>';
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('مانده حساب') + ' </p>' + '<p style="padding-left: 5px;padding-right: 5px;">' + list[i].AccCode + ' </p>' + '<p>' + translate('مغایر با ماهیت آن می شود') + '</p>';

            else if (list[i].TestName == "Balance")
                textBody += '<p>' + translate('سند بالانس نیست . بدهکار') + ' : ' + totalBede + ' ' + translate('بستانکار') + ' : ' + totalBest + ' </p>';

            else if (list[i].TestName == "ZeroBand")
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('مبلغ بدهکار و بستانکار صفر است') + ' </p>';


            else if (list[i].TestName == "Traf")
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('طرف حساب انتخاب نشده است') + ' </p>';

            else if (list[i].TestName == "Check")
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('اطلاعات چک وارد نشده است') + ' </p>';

            else if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTestDocB').append(textBody);

        $('#CountWarning').text(countWarning);
        $('#CountError').text(countError);

        if (countError > 0) {
            $('#FinalSave-Modal').attr('hidden', '');
            $('#ShowCountError').removeAttr('hidden', '');
        }
        else {
            $('#FinalSave-Modal').removeAttr('hidden', '')
            $('#ShowCountError').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning').attr('hidden', '');
        }


    }


    $('#FinalSave-Modal').click(function () {
        $('#modal-FinalSave').modal('hide');
        //self.UpdateADocH();
        SetTanzimSanad();

    });

    $('#modal-FinalSave').on('shown.bs.modal', function () {
    });



    function CreateTableSanad(data) {
        $("#TableSanad").empty();
        $('#TableSanad').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr>' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableTh('BandNo', data) +
            CreateTableTh('AccFullCode', data) +
            CreateTableTh('AccFullName', data) +
            CreateTableTh('Comm', data) +
            CreateTableTh('Bede', data) +
            CreateTableTh('Best', data) +
            CreateTableTh('CheckNo', data) +
            CreateTableTh('CheckDate', data) +
            CreateTableTh('Bank', data) +
            CreateTableTh('Shobe', data) +
            CreateTableTh('Jari', data) +
            CreateTableTh('TrafFullCode', data) +
            CreateTableTh('TrafFullName', data) +
            CreateTableTh('MkzCode', data) +
            CreateTableTh('MkzName', data) +
            CreateTableTh('OprCode', data) +
            CreateTableTh('OprName', data) +
            CreateTableTh('BandSpec', data) +
            CreateTableTh('ArzCode', data) +
            CreateTableTh('ArzName', data) +
            CreateTableTh('ArzRate', data) +
            CreateTableTh('ArzValue', data) +
            '<th id="action_headersanad">' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: filterADocBList" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind="click: $parent.selectSanad">' +
            '<td data-bind="text: $index()+1"></td>' +
            CreateTableTd('BandNo', 0, 0, data) +
            //CreateTableTd('AccFullCode', 0, 0, data) +
            //CreateTableTd('AccFullName', 0, 0, data) +

            //'<td  class="CellWithComment"> <span data-bind="text: AccFullCode" data-toggle="tooltip" title="Hooray!" ></span>  </td>' +

            '<td  class="CellWithComment"> <span data-bind="text: AccFullCode" ></span>  <span data-bind="text: AccCompleteName" class="CellComment"></span>   </td>' +
            '<td  class="CellWithComment"> <span data-bind="text: AccFullName" ></span>  <span data-bind="text: AccCompleteName" class="CellComment"></span>   </td>' +

            CreateTableTd('Comm', 0, 0, data) +
            CreateTableTd('Bede', sessionStorage.DeghatAcc, 2, data) +
            CreateTableTd('Best', sessionStorage.DeghatAcc, 2, data) +
            CreateTableTd('CheckNo', 0, 0, data) +
            CreateTableTd('CheckDate', 0, 0, data) +
            CreateTableTd('Bank', 0, 0, data) +
            CreateTableTd('Shobe', 0, 0, data) +
            CreateTableTd('Jari', 0, 0, data) +
            CreateTableTd('TrafFullCode', 0, 0, data) +
            CreateTableTd('TrafFullName', 0, 0, data) +
            CreateTableTd('MkzCode', 0, 0, data) +
            CreateTableTd('MkzName', 0, 0, data) +
            CreateTableTd('OprCode', 0, 0, data) +
            CreateTableTd('OprName', 0, 0, data) +
            CreateTableTd('BandSpec', 0, 0, data) +

            CreateTableTd('ArzCode', 0, 0, data) +
            CreateTableTd('ArzName', 0, 0, data) +
            CreateTableTd('ArzRate', sessionStorage.DeghatAcc, 2, data) +
            CreateTableTd('ArzValue', sessionStorage.DeghatAcc, 2, data) +


            '<td id="action_bodysanad">' +
            '<a data-bind="click: $root.UpdateBand , attr: {title:text_Update}">' +
            '    <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '</a>' +
            '<a data-bind="click: $root.DeleteBand , attr: {title:text_Delete}">' +
            '    <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '</a>' +
            '<a data-bind="click: $root.ImportBand" data-toggle="modal" data-target="#modal-Band" data-backdrop="static" data-keyboard="false">' +
            '    <img src="/Content/img/sanad/streamline-icon-logout-alternate@48x48.png" width="16" height="16" />' +
            '</a>' +
            '</td >' +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            ' <tr style="background-color:#e37d228f;">' +
            '<td style="background-color: #e37d228f !important;">' + translate('جمع') + '</td>' +
            CreateTableTdSum('BandNo', 1, data) +
            CreateTableTdSum('AccFullCode', 1, data) +
            CreateTableTdSum('AccFullName', 1, data) +
            CreateTableTdSum('Comm', 1, data) +
            CreateTableTdSum('Bede', 2, data) +
            CreateTableTdSum('Best', 2, data) +
            CreateTableTdSum('CheckNo', 1, data) +
            CreateTableTdSum('CheckDate', 1, data) +
            CreateTableTdSum('Bank', 1, data) +
            CreateTableTdSum('Shobe', 1, data) +
            CreateTableTdSum('Jari', 1, data) +
            CreateTableTdSum('TrafFullCode', 1, data) +
            CreateTableTdSum('TrafFullName', 1, data) +
            CreateTableTdSum('MkzCode', 1, data) +
            CreateTableTdSum('MkzName', 1, data) +
            CreateTableTdSum('OprCode', 1, data) +
            CreateTableTdSum('OprName', 1, data) +
            CreateTableTdSum('BandSpec', 1, data) +
            CreateTableTdSum('ArzCode', 1, data) +
            CreateTableTdSum('ArzName', 1, data) +
            CreateTableTdSum('ArzRate', 1, data) +
            CreateTableTdSum('ArzValue', 2, data) +
            '<td style="background-color: #e37d228f !important;"></td>' +
            ' </tr>' +

            '  <tr style="background-color: #efb68399;">' +
            '<td></td>' +
            CreateTableTdSearch('BandNo', data) +
            CreateTableTdSearch('AccFullCode', data) +
            CreateTableTdSearch('AccFullName', data) +
            CreateTableTdSearch('Comm', data) +
            CreateTableTdSearch('Bede', data) +
            CreateTableTdSearch('Best', data) +
            CreateTableTdSearch('CheckNo', data) +
            CreateTableTdSearch('CheckDate', data) +
            CreateTableTdSearch('Bank', data) +
            CreateTableTdSearch('Shobe', data) +
            CreateTableTdSearch('Jari', data) +
            CreateTableTdSearch('TrafFullCode', data) +
            CreateTableTdSearch('TrafFullName', data) +
            CreateTableTdSearch('MkzCode', data) +
            CreateTableTdSearch('MkzName', data) +
            CreateTableTdSearch('OprCode', data) +
            CreateTableTdSearch('OprName', data) +
            CreateTableTdSearch('BandSpec', data) +
            CreateTableTdSearch('ArzCode', data) +
            CreateTableTdSearch('ArzName', data) +
            CreateTableTdSearch('ArzRate', data) +
            CreateTableTdSearch('ArzValue', data) +
            '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +


            '  </tfoot>' +
            '</table >'
        );
    }

    function CreateTableTh(field, data) {
        text = '<th ';
        TextField = FindTextField(field, data);

        sortField = field == 'DocNo' ? 'SortDocNo' : field

        if (TextField == 0)
            text += 'Hidden >';
        text +=
            '<span data-column="' + sortField + '">' + TextField + '</span>' +
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
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\'" style="text-align: right;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSum(field, no, data) {
        text = '<td style="background-color: #e37d228f !important;"';

        TextField = FindTextField(field, data);
        if (field != "MonBede" && field != "MonBest") {
            if (TextField == 0)
                text += 'Hidden ';
        }

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
        type = FindTypeField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }" type="text" class="type_' + type;
        text += ' form-control" style="height: 2.4rem;direction: ltr;text-align: right;" /> </td>';
        return text;
    }



    self.radif = function (index) {
        countShow = self.pageSizeCheck();
        page = self.currentPageIndexCheck();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableCheck(data) {
        $("#TableCheck").empty();
        $('#TableCheck').append(
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableCheck">' +
            '<th>' + translate('ردیف') + '</th>' +
            CreateTableThCheck('CheckNo', data) +
            CreateTableThCheck('CheckDate', data) +
            CreateTableThCheck('Value', data) +
            CreateTableThCheck('Bank', data) +
            CreateTableThCheck('Shobe', data) +
            CreateTableThCheck('Jari', data) +
            CreateTableThCheck('BaratNo', data) +
            CreateTableThCheck('CheckStatus', data) +
            CreateTableThCheck('CheckStatusSt', data) +
            CreateTableThCheck('CheckRadif', data) +
            CreateTableThCheck('CheckComm', data) +
            CreateTableThCheck('TrafFullCode', data) +
            CreateTableThCheck('TrafFullName', data) +
            CreateTableThCheck('CheckVosoolDate', data) +
            '<th></th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageCheck" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind="click: $parent.selectCheck">' +
            '<td data-bind="text: $root.radif($index())"></td>' +
            CreateTableTdCheck('CheckNo', 0, 0, data) +
            CreateTableTdCheck('CheckDate', 0, 0, data) +
            CreateTableTdCheck('Value', 0, 2, data) +
            CreateTableTdCheck('Bank', 0, 0, data) +
            CreateTableTdCheck('Shobe', 0, 0, data) +
            CreateTableTdCheck('Jari', 0, 0, data) +
            CreateTableTdCheck('BaratNo', 0, 0, data) +
            CreateTableTdCheck('CheckStatus', 0, 0, data) +
            CreateTableTdCheck('CheckStatusSt', 0, 0, data) +
            CreateTableTdCheck('CheckRadif', 0, 0, data) +
            CreateTableTdCheck('CheckComm', 0, 0, data) +
            CreateTableTdCheck('TrafFullCode', 0, 0, data) +
            CreateTableTdCheck('TrafFullName', 0, 0, data) +
            CreateTableTdCheck('CheckVosoolDate', 0, 0, data) +
            '<td></td>' +
            '        </tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '  <tr style="background-color: #efb68399;">' +
            '<td style="background-color: #efb683;"></td>' +
            CreateTableTdSearchCheck('CheckNo', data) +
            CreateTableTdSearchCheck('CheckDate', data) +
            CreateTableTdSearchCheck('Value', data) +
            CreateTableTdSearchCheck('Bank', data) +
            CreateTableTdSearchCheck('Shobe', data) +
            CreateTableTdSearchCheck('Jari', data) +
            CreateTableTdSearchCheck('BaratNo', data) +
            CreateTableTdSearchCheck('CheckStatus', data) +
            CreateTableTdSearchCheck('CheckStatusSt', data) +
            CreateTableTdSearchCheck('CheckRadif', data) +
            CreateTableTdSearchCheck('CheckComm', data) +
            CreateTableTdSearchCheck('TrafFullCode', data) +
            CreateTableTdSearchCheck('TrafFullName', data) +
            CreateTableTdSearchCheck('CheckVosoolDate', data) +
            '  <td style="background-color: #efb683;">' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        );
    }


    function CreateTableThCheck(field, data) {

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

    function CreateTableTdCheck(field, Deghat, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + ', style: { color: ' + field + ' == \'نامشخص\' ? \'red\' : ' + field + ' == \'پاس شده\' || ' + field + ' == \'وصول شده\'  ? \'green\' : ' + field + ' == \'برگشتی\' || ' + field + ' == \'عودت\' || ' + field + ' == \'واگذار شده\'  ? \'#ec8121\' :  \'black\' }"></td>';
                // text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'#3f4853\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + ')) : \'0\'" style="text-align: right;"></td>'
                break;
        }
        return text;
    }

    function CreateTableTdSearchCheck(field, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\'" type="text" class="form-control" style="height: 2.4rem;" /> </td>';
        return text;
    }




    $('#modal-OtherField').on('shown.bs.modal', function () {
        if (flagOtherFieldShow == true) {
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
            flagOtherFieldShow = false;
        }
    });


    $('#action_headersanad').attr('style', 'display: none');
    $('#action_bodysanad').attr('style', 'display: none');
    $('#action_Adoc').attr('style', 'display: none');
    $('#insertband').attr('style', 'display: none');

    $.fn.CheckAccess = function () {

        if (localStorage.getItem("AccessPrint_SanadHesab") == "false") {
            $('#Print_SanadHesab').attr('style', 'display: none')
        }


        accessTaeed = localStorage.getItem("Access_TAEED_ADOC") == 'true'
        accessDaem = localStorage.getItem("Access_DAEM_ADOC") == 'true'

        if (localStorage.getItem("AccessViewSanad") == 'true') {
            viewAction = true;
        }
        else {
            if (sessionStorage.Eghdam == sessionStorage.userName) {
                viewAction = true;
            }
        }

        if (localStorage.getItem("CHG") == 'false' && sessionStorage.BeforeMoveSanad == "false" && flagupdateHeader == 1) {
            viewAction = false;
        } else {
            sessionStorage.BeforeMoveSanad = false;
        }


        if (accessTaeed == false && sessionStorage.Status == 'تایید')
            viewAction = false;

        if (accessDaem == false && sessionStorage.Status == 'دائم')
            viewAction = false;

        if (viewAction) {
            $('#action_headersanad').removeAttr('style');
            $('#action_bodysanad').removeAttr('style');
            $('#action_Adoc').removeAttr('style');
            $('#insertband').removeAttr('style');
        }
    }

    $(this).CheckAccess();


    if (closedDate == true) {
        $('#action_headersanad').attr('style', 'display: none');
        $('#action_bodysanad').attr('style', 'display: none');
        $('#action_Adoc').attr('style', 'display: none');
        $('#insertband').attr('style', 'display: none');
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
        setReport(self.ADocPList(), data, printVariable);
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
        setReport(self.ADocPList(), '', printVariable);
    });


    $('#Print_SanadHesab').click(function () {
        PrintSanad();
    });


    function PrintSanad() {
        if (Serial == '')
            return showNotification(translate('ابتدا سند را ذخیره کنید'), 0);
        getADocP(Serial);
        createViewer();
        if (self.ADocPList().length == 0)
            return showNotification(translate('برای چاپ سند حداقل یک بند الزامیست'), 0);

        printVariable = '"ReportDate":"' + DateNow + '",';

        printName = null;
        sessionStorage.ModePrint = "ADoc";
        GetPrintForms(sessionStorage.ModePrint);
        self.filterPrintForms1("1");
        $('#modal-Print').modal('show');
    }

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
        setReport(self.ADocPList(), data, printVariable);
        $('#modal-Print').modal('hide');
    });










    $('#tarikh').keypress(function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });

    $('#tarikh').change(function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });


    $('#Spec').keypress(function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });


    $('#modal-OtherField').on('hide.bs.modal', function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });

    /*
     $('#status').click(function () {
         $('#finalSave_Title').removeAttr('hidden', '');
     });
 
     $('#modeCode').click(function () {
         $('#finalSave_Title').removeAttr('hidden', '');
     });
     */


    $("#nameOpr").keydown(function (e) {
        if (e.keyCode == 46) {
            $("#nameOpr").val('');
            OprCode = '';
        }
    });

    $("#nameMkz").keydown(function (e) {
        if (e.keyCode == 46) {
            $("#nameMkz").val('');
            MkzCode = '';
        }
    });

    $("#nameAcc").keydown(function (e) {
        if (e.keyCode == 46) {
            $("#nameAcc").val('');
            AccCode = '';
        }
    });




    $('#listOldBand').click(function () {
        self.sortTableADocB();
        self.filterADocB1(AccCode);
        $('#modal-OldBand').modal('show');

    })


    pageSizeADocB = localStorage.getItem('pageSizeADocB') == null ? 100 : localStorage.getItem('pageSizeADocB');
    self.pageSizeADocB = ko.observable(pageSizeADocB);
    self.currentPageIndexADocB = ko.observable(0);

    self.filterADocB0 = ko.observable("");
    self.filterADocB1 = ko.observable("");
    self.filterADocB2 = ko.observable("");
    self.filterADocB3 = ko.observable("");
    self.filterADocB4 = ko.observable("");
    self.filterADocB5 = ko.observable("");
    self.filterADocB6 = ko.observable("");
    self.filterADocB7 = ko.observable("");
    self.filterADocB8 = ko.observable("");
    self.filterADocB9 = ko.observable("");
    self.filterADocB10 = ko.observable("");
    self.filterADocB11 = ko.observable("");
    self.filterADocB12 = ko.observable("");


    self.filterADocB = ko.computed(function () {

        self.currentPageIndexADocB(0);

        var filter0 = self.filterADocB0();
        var filter1 = self.filterADocB1();
        var filter2 = self.filterADocB2();
        var filter3 = self.filterADocB3();
        var filter4 = self.filterADocB4();
        var filter5 = self.filterADocB5();
        var filter6 = self.filterADocB6();
        var filter7 = self.filterADocB7();
        var filter8 = self.filterADocB8();
        var filter9 = self.filterADocB9();
        var filter10 = self.filterADocB10();
        var filter11 = self.filterADocB11();
        var filter12 = self.filterADocB12();

        if (!filter0 && !filter1 && !filter2 && !filter3 && !filter4 && !filter5 && !filter6 && !filter7 && !filter8 && !filter9 && !filter10 && !filter11 && !filter12) {
            return self.ADocB();
        } else {
            tempData = ko.utils.arrayFilter(self.ADocB(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.BandNo.toString().toLowerCase(), filter0) &&
                    (item.AccFullCode == null ? '' : item.AccFullCode.toString().search(filter1) >= 0) &&
                    (item.AccFullName == null ? '' : item.AccFullName.toString().search(filter2) >= 0) &&
                    (item.Comm == null ? '' : item.Comm.toString().search(filter3) >= 0) &&
                    ko.utils.stringStartsWith(item.Bede.toString().toLowerCase(), filter4) &&
                    ko.utils.stringStartsWith(item.Best.toString().toLowerCase(), filter5) &&
                    ko.utils.stringStartsWith(item.CheckNo.toString().toLowerCase(), filter6) &&
                    (item.CheckDate == null ? '' : item.CheckDate.toString().search(filter7) >= 0) &&
                    (item.Bank == null ? '' : item.Bank.toString().search(filter8) >= 0) &&
                    (item.TrafFullName == null ? '' : item.TrafFullName.toString().search(filter9) >= 0) &&
                    (item.MkzName == null ? '' : item.MkzName.toString().search(filter10) >= 0) &&
                    (item.OprName == null ? '' : item.OprName.toString().search(filter11) >= 0) &&
                    (item.BandSpec == null ? '' : item.BandSpec.toString().search(filter12) >= 0)
                return result;
            })
            return tempData;
        }
    });










    self.currentPageADocB = ko.computed(function () {
        var pageSizeADocB = parseInt(self.pageSizeADocB(), 10),
            startIndex = pageSizeADocB * self.currentPageIndexADocB(),
            endIndex = startIndex + pageSizeADocB;
        localStorage.setItem('pageSizeADocB', pageSizeADocB);
        return self.filterADocB().slice(startIndex, endIndex);
    });


    self.nextPageADocB = function () {
        if (((self.currentPageIndexADocB() + 1) * self.pageSizeADocB()) < self.filterADocB().length) {
            self.currentPageIndexADocB(self.currentPageIndexADocB() + 1);
        }
    };

    self.previousPageADocB = function () {
        if (self.currentPageIndexADocB() > 0) {
            self.currentPageIndexADocB(self.currentPageIndexADocB() - 1);
        }
    };

    self.firstPageADocB = function () {
        self.currentPageIndexADocB(0);
    };

    self.lastPageADocB = function () {
        countADocB = parseInt(self.filterADocB().length / self.pageSizeADocB(), 10);
        self.currentPageIndexADocB(countADocB);
    };


    self.iconTypeBandNo = ko.observable("");
    self.iconTypeAccFullCode = ko.observable("");
    self.iconTypeAccFullName = ko.observable("");
    self.iconTypeComm = ko.observable("");
    self.iconTypeBede = ko.observable("");
    self.iconTypeBest = ko.observable("");
    self.iconTypeCheckNo = ko.observable("");
    self.iconTypeCheckDate = ko.observable("");
    self.iconTypeBank = ko.observable("");
    self.iconTypeTrafFullName = ko.observable("");
    self.iconTypeMkzName = ko.observable("");
    self.iconTypeOprName = ko.observable("");
    self.iconTypeBandSpec = ko.observable("");

    self.sortTableADocB = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortADocB");
            self.sortType = localStorage.getItem("sortTypeADocB");
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortADocB", orderProp);
        localStorage.setItem("sortTypeADocB", self.sortType);

        self.currentColumn(orderProp);
        self.ADocB.sort(function (left, right) {
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


        self.iconTypeBandNo('');
        self.iconTypeAccFullCode('');
        self.iconTypeAccFullName('');
        self.iconTypeComm('');
        self.iconTypeBede('');
        self.iconTypeBest('');
        self.iconTypeCheckNo('');
        self.iconTypeCheckDate('');
        self.iconTypeBank('');
        self.iconTypeTrafFullName('');
        self.iconTypeMkzName('');
        self.iconTypeOprName('');
        self.iconTypeBandSpec('');

        if (orderProp == 'BandNo') self.iconTypeBandNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccFullCode') self.iconTypeAccFullCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'AccFullName') self.iconTypeAccFullName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Comm') self.iconTypeComm((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bede') self.iconTypBede((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Best') self.iconTypeBest((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckNo') self.iconTypeCheckNo((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'CheckDate') self.iconTypeCheckDate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Bank') self.iconTypeBank((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'TrafFullName') self.iconTypeTrafFullName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'MkzName') self.iconTypeMkzName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'OprName') self.iconTypeOprName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'BandSpec') self.iconTypeBandSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.selectADocB = function (item) {
       // bandnumberedit = item.BandNo;
        AccCode = item.AccCode;
        AccZCode = item.AccZCode;
        ArzCode = item.ArzCode;
        OprCode = item.OprCode;
        MkzCode = item.MkzCode;
        TrafCode = item.TrafCode;
        TrafZCode = item.TrafZCode;
        PDModeAcc = item.PDMode;

        if (AccZCode != '') {
            $("#panelAcc").removeClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
            $("#panelAcc").addClass("col-lg-3 col-md-3 col-sm-12 col-xs-12");
            $('#panelZAcc').removeAttr('hidden', '');
            getZAccList(item.ZGru == '' ? null : item.ZGru);
        }
        else {
            $('#panelZAcc').attr('hidden', '');
            $("#panelAcc").removeClass("col-lg-3 col-md-3 col-sm-12 col-xs-12");
            $("#panelAcc").addClass("col-lg-6 col-md-6 col-sm-12 col-xs-12");
        }

        if (PDModeAcc > 0) {
            getCheckList(PDModeAcc);
            ShowCheck();
            PDModeAcc == 1 ? $('#Value').val(NumberToNumberString(item.Best)) : $('#Value').val(NumberToNumberString(item.Bede));
        }
        else {
            HiddenCheck();
        }

        if (item.Arzi > 0) {
            $('#panelArz').removeAttr('hidden', '');
        }
        else {
            $('#panelArz').attr('hidden', '');
            $('#panelArz').val('');
        }


        if (item.Mkz > 0) {
            $('#panelMkz').removeAttr('hidden', '');
        }
        else {
            $('#panelMkz').attr('hidden', '');
            $('#nameMkz').val('');
        }

        if (item.Opr > 0) {
            $('#panelOpr').removeAttr('hidden', '');
        }
        else {
            $('#panelOpr').attr('hidden', '');
            $('#panelOpr').val('');
        }

        $('#nameAcc').val('(' + item.AccCode + ') ' + item.AccName);
        $('#nameZAcc').val(item.AccZCode == '' ? '' : '(' + item.AccZCode + ') ' + item.AccZName);
        $('#bede').val(NumberToNumberString(item.Bede));
        $('#best').val(NumberToNumberString(item.Best));
        $('#nameArz').val(item.ArzCode == '' ? '' : '(' + item.ArzCode + ') ' + item.ArzName);
        $('#ArzRate').val(item.ArzRate);
        $('#ArzValue').val(item.ArzValue);
        $('#nameOpr').val(item.OprCode == '' ? '' : '(' + item.OprCode + ') ' + item.OprName);
        $('#nameMkz').val(item.MkzCode == '' ? '' : '(' + item.MkzCode + ') ' + item.MkzName);
        $('#comm').val(item.Comm);
        $('#bandSpec').val(item.BandSpec);

        $('#CheckNo').val(item.CheckNo);
        $('#checkDateBand').val(item.CheckDate);
        $('#nameBank').val(item.Bank);
        $('#nameShobe').val(item.Shobe);
        $('#nameJari').val(item.Jari);
        $('#BaratNo').val(item.BaratNo);
        $('#checkStatus').val(item.CheckStatus);
        $('#nameTraf').val(item.TrafCode == '' ? '' : '(' + item.TrafCode + ') ' + item.TrafName);
        $('#nameTrafZ').val(item.TrafZCode == '' ? '' : '(' + item.TrafZCode + ') ' + item.TrafZName);
        $('#CheckRadif').val(item.CheckRadif);
        $('#checkVosoolDate').val(item.CheckVosoolDate);
        $('#CheckComm').val(item.CheckComm);

        $('#modal-OldBand').modal('hide');
    }







    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "SanadHesab", sessionStorage.SerialNumber);
    };




    document.onkeydown = function (e) {
        if (e.ctrlKey) {
            if (sessionStorage.NEW_ADOC == "true") {
                if (e.keyCode == key_Insert)
                    AddNewSanad();
            }
        }
        else if (e.altKey) {
            if (e.keyCode == key_R) {
                AddNewBand();
            }
            if (e.keyCode == key_P) {
                if (localStorage.getItem("AccessPrint_SanadHesab") == "true") {
                    PrintSanad();
                }
            }
        }
        else if (e.shiftKey) {

        }
        else {
            if (e.keyCode == key_F2) {
                SaveSanad();
            }

            if (e.keyCode == key_Esc && $('#modal-Print').is(':visible')) {
                $('#modal-Print').modal('hide');
            }
        }
    };

};

ko.applyBindings(new ViewModel());