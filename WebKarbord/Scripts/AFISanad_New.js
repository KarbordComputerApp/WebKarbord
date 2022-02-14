var TestADocList; //لیست خطا ها
var cols;

var ViewModel = function () {

    TestUser();
    var viewAction = false;
    var resTestNew = false;
    var flagFinalSave = false;

    var flagupdateHeader;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;



    $('#data-error').hide();
    $('#data-grid').addClass('col-md');

    $('#titlePage').text(translate("سند حسابداری جدید"));
    $('#finalSave_Title').attr('hidden', '');


    self.AModeCode = ko.observable();
    self.SerialNumber = ko.observable();
    self.DocNoOut = ko.observable();
    self.DocDate = ko.observable(DateNow);
    self.Spec = ko.observable();
    self.StatusSanad = ko.observable();







    var AModeUri = server + '/api/ADocData/AMode/'; // آدرس نوع سند
    var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت سند 
    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکز هزینه
    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه 
    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز 
    var ZAccUri = server + '/api/Web_Data/ZAcc/'; // آدرس زیر حساب ها
    var ADocHLastDateUri = server + '/api/ADocData/ADocH/LastDate/'; // آدرس آخرین تاریخ سند
    var ADocHiUri = server + '/api/AFI_ADocHi/'; // آدرس ذخیره هدر سند 
    var ADocBiUri = server + '/api/AFI_ADocBi/'; // آدرس ذخیره یند سند 
    var ADocBSaveAllUri = server + '/api/AFI_ADocBi/SaveAllDocB/'; // آدرس ذخیره یند سند 
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





    var AccList;
    self.AModeList = ko.observableArray([]); // نوع سند 
    self.StatusList = ko.observableArray([]); // وضعیت  
    var OprList; // لیست پروژه ها
    var MkzList; // لیست مرکز هزینه
    var ArzList; // لیست ارز ها
    var ZAccList; // لیست زیر حساب ها

    var CheckList; // لیست چک
    var BankList;// لیست بانک
    var ShobeList;// لیست شعبه
    var JariList;// لیست جاری
    var CheckStatusList;// لیست وضعیت چک


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
            var AccObject = {
                Mode: 1,
                UserCode: sessionStorage.userName,
            }

            ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'POST', AccObject, false).done(function (data) {
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

    function getZAccList() {
        ajaxFunction(ZAccUri + ace + '/' + sal + '/' + group + '/' + null, 'GET').done(function (data) {
            ZAccList = data;
        });
    }
    getZAccList();






    //Get CheckList List
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




    function getADocHLastDate() {
        ajaxFunction(ADocHLastDateUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.DocDate(data);
            $('#btntarikh').click(function () {
                $('#tarikh').change();
            });
        });

    }



    var ADocB;
    var dataAcc = [];
    var ADocBUri = server + '/api/ADocData/ADocB/'; // آدرس بند سند 
    function getADocB(serialNumber) {
        ajaxFunction(ADocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            for (var i = 0; i < data.length; i++) {
                AccData = AccList.filter(s => s.Code == data[i].AccCode);
                if (AccData.length > 0) {
                    dataAcc[i] = AccData[0];
                }
            }
            ADocB = data;
            GetRprtCols_NewList();
        });
    }

    var rprtId = 'ADocB';
    function GetRprtCols_NewList() {

        cols = getRprtCols(rprtId, '*Default*');

        cols = cols.filter(s => s.Name != "" && s.Visible == 1 &&
            s.Code != "AccFullCode" &&
            s.Code != "AccFullName"
        );
        data = cols;

        for (var i = 0; i < data.length; i++) {
            if (data[i].Code == 'AccCode' ||

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
                data[i].Code == 'BandSpec' ||
                data[i].Code == 'Bank' ||
                data[i].Code == 'CheckNo' ||
                data[i].Code == 'Shobe' ||
                data[i].Code == 'Jari' ||
                data[i].Code == 'BaratNo' ||
                data[i].Code == 'CheckStatusSt' ||
                data[i].Code == 'CheckRadif' ||
                data[i].Code == 'CheckComm' ||
                data[i].Code == 'TrafCode' ||
                data[i].Code == 'TrafName' ||
                data[i].Code == 'TrafZCode' ||
                data[i].Code == 'TrafZName' 
            ) {

            }
            else
              data[i].Visible = 0
        }

        f = '['
        //f += '{"dataField":"Row","caption": "ردیف","cellTemplate":"rowNumber","allowEditing": false}, ';

        for (var i = 0; i < data.length; i++) {

            f += '{"dataField":"' + data[i].Code + '",'
            //f += '"caption":"' + data[i].Name + '"}';
            f += '"caption":"' + data[i].Name + '",';
            // f += '"alignment": "center",';
            f += '"visible":' + (data[i].Visible == 0 ? false : true);
            if (data[i].Code == "AccCode") {
                f +=
                    ',"lookup": {"dataSource": "AccList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    '"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorCode"'
            }

            else if (data[i].Code == "AccName") {
                f +=
                    ',"lookup": {"dataSource": "AccList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    '"validationRules": [{ "type": "required" }],' +
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


            else if (data[i].Code == "CheckNo") {
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



            else if (data[i].Code == "Bede") {
                f += ',"setCellValue": "EditorBede"'
            }

            else if (data[i].Code == "Best") {
                f += ',"setCellValue": "EditorBest"'
            }

            if (data[i].Code == "BandNo") {
                f += ',"allowEditing": false'
            }

            if (data[i].Type == 4) {
                f += ',"dataType":"number"';
            }
            else if (data[i].Type == 5) {
                f += ',"dataType":"number",';
                f += '"format":"fixedPoint",';
                f += '"editorOptions": {"format": "currency","showClearButton": true}';
            }
            f += '}';
            if (i < data.length - 1)
                f += ','
        }






        f += ']'

        cols = JSON.parse(f)

        conutHide = 0;
        for (var i = 0; i < cols.length; i++) {

            /* if (cols[i].dataField == 'Row') {
                 cols[i].cellTemplate = rowNumber;
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

            if (cols[i].dataField == 'CheckNo') {
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
            }

            if (cols[i].dataField == 'Bede') {
                cols[i].setCellValue = EditorBede;
            }
            if (cols[i].dataField == 'Best') {
                cols[i].setCellValue = EditorBest;
            }

            /*if (cols[i].dataField == "Bank" ||
                cols[i].dataField == "CheckNo" ||
                cols[i].dataField == "CheckDate" ||
                cols[i].dataField == "Shobe" ||
                cols[i].dataField == "Jari" ||
                cols[i].dataField == "BaratNo" ||
                cols[i].dataField == "CheckComm" ||
                cols[i].dataField == "CheckMode" ||
                cols[i].dataField == "CheckRadif" ||
                cols[i].dataField == "CheckVosoolDate" ||
                cols[i].dataField == "CheckStatus" ||
                cols[i].dataField == "TrafZCode" ||
                cols[i].dataField == "TrafZName" ||
                cols[i].dataField == "TrafCode" ||
                cols[i].dataField == "TrafName"

            ) {
                cols[i].hidingPriority = conutHide;
                cols[i].width = 70;
                cols[i].editorOptions = 0;
                cols[i].editorOptions.height = 100;
                conutHide++;
            }*/

            if (cols[i].dataField == "CheckNo") cols[i].hidingPriority = 0;
            if (cols[i].dataField == "CheckDate") cols[i].hidingPriority = 1;
            if (cols[i].dataField == "Bank") cols[i].hidingPriority = 2;
            if (cols[i].dataField == "Shobe") cols[i].hidingPriority = 3;
            if (cols[i].dataField == "Jari") cols[i].hidingPriority = 4;
            if (cols[i].dataField == "CheckStatus") cols[i].hidingPriority = 5;
            if (cols[i].dataField == "TrafCode") cols[i].hidingPriority = 6;
            if (cols[i].dataField == "TrafName") cols[i].hidingPriority = 7;
            if (cols[i].dataField == "TrafZCode") cols[i].hidingPriority = 8;
            if (cols[i].dataField == "TrafZName") cols[i].hidingPriority = 9;
            if (cols[i].dataField == "CheckRadif") cols[i].hidingPriority = 10;
            if (cols[i].dataField == "BaratNo") cols[i].hidingPriority = 11;
            if (cols[i].dataField == "CheckVosoolDate") cols[i].hidingPriority = 12;
            if (cols[i].dataField == "CheckComm") cols[i].hidingPriority = 13;
           // if (cols[i].dataField == "CheckMode") cols[i].hidingPriority = 0;



        }

        CreateTableColumn(cols);
    }

    var co = 0;
    var ro = 0;
    var fieldName = '';

    var dataGrid;



    function CreateTableColumn(data) {
        dataGrid = $('#gridContainer').dxDataGrid({
            dataSource: ADocB,
            keyExpr: 'BandNo',
            showBorders: true,
            showRowLines: true,
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnAutoWidth: true,

            columnResizingMode: 'widget',
            columnMinWidth: 100,
            focusedRowIndex: 0,
            focusedColumnIndex: 0,

            columnChooser: {
                enabled: true,
                // mode: 'select',
            },

            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'row',
                editOnKeyPress: true,
            },

            paging: {
                //    enabled: true,
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
                //newRowPosition: 'last',

            },
            //columnHidingEnabled: true,
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
                fieldName = e.column.dataField;
                //var summaryValue = dataGrid.getTotalSummaryValue(fieldName);
                calcSanad();
            },

            onKeyDown: function (e) {
                const keyCode = e.event.key;
            },

            /* onEditorPreparing(e) {
                 if (e.parentType === 'dataRow' && e.dataField === 'CityID') {
                     e.editorOptions.disabled = (typeof e.row.data.StateID !== 'number');
                 }
             },*/

            onEditorPrepared: function (e) { // تغییر ادیت


            },
            onEditingStart() {
                a = 1;
            },

            onInitNewRow: function (e) {

                len = ADocB.length;
                //ADocB[len] = e.data;
                // ADocB[len].BandNo = len+1;
            },


            onRowRemoving() {
                logEvent('RowRemoving');
            },
            onRowRemoved() {
                logEvent('RowRemoved');
            },
            onRowInserting() {
                a = 1;
            },
            onRowInserted() {
                a = 1;
            },
            onRowUpdating() {
                a = 1;
            },
            onRowUpdated() {
                a = 1;
            },
            onRowRemoving() {
                a = 1;
            },
            onRowRemoved() {
                a = 1;
            },
            onSaving(e) {
                ro = ro;
                //fieldname = e.changes[0].key; 

                // a = dataGrid.cellValue(ro, "AccName", selectionChangedArgs.selectedRowsData[0].Name);
            },
            onSaved() {
                ControlSave();
                //SaveSanad(ADocB);
            },
            onEditCanceling() {
                a = 1;
            },
            onEditCanceled() {
                a = 1;
            },



            getRowIndexByKey() {
                a = 1;
            },

            onValueChanged: function (e) {
                const previousValue = e.previousValue;
                const newValue = e.value;
                // Event handling commands go here
            }

        }).dxDataGrid('instance');
        dataGrid.option('rtlEnabled', true);
    }

    // $("#gridContainer").dxDataGrid("columnOption", "ArzName", "visible", false);


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
                        e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                        cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                        if (selectionChangedArgs.selectedRowKeys.length > 0) {
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);

                            var dataGrid = $("#gridContainer").dxDataGrid("instance");

                            newRec = false;
                            if (dataAcc[ro] == null) {
                                //  newRec = true;
                                dataAcc[ro] = [];
                            }
                            dataAcc[ro] = selectionChangedArgs.selectedRowsData[0];

                            /* dataAcc[ro].NextLevelFromZAcc = selectionChangedArgs.selectedRowsData[0].NextLevelFromZAcc;
                             dataAcc[ro].Mkz = selectionChangedArgs.selectedRowsData[0].Mkz;
                             dataAcc[ro].Opr = selectionChangedArgs.selectedRowsData[0].Opr;
                             dataAcc[ro].Arzi = selectionChangedArgs.selectedRowsData[0].Arzi;*/

                            dataGrid.cellValue(ro, "AccName", selectionChangedArgs.selectedRowsData[0].Name);

                            if (newRec == false && dataAcc[ro].NextLevelFromZAcc == 0) {
                                dataGrid.cellValue(ro, "AccZCode", '');
                                dataGrid.cellValue(ro, "AccZName", '');
                            }

                            if (newRec == false && dataAcc[ro].Mkz == 0) {
                                dataGrid.cellValue(ro, "MkzCode", '');
                                dataGrid.cellValue(ro, "MkzName", '');
                            }

                            if (newRec == false && dataAcc[ro].Opr == 0) {
                                dataGrid.cellValue(ro, "OprCode", '');
                                dataGrid.cellValue(ro, "OprName", '');
                            }

                            if (newRec == false && dataAcc[ro].Arzi == 0) {
                                dataGrid.cellValue(ro, "ArzCode", '');
                                dataGrid.cellValue(ro, "ArzName", '');
                            }

                            if (dataAcc[ro].PDMode > 0) {
                                getCheckList(dataAcc[ro].PDMode);
                            }

                           


                            e.component.close();

                            dataGrid.focus(dataGrid.getCellElement(ro, 5));
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
                        e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                        cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                        if (selectionChangedArgs.selectedRowKeys.length > 0) {
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);

                            newRec = false;
                            if (dataAcc[ro] == null) {
                                dataAcc[ro] = [];
                            }
                            dataAcc[ro] = selectionChangedArgs.selectedRowsData[0];

                            dataGrid.cellValue(ro, "AccCode", selectionChangedArgs.selectedRowsData[0].Code);

                            if (newRec == false && dataAcc[ro].NextLevelFromZAcc == 0) {
                                dataGrid.cellValue(ro, "AccZCode", '');
                                dataGrid.cellValue(ro, "AccZName", '');
                            }

                            if (newRec == false && dataAcc[ro].Mkz == 0) {
                                dataGrid.cellValue(ro, "MkzCode", '');
                                dataGrid.cellValue(ro, "MkzName", '');
                            }

                            if (newRec == false && dataAcc[ro].Opr == 0) {
                                dataGrid.cellValue(ro, "OprCode", '');
                                dataGrid.cellValue(ro, "OprName", '');
                            }

                            if (newRec == false && dataAcc[ro].Arzi == 0) {
                                dataGrid.cellValue(ro, "ArzCode", '');
                                dataGrid.cellValue(ro, "ArzName", '');
                            }
                            e.component.close();
                        }
                    },
                });
            },
        });
    }

    function FilterAccZCode(ZGru) {
        if (ZGru != '') {
            return ["ZGruCode", "=", ZGru]
        }
    }

    function dropDownBoxEditorAccZCode(cellElement, cellInfo) {
        if (dataAcc[ro].NextLevelFromZAcc == 1) {
            return $('<div>').dxDropDownBox({
                dropDownOptions: { width: 500 },
                dataSource: ZAccList,
                value: cellInfo.value,
                valueExpr: 'Code',
                displayExpr: 'Code',
                contentTemplate(e) {
                    return $('<div>').dxDataGrid({
                        dataSource:
                            new DevExpress.data.DataSource({
                                store: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: ZAccList,
                                }),

                                filter: FilterAccZCode(AccData[0].ZGru),
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
                                ////dataGrid.saveEditData();
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
        if (dataAcc[ro].NextLevelFromZAcc == 1) {
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
                                //ro = cellInfo.rowIndex;
                                dataGrid.cellValue(ro, "AccZCode", selectionChangedArgs.selectedRowsData[0].Code);
                                //dataGrid.saveEditData();
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
        if (dataAcc[ro].Mkz > 0) {

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

    function dropDownBoxEditorMkzName(cellElement, cellInfo) {
        if (dataAcc[ro].Mkz > 0) {

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

    function dropDownBoxEditorOprCode(cellElement, cellInfo) {
        if (dataAcc[ro].Opr > 0) {
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

    function dropDownBoxEditorOprName(cellElement, cellInfo) {
        if (dataAcc[ro].Opr > 0) {

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

    function dropDownBoxEditorArzCode(cellElement, cellInfo) {
        if (dataAcc[ro].Arzi == 1) {
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
                                //dataGrid.saveEditData();
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
        if (dataAcc[ro].Arzi == 1) {
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
                            { dataField: 'BaratNo', caption: "برات", hidingPriority : 2 },
                            { dataField: 'CheckStatusSt', caption: "وضعیت چک" },
                            { dataField: 'CheckRadif', caption: "ردیف چک", hidingPriority: 3 },
                            { dataField: 'CheckComm', caption: "توضیحات چک", hidingPriority : 4 },
                            { dataField: 'TrafFullCode', caption: "کد طرف چک", hidingPriority : 5 },
                            { dataField: 'TrafFullName', caption: "نام طرف چک", hidingPriority :6 },
                            { dataField: 'CheckVosoolDate', caption: "تاریخ وصول چک", hidingPriority :7 },
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
                                else if(dataAcc[ro].PDMode == 2) {
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














    function EditorBede(newData, value, currentRowData) {
        newData.Count = value;
        newData.Bede = value;
        newData.Best = 0;
    }

    function EditorBest(newData, value, currentRowData) {
        a = a;
        newData.Count = value;
        newData.Bede = 0;
        newData.Best = value;
    }








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
                dataGrid.option('dataSource', []);
                ADocB = [];
                dataGrid.option('dataSource', ADocB);
                $('#docnoout').text(translate('جدید'));
                self.StatusSanad(translate('موقت'));
                $("#status").val(translate('موقت'));
                sessionStorage.Status = translate('موقت');
                sessionStorage.Eghdam = sessionStorage.userName;
                flaglog = "Y";
                //$(this).CheckAccess();
            }
        })
    });



    var Serial = 0;

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
    }
    else {
        flagInsertADocH = 0;
        if (parseInt(sal) < SalNow) {
            getADocHLastDate();
        }
        getADocB(0);
        dataGrid = $("#gridContainer").dxDataGrid("instance");

        //for (var i = 0; i < 10; i++) {
        //     dataGrid.addRow();
        // }


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
                Taeed: status == "تایید" ? sessionStorage.userName : '',
                Tasvib: '',
                TahieShode: ace,
                Eghdam: sessionStorage.userName,
                Status: status,
                Spec: self.Spec(),
                Footer: '',//$("#footer").val(),
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
                Taeed: status == "تایید" ? sessionStorage.userName : '',
                Tasvib: '',
                TahieShode: ace,
                Status: status,
                Spec: self.Spec(),
                Footer: '',// $("#footer").val(),
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
                flaglog = 'N';
                DeleteBand();
            });
        }

        var obj = [];
        for (i = 0; i <= ADocB.length - 1; i++) {
            item = data[i];
            tmp = {
                AccCode: ADocB[i].AccCode == null ? "" : ADocB[i].AccCode,
                AccZCode: ADocB[i].AccZCode == null ? "" : ADocB[i].AccZCode,
                Bede: ADocB[i].Bede == null ? "0" : ADocB[i].Bede,
                Best: ADocB[i].Best == null ? "0" : ADocB[i].Best,
                Comm: ADocB[i].Comm,
                BandSpec: ADocB[i].BandSpec,
                CheckNo: ADocB[i].CheckNo,
                CheckDate: ADocB[i].CheckDate,
                Bank: ADocB[i].Bank,
                Shobe: ADocB[i].Shobe,
                Jari: ADocB[i].Jari,
                BaratNo: ADocB[i].BaratNo,
                TrafCode: ADocB[i].TrafCode,
                TrafZCode: ADocB[i].TrafZCode == null ? "" : ADocB[i].TrafZCode,
                CheckRadif: ADocB[i].CheckRadif,
                CheckComm: ADocB[i].CheckComm,
                CheckStatus: ADocB[i].CheckStatus,
                CheckVosoolDate: ADocB[i].CheckVosoolDate,
                OprCode: ADocB[i].OprCode == null ? "" : ADocB[i].OprCode,
                MkzCode: ADocB[i].MkzCode == null ? "" : ADocB[i].MkzCode,
                ArzCode: ADocB[i].ArzCode == null ? "" : ADocB[i].ArzCode,
                ArzRate: ADocB[i].ArzRate,
                arzValue: ADocB[i].arzValue,
                flagLog: 'Y',
            };
            obj.push(tmp);
        }

        ajaxFunction(ADocBSaveAllUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST', obj).done(function (response) {

        });
    }





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

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification(translate('تاریخ وارد شده با سال انتخابی همخوانی ندارد'), 0);
        }

        if (modeCode == '') {
            return showNotification(translate('نوع سند را انتخاب کنید'), 0);
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
            Tanzim: sessionStorage.userName,
            Taeed: status == "تایید" ? sessionStorage.userName : '',
            Tasvib: '',
            TahieShode: ace,
            Eghdam: sessionStorage.userName,
            Status: status,
            Spec: self.Spec(),
            Footer: '',//$("#footer").val(),
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
            flagLog: 'N',
            flagTest: 'Y',
        };

        ajaxFunction(ADocHiUri + ace + '/' + sal + '/' + group, 'POST', ADocObject).done(function (response) {
            var res = response.split("-");
            Serial_Test = res[0];
        });


        var obj = [];
        for (i = 0; i <= ADocB.length - 1; i++) {
            item = data[i];
            tmp = {
                AccCode: ADocB[i].AccCode == null ? "" : ADocB[i].AccCode,
                AccZCode: ADocB[i].AccZCode == null ? "" : ADocB[i].AccZCode,
                Bede: ADocB[i].Bede == null ? "0" : ADocB[i].Bede,
                Best: ADocB[i].Best == null ? "0" : ADocB[i].Best,
                Comm: '',
                BandSpec: '',
                CheckNo: '',
                CheckDate: '',
                Bank: '',
                Shobe: '',
                Jari: '',
                BaratNo: '',
                TrafCode: '',
                TrafZCode: ADocB[i].TrafZCode == null ? "" : ADocB[i].TrafZCode,
                CheckRadif: '',
                CheckComm: '',
                CheckStatus: '',
                CheckVosoolDate: '',
                OprCode: ADocB[i].OprCode == null ? "" : ADocB[i].OprCode,
                MkzCode: ADocB[i].MkzCode == null ? "" : ADocB[i].MkzCode,
                ArzCode: ADocB[i].ArzCode == null ? "" : ADocB[i].ArzCode,
                ArzRate: '',
                arzValue: '',
                flagLog: 'N',
                flagTest: 'Y',
            };
            obj.push(tmp);
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
                $('#data-grid').addClass('col-md-8');


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
        $('#data-grid').removeClass('col-md-8');
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
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('مبلغ بدهکار و بستانکار صفر است') + ' </a>';


            else if (list[i].TestName == "Traf")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('طرف حساب انتخاب نشده است') + ' </a>';

            else if (list[i].TestName == "Check")
                textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('اطلاعات چک وارد نشده است') + ' </a>';

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


    function calcSanad() {

        var rowsCount = $("#gridContainer").find("tr.dx-row.dx-data-row").length;

        sumBede = 0
        sumBest = 0;
        for (var i = 0; i < rowsCount; i++) {
            bed = dataGrid.cellValue(i, "Bede") == null ? 0 : dataGrid.cellValue(i, "Bede");
            bes = dataGrid.cellValue(i, "Best") == null ? 0 : dataGrid.cellValue(i, "Best");

            sumBede = sumBede + bed;
            sumBest = sumBest + bes;
        }

        $("#SumBedehkar").val(sumBede);
        $("#SumBestankar").val(sumBest);
        $("#TafavotSanad").val(sumBede - sumBest);
    }

    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "SanadHesab", sessionStorage.SerialNumber);
    };


    $("#closeError").click(function () {
        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-8');
    });

    $("#backError").click(function () {
        $('#data-error').hide();
        $('#data-grid').removeClass('col-md-8');
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