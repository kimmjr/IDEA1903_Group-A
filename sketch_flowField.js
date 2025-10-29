


let img;
let spacing = 12;
let morphDuration = 150; 

function preload() {
  img = loadImage('assets/KT_Pathway_Avenue.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(width, height);
}

function draw() {
  img.loadPixels();

  // Progress from 0 to 1
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

  if (progress >= 1) {
    // Stop morphing
    noLoop(); 
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(width, height);
}
