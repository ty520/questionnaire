//读取浏览器中localStorage信息，显示问卷信息于pageList页面上
define(['./newpage','./listHandler'],function(N,L){
     var pageList = function(){
         this.renderPage3();
         this.handler();
     };
   pageList.prototype.renderPage3=function(){
     
     var key,qnObj,title,time,state,content;
    // var html=$('.main').html;
     var html='<div class="row page-3"><div class="col-md-2"></div><div class="col-md-8"><table class="table "> <thead><tr><td >标题</td><td ><span class="date">时间</span></td><td><span class="state">状态</span></td> <td>操作<span ><a class="btn btn-default" role="button" href="#newpage" id="createPaper" ><span class="glyphicon glyphicon-plus"></span> 新建问卷</a></span></td></tr></thead><tbody>';
     var dataLength=localStorage.length;
     var dt = new Date().getTime(); //将当前日期转换为毫秒数，以便后续比较
     for(var i=0;i<dataLength;i++)
     {
           key=localStorage.key(i);
           qnObj=JSON.parse(localStorage.getItem(key));//获取对应的数据并解析为原生js值
           //console.log("这是我的"+i+"问卷"+key+qnObj.state);
           title=qnObj.title;
           time=qnObj.time;
           state=qnObj.state;
           content=qnObj.content;
          switch(state.toString().trim())
          {
               case "save":   //‘未发布’状态包含编辑按钮
               html+=' <tr><td><p class="radio"></p>这是我的第'
               +(i+1)+'份调查问卷</td><td>'
               +time+'</td><td>未发布</td><td><span class="buttonGroup"><a class="btn btn-default edit " href="#editQnpage" role="button"  >问卷编辑</a><input class="btn btn-default delete" type="button" value="删除"><a class="btn btn-default readPaper" href="#qnpage" role="button" >查看问卷</a></span></td></tr>';
               break;
               case 'publish':   //‘发布中’状态不包含编辑按钮
               var endTime=new Date(time).getTime(); 
                if(endTime>dt)  //loacalStorage中的时间与当前时间进行比较
                {
                  html+=' <tr><td><p class="radio"></p>这是我的第'
               +(i+1)+'份调查问卷</td><td>'
               +time+'</td><td class="stateNow">发布中</td><td><span class="buttonGroup"><a class="btn btn-default readPaper" href="#chartspage" role="button" >查看数据</a><input class="btn btn-default delete" type="button" value="删除"><a class="btn btn-default readPaper" href="#qnpage" role="button" >查看问卷</a></span></td></tr>';
               
                }else{
                    html+=' <tr><td><p class="radio"></p>这是我的第'
               +(i+1)+'份调查问卷</td><td>'
               +time+'</td><td class="stateOver">已结束</td><td><span class="buttonGroup"><a class="btn btn-default readPaper" href="#chartspage" role="button" >查看数据</a><input class="btn btn-default delete" type="button" value="删除"><a class="btn btn-default readPaper" href="#qnpage" role="button" >查看问卷</a></span></td></tr>';
                
                }
               break;
          }
          
     }
     html+='<tr><td><p class="radio" id="selectAll"></p><span>全选</span><input class="btn btn-default" type="button" value="删除" id="deleteAll"></td><td></td><td></td><td></td></tr></tbody></table></div><div class="col-md-2"></div></div>';
     $('.main').html(html);
      $('.stateNow').css('color','green');
      $('.stateOver').css('color','red');
};
  pageList.prototype.handler=function(event){
     $('#createPaper').click(function() {
          /* Act on the event */
          var newpage = new N.createPageOne();

     });
     
      $('.page-3 .radio').on('click',function(event){
         L.listHander.selectHandler(event);
          
     });
      $('.edit').on('click',function(event){

           L.listHander.editHandler(event);

     });
      $('.delete').on('click',function(event){
         L.listHander.deleteHandler(event);
       });
      $('#deleteAll').on('click',function(event){
         L.listHander.deleteAllHandler(event);
       });
      $('.readPaper').on('click',function(event){
           L.listHander.readHandler(event);
      });
     // event.stopPropagation();
     };

 return {
          pageList:pageList
     };        
});
 