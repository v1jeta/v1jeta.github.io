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
// row 1
let flowerOneX = 30;
let flowerOneY = 70;
let flowerOneWidth = 40;
let flowerOneHeight = 40;


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
  if (score>=1){
    gameState = 2; //maxw
  }
}

function drawPlayer(){
  fill(165,169,180); //silver
  image(playerImg, playerX, playerY, playerWidth, playerHeight);  
}

function drawFlowers(){
  fill(255);
  image(flowerImg,flowerOneX, flowerOneY, flowerOneWidth, flowerOneHeight)
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
  if (blastOneX >= flowerOneX-flowerOneWidth/2 && blastOneX <= flowerOneX+flowerOneWidth/2 && blastOneY >= flowerOneY-flowerOneHeight/2 && blastOneY<=flowerOneY+flowerOneHeight/2){
    flowerOneX = -1000; //send alien off screen
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

