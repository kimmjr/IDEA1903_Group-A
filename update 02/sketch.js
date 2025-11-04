let img;
let weaves = [];
let rowWeaves = 2;
let colWeaves = 2;
let spacing = 12;
let morphDuration = 150;

function preload() {
  img = loadImage('assets/KT_Pathway_Avenue.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();
  img.resize(width, height);
  drawWeaves();
}

function draw() {
  background(255);
  drawFlowField();

  for (const weave of weaves) {
    weave.update();
    weave.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(width, height);
  drawWeaves();
}
