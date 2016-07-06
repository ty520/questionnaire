define(function(){
	var addModule=function(){
	var moduleHtml='<div class="alert alert-warning alert-dismissible notice" role="alert"><span>提示</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div id="noticeContent"><p>确定要删除此问卷吗？</p><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn btn-default" id="sure">确定</button><button type="button" class="btn btn-default" id="cancel">取消</button></div></div></div><div id="mask"></div>';
		//若没有删除提示框则添加，有则不添加
		if(!($('#mask')[0]))
		{
			$(moduleHtml).appendTo('body');
			var scrollTop=$(document).scrollTop();
			$('#mask').css({'display':'block',top:scrollTop+'px'});
		}
	};
	return {
		addModule:addModule
	};
	});