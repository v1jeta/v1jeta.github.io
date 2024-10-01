// Square Moving Around Screen
// Vijeta Thakur
// September 19th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x = 0;
let y = 0;
let sqSize = 50;
let speed = 7;
let state = "right";
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  moveSquare();
  displaySquare();
}

function moveSquare(){
  if (state === "right"){
    x+=speed;
    if (x>= width -sqSize){
      state = "down";
    }
  }
  else if (state === "down"){
    y+=speed;
    if (y>=height-sqSize){
      state = "left";
    }
  }
  
  else if (state === "left"){
    x-=speed;
    if (x<=0){
      state = "up";
    }
  }
  else if (state === "up"){
    y -= speed;
    if (y<=0){
      state = "right";
    }
    
  }
}

function displaySquare(){
  fill("pink");
  square(x,y,size);
}