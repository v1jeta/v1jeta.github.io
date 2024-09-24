// Traffic Light Starter Code
// Vijeta Thakur
// September 24, 2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis
let lightState = 1
let waitTime = 2000;



function setup() {
  createCanvas(100, 300);
}

function draw() {
  background(255);
  drawOutlineOfLights();}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  if (lightState === 1){
    fill('red');
    ellipse(width / 2, height / 2 - 65, 50, 50); //top
    lightState = 2;
  else if (lightState === 2){
    fill("yellow");
    ellipse(width / 2, height / 2, 50, 50); //middle
    lightState = 3;

  else{
ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}}



// let waitTime = 1000;
// let lastSwitchTime = 0;
// let isWhite = true;

// function setup() {
//   createCanvas(600, 600);
// }

// function draw() {
//   if (millis() > lastSwitchTime + waitTime) {
//     isWhite = !isWhite;
//     lastSwitchTime = millis();
//   }
  
//   if (isWhite){
//     background(255);
//   } else {
//     background(0);
//   }
// }