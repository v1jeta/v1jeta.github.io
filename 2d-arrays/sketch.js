// 2D Arrays Assignment - Minesweeper
// Vijeta Thakur
// November 15, 2024
//
// Extra for Experts: Used recursion to show empty cells

// Game settings
let difficulty = "medium";
let cols;    // Number of columns
let rows;    // Number of rows
let cellSize = 40; // Size of each cell
let grid = [];    // Array to store cell objects
let totalMines; // Number of mines
let isFlagging = false;

// Media
let bombImg;
let backgroundSound;

function preload(){
  bombImg = loadImage('bomb.png');
  backgroundSound = loadSound('bgm.wav');
}

function setup() {
  if (difficulty === "easy"){
    cols = 6; 
    rows = 6;
    totalMines = 5;
  }
  else if (difficulty === "medium"){
    cols = 10; 
    rows = 10;
    totalMines = 20;
  }
  else if (difficulty === "hard"){
    cols = 12;
    rows = 12;
    totalMines = 30;
  }
  
  backgroundSound.play();
  
  createCanvas(cols * cellSize, rows * cellSize);
  // Create the grid
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  // Place mines randomly
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }
  
  for (let n = 0; n < totalMines; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    options.splice(index, 1);
    grid[i][j].isMine = true;
  }
  
  // Calculate mine counts for each cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
}
// Cell class to handle each cell's state
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isMine = false;
    this.revealed = false;
    this.flagged = false;
    this.mineCount = 0;
  }

  // Display the cell
  // Display the cell
  show() {
    stroke(0);
    fill(this.revealed ? 200 : 255);  // Show cell background
    rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);

    if (this.revealed) {
      if (this.isMine) {
        image(bombImg, this.x * cellSize, this.y * cellSize, cellSize, cellSize);
      }
      else if (this.mineCount > 0) {
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.mineCount, this.x * cellSize + cellSize / 2, this.y * cellSize + cellSize / 2);
      }
    }
    else if (this.flagged) { // Flag should be visible if cell is flagged and not revealed
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      text('🚩', this.x * cellSize + cellSize / 2, this.y * cellSize + cellSize / 2);
    }
  }


  // Count mines around this cell
  countMines() {
    if (this.isMine) {
      this.mineCount = -1;
      return;
    }
    let total = 0;
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        let i = this.x + xOffset;
        let j = this.y + yOffset;
        if (i >= 0 && i < cols && j >= 0 && j < rows) {
          let neighbor = grid[i][j];
          if (neighbor.isMine) {
            total++;
          }
        }
      }
    }
    this.mineCount = total;
  }

  // Reveal the cell
  reveal() {
    this.revealed = true;
    if (this.mineCount === 0) {
      // Reveal neighbors if there are no adjacent mines
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          let i = this.x + xOffset;
          let j = this.y + yOffset;
          if (i >= 0 && i < cols && j >= 0 && j < rows) {
            let neighbor = grid[i][j];
            if (!neighbor.revealed) {
              neighbor.reveal();
            }
          }
        }
      }
    }
  }
}


// Track Space key press and release
function keyPressed() {
  if (keyCode === 32) {  // Space key
    isFlagging = true;
  }
}

function keyReleased() {
  if (keyCode === 32) {
    isFlagging = false;
  }
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function mousePressed() {
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);

  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    let cell = grid[i][j];

    if (isFlagging) {
      // Toggle flag if the cell isn’t revealed
      if (!cell.revealed) {
        cell.flagged = !cell.flagged;
      }
    }
    else if (mouseButton === LEFT) {
      // Left-click to reveal only if not flagged
      if (!cell.flagged) {
        cell.reveal();
        if (cell.isMine) {
          console.log("Game Over!");
          revealBoard();
        }
      }
    }
  }
}

function revealBoard() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].revealed === false) {
        grid[i][j].revealed = true;
      }
    }
  }
}


