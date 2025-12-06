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
        defultSort: 0,
        pageCount: 0,
        pageSize: 0,
        currentPageIndex: 0
    },

    _create: function () {
        var obj = this;
        var options = obj.options;
        var table = obj._CreateTable();
        this.element.append(table);
    },

    _CreateTable: function () {
        var obj = this;
        var options = obj.options;
        var list = options.data;
        var _columns = options.columns;


        _divFinal = $('<div>')
        _divTable = $('<div style="height:420px;overflow:auto;border: 1px #ddd solid;">');
        _table = $('<table class="table table-hover table-striped tableFixList">');
        _tHead = $('<thead style="cursor: pointer;">');
        _tr = $('<tr>');
        for (var i = 0; i < _columns.length; i++) {
            _th = $('<th data-column="' + _columns[i].name + '">');
            _thSpan = $('<span>' + _columns[i].caption + '</span>');
            _thIcon = $('<i class="glyphicon glyphicon-chevron-up"></i>');
            _th.append(_thSpan);
            _th.append(_thIcon);
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
        _bPage = $('<b style="margin: 0px 5px 0px 5px; color: #ec8121;">1 از 1</b>');
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
        obj._CreateBody(0, last);


        _aFirstPage.click(function (e) {
            options.currentPageIndex = 0;
            $(_bPage).text('1');
            var last = options.pageSize;
            last = last >= rowAllCount ? rowAllCount : last;
            obj._CreateBody(0, last);
        });

        _aNextPage.click(function () {
            obj.NextPage();
/*
            var obj = this;
            var options = obj.options;
            var currentIndexTemp = options.currentPageIndex;
            currentIndexTemp++;
            first = currentIndexTemp * options.pageSize;
            if (first <= rowAllCount) {
                options.currentPageIndex++;
                $(_bPage).text(options.currentPageIndex + 1);
                last = options.pageSize + first;
                last = last >= rowAllCount ? rowAllCount : last;
                obj._CreateBody(first, last);
            }*/
        });

        _aPreviousPage.click(function (e) {
            var currentIndexTemp = options.currentPageIndex;
            currentIndexTemp--;
            first = currentIndexTemp * options.pageSize;
            if (first <= rowAllCount && currentIndexTemp >= 0) {
                options.currentPageIndex--;
                $(_bPage).text(options.currentPageIndex + 1);

                last = options.pageSize + first;
                last = last >= rowAllCount ? rowAllCount : last;
                obj._CreateBody(first, last);
            }
        });

        _aLastPage.click(function (e) {
            var currentIndexTemp = parseInt(rowAllCount / options.pageSize);
            if (currentIndexTemp >= 0) {
                options.currentPageIndex = currentIndexTemp;
                $(_bPage).text(options.currentPageIndex + 1);
                first = currentIndexTemp * options.pageSize;
                last = rowAllCount;
                obj._CreateBody(first, last);
            }
        });

        return _divFinal;
    },

    NextPage: function () {
        obj = this;
        var options = obj.options;
        var list = options.data;
        rowAllCount = list.length;
        var currentIndexTemp = options.currentPageIndex;
        currentIndexTemp++;
        first = currentIndexTemp * options.pageSize;
        if (first <= rowAllCount) {
            options.currentPageIndex++;
            //$(_bPage).text(options.currentPageIndex + 1);
            last = options.pageSize + first;
            last = last >= rowAllCount ? rowAllCount : last;
            obj._CreateBody(first, last);
        }


       /* if (((obj.currentPage + 1) * obj.options.countPage) < obj.source.length) {
            obj.currentPage++;
            obj._CreateBody();
        }
        sessionStorage[obj.options.name + '_CurrentPage'] = obj.currentPage;*/
    },

    _CreateBody: function (first, last) {
        var obj = this;
        var options = obj.options;
        var list = options.data;
        var _columns = options.columns;

        var table = $(obj.bindings[0]).find('.table-hover');

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

