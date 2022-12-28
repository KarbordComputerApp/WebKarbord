var gridster = null;

var dayCheckPardakht = localStorage.getItem("dayCheckPardakht");
var date_TarazFasli = localStorage.getItem("date_TarazFasli");

dayCheckPardakht = dayCheckPardakht == null ? 3 : dayCheckPardakht;
date_TarazFasli = date_TarazFasli == null ? localStorage.getItem("BeginDateFct") : date_TarazFasli;

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





    var TrazFasliUri = server + '/api/ReportFct/TrazFasli/'; // آدرس گزارش 

    var trazFasli_labels = [];
    var trazFasli_data = [];

    function getTrazFasli() {
        var TrazFasliObject = {
            azTarikh: date_TarazFasli,
            taTarikh: LowDay(0) ,
            mode: "1",
        };
        ajaxFunction(TrazFasliUri + ace + '/' + sal + '/' + group, 'POST', TrazFasliObject, false).done(function (response) {
            trazFasli_labels = []
            trazFasli_data = []
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                trazFasli_labels[i] = response[i].DocDate;
                trazFasli_data[i] = response[i].TotalValue;
                sum += response[i].TotalValue
            }
            $("#Sum_D_TarazFasli").text(NumberToNumberString(sum) + ' ریال');
            $("#Title_D_TarazFasli").text(date_TarazFasli + ' - ' + LowDay(0));

        });
    }

    getTrazFasli();

    $('#btnTarazFasli_Date').click(function () {
        $('#SD_TarazFasli_Date').change();
    });

    $('#modal-SD_TarazFasli').on('show.bs.modal', function () {
        $('#SD_TarazFasli_Date').val(date_TarazFasli);
    })

    $('#SD_TarazFasli_Save').click(function () {
        date = $('#SD_TarazFasli_Date').val();

        localStorage.setItem("date_TarazFasli", date);
        date_TarazFasli = date;
        $('#modal-SD_TarazFasli').modal('hide');
        getTrazFasli();
    })


    new Chart("myChart", {
        type: 'bar',
        data: {
            labels: trazFasli_labels,
            datasets: [{
                label: 'فروش',
                data: trazFasli_data,
                //backgroundColor: ['rgb(255, 99, 132)', 'rgb(0, 255, 0)', 'rgb(255, 99, 132)', 'rgb(128, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 128)'],
                //borderColor: 'rgb(255, 99, 132)',
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
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



};


ko.applyBindings(new ViewModel());

/*
 * var gridster;


gridster = $(".gridster").gridster({
    widget_base_dimensions: [100, 55],
    widget_base_dimensions: ['auto', 140],
    autogenerate_stylesheet: true,
    min_cols: 1,
    max_cols: 4,
    widget_margins: [5, 5],
    resize: {
        enabled: true
    }
}).data('gridster');
var widgets = [
    [
        `<li style="background-color: red;">
        
                        <div class="gridster" style="background-color:blue">

                    <div _ngcontent-c13="" class="h-100 dx-rtl">
                        <app-profit-loss-widget _ngcontent-c13="" _nghost-c20="">
                            <div _ngcontent-c20="" class="dashboard-widget d-flex flex-column">
                                <span _ngcontent-c20="" class="dx-icon dx-icon-preferences">
                                </span><div _ngcontent-c20="" class="d-flex justify-content-between align-items-center mb-2">
                                    <h2 _ngcontent-c20="">سود یا زیان</h2><app-textual-date-range-selector _ngcontent-c20="" _nghost-c37="">
                                        <dx-drop-down-button _ngcontent-c37="" stylingmode="text" class="dx-widget dx-rtl dx-dropdownbutton dx-dropdownbutton-has-arrow" tabindex="0">
                                            <div role="group" class="dx-buttongroup dx-widget dx-rtl" tabindex="0" style="width: 100%; height: 100%;">
                                                <div class="dx-buttongroup-wrapper dx-widget dx-rtl dx-collection"><div class="dx-item dx-buttongroup-item dx-item-content dx-buttongroup-item-content dx-buttongroup-first-item dx-buttongroup-last-item dx-shape-standard dx-button dx-button-normal dx-button-mode-text dx-widget dx-dropdownbutton-action dx-rtl dx-button-has-text dx-buttongroup-item-has-width" aria-label="کل سال مالی" role="button"><div class="dx-button-content"><span class="dx-button-text">کل سال مالی</span><i class="dx-icon dx-icon-spindown dx-icon-right"></i></div></div></div>

                          </div>
                                        </dx-drop-down-button>
                                    </app-textual-date-range-selector>
                                </div><div _ngcontent-c20="" class="d-flex flex-column h-100"><dx-scroll-view _ngcontent-c20="" class="h-100 dx-scrollable dx-scrollview dx-rtl dx-visibility-change-handler dx-scrollable-vertical dx-scrollable-simulated"><div class="dx-scrollable-wrapper"><div class="dx-scrollable-container" tabindex="0"><div class="dx-scrollable-content" style="left: 0px; top: 0px; transform: none;"><div class="dx-scrollview-top-pocket"><div class="dx-scrollview-pull-down dx-state-invisible"><div class="dx-scrollview-pull-down-image"></div><div class="dx-scrollview-pull-down-indicator"><div class="dx-loadindicator dx-widget dx-rtl"><div class="dx-loadindicator-wrapper"><div class="dx-loadindicator-content"><div class="dx-loadindicator-icon"><div class="dx-loadindicator-segment dx-loadindicator-segment7"></div><div class="dx-loadindicator-segment dx-loadindicator-segment6"></div><div class="dx-loadindicator-segment dx-loadindicator-segment5"></div><div class="dx-loadindicator-segment dx-loadindicator-segment4"></div><div class="dx-loadindicator-segment dx-loadindicator-segment3"></div><div class="dx-loadindicator-segment dx-loadindicator-segment2"></div><div class="dx-loadindicator-segment dx-loadindicator-segment1"></div><div class="dx-loadindicator-segment dx-loadindicator-segment0"></div></div></div></div></div></div><div class="dx-scrollview-pull-down-text"><div class="dx-scrollview-pull-down-text-visible">برای بازیابی به پایین بکشید...</div><div>برای بازیابی رها کنید...</div><div>درحال بازیابی...</div></div></div></div><div class="dx-scrollview-content"><div _ngcontent-c20="" class="mb-4"><div _ngcontent-c20="" class="loss"> ‎ریال&nbsp;۱۵۸٬۶۲۲٬۷۳۳ </div><div _ngcontent-c20="" class="title1">زیان خالص (۱۳۹۷/۱۲/۲۹ - ۱۳۹۸/۱۲/۲۸)</div></div><div _ngcontent-c20="" class="mb-3"><div _ngcontent-c20="" class="mb-1"><div _ngcontent-c20="" class="title2">‎ریال&nbsp;۷۵۵٬۸۰۴٬۲۲۸</div><div _ngcontent-c20="" class="title1">فروش</div></div><app-horizontal-bar-chart _ngcontent-c20="" _nghost-c38=""><div _ngcontent-c38="" class="back" style="background: rgb(238, 238, 238); height: 30px;"><div _ngcontent-c38="" class="body" style="background: rgb(44, 160, 28); width: 100%; height: 30px;"></div></div></app-horizontal-bar-chart></div><div _ngcontent-c20="" class="mb-3"><div _ngcontent-c20="" class="mb-1"><div _ngcontent-c20="" class="title2">‎ریال&nbsp;۲۷۸٬۵۰۱٬۴۰۰</div><div _ngcontent-c20="" class="title1">خرید</div></div><app-horizontal-bar-chart _ngcontent-c20="" _nghost-c38=""><div _ngcontent-c38="" class="back" style="background: rgb(238, 238, 238); height: 30px;"><div _ngcontent-c38="" class="body" style="background: rgb(255, 128, 0); width: 37%; height: 30px;"></div></div></app-horizontal-bar-chart></div><div _ngcontent-c20="" class="mb-3"><div _ngcontent-c20="" class="mb-1"><div _ngcontent-c20="" class="title2">‎ریال&nbsp;۳۹٬۳۴۵٬۰۳۵</div><div _ngcontent-c20="" class="title1">درآمد ها</div></div><app-horizontal-bar-chart _ngcontent-c20="" _nghost-c38=""><div _ngcontent-c38="" class="back" style="background: rgb(238, 238, 238); height: 30px;"><div _ngcontent-c38="" class="body" style="background: rgb(124, 210, 0); width: 5%; height: 30px;"></div></div></app-horizontal-bar-chart></div><div _ngcontent-c20="" class="mb-3"><div _ngcontent-c20="" class="mb-1"><div _ngcontent-c20="" class="title2">‎ریال&nbsp;۶۷۵٬۲۷۰٬۵۹۶</div><div _ngcontent-c20="" class="title1">هزینه ها</div></div><app-horizontal-bar-chart _ngcontent-c20="" _nghost-c38=""><div _ngcontent-c38="" class="back" style="background: rgb(238, 238, 238); height: 30px;"><div _ngcontent-c38="" class="body" style="background: rgb(249, 87, 0); width: 89%; height: 30px;"></div></div></app-horizontal-bar-chart></div></div><div class="dx-scrollview-bottom-pocket"><div class="dx-scrollview-scrollbottom dx-state-invisible"><div class="dx-scrollview-scrollbottom-indicator"><div class="dx-loadindicator dx-widget dx-rtl"><div class="dx-loadindicator-wrapper"><div class="dx-loadindicator-content"><div class="dx-loadindicator-icon"><div class="dx-loadindicator-segment dx-loadindicator-segment7"></div><div class="dx-loadindicator-segment dx-loadindicator-segment6"></div><div class="dx-loadindicator-segment dx-loadindicator-segment5"></div><div class="dx-loadindicator-segment dx-loadindicator-segment4"></div><div class="dx-loadindicator-segment dx-loadindicator-segment3"></div><div class="dx-loadindicator-segment dx-loadindicator-segment2"></div><div class="dx-loadindicator-segment dx-loadindicator-segment1"></div><div class="dx-loadindicator-segment dx-loadindicator-segment0"></div></div></div></div></div></div><div class="dx-scrollview-scrollbottom-text">درحال بارگذاری...</div></div></div></div><div class="dx-scrollable-scrollbar dx-widget dx-rtl dx-scrollbar-vertical dx-scrollbar-hoverable" style="display: none;"><div class="dx-scrollable-scroll dx-state-invisible" style="height: 492px; transform: translate(0px, 0px);"><div class="dx-scrollable-scroll-content"></div></div></div></div></div><div class="dx-scrollview-loadpanel dx-overlay dx-widget dx-state-invisible dx-visibility-change-handler dx-loadpanel"><div class="dx-overlay-content dx-rtl" aria-hidden="true" style="width: 222px; height: 90px;"></div></div></dx-scroll-view></div>
                            </div>
                        </app-profit-loss-widget><div _ngcontent-c13="" class="dashboard-widget-move-handle">
                            <svg _ngcontent-c13="" fill="currentColor" viewBox="0 0 24 24" width="16px"><path _ngcontent-c13="" d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path><path _ngcontent-c13="" d="M0 0h24v24H0z" fill="none"></path></svg>
                        </div>
                    </div>

                </div>
        
        </li >`
        ,1, 1],
    //['<li style="background-color: red;">1</li>', 1, 2],
];

$.each(widgets, function (i, widget) {
    gridster.add_widget.apply(gridster, widget)
});*/



