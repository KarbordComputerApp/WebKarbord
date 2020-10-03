var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;
    var group = sessionStorage.group;
    var forSels = true;
    var flagupdateHeader;
    var flagOtherFieldShow;
    sessionStorage.flagupdateHeader == 1 ? flagupdateHeader = 1 : flagupdateHeader = 0;

    $("#aceTest").text('نام نرم افزار' + sessionStorage.ace);
    $("#groupTest").text('نام گروه' + sessionStorage.group);
    $("#salTest").text('سال مالی' + sessionStorage.sal);

    sessionStorage.searchIDocH = "";
    var server = localStorage.getItem("ApiAddress");

    var codeThvl = '';

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

    var invCode = sessionStorage.InvCode;

    var totalPrice;

    var amountTextUpdate = "";
    var amountValueUpdate = "";


    var IDocHAmount1 = 0;
    var IDocHAmount2 = 0;
    var IDocHAmount3 = 0;
    var IDocHTotalPrice = 0;
    var IDocHFinalPrice = 0;

    self.bundNumberImport = 0;

    var unitvalue = "";

    var KalaCode = "";
    var kalapricecode = 0;

    var bandnumber = 0;
    var bandnumberedit = 0;

    var flagFinalSave = false;

    var flagKalaPrice = false;

    var flagEditBand = false;

    var flag = -1;
    var flagInsertIDoch = 0;
    self.flagupdateband = false;

    var allSearchThvl = true;
    var allSearchKala = true;

    self.SerialNumber = ko.observable();
    var Serial = '';
    self.DocNoOut = ko.observable();

    self.DocDate = ko.observable();
    self.Spec = ko.observable();
    self.ThvlCode = ko.observable();
    self.PriceCode = ko.observable();
    self.InvCode = ko.observable();
    self.modeCode = ko.observable();
    self.StatusSanad = ko.observable();

    self.BandNo = ko.observable();
    self.KalaCode = ko.observable();
    self.Amount1 = ko.observable();
    self.Amount2 = ko.observable();
    self.Amount3 = ko.observable();
    self.UnitPrice = ko.observable();
    self.TotalPrice = ko.observable();
    self.MainUnit = ko.observable();
    self.Comm = ko.observable();

    self.ThvlList = ko.observableArray([]); // ليست حساب ها
    self.KalaList = ko.observableArray([]); // ليست کالا ها
    self.KalaPriceList = ko.observableArray([]); // ليست گروه قيمت
    self.KalaPriceBList = ko.observableArray([]); // قيمت کالا بر اساس گروه قیمت
    self.IDocBList = ko.observableArray([]); // ليست بند های سند
    self.UnitList = ko.observableArray([]); // ليست واحد ها
    self.InvList = ko.observableArray([]); // ليست انبار ها
    self.IDocHList = ko.observableArray([]); // اطلاعات  سند  
    self.StatusList = ko.observableArray([]); // وضعیت  
    self.IModeList = ko.observableArray([]); // نوع سند 
    self.ExtraFieldsList = ko.observableArray([]); // لیست مشخصات اضافه 



    if (sessionStorage.InOut == 1) {
        $('#TitleHeaderAnbar').text('سند وارده به انبار ');
        $('#LableThvlCode').text('نام تحویل دهنده ');
        //$('#LableThvlCode').attr('placeholder', 'نام تحویل دهنده');
        $('#TitleModalThvl').text('لیست تحویل دهند گان ');
        $('#TitleCodeTableModalThvl').text('کد تحویل دهنده ');
        $('#TitleNameTableModalThvl').text('نام تحویل دهنده ');
        $('#ViewGGhimat').show();
        $('#ViewSpec').attr('class', 'col-sm-3');
        ModeCodeExtraFields = 'IDOCI';

    } else {
        $('#TitleHeaderAnbar').text('سند صادره از انبار');
        $('#LableThvlCode').text('تحویل گیرنده ');
        //$('#LableThvlCode').attr('placeholder', 'نام تحویل گیرنده ');
        $('#TitleModalThvl').text('لیست تحویل گیرند گان');
        $('#TitleCodeTableModalThvl').text('کد تحویل گیرنده ');
        $('#TitleNameTableModalThvl').text('نام تحویل گیرنده ');
        $('#ViewGGhimat').hide();
        $('#ViewSpec').attr('class', 'col-sm-5');
        ModeCodeExtraFields = 'IDOCO';
    }


    var KalaUri = server + '/api/Web_Data/Kala/'; // آدرس کالا ها
    var ThvlUri = server + '/api/Web_Data/Thvl/'; // آدرس حساب
    var KalaPriceBUri = server + '/api/Web_Data/KalaPriceB/'; //  آدرس  قيمت کالا بر اساس گروه قیمت
    var KalaPriceUri = server + '/api/Web_Data/KalaPrice/'; // آدرس گروه قيمت
    var IDocHiUri = server + '/api/AFI_IDocHi/'; // آدرس هدر سند 
    var IDocBiUri = server + '/api/AFI_IDocBi/'; // آدرس بند سند 
    var UnitUri = server + '/api/Web_Data/Unit/'; // آدرس واحد کالا 
    var InvUri = server + '/api/Web_Data/Inv/'; // آدرس انبار 
    var IDocHUri = server + '/api/IDocData/IDocH/'; // آدرس هدر سند 
    var IDocBUri = server + '/api/IDocData/IDocB/'; // آدرس لیست بند های سند 
    var StatusUri = server + '/api/Web_Data/Status/'; // آدرس وضعیت پرداخت 
    var IDocHLastDateUri = server + '/api/IDocData/IDocH/LastDate/'; // آدرس آخرین تاریخ سند
    var IModeUri = server + '/api/IDocData/IMode/'; // آدرس نوع سند
    var UpdatePriceUri = server + '/api/IDocData/UpdatePriceAnbar/'; // آدرس اعمال گروه قیمت
    var ExtraFieldsUri = server + '/api/Web_Data/ExtraFields/'; // آدرس مشخصات اضافه 



    //Get Thvl List
    function getThvlList() {
        ajaxFunction(ThvlUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.ThvlList(data);
        });
    }

    //Get kala List
    function getKalaList() {
        var KalaObject = {
            withimage: false,
            updatedate: null
        }
        ajaxFunction(KalaUri + ace + '/' + sal + '/' + group, 'POST', KalaObject).done(function (data) {
            self.KalaList(data);
        });
    }

    //Get ExtraFields List
    function getExtraFieldsList() {
        ajaxFunction(ExtraFieldsUri + ace + '/' + sal + '/' + group + '/' + ModeCodeExtraFields, 'GET').done(function (data) {
            self.ExtraFieldsList(data);
        });
    }



    //Get KalaPrice List
    function getKalaPriceList(insert) {
        ajaxFunction(KalaPriceUri + ace + '/' + sal + '/' + group + '/' + insert, 'GET').done(function (data) {
            self.KalaPriceList(data);
            if (self.KalaPriceList().length > 0) {
                if (flagupdateHeader == 1)
                    sessionStorage.PriceCode > 0 ? $("#gGhimat").val(sessionStorage.PriceCode) : null;
                else {
                    if (sessionStorage.InOut == 1) {
                        sessionStorage.GPriceDefultI == "0" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefultI);
                    }
                }
            }
        });
    }


    //Get Status List
    function getStatusList() {
        progName = getProgName('P');
        ajaxFunction(StatusUri + ace + '/' + sal + '/' + group + '/' + progName, 'GET').done(function (data) {
            self.StatusList(data);
            //if (self.StatusList().length > 0) {
               // if (flagupdateHeader == 1)
            //        $("#status").val(sessionStorage.Status);
            //}
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

    //Get Inv List
    function getInvList() {
        ajaxFunction(InvUri + ace + '/' + sal + '/' + group, 'GET').done(function (data) {
            self.InvList(data);
            //var storedNames = JSON.parse(localStorage.getItem("inv"));
            //self.InvList(storedNames);
            if (self.InvList().length > 0) {
                if (flagupdateHeader == 1) {
                   // $("#inv").val(sessionStorage.InvCode);
                   // self.InvCode(sessionStorage.InvCode);
                }
                else {

                    //if (sessionStorage.InvDefult != "null") $("#inv").val(sessionStorage.InvDefult);

                    if (sessionStorage.InvDefult == "null") {
                        $("#inv").val(sessionStorage.invSelect);
                    }
                    else {
                        $("#inv").val(sessionStorage.InvDefult);
                    }

                    //if (sessionStorage.InvDefult == "") {
                    //    $("#inv").val(sessionStorage.invSelect);
                    //}
                    //else {
                    //    $("#inv").val(sessionStorage.InvDefult);
                    //}
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

    //Get IMode List
    function getIModeList() {
        ajaxFunction(IModeUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.InOut, 'GET').done(function (data) {
            self.IModeList(data);
           // if (flagupdateHeader == 1)
              //  $("#modeCode").val(sessionStorage.ModeCodeValue);
            // else
            //   $("#modeCode").val();
        });
    }


    //Get IDocH 
    function getIDocH(serialNumber) {
        ajaxFunction(IDocHUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocHList(data);
            if (self.IDocHList().length > 0 && self.IDocBList().length > 0) { // اگر شامل اطلاعات سند بود
                $('#footertext').show();
                dataIDocH = self.IDocHList()[0];
                dataIDocH.Amount1 != null ? IDocHAmount1 = dataIDocH.Amount1 : IDocHAmount1 = 0;
                dataIDocH.Amount2 != null ? IDocHAmount2 = dataIDocH.Amount2 : IDocHAmount2 = 0;
                dataIDocH.Amount3 != null ? IDocHAmount3 = dataIDocH.Amount3 : IDocHAmount3 = 0;
                dataIDocH.TotalPrice != null ? IDocHTotalPrice = dataIDocH.TotalPrice : IDocHTotalPrice = 0;
                dataIDocH.FinalPrice != null ? IDocHFinalPrice = dataIDocH.FinalPrice : IDocHFinalPrice = 0;
                IDocHAmount1 == 0 ? $('#foottextsum').text('') : $('#foottextsum').text('جمع');
                IDocHAmount1 == 0 ? $('#foottextamount1').text('') : $('#foottextamount1').text(NumberToNumberString(IDocHAmount1.valueOf()));
                IDocHAmount2 == 0 ? $('#foottextamount2').text('') : $('#foottextamount2').text(NumberToNumberString(IDocHAmount2.valueOf()));
                IDocHAmount3 == 0 ? $('#foottextamount3').text('') : $('#foottextamount3').text(NumberToNumberString(IDocHAmount3.valueOf()));
                IDocHTotalPrice == 0 ? $('#foottexttotalprice').text('') : $('#foottexttotalprice').text(NumberToNumberString(parseFloat(IDocHTotalPrice).toFixed(parseInt(sessionStorage.Deghat))));
                $('#sumfactor').val(NumberToNumberString(parseFloat(IDocHTotalPrice).toFixed(parseInt(sessionStorage.Deghat))));
            }
            else {
                $('#footertext').hide();
            }
        });
    }
    //Get IDocB 
    function getIDocB(serialNumber) {
        ajaxFunction(IDocBUri + ace + '/' + sal + '/' + group + '/' + serialNumber, 'GET').done(function (data) {
            self.IDocBList(data);
        });
    }

    function getIDocHLastDate() {
        ajaxFunction(IDocHLastDateUri + ace + '/' + sal + '/' + group + '/' + sessionStorage.InOut, 'GET').done(function (data) {
            self.DocDate(data);
        });
    }

    function GetBandNumber() {

        if (self.IDocBList().length > 0) {
            bandnumber = self.IDocBList().length + 1;
        } else {
            bandnumber = 1;
        }
    }


    self.ClearIDocH = function ClearIDocH() {
        Serial = '';
        sessionStorage.flagupdateHeader = '0';
        flagupdateHeader = 0;
        self.DocNoOut('');
        self.DocDate($('#tarikh').val().toEnglishDigit());
        self.Spec('');
        self.ThvlCode('');
        $('#nameThvl').val('');
        self.PriceCode('');
        self.InvCode('');
    };


    self.ClearIDocB = function ClearIDocB() {
        $('#codeKala').val('');
        $('#nameKala').val('');
        //$("#unitName").empty();
        self.KalaCode('');
        self.Amount1('');
        self.Amount2('');
        self.Amount3('');
        self.UnitPrice('');
        self.TotalPrice('');
        self.MainUnit('');
        self.Comm('');

        $('#txtzarib1').text('مقدار 1');
        $('#txtzarib2').text('مقدار 2');
        $('#txtzarib3').text('مقدار 3');
        $('#amounttext').text('مقدار');
        $("#unitName").empty();

        $('#viewunit').hide();
        $('#amount1').text('');
        $('#amount2').text('');
        $('#amount3').text('');
        $("#amount").val('');
        $("#unitPrice").val('');
        $("#totalPrice").val('');
        $("#comm").val('');


        $("#totalPrice").css("backgroundColor", "white");
        $("#unitPrice").css("backgroundColor", "white");
        flag = -1;
    };

    self.ImportBand = function (item) {
        //self.ClearIDocB();
        self.flagupdateband = false;
        self.bundNumberImport = item.BandNo;
    }


    self.ButtonIDocH = function ButtonIDocH(newIDocH) {
        if (flagInsertIDoch == 0) {
            self.ClearIDocB();
            AddIDocH(newIDocH);
            flagInsertIDoch == 1 ? $('#modal-Band').modal() : null
        } else {
            $('#modal-Band').modal()
        }

    }

    //Add new IDocH 
    function AddIDocH(newIDocH) {
        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $('#inv').val();
        modeCode = $("#modeCode").val();

        bandnumber = 0;

        if (tarikh.length != 10) {
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را صحيح وارد کنيد' });
            return showNotification('تاريخ را صحيح وارد کنيد', 0);
        }

        if (tarikh == '') {
            return showNotification('تاريخ را وارد کنيد', 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را وارد کنيد' });
        }

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification('تاريخ وارد شده با سال انتخابي همخواني ندارد', 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ وارد شده با سال انتخابي همخواني ندارد' });
        }

        if (inv == '' || inv == null) {
            return showNotification('انبار را انتخاب کنيد', 0);
            // return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'انبار را انتخاب کنيد' });
        }

        if (modeCode == '') {
            return showNotification('نوع سند را انتخاب کنید', 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را وارد کنيد' });
        }

        if (self.DocNoOut == '') {
            // return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: ' شماره سند را وارد کنيد ' });
            return showNotification('شماره سند را وارد کنيد', 0);
        }



        if (codeThvl == '') {
            showNotification(sessionStorage.InOut == 1 ? 'تحویل دهنده انتخاب نشده است' : 'تحویل گیرنده انتخاب نشده است', 2);
        }


        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";
        var IDocHObject = {
            SerialNumber: 0,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            CustCode: codeThvl,//self.ThvlCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: modeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: 0,
            StartNo: 0,
            EndNo: 0,
            Tanzim: sessionStorage.userName,
            TahieShode: 'null',
            VstrCode: 'null',
            VstrPer: 0,
            PakhshCode: '',
            InvCode: inv,
            Eghdam: sessionStorage.userName,
            EghdamDate: 'null',
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
        };
        ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'POST', IDocHObject).done(function (response) {
            //$('#DatileFactor').show();
            //$('#Save').attr('disabled', true);
            var res = response.split("-");
            Serial = res[0];
            DocNoOut = res[1];
            $('#docnoout').text(DocNoOut);
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' مشخصات سند به شماره ' + DocNoOut + ' ذخيره شد ' });
        });
        flagInsertIDoch = 1;
    };



    self.UpdateIDocH = function UpdateIDocH(newIDocH) {
        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();
        modeCode = $("#modeCode").val();

        if (tarikh.length != 10) {
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را صحيح وارد کنيد' });
            return showNotification('تاريخ را صحيح وارد کنيد', 0);
        }

        if (tarikh == '') {
            return showNotification('تاريخ را وارد کنيد', 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را وارد کنيد' });
        }

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification('تاريخ وارد شده با سال انتخابي همخواني ندارد', 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ وارد شده با سال انتخابي همخواني ندارد' });
        }

        if (inv == '' || inv == null) {
            return showNotification('انبار را انتخاب کنيد', 0);
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'انبار را انتخاب کنيد' });
        }

        if (modeCode == '') {
            return showNotification('نوع سند را انتخاب کنید', 0);
            //    return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'تاريخ را وارد کنيد' });
        }


        if (codeThvl == '') {
            showNotification(sessionStorage.InOut == 1 ? 'تحویل دهنده انتخاب نشده است' : 'تحویل گیرنده انتخاب نشده است', 2);
        }

        if ($('#docnoout').text() == '0') {
            return showNotification('ابتدا بند ها وارد کنید', 0);
        }


        kalapricecode = $("#gGhimat").val();
        if (kalapricecode == null) kalapricecode = "";

        status = $("#status").val();
        var IDocHObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            DocDate: tarikh,//self.DocDate(),
            Spec: self.Spec(),
            CustCode: codeThvl,//self.ThvlCode(),
            KalaPriceCode: kalapricecode,
            UserCode: sessionStorage.userName,
            BranchCode: 0,
            ModeCode: modeCode,
            DocNoMode: 1,
            InsertMode: 0,
            DocNo: $("#docnoout").text(),
            StartNo: 0,
            EndNo: 0,
            Tanzim: sessionStorage.userName,
            TahieShode: sessionStorage.ace,
            VstrCode: 'null',
            VstrPer: 0,
            PakhshCode: '',
            InvCode: inv,
            Status: status,
            Taeed: status == "تایید" ? sessionStorage.userName : 'null',
            PaymentType: $("#paymenttype").val(),
            Footer: $("#footer").val(),
            deghat: parseInt(sessionStorage.Deghat),
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
        };

        ajaxFunction(IDocHiUri + ace + '/' + sal + '/' + group, 'PUT', IDocHObject).done(function (response) {
            //            $('#DatileFactor').show();
            //           $('#Save').attr('disabled', true);
            //            var res = response.split("-");
            //            Serial = res[0];
            //            DocNoOut = res[1];
            //            $('#docnoout').val(DocNoOut);
            sessionStorage.searchIDocH = Serial;
            //flagInsertIDoch = 0;
            //FinalSave

            if (flagKalaPrice == true) {
                ajaxFunction(UpdatePriceUri + ace + '/' + sal + '/' + group + '/' + Serial, 'POST').done(function (response) {
                    self.IDocBList(response);
                    getIDocH(Serial);
                    flagFinalSave = false;
                    flagKalaPrice = false;
                    showNotification('تغییرات با موفقیت انجام شد', 1)
                });
            } else {
                getIDocH(Serial);
            }



            if (flagupdateHeader == 1 && flagFinalSave == true) {
                sessionStorage.flagupdateHeader = 0;
                flagupdateHeader = 0;
                window.location.href = sessionStorage.urlIDocH;
            }
            else if (flagupdateHeader == 1 && flagFinalSave == false) {

            }
            else if (flagupdateHeader == 0 && flagFinalSave == false) {

            }
            else {
                Swal.fire({ type: 'success', title: 'ثبت موفق', text: 'سند' + ' ذخيره شد ' });
            }

        });

    }

    //Add new IDocB  
    self.AddIDocB = function AddIDocB(newIDocB) {

        var tarikh = $("#tarikh").val().toEnglishDigit();
        inv = $("#inv").val();
        modeCode = $("#modeCode").val();
        //var serialNumber = $("#docnoout").val();
        //bandnumber = bandnumber + 1;
        GetBandNumber();
        bandnumber = bandnumber;
        if (Serial == '') {
            return showNotification('اطلاعات اوليه سند ثبت نشده است', 0);
        }

        if (tarikh.length != 10) {
            return showNotification('تاريخ را صحيح وارد کنيد', 0);
        }

        if (tarikh == '') {
            return showNotification('تاريخ را وارد کنيد', 0);
        }

        if ((tarikh >= sessionStorage.BeginDate) && (tarikh <= sessionStorage.EndDate)) {
        }
        else {
            return showNotification('تاريخ وارد شده با سال انتخابي همخواني ندارد', 0);
        }

        if (inv == '' || inv == null) {
            return showNotification('انبار را انتخاب کنيد', 0);
        }

        if (modeCode == '') {
            return showNotification('نوع سند را انتخاب کنید', 0);
        }





        //        var cKala = $('#codeKala').val();
        var nKala = $('#nameKala').val();
        //var uKala = $('#unitName').val();

        var uKala = $("#unitName option:selected").val();

        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());
        comm = $("#comm").val();

        if (KalaCode == '' || nKala == '' || uKala == '') {
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'کالا را وارد کنيد' });
            return showNotification('کالا را وارد کنید', 0);
        }

        if (amount == '') {
            amount = 0;
            //return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'مقدار را وارد کنيد' });
        }

        if ((unitprice == '' && totalPrice == '') || (sessionStorage.InOut == 2)) {
            unitprice = 0;
            totalPrice = 0;
        }

        $('#Save').attr('disabled', 'disabled');

        var IDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumber,
            KalaCode: KalaCode,
            Amount1: SlashToDot($('#amount1').text()),// self.Amount1(),
            Amount2: SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice + '',
            TotalPrice: totalPrice + '',//self.TotalPrice(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag
        };
        if (self.bundNumberImport > 0) {
            bandnumber = self.bundNumberImport;
        }

        ajaxFunction(IDocBiUri + ace + '/' + sal + '/' + group + '/' + bandnumber, 'POST', IDocBObject).done(function (response) {
            self.IDocBList(response);
            getIDocH(Serial);
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند شماره ' + bandnumber + ' ذخيره شد ' });
            self.flagupdateband = false;
            self.bundNumberImport = 0;
            self.ClearIDocB();
            $('#Save').removeAttr('disabled');
            showNotification(' بند شماره ' + bandnumber + ' ذخيره شد ', 1);
        });
        $('#Save').removeAttr('disabled');

    };

    //update IDocB
    self.UpdateIDocB = function UpdateIDocB(newIDocB) {
        //KalaCode = $("#codeKala").val();
        //        bandnumber = bandnumber + 1;
        if (Serial == '') {
            return Swal.fire({ type: 'danger', title: 'اطلاعات ناقص', text: ' اطلاعات اوليه سند ثبت نشده است ' });
        }
        var cKala = $('#codeKala').val();
        var nKala = $('#nameKala').val();
        var uKala = $("#unitName option:selected").val();

        var amount = SlashToDot($("#amount").val());
        var unitprice = SlashToDot($("#unitPrice").val());
        totalPrice = SlashToDot($("#totalPrice").val());
        comm = $("#comm").val();

        if (cKala == '' || nKala == '' || uKala == '') {
            return Swal.fire({ type: 'info', title: 'اطلاعات ناقص', text: 'کالا را وارد کنيد' });
        }

        if (amount == '') {
            amount = 0;
        }

        if ((unitprice == '' && totalPrice == '') || (sessionStorage.InOut == 2)) {
            unitprice = 0;
            totalPrice = 0;
        }

        var IDocBObject = {
            SerialNumber: Serial,//self.SerialNumber(),
            BandNo: bandnumberedit,
            KalaCode: KalaCode,
            Amount1: SlashToDot($('#amount1').text()),// self.Amount1(),
            Amount2: SlashToDot($('#amount2').text()),//self.Amount2(),
            Amount3: SlashToDot($('#amount3').text()),//self.Amount3(),
            UnitPrice: unitprice,
            TotalPrice: totalPrice,//self.TotalPrice(),
            MainUnit: uKala,//self.MainUnit(),
            Comm: comm,
            Up_Flag: flag
        };

        ajaxFunction(IDocBiUri + ace + '/' + sal + '/' + group + '/' + bandnumberedit, 'PUT', IDocBObject).done(function (response) {
            self.IDocBList(response);
            getIDocH(Serial);
            self.flagupdateband = false;
            //Swal.fire({ type: 'success', title: 'ثبت موفق', text: ' بند شماره ' + bandnumberedit + ' ویرایش شد ' });
            flagFinalSave = false;
            //if (flagupdateHeader == 1) {
            //    self.UpdateIDocH();
            //}
            $('#modal-Band').modal('hide');
            self.ClearIDocB();
            showNotification(' بند شماره ' + bandnumberedit + ' ویرایش شد ', 1);
        });
    };

    self.SerialNumber('0');

    //$('#DatileFactor').hide();

    if (flagupdateHeader != 1) {
        getIDocHLastDate();
    }

    getIModeList();
    getThvlList();
    getKalaList();
    getExtraFieldsList();
    //AddModeCode();
    flagupdateHeader == 1 ? getKalaPriceList(false) : getKalaPriceList(true);
    getInvList();


    getStatusList();

    if (flagupdateHeader == 1) {
        flagInsertIDoch = 1;
        Serial = sessionStorage.SerialNumber;
        self.SerialNumber(Serial);
        self.DocNoOut(sessionStorage.DocNo);
        self.DocDate(sessionStorage.DocDate);
        self.Spec(sessionStorage.Spec);
        self.ThvlCode(sessionStorage.ThvlCode);
        codeThvl = sessionStorage.ThvlCode;
        kalapricecode = sessionStorage.PriceCode;
        self.PriceCode(sessionStorage.PriceCode);
        self.InvCode(sessionStorage.InvCode);
        $("#inv").val(sessionStorage.InvCode);
        if (sessionStorage.ThvlCode != '') 
            $('#nameThvl').val('(' + sessionStorage.ThvlCode + ') ' + sessionStorage.thvlname);
        else
            $('#nameThvl').val('');

        $("#docnoout").text(sessionStorage.DocNo);
        //  $("#modeCode").val(sessionStorage.ModeCodeValue);

        self.PriceCode(sessionStorage.PriceCode);
        $("#gGhimat").val(sessionStorage.PriceCode);

        getIDocB(Serial);
        getIDocH(Serial);

        $("#modeCode").val(sessionStorage.ModeCodeValue);
        self.modeCode(sessionStorage.ModeCodeValue);

        $("#footer").val(sessionStorage.Footer);

        self.StatusSanad(sessionStorage.Status);
        $("#status").val(sessionStorage.Status);
        //sessionStorage.flagupdateHeader = 0;
        flagOtherFieldShow = true;
    }

    //$(document).ready(function () { });
    //------------------------------------------------------
    self.currentPageThvl = ko.observable();
    self.currentPageKala = ko.observable();

    self.pageSizeThvl = ko.observable(10);
    self.pageSizeKala = ko.observable(10);
    self.currentPageIndexThvl = ko.observable(0);
    self.currentPageIndexKala = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.filterThvl0 = ko.observable("");
    self.filterThvl1 = ko.observable("");
    self.filterThvl2 = ko.observable("");


    self.filterThvlList = ko.computed(function () {

        self.currentPageIndexThvl(0);
        var filter0 = self.filterThvl0().toUpperCase();
        var filter1 = self.filterThvl1();
        var filter2 = self.filterThvl2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ThvlList();
        } else {
            tempData = ko.utils.arrayFilter(self.ThvlList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageThvl = ko.computed(function () {
        var pageSizeThvl = parseInt(self.pageSizeThvl(), 10),
            startIndex = pageSizeThvl * self.currentPageIndexThvl(),
            endIndex = startIndex + pageSizeThvl;
        return self.filterThvlList().slice(startIndex, endIndex);
    });


    self.nextPageThvl = function () {
        if (((self.currentPageIndexThvl() + 1) * self.pageSizeThvl()) < self.filterThvlList().length) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() + 1);
        }
    };

    self.previousPageThvl = function () {
        if (self.currentPageIndexThvl() > 0) {
            self.currentPageIndexThvl(self.currentPageIndexThvl() - 1);
        }
    };

    self.firstPageThvl = function () {
        self.currentPageIndexThvl(0);
    };

    self.lastPageThvl = function () {
        countThvl = parseInt(self.filterThvlList().length / self.pageSizeThvl(), 10);
        if ((self.filterThvlList().length % self.pageSizeThvl()) == 0)
            self.currentPageIndexThvl(countThvl - 1);
        else
            self.currentPageIndexThvl(countThvl);
    };

    self.sortTableThvl = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        self.currentColumn(orderProp);
        self.ThvlList.sort(function (left, right) {
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

    self.filterKala0 = ko.observable("");
    self.filterKala1 = ko.observable("");
    self.filterKala2 = ko.observable("");
    self.filterKala3 = ko.observable("");

    self.filterKalaList = ko.computed(function () {
        self.currentPageIndexKala(0);
        var filter0 = self.filterKala0().toUpperCase();
        var filter1 = self.filterKala1();
        var filter2 = self.filterKala2();
        var filter3 = self.filterKala3();

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
    };

    self.previousPageKala = function () {
        if (self.currentPageIndexKala() > 0) {
            self.currentPageIndexKala(self.currentPageIndexKala() - 1);
        }
    };

    self.firstPageKala = function () {
        self.currentPageIndexKala(0);
    };

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
    self.selectThvl = function (item) {

        codeThvl = item.Code;
        $('#nameThvl').val('(' + item.Code + ') ' + item.Name)
        //sessionStorage.GPriceDefult == "null" ? $("#gGhimat").val('') : $("#gGhimat").val(sessionStorage.GPriceDefult);

        //if (sessionStorage.ModeCode == 'out' && item.CGruKalaPriceCode_S > 0)
        //    $("#gGhimat").val(item.CGruKalaPriceCode_S);
        //else if (sessionStorage.ModeCode == 'in' && item.CGruKalaPriceCode_P > 0)
        //    $("#gGhimat").val(item.CGruKalaPriceCode_P);

        //if (sessionStorage.ModeCode == 'out' && item.KalaPriceCode_S > 0)
        //    $("#gGhimat").val(item.KalaPriceCode_S);
        //else if (sessionStorage.ModeCode == 'in' && item.KalaPriceCode_P > 0)
        //    $("#gGhimat").val(item.KalaPriceCode_P);

        self.ThvlCode(item.Code)
        //if (Serial != '') {
        //    self.UpdateIDocH();
        //}
        $('#nameThvl').focus();

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
        KalaCode = item.Code;
        self.ClearIDocB();
        getUnit(item.Code);
        kalapricecode = $("#gGhimat").val();
        Price1 = item.PPrice1;
        Price2 = item.PPrice2;
        Price3 = item.PPrice3;

        getKalaPriceBList(kalapricecode == '' ? 0 : kalapricecode, item.Code);
        zarib1 = item.zarib1;
        zarib2 = item.zarib2;
        zarib3 = item.zarib3;

        DeghatR1 = item.DeghatR1;
        DeghatR2 = item.DeghatR2;
        DeghatR3 = item.DeghatR3;

        DeghatM1 = item.DeghatM1;
        DeghatM2 = item.DeghatM2;
        DeghatM3 = item.DeghatM3;

        // if (sessionStorage.sels == "true") {
        //     Price1 = item.SPrice1;
        //     Price2 = item.SPrice2;
        //      Price3 = item.SPrice3;
        // } else {

        //  }

        $('#codeKala').val(item.Code);
        $('#nameKala').val('(' + item.Code + ') ' + item.Name);

        //$('#unitName').val(item.UnitName1);
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

                Price1 = myArray[i].PPrice1;
                Price2 = myArray[i].PPrice2;
                Price3 = myArray[i].PPrice3;
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
                $("#iconzarib1").css("backgroundColor", "#c0bfbf");
                $("#iconzarib2").css("backgroundColor", "white");
                $("#iconzarib3").css("backgroundColor", "white");
            }
            else if (item.MainUnit == 2) {
                amo = item.Amount2;
                Price2 = item.UnitPrice;
                $("#iconzarib1").css("backgroundColor", "white");
                $("#iconzarib2").css("backgroundColor", "#c0bfbf");
                $("#iconzarib3").css("backgroundColor", "white");
            }
            else if (item.MainUnit == 3) {
                amo = item.Amount3;
                Price3 = item.UnitPrice;
                $("#iconzarib1").css("backgroundColor", "white");
                $("#iconzarib2").css("backgroundColor", "white");
                $("#iconzarib3").css("backgroundColor", "#c0bfbf");
            }
            amo != 0 ? $('#amount').val(NumberToNumberString(amo)) : $('#amount').val('');

            item.UnitPrice != 0 ? $('#unitPrice').val(NumberToNumberString(item.UnitPrice)) : $('#unitPrice').val('');
            item.TotalPrice != 0 ? $('#totalPrice').val(NumberToNumberString(item.TotalPrice)) : $('#totalPrice').val('');
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

            $('#amount1').text(NumberToNumberString(item.Amount1));
            $('#amount2').text(NumberToNumberString(item.Amount2));
            $('#amount3').text(NumberToNumberString(item.Amount3));

            //if (self.flagupdateband == true)
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

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                ajaxFunction(IDocBiUri + ace + '/' + sal + '/' + group + '/' + factorBand.SerialNumber + '/' + factorBand.BandNo, 'DELETE').done(function (response) {
                    self.IDocBList(response);
                    getIDocH(Serial);
                    flagFinalSave = false;
                    //self.UpdateIDocH();
                    Swal.fire({ type: 'success', title: 'حذف موفق', text: ' بند شماره ' + factorBand.BandNo + ' حذف شد ' });
                });
            }
        })
    };

    self.UpdateBand = function (factorBand) {
        self.flagupdateband = true;
    }



    $('#modal-Thvl').on('shown.bs.modal', function () {
        $('#searchThvl').val('');
        self.filterThvl('');
        self.filterThvlList();
        $('#searchThvl').focus();
    });

    $('#modal-kala').on('shown.bs.modal', function () {
        $('#searchKala').val('');
        $('.fix').attr('class', 'form-line focused fix');
        self.filterKala('');
        self.filterKalaList();
        $('#searchKala').focus();
    });


    $('#modal-Band').on('show.bs.modal', function () {

        if (sessionStorage.InOut == 1) {
            $('#unitPriceShow').show();
            $('#totalPriceShow').show();
        }
        else {
            $('#unitPriceShow').hide();
            $('#totalPriceShow').hide();
        }

        if (self.flagupdateband == false) {
            self.ClearIDocB();
        } else {
            $('#amounttext').text(amountTextUpdate);
            $('#unitName').val(amountValueUpdate);
            flagEditBand = true;
            //$(this).AmountCalc();
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

    $('#refreshThvl').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: sessionStorage.InOut == 1 ? 'لیست تحویل دهندگان به روز رسانی شود ؟' : 'لیست تحویل گیرندگان به روز رسانی شود ؟',
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                getThvlList();
                $("div.loadingZone").hide();
                // Swal.fire({ type: 'success', title: 'عملیات موفق', text: sessionStorage.ModeCode != 'in' ? 'لیست تحویل گیرندگان به روز رسانی شد' : 'لیست تحویل دهندگان به روز رسانی شد' });
            }
        })
    })

    $('#refreshkala').click(function () {

        Swal.fire({
            title: 'تایید به روز رسانی',
            text: "لیست کالا ها به روز رسانی شود ؟",
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',

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


    $("#unitName").click(function () {

        flagEditBand = false;
    });

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

            // $("#unitName").text(amounttext);
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


        /*if (amountvalue == 1) {
            $("#iconzarib1").show();
            $("#iconzarib2").hide();
            $("#iconzarib3").hide();
        }
        else if (amountvalue == 2) {
            $("#iconzarib1").hide();
            $("#iconzarib2").show();
            $("#iconzarib3").hide();
        }
        else if (amountvalue == 3) {
            $("#iconzarib1").hide();
            $("#iconzarib2").hide();
            $("#iconzarib3").show();
        }*/

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


    $.fn.AmountCalc = function () {

        var amount;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        oldprice = SlashToDot($("#unitPrice").val());
        //if ( $("#unitName option:selected").val() == null) 
        //  unitvalue = amountValueUpdate;
        //else     
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

    $.fn.CalcBand = function () {
        var unitName = $("#unitName").val();
        var amount;
        var unitPrice;
        var totalPrice;
        $("#amount").val() == '' ? amount = 0 : amount = parseFloat(SlashToDot($("#amount").val()));
        $("#unitPrice").val() == '' ? unitPrice = 0 : unitPrice = parseFloat(SlashToDot($("#unitPrice").val()));
        $("#totalPrice").val() == '' ? totalPrice = 0 : totalPrice = parseFloat(SlashToDot($("#totalPrice").val()));

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
        }
    }

    $("#amount").keyup(function () {
        flag = 1;
        $('.fix').attr('class', 'form-line focused fix');
        $(this).AmountCalc();
        $(this).CalcBand();
    });

    self.OptionsCaptionAnbar = ko.computed(function () {
        return self.InvList().length > 0 ? 'انبار را انتخاب کنید' : 'انبار تعریف نشده است';
    });



    $("#allSearchThvl").click(function () {
        if ($("#allSearchThvl").is(':checked')) {
            $('#allSearchThvlText').text('جستجو بر اساس همه موارد');
            allSearchThvl = true;

        }
        else {
            $('#allSearchThvlText').text(sessionStorage.InOut == 1 ? 'جستجو بر اساس کد تحویل دهنده' : 'جستجو بر اساس کد تحویل گیرنده');
            allSearchThvl = false;
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


    $('#FinalSave').click(function () {
        flagFinalSave = true;
    })

    $("#gGhimat").change(function () {

        if ($("#textBandNo").text() > '0' && viewAction == true) {
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
                    self.UpdateIDocH();
                }
                else {
                    kalapricecode == '0' ? kalapricecode = '' : kalapricecode = kalapricecode;
                    $("#gGhimat").val(kalapricecode);
                    kalapricecode == '' ? kalapricecode = '0' : kalapricecode = kalapricecode;
                }
            })
        }
    })

    $('#AddNewSanadAnbar').click(function () {

        Swal.fire({
            title: '',
            text: $('#TitleHeaderAnbar').text() + " جدید ایجاد می شود . آیا مطمئن هستید ؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'خیر',
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.value) {
                sessionStorage.flagupdateHeader = 0;
                window.location.href = sessionStorage.urlAddIDocH;
            }
        })
    });




    $('#action_header').attr('style', 'display: none');
    $('#action_body').attr('style', 'display: none');
    $('#action_footer').attr('style', 'display: none');
    $('#action_Hdoc').attr('style', 'display: none');
    $('#insertband').attr('style', 'display: none');



    var viewAction = false;

    if (sessionStorage.InOut == 1) {
        if (sessionStorage.AccessViewSanadAnbarVarede == 'true') {
            viewAction = true;
        }
        else {
            if (sessionStorage.Eghdam == sessionStorage.userName) {
                viewAction = true;
            }
        }
    }
    else {
        if (sessionStorage.AccessViewSanadAnbarSadere == 'true') {
            viewAction = true;
        }
        else {
            if (sessionStorage.Eghdam == sessionStorage.userName) {
                viewAction = true;
            }
        }
    }

    if (sessionStorage.CHG == 'false' && flagupdateHeader == 1)
        viewAction = false;

    if (viewAction) {
        $('#action_header').removeAttr('style');
        $('#action_body').removeAttr('style');
        $('#action_footer').removeAttr('style');
        $('#action_Hdoc').removeAttr('style');
        $('#insertband').removeAttr('style');
    }


    $("#searchThvl").on("keydown", function search(e) {
        if (allSearchThvl == false) {
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

    $('#modal-OtherField').on('shown.bs.modal', function () {
        if (flagOtherFieldShow == true) {
            $("#ExtraFields1").val(sessionStorage.F01);
            $("#ExtraFields2").val(sessionStorage.F02);
            $("#ExtraFields3").val(sessionStorage.F03);
            $("#ExtraFields4").val(sessionStorage.F04);
            $("#ExtraFields5").val(sessionStorage.F05);
            $("#ExtraFields6").val(sessionStorage.F06);
            $("#ExtraFields7").val(sessionStorage.F07);
            $("#ExtraFields8").val(sessionStorage.F08);
            $("#ExtraFields9").val(sessionStorage.F09);
            $("#ExtraFields10").val(sessionStorage.F10);
            $("#ExtraFields11").val(sessionStorage.F11);
            $("#ExtraFields12").val(sessionStorage.F12);
            $("#ExtraFields13").val(sessionStorage.F13);
            $("#ExtraFields14").val(sessionStorage.F14);
            $("#ExtraFields15").val(sessionStorage.F15);
            $("#ExtraFields16").val(sessionStorage.F16);
            $("#ExtraFields17").val(sessionStorage.F17);
            $("#ExtraFields18").val(sessionStorage.F18);
            $("#ExtraFields19").val(sessionStorage.F19);
            $("#ExtraFields20").val(sessionStorage.F20);
            flagOtherFieldShow = false;
        }
    });

    createViewer();
    $('#Print').click(function () {
        setReport(self.IDocBList(), 'Free');
    });



};

ko.applyBindings(new ViewModel());










