﻿var ViewModel = function () {
    var self = this;
    var aceList = [];
    var afi1List = [];
    var afi8List = [];
    var afiList = [];
    var erjList = [];

    var DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
    self.DatabseSalList = ko.observableArray([]); // دیتابیس های سال

    $('#information').hide();
    //$("#P_AccessRefresh").hide();

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
        if (afi1List == "null" && afi8List != "null") {
            //localStorage.setItem('ace', 'Web8');
            //localStorage.setItem('aceName', 'نرم افزار سیستم جامع');

            sessionStorage.ace = 'Web8';
            localStorage.setItem("ace", 'Web8');
            localStorage.setItem("aceName", translate('نرم افزار سیستم جامع'));
            sessionStorage.aceName = translate('نرم افزار سیستم جامع');
            $('#DropAce').text(sessionStorage.aceName);
            $('#ace_TitleMenu').text(sessionStorage.aceName);

        }
        else if (afi1List != "null" && afi8List == "null") {
            //localStorage.setItem('ace', 'Web1');
            //localStorage.setItem('aceName', 'نرم افزار مالی بازرگانی');

            sessionStorage.ace = 'Web1';
            localStorage.setItem("ace", 'Web1');
            localStorage.setItem("aceName", translate('نرم افزار مالی بازرگانی'));
            sessionStorage.aceName = translate('نرم افزار مالی بازرگانی');
            $('#DropAce').text(sessionStorage.aceName)
            $('#ace_TitleMenu').text(sessionStorage.aceName);
        }
        else {
            //localStorage.setItem('ace', 'Web2');
            //localStorage.setItem('aceName', 'نرم افزار اتوماسیون');

            sessionStorage.ace = 'Web2';
            localStorage.setItem("ace", 'Web2');
            sessionStorage.aceName = 'نرم افزار اتوماسیون';
            localStorage.setItem("aceName", 'نرم افزار اتوماسیون');
            $('#DropAce').text(sessionStorage.aceName)
            $('#ace_TitleMenu').text(sessionStorage.aceName);
        }
    }

    TestUser();

    var onlyGroupErj = localStorage.getItem('onlyGroupErj');

    function SetGroupData() {
        var programSelect = sessionStorage.ace;
        $("#DropGroup").empty();
        $("#DropSal").empty();
        $("#DropGroup").append('<option value="0">' + translate('گروه را انتخاب کنید')+'</option>');
        $("#DropSal").append('<option value="0">سال را انتخاب کنید</option>');
        if (programSelect != 0) {

            for (var i = 0; i < afiList.length; i++) {
                value = afiList[i].Code < 10 ? "0" + afiList[i].Code : "" + afiList[i].Code;
                $("#DropGroup").append('<option value="'
                    + value + '">'
                    + afiList[i].Code + " - " + afiList[i].Name + '</option>');
            }

            if (onlyGroupErj != '' && onlyGroupErj != 'null' && onlyGroupErj != null) {

                var onlyGroupErjList = onlyGroupErj.split('-');

                for (var i = 0; i < onlyGroupErjList.length; i++) {
                    $("#DropGroup").append('<option value="'
                        + onlyGroupErjList[i] + '">'
                        + onlyGroupErjList[i] + " - " + "اتوماسیون" + '</option>');
                }
            }

        }
    }

    function SetSalData() {
        var programSelect = ace;

        var GroupSelect = $("#DropGroup").val();
        $("#DropSal").empty();
        $("#DropSal").append('<option value="0">' + translate('سال را انتخاب کنید') +'</option>');
        if (programSelect != 0 && GroupSelect != 0 && GroupSelect != null) {
            progName = ace == 'Web1' ? 'Afi1' : sessionStorage.OrgProgName;

            if (onlyGroupErj != '' && onlyGroupErj != 'null' && onlyGroupErj != null) {
                var onlyGroupErjList = onlyGroupErj.split('-');
                if (onlyGroupErjList.includes(GroupSelect) == true)
                    progName = 'erj1';
            }

            var DatabseSalObject = {
                ProgName: progName,
                Group: GroupSelect,
                UserCode: sessionStorage.userName
            }

            ajaxFunction(DatabseSalUrl, 'Post', DatabseSalObject).done(function (data) {
                localStorage.setItem('SalMaliList', JSON.stringify(data));

                self.DatabseSalList(data);
                if (self.DatabseSalList().length > 0) {
                    for (var i = 1; i < self.DatabseSalList().length + 1; i++) {
                        salData = self.DatabseSalList()[i - 1];
                        $("#DropSal").append('<option value="'
                            + salData.Code + '">'
                            + salData.Name + '</option>');
                        if (sal != "") {
                            $("#DropSal").val(sal);
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

    if (ace != null) {
        $("#DropAce").val(ace);
        SetGroupData();
        if (group != null) {
            $("#DropGroup").val(group);
            SetSalData();
        }
    }




    (function () {
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
    })()



    

    if (sessionStorage.ace == 'Web2' && afiList.length == 1 ) {
        $("#DropGroup").attr('disabled', 'disabled');
        $("#DropSal").attr('disabled', 'disabled'); 

        group = afiList[0].Code;
        if (group < 10)
            group = '0' + group; 

        sal = '0000';

        var firstInputWeb = localStorage.getItem('FirstInputWeb');

        if (firstInputWeb == "T") {
            SaveParam(group, sal);
            localStorage.setItem('FirstInputWeb', "F");
        }
    }
    else {
        $("#DropGroup").removeAttr('disabled');
        $("#DropSal").removeAttr('disabled');
        localStorage.setItem('FirstInputWeb', "F");
    }

};
ko.applyBindings(new ViewModel());
