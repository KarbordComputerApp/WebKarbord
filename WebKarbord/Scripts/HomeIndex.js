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

};
ko.applyBindings(new ViewModel());
