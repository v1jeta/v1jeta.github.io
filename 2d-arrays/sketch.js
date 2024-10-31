// 2D Arrays Assignment - Minesweeper
// Vijeta Thakur
// October 30, 2024
//
// Extra for Experts:

let grid;
let cellSize;
const GRID_SIZE = 18;
let rows;
let cols;
let totalBombs = 30;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("white");
      }
      else if (grid[y][x] === 0) {
        fill(130);
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

// function checkNeighbours(){
//   let  nextTurn = generateEmptyGrid(GRID_SIZE,GRID_SIZE);

//   for (let y = 0; y < GRID_SIZE; y++) {
//     for (let x = 0; x < GRID_SIZE; x++) {
//       let neighbours = 0;

//       //look at every neighbour around it
//       for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++) {
//           //don't fall off the edge
//           if (x+j >= 0 && x+j < GRID_SIZE && y+i >= 0 && y+i < GRID_SIZE) {
//             neighbours += grid[y+i][x+j];
//           }
//         }
//       }

//       //don't count yourself as a neighbour
//       neighbours -= grid[y][x];

//       // if bombs around
//     }
//   }
// }
function displayBomb(){
  if 
}

function pickBombSpots(rows,cols){
  let options  = [];
  for (let y = 0; y<rows; y++){
    for (let x = 0; x < cols; x++){
      options.push([x,y]);
    }
  }

  for (let n = 0; n < totalBombs; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].bomb = true;
  }


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].displayBomb();
    }
  }
}