// Object Notation and Arrays Assignment
// Vijeta Thakur
// October 8th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global
let bgImage;

// load images and audio
function preload(){
  bgImage = loadImage('main-bg.png') ;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(bgImage,width/2, height/2);
}
