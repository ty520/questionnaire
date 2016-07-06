//根据结果画出图表
define(['./qnpage','./echarts.min'],function(Q,Ec){
	var chartsPage = function(qn){
		//var qn = LS.getStorage(key);
		var questionArr = qn.content;
		var page = new Q.qnpage(qn);
		var len = questionArr.length;
		var temp = '';
		//在顶部加一个返回按钮
		$('h1').before('<span class="goback"><i class="glyphicon glyphicon-menu-left"></i> 返回</span>');
		$('span').click(function(){console.log('点击了');
			window.location.hash = '#listpage';
		});
		for(var i = 0; i < len; i++){
			temp += '<div class="charts"></div>';
		}
		$('.question').html(temp);

		for(var i = 0; i < len; i++){
			var div = $('.charts')[i];
			drawCharts(div, questionArr[i].type , i+1);			
		}
	  };
	 
	 
	function drawCharts(div, type, n){
		var option1 = {
            title: {
                //subtext: '数据占比'
            },
             legend: {
		        data: ['选项一', '选项二']
		    },
            tooltip: {
            	trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
            },
            xAxis: {
                  type: 'value'      			
            },
            yAxis: {
            	 type: 'category',
            	 data: ['数据占比']
            },
            series:[
		        {
		            name: '选项一',
		            type: 'bar',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'right'
		                }
		            },
		            data: []
		        },{
		            name: '选项二',
		            type: 'bar',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'right'
		                }
		            },
		            data: []
		        }
		       ]
		    
        };
        var option2 = {
		    title : {
		        subtext: '数据占比' 
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        right: 20,
		        data: ['选项一','选项二','选项三','选项四']
		    },
		    series : 
		        {
		            type: 'pie',
		            radius : '55%',
		            data:[
		                {value:310, name:'选项一'},
		                {value:234, name:'选项二'},
		                {value:135, name:'选项三'},
		                {value:1548, name:'选项四'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    
		};
		var option3 = {
			 title : {
		        //subtext: '有效内容占比' 
		    },
            tooltip: {
            	trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
            },
            xAxis: {
                  type: 'value'
            },
            yAxis: {
            	 type: 'category',
            	 data: ['有效内容占比']
            },
            series: 
		        {
		            name: '有效内容占比',
		            type: 'bar',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'right'
		                }
		            },
		            data: [Math.ceil((Math.random()*50)+ 50 )]
		        }
		    
        };
         var myChart = Ec.init(div);
		 var  romNum1 = Math.ceil(Math.random()*30 + 20) ,
		 		romNum2 = Math.ceil(Math.random()*100+100);
		 		romNum3 = Math.ceil(Math.random()*300+100);
		 		romNum4 = Math.ceil(Math.random()*300+200);
		 		romNum5 = Math.ceil(Math.random()*300+500);
		
		    switch (type){
		    	case 'radio': 
		    		option1.title.text = 'Q'+ n + '  单选题';
		    		option1.series[0].data[0] = romNum1 ;
		    		option1.series[1].data[0]= 100 - romNum1;
		    		myChart.setOption(option1);
		    		break;
		    	case 'checkbox':
		    		option2.title.text = 'Q'+ n + '  多选题';
		    		option2.series.data[0].value = romNum2;
		    		option2.series.data[1].value = romNum3;
		    		option2.series.data[2].value = romNum4;
		    		option2.series.data[3].value = romNum5;
		    		myChart.setOption(option2);
		    		break;
		    	case 'textarea':
		 			option3.title.text = 'Q'+ n + '  文本题';
		    		myChart.setOption(option3);
		    		break;
		    }       		    
	}	

	return {
		chartsPage:chartsPage
	}
						    		    	
});
		