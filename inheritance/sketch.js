// OOP Inheritance Demo
// Dec 3, 2024


// parent class
class Shape{
  constructor(x,y,color){
    this.x = x;
    this.y = y;
    this.color = color;
  }

  //common display for all shapes
  display(){
    noStroke();
    fill(this.color);
  }

  move(){
    this.x += random(-2,2);
    this.y += random(-2,2);
  }
}

// child class
class Circle extends Shape{
  constructor(x, y, color, radius){
    super(x,y,color);
    this.radius = radius;
  }
  // override display function
  display(){
    super.display(); //calling parent display
    circle(this.x, this.y, this.radius * 2);

  }
}

// child class
class Square extends Shape{
  constructor(x,y,color, size){
    super(x,y,color);
    this.size = size;
  }

  // override display
  display(){
    super.display();
    square(this.x, this.y, this.size);
  }
}

let theShapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // make ten shapes
  for (let i = 0; i < 10; i++){
    if (random(100)<50){
      let someCircle = new Circle(random(width), random(height), color(random(255), random(255), random(255)), random(20,50));
      theShapes.push(someCircle);
    }

    else{
      let someSquare = new Square(random(width), random(height), color(random(255), random(255), random(255)), random(20,50));
      theShapes.push(someSquare);
    }
  }
}

function draw() {
  background(220);

  for (let aShape of theShapes){
    aShape.move();
    aShape.display();
  }
}
