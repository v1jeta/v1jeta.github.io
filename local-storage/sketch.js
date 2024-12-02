// Local Storage Demo
// Dec 2, 2024

let numberOfClicks = 0;
let highScore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // only get the highest value if it exists
  if (getItem("highest")){
    highScore = getItem("highest");
  }
}

function draw() {
  background(220);
  displayClicks();
  displayHighest();
}

function mousePressed(){
  numberOfClicks++;

  if (numberOfClicks>highScore){
    highScore = numberOfClicks;
    storeItem("highest", highScore);
  }
}
function displayClicks(){
  fill("black");
  textSize(30);
  text(numberOfClicks, 100, height/2);
}
function displayHighest(){
  fill("purple");
  textSize(30);
  text(highScore, 300, height/2);
}