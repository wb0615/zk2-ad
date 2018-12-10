require(['./js/lib/config.js'],function(){
	require(['mui'],function(mui){
		var pagenum=0;
		var pageSize=6;
		var total=0;
		mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					up: {
						auto:true,
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
			});
		
		function pullupRefresh(){
			setTimeout(function(){
				pagenum++;
				getlist();
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(total===pagenum)
			},1000)
		}
		
		//渲染
		function getlist(){
			console.log(12)
			mui.ajax('/index/api/all',{
				dataType:'json',
				data:{
					pagenum:pagenum,
					pageSize:pageSize
				},
				success:function(data){
					console.log(data)
				}
			})
		}
		
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	})
})