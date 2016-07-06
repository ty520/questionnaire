//问卷信息存储于localStorage中，存储时判断licalStorage中的qn
define(function(){
	if(window.localStorage){
	 console.log('This browser supports localStorage');
	}else{
	 console.log('This browser does NOT support localStorage');
	}

	var num = ['一','二','三','四','五','六','七','八','九','十'];
	function saveStorage(state,date,title,qnArr,key){//点击编辑时传进来一个id例如 qn1
		//key判断是新存储新问卷还是编辑修改问卷	
		if(!key){
			var len = localStorage.length;
			var qnData = {};//超过十个问卷需要做些修改，不然直接用数字表示好了
			qnData.caption = '第'+num[len]+'份问卷';
			qnData.title = title;
			qnData.time = date;
			qnData.state = state;
			qnData.content = qnArr;

			var qnDatajson = JSON.stringify(qnData);//把数据序列化为json字符串
			var index=0;
			while(localStorage.getItem('qn'+index))//存储数据之前首先遍历localStorage
			{
				index++;
			}
			localStorage.setItem('qn'+index,qnDatajson);
			
		} else {
			var qnobj =JSON.parse(localStorage.getItem(key));//获取对应的数据并解析为原生js值
				qnobj.title = title;
				qnobj.time = date;
			 	qnobj.state = state;
			 	qnobj.content = qnArr;
			// var qnData = {};//超过十个问卷需要做些修改，不然直接用数字表示好了
			// qnData.caption = qnobj.caption;
			// qnData.title = title;
			// qnData.time = date;
			// qnData.state = state;
			// qnData.content = qnArr;
			var qnDatajson = JSON.stringify(qnobj);//把数据序列化为json字符串
	console.log(qnDatajson);		localStorage.setItem(key,qnDatajson);
		}		
	};
	function getStorage(key){
		var qnobj =JSON.parse(localStorage.getItem(key));
		return qnobj;
	};
	function delStorage(key){
		return localStorage.removeItem(key);
	};
	return {
	    saveStorage: saveStorage,
	    getStorage: getStorage ,
	    delStorage:delStorage	  
	};
});