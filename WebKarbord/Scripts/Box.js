var ViewModel = function () {
    var self = this;
   
    self.BoxList = ko.observableArray([]); // لیست اعلامیه ها  


    var BoxUri = serverAccount + 'Account/Box/'; // آدرس اعلامیه ها
    var DownloadUri = serverAccount + 'FileUpload/DownloadFile/'; // دانلود 
    var AddBoxUri = serverAccount + 'Account/InsertBox/'; // افزودن اعلامیه 
    var UploadUri = serverAccount + 'FileUpload/UploadFile/'; // افزودن اعلامیه 
    var DeleteFileUri = serverAccount + 'FileUpload/DeleteFile/'; // حذف پیوست اعلامیه 
    var DeleteBoxUri = serverAccount + 'Account/DeleteBox/'; // حذف  اعلامیه 


    getBoxList()
    //Get Box List
    function getBoxList() {
        var BoxObject = {
            LockNumber: lockNumber,
            Mode: $("#BoxMode").val(),
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(BoxUri, 'POST', BoxObject).done(function (data) {
            self.BoxList(data);
        });
    }


    $("#BoxMode").change(function () {
        getBoxList();
    });


    function getBoxAttach(fileName) {
        ajaxFunction(DownloadUri + lockNumber + '/' + fileName, 'GET').done(function (data) {
            a = data;
        });
    }




    self.currentPageIndexBox = ko.observable(0);
    self.currentPageBox = ko.observable();
    pageSizeBox = localStorage.getItem('pageSizeBox') == null ? 10 : localStorage.getItem('pageSizeBox');
    self.sortType = "ascending";
    self.currentColumn = ko.observable("");

    self.pageSizeBox = ko.observable(pageSizeBox);
    self.filterBox0 = ko.observable("");
    self.filterBox1 = ko.observable("");
    self.filterBox2 = ko.observable("");

    self.filterBoxList = ko.computed(function () {

        self.currentPageIndexBox(0);
        var filter0 = self.filterBox0();
        var filter1 = self.filterBox1();
        var filter2 = self.filterBox2();

        if (!filter0 && !filter1 && !filter2) {
            return self.BoxList();
        } else {
            tempData = ko.utils.arrayFilter(self.BoxList(), function (item) {
                result =
                    (item.date == null ? '' : item.date.toString().search(filter0) >= 0) &&
                    (item.title == null ? '' : item.title.toString().search(filter1) >= 0) &&
                    (item.body == null ? '' : item.body.toString().search(filter2) >= 0)
                return result;
            })
            return tempData;
        }
    });



    self.currentPageBox = ko.computed(function () {
        var pageSizeBox = parseInt(self.pageSizeBox(), 10),
            startIndex = pageSizeBox * self.currentPageIndexBox(),
            endIndex = startIndex + pageSizeBox;
        localStorage.setItem('pageSizeBox', pageSizeBox);
        return self.filterBoxList().slice(startIndex, endIndex);
    });

    self.nextPageBox = function () {
        if (((self.currentPageIndexBox() + 1) * self.pageSizeBox()) < self.filterBoxList().length) {
            self.currentPageIndexBox(self.currentPageIndexBox() + 1);
        }
        //else {
        //    self.currentPageIndexBox(0);
        //}
    };

    self.previousPageBox = function () {
        if (self.currentPageIndexBox() > 0) {
            self.currentPageIndexBox(self.currentPageIndexBox() - 1);
        }
    };

    self.firstPageBox = function () {
        self.currentPageIndexBox(0);
    };


    self.lastPageBox = function () {
        countBox = parseInt(self.filterBoxList().length / self.pageSizeBox(), 10);
        if ((self.filterBoxList().length % self.pageSizeBox()) == 0)
            self.currentPageIndexBox(countBox - 1);
        else
            self.currentPageIndexBox(countBox);
    };


    self.iconTypemode = ko.observable("");
    self.iconTypedate = ko.observable("");
    self.iconTypetitle = ko.observable("");
    self.iconTypebody = ko.observable("");


    self.sortTableBox = function (viewModel, e) {
        var orderProp = $(e.target).attr("data-column")
        if (orderProp == null)
            return null
        self.currentColumn(orderProp);
        self.BoxList.sort(function (left, right) {

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

        self.iconTypemode('');
        self.iconTypedate('');
        self.iconTypetitle('');
        self.iconTypebody('');
        if (orderProp == 'mode') self.iconTypemode((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'date') self.iconTypedate((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'title') self.iconTypetitle((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
        if (orderProp == 'body') self.iconTypebody((self.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");

    };

    $('#refreshBox').click(function () {
        Swal.fire({
            title: mes_Refresh,
            text: translate("لیست اعلامیه ها") + " " + translate("به روز رسانی شود ؟"),
            type: 'info',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                getBoxList();
            }
        })
    })


    self.radif = function (index) {
        countShow = self.pageSizeBox();
        page = self.currentPageIndexBox();
        calc = (countShow * page) + 1;
        return index + calc;
    }


    self.ViewBox = function (item) {
        $('#titleBox').val(item.title);
        $('#bodyBox').val(item.body);

        /* if (item.mode == 2) { // دریافتی
             $('#panel_Action').attr('hidden', '');
         }
         else {
             $('#panel_Action').removeAttr('hidden', '');
         }*/
        $('#panel_Action').attr('hidden', '');
        $('#modal-Box').modal('show');
    }


    self.DeleteBox = function (item) {
        Swal.fire({
            title: 'تایید حذف',
            text: translate("آیا اعلامیه انتخابی حذف شود ؟"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,

            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                if (item.namefile != '') {
                    ajaxFunction(DeleteFileUri + '/' + lockNumber + '/' + item.namefile, 'GET', true).done(function (data) {
                    });
                }

                ajaxFunction(DeleteBoxUri + '/' + lockNumber + '/' + item.id, 'GET', true).done(function (data) {
                    getBoxList();
                    showNotification('اعلامیه حذف شد', 1);
                });
            }

        })

    }





    $('#AddNewBox').click(function () {
        $('#titleBox').val('');
        $('#bodyBox').val('');
        $('#upload').val('');
        $('#panel_Action').removeAttr('hidden', '');
        $('#modal-Box').modal('show');

    })


    self.ViewBoxAttach = function (item) {

        addr = DownloadUri + lockNumber + '/' + item.namefile;
        window.location.href = addr;

        //getBoxAttach(item.namefile);
    }



    this.fileUpload = function (data, e) {
        a = 1;
    };



    $('#saveBox').click(function () {

        title = $("#titleBox").val();
        body = $("#bodyBox").val();

        var file = document.getElementById("upload");
        fileFullName = '';
        if (file.files.length > 0) {
            fileFullName = file.files[0].name;
            fileData = fileFullName.split(".");
            fileName = fileData[0];
            fileType = '.' + fileData[1];

            if (fileData[1] == 'exe') {
                return showNotification(translate('ابتدا فایل را فشرده کنید سپس ارسال کنید'), 2);
            }

            var formData = new FormData();
            formData.append('fileName', $('#upload')[0].files[0]);

            ajaxFunctionUpload(UploadUri + '/' + lockNumber, formData, false).done(function (data) {
                fileFullName = data;
            });
        }




        var InsertBoxObject = {
            Mode: 1,
            LockNumber: lockNumber,
            Date: DateNow,
            Title: title,
            Body: body,
            NameFile: fileFullName,
            UserCode: sessionStorage.userName,
        }
        ajaxFunction(AddBoxUri, 'POST', InsertBoxObject).done(function (data) {
            $('#modal-Box').modal('hide');
            getBoxList();
            showNotification('اعلامیه ارسال شد', 1);
        });


    });
};

ko.applyBindings(new ViewModel());

