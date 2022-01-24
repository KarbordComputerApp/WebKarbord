
/*const  ADocB = [{
    ID: 1,
    FirstName: 'John',
    LastName: 'Heart',
    Prefix: 'Mr.',
    Position: 'CEO',
    BirthDate: '1964/03/16',
    HireDate: '1995/01/15',
    Notes: 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
    Address: '351 S Hill St.',
    StateID: 5,
}, {
    ID: 2,
    FirstName: 'Olivia',
    LastName: 'Peyton',
    Prefix: 'Mrs.',
    Position: 'Sales Assistant',
    BirthDate: '1981/06/03',
    HireDate: '2012/05/14',
    Notes: 'Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.',
    Address: '807 W Paseo Del Mar',
    StateID: 5,
    }];*/

var Acc;
var AccUri = server + '/api/Web_Data/Acc/'; // آدرس حساب ها

function getAccList() {
    var AccObject = {
        Mode: 1,
        UserCode: sessionStorage.userName,
    }

    ajaxFunction(AccUri + ace + '/' + sal + '/' + group, 'POST', AccObject, true).done(function (data) {
        Acc = data;
    });
}
getAccList();


var ADocB;
var ADocBUri = server + '/api/ADocData/ADocB/'; // آدرس بند سند 
function getADocB(serialNumber) {
    ajaxFunction(ADocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
        ADocB = data;
    });
}

getADocB(167);



/*
const  ADocB = [{
    ID: 1,
    FirstName: 'John',
    LastName: 'Heart',
    Prefix: 'Mr.',
    Position: 'CEO',
    BirthDate: '1964/03/16',
    HireDate: '1995/01/15',
    Notes: 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
    Address: '351 S Hill St.',
    StateID: 5,
}];
*/

const states = [{
    ID: 1,
    Name: 'Alabama',
}, {
    ID: 2,
    Name: 'Alaska',
}];


var rprtId = 'ADocB';

var RprtCols = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها

//Get getRprtCols_NewList List
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
                ',"lookup": {"dataSource": "Acc", "valueExpr": "Code", "displayExpr": "Code"},' +
                '"validationRules": [{ "type": "required" }],' +
                '"editCellTemplate": "dropDownBoxEditorTemplate"'
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
        if (cols[i].dataField == 'AccFullCode') {
            cols[i].editCellTemplate = dropDownBoxEditorTemplate;
        }
    }

    CreateTableColumn(cols);
}

GetRprtCols_NewList()

function CreateTableColumn(data) {
    const dataGrid = $('#gridContainer').dxDataGrid({
        dataSource:  ADocB,
        keyExpr: 'BandNo',
        showBorders: true,
        showRowLines: true,
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: false,

        columnChooser: {
            enabled: true,
        },
        columnFixing: {
            //     enabled: true,
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
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            selectTextOnEditStart: true,
            startEditAction: 'click',
        },
        columns: data

    }).dxDataGrid('instance');
    dataGrid.option('rtlEnabled', true);
}


function dropDownBoxEditorTemplate(cellElement, cellInfo) {
    return $('<div>').dxDropDownBox({
        dropDownOptions: { width: 500 },
        dataSource: Acc,
        value: cellInfo.value,
        valueExpr: 'Code',
        displayExpr: 'Code',
        contentTemplate(e) {
            return $('<div>').dxDataGrid({
                dataSource: Acc,
                remoteOperations: true,
                columns: ['SortCode', 'Code', 'Name'],
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
                        e.component.close();
                    }
                },
            });
        },
    });
}







