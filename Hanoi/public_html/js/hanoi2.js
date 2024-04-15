const THICKNESS = 60;
const TOPWIDTH = 100;
const INDENT = 10;
const GAP=4;
const colors=['red','blue','green','purple','rgb(85,167,45)','#ef3412','black'];
function layer(n,i)
{
    let x = i * INDENT;
    let y = (n-i-1)*THICKNESS;
    let width = 2*(n-i-1)*INDENT+TOPWIDTH;
    let height = THICKNESS;
    let ele = document.createElement("div");
    ele.className = "layer";
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
    ele.style.width = width + 'px';
    ele.style.height = (height -GAP)+ 'px';
    ele.id = "layer" + i;
    ele.innerHTML = "piece" + i;
    ele.style.backgroundColor='rgb('+i*20+','+(255-i*20)+',45)';
    document.body.appendChild(ele);
}

function tower(n)
{
    for(let i = 0;i < n;i++)
        layer(n,i);
    
}
function move(i,x,y)
{
    let ele=document.getElementById("layer" + i);
    ele.style.left=x+'px';
    ele.style.top=y+'px';
    

}
function disk(w,h,i)
{
    let h1=h/2*w/300;
    let color=colors[i];
    let s= '<div style ="margin-top: '+ h1 +'px;width: '+ w +'px;height: '+ h +'px;background-color: '+color+'"></div>'
        +'<div style =" margin: -'+ h/2 +'px 0px -'+ h*2 +'px 0px;width: '+ w +'px;height: '+ h +'px;background-color: '+color+';'
        +'border-radius: '+ w/2 +'px/'+h1+'px"></div>'
        +'<div style ="width: '+ (w-2) +'px;height: '+ h +'px;background-image: radial-gradient(#101010,#305020,15%,yellow,'+color+');'
        +'border-radius: '+ (w/2-1) +'px/'+ h1 +'px;border: 1px red solid"></div>';
        return s;
    
    
    
    
    
}
tower(7);
move(3,500,400);




