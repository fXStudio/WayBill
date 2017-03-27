$(document).ready(function(){
	(function() {
		var caller = arguments.callee;
		$.ajax({
			   type: "GET",
			   url: "services/kanbanList?date=" + new Date().getTime(),
			   success: function(json){
				   $('.jumbotron').addClass('hide');
				   $('.container-fluid > .row').removeClass('hide');
				   
				   var buffer = [];
					
					$.each(json, function(key, val) {// 组装Panel视图
						var col = $('<div class="col-md-4 kanban-col">');
						var panel = $('<div class="panel panel-default">');
						var heading = (
								$('<div class="panel-heading">').append('<div class="row">').append(
										$('<div class="col-sm-3">').append($('<span class="doorno">').html(key.toString().split(/ /)[0]))
								).append(
										$('<div class="col-sm-9">').append(
												$('<p class="car-info">').html(key.match(/\(.+\)/g).toString().replace(/[()null]/g, ""))
									    ).append(
									    		$('<p class="date-info">').html(key.match(/\d{2}-\d{2} \d{2}:\d{2}/g))
										)
								)
						);
						var body = $('<div class="panel-body">');
						
						$.each(val, function(index, obj) {// 拼接零件的内容
							var row = $('<div class="row">').append(
									$('<div class="col-md-10">').append($('<span>').html(obj.cdescrip))
							).append(
									$('<div class="col-md-2">').append($('<span>').html(obj.code))
							);
							body.append(row);
						});
						buffer.push(col.append(panel.append(heading).append(body)));
					});
					var empty = true;
					$.each(buffer, function(index, node){
						 return empty = node.find('.panel-body').html().length === 0;
					});
					
					// 未找到看板信息
					if(empty){
						   $('.jumbotron').removeClass('hide').find('div').html('当前未发布看板信息.');
						   $('.container-fluid > .row').addClass('hide');
					}
					// 通过轮播器显示看板信息
					carosel(caller, buffer);
			   },
			   error: function() {// 如果出现异常，系统可以在5秒钟以后重试
				   $('.jumbotron').removeClass('hide').find('div').html('网络异常，无法获取看板信息.');
				   $('.container-fluid > .row').addClass('hide');
				   
					setTimeout(function(){caller()},  5000);
			   }
		});
	})();
	
	/**
	 * 轮播器，以一定时间周期循环播放看板信息
	 */
	function carosel(caller, buffer){
		 if(buffer.length === 0) {
			 return caller();
		 }
		 var hasContent = false;
		 var arr = [];
		 for(var i = 0; i < 3; i++) {
	 		var obj = buffer.shift();
	 		
	 		if(obj){
	 			if(!hasContent) { hasContent = obj.find('.panel-body').html().length > 0; }
		 		arr.push(obj);
	 		}
		 }

		 if(hasContent){
			 $('.container-fluid > .row').empty(2000);
			 
			 $.each(arr, function(index, node){
				 $('.container-fluid > .row').append(node.fadeIn(2000)); 
			 });
		 }
		 return setTimeout(function() { carosel(caller, buffer); }, 5000);
	}
	
	(function() {
		var sel = arguments.callee;
		$('.jumbotron').find('h3').html(new Date().format('yyyy-mm-dd HH:MM:ss'));

		setTimeout(function(){ sel(); }, 1000);
	})();
});