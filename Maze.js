var cv =  document.getElementById("canvas");
//var ca = document.getElmentById("can");
var ctx = cv.getContext("2d");
//var con = ca.getContext("2d");

var imgs = ["Bm.png","Bmr.png","Bml.png","Bmb.png","Brengawall.png","Bmd.png","sidebotton.png","road.png","wall.png","player0.png","player1.png","player2.png","player3.png","playerbar.png","HP1.png","HP2.png","HP3.png","MP1.png","MP2.png","MP3.png","enemy2.png","title.png","playerDamage.png","Goal.png","GameOver.png"]
var py
var px
var dir
var gy
var gx
var cx
var cy
var ffwall
var hp = 3
var mp = 3
var havemap = 0
var pro = 0
var enemy = [[0,0],[0,0],[0,0]]
var ex
var ey
var doar = 0
var turn = 0

let map =     [ [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0] ]




  var img1 = new Image();
  img1.src = imgs[0];
  var img2 = new Image();
  img2.src = imgs[1];
  var img3 = new Image();
  img3.src = imgs[2];
  var img4 = new Image();
  img4.src = imgs[3];
  var img5 = new Image();
  img5.src = imgs[4];
  var img6 = new Image();
  img6.src = imgs[5];
  var img7 = new Image();
  img7.src = imgs[6];
  var img8 = new Image();
  img8.src = imgs[7];
  var img9 = new Image();
  img9.src = imgs[8];
  var img10 = new Image();
  img10.src = imgs[9];
  var img11 = new Image();
  img11.src = imgs[10];
  var img12 = new Image();
  img12.src = imgs[11];
  var img13 = new Image();
  img13.src = imgs[12];
  var img14 = new Image();
  img14.src = imgs[13];
  var img15 = new Image();
  img15.src = imgs[14];
  var img16 = new Image();
  img16.src = imgs[15];
  var img17 = new Image();
  img17.src = imgs[16];
  var img18 = new Image();
  img18.src = imgs[17];
  var img19 = new Image();
  img19.src = imgs[18];
  var img20 = new Image();
  img20.src = imgs[19];
  var img21 = new Image();
  img21.src = imgs[20];
  var img22 = new Image();
  img22.src = imgs[21];
  var img23 = new Image();
  img23.src = imgs[22];
  var img24 = new Image();
  img24.src = imgs[23];
  var img25 = new Image();
  img25.src = imgs[24];

function makemaze(){
  //10x10マスの迷路に穴をあけていく処理
  for(let i=0; i<40; i++){
   for(let l=0; l<100; l++){
      let rx = parseInt(Math.random() * 9)
      let ry = parseInt(Math.random() * 9)
      if(rx > 0 && rx < 9 && ry > 0 && ry < 9 && map[ry][rx] == 0){
        map[ry][rx] = 1
        break;
      }
    }
  }
  //描写の都合上、広場を作れないため2x2マス以上の穴をつぶしていく処理
  for(let i=0; i<9; i++){
    for(let j=0; j<9; j++){
      if(map[i][j] == 1){
        if(map[i-1][j] == 1 && map[i][j-1] == 1){
          map[i-1][j-1] = 0;
        }else if(map[i-1][j] == 1 && map[i][j+1] == 1){
          map[i-1][j+1] = 0;
        }else if(map[i+1][j] == 1 && map[i][j-1] == 1){
          map[i+1][j-1] = 0;
        }else if(map[i+1][j] == 1 && map[i][j+1] == 1){
          map[i+1][j+1] = 0;
        }
      }
    }
  }




}

function setplayer(){
  //プレイヤーの初期位置の設定
   px = parseInt(Math.random() * 9)
   py = parseInt(Math.random() * 9)
   dir = 0
  while(true){
    if(map[py][px] == 1){
      break;
    }else{
      px = parseInt(Math.random() * 9)
      py = parseInt(Math.random() * 9)
    }
  }
}

function setgoal(){
  //ゴールの位置設定
   gx = parseInt(Math.random() * 8) + 1
   gy = parseInt(Math.random() * 8) + 1
  while(true){
    if(map[gy + 1][gx] == 1 || map[gy - 1][gx] == 1 || map[gy][gx + 1] == 1 || map[gy][gx - 1] == 1 ){
        map[gy][gx] = 0
        break;
    }else{
      gx = parseInt(Math.random() * 8) + 1
      gy = parseInt(Math.random() * 8) + 1
    }
  }

}

function setenemy(){
  //敵の位置設定
  for(var i=0;i<3;i++){

    ex = parseInt(Math.random() * 9)
    ey = parseInt(Math.random() * 9)
    while(true){
      if(map[ey][ex] == 1){
        enemy[i][0] = ex
        enemy[i][1] = ey
        break;
      }else{
        ex = parseInt(Math.random() * 9)
        ey = parseInt(Math.random() * 9)
      }
    }
  }
  console.log("1:",enemy[0][0],enemy[0][1],"2:",enemy[1][0],enemy[1][1],"3:",enemy[2][0],enemy[2][1])
}

function ctplayer(){
  //プレイヤーコントロール
  //向きを変えるための処理
  if(cx >= 0 && cx <= 30 && cy <= 500){
    if(dir >= 1){
      dir = dir - 1
    }else if(dir == 0){
      dir = dir + 3
    }
    doar = 0
  }else if(cx >= 670 && cx <= 700 && cy <= 500){
    if(dir <= 2){
      dir = dir + 1
    }else if(dir == 3){
      dir = dir - 3
    }
    doar = 0
  }else if(cy <= 500){
    //前に進む処理
    if(dir == 0){
      if(map[py - 1][px] != 0){
        py = py - 1
      }
    }else if(dir == 1){
      if(map[py][px + 1] != 0){
        px = px + 1
      }
    }else if(dir == 2){
      if(map[py + 1][px] != 0){
        py = py + 1
      }
    }else if(dir == 3){
      if(map[py][px - 1] != 0){
        px = px - 1
      }
    }
  }else if(cx >= 460 && cx <= 520 && cy >= 520 && cy <= 580){
    //攻撃処理
    for(let i=0;i<3;i++){
        if(py == enemy[i][1] && px == enemy[i][0]){
          let drop = parseInt(Math.random() * 3)
          setenemy();
          if(drop == 0){
            havemap = 1
          }else if(drop == 1){
            mp = 3
          }else{

          }
        }else if(i == 0 && ((dir == 0 && py-1 == gy && px == gx) || (dir == 1 && py == gy && px+1 == gx) || (dir == 2 && py+1 == gy && px == gx) || (dir == 3 && py == gy && px-1 == gx))){
            doar = 1
            updisplay();
            goal();

        }
      }

  }else if(cx >= 540 && cx <= 600 && cy >= 520 && cy <= 580){
    //回復魔法処理
    if(mp != 0){
      mp = mp - 1
      hp = 3
    }
  }else if(cx >= 620 && cx <= 680 && cy >= 520 && cy <= 580){
    //壁1マスすり抜け魔法処理
    if(mp != 0){

      if(dir == 0){
        if(map[py-1][px] == 0 && map[py-2][px] == 1){
          py = py - 2
          mp = mp -1
        }

      }else if(dir == 1){
        if(map[py][px+1] == 0 && map[py][px+2] == 1){
          px = px + 2
          mp = mp -1

        }
      }else if(dir == 2){
        if(map[py+1][px] == 0 && map[py+2][px] == 1){
          py = py + 2
          mp = mp -1

        }
      }else if(dir == 3){
        if(map[py][px-1] == 0 && map[py][px-2] == 1){
          px = px - 2
          mp = mp -1

        }
      }
    }
  }
}

function goal(){
  pro = 2
}

function eattack(){
  for(let i=0;i<3;i++){
    if(turn == 1 && py == enemy[i][1] && px == enemy[i][0]){
      hp = hp - 1
      setTimeout("ctx.drawImage(img23,0,0,700,500)",7)
    }

  }
}

function fdis(){
  //自分がいるマスの描写処理
  if(dir == 0){
    if(map[py][px-1] == 1 && map[py][px+1] == 1){
      ctx.drawImage(img4,0,0,700,500)
    }else if(map[py][px-1] == 1){
      ctx.drawImage(img3,0,0,700,500)
    }else if(map[py][px+1] == 1){
      ctx.drawImage(img2,0,0,700,500)
    }else {
      ctx.drawImage(img1,0,0,700,500)
    }
  }else if(dir == 1){
    if(map[py-1][px] == 1 && map[py+1][px] == 1){
      ctx.drawImage(img4,0,0,700,500)
    }else if(map[py-1][px] == 1){
      ctx.drawImage(img3,0,0,700,500)
    }else if(map[py+1][px] == 1){
      ctx.drawImage(img2,0,0,700,500)
    }else {
      ctx.drawImage(img1,0,0,700,500)
    }
  }else if(dir == 2){
    if(map[py][px+1] == 1 && map[py][px-1] == 1){
      ctx.drawImage(img4,0,0,700,500)
    }else if(map[py][px+1] == 1){
      ctx.drawImage(img3,0,0,700,500)
    }else if(map[py][px-1] == 1){
      ctx.drawImage(img2,0,0,700,500)
    }else {
      ctx.drawImage(img1,0,0,700,500)
    }
  }else if(dir == 3){
    if(map[py+1][px] == 1 && map[py-1][px] == 1){
      ctx.drawImage(img4,0,0,700,500)
    }else if(map[py+1][px] == 1){
      ctx.drawImage(img3,0,0,700,500)
    }else if(map[py-1][px] == 1){
      ctx.drawImage(img2,0,0,700,500)
    }else {
      ctx.drawImage(img1,0,0,700,500)
    }
  }
}
function ffdis(){
  //１マス前の描写処理

  if(doar == 1){
      ctx.drawImage(img6,175,125,350,250)
  }else{
    if(dir == 0){
      if(map[py-1][px] == 0){
        ctx.drawImage(img5,175,125,350,250)
        ffwall = 1
      }else if(map[py-1][px-1] == 1 && map[py-1][px+1] == 1){
        ctx.drawImage(img4,175,125,350,250)
        ffwall = 0
      }else if(map[py-1][px-1] == 1){
        ctx.drawImage(img3,175,125,350,250)
        ffwall = 0
      }else if(map[py-1][px+1] == 1){
        ctx.drawImage(img2,175,125,350,250)
        ffwall = 0
      }else {
        ctx.drawImage(img1,175,125,350,250)
        ffwall = 0
      }
    }else if(dir == 1){
      if(map[py][px+1] == 0){
        ctx.drawImage(img5,175,125,350,250)
        ffwall = 1
      }else if(map[py-1][px+1] == 1 && map[py+1][px+1] == 1){
        ctx.drawImage(img4,175,125,350,250)
        ffwall = 0
      }else if(map[py-1][px+1] == 1){
        ctx.drawImage(img3,175,125,350,250)
        ffwall = 0
      }else if(map[py+1][px+1] == 1){
        ctx.drawImage(img2,175,125,350,250)
        ffwall = 0
      }else {
        ctx.drawImage(img1,175,125,350,250)
        ffwall = 0
      }
    }else if(dir == 2){
      if(map[py+1][px] == 0){
        ctx.drawImage(img5,175,125,350,250)
        ffwall = 1
      }else if(map[py+1][px+1] == 1 && map[py+1][px-1] == 1){
        ctx.drawImage(img4,175,125,350,250)
        ffwall = 0
      }else if(map[py+1][px+1] == 1){
        ctx.drawImage(img3,175,125,350,250)
        ffwall = 0
      }else if(map[py+1][px-1] == 1){
        ctx.drawImage(img2,175,125,350,250)
        ffwall = 0
      }else {
        ctx.drawImage(img1,175,125,350,250)
        ffwall = 0
      }
    }else if(dir == 3){
      if(map[py][px-1] == 0){
        ctx.drawImage(img5,175,125,350,250)
        ffwall = 1
      }else if(map[py+1][px-1] == 1 && map[py-1][px-1] == 1){
        ctx.drawImage(img4,175,125,350,250)
        ffwall = 0
      }else if(map[py+1][px-1] == 1){
        ctx.drawImage(img3,175,125,350,250)
        ffwall = 0
      }else if(map[py-1][px-1] == 1){
        ctx.drawImage(img2,175,125,350,250)
        ffwall = 0
      }else {
        ctx.drawImage(img1,175,125,350,250)
        ffwall = 0
      }
    }

  }
}

function fffdis(){
  //２マス前の描写処理
  if(ffwall == 0){
    if(dir == 0){
      if(map[py-2][px] == 0){
        ctx.drawImage(img5,262.5,187.5,175,125)
      }else if(map[py-2][px-1] == 1 && map[py-2][px+1] == 1){
        ctx.drawImage(img4,262.5,187.5,175,125)
      }else if(map[py-2][px-1] == 1){
        ctx.drawImage(img3,262.5,187.5,175,125)
      }else if(map[py-2][px+1] == 1){
        ctx.drawImage(img2,262.5,187.5,175,125)
      }else {
        ctx.drawImage(img1,262.5,187.5,175,125)
      }
    }else if(dir == 1){
      if(map[py][px+2] == 0){
        ctx.drawImage(img5,262.5,187.5,175,125)
      }else if(map[py-1][px+2] == 1 && map[py+1][px+2] == 1){
        ctx.drawImage(img4,262.5,187.5,175,125)
      }else if(map[py-1][px+2] == 1){
        ctx.drawImage(img3,262.5,187.5,175,125)
      }else if(map[py+1][px+2] == 1){
        ctx.drawImage(img2,262.5,187.5,175,125)
      }else {
        ctx.drawImage(img1,262.5,187.5,175,125)
      }
    }else if(dir == 2){
      if(map[py+2][px] == 0){
        ctx.drawImage(img5,262.5,187.5,175,125)
      }else if(map[py+2][px+1] == 1 && map[py+2][px-1] == 1){
        ctx.drawImage(img4,262.5,187.5,175,125)
      }else if(map[py+2][px+1] == 1){
        ctx.drawImage(img3,262.5,187.5,175,125)
      }else if(map[py+2][px-1] == 1){
        ctx.drawImage(img2,262.5,187.5,175,125)
      }else {
        ctx.drawImage(img1,262.5,187.5,175,125)
      }
    }else if(dir == 3){
      if(map[py][px-2] == 0){
        ctx.drawImage(img5,262.5,187.5,175,125)
      }else if(map[py+1][px-2] == 1 && map[py-1][px-2] == 1){
        ctx.drawImage(img4,262.5,187.5,175,125)
      }else if(map[py+1][px-2] == 1){
        ctx.drawImage(img3,262.5,187.5,175,125)
      }else if(map[py-1][px-2] == 1){
        ctx.drawImage(img2,262.5,187.5,175,125)
      }else {
        ctx.drawImage(img1,262.5,187.5,175,125)
      }
    }
  }
}

function mapdis(){
  //ミニマップの描写処理
console.log(gx,gy)
  if(havemap == 1){

    for(let y=0; y<10; y++){
      for(let x=0; x<10; x++){
        if(map[y][x] == map [py][px]){
          if(dir == 0){
            ctx.drawImage(img10,(0 + (px * 10)),(500 + (py * 10)),10,10)

          }else if(dir == 1){
            ctx.drawImage(img11,(0 + (px * 10)),(500 + (py * 10)),10,10)

          }else if(dir == 2){
            ctx.drawImage(img12,(0 + (px * 10)),(500 + (py * 10)),10,10)

          }else if(dir == 3){
            ctx.drawImage(img13,(0 + (px * 10)),(500 + (py * 10)),10,10)

          }
        }else if(map[y][x] == 0){
          if(y == gy && x == gx){
            ctx.drawImage(img14,(0 + (x * 10)),(500 + (y * 10)),10,10)
          }else{
            ctx.drawImage(img9,(0 + (x * 10)),(500 + (y * 10)),10,10)
          }
        }
      }
    }
  }
}

function hpc(){
  //HPゲージの描写処理
  if(hp == 3){
    ctx.drawImage(img17,100,500)
    ctx.drawImage(img16,100,500)
    ctx.drawImage(img15,100,500)
  }else if(hp == 2){
    ctx.drawImage(img16,100,500)
    ctx.drawImage(img15,100,500)
  }else if(hp == 1){
    ctx.drawImage(img15,100,500)
  }
}

function mpc(){
  //MPゲージの描写処理
  if(mp == 3){
      ctx.drawImage(img20,100,500)
      ctx.drawImage(img19,100,500)
      ctx.drawImage(img18,100,500)
  }else if(mp == 2){
    ctx.drawImage(img19,100,500)
    ctx.drawImage(img18,100,500)
  }else if(mp == 1){
    ctx.drawImage(img18,100,500)
  }
}

function pbar(){
  //プレイヤーバーの描写処理
  ctx.drawImage(img14,100,500)
  setTimeout("hpc();",2)
  setTimeout("mpc();",3)
}

function edis(){
  //敵の描写
    for(let i=0;i<3;i++){
        if(py == enemy[i][1] && px == enemy[i][0]){
          ctx.drawImage(img21,0,0,700,500)
        }else if(dir == 0 && py-1 == enemy[i][1] && px == enemy[i][0]){
          ctx. drawImage(img21,175,125,350,250)
        }else if(dir == 1 && py == enemy[i][1] && px+1 == enemy[i][0]){
          ctx. drawImage(img21,175,125,350,250)
        }else if(dir == 2 && py+1 == enemy[i][1] && px == enemy[i][0]){
          ctx. drawImage(img21,175,125,350,250)
        }else if(dir == 3 && py == enemy[i][1] && px-1 == enemy[i][0]){
          ctx. drawImage(img21,175,125,350,250)
        }else if(dir == 0 && py-2 == enemy[i][1] && px == enemy[i][0] && map[py-1][px] == 1){
          ctx. drawImage(img21,262.5,187.5,175,125)
        }else if(dir == 1 && py == enemy[i][1] && px+2 == enemy[i][0] && map[py][px+1] == 1){
          ctx. drawImage(img21,262.5,187.5,175,125)
        }else if(dir == 2 && py+2 == enemy[i][1] && px == enemy[i][0] && map[py+1][px] == 1){
          ctx. drawImage(img21,262.5,187.5,175,125)
        }else if(dir == 3 && py == enemy[i][1] && px-2 == enemy[i][0] && map[py][px-1] == 1){
          ctx. drawImage(img21,262.5,187.5,175,125)
        }
      }

}

function updisplay(){
  //描写関係の処理のまとめ、上書き
  if(pro == 0){
    ctx.drawImage(img22,0,0)
  }else if(pro == 1){
    ctx.clearRect(0,0,700,700)
    fdis();
    setTimeout("ffdis();",1)
    setTimeout("fffdis();",2)
    setTimeout("ctx.drawImage(img7,0,0,700,500)",3)
    setTimeout("mapdis();",4)
    setTimeout("pbar();",5)
    setTimeout("edis()",6)
    if(hp == 1){
      setTimeout("ctx.drawImage(img23,0,0,700,500)",7)
    }else if(hp <= 0){
      setTimeout("ctx.drawImage(img23,0,0,700,500)",7)
      pro = 3
    }
    if(turn == 0){
      turn = 1
      eattack();
    }else if(turn == 1){
      turn = 0
      eattack();
    }

  }else if(pro == 2){
    setTimeout("ctx.drawImage(img24,0,0,700,500)",2000)
  }else if(pro == 3){
    setTimeout("ctx.drawImage(img25,0,0,700,500)",7)
  }
}

function onClick(e){
  //クリックしたときの処理
   cx = e.clientX - canvas.offsetLeft;
   cy = e.clientY - canvas.offsetTop;
  ctplayer();
  setTimeout("updisplay();",10)
  //console.log("x:",cx,"y:",cy)
    if(pro == 0){
      pro = 1
    }
  }

//初期設定
makemaze();
setgoal();
setplayer();
setenemy();
//

//img6は一番画像が重たいので、その画像を読み込んでから画像の貼り付けをすることで描写バグを防ぐ
img6.onload = function(){

  updisplay();

  console.log(img1,img2,img3,img4,img5,)
  for(let i=0; i<10; i++){
    console.log(map[i]);
  }

  console.log("1:",enemy[0][0],enemy[0][1],"2:",enemy[1][0],enemy[1][1],"3:",enemy[2][0],enemy[2][1])
}

cv.addEventListener('click',onClick,false);
