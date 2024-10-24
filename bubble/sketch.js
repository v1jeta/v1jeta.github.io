// Bubble Array Object Notation Demo
// October 10 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i<2; i++){
    spawnBubble();
  }

  // create new bubble every half second
  window.setInterval(spawnBubble, 1000);
}

function draw() {
  background(225);
  //moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
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
  for (let bubble of theBubbles){
    if (clickedInBubble(mouseX, mouseY, bubble)){
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
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

function clickedInBubble(x,y,theBubble){
  let distanceAway = dist(x,y, theBubble.x, theBubble.y);
  if (distanceAway<theBubble.radius){
    return true;
  }
  else{
    return false;
  }
}

function displayBubbles(){
  for (let bubble of theBubbles){
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius*2);
    showFruit(bubble.x, bubble.y, bubble.fruit);
  }
}

function showFruit(x, y, type) {
  if (type === "apple") {
    
  }
}

function moveBubblesWithNoise(){
  for (let bubble of theBubbles){
    let x = noise(bubble.timeX)*width;
    let y = noise(bubble.timeY)*height;
    bubble.x = x;
    bubble.y = y;
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function moveBubblesRandomly(){
  for (let bubble of theBubbles){
    let choice = random(100);
    if (choice < 50){
      //move up
      bubble.y -= bubble.speed;
    }
    else if (choice<65){
      //move down
      bubble.y += bubble.speed;
    }

    else if (choice < 80){
      //move right
      bubble.x += bubble.speed;
    }
    else{
      //move left
      bubble.x -= bubble.speed;
    }
  }
}

function spawnBubble(){
  let someBubble = {
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
    fruit: random(["apple", "orange", "banana"]),
  };
  theBubbles.push(someBubble);
}