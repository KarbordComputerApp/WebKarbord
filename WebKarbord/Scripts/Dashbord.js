var gridster = null;

var barColors = ["#ff2d2d", "#00ccff", "#00ffff", "#336600", "#ffcc00", "#ff9e3a", "#0033ff", "#6699cc", "#009999", "#171a9b", "#00a20b", "#11c0a9"];


var orgProgName = localStorage.getItem('OrgProgName');


/*
var groupsAcount;
if (ace == 'Web8') {
    groupsAcount = localStorage.getItem('afi8List');
}
else if (ace == 'Web1') {
    groupsAcount = localStorage.getItem('afi1List');
}

var orgProgName = localStorage.getItem('OrgProgName');

var GroupsObject = {
    ProgName: orgProgName,
    User: sessionStorage.userName,
    Groups: groups.replaceAll('-', ',')
}

ajaxFunction(server + '/api/Web_Data/Groups', 'POST', GroupsObject).done(function (data) {
    localStorage.setItem('afiList', JSON.stringify(data));
});

*/

/*
    $.widget("custom.colorize", {
        options: {
            red: 255,
            green: 0,
            blue: 0,
            change: null,
            random: null
        },


        _create: function () {
            this.element.addClass("custom-colorize");
            this.changer = $("<button>", {
                text: "change",
                "class": "custom-colorize-changer"
            })
                .appendTo(this.element)
                .button();

            this._on(this.changer, {
                click: "random"
            });
            this._refresh();
        },

        _refresh: function () {
            this.element.css("background-color", "rgb(" +
                this.options.red + "," +
                this.options.green + "," +
                this.options.blue + ")"
            );
            this._trigger("change");
        },

        random: function (event) {
            var colors = {
                red: Math.floor(Math.random() * 256),
                green: Math.floor(Math.random() * 256),
                blue: Math.floor(Math.random() * 256)
            };
            if (this._trigger("random", event, colors) !== false) {
                this.option(colors);
            }
        },

        _destroy: function () {
            this.changer.remove();

            this.element
                .removeClass("custom-colorize")
                .enableSelection()
                .css("background-color", "transparent");
        },

        _setOptions: function () {
            this._superApply(arguments);
            this._refresh();
        },

        _setOption: function (key, value) {
            if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
                return;
            }
            this._super(key, value);
        }
    });

    $("#my-widget1").colorize();

    $("#my-widget2").colorize({
        red: 60,
        blue: 60
    });

    $("#my-widget3").colorize({
        green: 128,
        random: function (event, ui) {
            return ui.green > 128;
        }
    });

    $("#disable").on("click", function () {
        // use the custom selector created for each widget to find all instances
        // all instances are toggled together, so we can check the state from the first
        if ($(":custom-colorize").colorize("option", "disabled")) {
            $(":custom-colorize").colorize("enable");
        } else {
            $(":custom-colorize").colorize("disable");
        }
    });

    $("#green").on("click", function () {
        $(":custom-colorize").colorize("option", {
            red: 64,
            green: 250,
            blue: 8
        });
    });
    */



var dayCheckPardakht = localStorage.getItem("dayCheckPardakht");
var dayCheckPardakht_Sum = localStorage.getItem("dayCheckPardakht_Sum");

var date_TarazFasli = localStorage.getItem("date_TarazFasli");
var mode_TarazFasli = localStorage.getItem("mode_TarazFasli");

var date_TrzFCust_S = localStorage.getItem("date_TrzFCust_S");
var date_TrzFCust_P = localStorage.getItem("date_TrzFCust_P");

var top_TrzFCust_S = localStorage.getItem("top_TrzFCust_S");
var top_TrzFCust_P = localStorage.getItem("top_TrzFCust_P");

var top_TrzFKala_S = localStorage.getItem("top_TrzFKala_S");
var mode_TrzFKala_S = localStorage.getItem("mode_TrzFKala_S");

dayCheckPardakht = dayCheckPardakht == null ? 3 : dayCheckPardakht;
dayCheckPardakht_Sum = dayCheckPardakht_Sum == null ? 3 : dayCheckPardakht_Sum;
date_TarazFasli = date_TarazFasli == null ? localStorage.getItem("BeginDateFct") : date_TarazFasli;
mode_TarazFasli = mode_TarazFasli == null ? 0 : mode_TarazFasli;

date_TrzFCust_S = date_TrzFCust_S == null ? localStorage.getItem("BeginDateFct") : date_TrzFCust_S;
date_TrzFCust_P = date_TrzFCust_P == null ? localStorage.getItem("BeginDateFct") : date_TrzFCust_P;

top_TrzFCust_S = top_TrzFCust_S == null ? 10 : top_TrzFCust_S;
top_TrzFCust_P = top_TrzFCust_P == null ? 10 : top_TrzFCust_P;

top_TrzFKala_S = top_TrzFKala_S == null ? 10 : top_TrzFKala_S;
mode_TrzFKala_S = mode_TrzFKala_S == null ? 0 : mode_TrzFKala_S;





var dashbordData = [];
//localStorage.removeItem("Karbord_DashbordData");
var dashbordData_Save = localStorage.getItem("Karbord_DashbordData");

/*
dashbordData_Save = `[
{"id":"TChk-1","valueControl":{"day":"555555"},"position":{"x":0,"y":0,"w":3,"h":3},"caption":"چک های پرداختی 1","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}},
{"id":"TChk-2","valueControl":{"day":"700000"},"position":{"x":3,"y":0,"w":4,"h":3},"caption":"چک های پرداختی 2","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}},
{"id":"TChk-3","valueControl":{"day":"220000"},"position":{"x":7,"y":0,"w":5,"h":3},"caption":"چک های پرداختی 3","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}}
]`;

dashbordData_Save = `[{"id":"TChk-1","valueControl":{"day":"5000500"},"position":{"x":8,"y":0,"w":4,"h":3},"caption":"چک های پرداختی - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}},{"id":"TChk-2","valueControl":{"day":"50000"},"position":{"x":4,"y":0,"w":4,"h":3},"caption":"چک های پرداختی - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}}]`;
*/


if (dashbordData_Save != null && dashbordData_Save.toString() != "null" && dashbordData_Save.toString() != "") {
    dashbordData = JSON.parse(dashbordData_Save);
}


window.onbeforeunload = function () {
    var myJsonString = JSON.stringify(dashbordData)
    localStorage.setItem("Karbord_DashbordData", myJsonString);
};


let grid = GridStack.init({
    cellHeight: 'initial', // start square but will set to % of window width later
    animate: true, // show immediate (animate: true is nice for user dragging though)
    disableOneColumnMode: true, // will manually do 1 column
    float: true
});

var cols = '';
$("#TableDesktopItem").empty();
for (var i = 0; i < dashbordData.length; i++) {
    AddIteminGrid(dashbordData[i]);
}


$('#modal-DesktopItem').on('show.bs.modal', function () {
    cols = '';
    $("#TableDesktopItem").empty();
    for (var i = 0; i < dashbordData.length; i++) {
        var item = dashbordData[i];
        id = item.id;
        col = ' <tr id="Obj_' + id + '"> ' +
            '    <td id="Text_' + id + '">' + item.caption + '</td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input class="CheckedItem" id = "Setting_' + id + '" type = "checkbox" ' + (item.visible == false ? "" : 'Checked="checked"') + '/>' +
            '    </td > ' +
            '</tr> ';
        $('#TableDesktopItem').append(col);
    }
});




function AddIteminGrid(itemObject) {
    id = itemObject.id;
    var object = $('<div id="widget_' + id + '">');
    $("#objectGrid").append(object);

    if (id.contains("TChk_Sum")) {
        $("#widget_" + id).D_TChk_Sum({
            id: id,
            caption: itemObject.caption,
            visible: itemObject.visible,
            baseValue: itemObject.baseValue,
            valueControl: itemObject.valueControl,
            position: itemObject.position,
        });
    }
    else if (id.contains("TChk")) {
        $("#widget_" + id).D_TChk({
            id: id,
            caption: itemObject.caption,
            visible: itemObject.visible,
            baseValue: itemObject.baseValue,
            valueControl: itemObject.valueControl,
            position: itemObject.position,
        });
    } else if (id.contains("TrzFCust")) {
        $("#widget_" + id).D_TrzFCust({
            id: id,
            caption: itemObject.caption,
            visible: itemObject.visible,
            baseValue: itemObject.baseValue,
            valueControl: itemObject.valueControl,
            position: itemObject.position,
        });
    }
}



var listModeDesktop = [
    { value: "TChk_Sum", text: "صورت خلاصه چک های پرداختی" },
    { value: "TarazFasli", text: "نمودار فروش" },
    { value: "TrzFCust_S", text: "مانده حساب خریداران" },
    { value: "TrzFCust_P", text: "مانده حساب فروشندگان" },
    { value: "TrzFKala_S", text: "بیشترین فروش کالا" },
    { value: "TChk", text: "چک های پرداختی" }
]

for (var i = 0; i < listModeDesktop.length; i++) {
    $('#ModeDesktopItem').append($('<option>', { value: listModeDesktop[i].value, text: listModeDesktop[i].text }));
}


$('#modal-DesktopAddItem').on('show.bs.modal', function () {
    $("#CaptionItem").val(listModeDesktop[0].text + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem').val());
})

$("#ModeDesktopItem").change(function () {
    var value = $(this).val();
    for (var i = 0; i < listModeDesktop.length; i++) {
        if (listModeDesktop[i].value == value) {
            $("#CaptionItem").val(listModeDesktop[i].text + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
        }
    }
});


var listGroups = localStorage.getItem('afiList');
listGroups = JSON.parse(listGroups);

for (var i = 0; i < listGroups.length; i++) {
    $('#GroupDesktopItem').append($('<option>', { value: listGroups[i].Code, text: listGroups[i].Code + " - " + listGroups[i].Name }));
}
SetSalData();


$("#GroupDesktopItem").change(function () {
    SetSalData();
    $("#CaptionItem").val($("#ModeDesktopItem option:selected").text() + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
});

$("#SalDesktopItem").change(function () {
    $("#CaptionItem").val($("#ModeDesktopItem option:selected").text() + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
});


function SetSalData() {
    var programSelect = ace;
    var GroupSelect = $("#GroupDesktopItem").val();
    $("#SalDesktopItem").empty();
    //$("#SalDesktopItem").append('<option value="0">' + translate('انتخاب کنید') + '</option>');
    if (programSelect != 0 && GroupSelect != 0 && GroupSelect != null) {
        progName = ace == 'Web1' ? 'Afi1' : orgProgName;

        var DatabseSalObject = {
            ProgName: progName,
            Group: GroupSelect,
            UserCode: sessionStorage.userName
        }

        ajaxFunction(DatabseSalUrl, 'Post', DatabseSalObject).done(function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#SalDesktopItem').append($('<option>', { value: data[i].Code, text: data[i].Name }));
                }
                $("#SalDesktopItem").val(data[i - 1].Code);
            }
        });
    }
}


$("#SaveItem").click(function () {
    var modeItem = $("#ModeDesktopItem").val();
    var captionItem = $("#CaptionItem").val();
    var groupDesktopItem = $("#GroupDesktopItem").val();
    var salDesktopItem = $("#SalDesktopItem").val();

    var lastItems = dashbordData.filter(o => o.id.contains(modeItem));
    var index = lastItems.length + 1;
    var idItem = modeItem + "-" + index;
    var item = {};
    if (modeItem == "TChk") {
        item = {
            "id": idItem,
            "valueControl": {
                "day": "10"
            },
            "position": {
                "x": 0,
                "y": 0,
                "w": 4,
                "h": 3
            },
            "caption": captionItem,
            "visible": true,
            "baseValue": {
                "ace": ace,
                "group": groupDesktopItem,
                "sal": salDesktopItem
            }
        };
    }
    else if (modeItem == "TChk_Sum") {
        item = {
            "id": idItem,
            "valueControl": {
                "day": "10000000"
            },
            "position": {
                "x": 0,
                "y": 0,
                "w": 4,
                "h": 3
            },
            "caption": captionItem,
            "visible": true,
            "baseValue": {
                "ace": ace,
                "group": groupDesktopItem,
                "sal": salDesktopItem
            }
        };
    } else if (modeItem == "TrzFCust_S") {
        item = {
            "id": idItem,
            "valueControl": {
                "top": 10,
                "fromDate": "1384/01/01",//localStorage.getItem("BeginDateFct"),
                "modeItem": "S"
            },
            "position": {
                "x": 0,
                "y": 0,
                "w": 4,
                "h": 3
            },
            "caption": captionItem,
            "visible": true,
            "baseValue": {
                "ace": ace,
                "group": groupDesktopItem,
                "sal": salDesktopItem
            }
        };
    } else if (modeItem == "TrzFCust_P") {
        item = {
            "id": idItem,
            "valueControl": {
                "top": 10,
                "fromDate": "1384/01/01",//localStorage.getItem("BeginDateFct"),
                "modeItem": "P"
            },
            "position": {
                "x": 0,
                "y": 0,
                "w": 4,
                "h": 3
            },
            "caption": captionItem,
            "visible": true,
            "baseValue": {
                "ace": ace,
                "group": groupDesktopItem,
                "sal": salDesktopItem
            }
        };
    }
    dashbordData.push(item);
    AddIteminGrid(item);

    var col = ' <tr id="Obj_' + item.id + '"> ' +
        '    <td id="Text_' + item.id + '">' + item.caption + '</td> ' +
        '    <td style="padding: 0px 10px;text-align: left;"> ' +
        '        <input class="CheckedItem" id = "Setting_' + item.id + '" type = "checkbox" ' + (item.visible == false ? "" : 'Checked="checked"') + '/>' +
        '    </td > ' +
        '</tr> ';

    $('#TableDesktopItem').append(col);

    $('#modal-DesktopAddItem').modal('hide');
});



$("#SaveItems").click(function () {
    var obj = [];
    var items = $('.CheckedItem');

    for (i = 0; i < items.length; i++) {
        var item = $(items[i]);
        var idItem = items[i].id.substring(8);
        var itemData = dashbordData.find(c => c.id == idItem);
        itemData.visible = item.is(':checked') == true;
        $("#" + idItem).css("visibility", item.is(':checked') == true ? "visible" : "hidden");
    }

    dashbordData_Save = JSON.stringify(dashbordData)
    localStorage.setItem("Karbord_DashbordData", dashbordData_Save);
    $('#modal-DesktopItem').modal('hide');

});








/*
grid.on('change', function (event, items) {

});*/

/*
let items = [
    { x: 1, y: 1 }, //, locked:true, content:"locked"},
    { x: 2, y: 2, w: 3 },
    { x: 4, y: 2 },
    { x: 3, y: 1, h: 2 },
    { x: 0, y: 6, w: 2, h: 2 }
];
let count = 0;

getNode = function () {
    let n = items[count] || {
        x: Math.round(12 * Math.random()),
        y: Math.round(5 * Math.random()),
        w: Math.round(1 + 3 * Math.random()),
        h: Math.round(1 + 3 * Math.random())
    };
    n.content = n.content || String(count);
    count++;
    return n;
};

addNewWidget = function () {
    let w = grid.addWidget(getNode());
};

makeNewWidget = function () {
    let n = getNode();
    let doc = document.implementation.createHTMLDocument();
    doc.body.innerHTML = `<div class="item" gs-x="${n.x}" gs-y="${n.y}" gs-w="${n.w || 1}" gs-h="${n.h || 1}"><div class="grid-stack-item-content">${n.content}</div></div>`;
    let el = doc.body.children[0];
    grid.el.appendChild(el);
    // example showing when DOM is created elsewhere (eg Angular/Vue/React) and GS is used to convert to a widget
    let w = grid.makeWidget(el);
};

toggleFloat = function () {
    grid.float(!grid.getFloat());
    document.querySelector('#float').innerHTML = 'float: ' + grid.getFloat();
};
addNewWidget();
*/

/*
$("#my-widget1").D_TChk({
    id: "TChk1",
    caption: "چک های پرداختی 1",
    baseValue: {
        ace: ace,
        group: group,
        sal: sal
    },
    valueControl: {
        day: 100000
    },
    position: {
        x: 0,
        y: 0,
        w: 3,
        h: 4
    },
    SaveModal: function (e, record, f) {
        a = 1;
    },
    Refresh: function (e, record, f) {
        a = 1;
    },
});

$("#my-widget2").D_TChk({
    id: "TChk2",
    caption: "چک های پرداختی 2",
    baseValue: {
        ace: ace,
        group: group,
        sal: sal
    },
    position: {
        x: 3,
        y: 0,
        w: 3,
        h: 4
    },

    SaveModal: function (e, record, f) {
        a = 1;
    },
    Refresh: function (e, record, f) {
        a = 1;
    },
});


var dD = [];

var D_TChk =
    `                <div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" gs-id="D_TChk">
                    <div class="grid-stack-item-content" style="background-color:white">
                        <div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;">
                            <h4 class="modal-title" data-bind="text:translate('چک های پرداختی')"></h4>
                            <div>
                                <a id="SD_TChk" class="dropdown-toggle" data-toggle="modal" data-backdrop="static" data-target="#modal-SD_TChk">
                                    <img src="/Content/img/streamline-icon-cog-1@48x48.png" width="20" height="20">
                                </a>
                                <a id="RD_TChk">
                                    <img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20">
                                </a>
                            </div>
                        </div>

                        <div class="form-inline" style="padding:10px">

                            <div class="form-inline" style="margin-left:auto">
                                <h4>مجموع : </h4>
                                <h4 id="Sum_D_TChk" style="padding-right:5px">0</h4>
                            </div>

                            <div class="form-inline" style="margin-right:auto">
                                <h4>تعداد : </h4>
                                <h4 id="Count_D_TChk" style="padding-right:5px">0</h4>
                            </div>
                        </div>
                        <table class="table table-hover">
                            <tbody data-bind="foreach: TChkList">
                                <tr>
                                    <td style="width:0px">
                                        <center>
                                            <img data-bind="attr:{src: $root.GetIconBank(Bank)}" src="" width="35" />
                                            <p data-bind="text:Shobe" style="color: darkgray;"></p>
                                        </center>
                                    </td>
                                    <td>
                                        <div>
                                            <h5 data-bind="text:TrafName" style="padding-right:5px"></h5>
                                            <h5 style="padding-right:5px">حسین</h5>
                                            <h5 data-bind="text:'چک : ' + CheckNo" style="padding-right:5px;padding-top: 10px;"></h5>
                                        </div>
                                    </td>
                                    <td style="width:0px">
                                        <center>
                                            <h5 data-bind="text:NumberToNumberString(Value)" style="text-align:center"></h5>
                                            <div data-bind="text:CheckDate" style=" border: 1px solid red;border-radius: 4px;color: red;padding: 2px 0; width: 80px; text-align: center; margin-bottom: 0.25rem;"></div>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
*/


//function LoadDashbord() {

// dashbordData.add({ "x": 8, "y": 0, "w": 4, "h": 3, "id": "D_TChk", "content": D_TChk });
// grid.load(dashbordData);

/*    data = localStorage.getItem("dashbordData");
    if (data != null) {
        dashbordData = JSON.parse(data);
        nodes = grid.save();
        for (var i = 0; i < dashbordData.length; i++) {
            element = $(".grid-stack").find(`[gs-id='${dashbordData[i].id}']`)
            html = element[0].innerHTML.replaceAll('grid-stack-item-content', '');
            dashbordData[i].content = D_TChk;
        }
        grid.load(dashbordData);
    }*/
//}
/*
LoadDashbord();


function SaveDashbord() {
    dashbordData = [];
    dashbordData = grid.save();
    for (var i = 0; i < dashbordData.length; i++) {
        dashbordData[i].content = null;
    }
    localStorage.setItem("dashbordData", JSON.stringify(dashbordData))
}

*/



/*
function LoadDashbord() {
    data = localStorage.getItem("dashbordData");
    if (data != null) {
        grid.removeAll();
        dashbordData = JSON.parse(data);
        grid.load(dashbordData, true); 
    }
}


LoadDashbord();


function SaveDashbord() {
    dashbordData = [];
    dashbordData = grid.save();
    localStorage.setItem("dashbordData", JSON.stringify(dashbordData))
}



window.onbeforeunload = function () {
    SaveDashbord();
};

*/




var ViewModel = function () {
    var self = this;

    var aceList = [];
    var afi1List = [];
    var afi8List = [];
    var afiList = [];
    var erjList = [];

    var DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
    self.DatabseSalList = ko.observableArray([]); // دیتابیس های سال

    $('#information').hide();

    if (sessionStorage.userName != 'ACE') {
        $('#show_RepairDatabaseConfig').hide();
        $('#show_RepairDatabase').hide();
    }


    /*
        var now = new Date();
        var version = now.getFullYear().toString() + "0" + now.getMonth() + "0" + now.getDate();
        //"0" + now.getHours();
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://app.najva.com/static/css/local-messaging.css" + "?v=" + version;
        head.appendChild(link);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://app.najva.com/static/js/scripts/174-website-27295-a0b970d7-1466-49f3-bf2b-1cfa6674e8e9.js" + "?v=" + version;
        head.appendChild(script);
        */

    /*
    if (afiaccess[AP_TChk] && ShowMenu[AC_TChk]) {

        var TChkUri = server + '/api/ReportAcc/TChk/'; // آدرس گزارش 

        self.TChkList = ko.observableArray([]); // لیست گزارش 

        function getTChk() {
            var TChkObject = {
                azTarikh: LowDay(dayCheckPardakht),
                taTarikh: "",
                azShomarh: "",
                taShomarh: "",
                AccCode: "",
                PDMode: "1",
                CheckStatus: "1",
            };
            ajaxFunction(TChkUri + ace + '/' + sal + '/' + group, 'POST', TChkObject, true).done(function (response) {
                self.TChkList(response);
                $("#Count_D_TChk").text(response.length);
                sum = 0;
                for (var i = 0; i < response.length; i++) {
                    sum += response[i].Value
                }
                $("#Sum_D_TChk").text(NumberToNumberString(sum));

            });
        }

        getTChk();

        $('#RD_TChk').click(function () {
            Swal.fire({
                title: mes_Refresh,
                text: translate("لیست چک های پرداختی به روز رسانی شود ؟"),
                type: 'info',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    getTChk();
                }
            })
        })



        $('#modal-SD_TChk').on('show.bs.modal', function () {
            $('#SD_TChk_Day').val(dayCheckPardakht);
        })

        $('#SD_TChk_Save').click(function () {
            day = $('#SD_TChk_Day').val();


            if (day == '') {
                day = 1;
            }
            day = parseInt(day);

            if (day < 1) {
                day = 1;
            }
            if (day > 10000000) {
                day = 10000000;
            }

            localStorage.setItem("dayCheckPardakht", day);
            dayCheckPardakht = day;
            $('#modal-SD_TChk').modal('hide');
            getTChk();
        })

    } else {
        element = $(".grid-stack").find(`[gs-id='D_TChk']`);
        $(element).empty();
    }







    if (afiaccess[AP_TChk] && ShowMenu[AC_TChk]) {


        var TChk_SumUri = server + '/api/ReportAcc/TChk_Sum/'; // آدرس گزارش 

        self.TChk_SumList = ko.observableArray([]); // لیست گزارش 

        function getTChk_Sum() {
            var TChk_SumObject = {
                azTarikh: LowDay(dayCheckPardakht_Sum),
                taTarikh: "",
            };
            ajaxFunction(TChk_SumUri + ace + '/' + sal + '/' + group, 'POST', TChk_SumObject, true).done(function (response) {
                self.TChk_SumList(response);
                sum = 0;
                for (var i = 0; i < response.length; i++) {
                    sum += response[i].Value
                }
                $("#Sum_D_TChk_Sum").text(NumberToNumberString(sum));
            });
        }

        getTChk_Sum();

        $('#RD_TChk_Sum').click(function () {
            Swal.fire({
                title: mes_Refresh,
                text: translate("لیست صورت خلاصه چک های پرداختی به روز رسانی شود ؟"),
                type: 'info',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    getTChk_Sum();
                }
            })
        })


        $('#modal-SD_TChk_Sum').on('show.bs.modal', function () {
            $('#SD_TChk_Sum_Day').val(dayCheckPardakht_Sum);
        })

        $('#SD_TChk_Sum_Save').click(function () {
            day = $('#SD_TChk_Sum_Day').val();


            if (day == '') {
                day = 1;
            }
            day = parseInt(day);

            if (day < 1) {
                day = 1;
            }
            if (day > 10000000) {
                day = 10000000;
            }

            localStorage.setItem("dayCheckPardakht_Sum", day);
            dayCheckPardakht_Sum = day;
            $('#modal-SD_TChk_Sum').modal('hide');
            getTChk_Sum();
        })


    } else {
        element = $(".grid-stack").find(`[gs-id='D_TChk_Sum']`);
        $(element).empty();
    }





    // به دلیل نداشتن دسترسی فعلا از تزار فروش کالا استفاده شده است
    if (afiaccess[AP_TrzFKala_S] && ShowMenu[AC_TrzFKala_S]) {

        var TrzFDorehUri = server + '/api/ReportFct/TrzFDoreh/'; // آدرس گزارش 

        var trzFDoreh_labels = [];
        var trzFDoreh_data = [];
        var trzFDoreh_Chart = null;

        function getTrzFDoreh() {
            var TrzFDorehObject = {
                azTarikh: date_TarazFasli,
                taTarikh: LowDay(0),
                mode: mode_TarazFasli,
            };
            ajaxFunction(TrzFDorehUri + ace + '/' + sal + '/' + group, 'POST', TrzFDorehObject, false).done(function (response) {
                trzFDoreh_labels = []
                trzFDoreh_data = []
                sum = 0;
                for (var i = 0; i < response.length; i++) {
                    trzFDoreh_labels[i] = response[i].docdate;
                    trzFDoreh_data[i] = response[i].totalvalue;
                    sum += response[i].totalvalue
                }
                $("#Sum_D_TarazFasli").text(NumberToNumberString(sum) + ' ریال');
                $("#Title_D_TarazFasli").text(date_TarazFasli + ' - ' + LowDay(0));

                if (trzFDoreh_Chart != null) {
                    updateTrzFDoreh_Chart(trzFDoreh_Chart, trzFDoreh_labels, trzFDoreh_data);
                }

            });
        }

        getTrzFDoreh();

        function updateTrzFDoreh_Chart(chart, lable, data) {
            chart.
                data = {
                    labels: lable,
                    datasets: [{
                        label: '',
                        data: data,
                        backgroundColor: "#ff2d2d",
                        borderWidth: 1
                    }]
                },
                options = {
                    animation: false,
                    responsive: true,
                    responsiveAnimationDuration: 0,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    value = (value / 1000000).toFixed(0);
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.yLabel.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                            }
                        }
                    }
                }


            chart.update();
        }

        trzFDoreh_Chart = new Chart("trzFDoreh_Chart", {
            type: 'bar',
            data: {
                labels: trzFDoreh_labels,
                datasets: [{
                    label: '',
                    data: trzFDoreh_data,
                    backgroundColor: "#ff2d2d",
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                responsive: true,
                responsiveAnimationDuration: 0,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                value = (value / 1000000).toFixed(0);
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return tooltipItem.yLabel.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                        }
                    }
                }
            }
        });


        $('#btnTarazFasli_Date').click(function () {
            $('#SD_TarazFasli_Date').change();
        });

        $('#modal-SD_TarazFasli').on('show.bs.modal', function () {
            $('#SD_TarazFasli_Date').val(date_TarazFasli);
            $('#TarazFasli_Mode').val(mode_TarazFasli);
        })

        if (mode_TarazFasli != '2') {
            $('#PSD_TarazFasli_Date').hide();
        }

        $('#TarazFasli_Mode').change(function () {
            $('#PSD_TarazFasli_Date').hide();
            val = $(this).val();
            if (val == '2') {
                $('#PSD_TarazFasli_Date').show();
            }
        })

        $('#SD_TarazFasli_Save').click(function () {
            date = $('#SD_TarazFasli_Date').val().toEnglishDigit();
            mode = $('#TarazFasli_Mode').val();

            localStorage.setItem("mode_TarazFasli", mode);
            mode_TarazFasli = mode;

            localStorage.setItem("date_TarazFasli", date);
            date_TarazFasli = date;


            $('#modal-SD_TarazFasli').modal('hide');
            getTrzFDoreh();
        })


        $('#RD_TarazFasli').click(function () {
            Swal.fire({
                title: mes_Refresh,
                text: translate("نمودار فروش به روز رسانی شود ؟"),
                type: 'info',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    getTrzFDoreh();
                }
            })
        })

    } else {
        element = $(".grid-stack").find(`[gs-id='D_TarazFasli']`);
        $(element).empty();
    }









    if (afiaccess[AP_TrzFCust_S] && ShowMenu[AC_TrzFCust_S]) {

        var TrzFCust_SUri = server + '/api/ReportFct/TrzFCust/'; // آدرس گزارش 

        self.TrzFCust_SList = ko.observableArray([]); // لیست گزارش 

        $('#btnTrzFCust_S_Date').click(function () {
            $('#SD_TrzFCust_S_Date').change();
        });


        function getTrzFCust_S() {
            var TrzFCust_SObject = {
                ModeCode1: sessionStorage.MODECODE_FDOC_S,
                ModeCode2: sessionStorage.MODECODE_FDOC_SR,
                azTarikh: date_TrzFCust_S,
                taTarikh: LowDay(0),
                azShomarh: "",
                taShomarh: "",
                CustCode: "",
                CGruCode: "",
                MkzCode: "",
                OprCode: "",
                InvCode: "",
                StatusCode: "موقت*تایید*تصویب",
                ZeroValue: "0",
                KGruCode: "",
                KalaCode: "",
                Top: top_TrzFCust_S,
            };

            ajaxFunction(TrzFCust_SUri + ace + '/' + sal + '/' + group, 'POST', TrzFCust_SObject, true).done(function (response) {
                $("#Count_D_TrzFCust_S").text(response.length);
                self.TrzFCust_SList(response);
                sum = 0;
                for (var i = 0; i < response.length; i++) {
                    sum += response[i].AccMon
                }
                $("#Sum_D_TrzFCust_S").text(NumberToNumberString(sum) + ' ریال');
            });
        }

        getTrzFCust_S();

        self.GetIconCustomer = function (code) {
            return '/Content/img/profile.png'
        }

        $('#RD_TrzFCust_S').click(function () {
            Swal.fire({
                title: mes_Refresh,
                text: translate("لیست مانده حساب خریداران به روز رسانی شود ؟"),
                type: 'info',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    getTrzFCust_S();
                }
            })
        })


        $('#modal-SD_TrzFCust_S').on('show.bs.modal', function () {
            $('#SD_TrzFCust_S_Date').val(date_TrzFCust_S);
            $('#TrzFCust_S_Top').val(top_TrzFCust_S);
        })

        $('#SD_TrzFCust_S_Save').click(function () {
            date_TrzFCust_S = $('#SD_TrzFCust_S_Date').val().toEnglishDigit();
            localStorage.setItem("date_TrzFCust_S", date_TrzFCust_S);

            top_TrzFCust_S = $('#TrzFCust_S_Top').val();
            localStorage.setItem("top_TrzFCust_S", top_TrzFCust_S);


            $('#modal-SD_TrzFCust_S').modal('hide');
            getTrzFCust_S();
        })

    } else {
        element = $(".grid-stack").find(`[gs-id='D_TrzFCust_S']`);
        $(element).empty();
    }



    if (afiaccess[AP_TrzFCust_P] && ShowMenu[AC_TrzFCust_P]) {

        var TrzFCust_PUri = server + '/api/ReportFct/TrzFCust/'; // آدرس گزارش 

        self.TrzFCust_PList = ko.observableArray([]); // لیست گزارش 

        $('#btnTrzFCust_P_Date').click(function () {
            $('#SD_TrzFCust_P_Date').change();
        });


        function getTrzFCust_P() {
            var TrzFCust_PObject = {
                ModeCode1: sessionStorage.MODECODE_FDOC_P,
                ModeCode2: sessionStorage.MODECODE_FDOC_PR,
                azTarikh: date_TrzFCust_P,
                taTarikh: LowDay(0),
                azShomarh: "",
                taShomarh: "",
                CustCode: "",
                CGruCode: "",
                MkzCode: "",
                OprCode: "",
                InvCode: "",
                StatusCode: "موقت*تایید*تصویب",
                ZeroValue: "0",
                KGruCode: "",
                KalaCode: "",
                Top: top_TrzFCust_P,
            };

            ajaxFunction(TrzFCust_PUri + ace + '/' + sal + '/' + group, 'POST', TrzFCust_PObject, true).done(function (response) {
                $("#Count_D_TrzFCust_P").text(response.length);
                self.TrzFCust_PList(response);
                sum = 0;
                for (var i = 0; i < response.length; i++) {
                    sum += response[i].AccMon
                }
                $("#Sum_D_TrzFCust_P").text(NumberToNumberString(sum) + ' ریال');
            });
        }

        getTrzFCust_P();

        self.GetIconCustomer = function (code) {
            return '/Content/img/profile.png'
        }

        $('#RD_TrzFCust_P').click(function () {
            Swal.fire({
                title: mes_Refresh,
                text: translate("لیست مانده حساب فروشندگان به روز رسانی شود ؟"),
                type: 'info',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    getTrzFCust_P();
                }
            })
        })


        $('#modal-SD_TrzFCust_P').on('show.bs.modal', function () {
            $('#SD_TrzFCust_P_Date').val(date_TrzFCust_P);
            $('#TrzFCust_P_Top').val(top_TrzFCust_P);
        })

        $('#SD_TrzFCust_P_Save').click(function () {
            date_TrzFCust_P = $('#SD_TrzFCust_P_Date').val().toEnglishDigit();
            localStorage.setItem("date_TrzFCust_P", date_TrzFCust_P);

            top_TrzFCust_P = $('#TrzFCust_P_Top').val();
            localStorage.setItem("top_TrzFCust_P", top_TrzFCust_P);



            $('#modal-SD_TrzFCust_P').modal('hide');
            getTrzFCust_P();
        })

    }
    else {
        element = $(".grid-stack").find(`[gs-id='D_TrzFCust_P']`);
        $(element).empty();
    }















    if (afiaccess[AP_TrzFKala_S] && ShowMenu[AC_TrzFKala_S]) {


        var TrzFKala_SUri = server + '/api/ReportFct/TrzFKala/';

        var TrzFKala_S_labels = [];
        var TrzFKala_S_data = [];
        var trzFKala_S_Chart = null;

        function getTrzFKala_S() {
            var TrzFKala_SObject = {
                ModeCode1: sessionStorage.MODECODE_FDOC_S,
                ModeCode2: sessionStorage.MODECODE_FDOC_SR,
                azTarikh: "",
                taTarikh: LowDay(0),
                azShomarh: "",
                taShomarh: "",
                CustCode: "",
                CGruCode: "",
                MkzCode: "",
                OprCode: "",
                InvCode: "",
                StatusCode: "موقت*تایید*تصویب",
                ZeroValue: "0",
                KGruCode: "",
                KalaCode: "",
                Top: top_TrzFKala_S,
                Sort: "TotalPrice desc"
            };

            ajaxFunction(TrzFKala_SUri + ace + '/' + sal + '/' + group, 'POST', TrzFKala_SObject, false).done(function (response) {
                TrzFKala_S_labels = []
                TrzFKala_S_data = []
                sum = 0;
                for (var i = 0; i < response.length; i++) {
                    TrzFKala_S_labels[i] = response[i].KalaCode + ' - ' + response[i].KalaName;
                    TrzFKala_S_data[i] = response[i].TotalPrice;
                    sum += response[i].TotalPrice
                }
                $("#Sum_D_TrzFKala_S").text(NumberToNumberString(sum) + ' ریال');
                $("#Title_D_TrzFKala_S").text("" + ' - ' + LowDay(0));

                if (trzFKala_S_Chart != null) {
                    updateTrzFKala_S_Chart(trzFKala_S_Chart, TrzFKala_S_labels, TrzFKala_S_data);
                }

            });
        }

        getTrzFKala_S();

        function updateTrzFKala_S_Chart(chart, lable, data) {
            chart.data = {
                labels: lable,
                datasets: [{
                    data: data,
                    backgroundColor: barColors,
                    borderWidth: 1
                }]
            }

            chart.update();
        }

        trzFKala_S_Chart = new Chart("TrzFKala_S_Chart", {
            type: 'doughnut',
            data: {
                labels: TrzFKala_S_labels,
                datasets: [{
                    //label: 'فروش',
                    data: TrzFKala_S_data,
                    backgroundColor: barColors,
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                responsive: true,
                responsiveAnimationDuration: 0,
                legend: {
                    position: 'right',
                    align: 'center',
                    fullWidth: true,
                    reverse: false,
                    PointStyle: 'Cross',
                    //onHover: handleHover,
                    //onLeave: handleLeave
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            value = data['datasets'][0]['data'][tooltipItem['index']];
                            lable = data['labels'][tooltipItem['index']];
                            return lable + '  ' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                        }
                    }
                }
            }
        });


        $('#modal-SD_TrzFKala_S').on('show.bs.modal', function () {
            $('#TrzFKala_S_Top').val(top_TrzFKala_S);
            $('#TrzFKala_S_Mode').val(mode_TrzFKala_S);
        })


        $('#SD_TrzFKala_S_Save').click(function () {

            mode_TrzFKala_S = $('#TrzFKala_S_Mode').val();
            localStorage.setItem("mode_TrzFKala_S", mode_TrzFKala_S);

            top_TrzFKala_S = $('#TrzFKala_S_Top').val();
            if (top_TrzFKala_S > 10 || top_TrzFKala_S <= 0) {
                return showNotification(translate('حداکثر 10 رکورد'), 0)
            }
            localStorage.setItem("top_TrzFKala_S", top_TrzFKala_S);

            $('#modal-SD_TrzFKala_S').modal('hide');
            getTrzFKala_S();
        })


        $('#RD_TrzFKala_S').click(function () {
            Swal.fire({
                title: mes_Refresh,
                text: translate("نمودار بیشترین فروش کالا به روز رسانی شود ؟"),
                type: 'info',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,

                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    getTrzFKala_S();
                }
            })
        })

    } else {
        element = $(".grid-stack").find(`[gs-id='D_TrzFKala_S']`);
        $(element).empty();
    }


*/


};


ko.applyBindings(new ViewModel());


function GetIconBank(Bank) {
    res = '';

    if (Bank.includes("انصار"))
        res = "ansar"
    else if (Bank.includes("پاسارگاد"))
        res = "asargad"
    else if (Bank.includes("آینده"))
        res = "ayandeh"
    else if (Bank.includes("دی"))
        res = "day"
    else if (Bank.includes("اقتصاد"))
        res = "eghtesad"
    else if (Bank.includes("گردشگری"))
        res = "gardesh"
    else if (Bank.includes("حکمت"))
        res = "hekmat"
    else if (Bank.includes("آفرین"))
        res = "karafarin"
    else if (Bank.includes("کشاورزی"))
        res = "keshavarzi"
    else if (Bank.includes("مسکن"))
        res = "maskan"
    else if (Bank.includes("مهر"))
        res = "mehr"
    else if (Bank.includes("ملت"))
        res = "melat"
    else if (Bank.includes("ملی"))
        res = "meli"
    else if (Bank.includes("پارسیان"))
        res = "parsian"
    else if (Bank.includes("رفاه"))
        res = "refah"
    else if (Bank.includes("رسالت"))
        res = "resalat"
    else if (Bank.includes("صادرات"))
        res = "saderat"
    else if (Bank.includes("سامان"))
        res = "saman"
    else if (Bank.includes("سرمایه"))
        res = "sarmaye"
    else if (Bank.includes("سپه"))
        res = "sepah"
    else if (Bank.includes("شهر"))
        res = "shahr"
    else if (Bank.includes("سینا"))
        res = "sina"
    else if (Bank.includes("تعاون"))
        res = "tavon"
    else if (Bank.includes("تجارت"))
        res = "tejarat"
    return "/Content/img/bank/" + res + ".png";
}


function GetIconCustomer(code) {
    return '/Content/img/profile.png'
}

