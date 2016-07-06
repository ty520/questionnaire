define(function(){
	//居中
	function center(obj){

		//获取当前浏览器的宽高
		var screenWidth=$(window).width(),
		screenHeight=$(window).height();

		//获取当前窗口距离页面顶部高度
		var scrollTop=$(document).scrollTop();


		var objLeft=(screenWidth-obj.width())/2;
		var objTop=(screenHeight-obj.height())/2+scrollTop;
		obj.css({
			left:objLeft+'px',
			top:objTop+'px',
			display:'block'
		});

		//浏览器改变窗口大小时
		$(window).resize(function(){
			screenWidth=$(window).width();
			screenHeight=$(window).height();
			scrollTop=$(document).scrollTop();

			objLeft=(screenWidth-obj.width())/2;
			objTop=(screenHeight-obj.height())/2+scrollTop;

			obj.css({
				left:objLeft+'px',
				top:objTop+'px',
				'display':'block'
			});
		});
		//浏览器有滚动条时
		$(window).scroll(function(){
			if(obj.css('display')!=='none'){
				screenWidth = $(window).width();
				screenHeight = $(window).height();
				scrolltop = $(document).scrollTop();

				objLeft = (screenWidth - obj.width())/2 ;
				objTop = (screenHeight - obj.height())/2 + scrolltop;

				obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
			}
		});
	};
	return{
		center:center
	};
});