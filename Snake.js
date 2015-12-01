/**
 * Created by Mr. Robot on 2015/11/28.
 */

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.lineWidth="2";
var LEFT = 1;
var UP = 2;
var RIGHT = 3;
var DOWN = 4;
var BOXSIDE = 45;
var BOXSTEP = 50;
var LINEWIDTH = 3;
var MAXWIDTH = c.width/BOXSTEP;
var MAXHEIGHT = c.height/BOXSTEP;
var BODY_COLOR = "green";
var AIM_COLOR = "rgb(0,5,5)";
var WALL_COLOR = "red";

var snake = new Snake();
var te = new Array()
// ºìÉ«¾ØÐÎ
CreateMap();
snake.init();

//wall = [Point(10,10),Point(5,4),Point(5,5)];
wall = [[6,3],[6,4],[6,5]]

ctx.beginPath();
ctx.strokeStyle = WALL_COLOR;
myOut(wall[2].x,wall[2].y);
for(i in wall){
    myOut(wall[i][0],wall[i][1]);
    ctx.strokeRect(wall[i][0]*BOXSTEP, wall[i][1]*BOXSTEP, BOXSIDE, BOXSIDE);
}
ctx.stroke();
snake.autoMove()

//snake.moveDirection();
//lists = [{'x':2,'y':3},{'x':2,'y':4}]
//paintSomePoint(lists);
//ctx.beginPath();
//ctx.lineWidth="5";
//ctx.strokeStyle = "red"
//ctx.clearRect(0*50-1,3*50-1,47,47)
//ctx.stroke();
function whichKeyPressed(event){
    //myOut(event.keyCode.toString(),event.keyCode.toString());
    if(snake.m_hasChanged ){
        return null;
    }
    switch (event.keyCode) {
        case 37://left
            if (snake.m_nDirect == RIGHT) {
                if (snake.freshTime < 500)
                    snake.freshTime += 40;
                break
            }
            if (snake.m_nDirect == LEFT)
                if (snake.freshTime > 99)
                    snake.freshTime -= 40;
            snake.m_nDirect = LEFT;
            break;
        case 38://up
            if (snake.m_nDirect == DOWN) {
                if (snake.freshTime < 500)
                    snake.freshTime += 40;
                break
            }
            if (snake.m_nDirect == UP)
                if (snake.freshTime > 99)
                    snake.freshTime -= 40;
            snake.m_nDirect = UP;
            break;
        case 39://right
            if (snake.m_nDirect == LEFT) {
                if (snake.freshTime < 500)
                    snake.freshTime += 40;
                break
            }
            if (snake.m_nDirect == RIGHT)
                if (snake.freshTime > 99)
                    snake.freshTime -= 40;
            snake.m_nDirect = RIGHT;
            break;
        case 40://down
            if (snake.m_nDirect == UP) {
                if (snake.freshTime < 500)
                    snake.freshTime += 40;
                break
            }
            if (snake.m_nDirect == DOWN)
                if (snake.freshTime > 99)
                    snake.freshTime -= 40;
            snake.m_nDirect = DOWN;
            break;
        default :
            break;

    }
    snake.m_hasChanged = true;
}
function Point(x, y) {
    this.x = x;
    this.y = y;
}

function getNeighbors(x,y){
    results = [[x + 1, y], [x, y - 1], [x - 1, y], [x, y + 1]]
    for(i in results){
        for(j in wall){
            if(wall[j][0] == results[i][0] && wall[j][1] == results[i][1]){
                delete results[i];
                break;
            }

        }
        for(j in snake.m_aBody){
            if(snake.m_aBody[j][0] == results[i][0] && snake.m_aBody[j][1] == results[i][1]){
                delete results[i];
                break;
            }
        }
    }
    a=[];
    for(i in results){
        a.push(results[i]);
    }
    return a;
}

function Snake(){
    this.m_hasChanged = false;
    this.m_aBody = new Array();
    this.freshTime = 500;
    this.autoDirect = new Array();
    this.m_pAim = new Point(10,10);
    this.m_body = [1*MAXWIDTH+4, 1*MAXWIDTH+3, 1*MAXWIDTH+2];
    this.m_aBody[0] = new Point(4, 2);
    this.m_aBody[1] = new Point(3, 2);
    this.m_aBody[2] = new Point(2, 2);
    this.m_nDirect=3;// left:1 up:2 right:3  down:4
    this.cost = function(){
        distance = Math.abs(this.m_aBody[0].x - this.m_pAim.x) + Math.abs(this.m_aBody[0].y - this.m_pAim.y);
        return costCnt;
    }
    this.init = function(){

        ctx.beginPath();
        //ctx.lineWidth="2";
        ctx.strokeStyle = BODY_COLOR;
        for(i in snake.m_aBody) {
            ctx.strokeRect(snake.m_aBody[i].x * BOXSTEP, snake.m_aBody[i].y * BOXSTEP, BOXSIDE, BOXSIDE);
        }
        ctx.strokeStyle = AIM_COLOR;
        ctx.rect(snake.m_pAim.x * BOXSTEP, snake.m_pAim.y * BOXSTEP, BOXSIDE, BOXSIDE);
        ctx.stroke();
    };

    this.autoPath = function(start,goal){
        var frontier = new Array();
        cost_so_far[start] = 0
        frontier.push(this.m_aBody[0]);
        while(frontier){
            current = frontier.pop()
            if(current.x == this.m_pAim.x && current.y == this.m_pAim.y){
                break;
            }
            for(i in getNeighbors()){

            }
        }
        this.autoDirect.unshift();
    }

    this.autoMove = function(){
        var direction =  this.autoDirect.pop();
        if(!direction){
            return null;
        }
        x = 0;
        y = 0;
        if (direction == UP) {
            x = snake.m_aBody[0].x;
            y = snake.m_aBody[0].y - 1;
        } else if (direction == LEFT) {
            x = snake.m_aBody[0].x - 1;
            y = snake.m_aBody[0].y;
        } else if (direction == DOWN) {
            x = snake.m_aBody[0].x;
            y = snake.m_aBody[0].y + 1;
        } else if (direction == RIGHT) {
            x = snake.m_aBody[0].x + 1;
            y = snake.m_aBody[0].y;
        } else {
            return null;
        }
        if(x == 0 || y == 0 || x == MAXWIDTH-1 || y == MAXHEIGHT - 1){
            alert("Game Over!");
            return null;
        }
        var index = (y - 1) * (MAXWIDTH-2) + x;
        for(i in this.m_aBody) {
            if (this.m_aBody[i].x == x && this.m_aBody[i].y == y) {
                alert("Game Over!");
                return null;
            }
        }
        pp ={'x':x, 'y':y};
        //this.m_body.unshift(pp.y*MAXHEIGHT + pp.x);
        ctx.beginPath();
        snake.m_aBody.unshift(pp);

            if (pp.x != this.m_pAim.x || pp.y != this.m_pAim.y) {
                past = snake.m_aBody.pop();
                this.m_body.pop();
                ctx.strokeStyle = "white";

                ctx.clearRect(past.x * BOXSTEP - 1, past.y * BOXSTEP - 1, BOXSIDE+2, BOXSIDE+2);

            }else{
                ctx.clearRect(pp.x * BOXSTEP, pp.y * BOXSTEP, BOXSIDE, BOXSIDE);
                while(true) {
                    x = Math.ceil(Math.random() * (MAXWIDTH - 2));
                    y = Math.ceil(Math.random() * (MAXHEIGHT - 2));
                    flag = true;
                    for(i in this.m_aBody){
                        if(this.m_aBody[i].x == x && this.m_aBody[i].y == y){
                            flag = false;
                            break;
                        }
                    }
                    if(flag){
                        break;
                    }
                }
                this.m_pAim.x = x;
                this.m_pAim.y = y;
                ctx.strokeStyle = AIM_COLOR;
                ctx.rect(this.m_pAim.x * BOXSTEP, this.m_pAim.y * BOXSTEP, BOXSIDE, BOXSIDE);

            }
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.strokeRect(pp.x*BOXSTEP, pp.y*BOXSTEP, BOXSIDE, BOXSIDE);
            ctx.stroke();

        setTimeout("snake.autoMove();", this.freshTime);
    }

    this.moveDirection = function() {
        x = 0;
        y = 0;
        if (this.m_nDirect == UP) {
            x = snake.m_aBody[0].x;
            y = snake.m_aBody[0].y - 1;
        } else if (this.m_nDirect == LEFT) {
            x = snake.m_aBody[0].x - 1;
            y = snake.m_aBody[0].y;
        } else if (this.m_nDirect == DOWN) {
            x = snake.m_aBody[0].x;
            y = snake.m_aBody[0].y + 1;
        } else if (this.m_nDirect == RIGHT) {
            x = snake.m_aBody[0].x + 1;
            y = snake.m_aBody[0].y;
        } else {
            return null;
        }
        if(x == 0 || y == 0 || x == MAXWIDTH-1 || y == MAXHEIGHT - 1){
            alert("Game Over!");
            return null;
        }
        var index = (y - 1) * (MAXWIDTH-2) + x;
        for(i in this.m_aBody) {
            if (this.m_aBody[i].x == x && this.m_aBody[i].y == y) {
                alert("Game Over!");
                return null;
            }
        }
        pp ={'x':x, 'y':y};
        this.m_body.unshift(pp.y*MAXHEIGHT + pp.x);
        ctx.beginPath();
        //ctx.lineWidth = "2";
        //myOut(pp.x.toString(),pp.y.toString());

        snake.m_aBody.unshift(pp);
        //if(pp.equals(this.m_pAim)){allert("Get you!");}
        if (pp.x != this.m_pAim.x || pp.y != this.m_pAim.y) {
            past = snake.m_aBody.pop();
            this.m_body.pop();
            ctx.strokeStyle = "white";

            ctx.clearRect(past.x * BOXSTEP - 1, past.y * BOXSTEP - 1, BOXSIDE+2, BOXSIDE+2);
        }else{
            ctx.clearRect(pp.x * BOXSTEP, pp.y * BOXSTEP, BOXSIDE, BOXSIDE);
            while(true) {
                x = Math.ceil(Math.random() * (MAXWIDTH - 2));
                y = Math.ceil(Math.random() * (MAXHEIGHT - 2));
                flag = true;
                for(i in this.m_aBody){
                    if(this.m_aBody[i].x == x && this.m_aBody[i].y == y){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    break;
                }
            }
            this.m_pAim.x = x;
            this.m_pAim.y = y;
            ctx.strokeStyle = AIM_COLOR;
            ctx.rect(this.m_pAim.x * BOXSTEP, this.m_pAim.y * BOXSTEP, BOXSIDE, BOXSIDE);

        }
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.strokeRect(pp.x*BOXSTEP, pp.y*BOXSTEP, BOXSIDE, BOXSIDE);
        ctx.stroke();
        snake.m_hasChanged = false;
        setTimeout("snake.moveDirection();", this.freshTime);
    }
}


function SquareGrid(width,height) {
    ctx.beginPath();
    ctx.strokeStyle = WALL_COLOR;
    for(i in wall){
        ctx.strokeRect(wall[i][0]*BOXSTEP, wall[i][1]*BOXSTEP, BOXSIDE, BOXSIDE);
    }
    ctx.stroke();/*(
    range.methods = {
        in_bounds:function(p){
            return 0 <= p._x < this.width || 0 <= p._y < this.height;
        },
        passable:function(self, id) {
            return id in this.walls;
        },

        neighbors:function(id) {
            x = id._x;
            y = id._y;
            results = [(x + 1, y), (x, y - 1), (x - 1, y), (x, y + 1)];
            if ((x + y) % 2 == 0) {
                results.reverse();
                results = filter(self.in_bounds, results);
                results = filter(self.passable, results);
                return results;
            }
        }
    };*/
}

function CreateMap() {
    ctx.beginPath();
    //ctx.lineWidth="2";
    ctx.strokeStyle = "rgba(255,0,0,1)";
    for( i = 0; i < c.width; i+=BOXSTEP){
        ctx.rect(i,0,BOXSIDE,BOXSIDE);
        ctx.rect(i,c.height-BOXSTEP,BOXSIDE,BOXSIDE);
    }
    for( j = 0; j < c.height; j+=BOXSTEP){
        ctx.rect(0,j,BOXSIDE,BOXSIDE);
        ctx.rect(c.width-BOXSTEP,j,BOXSIDE,BOXSIDE);
    }
    ctx.stroke();


    /*ctx.beginPath();
    //ctx.lineWidth="3";
    ctx.strokeStyle = "rgba(255,255,255,1)";
    for(i=1; i < c.width/BOXSTEP-1; i++)
        for(j = 1; j < c.height/BOXSTEP-1; j++) {
            ctx.rect(i*BOXSTEP,j*BOXSTEP,BOXSIDE,BOXSIDE);
        }
    ctx.stroke();
*/
}


function paintSomePoint(myArray){
    for( i in myArray){
        pp = myArray[i];
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.rect(pp.x*BOXSTEP,pp.y*BOXSTEP,BOXSIDE,BOXSIDE);
        ctx.stroke();
    }
}


function myOut(str1,str2) {
    var myPrint = document.getElementById("out");
    myPrint.innerHTML="( "+str1+", "+str2 +" )";

}

