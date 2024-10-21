// Object Notation and Arrays Assignment
// Vijeta Thakur
// October 8th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global
let gameState = 0;
let score = 0;
let lives = 3;
const gravity = 0.3;

// media uploads
// images
let appleImg;
let bananaImg;
let orangeImg;
let coconutImg;
let strawberryImg;
let watermelonImg;
let pineappleImg;
let limeImg;
let bombImg;
let startScreenImg;
let bgImage;
let gameOverImg;
// fonts
let mainFont;

// fruit initialization
let fruitWidth = 175;
let fruitHeight = 175;

// arrays
let theFruits = [];
let theBombs = [];
let deathLocations = [];


// loading images, fonts and audio
function preload(){
  // images
  appleImg = loadImage('./images/apple.png');
  bananaImg = loadImage('./images/banana.png');
  orangeImg = loadImage('./images/orange.png');
  coconutImg = loadImage('./images/coconut.png');
  strawberryImg = loadImage('./images/strawberry.png');
  watermelonImg = loadImage('./images/watermelon.png');
  pineappleImg = loadImage('./images/pineapple.png');
  limeImg = loadImage('./images/lime.png');
  bombImg = loadImage('./images/bomb.png');
  bgImage = loadImage('./images/main-bg.png');
  startScreenImg = loadImage('./images/startscreen.jpeg');
  gameOverImg = loadImage('./images/gameover.jpg');

  // fonts
  mainFont = loadFont('mainFont.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(mainFont);
  for (let i = 0; i<1; i++){
    spawnFruit();
  }
  for (let i = 0; i <1; i++){
    spawnBomb();
  }

  // create new fruit every seven seconds
  window.setInterval(spawnFruit, 5000);
  window.setInterval(spawnBomb, 10000);
}

function draw() {
  background(255);
  displayScreens();
}

function displayScreens(){
  if (gameState === 0){
    //start screen
    background(startScreenImg);
    textAlign(CENTER);
    textSize(32);
    fill(27, 227, 27);
    text("Click to Start", width/2, height/2 + 250);
    if (mouseIsPressed === true){
      gameState = 1;
    }
  }

  if (gameState === 1){
    //game running
    background(bgImage);
    moveFruitsUsingGravity();
    moveBombsUsingGravity();
    displayDeathSpots();
    displayBombs();
    displayFruits();
    displayScoreAndLives();
  }

  if (gameState === 2){
    //game over
    background(gameOverImg);
    fill(179, 21, 21); // dark red
    text('your final score was '+ score, width/2 + 150, height/2 + 110);

  }

}

function displayScoreAndLives(){
  // score
  textSize(32);
  fill(46, 23, 1); // dark brown
  textAlign(LEFT, TOP);
  text("Score:" + score, 10,10);
  // lives
  textAlign(RIGHT, TOP);
  text("Lives:" + lives, width-10,10)
}

function displayDeathSpots(){
  for (let spot of deathLocations){
    fill(61, 20, 1); //dark brown
    textAlign(CENTER, CENTER);
    textSize(30)
    text("X", spot.x, spot.y);
  }
}

function mousePressed(){
  for (let fruit of theFruits){
    if (clickedInFruit(mouseX, mouseY, fruit)){
      let theIndex = theFruits.indexOf(fruit);
      theFruits.splice(theIndex, 1); //remove clicked fruit from array
      addDeath(mouseX,mouseY); // mark the spot
      score += 1; // increase score
      break;
    }
  }

  for (let bomb of theBombs){
    if (clickedInBomb(mouseX, mouseY, bomb)){
      let theIndex = theBombs.indexOf(bomb);
      theBombs.splice(theIndex, 1); //remove clicked fruit from array
      addDeath(mouseX,mouseY); // mark the spot
      lives -= 1; // increase score
      break;
    }
  }
}

function addDeath(_x,_y){
  let deathSpot = {
    x: _x,
    y: _y + fruitHeight/2,
  };
  deathLocations.push(deathSpot);
}
function clickedInFruit(x,y,theFruit){
  // let distanceAway = dist(x,y, theFruit.x, theFruit.y);
  // return distanceAway < theFruit.radius;
  return(
    x >= theFruit.x &&
    x <= theFruit.x + fruitWidth &&
    y >= theFruit.y &&
    y <= theFruit.y + fruitHeight
  );
}

function clickedInBomb(x,y,theBomb){
  // let distanceAway = dist(x,y, theFruit.x, theFruit.y);
  // return distanceAway < theFruit.radius;
  return(
    x >= theBomb.x &&
    x <= theBomb.x + fruitWidth &&
    y >= theBomb.y &&
    y <= theBomb.y + fruitHeight
  );
}

function displayFruits(){
  for (let fruit of theFruits){
    showFruit(fruit.x, fruit.y, fruit.fruit);
  }
}

function showFruit(x, y, type) {
  if (type === "apple") {
    image(appleImg,x,y,fruitWidth,fruitHeight);
  }
  else if(type === "orange"){
    image(orangeImg,x,y,fruitWidth,fruitHeight);
  }
  else if(type === "banana"){
    image(bananaImg,x,y,fruitWidth,fruitHeight);
  }
  else if (type === "coconut"){
    image(coconutImg,x,y,fruitWidth,fruitHeight);
  }
  else if (type === "strawberry"){
    image(strawberryImg,x,y,fruitWidth,fruitHeight);
  }
  else if (type === "watermelon"){
    image(watermelonImg,x,y,fruitWidth,fruitHeight);
  }
  else if (type === "pineapple"){
    image(pineappleImg,x,y,fruitWidth,fruitHeight);
  }
  else{
    image(limeImg,x,y,fruitWidth,fruitHeight);
  }
}

function displayBombs(){
  for (let bomb of theBombs){
    showBomb(bomb.x,bomb.y);
  }
}

function showBomb(x,y){
  image(bombImg,x,y,fruitWidth,fruitHeight);
}

function moveFruitsUsingGravity(){
  for (let fruit of theFruits){
    // update position using velocities
    fruit.x += fruit.xVelocity; // horizontal movement
    fruit.y += fruit.yVelocity; // vertical movement

    // apply gravity to y position
    fruit.yVelocity += gravity;

    // check if fruit is off the screen
    if (fruit.y > height + fruit.radius || fruit.x < fruit.radius *-1 || fruit.x > width + fruit.radius){
      lives -= 1;
      if(lives < 1){
        gameState = 2;
      }
      let theIndex = theFruits.indexOf(fruit);
      theFruits.splice(theIndex, 1);
    }
  }
}
function moveBombsUsingGravity(){
  for (let bomb of theBombs){
    // update position using velocities
    bomb.x += bomb.xVelocity; // horizontal movement
    bomb.y += bomb.yVelocity; // vertical movement

    // apply gravity to y position
    bomb.yVelocity += gravity;
  }
}


function spawnFruit(){
  // spawn on left or right side randomly
  let startOnLeft = random()> 0.5;

  let someFruit = {
    x: startOnLeft ? 0: width, // start from left (0) or right (width)
    y: height - 200, //start slightly offscreen
    xVelocity: startOnLeft ? random(2,5) : random(-5,-2), // move right if on left, move left if on right
    yVelocity: random(-12, -15), // initial upward velocity to create arc
    speed: random(1,4),
    radius: random(20,40),
    timeX: random(10000000),
    timeY: random(10000000),
    deltaTime: 0.02,
    fruit: random(["apple", "orange", "banana", "coconut", "strawberry","watermelon", "pineapple", "lime"]),
  };
  theFruits.push(someFruit);
}

function spawnBomb(){
  let startOnLeft = random()> 0.5;
  let someBomb = {
    x: startOnLeft ? 0: width, // start from left (0) or right (width)
    y: height - 200, //start slightly offscreen
    xVelocity: startOnLeft ? random(1,7) : random(-7,-1), // move right if on left, move left if on right
    yVelocity: random(-12, -15), // initial upward velocity to create arc
    speed: random(1,4),
    radius: random(20,40),
    timeX: random(10000000),
    timeY: random(10000000),
    deltaTime: 0.02,
  };
  theBombs.push(someBomb);
}