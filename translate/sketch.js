// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push(); //saves the transformation matrix
  translate(200,200); //moves the origin
  rotate(mouseX);
  fill('pink');
  square(0,0,50,);
  pop(); // reset to the pushed transformation matrix

  fill("green");
  rect(width/2,height, width*2, 200);
}
