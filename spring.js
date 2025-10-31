// Spring Forces (Soft Spring)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

class Spring {
  constructor(k, restLength, a, b) {
    this.k = k;
    this.restLength = restLength;
    this.a = a;
    this.b = b;
  }

  update() {
    let force = p5.Vector.sub(this.b.position, this.a.position);
    let x = force.mag() - this.restLength;
    force.normalize();
    force.mult(this.k * x);
    this.a.applyForce(force);
    force.mult(-1);
    this.b.applyForce(force);
  }

  show() {
    // How far is the spring stretched from its rest length?
    let currentLen = dist(
      this.a.position.x, this.a.position.y,
      this.b.position.x, this.b.position.y
    );
    let stretch = currentLen - this.restLength;

    // Map stretch to a hue (0 = red, 120 = green)
    colorMode(HSB);
    let h = map(abs(stretch) * 10, 0, this.restLength * 0.5, 120, 0, true);

    stroke(h, 80, 100);
    strokeWeight(2);
    line(
      this.a.position.x,
      this.a.position.y,
      this.b.position.x,
      this.b.position.y
    );
  }
}
