function Cell(i,j,w){
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;

  this.bomb = false;
  this.revealed = false;
}

Cell.prototype.show = function (){
  stroke(0);
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bee) {
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    }
    else {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
};

Cell.prototype.countBees = function() {
  if (this.bomb) {
    this.neighborCount = -1;
    return;
  }
  let total = 0;
  for (let xoff = -1; xoff <= 1; xoff++) {
    let i = this.i + xoff;
    if (i < 0 || i >= cols) {
      continue;
    }
  
    for (let yoff = -1; yoff <= 1; yoff++) {
      let j = this.j + yoff;
      if (j < 0 || j >= rows) {
        continue;
      }
  
      let neighbor = grid[i][j];
      if (neighbor.bomb) {
        total++;
      }
    }
  }
  this.neighborCount = total;
};