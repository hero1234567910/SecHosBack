window.serverUrl = "http://localhost:7071";

layui
  .config({
    version: true,
    base: "../../Scripts/layuiadmin/" //静态资源所在路径
  })
  .extend({
    index: "lib/index" //主入口模块
  })
  .use(["index", "form", "laydate","layer"], function() {
    var $ = layui.$,
      admin = layui.admin,
      element = layui.element,
      layer = layui.layer,
      laydate = layui.laydate,
      form = layui.form;
      var index  = layer.load(1);

    form.render(null, "layform");

    lay(".date-input").each(function() {
      laydate.render({
        elem: this,
        format: "yyyy-MM-dd",
        trigger: "click"
      });
    });

    //初始化日期格式
    //laydate.render({
    //    elem: '.layuitime'
    //});
  });

//为所有 AJAX 请求设置默认 headers 和 complete 函数：
$.ajaxSetup({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    token: window.localStorage.getItem("m_token")
  },
  complete: function(res) {
    //console.log(JSON.parse(res.responseText).code);
    if (JSON.parse(res.responseText).code == "401") {
      window.top.location.href = "../../login.html";
    }
  }
});

function SendAjax(url, responseData, successFunction, async, type) {
  var boolasync = false;
  if (async != undefined) {
    boolasync = async;
  }

  var booltype = "POST";
  if (type != undefined) {
    booltype = type;
  }
  //var obj = {
  //    ChkGuid: Session("ChkGuid"),
  //    OUCode: Session("OUCode"),
  //    DeptCode: Session("DeptCode"),
  //    DisplayName: Session("DisplayName"),
  //    UserCode: Session("UserCode")
  //}
  //if (typeof a == "string") {
  //    for (var i = 0; i < a.split('&').length; i++) {
  //        var e = a.split('&')[i].split('=');
  //        obj[e[0]] = e[1];
  //    }
  //}
  //else {
  //    obj = $.extend({}, obj, a);
  //}

  $.ajax({
    type: booltype,
    url: window.serverUrl + url,
    async: boolasync,
    dataType: "JSON",
    data: responseData,
    contentType: "application/json;charset=utf-8",
    success: function(params, data) {
      successFunction.call(successFunction, data, params);
    }.bind(null, responseData),
    error: function(XMLHttpRequest, textStatus, errorThrown) {}
  });
}

//解析url路径,获取参数
function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.search
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

function GuidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
