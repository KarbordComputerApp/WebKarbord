$.widget("ui.D_TChk", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            day: 10
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
    },


    _create: function () {
        var obj = this;
        obj._createModal();
        var options = obj.options;
        var itemData = dashbordData.find(c => c.id == options.id);


        if (itemData == null) {
            itemData = { valueControl: options.valueControl, position: options.position };
        } else {
            options.valueControl = itemData.valueControl;
            options.position = itemData.position;
        }

        //itemData.position = options.position;
        //itemData = {};


        var divCart = $('<div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" style ="visibility:' + (options.visible == false ? 'hidden' : 'visible') + '" id="' + options.id + '"  gs-x="' + options.position.x + '" gs-y="' + options.position.y + '" gs-w="' + options.position.w + '" gs-h="' + options.position.h + '">');
        var divContent = $('<div class="grid-stack-item-content" style="background-color:white">');

        //Header
        var divHeader = $('<div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;">');
        var div = $('<div>');

        var li_Setting = $('<li><a><img src="/Content/img/streamline-icon-cog-1@48x48.png" width="20" height="20"><span> تنظیمات </span></a></li>');
        var li_Refresh = $('<li><a><img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20"><span> بروز رسانی </span></a></li>');
        var li_Line = $('<li class="divider"></li>');
        var li_Close = $('<li><a href="#">بستن</a></li>');

        var b_Menu = $('<button class="dropdown dropdown-toggle" data-toggle="dropdown" style="border: none;background-color: white;height: 24px;"><span class="caret"></span>');

        var ui_Menu = $('<ul class="dropdown-menu dropdown-menu-dashbord">');
        ui_Menu.append(li_Refresh);
        ui_Menu.append(li_Setting);
        ui_Menu.append(li_Line);
        ui_Menu.append(li_Close);

        b_Menu.append(ui_Menu);

        div.append(b_Menu);

        var h4 = $('<h4 class="modal-title" style="width: 90%;">' + options.caption + '</h4>');

        divHeader.append(h4);
        divHeader.append(div);
        divContent.append(divHeader);

        var divSum = $('<div class="form-inline" style="padding:10px">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h4 = $('<h4>مجموع : </h4> <h4 id="' + options.id + '_LSum" style="padding-right:5px">0</h4>');
        div.append(h4);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h4 = $('<h4>تعداد : </h4> <h4 id="' + options.id + '_LCount" style="padding-right:5px">0</h4>');
        div.append(h4);
        divSum.append(div);

        divContent.append(divSum);
        //End Header

        //Content
        var table = $('<table id="' + options.id + '_Table" class="table table-hover">');

        divContent.append(table);

        divCart.append(divContent);


        li_Setting.click(function (e) {
            $("#" + options.id + "_modal").modal('show');
        });
        li_Refresh.click(function (e) {
            obj._Refresh()
            obj._Button("Refresh", obj.options);
        });
        li_Close.click(function (e) {
            obj._Close()
            obj._Button("Close", obj.options);
        });


        grid.on('change', function (event, items) {
            var element = $("#" + options.id);
            options.position.x = parseInt($(element).attr("gs-x"));
            options.position.y = parseInt($(element).attr("gs-y"));
            options.position.w = parseInt($(element).attr("gs-w"));
            options.position.h = parseInt($(element).attr("gs-h"));
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.position = options.position;
        });

        itemData.caption = options.caption;
        itemData.baseValue = options.baseValue;

        options.o = divCart[0];
        grid.el.appendChild(divCart[0]);
        let w = grid.makeWidget(divCart[0], options.position.x, options.position.y, options.position.w, options.position.h);
        obj._GetData(options.valueControl.day);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');

        _divBody1 = $('<div class="col-sm" style="padding-top:20px">');
        _divBody2 = $('<div class="form-group form-float">');
        _divBody3 = $('<div class="form-line focused date fix">');
        _inputDay = $('<input type="text" class="form-control" id="' + options.id + '_day">');
        _lable = $('<label class="form-label active">روز مانده به تاریخ چک</label>');



        _divBody3.append(_inputDay);
        _divBody3.append(_lable);

        _divBody2.append(_divBody3);
        _divBody1.append(_divBody2);

        _body.append(_divBody1);
        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _inputDay.val(options.valueControl.day);

        _buttonSave.click(function (e) {
            var day = $("#" + options.id + "_day").val();
            obj.options.valueControl.day = day;
            obj._GetData(options.valueControl.day);
            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_day").val(options.valueControl.day);
        })
        //end script
    },

    _GetData: function (day) {
        var obj = this;
        var options = obj.options;
        var uri = server + '/api/ReportAcc/TChk/'; // آدرس گزارش 

        var tObject = {
            azTarikh: LowDay(day),
            taTarikh: "",
            azShomarh: "",
            taShomarh: "",
            AccCode: "",
            PDMode: "1",
            CheckStatus: "1",
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, true).done(function (response) {
            $("#" + options.id + "_LCount").text(response.length);
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].Value
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum));
            obj._CreateTable(response);
            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });

    },

    _CreateTable: function (data) {
        var obj = this;
        var options = obj.options;
        var table = $("#" + options.id + "_Table");
        table.empty();
        var tbody = $('<tbody>');

        for (var i = 0; i < data.length; i++) {
            var tr = $('<tr>');
            var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconBank(data[i].Bank) + '" width="35" /><p style="color: darkgray;">' + data[i].Shobe + '</p></center>')
            var tdTrafName = $('<td><div><h5 style="padding-right:5px">' + data[i].TrafName + '</h5><h5 style="padding-right:5px;padding-top: 10px;">چک : ' + data[i].CheckNo + '</h5></div></td>')
            var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].Value) + '</h5><div class="DashbordDateChek">' + data[i].CheckDate + '</div></td>')
            tr.append(tdIcon);
            tr.append(tdTrafName);
            tr.append(tdValue);
            tbody.append(tr);
        }
        table.append(tbody);
    },
    _Refresh: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست " + options.caption + " به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                obj._GetData(options.valueControl.day);
            }
        })
    },

    _Close: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: "تایید بستن",
            text: translate("لیست " + options.caption + " بسته شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                for (var i = 0; i < dashbordData.length; i++) {
                    if (dashbordData[i].id == options.id) {
                        dashbordData.splice(i, 1);

                        grid.removeWidget(options.o);
                        break;
                    }
                }

            }
        })
    },

    _Button: function (name, item) {
        this._trigger(name, null, item);
    },

});


$.widget("ui.D_TChk_Sum", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            day: 10
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
    },


    _create: function () {
        var obj = this;
        obj._createModal();
        var options = obj.options;
        var itemData = dashbordData.find(c => c.id == options.id);


        if (itemData == null) {
            itemData = { valueControl: options.valueControl, position: options.position };
        } else {
            options.valueControl = itemData.valueControl;
            options.position = itemData.position;
        }

        var divCart = $('<div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" style ="visibility:' + (options.visible == false ? 'hidden' : 'visible') + '" id="' + options.id + '"  gs-x="' + options.position.x + '" gs-y="' + options.position.y + '" gs-w="' + options.position.w + '" gs-h="' + options.position.h + '">');
        var divContent = $('<div class="grid-stack-item-content" style="background-color:white">');

        //Header
        var divHeader = $('<div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;">');
        var div = $('<div>');

        var li_Setting = $('<li><a><img src="/Content/img/streamline-icon-cog-1@48x48.png" width="20" height="20"><span> تنظیمات </span></a></li>');
        var li_Refresh = $('<li><a><img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20"><span> بروز رسانی </span></a></li>');
        var li_Line = $('<li class="divider"></li>');
        var li_Close = $('<li><a href="#">بستن</a></li>');

        var b_Menu = $('<button class="dropdown dropdown-toggle" data-toggle="dropdown" style="border: none;background-color: white;height: 24px;"><span class="caret"></span>');

        var ui_Menu = $('<ul class="dropdown-menu dropdown-menu-dashbord">');
        ui_Menu.append(li_Refresh);
        ui_Menu.append(li_Setting);
        ui_Menu.append(li_Line);
        ui_Menu.append(li_Close);

        b_Menu.append(ui_Menu);

        div.append(b_Menu);

        var h4 = $('<h4 class="modal-title" style="width: 90%;">' + options.caption + '</h4>');

        divHeader.append(h4);
        divHeader.append(div);
        divContent.append(divHeader);

        var divSum = $('<div class="form-inline" style="padding:10px">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h4 = $('<h4>مجموع : </h4> <h4 id="' + options.id + '_LSum" style="padding-right:5px">0</h4>');
        div.append(h4);
        divSum.append(div);

        divContent.append(divSum);
        //End Header

        //Content
        var table = $('<table id="' + options.id + '_Table" class="table table-hover">');

        divContent.append(table);

        divCart.append(divContent);


        li_Setting.click(function (e) {
            $("#" + options.id + "_modal").modal('show');
        });
        li_Refresh.click(function (e) {
            obj._Refresh()
            obj._Button("Refresh", obj.options);
        });
        li_Close.click(function (e) {
            obj._Close()
            obj._Button("Close", obj.options);
        });


        grid.on('change', function (event, items) {
            var element = $("#" + options.id);
            options.position.x = parseInt($(element).attr("gs-x"));
            options.position.y = parseInt($(element).attr("gs-y"));
            options.position.w = parseInt($(element).attr("gs-w"));
            options.position.h = parseInt($(element).attr("gs-h"));
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.position = options.position;
        });

        itemData.caption = options.caption;
        itemData.baseValue = options.baseValue;

        options.o = divCart[0];
        grid.el.appendChild(divCart[0]);
        let w = grid.makeWidget(divCart[0], options.position.x, options.position.y, options.position.w, options.position.h);
        obj._GetData(options.valueControl.day);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');

        _divBody1 = $('<div class="col-sm" style="padding-top:20px">');
        _divBody2 = $('<div class="form-group form-float">');
        _divBody3 = $('<div class="form-line focused date fix">');
        _inputDay = $('<input type="text" class="form-control" id="' + options.id + '_day">');
        _lable = $('<label class="form-label active">روز مانده به تاریخ چک</label>');



        _divBody3.append(_inputDay);
        _divBody3.append(_lable);

        _divBody2.append(_divBody3);
        _divBody1.append(_divBody2);

        _body.append(_divBody1);
        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _inputDay.val(options.valueControl.day);

        _buttonSave.click(function (e) {
            var day = $("#" + options.id + "_day").val();
            obj.options.valueControl.day = day;
            obj._GetData(options.valueControl.day);
            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_day").val(options.valueControl.day);
        })
        //end script
    },

    _GetData: function (day) {
        var obj = this;
        var options = obj.options;
        var uri = server + '/api/ReportAcc/TChk_Sum/'; // آدرس گزارش 

        var tObject = {
            azTarikh: LowDay(day),
            taTarikh: "",
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, true).done(function (response) {

            sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].Value
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum));
            obj._CreateTable(response);
            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });

    },

    _CreateTable: function (data) {
        var obj = this;
        var options = obj.options;
        var table = $("#" + options.id + "_Table");
        table.empty();
        var tbody = $('<tbody>');

        for (var i = 0; i < data.length; i++) {
            var tr = $('<tr>');
            var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconBank(data[i].Bank) + '" width="35" /></center>')
            var tdTrafName = $('<td><div><h5 style="padding-right:5px">' + data[i].Shobe + '</h5></div></td>')
            var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].Value) + '</h5></td>')
            tr.append(tdIcon);
            tr.append(tdTrafName);
            tr.append(tdValue);
            tbody.append(tr);
        }
        table.append(tbody);
    },
    _Refresh: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست " + options.caption + " به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                obj._GetData(options.valueControl.day);
            }
        })
    },

    _Close: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: "تایید بستن",
            text: translate("لیست " + options.caption + " بسته شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                for (var i = 0; i < dashbordData.length; i++) {
                    if (dashbordData[i].id == options.id) {
                        dashbordData.splice(i, 1);

                        grid.removeWidget(options.o);
                        break;
                    }
                }

            }
        })
    },

    _Button: function (name, item) {
        this._trigger(name, null, item);
    },

});



$.widget("ui.D_TrzFCust", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            top: 10,
            fromDate: '',
            modeItem : '' // forosh S   -    kharid  P
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
    },

    _create: function () {
        var obj = this;
        obj._createModal();
        var options = obj.options;
        var itemData = dashbordData.find(c => c.id == options.id);


        if (itemData == null) {
            itemData = { valueControl: options.valueControl, position: options.position };
        } else {
            options.valueControl = itemData.valueControl;
            options.position = itemData.position;
        }

        var divCart = $('<div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" style ="visibility:' + (options.visible == false ? 'hidden' : 'visible') + '" id="' + options.id + '"  gs-x="' + options.position.x + '" gs-y="' + options.position.y + '" gs-w="' + options.position.w + '" gs-h="' + options.position.h + '">');
        var divContent = $('<div class="grid-stack-item-content" style="background-color:white">');

        //Header
        var divHeader = $('<div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;">');
        var div = $('<div>');

        var li_Setting = $('<li><a><img src="/Content/img/streamline-icon-cog-1@48x48.png" width="20" height="20"><span> تنظیمات </span></a></li>');
        var li_Refresh = $('<li><a><img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20"><span> بروز رسانی </span></a></li>');
        var li_Line = $('<li class="divider"></li>');
        var li_Close = $('<li><a href="#">بستن</a></li>');

        var b_Menu = $('<button class="dropdown dropdown-toggle" data-toggle="dropdown" style="border: none;background-color: white;height: 24px;"><span class="caret"></span>');

        var ui_Menu = $('<ul class="dropdown-menu dropdown-menu-dashbord">');
        ui_Menu.append(li_Refresh);
        ui_Menu.append(li_Setting);
        ui_Menu.append(li_Line);
        ui_Menu.append(li_Close);

        b_Menu.append(ui_Menu);

        div.append(b_Menu);

        var h4 = $('<h4 class="modal-title" style="width: 90%;">' + options.caption + '</h4>');

        divHeader.append(h4);
        divHeader.append(div);
        divContent.append(divHeader);

        var divSum = $('<div class="form-inline" style="padding:10px">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h4 = $('<h4>مجموع : </h4> <h4 id="' + options.id + '_LSum" style="padding-right:5px">0</h4>');
        div.append(h4);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h4 = $('<h4>تعداد : </h4> <h4 id="' + options.id + '_LCount" style="padding-right:5px">0</h4>');
        div.append(h4);
        divSum.append(div);

        divContent.append(divSum);
        //End Header

        //Content
        var table = $('<table id="' + options.id + '_Table" class="table table-hover">');

        divContent.append(table);

        divCart.append(divContent);


        li_Setting.click(function (e) {
            $("#" + options.id + "_modal").modal('show');
        });
        li_Refresh.click(function (e) {
            obj._Refresh()
            obj._Button("Refresh", obj.options);
        });
        li_Close.click(function (e) {
            obj._Close()
            obj._Button("Close", obj.options);
        });


        grid.on('change', function (event, items) {
            var element = $("#" + options.id);
            options.position.x = parseInt($(element).attr("gs-x"));
            options.position.y = parseInt($(element).attr("gs-y"));
            options.position.w = parseInt($(element).attr("gs-w"));
            options.position.h = parseInt($(element).attr("gs-h"));
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.position = options.position;
        });

        itemData.caption = options.caption;
        itemData.baseValue = options.baseValue;

        options.o = divCart[0];
        grid.el.appendChild(divCart[0]);
        let w = grid.makeWidget(divCart[0], options.position.x, options.position.y, options.position.w, options.position.h);
        obj._GetData(options.valueControl.fromDate, options.valueControl.top);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');
        _rowBody = $('<div class="row" style="padding-top:20px">');

        _divBody1 = $('<div class="col-6" style="padding-top:20px">');
        _divBody2 = $('<div class="form-group form-float">');
        _divBody3 = $('<div class="form-line focused date fix">');
        _inputTop = $('<input type="text" class="form-control" id="' + options.id + '_top">');
        _lable = $('<label class="form-label active">تعداد رکورد</label>');

        _divBody3.append(_inputTop);
        _divBody3.append(_lable);
        _divBody2.append(_divBody3);
        _divBody1.append(_divBody2);
        _rowBody.append(_divBody1);


        _divBody1 = $('<div class="input-group col-6" style="padding-top:25px">');

        _divBtn1 = $('<div class="input-group-addon">');
        _span = $('<span class="input-group-btn">');
        _aTarikh = $('<a id="' + options.id + '_btn" data-mdpersiandatetimepicker="" data-original-title="" title="">');
        _imageTarikh = $('<img src="/Content/img/list/calendar.png" class="icon" height="20" width="20" title="انتخاب تاریخ">');

        _aTarikh.append(_imageTarikh);
        _span.append(_aTarikh);
        _divBtn1.append(_span);
        _divBody1.append(_divBtn1);

        _div1 = $('<div class="form-group form-float">');
        _div2 = $('<div class="form-line focused date fix">');
        _inputAzTarikh = $('<input id="' + options.id + '_date"  class="form-control date" type="text" maxlength="10">');
        _lable = $('<label class="form-label active">از تاریخ</label>');

        _div2.append(_inputAzTarikh);
        _div2.append(_lable);
        _div1.append(_div2);
        _divBody1.append(_div1);
        _rowBody.append(_divBody1);

        _body.append(_rowBody);


        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _inputTop.val(options.valueControl.top);

        _buttonSave.click(function (e) {
            var top = $("#" + options.id + "_top").val();
            obj.options.valueControl.top = top;

            var fromDate = $("#" + options.id + "_date").val().toEnglishDigit();
            obj.options.valueControl.fromDate = fromDate;

            obj._GetData(fromDate,top);
            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_date").val(options.valueControl.fromDate);
            $("#" + options.id + "_top").val(options.valueControl.top);
        })

        _aTarikh.MdPersianDateTimePicker({
            targetTextSelector: "#" + options.id +"_date",
            dateFormat: 'yyyy-MM-dd',
            Placement: 'bottom', // default is 'bottom'
            Trigger: 'focus', // default is 'focus',
            EnableTimePicker: true, // default is true,
            TargetSelector: '', // default is empty,
            GroupId: '', // default is empty,
            ToDate: false, // default is false,
            FromDate: false, // default is false,
            isGregorian: lang == 'en' ? true : false,
            englishNumber: lang == 'en' ? true : false,
        });
        //end script
    },

    _GetData: function (fromDate,top) {
        var obj = this;
        var options = obj.options;
        var ctrl = options.valueControl;
        var uri = server + '/api/ReportFct/TrzFCust/'; // آدرس گزارش 

        var tObject = {
            CGruCode: "",
            CustCode: "",
            InvCode: "",
            KGruCode: "",
            KalaCode: "",
            MkzCode: "",
            ModeCode1: ctrl.modeItem == "S" ? sessionStorage.MODECODE_FDOC_S : sessionStorage.MODECODE_FDOC_P ,
            ModeCode2: ctrl.modeItem == "S" ? sessionStorage.MODECODE_FDOC_SR : sessionStorage.MODECODE_FDOC_PR,
            OprCode: "",
            StatusCode: "موقت*تایید*تصویب",
            Top: top,
            ZeroValue: "0",
            azShomarh: "",
            azTarikh: fromDate,
            taShomarh: "",
            taTarikh: LowDay(0),
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, true).done(function (response) {
            sum = 0;
            $("#" + options.id + "_LCount").text(response.length);
            for (var i = 0; i < response.length; i++) {
                sum += response[i].AccMon
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum) + ' ریال' );
            obj._CreateTable(response);
            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });

    },

 


    _CreateTable: function (data) {
        var obj = this;
        var options = obj.options;
        var table = $("#" + options.id + "_Table");
        table.empty();
        var tbody = $('<tbody>');

        for (var i = 0; i < data.length; i++) {
            var tr = $('<tr>');
            var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconCustomer(data[i].CustCode) + '" width="35" /></center>')
            var tdCust = $('<td><h5 style="padding-right:5px">' + data[i].CustCode + ' - ' + data[i].CustName + '</h5></td>')
            var tdCustTel = $('<div class="form-inline" style="padding-top: 10px; padding-right: 5px;"><img src="/Content/img/ContactUs.png" width = "16" style = "margin-left: 5px;"><span>' + data[i].Tel + ' </span></div>');
            if (data[i].Tel != "") {
                tdCust.append(tdCustTel);
            }
            var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].AccMon) + '</h5></td>')
            tr.append(tdIcon);
            tr.append(tdCust);
            tr.append(tdValue);
            tbody.append(tr);
        }
        table.append(tbody);
    },
    _Refresh: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست " + options.caption + " به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                obj._GetData(options.valueControl.fromDate,options.valueControl.top);
            }
        })
    },

    _Close: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: "تایید بستن",
            text: translate("لیست " + options.caption + " بسته شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                for (var i = 0; i < dashbordData.length; i++) {
                    if (dashbordData[i].id == options.id) {
                        dashbordData.splice(i, 1);

                        grid.removeWidget(options.o);
                        break;
                    }
                }

            }
        })
    },

    _Button: function (name, item) {
        this._trigger(name, null, item);
    },

});


$.widget("ui.D_TarazFasli", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            mode: 0,
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
    },

    _create: function () {
        var obj = this;
        obj._createModal();
        var options = obj.options;
        var itemData = dashbordData.find(c => c.id == options.id);


        if (itemData == null) {
            itemData = { valueControl: options.valueControl, position: options.position };
        } else {
            options.valueControl = itemData.valueControl;
            options.position = itemData.position;
        }

        var divCart = $('<div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" style ="visibility:' + (options.visible == false ? 'hidden' : 'visible') + '" id="' + options.id + '"  gs-x="' + options.position.x + '" gs-y="' + options.position.y + '" gs-w="' + options.position.w + '" gs-h="' + options.position.h + '">');
        var divContent = $('<div class="grid-stack-item-content" style="background-color:white">');

        //Header
        var divHeader = $('<div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;">');
        var div = $('<div>');
        var li_Setting = $('<li><a><img src="/Content/img/streamline-icon-cog-1@48x48.png" width="20" height="20"><span> تنظیمات </span></a></li>');
        var li_Refresh = $('<li><a><img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20"><span> بروز رسانی </span></a></li>');
        var li_Line = $('<li class="divider"></li>');
        var li_Close = $('<li><a href="#">بستن</a></li>');

        var b_Menu = $('<button class="dropdown dropdown-toggle" data-toggle="dropdown" style="border: none;background-color: white;height: 24px;"><span class="caret"></span>');
        var ui_Menu = $('<ul class="dropdown-menu dropdown-menu-dashbord">');
        ui_Menu.append(li_Refresh);
        ui_Menu.append(li_Setting);
        ui_Menu.append(li_Line);
        ui_Menu.append(li_Close);

        b_Menu.append(ui_Menu);

        div.append(b_Menu);

        var h4 = $('<h4 class="modal-title" style="width: 90%;">' + options.caption + '</h4>');

        divHeader.append(h4);
        divHeader.append(div);
        divContent.append(divHeader);

        //End Header

        //Content

        var divSum = $('<div style="padding:10px">');
        
        h4 = $('<h4 style="padding-right:5px">0</h4>');
        h6 = $('<h6 style="padding-right:5px;padding-top:15px;color:#dcdcdc">0</h6>');
        divSum.append(h4);
        divSum.append(h6);
        divContent.append(divSum);
        
        var chart = $('<canvas id="' + options.id + '_Chart" style="width:100%;max-width:700px"></canvas>');
        divContent.append(chart);

        divCart.append(divContent);


        li_Setting.click(function (e) {
            $("#" + options.id + "_modal").modal('show');
        });
        li_Refresh.click(function (e) {
            obj._Refresh()
            obj._Button("Refresh", obj.options);
        });
        li_Close.click(function (e) {
            obj._Close()
            obj._Button("Close", obj.options);
        });


        grid.on('change', function (event, items) {
            var element = $("#" + options.id);
            options.position.x = parseInt($(element).attr("gs-x"));
            options.position.y = parseInt($(element).attr("gs-y"));
            options.position.w = parseInt($(element).attr("gs-w"));
            options.position.h = parseInt($(element).attr("gs-h"));
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.position = options.position;
        });

        itemData.caption = options.caption;
        itemData.baseValue = options.baseValue;

        options.o = divCart[0];
        grid.el.appendChild(divCart[0]);
        let w = grid.makeWidget(divCart[0], options.position.x, options.position.y, options.position.w, options.position.h);
        obj._GetData(options.valueControl.mode);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');
        _rowBody = $('<div class="row" style="padding-top:20px">');

        _divBody1 = $('<div class="col-6" style="padding-top:20px">');
        _divBody2 = $('<div class="form-group form-float">');
        _divBody3 = $('<div class="form-line focused date fix">');
        _inputTop = $('<input type="text" class="form-control" id="' + options.id + '_top">');
        _lable = $('<label class="form-label active">تعداد رکورد</label>');

        _divBody3.append(_inputTop);
        _divBody3.append(_lable);
        _divBody2.append(_divBody3);
        _divBody1.append(_divBody2);
        _rowBody.append(_divBody1);


        _divBody1 = $('<div class="input-group col-6" style="padding-top:25px">');

        _divBtn1 = $('<div class="input-group-addon">');
        _span = $('<span class="input-group-btn">');
        _aTarikh = $('<a id="' + options.id + '_btn" data-mdpersiandatetimepicker="" data-original-title="" title="">');
        _imageTarikh = $('<img src="/Content/img/list/calendar.png" class="icon" height="20" width="20" title="انتخاب تاریخ">');

        _aTarikh.append(_imageTarikh);
        _span.append(_aTarikh);
        _divBtn1.append(_span);
        _divBody1.append(_divBtn1);

        _div1 = $('<div class="form-group form-float">');
        _div2 = $('<div class="form-line focused date fix">');
        _inputAzTarikh = $('<input id="' + options.id + '_date"  class="form-control date" type="text" maxlength="10">');
        _lable = $('<label class="form-label active">از تاریخ</label>');

        _div2.append(_inputAzTarikh);
        _div2.append(_lable);
        _div1.append(_div2);
        _divBody1.append(_div1);
        _rowBody.append(_divBody1);

        _body.append(_rowBody);


        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _inputTop.val(options.valueControl.top);

        _buttonSave.click(function (e) {
            var mode = $("#" + options.id + "_mode").val();
            obj.options.valueControl.mode = mode;

            obj._GetData(mode);
            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_mode").val(options.valueControl.mode);
        })

        _aTarikh.MdPersianDateTimePicker({
            targetTextSelector: "#" + options.id + "_date",
            dateFormat: 'yyyy-MM-dd',
            Placement: 'bottom', // default is 'bottom'
            Trigger: 'focus', // default is 'focus',
            EnableTimePicker: true, // default is true,
            TargetSelector: '', // default is empty,
            GroupId: '', // default is empty,
            ToDate: false, // default is false,
            FromDate: false, // default is false,
            isGregorian: lang == 'en' ? true : false,
            englishNumber: lang == 'en' ? true : false,
        });
        //end script
    },

    _GetData: function (mode) {
        var obj = this;
        var options = obj.options;
        var ctrl = options.valueControl;
        var uri = server + '/api/ReportFct/TrzFDoreh/'; // آدرس گزارش 

        var tObject = {
            azTarikh: "",
            taTarikh: "",
            mode: mode,
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, true).done(function (response) {
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].AccMon
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum) + ' ریال');
            obj._CreateTable(response);
            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });

    },




    _CreateTable: function (data) {
        var obj = this;
        var options = obj.options;
        var table = $("#" + options.id + "_Table");
        table.empty();
        var tbody = $('<tbody>');

        for (var i = 0; i < data.length; i++) {
            var tr = $('<tr>');
            var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconCustomer(data[i].CustCode) + '" width="35" /></center>')
            var tdCust = $('<td><h5 style="padding-right:5px">' + data[i].CustCode + ' - ' + data[i].CustName + '</h5></td>')
            var tdCustTel = $('<div class="form-inline" style="padding-top: 10px; padding-right: 5px;"><img src="/Content/img/ContactUs.png" width = "16" style = "margin-left: 5px;"><span>' + data[i].Tel + ' </span></div>');
            if (data[i].Tel != "") {
                tdCust.append(tdCustTel);
            }
            var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].AccMon) + '</h5></td>')
            tr.append(tdIcon);
            tr.append(tdCust);
            tr.append(tdValue);
            tbody.append(tr);
        }
        table.append(tbody);
    },
    _Refresh: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست " + options.caption + " به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                obj._GetData(options.valueControl.mode);
            }
        })
    },

    _Close: function () {
        var obj = this;
        var options = obj.options;
        Swal.fire({
            title: "تایید بستن",
            text: translate("لیست " + options.caption + " بسته شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                for (var i = 0; i < dashbordData.length; i++) {
                    if (dashbordData[i].id == options.id) {
                        dashbordData.splice(i, 1);
                        grid.removeWidget(options.o);
                        break;
                    }
                }

            }
        })
    },

    _Button: function (name, item) {
        this._trigger(name, null, item);
    },

});



