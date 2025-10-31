// Spring Forces (Soft Spring)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

let particles = [];
let springs = [];
let spacing = 28;
let cols = 15, rows = 15;
let k = 0.5;
let xoff = 0;
let gravity;
let img;

function preload() {
  img = loadImage("Artwork.jpg"); // replace with your own image path
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // 🧠 use WEBGL for texture mapping
  colorMode(HSB, 360, 100, 100);

  let startX = -((spacing * (cols - 1)) / 2);
  let startY = -((spacing * (rows - 1)) / 2);

  // Create particles
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      particles.push(
        new Particle(
          1,
          startX + i * spacing,
          startY + j * spacing,
          spacing * 0.5,
          color(map(i, 0, cols, 0, 360), 100, 80)
        )
      );

      // Springs (horizontal + vertical)
      if (i > 0) {
        let a = particles[i + j * cols];
        let b = particles[i - 1 + j * cols];
        springs.push(new Spring(k, spacing, a, b));
      }
      if (j > 0) {
        let a = particles[i + j * cols];
        let b = particles[i + (j - 1) * cols];
        springs.push(new Spring(k, spacing, a, b));
      }
    }
  }

  // lock top row
  for (let i = 0; i < cols; i++) particles[i].locked = true;

  gravity = createVector(0, 0.2);
}

function draw() {
  background(255);
  orbitControl(); // optional, lets you rotate with the mouse

  // --- update physics ---
  for (let s of springs) s.update();

  let wind = createVector(0.2 * noise(xoff) - 0.1, 0);
  for (let p of particles) {
    p.applyForce(gravity);
    let drag = p.velocity.copy();
    let speed = drag.mag();
    let dragMag = speed * speed * 0.02;
    drag.normalize().mult(-1).mult(dragMag);
    p.applyForce(drag);
    p.applyForce(wind);
    p.update();
  }
  xoff += 0.01;

  // --- draw textured fabric ---
  noStroke();
  textureMode(NORMAL);
  texture(img);

  for (let j = 0; j < rows - 1; j++) {
    beginShape(TRIANGLES);
    for (let i = 0; i < cols - 1; i++) {
      let p1 = particles[i + j * cols];
      let p2 = particles[i + 1 + j * cols];
      let p3 = particles[i + (j + 1) * cols];
      let p4 = particles[i + 1 + (j + 1) * cols];

      // UV coords (0–1 range)
      let u1 = i / (cols - 1);
      let v1 = j / (rows - 1);
      let u2 = (i + 1) / (cols - 1);
      let v2 = (j + 1) / (rows - 1);

      // two triangles per cell
      vertex(p1.position.x, p1.position.y, 0, u1, v1);
      vertex(p2.position.x, p2.position.y, 0, u2, v1);
      vertex(p4.position.x, p4.position.y, 0, u2, v2);

      vertex(p1.position.x, p1.position.y, 0, u1, v1);
      vertex(p4.position.x, p4.position.y, 0, u2, v2);
      vertex(p3.position.x, p3.position.y, 0, u1, v2);
    }
    endShape();
  }

  // --- optional wireframe overlay ---
  stroke(0, 30);
  noFill();
  for (let s of springs) {
    line(
      s.a.position.x,
      s.a.position.y,
      s.b.position.x,
      s.b.position.y
    );
  }
}
