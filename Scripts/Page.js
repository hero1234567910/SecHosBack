
//初始化页面下拉框
function inItSelect() {
    $("[data-codename]").each(function () {
        var codeName = $(this).attr("data-codename");//代码项名称
        var id = $(this).attr("id");
        var showOption = $(this).attr("data-showOption");//默认显示文本
        var dataEvent = $(this).attr("data-event");//其他事件名称
      
        if (dataEvent == undefined) {
            var par = {};
            par['codeName'] = codeName;
            SendAjax("/sys/codeValue/getCodeValueToMap", par, function (res) {

                if (res.code == 0) {
                    var strLi = "";
                    if (showOption != "") {
                        strLi += "<option value=\"\">" + showOption + "</option>";
                    }
                    $.each(res.data, function (value, text) {
                        strLi += "<option value=\"" + text + "\">" + value + "</option>";
                    })

                    $("#" + id).append(strLi);
                }
            }, false, "GET");
        }
        else
        {
            var url;
            if (dataEvent == "getAllUser")
            {
                url = "/sys/common/getAllUser";
            }
            var par = {};
          
            SendAjax(url, par, function (res) {
               
                if (res.code == 0) {
                    var strLi = "";
                    if (showOption != "") {
                        strLi += "<option value=\"\">" + showOption + "</option>";
                    }
                    $.each(res.data, function (i, item) {
                        strLi += "<option value=\"" + item.rowGuid + "\">" + item.userName + "</option>";
                    })

                    $("#" + id).append(strLi);
                }
            }, false, "GET");

        }

    });
}


