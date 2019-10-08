
//初始化页面下拉框
function inItSelect() {
    $("[data-codename]").each(function () {
        var codeName = $(this).attr("data-codename");//代码项名称
        var id = $(this).attr("id");
        var showOption = $(this).attr("data-showOption");//默认显示文本
        var dataEvent = $(this).attr("data-event");//其他事件名称
        //console.log(dataEvent)
        if (dataEvent == "药品名称") {
            // var par = {};
            // par['codeName'] = codeName;
            
            SendAjax(
              "/sys/sechosdrugmaterial/getDrugCodes",null,
              function(res) {
                if (res.code == 0) {
                  //console.log(res.data);
                  var strLi = "";
                  if (showOption != "") {
                    strLi += '<option value="">' + showOption + "</option>";
                  }
                  $.each(res.data, function(value, text) {
                    //console.log(text);
                    //console.log(value);
                    //console.log(text.drugCode);
                    strLi +=
                      '<option value="' + text.drugCode + '">' + text.drugName + "</option>";
                  });

                  $("#" + id).append(strLi);
                }
              },
              false,
              "POST"
            );
            return false;
          }
         
        if (dataEvent == "材料名称") {
            // var par = {};
            // par['codeName'] = codeName;
            
            SendAjax(
              "/sys/sechosmaterials/getMaterialCodes",null,
              function(res) {
                if (res.code == 0) {
                  //console.log(res.data);
                  var strLi = "";
                  if (showOption != "") {
                    strLi += '<option value="">' + showOption + "</option>";
                  }
                  $.each(res.data, function(value, text) {
                    //console.log(res.data);
                    //console.log(value);
                    //console.log(text.drugCode);
                    strLi +=
                      '<option value="' + text.materialCode + '">' + text.materialName + "</option>";
                  });

                  $("#" + id).append(strLi);
                }
              },
              false,
              "POST"
            );
            return false;
          }

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



