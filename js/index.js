//页面入口
requirejs.config({
	 baseUrl: 'js',
     paths: {
        "jquery":["jquery-1.12.4.min"] ,
        "bootstrap":["../bootstrap-3.3.5-dist/js/bootstrap.min"],
        "datetime":["bootstrap-datetimepicker.min"] ,
        "datetimepicker":["./locales/bootstrap-datetimepicker.fr"]
    },
    // shim: {
    // 	bootstrap: {
    // 		deps: ['jquery']
    // 	}
    // }
    
});
require(['bootstrap',
		'datetime',
		'datetimepicker',
		'./newpage',
		'./edit',
		'./modal',
		'./qnpage',
		'./editQnpage',
		'./qncharts',
		'./pageList',
		'./listHandler',
		'./addModule',
		'./deletePop'
		],
	function (bootstrap,D,Dp,N,E,M,Q,Eq,Qc,Pl,Lh,Ad,Dpo){
		var newPage = function(){
			//根据localStorage中的数据长度决定使用01-01页面还是使用02-01页面
			var dataLength=localStorage.length;
			if(dataLength)  //若本地客户端localStorage存储有问卷，则读取localStorage并显示01-01
			{
				window.location.hash = '#listpage';
				var listpage = new Pl.pageList(); 

			}else{					//localStorage无问卷，显示创建页面
				window.location.hash = '#newpage';
				N.createPageOne();
			}
		}
		newPage();
		//点击我的问卷的时候返回主页；
		//前进后退实现
		
		window.onhashchange = function(){//前进后退hash发生改变时要生成相应的页面
			switch (window.location.hash){
				case '#listpage':
					var listpage = new Pl.pageList();
					break;
				case '#newpage':
					var newpage = new N.createPageOne();					
					break;
				case '#editpage':
					var editpage = new E.editPage();					
					break;
				case '#chartspage':
					var chartspage = new Qc.chartsPage();			
					break;
				case '#qnpage' :
					var qnpage = new Q.qnpage();				
					break;
				}
		};

		var qn = { 
	    "caption":"第一份问卷",
	    "time":"2016-6-15",
	    "state":"未发布",
	    "title":"性格分析调查表",
	    "content":[
	        {
	          "question":"性别",
	          "type":"radio",
	          "options":["男","女"]
	        },
	        {
	          "question":"爱吃的水果",
	          "type":"radio",
	          "options":["苹果","梨"]
	        },
	        {
	          "question":"单选题",
	          "type":"radio",
	          "options":["选项一","选项二"]
	        },
	         {
	          "question":"喜欢的运动",
	          "type":"checkbox",
	          "options":["跑步","跳绳","游泳","打羽毛球"]
	        },
	         {
	          "question":"喜欢的动物",
	          "type":"checkbox",
	          "options":["猫","狗","大狗","二狗"]
	        },
	         {
	          "question":"喜欢的颜色",
	          "type":"checkbox",
	          "options":["黄色","绿色","白色","红色"]
	        },
	         {
	          "question":"自我评价",
	          "type":"textarea"
	        }
	        ]
    	}
    	//Q.qnpage(qn);
    	//Eq.editQnpage(qn);
    	//Qc.chartsPage(qn);

});