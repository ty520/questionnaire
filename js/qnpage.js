//此页面时点击查看数据按钮时的生成页面  把参数qn要改写成key

define(function(){
	var qnpage = function(qn){
		//var qn = LS.getStorage(key);
		var page = '<div class="row page-2"><div class="col-md-2"></div><div class="col-md-8"> <h1 class="rewrite">'
			+qn.title+'</h1><div class="question"></div><div class="footer"></div></div><div class="col-md-2"></div></div>';
		$('.main').html(page);
		$('span').click(function(){console.log('点击了');
			window.location.hash = '#listpage';
		});
		var temp = '';
		var questionArr = qn.content;
		for(var i = 0 ,len = questionArr.length; i < len; i++){
			switch(questionArr[i].type){
				case 'radio':
					temp +='<ul><span class="num">Q'+(i+1)+'</span><label>'
						+ questionArr[i].question+'</label><li><input type="radio" value="1"/><span>'
						+ questionArr[i].options[0]+'</span></li><li><input type="radio" value="2"/><span for="">'
						+ questionArr[i].options[1]+'</span></li></ul>' ;
					break;
				case 'checkbox':
					temp += '<ul><span class="num">Q'+ (i+1) +'</span><label>' 
						+questionArr[i].question +'</label><li><input type="checkbox" value="1"/><span>'
						+ questionArr[i].options[0] + '</span></li><li><input type="checkbox" value="2"/><span>'
						+ questionArr[i].options[1] +'</span></li><li><input type="checkbox" value="3"/><span>'
						+ questionArr[i].options[2] +'</span></li><li><input type="checkbox" value="4"/><span >'
						+ questionArr[i].options[3] +'</span></li></ul>';
					break;
				case 'textarea':
					temp += '<ul><span class="num">Q'+ (i+1) +'</span><label>'
						+ questionArr[i].question +'</label><li><textarea  cols="70" rows="5"></textarea></li><li><input type="checkbox" value="1"/><span id="flag">此题是否为必填</span></li></ul> '
					break;
			}
		}
		$('.question').html(temp);
	
	};
	return {
		qnpage:qnpage
	}
						    		    	
});
		
