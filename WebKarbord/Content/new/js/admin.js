"use strict";
$(function () {
    $.MyAdmin.browser.activate();
    $.MyAdmin.leftSideBar.activate();
    $.MyAdmin.rightSideBar.activate();
    $.MyAdmin.navbar.activate();
    $.MyAdmin.input.activate();
    //$.MyAdmin.select.activate();
    $.MyAdmin.tooltip.activate();
    $.MyAdmin.titleSparkline.activate();
    skinChanger();
    activateNotificationAndTasksScroll();
    setSkinListHeightAndScroll(true);
    setSettingListHeightAndScroll(true);
    $(window).resize(function () {
        setSkinListHeightAndScroll(false);
        setSettingListHeightAndScroll(false);
    });
    callFullScreen();

    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);

});

if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

$.MyAdmin = {}, $.MyAdmin.options = {
    leftSideBar: {
        scrollColor: "rgba(0,0,0,0.5)",
        scrollWidth: "4px",
        scrollAlwaysVisible: !1,
        scrollBorderRadius: "0",
        scrollRailBorderRadius: "0",
        scrollActiveItemWhenPageLoad: !0,
        breakpointWidth: 1170
    },
    dropdownMenu: {
        effectIn: "pullDown",
        effectOut: "fadeOut"
    }
}, $.MyAdmin.tooltip = {
    activate: function () {
        $('[data-toggle="tooltip"]').tooltip({
            placement: "top"
        })
    }
}, $.MyAdmin.titleSparkline = {
    activate: function () {
        $(".chart.header-bar").sparkline([6, 8, 6, 8, 10, 5, 6, 7, 9, 7], {
            type: "bar",
            barColor: "#f17312",
            negBarColor: "#fff",
            barWidth: "4px",
            height: "40px"
        }), $(".chart.header-bar2").sparkline([6, 8, 6, 8, 10, 3, 6, 7, 9, 7], {
            type: "bar",
            barColor: "#1399f2",
            negBarColor: "#fff",
            barWidth: "4px",
            height: "40px"
        }), $(".chart.header-line").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9], {
            type: "line",
            lineColor: "#46B2A8",
            fillColor: "#badddc",
            height: "40px"
        })
    }
}, $.MyAdmin.leftSideBar = {
    activate: function () {
        var e = this,
            t = $("body"),
            o = $(".overlay");
        $(window).on("click", function (a) {
            var s = $(a.target);
            "i" === a.target.nodeName.toLowerCase() && (s = $(a.target).parent()), !s.hasClass("bars") && e.isOpen() && 0 === s.parents("#leftsidebar").length && (s.hasClass("js-right-sidebar") || o.fadeOut(), t.removeClass("overlay-open"))
        }), $.each($(".menu-toggle.toggled"), function (e, t) {
            $(t).next().slideToggle(0)
        }), $.each($(".menu .list li.active"), function (e, t) {
            var o = $(t).find("a:eq(0)");
            o.addClass("toggled"), o.next().show()
        }), $(".menu-toggle").on("click", function (e) {
            var t = $(this),
                o = t.next();
            if ($(t.parents("ul")[0]).hasClass("list")) {
                var a = $(e.target).hasClass("menu-toggle") ? e.target : $(e.target).parents(".menu-toggle");
                $.each($(".menu-toggle.toggled").not(a).next(), function (e, t) {
                    $(t).is(":visible") && ($(t).prev().toggleClass("toggled"), $(t).slideUp())
                })
            }
            t.toggleClass("toggled"), o.slideToggle(320)
        }), e.setMenuHeight(), e.checkStatuForResize(!0), $(window).resize(function () {
            e.setMenuHeight(), e.checkStatuForResize(!1)
        }), Waves.attach(".menu .list a", ["waves-block"]), Waves.init()
    },
    setMenuHeight: function (e) {
        if (void 0 !== $.fn.slimScroll) {
            var t = $.MyAdmin.options.leftSideBar,
                o = $(window).height() - $(".navbar").innerHeight(),
                a = $(".list");
            if (a.slimscroll({
                height: o + "px",
                color: t.scrollColor,
                size: t.scrollWidth,
                alwaysVisible: t.scrollAlwaysVisible,
                borderRadius: t.scrollBorderRadius,
                railBorderRadius: t.scrollRailBorderRadius
            }), $.MyAdmin.options.leftSideBar.scrollActiveItemWhenPageLoad) {
                var s = $(".menu .list li.active")[0].offsetTop;
                s > 150 && a.slimscroll({
                    scrollTo: s + "px"
                })
            }
        }
    },
    checkStatuForResize: function (e) {
        var t = $("body"),
            o = $(".navbar .navbar-header .bars"),
            a = t.width();
        e && t.find(".content, .sidebar").addClass("no-animate").delay(1e3).queue(function () {
            $(this).removeClass("no-animate").dequeue()
        }), a < $.MyAdmin.options.leftSideBar.breakpointWidth ? (t.addClass("ls-closed"), o.fadeIn()) : (t.removeClass("ls-closed"), o.fadeOut())
    },
    isOpen: function () {
        return $("body").hasClass("overlay-open")
    }
}, $(".sidemenu-collapse").on("click", function () {
    var e = $("body");
    e.hasClass("side-closed") ? (e.removeClass("side-closed"), e.removeClass("submenu-closed")) : (e.addClass("side-closed"), e.addClass("submenu-closed"))
}), $(".content, .navbar").mouseenter(function () {
    var e = $("body");
    e.removeClass("side-closed-hover"), e.addClass("submenu-closed")
}), $(".sidebar").mouseenter(function () {
    var e = $("body");
    e.addClass("side-closed-hover"), e.removeClass("submenu-closed")
}), localStorage.getItem("sidebar_option") && jQuery("body").addClass(localStorage.getItem("sidebar_option")), $("body").hasClass("side-closed") ? $(".sidebar-user-panel").css({
    display: "none"
}) : $(".sidebar-user-panel").css({
    display: "block"
}), jQuery(document).on("click", ".sidemenu-collapse", function () {
    var e = "";
    if ($("body").hasClass("side-closed")) {
        e = "side-closed submenu-closed";
        $(".sidebar-user-panel").css({
            display: "none"
        })
    } else $(".sidebar-user-panel").css({
        display: "block"
    });
    jQuery("body").addClass(e), localStorage.setItem("sidebar_option", e)
}), $.MyAdmin.rightSideBar = {
    activate: function () {
        var e = this,
            t = $("#rightsidebar"),
            o = $(".overlay");
        $(window).on("click", function (a) {
            var s = $(a.target);
            "i" === a.target.nodeName.toLowerCase() && (s = $(a.target).parent()), !s.hasClass("js-right-sidebar") && e.isOpen() && 0 === s.parents("#rightsidebar").length && (s.hasClass("bars") || o.fadeOut(), t.removeClass("open"))
        }), $(".js-right-sidebar").on("click", function () {
            t.toggleClass("open"), e.isOpen() ? o.fadeIn() : o.fadeOut()
        })
    },
    isOpen: function () {
        return $(".right-sidebar").hasClass("open")
    }
}, $.MyAdmin.navbar = {
    activate: function () {
        var e = $("body"),
            t = $(".overlay");
        $(".bars").on("click", function () {
            e.toggleClass("overlay-open"), e.hasClass("overlay-open") ? t.fadeIn() : t.fadeOut()
        }), $('.nav [data-close="true"]').on("click", function () {
            var e = $(".navbar-toggle").is(":visible"),
                t = $(".navbar-collapse");
            e && t.slideUp(function () {
                t.removeClass("in").removeAttr("style")
            })
        })
    }
}, $.MyAdmin.input = {
    activate: function () {
        $(".form-control").focus(function () {
            $(this).parent().addClass("focused")
        }), $(".form-control").focusout(function () {
            var e = $(this);
            e.parents(".form-group").hasClass("form-float") ? "" == e.val() && e.parents(".form-line").removeClass("focused") : e.parents(".form-line").removeClass("focused")
        }), $("body").on("click", ".form-float .form-line .form-label", function () {
            $(this).parent().find("input").focus()
        }), $(".form-control").each(function () {
            "" !== $(this).val() && $(this).parents(".form-line").addClass("focused")
        })
    }
}, $.MyAdmin.select = {
    activate: function () {
        $.fn.selectpicker && $("select:not(.ms)").selectpicker()
    }
};
var edge = "Microsoft Edge",
    ie10 = "Internet Explorer 10",
    ie11 = "Internet Explorer 11",
    opera = "Opera",
    firefox = "Mozilla Firefox",
    chrome = "Google Chrome",
    safari = "Safari";

function skinChanger() {
    $(".right-sidebar .demo-choose-skin li").on("click", function () {
        var e = $("body"),
            t = $(this),
            o = $(".right-sidebar .demo-choose-skin li.actived").data("theme");
        $(".right-sidebar .demo-choose-skin li").removeClass("actived"), e.removeClass("theme-" + o), t.addClass("actived"), e.addClass("theme-" + t.data("theme"));
        var a = "theme-" + t.data("theme");
        localStorage.setItem("choose_skin", a), localStorage.setItem("choose_skin_active", t.data("theme"))
    })
}

function callFullScreen() {
    $(document).on("click", ".fullscreen-btn", function (e) {
        document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    })
}

function setSkinListHeightAndScroll(e) {
    var t = $(window).height() - ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight()),
        o = $(".right-sidebar .demo-skin");
    e || (o.slimScroll({
        destroy: !0
    }).height("auto"), o.parent().find(".slimScrollBar, .slimScrollRail").remove()), o.slimscroll({
        height: t + "px",
        color: "rgba(0,0,0,0.5)",
        size: "6px",
        alwaysVisible: !1,
        borderRadius: "0",
        railBorderRadius: "0"
    })
}

function setSettingListHeightAndScroll(e) {
    var t = $(window).height() - ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight()),
        o = $(".right-sidebar .demo-settings");
    e || (o.slimScroll({
        destroy: !0
    }).height("auto"), o.parent().find(".slimScrollBar, .slimScrollRail").remove()), o.slimscroll({
        height: t + "px",
        color: "rgba(0,0,0,0.5)",
        size: "6px",
        alwaysVisible: !1,
        borderRadius: "0",
        railBorderRadius: "0"
    })
}

function activateNotificationAndTasksScroll() {
    $(".navbar-right .dropdown-menu .body .menu").slimscroll({
        height: "254px",
        color: "rgba(0,0,0,0.5)",
        size: "4px",
        alwaysVisible: !1,
        borderRadius: "0",
        railBorderRadius: "0"
    })
}
$.MyAdmin.browser = {
    activate: function () {
        "" !== this.getClassName() && $("html").addClass(this.getClassName())
    },
    getBrowser: function () {
        var e = navigator.userAgent.toLowerCase();
        return /edge/i.test(e) ? edge : /rv:11/i.test(e) ? ie11 : /msie 10/i.test(e) ? ie10 : /opr/i.test(e) ? opera : /chrome/i.test(e) ? chrome : /firefox/i.test(e) ? firefox : navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) ? safari : void 0
    },
    getClassName: function () {
        var e = this.getBrowser();
        return e === edge ? "edge" : e === ie11 ? "ie11" : e === ie10 ? "ie10" : e === opera ? "opera" : e === chrome ? "chrome" : e === firefox ? "firefox" : e === safari ? "safari" : ""
    }
}, $(".rightSetting .btn-sidebar-light").on("click", function () {
    $("body").removeClass("menu_dark logo-black"), $("body").addClass("logo-white");
    localStorage.setItem("choose_logoheader", "logo-white"), localStorage.setItem("menu_option", "")
}), $(".rightSetting .btn-sidebar-dark").on("click", function () {
    $("body").removeClass("logo-white"), $("body").addClass("menu_dark logo-black");
    localStorage.setItem("choose_logoheader", "logo-black"), localStorage.setItem("menu_option", "menu_dark")
}), $(".rightSetting .btn-theme-light").on("click", function () {
    $("body").removeClass("dark submenu-closed menu_dark logo-black"), $("body").addClass("light submenu-closed logo-white");
    localStorage.setItem("choose_logoheader", "logo-white"), localStorage.setItem("choose_skin", "theme-black"), localStorage.setItem("theme", "light"), localStorage.setItem("menu_option", "")
}), $(".rightSetting .btn-theme-dark").on("click", function () {
    $("body").removeClass("light submenu-closed logo-white"), $("body").addClass("dark submenu-closed menu_dark logo-black");
    localStorage.setItem("choose_logoheader", "logo-black"), localStorage.setItem("choose_skin", "theme-black"), localStorage.setItem("theme", "dark"), localStorage.setItem("menu_option", "menu_dark")
}), localStorage.getItem("theme") && ($("body").removeClass("dark light"), jQuery("body").addClass(localStorage.getItem("theme"))), localStorage.getItem("menu_option") && jQuery("body").addClass(localStorage.getItem("menu_option")), localStorage.getItem("choose_skin") ? jQuery("body").addClass(localStorage.getItem("choose_skin")) : jQuery("body").addClass("theme-red"), localStorage.getItem("choose_skin_active") && $(".right-sidebar .demo-choose-skin li").each(function (e) {
    jQuery(this).removeClass("actived"), jQuery(this).attr("data-theme") == localStorage.getItem("choose_skin_active") && jQuery(this).addClass("actived")
}), localStorage.getItem("choose_logoheader") ? jQuery("body").addClass(localStorage.getItem("choose_logoheader")) : jQuery("body").addClass("logo-white"), localStorage.getItem("choose_logoheader_active") && $(".right-sidebar .demo-choose-logoheader li").each(function (e) {
    jQuery(this).removeClass("actived"), jQuery(this).attr("data-theme") == localStorage.getItem("choose_logoheader_active") && jQuery(this).addClass("actived")
}), $(window).on("scroll", function () {
    $(window).scrollTop() > 50 ? $(".navbar").addClass("active") : $(".navbar").removeClass("active")
}), $(document).on("click", ".card .tools .t-collapse", function () {
    var e = $(this).parents(".card").children(".card-body");
    $(this).hasClass("fa-chevron-down") ? ($(this).removeClass("fa-chevron-down").addClass("fa-chevron-up"), e.slideUp(200)) : ($(this).removeClass("fa-chevron-up").addClass("fa-chevron-down"), e.slideDown(200))
}), $(document).on("click", ".card .tools .t-close", function () {
    $(this).parents(".card").parent().remove()
}), $(".box-refresh").on("click", function (e) {
    e.preventDefault(), $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>").appendTo($(this).parents(".tools").parents(".card-head").parents(".card")), setTimeout(function () {
        $(".refresh-block").remove()
    }, 1e3)
});