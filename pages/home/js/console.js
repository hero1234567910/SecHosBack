//创建vue实例化对象
var vm = new Vue({
    el: '#vueConfig',
    data: {
        orderCount:{},
		mzCount:''
    },
    created() {
        this.getRthing();
		this.getMZRthing()
    },
    methods: {
      //代办事项
      getRthing(){
      	let self = this;
      	$.ajax({
			url:prUrl+'/sys/sechosrechargerecord/statistical',
			contentType: 'application/json;charset=utf-8',
			method: 'get',
			dataType: 'JSON',
			success: function(res) {
				if (res.code == '0') {
					self.orderCount = res.data;
				}
				if (res.code == '500') {
					layer.msg(res.msg)
				}
			}
		});
      },
	  getMZRthing(){
      	let self = this;
      	$.ajax({
			url:prUrl+'/sys/sechosrechargerecord/countYestdayMz',
			contentType: 'application/json;charset=utf-8',
			method: 'get',
			dataType: 'JSON',
			success: function(res) {
				if (res.code == '0') {
					self.mzCount = res.data;
				}
				if (res.code == '500') {
					layer.msg(res.msg)
				}
			}
		});
      },
    }
})

