// Object Notation and Arrays Assignment
// Vijeta Thakur
// October 8th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global
let gameState = 0;
let windowWidth = 1400; //adjust later to user resizing windows
let windowHeight = 900;

//objects 
let apple = {
  x: 200,
  y: 100,
  emoji: '🍎',
};
let banana = {
  x: 250,
  y: 100,
  emoji: '🍌',
};
let orange = {
  x: 300,
  y: 100,
  emoji: '🍊',
};
let grapes = {
  x: 350,
  y: 100,
  emoji: '🍇',
};
let melon = {
  x: 400,
  y: 100,
  emoji: '🍈',
};


//media uploads
let bgImage;
let startScreenImg;


// load images and audio
function preload(){
  bgImage = loadImage('main-bg.png') ;
  startScreenImg = loadImage('startscreen.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayScreens();
}

function displayScreens(){
  if (gameState === 0){
    //start screen
    image(startScreenImg, 0, 0);
    textSize(25);
    text(apple.emoji, apple.x, apple.y);
    text(banana.emoji,banana.x,banana.y);
    text(orange.emoji, orange.x, orange.y);
    text(grapes.emoji, grapes.x, grapes.y);
    text(melon.emoji, melon.x, melon,y);
  }

  if (gameState === 1){
    //game running
    image(bgImage, width/2, height/2);
  }

  if (gameState === 2){
    //win screen
  }

  if (gameState === 3){
    //lose screen
  }
}