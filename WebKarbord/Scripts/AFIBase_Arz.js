var ViewModel = function () {
    var self = this;

    self.ArzList = ko.observableArray([]); // لیست ارز ها 
    self.SettingColumnList = ko.observableArray([]); // لیست ستون 
    self.TestArzList = ko.observableArray([]); // لیست تست  

    var ArzUri = server + '/api/Web_Data/Arz/'; // آدرس ارز ها 
    var SaveArzUri = server + '/api/Web_Data/AFI_SaveArz/'; // آدرس ذخیره ارز ها
    var DelArzUri = server + '/api/Web_Data/AFI_DelArz/'; // آدرس حذف ارز ها
    var TestArz_DeleteUri = server + '/api/Web_Data/TestArz_Delete/'; // آدرس تست حذف 
    var TestArzUri = server + '/api/Web_Data/TestArz/'; // آدرس تست  

    TestUser();

    Prog = localStorage.getItem('ProgAccess');

    if (Prog.includes('Acc5'))
        Prog = 'Acc5';
    else if (Prog.includes('Fct5'))
        Prog = 'Fct5';
    else if (Prog.includes('Inv5'))
        Prog = 'Inv5';
    else
        Prog = 'Erj1';


    validation = CheckAccess('NEW_Arz', Prog);// New Arz
    sessionStorage.NEW_Arz = validation;
    validation == true ? $("#AddNewArz").show() : $("#AddNewArz").hide()

    validation = CheckAccess('CHG_Arz', Prog);// edit Arz
    sessionStorage.CHG_Arz = validation;

    validation = CheckAccess('DEL_Arz', Prog); // delete Arz
    sessionStorage.DEL_Arz = validation;

    self.ShowAction = function (Code) {
        if (sessionStorage.DEL_Arz == 'true')
            return true;
        else
            return false;
    }

    var ArzCode = '';
    var flag_Save = false;

    var old_Code = '';
    var old_Name = '';
    var old_Spec = '';
    var old_Rate = '';
    var isUpdate = false;

    var rprtId = 'Arz';

    var columns = [
        'LtnCode',
        'Name',
        'Spec',
        'Rate'
    ];

    self.SettingColumnList = ko.observableArray([]); // لیست ستون ها

    //Get RprtCols List
    function getRprtColsList(FlagSetting) {
        cols = getRprtCols(rprtId, sessionStorage.userName);
        ListColumns = cols;
        if (FlagSetting) {
            CreateTableReport(cols)
        }
        else {
            CreateTableColumn(columns);
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, cols);
            }
        }
        /*  ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            if (FlagSetting) {
                CreateTableReport(data)
            }
            else {
                CreateTableColumn(columns);
                for (var i = 1; i <= columns.length; i++) {
                    SetColumn(columns[i - 1], i, data);
                }
            }
            ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/' + rprtId + '/' + username, 'GET').done(function (data) {
                ListColumns = data;
            });
        });*/

    }

    //Get RprtColsDefult List
    function getRprtColsDefultList() {
        ajaxFunction(RprtColsDefultUri + ace + '/' + sal + '/' + group + '/' + rprtId, 'GET').done(function (data) {
            data = TranslateData(data);
            self.SettingColumnList(data);
            counterColumn = 0;
            for (var i = 1; i <= columns.length; i++) {
                SetColumn(columns[i - 1], i, data);
            }
        });
    }

    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Arz", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    $('#modal-SettingColumn').on('show.bs.modal', function () {
        counterColumn = 0;
        getRprtColsList(false, sessionStorage.userName);
    });


    $('#AllSettingColumns').change(function () {
        var allCheck = $('#AllSettingColumns').is(':checked');
        for (var i = 1; i <= columns.length; i++) {
            $('#SettingColumns' + i).prop('checked', allCheck);
        }
    });


    $('#DefultColumn').click(function () {
        $('#AllSettingColumns').prop('checked', false);
        getRprtColsDefultList();
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Arz", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);

    function getArzList() {
        ajaxFunction(ArzUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.ArzList(data == null ? [] : data);
        });
    }

    getArzList();

    self.currentPageArz = ko.observable();

    pageSizeArz = localStorage.getItem('pageSizeArz') == null ? 10 : localStorage.getItem('pageSizeArz');
    self.pageSizeArz = ko.observable(pageSizeArz);
    self.currentPageIndexArz = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.filterLtnCode = ko.observable("");
    self.filterName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterRate = ko.observable("");


    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterLtnCode(listFilter[0]);
        self.filterName(listFilter[1]);
        self.filterSpec(listFilter[2]);
        self.filterRate(listFilter[3]);
    }
    self.filterArzList = ko.computed(function () {
        self.currentPageIndexArz(0);
        var filterLtnCode = self.filterLtnCode();
        var filterName = self.filterName();
        var filterSpec = self.filterSpec();
        var filterRate = self.filterRate();

        if (!filterLtnCode && !filterName && !filterSpec && !filterRate) {
            $("#CountRecord").text(self.ArzList().length);
            sessionStorage.setItem('listFilter', null);
            return self.ArzList();
        } else {
            listFilter = [
                filterLtnCode,
                filterName,
                filterSpec,
                filterRate
            ];

            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.ArzList(), function (item) {
                result =
                    (item.LtnCode == null ? '' : item.LtnCode.toString().search(filterLtnCode) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filterName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    ko.utils.stringStartsWith(item.Rate.toString().toLowerCase(), filterRate)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchArz);
    self.firstMatch = ko.dependentObservable(function () {
        var indexArz = 0;
        sessionStorage.searchArz = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexArz(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.ArzList(), function (item) {
                indexArz += 1;
                return item.Code == search;
            });
            if (indexArz < self.pageSizeArz())
                self.currentPageIndexArz(0);
            else {
                var a = Math.round((indexArz / self.pageSizeArz()), 0);
                if (a < (indexArz / self.pageSizeArz())) a += 1;
                self.currentPageIndexArz(a - 1);
            }
            return value;
        }
    });

    self.currentPageArz = ko.computed(function () {
        var pageSizeArz = parseInt(self.pageSizeArz(), 10),
            startIndex = pageSizeArz * self.currentPageIndexArz(),
            endIndex = startIndex + pageSizeArz;
        localStorage.setItem('pageSizeArz', pageSizeArz);
        return self.filterArzList().slice(startIndex, endIndex);
    });

    self.nextPageArz = function () {
        if (((self.currentPageIndexArz() + 1) * self.pageSizeArz()) < self.filterArzList().length) {
            self.currentPageIndexArz(self.currentPageIndexArz() + 1);
        }
    };

    self.previousPageArz = function () {
        if (self.currentPageIndexArz() > 0) {
            self.currentPageIndexArz(self.currentPageIndexArz() - 1);
        }
    };

    self.firstPageArz = function () {
        self.currentPageIndexArz(0);
    };

    self.lastPageArz = function () {
        tempCountArz = parseInt(self.filterArzList().length / self.pageSizeArz(), 10);
        if ((self.filterArzList().length % self.pageSizeArz()) == 0)
            self.currentPageIndexArz(tempCountArz - 1);
        else
            self.currentPageIndexArz(tempCountArz);
    };

    self.iconTypeLtnCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeRate = ko.observable("");

    self.sortTableArz = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortBase_Arz" + rprtId);
            self.sortType = localStorage.getItem("sortBaseType_Arz" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortBase_Arz" + rprtId, orderProp);
        localStorage.setItem("sortBaseType_Arz" + rprtId, self.sortType);

        self.search("");
        self.currentColumn(orderProp);
        self.ArzList.sort(function (left, right) {
            leftVal = FixSortName(left[orderProp]);
            rightVal = FixSortName(right[orderProp]);

            if (self.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        self.sortType = (self.sortType == "ascending") ? "descending" : "ascending";

        self.iconTypeLtnCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');
        self.iconTypeRate('');

        if (orderProp == 'LtnCode') self.iconTypeLtnCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Rate') self.iconTypeRate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshArz').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست ارز ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getArzList();
                self.sortTableArz();
            }
        })
    })


    self.AddNewArz = function () {
        isUpdate = false;
        sessionStorage.NEW_Arz == 'true' ? $("#saveArz").show() : $("#saveArz").hide();
        aGruCode = '';
        ZGruCode = '';
        counterZGru = 0;
        list_ZGruSelect = new Array();
        $('#Code').attr('readonly', false);
        $('#Code').val('');
        $('#Name').val('');
        $('#Spec').val('');
        $('#Rate').val('');

        old_Code = '';
        old_Name = '';
        old_Spec = '';
        old_Rate = '';

        $("#Code").focus();
        $('#modal-Arz').modal('show');
    }


    function SetDataArz(item) {
        isUpdate = true;
        $('#Code').val(item.LtnCode);
        $('#Code').attr('readonly', true);
        $('#Name').val(item.Name);
        $('#Spec').val(item.Spec);
        $('#Rate').val(item.Rate);

        old_Code = item.LtnCode;
        old_Name = item.Name;
        old_Spec = item.Spec;
        old_Rate = item.Rate;
        $("#Code").focus();
        ArzCode = item.LtnCode;
    }

    self.UpdateArz = function (item) {
        sessionStorage.CHG_Arz == 'true' ? $("#saveArz").show() : $("#saveArz").hide();
        flag_Save = false;

        SetDataArz(item);
        if (TestUseSanad(ace, sal, "Arz", ArzCode, true, '') == true) {
            showNotification(translate('ارز') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {
            $('#modal-Arz').modal('show');
        }
    }


    function SaveArz() {
        code = $('#Code').val();
        name = $('#Name').val();
        rate = $('#Rate').val();

        if (code == "") {
            return showNotification(translate('کد ارز را وارد کنید'), 0)
        }

        if (name == "") {
            return showNotification(translate('نام ارز را وارد کنید'), 0)
        }

        var TestArz_Object = {
            Code: code
        };

        ajaxFunction(TestArzUri + ace + '/' + sal + '/' + group, 'POST', TestArz_Object).done(function (data) {
            var obj = JSON.parse(data);
            self.TestArzList(obj);
            if (data.length > 2) {
                $('#modal-Test').modal('show');
                SetDataTestArz(false);
            }
            else {


                var SaveArz_Object = {
                    BranchCode: 0,
                    UserCode: sessionStorage.userName,
                    Code: code,
                    Name: name,
                    Spec: $('#Spec').val(),
                    Rate: rate,
                };

                ajaxFunction(SaveArzUri + ace + '/' + sal + '/' + group, 'POST', SaveArz_Object).done(function (data) {
                    getArzList();
                    $('#modal-Arz').modal('hide');
                    flag_Save = true;
                    SaveLog(Prog, isUpdate == true ? EditMode_Chg : EditMode_New, LogMode_ARZ, code, 0, 0);

                    showNotification(translate('ذخیره شد'), 1);
                });
            }
        });
    }

    $('#saveArz').click(function () {
        SaveArz();
    });


    self.DeleteArz = function (item) {

        ArzCode = item.LtnCode;
        if (TestUseSanad(ace, sal, "Arz", ArzCode, false, '') == true) {
            showNotification(translate('ارز') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {

            Swal.fire({
                title: mes_Delete,
                text: translate("آیا ارز انتخابی حذف شود"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    code = item.LtnCode;
                    var TestArz_DeleteObject = {
                        Code: code
                    };

                    ajaxFunction(TestArz_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestArz_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestArzList(obj);
                        if (data.length > 2) {
                            $('#modal-Test').modal('show');
                            SetDataTestArz(true);
                        }
                        else {
                            DeleteArz(code);
                        }
                    });
                }
            })
        }
    };

    function SetDataTestArz(deleteArz) {

        $("#BodyTestArz").empty();
        deleteArz == true ? $("#titleTestArz").text(translate('حذف ارز')) : $("#titleTestArz").text(translate('ذخیره ارز'));
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestArzList();
        for (var i = 0; i < list.length; i++) {
            textBody +=
                '<div class="body" style="padding:7px;">' +
                '    <div class="form-inline">';
            if (list[i].Test == 1) {
                countWarning += 1;
                textBody += ' <img src="/Content/img/Warning.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('هشدار :') + '</p>'
            }
            else {
                countError += 1;
                textBody += ' <img src="/Content/img/Error.jpg" width="22" style="margin-left: 3px;" />' +
                    ' <p style="margin-left: 3px;">' + translate('خطا :') + '</p>'
            }

            if (list[i].TestCap != "")
                textBody += '<p>' + translate(list[i].TestCap) + '</p>';

            textBody +=
                '    </div>' +
                '</div>';
        }

        $('#BodyTestArz').append(textBody);

        $('#CountWarning').text(countWarning);
        $('#CountError').text(countError);

        if (countError > 0) {
            $('#Delete-Modal').attr('hidden', '');
            $('#ShowCountError').removeAttr('hidden', '');
        }
        else {
            $('#Delete-Modal').removeAttr('hidden', '')
            $('#ShowCountError').attr('hidden', '');
        }

        if (countWarning > 0) {
            $('#ShowCountWarning').removeAttr('hidden', '');
        }
        else {
            $('#ShowCountWarning').attr('hidden', '');
        }


    }

    function DeleteArz(code) {
        ajaxFunction(DelArzUri + ace + '/' + sal + '/' + group + '/' + code + '/', 'GET').done(function (response) {
            currentPage = self.currentPageIndexArz();
            getArzList();
            self.currentPageIndexArz(currentPage);
            SaveLog(Prog, EditMode_Del, LogMode_ARZ, code, 0, 0);
            showNotification(translate('حذف شد'), 1);
        });
    }



    $("#Close_ModalArz").click(function (e) {
        if (flag_Save == false) {
            flag_IsChange1 = ($("#Code").val() != old_Code);
            flag_IsChange2 = ($("#Name").val() != old_Name);
            flag_IsChange3 = ($("#Spec").val() != old_Spec);
            if (flag_IsChange1 || flag_IsChange2 || flag_IsChange3) {
                Swal.fire({
                    title: translate('ثبت تغییرات'),
                    text: translate('ارز تغییر کرده است آیا ذخیره شود ؟'),
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#3085d6',
                    cancelButtonText: text_No,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText: text_Yes,
                    showDenyButton: true,
                    showCancelButton: true
                }).then((result) => {
                    if (result.value == true) {
                        SaveArz();
                        $('#modal-Arz').modal('hide');
                    } else if (result.dismiss == "cancel") {
                        $('#modal-Arz').modal('hide');
                    }
                })
            }
            else {
                $('#modal-Arz').modal('hide');
            }
        } else {
            $('#modal-Arz').modal('hide');
        }
    });



    $("#Code").focusout(function () {
        code = $("#Code").val();

        if ($(this).attr('readonly') != 'readonly' && code != '') {

            listCode = ko.utils.arrayFilter(self.ArzList(), function (item) {
                return item.Code == code;
            });

            if (listCode.length == 1) {
                SetDataArz(listCode[0]);
                $("#Name").focus();
            }
        }

    });

    $('#modal-Arz').on('hide.bs.modal', function () {
        RemoveUseSanad(ace, sal, "Arz", ArzCode);
    });

    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "Arz", ArzCode);
    };

    self.radif = function (index) {
        countShow = self.pageSizeArz();
        page = self.currentPageIndexArz();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableArz">' +
            '<th>' + translate('ردیف') + '</th>' +

            CreateTableTh('LtnCode', data) +
            CreateTableTh('Name', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('Rate', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageArz" data-dismiss="modal" style="cursor: default;">' +
            '     <tr>' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
        CreateTableTd('LtnCode', 0, 0, data) +
            CreateTableTd('Name', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('Rate', 0, 0, data) +
            '<td>' +
            '   <a id="UpdateArz" data-bind="click: $root.UpdateArz , attr: {title:text_Update}">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteArz" data-bind="click: $root.DeleteArz, visible: $root.ShowAction(Code) , attr: {title:text_Delete}">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '<td style="background-color: #efb683;"></td>' +
        CreateTableTdSearch('LtnCode', data) +
            CreateTableTdSearch('Name', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('Rate', data) +
            '<td style="background-color: #efb683;"></td>' +
            '      </tr>' +
            '  </tfoot>' +
            '</table >'
        $('#TableList').append(dataTable);
    }

    function CreateTableTh(field, data) {
        text = '<th ';
        TextField = FindTextField(field, data);
        sortField = field;

        switch (field) {
            case "Name":
                sortField = 'SortName';
                break;
        }

        if (TextField == 0)
            text += 'Hidden ';
        text += 'data-column="' + sortField + '">' +
            '<span data-column="' + sortField + '" >' + TextField + '</span>' +
            '<span data-bind="attr: { class: currentColumn() == \'' + sortField + '\' ? \'isVisible\' : \'isHidden\' }">' +
            '    <i data-bind="attr: { class: iconType' + field + ' }" data-column="' + sortField + '" ></i> </span> ' +
            '</th>';
        return text;
    }

    function CreateTableTd(field, Deghat, no, data) {
        text = '<td ';

        TextField = FindTextField(field, data);
        if (TextField == 0)
            text += 'Hidden ';

        switch (no) {
            case 0:
                text += 'data-bind="text: ' + field + '"></td>';
                break;
            case 1:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' == 0 ? \'0\' : NumberToNumberString(' + field + '.toFixed(' + Deghat + ')) ), style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"></td>'
                break;
            case 2:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + '.toFixed(' + Deghat + ')) ) : \'0\', style: { color: ' + field + ' < 0 ? \'red\' : \'black\' }"" style="text-align: right;"></td>'
                break;
            case 3:
                text += 'style="direction: ltr;" data-bind="text: ' + field + ' != null ? NumberToNumberString(parseFloat(' + field + '.toFixed(' + Deghat + ')) ) : \'0\'" style="text-align: right;"></td>'
                break;
            case 4:
                text += 'data-bind="text: ' + field + ' , click: $root.View' + field + ' " class="ellipsis"></td>';
                break;
        }
        return text;
    }


    self.SearchKeyDown = function (viewModel, e) {
        return KeyPressSearch(e);
    }

    function CreateTableTdSearch(field, data) {
        text = '<td ';
        TextField = FindTextField(field, data);
        type = FindTypeField(field, data);
        if (TextField == 0)
            text += 'Hidden ';
        text += 'style="padding: 0px 3px;"><input data-bind="value: filter' + field + ', valueUpdate: \'afterkeydown\', event:{ keydown : $root.SearchKeyDown }"  type="text" class="type_' + type;
        text += ' form-control" style="height: 2.4rem; direction: ltr;text-align: right" /> </td>';
        return text;
    }

    self.sortTableArz();
};

ko.applyBindings(new ViewModel());