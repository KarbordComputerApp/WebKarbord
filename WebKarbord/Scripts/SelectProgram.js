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

    function SetAceData() {
        localStorage.getItem('afi1List') != null ? afi1List = localStorage.getItem('afi1List').split("-") : afi1List = null;
        localStorage.getItem('afi8List') != null ? afi8List = localStorage.getItem('afi8List').split("-") : afi8List = null;
        localStorage.getItem('erjList') != null ? erjList = localStorage.getItem('erjList').split("-") : erjList = null;
        localStorage.getItem('afiList') != null ? afiList = JSON.parse(localStorage.getItem('afiList')) : afiList = null;

        var count = 0;

        $('#DropAce').text('');
        if (afi1List == "null"  && afi8List != "null" ) {
            sessionStorage.ace = 'Web8';
            sessionStorage.aceName = 'نرم افزار سیستم جامع';
            $('#DropAce').text(sessionStorage.aceName);
        }
        else if (afi1List != "null"  && afi8List == "null" ) {
            sessionStorage.ace = 'Web1';
            sessionStorage.aceName = 'نرم افزار مالی بازرگانی';
            $('#DropAce').text(sessionStorage.aceName)
        }
        else {
            sessionStorage.ace = 'Web2';
            sessionStorage.aceName = 'نرم افزار اتوماسیون';
            $('#DropAce').text(sessionStorage.aceName)
        }
    }

    TestUser();

    function SetGroupData() {
        var programSelect = sessionStorage.ace;
        $("#DropGroup").empty();
        $("#DropSal").empty();
        $("#DropGroup").append('<option value="0">گروه را انتخاب کنید</option>');
        $("#DropSal").append('<option value="0">سال را انتخاب کنید</option>');
        if (programSelect != 0) {

            for (var i = 0; i < afiList.length; i++) {

                value = afiList[i].Code < 10 ? "0" + afiList[i].Code : "" + afiList[i].Code;
                $("#DropGroup").append('<option value="'
                    + value + '">'
                    + afiList[i].Code + " - " + afiList[i].Name + '</option>');
            }
        }
    }

    function SetSalData() {
        var programSelect = sessionStorage.ace;
        var GroupSelect = $("#DropGroup").val();
        $("#DropSal").empty();
        $("#DropSal").append('<option value="0">سال را انتخاب کنید</option>');
        if (programSelect != 0 && GroupSelect != 0) {

            var DatabseSalObject = {
                ProgName: sessionStorage.progName,
                Group: GroupSelect,
                UserCode: sessionStorage.userName
            }

            ajaxFunction(DatabseSalUrl, 'Post', DatabseSalObject).done(function (data) {
                self.DatabseSalList(data);
                if (self.DatabseSalList().length > 0) {
                    for (var i = 1; i < self.DatabseSalList().length + 1; i++) {
                        var sal = self.DatabseSalList()[i - 1];
                        $("#DropSal").append('<option value="'
                            + sal.Code + '">'
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
