


let img;
let weaves = [];
let rowWeaves = 4;
let colWeaves = 4;
let spacing = 12;
let morphDuration = 150;
let wormImg;
let trails = [];

function preload() {
  img = loadImage('assets/KT_Pathway_Avenue.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();
  img.resize(width, height);
  drawWeaves();
  wormImg = createGraphics(width, height);

  // Initialize line trails
  for (let i = 0; i < 6; i++) {
    trails.push(new LineTrail(random(width), random(height), random(360), 0.3, 120));
  }
}

function draw() {
  background(255, 20); // Fading effect for trails

  drawFlowField();
  noTint();

  // Worm logic (hidden for now)
  /*
  wormImg.push();
  wormImg.erase(10, 10);
  wormImg.rect(0, 0, width, height);
  wormImg.noErase();
  wormImg.pop();

  drawWorms(wormImg);
  image(wormImg, 0, 0, width, height);
  */

  // Draw line trails
  for (let t of trails) {
    t.update();
    t.display();
  }

  // Draw weaves
  push();
  rotate(45);
  translate(-width / 2, -height / 2);
  for (const weave of weaves) {
    weave.update();
    weave.display();
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(width, height);
  drawWeaves();
}

class LineTrail {
  constructor(x, y, angle, speed, length) {
    this.points = [];
    this.x = x;
    this.y = y;
    this.angle = angle; // degrees
    this.speed = speed;
    this.length = length;
  }

  update() {
    this.x += cos(radians(this.angle)) * this.speed;
    this.y += sin(radians(this.angle)) * this.speed;

    this.points.push({ x: this.x, y: this.y });

    if (this.points.length > this.length) {
      this.points.shift();
    }
  }

  display() {
    noFill();
    stroke(0, 50);
    strokeWeight(1);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();

    for (let i = 0; i < this.points.length; i += 5) {
      let p = this.points[i];
      fill(0);
      noStroke();
      ellipse(p.x, p.y, 4, 4);
    }
  }
}
