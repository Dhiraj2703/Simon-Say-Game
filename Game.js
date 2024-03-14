let gameseq=[];
let userseq=[];

let btns=["yellow","red","green","blue"];

let started=false;
let level=0;

let highestscore=0;

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started==false) {
        started=true;
        levelup();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`)
    gameseq.push(randColor);
    btnFlash(randbtn);
}

function checkAns(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            let aud=document.createElement("audio");
            aud.src="Beep.mp3";
            aud.play("Beep.mp3");
            setTimeout(levelup,1000);
        }
    }else{
        if(highestscore<level){
            highestscore=level;
        }
        let beepo=document.createElement("audio");
        beepo.src="Over.mp3";
        beepo.play("Over.mp3");
        h3.innerHTML=`Highest Score is <b>${highestscore}</b>.`
        h2.innerHTML=`Game over!!Your Score was <b>${level}</b>.<br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
    }
}

function btnpress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    userseq=[];
    gameseq=[];
    level=0;
}