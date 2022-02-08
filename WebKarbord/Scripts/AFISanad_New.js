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

    self.TestADocList = ko.observableArray([]); // لیست تست 






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

    var AccList;
    self.AModeList = ko.observableArray([]); // نوع سند 
    self.StatusList = ko.observableArray([]); // وضعیت  
    var OprList; // لیست پروژه ها
    var MkzList; // لیست مرکز هزینه
    var ArzList; // لیست ارز ها
    var ZAccList; // لیست زیر حساب ها


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
        var AccObject = {
            Mode: 1,
            UserCode: sessionStorage.userName,
        }

        ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'POST', AccObject, false).done(function (data) {

            AccList = data.filter(s => s.AutoCreate == 0);



        });
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
                // dataAcc[i] = [];
                AccData = AccList.filter(s => s.Code == data[i].AccCode);
                if (AccData.length > 0) {
                    dataAcc[i] = AccData[0];
                    //dataAcc[i].NextLevelFromZAcc = AccData[0].NextLevelFromZAcc;
                    //dataAcc[i].Mkz = AccData[0].Mkz;
                    //dataAcc[i].Opr = AccData[0].Opr;
                    // dataAcc[i].Arzi = AccData[0].Arzi;
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
                data[i].Code == 'Best'
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

            if (cols[i].dataField == 'Bede') {
                cols[i].setCellValue = EditorBede;
            }
            if (cols[i].dataField == 'Best') {
                cols[i].setCellValue = EditorBest;
            }
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
            columnAutoWidth: false,

            columnResizingMode: 'widget',
            columnMinWidth: 150,
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
            columnHidingEnabled: true,
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
                var summaryValue = dataGrid.getTotalSummaryValue(fieldName);
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
        var a = ADocB;
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
            self.TestADocList(obj);
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


    self.UpdateCust = function (item) {
        a = 10;
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
                    ' <a style="margin-left: 3px;" data-bind="click: $root.UpdateCust"> ' + translate('هشدار :') + '</a>'
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
                textBody += '<p>' + translate('سند بالانس نیست . بدهکار') + ' : ' + $("#SumBedehkar").val() + ' ' + translate('بستانکار') + ' : ' + $("#SumBestankar").val() + ' </p>';

            else if (list[i].TestName == "ZeroBand")
                textBody += '<p>' + tBand + list[i].BandNo + ' ' + translate('مبلغ بدهکار و بستانکار صفر است') + ' </p>';


            else if (list[i].TestName == "Traf")
                textBody += '<p>' + tBand + list[i].BandNo + +' ' + translate('طرف حساب انتخاب نشده است') + ' </p>';

            else if (list[i].TestName == "Check")
                textBody += '<p>' + tBand + list[i].BandNo + +' ' + translate('اطلاعات چک وارد نشده است') + ' </p>';

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









