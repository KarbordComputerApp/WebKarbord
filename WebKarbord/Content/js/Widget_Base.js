var baseData = {};

const d_kala = 'Kala';


var translateColumn = {
    Code: "کد",
    Name: "نام",
    FanniNo: "شماره فنی",
    Spec: "ملاحظات"
}


$.widget("ui.Table", {
    options: {
        data: [],
        columns: [],
        sort: '',
        sortMode: '',
        pageCount: 0,
        pageSize: 0,
        currentPageIndex: 0
    },

    _create: function () {
        var obj = this;
        var options = obj.options;
        var table = obj._CreateTable();
        this.element.append(table);
        obj._Sort(options.sort, options.sortMode);

        obj._CreateBody(0, options.pageSize);

        var th = table.find('thead th');
        var tr = table.find('tbody tr');

        th.click(function (e) {
            var columnName = $(this).attr('ColumnName');
            var iconMode = $(this).find('.' + mode_Sort_DESC);
            obj._Sort(columnName, iconMode.length > 0 ? '' : mode_Sort_DESC);
            obj._FirstPage();
        });

        tr.click(function (e) {
            var a = this;
        });

    },

    _CreateTable: function () {
        var obj = this;
        var options = obj.options;
        var list = options.data;
        var _columns = options.columns;

        _divFinal = $('<div>')
        _divTable = $('<div style="height:420px;overflow:auto;border: 1px #ddd solid;">');
        _table = $('<table class="table table-hover table-striped tableFixList K_DataGrid">');
        _tHead = $('<thead style="cursor: pointer;">');
        _tr = $('<tr>');
        for (var i = 0; i < _columns.length; i++) {
            _th = $('<th ColumnName="' + _columns[i].name + '">');
            _thSpan = $('<span>' + _columns[i].caption + '</span>');
            _th.append(_thSpan);

            /*_thIcon = $('<i class="glyphicon glyphicon-chevron-up"></i>');
            _th.append(_thIcon);*/

            _tr.append(_th);
        }
        _tHead.append(_tr);

        var rowAllCount = list.length;
        var last = options.pageSize;
        last = last >= rowAllCount ? rowAllCount : last;

        _tBody = $('<tbody data-dismiss="modal" style="cursor: default;">');

        _tfoot = $('<tfoot>');
        _tr = $('<tr style="background-color: #efb68399;">');
        for (var i = 0; i < _columns.length; i++) {
            _td = $('<td style="padding: 0px 3px;" class="focused">');
            _input = $('<input type="text" class="form-control" style="height: 2.4rem;">');
            _td.append(_input);
            _tr.append(_td);
        }
        _tfoot.append(_tr);

        _table.append(_tHead);
        _table.append(_tBody);
        _table.append(_tfoot);

        _divTable.append(_table);

        _div = $('<div class="row">');

        // select PageCount
        _divPageSize = $('<div class="col-md-6">');
        _divInline = $('<div class="form-inline">');
        _label = $('<label>نمایش</label>');
        _divSelect = $('<div class="form-group" style="text-align: center; width: 50px;  margin: 5px;">');
        _select = $('<select class="selectorange">');
        for (var i = 1; i <= 10; i++) {
            _option = $('<option value="' + i + '0">' + i + '0</option>');
            _select.append(_option);
        }
        $(_select).val(options.pageSize);
        _labelCount = $('<label>رکورد در هر صفحه</label>');
        _divSelect.append(_select);
        _divInline.append(_label);
        _divInline.append(_divSelect);
        _divInline.append(_labelCount);
        _divPageSize.append(_divInline);
        _div.append(_divInline);

        // Paggin bottom
        _divArrow = $('<div class="col-md-6 panel_Arrow" style="text-align: left; margin-top: 10px;">');

        _aFirstPage = $('<a><img class="firstPage-img" src="/Content/img/list/streamline-icon-navigation-first.png" width="14" height="14" title="اولین"></a>');
        _aPreviousPage = $('<a><img class="previousPage-img"  src="/Content/img/list/streamline-icon-navigation-back.png" width="14" height="14" style="margin: 0px 5px 0px 5px;" title="قبلی"></a>');
        _bPage = $('<b class="l_PageCount" style="margin: 0px 5px 0px 5px; color: #ec8121;">' + (options.currentPageIndex + 1) + ' از ' + Math.ceil(rowAllCount / options.pageSize) + '</b>');
        _aNextPage = $('<a><img class="nextPage-img" src="/Content/img/list/streamline-icon-navigation-next.png" width="14" height="14" style="margin: 0px 5px 0px 5px;" title="بعدی"></a>');
        _aLastPage = $('<a><img class="lastPage-img" src="/Content/img/list/streamline-icon-navigation-last.png" width="14" height="14" title="آخرین"></a>');

        _divArrow.append(_aFirstPage);
        _divArrow.append(_aPreviousPage);
        _divArrow.append(_bPage);
        _divArrow.append(_aNextPage);
        _divArrow.append(_aLastPage);

        _div.append(_divArrow);

        _divFinal.append(_divTable);
        _divFinal.append(_div);


        _aFirstPage.click(function (e) {
            obj._FirstPage();
        });

        _aNextPage.click(function () {
            obj._NextPage();
        });

        _aPreviousPage.click(function (e) {
            obj._PreviousPage();
        });

        _aLastPage.click(function (e) {
            obj._LastPage();
        });

        return _divFinal;
    },

    _FirstPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;
        o.currentPageIndex = 0;
        l_PageCount.text('1' + ' از ' + Math.ceil(rowAllCount / o.pageSize));
        var last = o.pageSize;
        last = last >= rowAllCount ? rowAllCount : last;
        obj._CreateBody(0, last);
    },
    _NextPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;
        var first = (o.currentPageIndex + 1) * o.pageSize;
        if (first <= rowAllCount) {
            o.currentPageIndex++;
            l_PageCount.text((o.currentPageIndex + 1) + ' از ' + Math.ceil(rowAllCount / o.pageSize));
            last = o.pageSize + first;
            last = last >= rowAllCount ? rowAllCount : last;
            obj._CreateBody(first, last);
        }
    },
    _PreviousPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;

        var currentIndexTemp = o.currentPageIndex;
        currentIndexTemp--;
        first = currentIndexTemp * o.pageSize;
        if (first <= rowAllCount && currentIndexTemp >= 0) {
            o.currentPageIndex--;
            l_PageCount.text((o.currentPageIndex + 1) + ' از ' + Math.ceil(rowAllCount / o.pageSize));
            last = o.pageSize + first;
            last = last >= rowAllCount ? rowAllCount : last;
            obj._CreateBody(first, last);
        }

    },
    _LastPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;
        o.currentPageIndex = 0;


        var currentIndexTemp = parseInt(rowAllCount / o.pageSize);
        if (currentIndexTemp >= 0) {
            o.currentPageIndex = currentIndexTemp;
            l_PageCount.text(Math.ceil(o.currentPageIndex + 1) + ' از ' + Math.ceil(rowAllCount / o.pageSize));
            first = currentIndexTemp * o.pageSize;
            last = rowAllCount;
            obj._CreateBody(first, last);
        }
    },

    _CreateBody: function (first, last) {
        var obj = this;
        var options = obj.options;
        var list = options.data;
        var _columns = options.columns;

        var table = $(obj.bindings[0]).find('.K_DataGrid');

        body = table.find('tbody');
        if (body.length > 0) {
            body.empty();
        }
        //table.append("<tbody></tbody>");

        for (var i = first; i < last; i++) {
            var _tr = $('<tr>');
            for (var j = 0; j < _columns.length; j++) {
                _td = $('<td data-name="' + _columns[j].name + '" ' + (_columns[j].type == type_WideString ? 'class="ellipsis"' : '') + '>' + list[i][_columns[j].name] + '</td>');
                _tr.append(_td);
            }
            body.append(_tr);
        }
    },

    _Sort: function (Column, Mode) {
        var obj = this;
        var options = obj.options;
        var list = options.data;
        list.sort(function (a, b) {
            _a = FixSortName(a[Column]);
            _b = FixSortName(b[Column]);
            return Mode == mode_Sort_DESC ? (_a < _b ? 1 : -1) : (_a > _b ? 1 : -1);
        });

        var table = $(obj.bindings[0]).find('.K_DataGrid thead tr');
        table.find('.iconSort').remove();
        _th = table.find("[ColumnName=" + Column + "]");
        icon = Mode == "DESC" ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up";
        _thIcon = $('<i class="iconSort ' + Mode + ' ' + icon + '"></i>');
        _th.append(_thIcon);
    },

    _Refresh: function () {
        var obj = this;
        var options = obj.options;
    },
});



$.widget("ui.Base", {
    options: {
        id: "free",
        caption: "free",
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },

    },

    _create: function () {
        var obj = this;
        var options = obj.options;

        var divObject = $('<div class="input-group">');
        var divBtn = $('<div class="input-group-addon">');
        var aBtn = $('<a class="dropdown-toggle">');
        var iconBtn = $('<img src="/Content/img/list/SearchKala.png" class="icon" height="20" width="20" title="انتخاب">');
        aBtn.append(iconBtn);
        divBtn.append(aBtn);

        var divInput = $('<div class="form-group form-float" style="margin-bottom: 5px;">');
        var divInput0 = $('<div class="form-line focused date fix">');
        var input = $('<input class="form-control" readonly="">');
        var labelInput = $('<label class="form-label">' + options.caption + '</label>');

        divInput0.append(input);
        divInput0.append(labelInput);
        divInput.append(divInput0);

        divObject.append(divBtn);
        divObject.append(divInput);
        this.element.append(divObject);
        aBtn.click(function (e) {
            if ($("#" + options.id + "_modal").length == 0)
                obj._GetData(false);
            else
                $("#" + options.id + "_modal").modal('show');
        });
    },




    _CreateModal: function () {
        var obj = this;
        var options = obj.options;
        var m = $("#" + options.id + "_modal");

        var _column;
        if (options.id == d_kala)
            _column = ['Code', 'Name', 'FanniNo', 'Spec'];

        if (m.length == 0) {
            //modal
            body = $('main');
            _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
            dialog = $('<div class="modal-dialog"></div>');
            _modal.append(dialog);
            content = $('<div class="modal-content"></div>');
            dialog.append(content);

            //head
            _header = $('<div class="modal-header">');
            _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
            _header.append(_buttonExit);
            title = $('<p class="modal-title" style="width: 90%;text-align: center;">لیست ' + options.caption + '</p>');
            _header.append(title);

            _aRefresh = $('<a> <img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20" style="margin-left: 10px;" title="به روز رسانی"></a>')
            _header.append(_aRefresh);

            // end head

            //body
            _body = $('<div class="modal-body">');
            _div = $('<div style="height:420px;overflow:auto;border: 1px #ddd solid;">');
            _table = $('<table class="table table-hover table-striped tableFixList">');
            _tHead = $('<thead style="cursor: pointer;">');
            _tr = $('<tr>');
            for (var i = 0; i < _column.length; i++) {
                _th = $('<th data-column="' + _column[i] + '">');
                _thSpan = $('<span>' + translateColumn[_column[i]] + '</span>');
                _thIcon = $('<i class="glyphicon glyphicon-chevron-up"></i>');
                _th.append(_thSpan);
                _th.append(_thIcon);
                _tr.append(_th);
            }
            _tHead.append(_tr);

            _tBody = $('<tbody data-dismiss="modal" style="cursor: default;">');
            var list = baseData[options.id];
            for (var i = 0; i < list.length; i++) {
                _tr = $('<tr>');
                for (var j = 0; j < _column.length; j++) {
                    _td = $('<td data-name="' + _column[j] + '" class="ellipsis">' + list[i][_column[j]] + '</td>');
                    _tr.append(_td);
                }
                _tBody.append(_tr);
            }


            _table.append(_tHead);
            _table.append(_tBody);
            _div.append(_table);

            _body.append(_div);


            // _tr = $('');

            //end body


            _footer = $('<div style="padding: 0px; margin: 10px;">');
            _divFooter1 = $('<div class="row">');
            _divFooter1.append($('<div class="col-md-6">'));

            _footer.append(_divFooter1);

            content.append(_header);
            content.append(_body);
            content.append(_footer);

            body.append(_modal);
        }
        //end modal

        //script

        _aRefresh.click(function (e) {
            obj._GetData(true);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () { })
        //end script
    },

    _GetData: function (refresh) {
        var obj = this;
        var options = obj.options;
        var uri = "";
        if (baseData[options.id] == null || refresh) {
            if (options.id == d_kala) {
                uri += server + '/api/Web_Data/Kala/' + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group;
                whereKala = localStorage.getItem('whereKala');
                var object = {
                    withimage: false,
                    updatedate: null,
                    Mode: 0,
                    UserCode: sessionStorage.userName,
                    where: whereKala,
                    KalaCode: ''
                }
                ajaxFunction(uri, 'POST', object, true).done(function (response) {
                    baseData[options.id] = response;
                    obj._CreateModal();
                    if (refresh == false) {
                        $("#" + options.id + "_modal").modal('show');
                    }
                });
            }
        }
    },

    _Button: function (name, item) {
        this._trigger(name, null, item);
    },

});




function FixSortName(name) {
    if (typeof name == "string" && name != "" && name.substring(0, 4) != '    ') {
        str = name.trim();
        str = str.replaceAll('آ', String.fromCharCode(1000));
        str = str.replaceAll('ا', String.fromCharCode(1001));
        str = str.replaceAll('ب', String.fromCharCode(1002));
        str = str.replaceAll('پ', String.fromCharCode(1003));
        str = str.replaceAll('ت', String.fromCharCode(1004));
        str = str.replaceAll('ث', String.fromCharCode(1005));
        str = str.replaceAll('ج', String.fromCharCode(1006));
        str = str.replaceAll('چ', String.fromCharCode(1007));
        str = str.replaceAll('ح', String.fromCharCode(1008));
        str = str.replaceAll('خ', String.fromCharCode(1009));
        str = str.replaceAll('د', String.fromCharCode(1010));
        str = str.replaceAll('ذ', String.fromCharCode(1011));
        str = str.replaceAll('ر', String.fromCharCode(1012));
        str = str.replaceAll('ز', String.fromCharCode(1013));
        str = str.replaceAll('ژ', String.fromCharCode(1014));
        str = str.replaceAll('س', String.fromCharCode(1015));
        str = str.replaceAll('ش', String.fromCharCode(1016));
        str = str.replaceAll('ص', String.fromCharCode(1017));
        str = str.replaceAll('ض', String.fromCharCode(1018));
        str = str.replaceAll('ط', String.fromCharCode(1019));
        str = str.replaceAll('ظ', String.fromCharCode(1020));
        str = str.replaceAll('ع', String.fromCharCode(1021));
        str = str.replaceAll('غ', String.fromCharCode(1022));
        str = str.replaceAll('ف', String.fromCharCode(1023));
        str = str.replaceAll('ق', String.fromCharCode(1024));
        str = str.replaceAll('ك', String.fromCharCode(1025));
        str = str.replaceAll('ک', String.fromCharCode(1026));
        str = str.replaceAll('گ', String.fromCharCode(1027));
        str = str.replaceAll('ل', String.fromCharCode(1028));
        str = str.replaceAll('م', String.fromCharCode(1029));
        str = str.replaceAll('ن', String.fromCharCode(1030));
        str = str.replaceAll('و', String.fromCharCode(1031));
        str = str.replaceAll('ه', String.fromCharCode(1032));
        str = str.replaceAll('ی', String.fromCharCode(1033));
        str = str.replaceAll('ي', String.fromCharCode(1033));
    }
    else {
        str = name;
    }

    return str
}