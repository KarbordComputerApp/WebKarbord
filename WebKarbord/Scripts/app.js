$("input.int").keydown(function (e) {
    if (e.ctrlKey) {
        // CTRL + INS
        if (!((e.keyCode == 45) ||
            // CTRL + C
            (e.keyCode == 67) ||
            // CTRL + V
            (e.keyCode == 86))) {

            e.preventDefault();
        }

    }
    else {
        if (e.shiftKey) {
            // SHIFT + TAB
            if (!((e.keyCode == 9) ||
                // SHIFT + LEFT ARROW KEY
                (e.keyCode == 37) ||
                // SHIFT + RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // SHIFT + INS
                (e.keyCode == 45))) {
                e.preventDefault();
            }
        }

        else {
            // BACKSPACE
            if (!((e.keyCode == 8) ||
                // TAB
                (e.keyCode == 9) ||
                // LEFT ARROW KEY
                (e.keyCode == 37) ||
                // RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // DELETE
                (e.keyCode == 46) ||
                // NUMBER KEYS
                ((e.keyCode >= 48) && (e.keyCode <= 57)) ||
                // NUMLOCK KEYS
                ((e.keyCode >= 96) && (e.keyCode <= 105)))) {
                e.preventDefault();
            }
        }
    }
});


$("input.intandline").keydown(function (e) {
    if (e.ctrlKey) {
        // CTRL + INS
        if (!((e.keyCode == 45) ||
            // CTRL + C
            (e.keyCode == 67) ||
            // CTRL + V
            (e.keyCode == 86))) {

            e.preventDefault();
        }

    }
    else {
        if (e.shiftKey) {
            // SHIFT + TAB
            if (!((e.keyCode == 9) ||
                // SHIFT + LEFT ARROW KEY
                (e.keyCode == 37) ||
                // SHIFT + RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // SHIFT + INS
                (e.keyCode == 45))) {
                e.preventDefault();
            }
        }

        else {
            // BACKSPACE
            if (!((e.keyCode == 8) ||
                // TAB
                (e.keyCode == 9) ||
                // LEFT ARROW KEY
                (e.keyCode == 37) ||
                // RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // DELETE
                (e.keyCode == 46) ||
                // NUMBER KEYS
                ((e.keyCode >= 48) && (e.keyCode <= 57) || (e.keyCode == 189) ) ||
                // NUMLOCK KEYS
                ( (e.keyCode >= 96) && (e.keyCode <= 105) || (e.keyCode == 109) ))) {
                e.preventDefault();
            }
        }
    }
});


$(".NumberString").keyup(function () {
    var Num = this.value;
    Num += '';
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('/');
    x1 = x[0];
    x2 = x.length > 1 ? '/' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    //return x1 + x2;
    this.value = x1 + x2;
});

function NumberToNumberString(num) {
    num += '';
    // Num = Num.replace('//', '.');
    num = num.replace(',', ''); num = num.replace(',', ''); num = num.replace(',', '');
    num = num.replace(',', ''); num = num.replace(',', ''); num = num.replace(',', '');
    x = num.split('.');
    x.length == 1 ? x = num.split('/') : x = num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '/' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}


$("input.float").keyup(function (e) {
    this.value = NumberToNumberString(this.value);
});

$("input.float").keydown(function (e) {
    if (e.ctrlKey) {
        // CTRL + INS
        if (!((e.keyCode == 45) ||
            // CTRL + C
            (e.keyCode == 67) ||
            // CTRL + V
            (e.keyCode == 86))) {

            e.preventDefault();
        }
    }
    else {
        if (e.shiftKey) {
            // SHIFT + TAB
            if (!((e.keyCode == 9) ||
                // SHIFT + LEFT ARROW KEY
                (e.keyCode == 37) ||
                // SHIFT + RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // SHIFT + INS
                (e.keyCode == 45))) {
                e.preventDefault();
            }
        }
        else {
            // BACKSPACE
            if (!((e.keyCode == 8) ||
                // TAB
                (e.keyCode == 9) ||
                // LEFT ARROW KEY
                (e.keyCode == 37) ||
                // RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // DELETE
                (e.keyCode == 46) ||

                //(e.keyCode == 110) ||
                // NUMBER KEYS
                ((e.keyCode >= 48) && (e.keyCode <= 57)) ||
                // NUMLOCK KEYS
                ((e.keyCode >= 96) && (e.keyCode <= 105)))) {
                e.preventDefault();
            }
        }
    }
    if (e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 111 || e.keyCode == 191) {
        this.value = this.value + String.fromCharCode(47);
    }
    //this.value = Comma(this.value);
});


$("input.string").keypress(function (e) {
    var key = e.charCode || e.keyCode || 0;
    if (key == 39)
        e.preventDefault();
});

$("textarea.string").keypress(function (e) {
    var key = e.charCode || e.keyCode || 0;
    if (key == 39)
        e.preventDefault();
});


$("input.date").keydown(function (e) {
    if (e.ctrlKey) {
        // CTRL + INS
        if (!((e.keyCode == 45) ||
            // CTRL + C
            (e.keyCode == 67) ||
            // CTRL + V
            (e.keyCode == 86))) {

            e.preventDefault();
        }
    }
    else {
        if (e.shiftKey) {
            // SHIFT + TAB
            if (!((e.keyCode == 9) ||
                // SHIFT + LEFT ARROW KEY
                (e.keyCode == 37) ||
                // SHIFT + RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // SHIFT + INS
                (e.keyCode == 45))) {
                e.preventDefault();
            }
        }
        else {
            // BACKSPACE
            if (!((e.keyCode == 8) ||
                // TAB
                (e.keyCode == 9) ||
                // LEFT ARROW KEY
                (e.keyCode == 37) ||
                // RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // DELETE
                (e.keyCode == 46) ||
                //  /
                (e.keyCode == 111 || e.keyCode == 191) ||
                // NUMBER KEYS
                ((e.keyCode >= 48) && (e.keyCode <= 57)) ||
                // NUMLOCK KEYS
                ((e.keyCode >= 96) && (e.keyCode <= 105)))) {
                e.preventDefault();
            }
        }
    }
});

$("input.date").keydown(function (e) {
    if (e.ctrlKey) {
        // CTRL + INS
        if (!((e.keyCode == 45) ||
            // CTRL + C
            (e.keyCode == 67) ||
            // CTRL + V
            (e.keyCode == 86))) {

            e.preventDefault();
        }
    }
    else {
        if (e.shiftKey) {
            // SHIFT + TAB
            if (!((e.keyCode == 9) ||
                // SHIFT + LEFT ARROW KEY
                (e.keyCode == 37) ||
                // SHIFT + RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // SHIFT + INS
                (e.keyCode == 45))) {
                e.preventDefault();
            }
        }
        else {
            // BACKSPACE
            if (!((e.keyCode == 8) ||
                // TAB
                (e.keyCode == 9) ||
                // LEFT ARROW KEY
                (e.keyCode == 37) ||
                // RIGHT ARROW KEY
                (e.keyCode == 39) ||
                // DELETE
                (e.keyCode == 46) ||
                //  /
                (e.keyCode == 111 || e.keyCode == 191) ||
                // NUMBER KEYS
                ((e.keyCode >= 48) && (e.keyCode <= 57)) ||
                // NUMLOCK KEYS
                ((e.keyCode >= 96) && (e.keyCode <= 105)))) {
                e.preventDefault();
            }
        }
    }
});

$('input.login').keypress(function (e) {
    if (e.keyCode == 0 || e.keyCode == 32) // `0` works in mozilla and `32` in other browsers
        e.preventDefault();
});

$('input.digits').keyup(function (event) {
    if (event.which >= 37 && event.which <= 40) {
        event.preventDefault();
    }
    var $this = $(this);
    var num = $this.val().replace(/,/g, '');
    $this.val(num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
});

$('.pdate').on('keypress', function (e) {
    var ch = String.fromCharCode(e.keyCode);
    $("div").text(e.keyCode)
    if (!((ch >= '0' && ch <= '9') ||
        ch == '/' || ch == ',' || ch == '-')) {
        return false;
    }
    if (ch == ',' || ch == '-') {
        var val = $(this).val();
        var s = this.selectionStart;
        val = val.slice(0, s) + "/" + val.slice(s, val.length);
        $(this).val(val)
        this.selectionStart = s + 1;
        this.selectionEnd = s + 1;
        return false;
    }
});

String.prototype.toEnglishDigit = function () {
    var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

function SlashToDot(num) {
    var a = num.replace(/,/g, '');
    return a.replace('/', '.');
}

function DotToSlash(num) {
    // var a = num;//.replace('.', '/');
    return num.replace('.', '/');
}
