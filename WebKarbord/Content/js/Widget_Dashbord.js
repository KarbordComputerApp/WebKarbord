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
        data: null
    },


    _create: function () {
        var obj = this;
        obj._createModal();
        var options = obj.options;

        if (dashbordData[options.id] == null) {
            dashbordData[options.id] = { valueControl: options.valueControl, position: options.position };
        } else {
            options.valueControl = dashbordData[options.id].valueControl;
            options.position = dashbordData[options.id].position;
        }

        //dashbordData[options.id].position = options.position;
        //dashbordData[options.id] = {};


        var divCart = $('<div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" style ="visibility:' + (options.visible == false ? 'hidden' : 'visible' ) + '" id="' + options.id + '"  gs-x="' + options.position.x + '" gs-y="' + options.position.y + '" gs-w="' + options.position.w + '" gs-h="' + options.position.h + '">');
        var divContent = $('<div class="grid-stack-item-content" style="background-color:white">');

        //Header
        var divHeader = $('<div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;">');
        var div = $('<div>');

        var b_Setting = $('<a><img src = "/Content/img/streamline-icon-cog-1@48x48.png" width = "20" height = "20"> </a>');
        var b_Refresh = $('<a><img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20"> </a>');

        div.append(b_Setting);
        div.append(b_Refresh);

        var h4 = $('<h4 class="modal-title">' + options.caption + '</h4>');

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


        b_Setting.click(function (e) {
            $("#" + options.id + "_modal").modal('show');
        });
        b_Refresh.click(function (e) {
            obj._Refresh()
            obj._Button("Refresh", obj.options);
        });


        grid.on('change', function (event, items) {
            var element = $("#" + options.id);
            options.position.x = parseInt($(element).attr("gs-x"));
            options.position.y = parseInt($(element).attr("gs-y"));
            options.position.w = parseInt($(element).attr("gs-w"));
            options.position.h = parseInt($(element).attr("gs-h"));
            dashbordData[options.id].position = options.position;
        });

        dashbordData[options.id].caption = options.caption;
        dashbordData[options.id].baseValue = options.baseValue;
        grid.el.appendChild(divCart[0]);
        let w = grid.makeWidget(divCart[0], 0, 0, 4, 3);
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
        title = $('<p class="modal-title" >' + options.caption + '</p>');
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
        var TChkUri = server + '/api/ReportAcc/TChk/'; // آدرس گزارش 

        var TChkObject = {
            azTarikh: LowDay(day),
            taTarikh: "",
            azShomarh: "",
            taShomarh: "",
            AccCode: "",
            PDMode: "1",
            CheckStatus: "1",
        };
        ajaxFunction(TChkUri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', TChkObject, true).done(function (response) {
            $("#" + options.id + "_LCount").text(response.length);
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].Value
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum));
            obj._CreateTable(response);
            options.data = response;
            dashbordData[options.id].valueControl = options.valueControl;
            //dashbordData[options.id].data = response;
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

    _Button: function (name, item) {
        this._trigger(name, null, item);
    },

});