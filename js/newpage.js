define(['./edit'],function(E){
	var createPageOne = function(){
		var createStr=' <div class="row page-1"> <div class="col-md-2"></div><div class="col-md-8"><a class="btn" href="#editpage" role="button" id="newpage"><span class="gglyphicon glyphicon-plus" aria-hidden="true"></span> 新建问卷</a><div class="col-md-2"></div></div>';
			$('.main').html(createStr);
			$('#newpage').click(function(){	
				var editpage = new E.editPage();						 	
	    });
	};
	
	return {
		//newPage:newPage,
		createPageOne:createPageOne
	};
});