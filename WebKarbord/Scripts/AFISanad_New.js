
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

var RprtCols = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها

//Get getRprtCols_NewList List
function GetRprtCols_NewList() {
    ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + sessionStorage.userName, 'GET').done(function (data) {
        data = TranslateData(data);
        a = JSON.stringify(data)

        f = '['
       for (var i = 0; i < data.length; i++) {
            f += '{"dataField":"' + data[i].Code + '",' 
            f += '"caption":"' + data[i].Name + '"}';
            if (i < data.length-1)
            f += ','
        }
        f += ']'

        a = JSON.parse(f)
        CreateTableColumn(JSON.parse(f));

        //"[{"RprtId":"ADocB","UserCode":"ACE","Code":"AccFullCode","Type":6,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"کد حساب"},{"RprtId":"ADocB","UserCode":"ACE","Code":"AccFullName","Type":1,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"نام حساب"},{"RprtId":"ADocB","UserCode":"ACE","Code":"ArzCode","Type":2,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"کد ارز"},{"RprtId":"ADocB","UserCode":"ACE","Code":"ArzName","Type":1,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"نام ارز"},{"RprtId":"ADocB","UserCode":"ACE","Code":"ArzRate","Type":5,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"نرخ ارز"},{"RprtId":"ADocB","UserCode":"ACE","Code":"ArzValue","Type":5,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"مبلغ ارزی"},{"RprtId":"ADocB","UserCode":"ACE","Code":"BandNo","Type":4,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"شماره بند"},{"RprtId":"ADocB","UserCode":"ACE","Code":"BandSpec","Type":1,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"ملاحظات بند"},{"RprtId":"ADocB","UserCode":"ACE","Code":"Bank","Type":1,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"بانک"},{"RprtId":"ADocB","UserCode":"ACE","Code":"Bede","Type":5,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"بدهکار"},{"RprtId":"ADocB","UserCode":"ACE","Code":"Best","Type":5,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"بستانکار"},{"RprtId":"ADocB","UserCode":"ACE","Code":"CheckDate","Type":3,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"تاریخ چک"},{"RprtId":"ADocB","UserCode":"ACE","Code":"CheckNo","Type":6,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"شماره چک"},{"RprtId":"ADocB","UserCode":"ACE","Code":"Comm","Type":1,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"شرح"},{"RprtId":"ADocB","UserCode":"ACE","Code":"Jari","Type":1,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"جاری"},{"RprtId":"ADocB","UserCode":"ACE","Code":"MkzCode","Type":6,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"کد مرکز هزینه"},{"RprtId":"ADocB","UserCode":"ACE","Code":"MkzName","Type":1,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"نام مرکز هزینه"},{"RprtId":"ADocB","UserCode":"ACE","Code":"OprCode","Type":6,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"کد پروژه"},{"RprtId":"ADocB","UserCode":"ACE","Code":"OprName","Type":1,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"نام پروژه"},{"RprtId":"ADocB","UserCode":"ACE","Code":"Shobe","Type":1,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"شعبه"},{"RprtId":"ADocB","UserCode":"ACE","Code":"TrafFullCode","Type":6,"Visible":0,"Translate":1,"Prog":"Afi1","Name":"کد طرف چک"},{"RprtId":"ADocB","UserCode":"ACE","Code":"TrafFullName","Type":1,"Visible":1,"Translate":1,"Prog":"Afi1","Name":"نام طرف چک"}]"
        //"[{dataField: "AccFullCode",caption: "کد حساب"},{dataField: "AccFullName",caption: "نام حساب"},{dataField: "ArzCode",caption: "کد ارز"}]"
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
        columns: data,

        //    "[{dataField: "AccFullCode",caption: "کد حساب"},{dataField: "AccFullName",caption: "نام حساب"},{dataField: "ArzCode",caption: "کد ارز"},{dataField: "ArzName",caption: "نام ارز"},{dataField: "ArzRate",caption: "نرخ ارز"},{dataField: "ArzValue",caption: "مبلغ ارزی"},{dataField: "BandNo",caption: "شماره بند"},{dataField: "BandSpec",caption: "ملاحظات بند"},{dataField: "Bank",caption: "بانک"},{dataField: "Bede",caption: "بدهکار"},{dataField: "Best",caption: "بستانکار"},{dataField: "CheckDate",caption: "تاریخ چک"},{dataField: "CheckNo",caption: "شماره چک"},{dataField: "Comm",caption: "شرح"},{dataField: "Jari",caption: "جاری"},{dataField: "MkzCode",caption: "کد مرکز هزینه"},{dataField: "MkzName",caption: "نام مرکز هزینه"},{dataField: "OprCode",caption: "کد پروژه"},{dataField: "OprName",caption: "نام پروژه"},{dataField: "Shobe",caption: "شعبه"},{dataField: "TrafFullCode",caption: "کد طرف چک"},{dataField: "TrafFullName",caption: "نام طرف چک"}]"
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




