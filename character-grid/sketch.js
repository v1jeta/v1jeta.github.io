// Character in Grid Demo - 2D Arrays
// Oct.29/2024


let grid;
let cellSize;
const GRID_SIZE = 8;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let grassImg;
let pathImg;
let thePlayer = {
  x: 0,
  y: 0,
};

function preload(){
  grassImg = loadImage("grass.jpg");
  pathImg = loadImage("path.jpg");
}

function setup() {
  if (windowWidth<windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight,windowHeight);
  }
  cellSize = width/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);

  // add player to grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function windowResized(){
  if (windowWidth<windowHeight){
    resizeCanvas(windowWidth, windowWidth);
  }
  else{
    resizeCanvas(windowHeight,windowHeight);
  }
  cellSize = width/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  // toggle self
  toggleCell(x,y);
}

function toggleCell(x,y){
  // make sure the toggled cell is in the grid
  if (x >=0 && x<GRID_SIZE && y>=0 && y<GRID_SIZE){
    if (grid[y][x] === OPEN_TILE){
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE){
      grid[y][x] = OPEN_TILE;
    }
  }
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE,GRID_SIZE);
  }
  if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE,GRID_SIZE);
  }

  // move player
  if (key === "s"){ // move down
    movePlayer(thePlayer.x,thePlayer.y + 1);
  }
  if (key === "w"){ // move up
    movePlayer(thePlayer.x,thePlayer.y - 1);
  }
  if (key === "a"){ // move left
    movePlayer(thePlayer.x - 1,thePlayer.y);
  }
  if (key === "d"){ // move right
    movePlayer(thePlayer.x + 1,thePlayer.y);
  }
}

function movePlayer(x,y){
  // dont move off grid, only move open tiles
  if (x >=0 && x<GRID_SIZE && y>=0 && y<GRID_SIZE && grid[y][x] === OPEN_TILE){

    //prev location
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    // keep track of player location
    thePlayer.x = x;
    thePlayer.y = y;

    // reset ot an open tile
    grid[oldY][oldX] = OPEN_TILE;

    // put player in grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
}

function displayGrid(){
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === IMPASSIBLE){
        //fill("black");
        image(grassImg,x*cellSize,y*cellSize,cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE){
        //fill("white");
        image(pathImg,x*cellSize,y*cellSize,cellSize,cellSize);
      }
      else if (grid[y][x] === PLAYER){
        fill("blue");
        square(x*cellSize,y*cellSize,cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y<rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      if (random(100)<50){
        newGrid[y].push(IMPASSIBLE);
      }
      else{
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols,rows){
  let newGrid = [];
  for (let y = 0; y<rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}
