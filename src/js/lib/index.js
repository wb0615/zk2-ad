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
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(total==pagenum)
			},1000)
		}
		
		//获取数据
		function getlist(){
			mui.ajax('/index/api/list',{
				dataType:'json',
				data:{
					pagenum:pagenum,
					pageSize:pageSize
				},
				success:function(data){
					if(data.code===1){
						total=data.total;
						render(data.msg)
						
					}
				}
			})
		}
		
		//渲染函数
		function render(data){
			var html='';
			data.forEach(function(val){
				html+=`
						<dl>
							<dt><img src="img/${val.img}" alt=""></dt>
							<dd>
								<p>${val.title}</p>
								<p class="price">${val.price}元</p>
							</dd>
						</dl>
					  `;
			})
			
			document.querySelector('.mui-scroll').innerHTML+=html;
		}
		
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	})
})