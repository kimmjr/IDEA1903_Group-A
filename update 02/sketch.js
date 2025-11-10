let img;
let weaves = [];
let weaveCentres = [];
let weaveSpacing = 6;
let spacing = 12;
let morphDuration = 150;
let wormImg;

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

  for (const weave of weaves) {
    weaveCentres.push({ x: weave.centreX, y: weave.centreY });
  }
}

function draw() {
  background(255);

  drawFlowField();
  noTint();


  wormImg.push();
  wormImg.erase(10, 10);
  wormImg.rect(0, 0, width, height);
  wormImg.noErase();
  wormImg.pop();

  drawWorms(wormImg, weaveCentres);
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
}
