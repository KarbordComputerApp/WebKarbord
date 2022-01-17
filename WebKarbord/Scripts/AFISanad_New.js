
const employees = [{
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
}];

const states = [{
    ID: 1,
    Name: 'Alabama',
}, {
    ID: 2,
    Name: 'Alaska',
}];


var rprtId = 'ADocB';

var RprtCols_NewUri = server + '/api/Web_Data/RprtCols_New/'; // آدرس مشخصات ستون ها

//Get getRprtCols_NewList List
function GetRprtCols_NewList() {
    ajaxFunction(RprtCols_NewUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + sessionStorage.userName, 'GET').done(function (data) {
       // data = TranslateData(data);
       // a = JSON.stringify(data)
        CreateTableColumn(JSON.stringify(data))
    })
}

GetRprtCols_NewList()

function CreateTableColumn(data) {
    $('#gridContainer').dxDataGrid({
        dataSource: employees,
        keyExpr: 'ID',
        showBorders: true,
        paging: {
            enabled: true,
        },
        editing: {
            mode: 'batch',
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            selectTextOnEditStart: true,
            startEditAction: 'click',
        },
        columns: JSON.parse(data),
    //    [{"dataField":"AccFullCode","caption":"کد حساب","width":null,"Type":6},{"dataField":"AccFullName","caption":"نام حساب","width":null,"Type":1},{"dataField":"BandNo","caption":"شماره بند","width":null,"Type":4},{"dataField":"BandSpec","caption":"ملاحظات بند","width":null,"Type":1},{"dataField":"Bank","caption":"بانک","width":null,"Type":1},{"dataField":"Bede","caption":"بدهکار","width":null,"Type":5},{"dataField":"Best","caption":"بستانکار","width":null,"Type":5},{"dataField":"CheckDate","caption":"تاریخ چک","width":null,"Type":3},{"dataField":"CheckNo","caption":"شماره چک","width":null,"Type":6},{"dataField":"Comm","caption":"شرح","width":null,"Type":1},{"dataField":"MkzName","caption":"نام مرکز هزینه","width":null,"Type":1},{"dataField":"OprName","caption":"نام پروژه","width":null,"Type":1},{"dataField":"TrafFullName","caption":"نام طرف چک","width":null,"Type":1}],
        // [{ "dataField": "AccFullCode", "caption": "کد حساب", "width": 1000, "Type": 6 }]



           
            //'[{"DataField":"AccFullCode","Caption":"کد حساب","Width":100,"Type":6},{"DataField":"AccFullName","Caption":"نام حساب","Width":100,"Type":1},{"DataField":"BandNo","Caption":"شماره بند","Width":100,"Type":4},{"DataField":"BandSpec","Caption":"ملاحظات بند","Width":100,"Type":1},{"DataField":"Bank","Caption":"بانک","Width":100,"Type":1},{"DataField":"Bede","Caption":"بدهکار","Width":100,"Type":5},{"DataField":"Best","Caption":"بستانکار","Width":100,"Type":5},{"DataField":"CheckDate","Caption":"تاریخ چک","Width":100,"Type":3},{"DataField":"CheckNo","Caption":"شماره چک","Width":100,"Type":6},{"DataField":"Comm","Caption":"شرح","Width":100,"Type":1},{"DataField":"MkzName","Caption":"نام مرکز هزینه","Width":100,"Type":1},{"DataField":"OprName","Caption":"نام پروژه","Width":100,"Type":1},{"DataField":"TrafFullName","Caption":"نام طرف چک","Width":100,"Type":1}]',

            //data,
            /*[
            {
                dataField: 'Prefix',
                caption: FindTextField('BandNo', data),
               // width: 70,
            },
            'FirstName',
            'LastName', {
                dataField: 'Position',
                width: 170,
            }, {
                dataField: 'StateID',
                caption: 'State',
                width: 125,
                lookup: {
                    dataSource: states,
                    displayExpr: 'Name',
                    valueExpr: 'ID',
                },
            }, {
                dataField: 'BirthDate',
                dataType: 'date',
            },
        ],*/
    }).dxDataGrid('instance');
}




