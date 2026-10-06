const idea = document.getElementById("idea");
const difficulty = document.getElementById("difficulty");
const theme = document.getElementById("theme");
const frame = document.getElementById("gameFrame");
const status = document.getElementById("status");
const gameName = document.getElementById("gameName");

function buildGame(desc, diff, selectedTheme) {
  const text = desc.toLowerCase();

  const space = /space|alien|robot|galaxy|laser/.test(text);
  const title = space ? "Neon Galaxy" : "Shadow Dungeon";

  const speed =
    diff === "hard" ? 3.8 :
    diff === "easy" ? 2.5 : 3.1;

  const count =
    diff === "hard" ? 8 :
    diff === "easy" ? 4 : 6;

  const themes = {
    dark: ["#0b0d12", "#8b5cf6"],
    neon: ["#050816", "#00e5ff"],
    forest: ["#07120a", "#45d483"]
  };

  const colors = themes[selectedTheme];

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box}
body{
 margin:0;background:${colors[0]};color:white;
 font-family:system-ui;display:flex;
 justify-content:center;align-items:center;
 min-height:100vh
}
.wrap{width:min(920px,96vw)}
canvas{
 display:block;width:100%;aspect-ratio:16/9;
 border:2px solid ${colors[1]};
 border-radius:14px;background:#05060a;
 touch-action:none
}
.hud{
 display:flex;justify-content:space-between;
 padding:9px 2px;font-size:14px
}
.hint{text-align:center;color:#9aa4b2;font-size:12px}
</style>
</head>

<body>
<div class="wrap">
<div class="hud">
<span id="stats">HP 100 • XP 0 • Coins 0</span>
<b>${title}</b>
<span id="level">Level 1</span>
</div>

<canvas id="c" width="900" height="506"></canvas>

<div class="hint">
WASD / Arrow keys • Touch the game to move
</div>
</div>

<script>
const c=document.getElementById("c");
const ctx=c.getContext("2d");

let player={
 x:450,y:253,r:15,hp:100,xp:0,coins:0
};

let enemies=[];
let keys={};
const speed=${speed};
const enemyCount=${count};

function spawn(){
 enemies=[];
 for(let i=0;i<enemyCount;i++){
  enemies.push({
   x:40+Math.random()*820,
   y:40+Math.random()*426,
   r:13,
   hp:30
  });
 }
}

spawn();

addEventListener("keydown",e=>{
 keys[e.key.toLowerCase()]=true;
});

addEventListener("keyup",e=>{
 keys[e.key.toLowerCase()]=false;
});

let target=null;

c.addEventListener("pointerdown",e=>{
 const r=c.getBoundingClientRect();
 target={
  x:(e.clientX-r.left)*900/r.width,
  y:(e.clientY-r.top)*506/r.height
 };
});

c.addEventListener("pointermove",e=>{
 if(!e.buttons)return;
 const r=c.getBoundingClientRect();
 target={
  x:(e.clientX-r.left)*900/r.width,
  y:(e.clientY-r.top)*506/r.height
 };
});

function game(){
 requestAnimationFrame(game);

 let dx=
  (keys.d||keys.arrowright?1:0)-
  (keys.a||keys.arrowleft?1:0);

 let dy=
  (keys.s||keys.arrowdown?1:0)-
  (keys.w||keys.arrowup?1:0);

 if(target){
  dx=target.x-player.x;
  dy=target.y-player.y;

  const d=Math.hypot(dx,dy);

  if(d<10)target=null;
  else{
   dx/=d;
   dy/=d;
  }
 }

 player.x=Math.max(18,Math.min(882,
  player.x+dx*speed));

 player.y=Math.max(18,Math.min(488,
  player.y+dy*speed));

 for(const e of enemies){

  const dx=player.x-e.x;
  const dy=player.y-e.y;
  const d=Math.hypot(dx,dy);

  if(d<30){
   e.hp-=0.4;
   player.hp-=0.1;
  }

  if(d>30){
   e.x+=dx/d*0.45;
   e.y+=dy/d*0.45;
  }
 }

 enemies=enemies.filter(e=>{
  if(e.hp<=0){
   player.xp+=10;
   player.coins++;
   return false;
  }
  return true;
 });

 if(enemies.length===0){
  player.hp=Math.min(100,player.hp+25);
  spawn();
 }

 if(player.hp<=0){
  player={
   x:450,y:253,r:15,
   hp:100,xp:0,coins:0
  };
  spawn();
 }

 ctx.clearRect(0,0,900,506);

 ctx.fillStyle="${colors[0]}";
 ctx.fillRect(0,0,900,506);

 ctx.globalAlpha=.15;
 ctx.strokeStyle="${colors[1]}";

 for(let i=0;i<900;i+=45){
  ctx.beginPath();
  ctx.moveTo(i,0);
  ctx.lineTo(i,506);
  ctx.stroke();
 }

 for(let i=0;i<506;i+=45){
  ctx.beginPath();
  ctx.moveTo(0,i);
  ctx.lineTo(900,i);
  ctx.stroke();
 }

 ctx.globalAlpha=1;

 ctx.fillStyle="${colors[1]}";
 ctx.beginPath();
 ctx.arc(
  player.x,player.y,
  player.r,0,Math.PI*2
 );
 ctx.fill();

 for(const e of enemies){
  ctx.fillStyle="#ef4444";
  ctx.beginPath();
  ctx.arc(e.x,e.y,e.r,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle="#6ee7b7";
  ctx.fillRect(
   e.x-10,e.y-18,
   20*Math.max(0,e.hp/30),3
  );
 }

 document.getElementById("stats").textContent=
  "HP "+Math.max(0,player.hp|0)+
  " • XP "+player.xp+
  " • Coins "+player.coins;

 document.getElementById("level").textContent=
  "Level "+(1+Math.floor(player.xp/50));
}

game();
<\/script>
</body>
</html>`;
}

function generate(){
 const html=buildGame(
  idea.value,
  difficulty.value,
  theme.value
 );

 frame.srcdoc=html;

 gameName.textContent=
  /space|alien|robot|galaxy|laser/i.test(idea.value)
  ? "Neon Galaxy"
  : "Shadow Dungeon";

 window.generatedHTML=html;

 status.textContent="Game generated successfully.";
}

document.getElementById("generate").onclick=generate;

document.getElementById("download").onclick=()=>{
 if(!window.generatedHTML)generate();

 const blob=new Blob(
  [window.generatedHTML],
  {type:"text/html"}
 );

 const a=document.createElement("a");
 a.href=URL.createObjectURL(blob);
 a.download="generated-game.html";
 a.click();

 status.textContent="Standalone game downloaded.";
};

generate();
