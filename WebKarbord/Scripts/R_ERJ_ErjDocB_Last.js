var ViewModel = function () {
    var self = this;
    var ace = sessionStorage.ace;
    var sal = sessionStorage.sal;

    var aceErj = 'ERJ1';
    var salErj = '0000';

    var group = sessionStorage.group;
    var server = localStorage.getItem("ApiAddress");

    self.ErjCustList = ko.observableArray([]); // ليست مشتریان
    self.KhdtList = ko.observableArray([]); // لیست نوع کار ها
    self.ErjStatusList = ko.observableArray([]); // لیست وضعیت 
    self.ErjUsersList = ko.observableArray([]); // لیست ارجاع شونده / دهنده 
    self.DocB_LastList = ko.observableArray([]); // لیست گزارش  


    var ErjCustUri = server + '/api/Web_Data/ErjCust/'; // آدرس مشتریان
    var ErjUsersUri = server + '/api/Web_Data/Web_ErjUsers/'; // آدرس ارجاع شونده / دهنده
    var KhdtUri = server + '/api/Web_Data/Khdt/'; // آدرس نوع کار ها 
    var ErjStatusUri = server + '/api/Web_Data/ErjStatus/'; // آدرس وضعیت 
    var DocB_LastUri = server + '/api/Web_Data/ErjDocB_Last/'; // آدرس گزارش
    var DocB_LastCountUri = server + '/api/Web_Data/ErjDocB_LastCount/'; // تعداد رکورد های گزارش

    self.AzDate0 = ko.observable('');
    self.TaDate0 = ko.observable('');
    self.AzDate1 = ko.observable('');
    self.TaDate1 = ko.observable('');
    self.AzDate2 = ko.observable('');
    self.TaDate2 = ko.observable('');

    var allSearchErjCust = true;

    var ErjCustCode = '';
    var counterErjCust = 0;
    var counterKhdt = 0;
    self.Status = ko.observable();

    var list_ErjCustSelect = new Array()
    var list_KhdtSelect = new Array()

    $("#textTotal").text('');

    //Get ErjCust List
    function getErjCustList() {
        ajaxFunction(ErjCustUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjCustList(data);
        });
    }

    //Get Khdt List
    function getKhdtList() {
        ajaxFunction(KhdtUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.KhdtList(data);
        });
    }

    //Get ErjUsers List
    function getErjUsersList() {
        ajaxFunction(ErjUsersUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjUsersList(data);
        });
    }

    //Get ErjStatus List
    function getErjStatusList() {
        ajaxFunction(ErjStatusUri + aceErj + '/' + salErj + '/' + group, 'GET').done(function (data) {
            self.ErjStatusList(data);
        });
    }


    getErjStatusList();
    getErjCustList();
    getKhdtList();
    getErjUsersList();


};

ko.applyBindings(new ViewModel());

