const THICKNESS = 60;
const TOPWIDTH = 100;
const INDENT = 10;
const GAP=4;
const colors=['red','blue','green','purple','rgb(85,167,45)','#ef3412','black'];
const RATIO=0.3;
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
    ele.innerHTML = disk(width,height,i);
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
    
    let h1=w*RATIO;
    
//    let color=colors[i];
    let color='rgb('+Math.floor(Math.random()*256)+","
                    +Math.floor(Math.random()*256)+","
                    +Math.floor(Math.random()*256)+")";
    let s= '<div style ="margin-top: '+ h1 +'px;width: '+ w +'px;height: '+ h +'px;background-color: '+color+'"></div>'
    
        +'<div style =" margin: -'+ h1/2 +'px 0px -'+ (h1+h) +'px 0px;width: '+ w +'px;height: '+ h1 +'px;background-color: '+color+';'
        +'border-radius: '+ w/2 +'px/'+h1/2+'px"></div>'

        +'<div style ="width: '+ (w-2) +'px;height: '+ h1 +'px;background-image: radial-gradient(#101010,#305020,15%,yellow,'+color+');'
        +'border-radius: '+ (w/2-1) +'px/'+ h1/2 +'px;border: 1px red solid"></div>';
        return s;
    
    
    
    
    
}
function moveDisk(i,)
{
    let disk=document.getElementById('layer'+i);
    disk.style.animation='diskmove 2s 1';
}
tower(7);
moveDisk(2);





