// Flora Frenzy
// Vijeta Thakur
// October 1st 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//global

//player
let playerX = 200;
let playerY = 390;
let playerWidth = 50;
let playerHeight = 30;
let playerSpeed = 3;

//flower
// row 1
let flowerOneX = 30;
let flowerOneY = 70;
let flowerOneWidth = 30;
let flowerOneHeight = 30;

//blaster
let blastOneX = playerX;
let blastOneY = playerY;
let blastOnePosition = 0; //keeps track of where the blast currently is
let blastWidth = 5;
let blastHeight = 15;
let blastSpeed = 7;
let blastFired = false;


function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(135,206,235); //skyblue
  worldAppearance();
  drawPlayer();
  drawFlowers();
  movePlayer();
  blastDetect();
  firingTheBlast();
}

function worldAppearance(){
  noStroke();
  fill(232,244,248);
  rect(width/2, 10, width, 50); //score banner
}

function drawPlayer(){
  fill(165,169,180); //silver
  rect(playerX, playerY, playerWidth, playerHeight);  
}

function drawFlowers(){
  fill(255);
  rect(flowerOneX, flowerOneY, flowerOneWidth, flowerOneHeight)
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

  // draw rocket
  fill(26,175,255);
  rect(blastOneX, blastOneY, blastWidth, blastHeight);

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

