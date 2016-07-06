
define(function(){
	var modalPage = function(){
		this.state = '';
		this.date = $('#meeting').val();
		this.init();			
	};
	modalPage.prototype.init = function(){
		var page ='<div class="modal fade" id="myModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">提示</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" id="cancel"  >取消</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="confrim">确认</button></div></div></div></div> ';
		$('.wrap').append(page);
		
		this.pop();
	}
	//通过输入的id确认触发弹出框的按钮，context为设置的弹出框内容	
	modalPage.prototype.pop  = function(){
		var self = this, text = '';
		$('#datetimepicker').on('changeDate',function(){
        self.date=$('#meeting').val();
        var inputDate=new Date(self.date).getTime();
        var curDate = new Date().getTime()-1000*24*60*60;
			if(inputDate < curDate){
				alert('截止日期无效！！');
			}
			$('.bootstrap-datetimepicker-widget').hide();
    });
		// $('#meeting').change(function(){console.log('change事件');
		// 	self.date = $(this).val();
		// 	var inputDate = new Date(self.date).getTime();
		// 	var curDate = new Date().getTime()-1000*24*60*60;
		// 	if(inputDate < curDate){
		// 		alert('截止日期无效！！');
		// 	}
		// });
		$('#myModal').on('show.bs.modal', function (event) {
			  	var button = $(event.relatedTarget) 
			  	var what = button.data('what');
			  	if(self.date){	  		
			  		if(what === 'save'){
					text = '<p>问卷是否保存？（保存后可修改）</p><p>此问卷截至日期为: <span id="time">'+ self.date +'</span></p>'
					self.state = 'save'
					} else if(what === 'publish'){
						text = '<p>是否发布问卷？（保存后不可修改）</p><p>此问卷截至日期为: <span id="time">'+ self.date +'</span></p>'
						self.state = 'publish';
					}

			  	} else {
			  		text = '<p>日期不能为空！</p>'
			  	}		  	
				var modal = $(this);         
	            modal.find('.modal-body').html(text);//动态添加content
	           //  var $modal_dialog = modal.find('.modal-dialog');//弹出框居中
	           //  var m_top = ( $(document).height() - $modal_dialog.height() )/2;
	          	// $modal_dialog.css({'margin': m_top + 'px auto'});
			});
		$('#confrim').on('click',(function(event) {
			/* Act on the event */
			$('#myModal').on('hidden.bs.modal', function (event) {
				if(self.date)
		 		window.location.hash = '#listpage';
			
	    });	
		})
		);
		
			
	}
	;
	return {
		modalPage:modalPage
	}
});