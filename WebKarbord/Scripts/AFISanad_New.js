var TestADocList; //لیست خطا ها
var cols;

//اطلاعات سلول
//var dataGrid = $("#gridContainer").dxDataGrid("instance");
//cellValue = dataGrid.cellValue(ro, 'AccCode');

var ViewModel = function () {
    var self = this;
    TestUser();
    var viewAction = false;
    var resTestNew = false;
    var flagFinalSave = false;

    sal = localStorage.getItem("SalAcc");

    var flagupdateHeader;
    var changeColumn = false;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;

    useSanadOtherUser = localStorage.getItem("TestUseSanadHesab" + sessionStorage.SerialNumber);

    bandFree = {
        "AccCode": "",
        "AccCompleteName": "",
        "AccFullCode": "",
        "AccFullName": "",
        "AccName": "",
        "AccZCode": "",
        "AccZName": "",
        "Amount": 0,
        "ArzCode": "",
        "ArzName": "",
        "ArzRate": 0,
        "ArzValue": 0,
        "Arzi": 0,
        "BandNo": "",
        "BandSpec": "",
        "Bank": "",
        "BaratNo": "",
        "Bede": 0,
        "Best": 0,
        "CheckComm": "",
        "CheckDate": "",
        "CheckMode": 0,
        "CheckNo": "",
        "CheckRadif": 0,
        "CheckStatus": "",
        "CheckVosoolDate": "",
        "Comm": "",
        "Jari": "",
        "Mkz": 0,
        "MkzCode": "",
        "MkzName": "",
        "Opr": 0,
        "OprCode": "",
        "OprName": "",
        "PDMode": 0,
        "SerialNumber": 0,
        "Shobe": "",
        "TrafCode": "",
        "TrafFullCode": "",
        "TrafFullName": "",
        "TrafName": "",
        "TrafZCode": "",
        "TrafZName": "",
        "ZGru": "",
        "bSerialNumber": 0
    }



    $('#data-error').hide();
    $('#data-grid').addClass('col-md');

    $('#titlePage').text(translate("سند حسابداری جدید"));
    $('#finalSave_Title').attr('hidden', '');


    var Serial = 0;
    var saveButton = null;
    var flagSaveLogWin = false;

    var columnName;

    self.AModeCode = ko.observable();
    self.SerialNumber = ko.observable();
    self.DocNoOut = ko.observable();
    self.DocDate = ko.observable(DateNow);
    self.Spec = ko.observable();
    self.StatusSanad = ko.observable();


    self.currentColumn = ko.observable("");
    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

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

    self.CheckStatusList = ko.observableArray([]); // لیست نوع چک ها
    self.CheckList = ko.observableArray([]); // لیست چک ها
    self.BankList = ko.observableArray([]); // لیست چک ها
    self.ShobeList = ko.observableArray([]); // لیست چک ها
    self.JariList = ko.observableArray([]); // لیست چک ها
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.ADocPList = ko.observableArray([]); // لیست ویوی چاپ 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 





    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند
    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت سند 
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 
    var ZAccADocUri = server + '/api/Web_Data/ZAccADoc/'; // آدرس زیر حساب ها
    var ADocHLastDateUri = server + '/api/ADocData/ADocH/LastDate/'; // آدرس آخرین تاریخ سند
    var ADocHiUri = server + '/api/AFI_ADocHi/'; // آدرس ذخیره هدر سند 


    var ADocBiUri = server + '/api/AFI_ADocBi/'; // آدرس ذخیره یند سند 
    var ADocBSaveAllUri = server + '/api/AFI_ADocBi/SaveAllDocB/'; // آدرس ذخیره یند سند 
    var ADocBConvertUri = server + '/api/AFI_ADocBi/Convert/'; // آدرس ذخیره یند سند در جدول اصلی 

    var TestADocUri = server + '/api/ADocData/TestADoc/'; // آدرس تست سند 

    var CheckUri = server + '/api/ADocData/CheckList/'; // آدرس لیست چک  
    var BankUri = server + '/api/ADocData/Bank/'; // آدرس لیست بانک  
    var ShobeUri = server + '/api/ADocData/Shobe/'; // آدرس لیست شعبه  
    var JariUri = server + '/api/ADocData/Jari/'; // آدرس لیست جاری 
    var CheckStatusUri = server + '/api/ADocData/CheckStatus/'; // آدرس وضعیت چک

    var ADocPUri = server + '/api/ADocData/ADocP/'; // آدرس ویوی چاپ سند 
    var TestADoc_NewUri = server + '/api/ADocData/TestADoc_New/'; // آدرس تست ایجاد  
    var TestADoc_EditUri = server + '/api/ADocData/TestADoc_Edit/'; // آدرس تست ویرایش 
    var SaveADoc_HZUri = server + '/api/ADocData/SaveADoc_HZ/'; // آدرس ویرایس ستون تنظیم 

    var ADocPUri = server + '/api/ADocData/ADocP/'; // آدرس ویوی چاپ سند 
    var AChangeStatusUri = server + '/api/ADocData/ChangeStatus/'; // آدرس تغییر وضعیت اسناد 




    var flagOtherFieldShow;

    var AccList;
    self.AModeList = ko.observableArray([]); // نوع سند 
    self.StatusList = ko.observableArray([]); // وضعیت  
    var OprList; // لیست پروژه ها
    var MkzList; // لیست مرکز هزینه
    var ArzList; // لیست ارز ها
    var ZAccList; // لیست زیر حساب ها

    // var CheckList; // لیست چک
    // var BankList;// لیست بانک
    //  var ShobeList;// لیست شعبه
    //  var JariList;// لیست جاری
    //  var CheckStatusList;// لیست وضعیت چک


    function getColsCheckList() {
        colsCheck = getRprtCols('CheckList', sessionStorage.userName);
        CreateTableCheck(colsCheck);
    }

    getColsCheckList();


    function getAModeList() {
        ajaxFunction(AModeUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.AModeList(data);
        });
    }
    getAModeList();

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
    getStatusList();


    function getAccList() {
        if (AccList == null) {
            whereAcc = localStorage.getItem('whereAcc');
            var AccObject = {
                Mode: 1,
                UserCode: sessionStorage.userName,
                Where: whereAcc
            }

            ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'POST', AccObject, false).done(function (data) {
                self.AccList(data)
                AccList = data.filter(s => s.AutoCreate == 0);
            });
        }
    }
    getAccList();



    //Get Opr List
    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            OprList = data;
        });
    }
    getOprList();

    //Get  Mkz List
    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            MkzList = data;
        });
    }

    getMkzList();

    //Get Arz List
    function getArzList() {
        ajaxFunction(ArzUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
            ArzList = data;
        });
    }
    getArzList();

    function getZAccList(filter) {
        var ZAccObject = {
            Filter: filter
        };

        ajaxFunction(ZAccADocUri + ace + '/' + sal + '/' + group, 'POST', ZAccObject, false).done(function (data) {
            ZAccList = data;
            self.ZAccList(data);
        });
    }
    getZAccList('');





    //Get CheckList List
    function getCheckList(PDMode) {
        if (PDMode > 1) {
            PDMode = 2
        }
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

    getCheckStatusList(1);




    //Get ADocP List
    function getADocP(serialNumber) {
        ajaxFunction(ADocPUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.ADocPList(data);
        });
    }

    var accessTaeed = localStorage.getItem("Access_TAEED_ADOC") == 'true'
    var accessDaem = localStorage.getItem("Access_DAEM_ADOC") == 'true'


    var lastStatus = "";
    $("#status").click(function () {
        lastStatus = $("#status").val();
    });

    $("#status").change(function () {
        if (lastStatus != "") {
            if (Serial == 0) {
                $("#status").val(lastStatus);
                return showNotification(translate('ابتدا سند را ذخیره کنید'), 0);
            }


            selectStatus = $("#status").val();
            if (accessTaeed == false && selectStatus == translate('تایید')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی تایید ندارید'), 0);
            }

            if (accessDaem == false && selectStatus == translate('دائم')) {
                $("#status").val(lastStatus);
                return showNotification(translate('دسترسی دائم ندارید'), 0);
            }

            var StatusChangeObject = {
                DMode: 0,
                UserCode: sessionStorage.userName,
                SerialNumber: Serial,
                Status: selectStatus,
            };

            ajaxFunction(AChangeStatusUri + ace + '/' + sal + '/' + group, 'POST', StatusChangeObject).done(function (response) {
                item = response;
                sessionStorage.Status = selectStatus;
                lastStatus = "";
                showNotification(translate('وضعیت سند ' + selectStatus + ' شد'), 1);
            });
        }

    });


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

    getExtraFieldsList();




    /*   //Get CheckList List
       function getCheckList(PDMode) {
           ajaxFunction(CheckUri + ace + '/' + sal + '/' + group + '/' + PDMode, 'GET').done(function (data) {
               CheckList = data;
           });
       }
       getCheckList(2);
   
       //Get BankList List
       function getBankList() {
           ajaxFunction(BankUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
               BankList = data;
           });
       }
       getBankList();
   
       //Get ShobeList List
       function getShobeList() {
           ajaxFunction(ShobeUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
               ShobeList = data;
           });
       }
       getShobeList();
   
       //Get JariList List
       function getJariList() {
           ajaxFunction(JariUri + ace + '/' + sal + '/' + group, 'GET', true, false).done(function (data) {
               JariList = data;
           });
       }
       getJariList();
   
       //Get CheckStatus List
       function getCheckStatusList(PDMode) {
           ajaxFunction(CheckStatusUri + ace + '/' + sal + '/' + group + '/' + PDMode + '/0', 'GET').done(function (data) {
               CheckStatusList = data;
               localStorage.setItem('CheckStatus' + PDMode, JSON.stringify(data));
           });
       }
       getCheckStatusList(0);
   
   */


    function getADocHLastDate() {
        ajaxFunction(ADocHLastDateUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.DocDate(data);
            $('#btntarikh').click(function () {
                $('#tarikh').change();
            });
        });

    }


    var firstShowData = true;
    var ADocB;
    //var dataAcc = [];
    //var darChecks = '';
    // var parChecks = '';

    var ADocBUri = server + '/api/ADocData/ADocB/'; // آدرس بند سند 
    function getADocB(serialNumber) {
        ajaxFunction(ADocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {

            sumBede = 0
            sumBest = 0;

            for (var i = 0; i < data.length; i++) {
                AccData = AccList.filter(s => s.Code == data[i].AccCode);
                if (AccData.length > 0) {
                    data[i].dataAcc = AccData[0];
                }


                /*if (data[i].PDMode == 1) {
                    darChecks += data[i].CheckNo + ','
                }

                if (data[i].PDMode == 2) {
                    parChecks += data[i].CheckNo + ','
                }*/



                sumBede += data[i].Bede;
                sumBest += data[i].Best;

            }

            /*if (darChecks.length > 0) {
                darChecks = darChecks.slice(0, -1)
            }

            if (parChecks.length > 0) {
                parChecks = parChecks.slice(0, -1)
            }*/

            $("#SumBedehkar").val(NumberToNumberString(sumBede));
            $("#SumBestankar").val(NumberToNumberString(sumBest));
            $("#TafavotSanad").val(NumberToNumberString(sumBede - sumBest));

            ADocB = data;
            GetRprtCols_NewList(sessionStorage.userName);
        });

    }


    function CheckAccess() {
        /*if (localStorage.getItem("AccessPrint_SanadHesab") == "false") {
            $('#Print_SanadHesab').attr('style', 'display: none')
        }

        if (localStorage.getItem("AccessPrint_SanadHesab") == "false") {
            $('#Print_SanadHesab').attr('style', 'display: none')
        }*/

        //localStorage.setItem("AccessViewSanad", false);

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

        // $(".dx-toolbar-after").hide();
        $('#status').attr('disabled', 'disabled');

        if (useSanadOtherUser == 'UseUser')
            viewAction = false;

        if (viewAction) {
            //$(".dx-toolbar-after").show();
            $('#status').removeAttr('disabled');
        }




        //var dataGrid = $("#gridContainer").dxDataGrid("instance");
        //saveButton = dataGrid.find(".dx-link-save");
        //saveButton.enabled = false;

        /* if (viewAction) {
             $('#action_headersanad').removeAttr('style');
             $('#action_bodysanad').removeAttr('style');
             $('#action_Adoc').removeAttr('style');
             $('#insertband').removeAttr('style');
         }*/
    }
    CheckAccess();



    var rprtId = 'ADocB_1';


    function GetRprtCols_NewList(userName) {

        cols = getRprtCols(rprtId, userName);
        cols = cols.filter(s =>
            //s.Code == 'BandNo' ||
            s.Code == 'AccCode' ||
            s.Code == 'AccName' ||
            s.Code == 'AccZCode' ||
            s.Code == 'AccZName' ||
            s.Code == 'Comm' ||
            s.Code == 'Bede' ||
            s.Code == 'Best' ||
            s.Code == 'CheckNo' ||
            s.Code == 'CheckStatus' ||
            s.Code == 'CheckDate' ||
            s.Code == 'Bank' ||
            s.Code == 'Shobe' ||
            s.Code == 'Jari' ||
            s.Code == 'TrafCode' ||
            s.Code == 'TrafName' ||
            s.Code == 'TrafZCode' ||
            s.Code == 'TrafZName' ||
            s.Code == 'MkzCode' ||
            s.Code == 'MkzName' ||
            s.Code == 'OprCode' ||
            s.Code == 'OprName' ||
            s.Code == 'BandSpec' ||
            s.Code == 'Amount' ||
            s.Code == 'ArzCode' ||
            s.Code == 'ArzValue' ||
            s.Code == 'ArzRate' ||
            s.Code == 'ArzName' ||

            s.Code == 'CheckRadif' ||
            s.Code == 'CheckComm' ||
            s.Code == 'CheckVosoolDate' ||
            s.Code == 'BaratNo'
        );

        orderProp = 'Position';
        cols.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            return leftVal > rightVal ? 1 : -1;
        });


        if (cols[0].UserCode == '*Default*') {
            for (var i = 0; i < cols.length; i++) {
                if (
                    cols[i].Code == 'AccCode' ||
                    cols[i].Code == 'AccName' ||
                    cols[i].Code == 'AccZCode' ||
                    cols[i].Code == 'AccZName' ||
                    cols[i].Code == 'Comm' ||
                    cols[i].Code == 'Bede' ||
                    cols[i].Code == 'Best'
                )
                    cols[i].Visible = 1
                else {
                    cols[i].Visible = 0;
                    cols[i].Position = 100;
                }


                cols[i].Code == 'AccName' ? cols[i].Width = 200 : null
                cols[i].Code == 'AccZName' ? cols[i].Width = 200 : null
                cols[i].Code == 'Comm' ? cols[i].Width = 200 : null

                cols[i].Code == 'AccCode' ? cols[i].Position = 0 : null
                cols[i].Code == 'AccName' ? cols[i].Position = 1 : null
                cols[i].Code == 'AccZCode' ? cols[i].Position = 2 : null
                cols[i].Code == 'AccZName' ? cols[i].Position = 3 : null
                cols[i].Code == 'Comm' ? cols[i].Position = 4 : null
                cols[i].Code == 'Bede' ? cols[i].Position = 5 : null
                cols[i].Code == 'Best' ? cols[i].Position = 6 : null

            }
            orderProp = 'Position';
            cols.sort(function (left, right) {
                leftVal = left[orderProp];
                rightVal = right[orderProp];
                return leftVal > rightVal ? 1 : -1;
            });
        }





        data = cols;

        ListColumns = cols;

        /*for (var i = 0; i < data.length; i++) {
            code = data[i].Code;
            if (
                (code.lastIndexOf("Code") > 0 && code != "AccCode" && code != "AccFullCode") ||
                code == "CheckRadif" ||
                code == "CheckComm" ||
                code == "CheckVosoolDate" ||
                code == "ArzName" ||
                code == "ArzRate" ||
                code == "ArzValue" ||
                code == "Shobe" ||
                code == "Jari" ||

                code == "Bank" ||
                code == "BaratNo" ||
                code == "CheckStatusSt" ||
                code == "CheckRadif" ||
                code == "Jari" 

               /* data[i].Code == 'AccCode' ||
                data[i].Code == 'AccName' ||
                data[i].Code == 'AccZCode' ||
                data[i].Code == 'AccZName' ||
                data[i].Code == 'MkzCode' ||
                data[i].Code == 'MkzName' ||
                data[i].Code == 'OprCode' ||
                data[i].Code == 'OprName' ||
                data[i].Code == 'Bede' ||
                data[i].Code == 'Best' ||
                data[i].Code == 'Comm' ||
                data[i].Code == 'BandSpec'
                //data[i].Code == 'Bank' ||
                //data[i].Code == 'CheckNo' ||
                // data[i].Code == 'Shobe' ||
                //data[i].Code == 'Jari' ||
                // data[i].Code == 'BaratNo' ||
                // data[i].Code == 'CheckStatusSt' ||
                // data[i].Code == 'CheckRadif' ||
                // data[i].Code == 'CheckComm' ||
                // data[i].Code == 'TrafCode' ||
                // data[i].Code == 'TrafName' ||
                //data[i].Code == 'TrafZCode' ||
                // data[i].Code == 'TrafZName'*/
        /* ) {
             data[i].Visible = 0
         }*/
        //else
        //}

        f = '['
        //f += '{"dataField":"Row","caption": "ردیف","cellTemplate":"rowNumber","allowEditing": false}, ';


        for (var i = 0; i < data.length; i++) {

            f += '{"dataField":"' + data[i].Code + '",'
            f += '"width":' + data[i].Width + ','



            //f += '"caption":"' + data[i].Name + '"}';
            f += '"caption":"' + data[i].Name + '",';
            // f += '"alignment": "center",';
            f += '"visible":' + (data[i].Visible == 0 ? false : true);
            if (data[i].Code == "AccCode") {
                f +=
                    ',"lookup": {"dataSource": "AccList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    // '"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorCode"'//+ 
                //', "fixed": true , "fixedPosition": "right" , "width": 230'
            }

            else if (data[i].Code == "AccName") {
                f +=
                    ',"lookup": {"dataSource": "AccList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    //'"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorName"'
            }

            if (data[i].Code == "AccZCode") {
                f +=
                    ',"lookup": {"dataSource": "ZAccList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    '"editCellTemplate": "dropDownBoxEditorAccZCode"'
            }

            else if (data[i].Code == "AccZName") {
                f +=
                    ',"lookup": {"dataSource": "ZAccList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    '"editCellTemplate": "dropDownBoxEditorAccZName"'
            }


            else if (data[i].Code == "MkzCode") {
                f +=
                    ',"lookup": {"dataSource": "MkzList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    '"editCellTemplate": "dropDownBoxEditorMkzCode"'
            }

            else if (data[i].Code == "MkzName") {
                f +=
                    ',"lookup": {"dataSource": "MkzList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    '"editCellTemplate": "dropDownBoxEditorMkzName"'
            }

            else if (data[i].Code == "OprCode") {
                f +=
                    ',"lookup": {"dataSource": "OprList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    '"editCellTemplate": "dropDownBoxEditorOprCode"'
            }


            else if (data[i].Code == "OprName") {
                f +=
                    ',"lookup": {"dataSource": "OprList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    '"editCellTemplate": "dropDownBoxEditorOprName"'
            }


            else if (data[i].Code == "ArzCode") {
                f +=
                    ',"lookup": {"dataSource": "ArzList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    '"editCellTemplate": "dropDownBoxEditorArzCode"'
            }

            else if (data[i].Code == "ArzName") {
                f +=
                    ',"lookup": {"dataSource": "ArzList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    '"editCellTemplate": "dropDownBoxEditorArzName"'
            }


            /* else if (data[i].Code == "CheckNo") {
                 f +=
                     ',"lookup": {"dataSource": "CheckList", "valueExpr": "CheckNo", "displayExpr": "CheckNo"},' +
                     '"editCellTemplate": "dropDownBoxEditorCheckNo"'
             }
 
 
             else if (data[i].Code == "Bank") {
                 f +=
                     ',"lookup": {"dataSource": "BankList", "valueExpr": "Name", "displayExpr": "Name"},' +
                     '"editCellTemplate": "dropDownBoxEditorBank"'
             }
             else if (data[i].Code == "Shobe") {
                 f +=
                     ',"lookup": {"dataSource": "ShobeList", "valueExpr": "Name", "displayExpr": "Name"},' +
                     '"editCellTemplate": "dropDownBoxEditorShobe"'
             }
             else if (data[i].Code == "Jari") {
                 f +=
                     ',"lookup": {"dataSource": "JariList", "valueExpr": "Name", "displayExpr": "Name"},' +
                     '"editCellTemplate": "dropDownBoxEditorJari"'
             }
 
 
             else if (data[i].Code == "TrafZCode") {
                 f +=
                     ',"lookup": {"dataSource": "ZAccList", "valueExpr": "Code", "displayExpr": "Code"},' +
                     '"editCellTemplate": "dropDownBoxEditorTrafZCode"'
             }
             else if (data[i].Code == "TrafZName") {
                 f +=
                     ',"lookup": {"dataSource": "ZAccList", "valueExpr": "Name", "displayExpr": "Name"},' +
                     '"editCellTemplate": "dropDownBoxEditorTrafZName"'
             }
             else if (data[i].Code == "TrafCode") {
                 f +=
                     ',"lookup": {"dataSource": "AccList", "valueExpr": "Code", "displayExpr": "Code"},' +
                     '"editCellTemplate": "dropDownBoxEditorTrafCode"'
             }
             else if (data[i].Code == "TrafName") {
                 f +=
                     ',"lookup": {"dataSource": "AccList", "valueExpr": "Name", "displayExpr": "Name"},' +
                     '"editCellTemplate": "dropDownBoxEditorTrafName"'
             }
             */


            /* else if (data[i].Code == "Bede") {
                 f += ',"setCellValue": "EditorBede"'
             }
 
             else if (data[i].Code == "Best") {
                 f += ',"setCellValue": "EditorBest"'
             }*/

            else if (data[i].Code == "Amount") {
                f += ',"setCellValue": "EditorAmount"'
            }

            else if (data[i].Code == "ArzValue") {
                f += ',"setCellValue": "EditorArzValue"'
            }

            else if (data[i].Code == "ArzRate") {
                f += ',"setCellValue": "EditorArzRate"'
            }

            if (
                //data[i].Code == "BandNo" ||
                data[i].Code == "CheckNo" ||
                data[i].Code == "CheckDate" ||
                data[i].Code == "Bank" ||
                data[i].Code == "Shobe" ||
                data[i].Code == "Jari" ||
                data[i].Code == "TrafCode" ||
                data[i].Code == "TrafName" ||
                data[i].Code == "TrafZCode" ||
                data[i].Code == "CheckStatus" ||
                data[i].Code == "ArzValue" ||
                data[i].Code == "TrafZName" //||
                //data[i].Code == "button"
            ) {
                f += ',"allowEditing": false'
            }

            if (data[i].Type == 4) {
                f += ',"dataType":"number"';
            }
            else if (data[i].Type == 5 || data[i].Code == 'Amount') {
                //f += ',"dataType":"currency"';

                //f += ',"format":{"type":"currency"}';
                // f += ',"format":",#0.##"';
                //f += '"editorOptions": {"format": "fixedPoint","showClearButton": false}';

                // f += ',"useGrouping":true';
                f += ',"format": { "style": "decimal",  "useGrouping": true, "minimumSignificantDigits": 1 }';

                // f += ',"format": { "style": "currency", "currency": "EUR", "useGrouping": true, "minimumSignificantDigits": 1 }';

                // f += ',"format": "custom"';
            }
            f += '}';
            if (i < data.length - 1)
                f += ','
        }

        f += ',{"dataField":"button","caption":"عملیات" ,"type": "buttons"}';//,"buttons": ["edit", "delete"]}';
        f += ',{"caption":"#","allowEditing": false}';

        f += ']'

        cols = JSON.parse(f)

        conutHide = 0;
        for (var i = 0; i < cols.length; i++) {

            /* if (cols[i].dataField == 'Row') {
                 cols[i].cellTemplate = rowNumber;
             }*/


            /*
              {
        type: 'buttons',
        width: 110,
        buttons: ['edit', 'delete', {
          hint: 'Clone',
          icon: 'copy',
          visible(e) {
            return !e.row.isEditing;
          },
          disabled(e) {
            return isChief(e.row.data.Position);
          },
          onClick(e) {
            const clonedItem = $.extend({}, e.row.data, { ID: maxID += 1 });

            employees.splice(e.row.rowIndex, 0, clonedItem);
            e.component.refresh(true);
            e.event.preventDefault();
          },
        }],
      },
             */

            if (cols[i].caption == '#') {
                cols[i].caption = 'ردیف';
                cols[i].dataField = '#';
                cols[i].fixed = true;
                cols[i].fixedPosition = "right";
                cols[i].width = 70;
                cols[i].cellTemplate = function (cellElement, cellInfo) {
                    cellElement.text(cellInfo.row.rowIndex + 1)
                }
            }

            if (cols[i].type == 'buttons') {
                buttons = cols[i];
                buttons.fixed = true;
                buttons.fixedPosition = "left";
                buttons.buttons = ["",
                    {
                        hint: 'حذف',
                        icon: 'trash',
                        onClick(e) {
                            e.component.saveEditData();
                            const visibleRows = e.component.getVisibleRows();
                            row = e.row.rowIndex;

                            clonedItem = visibleRows[row].data;//  $.extend({}, e.row.data);

                            ADocB.splice(row, 1);

                            e.component.saveEditData();
                            calcSanad();
                            e.component.refresh(true);
                        }
                    },

                    {
                        hint: 'کپی',
                        icon: 'copy',
                        onClick(e) {
                            e.component.saveEditData();
                            const visibleRows = e.component.getVisibleRows();
                            row = e.row.rowIndex;

                            clonedItem = visibleRows[row].data;//  $.extend({}, e.row.data);
                            dataJson = JSON.stringify(clonedItem);
                            dataJson = JSON.parse(dataJson);

                            dataJson.BandNo = null;
                            ADocB.splice(row, 0, dataJson);

                            for (var i = 0; i < ADocB.length; i++) {
                                ADocB[i].BandNo = i;
                            }

                            e.component.saveEditData();
                            calcSanad();
                            e.component.refresh(true);

                            a = e.component.option("columns");
                            a = e.component.option("columns");

                        }
                    },

                    {
                        hint: 'اطلاعات چک',
                        icon: 'file',
                        disabled(e) {
                            if (e.row.data.dataAcc != null) {
                                temp = e.row.data.dataAcc;
                                return temp.PDMode != 1 && temp.PDMode != 2
                            }
                            else
                                return true;

                            /*if (dataAcc[e.row.rowIndex] != null)
                                return dataAcc[e.row.rowIndex].PDMode == 0;
                            else
                                return true;*/
                        },

                        onClick(e) {
                            ro = e.row.rowIndex;
                            ShowCheck(e);
                        }
                    },
                    {
                        hint: 'درج',
                        icon: 'add',
                        onClick(e) {
                            e.component.saveEditData();
                            /*const key = new DevExpress.data.Guid().toString();
                            //dataGrid.addRow(1);
                            dataGrid.option('editing.changes', [{
                                key,
                                type: 'insert',
                                insertAfterKey: e.row.key,
                            }]);
                            dataGrid.option('editing.editRowKey', key);*/

                            const visibleRows = e.component.getVisibleRows();
                            /*
                            for (var i = 0; i < visibleRows.length; i++) {
                                visibleRows[i].data.BandNo = i + 1;
                                dataJson = JSON.stringify(visibleRows[i].data);
                                ADocB[i] = JSON.parse(dataJson);
                            }*/

                            /*clonedItem = {
                                AccCode: "",
                                AccName: "",
                                AccZCode: "",
                                Amount: 0,
                                ArzRate: 0,
                                ArzValue: 0,
                                BandNo: 0,
                                BandSpec: "",
                                Bede: 0,
                                Best: 0,
                                Comm: "",
                                dataAcc: {}
                            }*/
                            clonedItem = {};
                            //clonedItem = bandFree;
                            //bandFree = {};
                            ADocB.splice(e.row.rowIndex, 0, clonedItem);
                            //ADocB[e.row.rowIndex+1].BandNo = 1000

                            //visibleRows[e.row.rowIndex + 1].data.AccCode = '';
                            //visibleRows[e.row.rowIndex + 1].data.AccName = '';

                            for (var i = 0; i < ADocB.length; i++) {
                                ADocB[i].BandNo = i;
                            }

                            e.component.repaintRows();
                            $("#gridContainer").dxDataGrid("instance").refresh();
                            //e.component.refresh(true);


                        }

                    }

                ];

                cols[i] = buttons;
                /*cols[i].fixed = true;
                cols[i].fixedPosition = "left";

                cols[i].buttons[2] =
                    {
                        name: "checkData",
                        cssClass: "my-class",
                        hint: 'اطلاعات چک',
                        icon: 'file',
                        onClick(e) {
                            ro = e.row.rowIndex;
                            ShowCheck(e);
                        },

                        disabled(e) {
                            if (dataAcc[e.row.rowIndex] != null)
                                return dataAcc[e.row.rowIndex].PDMode == 0;
                            else
                                return true;
                        }
                    };

                // cols[i].buttons[3] = '';
                cols[i].buttons[3] =
                    {
                        hint: 'درج',
                        icon: 'add',
                        onClick(e) {
                            const key = new DevExpress.data.Guid().toString();
                            dataGrid.option('editing.changes', [{
                                key,
                                type: 'insert',
                                insertAfterKey: e.row.key,
                            }]);
                            dataGrid.option('editing.editRowKey', key);
                        },
                    };*/
            }

            /* if (cols[i].format != null) {
                 if (cols[i].format == "custom") {
                     cols[i].format = CustomFormat;
                 }
             }*/

            if (cols[i].dataField == 'AccCode') {
                cols[i].editCellTemplate = dropDownBoxEditorAccCode;
                cols[i].lookup.dataSource = AccList;
            }

            if (cols[i].dataField == 'AccName') {
                cols[i].editCellTemplate = dropDownBoxEditorAccName;
                cols[i].lookup.dataSource = AccList;
            }

            if (cols[i].dataField == 'AccZCode') {
                cols[i].editCellTemplate = dropDownBoxEditorAccZCode;
                cols[i].lookup.dataSource = ZAccList;
            }

            if (cols[i].dataField == 'AccZName') {
                cols[i].editCellTemplate = dropDownBoxEditorAccZName;
                cols[i].lookup.dataSource = ZAccList;
            }

            if (cols[i].dataField == 'MkzCode') {
                cols[i].editCellTemplate = dropDownBoxEditorMkzCode;
                cols[i].lookup.dataSource = MkzList;
            }
            if (cols[i].dataField == 'MkzName') {
                cols[i].editCellTemplate = dropDownBoxEditorMkzName;
                cols[i].lookup.dataSource = MkzList;
            }
            if (cols[i].dataField == 'OprCode') {
                cols[i].editCellTemplate = dropDownBoxEditorOprCode;
                cols[i].lookup.dataSource = OprList;
            }

            if (cols[i].dataField == 'OprName') {
                cols[i].editCellTemplate = dropDownBoxEditorOprName;
                cols[i].lookup.dataSource = OprList;
            }

            if (cols[i].dataField == 'ArzCode') {
                cols[i].editCellTemplate = dropDownBoxEditorArzCode;
                cols[i].lookup.dataSource = ArzList;
            }

            if (cols[i].dataField == 'ArzName') {
                cols[i].editCellTemplate = dropDownBoxEditorArzName;
                cols[i].lookup.dataSource = ArzList;
            }

            /* if (cols[i].dataField == 'CheckNo') {
                 cols[i].editCellTemplate = dropDownBoxEditorCheckNo;
                 cols[i].lookup.dataSource = CheckList;
             }
     
     
             if (cols[i].dataField == 'Bank') {
                 cols[i].editCellTemplate = dropDownBoxEditorBank;
                 cols[i].lookup.dataSource = BankList;
             }
     
             if (cols[i].dataField == 'Shobe') {
                 cols[i].editCellTemplate = dropDownBoxEditorShobe;
                 cols[i].lookup.dataSource = ShobeList;
             }
     
             if (cols[i].dataField == 'Jari') {
                 cols[i].editCellTemplate = dropDownBoxEditorJari;
                 cols[i].lookup.dataSource = JariList;
             }
     
             if (cols[i].dataField == 'TrafZCode') {
                 cols[i].editCellTemplate = dropDownBoxEditorTrafZCode;
                 cols[i].lookup.dataSource = ZAccList;
             }
             if (cols[i].dataField == 'TrafZName') {
                 cols[i].editCellTemplate = dropDownBoxEditorTrafZName;
                 cols[i].lookup.dataSource = ZAccList;
             }
             if (cols[i].dataField == 'TrafCode') {
                 cols[i].editCellTemplate = dropDownBoxEditorTrafCode;
                 cols[i].lookup.dataSource = AccList;
             }
             if (cols[i].dataField == 'TrafName') {
                 cols[i].editCellTemplate = dropDownBoxEditorTrafName;
                 cols[i].lookup.dataSource = AccList;
             }*/

            /* if (cols[i].dataField == 'Bede') {
                 cols[i].setCellValue = EditorBede;
             }
 
             if (cols[i].dataField == 'Best') {
                 cols[i].setCellValue = EditorBest;
             }*/

            if (cols[i].dataField == 'Amount') {
                cols[i].setCellValue = EditorAmount;
            }

            if (cols[i].dataField == 'ArzValue') {
                cols[i].setCellValue = EditorArzValue;
            }

            if (cols[i].dataField == 'ArzRate') {
                cols[i].setCellValue = EditorArzRate;
            }




        }

        CreateTableColumn(cols);
    }





    var co = 0;
    var ro = 0;
    var fieldName = '';

    var dataGrid;



    /* function CustomFormat(value) {
          return value.toFixed(2);
     }*/
    //var isClone = false
    // var original = null;
    function CreateTableColumn(data) {
        dataGrid = $('#gridContainer').dxDataGrid({
            dataSource: ADocB,
            keyExpr: 'BandNo',
            showBorders: true,
            showRowLines: true,
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnAutoWidth: false,

            columnResizingMode: 'widget',
            columnMinWidth: 70,
            focusedRowIndex: 0,
            focusedColumnIndex: 0,
            rtlEnabled: true,

            sorting: { mode: 'none' },

            columnChooser: {
                enabled: true,
                mode: 'select',
                width: 250,
                width: 250,
                title: 'تنظیم ستون ها',
                sortOrder: 'asc',
                //searchTimeout: 500,
                height: 500,
            },

            // columnFixing: {
            //     enabled: true
            // },

            onOptionChanged: function (e) {

                //var dataGrid = $("#gridContainer").dxDataGrid("instance");
                //columnCount = dataGrid.columnCount();
                // c = dataGrid.option("columns");
                //a = e.component.option("columns");
                if (e.fullName.includes("column")) {
                    changeColumn = true;
                    //SaveColumnSanad();
                }

                /*e.element.click(function (args) {
                    if ($(args.target).hasClass("dx-icon-column-chooser") ||
                        $(args.target).find(".dx-icon-column-chooser").length)
                        return;
                    e.component.hideColumnChooser();
                });*/
            },


            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'row',
                editOnKeyPress: true,
            },

            paging: {
                enabled: false,
            },


            editing: {
                mode: 'batch',
                // mode: 'form',
                //  mode: 'cell',
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
                selectTextOnEditStart: true,
                startEditAction: 'click',
                confirmDelete: false,
                useIcons: true,
                newRowPosition: 'last',
            },

            rowDragging: {
                allowReordering: true,
                showDragIcons: false,
                onReorder(e) {
                    /* ADocB = [];
 
                     const visibleRows = e.component.getVisibleRows();
                     const fromIndex = e.fromIndex;
                     const toIndex = e.toIndex
 
                     dataFrom = visibleRows[fromIndex].data;
                     dataTo = visibleRows[toIndex].data;
 
                     dataFrom = JSON.stringify(dataFrom);
                     dataTo = JSON.stringify(dataTo);
 
 
 
                     list = [];
                     
                     //AccCode_F = dataFrom.AccCode;
                     //AccCode_T = dataTo.AccCode;
 
                     f = JSON.parse(dataFrom);
                     t = JSON.parse(dataTo);
              
                     visibleRows[toIndex].data.AccCode = f.AccCode;
                     visibleRows[toIndex].data.AccName = f.AccName;
                     visibleRows[toIndex].data.AccZCode = f.AccZCode;
                     visibleRows[toIndex].data.AccZName = f.AccZName;
                     visibleRows[toIndex].data.Comm = f.Comm;
                     visibleRows[toIndex].data.Bede = f.Bede;
                     visibleRows[toIndex].data.Best = f.Best;
                     visibleRows[toIndex].data.CheckNo = f.CheckNo;
                     visibleRows[toIndex].data.CheckStatus = f.CheckStatus;
                     visibleRows[toIndex].data.CheckDate = f.CheckDate;
                     visibleRows[toIndex].data.Bank = f.Bank;
                     visibleRows[toIndex].data.Shobe = f.Shobe;
                     visibleRows[toIndex].data.Jari = f.Jari;
                     visibleRows[toIndex].data.TrafCode = f.TrafCode;
                     visibleRows[toIndex].data.TrafName = f.TrafName;
                     visibleRows[toIndex].data.TrafZCode = f.TrafZCode;
                     visibleRows[toIndex].data.TrafZName = f.TrafZName;
                     visibleRows[toIndex].data.MkzCode = f.MkzCode;
                     visibleRows[toIndex].data.MkzName = f.MkzName;
                     visibleRows[toIndex].data.OprCode = f.OprCode;
                     visibleRows[toIndex].data.OprName = f.OprName;
                     visibleRows[toIndex].data.BandSpec = f.BandSpec;
                     visibleRows[toIndex].data.Amount = f.Amount;
                     visibleRows[toIndex].data.ArzCode = f.ArzCode;
                     visibleRows[toIndex].data.ArzValue = f.ArzValue;
                     visibleRows[toIndex].data.ArzRate = f.ArzRate;
                     visibleRows[toIndex].data.ArzName = f.ArzName;
                     visibleRows[toIndex].data.CheckRadif = f.CheckRadif;
                     visibleRows[toIndex].data.CheckComm = f.CheckComm;
                     visibleRows[toIndex].data.CheckVosoolDate = f.CheckVosoolDate;
                     visibleRows[toIndex].data.BaratNo = f.BaratNo;
               
 
 
                     visibleRows[fromIndex].data.AccCode = t.AccCode;
                     visibleRows[fromIndex].data.AccName = t.AccName;
                     visibleRows[fromIndex].data.AccZCode = t.AccZCode;
                     visibleRows[fromIndex].data.AccZName = t.AccZName;
                     visibleRows[fromIndex].data.Comm = t.Comm;
                     visibleRows[fromIndex].data.Bede = t.Bede;
                     visibleRows[fromIndex].data.Best = t.Best;
                     visibleRows[fromIndex].data.CheckNo = t.CheckNo;
                     visibleRows[fromIndex].data.CheckStatus = t.CheckStatus;
                     visibleRows[fromIndex].data.CheckDate = t.CheckDate;
                     visibleRows[fromIndex].data.Bank = t.Bank;
                     visibleRows[fromIndex].data.Shobe = t.Shobe;
                     visibleRows[fromIndex].data.Jari = t.Jari;
                     visibleRows[fromIndex].data.TrafCode = t.TrafCode;
                     visibleRows[fromIndex].data.TrafName = t.TrafName;
                     visibleRows[fromIndex].data.TrafZCode = t.TrafZCode;
                     visibleRows[fromIndex].data.TrafZName = t.TrafZName;
                     visibleRows[fromIndex].data.MkzCode = t.MkzCode;
                     visibleRows[fromIndex].data.MkzName = t.MkzName;
                     visibleRows[fromIndex].data.OprCode = t.OprCode;
                     visibleRows[fromIndex].data.OprName = t.OprName;
                     visibleRows[fromIndex].data.BandSpec = t.BandSpec;
                     visibleRows[fromIndex].data.Amount = t.Amount;
                     visibleRows[fromIndex].data.ArzCode = t.ArzCode;
                     visibleRows[fromIndex].data.ArzValue = t.ArzValue;
                     visibleRows[fromIndex].data.ArzRate = t.ArzRate;
                     visibleRows[fromIndex].data.ArzName = t.ArzName;
                     visibleRows[fromIndex].data.CheckRadif = t.CheckRadif;
                     visibleRows[fromIndex].data.CheckComm = t.CheckComm;
                     visibleRows[fromIndex].data.CheckVosoolDate = t.CheckVosoolDate;
                     visibleRows[fromIndex].data.BaratNo = t.BaratNo;
                     
                     e.component.refresh(true);*/


                    const visibleRows = e.component.getVisibleRows();

                    const fromIndex = e.fromIndex;
                    const toIndex = e.toIndex

                    //const toIndex = ADocB.indexOf(visibleRows[e.toIndex].data);
                    //const fromIndex = ADocB.indexOf(e.itemData);

                    ADocB.splice(fromIndex, 1);
                    ADocB.splice(toIndex, 0, e.itemData);
                    ADocB[toIndex].BandNo = visibleRows[fromIndex].data.BandNo

                    // for (var i = 0; i < ADocB.length; i++) {
                    //     ADocB[i].BandNo = i;
                    // }

                    e.component.refresh();
                },
            },

            columns: data,


            /* summary: {
                 recalculateWhileEditing: ,
                 totalItems: [{
                     column: 'AccCode',
                     summaryType: 'count',
                     displayFormat: "{0}  رکورد",
                     showInGroupFooter: false,
                 }, {
                     column: 'Bede',
                     summaryType: 'sum',
                     valueFormat: 'currency',
                     displayFormat: "{0}",
                     showInGroupFooter: false,
                 },
                 {
                     column: 'Best',
                     summaryType: 'sum',
                     valueFormat: 'currency',
                     //showInColumn: "AccName",
                     displayFormat: "{0}",
                     showInGroupFooter: false,
                     //alignment: "center"
                 }
                 ],
             },*/

            onCellClick: function (e) {
                co = e.columnIndex;
                ro = e.rowIndex;
                // if (e.column != null)
                fieldName = e.column.dataField;
                //var summaryValue = dataGrid.getTotalSummaryValue(fieldName);
                //calcSanad();
            },

            onKeyDown: function (e) {
                /* var visibleIndex = e.component.getSelectedRowsData();
 
                 var focusedElement = $(".dx-focused").parent();//[0];
                 if (focusedElement != null)
                     ro = focusedElement.sectionRowIndex;
                 else
                     ro = 0;*/

                const keyCode = e.event.key;

                if (keyCode == 'F2') {
                    SaveColumnSanad();
                    ControlSave();
                }

                if (keyCode == 'Enter' && columnName == 'button') {
                    rows = dataGrid.getVisibleRows().length;
                    if (ro == rows - 1) {

                        e.component.saveEditData();
                        const visibleRows = e.component.getVisibleRows();
                        /* for (var i = 0; i < visibleRows.length; i++) {
                             //visibleRows[i].data.BandNo = i;
                             dataJson = JSON.stringify(visibleRows[i].data);
                             ADocB[i] = JSON.parse(dataJson);
                         }
                         */
                        //ADocB.push(bandFree);
                        ADocB.push({});
                        for (var i = 0; i < ADocB.length; i++) {
                            ADocB[i].BandNo = i;
                        }
                        dataGrid.refresh(true);

                    }

                    //var dataGrid = $("#gridContainer").dxDataGrid("instance");
                    //dataGrid.focus(dataGrid.getCellElement(1, 'AccCode'));
                };

                if (keyCode == 'Enter') {

                }
            },


            cellPrepared: function (e) {
                a = 1;
            },

            onFocusedCellChanged: function (e) {
                // $("#Spec").val(e.column.dataField)
                columnName = e.column.dataField;
                ro = e.rowIndex
                a = 1;
            },




            onExported() {
                a = 1;
            },

            initialized: function (e) {
                a = 1;
            },

            rowInserted: function (e) {
                a = 1;
            },


            rowInserting: function (e) {
                a = 1;
            },

            rowPrepared: function (e) {
                a = 1;
            },

            contentReady: function (e) {
                a = 1;
            },
            onInitNewRow: function (e) {
                /*b = {
                    "AccCode": "",
                    "AccCompleteName": "",
                    "AccFullCode": "",
                    "AccFullName": "",
                    "AccName": "",
                    "AccZCode": "",
                    "AccZName": "",
                    "Amount": 0,
                    "ArzCode": "",
                    "ArzName": "",
                    "ArzRate": 0,
                    "ArzValue": 0,
                    "Arzi": 0,
                    "BandNo": ADocB.length + 1,
                    "BandSpec": "",
                    "Bank": "",
                    "BaratNo": 0,
                    "Bede": 0,
                    "Best": 0,
                    "CheckComm": "",
                    "CheckDate": "",
                    "CheckMode": 0,
                    "CheckNo": "",
                    "CheckRadif": 0,
                    "CheckStatus": "",
                    "CheckVosoolDate": "",
                    "Comm": "",
                    "Jari": "",
                    "Mkz": 0,
                    "MkzCode": "",
                    "MkzName": "",
                    "Opr": 0,
                    "OprCode": "",
                    "OprName": "",
                    "PDMode": 0,
                    "SerialNumber": 0,
                    "Shobe": "",
                    "TrafCode": "",
                    "TrafFullCode": "",
                    "TrafFullName": "",
                    "TrafName": "",
                    "TrafZCode": "",
                    "TrafZName": "",
                    "ZGru": "",
                    "bSerialNumber": 0
                }

                rows = dataGrid.getVisibleRows();
                ADocB.push(bandFree);
                dataGrid.refresh();
                //dataGrid.deleteRow(rows);
                rows = dataGrid.getVisibleRows();

                calcSanad();*/
            },



            onToolbarPreparing: function (e) {
                var toolbarItems = e.toolbarOptions.items;
                e.toolbarOptions.items.unshift(
                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'save',
                        options: {
                            icon: 'save',
                            hint: 'ذخیره',
                            onClick() {
                                SaveColumnSanad();
                                ControlSave();
                            },
                        },
                    },

                    /*{
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            name: 'refresh',
                            icon: 'refresh',
                            hint: 'به روز رسانی',
                            onClick() {
                                dataGrid.refresh(true);
                            },
                        },
                    },*/

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'addRow',
                        options: {
                            icon: 'add',
                            hint: 'بند جدید',
                            onClick() {
                                AddNewBand();
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'print',
                        options: {
                            icon: 'print',
                            hint: 'چاپ',
                            onClick() {
                                PrintSanad();
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'OtherField',
                        options: {
                            icon: '/Content/img/sanad/paper-write.png',
                            hint: 'مشخصات اضافی',
                            onClick() {
                                $('#modal-OtherField').modal('show');
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'AddNewSanad',
                        options: {
                            icon: '/Content/img/sanad/streamline-icon-pencil-write-3-alternate@48x48.png',
                            hint: 'سند جدید',
                            onClick() {
                                AddNewSanad();
                            },
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        name: 'DefultColumn',
                        options: {
                            icon: 'columnproperties',
                            hint: 'پیش فرض ستون ها',
                            onClick() {
                                Swal.fire({
                                    title: '',
                                    text: translate("آیا ستون های پیش فرض جایگزین شود ؟"),
                                    type: 'warning',
                                    showCancelButton: true,
                                    cancelButtonColor: '#3085d6',
                                    cancelButtonText: text_No,
                                    allowOutsideClick: false,
                                    confirmButtonColor: '#d33',
                                    confirmButtonText: text_Yes
                                }).then((result) => {

                                    GetRprtCols_NewList('*Default*');
                                })

                            },
                        },
                    }

                );

                $.each(toolbarItems, function (_, item) {
                    if (item.name == "addRowButton" || item.name == "saveButton") {
                        item.visible = false;
                    }

                    if (viewAction == false && (item.name == "save" || item.name == "revertButton" || item.name == "addRow")) {
                        item.visible = false;
                    }


                    if (sessionStorage.NEW_ADOC == "false" && item.name == "AddNewSanad")
                        item.visible = false;


                    if (localStorage.getItem("AccessPrint_SanadHesab") == "false" && item.name == "print") {
                        item.visible = false;
                    }

                });


            },









            onRowRemoving: function (e) {
                logEvent('RowRemoving');
            },
            onRowRemoved: function (e) {
                logEvent('RowRemoved');
            },
            onRowInserting: function (e) {
                a = 1;
            },
            onRowInserted: function (e) {
                a = 1;
            },
            onRowUpdating: function (e) {
                a = 1;
            },
            onRowUpdated: function (e) {
                a = 1;
            },
            onRowRemoving: function (e) {
                a = 1;
            },
            onRowRemoved: function (e) {
                a = 1;
            },
            onSaving(e) {
                ro = ro;
                //fieldname = e.changes[0].key; 

                // a = dataGrid.cellValue(ro, "AccName", selectionChangedArgs.selectedRowsData[0].Name);
            },
            onSaved: function (e) {
                // SaveColumnSanad();
                // ControlSave();

                //SaveSanad(ADocB);
            },
            onEditCanceling: function (e) {
                a = 1;
            },
            onEditCanceled: function (e) {
                a = 1;
            },

            getRowIndexByKey: function (e) {
                a = 1;
            },

            onValueChanged: function (e) {
                const previousValue = e.previousValue;
                const newValue = e.value;
                // Event handling commands go here
            },




            onEditorPrepared: function (e) { // تغییر ادیت
                a = 1;
            },

            onCellPrepared: function (e) {

                if (e.rowType === "header" || (e.rowType === "data" && (e.column.dataField === "#" || e.column.dataField === "button"))) {
                    e.cellElement.css("background-color", '#d9d9d9');
                    e.cellElement.css("color", 'black');
                }


                if (e.rowType === "data" && (e.column.dataField === "AccZCode" || e.column.dataField === "AccZName")) {

                    zaccCode = dataGrid.cellValue(e.rowIndex, 'AccZCode')
                    if (e.data.dataAcc != null) {
                        if (e.data.dataAcc.NextLevelFromZAcc == 1 && (zaccCode == '' || zaccCode == null)) {
                            e.cellElement.css("background-color", '#ffcbcb');
                        }
                    }

                }


                if (e.rowType === "data" && e.column.dataField === "AccCode" && Serial > 0) {
                    const visibleRows = dataGrid.getVisibleRows();
                    if (visibleRows[e.rowIndex].data.dataAcc == null) {
                        dataAcc = AccList.filter(s => s.Code == visibleRows[e.rowIndex].data.AccCode);
                        visibleRows[e.rowIndex].data.dataAcc = visibleRows[e.rowIndex].data.dataAcc;
                    }
                }


                /* if (e.column.command == "edit" && saveButton == null) {
                     saveButton = e.element.find(".dx-link-save");
                 }
 
 
                 if (e.rowType == "detailAdaptive") {
                     e.cellElement.addClass("adaptiveRowStyle");
                 }*/
                /* if (e.rowType === "data") {
                     visibleRows = e.component.getVisibleRows();
                     for (var i = 0; i < visibleRows.length-1; i++) {
                         visibleRows[i].data.BandNo = i;
                         dataJson = JSON.stringify(visibleRows[i].data);
                         ADocB[i] = JSON.parse(dataJson);
                     }
                 }*/

            },


            onEditingStart: function (e) {
                //editRowKey = e.key;
                //getTrzAcc(e.data.AccCode);
            },


            onEditorPreparing: function (e) {
                dataField = e.dataField;

                if (e.parentType == 'dataRow' && e.dataField == 'Bede') {
                    e.editorOptions.onValueChanged = function (args) {
                        //dataGrid.saveEditData()
                        ro = e.row.rowIndex;
                        Bede = args.value == null ? 0 : args.value;
                        ADocB[ro].Bede = Bede;
                        ADocB[ro].Best = 0;
                        ArzValue = CalcArz(dataGrid.cellValue(ro, "ArzCode"), Bede, 0, dataGrid.cellValue(ro, "ArzRate"));
                        if (ADocB[ro].ArzValue == null) {
                            dataGrid.saveEditData()
                        }
                        ADocB[ro].ArzValue = ArzValue;
                        dataGrid.refresh();
                        calcSanad();
                    }
                }

                if (e.parentType == 'dataRow' && e.dataField == 'Best') {
                    e.editorOptions.onValueChanged = function (args) {
                        ro = e.row.rowIndex;
                        Best = args.value == null ? 0 : args.value;
                        ADocB[ro].Bede = 0;
                        ADocB[ro].Best = Best;
                        ArzValue = CalcArz(dataGrid.cellValue(ro, "ArzCode"), 0, Best, dataGrid.cellValue(ro, "ArzRate"));
                        if (ADocB[ro].ArzValue == null) {
                            dataGrid.saveEditData()
                        }
                        ADocB[ro].ArzValue = ArzValue;
                        dataGrid.refresh();
                        calcSanad();
                    }
                }
            }

        }).dxDataGrid('instance');


        // dataGrid.option('rtlEnabled', true);
    }



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
                flagSaveLogWin = false;
                //ADocB = [];
                dataAcc = [];
                //dataGrid.option('dataSource', ADocB);
                $('#docnoout').text(translate('جدید'));
                self.StatusSanad(translate('موقت'));
                $("#status").val(translate('موقت'));
                sessionStorage.Status = translate('موقت');
                sessionStorage.Eghdam = sessionStorage.userName;
                flaglog = "Y";

                $("#SumBedehkar").val(0);
                $("#SumBestankar").val(0);
                $("#TafavotSanad").val(0);



                sessionStorage.F01 = '';
                sessionStorage.F02 = '';
                sessionStorage.F03 = '';
                sessionStorage.F04 = '';
                sessionStorage.F05 = '';
                sessionStorage.F06 = '';
                sessionStorage.F07 = '';
                sessionStorage.F08 = '';
                sessionStorage.F09 = '';
                sessionStorage.F10 = '';
                sessionStorage.F11 = '';
                sessionStorage.F12 = '';
                sessionStorage.F13 = '';
                sessionStorage.F14 = '';
                sessionStorage.F15 = '';
                sessionStorage.F16 = '';
                sessionStorage.F17 = '';
                sessionStorage.F18 = '';
                sessionStorage.F19 = '';
                sessionStorage.F20 = '';

                $("#ExtraFields01").val('');
                $("#ExtraFields02").val('');
                $("#ExtraFields03").val('');
                $("#ExtraFields04").val('');
                $("#ExtraFields05").val('');
                $("#ExtraFields06").val('');
                $("#ExtraFields07").val('');
                $("#ExtraFields08").val('');
                $("#ExtraFields09").val('');
                $("#ExtraFields10").val('');
                $("#ExtraFields11").val('');
                $("#ExtraFields12").val('');
                $("#ExtraFields13").val('');
                $("#ExtraFields14").val('');
                $("#ExtraFields15").val('');
                $("#ExtraFields16").val('');
                $("#ExtraFields17").val('');
                $("#ExtraFields18").val('');
                $("#ExtraFields19").val('');
                $("#ExtraFields20").val('');


                flagInsertADocH = 0;
                if (parseInt(sal) < SalNow) {
                    getADocHLastDate();
                }

                getADocB(-1);

                for (i = 0; i < 5; i++) {
                    tmp = {
                        AccCode: '',
                        AccZCode: '',
                        Bede: 0,
                        Best: 0,
                        Amount: 0,
                        ArzRate: 0,
                        ArzValue: 0,
                        Comm: '',
                        BandSpec: '',
                        BandNo: i
                    };
                    ADocB[i] = tmp;
                }

                //for (var i = 0; i < 1; i++) {
                //    dataGrid.addRow();
                //}

                Serial = 0;

                dataGrid.focus(dataGrid.getCellElement(0, 0));


                CheckAccess();
            }
        })
    }


    function AddNewBand() {
        $("#gridContainer").dxDataGrid("saveEditData");
        ADocB.push({});
        for (var i = 0; i < ADocB.length; i++) {
            ADocB[i].BandNo = i;
        }
        dataGrid.refresh(true);
    }


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

    // $("#gridContainer").dxDataGrid("columnOption", "ArzName", "visible", false);


    setInterval(SaveColumnSanad, 10000);
    function SaveColumnSanad() {
        if (changeColumn == true) {
            var dataGrid = $("#gridContainer").dxDataGrid("instance");
            columnCount = dataGrid.columnCount();
            var obj = [];
            for (i = 0; i < columnCount; i++) {
                var colInfo = dataGrid.columnOption(i);
                if (colInfo.dataField != 'button' && colInfo.dataField != '#') {
                    tmp = {
                        'UserCode': sessionStorage.userName,
                        'RprtId': rprtId,
                        'Code': colInfo.dataField,
                        'Visible': colInfo.visible,
                        'Position': colInfo.visibleIndex,
                        'Width': colInfo.visibleWidth
                    };
                    obj.push(tmp);
                }
            }
            a = RprtColsSaveUri + ace + '/' + sal + '/' + group;
            ajaxFunction(RprtColsSaveUri + ace + '/' + sal + '/' + group, 'POST', obj).done(function (response) {
                changeColumn = false;
                getRprtAllCols();
            });
        }
    }

    function rowNumber(cellElement, cellInfo) {
        cellElement.text(cellInfo.row.rowIndex + 1)
    }

    function dropDownBoxEditorAccCode(cellElement, cellInfo) {
        return $('<div>').dxDropDownBox({
            //dropDownOptions: { width: 500, height: 1500},
            dropDownOptions: { width: 500 },
            dataSource: AccList,
            value: cellInfo.value,
            valueExpr: 'Code',
            displayExpr: 'Code',
            contentTemplate(e) {
                return $('<div>').dxDataGrid({
                    dataSource: AccList,
                    keyExpr: 'Code',
                    remoteOperations: true,
                    rtlEnabled: true,
                    filterRow: {
                        visible: true,
                        applyFilter: 'auto',
                    },
                    columns: [
                        { dataField: 'Code', caption: "کد" },
                        { dataField: 'Name', caption: "نام" },
                        { dataField: 'Spec', caption: "ملاحظات" },
                    ],
                    hoverStateEnabled: true,
                    scrolling: { mode: 'virtual' },
                    height: 250,
                    selection: { mode: 'single' },
                    selectedRowKeys: [cellInfo.value],
                    focusedRowEnabled: true,
                    focusedRowKey: cellInfo.value,
                    onSelectionChanged(selectionChangedArgs) {
                        dAcc = selectionChangedArgs.selectedRowsData[0];
                        if (dAcc != null) {
                            if (dAcc.HasChild == 0 || dAcc.NextLevelFromZAcc == 1) {

                                e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                    cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                    var dataGrid = $("#gridContainer").dxDataGrid("instance");

                                    newRec = false;


                                    dataGrid.cellValue(ro, "AccName", selectionChangedArgs.selectedRowsData[0].Name);

                                    const visibleRows = dataGrid.getVisibleRows();
                                    visibleRows[ro].data.dataAcc = selectionChangedArgs.selectedRowsData[0];
                                    ADocB[ro].dataAcc = selectionChangedArgs.selectedRowsData[0];

                                    //dataAcc = ADocB[ro].dataAcc;

                                    if (newRec == false && visibleRows[ro].data.dataAcc.NextLevelFromZAcc == 0) {
                                        //visibleRows[ro].data.AccZCode = '';
                                        //visibleRows[ro].data.AccZName = '';

                                        dataGrid.cellValue(ro, "AccZCode", '');
                                        dataGrid.cellValue(ro, "AccZName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Mkz == 0) {
                                        // visibleRows[ro].data.MkzCode = '';
                                        //visibleRows[ro].data.MkzName = '';

                                        dataGrid.cellValue(ro, "MkzCode", '');
                                        dataGrid.cellValue(ro, "MkzName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Opr == 0) {
                                        // visibleRows[ro].data.OprCode = '';
                                        // visibleRows[ro].data.OprName = '';

                                        dataGrid.cellValue(ro, "OprCode", '');
                                        dataGrid.cellValue(ro, "OprName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Arzi == 0) {
                                        /* visibleRows[ro].data.ArzCode = '';
                                         visibleRows[ro].data.ArzName = '';
                                         visibleRows[ro].data.ArzValue = 0;
                                         visibleRows[ro].data.ArzRate = 0;*/

                                        dataGrid.cellValue(ro, "ArzCode", '');
                                        dataGrid.cellValue(ro, "ArzName", '');
                                        dataGrid.cellValue(ro, "ArzValue", '0');
                                        dataGrid.cellValue(ro, "ArzRate", '0');
                                    }

                                    // $("#gridContainer").dxDataGrid("columnOption", "Amount", "allowEditing", true);
                                    //if (newRec == false && visibleRows[ro].data.dataAcc.Amount == 0) {  به خاطر صورتی نشدن فیلد زیر حساب
                                    //visibleRows[ro].data.Amount = 0;
                                    dataGrid.cellValue(ro, "Amount", '0');
                                    //}



                                    if (visibleRows[ro].data.dataAcc.PDMode > 0) {
                                        getCheckList(visibleRows[ro].data.dataAcc.PDMode);
                                    }
                                    getTrzAcc(dAcc.Code);
                                    e.component.close();

                                    dataGrid.focus(dataGrid.getCellElement(ro, 5));
                                }

                            }
                            else {
                                showNotification(translate('این حساب قابل انتخاب نیست'), 0);
                            }
                        }
                    },

                });
            },
        });
    }

    function dropDownBoxEditorAccName(cellElement, cellInfo) {
        return $('<div>').dxDropDownBox({
            dropDownOptions: { width: 500 },
            dataSource: AccList,
            value: cellInfo.value,
            valueExpr: 'Name',
            displayExpr: 'Name',
            contentTemplate(e) {
                return $('<div>').dxDataGrid({
                    dataSource: AccList,
                    keyExpr: 'Name',
                    remoteOperations: true,
                    rtlEnabled: true,
                    filterRow: {
                        visible: true,
                        applyFilter: 'auto',
                    },
                    columns: [
                        { dataField: 'Code', caption: "کد" },
                        { dataField: 'Name', caption: "نام" },
                        { dataField: 'Spec', caption: "ملاحظات" },
                    ],
                    hoverStateEnabled: true,
                    scrolling: { mode: 'virtual' },
                    height: 250,
                    selection: { mode: 'single' },
                    selectedRowKeys: [cellInfo.value],
                    focusedRowEnabled: true,
                    focusedRowKey: cellInfo.value,
                    onSelectionChanged(selectionChangedArgs) {
                        dAcc = selectionChangedArgs.selectedRowsData[0];
                        /*if (dAcc != null) {
                            if (dAcc.HasChild == 0 || dAcc.NextLevelFromZAcc == 1) {
                                e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                    cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);

                                    newRec = false;
                                    dataGrid.cellValue(ro, "AccCode", selectionChangedArgs.selectedRowsData[0].Code);

                                    const visibleRows = dataGrid.getVisibleRows();
                                    visibleRows[ro].data.dataAcc = selectionChangedArgs.selectedRowsData[0];
                                    ADocB[ro].dataAcc = selectionChangedArgs.selectedRowsData[0];

                                    if (newRec == false && visibleRows[ro].data.dataAcc.NextLevelFromZAcc == 0) {
                                        dataGrid.cellValue(ro, "AccZCode", '');
                                        dataGrid.cellValue(ro, "AccZName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Mkz == 0) {
                                        dataGrid.cellValue(ro, "MkzCode", '');
                                        dataGrid.cellValue(ro, "MkzName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Opr == 0) {
                                        dataGrid.cellValue(ro, "OprCode", '');
                                        dataGrid.cellValue(ro, "OprName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Arzi == 0) {
                                        dataGrid.cellValue(ro, "ArzCode", '');
                                        dataGrid.cellValue(ro, "ArzName", '');
                                    }

                                    if (visibleRows[ro].data.dataAcc.PDMode > 0) {
                                        getCheckList(visibleRows[ro].data.dataAcc.PDMode);
                                    }

                                    e.component.close();
                                }
                            }
                            else {
                                showNotification(translate('این حساب قابل انتخاب نیست'), 0);
                            }
                        }*/





                        if (dAcc != null) {
                            if (dAcc.HasChild == 0 || dAcc.NextLevelFromZAcc == 1) {

                                e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                    cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                    var dataGrid = $("#gridContainer").dxDataGrid("instance");

                                    newRec = false;

                                    dataGrid.cellValue(ro, "AccCode", selectionChangedArgs.selectedRowsData[0].Code);

                                    const visibleRows = dataGrid.getVisibleRows();
                                    visibleRows[ro].data.dataAcc = selectionChangedArgs.selectedRowsData[0];
                                    ADocB[ro].dataAcc = selectionChangedArgs.selectedRowsData[0];
                                    //dataAcc = ADocB[ro].dataAcc;

                                    if (newRec == false && visibleRows[ro].data.dataAcc.NextLevelFromZAcc == 0) {
                                        dataGrid.cellValue(ro, "AccZCode", '');
                                        dataGrid.cellValue(ro, "AccZName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Mkz == 0) {
                                        dataGrid.cellValue(ro, "MkzCode", '');
                                        dataGrid.cellValue(ro, "MkzName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Opr == 0) {
                                        dataGrid.cellValue(ro, "OprCode", '');
                                        dataGrid.cellValue(ro, "OprName", '');
                                    }

                                    if (newRec == false && visibleRows[ro].data.dataAcc.Arzi == 0) {
                                        dataGrid.cellValue(ro, "ArzCode", '');
                                        dataGrid.cellValue(ro, "ArzName", '');
                                        dataGrid.cellValue(ro, "ArzValue", '0');
                                        dataGrid.cellValue(ro, "ArzRate", '0');
                                    }

                                    //if (newRec == false && visibleRows[ro].data.dataAcc.Amount == 0) {
                                    dataGrid.cellValue(ro, "Amount", '0');
                                    //}

                                    if (visibleRows[ro].data.dataAcc.PDMode > 0) {
                                        getCheckList(visibleRows[ro].data.dataAcc.PDMode);
                                    }

                                    getTrzAcc(dAcc.Code);
                                    e.component.close();

                                    dataGrid.focus(dataGrid.getCellElement(ro, 5));
                                }

                            }
                            else {
                                showNotification(translate('این حساب قابل انتخاب نیست'), 0);
                            }
                        }
                    },

                });
            },
        });
    }




    function FilterAccZCode(ZGru) {
        ZGru = ZGru.replaceAll(' ', '');
        if (ZGru != '') {
            a = ZGru.split(',');
            if (a.length == 1)
                return ["ZGruCode", "=", a[0].toString()];
            else {
                var b = "[";
                for (var i = 0; i < a.length; i++) {
                    b += '["ZGruCode", "=","' + a[i] + '"],"or",'
                }
                b = b.substr(0, b.length - 6);
                b += ']'
                b = JSON.parse(b);
                return b;
            }
        }
        else {
            if (ace == 'Web1') {
                return [["ZGruCode", "=", "-1"], "or", ["ZGruCode", "=", "-2"], "or", ["ZGruCode", "=", "-3"]]
            }
            else
                return '';
        }
    }

    function dropDownBoxEditorAccZCode(cellElement, cellInfo) {
        const visibleRows = dataGrid.getVisibleRows();

        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.NextLevelFromZAcc == 1) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: ZAccList,
                value: cellInfo.value,
                valueExpr: 'Code',
                displayExpr: 'Code',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: new DevExpress.data.DataSource({
                            store: new DevExpress.data.ArrayStore({
                                key: 'Code',
                                data: ZAccList,
                            }),

                            filter: FilterAccZCode(dataAcc.ZGru),
                        }),
                        keyExpr: 'Code',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "AccZName", selectionChangedArgs.selectedRowsData[0].Name);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        }
        else {
            //dataGrid.cellValue(ro, "AccZCode", '');
            // dataGrid.cellValue(ro, "AccZName", '');
            return '';
        }
    }

    function dropDownBoxEditorAccZName(cellElement, cellInfo) {

        const visibleRows = dataGrid.getVisibleRows();

        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.NextLevelFromZAcc == 1) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: ZAccList,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource:
                            new DevExpress.data.DataSource({
                                store: new DevExpress.data.ArrayStore({
                                    key: 'Name',
                                    data: ZAccList,
                                }),

                                filter: FilterAccZCode(dataAcc.ZGru),
                            }),
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "AccZCode", selectionChangedArgs.selectedRowsData[0].Code);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        }
        else {
            // dataGrid.cellValue(ro, "AccZCode", '');
            // dataGrid.cellValue(ro, "AccZName", '');
            return '';
        }
    }

    function dropDownBoxEditorMkzCode(cellElement, cellInfo) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Mkz > 0) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: MkzList,
                value: cellInfo.value,
                valueExpr: 'Code',
                displayExpr: 'Code',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: MkzList,
                        keyExpr: 'Code',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "MkzName", selectionChangedArgs.selectedRowsData[0].Name);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        } else
            return ''
    }

    function dropDownBoxEditorMkzName(cellElement, cellInfo) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Mkz > 0) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: MkzList,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: MkzList,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "MkzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        } else
            return ''
    }

    function dropDownBoxEditorOprCode(cellElement, cellInfo) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Opr > 0) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: OprList,
                value: cellInfo.value,
                valueExpr: 'Code',
                displayExpr: 'Code',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: OprList,
                        keyExpr: 'Code',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "OprName", selectionChangedArgs.selectedRowsData[0].Name);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        } else
            return ''
    }

    function dropDownBoxEditorOprName(cellElement, cellInfo) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Opr > 0) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: OprList,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: OprList,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "OprCode", selectionChangedArgs.selectedRowsData[0].Code);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        } else
            return ''
    }




    function dropDownBoxEditorArzCode(cellElement, cellInfo) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Arzi == 1) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: ArzList,
                value: cellInfo.value,
                valueExpr: 'Code',
                displayExpr: 'Code',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: ArzList,
                        keyExpr: 'Code',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "ArzName", selectionChangedArgs.selectedRowsData[0].Name);
                                dataGrid.cellValue(ro, "ArzRate", selectionChangedArgs.selectedRowsData[0].Rate);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        }
        else
            return ''
    }

    function dropDownBoxEditorArzName(cellElement, cellInfo) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return '';
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Arzi == 1) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: ArzList,
                value: cellInfo.value,
                valueExpr: 'Name',
                displayExpr: 'Name',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource: ArzList,
                        keyExpr: 'Name',
                        remoteOperations: true,
                        rtlEnabled: true,
                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },
                        columns: [
                            { dataField: 'Code', caption: "کد" },
                            { dataField: 'Name', caption: "نام" },
                            { dataField: 'Spec', caption: "ملاحظات" },
                        ],
                        hoverStateEnabled: true,
                        scrolling: { mode: 'virtual' },
                        height: 250,
                        selection: { mode: 'single' },
                        selectedRowKeys: [cellInfo.value],
                        focusedRowEnabled: true,
                        focusedRowKey: cellInfo.value,
                        onSelectionChanged(selectionChangedArgs) {
                            e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                            if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                dataGrid.cellValue(ro, "ArzRate", selectionChangedArgs.selectedRowsData[0].Rate);
                                e.component.close();
                            }
                        },
                    });
                },
            });
        } else
            return ''
    }

    /*
     
     function dropDownBoxEditorCheckNo(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: CheckList,
                 value: cellInfo.value,
                 valueExpr: 'CheckNo',
                 displayExpr: 'CheckNo',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: CheckList,
                         keyExpr: 'CheckNo',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'CheckNo', caption: "شماره چک" },
                             { dataField: 'CheckDate', caption: "تاریخ چک" },
                             { dataField: 'Value', caption: "مبلغ" },
                             { dataField: 'Bank', caption: "بانک" },
                             { dataField: 'Shobe', caption: "شعبه", hidingPriority: 0 },
                             { dataField: 'Jari', caption: "جاری", hidingPriority: 1 },
                             { dataField: 'BaratNo', caption: "برات", hidingPriority: 2 },
                             { dataField: 'CheckStatusSt', caption: "وضعیت چک" },
                             { dataField: 'CheckRadif', caption: "ردیف چک", hidingPriority: 3 },
                             { dataField: 'CheckComm', caption: "توضیحات چک", hidingPriority: 4 },
                             { dataField: 'TrafFullCode', caption: "کد طرف چک", hidingPriority: 5 },
                             { dataField: 'TrafFullName', caption: "نام طرف چک", hidingPriority: 6 },
                             { dataField: 'CheckVosoolDate', caption: "تاریخ وصول چک", hidingPriority: 7 },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 dataGrid.cellValue(ro, "CheckDate", selectionChangedArgs.selectedRowsData[0].CheckDate);
                                 dataGrid.cellValue(ro, "Bank", selectionChangedArgs.selectedRowsData[0].Bank);
                                 dataGrid.cellValue(ro, "Shobe", selectionChangedArgs.selectedRowsData[0].Shobe);
                                 dataGrid.cellValue(ro, "Jari", selectionChangedArgs.selectedRowsData[0].Jari);
                                 dataGrid.cellValue(ro, "BaratNo", selectionChangedArgs.selectedRowsData[0].BaratNo);
                                 dataGrid.cellValue(ro, "CheckStatusSt", selectionChangedArgs.selectedRowsData[0].CheckStatusSt);
                                 dataGrid.cellValue(ro, "CheckRadif", selectionChangedArgs.selectedRowsData[0].CheckRadif);
                                 dataGrid.cellValue(ro, "CheckComm", selectionChangedArgs.selectedRowsData[0].CheckComm);
                                 dataGrid.cellValue(ro, "TrafCode", selectionChangedArgs.selectedRowsData[0].TrafCode);
                                 dataGrid.cellValue(ro, "TrafName", selectionChangedArgs.selectedRowsData[0].TrafName);
                                 dataGrid.cellValue(ro, "TrafZCode", selectionChangedArgs.selectedRowsData[0].TrafZCode);
                                 dataGrid.cellValue(ro, "TrafZName", selectionChangedArgs.selectedRowsData[0].TrafZName);
     
                                 dataGrid.cellValue(ro, "Best", 0);
                                 dataGrid.cellValue(ro, "Bede", 0);
                                 if (dataAcc[ro].PDMode == 1) {
                                     dataGrid.cellValue(ro, "Best", selectionChangedArgs.selectedRowsData[0].Value);
                                 }
                                 else if (dataAcc[ro].PDMode == 2) {
                                     dataGrid.cellValue(ro, "Bede", selectionChangedArgs.selectedRowsData[0].Value);
                                 }
     
     
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     function dropDownBoxEditorBank(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: BankList,
                 value: cellInfo.value,
                 valueExpr: 'Name',
                 displayExpr: 'Name',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: BankList,
                         keyExpr: 'Name',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'Name', caption: "نام" },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 // dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     function dropDownBoxEditorShobe(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: ShobeList,
                 value: cellInfo.value,
                 valueExpr: 'Name',
                 displayExpr: 'Name',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: ShobeList,
                         keyExpr: 'Name',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'Name', caption: "نام" },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 // dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     
     function dropDownBoxEditorJari(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: JariList,
                 value: cellInfo.value,
                 valueExpr: 'Name',
                 displayExpr: 'Name',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: JariList,
                         keyExpr: 'Name',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'Name', caption: "نام" },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 // dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     
     function dropDownBoxEditorTrafZName(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: ZAccList,
                 value: cellInfo.value,
                 valueExpr: 'Name',
                 displayExpr: 'Name',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: ZAccList,
                         keyExpr: 'Name',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'Code', caption: "کد" },
                             { dataField: 'Name', caption: "نام" },
                             { dataField: 'Spec', caption: "ملاحظات" },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 // dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     function dropDownBoxEditorTrafZCode(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: ZAccList,
                 value: cellInfo.value,
                 valueExpr: 'Code',
                 displayExpr: 'Code',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: ZAccList,
                         keyExpr: 'Code',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'Code', caption: "کد" },
                             { dataField: 'Name', caption: "نام" },
                             { dataField: 'Spec', caption: "ملاحظات" },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 // dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     
     
     function dropDownBoxEditorTrafName(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: AccList,
                 value: cellInfo.value,
                 valueExpr: 'Name',
                 displayExpr: 'Name',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: AccList,
                         keyExpr: 'Name',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'Code', caption: "کد" },
                             { dataField: 'Name', caption: "نام" },
                             { dataField: 'Spec', caption: "ملاحظات" },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 // dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     function dropDownBoxEditorTrafCode(cellElement, cellInfo) {
         if (cellInfo.isOnForm == true)
             ro = cellInfo.rowIndex - 1;
         if (dataAcc[ro].PDMode > 0) {
             return $('<div>').dxDropDownBox({
                 dropDownOptions: { width: 500 },
                 dataSource: AccList,
                 value: cellInfo.value,
                 valueExpr: 'Code',
                 displayExpr: 'Code',
                 contentTemplate(e) {
                     return $('<div>').dxDataGrid({
                         dataSource: AccList,
                         keyExpr: 'Code',
                         remoteOperations: true,
                         rtlEnabled: true,
                         filterRow: {
                             visible: true,
                             applyFilter: 'auto',
                         },
                         columns: [
                             { dataField: 'Code', caption: "کد" },
                             { dataField: 'Name', caption: "نام" },
                             { dataField: 'Spec', caption: "ملاحظات" },
                         ],
                         hoverStateEnabled: true,
                         scrolling: { mode: 'virtual' },
                         height: 250,
                         selection: { mode: 'single' },
                         selectedRowKeys: [cellInfo.value],
                         focusedRowEnabled: true,
                         focusedRowKey: cellInfo.value,
                         onSelectionChanged(selectionChangedArgs) {
                             e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                             cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                             if (selectionChangedArgs.selectedRowKeys.length > 0) {
                                 cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                                 var dataGrid = $("#gridContainer").dxDataGrid("instance");
                                 ro = cellInfo.rowIndex;
                                 // dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                                 //dataGrid.saveEditData();
                                 e.component.close();
                             }
                         },
                     });
                 },
             });
         } else
             return ''
     }
     
     */








    function CalcArz(ArzCode, bede, best, ArzRate) {
        if (ArzCode == "")
            return 0;
        else {
            if (best > 0 && ArzRate > 0) {
                return (best / ArzRate).toFixed(2);
            }
            else if (bede > 0 && ArzRate > 0) {
                return (bede / ArzRate).toFixed(2);
            }
            else {
                return 0;
            }
        }
    }




    /* function EditorBede(newData, value, currentRowData) {
         newData.Count = value;
         newData.Bede = value.toFixed(sessionStorage.Deghat);
         newData.Best = 0;
         newData.ArzValue = CalcArz(currentRowData.ArzCode, value, 0, currentRowData.ArzRate);
 
         //currentRowData.Bede = value;
     }
 
 
     function EditorBest(newData, value, currentRowData) {
         newData.Count = value;
         newData.Bede = 0;
         newData.Best = value.toFixed(sessionStorage.Deghat);
         newData.ArzValue = CalcArz(currentRowData.ArzCode, 0, value, currentRowData.ArzRate);
         //currentRowData.Best = value; 
         //var dataGrid = $("#gridContainer").dxDataGrid("instance");
         //dataGrid.cellValue(ro, "Best", value);
         //calcSanad();
     }*/



    function EditorAmount(newData, value, currentRowData) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return newData.Amount = 0;
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Amount == 1)
            newData.Amount = value;
        else
            newData.Amount = 0;
    }

    function EditorArzValue(newData, value, currentRowData) {
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return newData.ArzValue = 0;
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.ArzCode == 1 && currentRowData.ArzCode != '')
            newData.ArzValue = value;
        else
            newData.ArzValue = 0;
    }

    function EditorArzRate(newData, value, currentRowData) {

        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc == null)
            return newData.ArzRate = 0;
        else
            dataAcc = visibleRows[ro].data.dataAcc;

        if (dataAcc.Arzi == 1 && currentRowData.ArzCode != '')
            newData.ArzRate = value;
        else
            newData.ArzRate = 0;
        newData.ArzValue = CalcArz(currentRowData.ArzCode, currentRowData.Bede, currentRowData.Best, value);
    }






    var trafCode = "";
    var trafName = "";

    var trafZCode = "";
    var trafZName = "";

    var rowCheck;
    function ShowCheck(e) {
        data = e.row.data;

        $('#CheckNo').val('');
        $('#checkDateBand').val('');
        $('#Value').val('');
        $('#nameBank').val('');
        $('#nameShobe').val('');
        $('#nameJari').val('');
        $('#BaratNo').val('');
        $('#CheckRadif').val('');
        $('#checkVosoolDate').val('');
        $('#nameTraf').val('');
        $('#nameTrafZ').val('');
        $('#CheckComm').val('');


        if (data.CheckNo != null && data.CheckNo != "") {
            $('#CheckNo').val(data.CheckNo);
            $('#checkDateBand').val(data.CheckDate);
            $('#Value').val(NumberToNumberString(data.Best > 0 ? data.Best : data.Bede));

            $('#nameBank').val(data.Bank);
            $('#nameShobe').val(data.Shobe);
            $('#nameJari').val(data.Jari);
            $('#BaratNo').val(data.BaratNo);
            $('#CheckRadif').val(data.CheckRadif);
            $('#checkVosoolDate').val(data.CheckVosoolDate);
            CheckStatus = data.CheckStatus;
            $('#checkStatus').val(data.CheckStatus);

            trafCode = data.TrafCode;
            trafName = data.TrafName;

            trafZCode = data.TrafZCode;
            trafZName = data.TrafZName;

            if (data.TrafCode != '') {
                $('#nameTraf').val('(' + trafCode + ') ' + trafName);
            }
            else {
                $('#nameTraf').val('');
            }

            if (data.TrafZCode != '') {
                $('#nameTrafZ').val('(' + trafZCode + ') ' + trafZName);
            }
            else {
                $('#nameTrafZ').val('');
            }
            $('#CheckComm').val(data.CheckComm);
        }

        $("#modal-DataCheck").modal('show');
    }

    $('#btncheck').click(function () {
        const visibleRows = dataGrid.getVisibleRows();
        getCheckList(visibleRows[ro].data.dataAcc.PDMode);
    })

    $('#modal-DataCheck').on('hide.bs.modal', function () {
        var dataGrid = $("#gridContainer").dxDataGrid("instance");
        a = self.CheckStatusCode();
        dataGrid.cellValue(ro, "CheckNo", $('#CheckNo').val());
        dataGrid.cellValue(ro, "CheckDate", $('#checkDateBand').val());
        dataGrid.cellValue(ro, "Bank", $('#nameBank').val());
        dataGrid.cellValue(ro, "Shobe", $('#nameShobe').val());
        dataGrid.cellValue(ro, "Jari", $('#nameJari').val());
        dataGrid.cellValue(ro, "BaratNo", $('#BaratNo').val());
        dataGrid.cellValue(ro, "CheckRadif", $('#CheckRadif').val());
        dataGrid.cellValue(ro, "CheckStatus", self.CheckStatusCode());
        dataGrid.cellValue(ro, "CheckVosoolDate", $('#checkVosoolDate').val());
        dataGrid.cellValue(ro, "TrafCode", trafCode);
        dataGrid.cellValue(ro, "TrafName", trafName);
        dataGrid.cellValue(ro, "TrafZCode", trafZCode);
        dataGrid.cellValue(ro, "TrafZName", trafZName);
        dataGrid.cellValue(ro, "CheckComm", $('#CheckComm').val());

        value = $('#Value').val();
        value = value.replaceAll(',', '');
        value = value.replaceAll('/', '.');
        const visibleRows = dataGrid.getVisibleRows();
        if (visibleRows[ro].data.dataAcc.PDMode == 1) {
            dataGrid.cellValue(ro, "Best", value);
            dataGrid.cellValue(ro, "Bede", '0');
            ADocB[ro].Best = value;
            ADocB[ro].Bede = 0;
        } else {
            dataGrid.cellValue(ro, "Best", '0');
            dataGrid.cellValue(ro, "Bede", value);
            ADocB[ro].Best = 0;
            ADocB[ro].Bede = value;
        }

       
        calcSanad();
    });


    /* sessionStorage.NEW_ADOC == "true" ? $("#AddNewSanad").show() : $("#AddNewSanad").hide();
 
     $('#AddNewSanad').click(function () {
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
 
 
 
                 //ADocB = [];
                 dataAcc = [];
                 //dataGrid.option('dataSource', ADocB);
                 $('#docnoout').text(translate('جدید'));
                 self.StatusSanad(translate('موقت'));
                 $("#status").val(translate('موقت'));
                 sessionStorage.Status = translate('موقت');
                 sessionStorage.Eghdam = sessionStorage.userName;
                 flaglog = "Y";
 
                 $("#SumBedehkar").val(0);
                 $("#SumBestankar").val(0);
                 $("#TafavotSanad").val(0);
 
 
 
                 sessionStorage.F01 = '';
                 sessionStorage.F02 = '';
                 sessionStorage.F03 = '';
                 sessionStorage.F04 = '';
                 sessionStorage.F05 = '';
                 sessionStorage.F06 = '';
                 sessionStorage.F07 = '';
                 sessionStorage.F08 = '';
                 sessionStorage.F09 = '';
                 sessionStorage.F10 = '';
                 sessionStorage.F11 = '';
                 sessionStorage.F12 = '';
                 sessionStorage.F13 = '';
                 sessionStorage.F14 = '';
                 sessionStorage.F15 = '';
                 sessionStorage.F16 = '';
                 sessionStorage.F17 = '';
                 sessionStorage.F18 = '';
                 sessionStorage.F19 = '';
                 sessionStorage.F20 = '';
 
                 $("#ExtraFields01").val('');
                 $("#ExtraFields02").val('');
                 $("#ExtraFields03").val('');
                 $("#ExtraFields04").val('');
                 $("#ExtraFields05").val('');
                 $("#ExtraFields06").val('');
                 $("#ExtraFields07").val('');
                 $("#ExtraFields08").val('');
                 $("#ExtraFields09").val('');
                 $("#ExtraFields10").val('');
                 $("#ExtraFields11").val('');
                 $("#ExtraFields12").val('');
                 $("#ExtraFields13").val('');
                 $("#ExtraFields14").val('');
                 $("#ExtraFields15").val('');
                 $("#ExtraFields16").val('');
                 $("#ExtraFields17").val('');
                 $("#ExtraFields18").val('');
                 $("#ExtraFields19").val('');
                 $("#ExtraFields20").val('');
 
 
                 flagInsertADocH = 0;
                 if (parseInt(sal) < SalNow) {
                     getADocHLastDate();
                 }
 
                 getADocB(-1);
 
                 for (i = 0; i < 5; i++) {
                     tmp = {
                         AccCode: '',
                         AccZCode: '',
                         Bede: 0,
                         Best: 0,
                         Amount: 0,
                         ArzRate: 0,
                         ArzValue: 0,
                         Comm: '',
                         BandSpec: '',
                         BandNo: i
                     };
                     ADocB[i] = tmp;
                 }
 
                 //for (var i = 0; i < 1; i++) {
                 //    dataGrid.addRow();
                 //}
 
                 Serial = 0;
 
                 dataGrid.focus(dataGrid.getCellElement(0, 0));
 
 
                 //$(this).CheckAccess();
             }
         })
     });*/





    if (flagupdateHeader == 1) {
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
        self.StatusSanad(sessionStorage.Status);
        $("#status").val(sessionStorage.Status);
        flagOtherFieldShow = true;
        $('#titlePage').text(translate("سند حسابداری شماره") + ' ' + sessionStorage.DocNo.toPersianDigit());
        getADocB(Serial);
        dataGrid.focus(dataGrid.getCellElement(0, 4));
    }
    else {
        flagInsertADocH = 0;
        if (parseInt(sal) < SalNow) {
            getADocHLastDate();
        }
        getADocB(-1);
        dataGrid = $("#gridContainer").dxDataGrid("instance");
        $("#SumBedehkar").val(0);
        $("#SumBestankar").val(0);
        $("#TafavotSanad").val(0);


        //const clonedItem = $.extend({}, e.row.data);
        //ADocB.splice(bandFree, 0, bandFree);

        // ADocB.splice(i, 0, bandFree);
        //for (var i = 0; i < 5; i++) {
        //     dataGrid.addRow();
        //}

        // data = dataGrid.getVisibleRows();
        for (i = 0; i < 5; i++) {
            tmp = {
                AccCode: '',
                AccZCode: '',
                Bede: 0,
                Best: 0,
                Amount: 0,
                ArzRate: 0,
                ArzValue: 0,
                Comm: '',
                BandSpec: '',
                BandNo: i
            };
            ADocB[i] = tmp;
        }

        // for (var i = 0; i < 5; i++) {
        //    dataGrid.addRow();
        // }




        dataGrid.focus(dataGrid.getCellElement(0, 1));

        //dataGrid.option("focusedRowKey", 100);
        //dataGrid.navigateToRow(1);


    }




    var flaglog = "Y";

    if (sessionStorage.flagCopy == 'Y')
        flaglog = "N";


    function DeleteBand() {
        ajaxFunction(ADocBiUri + ace + '/' + sal + '/' + group + '/' + Serial + '/0/Y', 'DELETE').done(function (response) {

        });
    }


    function SaveSanad() {
        tarikh = $("#tarikh").val().toEnglishDigit();
        modeCode = $("#modeCode").val();
        status = $("#status").val();
        if (Serial == 0) {
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
                Tanzim: sessionStorage.userName,
                //Taeed: status == "تایید" ? sessionStorage.userName : '',
                //Tasvib: '',
                TahieShode: ace,
                Eghdam: sessionStorage.userName,
                Status: status,
                Spec: self.Spec(),
                Footer: '',//$("#footer").val(),
                F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val(),
                F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val(),
                F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val(),
                F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val(),
                F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val(),
                F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val(),
                F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val(),
                F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val(),
                F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val(),
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
                //DarChecks: darChecks,
                //ParChecks: parChecks,
            };

            ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group, 'POST', ADocObject).done(function (response) {
                var res = response.split("-");
                Serial = res[0];
                DocNoOut = res[1];
                $('#docnoout').text(DocNoOut);
                if (flagSaveLogWin == false) {
                    SaveLog('Acc5', EditMode_New, LogMode_ADoc, 0, DocNoOut, Serial);
                    flagSaveLogWin = true;
                }
                flaglog = 'N';
            });
        }
        else {
            var docNo = $("#docnoout").text();
            //TestADoc_New(Serial, tarikh, docNo);
            // if (resTestNew == false) {
            //    return null;
            //}

            var ADocObject = {
                SerialNumber: Serial,
                ModeCode: modeCode,
                DocNo: docNo,
                DocDate: tarikh,
                BranchCode: 0,
                UserCode: sessionStorage.userName,
                Tanzim: sessionStorage.userName,
                //Taeed: status == "تایید" ? sessionStorage.userName : '',
                //Tasvib: '',
                TahieShode: ace,
                Status: status,
                Spec: self.Spec(),
                Footer: '',// $("#footer").val(),
                F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val() == "" ? sessionStorage.F01 : $("#ExtraFields01").val(),
                F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val() == "" ? sessionStorage.F02 : $("#ExtraFields02").val(),
                F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val() == "" ? sessionStorage.F03 : $("#ExtraFields03").val(),
                F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val() == "" ? sessionStorage.F04 : $("#ExtraFields04").val(),
                F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val() == "" ? sessionStorage.F05 : $("#ExtraFields05").val(),
                F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val() == "" ? sessionStorage.F06 : $("#ExtraFields06").val(),
                F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val() == "" ? sessionStorage.F07 : $("#ExtraFields07").val(),
                F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val() == "" ? sessionStorage.F08 : $("#ExtraFields08").val(),
                F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val() == "" ? sessionStorage.F09 : $("#ExtraFields09").val(),
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
                //DarChecks: darChecks,
                // ParChecks: parChecks,
            };

            ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group, 'PUT', ADocObject).done(function (response) {
                sessionStorage.searchADocH = Serial;
                flaglog = 'N';
                DeleteBand();
                if (flagSaveLogWin == false) {
                    SaveLog('Acc5', EditMode_Chg, LogMode_ADoc, 0, docNo, Serial);
                    flagSaveLogWin = true;
                }
            });
        }



        // data = dataGrid.getVisibleRows();
        /*   data = ADocB;
           var obj = [];
           for (i = 0; i <= data.length - 1; i++) {
               //item = data[i].data;
               item = data[i];
               tmp = {
                   AccCode: item.AccCode == null ? "" : item.AccCode,
                   AccZCode: item.AccZCode == null ? "" : item.AccZCode,
                   Bede: item.Bede == null ? "0" : item.Bede,
                   Best: item.Best == null ? "0" : item.Best,
                   Comm: item.Comm == null ? "" : item.Comm,
                   BandSpec: item.BandSpec == null ? "" : item.BandSpec,
                   CheckNo: item.CheckNo == null ? "" : item.CheckNo,
                   CheckDate: item.CheckDate == null ? '' : item.CheckDate.toEnglishDigit(),
                   Bank: item.Bank == null ? "" : item.Bank,
                   Shobe: item.Shobe == null ? "" : item.Shobe,
                   Jari: item.Jari == null ? "" : item.Jari,
                   BaratNo: item.BaratNo == null ? "" : item.BaratNo,
                   TrafCode: item.TrafCode == null ? "" : item.TrafCode,
                   TrafZCode: item.TrafZCode == null ? "" : item.TrafZCode,
                   CheckRadif: item.CheckRadif == null ? "" : item.CheckRadif,
                   CheckComm: item.CheckComm == null ? "" : item.CheckComm,
                   CheckStatus: item.CheckStatus == null ? "" : item.CheckStatus,
                   CheckVosoolDate: item.CheckVosoolDate == null ? '' : item.CheckVosoolDate.toEnglishDigit(),
                   OprCode: item.OprCode == null ? "" : item.OprCode,
                   MkzCode: item.MkzCode == null ? "" : item.MkzCode,
                   ArzCode: item.ArzCode == null ? "" : item.ArzCode,
                   ArzRate: item.ArzRate == null ? "" : item.ArzRate,
                   arzValue: item.ArzValue == null ? "" : item.ArzValue,
                   Amount: item.Amount == null ? "" : item.Amount,
                   flagLog: 'Y',
               };
               obj.push(tmp);
           }
   
           ajaxFunction(ADocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST', obj).done(function (response) {
               showNotification(translate('سند ذخیره شد'), 1);
           });*/

        var ConvertObject = {
            SerialNumber: Serial,
            TempSerialNumber: Serial_Test,
        };

        ajaxFunction(ADocBConvertUri + ace + '/' + sal + '/' + group, 'POST', ConvertObject, false).done(function (response) {
            showNotification(translate('سند ذخیره شد'), 1);
        });
    }



    var Serial_Test = 0;

    function ControlSave() {
        tarikh = $("#tarikh").val().toEnglishDigit();
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

        rows = dataGrid.getVisibleRows();

        for (var i = 0; i < rows.length; i++) {
            if (rows[i].data.AccCode == '' || rows[i].data.AccCode == null) {
                dataGrid.deleteRow(i);
            }
        }

        dataGrid.saveEditData();

        calcSanad();

        if (ADocB.length == 0) {
            return showNotification(translate('سند دارای بند قابل ذخیره نیست'), 0);
        }





        var V_Del_ADocObject = {
            SerialNumber: Serial_Test,
            // UserCode: sessionStorage.userName,
        };

        ajaxFunction(V_Del_ADocUri + ace + '/' + sal + '/' + group, 'POST', V_Del_ADocObject).done(function (response) {

        });



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
            Tanzim: sessionStorage.userName,
            //Taeed: status == "تایید" ? sessionStorage.userName : '',
            //Tasvib: '',
            TahieShode: ace,
            Eghdam: sessionStorage.userName,
            Status: status,
            Spec: self.Spec(),
            Footer: '',//$("#footer").val(),
            F01: $("#ExtraFields01").val() == null ? '' : $("#ExtraFields01").val(),
            F02: $("#ExtraFields02").val() == null ? '' : $("#ExtraFields02").val(),
            F03: $("#ExtraFields03").val() == null ? '' : $("#ExtraFields03").val(),
            F04: $("#ExtraFields04").val() == null ? '' : $("#ExtraFields04").val(),
            F05: $("#ExtraFields05").val() == null ? '' : $("#ExtraFields05").val(),
            F06: $("#ExtraFields06").val() == null ? '' : $("#ExtraFields06").val(),
            F07: $("#ExtraFields07").val() == null ? '' : $("#ExtraFields07").val(),
            F08: $("#ExtraFields08").val() == null ? '' : $("#ExtraFields08").val(),
            F09: $("#ExtraFields09").val() == null ? '' : $("#ExtraFields09").val(),
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
            flagLog: 'N',
            flagTest: 'Y',
        };

        ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group, 'POST', ADocObject).done(function (response) {
            var res = response.split("-");
            Serial_Test = res[1];
        });


        // data = dataGrid.getVisibleRows();
        data = ADocB;
        var obj = [];
        for (i = 0; i <= data.length - 1; i++) {
            //item = data[i].data;
            item = data[i];
            if (item.AccCode != "") {
                tmp = {
                    AccCode: item.AccCode == null ? "" : item.AccCode,
                    AccZCode: item.AccZCode == null ? "" : item.AccZCode,
                    Bede: item.Bede == null ? "0" : item.Bede,
                    Best: item.Best == null ? "0" : item.Best,
                    Comm: item.Comm == null ? "" : item.Comm,
                    BandSpec: item.BandSpec == null ? "" : item.BandSpec,
                    CheckNo: item.CheckNo == null ? "" : item.CheckNo,
                    CheckDate: item.CheckDate == null ? '' : item.CheckDate.toEnglishDigit(),
                    Bank: item.Bank == null ? "" : item.Bank,
                    Shobe: item.Shobe == null ? "" : item.Shobe,
                    Jari: item.Jari == null ? "" : item.Jari,
                    BaratNo: item.BaratNo == null ? "" : item.BaratNo,
                    TrafCode: item.TrafCode == null ? "" : item.TrafCode,
                    TrafZCode: item.TrafZCode == null ? "" : item.TrafZCode,
                    CheckRadif: item.CheckRadif == null ? "" : item.CheckRadif,
                    CheckComm: item.CheckComm == null ? "" : item.CheckComm,
                    CheckStatus: item.CheckStatus == null ? "" : item.CheckStatus,
                    CheckVosoolDate: item.CheckVosoolDate == null ? '' : item.CheckVosoolDate.toEnglishDigit(),
                    OprCode: item.OprCode == null ? "" : item.OprCode,
                    MkzCode: item.MkzCode == null ? "" : item.MkzCode,
                    ArzCode: item.ArzCode == null ? "" : item.ArzCode,
                    ArzRate: item.ArzRate == null ? "" : item.ArzRate,
                    arzValue: item.ArzValue == null ? "" : item.ArzValue,
                    Amount: item.Amount == null ? "" : item.Amount,

                    flagLog: 'N',
                    flagTest: 'Y',
                };
                obj.push(tmp);
            }
        }

        ajaxFunction(ADocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial_Test, 'POST', obj).done(function (response) {

        });


        var TestADocObject = {
            SerialNumber: Serial_Test,
            flagTest: 'Y'
        };

        ajaxFunction(TestADocUri + ace + '/' + sal + '/' + group, 'POST', TestADocObject).done(function (data) {
            var obj = JSON.parse(data);
            TestADocList = obj;
            if (data.length > 2) {
                $('#data-error').show();
                $('#data-grid').addClass('col-md-6');
                //$('#modal-FinalSave').modal('show');
                SetDataTestDocB();
            } else {
                SaveSanad();
            }
        });
    }

    $('#FinalSave-Modal').click(function () {
        //$('#modal-FinalSave').modal('hide');

        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-6');
        SaveSanad();
    });

    function SetDataTestDocB() {
        $("#BodyTestDocB").empty();
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = TestADocList;
        for (var i = 0; i < list.length; i++) {
            textBody +=
                '<div class="body" style="padding:7px;">' +
                '    <div class="form-inline">';
            if (list[i].Test == 1) {
                countWarning += 1;
                textBody += ' <img src="/Content/img/Warning.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <a style="margin-left: 3px;" onclick="FocusRowGrid(' + i + ');"> ' + translate('هشدار :') + '</a>'
            }
            else {
                countError += 1;
                textBody += ' <img src="/Content/img/Error.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <a style="margin-left: 3px;" onclick="FocusRowGrid(' + i + ');">' + translate('خطا :') + '</a>'
            }

            tBand = translate('بند شماره') + ' ';
            if (list[i].TestName == "Opr")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('پروژه مشخص نشده است') + ' </a>';
            else if (list[i].TestName == "Mkz")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('مرکز هزینه مشخص نشده است') + ' </a>';
            else if (list[i].TestName == "Arz")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('دارای حساب ارزی می باشد ولی ارز آن مشخص نیست') + ' </a>';
            else if (list[i].TestName == "Mahiat")
                //  textBody += '<span>بند شماره ' + list[i].BandNo + ' مانده حساب  <span>' + list[i].AccCode + '</span> مغایر با ماهیت آن می شود ' + ' </span>';
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('مانده حساب') + ' </a>' + '<p style="padding-left: 5px;padding-right: 5px;">' + list[i].AccCode + ' </p>' + '<p>' + translate('مغایر با ماهیت آن می شود') + '</p>';

            else if (list[i].TestName == "Balance")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + translate('سند بالانس نیست . بدهکار') + ' : ' + $("#SumBedehkar").val() + ' ' + translate('بستانکار') + ' : ' + $("#SumBestankar").val() + ' </a>';

            else if (list[i].TestName == "ZeroBand")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('دارای مبلغ نیست') + ' </a>';


            else if (list[i].TestName == "Traf")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('طرف حساب انتخاب نشده است') + ' </a>';

            else if (list[i].TestName == "Check")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('اطلاعات چک وارد نشده است') + ' </a>';

            else if (list[i].TestName == "HasZir")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('زیر حساب انتخاب نشده است') + ' </a>';

            else if (list[i].TestCap != "")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + translate(list[i].TestCap) + '</a>';

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


    function calcSanadGrid() {

        dataGrid = $("#gridContainer").dxDataGrid("instance");
        a = dataGrid.getVisibleRows();
        rowsCount = dataGrid.getVisibleRows().length;
        //var rowsCount = $("#gridContainer").find("tr.dx-row.dx-data-row").length;

        sumBede = 0
        sumBest = 0;
        for (var i = 0; i < rowsCount; i++) {
            bed = dataGrid.cellValue(i, "Bede") == null || dataGrid.cellValue(i, "Bede") == '' ? 0 : parseFloat(dataGrid.cellValue(i, "Bede"));
            bes = dataGrid.cellValue(i, "Best") == null || dataGrid.cellValue(i, "Best") == '' ? 0 : parseFloat(dataGrid.cellValue(i, "Best"));

            sumBede = sumBede + bed;
            sumBest = sumBest + bes;
        }

        $("#SumBedehkar").val(NumberToNumberString(sumBede));
        $("#SumBestankar").val(NumberToNumberString(sumBest));
        $("#TafavotSanad").val(NumberToNumberString(sumBede - sumBest));
    }


    function calcSanad() {

        // dataGrid = $("#gridContainer").dxDataGrid("instance");
        // a = dataGrid.getVisibleRows();
        // rowsCount = dataGrid.getVisibleRows().length;
        //var rowsCount = $("#gridContainer").find("tr.dx-row.dx-data-row").length;

        sumBede = 0
        sumBest = 0;
        for (var i = 0; i < ADocB.length; i++) {
            bed = ADocB[i].Bede == null || ADocB[i].Bede == '' ? 0 : parseFloat(ADocB[i].Bede);
            bes = ADocB[i].Best == null || ADocB[i].Best == '' ? 0 : parseFloat(ADocB[i].Best);

            sumBede = sumBede + bed;
            sumBest = sumBest + bes;
        }

        $("#SumBedehkar").val(NumberToNumberString(sumBede));
        $("#SumBestankar").val(NumberToNumberString(sumBest));
        $("#TafavotSanad").val(NumberToNumberString(sumBede - sumBest));
    }



    $("#closeError").click(function () {
        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-6');
    });

    $("#backError").click(function () {
        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-6');
    });


    /*const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format;
    
    $('#listWidget').dxList({
        dataSource: self.TestADocList(),
        height: '100%',
        itemTemplate(data) {
            const result = $('<div>').addClass('product');
    
            $('<img>').attr('src', data.ImageSrc).appendTo(result);
            $('<div>').text(data.Name).appendTo(result);
            $('<div>').addClass('price')
                .html(formatCurrency(data.Price)).appendTo(result);
    
            return result;
        },
    }).dxList('instance');*/














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
                const visibleRows = dataGrid.getVisibleRows();
                getCheckList(visibleRows[ro].data.dataAcc.PDMode);
            }
        })
    })


    self.selectCheck = function (item) {
        trafCode = item.TrafCode;
        trafName = item.TrafName;
        trafZCode = item.TrafZCode;
        trafZName = item.TrafZName;
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

        // CalcValue(0);

        $('#modal-Check').modal('toggle');
    }


    $('#modal-DataCheck').on('shown.bs.modal', function () {
        //if (flagSearchCheck == 0 && self.flagupdateband == false) {
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
        // flagSearchCheck = 1;
        /* } else if (flagSearchCheck == 0 && self.flagupdateband == true) {
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
         }*/

        $('.fix').attr('class', 'form-line focused fix');
    });





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
            //'<th>' + translate('ردیف') + '</th>' +
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
            //'<td data-bind="text: $root.radif($index())"></td>' +
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
            // '<td style="background-color: #efb683;"></td>' +
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
        //if (flagSearchBank == 0 && self.flagupdateband == false) {
        //   filterBank0("");
        self.currentPageIndexBank(0);
        //   flagSearchBank = 1;
        //} else if (flagSearchBank == 0 && self.flagupdateband == true) {
        //    self.filterBank0($('#nameBank').val());
        //}
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
        /*  if (flagSearchShobe == 0 && self.flagupdateband == false) {
              filterShobe0("");
              self.currentPageIndexShobe(0);
              flagSearchShobe = 1;
          } else if (flagSearchShobe == 0 && self.flagupdateband == true) {
              self.filterShobe0($('#nameShobe').val());
          }*/

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
        // if (flagSearchJari == 0 && self.flagupdateband == false) {
        //    filterJari0("");
        //   self.currentPageIndexJari(0);
        //    flagSearchJari = 1;
        //} else if (flagSearchJari == 0 && self.flagupdateband == true) {
        //    self.filterJari0($('#nameJari').val());
        //}

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


    var zGruCode = '';
    self.selectTraf = function (item) {
        zGruTraf = "";
        $('#nameZAcc').val('');
        if (item.HasChild == 0 || item.NextLevelFromZAcc == 1) {
            if (item.NextLevelFromZAcc == 1) {
                $('#btnTrafZ').removeAttr('hidden', '');
                zGruCode = item.ZGru;
                getZAccList(zGruCode);
                $('#modal-TrafZ').modal('show');
            }
            else {
                $('#btnTrafZ').attr('hidden', '');
                $('#nameTrafZ').val('');
                zGruCode = '';
                trafZCode = '';
                trafZName = '';
            }


            $('#nameTraf').val('(' + item.Code + ') ' + item.Name);
            trafCode = item.Code;
            trafName = item.Name;
            $('#modal-Traf').modal('toggle');
        }
        else
            return showNotification(translate('این طرف حساب قابل انتخاب نیست'), 0);
    }


    $('#modal-Traf').on('shown.bs.modal', function () {
        /*  if (flagSearchTraf == 0 && self.flagupdateband == false) {
                self.filterTraf0("");
                self.filterTraf1("");
                self.filterTraf2("");
                self.currentPageIndexTraf(0);
                flagSearchTraf = 1;
            } else if (flagSearchTraf == 0 && self.flagupdateband == true) {
                self.filterTraf0(TrafCode);
                self.filterTraf1("");
                self.filterTraf2("");
            }*/

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
                getZAccList(zGruCode);
            }
        })
    })


    self.selectTrafZ = function (item) {
        $('#nameTrafZ').val('(' + item.Code + ') ' + item.Name);
        trafZCode = item.Code;
        trafZName = item.Name;
        $('#modal-TrafZ').modal('toggle');
    }


    $('#modal-TrafZ').on('shown.bs.modal', function () {
        /* if (flagSearchTrafZ == 0 && self.flagupdateband == false) {
             self.filterTrafZ0("");
             self.filterTrafZ1("");
             self.filterTrafZ2("");
             self.currentPageIndexTrafZ(0);
             flagSearchTrafZ = 1;
         } else if (flagSearchTrafZ == 0 && self.flagupdateband == true) {
             self.filterTrafZ0(TrafZCode);
             self.filterTrafZ1("");
             self.filterTrafZ2("");
         }*/
        $('.fix').attr('class', 'form-line focused fix');
    });














    var TrzAccUri = server + '/api/ReportAcc/TrzAcc/'; //  // آدرس مانده حساب 
    var monTotalAcc = 0;

    function getTrzAcc(accCode) {
        $('#mandehHesab').text('0');
        var TrzAccObject = {
            azTarikh: sessionStorage.BeginDateAcc,
            taTarikh: sessionStorage.EndDateAcc,
            AModeCode: '',
            AccCode: accCode,
            MkzCode: '',
            OprCode: '',
            Level: '5',
            Sath: '2',
        };

        ajaxFunction(TrzAccUri + ace + '/' + sal + '/' + group, 'POST', TrzAccObject, true).done(function (data) {
            if (data.length > 0) {
                monTotalAcc = data[0].MonTotal;
                $('#mandehHesab').text(NumberToNumberString(parseFloat(Math.abs(monTotalAcc))) + ' ' + (monTotalAcc > 0 ? 'بد' : monTotalAcc == 0 ? '' : 'بس'));
            }
        });
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


    /*  $('#Print_SanadHesab').click(function () {
  
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
      });*/

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








    $('#modal-OtherField').on('shown.bs.modal', function () {
        if (flagOtherFieldShow == true) {
            $("#ExtraFields01").val(sessionStorage.F01);
            $("#ExtraFields02").val(sessionStorage.F02);
            $("#ExtraFields03").val(sessionStorage.F03);
            $("#ExtraFields04").val(sessionStorage.F04);
            $("#ExtraFields05").val(sessionStorage.F05);
            $("#ExtraFields06").val(sessionStorage.F06);
            $("#ExtraFields07").val(sessionStorage.F07);
            $("#ExtraFields08").val(sessionStorage.F08);
            $("#ExtraFields09").val(sessionStorage.F09);
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



    $('#modal-OtherField').on('hide.bs.modal', function () {
        $('#finalSave_Title').removeAttr('hidden', '');
    });






    /*
    function ajaxFunctionSaveColumn(uri, method, data) {
        var userNameAccount = localStorage.getItem("userNameAccount");
        var passAccount = localStorage.getItem("passAccount");
        return $.ajax({
            type: method,
            async: false,
            encoding: 'UTF-8',
            url: uri,
            dataType: 'json',
            cache: false,
            timeout: 30000,
            headers: {
                'userName': userNameAccount,
                'password': passAccount,
                'userKarbord': sessionStorage.userName,
                'device': 'Web',
            },
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3);
        });
    }*/

    navigationType = window.performance.navigation.type;

    window.onbeforeunload = function (e) {
        // isclose = false;
        // while (isclose == false) {
        //     isclose = RemoveUseSanad(ace, sal, "SanadHesab", sessionStorage.SerialNumber);
        // }


        //aa();

        /*if (someConditionThatIndicatesIShouldConfirm) {
            return "If you reload this page, your previous action will be repeated";
        } else {
            //Don't return anything
        }*/
        //if (is_form_dirty()) {
        //    a = 1;
        // }



        /* if (
             (window.performance.navigation.type === 1)// ||
            // window.performance.getEntriesByType('navigation').map((nav) => nav.type).includes('reload')
         )*/

        RemoveUseSanad(ace, sal, "SanadHesab", sessionStorage.SerialNumber, useSanadOtherUser != 'UseUser');








        //for (var i = 0; i < 100000; i++) { }
        // SaveColumnSanad();

    };

    // window.onbeforeunload = function (e) { }

    /* async function aa() {
         var a = false; 
          while (a != true) {
              a = await RemoveUseSanad(ace, sal, "SanadHesab", sessionStorage.SerialNumber);
         }
     } */



    // alert after close and refresh
    //$(window).bind("beforeunload", function (event) {
    //    var a = event
    //   return confirm("Do you really want to close?"); 
    //    return ''; 
    //});

    // $(window).unload(function () {
    //     RemoveUseSanad(ace, sal, "SanadHesab", sessionStorage.SerialNumber);
    // });

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
                SaveColumnSanad();
                ControlSave();
            }

            if (e.keyCode == key_Esc && $('#modal-Print').is(':visible')) {
                $('#modal-Print').modal('hide');
            }
        }
    };






    self.PageIndexTraf = function (item) {
        return CountPage(self.filterTrafList(), self.pageSizeTraf(), item);
    };

    self.PageIndexTrafZ = function (item) {
        return CountPage(self.filterTrafZList(), self.pageSizeTrafZ(), item);
    };

    self.PageIndexBank = function (item) {
        return CountPage(self.filterBankList(), self.pageSizeBank(), item);
    };
    self.PageIndexShobe = function (item) {
        return CountPage(self.filterShobeList(), self.pageSizeShobe(), item);
    };

    self.PageIndexJari = function (item) {
        return CountPage(self.filterJariList(), self.pageSizeJari(), item);
    };

    self.PageIndexCheck = function (item) {
        return CountPage(self.filterCheckList(), self.pageSizeCheck(), item);
    };

    self.PageIndexPrintForms = function (item) {
        return CountPage(self.filterPrintFormsList(), self.pageSizePrintForms(), item);
    };

};

ko.applyBindings(new ViewModel());



function FocusRowGrid(band) {
    data = TestADocList[band];
    dataGrid = $("#gridContainer").dxDataGrid("instance");

    /* for (var i = 0; i < cols.length; i++) {
         if (cols[i].dataField == data.TestName + 'Code')
             index = i;
     }*/

    // const col = dataGrid.columns.find(c => c.dataField === 'ProcedureName');


    dataGrid.focus(dataGrid.getCellElement(data.BandNo - 1, 0));
}