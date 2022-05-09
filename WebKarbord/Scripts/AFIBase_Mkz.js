var ViewModel = function () {
    var self = this;

    self.MkzList = ko.observableArray([]); // ليست مرکزهزینه ها 
    self.SettingColumnList = ko.observableArray([]); // لیست ستون 
    self.TestMkzList = ko.observableArray([]); // لیست تست  

    var MkzUri = server + '/api/Web_Data/Mkz/'; // آدرس مرکزهزینه ها 
    var SaveMkzUri = server + '/api/Web_Data/AFI_SaveMkz/'; // آدرس ذخیره مرکزهزینه ها
    var DelMkzUri = server + '/api/Web_Data/AFI_DelMkz/'; // آدرس حذف مرکزهزینه ها
    var TestMkz_DeleteUri = server + '/api/Web_Data/TestMkz_Delete/'; // آدرس تست حذف 
    var TestMkzUri = server + '/api/Web_Data/TestMkz/'; // آدرس تست  

    TestUser();

    validation = CheckAccess('NEW_MKZ', localStorage.getItem('ProgAccess'));// New Mkz
    sessionStorage.NEW_Mkz = validation;
    validation == true ? $("#AddNewMkz").show() : $("#AddNewMkz").hide()

    validation = CheckAccess('CHG_MKZ', localStorage.getItem('ProgAccess'));// edit Mkz
    sessionStorage.CHG_Mkz = validation;

    validation = CheckAccess('DEL_MKZ', localStorage.getItem('ProgAccess')); // delete Mkz
    sessionStorage.DEL_Mkz = validation;

    self.ShowAction = function (Code) {
        if (sessionStorage.DEL_Mkz == 'true')
            return true;
        else
            return false;
    }

    var MkzCode = '';
    var flag_Save = false;

    var old_Code = '';
    var old_Name = '';
    var old_Spec = '';
    var old_ActiveSt = '';
    var isUpdate = false;
    var rprtId = 'Mkz';

    var columns = [
        'Code',
        'Name',
        'Spec',
        'ActiveSt',
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Mkz", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Mkz", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);

    function getMkzList() {
        ajaxFunction(MkzUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.MkzList(data == null ? [] : data);
        });
    }

    getMkzList();

    self.currentPageMkz = ko.observable();

    pageSizeMkz = localStorage.getItem('pageSizeMkz') == null ? 10 : localStorage.getItem('pageSizeMkz');
    self.pageSizeMkz = ko.observable(pageSizeMkz);
    self.currentPageIndexMkz = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.filterCode = ko.observable("");
    self.filterName = ko.observable("");
    self.filterSpec = ko.observable("");
    self.filterActiveSt = ko.observable("");


    listFilter = JSON.parse(sessionStorage.getItem('listFilter'));
    if (listFilter != null) {
        self.filterCode(listFilter[0]);
        self.filterName(listFilter[1]);
        self.filterSpec(listFilter[2]);
        self.filterActiveSt(listFilter[3]);
    }
    self.filterMkzList = ko.computed(function () {
        self.currentPageIndexMkz(0);
        var filterCode = self.filterCode();
        var filterName = self.filterName();
        var filterSpec = self.filterSpec();
        var filterActiveSt = self.filterActiveSt();

        if (!filterCode && !filterName && !filterSpec && !filterActiveSt) {
            //if (self.MkzList() != null)
                $("#CountRecord").text(self.MkzList().length);
            sessionStorage.setItem('listFilter', null);
            return self.MkzList();
        } else {
            listFilter = [
                filterCode,
                filterName,
                filterSpec,
                filterActiveSt
            ];

            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.MkzList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filterCode) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filterName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0) &&
                    (item.ActiveSt == null ? '' : item.ActiveSt.toString().search(filterActiveSt) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchMkz);
    self.firstMatch = ko.dependentObservable(function () {
        var indexMkz = 0;
        sessionStorage.searchMkz = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexMkz(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.MkzList(), function (item) {
                indexMkz += 1;
                return item.Code == search;
            });
            if (indexMkz < self.pageSizeMkz())
                self.currentPageIndexMkz(0);
            else {
                var a = Math.round((indexMkz / self.pageSizeMkz()), 0);
                if (a < (indexMkz / self.pageSizeMkz())) a += 1;
                self.currentPageIndexMkz(a - 1);
            }
            return value;
        }
    });

    self.currentPageMkz = ko.computed(function () {
        var pageSizeMkz = parseInt(self.pageSizeMkz(), 10),
            startIndex = pageSizeMkz * self.currentPageIndexMkz(),
            endIndex = startIndex + pageSizeMkz;
        localStorage.setItem('pageSizeMkz', pageSizeMkz);
        return self.filterMkzList().slice(startIndex, endIndex);
    });

    self.nextPageMkz = function () {
        if (((self.currentPageIndexMkz() + 1) * self.pageSizeMkz()) < self.filterMkzList().length) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() + 1);
        }
    };

    self.previousPageMkz = function () {
        if (self.currentPageIndexMkz() > 0) {
            self.currentPageIndexMkz(self.currentPageIndexMkz() - 1);
        }
    };

    self.firstPageMkz = function () {
        self.currentPageIndexMkz(0);
    };

    self.lastPageMkz = function () {
        tempCountMkz = parseInt(self.filterMkzList().length / self.pageSizeMkz(), 10);
        if ((self.filterMkzList().length % self.pageSizeMkz()) == 0)
            self.currentPageIndexMkz(tempCountMkz - 1);
        else
            self.currentPageIndexMkz(tempCountMkz);
    };

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeActiveSt = ko.observable("");

    self.sortTableMkz = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortBase_Mkz" + rprtId);
            self.sortType = localStorage.getItem("sortBaseType_Mkz" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortBase_Mkz" + rprtId, orderProp);
        localStorage.setItem("sortBaseType_Mkz" + rprtId, self.sortType);

        self.search("");
        self.currentColumn(orderProp);
        self.MkzList.sort(function (left, right) {
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

        self.iconTypeCode('');
        self.iconTypeName('');
        self.iconTypeSpec('');
        self.iconTypeActiveSt('');

        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'ActiveSt') self.iconTypeActiveSt((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshMkz').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست مرکزهزینه ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getMkzList();
                self.sortTableMkz();
            }
        })
    })


    self.AddNewMkz = function () {
        isUpdate = false;
        sessionStorage.NEW_Mkz == 'true' ? $("#saveMkz").show() : $("#saveMkz").hide();
        aGruCode = '';
        ZGruCode = '';
        counterZGru = 0;
        list_ZGruSelect = new Array();
        $('#Code').attr('readonly', false);
        $('#Code').val('');
        $('#Name').val('');
        $('#Spec').val('');
        $('#status').val(0);

        old_Code = '';
        old_Name = '';
        old_Spec = '';
        old_ActiveSt = '';

        $("#Code").focus();
        $('#modal-Mkz').modal('show');
    }


    function SetDataMkz(item) {
        isUpdate = true;
        $('#Code').val(item.Code);
        $('#Code').attr('readonly', true);
        $('#Name').val(item.Name);
        $('#Spec').val(item.Spec);


        status = item.ActiveSt == 'فعال' ? 0 : 1;
        $('#status').val(status);

        old_Code = item.Code;
        old_Name = item.Name;
        old_Spec = item.Spec;
        old_ActiveSt = item.ActiveSt;
        $("#Code").focus();
        MkzCode = item.Code;
    }

    self.UpdateMkz = function (item) {
        sessionStorage.CHG_Mkz == 'true' ? $("#saveMkz").show() : $("#saveMkz").hide();

        flag_Save = false;

        SetDataMkz(item);
        if (TestUseSanad(ace, sal, "Mkz", MkzCode, true, '') == true) {
            showNotification(translate('مرکزهزینه') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {
            $('#modal-Mkz').modal('show');
        }
    }


    function SaveMkz() {
        code = $('#Code').val();
        name = $('#Name').val();
        status = $('#status').val();

        if (code == "") {
            return showNotification(translate('کد مرکزهزینه را وارد کنید'), 0)
        }

        /* if (name == "") {
             return showNotification(translate('نام مرکزهزینه را وارد کنید'), 0)
         }*/

        var TestMkz_Object = {
            Code: code
        };

        ajaxFunction(TestMkzUri + ace + '/' + sal + '/' + group, 'POST', TestMkz_Object).done(function (data) {
            var obj = JSON.parse(data);
            self.TestMkzList(obj);
            if (data.length > 2) {
                $('#modal-Test').modal('show');
                SetDataTestMkz(false);
            }
            else {


                var SaveMkz_Object = {
                    BranchCode: 0,
                    UserCode: sessionStorage.userName,
                    Code: code,
                    Name: name,
                    Spec: $('#Spec').val(),
                    Mode: status,
                };

                ajaxFunction(SaveMkzUri + ace + '/' + sal + '/' + group, 'POST', SaveMkz_Object).done(function (data) {
                    getMkzList();
                    $('#modal-Mkz').modal('hide');
                    flag_Save = true;
                    SaveLog(localStorage.getItem('ProgAccess'), isUpdate == true ? EditMode_Chg : EditMode_New, LogMode_MKZ, code, 0, 0);

                    showNotification(translate('ذخیره شد'), 1);
                });
            }
        });
    }

    $('#saveMkz').click(function () {
        SaveMkz();
    });


    self.DeleteMkz = function (item) {

        MkzCode = item.Code;
        if (TestUseSanad(ace, sal, "Mkz", MkzCode, false, '') == true) {
            showNotification(translate('مرکزهزینه') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {

            Swal.fire({
                title: mes_Delete,
                text: translate("آیا مرکزهزینه انتخابی حذف شود"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    code = item.Code;
                    var TestMkz_DeleteObject = {
                        Code: code
                    };

                    ajaxFunction(TestMkz_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestMkz_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestMkzList(obj);
                        if (data.length > 2) {
                            $('#modal-Test').modal('show');
                            SetDataTestMkz(true);
                        }
                        else {
                            DeleteMkz(code);
                        }
                    });
                }
            })
        }
    };

    function SetDataTestMkz(deleteMkz) {

        $("#BodyTestMkz").empty();
        deleteMkz == true ? $("#titleTestMkz").text(translate('حذف مرکزهزینه')) : $("#titleTestMkz").text(translate('ذخیره مرکزهزینه'));
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestMkzList();
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

        $('#BodyTestMkz').append(textBody);

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

    function DeleteMkz(code) {
        ajaxFunction(DelMkzUri + ace + '/' + sal + '/' + group + '/' + code + '/', 'GET').done(function (response) {
            currentPage = self.currentPageIndexMkz();
            getMkzList();
            self.currentPageIndexMkz(currentPage);
            SaveLog(localStorage.getItem('ProgAccess'), EditMode_Del, LogMode_MKZ, code, 0, 0);
            showNotification(translate('حذف شد'), 1);
        });
    }



    $("#Close_ModalMkz").click(function (e) {
        if (flag_Save == false) {
            flag_IsChange1 = ($("#Code").val() != old_Code);
            flag_IsChange2 = ($("#Name").val() != old_Name);
            flag_IsChange3 = ($("#Spec").val() != old_Spec);
            if (flag_IsChange1 || flag_IsChange2 || flag_IsChange3) {
                Swal.fire({
                    title: translate('ثبت تغییرات'),
                    text: translate('مرکزهزینه تغییر کرده است آیا ذخیره شود ؟'),
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
                        SaveMkz();
                        $('#modal-Mkz').modal('hide');
                    } else if (result.dismiss == "cancel") {
                        $('#modal-Mkz').modal('hide');
                    }
                })
            }
            else {
                $('#modal-Mkz').modal('hide');
            }
        } else {
            $('#modal-Mkz').modal('hide');
        }
    });



    $("#Code").focusout(function () {
        code = $("#Code").val();

        if ($(this).attr('readonly') != 'readonly' && code != '') {

            listCode = ko.utils.arrayFilter(self.MkzList(), function (item) {
                return item.Code == code;
            });

            if (listCode.length == 1) {
                SetDataMkz(listCode[0]);
                $("#Name").focus();
            }
        }

    });

    $('#modal-Mkz').on('hide.bs.modal', function () {
        RemoveUseSanad(ace, sal, "Mkz", MkzCode);
    });

    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "Mkz", MkzCode);
    };

    self.radif = function (index) {
        countShow = self.pageSizeMkz();
        page = self.currentPageIndexMkz();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableMkz">' +
            '<th>' + translate('ردیف') + '</th>' +

            CreateTableTh('Code', data) +
            CreateTableTh('Name', data) +
            CreateTableTh('Spec', data) +
            CreateTableTh('ActiveSt', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageMkz" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind=" css: { matched: $data === $root.firstMatch() }, style: {color: Level == 1 ? \'#009688\': \'#212529\'}  "  >' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('Code', 0, 0, data) +
            CreateTableTd('Name', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            CreateTableTd('ActiveSt', 0, 0, data) +
            '<td>' +
            '   <a id="UpdateMkz" data-bind="click: $root.UpdateMkz">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteMkz" data-bind="click: $root.DeleteMkz, visible: $root.ShowAction(Code)">' +
            '      <img src="/Content/img/list/streamline-icon-bin-2@48x48.png" width="16" height="16" />' +
            '   </a>' +
            '</td >' +

            '</tr>' +
            '</tbody>' +
            ' <tfoot>' +
            '<td style="background-color: #efb683;"></td>' +
            CreateTableTdSearch('Code', data) +
            CreateTableTdSearch('Name', data) +
            CreateTableTdSearch('Spec', data) +
            CreateTableTdSearch('ActiveSt', data) +
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
            case "Code":
                sortField = 'SortCode';
                break;
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

    self.sortTableMkz();
};

ko.applyBindings(new ViewModel());

