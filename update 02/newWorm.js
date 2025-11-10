// started playing around the the worms to make them smaller and to go around the circles on the page


class WormSystem {
  constructor(weaves) {
    // Dynamically calculate worm count and radius based on canvas size
    let numWorms = floor(width / 20); // Worm count based on screen size
    let dynamicRadius = width / 12;    // Radius scales with canvas width

    this.weaves = weaves;
    this.worms = [];
    for (let i = 0; i < numWorms; i++) {
      let targetIndex = i % this.weaves.length; // evenly distribute worms across weaves
      this.worms.push(new Worm(this.weaves[targetIndex], 1, dynamicRadius));
    }
  }

  update() {
    for (let w of this.worms) {
      w.update();
    }
  }

  display(graphics) {
    for (let w of this.worms) {
      w.display(graphics);
    }
  }
}

class Worm {
  constructor(targetWeave, speed, radius) {
    this.targetWeave = targetWeave;
    this.speed = speed;
    this.radius = radius;
    this.angle = random(360);
    this.points = [];
    this.maxTrail = 400; // trail length
    this.noiseOffset = random(1000);

    // Assign a random color from a chosen palette
    const wormColors = [
      color(201, 85, 159),    // Purple
      color(229, 37, 37),    // Red
      color(33, 144, 69),    // Green
      color(14, 76, 139),  // Blue
      color(14, 40, 20), // Black
      color(239, 120, 25) // Orange
    ];
    this.color = wormColors[floor(random(wormColors.length))];
  }

  update() {
    if (!this.targetWeave) return;

    // Weaving using Perlin noise to make it more organic.
    // Radius is oscillating the circles
    let dynamicRadius = this.radius + sin(frameCount * 0.02) * 20;
    let wobble = map(noise(this.noiseOffset), 0, 1, -15, 15);

    let x = this.targetWeave.centreX + cos(this.angle) * (dynamicRadius + wobble);
    let y = this.targetWeave.centreY + sin(this.angle) * (dynamicRadius + wobble);

    this.angle += this.speed;
    this.noiseOffset += 0.01;

    this.points.push({ x, y });
    if (this.points.length > this.maxTrail) {
      this.points.shift();
    }

    // worms fade out after a defined period of time
    if (frameCount % 300 === 0) this.points = []; // change number to adjust
  }

  display(graphics) {
    // Draw main line with transparency for fading effect
    graphics.noFill();
    graphics.stroke(red(this.color), green(this.color), blue(this.color), 80);
    graphics.strokeWeight(3);
    graphics.beginShape();
    for (let p of this.points) {
      graphics.vertex(p.x, p.y);
    }
    graphics.endShape();

    // Draw small circles along the line
    for (let i = 0; i < this.points.length; i += 8) {
      let p = this.points[i];
      graphics.fill(red(this.color), green(this.color), blue(this.color), 80);
      graphics.noStroke();
      graphics.ellipse(p.x, p.y, 7, 7);
    }
  }
}