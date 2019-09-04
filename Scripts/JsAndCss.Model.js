(function () {
    var AllJs = [
    //必须要的js
    "../../Scripts/jquery-3.3.1.min.js",
   "../../Scripts/layuiadmin/layui/layui.js?t=1",
   "../../Scripts/jquery.unobtrusive-ajax.min.js",
   "../../Scripts/utils.js",
    "../../Scripts/global.js",
      "../../Scripts/Page.js",
         "../../Content/uploadify/jquery.uploadify.min.js"
    ]
    var AllCss = [
    //必须要的css
    "../../Scripts/layuiadmin/layui/css/layui.css",
    "../../Content/uploadify/uploadify.css",
     "../../Content/global.css",
      "../../Scripts/layuiadmin/style/admin.css"
      
    ]


    var strJs = "";
    var strCss = "";
    for (i = 0; i < AllJs.length; i++) {
        strJs += '<script src="' + AllJs[i] + '" type="text/javascript"></script>';
    }
    for (i = 0; i < AllCss.length; i++) {
        strCss += ' <link href="' + AllCss[i] + '" rel="stylesheet" type="text/css"  media="all"/>';
    }
    document.write(strJs + strCss);
    window.FontDocument = document;
})();



