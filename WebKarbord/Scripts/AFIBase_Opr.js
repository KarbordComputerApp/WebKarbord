var ViewModel = function () {
    var self = this;

    self.OprList = ko.observableArray([]); // لیست پروژه ها 
    self.SettingColumnList = ko.observableArray([]); // لیست ستون 
    self.TestOprList = ko.observableArray([]); // لیست تست  

    var OprUri = server + '/api/Web_Data/Opr/'; // آدرس پروژه ها 
    var SaveOprUri = server + '/api/Web_Data/AFI_SaveOpr/'; // آدرس ذخیره پروژه ها
    var DelOprUri = server + '/api/Web_Data/AFI_DelOpr/'; // آدرس حذف پروژه ها
    var TestOpr_DeleteUri = server + '/api/Web_Data/TestOpr_Delete/'; // آدرس تست حذف 
    var TestOprUri = server + '/api/Web_Data/TestOpr/'; // آدرس تست  

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


    validation = CheckAccess('NEW_OPR', Prog);// New Opr
    sessionStorage.NEW_Opr = validation;
    validation == true ? $("#AddNewOpr").show() : $("#AddNewOpr").hide()

    validation = CheckAccess('CHG_OPR', Prog);// edit Opr
    sessionStorage.CHG_Opr = validation;

    validation = CheckAccess('DEL_OPR', Prog); // delete Opr
    sessionStorage.DEL_Opr = validation;

    self.ShowAction = function (Code) {
        if (sessionStorage.DEL_Opr == 'true')
            return true;
        else
            return false;
    }

    var OprCode = '';
    var flag_Save = false;

    var old_Code = '';
    var old_Name = '';
    var old_Spec = '';
    var old_ActiveSt = '';
    var isUpdate = false;

    var rprtId = 'Opr';

    var columns = [
        'Code',
        'Name',
        'Spec',
        'ActiveSt'
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Opr", columns, self.SettingColumnList());
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/Opr", columns, self.SettingColumnList());
        sessionStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);

    function getOprList() {
        ajaxFunction(OprUri + ace + '/' + sal + '/' + group, 'GET', true, true).done(function (data) {
            self.OprList(data == null ? [] : data);
        });
    }

    getOprList();

    self.currentPageOpr = ko.observable();

    pageSizeOpr = localStorage.getItem('pageSizeOpr') == null ? 10 : localStorage.getItem('pageSizeOpr');
    self.pageSizeOpr = ko.observable(pageSizeOpr);
    self.currentPageIndexOpr = ko.observable(0);
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
    self.filterOprList = ko.computed(function () {
        self.currentPageIndexOpr(0);
        var filterCode = self.filterCode();
        var filterName = self.filterName();
        var filterSpec = self.filterSpec();
        var filterActiveSt = self.filterActiveSt();

        if (!filterCode && !filterName && !filterSpec && !filterActiveSt) {
            $("#CountRecord").text(self.OprList().length);
            sessionStorage.setItem('listFilter', null);
            return self.OprList();
        } else {
            listFilter = [
                filterCode,
                filterName,
                filterSpec,
                filterActiveSt
            ];

            sessionStorage.setItem('listFilter', JSON.stringify(listFilter));
            tempData = ko.utils.arrayFilter(self.OprList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filterCode) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filterName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0)
                    (item.ActiveSt == null ? '' : item.ActiveSt.toString().search(filterActiveSt) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchOpr);
    self.firstMatch = ko.dependentObservable(function () {
        var indexOpr = 0;
        sessionStorage.searchOpr = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexOpr(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.OprList(), function (item) {
                indexOpr += 1;
                return item.Code == search;
            });
            if (indexOpr < self.pageSizeOpr())
                self.currentPageIndexOpr(0);
            else {
                var a = Math.round((indexOpr / self.pageSizeOpr()), 0);
                if (a < (indexOpr / self.pageSizeOpr())) a += 1;
                self.currentPageIndexOpr(a - 1);
            }
            return value;
        }
    });

    self.currentPageOpr = ko.computed(function () {
        var pageSizeOpr = parseInt(self.pageSizeOpr(), 10),
            startIndex = pageSizeOpr * self.currentPageIndexOpr(),
            endIndex = startIndex + pageSizeOpr;
        localStorage.setItem('pageSizeOpr', pageSizeOpr);
        return self.filterOprList().slice(startIndex, endIndex);
    });

    self.nextPageOpr = function () {
        if (((self.currentPageIndexOpr() + 1) * self.pageSizeOpr()) < self.filterOprList().length) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() + 1);
        }
    };

    self.previousPageOpr = function () {
        if (self.currentPageIndexOpr() > 0) {
            self.currentPageIndexOpr(self.currentPageIndexOpr() - 1);
        }
    };

    self.firstPageOpr = function () {
        self.currentPageIndexOpr(0);
    };

    self.lastPageOpr = function () {
        tempCountOpr = parseInt(self.filterOprList().length / self.pageSizeOpr(), 10);
        if ((self.filterOprList().length % self.pageSizeOpr()) == 0)
            self.currentPageIndexOpr(tempCountOpr - 1);
        else
            self.currentPageIndexOpr(tempCountOpr);
    };

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");
    self.iconTypeActiveSt = ko.observable("");

    self.sortTableOpr = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortBase_Opr" + rprtId);
            self.sortType = localStorage.getItem("sortBaseType_Opr" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortBase_Opr" + rprtId, orderProp);
        localStorage.setItem("sortBaseType_Opr" + rprtId, self.sortType);

        self.search("");
        self.currentColumn(orderProp);
        self.OprList.sort(function (left, right) {
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


    $('#refreshOpr').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست پروژه ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getOprList();
                self.sortTableOpr();
            }
        })
    })


    self.AddNewOpr = function () {
        isUpdate = false;
        sessionStorage.NEW_Opr == 'true' ? $("#saveOpr").show() : $("#saveOpr").hide();
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
        $('#modal-Opr').modal('show');
    }


    function SetDataOpr(item) {
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
        OprCode = item.Code;
    }

    self.UpdateOpr = function (item) {
        sessionStorage.CHG_Opr == 'true' ? $("#saveOpr").show() : $("#saveOpr").hide();
        flag_Save = false;

        SetDataOpr(item);
        if (TestUseSanad(ace, sal, "Opr", OprCode, true, '') == true) {
            showNotification(translate('پروژه') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {
            $('#modal-Opr').modal('show');
        }
    }


    function SaveOpr() {
        code = $('#Code').val();
        name = $('#Name').val();
        status = $('#status').val();

        if (code == "") {
            return showNotification(translate('کد پروژه را وارد کنید'), 0)
        }

        if (name == "") {
            return showNotification(translate('نام پروژه را وارد کنید'), 0)
        }

        var TestOpr_Object = {
            Code: code
        };

        ajaxFunction(TestOprUri + ace + '/' + sal + '/' + group, 'POST', TestOpr_Object).done(function (data) {
            var obj = JSON.parse(data);
            self.TestOprList(obj);
            if (data.length > 2) {
                $('#modal-Test').modal('show');
                SetDataTestOpr(false);
            }
            else {


                var SaveOpr_Object = {
                    BranchCode: 0,
                    UserCode: sessionStorage.userName,
                    Code: code,
                    Name: name,
                    Spec: $('#Spec').val(),
                    Mode: status,
                };

                ajaxFunction(SaveOprUri + ace + '/' + sal + '/' + group, 'POST', SaveOpr_Object).done(function (data) {
                    getOprList();
                    $('#modal-Opr').modal('hide');
                    flag_Save = true;
                    SaveLog(Prog, isUpdate == true ? EditMode_Chg : EditMode_New, LogMode_OPR, code, 0, 0);

                    showNotification(translate('ذخیره شد'), 1);
                });
            }
        });
    }

    $('#saveOpr').click(function () {
        SaveOpr();
    });


    self.DeleteOpr = function (item) {

        OprCode = item.Code;
        if (TestUseSanad(ace, sal, "Opr", OprCode, false, '') == true) {
            showNotification(translate('پروژه') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {

            Swal.fire({
                title: mes_Delete,
                text: translate("آیا پروژه انتخابی حذف شود"),
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
                    var TestOpr_DeleteObject = {
                        Code: code
                    };

                    ajaxFunction(TestOpr_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestOpr_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestOprList(obj);
                        if (data.length > 2) {
                            $('#modal-Test').modal('show');
                            SetDataTestOpr(true);
                        }
                        else {
                            DeleteOpr(code);
                        }
                    });
                }
            })
        }
    };

    function SetDataTestOpr(deleteOpr) {

        $("#BodyTestOpr").empty();
        deleteOpr == true ? $("#titleTestOpr").text(translate('حذف پروژه')) : $("#titleTestOpr").text(translate('ذخیره پروژه'));
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestOprList();
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

        $('#BodyTestOpr').append(textBody);

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

    function DeleteOpr(code) {
        ajaxFunction(DelOprUri + ace + '/' + sal + '/' + group + '/' + code + '/', 'GET').done(function (response) {
            currentPage = self.currentPageIndexOpr();
            getOprList();
            self.currentPageIndexOpr(currentPage);
            SaveLog(Prog, EditMode_Del, LogMode_OPR, code, 0, 0);
            showNotification(translate('حذف شد'), 1);
        });
    }



    $("#Close_ModalOpr").click(function (e) {
        if (flag_Save == false) {
            flag_IsChange1 = ($("#Code").val() != old_Code);
            flag_IsChange2 = ($("#Name").val() != old_Name);
            flag_IsChange3 = ($("#Spec").val() != old_Spec);
            if (flag_IsChange1 || flag_IsChange2 || flag_IsChange3) {
                Swal.fire({
                    title: translate('ثبت تغییرات'),
                    text: translate('پروژه تغییر کرده است آیا ذخیره شود ؟'),
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
                        SaveOpr();
                        $('#modal-Opr').modal('hide');
                    } else if (result.dismiss == "cancel") {
                        $('#modal-Opr').modal('hide');
                    }
                })
            }
            else {
                $('#modal-Opr').modal('hide');
            }
        } else {
            $('#modal-Opr').modal('hide');
        }
    });



    $("#Code").focusout(function () {
        code = $("#Code").val();

        if ($(this).attr('readonly') != 'readonly' && code != '') {

            listCode = ko.utils.arrayFilter(self.OprList(), function (item) {
                return item.Code == code;
            });

            if (listCode.length == 1) {
                SetDataOpr(listCode[0]);
                $("#Name").focus();
            }
        }

    });

    $('#modal-Opr').on('hide.bs.modal', function () {
        RemoveUseSanad(ace, sal, "Opr", OprCode);
    });

    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "Opr", OprCode);
    };

    self.radif = function (index) {
        countShow = self.pageSizeOpr();
        page = self.currentPageIndexOpr();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableOpr">' +
            '<th>' + translate('ردیف') + '</th>' +

            CreateTableTh('Code', data) +
            CreateTableTh('Name', data) +
            CreateTableTh('Spec', data) +
        CreateTableTh('ActiveSt', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageOpr" data-dismiss="modal" style="cursor: default;">' +
            '     <tr oncontextmenu="window.alert(\'test\');return false;">' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('Code', 0, 0, data) +
            CreateTableTd('Name', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
        CreateTableTd('ActiveSt', 0, 0, data) +
            '<td>' +
            '   <a id="UpdateOpr" data-bind="click: $root.UpdateOpr , attr: {title:text_Update}">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteOpr" data-bind="click: $root.DeleteOpr, visible: $root.ShowAction(Code) , attr: {title:text_Delete}">' +
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

    self.sortTableOpr();

    document.onkeydown = function (e) {
        if (e.keyCode == key_F2 && $('#modal-Opr').is(':visible')) {
            SaveOpr();
        }
    };
};

ko.applyBindings(new ViewModel());