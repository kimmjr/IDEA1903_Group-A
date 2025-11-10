

let img;
let weaves = [];
let weaveSpacing = 6;
let spacing = 12;
let morphDuration = 150;
let lineImg;
let lineSystem;
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

  lineImg = createGraphics(width, height);

  lineSystem = new LineSystem(weaves);

   for (let i = 0; i < 8; i++) {
    trails.push(new LineTrail(random(width), random(height), 0.5, 150));
  }
}

function draw() {
  background(255);

  // Draw flow field from circular weave logic
  drawFlowField();
  noTint();

  // render lines using LineSystem
  lineSystem.render(lineImg);

    // Update and display trails
  for (let t of trails) {
    t.update();
    t.display();
  }

  // Draw weaves on top
  push();
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
  lineSystem = new LineSystem(weaves);
}
