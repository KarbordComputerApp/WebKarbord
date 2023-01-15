var gridster = null;

var barColors = ["#ff2d2d", "#00ccff", "#00ffff", "#336600", "#ffcc00", "#ff0000", "#0033ff",
    "#6699cc", "#009999", "#171a9b", "#00a20b", "#11c0a9"];





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


/*
gridster = $(".gridster ul").gridster({
    widget_base_dimensions: ['auto', 100],
    autogenerate_stylesheet: true,
    min_cols: 1,
    max_cols: 6,
    widget_margins: [30, 30],
    resize: {
        enabled: true
    },
    draggable: {
        handle: 'handle'
    }

}).data('gridster');
$('.gridster  ul').css({ 'padding': '10' });

*/
/*
var dashbordData = [];

let grid = GridStack.init({
    cellHeight: 'initial', // start square but will set to % of window width later
    animate: true, // show immediate (animate: true is nice for user dragging though)
    disableOneColumnMode: true, // will manually do 1 column
    float: true
});

saveGrid = function () {
    a = grid.save();
}




function LoadDashbord() {
    data = localStorage.getItem("dashbordData");
    if (data != null) {
        dashbordData = JSON.parse(data);
        for (var i = 0; i < dashbordData.length; i++) {
            element = $('#' + dashbordData[i].id);
            id = $(element).attr("id");
            $(element).attr("data-col", dashbordData[i].col);
            $(element).attr("data-row", dashbordData[i].row);
            $(element).attr("data-sizex", dashbordData[i].sizex);
            $(element).attr("data-sizey", dashbordData[i].sizey);
        }
    }
}



LoadDashbord();


function SaveDashbord() {
    dashbordData = [];
    dashbordData = grid.save();
    localStorage.setItem("dashbordData", JSON.stringify(dashbordData))

    /*$.each(gridster.$widgets, function (i, widgets) {
        element = $(widgets);
        id = $(element).attr("id");
        col = $(element).attr("data-col");
        row = $(element).attr("data-row");
        sizex = $(element).attr("data-sizex");
        sizey = $(element).attr("data-sizey");
        dashbordData.push({ "id": id, "col": col, "row": row, "sizex": sizex, "sizey": sizey })
    });*/

//localStorage.setItem("dashbordData", JSON.stringify(dashbordData))
//}



//window.onbeforeunload = function () {
//    SaveDashbord();
//};




var dashbordData = [];

let grid = GridStack.init({
    cellHeight: 'initial', // start square but will set to % of window width later
    animate: true, // show immediate (animate: true is nice for user dragging though)
    disableOneColumnMode: true, // will manually do 1 column
    float: true
});


function LoadDashbord() {
    data = localStorage.getItem("dashbordData");
    if (data != null) {
        dashbordData = JSON.parse(data);
        nodes = grid.save();
        for (var i = 0; i < dashbordData.length; i++) {
            element = $(".grid-stack").find(`[gs-id='${dashbordData[i].id}']`)

            html = element[0].innerHTML.replaceAll('grid-stack-item-content', '');


            dashbordData[i].content = html;
            /*element = $('#' + dashbordData[i].id);
             grid.engine.nodes[i].x = dashbordData[i].x;
             grid.engine.nodes[i].y = dashbordData[i].y;
             grid.engine.nodes[i].w = dashbordData[i].w;
             grid.engine.nodes[i].h = dashbordData[i].h;
 
 
             element = $(".grid-stack").find(`[gs-id='${dashbordData[i].id}']`)
             id = $(element).attr("gs-id");
             $(element).attr("gs-x", dashbordData[i].x);
             $(element).attr("gs-y", dashbordData[i].y);
             $(element).attr("gs-w", dashbordData[i].w);
             $(element).attr("gs-h", dashbordData[i].h);
             a = $(element).attr("gs-h");*/
        }
        grid.load(dashbordData);
    }
}

LoadDashbord();


function SaveDashbord() {
    dashbordData = [];
    dashbordData = grid.save();
    for (var i = 0; i < dashbordData.length; i++) {
        dashbordData[i].content = null;
    }
    localStorage.setItem("dashbordData", JSON.stringify(dashbordData))
}




window.onbeforeunload = function () {
    SaveDashbord();
};


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

        self.GetIconBank = function (Bank) {
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
                ModeCode1: 'SFCT',
                ModeCode2: 'SRFCT',
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
                ModeCode1: 'PFCT',
                ModeCode2: 'PRFCT',
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
                ModeCode1: "SFCT",
                ModeCode2: "SRFCT",
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
                Sort:"TotalPrice desc"
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


};


ko.applyBindings(new ViewModel());

