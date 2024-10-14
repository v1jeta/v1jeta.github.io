// Object Notation and Arrays Assignment
// Vijeta Thakur
// October 8th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global

// let theFruits = [];
// let sliceLocations = [];

// let gameState = 0;
// let windowWidth = 1400; //adjust later to user resizing windows
// let windowHeight = 900;


// //media uploads
// let bgImage;
// let startScreenImg;


// // load images and audio
// function preload(){
//   bgImage = loadImage('main-bg.png') ;
//   startScreenImg = loadImage('startscreen.jpeg');
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(220);
//   displayScreens();
// }

// function displayScreens(){
//   if (gameState === 0){
//     //start screen
//     image(startScreenImg, 0, 0);
//     textSize(25);
//     text(apple.emoji, apple.x, apple.y);
//     text(banana.emoji,banana.x,banana.y);
//     text(orange.emoji, orange.x, orange.y);
//     text(grapes.emoji, grapes.x, grapes.y);
//     text(melon.emoji, melon.x, melon,y);
//   }

//   if (gameState === 1){
//     //game running
//     image(bgImage, width/2, height/2);
//   }

//   if (gameState === 2){
//     //win screen
//   }

//   if (gameState === 3){
//     //lose screen
//   }
// }


// global

// media uploads
let appleImg;
let bananaImg;
let orangeImg;
let coconutImg;
let strawberryImg;
let watermelonImg;

let theFruits = [];
let deathLocations = [];

let fruitHeight = 50;
let fruitWidth = 50;

function preload(){
  appleImg = loadImage('apple.png');
  bananaImg = loadImage('banana.png');
  orangeImg = loadImage('orange.png');
  coconutImg = loadImage('coconut.png');
  strawberryImg = loadImage('strawberry.png');
  watermelonImg = loadImage('watermelon.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i<2; i++){
    spawnFruit();
  }

  // create new fruit every half second
  window.setInterval(spawnFruit, 1000);
}

function draw() {
  background(225);
  //moveFruitsRandomly();
  moveFruitsWithNoise();
  displayFruits();
  displayDeathSpots();
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
    fill(fruit.r, fruit.g, fruit.b, fruit.alpha);
    circle(fruit.x, fruit.y, fruit.radius*2);
    showFruit(fruit.x, fruit.y, fruit.fruit);
  }
}

function showFruit(x, y, type) {
  if (type === "apple") {
    image(appleImg, fruit.x, fruit.y, fruitWidth, fruitHeight);
  }
  else if (type === "banana"){
    image(bananaImg, fruit.x, fruit.y, fruitWidth, fruitHeight);
  }
  else if (type === "orange"){
    image(orangeImg, fruit.x,fruit.y, fruitWidth, fruitHeight);
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
    x: random(width),
    y: height + random(0,25),
    speed: random(2,5),
    radius: random(20,40),
    r: random(150),
    g: random(150),
    b: random(255),
    alpha: random(255),
    timeX: random(10000000),
    timeY: random(10000000),
    deltaTime: 0.02,
    fruit: random(["apple", "orange", "banana", "coconut", "strawberry", "watermelon"]),
  };
  theFruits.push(someFruit);
}

