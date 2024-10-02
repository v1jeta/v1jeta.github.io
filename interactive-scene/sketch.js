// Bacteria Battle
// Vijeta Thakur
// October 1st 2024
//
// Extra for Experts:
// I imported different fonts and added audio into my project. 

// Side Notes:
// I attempted to use an array to display my images and move my characters on p5js which worked decently
// but I couldn't make it work on VS Code so I had to repeat a lot of code (sorry in advance if it makes you cry a little bit).

//global

//player
let playerX = 250;
let playerY = 470;
let playerWidth = 75;
let playerHeight = 60;
let playerSpeed = 3;


//germ
let germWidth = 40;
let germHeight = 40;
let row = 1;
let currentRow = row;
let rowDistance = 10;
let germDistance = 0;
let germSpeed = 1;
let germDirection = 1;

// row 1
let germOneX = 50;
let germOneY = 120;
let germTwoX = 100;
let germTwoY = 120;
let germThreeX = 150;
let germThreeY = 120;
let germFourX = 200;
let germFourY = 120;
let germFiveX = 250;
let germFiveY = 120;
let germSixX = 300;
let germSixY = 120;
let germSevenX = 350;
let germSevenY = 120;
let germEightX = 400;
let germEightY = 120;
let germNineX = 450;
let germNineY = 120;

// row 2
let germTenX = 50;
let germTenY = 160;
let germElevenX = 100;
let germElevenY = 160;
let germTwelveX = 150;
let germTwelveY = 160;
let germThirteenX = 200;
let germThirteenY = 160
let germFourteenX = 250;
let germFourteenY = 160
let germFifteenX = 300;
let germFifteenY = 160;
let germSixteenX = 350;
let germSixteenY = 160;
let germSeventeenX = 400;
let germSeventeenY = 160;
let germEighteenX = 450;
let germEighteenY = 160;

// boss
let bossX = 250;
let bossY = 72;
let bossWidth = 80;
let bossHeight = 70;
let bossSpeed = 3; 
let bossDirection = 1;
let bossHealth = 100;

//boss blast
let gooX = bossX;
let gooY = bossY;
let gooPosition = 1; //keep track of where the blast is using state variable
let gooWidth = 20;
let gooHeight = 20;

//blaster
let blastOneX = playerX;
let blastOneY = playerY;
let blastOnePosition = 0; //keeps track of where the blast currently is using state variables
let blastWidth = 17;
let blastHeight = 17;
let blastSpeed = 8;
let blastFired = false;


//media imports
let playerImg;
let germImg;
let blastImg;
let bossImg;
let gooImg;
let blastSound;
let backgroundSound;
let mainFont;
// counters
let score = 0;
let lives = 5;
let gameState = 0;

function preload(){
  playerImg = loadImage('sanitizer.png');
  germImg = loadImage('regGerm.png');
  blastImg = loadImage('droplet.png');
  bossImg = loadImage('bossgerm.png');
  gooImg = loadImage('goo.png');
  blastSound = loadSound('laser-shot.mp3');
  backgroundSound = loadSound('backgroundmusic.mp3')
  mainFont = loadFont('mainFont.ttf');
}

function setup() {
  createCanvas(500, 500);
  backgroundSound.play();
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
}

function draw(){
if (gameState === 0){
  startScreen()
}
if (gameState === 1){
  game();
} 
if (gameState === 2){
  win();
}
if (gameState == 3){
  lose();
}
}

function game() {
  background(135, 199, 152); 
  worldAppearance();
  drawPlayer();
  drawGerms();
  movePlayer();
  blastDetect();
  firingTheBlast();
  collision();
  bossAttacks();
}

function worldAppearance(){
  noStroke();
  fill(188, 230, 199);
  rect(width/2, 10, width, 50); //score banner

  // status bar
  fill(46, 89, 59);
  //score
  textSize(30);
  text("score:", 30, 25);
  textFont(mainFont);
  textSize(20);
  text(score, 65, 25);
  if (score>=28){
    gameState = 2; //win screen
  }
  textSize(30);
  text("lives:", 450, 27);
  textFont(mainFont);
  textSize(20);
  text(lives, 480, 25);
  if (lives<=0){
    gameState = 3; //lose screen
  }

}

function drawPlayer(){
  fill(165,169,180); //silver
  image(playerImg, playerX, playerY, playerWidth, playerHeight);  
}

// displaying and moving germs
function drawGerms(){
  fill(255);
  // row one
  image(germImg,germOneX, germOneY, germWidth, germHeight)
  image(germImg,germTwoX, germTwoY, germWidth, germHeight)
  image(germImg,germThreeX, germThreeY, germWidth, germHeight)
  image(germImg,germFourX, germFourY, germWidth, germHeight)
  image(germImg,germFiveX, germFiveY, germWidth, germHeight)
  image(germImg,germSixX, germSixY, germWidth, germHeight)
  image(germImg,germSevenX, germSevenY, germWidth, germHeight)
  image(germImg,germEightX, germEightY, germWidth, germHeight)
  image(germImg,germNineX, germNineY, germWidth, germHeight)

  // row two
  image(germImg,germTenX, germTenY, germWidth, germHeight)
  image(germImg,germElevenX, germElevenY, germWidth, germHeight)
  image(germImg,germTwelveX, germTwelveY, germWidth, germHeight)
  image(germImg,germThirteenX, germThirteenY, germWidth, germHeight)
  image(germImg,germFourteenX, germFourteenY, germWidth, germHeight)
  image(germImg,germFifteenX, germFifteenY, germWidth, germHeight)
  image(germImg,germSixteenX, germSixteenY, germWidth, germHeight)
  image(germImg,germSeventeenX, germSeventeenY, germWidth, germHeight)
  image(germImg,germEighteenX, germEighteenY, germWidth, germHeight)

// allow motion
germOneX = germOneX + (germSpeed*germDirection); //back and forth
germOneY = germOneY + germDistance; // adjust rows
germTwoX = germTwoX + (germSpeed*germDirection); 
germTwoY = germTwoY + germDistance;
germThreeX = germThreeX + (germSpeed*germDirection); 
germThreeY = germThreeY + germDistance;
germFourX = germFourX + (germSpeed*germDirection); 
germFourY = germFourY + germDistance;
germFiveX = germFiveX + (germSpeed*germDirection); 
germFiveY = germFiveY + germDistance;
germSixX = germSixX + (germSpeed*germDirection); 
germSixY = germSixY + germDistance;
germSevenX = germSevenX + (germSpeed*germDirection); 
germSevenY = germSevenY + germDistance;
germEightX = germEightX + (germSpeed*germDirection); 
germEightY = germEightY + germDistance;
germNineX = germNineX + (germSpeed*germDirection); 
germNineY = germNineY + germDistance;
germTenX = germTenX + (germSpeed*germDirection); 
germTenY = germTenY + germDistance;
germElevenX = germElevenX + (germSpeed*germDirection); 
germElevenY = germElevenY + germDistance;
germTwelveX = germTwelveX + (germSpeed*germDirection); 
germTwelveY = germTwelveY + germDistance;
germThirteenX = germThirteenX + (germSpeed*germDirection); 
germThirteenY = germThirteenY + germDistance;
germFourteenX = germFourteenX + (germSpeed*germDirection); 
germFourteenY = germFourteenY + germDistance;
germFifteenX = germFifteenX + (germSpeed*germDirection); 
germFifteenY = germFifteenY + germDistance;
germSixteenX = germSixteenX + (germSpeed*germDirection); 
germSixteenY = germSixteenY + germDistance;
germSeventeenX = germSeventeenX + (germSpeed*germDirection); 
germSeventeenY = germSeventeenY + germDistance;
germEighteenX = germEighteenX + (germSpeed*germDirection); 
germEighteenY = germEighteenY + germDistance;


// horizontal movement
if (germNineX >= width-20){
  germDirection = germDirection*-1;
  row +=1;//go down
}
if (germOneX <=20){
  germDirection = germDirection*-1
  row += 1;//go down
}

// vertical movement
if (row>currentRow){
  germDistance = rowDistance;
  currentRow = row;//reset
}
else{
  germDistance = 0
}

// at bottom - game over
 if (row>=28){
  gameState = 3;
 }
}

// move sanitizer left and right
function movePlayer(){
  if (keyIsDown(LEFT_ARROW)) {
    playerX = playerX - playerSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX = playerX + playerSpeed;
  }
}

// detects if a blast should be fired
function blastDetect(){
  if (mouseIsPressed){
    blastFired = true; // fire blast when mouse is clicked
    blastSound.play();
  }
  else {
    blastFired = false;
  }
}

function firingTheBlast(){
  // blaster positions 
    // 0 means with player and ready to be fired
    // 1  means in motion after firing
    // 2 means collision with object, return to player

  // draw blast
  fill(26,175,255);
  image(blastImg, blastOneX, blastOneY, blastWidth, blastHeight);

  // keep track and fire rockets
  if (blastFired === true && blastOnePosition === 0){
    blastOnePosition = 1; 
  }

  // fire rockets code
   if (blastOnePosition === 1){
    blastOneX = blastOneX; // stops following player
    blastOneY = blastOneY - blastSpeed; // move vertically

    // misses or exceeds window
    if (blastOneY <=0){
      blastOnePosition = 2; 
    }
   }
   else{
    //not firing
    blastOneX = playerX;
    blastOneY = playerY;
   }
   //reload
   if (blastOnePosition === 2){
    blastOneX = playerX;
    blastOneY = playerY;
    blastOnePosition = 0; //reset
   }
}

// collisions between player blast and germ
function collision(){
// row one
  // collision with germ 1
  if (blastOneX >= germOneX-germWidth/2 && blastOneX <= germOneX+germWidth/2 && blastOneY >= germOneY-germHeight/2 && blastOneY<=germOneY+germHeight/2){
    germOneX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with germ 2
  if (blastOneX >= germTwoX-germWidth/2 && blastOneX <= germTwoX+germWidth/2 && blastOneY >= germTwoY-germHeight/2 && blastOneY<=germTwoY+germHeight/2){
    germTwoX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
    // collision with germ 3
  if (blastOneX >= germThreeX-germWidth/2 && blastOneX <= germThreeX+germWidth/2 && blastOneY >= germThreeY-germHeight/2 && blastOneY<=germThreeY+germHeight/2){
    germThreeX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with germ 4
  if (blastOneX >= germFourX-germWidth/2 && blastOneX <= germFourX+germWidth/2 && blastOneY >= germFourY-germHeight/2 && blastOneY<=germFourY+germHeight/2){
    germFourX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with germ 5
  if (blastOneX >= germFiveX-germWidth/2 && blastOneX <= germFiveX+germWidth/2 && blastOneY >= germFiveY-germHeight/2 && blastOneY<=germFiveY+germHeight/2){
    germFiveX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with germ 6
  if (blastOneX >= germSixX-germWidth/2 && blastOneX <= germSixX+germWidth/2 && blastOneY >= germSixY-germHeight/2 && blastOneY<=germSixY+germHeight/2){
    germSixX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with germ 7
  if (blastOneX >= germSevenX-germWidth/2 && blastOneX <= germSevenX+germWidth/2 && blastOneY >= germSevenY-germHeight/2 && blastOneY<=germSevenY+germHeight/2){
    germSevenX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
   }
  // collision with germ 8
  if (blastOneX >= germEightX-germWidth/2 && blastOneX <= germEightX+germWidth/2 && blastOneY >= germEightY-germHeight/2 && blastOneY<=germEightY+germHeight/2){
    germEightX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with germ 9
  if (blastOneX >= germNineX-germWidth/2 && blastOneX <= germNineX+germWidth/2 && blastOneY >= germNineY-germHeight/2 && blastOneY<=germNineY+germHeight/2){
    germEightX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }

//row two
// collision with germ 10
if (blastOneX >= germTenX-germWidth/2 && blastOneX <= germTenX+germWidth/2 && blastOneY >= germTenY-germHeight/2 && blastOneY<=germTenY+germHeight/2){
  germTenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with germ 11
if (blastOneX >= germElevenX-germWidth/2 && blastOneX <= germElevenX+germWidth/2 && blastOneY >= germElevenY-germHeight/2 && blastOneY<=germElevenY+germHeight/2){
  germElevenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
  // collision with germ 12
if (blastOneX >= germTwelveX-germWidth/2 && blastOneX <= germTwelveX+germWidth/2 && blastOneY >= germTwelveY-germHeight/2 && blastOneY<=germTwelveY+germHeight/2){
  germTwelveX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with germ 13
if (blastOneX >= germThirteenX-germWidth/2 && blastOneX <= germThirteenX+germWidth/2 && blastOneY >= germThirteenY-germHeight/2 && blastOneY<=germThirteenY+germHeight/2){
  germThirteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with germ 14
if (blastOneX >= germFourteenX-germWidth/2 && blastOneX <= germFourteenX+germWidth/2 && blastOneY >= germFourteenY-germHeight/2 && blastOneY<=germFourteenY+germHeight/2){
  germFourteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with germ 15
if (blastOneX >= germFifteenX-germWidth/2 && blastOneX <= germFifteenX+germWidth/2 && blastOneY >= germFifteenY-germHeight/2 && blastOneY<=germFifteenY+germHeight/2){
  germFifteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with germ 16
if (blastOneX >= germSixteenX-germWidth/2 && blastOneX <= germSixteenX+germWidth/2 && blastOneY >= germSixteenY-germHeight/2 && blastOneY<=germSixteenY+germHeight/2){
  germSixteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
 }
// collision with germ 17
if (blastOneX >= germSeventeenX-germWidth/2 && blastOneX <= germSeventeenX+germWidth/2 && blastOneY >= germSeventeenY-germHeight/2 && blastOneY<=germSeventeenY+germHeight/2){
  germSeventeenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with germ 18
if (blastOneX >= germEighteenX-germWidth/2 && blastOneX <= germEighteenX+germWidth/2 && blastOneY >= germEighteenY-germHeight/2 && blastOneY<=germEighteenY+germHeight/2){
  germEighteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
}

// boss display, movement and attacks
function bossAttacks(){
  //draw boss
  image(bossImg, bossX, bossY, bossWidth, bossHeight);
  //print health
  textFont(mainFont);
  textSize(15);
  fill(46, 89, 59); //forest green
  text(bossHealth, bossX, bossY-35 );

  // boss movement
  bossX = bossX + bossSpeed*bossDirection;
  if (bossX>=width-10){ //hits right wall
    bossDirection = bossDirection*-1;
  }
  if (bossX<=10){ //hits left wall
    bossDirection = bossDirection*-1;
  }

  //hit by rocket
  if (blastOneX >= bossX - bossWidth/2 && blastOneX <= bossX + bossWidth/2 && blastOneY >= bossY-bossHeight/2 && blastOneY<=bossY+bossHeight/2){
    if(bossHealth>10){ //not dead yet
      score+=1;
      bossHealth -= 10;
      blastOnePosition = 2;
    }
    else{
      score+=1;
      bossSpeed = 0; //stop moving
      bossX = -1000; //move off screen
      blastOnePosition = 2;
    }
  }

  //boss fights back
  //position one = motion after firing
  //position two = reset back to boss
  //draw goo
  image(gooImg,gooX, gooY, gooWidth, gooHeight);

  //fire
  if (gooPosition === 1){
    gooX=gooX;
    gooY = gooY+blastSpeed;

    //return
    if (gooY>=height){
      gooPosition = 2;
    }
  }
  else{
    gooX = bossX;
    gooY = bossY;
  }

  if (gooPosition ===2){
    gooX = bossX;
    gooY=bossY;
    gooPosition = 1;
  }

  //goo collision with player
  if (gooX>=playerX-playerWidth/2 && gooX<=playerX+playerWidth/2 && gooY>=playerY-playerHeight/2 && gooY<=playerY+playerHeight/2){
    lives -= 1;
    playerX = width/2; //set player to middle
    gooPosition = 2; //send rocket back
  }
}

// intro screen
function startScreen(){
  background(154,200,136);
  //text
  fill(255);
  textFont(mainFont);
  textSize(90);
  text("bacteria battle!", width/2, 80);
  textSize(40);
  text("use left and right arrows to move,", width/2, 170);
  text("click to shoot germs,", width/2, 230);
  text("avoid the boss,", width/2, 290);
  text("and protect yourself!", width/2, 350);
  text("press any key to start", width/2, 450);

  if (keyIsPressed){
    gameState = 1; 
  }
}
// win screen
function win(){
  background(154,200,136);
  //text
  fill(255);
  textFont(mainFont);
  textSize(100);
  text("you won!", width/2, 230);
  textSize(40);
  text("refresh to play again :)", width/2, 300);
}

// lose screen
function lose(){
  background(154,200,136);
  //text
  fill(255);
  textFont(mainFont); 
  textSize(100);
  text("you lost!", width/2, 230);
  textSize(40);
  text("refresh to try again :(", width/2, 300);
}
