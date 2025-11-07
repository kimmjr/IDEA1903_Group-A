/**
 * startX, startY, frequency, phase, decay, amplitude, trajectory (radians), index
 */
let dotPositions = [];
const fps = 30;
const baseFreq = 0.4;
const freqRange = 0.3;
const displacement = 4;
const amplitude = 50;
const amplitudeRange = 10;
const baseSize = 10;
const baseDecay = 50;
const decayRange = 10;

// Equation for worm movement
function movementEquation(pos) {
  // Amplitude calculation
  const tmpY = pos.amp * Math.exp(-pos.idx / pos.decay) * sin(pos.idx * displacement * 360 * pos.freq / fps + pos.phase);
  // Displacement calculation
  const tmpX = pos.idx * displacement;
  // Rotation and displacement
  const newX = pos.x + cos(pos.trj) * tmpX - sin(pos.trj) * tmpY;
  const newY = pos.y + sin(pos.trj) * tmpX + cos(pos.trj) * tmpY;

  return { x: newX, y: newY };
}

// Starting position generation
function createRandomPosition() {
  const x = width * random();
  const y = height * random();
  const trj = 360 * random();
  const freq = baseFreq + random() * freqRange - freqRange / 2;
  const phase = random(0, 360);
  const decay = baseDecay + random() * decayRange - decayRange / 2;
  const amp = amplitude + random() * amplitudeRange - amplitudeRange / 2;
  return { x: x, y: y, freq, phase, decay, amp: amp, trj: trj, idx: 0 };
}

function drawWorms(graphics) {
  const numDots = 10;

  while (dotPositions.length < numDots) {
    dotPositions.push(createRandomPosition());
  }

  frameRate(fps);

  // low alpha for nice motion trails

  // loop through each dot
  for (let i = 0; i < numDots; i++) {

    const newPos = movementEquation(dotPositions[i]);
    let x = newPos.x;
    let y = newPos.y;
    if (x > width || x < 0 ||
      y > height || y < 0) {
      dotPositions[i] = createRandomPosition(); // Reset if out of bounds
    } else {
      dotPositions[i].idx++; // Timestamp of worm
    }

    // pulsating size
    let size = baseSize + sin(frameCount * 3 + i * 45) * 2;

    // smoothly shifting colors over time
    let r = sin(frameCount * 2 + i * 30) * 127 + 128;
    let g = sin(frameCount * 2 + i * 50 + 120) * 127 + 128;
    let b = sin(frameCount * 2 + i * 80 + 240) * 127 + 128;

    graphics.noStroke();
    graphics.fill(r, g, b);
    graphics.circle(x, y, size);

    // optional orbiting red satellite for each dot
    let orbitAngle = frameCount * 5 + i * 30;
    let orbitRadius = 10 + sin(frameCount * 2 + i * 100) * 5;
    let orbitX = x + cos(orbitAngle) * orbitRadius;
    let orbitY = y + sin(orbitAngle) * orbitRadius;

    graphics.fill(255, 0, 0);
    graphics.circle(orbitX, orbitY, 3);
  }
}