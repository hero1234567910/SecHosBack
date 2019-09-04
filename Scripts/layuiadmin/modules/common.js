/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */
 
layui.define(['laydate','form'],function(exports){
    var $ = layui.$
        , layer = layui.layer
        , form = layui.form
        , admin = layui.admin
        , laydate = layui.laydate;

  //初始化日期控件
    $("[laydate-type]").each(function (index, el) {
        var datetype = $(el).attr("laydate-type");
        var options = {};
        options.elem = el;
        options.type = datetype;
        var format = $(el).attr("laydate-format");
        if (format !== undefined && format !== '') {
            options.format = format;
        }
        var range = $(el).attr("laydate-range");
        if (range !== undefined && range !== '') {
            options.range = range;
        }
        laydate.render(options);
    });


    $("select[data-select-codename]").each(function () {
        var web_url = $(this).attr("data-web-url");
        if ($(this).attr("data-select-codename") !== "") {
            $.ajax({
                type: "POST",
                url: web_url + "Controls/CodeValue/GetCodeValue",
                data: { "CodeName": $(this).attr("data-select-codename") },
                async: false,
                dataType: "JSON",
                success: (function (element, data) {
                    $.each(data, function (i, item) {
                        $(element).append("<option value='" + item.ItemValue + "' " +
                            (item.ItemValue === $(element).attr("data-select-value") ? "selected='selected'" : "") + ">" + item.ItemText + "</option>");
                    });
                    form.render('select');
                }).bind(null, this)
            });
        }
    });

   

  //退出
    admin.events.logout = function () {
        layer.confirm('确认要退出系统吗?', function (index) {
            admin.exit(function () {
                window.location = '../Login/Logout';
            });
            layer.close(index);
        });   
  };
    
  //对外暴露的接口
  exports('common', {});
});