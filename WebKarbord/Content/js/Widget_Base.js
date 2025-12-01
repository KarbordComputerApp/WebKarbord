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
        pageCount: 0
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

        _tBody = $('<tbody data-dismiss="modal" style="cursor: default;">');
        for (var i = 0; i < list.length; i++) {
            _tr = $('<tr>');
            for (var j = 0; j < _columns.length; j++) {
                _td = $('<td data-name="' + _columns[j].name + '" ' + (_columns[j].type == type_WideString ? 'class="ellipsis"' : '') + '>' + list[i][_columns[j].name] + '</td>');
                _tr.append(_td);
            }
            _tBody.append(_tr);
        }

        _table.append(_tHead);
        _table.append(_tBody);
        return _table;
    },
    _CreateBody: function () {
        var obj = this;
        var options = obj.options;
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

