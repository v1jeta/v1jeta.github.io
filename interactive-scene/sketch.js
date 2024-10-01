// Flora Frenzy
// Vijeta Thakur
// October 1st 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//global

//player
let playerX = 250;
let playerY = 470;
let playerWidth = 75;
let playerHeight = 60;
let playerSpeed = 3;


//flower
let flowerWidth = 40;
let flowerHeight = 40;
let row = 1;
let currentRow = row;
let rowDistance = 10;
let flowerDistance = 0;
let flowerSpeed = 1;
let flowerDirection = 1;
// row 1
let flowerOneX = 50;
let flowerOneY = 120;
let flowerTwoX = 100;
let flowerTwoY = 120;
let flowerThreeX = 150;
let flowerThreeY = 120;
let flowerFourX = 200;
let flowerFourY = 120;
let flowerFiveX = 250;
let flowerFiveY = 120;
let flowerSixX = 300;
let flowerSixY = 120;
let flowerSevenX = 350;
let flowerSevenY = 120;
let flowerEightX = 400;
let flowerEightY = 120;
let flowerNineX = 450;
let flowerNineY = 120;
// row 2
let flowerTenX = 50;
let flowerTenY = 160;
let flowerElevenX = 100;
let flowerElevenY = 160;
let flowerTwelveX = 150;
let flowerTwelveY = 160;
let flowerThirteenX = 200;
let flowerThirteenY = 160
let flowerFourteenX = 250;
let flowerFourteenY = 160
let flowerFifteenX = 300;
let flowerFifteenY = 160;
let flowerSixteenX = 350;
let flowerSixteenY = 160;
let flowerSeventeenX = 400;
let flowerSeventeenY = 160;
let flowerEighteenX = 450;
let flowerEighteenY = 160;

// beetle
let beetleX = 250;
let beetleY = 72;
let beetleWidth = 80;
let beetleHeight = 70;
let beetleSpeed = 3; 
let beetleDirection = 1;
let beetleHealth = 100;

//boss blast
let gooX = beetleX;
let gooY = beetleY;
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
let flowerImg;
let blastImg;
let beetleImg;
let gooImg;
let blastSound;
let powerUpSound;
let mainFont;
// counters
let score = 0;
let lives = 5;
let gameState = 0;

function preload(){
  playerImg = loadImage('watering-can.png');
  flowerImg = loadImage('flower.png');
  blastImg = loadImage('droplet.png');
  beetleImg = loadImage('beetle.png');
  gooImg = loadImage('goo.png');
  blastSound = loadSound('laser-shot.mp3');
  powerUpSound = loadSound('powerup-sparkle.mp3');
  mainFont = loadFont('cutesy-font.ttf');
}

function setup() {
  createCanvas(500, 500);
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
  background(135,206,235); //skyblue
  worldAppearance();
  drawPlayer();
  drawFlowers();
  movePlayer();
  blastDetect();
  firingTheBlast();
  collision();
  beetleAttacks();
}

function worldAppearance(){
  noStroke();
  fill(232,244,248);
  rect(width/2, 10, width, 50); //score banner

  // status bar
  fill(135,206,235);
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

function drawFlowers(){
  fill(255);
  // row one
  image(flowerImg,flowerOneX, flowerOneY, flowerWidth, flowerHeight)
  image(flowerImg,flowerTwoX, flowerTwoY, flowerWidth, flowerHeight)
  image(flowerImg,flowerThreeX, flowerThreeY, flowerWidth, flowerHeight)
  image(flowerImg,flowerFourX, flowerFourY, flowerWidth, flowerHeight)
  image(flowerImg,flowerFiveX, flowerFiveY, flowerWidth, flowerHeight)
  image(flowerImg,flowerSixX, flowerSixY, flowerWidth, flowerHeight)
  image(flowerImg,flowerSevenX, flowerSevenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerEightX, flowerEightY, flowerWidth, flowerHeight)
  image(flowerImg,flowerNineX, flowerNineY, flowerWidth, flowerHeight)

  // row two
  image(flowerImg,flowerTenX, flowerTenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerElevenX, flowerElevenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerTwelveX, flowerTwelveY, flowerWidth, flowerHeight)
  image(flowerImg,flowerThirteenX, flowerThirteenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerFourteenX, flowerFourteenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerFifteenX, flowerFifteenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerSixteenX, flowerSixteenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerSeventeenX, flowerSeventeenY, flowerWidth, flowerHeight)
  image(flowerImg,flowerEighteenX, flowerEighteenY, flowerWidth, flowerHeight)

// allow motion
flowerOneX = flowerOneX + (flowerSpeed*flowerDirection); //back and forth
flowerOneY = flowerOneY + flowerDistance; // adjust rows
flowerTwoX = flowerTwoX + (flowerSpeed*flowerDirection); 
flowerTwoY = flowerTwoY + flowerDistance;
flowerThreeX = flowerThreeX + (flowerSpeed*flowerDirection); 
flowerThreeY = flowerThreeY + flowerDistance;
flowerFourX = flowerFourX + (flowerSpeed*flowerDirection); 
flowerFourY = flowerFourY + flowerDistance;
flowerFiveX = flowerFiveX + (flowerSpeed*flowerDirection); 
flowerFiveY = flowerFiveY + flowerDistance;
flowerSixX = flowerSixX + (flowerSpeed*flowerDirection); 
flowerSixY = flowerSixY + flowerDistance;
flowerSevenX = flowerSevenX + (flowerSpeed*flowerDirection); 
flowerSevenY = flowerSevenY + flowerDistance;
flowerEightX = flowerEightX + (flowerSpeed*flowerDirection); 
flowerEightY = flowerEightY + flowerDistance;
flowerNineX = flowerNineX + (flowerSpeed*flowerDirection); 
flowerNineY = flowerNineY + flowerDistance;
flowerTenX = flowerTenX + (flowerSpeed*flowerDirection); 
flowerTenY = flowerTenY + flowerDistance;
flowerElevenX = flowerElevenX + (flowerSpeed*flowerDirection); 
flowerElevenY = flowerElevenY + flowerDistance;
flowerTwelveX = flowerTwelveX + (flowerSpeed*flowerDirection); 
flowerTwelveY = flowerTwelveY + flowerDistance;
flowerThirteenX = flowerThirteenX + (flowerSpeed*flowerDirection); 
flowerThirteenY = flowerThirteenY + flowerDistance;
flowerFourteenX = flowerFourteenX + (flowerSpeed*flowerDirection); 
flowerFourteenY = flowerFourteenY + flowerDistance;
flowerFifteenX = flowerFifteenX + (flowerSpeed*flowerDirection); 
flowerFifteenY = flowerFifteenY + flowerDistance;
flowerSixteenX = flowerSixteenX + (flowerSpeed*flowerDirection); 
flowerSixteenY = flowerSixteenY + flowerDistance;
flowerSeventeenX = flowerSeventeenX + (flowerSpeed*flowerDirection); 
flowerSeventeenY = flowerSeventeenY + flowerDistance;
flowerEighteenX = flowerEighteenX + (flowerSpeed*flowerDirection); 
flowerEighteenY = flowerEighteenY + flowerDistance;


// horizontal movement
if (flowerNineX >= width-20){
  flowerDirection = flowerDirection*-1;
  row +=1;//go down
}
if (flowerOneX <=20){
  flowerDirection = flowerDirection*-1
  row += 1;//go down
}

// vertical movement
if (row>currentRow){
  flowerDistance = rowDistance;
  currentRow = row;//reset
}
else{
  flowerDistance = 0
}

// at bottom - game over
 if (row>=28){
  gameState = 3;
 }
}

function movePlayer(){
  if (keyIsDown(LEFT_ARROW)) {
    playerX = playerX - playerSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX = playerX + playerSpeed;
  }
}

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

function collision(){
// row one
  // collision with flower 1
  if (blastOneX >= flowerOneX-flowerWidth/2 && blastOneX <= flowerOneX+flowerWidth/2 && blastOneY >= flowerOneY-flowerHeight/2 && blastOneY<=flowerOneY+flowerHeight/2){
    flowerOneX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with flower 2
  if (blastOneX >= flowerTwoX-flowerWidth/2 && blastOneX <= flowerTwoX+flowerWidth/2 && blastOneY >= flowerTwoY-flowerHeight/2 && blastOneY<=flowerTwoY+flowerHeight/2){
    flowerTwoX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
    // collision with flower 3
  if (blastOneX >= flowerThreeX-flowerWidth/2 && blastOneX <= flowerThreeX+flowerWidth/2 && blastOneY >= flowerThreeY-flowerHeight/2 && blastOneY<=flowerThreeY+flowerHeight/2){
    flowerThreeX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with flower 4
  if (blastOneX >= flowerFourX-flowerWidth/2 && blastOneX <= flowerFourX+flowerWidth/2 && blastOneY >= flowerFourY-flowerHeight/2 && blastOneY<=flowerFourY+flowerHeight/2){
    flowerFourX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with flower 5
  if (blastOneX >= flowerFiveX-flowerWidth/2 && blastOneX <= flowerFiveX+flowerWidth/2 && blastOneY >= flowerFiveY-flowerHeight/2 && blastOneY<=flowerFiveY+flowerHeight/2){
    flowerFiveX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with flower 6
  if (blastOneX >= flowerSixX-flowerWidth/2 && blastOneX <= flowerSixX+flowerWidth/2 && blastOneY >= flowerSixY-flowerHeight/2 && blastOneY<=flowerSixY+flowerHeight/2){
    flowerSixX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with flower 7
  if (blastOneX >= flowerSevenX-flowerWidth/2 && blastOneX <= flowerSevenX+flowerWidth/2 && blastOneY >= flowerSevenY-flowerHeight/2 && blastOneY<=flowerSevenY+flowerHeight/2){
    flowerSevenX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
   }
  // collision with flower 8
  if (blastOneX >= flowerEightX-flowerWidth/2 && blastOneX <= flowerEightX+flowerWidth/2 && blastOneY >= flowerEightY-flowerHeight/2 && blastOneY<=flowerEightY+flowerHeight/2){
    flowerEightX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }
  // collision with flower 9
  if (blastOneX >= flowerNineX-flowerWidth/2 && blastOneX <= flowerNineX+flowerWidth/2 && blastOneY >= flowerNineY-flowerHeight/2 && blastOneY<=flowerNineY+flowerHeight/2){
    flowerEightX = -1000; //send alien off screen
    blastOnePosition = 2; //return rocket to player
    score +=1; //adding points
  }

//row two
// collision with flower 10
if (blastOneX >= flowerTenX-flowerWidth/2 && blastOneX <= flowerTenX+flowerWidth/2 && blastOneY >= flowerTenY-flowerHeight/2 && blastOneY<=flowerTenY+flowerHeight/2){
  flowerTenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with flower 11
if (blastOneX >= flowerElevenX-flowerWidth/2 && blastOneX <= flowerElevenX+flowerWidth/2 && blastOneY >= flowerElevenY-flowerHeight/2 && blastOneY<=flowerElevenY+flowerHeight/2){
  flowerElevenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
  // collision with flower 12
if (blastOneX >= flowerTwelveX-flowerWidth/2 && blastOneX <= flowerTwelveX+flowerWidth/2 && blastOneY >= flowerTwelveY-flowerHeight/2 && blastOneY<=flowerTwelveY+flowerHeight/2){
  flowerTwelveX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with flower 13
if (blastOneX >= flowerThirteenX-flowerWidth/2 && blastOneX <= flowerThirteenX+flowerWidth/2 && blastOneY >= flowerThirteenY-flowerHeight/2 && blastOneY<=flowerThirteenY+flowerHeight/2){
  flowerThirteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with flower 14
if (blastOneX >= flowerFourteenX-flowerWidth/2 && blastOneX <= flowerFourteenX+flowerWidth/2 && blastOneY >= flowerFourteenY-flowerHeight/2 && blastOneY<=flowerFourteenY+flowerHeight/2){
  flowerFourteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with flower 15
if (blastOneX >= flowerFifteenX-flowerWidth/2 && blastOneX <= flowerFifteenX+flowerWidth/2 && blastOneY >= flowerFifteenY-flowerHeight/2 && blastOneY<=flowerFifteenY+flowerHeight/2){
  flowerFifteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with flower 16
if (blastOneX >= flowerSixteenX-flowerWidth/2 && blastOneX <= flowerSixteenX+flowerWidth/2 && blastOneY >= flowerSixteenY-flowerHeight/2 && blastOneY<=flowerSixteenY+flowerHeight/2){
  flowerSixteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
 }
// collision with flower 17
if (blastOneX >= flowerSeventeenX-flowerWidth/2 && blastOneX <= flowerSeventeenX+flowerWidth/2 && blastOneY >= flowerSeventeenY-flowerHeight/2 && blastOneY<=flowerSeventeenY+flowerHeight/2){
  flowerSeventeenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
// collision with flower 18
if (blastOneX >= flowerEighteenX-flowerWidth/2 && blastOneX <= flowerEighteenX+flowerWidth/2 && blastOneY >= flowerEighteenY-flowerHeight/2 && blastOneY<=flowerEighteenY+flowerHeight/2){
  flowerEighteenX = -1000; //send alien off screen
  blastOnePosition = 2; //return rocket to player
  score +=1; //adding points
}
}

function beetleAttacks(){
  //draw beetle
  image(beetleImg, beetleX, beetleY, beetleWidth, beetleHeight);
  //print health
  textFont(mainFont);
  textSize(15);
  fill(34,139,34); //forest green
  text(beetleHealth, beetleX, beetleY-25);

  // beetle movement
  beetleX = beetleX + beetleSpeed*beetleDirection;
  if (beetleX>=width-10){ //hits right wall
    beetleDirection = beetleDirection*-1;
  }
  if (beetleX<=10){ //hits left wall
    beetleDirection = beetleDirection*-1;
  }

  //hit by rocket
  if (blastOneX >= beetleX - beetleWidth/2 && blastOneX <= beetleX + beetleWidth/2 && blastOneY >= beetleY-beetleHeight/2 && blastOneY<=beetleY+beetleHeight/2){
    if(beetleHealth>10){ //not dead yet
      score+=1;
      beetleHealth -= 10;
      blastOnePosition = 2;
    }
    else{
      score+=1;
      beetleSpeed = 0; //stop moving
      beetleX = -1000; //move off screen
      blastOnePosition = 2;
    }
  }

  //beetle fights back
  //position one = motion after firing
  //position two = reset back to beetle
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
    gooX = beetleX;
    gooY = beetleY;
  }

  if (gooPosition ===2){
    gooX = beetleX;
    gooY=beetleY;
    gooPosition = 1;
  }

  //goo collision with player
  if (gooX>=playerX-playerWidth/2 && gooX<=playerX+playerWidth/2 && gooY>=playerY-playerHeight/2 && gooY<=playerY+playerHeight/2){
    lives -= 1;
    playerX = width/2; //set player to middle
    gooPosition = 2; //send rocket back
  }
}

function startScreen(){
  background(255, 105, 135);
  //text
  fill(255);
  textFont(mainFont);
  textSize(90);
  text("flower frenzy!", width/2, 80);
  textSize(40);
  text("use left and right arrows to mov;e,", width/2, 170);
  text("click to shoot,", width/2, 230);
  text("collect power ups,", width/2, 290);
  text("and grow your garden!", width/2, 350);
  text("press any key to start", width/2, 450);

  if (keyIsPressed){
    gameState = 1; 
  }
}
function win(){
  background(255, 105, 135);
  //text
  fill(255);
  textFont(mainFont);
  textSize(100);
  text("you win!", width/2, 230);
  textSize(40);
  text("refresh to play again :)", width/2, 300);
}

function lose(){
  background(255, 105, 135);
  //text
  fill(255);
  textFont(mainFont);
  textSize(100);
  text("you lost!", width/2, 230);
  textSize(40);
  text("refresh to try again :(", width/2, 300);
}
