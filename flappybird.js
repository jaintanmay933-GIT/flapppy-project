let board;
let boardwidth =360;
let boardheight =640;
let context;

//bird
let birdwidth= 34;
let birdheight= 24;
let birdx= boardwidth/8;
let birdy= boardheight/2;

let bird={
    x: birdx,
    y: birdy,
   width: birdwidth,
    height: birdheight
}
 let pipearray=[];
 let pipewidth=64;
 let pipeheight=612;
 let pipex= boardwidth;
 let pipey=0;

 let toppipeimg;
 let bottompipeimg;
 let velocityx= -2;
 let velocityy=0;
 let gravity=0.1;
 let gameover=false;
 let score=0;


window.onload= function(){
    board= document.getElementById("board");
    board.height= boardheight;
    board.width=boardwidth;
    context= board.getContext("2d");
    
birdimg= new Image();
birdimg.src= "./flappybird.png";
birdimg.onload= function(){
context.drawImage(birdimg,birdx,birdy,bird.width,bird.height);
}
toppipeimg= new Image();
toppipeimg.src="./toppipe.png";

bottompipeimg= new Image();
bottompipeimg.src="./bottompipe.png";

requestAnimationFrame(update);
setInterval(placepipe,1000);
document.addEventListener("keydown",movebird);
}
function update(){
    requestAnimationFrame(update);
    if(gameover){
        return;
    }
    context.clearRect(0,0,board.width,board.height);

velocityy+= gravity;    
bird.y=Math.max(velocityy+bird.y,0);  
context.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);

if( bird.y>board.height){
    gameover=true;
}

for(let i=0; i<pipearray.length; i++){
    let pipe= pipearray[i];
    pipe.x+= velocityx;
    context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height)

if( !pipe.passed&& bird.x>pipe.x+pipe.width){
 score+=0.5;
 pipe.passed=true;
}


    if(detectcollision(bird,pipe)){
        gameover=true;
    }
}
while( pipearray.lenght>0&& pipearray[0].x<-pipewidth){
    pipearray.shift();
}
context.fillStyle="white";
context.font="45px sans-serif"; 
context.fillText( score,5,45);
if(gameover){
   context.fillText("mar gya",5,90) ;
}
}
function placepipe(){
    if(gameover){
        return ;
    }
    let randompipey= pipey-(pipeheight/4)-Math.random()*pipeheight/2;
    let openingspace= board.height/4;

    let toppipe={
    img: toppipeimg,
    x: pipex,
    y: randompipey,
    width: pipewidth,
    height: pipeheight,
    passed: false
    }
    pipearray.push(toppipe);

    let bottompipe={
        img: bottompipeimg,
        x: pipex,
        y: randompipey+pipeheight+openingspace,
        width:pipewidth,
        height: pipeheight,
        passed: false
    }
    pipearray.push(bottompipe);
}
function movebird(e){
if(e.code=="Space"||e.code=="KeyX"){
    velocityy=-3;
    if(gameover){
        bird.y=birdy;
        pipearray=[];
        score=0;
        gameover=false;
    }
}
}
function detectcollision(a,b){
    return a.x< b.x +b.width &&
    a.x+ a.width >b.x&&
    a.y< b.y +b.height &&
    a.y +a.height > b.y
}
