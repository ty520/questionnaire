/**
 * Created by lenovo on 2016-6-3.
 * * 此工程准备使用模式：单体模式，桥接模式，工厂模式，门面模式
 * 此文件主要由以下几个部分组成：
 * 1.初始化：画图以及方框的初始图形；
 * 2.动作：方框的各种行为使用工厂模式；
 * 3.触发事件：添加响应函数使用桥接模式，此处也属于门面模式（注，门面模式与桥接模式的区别在于目的是否是将实现与抽象分开）
 */
var getId={
    drawing:document.getElementById("rectangle"),
    command:document.getElementById("command"),
    refresh:document.getElementById("refresh"),
    canvas:document.getElementsByTagName("canvas")[0],
    text:document.getElementById("text"),
    rowNum:document.getElementById("rowNum"),
    //context:this.drawing.getContext("2d")
};
var context=getId.drawing.getContext("2d");
//————彩色块的动作变幻

var drawGraph={
    xGo:0,
    yGo:0,
    paint:function(){
        //绘制蓝色区域
        context.fillStyle="rgba(0,0,255,0.5)";
        context.fillRect(250+this.xGo+1,250+this.yGo+1,38,9);
        //绘制红色区域
        context.fillStyle="#ff0000";
        context.fillRect(250+this.xGo+1,260+this.yGo,38,29);
    },
    clearPoint:function(){
        //清除蓝色区域
        context.clearRect(250+this.xGo+1,250+this.yGo+1,38,9);
        //清除红色区域
        context.clearRect(250+this.xGo+1,260+this.yGo,38,29);
    },
    go:function(num){
        this.clearPoint();
        if((this.xGo+250>=410)&&(this.yGo+250<410))  //若达到表格最右侧则跳转至下一行的第一格
        {
            this.xGo=this.xGo-200-160;
            this.yGo+=40;
        } else if((this.yGo+250>=410)&&(this.xGo+250>370))  //到达表格的右下边，则跳转至第一格
        {
            this.xGo=this.xGo-360;
            this.yGo=this.yGo-360;
        }
        else
        {
            this.xGo=this.xGo+40*num;
        }
        this.paint();

    },
    tra:function(direction,num){

        this.clearPoint();
        if(direction==="TOP"||direction==="DOWN")  //上下方向调整纵坐标
        {
            this.yGo=this.yGo+40*num;
            if(this.yGo+250<50)
            {
                alert("已到达最上方！");
                this.yGo=-200;
            }else if(this.yGo+250>410)
            {
                alert("已到达最下方！");
                this.yGo=160;
            }
        }
       if(direction==="RIGHT"||direction==="LEFT")   //左右方向调整横坐标
       {
           this.xGo=this.xGo+40*num;
           if(this.xGo+250<50)
           {
               alert("已到达最左方！");
               this.xGo=-200;
           }else if(this.xGo+250>410)
           {
               alert("已到达最右方！");
               this.xGo=160;
           }
       }
        this.paint();
    },
    mov:function(direction,num){
        this.clearPoint();
        if(direction==="RIGHT"||direction==="LEFT")   //先确定是否可以左右移动
        {
            this.xGo=this.xGo+40*num;
            if(this.xGo+250<50)
            {
                alert("已到达最左方！");
                this.xGo=-200;
            }else if(this.xGo+250>410)
            {
                alert("已到达最右方！");
                this.xGo=160;
            }
            context.translate(250+this.xGo+40/2,250+this.yGo+40/2); //调整旋转中心
            var x1=-(250+this.xGo+40/2)+(250+this.xGo+1);         //重新确定起始坐标
            var y1=-(250+this.yGo+40/2)+(250+this.yGo+1);
            var x2=-(250+this.xGo+40/2)+(250+this.xGo+1);
            var y2=-(250+this.yGo+40/2)+(260+this.yGo);
            if(direction==="LEFT")              //调整方向
            {
                context.rotate(-Math.PI/2);                  //设置旋转角度
                //绘制蓝色区域
                context.fillStyle="rgba(0,0,255,0.5)";
                context.fillRect(x1,y1,38,9);
                //绘制红色区域
                context.fillStyle="#ff0000";
                context.fillRect(x2, y2,38,29);
            }
            if(direction=="RIGHT")
            {
                context.rotate(Math.PI/2);                  //设置旋转角度
                //绘制蓝色区域
                context.fillStyle="rgba(0,0,255,0.5)";
                context.fillRect(x1,y1,38,9);
                //绘制红色区域
                context.fillStyle="#ff0000";
                context.fillRect(x2,y2,38,29);
            }

        }

    }
};
//————利用闭包处理各个模块间的交互关系
var blockGame=(function(){     //单体模式
    var leftDis=50,
         rightDis=50,
         blockWidth=400,
         blockHeight=400;
    getId.canvas.width=500;
    getId.canvas.height=500;
   // var context=getId.drawing.getContext("2d");
    var xGo=0,yGo=0;
    function init(){
        if(getId.drawing.getContext) {
            context.lineWidth = 1;
            context.strokeStyle = "#000000";
            context.strokeRect(leftDis, rightDis, blockWidth, blockHeight);
            context.font = "bold 1em Arial";         //字体设置
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.beginPath();                    //开始路径
            for (var i = 1; i <= 10; i++) {
                var position = leftDis + i *blockWidth/10;   //长：400，宽：400，每个单元格为40
                //绘制横向文本
                context.fillText(i.toString(), (position - leftDis/2), leftDis/2);
                //绘制纵向文本
               context.fillText(i.toString(), leftDis/2, (position - leftDis/2));
               context.lineWidth = 0.5;
                //画竖线
               context.moveTo(position, leftDis);
               context.lineTo(position, blockWidth+leftDis);
                //画横线
                context.moveTo(leftDis, position);
                context.lineTo(blockWidth+leftDis, position);
            }
            context.stroke();
            drawGraph.paint();
            //draw.go(2);
            //button.onclick=moveAction;
        }
    }
    init();
})();

//————Textarea组件左侧的行号显示，事件响应函数
//getId.text.onkeyup=function(){
//    var value=getId.text.value;
//    var rows=value.split("\n");
//    var arr=[];
//    var top=getId.text.scrollTop;
//    for(var i=0;i<rows.length;i++)
//    {
//        arr.push("<p>"+(i+1)+"</p>");
//    }
//    getId.rowNum.innerHTML=arr.join("");
//    getId.rowNum.scrollTop=top;//设置行号区域高度和多行文本输入控件一样
//};


var handler={
    //验证指令的合法性
    validateCommand:function(str){
        var command=["GO","MOV","TRA"];
        var direction=["TOP","LEFT","RIGHT","DOWN"];
        var result1,
             result2=true,
             result3=true;
        if(command.indexOf(str[0])===-1)
            return false;
        if(str[0]==="GO")
        {
            if(str.length!==2)
            return false;
        }else if(str[0]==="MOV"||str[0]==="TRA")
        {
            if(str.length!==3)
            return false;
        }
        if(str.length===2||str.length===3)
        {
            if(str.length===2)
            {
              if (!(/^\d+$/.test(str[1])))
              return false;
            }else
            {
                if(!(/^\d+$/.test(str[2]))||direction.indexOf(str[1])===-1)
                    return false;
            }
        }else{
           return false;
        }
    },
    getText:function(){
        var context=getId.text.value.toUpperCase().trim();
        var arr=[];
        var result={};
        if(document.all)  //判断是不是IE浏览器
        {
            arr=context.split("\r\n");
        }else{
            arr=context.split("\n");
        }
        for(var i=0;i<arr.length;i++)
        {
            var  result=arr[i].split(" ");//将命令和步数分开
            //验证指令的合法性
            var validateResult= handler.validateCommand(result);
            if(validateResult===false)
            {
                arr.splice(i,1);
                var para=document.getElementsByTagName("p");
                para[para.length-1].style.backgroundColor="red";
            }
        }
        return( arr);
    }
};

//门面模式/桥接模式
var EventUtil={
    addHandler:function(element,type,handler){    //memoization,因有参数，暂时用不了
        if(element.addEventListener)
        {
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent)
        {
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    }
};
//单击执行时的事件响应函数
EventUtil.addHandler( getId.command,"click",function(){
    var currentCom= handler.getText();
    var  i=0;
    var content=[];
    var action=function(){
        if(i<currentCom.length)
        {
            content=currentCom[i].split(" ");
            switch(content[0])
            {
                case "GO":
                    drawGraph.go(content[1]);
                    break;
                case "TRA":
                    if(content[1]==="TOP"||content[1]==="LEFT")
                    {
                        drawGraph.tra(content[1],-content[2]);
                    }
                    else  drawGraph.tra(content[1],content[2]);
                    break;
                case "MOV":
                    if(content[1]==="TOP"||content[1]==="LEFT")
                    {
                        drawGraph.mov(content[1],-content[2]);
                    }
                    else  drawGraph.mov(content[1],content[2]);
                    break;

            }
        }else{
            clearInterval(timer);
        }
        i++;
    }
    var timer=setInterval(action,500);
});
EventUtil.addHandler(getId.text,"keyup",function(){
    var value=getId.text.value;
    var rows=value.split("\n");
    var arr=[];
    var top=getId.text.scrollTop;
    for(var i=0;i<rows.length;i++)
    {
        arr.push("<p>"+(i+1)+"</p>");
    }
    getId.rowNum.innerHTML=arr.join("");
    getId.rowNum.scrollTop=top;//设置行号区域高度和多行文本输入控件一样
})();
