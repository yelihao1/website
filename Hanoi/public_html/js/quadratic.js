//solve quadratic eqution ax^2+bx+c=0,here a,b and c are coeffivients
function quadratic(a,b,c)//
{
    if(a==0)
    {
        if(b==0)
        {
            if(c==0)
            {
                document.write("a=b=c:any x solves the equation<br>");
            }
            else
            {
                alert("a=b=0,c!=0:the equatuin has no solution<br>");
            }
        }
        else
        {
            document.write("a=0,b!=0: the solution is x="+(-c/b)+"<br>");
        }
    }
    else//a!=0
    {
        let delta= b*b-4*a*c;
        if (delta<0)
        {
            document.write("delta<0:the solution has no real solution<br>");
        }
        else if (delta==0)
        {
            document.write("delta=0:the only solution is x="+(-b/(2*a))+"<br>");
        }
        else(delta>0)
        {
            document.write("delta>0:two solutions x1="
                    +((-b+Math.sqrt(delta))/2/a)
                    +",x2="
                    +((-b+Math.sqrt(delta))/2/a)+"<br>");
        }
    }
}
quadratic(0,0,0);
quadratic(1,0,0);
quadratic(0,0,1);
quadratic(1,2,3);
quadratic(0,2,4);
quadratic(5,2,3);
quadratic(1,0,-1);

for(let i=0;i<100;i++)
{
    quadratic(Math.random(),Math.random(),Math.random());
}

function monthName2Number(monthName)
{
    let num=0;
    switch(monthName)
    {
        case"Jan":
        case"jan":
        case"January":
            num=1;
            break;
        case"Feb":
        case"feb":
        case"Febuary":
           num=2;
           break;
        case"March":
            num=3;
            break;
        case"April":
            num=4;
            break;
        case"May":
            num=5;
            break;
        case"June":
            num=6;
            break;
        case"July":
            num=7;
            break;
        case"Aug":
            num=8;
            break;
        case"Sep":
            num=9;
            break;
        case"Oct":
            num=10;
            break;
        case"Nov":
            num=11;
            break;
        case"Dec":
            num=12;
            break;
        default:
            num=-1;
    }
    return num;
}
document.write("Feb is month "+monthName2Number('Feb')+"<br>");
document.write("xyz is month "+monthName2Number('xyz')+"<br>");

let mn2d={"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"June":6,"July":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12};
function monthName2Num(monthName)
{
    let i=mn2d[monthName];
    if (i==null)
        return -1;
    return i;
}
/* for(initializations;
 * wihle(bool expression)
 * {
 * statements//iteration tasks
 * increments
 * }
 */
for(let i=0;i<100;i++)
{
    let a=Math.random(),b=Math.random(),c=Math.random();
//    if(a==0)continue;
//    let delta=b*b-4*a*c;
//    if (delta<=0)continue;
    if(a!=0&&b8b>4*a*c)
    {
        quadratic(a,b,c);
    }
}