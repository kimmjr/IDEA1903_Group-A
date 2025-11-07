

let img;
let spacing = 12;
let morphDuration = 100;
let weaves = [];
let numWeaves = 5;

function preload() {
  img = loadImage('assets/KT_Pathway_Avenue.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(width, height);
  img.loadPixels(); // Load pixels once after resizing
  angleMode(DEGREES);
  noFill();
  drawWeaves();
}

function draw() {
   // background(255, 192, 203);

  let progress = constrain(frameCount / morphDuration, 0, 1);

  // Fade out image smoothly
  tint(255, 255 * (1 - progress));
  image(img, 0, 0, width, height);

  // Draw morphing circles
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      let index = (x + y * width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let brightness = (r + g + b) / 3;

      let baseSize = map(brightness, 0, 255, 2, spacing);
      let offsetX = map(noise(x * 0.01, y * 0.01, frameCount * 0.01), 0, 1, -3, 3);
      let offsetY = map(noise(x * 0.01 + 100, y * 0.01 + 100, frameCount * 0.01), 0, 1, -3, 3);
      let size = baseSize + sin(frameCount * 0.05 + (x + y) * 0.01) * 2;

      let alpha = lerp(0, 255, progress);

      noStroke();
      fill(r, g, b, alpha);
      ellipse(x + offsetX, y + offsetY, size, size);
    }
  }

  // Draw weaves
  for (const weave of weaves) {
    weave.update();
    weave.display();
  }

/*
  if (progress >= 1) {
    noLoop(); // Stop morphing
  }
*/
}

function drawWeaves() {
  weaves = [];
  for (let i = 0; i < numWeaves; i++) {
    let radius = random(min(width, height) / 10, min(width, height) / 5);
    let weave = new Weave(
      random(radius, width - radius),
      random(radius, height - radius),
      radius
    );
    weaves.push(weave);
  }
}

class Weave {
  constructor(centreX, centreY, weaveRadius) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.weaveRadius = weaveRadius;
    this.strokewidth = 0.7;
    this.pointsOnCircle = 30;
    this.wovenLayers = 10;

    this.waveAmplitude = this.weaveRadius * 0.03;
    this.waveSpeed = 0.02;
    this.rotationSpeed = 0.1;
    this.time = 0;

    this.overColour = color(255, 105, 180);
    this.underColour = color(255, 165, 0);
  }

  update() {
    this.time += this.waveSpeed;
  }

  display() {
    push();
    translate(this.centreX, this.centreY);
    noFill();
    rotate(frameCount * this.rotationSpeed);

    for (let n = 0; n < this.wovenLayers; n++) {
      push();
      rotate((360 / this.pointsOnCircle) * n);
      this.drawCircularWeave(this.weaveRadius * (1 + n / 10), this.overColour, -1);
      this.drawCircularWeave(this.weaveRadius * (1.05 + n / 10), this.underColour, -1);
      pop();
    }

    pop();
  }

  drawCircularWeave(radiusBase, colour, direction) {
    stroke(colour);
    strokeWeight(this.strokewidth);

    for (let i = 0; i < this.pointsOnCircle; i++) {
      let angle1 = (i / this.pointsOnCircle) * 360;
      let angle2 = ((i + 1) / this.pointsOnCircle) * 360;

      let wave1 = sin(angle1 * 2 + this.time * 200 * direction) * this.waveAmplitude;
      let wave2 = sin(angle2 * 2 + this.time * 200 * direction) * this.waveAmplitude;

      let r1 = radiusBase + wave1;
      let r2 = radiusBase + wave2;

      let x1 = r1 * cos(angle1);
      let y1 = r1 * sin(angle1);
      let x2 = r2 * cos(angle2);
      let y2 = r2 * sin(angle2);

      let cx1 = (r1 - this.waveAmplitude * direction) * cos(angle1 - 2);
      let cy1 = (r1 + this.waveAmplitude * direction) * sin(angle1 + 2);
      let cx2 = (r2 - this.waveAmplitude * direction) * cos(angle2 - 2);
      let cy2 = (r2 + this.waveAmplitude * direction) * sin(angle2 + 2);

      let cx3 = (r1 + this.waveAmplitude * direction) * cos(angle1 - 2);
      let cy3 = (r1 - this.waveAmplitude * direction) * sin(angle1 + 2);
      let cx4 = (r2 + this.waveAmplitude * direction) * cos(angle2 - 2);
      let cy4 = (r2 - this.waveAmplitude * direction) * sin(angle2 + 2);

      bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
      bezier(x1, y1, cx3, cy3, cx4, cy4, x2, y2);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(width, height);
  img.loadPixels();
  drawWeaves();
}
