// Spring Forces (Soft Spring)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

class Particle {
  constructor(m, x, y, r, c) {
    this.locked = false;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.mass = m;
    this.r = r;
    this.c = c;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // Method to update position
  update() {
    if (!this.locked) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  }

  // Method to display
  show() {
    noStroke();
    fill(this.c);
    ellipse(this.position.x, this.position.y, this.r * 2);
  }
}
