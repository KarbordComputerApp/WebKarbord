var ViewModel = function () {




    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;
    var flaglog = "Y";

    if (sessionStorage.flagCopy == 'Y')
        flaglog = "N";

    TestUser();
    var viewAction = false;
    var resTestNew = false;
    var flagFinalSave = false;



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

    var AccList;
    self.AModeList = ko.observableArray([]); // نوع سند 
    self.StatusList = ko.observableArray([]); // وضعیت  
    var OprList; // لیست پروژه ها
    var MkzList; // لیست مرکز هزینه
    var ArzList; // لیست ارز ها


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
            AccList = data;
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



    var ADocB;
    var ADocBUri = server + '/api/ADocData/ADocB/'; // آدرس بند سند 
    function getADocB(serialNumber) {
        ajaxFunction(ADocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            ADocB = data;
        });
    }

    getADocB(167);


    var rprtId = 'ADocB';
    function GetRprtCols_NewList() {

        cols = getRprtCols(rprtId, sessionStorage.userName);
        data = cols;
        f = '['
        for (var i = 0; i < data.length; i++) {

            f += '{"dataField":"' + data[i].Code + '",'
            //f += '"caption":"' + data[i].Name + '"}';
            f += '"caption":"' + data[i].Name + '",';
            f += '"visible":' + (data[i].Visible == 0 ? false : true);
            if (data[i].Code == "AccFullCode") {
                f +=
                    ',"lookup": {"dataSource": "AccList", "valueExpr": "Code", "displayExpr": "Code"},' +
                    '"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorCode"'
            }

            else if (data[i].Code == "AccFullName") {
                f +=
                    ',"lookup": {"dataSource": "AccList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    '"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorName"'
            }

            else if (data[i].Code == "MkzName") {
                f +=
                    ',"lookup": {"dataSource": "MkzList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    //'"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorMkzName"'
            }

            else if (data[i].Code == "OprName") {
                f +=
                    ',"lookup": {"dataSource": "OprList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    //'"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorOprName"'
            }

            else if (data[i].Code == "ArzName") {
                f +=
                    ',"lookup": {"dataSource": "ArzList", "valueExpr": "Name", "displayExpr": "Name"},' +
                    //'"validationRules": [{ "type": "required" }],' +
                    '"editCellTemplate": "dropDownBoxEditorArzName"'
            }


            else if (data[i].Code == "Bede") {
                f += ',"setCellValue": "EditorBede"'
            }

            else if (data[i].Code == "Best") {
                f += ',"setCellValue": "EditorBest"'
            }
            
            if ( data[i].Code == "BandNo") {
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

        allowEditing: false,

        f += ']'

        cols = JSON.parse(f)
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].dataField == 'AccFullCode') {
                cols[i].editCellTemplate = dropDownBoxEditorCode;
                cols[i].lookup.dataSource = AccList;
            }

            if (cols[i].dataField == 'AccFullName') {
                cols[i].editCellTemplate = dropDownBoxEditorName;
                cols[i].lookup.dataSource = AccList;
            }

            if (cols[i].dataField == 'MkzName') {
                cols[i].editCellTemplate = dropDownBoxEditorMkzName;
                cols[i].lookup.dataSource = MkzList;
            }
            if (cols[i].dataField == 'OprName') {
                cols[i].editCellTemplate = dropDownBoxEditorOprName;
                cols[i].lookup.dataSource = OprList;
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

    GetRprtCols_NewList()

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
            columnMinWidth: 50,

            columnChooser: {
                enabled: true,
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
            },
            columns: data,
            onEditingStart() {
                a = 1; 
            },
            //onInitNewRow() {
             //   a = 1; 
            //},
            onInitNewRow: function (e) {
                e.data.Hire_Date = new Date();
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

              




                ro = e.changes[0].key;
                //fieldname = e.changes[0].key; 

               // a = dataGrid.cellValue(ro, "AccFullName", selectionChangedArgs.selectedRowsData[0].Name);
            },
            onSaved() {
                a = 1; 
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


    function dropDownBoxEditorCode(cellElement, cellInfo) {
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
                            //ADocB[1].AccName = selectionChangedArgs.selectedRowsData[0].Name;
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);

                            var dataGrid = $("#gridContainer").dxDataGrid("instance");

                            ro = cellInfo.key-1;

                            // dataGrid.cellValue(0, 1, selectionChangedArgs.selectedRowsData[0].Name);
                            //dataGrid.saveEditData();

                            /* for (i = 0; i < dataGrid.totalCount(); i++) {
                                 var cell = dataGrid.cellValue(i, "MyFieldName");
                                 console.log("cell: ", cell);
                             }*/

                            //var myGrid = $("#gridContainer").dxDataGrid("instance");
                            //console.log("gridContainer:", myGrid);
                            // a = myGrid.isRowSelected;


                            /*var rowCount = myGrid.totalCount();  // Gets the total row count. 
                            for (i = 0; i < rowCount; i++) {
                                var cell = myGrid.cellValue(i, "AccFullCode");
                                console.log("cell: ", cell);
                            }*/


                            dataGrid.cellValue(ro, "AccFullName", selectionChangedArgs.selectedRowsData[0].Name);
                            dataGrid.saveEditData();

                            //var dataSource = dataGrid.getDataSource();
                            //dataSource.store().insert(data).then(function () {
                            //    dataSource.reload();
                            //})

                            e.component.close();
                        }
                    },
                });
            },
        });
    }



    function dropDownBoxEditorName(cellElement, cellInfo) {
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
                            //ADocB[1].AccName = selectionChangedArgs.selectedRowsData[0].Name;
                            cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);

                            var dataGrid = $("#gridContainer").dxDataGrid("instance");

                            ro = cellInfo.key - 1;

                            // dataGrid.cellValue(0, 1, selectionChangedArgs.selectedRowsData[0].Name);
                            //dataGrid.saveEditData();

                            /* for (i = 0; i < dataGrid.totalCount(); i++) {
                                 var cell = dataGrid.cellValue(i, "MyFieldName");
                                 console.log("cell: ", cell);
                             }*/

                            //var myGrid = $("#gridContainer").dxDataGrid("instance");
                            //console.log("gridContainer:", myGrid);
                            // a = myGrid.isRowSelected;


                            /*var rowCount = myGrid.totalCount();  // Gets the total row count. 
                            for (i = 0; i < rowCount; i++) {
                                var cell = myGrid.cellValue(i, "AccFullCode");
                                console.log("cell: ", cell);
                            }*/


                            dataGrid.cellValue(ro, "AccFullCode", selectionChangedArgs.selectedRowsData[0].Code);
                            dataGrid.saveEditData();

                            //var dataSource = dataGrid.getDataSource();
                            //dataSource.store().insert(data).then(function () {
                            //    dataSource.reload();
                            //})

                            e.component.close();
                        }
                    },
                });
            },
        });
    }


















    function dropDownBoxEditorMkzName(cellElement, cellInfo) {
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
                            ro = cellInfo.key - 1;
                            dataGrid.cellValue(ro, "MkzCode", selectionChangedArgs.selectedRowsData[0].Code);
                            dataGrid.saveEditData();
                            e.component.close();
                        }
                    },
                });
            },
        });
    }


    function dropDownBoxEditorOprName(cellElement, cellInfo) {
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
                            ro = cellInfo.key - 1;
                            dataGrid.cellValue(ro, "OprCode", selectionChangedArgs.selectedRowsData[0].Code);
                            dataGrid.saveEditData();
                            e.component.close();
                        }
                    },
                });
            },
        });
    }


    function dropDownBoxEditorArzName(cellElement, cellInfo) {
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
                            ro = cellInfo.key - 1;
                            dataGrid.cellValue(ro, "ArzCode", selectionChangedArgs.selectedRowsData[0].Code);
                            dataGrid.saveEditData();
                            e.component.close();
                        }
                    },
                });
            },
        });
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

};

ko.applyBindings(new ViewModel());









