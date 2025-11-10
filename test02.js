


let img;

function preload() {
  img = loadImage('Assets/artwork.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.loadPixels();
  noStroke();
}

function draw() {
  background(255);

  // Loop through image pixels in steps for performance
  for (let y = 0; y < img.height; y += 10) {
    for (let x = 0; x < img.width; x += 10) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // Scale image coordinates to canvas size
      let canvasX = map(x, 0, img.width, 0, width);
      let canvasY = map(y, 0, img.height, 0, height);

      fill(r, g, b);
      ellipse(canvasX, canvasY, 15, 15); // Draw circles using image colors
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

