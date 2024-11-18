// Fireworks OOP
// November 18 2024

const NUMBER_OF_FIREWORKS_PER_CLICK = 100;

class Spark{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.size = 5;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }

  update(){
    // move
    this.x += this.dx;
    this.y += this.dy;

    // fade over time
    this.opacity --;
  }

  isDead(){
    return this.opacity <= 0;
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let firework of theFireworks){
    if (firework.isDead()){
      // delete it
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    else{
      firework.update();
      firework.display();
    }
  }
}

function mousePressed(){
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++){
    let someFirework = new Spark(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}