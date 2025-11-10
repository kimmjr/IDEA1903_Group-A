
let img;
let weaves = [];
let weaveSpacing = 6;
let spacing = 12;
let morphDuration = 150;
let wormImg;
let wormSystem;

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

  wormSystem = new WormSystem(weaves); 
}

function draw() {
  background(255);

  drawFlowField();
  noTint();

  // Apply soft erase for fading trails
  wormImg.push();
  wormImg.erase(20, 20); // stronger erase for faster fade
  wormImg.rect(0, 0, width, height);
  wormImg.noErase();
  wormImg.pop();

  wormSystem.update();
  wormSystem.display(wormImg);
  image(wormImg, 0, 0, width, height);

  

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
  wormSystem = new WormSystem(weaves); // Reinitialize worms dynamically
}