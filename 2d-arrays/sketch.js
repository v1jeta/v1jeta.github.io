// 2D Arrays Assignment - Minesweeper
// Vijeta Thakur
// November 15, 2024
//
// Extra for Experts: Used recursion to show empty cells

// Game settings
let cols = 10;    // Number of columns
let rows = 10;    // Number of rows
let cellSize = 40; // Size of each cell
let grid = [];    // Array to store cell objects
let totalMines = 20; // Number of mines

// Cell class to handle each cell's state
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isMine = false;
    this.revealed = false;
    this.mineCount = 0;
  }

  // Display the cell
  show() {
    stroke(0);
    fill(this.revealed ? 200 : 255);
    rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
    if (this.revealed) {
      if (this.isMine) {
        fill(127, 0, 0);
        ellipse(this.x * cellSize + cellSize / 2, this.y * cellSize + cellSize / 2, cellSize / 2);
      } else if (this.mineCount > 0) {
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.mineCount, this.x * cellSize + cellSize / 2, this.y * cellSize + cellSize / 2);
      }
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

function setup() {
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
    cell.reveal();
    if (cell.isMine) {
      // Game over logic
      console.log("Game Over!");
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          grid[x][y].revealed = true;
        }
      }
    }
  }
}
