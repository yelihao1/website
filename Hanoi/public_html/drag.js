var winWidth1=0;
var winHeight1=0;
var Height1=0;
var LEFT=0;
var TOP=0;
var i1=0;
var i2=0;
var bool=0;
var time1=0
var Cart = (function(){
    var winWidth = 0;//窗口的宽度
    var winHeight = 0;//窗口的高度
    var Cart = {};
    
    //存储动画的数组
    var move1 = new Array();
    //动画的顺序
    var order = 0;//动画移动每一步的次数(上移就算一次)
      //次数
    var alltime=0 //动画执行的时间
    var id1=6;
    Cart.number=0;//存放方块的数量
    var color1;//方块颜色
    var color2;//竖棒颜色
    var color3;//底座颜色
    
    //日志输出
    var $txt = undefined;
    var $detaillog = undefined;
    
    //3个底座的数组
    Cart.A = new Array();
    Cart.B = new Array();
    Cart.C = new Array();
    //3个底座的名字
    Cart.A.name = 'A';
    Cart.B.name = 'B';
    Cart.C.name = 'C';
    //三个底座的顺序号
    Cart.A.val = 1;
    Cart.B.val = 2;
    Cart.C.val = 3;
    //底座的top值
    Cart.defTop = 0;
    //盘子的高度
    Cart.height = 0;
    //存放每个底座当前方块的数量
    Cart.A.i=0;
    Cart.B.i=0;
    Cart.C.i=0;
    //存放每个底座中每个方块的宽
    Cart.A.wd=new Array();
    Cart.B.wd=new Array();
    Cart.B.wd[0]=0;
    Cart.C.wd=new Array();
    Cart.C.wd[0]=0;

    //已经开始动画
    Cart.isStart = false;
    //动画完成
    Cart.complete = false;
    
    //日志对象赋值
    Cart.setText = function(elem1,elem2){
        $txt = $(elem1);
        $detaillog = $(elem2);
    }
    //显示日志
    Cart.showText = function(targ,str){
        if(targ!=undefined){
            targ.text(targ.text()+'\n'+str);
            targ.scrollTop(targ[0].scrollHeight);
        }
    }
    //清空日志
    Cart.clearText = function(targ){
        if(targ!=undefined){
            targ.text('');
        }
    }
    
    //获取数组的下一个位置的top
    Cart.getArrNextTop = function(arr){
        var length = arr.length;
        return Cart.defTop - (length+1)*Cart.height;
    }
    
    //获取数组的当前的top
    Cart.getArrCurrTop = function(arr){
        var length = arr.length;
        if(length == 0){
            return Cart.defTop;
        }
        else{
            return Cart.defTop - (length)*Cart.height;
        }
    }
    //获取当前底座最上方的方块宽度
    Cart.getwidth = function(arr){
        return arr.wd[arr.i];   
    }
    //获取当前底座最上方一面一个的方块宽度
   Cart.getnextwidth = function(arr){
       arr.wd[arr.i]=0;
       if(arr.i>=1)
        arr.i= arr.i-1; 
       return arr.wd[arr.i];
    }
    //默认属性
    Cart.options = {
        speed:500,     //移动速度
        highlight:true,//移动过程是否变色
        color:'red',   //移动过程中变色
        xjg:250   //横向间隔 250px
    };
    
    /**
     * _from  :从哪个位置 A,B,C
     * _to    :到哪个位置 A,B,C2
     * options:参数
     **/


    Cart.move2 = function(_from,_to,options){//拖动
        //获取当前对象的属性 - 判断盘子先上还是下，上下高度是多少...不遮挡
        if(_from.length==0){
            //没有可以移动的盘子
            console.err(_from.name+'中不存在可移动的盘子');
          
            return;
        }
        //输出最上方方块的宽度
         console.log(_from.wd[_from.i]);
         console.log(_from.i);
         console.log(_to.wd[_to.i]);
         console.log(_to.i);
        //判断是否可以进行移动
        console.log( '目的地宽度1'+_to.wd[_to.i]);
        if(_from.wd[_from.i]>_to.wd[_to.i]&&_to.wd[_to.i]!=0)
        {   
            alert('不能这么移!'); 
            $('#id_'+i2).css('top',TOP);
            $('#id_'+i2).css('left',LEFT);
            bool=1;
            return;
        }
        var opt = $.extend(Cart.options,options);
        //得到要移动方块的宽度
        var width3=Cart.getwidth(_from);
        if(_to.wd[_to.i]!=0)
            _to.i++;
        //目的地最上方的方块宽度就是要移动的方块
        _to.wd[_to.i]=width3;
        //得到方块离开之后，移动起始位置最上分方块的宽度
        var width4=Cart.getnextwidth(_from);
        //起始位置最上方的方块宽度进行修改
        _from.wd[_from.i]=width4;
       
        //获取当前的高度
        var _ftop = Cart.getArrCurrTop(_from);//

        //取出要移动的盘子
        var _felem = _from.pop();
        
        //获取目标位置高度
        var _ttop = Cart.getArrNextTop(_to);//
        //上面获取高度后，就可以将对象_felem放进去了
        _to.push(_felem);
        //计算两者间距
        var _jg = Math.abs(_from.val - _to.val);
        //通过_fx来表示方向
        var _fx = (_from.val - _to.val)>0?-1:1;
        //间距1为相邻，间距2为隔一个..隔一个的时候，需要考虑中间的高度，中间的必然是Cart.B      
    }



    Cart.move1 = function(_from,_to,options){
        //获取当前对象的属性 - 判断盘子先上还是下，上下高度是多少...不遮挡
        if(_from.length==0){
            //没有可以移动的盘子
            console.err(_from.name+'中不存在可移动的盘子');     
            return;
        }
        //输出最上方方块的宽度
         console.log(_from.wd[_from.i]);
         console.log(_from.i);
         console.log(_to.wd[_to.i]);
         console.log(_to.i);
        //判断是否可以进行移动
        console.log( '目的地宽度1'+_to.wd[_to.i]);
        if(_from.wd[_from.i]>_to.wd[_to.i]&&_to.wd[_to.i]!=0)
        {   
            alert('不能这么移!'); 
            $('#id_'+i1).css('top',TOP);
            $('#id_'+i1).css('left',LEFT);
            bool=1;
            return;
        }
        var opt = $.extend(Cart.options,options);
        //得到要移动方块的宽度
        var width3=Cart.getwidth(_from);
        if(_to.wd[_to.i]!=0)
            _to.i++;
        //目的地最上方的方块宽度就是要移动的方块
        _to.wd[_to.i]=width3;
        //得到方块离开之后，移动起始位置最上分方块的宽度
        var width4=Cart.getnextwidth(_from);
        //起始位置最上方的方块宽度进行修改
        _from.wd[_from.i]=width4;
       
        //获取当前的高度
        var _ftop = Cart.getArrCurrTop(_from);//

        //取出要移动的盘子
        var _felem = _from.pop();
        
        //获取目标位置高度
        var _ttop = Cart.getArrNextTop(_to);//
        //上面获取高度后，就可以将对象_felem放进去了
        _to.push(_felem);
      
        //计算两者间距
        var _jg = Math.abs(_from.val - _to.val);
        //通过_fx来表示方向
        var _fx = (_from.val - _to.val)>0?-1:1;
        //间距1为相邻，间距2为隔一个..隔一个的时候，需要考虑中间的高度，中间的必然是Cart.B
        if(_jg == 1){
            //直接比较两者高度..
            if(_ftop == _ttop){
                //横着移动过去就OK
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left:_fx*opt.xjg},
                    options:opt
                });
            }
            else if(_ftop<_ttop){
                //横移
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left:_fx*opt.xjg},
                    options:opt,
                    log:false
                });
                //下落
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{top:_ttop},
                    options:opt
                });
            }
            else{
                //向上移动
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{top:_ttop},
                    options:opt,
                    log:false
                });
                //横移
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left:_fx*opt.xjg},
                    options:opt
                });
            }
        }
        else{
            //next - 因为要从B上面经过...
            var _btop = Cart.getArrNextTop(Cart.B);
            //获取最高值
            var _min = Math.min.call({},_btop,_ftop,_ttop);
            if(_min == _btop){
                if(_min<_ftop){
                    //向上移动
                    move1.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_min},
                        options:opt,
                        log:false
                    });
                }
                //横移
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left:_fx*opt.xjg*2},
                    options:opt
                });
                if(_min<_ttop){
                    //下落
                    move1.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_ttop},
                        options:opt,
                        log:false
                    });
                }
            }
            else if(_min == _ftop){
                //横移
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left:_fx*opt.xjg*2},
                    options:opt
                });
                if(_min<_ttop){
                    //下落
                    move1.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_ttop},
                        options:opt,
                        log:false
                    });
                }
            }
            else if(_min == _ttop){
                if(_min<_ftop){
                    //向上移动
                    move1.push({
                        elem:_felem,
                        from:_from.name,
                        to:_to.name,
                        end:{top:_min},
                        options:opt,
                        log:false
                    });
                }
                //横移
                move1.push({
                    elem:_felem,
                    from:_from.name,
                    to:_to.name,
                    end:{left:_fx*opt.xjg*2},
                    options:opt
                });
            }
        }
    }
    Cart.getmove1 = function(){
        return move1;
    }
    
    function play2(){  //手动移动汉诺塔
        if(order<move1.length){
            var time = move1[order].options.speed;
            Cart.move1.move(move1[order],order);
            order++;
            setTimeout(play2,time<300?300:time);
        }
        else{
            setTimeout(function(){
                Cart.complete = true;
            },1000);
        }
    
    }
    Cart.move1.play1 = function(){
            play2();       
    }

    //该方法用于前台获取该数组，测试使用 - 实际代码中没有用到
 
    //播放动画
    function play(){
        if(!Cart.isStart){
            alert('终止运行');
            return;
        }
        if(order<move1.length){
            var time = move1[order].options.speed;
            Cart.move1.move(move1[order],order);
            order++;
            setTimeout(play,time<300?300:time);
        }
        else{
            setTimeout(function(){
                Cart.complete = true;
                alltime=new Date()-alltime;
                Cart.showText($txt,'移动完成！！！');
                Cart.showText($txt,'结束时间:'+new Date().toLocaleTimeString());//当前时间
                Cart.showText($txt,'运行时间:'+alltime/1000+'s');//运行时间
                alert('移动完成!');
            },1000);
        }
    }
    
    //执行播放动画
    Cart.move1.play = function(){
        if(move1.length>0&&order==0){
            //执行动画
            alltime=new Date();
            Cart.showText($txt,'开始时间:'+new Date().toLocaleTimeString());
            play();
        }
    }
    
    //移动对象 - 动画
    Cart.move1.move = function(param,order){  
        if("top" in param.end){
            $(param.elem).animate({top:param.end.top},param.options.speed,function(){
                if('log' in param){
                
                }
                else{
                    
                    Cart.showText($detaillog,'第:'+time1+'次 '+' pation:'+param.from+' - > '+param.to);
                    time1=time1+1;
                }
            
            });
        }
        else{
            $(param.elem).animate({left:'+='+param.end.left+'px'},param.options.speed,function(){
                if('log' in param){
                
                }
                else{
                    
                    Cart.showText($detaillog,'第:'+time1+'次 '+' pation:'+param.from+' - > '+param.to);
                    time1=time1+1;
                }
            
            });
        }
    }
    function findDimensions() //函数：获取尺寸
        {
             //获取窗口宽度
             if (window.innerWidth)
                   winWidth = window.innerWidth;
             else if ((document.body) && (document.body.clientWidth))
                   winWidth = document.body.clientWidth;
             //获取窗口高度
             if (window.innerHeight)
                   winHeight = window.innerHeight;
             else if ((document.body) && (document.body.clientHeight))
                   winHeight = document.body.clientHeight;
           
             //通过深入Document内部对body进行检测，获取窗口大小
             if (document.documentElement  && document.documentElement.clientHeight &&
                                                  document.documentElement.clientWidth)
             {
                 winHeight = document.documentElement.clientHeight;
                 winWidth = document.documentElement.clientWidth;
             }
             //结果输出至两个文本框
             
        }
    //初始化
    //num : 盘子数量
    Cart.initBlock = function(num){



        findDimensions(); //获取窗口的大小
        Cart.options.xjg=winWidth*0.21;
        document.getElementById( "view" ).style.height=winHeight*0.4;
        //清空原有内容
        $('#block').empty();
        color1=$('#color1').val();
        color2=$('#color2').val();
        color3=$('#color3').val();
        console.log(color1);
        idi=9;
        //初始化每个底座上方块的数量
        Cart.A.i=0;
        Cart.B.i=0;
        Cart.C.i=0;
        //初始化每个底座首地址的宽度
        Cart.A.wd[0]=0;
        Cart.B.wd[0]=0;
        Cart.C.wd[0]=0;
        //清空数组
        Cart.A.length = 0;
        Cart.B.length = 0;
        Cart.C.length = 0;
        move1.length = 0;
        order = 0;
        time1=0;//次数初始化
        Cart.clearText($txt);//文本框清空
        Cart.clearText($detaillog);//文本框清空
        Cart.isStart = false;
        winWidth1=winWidth; 
        winHeight1=winHeight;
        Cart.number=num;
       
        var opt = {
            maxWidth:winWidth*0.13,
            minWidth:winWidth*0.05,
            height:winHeight*0.4,
            minHeight:5
        },	
        //起始坐标
        start = {top:480,left:winWidth*0.075},
        _height,_width,h1;
        opt.height=winWidth*0.2;
        
        _height = opt.height/num -1;

        
        Cart.defTop = start.top;
        Cart.height = _height+1;
        Height1=_height;
        if(start.top-num*(_height)<0){
            alert("输入的数量太大，以至于块的高度超出范围,请重试!");
            return;
        }
        
        h1 = (opt.maxWidth - opt.minWidth)/(2*num);
        if(h1 == 0){
            alert("输入的数量太大,以至于每个块的宽度差小于2px,请重试!");
            return;
        }
        document.getElementById( "sg1" ).style.backgroundColor=color2;  //底座和竖棒颜色按文本框中输入变换    
        document.getElementById( "sg2" ).style.backgroundColor=color2;   
        document.getElementById( "sg3" ).style.backgroundColor=color2;   
        document.getElementById( "dizuo1" ).style.backgroundColor=color3;      
        document.getElementById( "dizuo2" ).style.backgroundColor=color3;   
        document.getElementById( "dizuo3" ).style.backgroundColor=color3;  
        //开始创建 - 数字小的在最上面
        for(var i = 0;i<num;i++){
            Cart.A.i=i;
            Cart.A.wd[i]=opt.maxWidth - i*2*h1;
            console.log(Cart.A.wd[i]);
            Cart.createBlock(
            {
                order:(num-i),
                top:start.top-((i+1)*(_height+1)),
                left:(start.left+h1*i),
                height:_height,
                width:opt.maxWidth - i*2*h1
            });
        }
       

    }
    
    //创建盘子
    Cart.createBlock = function(position){
        
        $('<div>').addClass('block')
              .addClass('bl'+position.order)
              .css({
                top:position.top,
                left:position.left,
                height:position.height,
                width:position.width,
		
                                 })         
              .appendTo($('#block'));
              var dlall=document.getElementsByTagName('div');
              console.log(idi);
              dlall[idi].id='id_'+idi;
              document.getElementById('id_'+idi ).style.backgroundColor=color1; //每个方块颜色按文本框中输入变换  
              idi++;  
        Cart.A.push('.bl'+position.order);
    }
    //开始
    Cart.start = function(n){
        Cart.move(n,Cart.A,Cart.B,Cart.C);
    };

    //汉诺塔移动算法
    Cart.move = function(n,a,b,c){
        if(n>=1){
            Cart.move(n-1,a,c,b);
            Cart.move1(a,c,{});
            Cart.move(n-1,b,a,c);
        }
    }
    Cart.show=function()//展示结束后运行的时间
    {
        alltime=new Date()-alltime;  
        Cart.showText($txt,'移动完成！！！');
        Cart.showText($txt,'结束时间:'+new Date().toLocaleTimeString());//当前时间
        Cart.showText($txt,'手动移动用时:'+alltime/1000+'s');//运行时间
        alert('移动完成!');
    }
    Cart.A_B = function(){   /////////////////////////////////////////
        if(time1==0)//判断是否开始
        {   
            time1=time1+1;
            alltime=new Date();
            Cart.showText($txt,'开始时间:'+new Date().toLocaleTimeString());
        }
        Cart.move1(Cart.A,Cart.B,{});
    }
    Cart.B_C = function(){   /////////////////////////////////////////
        Cart.move1(Cart.B,Cart.C,{});
           if(Cart.C.i==Cart.number-1)//判断是否结束
           Cart.show();
    }
    Cart.A_C = function(){   /////////////////////////////////////////
        if(time1==0)//判断是否开始
        {   
            time1=time1+1;
            alltime=new Date();
            Cart.showText($txt,'开始时间:'+new Date().toLocaleTimeString());
        }
        Cart.move1(Cart.A,Cart.C,{});
        if(Cart.C.i==Cart.number-1)
           Cart.show();
    }
    Cart.C_B = function(){   /////////////////////////////////////////
        Cart.move1(Cart.C,Cart.B,{});
    }
    Cart.B_A = function(){   /////////////////////////////////////////
        Cart.move1(Cart.B,Cart.A,{});
    }
    Cart.C_A = function(){   /////////////////////////////////////////
        Cart.move1(Cart.C,Cart.A,{});
    }


    Cart.A_B1 = function(){   /////////////////////////////////////////
        if(time1==0)//判断是否开始
        {   
            
            alltime=new Date();
            Cart.showText($txt,'开始时间:'+new Date().toLocaleTimeString());
            time1=time1+1;
        }
        Cart.move2(Cart.A,Cart.B,{});
    }
    Cart.B_C1 = function(){   /////////////////////////////////////////
        Cart.move2(Cart.B,Cart.C,{});
           if(Cart.C.i==Cart.number-1)//判断是否结束
           Cart.show();
    }
    Cart.A_C1 = function(){   /////////////////////////////////////////
        if(time1==0)//判断是否开始
        {
            alltime=new Date();
            Cart.showText($txt,'开始时间:'+new Date().toLocaleTimeString());
            time1=time1+1;
        }
        Cart.move2(Cart.A,Cart.C,{});
        if(Cart.C.i==Cart.number-1)
           Cart.show();
    }
    Cart.C_B1 = function(){   /////////////////////////////////////////
        Cart.move2(Cart.C,Cart.B,{});
    }
    Cart.B_A1 = function(){   /////////////////////////////////////////
        Cart.move2(Cart.B,Cart.A,{});
    }
    Cart.C_A1 = function(){   /////////////////////////////////////////
        Cart.move2(Cart.C,Cart.A,{});
    }

    Cart.drag= function(i1){
        var x=0; 
        var y=0; 
        var x1=0; 
        var y1=0; 
        
        $('#id_'+i1).mousedown(function(ev){ 
            var widthtop_A=parseInt(Cart.getwidth(Cart.A));//获得每个柱子最上方方块的宽度
            var widthtop_B=parseInt(Cart.getwidth(Cart.B));
            var widthtop_C=parseInt(Cart.getwidth(Cart.C));
            bool=0;
            x=ev.pageX;//鼠标指向坐标
            y=ev.pageY;
            console.log('左坐标x'+x);
            console.log('高坐标y'+y);
            LEFT=$('#id_'+i1).css("left");//保存原来的位置
            TOP=$('#id_'+i1).css("top");
            var width1=$('#id_'+i1).css("width");//保存原来的位置
            var height1=$('#id_'+i1).css("height");
       
            $(document).mousemove(function(ev){ 
                console.log('左坐标x'+ev.pageX);
                console.log('高坐标y'+ev.pageY);
            $('#id_'+i1).css('left',parseInt(ev.pageX)-parseInt(width1)-winWidth*0.125);//做到鼠标和方块一块移动 
            $('#id_'+i1).css('top',parseInt(ev.pageY)-parseInt(height1)-330);
            console.log("高度:"+height1)
            console.log("宽度:"+width1)

            x1=ev.pageX-x;
            y1=ev.pageY-y;
            }) 
            $(document).mouseup(function(){ 

            $(this).off();
            var left_A=parseInt($('#id_'+i1).css("left"));
            var WIDTH=parseInt($('#id_'+i1).css("width"));
            
            console.log('物体左位置'+left_A)
            console.log('a左位置'+winWidth1*0.7*0.1)//根据所在位置判断在第几根柱
            if(winWidth1*0.7*0.1<=left_A&&left_A<=winWidth1*0.7*0.35)//A目的地
            {
                if(winWidth1*0.7*0.36<=parseInt(LEFT)&&parseInt(LEFT)<=winWidth1*0.7*0.65)//B->A
                {
                    console.log("最顶宽度"+parseInt(Cart.getwidth(Cart.B)));
                    console.log("拖动物体宽度"+WIDTH);
                if((widthtop_B!=WIDTH)&&(widthtop_B+1!=WIDTH))
                {
                    $('#id_'+i1).css('top',TOP);
                    $('#id_'+i1).css('left',LEFT);
                    return;
                }
                console.log('B柱子');
                Cart.isStart = true;
                i2=i1;
                Cart.B_A1();	
                if(bool==0)
                {
                $('#id_'+i1).css('top',480-Height1*(Cart.A.i+1));
                var left2=winWidth1*0.7*0.1+(winWidth1*0.7*0.2-parseInt($('#id_'+i1).css("width")))/2;
                $('#id_'+i1).css('left',left2);
                Cart.showText($detaillog,'the:'+time1+'time '+' pation:B'+' - > A');
                time1=time1+1;
                }
                }
                else if(winWidth1*0.7*0.66<parseInt(LEFT)&&parseInt(LEFT)<=winWidth1*0.7*0.9)//C->A
                {   
                    if((widthtop_C!=WIDTH)&&(widthtop_C+1!=WIDTH))
                    {
                        $('#id_'+i1).css('top',TOP);
                        $('#id_'+i1).css('left',LEFT);
                        return;
                    }
                    console.log('C柱子');
                    Cart.isStart = true;
                    i2=i1;
                    Cart.C_A1();	
                    if(bool==0)
                    {
                    $('#id_'+i1).css('top',480-Height1*(Cart.A.i+1));
                    var left2=winWidth1*0.7*0.1+(winWidth1*0.7*0.2-parseInt($('#id_'+i1).css("width")))/2;
                    $('#id_'+i1).css('left',left2);
                    Cart.showText($detaillog,'the:'+time1+'time '+' pation:B'+' - > A');
                    time1=time1+1;
                    }
                }
                else //A->A
                {   console.log('返回')
                    $('#id_'+i1).css('top',TOP);
                    $('#id_'+i1).css('left',LEFT);
                }
            }
            else if(winWidth1*0.7*0.36<left_A&&left_A<=winWidth1*0.7*0.65)//B目的地
            {
                if(winWidth1*0.7*0.1<=parseInt(LEFT)&&parseInt(LEFT)<=winWidth1*0.7*0.35)//A->B
                {   console.log("最顶宽度"+widthtop_A);
                    console.log("拖动物体宽度"+WIDTH);
                    if((widthtop_A!=WIDTH)&&(widthtop_A+1!=WIDTH))
                    {
                        $('#id_'+i1).css('top',TOP);
                        $('#id_'+i1).css('left',LEFT);
                        return;
                    }  
                console.log('A柱子');
                Cart.isStart = true;
                i2=i1;
                Cart.A_B1();	
                if(bool==0)
                {
                $('#id_'+i1).css('top',480-Height1*(Cart.B.i+1));
                var left2=winWidth1*0.7*0.4+(winWidth1*0.7*0.2-parseInt($('#id_'+i1).css("width")))/2;
                $('#id_'+i1).css('left',left2);
                Cart.showText($detaillog,'the:'+time1+'time '+' pation:A'+' - > B');
                time1=time1+1;
                }
                }
                else if(winWidth1*0.7*0.66<parseInt(LEFT)&&parseInt(LEFT)<=winWidth1*0.7*0.9)//C->B
                {   if((widthtop_C!=WIDTH)&&(widthtop_C+1!=WIDTH))
                    {
                        $('#id_'+i1).css('top',TOP);
                        $('#id_'+i1).css('left',LEFT);
                        return;
                    } 
                    console.log('C柱子');
                    Cart.isStart = true;
                    i2=i1;
                    Cart.C_B1();	
                    if(bool==0)
                    {
                    $('#id_'+i1).css('top',480-Height1*(Cart.B.i+1));
                    var left2=winWidth1*0.7*0.4+(winWidth1*0.7*0.2-parseInt($('#id_'+i1).css("width")))/2;
                    $('#id_'+i1).css('left',left2);
                    Cart.showText($detaillog,'the:'+time1+'time '+' pation:C'+' - > B');
                    time1=time1+1;
                    }
                }
                else //B->B
                {   console.log('返回')
                    $('#id_'+i1).css('top',TOP);
                    $('#id_'+i1).css('left',LEFT);
                }
            }
            else if(winWidth1*0.7*0.66<=left_A&&left_A<=winWidth1*0.7*0.9)//目的地C
            {   
                if(winWidth1*0.7*0.1<=parseInt(LEFT)&&parseInt(LEFT)<=winWidth1*0.7*0.35)//A->C
                {
                    if((widthtop_A!=WIDTH)&&(widthtop_A+1!=WIDTH))//判断是否移动的是该柱最上方
                    {
                        $('#id_'+i1).css('top',TOP);
                        $('#id_'+i1).css('left',LEFT);
                        return;
                    } 
                console.log('A柱子');
                Cart.isStart = true;
                i2=i1;
                Cart.A_C1();	
                if(bool==0)//判断是否可以移动不能小盘叠大盘
                {
                $('#id_'+i1).css('top',480-Height1*(Cart.C.i+1));
                var left2=winWidth1*0.7*0.7+(winWidth1*0.7*0.2-parseInt($('#id_'+i1).css("width")))/2;
                $('#id_'+i1).css('left',left2);
                Cart.showText($detaillog,'the:'+time1+'time '+' pation:A'+' - > C');
                time1=time1+1;
                }
                }
                else if(winWidth1*0.7*0.36<parseInt(LEFT)&&parseInt(LEFT)<=winWidth1*0.7*0.65)//B-C
                {   if((widthtop_B!=WIDTH)&&(widthtop_B+1!=WIDTH))
                    {
                        $('#id_'+i1).css('top',TOP);
                        $('#id_'+i1).css('left',LEFT);
                        return;
                    } 
                    console.log('B柱子');
                    Cart.isStart = true;
                    i2=i1;
                    Cart.B_C1();	
                    if(bool==0)
                    {
                    $('#id_'+i1).css('top',480-Height1*(Cart.C.i+1));
                    var left2=winWidth1*0.7*0.7+(winWidth1*0.7*0.2-parseInt($('#id_'+i1).css("width")))/2;
                    $('#id_'+i1).css('left',left2);
                    Cart.showText($detaillog,'the:'+time1+'time '+' pation:B'+' - > C');
                    time1=time1+1;
                    }
                }
                else //C->C
                {   console.log('返回')
                    $('#id_'+i1).css('top',TOP);
                    $('#id_'+i1).css('left',LEFT);
                }

            }
            else//都不符合就返回原来位置
            {
                $('#id_'+i1).css('top',TOP);
                    $('#id_'+i1).css('left',LEFT);
            }
            }) 
            return false; 
            }) 
    }
    //返回该对象
    return Cart;
})();
$(function(){
     //设置日志对象
    Cart.setText('#txtlog','#detaillog');
    //开始
    $('#start').click(function(){ 
         
        if(!Cart.isStart){
            document.getElementById( "A_B" ).style.opacity=0;//手动按钮隐藏
            document.getElementById( "A_C" ).style.opacity=0;
            document.getElementById( "B_C" ).style.opacity=0;
            document.getElementById( "C_A" ).style.opacity=0;
            document.getElementById( "C_B" ).style.opacity=0;
            document.getElementById( "B_A" ).style.opacity=0;
            Cart.isStart = true;
            time1=1;
            Cart.start($('#num').val());	
            	
            Cart.move1.play();
        }
          
    });
    //初始化
    $('#init').click(function(){

        document.getElementById( "A_B" ).style.opacity=1;//显示所有按钮
        document.getElementById( "A_C" ).style.opacity=1;
        document.getElementById( "B_C" ).style.opacity=1;
        document.getElementById( "C_A" ).style.opacity=1;
        document.getElementById( "C_B" ).style.opacity=1;
        document.getElementById( "B_A" ).style.opacity=1;
        document.getElementById( "start" ).style.opacity=1;
     
        Cart.initBlock($('#num').val());
       for(i1=9;i1<=$('#num').val()+8;i1++)
       {
           Cart.drag(i1);
       }
    });

      


    //手动A到B
    $('#A_B').click(function(){////////////////////////////////////////////////////////////////////
        document.getElementById( "start" ).style.opacity=0;//动画按钮隐藏
            Cart.isStart = true;
            Cart.A_B();	
            Cart.move1.play1();
    });
    //手动B到C
      $('#B_C').click(function(){////////////////////////////////////////////////////////////////////
            Cart.isStart = true;
            Cart.B_C();	
            Cart.move1.play1();       
    });
    //手动A到C
    $('#A_C').click(function(){////////////////////////////////////////////////////////////////////
        Cart.isStart = true;
        Cart.A_C();	
        Cart.move1.play1();       
    });
    $('#C_B').click(function(){////////////////////////////////////////////////////////////////////
        Cart.isStart = true;
        Cart.C_B();	
        Cart.move1.play1();       
    });
    $('#B_A').click(function(){////////////////////////////////////////////////////////////////////
        Cart.isStart = true;
        Cart.B_A();	
        Cart.move1.play1();       
    });
    //B_C
    $('#C_A').click(function(){////////////////////////////////////////////////////////////////////
        Cart.isStart = true;
        Cart.C_A();	
        Cart.move1.play1();       
    });


    //数字正则
    var regx = /[1-9]+[0-9]*/g
    //改变时间
    $('#speed').change(function(){
        if(regx.test(this.value)){
            if(this.value>=100&&this.value<=10000){
                //ok
                Cart.options.speed = this.value;
            }
            else{
                alert('请输入100到10000之间的整数');
                return;	
            }
        }
        else{
            alert('请输入100到10000之间的整数');
            return;
        }
    });
});