var ViewModel = function () {
    var self = this;
    var aceList = [];
    var afiList = [];
    var accList = [];
    var invList = [];
    var fctList = [];
    var erjList = [];

    var DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
    self.DatabseSalList = ko.observableArray([]); // دیتابیس های سال

    $('#information').hide();

    function SetAceData() {
        localStorage.getItem('afiList') != null ? afiList = localStorage.getItem('afiList').split("-") : afiList = null;
        //localStorage.getItem('afi8List') != null ? afi8List = localStorage.getItem('afi8List').split("-") : afi8List = null;
        localStorage.getItem('accList') != null ? accList = localStorage.getItem('accList').split("-") : accList = null;
        localStorage.getItem('invList') != null ? invList = localStorage.getItem('invList').split("-") : invList = null;
        localStorage.getItem('fctList') != null ? fctList = localStorage.getItem('fctList').split("-") : fctList = null;
        localStorage.getItem('erjList') != null ? erjList = localStorage.getItem('erjList').split("-") : erjList = null;

        var count = 0;
        /*if (afiList[0] != "null") {
            count = count + 1;

            aceList[count] = 'نرم افزار مالی بازرگانی';
        }
        if (accList[0] != "null") {
            count = count + 1;
            aceList[count] = 'نرم افزار حسابداری';
        }
        if (invList[0] != "null") {
            count = count + 1;
            aceList[count] = 'نرم افزار انبار';
        }
        if (fctList[0] != "null") {
            count = count + 1;
            aceList[count] = 'نرم افزار فروش';
        }*/

        $('#DropAce').text('');
        if (afiList == null || afiList == '') {
            sessionStorage.ace = 'AFI8';
            $('#DropAce').text('نرم افزار سیستم جامع');

        }
        else {
            sessionStorage.ace = 'AFI1';
            $('#DropAce').text('نرم افزار مالی بازرگانی')
        }

        //$("#DropAce").append('<option value="0">نرم افزار را انتخاب کنید</option>');
        //for (var i = 1; i < aceList.length; i++) {
        //   if (aceList[i] == 'نرم افزار مالی بازرگانی') val = 'AFI1';
        //   if (aceList[i] == 'نرم افزار سیستم جامع') val = 'AFI8';
        /*if (aceList[i] == 'نرم افزار حسابداری') val = 'ACC5';
        if (aceList[i] == 'نرم افزار انبار') val = 'INV5';
        if (aceList[i] == 'نرم افزار فروش') val = 'FCT5';*/

        //   $("#DropAce").append('<option value="'
        //       + val + '">'
        //       + aceList[i] + '</option>');
        //}
    }

    function SetGroupData() {
        var programSelect = sessionStorage.ace;
        $("#DropGroup").empty();
        $("#DropSal").empty();
        $("#DropGroup").append('<option value="0">گروه را انتخاب کنید</option>');
        $("#DropSal").append('<option value="0">سال را انتخاب کنید</option>');
        if (programSelect != 0) {
            if (programSelect == 'AFI1') {
                for (var i = 0; i < afiList.length; i++) {
                    $("#DropGroup").append('<option value="'
                        + afiList[i] + '">'
                        + afiList[i] + '</option>');
                }
            }
            if (programSelect == 'AFI8') {
                for (var i = 0; i < accList.length; i++) {
                    $("#DropGroup").append('<option value="'
                        + accList[i] + '">'
                        + accList[i] + '</option>');
                }
            }
            /*if (programSelect == 'INV5') {
                for (var i = 0; i < invList.length; i++) {
                    $("#DropGroup").append('<option value="'
                        + invList[i] + '">'
                        + invList[i] + '</option>');
                }
            }
            if (programSelect == 'FCT5') {
                for (var i = 0; i < fctList.length; i++) {
                    $("#DropGroup").append('<option value="'
                        + fctList[i] + '">'
                        + fctList[i] + '</option>');
                }
            }*/
        }
    }

    function SetSalData() {
        var programSelect = sessionStorage.ace;
        var GroupSelect = $("#DropGroup").val();
        $("#DropSal").empty();
        $("#DropSal").append('<option value="0">سال را انتخاب کنید</option>');
        if (programSelect != 0 && GroupSelect != 0) {
            ajaxFunction(DatabseSalUrl + programSelect + '/' + GroupSelect, 'GET').done(function (data) {
                self.DatabseSalList(data);
                if (self.DatabseSalList().length > 0) {
                    for (var i = 1; i < self.DatabseSalList().length + 1; i++) {
                        var sal = self.DatabseSalList()[i - 1];
                        $("#DropSal").append('<option value="'
                            + sal.Name + '">'
                            + sal.Name + '</option>');
                        if (localStorage.getItem('sal') != null) {
                            $("#DropSal").val(localStorage.getItem('sal'));
                        }
                    }
                }
            });
        }
    }

    SetAceData();
    SetGroupData();

    $("#DropAce").change(function () {
        $('#information').hide();
        SetGroupData();
    });


    $("#DropGroup").change(function () {
        $('#information').hide();
        SetSalData();
    });

    $("#DropSal").change(function () {
        $('#information').hide();
    });

    if (localStorage.getItem('ace') != null) {
        $("#DropAce").val(localStorage.getItem('ace'));
        SetGroupData();
        if (localStorage.getItem('group') != null) {
            $("#DropGroup").val(localStorage.getItem('group'));
            SetSalData();
        }
    }

};
ko.applyBindings(new ViewModel());
