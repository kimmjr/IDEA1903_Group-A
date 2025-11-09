// This is the sketch file that I had ajusted when I was playing around with the flow field morphing in and out - Kim

let img;
let weaves = [];
let rowWeaves = 4;
let colWeaves = 4;
let spacing = 12;
let morphDuration = 200; // changed this from 150
let solidColor; // this is what i have added
let spacingFlow; // added for the 
let wormImg;
let index = (x + y * img.width) * 4;

function preload() {
  img = loadImage('assets/KT_Pathway_Avenue.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();
  solidColor = color(255, 255, 255); // added in a solid colour for the middle of the morph
  img.resize(width, height);
  drawWeaves();
  wormImg = createGraphics(width, height);
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

  drawWorms(wormImg);
  image(wormImg, 0, 0, width, height);

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