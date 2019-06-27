$.ajaxSetup({
	headers: {
		"Content-Type": "application/json;charset=utf-8",
		"token": window.localStorage.getItem('m_token')
	},
	complete: function (res) {
		if (JSON.parse(res.responseText).code == '401') {
			window.top.location.href = '../../login.html';
		}
	}
});

$().ready(function (){
    var m_url = location.protocol + '\\\\' + location.hostname + ':' + (location.port == '' ? 80 : location.port);
    $.ajax({
        async: false,
        url:m_url+'/sys/sechosconsultation/getReplyCount',
        contentType: 'application/json;charset=utf-8',
        method: 'get',
        dataType:'JSON',
        success:function(res){
            if(res.code == '0'){
                if(res.data>99){
                    $(".layui-badge").append("99+");
                }else{
                    $(".layui-badge").append( res.data);
                }
            }
            if(res.code == '500'){
                layer.msg(res.code);
            }
        }
    });

})


layui.use('table', function(){
        var table = layui.table;
         var m_url = location.protocol + '\\\\' + location.hostname + ':' + (location.port == '' ? 80 : location.port);
        table.render({
            elem: '#table'
            ,height: 'full-130'
            ,even:true
            ,url:m_url+'/sys/sechosconsultation/listData'
            ,method:'get'
            ,cols: [[
                {checkbox:true}
                                
                                ,{field:'consultationTime', width:90, title: '咨询时间', sort: true, 
                                templet: '<div>{{ layui.laytpl.toDateString(d.consultationTime,"yyyy-MM-dd HH:mm:ss") }}</div>'}
                                ,{field:'replyTime', width:90, title: '回复时间', sort: true, 
                                templet: '<div>{{ layui.laytpl.toDateString(d.replyTime,"yyyy-MM-dd HH:mm:ss") }}</div>'}
                                ,{field:'consultationTitle', width:80, title: '咨询标题', sort: true,}
                                ,{field:'consultationContent', width:80, title: '咨询内容', sort: true}
                                ,{field:'consultationName', width:80, title: '咨询人姓名', sort: true}
                                // ,{field:'sortSq', width:60, title: '排序号', sort: true}
                                ,{field:'right',title:'操作',toolbar:'#barDemo',width:80}
            ]]
            , page: true
            , limit:10 //默认十条数据一页
            , id:'testReload'
        });
 

        //角色关键字搜索
        var $ = layui.$, active = {
            reload: function () {
                var keyword = $('#keyword');
                var startTime = $('#start_time').val();
                var endTime = $('#end_time').val();
                table.reload('testReload', {
                    where: {
                        'consultationTitleVague': keyword.val(),
                        startTime: startTime,
                        endTime: endTime
                    }
                });
            }
        };
        //搜索绑定
        $('#consultationFind').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

        //刷新
        $("#allReply").on('click',function(data){
            table.reload('testReload', {
                where: {
                    replyStatus:""
                }
            });
        });
        
        //获取已回复信息
        $("#replyed").on('click',function(data){
            table.reload('testReload', {
                where: {
                    replyStatus:1
                }
            });
        });
        
        //获取未回复信息
        $("#noReply").on('click',function(data){
            table.reload('testReload', {
                where: {
                    replyStatus:0
                }
            });
        });


        //新增
        // $('#consultationAdd').on('click', function(){
        //     var data = 'add';
        //     layer.open({
        //         type: 2,
        //         title: '咨询回复',
        //         maxmin: true,
        //         shadeClose: true, //点击遮罩关闭层
        //         area : ['700px', '500px'],
        //         content: 'consultationEdit.html',
        //         success: function(layero, index){
        //             var body = layer.getChildFrame('body',index);
        //             var iframeWin = window[layero.find('iframe')[0]['name']];
        //             iframeWin.inputDataHandle(data);
        //         },
        //         end: function (){
        //             //刷新页面
        //             window.location.reload()
        //         }
        //     });
        // });

        //删除
        $('#consultationDel').on('click', function(){
            layer.confirm('你确定删除吗！', function(index){
                var cache = table.cache;
                var params = new Array;
                $.each(cache.testReload,function(index,value){
                    if(value.LAY_CHECKED != undefined && value.LAY_CHECKED == true){
                        params.push(value.rowGuid);
                    }
                });
                if(params.length == 0){
                    layer.msg("请先选择");
                    return;
                }
                $.ajax({
                    url:m_url+'/sys/sechosconsultation/delete',
                    contentType: 'application/json;charset=utf-8',
                    method:'post',
                    data:JSON.stringify(params),
                    dataType:'JSON',
                    success:function(res){
                        if(res.code=='0'){
                            layer.msg('删除成功', {
                                icon: 1,
                                time: 1000 //2秒关闭（如果不配置，默认是3秒）
                            },function(){
                                window.location.reload();
                            });
                        }
                        if(res.code=='500'){
                        	layer.msg(res.msg)
                        }
                    },
					error: function (jqXHR, textStatus, errorThrown) {

					}
                });
                layer.close(index);
            });
        });



        //编辑
        table.on('tool(toolbar)', function (obj) {
            var value = obj.data;
            if (obj.event === 'edit') {
                //更新
                var data = 'edit';
                layer.open({
                    type: 2,
                    title: '门诊咨询回复',
                    maxmin: true,
                    shadeClose: true, //点击遮罩关闭层
                    area: ['550px', '550px'],
                    content: 'consultationEdit.html',
                    success: function (layero, index) {
                        var body = layer.getChildFrame('body', index);
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        iframeWin.inputDataHandle(data);
                        body.find("#rowId").val(value.rowId);
                        body.find("#rowGuid").val(value.rowGuid);
                        body.find("#consultationTime").val(layui.laytpl.toDateString(value.consultationTime, "yyyy-MM-dd HH:mm:ss"));
                        body.find("#replyTime").val(layui.laytpl.toDateString(value.replyTime, "yyyy-MM-dd HH:mm:ss"));
                        body.find("#consultationTitle").val(value.consultationTitle);
                        body.find("#consultationContent").val(value.consultationContent);
                        body.find("#consultationName").val(value.consultationName);
                        body.find("#consultationMobile").val(value.consultationMobile);
                        body.find("#replyContent").val(value.replyContent);
                    },
                    end: function () {
                        //刷新页面
                        window.location.reload()
                    }
                });
            }
    });

});


layui.use(['laydate'], function () {
    var $ = layui.$;
    var laydate = layui.laydate;
    var nowTime = new Date().valueOf();
    var max = null;

    var start = laydate.render({
        elem: '#start_time',
        type: 'date',
        format: 'yyyy-MM-dd',
        max: nowTime,
        btns: ['clear', 'confirm'],
        done: function (value, date) {
            endMax = end.config.max;
            end.config.min = date; //最大时间为结束时间的开始值
            end.config.min.month = date.month - 1;
        }
    });

    var end = laydate.render({
        elem: '#end_time',
        type: 'date',
        max: 4073558400000,
        format: 'yyyy-MM-dd',
        min: nowTime,
        done: function (value, date) {
            if ($.trim(value) == '') {
                var curDate = new Date();
                date = {'date': curDate.getDate(), 'month': curDate.getMonth() + 1, 'year': curDate.getFullYear()};
            }
            start.config.max = date;//最小时间为开始时间的最大值
            start.config.max.month = date.month - 1;
        }
    })
});

//日期格式
layui.laytpl.toDateString = function (d, format) {
    if(d==null){
        return "";
    }else{
    
    var date = new Date(d || new Date())
        , ymd = [
        this.digit(date.getFullYear(), 4)
        , this.digit(date.getMonth() + 1)
        , this.digit(date.getDate())
    ]
        , hms = [
        this.digit(date.getHours())
        , this.digit(date.getMinutes())
        , this.digit(date.getSeconds())
    ];

    format = format || 'yyyy-MM-dd HH:mm:ss';

    return format.replace(/yyyy/g, ymd[0])
        .replace(/MM/g, ymd[1])
        .replace(/dd/g, ymd[2])
        .replace(/HH/g, hms[0])
        .replace(/mm/g, hms[1])
        .replace(/ss/g, hms[2]);
    }
};

layui.laytpl.digit = function (num, length, end) {
    var str = '';
    num = String(num);
    length = length || 2;
    for (var i = num.length; i < length; i++) {
        str += '0';
    }
    return num < Math.pow(10, length) ? str + (num | 0) : num;
};
