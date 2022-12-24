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

};
ko.applyBindings(new ViewModel());
