

let img;
let weaves = [];
let weaveSpacing = 6;
let spacing = 12;
let morphDuration = 150;
let lineImg;
let lineSystem;
let wormImg;

function preload() {
  img = loadImage('assets/KT_Pathway_Avenue.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();
  img.resize(width, height);

  // Initialize weave positions
  drawWeaves();

  // Create graphics buffers
  lineImg = createGraphics(width, height);
  wormImg = createGraphics(width, height);

  // Initialize line system
  lineSystem = new LineSystem(weaves);
}

function draw() {
  background(255);

  // Draw flow field from circular weave logic
  drawFlowField();
  noTint();

  // Render lines using LineSystem
  lineSystem.render(lineImg);

  // Apply soft erase for worm trails and worm lines
  wormImg.push();
  wormImg.erase(20, 20);
  wormImg.rect(0, 0, width, height);
  wormImg.noErase();
  wormImg.pop();

  // Call worm trails logic (from wormLogic.js)
  if (typeof drawWorms === "function" && weaves.length > 0) {
    drawWorms(wormImg, weaves);
  }

  // Call worm lines logic (from wormLines.js)
  if (typeof drawWormLines === "function" && weaves.length > 0) {
    drawWormLines(wormImg, weaves);
  }

  // Draw layers
  image(lineImg, 0, 0, width, height);
  image(wormImg, 0, 0, width, height);

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
}

