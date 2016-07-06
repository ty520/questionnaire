//此页面是点击编辑按钮后生成的页面  需要穿入问卷编号 即在ls中的key值
define(['./edit','./modal','./qnpage','./storage'],function(E,M,Q,LS){
	var editQnpage = function(qnobj,key){
		//var qn = LS.getStorage(key);
		console.log(key);
		var questionArr = qnobj.content;//获取到原来数组中已有的数据并把它渲染出来
		var qnPage = new E.editPage(questionArr,qnobj.title,key);
		//qnPage.render.call(qnPage,key);
		qnPage.render();

	};
	return {
		editQnpage: editQnpage
	}

});