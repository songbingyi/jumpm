function QueryString(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}
function setCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间 
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expiresHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}
function isPhone() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {
        return false;
    }
}
function isTiebsUrl() {
    if (QueryString("from") == "baidu") {
        return true;
    }
    var href = location.href;
    if (href.toLowerCase().substr(0, 7) == "http://") {
        if (href.toLowerCase().substr(0, 13) == "http://tieba.") {
            return true;
        }
    } else if (href.toLowerCase().substr(0, 6) == "tieba.") {
        return true;
    }
    return false;
}
if (QueryString("view") == "pcever") {
    setCookie("pcever", "yes", 10000);
}
if (isPhone() && QueryString("view") != "pc" && getCookie("pcever") != "yes") {
    var jurl = "";
    if (typeof (jumpm_url) == "undefined") {
        if (isTiebsUrl()) {
            jurl = location.href.replace("tieba.", "m.");
        } else {
            jurl = location.href.replace("http://", "http://m.");
        }
    } else {
        jurl = jumpm_url;
        if (QueryString("from") == "tbmobile") {
            if (jurl.indexOf("?") > -1) {
                jurl += "&from=tbmobile";
            } else {
                jurl += "?from=tbmobile";
            }
        }
        if (QueryString("return_url") != "") {
            if (jurl.indexOf("?") > -1) {
                jurl += "&return_url=" + QueryString("return_url");
            } else {
                jurl += "?return_url=" + QueryString("return_url");
            }
        }
    }
    if (isTiebsUrl()) {
        jurl = jurl.replace("m.", "tieba.m.");
    }

    location.href = jurl;
}