//为ListPage页面添加新建问卷、查看问卷、查看数据、编辑、删除问卷等事件
define(['./edit','./storage','./newpage','./editQnpage','./addModule','./deletePop','./qncharts','./qnpage'],function(E,Sl,Np,Eq,Ad,Dp,Qc,Qp){
	var listHander={
	selectHandler:function(event){
    var target=event.target;
		 var that=$(target).closest('tr');        
          /* Act on the event */
          if(target.id==="selectAll")    //点击全选——多选按钮与编辑按钮都被选中
          {
             if($(target).hasClass('checked'))
               {
                $('.radio').removeClass("checked");
                $('.edit').removeClass("checked");
               }else{
                $('.radio').addClass("checked");
                $('.edit').addClass("checked");
               }
          }else if($(target).is('.radio')){               //选中多选按钮，则将按钮全部选中或者取消选中
               $(event.target).toggleClass("checked");
                $(that).find('.edit').toggleClass("checked");
          }
     },
     editHandler:function(event){
        //获取其中的当前需要编辑问卷的key值
          var hang=$(event.target).closest('tr').prevAll().length; //寻找事件目标所在的行
          var key=localStorage.key(hang);
          var qnObj=JSON.parse(localStorage.getItem(key));
          var state=qnObj.state;
          var title=qnObj.title;
          if(state==="save")
          {    
               var editpage = new Eq.editQnpage(qnObj,key); 
               $('.wrap .btn').removeAttr("disabled");//在编辑问卷状态下，原本应该页面内容发生改变时 按钮启用，这里简单期间就直接启用了
          }else{
               alert("当前问卷不可编辑，出现错误！");
          }
     },
     deleteHandler:function(event){
      event.stopPropagation();
      Ad.addModule();
      Dp.center($('.notice'));      //弹出框居中
      var target=$(event.target);
      var position=[];
      position.push(target.closest('tr').prevAll().length);
      Dp.check(target,$('#sure'),$('#cancel'),position); 
     },
     deleteAllHandler:function(event){    //若为删除多项按钮，首先遍历按钮，查找选中的行放入checked[]数组中保存 
        event.stopPropagation();
        var radios=$('.radio');
        var checked=[],
            position=[];
        for(var i=0,len=radios.length;i<len;i++)  
       {
        // alert($(radios[i]).is('.checked'));
        if($(radios[i]).is('.checked'))
        {
          checked.push(radios[i]);
          position.push(i);
        }
      }
      if(checked.length<=0)        //若存在选中的行则删除，否则弹出警告无选中的元素
      {
        alert("请选择删除元素");
      }else{
       Ad.addModule();
        Dp.center();      //弹出框居中
        Dp.check(checked,$('#sure'),$('#cancel'),position);
      }
      

     },
     readHandler:function(event){
      var $target=$(event.target);
      var btnText = $target.text();console.log(btnText);
      var hang=$target.closest('tr').prevAll().length; //寻找事件目标所在的行
          var key=localStorage.key(hang);
          var qnObj=JSON.parse(localStorage.getItem(key));
          if(btnText === '查看问卷')
             var qnpage = new Qp.qnpage(qnObj);
          else
             var chartpage = new Qc.chartsPage(qnObj);        
     }
	};
	return {
    listHander:listHander
  };

});