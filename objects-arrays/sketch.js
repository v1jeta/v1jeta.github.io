// Object Notation and Arrays Assignment
// Vijeta Thakur
// October 8th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global
let gameState = 1;

// media uploads
//fruit
let appleImg;
let bananaImg;
let orangeImg;
let coconutImg;
let strawberryImg;
let watermelonImg;
let pineappleImg;
let limeImg;
//not fruit
let startScreenImg;
let bgImage;

// fruit initialization
let fruitWidth = 175;
let fruitHeight = 175;

// arrays
let theFruits = [];
let deathLocations = [];

// loading images, fonts and audio
function preload(){
  // fruit images
  appleImg = loadImage('apple.png');
  bananaImg = loadImage('banana.png');
  orangeImg = loadImage('orange.png');
  coconutImg = loadImage('coconut.png');
  strawberryImg = loadImage('strawberry.png');
  watermelonImg = loadImage('watermelon.png');
  pineappleImg = loadImage('pineapple.png');
  limeImg = loadImage('lime.png');

  // not fruit images
  bgImage = loadImage('main-bg.png');
  startScreenImg = loadImage('startscreen.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i<1; i++){
    spawnFruit();
  }

  // create new fruit every three seconds
  window.setInterval(spawnFruit, 3000);
}

function draw() {
  background(bgImage);
  displayScreens();
}

function displayScreens(){
  if (gameState === 0){
    //start screen
    image(startScreenImg, 0, 0);
  }

  if (gameState === 1){
    //game running
    // image(bgImage, windowWidth, windowHeight);
    //moveFruitsWithNoise();
    moveFruitsUsingGravity();
    displayFruits();
    displayDeathSpots();
  }

  if (gameState === 2){
    //win screen
  }

  if (gameState === 3){
    //lose screen
  }
}

function displayDeathSpots(){
  for (let spot of deathLocations){
    textAlign(CENTER,CENTER);
    fill('black');
    text("X", spot.x, spot.y);
  }
}

function mousePressed(){
  for (let fruit of theFruits){
    if (clickedInFruit(mouseX, mouseY, fruit)){
      let theIndex = theFruits.indexOf(fruit);
      theFruits.splice(theIndex, 1);
      addDeath(mouseX,mouseY);
    }
  }
}

function addDeath(_x,_y){
  let deathSpot = {
    x: _x,
    y: _y,
  };
  deathLocations.push(deathSpot);
}

function clickedInFruit(x,y,theFruit){
  let distanceAway = dist(x,y, theFruit.x, theFruit.y);
  if (distanceAway<theFruit.radius){
    return true;
  }
  else{
    return false;
  }
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

function moveFruitsUsingGravity(){
  for (let fruit of theFruits){
    let choice = random(100);
    let x = 0;
    let y = 0;
    let dx = 10;
    let dy = 10;
    let gravity = 0.02;
    if (choice < 50){
      // half of the time start negative
      fruit.x = fruit.x*-1;
      fruit.x = x;
    }
    fruit.y = dy - gravity;
  }
}



function moveFruitsWithNoise(){
  for (let fruit of theFruits){
    let x = noise(fruit.timeX)*width;
    let y = noise(fruit.timeY)*height;
    fruit.x = x;
    fruit.y = y;
    fruit.timeX += fruit.deltaTime;
    fruit.timeY += fruit.deltaTime;
  }
}

function moveFruitsRandomly(){
  for (let fruit of theFruits){
    let choice = random(100);
    if (choice < 50){
      //move up
      fruit.y -= fruit.speed;
    }
    else if (choice<65){
      //move down
      fruit.y += fruit.speed;
    }

    else if (choice < 80){
      //move right
      fruit.x += fruit.speed;
    }
    else{
      //move left
      fruit.x -= fruit.speed;
    }
  }
}

function spawnFruit(){
  let someFruit = {
    x: random(width/2),
    y: height + random(0,25),
    speed: random(0.1,2.5),
    radius: random(20,40),
    r: random(150),
    g: random(150),
    b: random(255),
    alpha: random(255),
    timeX: random(10000000),
    timeY: random(10000000),
    deltaTime: 0.02,
    fruit: random(["apple", "orange", "banana", "coconut", "strawberry","watermelon", "pineapple", "lime"]),
  };
  theFruits.push(someFruit);
}