var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var forSels = true;

    var viewAction = false;
    var allSearchHesab = true;
    var allSearchKala = true;

    var flagupdateHeader;

    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;

    $("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
    $("#groupTest").text('نام گروه' + sessionStorage.group);
    $("#salTest").text('سال مالی' + sessionStorage.sal);

    //var server = $("#server").text();
    sessionStorage.searchFDocH = "";
    var server = localStorage.getItem("ApiAddress");

    $('#textnumberfactor').hide();

    var codeCust = '';

    var zarib1 = 0;
    var zarib2 = 0;
    var zarib3 = 0;

    var DeghatR1 = 0;
    var DeghatR2 = 0;
    var DeghatR3 = 0;

    var DeghatM1 = 0;
    var DeghatM2 = 0;
    var DeghatM3 = 0;

    var Price1;
    var Price2;
    var Price3;

    var totalPrice;
    var discountprice;
    var discountCol = 0;
    var oldAddMinPrice = 0;

    var amountTextUpdate = "";
    var amountValueUpdate = "";

    var flagEditBand = false;

    var FDocHKAmount1 = 0;
    var FDocHAmount2 = 0;
    var FDocHAmount3 = 0;
    var FDocHTotalPrice = 0;
    var FDocHFinalPrice = 0;
    var FDocHDiscount = 0;

    var dataAddMin;
    var dataAddminHesab = [];
    var dataAddminKala = [];

    self.bundNumberImport = 0;

    var unitvalue = "";

    var KalaCode = "";
    var kalapricecode = 0;

    var bandnumber = 0;
    var bandnumberedit = 0;

    var flagFinalSave = false;

    var flagKalaPrice = false;

    var flag = -1;
    var flagdiscount = -1;
    var flagInsertFdoch = 0;
    self.flagupdateband = false;

    self.SerialNumber = ko.observable();
    var Serial = '';
    self.DocNoOut = ko.observable();

    self.DocDate = ko.observable(ShamsiDate());//(ShamsiDate()); 
    self.Spec = ko.observable();
    self.CustCode = ko.observable();
    self.PriceCode = ko.observable();
    self.InvCode = ko.observable();


    self.BandNo = ko.observable();
    self.KalaCode = ko.observable();
    self.Amount1 = ko.observable();
    self.Amount2 = ko.observable();
    self.Amount3 = ko.observable();
    self.UnitPrice = ko.observable();
    self.TotalPrice = ko.observable();
    self.Discount = ko.observable();
    self.MainUnit = ko.observable();
    self.Comm = ko.observable();

    self.CustList = ko.observableArray([]); // ليست حساب ها
    self.KalaList = ko.observableArray([]); // ليست کالا ها
    self.KalaPriceList = ko.observableArray([]); // ليست گروه قيمت
    self.KalaPriceBList = ko.observableArray([]); // قيمت کالا بر اساس گروه قیمت
    self.FDocBList = ko.observableArray([]); // ليست فاکتور
    self.UnitList = ko.observableArray([]); // ليست واحد ها
    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.AddMinList = ko.observableArray([]); // ليست کسورات و افزایشات 
    self.FDocHList = ko.observableArray([]); // لیست اطلاعات تکمیلی فاکتور فروش  
    self.PaymentList = ko.observableArray([]); // ليست نحوه پرداخت 
    self.StatusList = ko.observableArray([]); // لیست وضعیت پرداخت 

    switch (sessionStorage.ModeCode.toString()) {
        case "51":
            $('#TitleHeaderFactor').text('پیش فاکتور فروش ');
            $('#TitleBodyFactor').text('پیش فاکتور فروش ');
            $('#TitleFooterFactor').text('پیش فاکتور فروش ');
            break; 
        case "52":
            $('#TitleHeaderFactor').text('فاکتور فروش ');
            $('#TitleBodyFactor').text('فاکتور فروش ');
            $('#TitleFooterFactor').text('فاکتور فروش ');
            break;
        case "53":
            $('#TitleHeaderFactor').text('برگشت از فروش ');
            $('#TitleBodyFactor').text('برگشت از فروش ');
            $('#TitleFooterFactor').text('برگشت از فروش ');
            break;
        case "54":
            $('#TitleHeaderFactor').text('پیش فاکتور خرید ');
            $('#TitleBodyFactor').text('پیش فاکتور خرید ');
            $('#TitleFooterFactor').text('پیش فاکتور خرید ');
            break;
        case "55":
            $('#TitleHeaderFactor').text('فاکتور خرید ');
            $('#TitleBodyFactor').text('فاکتور خرید ');
            $('#TitleFooterFactor').text('فاکتور خرید ');
            break;
        case "56":
            $('#TitleHeaderFactor').text('برگشت از خرید ');
            $('#TitleBodyFactor').text('برگشت از خرید ');
            $('#TitleFooterFactor').text('برگشت از خرید ');
    }

    if (sessionStorage.ModeCode < 54) {
        $('#LableCustCode').text('خریدار ');
        $('#LableHesabCode').text('نام خریدار');
        //$('#codeHesab').attr('placeholder', 'کد خریدار');
        //$('#nameHesab').attr('placeholder', 'نام خریدار');
        //$('#LableCustCode').attr('placeholder', 'نام خریدار');
        $('#TitleModalCust').text('لیست خریداران ');
        $('#TitleCodeTableModalCust').text('کد خریدار ');
        $('#TitleNameTableModalCust').text('نام خریدار ');
    } else {
        $('#LableCustCode').text('فروشنده ');
        $('#LableHesabCode').text('نام فروشنده');
        //$('#codeHesab').attr('placeholder', 'کد فروشنده ');
        //$('#nameHesab').attr('placeholder', 'نام فروشنده');
        //$('#LableCustCode').attr('placeholder', 'نام فروشنده ');
        $('#TitleModalCust').text('لیست فروشندگان');
        $('#TitleCodeTableModalCust').text('کد فروشنده ');
        $('#TitleNameTableModalCust').text('نام فروشنده ');
    }

    var CustUri = server + '/api/Web_Data/Cust/'; // آدرس حساب
    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالا ها
    var KalaPriceUri = server + '/api/Web_Data/KalaPrice/'; // آدرس گروه قيمت
    var KalaPriceBUri = server + '/api/Web_Data/KalaPriceB/'; //  آدرس  قيمت کالا بر اساس گروه قیمت
    var FDocHUri = server + '/api/AFI_FDocHi/'; // آدرس هدر فاکتور 
    var FDocBUri = server + '/api/AFI_FDocBi/'; // آدرس بند فاکتور 
    var UnitUri = server + '/api/Web_Data/Unit/'; // آدرس واحد کالا 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var AddMinUri = server + '/api/Web_Data/AddMin/'; // آدرس کسورات و افزایشات 
    var FDocHListUri = server + '/api/Web_Data/FDocH/'; //آدر اطلاعات فاکتور  
    var FDocBListUri = server + '/api/Web_Data/FDocB/'; // آدرس لیست بند های فاکتور 
    var PaymentUri = server + '/api/Web_Data/Payment/'; // آدرس نحوه پرداخت 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت پرداخت 
    var UpdatePriceUri = server + '/api/Web_Data/UpdatePrice/'; // آدرس اعمال گروه قیمت
    var FDocHLastDateUri = server + '/api/Web_Data/FDocH/LastDate/'; // آدرس آخرین تاریخ سند

    //Get Cust List
    function getCustList() {

        //var storedArray = JSON.parse(sessionStorage.getItem("items"));
        // self.CustList(storedArray);
        // storedArray = self.CustList();
        $("div.loadingZone").show();
        ajaxFunction(CustUri + ace + '/' + sal + '/' + group + '/' + (sessionStorage.ModeCode < 54 ? true : false), 'GET').done(function (data) {
            self.CustList(data);
        });
    }

    //Get kala List
    function getKalaList() {
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.KalaList(data);
        });
    }

    //Get KalaPrice List
    function getKalaPriceList(insert) {
        ajaxFunction(KalaPriceUri + ace + '/' + sal + '/' + group + '/' + insert, 'GET').done(function (data) {
            self.KalaPriceList(data);
            if (self.KalaPriceList().length > 0) {
                //$("#gGhimat").val('شکری');
                //aaaaa = $("#gGhimat").val();
                if (flagupdateHeader == 1)
                    sessionStorage.PriceCode != "0" ? $("#gGhimat").val(sessionStorage.PriceCode) : $("#gGhimat").val(sessionStorage.GPriceDefult);
                else
                    if (sessionStorage.sels == "true")
                        sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                    // $("#gGhimat").val(sessionStorage.GPriceDefultS);
                    else
                        sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultP);
                // $("#gGhimat").val(sessionStorage.GPriceDefultP);
            }
        });
    }

    //Get Payment List
    function getPaymentList() {
        ajaxFunction(PaymentUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.PaymentList(data);
            if (self.PaymentList().length > 0) {
                if (flagupdateHeader == 1)
                    $("#paymenttype").val(sessionStorage.PaymentType);
            }
        });
    }


    //Get Status List
    function getStatusList() {
        ajaxFunction(StatusUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.StatusList(data);
            if (self.StatusList().length > 0) {
                if (flagupdateHeader == 1)
                    $("#status").val(sessionStorage.Status);
            }
        });
    }

    //Get KalaPriceB List
    function getKalaPriceBList(codeKalaPrice, codeKala) {
        ajaxFunction(KalaPriceBUri + ace + '/' + sal + '/' + group + '/' + codeKalaPrice + '/' + codeKala, 'GET').done(function (data) {
            self.KalaPriceBList(data);
            if (self.KalaPriceBList().length > 0) { // اگر شامل گروه قیمت بود
                var dataPrice = self.KalaPriceBList()[0];
                Price1 = dataPrice.Price1;
                Price2 = dataPrice.Price2;
                Price3 = dataPrice.Price3;
            }
            else if (codeKalaPrice > 0) {// اگر شامل گروه قیمت نبود
                Price1 = 0;
                Price2 = 0;
                Price3 = 0;
            }
            if (self.flagupdateband == false)
                Price1 > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        });
    }


    //Get AddMin List
    function getAddMinList(forSale, serialNumber, custCode, typeJob,
        spec1, spec2, spec3, spec4, spec5, spec6, spec7, spec8, spec9, spec10,
        MP1, MP2, MP3, MP4, MP5, MP6, MP7, MP8, MP9, MP10) {

        if (custCode == '')
            custCode = 0;

        if (serialNumber == '')
            serialNumber = -1;

        var CalcAddminObject = {
            forSale: forSale,
            serialNumber: serialNumber,
            custCode: custCode ,
            typeJob: typeJob ,
            spec1: spec1,
            spec2: spec2,
            spec3: spec3,
            spec4: spec4,
            spec5: spec5,
            spec6: spec6,
            spec7: spec7,
            spec8: spec8,
            spec9: spec9,
            spec10: spec10,
            MP1: MP1,
            MP2: MP2,
            MP3: MP3,
            MP4: MP4,
            MP5: MP5,
            MP6: MP6,
            MP7: MP7,
            MP8: MP8,
            MP9: MP9,
            MP10: MP10
        };

        discountCol = 0;
        $("#discountCol").val('');
        $('#ghabelpardakht').val('');
        //getFDocH(Serial == '' ? -1 : Serial);
        ajaxFunction(AddMinUri + ace + '/' + sal + '/' + group, 'POST', CalcAddminObject).done(function (data) {
                if (data.length > 0) {
                    var obj = JSON.parse(data);
                    self.AddMinList(obj);
                    var dataAddminTemp = self.AddMinList()[0];
                    discountCol = dataAddminTemp.SumDiscount;
                    tempsumfactor = FDocHTotalPrice + FDocHDiscount;// $("#sumfactor").val() != null ? parseFloat($("#sumfactor").val()) : 0;
                    $("#discountCol").val(NumberToNumberString(discountCol.toFixed(parseInt(sessionStorage.Deghat))));
                    $('#ghabelpardakht').val(NumberToNumberString(parseFloat(parseFloat(tempsumfactor) + discountCol).toFixed(parseInt(sessionStorage.Deghat))))
                }
            });
    }



    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            $("div.loadingZone").hide();
            self.InvList(data);
            if (self.InvList().length > 0) {
                if (flagupdateHeader == 1) {
                    $("#inv").val(sessionStorage.InvCode);
                    self.InvCode(sessionStorage.InvCode);
                }
                else {
                    if (sessionStorage.InvDefult != "null") $("#inv").val(sessionStorage.InvDefult);
                }
            }
        });
    }

    //Get Unit List
    function getUnit(codeKala) {
        ajaxFunction(UnitUri + ace + '/' + sal + '/' + group + '/' + codeKala, 'GET').done(function (data) {
            self.UnitList(data);
        });
    }


    //Get FDocH
    function getFDocH(serialNumber) {
        ajaxFunction(FDocHListUri + ace + '/' + sal + '/' + group + '/' + serialNumber + '/' + sessionStorage.ModeCode, 'GET').done(function (data) {
            self.FDocHList(data);

            if (self.FDocHList().length > 0) { // اگر شامل اطلاعات فاکتور بود
                dataFDocH = self.FDocHList()[0];
                dataFDocH.Amount1 != null ? FDocHAmount1 = dataFDocH.Amount1 : FDocHAmount1 = 0;
                dataFDocH.Amount2 != null ? FDocHAmount2 = dataFDocH.Amount2 : FDocHAmount2 = 0;
                dataFDocH.Amount3 != null ? FDocHAmount3 = dataFDocH.Amount3 : FDocHAmount3 = 0;
                dataFDocH.TotalPrice != null ? FDocHTotalPrice = dataFDocH.TotalPrice : FDocHTotalPrice = 0;
                dataFDocH.Discount != null ? FDocHDiscount = dataFDocH.Discount : FDocHDiscount = 0;
                dataFDocH.FinalPrice != null ? FDocHFinalPrice = dataFDocH.FinalPrice : FDocHFinalPrice = 0;
                FDocHAmount1 == 0 ? $('#foottextsum').text('') : $('#foottextsum').text('جمع');
                FDocHAmount1 == 0 ? $('#foottextamount1').text('') : $('#foottextamount1').text(NumberToNumberString(FDocHAmount1.valueOf()));
                FDocHAmount2 == 0 ? $('#foottextamount2').text('') : $('#foottextamount2').text(NumberToNumberString(FDocHAmount2.valueOf()));
                FDocHAmount3 == 0 ? $('#foottextamount3').text('') : $('#foottextamount3').text(NumberToNumberString(FDocHAmount3.valueOf()));
                FDocHTotalPrice == 0 ? $('#foottexttotalprice').text('') : $('#foottexttotalprice').text(NumberToNumberString(parseFloat(FDocHTotalPrice).toFixed(parseInt(sessionStorage.Deghat))));
                FDocHDiscount == 0 ? $('#foottextdiscount').text('') : $('#foottextdiscount').text(NumberToNumberString(Math.abs(FDocHDiscount)));
                $('#sumfactor').val(NumberToNumberString(parseFloat(FDocHTotalPrice + FDocHDiscount).toFixed(parseInt(sessionStorage.Deghat))));
                $('#ghabelpardakht').val(NumberToNumberString(parseFloat(FDocHFinalPrice).toFixed(parseInt(sessionStorage.Deghat))))
            }
        });
    }
    //Get FDocB 
    function getFDocB(serialNumber) {
        ajaxFunction(FDocBListUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.FDocBList(data);
        });
    }

    function getFDocHLastDate() {
        ajaxFunction(FDocHLastDateUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.ModeCode, 'GET').done(function (data) {
            self.DocDate(data);
        });
    }

    function CalcDiscontCol(castCode) {
        var mp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (self.FDocHList().length > 0) {
            for (var i = 1; i < self.AddMinList().length + 1; i++) {
                $('#AddMinMablagh' + i).val() > '0' ? mp[i] = SlashToDot($('#AddMinMablagh' + i).val()) : mp[i] = 0;
            }
        } else {
            mp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        getAddMinList(sessionStorage.sels, Serial, castCode, 0,
            $("#AddMinSharh1").val(),
             $("#AddMinSharh2").val(),
             $("#AddMinSharh3").val(),
             $("#AddMinSharh4").val(),
             $("#AddMinSharh5").val(),
             $("#AddMinSharh6").val(),
             $("#AddMinSharh7").val(),
             $("#AddMinSharh8").val(),
             $("#AddMinSharh8").val(),
            $("#AddMinSharh10").val(),
            mp[1], mp[2], mp[3], mp[4],
            mp[5], mp[6], mp[7], mp[8],
            mp[9], mp[10]);
    }

    function GetBandNumber() {

        if (self.FDocBList().length > 0) {
            bandnumber = self.FDocBList().length + 1;
        } else {
            bandnumber = 1;
        }
    }


    self.ChangeAddMinMablagh = function (AddMinList) {
        CalcDiscontCol(self.CustCode());
    }
    self.KeyAddMinMablagh = function (AddMinList) {
        CalcDiscontCol(self.CustCode());
    }



    // $("#AddMinMablagh1").inputFilter(function (value) {
    //    return /^\d*$/.test(value);
    //});



    /*        if (e.ctrlKey) {
                // CTRL + INS
                if (!((e.keyCode == 45) ||
                    // CTRL + C
                    (e.keyCode == 67) ||
                    // CTRL + V
                    (e.keyCode == 86))) {
    
                    e.preventDefault();
                }
            }
            else {
                if (e.shiftKey) {
                    // SHIFT + TAB
                    if (!((e.keyCode == 9) ||
                        // SHIFT + LEFT ARROW KEY
                        (e.keyCode == 37) ||
                        // SHIFT + RIGHT ARROW KEY
                        (e.keyCode == 39) ||
                        // SHIFT + INS
                        (e.keyCode == 45))) {
                        e.preventDefault();
                    }
                }
                else {
                    // BACKSPACE
                    if (!((e.keyCode == 8) ||
                        // TAB
                        (e.keyCode == 9) ||
                        // LEFT ARROW KEY
                        (e.keyCode == 37) ||
                        // RIGHT ARROW KEY
                        (e.keyCode == 39) ||
                        // DELETE
                        (e.keyCode == 46) ||
    
                        //(e.keyCode == 110) ||
                        // NUMBER KEYS
                        ((e.keyCode >= 48) && (e.keyCode <= 57)) ||
                        // NUMLOCK KEYS
                        ((e.keyCode >= 96) && (e.keyCode <= 105)))) {
                        e.preventDefault();
                    }
                }
            }
            if (e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 111 || e.keyCode == 191) {
                this.value = this.value + String.fromCharCode(47);
            }
            // $("#AddMinMablagh1").val(this.AddMinPrice + String.fromCharCode(e.keyCode));
        }*/




    self.ClearFDocH = function ClearFDocH() {
        //var tarikh = $("#tarikh").val().toEnglishDigit();
        Serial = '';
        sessionStorage.flagupdateHeader = '0';
        flagupdateHeader = 0;
        self.DocNoOut('');
        self.DocDate($('#tarikh').val().toEnglishDigit());
        self.Spec('');
        self.CustCode('');
        $('#nameHesab').val('');
        self.PriceCode('');
        self.InvCode('');
    };


    self.ClearFDocB = function ClearFDocB() {
        $('#codeKala').val('');
        $('#nameKala').val('');
        $("#unitName").empty();
        self.KalaCode('');
        self.Amount1('');
        self.Amount2('');
        self.Amount3('');
        self.UnitPrice('');
        self.TotalPrice('');
        self.Discount('');
        self.MainUnit('');
        self.Comm('');

        $('#txtzarib1').text('مقدار 1');
        $('#txtzarib2').text('مقدار 2');
        $('#txtzarib3').text('مقدار 3');

        $('#amounttext').text('مقدار');


        $('#viewunit').hide();

        $('#amount1').text('');
        $('#amount2').text('');
        $('#amount3').text('');
        $("#amount").val('');
        $("#unitPrice").val('');
        $("#totalPrice").val('');
        $("#comm").val('');

        $("#discountdarsad").val('');
        $("#discountprice").val('');

        $("#totalPrice").css("backgroundColor", "white");
        $("#unitPrice").css("backgroundColor", "white");
        //$("#discountdarsad").css("backgroundColor", "white");
        //$("#discountprice").css("backgroundColor", "white");
        flag = -1;
        flagdiscount = -1;
    };

    self.ImportBand = function (item) {
        self.ClearFDocB();
        self.flagupdateband = false;
        self.bundNumberImport = item.BandNo;
    }


    self.ButtonFDocH = function ButtonFDocH(newFDocH) {
        if (flagInsertFdoch == 0) {
            self.ClearFDocB();
            AddFDocH(newFDocH);
            flagInsertFdoch == 1 ? $('#modal-Band').modal() : null
        } else {
            $('#modal-Band').modal()
        }

    }

    //Add new FDocH 
    function AddFDocH(newFDocH) {
        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();

        bandnumber = 0;


        if (self.DocNoOut == '') {
            return showNotification('شماره فاکتور را وارد کنيد ', 0);
            //            return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' شماره فاکتور را وارد کنيد ' });
        }

        if (tarikh.length != 10) {
            return showNotification('تاريخ را صحيح وارد کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را صحيح وارد کنيد' });
        }

        if (tarikh == '') {
            return showNotification('تاريخ را وارد کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را وارد کنيد' });
        }

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification('تاريخ وارد شده با سال انتخابي همخواني ندارد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ وارد شده با سال انتخابي همخواني ندارد' });
        }

        if (codeCust == '') {
            return showNotification(sessionStorage.ModeCode < 54 ? 'خریدار را انتخاب کنيد' : 'فروشنده را انتخاب کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: sessionStorage.ModeCode < 54 ? 'خریدار را انتخاب کنيد' : 'فروشنده را انتخاب کنيد' });
        }


        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

        var FDocHObject = {
            SerialNumber: 0,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            CustCode: codeCust,//self.CustCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: sessionStorage.ModeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: 0,
            StartNo: 0,
            EndNo: 0,
            DocTime: 'null',
            mDocDate: 'null',
            Tanzim: 'null',
            TahieShode: 'null',
            VstrCode: 'null',
            VstrPer: 0,
            PakhshCode: '',
            AddMinSpec1: $("#AddMinSharh1").val(),
            AddMinSpec2: $("#AddMinSharh2").val(),
            AddMinSpec3: $("#AddMinSharh3").val(),
            AddMinSpec4: $("#AddMinSharh4").val(),
            AddMinSpec5: $("#AddMinSharh5").val(),
            AddMinSpec6: $("#AddMinSharh6").val(),
            AddMinSpec7: $("#AddMinSharh7").val(),
            AddMinSpec8: $("#AddMinSharh8").val(),
            AddMinSpec9: $("#AddMinSharh8").val(),
            AddMinSpec10: $("#AddMinSharh10").val(),
            AddMinPrice1: 0,
            AddMinPrice2: 0,
            AddMinPrice3: 0,
            AddMinPrice4: 0,
            AddMinPrice5: 0,
            AddMinPrice6: 0,
            AddMinPrice7: 0,
            AddMinPrice8: 0,
            AddMinPrice9: 0,
            AddMinPrice10: 0,
            InvCode: inv,
            Eghdam: sessionStorage.userName,
            EghdamDate: 'null'
        };
        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'POST', FDocHObject).done(function (response) {
            //$('#DatileFactor').show();
            //$('#Save').attr('disabled', true);
            var res = response.split("-");
            Serial = res[0];
            DocNoOut = res[1];
            $('#textnumberfactor').show();
            $('#docnoout').text(DocNoOut);
            // Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' مشخصات فاکتور به شماره ' + DocNoOut + ' ذخيره شد ' });
        });
        flagInsertFdoch = 1;
    };



    self.UpdateFDocH = function UpdateFDocH(newFDocH) {
        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();

        //if (inv == '' || inv == null) {
        //     return showNotification('انبار را انتخاب کنيد', 0);
        //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'انبار را انتخاب کنيد' });
        //}

        if (self.DocNoOut == '') {
            return showNotification(' شماره فاکتور را وارد کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' شماره فاکتور را وارد کنيد ' });
        }

        if (tarikh.length != 10) {
            return showNotification('تاريخ را صحيح وارد کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را صحيح وارد کنيد' });
        }

        if (tarikh == '') {
            return showNotification('تاريخ را وارد کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را وارد کنيد' });
        }

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification('تاريخ وارد شده با سال انتخابي همخواني ندارد', 0);
            // return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ وارد شده با سال انتخابي همخواني ندارد' });
        }

        //if (codeCust == '') {
        //codeCust = ' ';
        //     return showNotification(sessionStorage.ModeCode < 54 ? 'خریدار را انتخاب کنيد' : 'فروشنده را انتخاب کنيد', 0);
        //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: sessionStorage.ModeCode < 54 ? 'خریدار را انتخاب کنيد' : 'فروشنده را انتخاب کنيد' });
        // }


        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

        status = $("#status").val();
        var FDocHObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            CustCode: codeCust,//self.CustCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: sessionStorage.ModeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: $("#docnoout").text(),
            StartNo: 0,
            EndNo: 0,
            DocTime: 'null',
            mDocDate: 'null',
            Tanzim: sessionStorage.userName,
            TahieShode: sessionStorage.ace,
            VstrCode: 'null',
            VstrPer: 0,
            PakhshCode: '',
            AddMinSpec1: $("#AddMinSharh1").val(),
            AddMinSpec2: $("#AddMinSharh2").val(),
            AddMinSpec3: $("#AddMinSharh3").val(),
            AddMinSpec4: $("#AddMinSharh4").val(),
            AddMinSpec5: $("#AddMinSharh5").val(),
            AddMinSpec6: $("#AddMinSharh6").val(),
            AddMinSpec7: $("#AddMinSharh7").val(),
            AddMinSpec8: $("#AddMinSharh8").val(),
            AddMinSpec9: $("#AddMinSharh9").val(),
            AddMinSpec10: $("#AddMinSharh10").val(),
            AddMinPrice1: $("#AddMinMablagh1").val() == null ? 0 : ($("#iconAddMin1").text() == '+' ? SlashToDot($("#AddMinMablagh1").val()) : SlashToDot($("#AddMinMablagh1").val()) * (-1)), //SlashToDot($("#AddMinMablagh1").val())
            AddMinPrice2: $("#AddMinMablagh2").val() == null ? 0 : ($("#iconAddMin2").text() == '+' ? SlashToDot($("#AddMinMablagh2").val()) : SlashToDot($("#AddMinMablagh2").val()) * (-1)),//SlashToDot($("#AddMinMablagh2").val()),//($("#iconAddMin2").text() == '+' ? SlashToDot($("#AddMinMablagh2").val()) : SlashToDot($("#AddMinMablagh2").val()) * (-1)),
            AddMinPrice3: $("#AddMinMablagh3").val() == null ? 0 : ($("#iconAddMin3").text() == '+' ? SlashToDot($("#AddMinMablagh3").val()) : SlashToDot($("#AddMinMablagh3").val()) * (-1)),//SlashToDot($("#AddMinMablagh3").val()),//($("#iconAddMin3").text() == '+' ? SlashToDot($("#AddMinMablagh3").val()) : SlashToDot($("#AddMinMablagh3").val()) * (-1)),
            AddMinPrice4: $("#AddMinMablagh4").val() == null ? 0 : ($("#iconAddMin4").text() == '+' ? SlashToDot($("#AddMinMablagh4").val()) : SlashToDot($("#AddMinMablagh4").val()) * (-1)),//SlashToDot($("#AddMinMablagh4").val()),//($("#iconAddMin4").text() == '+' ? SlashToDot($("#AddMinMablagh4").val()) : SlashToDot($("#AddMinMablagh4").val()) * (-1)),
            AddMinPrice5: $("#AddMinMablagh5").val() == null ? 0 : ($("#iconAddMin5").text() == '+' ? SlashToDot($("#AddMinMablagh5").val()) : SlashToDot($("#AddMinMablagh5").val()) * (-1)),//SlashToDot($("#AddMinMablagh5").val()),//($("#iconAddMin5").text() == '+' ? SlashToDot($("#AddMinMablagh5").val()) : SlashToDot($("#AddMinMablagh5").val()) * (-1)),
            AddMinPrice6: $("#AddMinMablagh6").val() == null ? 0 : ($("#iconAddMin6").text() == '+' ? SlashToDot($("#AddMinMablagh6").val()) : SlashToDot($("#AddMinMablagh6").val()) * (-1)),//SlashToDot($("#AddMinMablagh6").val()),//($("#iconAddMin6").text() == '+' ? SlashToDot($("#AddMinMablagh6").val()) : SlashToDot($("#AddMinMablagh6").val()) * (-1)),
            AddMinPrice7: $("#AddMinMablagh7").val() == null ? 0 : ($("#iconAddMin7").text() == '+' ? SlashToDot($("#AddMinMablagh7").val()) : SlashToDot($("#AddMinMablagh7").val()) * (-1)),//SlashToDot($("#AddMinMablagh7").val()),//($("#iconAddMin7").text() == '+' ? SlashToDot($("#AddMinMablagh7").val()) : SlashToDot($("#AddMinMablagh7").val()) * (-1)),
            AddMinPrice8: $("#AddMinMablagh8").val() == null ? 0 : ($("#iconAddMin8").text() == '+' ? SlashToDot($("#AddMinMablagh8").val()) : SlashToDot($("#AddMinMablagh8").val()) * (-1)),//SlashToDot($("#AddMinMablagh8").val()),//($("#iconAddMin8").text() == '+' ? SlashToDot($("#AddMinMablagh8").val()) : SlashToDot($("#AddMinMablagh8").val()) * (-1)),
            AddMinPrice9: $("#AddMinMablagh9").val() == null ? 0 : ($("#iconAddMin9").text() == '+' ? SlashToDot($("#AddMinMablagh9").val()) : SlashToDot($("#AddMinMablagh9").val()) * (-1)),//SlashToDot($("#AddMinMablagh9").val()),//($("#iconAddMin9").text() == '+' ? SlashToDot($("#AddMinMablagh9").val()) : SlashToDot($("#AddMinMablagh9").val()) * (-1)),
            AddMinPrice10: $("#AddMinMablagh10").val() == null ? 0 : ($("#iconAddMin10").text() == '+' ? SlashToDot($("#AddMinMablagh10").val()) : SlashToDot($("#AddMinMablagh10").val()) * (-1)), //SlashToDot($("#AddMinMablagh10").val()),//($("#iconAddMin10").text() == '+' ? SlashToDot($("#AddMinMablagh10").val()) : SlashToDot($("#AddMinMablagh10").val()) * (-1)),
            InvCode: inv,
            Status: status,
            Taeed: status == "تاييد" ? sessionStorage.userName : 'null',
            PaymentType: $("#paymenttype").val(),
            Footer: $("#footer").val(),
            deghat: parseInt(sessionStorage.Deghat)
        };

        ajaxFunction(FDocHUri + ace + '/' + sal + '/' + group, 'PUT', FDocHObject).done(function (response) {
            //            $('#DatileFactor').show();
            //           $('#Save').attr('disabled', true);
            //            var res = response.split("-");
            //            Serial = res[0];
            //            DocNoOut = res[1];
            //            $('#docnoout').val(DocNoOut);
            sessionStorage.searchFDocH = $("#docnoout").text();
            //flagInsertFdoch = 0;
            //FinalSave

        /* getAddMinList(sessionStorage.sels, Serial, sessionStorage.CustCode,
                0,
                $("#AddMinSharh1").val(),
                $("#AddMinSharh2").val(),
                $("#AddMinSharh3").val(),
                $("#AddMinSharh4").val(),
                $("#AddMinSharh5").val(),
                $("#AddMinSharh6").val(),
                $("#AddMinSharh7").val(),
                $("#AddMinSharh8").val(),
                $("#AddMinSharh8").val(),
                $("#AddMinSharh10").val(),
                sessionStorage.AddMin1,
                sessionStorage.AddMin2,
                sessionStorage.AddMin3,
                sessionStorage.AddMin4,
                sessionStorage.AddMin5,
                sessionStorage.AddMin6,
                sessionStorage.AddMin7,
                sessionStorage.AddMin8,
                sessionStorage.AddMin9,
                sessionStorage.AddMin10);*/

            if (flagKalaPrice == true) {
                ajaxFunction(UpdatePriceUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST').done(function (response) {
                    self.FDocBList(response);
                    getFDocH(Serial);
                    CalcDiscontCol(self.CustCode());
                    flagFinalSave = false;
                    flagKalaPrice = false;
                    //Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'تغییرات با موفقیت انجام شد' });
                    showNotification('تغییرات با موفقیت انجام شد', 1)
                });
            } else {
                getFDocH(Serial);
            }


            if (flagupdateHeader == 1 && flagFinalSave == true) {
                sessionStorage.flagupdateHeader = 0;
                flagupdateHeader = 0;
                window.location.href = sessionStorage.urlFDocH;
            }
            else if (flagupdateHeader == 1 && flagFinalSave == false) {

            }
            else if (flagupdateHeader == 0 && flagFinalSave == false) {

            }
            else {
                Swal.fire({ type: 'success', title: 'ثبت موفق', text: 'فاکتور' + ' ذخيره شد ' });
            }

        });

    }

    //Add new FDocB  
    self.AddFDocB = function AddFDocB(newFDocB) {
        //KalaCode = $("#codeKala").val();
        //var serialNumber = $("#docnoout").val();
        //bandnumber = bandnumber + 1;
        GetBandNumber();
        bandnumber = bandnumber;
        if (Serial == '') {
            return showNotification('اطلاعات اوليه فاکتور ثبت نشده است ', 0);
            //return Swal.fire({ type: 'danger', title: 'اطلاعات ناقص', text: ' اطلاعات اوليه فاکتور ثبت نشده است ' });
        }
        //var cKala = $('#codeKala').val();
        var nKala = $('#nameKala').val();
        //var uKala = $('#unitName').val();

        var uKala = $("#unitName option:selected").val();

        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());
        discountprice = SlashToDot($("#discountprice").val());
        comm = $("#comm").val();

        if (KalaCode == '' || nKala == '' || uKala == '') {
            return showNotification('کالا را وارد کنید', 0);
        }

        if (amount == '') {
            amount = 0;
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'مقدار را وارد کنيد' });
        }

        if (unitprice == '' && totalPrice == '') {
            unitprice = 0;
            totalPrice = 0;
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'قيمت را وارد کنيد' });
        }

        var FDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumber,
            KalaCode: KalaCode,
            Amount1: SlashToDot($('#amount1').text()),// self.Amount1(),
            Amount2: SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice + '',
            TotalPrice: totalPrice + '',//self.TotalPrice(),
            Discount: discountprice,//self.Discount(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag
        };
        if (self.bundNumberImport > 0) {
            bandnumber = self.bundNumberImport;
        }
        ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + bandnumber, 'POST', FDocBObject).done(function (response) {
            self.FDocBList(response);
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند به شماره ' + bandnumber + ' ذخيره شد ' });
            self.flagupdateband = false;
            self.bundNumberImport = 0;
            CalcDiscontCol(self.CustCode());
            self.UpdateFDocH();
            self.ClearFDocB();
            showNotification(' بند شماره ' + bandnumber + ' ذخيره شد ', 1);
        });
    };




    //update FDocB
    self.UpdateFDocB = function UpdateFDocB(newFDocB) {
        //KalaCode = $("#codeKala").val();
        //        bandnumber = bandnumber + 1;
        if (Serial == '') {
            return showNotification(' اطلاعات اوليه فاکتور ثبت نشده است ', 0);
            //return Swal.fire({ type: 'danger', title: 'اطلاعات ناقص', text: ' اطلاعات اوليه فاکتور ثبت نشده است ' });
        }
        var cKala = $('#codeKala').val();
        var nKala = $('#nameKala').val();
        var uKala = $("#unitName option:selected").val();

        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());
        discountprice = SlashToDot($("#discountprice").val());
        comm = $("#comm").val();

        if (cKala == '' || nKala == '' || uKala == '') {
            return showNotification('کالا را وارد کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'کالا را وارد کنيد' });
        }

        if (amount == '') {
            amount = 0;
        }

        if (unitprice == '' && totalPrice == '') {
            unitprice = 0;
            totalPrice = 0;
        }

        var FDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumberedit,
            KalaCode: KalaCode,
            Amount1: SlashToDot($('#amount1').text()),// self.Amount1(),
            Amount2: SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice,
            TotalPrice: totalPrice,//self.TotalPrice(),
            Discount: discountprice,//self.Discount(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag
        };

        ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + bandnumberedit, 'PUT', FDocBObject).done(function (response) {
            self.FDocBList(response);

            self.flagupdateband = false;
            // Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند به شماره ' + bandnumberedit + ' ویرایش شد ' });
            flagFinalSave = false;
            //if (flagupdateHeader == 1) {
            CalcDiscontCol(self.CustCode());
            self.UpdateFDocH();
            //getFDocH(Serial);
            //}
            $('#modal-Band').modal('hide');
            self.ClearFDocB();
            showNotification(' بند شماره ' + bandnumberedit + ' ویرایش شد ', 1);
        });
    };

    self.SerialNumber('0');

    //$('#DatileFactor').hide();

    if (flagupdateHeader != 1) {
        getFDocHLastDate();
    }

    getCustList();
    getKalaList();

    flagupdateHeader == 1 ? getKalaPriceList(false) : getKalaPriceList(true);
    if (flagupdateHeader != 1)
        getAddMinList(sessionStorage.sels, -1, 0, 0,
            '', '', '', '', '', '', '', '', '', ''
            , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        );
    getInvList();
    getPaymentList();
    getStatusList();


    if (flagupdateHeader == 1) {
        flagInsertFdoch = 1;
        Serial = sessionStorage.SerialNumber;
        self.SerialNumber(Serial);
        self.DocNoOut(sessionStorage.DocNo);
        self.DocDate(sessionStorage.DocDate);
        self.Spec(sessionStorage.Spec); 
        codeCust = sessionStorage.CustCode;
        self.CustCode(sessionStorage.CustCode);
        self.PriceCode(sessionStorage.PriceCode);
        kalapricecode = sessionStorage.PriceCode;
        self.InvCode(sessionStorage.InvCode);
        $("#docnoout").text(sessionStorage.DocNo);
        $('#textnumberfactor').show();
        //$('#ghabelpardakht').text('');
        $('#nameHesab').val(sessionStorage.CustCode == '' ? '' : '(' + sessionStorage.CustCode + ') ' + sessionStorage.CustName);
        //$("#gGhimat").val(sessionStorage.PriceCode);

        getFDocH(Serial);
        getFDocB(Serial);

        getAddMinList(
            sessionStorage.sels,
            Serial,
            sessionStorage.CustCode,
            1,
            sessionStorage.AddMinSpec1,
            sessionStorage.AddMinSpec2,
            sessionStorage.AddMinSpec3,
            sessionStorage.AddMinSpec4,
            sessionStorage.AddMinSpec5,
            sessionStorage.AddMinSpec6,
            sessionStorage.AddMinSpec7,
            sessionStorage.AddMinSpec8,
            sessionStorage.AddMinSpec9,
            sessionStorage.AddMinSpec10,
            sessionStorage.AddMin1,
            sessionStorage.AddMin2,
            sessionStorage.AddMin3,
            sessionStorage.AddMin4,
            sessionStorage.AddMin5,
            sessionStorage.AddMin6,
            sessionStorage.AddMin7,
            sessionStorage.AddMin8,
            sessionStorage.AddMin9,
            sessionStorage.AddMin10);
        $("#footer").val(sessionStorage.Footer);
        //sessionStorage.flagupdateHeader = 0;
    }

    //$(document).ready(function () { });
    //------------------------------------------------------
    self.currentPageHesab = ko.observable();
    self.currentPageKala = ko.observable();

    self.pageSizeCust = ko.observable(10);
    self.pageSizeKala = ko.observable(10);
    self.currentPageIndexCust = ko.observable(0);
    self.currentPageIndexKala = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    /*self.filterCust = ko.observable("");
        self.filterCustList = ko.computed(function () {
            self.currentPageIndexCust(0);
            var filter = self.filterCust().toLowerCase();
            if (!filter) {
                return self.CustList();
            } else {
                return ko.utils.arrayFilter(self.CustList(), function (item) {
                    if ($("#allSearchHesab").is(':checked')) {
                        result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Name.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Spec.toLowerCase(), filter)
                        //(item.Code.toLowerCase().search(filter) >= 0 || item.Name.toLowerCase().search(filter) >= 0 || item.Spec.toLowerCase().search(filter) >= 0)
                        return result;
                    }
                    else {
                        result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                        //return ko.utils.stringStartsWith(item.Name().toLowerCase(), filter);
                        return result;
                    }
                });
            }
        });*/

    self.filterCust0 = ko.observable("");
    self.filterCust1 = ko.observable("");
    self.filterCust2 = ko.observable("");


    self.filterCustList = ko.computed(function () {

        self.currentPageIndexCust(0);
        var filter0 = self.filterCust0().toUpperCase();
        var filter1 = self.filterCust1().toUpperCase();
        var filter2 = self.filterCust2().toUpperCase();

        if (!filter0 && !filter1 && !filter2) {
            return self.CustList();
        } else {
            tempData = ko.utils.arrayFilter(self.CustList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageCust = ko.computed(function () {
        var pageSizeCust = parseInt(self.pageSizeCust(), 10),
            startIndex = pageSizeCust * self.currentPageIndexCust(),
            endIndex = startIndex + pageSizeCust;
        return self.filterCustList().slice(startIndex, endIndex);
    });


    self.nextPageCust = function () {
        if (((self.currentPageIndexCust() + 1) * self.pageSizeCust()) < self.filterCustList().length) {
            self.currentPageIndexCust(self.currentPageIndexCust() + 1);
        }
        //else {
        //    self.currentPageIndexCust(0);
        //}
    };

    self.previousPageCust = function () {
        if (self.currentPageIndexCust() > 0) {
            self.currentPageIndexCust(self.currentPageIndexCust() - 1);
        }
        //else {
        //    self.currentPageIndexCust((Math.ceil(self.filterCustList().length / self.pageSizeCust())) - 1);
        //}
    };

    self.firstPageCust = function () {
        self.currentPageIndexCust(0);
    };

    self.lastPageCust = function () {
        countCust = parseInt(self.filterCustList().length / self.pageSizeCust(), 10);
        self.currentPageIndexCust(countCust);
    };

    self.sortTableCust = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.CustList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');

        if (orderProp == 'Code') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };



    /* self.filterKala = ko.observable("");
     self.filterKalaList = ko.computed(function () {
         self.currentPageIndexKala(0);
         var filter = self.filterKala().toLowerCase();
         if (!filter) {
             return self.KalaList();
         } else {
             return ko.utils.arrayFilter(self.KalaList(), function (item) {
                 if ($("#allSearchKala").is(':checked')) {
                     result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Name.toLowerCase(), filter) || ko.utils.stringStartsWith(item.FanniNo.toLowerCase(), filter) || ko.utils.stringStartsWith(item.Spec.toLowerCase(), filter)
                     return result;
                 }
                 else {
                     result = ko.utils.stringStartsWith(item.Code.toLowerCase(), filter);//    (item.Code.toLowerCase().search(filter) >= 0);
                     return result;
                 }
             });
         }
     });*/

    self.filterKala0 = ko.observable("");
    self.filterKala1 = ko.observable("");
    self.filterKala2 = ko.observable("");
    self.filterKala3 = ko.observable("");

    self.filterKalaList = ko.computed(function () {

        self.currentPageIndexKala(0);
        var filter0 = self.filterKala0().toUpperCase();
        var filter1 = self.filterKala1().toUpperCase();
        var filter2 = self.filterKala2().toUpperCase();
        var filter3 = self.filterKala3().toUpperCase();

        if (!filter0 && !filter1 && !filter2 && !filter3) {
            return self.KalaList();
        } else {
            tempData = ko.utils.arrayFilter(self.KalaList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.FanniNo == null ? '' : item.FanniNo.toString().search(filter2) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter3) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageKala = ko.computed(function () {
        var pageSizeKala = parseInt(self.pageSizeKala(), 10),
            startIndex = pageSizeKala * self.currentPageIndexKala(),
            endIndex = startIndex + pageSizeKala;
        return self.filterKalaList().slice(startIndex, endIndex);
    });

    self.nextPageKala = function () {
        if (((self.currentPageIndexKala() + 1) * self.pageSizeKala()) < self.filterKalaList().length) {
            self.currentPageIndexKala(self.currentPageIndexKala() + 1);
        }
        //else {
        //    self.currentPageIndexKala(0);
        //}
    };

    self.previousPageKala = function () {
        if (self.currentPageIndexKala() > 0) {
            self.currentPageIndexKala(self.currentPageIndexKala() - 1);
        }
        //else {
        //    self.currentPageIndexKala((Math.ceil(self.filterKalaList().length / self.pageSizeKala())) - 1);
        //}
    };

    self.firstPageKala = function () {
        self.currentPageIndexKala(0);
    };

    //self.lastPageKala = function () {
    //    countKala = parseInt(self.filterKalaList().length / self.pageSizeKala(), 10);
    //    self.currentPageIndexKala(countKala);
    // };

    self.lastPageKala = function () {
        countKala = parseInt(self.filterKalaList().length / self.pageSizeKala(), 10);
        if ((self.filterKalaList().length % self.pageSizeKala()) == 0)
            self.currentPageIndexKala(countKala - 1);
        else
            self.currentPageIndexKala(countKala);
    };


    self.iconTypeCodeKala = ko.observable("");
    self.iconTypeNameKala = ko.observable("");
    self.iconTypeFanniNoKala = ko.observable("");
    self.iconTypeSpecKala = ko.observable("");

    self.sortTableKala = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.KalaList.sort(function (left, right) {
            leftVal = left[orderProp];
            rightVal = right[orderProp];
            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeCodeKala('');
        self.iconTypeNameKala('');
        self.iconTypeFanniNoKala('');
        self.iconTypeSpecKala('');
        if (orderProp == 'Code') self.iconTypeCodeKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Name') self.iconTypeNameKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'FanniNo') self.iconTypeFanniNoKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpecKala((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    };


    //row select ---------------------------------
    self.selectCust = function (item) {

        if (Serial != '') {
            Swal.fire({
                title: 'تایید و ثبت نهایی تغییرات ؟',
                text: 'در صورت تغییر' + (sessionStorage.ModeCode < 54 ? ' خریدار ' : ' فروشنده ') + ' تغییرات پیش فرض اعمال و ثبت نهایی می شود . آیا عملیات انجام شود؟',
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'خیر',
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'بله'
            }).then((result) => {
                if (result.value) {
                    codeCust = item.Code;
                    $('#nameHesab').val('(' + item.Code + ') ' + item.Name)

                    //                    sessionStorage.GPriceDefult == "null" ? $("#gGhimat").val('گروه قیمت را انتخاب کنید') : $("#gGhimat").val(sessionStorage.GPriceDefult);

                    if (sessionStorage.sels == "true")
                        sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                    else
                        sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultP);


                    if (sessionStorage.ModeCode < 54 && item.CGruKalaPriceCode_S > 0)
                        $("#gGhimat").val(item.CGruKalaPriceCode_S);
                    else if (sessionStorage.ModeCode > 54 && item.CGruKalaPriceCode_P > 0)
                        $("#gGhimat").val(item.CGruKalaPriceCode_P);

                    if (sessionStorage.ModeCode < 54 && item.KalaPriceCode_S > 0)
                        $("#gGhimat").val(item.KalaPriceCode_S);
                    else if (sessionStorage.ModeCode > 54 && item.KalaPriceCode_P > 0)
                        $("#gGhimat").val(item.KalaPriceCode_P);


                    self.CustCode(item.Code)

                    //if ($("#gGhimat").val() != '')
                    flagKalaPrice = true;
                    //else
                    //    flagKalaPrice = false;

                    CalcDiscontCol(self.CustCode());
                    self.UpdateFDocH();
                }
            })
        }
        else {
            codeCust = item.Code;
            $('#nameHesab').val('(' + item.Code + ') ' + item.Name)

            if ($("#gGhimat").val() == '') {

                if (sessionStorage.sels == "true")
                    sessionStorage.GPriceDefultS == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultS);
                else
                    sessionStorage.GPriceDefultP == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultP);

                if (sessionStorage.ModeCode < 54 && item.CGruKalaPriceCode_S > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_S);
                else if (sessionStorage.ModeCode > 54 && item.CGruKalaPriceCode_P > 0)
                    $("#gGhimat").val(item.CGruKalaPriceCode_P);

                if (sessionStorage.ModeCode < 54 && item.KalaPriceCode_S > 0)
                    $("#gGhimat").val(item.KalaPriceCode_S);
                else if (sessionStorage.ModeCode > 54 && item.KalaPriceCode_P > 0)
                    $("#gGhimat").val(item.KalaPriceCode_P);
            }
            self.CustCode(item.Code)
        }
        $('#nameHesab').focus();
    };

    self.getById = function (id) {
        return ko.utils.arrayFirst(self.KalaPriceBList(), function (q) {
            if (q.Code === id) {
                return q.Price1; 
            }
            else {
                return 'not found';
            }
        });
    };

    self.selectKala = function (item) {
        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

        KalaCode = item.Code;
        getUnit(item.Code);
        getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, item.Code);

        self.ClearFDocB();
        zarib1 = item.zarib1;
        zarib2 = item.zarib2;
        zarib3 = item.zarib3;

        DeghatR1 = item.DeghatR1;
        DeghatR2 = item.DeghatR2;
        DeghatR3 = item.DeghatR3;

        DeghatM1 = item.DeghatM1;
        DeghatM2 = item.DeghatM2;
        DeghatM3 = item.DeghatM3;

        if (sessionStorage.sels == "true") {
            Price1 = item.SPrice1;
            Price2 = item.SPrice2;
            Price3 = item.SPrice3;
        } else {
            Price1 = item.PPrice1;
            Price2 = item.PPrice2;
            Price3 = item.PPrice3;
        }

        $('#codeKala').val(item.Code);
        $('#nameKala').val('(' + item.Code + ') ' + item.Name);
        $('#unitName').val(item.UnitName1);
        Price1 > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        $("#amounttext").text(item.UnitName1);
        $("#txtzarib1").text(item.UnitName1);
        $("#txtzarib2").text(item.UnitName2);
        $("#txtzarib3").text(item.UnitName3);

        if (item.UnitName2 != "" && item.UnitName3 == "") {
            $("#viewunit").show();
            $("#txtzarib3").hide();
            $("#amount3").hide();
        }
        else if (item.UnitName2 != "" && item.UnitName3 != "") {
            $("#viewunit").show();
            $("#txtzarib3").show();
            $("#amount3").show();
        }
        flag = 1;
    };

    function SearchKalaArry(Code, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].Code === Code) {

                zarib1 = myArray[i].zarib1;
                zarib2 = myArray[i].zarib2;
                zarib3 = myArray[i].zarib3;

                DeghatR1 = myArray[i].DeghatR1;
                DeghatR2 = myArray[i].DeghatR2;
                DeghatR3 = myArray[i].DeghatR3;

                DeghatM1 = myArray[i].DeghatM1;
                DeghatM2 = myArray[i].DeghatM2;
                DeghatM3 = myArray[i].DeghatM3;

                if (sessionStorage.sels == "true") {
                    Price1 = myArray[i].SPrice1;
                    Price2 = myArray[i].SPrice2;
                    Price3 = myArray[i].SPrice3;
                } else {
                    Price1 = myArray[i].PPrice1;
                    Price2 = myArray[i].PPrice2;
                    Price3 = myArray[i].PPrice3;
                }
                $("#txtzarib1").text(myArray[i].UnitName1);
                $("#txtzarib2").text(myArray[i].UnitName2);
                $("#txtzarib3").text(myArray[i].UnitName3);

                if (myArray[i].UnitName2 != "" && myArray[i].UnitName3 == "") {
                    $("#viewunit").show();
                    $("#txtzarib3").hide();
                    $("#amount3").hide();
                }
                else if (myArray[i].UnitName2 != "" && myArray[i].UnitName3 != "") {
                    $("#viewunit").show();
                    $("#txtzarib3").show();
                    $("#amount3").show();
                }
                return true;
            }
        }
    }

    self.selectFactor = function (item) {
        if (self.flagupdateband == true) {
            var amo;
            bandnumberedit = item.BandNo;
            getUnit(item.KalaCode);

            KalaCode = item.KalaCode;
            $('#codeKala').val(item.KalaCode);
            $('#nameKala').val('(' + item.KalaCode + ') ' + item.KalaName);

            amountTextUpdate = item.MainUnitName;
            amountValueUpdate = item.MainUnit;

            SearchKalaArry(item.KalaCode, self.KalaList());

            kalapricecode = $("#gGhimat").val();
            getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, item.KalaCode);

            if (item.MainUnit == 1) {
                amo = item.Amount1;
                Price1 = item.UnitPrice;
            }
            else if (item.MainUnit == 2) {
                amo = item.Amount2;
                Price2 = item.UnitPrice;
            }
            else if (item.MainUnit == 3) {
                amo = item.Amount3;
                Price3 = item.UnitPrice;
            }
            amo != 0 ? $('#amount').val(NumberToNumberString(amo)) : $('#amount').val('');

            item.UnitPrice != 0 ? $('#unitPrice').val(NumberToNumberString(item.UnitPrice)) : $('#unitPrice').val('');
            item.TotalPrice != 0 ? $('#totalPrice').val(NumberToNumberString(item.TotalPrice)) : $('#totalPrice').val('');
            item.Discount != 0 ? $('#discountprice').val(NumberToNumberString(Math.abs(item.Discount))) : $('#discountprice').val('');
            ((Math.abs(item.Discount) * 100) / item.TotalPrice) != 0 ? $('#discountdarsad').val(NumberToNumberString(((Math.abs(item.Discount) * 100) / item.TotalPrice).toFixed(2))) : $('#discountdarsad').val('');
            $('#comm').val(item.Comm);

            flag = item.UP_Flag;

            if (flag == 1) {
                $("#unitPrice").css("backgroundColor", "white");
                $("#totalPrice").css("backgroundColor", "yellow");
            }
            else if (flag == 0) {
                $("#totalPrice").css("backgroundColor", "white");
                $("#unitPrice").css("backgroundColor", "yellow");
            }

            //if (self.flagupdateband == 1)
            $('#modal-Band').modal();
        }

    };
    //-------------------------------------------


    self.DeleteBand = function (factorBand) {

        Swal.fire({
            title: 'تایید حذف ؟',
            text: "آیا بند انتخابی حذف شود",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                ajaxFunction(FDocBUri + ace + '/' + sal + '/' + group + '/' + factorBand.SerialNumber + '/' + factorBand.BandNo, 'DELETE').done(function (response) {
                    self.FDocBList(response);
                    getFDocH(Serial);
                    CalcDiscontCol(self.CustCode());
                    flagFinalSave = false;
                    //self.UpdateFDocH();
                    showNotification(' بند شماره ' + factorBand.BandNo + ' حذف شد ', 1);
                    //Swal.fire({ type: 'success', title: 'حذف موفق', text: ' بند شماره ' + factorBand.BandNo + ' حذف شد ' });
                });
            }
        })
    };

    self.UpdateBand = function (factorBand) {
        self.flagupdateband = true;
    }


    $('#modal-hesab').on('shown.bs.modal', function () {
        $('#searchHesab').val('');
        self.filterCust('');
        self.filterCustList();
        $('#searchHesab').focus();
    });

    $('#modal-kala').on('shown.bs.modal', function () {
        $('#searchKala').val('');
        $('.fix').attr('class', 'form-line focused fix');
        self.filterKala('');
        self.filterKalaList();
        $('#searchKala').focus();
    });

    // $('#modal-kala').on('hide.bs.modal', function () {
    //     $('#modal-Band').css("overflow-x", "hidden");
    //    $('#modal-Band').css("overflow-y", "auto");
    //});





    $('#modal-Band').on('show.bs.modal', function () {

        if (self.flagupdateband == false) {
            self.ClearFDocB();
        } else {
            // kalapricecode = $("#gGhimat").val();
            // getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, KalaCode);
            //
            // if (item.MainUnit == 1) {
            //     amo = item.Amount1;
            //     Price1 = item.UnitPrice;
            // }
            // else if (item.MainUnit == 2) {
            //     amo = item.Amount2;
            //     Price2 = item.UnitPrice;
            // }
            // else if (item.MainUnit == 3) {
            //     amo = item.Amount3;
            //      Price3 = item.UnitPrice;
            //}
            $('#amounttext').text(amountTextUpdate);
            $('#unitName').val(amountValueUpdate);
            flagEditBand = true;
            // $(this).AmountCalc();
        }
        $('.fix').attr('class', 'form-line focused fix');
        $('#btnkala').focus();
    });

    $('#modal-Band').on('hide.bs.modal', function () {
        self.flagupdateband = false;
        self.bundNumberImport = 0;
        flagEditBand = false;
    });

    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#amount").focus();
    });

    $('#insertband').click(function () {
        self.flagupdateband = false;
    })

    $('#refreshcust').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: sessionStorage.ModeCode < 54 ? 'لیست خریداران به روز رسانی شود ؟' : 'لیست فروشندگان به روز رسانی شود ؟',
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getCustList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: sessionStorage.ModeCode < 54 ? 'لیست خریداران به روز رسانی شد' : 'لیست فروشندگان به روز رسانی شد' });
            }
        })
    })

    $('#refreshkala').click(function () {
        Swal.fire({
            title: 'تایید به روز رسانی ؟',
            text: "لیست کالا ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                $("div.loadingZone").show();
                getKalaList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: 'لیست کالا ها به روز رسانی شد' });
            }
        })
    })

    $.fn.CalcBand = function () {
        var unitName = $("#unitName").val();
        var amount;
        var unitPrice;
        var totalPrice;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        $("#unitPrice").val() == '' ? unitPrice = 0 : unitPrice = parseFloat(SlashToDot($("#unitPrice").val()));
        $("#totalPrice").val() == '' ? totalPrice = 0 : totalPrice = parseFloat(SlashToDot($("#totalPrice").val()));
        //if (flag == -1) flag = 0;
        var sum = 0;
        if (unitvalue > 0) {
            if (amount > 0) {
                if (unitvalue == "1") {
                    flag == 1 ? sum = (amount * unitPrice).toFixed(DeghatR1) : sum = (totalPrice / amount).toFixed(DeghatR1);
                }
                else if (unitvalue == "2") {
                    flag == 1 ? sum = (amount * unitPrice).toFixed(DeghatR2) : sum = (totalPrice / amount).toFixed(DeghatR2);
                }
                else if (unitvalue == "3") {
                    flag == 1 ? sum = (amount * unitPrice).toFixed(DeghatR3) : sum = (totalPrice / amount).toFixed(DeghatR3);
                }
            }
            else
                sum = 0;

            if (flag == 1) {
                $("#unitPrice").css("backgroundColor", "white");
                $("#totalPrice").css("backgroundColor", "yellow");
                sum != 0 ? $("#totalPrice").val(NumberToNumberString(parseFloat(sum).toFixed(parseInt(sessionStorage.Deghat)))) : $("#totalPrice").val('');
            }
            else if (flag == 0) {
                $("#totalPrice").css("backgroundColor", "white");
                $("#unitPrice").css("backgroundColor", "yellow");
                sum != 0 ? $("#unitPrice").val(NumberToNumberString(sum)) : $("#unitPrice").val('');
            }
            $(this).CalcDiscount();
        }
    }

    $.fn.CalcDiscount = function () {
        //ondblclick = "javascript:this.value=StringNumberToNumber(this.value);"
        var totalPrice;
        var discountprice;
        var discountdarsad;
        $("#totalPrice").val() == '' ? totalPrice = 0 : totalPrice = parseFloat(SlashToDot($("#totalPrice").val()));
        $("#discountprice").val() == '' ? discountprice = 0 : discountprice = parseFloat(SlashToDot($("#discountprice").val()));
        $("#discountdarsad").val() == '' ? discountdarsad = 0 : discountdarsad = parseFloat(SlashToDot($("#discountdarsad").val()));
        if (totalPrice > 0) {
            if (flagdiscount == 0) {
                ((discountprice * 100) / totalPrice) != 0 ? $("#discountdarsad").val(NumberToNumberString(((discountprice * 100) / totalPrice).toFixed(2))) : $("#discountdarsad").val('');
                // $("#discountprice").css("backgroundColor", "white");
                // $("#discountdarsad").css("backgroundColor", "yellow");
            }
            else if (flagdiscount == 1) {
                //$("#discountprice").val(NumberToNumberString(((totalPrice * discountdarsad) / 100).toFixed(parseInt(sessionStorage.Deghat))));
                ((totalPrice * discountdarsad) / 100) != 0 ? $("#discountprice").val(NumberToNumberString(((totalPrice * discountdarsad) / 100).toFixed(parseInt(sessionStorage.Deghat)))) : $("#discountprice").val('');

                //$("#discountprice").css("backgroundColor", "yellow");
                //$("#discountdarsad").css("backgroundColor", "white");
            }
        }
        else {
            $("#discountdarsad").val('');
            $("#discountprice").val('');
        }
    }


    $("#unitName").change(function () {
        var amounttext;
        var amountvalue;
        if (flagEditBand == false) {
            amounttext = $("#unitName option:selected").text();
            amountvalue = $("#unitName option:selected").val();
        }
        else {
            amounttext = amountTextUpdate;
            amountvalue = amountValueUpdate;
            $("#unitName").val(amountvalue);
            flagEditBand = false;
        }

        if (amountvalue == 1) {
            $("#iconzarib1").css("backgroundColor", "#c0bfbf");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (amountvalue == 2) {
            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "#c0bfbf");
            $("#iconzarib3").css("backgroundColor", "white");
        }
        else if (amountvalue == 3) {

            $("#iconzarib1").css("backgroundColor", "white");
            $("#iconzarib2").css("backgroundColor", "white");
            $("#iconzarib3").css("backgroundColor", "#c0bfbf");
        }

        $("#amounttext").text(amounttext);
        $("#unitPrice").val(0);
        $(this).AmountCalc();
    });

    $("#unitPrice").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flag = 1;
        $(this).CalcBand();
    });

    $("#totalPrice").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flag = 0;
        $(this).CalcBand();
    });

    $("#discountprice").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flagdiscount = 0;
        $(this).CalcDiscount();
    });

    $("#discountdarsad").keyup(function (e) {
        $('.fix').attr('class', 'form-line focused fix');
        if (e.keyCode != 9) flagdiscount = 1;
        $(this).CalcDiscount();
    });


    $.fn.AmountCalc = function () {

        var amount;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        oldprice = SlashToDot($("#unitPrice").val());
        oldtotalprice = SlashToDot($("#unitPrice").val());

        unitvalue = $("#unitName option:selected").val();

        if (unitvalue == "1") {
            $("#unitPrice").val() > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "2") {
            $("#unitPrice").val() > 0 ? $("#unitPrice").val(NumberToNumberString(Price2)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "3") {
            $("#unitPrice").val() > 0 ? $("#unitPrice").val(NumberToNumberString(Price3)) : $("#unitPrice").val('');
        }
        var a1 = 0;
        var a2 = 0;
        var a3 = 0;


        if (unitvalue == "1") {
            a1 = amount;
            zarib2 == 0 ? a2 = 0 : a2 = amount / zarib2;
            zarib3 == 0 ? a3 = 0 : a3 = amount / zarib3;
            //$("#unitPrice").val(NumberToNumberString(Price1));
            Price1 > 0 ? $("#unitPrice").val(NumberToNumberString(Price1)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "2") {
            a1 = amount * zarib2;
            a2 = amount;
            zarib3 == 0 ? a3 = 0 : a3 = amount / zarib2;
            Price2 > 0 ? $("#unitPrice").val(NumberToNumberString(Price2)) : $("#unitPrice").val('');
        }
        else if (unitvalue == "3") {
            a1 = (amount * zarib2) * (zarib2);
            a2 = amount * zarib2;
            a3 = amount;
            Price3 > 0 ? $("#unitPrice").val(NumberToNumberString(Price3)) : $("#unitPrice").val('');
        }

        if (oldprice > 0)
            $("#unitPrice").val(NumberToNumberString(oldprice))

        a1 != 0 ? a1 = a1.toFixed(DeghatM1) : a1 = "";
        a2 != 0 ? a2 = a2.toFixed(DeghatM2) : a2 = "";
        a3 != 0 ? a3 = a3.toFixed(DeghatM3) : a3 = "";

        $(this).CalcBand();

        $('#amount1').text(NumberToNumberString(DotToSlash(a1)));
        $('#amount2').text(NumberToNumberString(DotToSlash(a2)));
        $('#amount3').text(NumberToNumberString(DotToSlash(a3)));
    };

    $("#amount").keyup(function () {
        //flag = 1;
        $('.fix').attr('class', 'form-line focused fix');
        $(this).AmountCalc();
        $(this).CalcBand();
    });

    self.OptionsCaptionAnbar = ko.computed(function () {
        return self.InvList().length > 0 ? 'انبار را انتخاب کنید' : 'انبار تعریف نشده است';
    });

    /*  $("#allSearchHesab").click(function () {
          if ($("#allSearchHesab").is(':checked')) {
              $('#searchHesab').attr('placeholder', 'جستجو بر اساس همه موارد');
          }
          else {
              $('#searchHesab').attr('placeholder', sessionStorage.ModeCode < 54 ? 'جستجو بر اساس کد خریدار' : 'جستجو بر اساس کد فروشنده');
          }
      });
  
      $("#allSearchKala").click(function () {
          if ($("#allSearchKala").is(':checked')) {
              $('#searchKala').attr('placeholder', 'جستجو بر اساس همه موارد');
          }
          else {
              $('#searchKala').attr('placeholder', 'جستجو بر اساس کد کالا');
          }
      }); */

    self.mablaghAddminKeyDown = function (AddMinList, e) {
        if (e.shiftKey) {
            return
        }
        else {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
            );
        }
    }

    $('#FinalSave').click(function () {
        flagFinalSave = true;
    })


    $('#gGhimat').change(function () {
        a = $("#sumfactor").val();
        if ($("#sumfactor").val() != '' && viewAction == true) {

            Swal.fire({
                title: 'تایید و ثبت نهایی تغییرات ؟',
                text: "قیمت تمام کالاها با قیمت های ثبت شده در گروه قیمت کالای انتخاب شده پر می شوند آیا مطمئن هستید ؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'خیر',
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'بله'
            }).then((result) => {
                if (result.value) {
                    kalapricecode = $("#gGhimat").val();
                    if (kalapricecode == null) kalapricecode = "";
                    kalapricecode = $("#gGhimat").val();
                    flagKalaPrice = true;
                    self.UpdateFDocH();
                }
                else {
                    kalapricecode == '0' ? kalapricecode = '' : kalapricecode = kalapricecode;
                    $("#gGhimat").val(kalapricecode);
                    kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                }
            })
        }
    })


    $('#NewFactor').click(function () {

        Swal.fire({
            title: '',
            text: $('#TitleHeaderFactor').text() + " جدید ایجاد می شود . آیا مطمئن هستید ؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getAddMinList(sessionStorage.sels, -1, '', 0,
                    $("#AddMinSharh1").val(),
                    $("#AddMinSharh2").val(),
                    $("#AddMinSharh3").val(),
                    $("#AddMinSharh4").val(),
                    $("#AddMinSharh5").val(),
                    $("#AddMinSharh6").val(),
                    $("#AddMinSharh7").val(),
                    $("#AddMinSharh8").val(),
                    $("#AddMinSharh8").val(),
                    $("#AddMinSharh10").val(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                codeCust = '';
                sessionStorage.flagupdateHeader = 0;
                self.ClearFDocH();
                self.FDocBList([]); // ليست فاکتور
                self.AddMinList([]); // ليست کسورات و افزایشات 
                self.FDocHList([]); // لیست اطلاعات تکمیلی فاکتور فروش 
                $('#foottextsum').text('');
                $('#foottextamount1').text('');
                $('#foottextamount2').text('');
                $('#foottextamount3').text('');
                $('#foottexttotalprice').text('');
                $('#foottextdiscount').text('');
                $('#sumfactor').val('');
                $('#discountCol').val('');
                $('#ghabelpardakht').val('');
                $('#textnumberfactor').hide();
                $('#docnoout').text('جدید');
                sessionStorage.searchFDocH = "";
                $("#status").val('موقت');
                $("#paymenttype").val(0);
                sessionStorage.Eghdam = sessionStorage.userName;
                zarib1 = 0;
                zarib2 = 0;
                zarib3 = 0;
                DeghatR1 = 0;
                DeghatR2 = 0;
                DeghatR3 = 0;
                DeghatM1 = 0;
                DeghatM2 = 0;
                DeghatM3 = 0;
                discountCol = 0;
                oldAddMinPrice = 0;
                amountTextUpdate = "";
                amountValueUpdate = "";
                FDocHAmount1 = 0;
                FDocHAmount2 = 0;
                FDocHAmount3 = 0;
                FDocHTotalPrice = 0;
                FDocHFinalPrice = 0;
                FDocHDiscount = 0;
                self.bundNumberImport = 0;
                unitvalue = "";
                KalaCode = "";
                kalapricecode = 0;
                bandnumber = 0;
                bandnumberedit = 0;
                flagFinalSave = false;
                flag = -1;
                flagdiscount = -1;
                flagInsertFdoch = 0;
                self.flagupdateband = false;
                self.SerialNumber();
                self.DocNoOut();
                self.DocDate();
                self.Spec();
                self.CustCode();
                self.PriceCode = ko.observable(sessionStorage.GPriceDefult);
                self.InvCode = ko.observable(sessionStorage.InvDefult);
                self.BandNo();
                self.KalaCode();
                self.Amount1();
                self.Amount2();
                self.Amount3();
                self.UnitPrice();
                self.TotalPrice();
                self.Discount();
                self.MainUnit();
                self.Comm();
                if (sessionStorage.InvDefult != "null") $("#inv").val(sessionStorage.InvDefult);
                //$("#inv").val(sessionStorage.InvDefult);
                $("#gGhimat").val(sessionStorage.GPriceDefult);
                //sessionStorage.sels == "true" ? sessionStorage.GPriceDefultS : sessionStorage.GPriceDefultP
                $(this).CheckAccess();
            }
        })
    });

    $("#allSearchHesab").click(function () {
        if ($("#allSearchHesab").is(':checked')) {
            $('#allSearchHesabText').text('جستجو بر اساس همه موارد');
            allSearchHesab = true;
        }

        else {
            $('#allSearchHesabText').text(sessionStorage.ModeCode < 54 ? 'جستجو بر اساس کد خریدار' : 'جستجو بر اساس کد فروشنده');
            allSearchHesab = false;
        }
    });


    $("#allSearchKala").click(function () {
        if ($("#allSearchKala").is(':checked')) {
            $('#allSearchKalaText').text('جستجو بر اساس همه موارد');
            allSearchKala = true;
        }
        else {
            $('#allSearchKalaText').text('جستجو بر اساس کد کالا');
            allSearchKala = false;
        }
    });


    $('#action_headerfactor').attr('style', 'display: none');
    $('#action_bodyfactor').attr('style', 'display: none');
    $('#action_footerfactor').attr('style', 'display: none');
    $('#action_Fdoc').attr('style', 'display: none');
    $('#button_cust').attr('style', 'display: none');



    $.fn.CheckAccess = function () {

        if (sessionStorage.ModeCode == 51) {
            if (sessionStorage.AccessViewPishFactorForosh == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == 52) {
            if (sessionStorage.AccessViewFactorForosh == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == 53) {
            if (sessionStorage.AccessViewBackFactorForosh == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == 54) {
            if (sessionStorage.AccessViewPishFactorKharid == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == 55) {
            if (sessionStorage.AccessViewFactorKharid == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }
        else if (sessionStorage.ModeCode == 56) {
            if (sessionStorage.AccessViewBackFactorKharid == 'true') {
                viewAction = true;
            }
            else {
                if (sessionStorage.Eghdam == sessionStorage.userName) {
                    viewAction = true;
                }
            }
        }

        if (viewAction) {
            $('#action_headerfactor').removeAttr('style');
            $('#action_bodyfactor').removeAttr('style');
            $('#action_footerfactor').removeAttr('style');
            $('#action_Fdoc').removeAttr('style');
            $('#button_cust').removeAttr('style');
        }
    }

    $(this).CheckAccess();

    $("#searchHesab").on("keydown", function search(e) {
        if (allSearchHesab == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105)
                );
            }
        }
    });

    $("#searchKala").on("keydown", function search(e) {
        if (allSearchKala == false) {
            if (e.shiftKey) {
                e.preventDefault();
            }
            else {
                var key = e.charCode || e.keyCode || 0;
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||

                    (key >= 96 && key <= 105));
            }
        }
    });

    //    $('#modal-hesab').modal({ backdrop: 'static', keyboard: false })
};

ko.applyBindings(new ViewModel());





