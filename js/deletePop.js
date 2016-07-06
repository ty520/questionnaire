//利用jQuery实现弹出框和提示框，并始终保持提示框居中，屏蔽罩可以随滚动条滑动，实现问卷的删除功能
//jQuery自定义弹出框scrollCenter、resizeCenter、定义jQuery对象方法center等。
define(['./newpage'],function(N){
	/*********
	自定义事件scrollCenter，
	一次触发可以绑定多个处理程序运行，
	第一个处理程序屏幕滚动时始终保持模态框居中，
	第二个处理程序将屏幕滚动时始终保持屏蔽罩覆盖页面
	********/
	(function($){
		$(document).on('scrollCenter',function(){
			var $notice=$('.notice');
			screenWidth = $(window).width();
		    screenHeight = $(window).height();
		    scrolltop = $(document).scrollTop();
			if($notice.css('display')!=='none')
			{  
		        objLeft = (screenWidth - $notice.width())/2 ;
		        objTop = (screenHeight - $notice.height())/2 + scrolltop;
		           
		        $notice.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
			}
		});
		$(document).on('scrollCenter',function(){
			if($('#mask').css('display')!=='none')
			{
				maskTop =  scrolltop;
				 $('#mask').css({
	        	width:screenWidth +'px',
	        	height: screenHeight+'px',
	        	top:maskTop+'px'
	        });
			}
		})
	})(jQuery);

	/*********
	自定义事件resizeCenter，
	处理程序用于屏幕大小变化时始终保持模态框居中，
	********/
	(function($){
		$(document).on('resizeCenter',function(){
			var $notice=$('.notice');
			screenWidth=$(window).width();
			screenHeight=$(window).height();
			scrollTop=$(document).scrollTop();
			
			objLeft=(screenWidth-$notice.width())/2;
			objTop=(screenHeight-$notice.height())/2+scrollTop;

			$notice.css({
				left:objLeft+'px',
				top:objTop+'px',
				'display':'block'
			});
		})
	})(jQuery);
	/************
	定义jQuery对象方法center
	*******************/
	(function($){
		$.fn.center=function(){
			var self=this;
			//获取当前浏览器的宽高
		var screenWidth=$(window).width(),
			screenHeight=$(window).height();

			//获取当前窗口距离页面顶部高度
		var scrollTop=$(document).scrollTop();


		var objLeft=(screenWidth-self.width())/2;
		var objTop=(screenHeight-self.height())/2+scrollTop;
		self.css({
			left:objLeft+'px',
			top:objTop+'px',
			display:'block'
		});
		//浏览器改变窗口大小时触发，自定义节流事件resizeCenter事件，定时为100ms触发一次
		var resized=false;
		$(window).resize(function(){
			resized=true;
		});
		var intervalTime=setInterval(function(){
			if(resized)
			$(self).trigger('resizeCenter');
			resized=false;
		},100);
		//浏览器有滚动条时,触发自定义节流事件scrollCenter事件，定时为100ms触发一次
		var timer=0;
		$(window).scroll(function(){
			if(!timer){
				timer=setTimeout(function() {
					$(self).trigger('scrollCenter'); 
					timer=0;
				}, 100);
			}
			
		});
	}
	})(jQuery);

	/***************centerNotice方法中调用Jquery自定义对象方法******************/
	var centerNotice=function(){
		return $('.notice').center()
	};

	/*********添加Jquery对象方法close，IIFE（立即调用函数表达式）*****************/
	(function($){
		$.fn.closeModal=function(){
			if(this)
				this.remove();
		}
	})(jQuery)
	
	var check=function(obj,obj1,obj2,selected){
		//启用警告框关闭功能,调用BootStrap中的方法
		$('.notice').on('closed.bs.alert', function(){
  		$('#mask').closeModal(); 
		});
		obj1.click(function(event){
			//删除屏蔽罩和弹出框
			$('.notice').closeModal();
			$('#mask').closeModal();
			var trs=$('tbody tr');
			var selectOpt;
			var key,objSelect;
			var qnobj;
			for(var i=0,len=selected.length;i<len;i++)    //遍历每个选项，若被选中则删除
			{	
			  	selectOpt=selected[i];
			  	objSelect= trs[selectOpt];
			  	$(objSelect).remove();
				//寻找选中元素所在的行，然后在 localStorage中删除元素
         		key=localStorage.key((selectOpt-i));  //每次删除元素后，localStorage中元素的位置会变动
          		localStorage.removeItem(key);  
			}
			if(localStorage.length===0)
			{
			  	window.location.hash = '#newpage';
			  	N.createPageOne();
			}
			  event.stopPropagation();
		});//执行确定操作
		obj2.click(function(){
			//删除屏蔽罩和弹出框
			$('.notice').closeModal();
			$('#mask').closeModal(); 
		});
	};
	return{
		center:centerNotice,
		check:check
	};
}
);