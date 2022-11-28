var ViewModel = function () {
    var self = this;

    self.ZAccList = ko.observableArray([]); // ليست زیر حساب ها 
    self.SettingColumnList = ko.observableArray([]); // لیست ستون 
    self.TestZAccList = ko.observableArray([]); // لیست تست  
    self.ZGruList = ko.observableArray([]); // لیست تست  

    var ZAccUri = server + '/api/Web_Data/ZAcc/'; // آدرس زیر حساب ها 
    var SaveZAccUri = server + '/api/Web_Data/AFI_SaveZAcc/'; // آدرس ذخیره زیر حساب ها
    var DelZAccUri = server + '/api/Web_Data/AFI_DelZAcc/'; // آدرس حذف زیر حساب ها
    var TestZAcc_DeleteUri = server + '/api/Web_Data/TestZAcc_Delete/'; // آدرس تست حذف 
    var TestZAccUri = server + '/api/Web_Data/TestZAcc/'; // آدرس تست  
    var ZGruUri = server + '/api/Web_Data/ZGru/'; // آدرس گروه زیر حساب ها 

    TestUser();

    var zGruCode = '';

    Prog = localStorage.getItem('ProgAccess');

    if (Prog.includes('Acc5'))
        Prog = 'Acc5';  
    else if (Prog.includes('Fct5'))
        Prog = 'Fct5'; 
    else if (Prog.includes('Inv5'))
        Prog = 'Inv5';
    else
        Prog = 'Erj1';


    validation = CheckAccess('NEW_ZAcc', Prog);// New ZAcc
    sessionStorage.NEW_ZAcc = validation;
    validation == true ? $("#AddNewZAcc").show() : $("#AddNewZAcc").hide()

    validation = CheckAccess('CHG_ZAcc', Prog);// edit ZAcc
    sessionStorage.CHG_ZAcc = validation;

    validation = CheckAccess('DEL_ZAcc', Prog); // delete ZAcc
    sessionStorage.DEL_ZAcc = validation;

    self.ShowAction = function (Code) {
        if (sessionStorage.DEL_ZAcc == 'true')
            return true;
        else
            return false;
    }

    var ZAccCode = '';
    var flag_Save = false;

    var old_Code = '';
    var old_Name = '';
    var old_Spec = '';
    var old_ZGru = '';
    var isUpdate = false;
    var rprtId = 'ZAcc';

    var columns = [
        'Code',
        'Name',
        'Spec',
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

    //Get  ZGru List
    function getZGruList() {
        ajaxFunction(ZGruUri + ace + '/' + sal + '/' + group, 'GET',  true).done(function (data) {
            self.ZGruList(data);
        });
    }

    $('#btnZGru').click(function () {
        if (self.ZGruList().length == 0) {
            getZGruList();
        }
    });

    $('#SaveColumns').click(function () {
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/ZAcc", columns, self.SettingColumnList());
       // localStorage.setItem('listFilter', null);
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
        SaveColumn(ace, sal, group, rprtId, "/AFIBase/ZAcc", columns, self.SettingColumnList());
       // localStorage.setItem('listFilter', null);
    });

    getRprtColsList(true, sessionStorage.userName);

    function getZAccList() {
        ajaxFunction(ZAccUri + ace + '/' + sal + '/' + group + '/' + null, 'GET', true, true).done(function (data) {
            self.ZAccList(data == null ? [] : data);
        });
    }




    getZAccList();

    self.currentPageZAcc = ko.observable();

    pageSizeZAcc = localStorage.getItem('pageSizeZAcc') == null ? 10 : localStorage.getItem('pageSizeZAcc');
    self.pageSizeZAcc = ko.observable(pageSizeZAcc);
    self.currentPageIndexZAcc = ko.observable(0);
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.filterCode = ko.observable("");
    self.filterName = ko.observable("");
    self.filterSpec = ko.observable("");



    self.filterZAccList = ko.computed(function () {
        self.currentPageIndexZAcc(0);
        var filterCode = self.filterCode();
        var filterName = self.filterName();
        var filterSpec = self.filterSpec();

        if (!filterCode && !filterName && !filterSpec) {
            //if (self.ZAccList() != null)
                $("#CountRecord").text(self.ZAccList().length);
           // localStorage.setItem('listFilter', null);
            return self.ZAccList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZAccList(), function (item) {
                result =
                    (item.Code == null ? '' : item.Code.toString().search(filterCode) >= 0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filterName) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filterSpec) >= 0)
                return result;
            })
            $("#CountRecord").text(tempData.length);
            return tempData;
        }
    });

    self.search = ko.observable("");
    self.search(sessionStorage.searchZAcc);
    self.firstMatch = ko.dependentObservable(function () {
        var indexZAcc = 0;
        sessionStorage.searchZAcc = "";
        var search = self.search();
        if (!search) {
            self.currentPageIndexZAcc(0);
            return null;
        } else {
            value = ko.utils.arrayFirst(self.ZAccList(), function (item) {
                indexZAcc += 1;
                return item.Code == search;
            });
            if (indexZAcc < self.pageSizeZAcc())
                self.currentPageIndexZAcc(0);
            else {
                var a = Math.round((indexZAcc / self.pageSizeZAcc()), 0);
                if (a < (indexZAcc / self.pageSizeZAcc())) a += 1;
                self.currentPageIndexZAcc(a - 1);
            }
            return value;
        }
    });

    self.currentPageZAcc = ko.computed(function () {
        var pageSizeZAcc = parseInt(self.pageSizeZAcc(), 10),
            startIndex = pageSizeZAcc * self.currentPageIndexZAcc(),
            endIndex = startIndex + pageSizeZAcc;
        localStorage.setItem('pageSizeZAcc', pageSizeZAcc);
        return self.filterZAccList().slice(startIndex, endIndex);
    });

    self.nextPageZAcc = function () {
        if (((self.currentPageIndexZAcc() + 1) * self.pageSizeZAcc()) < self.filterZAccList().length) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() + 1);
        }
    };

    self.previousPageZAcc = function () {
        if (self.currentPageIndexZAcc() > 0) {
            self.currentPageIndexZAcc(self.currentPageIndexZAcc() - 1);
        }
    };

    self.firstPageZAcc = function () {
        self.currentPageIndexZAcc(0);
    };

    self.lastPageZAcc = function () {
        tempCountZAcc = parseInt(self.filterZAccList().length / self.pageSizeZAcc(), 10);
        if ((self.filterZAccList().length % self.pageSizeZAcc()) == 0)
            self.currentPageIndexZAcc(tempCountZAcc - 1);
        else
            self.currentPageIndexZAcc(tempCountZAcc);
    };

    self.iconTypeCode = ko.observable("");
    self.iconTypeName = ko.observable("");
    self.iconTypeSpec = ko.observable("");

    self.sortTableZAcc = function (viewModel, e) {
        if (e != null)
            var orderProp = $(e.target).attr("data-column")
        else {
            orderProp = localStorage.getItem("sortBase_ZAcc" + rprtId);
            self.sortType = localStorage.getItem("sortBaseType_ZAcc" + rprtId);
        }

        if (orderProp == null)
            return null

        localStorage.setItem("sortBase_ZAcc" + rprtId, orderProp);
        localStorage.setItem("sortBaseType_ZAcc" + rprtId, self.sortType);

        self.search("");
        self.currentColumn(orderProp);
        self.ZAccList.sort(function (left, right) {
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

        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };


    $('#refreshZAcc').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست زیر حساب ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getZAccList();
                self.sortTableZAcc();
            }
        })
    })


    self.AddNewZAcc = function () {
        isUpdate = false;
        sessionStorage.NEW_ZAcc == 'true' ? $("#saveZAcc").show() : $("#saveZAcc").hide();
        aGruCode = '';
        zGruCode = '';
        counterZGru = 0;
        list_ZGruSelect = new Array();
        $('#Code').attr('readonly', false);
        $('#Code').val('');
        $('#Name').val('');
        $('#Spec').val('');
        $('#nameZGru').val('');

        old_Code = '';
        old_Name = '';
        old_Spec = '';
        old_ZGru = '';

        $("#Code").focus();
        $('#modal-ZAcc').modal('show');
    }


    function SetDataZAcc(item) {
        isUpdate = true;
        $('#Code').val(item.Code);
        $('#Code').attr('readonly', true);
        $('#Name').val(item.Name);
        $('#Spec').val(item.Spec);


        $('#status').val(status);

        old_Code = item.Code;
        old_Name = item.Name;
        old_Spec = item.Spec;
        old_ZGru = item.ZGru;
        $("#Code").focus();
        ZAccCode = item.Code;

        zGruCode = item.ZGruCode;
        if (zGruCode != '')
            $('#nameZGru').val('(' + item.ZGruCode + ') ' + item.ZGruName);

    }

    self.UpdateZAcc = function (item) {
        sessionStorage.CHG_ZAcc == 'true' ? $("#saveZAcc").show() : $("#saveZAcc").hide();

        flag_Save = false;

        SetDataZAcc(item);
        if (TestUseSanad(ace, sal, "ZAcc", ZAccCode, true, '') == true) {
            showNotification(translate('زیر حساب') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {
            $('#modal-ZAcc').modal('show');
        }
    }


    function SaveZAcc() {
        code = $('#Code').val();
        name = $('#Name').val();
        status = $('#status').val();

        if (code == "") {
            return showNotification(translate('کد زیر حساب را وارد کنید'), 0)
        }

        /* if (name == "") {
             return showNotification(translate('نام زیر حساب را وارد کنید'), 0)
         }*/

        var TestZAcc_Object = {
            Code: code
        };

        ajaxFunction(TestZAccUri + ace + '/' + sal + '/' + group, 'POST', TestZAcc_Object).done(function (data) {
            var obj = JSON.parse(data);
            self.TestZAccList(obj);
            if (data.length > 2) {
                $('#modal-Test').modal('show');
                SetDataTestZAcc(false);
            }
            else {


                var SaveZAcc_Object = {
                    BranchCode: 0,
                    UserCode: sessionStorage.userName,
                    Code: code,
                    Name: name,
                    Spec: $('#Spec').val(),
                    ZGruCode: zGruCode,
                };

                ajaxFunction(SaveZAccUri + ace + '/' + sal + '/' + group, 'POST', SaveZAcc_Object).done(function (data) {
                    getZAccList();
                    self.sortTableZAcc();
                    $('#modal-ZAcc').modal('hide');
                    flag_Save = true;
                    SaveLog(Prog, isUpdate == true ? EditMode_Chg : EditMode_New, LogMode_ZAcc, code, 0, 0);

                    showNotification(translate('ذخیره شد'), 1);
                });
            }
        });
    }

    $('#saveZAcc').click(function () {
        SaveZAcc();
    });


    self.DeleteZAcc = function (item) {

        ZAccCode = item.Code;
        if (TestUseSanad(ace, sal, "ZAcc", ZAccCode, false, '') == true) {
            showNotification(translate('زیر حساب') + ' ' + translate('در تب دیگری در حال ویرایش است'), 0)
        }
        else {

            Swal.fire({
                title: mes_Delete,
                text: translate("آیا زیر حساب انتخابی حذف شود"),
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
                    var TestZAcc_DeleteObject = {
                        Code: code
                    };

                    ajaxFunction(TestZAcc_DeleteUri + ace + '/' + sal + '/' + group, 'POST', TestZAcc_DeleteObject).done(function (data) {
                        var obj = JSON.parse(data);
                        self.TestZAccList(obj);
                        if (data.length > 2) {
                            $('#modal-Test').modal('show');
                            SetDataTestZAcc(true);
                        }
                        else {
                            DeleteZAcc(code);
                        }
                    });
                }
            })
        }
    };

    function SetDataTestZAcc(deleteZAcc) {

        $("#BodyTestZAcc").empty();
        deleteZAcc == true ? $("#titleTestZAcc").text(translate('حذف زیر حساب')) : $("#titleTestZAcc").text(translate('ذخیره زیر حساب'));
        textBody = '';
        countWarning = 0;
        countError = 0;
        list = self.TestZAccList();
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

        $('#BodyTestZAcc').append(textBody);

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

    function DeleteZAcc(code) {
        ajaxFunction(DelZAccUri + ace + '/' + sal + '/' + group + '/' + code + '/', 'GET').done(function (response) {
            currentPage = self.currentPageIndexZAcc();
            getZAccList();
            self.sortTableZAcc();
            self.currentPageIndexZAcc(currentPage);
            SaveLog(Prog, EditMode_Del, LogMode_ZAcc, code, 0, 0);
            showNotification(translate('حذف شد'), 1);
        });
    }



    $("#Close_ModalZAcc").click(function (e) {
        if (flag_Save == false) {
            flag_IsChange1 = ($("#Code").val() != old_Code);
            flag_IsChange2 = ($("#Name").val() != old_Name);
            flag_IsChange3 = ($("#Spec").val() != old_Spec);
            flag_IsChange4 = (zGruCode != old_ZGru);
            if (flag_IsChange1 || flag_IsChange2 || flag_IsChange3 || flag_IsChange4) {
                Swal.fire({
                    title: translate('ثبت تغییرات'),
                    text: translate('زیر حساب تغییر کرده است آیا ذخیره شود ؟'),
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
                        SaveZAcc();
                        $('#modal-ZAcc').modal('hide');
                    } else if (result.dismiss == "cancel") {
                        $('#modal-ZAcc').modal('hide');
                    }
                })
            }
            else {
                $('#modal-ZAcc').modal('hide');
            }
        } else {
            $('#modal-ZAcc').modal('hide');
        }
    });



    $("#Code").focusout(function () {
        code = $("#Code").val();

        if ($(this).attr('readonly') != 'readonly' && code != '') {

            listCode = ko.utils.arrayFilter(self.ZAccList(), function (item) {
                return item.Code == code;
            });

            if (listCode.length == 1) {
                SetDataZAcc(listCode[0]);
                $("#Name").focus();
            }
        }

    });

    $('#modal-ZAcc').on('hide.bs.modal', function () {
        RemoveUseSanad(ace, sal, "ZAcc", ZAccCode);
    });

    window.onbeforeunload = function () {
        RemoveUseSanad(ace, sal, "ZAcc", ZAccCode);
    };

    self.radif = function (index) {
        countShow = self.pageSizeZAcc();
        page = self.currentPageIndexZAcc();
        calc = (countShow * page) + 1;
        return index + calc;
    }

    function CreateTableReport(data) {
        $("#TableList").empty();
        dataTable =
            ' <table class="table table-hover">' +
            '   <thead style="cursor: pointer;">' +
            '       <tr data-bind="click: sortTableZAcc">' +
            '<th>' + translate('ردیف') + '</th>' +

            CreateTableTh('Code', data) +
            CreateTableTh('Name', data) +
            CreateTableTh('Spec', data) +
            '<th>' + translate('عملیات') + '</th>' +
            '      </tr>' +
            '   </thead >' +
            ' <tbody data-bind="foreach: currentPageZAcc" data-dismiss="modal" style="cursor: default;">' +
            '     <tr data-bind="event:{dblclick: $root.UpdateZAcc} , css: { matched: $data === $root.firstMatch() }"  >' +
            '<td data-bind="text: $root.radif($index())" style="background-color: ' + colorRadif + ';"></td>' +
            CreateTableTd('Code', 0, 0, data) +
            CreateTableTd('Name', 0, 0, data) +
            CreateTableTd('Spec', 0, 0, data) +
            '<td>' +
            '   <a id="UpdateZAcc" data-bind="click: $root.UpdateZAcc , attr: {title:text_Update}">' +
            '       <img src="/Content/img/list/streamline-icon-pencil-write-2-alternate@48x48.png" width="16" height="16" style="margin-left:10px" />' +
            '   </a>' +
            '   <a id="DeleteZAcc" data-bind="click: $root.DeleteZAcc, visible: $root.ShowAction(Code) , attr: {title:text_Delete}">' +
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

    self.sortTableZAcc();

    document.onkeydown = function (e) {
        if (e.ctrlKey) {
            if ($('#AddNewZAcc').css('display') != 'none') {
                if (e.keyCode == key_Insert)
                    self.AddNewZAcc();
            }

        }
        else if (e.shiftKey) {

        }
        else {
            if (e.keyCode == key_F2 && $('#modal-ZAcc').is(':visible')) {
                SaveZAcc();
            }
            if (e.keyCode == key_Esc && $('#modal-ZAcc').is(':visible')) {
                $('#modal-ZAcc').modal('hide');
            }
        }
    };

    self.PageIndexZAcc = function (item) {
        return CountPage(self.filterZAccList(), self.pageSizeZAcc(), item);
    };




    self.currentPageZGru = ko.observable();
    pageSizeZGru = localStorage.getItem('pageSizeZGru') == null ? 10 : localStorage.getItem('pageSizeZGru');
    self.pageSizeZGru = ko.observable(pageSizeZGru);
    self.currentPageIndexZGru = ko.observable(0);

    self.filterZGru0 = ko.observable("");
    self.filterZGru1 = ko.observable("");
    self.filterZGru2 = ko.observable("");

    self.PageIndexZGru = function (item) {
        return CountPage(self.filterZGruList(), self.pageSizeZGru(), item);
    };

    self.filterZGruList = ko.computed(function () {

        self.currentPageIndexZGru(0);
        var filter0 = self.filterZGru0().toUpperCase();
        var filter1 = self.filterZGru1();
        var filter2 = self.filterZGru2();

        if (!filter0 && !filter1 && !filter2) {
            return self.ZGruList();
        } else {
            tempData = ko.utils.arrayFilter(self.ZGruList(), function (item) {
                result =
                    ko.utils.stringStartsWith(item.Code.toString().toLowerCase(), filter0) &&
                    (item.Name == null ? '' : item.Name.toString().search(filter1) >= 0) &&
                    (item.Spec == null ? '' : item.Spec.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });


    self.currentPageZGru = ko.computed(function () {
        var pageSizeZGru = parseInt(self.pageSizeZGru(), 10),
            startIndex = pageSizeZGru * self.currentPageIndexZGru(),
            endIndex = startIndex + pageSizeZGru;
        localStorage.setItem('pageSizeZGru', pageSizeZGru);
        return self.filterZGruList().slice(startIndex, endIndex);
    });

    self.nextPageZGru = function () {
        if (((self.currentPageIndexZGru() + 1) * self.pageSizeZGru()) < self.filterZGruList().length) {
            self.currentPageIndexZGru(self.currentPageIndexZGru() + 1);
        }
    };

    self.previousPageZGru = function () {
        if (self.currentPageIndexZGru() > 0) {
            self.currentPageIndexZGru(self.currentPageIndexZGru() - 1);
        }
    };

    self.firstPageZGru = function () {
        self.currentPageIndexZGru(0);
    };

    self.lastPageZGru = function () {
        countZGru = parseInt(self.filterZGruList().length / self.pageSizeZGru(), 10);
        if ((self.filterZGruList().length % self.pageSizeZGru()) == 0)
            self.currentPageIndexZGru(countZGru - 1);
        else
            self.currentPageIndexZGru(countZGru);
    };

    self.sortTableZGru = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.ZGruList.sort(function (left, right) {
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


        if (orderProp == 'SortCode') self.iconTypeCode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'SortName') self.iconTypeName((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'Spec') self.iconTypeSpec((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    self.PageCountView = function () {
        sessionStorage.invSelect = $('#invSelect').val();
        select = $('#pageCountSelector').val();
    }



    $('#refreshZGru').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست گروه زیر حساب ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getZGruList();
            }
        })
    })


    self.selectZGru = function (item) {
        zGruCode = item.Code;
        $('#nameZGru').val('(' + item.Code + ') ' + item.Name);
    }


};

ko.applyBindings(new ViewModel());

