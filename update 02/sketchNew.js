

let img;
let weaves = [];
let weaveSpacing = 6;
let spacing = 12;
let morphDuration = 150;
let lineImg;
let lineSystem;

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
}

function draw() {
  background(255);

  // Draw flow field from circular weave logic
  drawFlowField();
  noTint();

  // render lines using LineSystem
  lineSystem.render(lineImg);

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
