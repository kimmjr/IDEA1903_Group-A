


let circleGroups = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  let spacingBetween = width / 6;
  for (let i = 0; i < 5; i++) {
    circleGroups.push(new CircleGroup(spacingBetween * (i + 1), height / 2, random(80, 120), random(1, 3)));
  }
}

function draw() {
  background(255);

  for (let group of circleGroups) {
    group.update();
    group.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class CircleGroup {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.numSmall = 8; 
    this.orbitRadius = this.size / 2 + 20;
  }

  update() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size; 
    }
  }

  display() {
    
    fill(100, 150, 255);
    ellipse(this.x, this.y, this.size);

    
    for (let i = 0; i < this.numSmall; i++) {
      let angle = TWO_PI * i / this.numSmall + frameCount * 0.02;
      let sx = this.x + cos(angle) * this.orbitRadius;
      let sy = this.y + sin(angle) * this.orbitRadius;
      fill(255, 150, 150);
      ellipse(sx, sy, 15);
    }
  }
}
