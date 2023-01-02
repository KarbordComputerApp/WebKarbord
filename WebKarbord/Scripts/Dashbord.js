﻿var gridster = null;
var barColors = ["red", "green", "blue", "orange", "brown","red", "green", "blue", "orange", "brown","red", "green", "blue", "orange", "brown"];

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


var dashbordData = [];


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
    $.each(gridster.$widgets, function (i, widgets) {
        element = $(widgets);
        id = $(element).attr("id");
        col = $(element).attr("data-col");
        row = $(element).attr("data-row");
        sizex = $(element).attr("data-sizex");
        sizey = $(element).attr("data-sizey");
        dashbordData.push({ "id": id, "col": col, "row": row, "sizex": sizex, "sizey": sizey })
    });

    localStorage.setItem("dashbordData", JSON.stringify(dashbordData))
}



window.onbeforeunload = function () {
    SaveDashbord();
};






var ViewModel = function () {
    var self = this;


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















    var TrazFasliUri = server + '/api/ReportFct/TrazFasli/'; // آدرس گزارش 

    var trazFasli_labels = [];
    var trazFasli_data = [];


    function getTrazFasli() {
        var TrazFasliObject = {
            azTarikh: date_TarazFasli,
            taTarikh: LowDay(0),
            mode: mode_TarazFasli,
        };
        ajaxFunction(TrazFasliUri + ace + '/' + sal + '/' + group, 'POST', TrazFasliObject, false).done(function (response) {
            trazFasli_labels = []
            trazFasli_data = []
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                trazFasli_labels[i] = response[i].docdate;
                trazFasli_data[i] = response[i].FinalPrice;
                sum += response[i].FinalPrice
            }
            $("#Sum_D_TarazFasli").text(NumberToNumberString(sum) + ' ریال');
            $("#Title_D_TarazFasli").text(date_TarazFasli + ' - ' + LowDay(0));


            new Chart("trazFasli_Chart", {
                type: 'bar',
                data: {
                    labels: trazFasli_labels,
                    datasets: [{
                        label: 'فروش',
                        data: trazFasli_data,
                        backgroundColor: barColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: false,
                    //legend: { display: false },
                    //maintainAspectRatio: false,
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
            });
            
        });
    }

    getTrazFasli();

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
        getTrazFasli();
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
                getTrazFasli();
            }
        })
    })


  














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



















    var TrzFKala_SUri = server + '/api/ReportFct/TrzFKala/';

    var TrzFKala_S_labels = [];
    var TrzFKala_S_data = [];


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


            new Chart("TrzFKala_S_Chart", {
                type: 'pie',
                data: {
                    labels: TrzFKala_S_labels,
                    datasets: [{
                        label: 'فروش',
                        data: TrzFKala_S_data,
                        backgroundColor: barColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: ""
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'left',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Pie Chart'
                        }
                    }
                },
                /*options: {
                    animation: false,
                    //legend: { display: false },
                    //maintainAspectRatio: false,
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
                }*/
            });

        });
    }

    getTrzFKala_S();

    $('#modal-SD_TrzFKala_S').on('show.bs.modal', function () {
        $('#TrzFKala_S_Top').val(top_TrzFKala_S);
        $('#TrzFKala_S_Mode').val(mode_TrzFKala_S);
    })


    $('#SD_TrzFKala_S_Save').click(function () {

        mode_TrzFKala_S = $('#TrzFKala_S_Mode').val();
        localStorage.setItem("mode_TrzFKala_S", mode_TrzFKala_S);

        top_TrzFKala_S = $('#TrzFKala_S_Top').val();
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





};


ko.applyBindings(new ViewModel());
