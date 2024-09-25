// Traffic Light Starter Code
// Vijeta Thakur
// September 24, 2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let lightState = 1;
let lastSwitchedTime = 0;
const GREEN_LIGHT_DURATION = 3000;
const YELLOW_LIGHT_DURATION = 1000;
const RED_LIGHT_DURATION = 3500;

function setup() {
  createCanvas(100, 300);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeStateIfNeeded();
  displayLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}

function displayLight(){
  if (lightState === 1){
    fill("green");
    ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
  }
  else if (lightState === 2){
    fill("yellow");
    ellipse(width / 2, height / 2, 50, 50); //middle
  }
  else if (lightState === 3){
    fill("red");
    ellipse(width / 2, height / 2 - 65, 50, 50); //top
  }
}

function changeStateIfNeeded(){
  if (lightState === 1 && millis()> lastSwitchedTime + GREEN_LIGHT_DURATION){
    lightState = 2;
    lastSwitchedTime = millis();
  }
  else if (lightState === 2 && millis()> lastSwitchedTime + YELLOW_LIGHT_DURATION){
    lightState = 3;
    lastSwitchedTime = millis();
  }
  else if (lightState === 3 && millis()> lastSwitchedTime + RED_LIGHT_DURATION){
    lightState = 1;
    lastSwitchedTime = millis();
  }
}