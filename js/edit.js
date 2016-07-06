//本页面主要是操作问卷 添加单选多选文本框
define(['./modal','./storage'],function(M,LS){
	 var editPage = function(arr,title,key){	
		this.questionArr = arr|| [];//问题数组
		this.title = title || '这里是标题';
		this.key = key;
		this.init();
	 };
	//数组存储
	//var questionArr = [];
	//日历加载
	// $('.time').datetimepicker({
	// 	format:'yyyy-mm-dd ',
	// 	minView: "month",
	// 	autoclose:true

	// });
	editPage.prototype.init = function(){
		var self = this;
		var page = '<div class="row page-2"><div class="col-md-2"></div><div class="col-md-8"><h1 class="rewrite title">'
		+ self.title +'</h1><div class="question"></div><div class="selbox-wrap"><div class="selbox"><button class="btn btn-default" role="button" id="radio"><span class="glyphicon glyphicon-record" aria-hidden="true"></span> 单选</button><button class="btn btn-default" role="button" id="checkbox"><span class="glyphicon glyphicon-check" aria-hidden="true"></span> 多选</button><button class="btn btn-default"  role="button" id="textarea"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> 文本题</button></div><button class="btn btn-lg" role="button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加问题</button></div><div class="footer"><div class="wrap"><label for="meeting">问卷截止日期</label><div id="datetimepicker" class="input-append date"><input type="text" size="16" id = "meeting" class="form-control" data-format="yyyy-MM-dd" ></input><span class="add-on"><i data-date-icon="glyphicon glyphicon-calendar"></i></span></div><button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal" data-what="save" disabled="disabled">保存问卷</button><button class="btn btn-default" type="submit" data-toggle="modal" data-target="#myModal" data-what="publish" disabled="disabled">发布问卷</button></div></div></div><div class="col-md-2"></div></div>';
		$('.main').html(page);
		if($('.bootstrap-datetimepicker-widget')[0]){
			$('.bootstrap-datetimepicker-widget').remove();
		}

		$('#datetimepicker').datetimepicker();
		
		modal = new M.modalPage();
		$('#confrim').click(function(){
			//if(localStorage.getItem(key))
			console.log('修改时调用');
			console.log(self.key);
			LS.saveStorage(modal.state,modal.date,self.title,self.questionArr,self.key);
		});
		this.editOperate();
	};

	editPage.prototype.editOperate = function(){
		var self = this;
		//添加问题点击事件
	　　$('.btn-lg').one('click',function(e){
			e.preventDefault();
			$('.selbox').slideDown('slow');
		});
		//点击增加问题事件
		$('.selbox').on('click',function(e){
			var target = e.target;
			switch(target.id){
				case "radio":
					self.addRadio();
					self.render();
					break;
				case "checkbox":
					self.addCheckbox();
					self.render();
					break;
				case "textarea":
					self.addTextarea();
					self.render();
					break;
			}
			self.btnActive();
		});
	};	
	editPage.prototype.btnActive = function (){
		var len = this.questionArr.length;
		if(len !== 0)
			$('.wrap .btn').removeAttr("disabled");
		else 
			$('.wrap .btn').attr({"disabled":"disabled"});
	}
	//radioTemp格式{
	// type:radio,
	// title:"单选题",
	// options:["选项一"，“选项二”]	
	//}
 	editPage.prototype.addRadio = function(){
 		var self = this;
		var radioTemp = {};
		radioTemp.type = "radio";
		radioTemp.question = "单选题";
		radioTemp.options = ["选项一","选项二"];	
		if(self.canAdd())
		self.questionArr.push(radioTemp);
	};
	editPage.prototype.addCheckbox = function(){
		var self = this;
		var checkboxTemp = {};
		checkboxTemp.type = "checkbox";
		checkboxTemp.question = "多选题";
		checkboxTemp.options = ["选项一","选项二","选项三","选项四"];
		if(self.canAdd())
		self.questionArr.push(checkboxTemp);

	};
	editPage.prototype.addTextarea = function(){
		var self = this;
		var textareaTemp = {};
		textareaTemp.type = "textarea";
		textareaTemp.question = "文本题"
		textareaTemp.flag = false;
		if(self.canAdd())
		self.questionArr.push(textareaTemp);
	};
	
	//hover事件
	editPage.prototype.hoverEvent = function (){
		var self = this;
		var uls = $('.question>ul'),size = $('.question>ul').length;
			$.each(uls,function(index,item){
				$(item).hover(function(e){
					var target = e.target,tempTxt='';
					if($(target).is('ul')){//这里判断一下是不是ul否则会出现在li上加操作组的情况
						if(size === 1){
							tempTxt = '<li class="operate"><button type="button" class="btn btn-link" id="clone">复用</button><button type="button" class="btn btn-link" id="del">删除</button></li>';

						} else {
							switch(index){
								case 0:
									tempTxt += '<li class="operate"><button type="button" class="btn btn-link" id="down">下移</button><button type="button" class="btn btn-link" id="clone">复用</button><button type="button" class="btn btn-link" id="del">删除</button></li>';
									break;
								case size-1:
									tempTxt += '<li class="operate"><button type="button" class="btn btn-link" id="up">上移</button><button type="button" class="btn btn-link" id="clone">复用</button><button type="button" class="btn btn-link" id="del">删除</button></li>';
									break;
								default:
									tempTxt += '<li class="operate"><button type="button" class="btn btn-link" id="up">上移</button><button type="button" class="btn btn-link" id="down">下移</button><button type="button" class="btn btn-link" id="clone">复用</button><button type="button" class="btn btn-link" id="del">删除</button></li>';

							}
						}	
							$(target).append(tempTxt);
							self.operateEvent();
				  }
				},function(){
						$('.operate').remove();
				});
		    }); 

	    //编辑文本操作
		$('.col-md-8').on('click',function(e){
			var target = e.target;
			if($(target).is('.rewrite')){
				var $node = $(target),
					txt = $node.text();
				var	input = $('<input class="form-control" type="text"value="' + txt + '"/>'); 
				$node.html(input);
				input.click(function(){
					return false;
				});
				input.trigger("focus",function(e){
					var target = e.target
				}); 
				input.blur(function(){
					var newtxt = $(this).val();
					if(newtxt != txt){
						$node.html(newtxt);
						self.saveData(target,newtxt);//对应修改数组中的值
					}else{					
						$node.html(txt);
					}
				});
			}
		});  
	}
	//操作事件
	editPage.prototype.operateEvent = function(){
		var self = this;
		$('.operate').on('click',function(e){
			var target = e.target,
				num = $(this).parent().find('.num').text().slice(1) - 1;
			switch(target.id){
				case 'up':
					self.opUp(num);
					self.render();
					break;
				case 'down':
					self.opDown(num);
					self.render();
					break;
				case 'clone':
					self.opClone(num);
					self.render();
					break;
				case 'del':
					self.opDel(num);
					self.render();
					self.btnActive();
					break;
			}
		});
	}		
	/**
	 * [render description]
	 * @return {[type]} [description]
	 * @param {[type]} [questioner] [每个问题]
	 */
	editPage.prototype.render = function (){
		var self = this;
		var questionArr = self.questionArr,
			tempText ='';
		for(var i = 0, questioner; questioner = questionArr[i];i++){
			var type = questioner.type;
			switch(type){
				case 'radio':
					tempText += '<ul class="question-r"><span class="num">Q'
							+ (i+1) + '</span><label class="question rewrite">'
							+ questioner.question +'</label><li><input type="radio" value="0"/><span class="rewrite">'
							+ questioner.options[0] +'</span></li><li><input type="radio" value="1"/><span class="rewrite">'
							+questioner.options[1] + '</span></li></ul>';
					break;
				case 'checkbox':
					tempText += '<ul class="question-c"><span class="num">Q'
								+ (i+1) +'</span><label  class="question rewrite">'
								+questioner.question +'</label><li><input type="checkbox" value="0"/><span class="rewrite">'
								+ questioner.options[0] +'</span></li><li><input type="checkbox" value="1"/><span class="rewrite">'
								+ questioner.options[1] +'</span></li><li><input type="checkbox" value="2"/><span class="rewrite">'
								+ questioner.options[2] +'</span></li><li><input type="checkbox" value="3"/><span class="rewrite">'
								+ questioner.options[3] +'</span></li></ul>';
					break;
				case 'textarea':
					tempText += '<ul class="question-t"><span class="num">Q'
							+ (i+1) + '</span><label  class="question rewrite">'
							+ questioner.question +'</label><li><textarea  cols="70" rows="5"></textarea></li><li><input type="checkbox" value="1"/><span>此题是否为必填</span></li></ul>';
					break;
			} 
		}
		
		$('.question').html(tempText);
		self.hoverEvent();		
	}
	//nospace 判断数组长度是否为10，为10则不能再添加
	editPage.prototype.canAdd = function (){
		var self = this;
		var len =self.questionArr.length;
		if(len === 10){
			alert('问题超过10个，不能添加！！！')
			return false;
		} else {
			return true;
		}
	}
	editPage.prototype.opUp = function(num){
		var self = this;
		var questionArr = self.questionArr;
		var temp = questionArr[num-1];
		questionArr[num-1] = questionArr[num];
		questionArr[num] = temp;
	}
	editPage.prototype.opDown = function (num){
		var self = this;
		var questionArr = self.questionArr;
		var temp = questionArr[num + 1];
		questionArr[num+1] = questionArr[num];
		questionArr[num] = temp;

	}
	editPage.prototype.opClone = function (num){
		var self = this;
		var questionArr = self.questionArr;
		var temp = questionArr[num]; 
		questionArr.splice(num+1,0,temp);
	}
	editPage.prototype.opDel =function (num){
		this.questionArr.splice(num,1);
	}
	
	editPage.prototype.saveData = function(ele,txt){
		var self = this;
		var questionArr = self.questionArr;
		switch(ele.tagName){
			case 'H1':
				self.title = txt; 
				break;
			case 'LABEL'://获取label是第几个问题，即在数组中存储的位置
				var num = $(ele).prev('.num').text().slice(1)-1;
				questionArr[num].question = txt;
				break;
			case 'SPAN': 
				var num = $(ele).parent('li').prevAll('.num').text().slice(1) - 1;
				var valNum = $(ele).prev('input').val();
				questionArr[num].options[valNum] =  txt;
			 	break;
		}
	};
	return{
		editPage:editPage
	}
});