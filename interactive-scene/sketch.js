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
// row 1
let flowerOneX = 30;
let flowerOneY = 70;
let flowerTwoX = 80;
let flowerTwoY = 70;
let flowerThreeX = 130;
let flowerThreeY = 70;
let flowerFourX = 180;
let flowerFourY = 70;
let flowerFiveX = 230;
let flowerFiveY = 70;
let flowerSixX = 280;
let flowerSixY = 70;
let flowerSevenX = 330;
let flowerSevenY = 70;
let flowerEightX = 380;
let flowerEightY = 70;
let flowerNineX = 430;
let flowerNineY = 70;
// row 2
let flowerTenX = 30;
let flowerTenY = 120;
let flowerElevenX = 80;
let flowerElevenY = 120;
let flowerTwelveX = 130;
let flowerTwelveY = 120;
let flowerThirteenX = 180;
let flowerThirteenY = 120
let flowerFourteenX = 230;
let flowerFourteenY = 120
let flowerFifteenX = 280;
let flowerFifteenY = 120;
let flowerSixteenX = 330;
let flowerSixteenY = 120;
let flowerSeventeenX = 380;
let flowerSeventeenY = 120;
let flowerEighteenX = 430;
let flowerEighteenY = 120;



//blaster
let blastOneX = playerX;
let blastOneY = playerY;
let blastOnePosition = 0; //keeps track of where the blast currently is using state variables
let blastWidth = 17;
let blastHeight = 17;
let blastSpeed = 7;
let blastFired = false;


//media imports
let playerImg;
let flowerImg;
let blastImg;
let blastSound;
let powerUpSound;
let mainFont;
// counters
let score = 0;
let gameState = 0;

function preload(){
  playerImg = loadImage('watering-can.png');
  flowerImg = loadImage('flower.png');
  blastImg = loadImage('droplet.png');
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
}

function worldAppearance(){
  noStroke();
  fill(232,244,248);
  rect(width/2, 10, width, 50); //score banner

  // status bar
  fill(135,206,235);
  textSize(30);
  text("score:", 30, 25);
  textFont(mainFont);
  textSize(20);
  text(score, 65, 25);
  if (score>=18){
    gameState = 2; //maxw
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

function startScreen(){
  background(255, 105, 135)
  //text
  fill(255);
  textFont(mainFont)
  textSize(90);
  text("flower frenzy!", width/2, 80)
  textSize(40);
  text("use left and right arrows to move,", width/2, 170)
  text("click to shoot,", width/2, 230)
  text("collect power ups,", width/2, 290)
  text("and grow your garden!", width/2, 350)
  text("press any key to start", width/2, 450)

  if (keyIsPressed){
    gameState = 1; 
  }
}
function win(){
  background(255, 105, 135)
  //text
  fill(255);
  textFont(mainFont)
  textSize(100);
  text("you win!", width/2, 230)
  textSize(40);
  text("refresh to play again :)", width/2, 300)
}

