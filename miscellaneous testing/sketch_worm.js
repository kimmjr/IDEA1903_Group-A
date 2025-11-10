let numDots = 1000; // number of dots

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);
}

function draw() {
  // low alpha for nice motion trails
  background(0, 20);

  // loop through each dot
  for (let i = 0; i < numDots; i++) {
    // independent sine-wave motion
    let x = width / 2 + sin(frameCount * 0.8 + i * 30) * (width / 3);
    let y = height / 2 + cos(frameCount * 1.2 + i * 50) * (height / 3);

    // pulsating size
    let size = 5 + sin(frameCount * 3 + i * 45) * 2;

    // smoothly shifting colors over time
    let r = sin(frameCount * 2 + i * 30) * 127 + 128;
    let g = sin(frameCount * 2 + i * 50 + 120) * 127 + 128;
    let b = sin(frameCount * 2 + i * 80 + 240) * 127 + 128;

    noStroke();
    fill(r, g, b);
    circle(x, y, size);

    // optional orbiting red satellite for each dot
    let orbitAngle = frameCount * 5 + i * 30;
    let orbitRadius = 10 + sin(frameCount * 2 + i * 100) * 5;
    let orbitX = x + cos(orbitAngle) * orbitRadius;
    let orbitY = y + sin(orbitAngle) * orbitRadius;

    fill(255, 0, 0);
    circle(orbitX, orbitY, 3);
  }
}

// dynamically resize canvas when window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}