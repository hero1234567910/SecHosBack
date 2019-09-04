//打开Dialog
function OpenWin(url, width, height, title, callbackMethod, options) {
    top.OpenPanel(localhostPaht() + url, width, height, title, callbackMethod, options);
}
//模拟生成RouGuid
function NewGuid() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//根目录
function localhostPaht() {
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0, pos);
    return localhostPaht;
}
function getRootPath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
//将form表单转为json
(function ($) {
    $.fn.serializeJson = function (MyArray) {
        var serializeObj = {};
        var array = this.serializeArray();
        if (MyArray != undefined) {
            array = array.concat(MyArray);
        }
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);
//解决iefunction.bind 方法
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () { },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
function dateFormat(strdate, fmt, isDate) {
   
    if (strdate == null) {
        return "";
    }
    var date;
    if (typeof strdate == 'object') {
        date = strdate;
    }
    else if (isDate == undefined) {
        var dt = strdate.split(' ');
        date = new Date(strdate.replace(/-/g, "/"));
        if (date != "Invalid Date" && dt.length == 2) {
        } else {
            return strdate;
        }
    } else {
        date = strdate;
    }

    if (fmt == undefined) {
        fmt = "yyyy-MM-dd";
    }

    /* 模板参数校验，正则验证方法 */
    var verify = function (Rex) {
        var arr = new RegExp(Rex).exec(fmt); // 获得匹配结果数组
        if (!arr) // 匹配失败返回
            return "";
        return arr[0];
    };
    /**
    * 提供月、天、时、分、秒通用匹配替换
    * @param {对象o属性key} r
    * @param {r对应正则对象} rex
    **/
    var common = function (r, rex) {
        len == 2 ? fmt = fmt.replace(rex, o[r].length == 1 ? "0" + o[r] : o[r]) : fmt = fmt.replace(rex, o[r]);
    }
    var o = { // 数据存储对象
        "y+": date.getFullYear() + "", // 年
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "M+": date.getMonth() + 1 + "", // 月
        "d+": date.getDate() + "", // 日
        "H+": date.getHours() + "", // 24时
        "h+": date.getHours() + "", // 12时
        "m+": date.getMinutes() + "", // 分
        "s+": date.getSeconds() + "", // 秒
        "S+": date.getMilliseconds() // 毫秒
    }
    for (var r in o) {
        var rex, len, temp;
        rex = new RegExp(r);
        temp = verify(rex); // 匹配所得字符串
        len = temp.length; // 长度
        if (!len || len == 0)
            continue;
        if (r == "y+") {
            len == 2 ? fmt = fmt.replace(rex, o[r].substr(2, 3)) : fmt = fmt.replace(rex, o[r]);
        } else if (r == "q+") {
            fmt = fmt.replace(rex, o[r]);
        } else if (r == "h+") {
            var h = (o[r] > 12 ? o[r] - 12 : o[r]) + "";
            len == 2 ? fmt = fmt.replace(rex, h.length == 1 ? "0" + h : h) : fmt = fmt.replace(rex, h);
        } else if (r == "S+") {
            fmt = fmt.replace(rex, o[r]);
        } else {
            common(r, rex)
        }
    }
    return fmt;
}

function Format(datetime, fmt) {
    if (parseInt(datetime) == datetime) {
        if (datetime.length == 10) {
            datetime = parseInt(datetime) * 1000;
        } else if (datetime.length == 13) {
            datetime = parseInt(datetime);
        }
    }
    datetime = new Date(datetime);
    var o = {
        "M+": datetime.getMonth() + 1,                 //月份   
        "d+": datetime.getDate(),                    //日   
        "h+": datetime.getHours(),                   //小时   
        "m+": datetime.getMinutes(),                 //分   
        "s+": datetime.getSeconds(),                 //秒   
        "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度   
        "S": datetime.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function flashChecker() {
    var hasFlash = 0;　　　　 //是否安装了flash
    if (document.all) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
            }
        }
    }
    return hasFlash;
}



