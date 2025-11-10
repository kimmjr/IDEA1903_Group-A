let weaves = [];
const numWeaves = 20;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();
  drawWeaves();
}

function draw() {
  background(255);
  for (const weave of weaves){
  weave.update();
  weave.display();
  }
}

function drawWeaves(){
  weaves = [];
  for (let i = 0; i < numWeaves; i++) {
    let radius = random(min(width, height)/10, min(width,height)/5);
    let weave = new Weave(
      random(radius, (width/2) - radius), 
      random(radius, (height/2)-radius),
      radius
    );
    weaves.push(weave); // Add each weave object to the array
  }
}

class Weave {
  constructor(centreX, centreY, weaveRadius) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.weaveRadius = weaveRadius;
    this.strokewidth = 0.7;
    this.pointsOnCircle = 80;
    this.wovenLayers = 10;

    this.waveAmplitude = this.weaveRadius * 0.03;
    this.waveSpeed = 0.02; 
    this.rotationSpeed = 0.1;
    this.time = 0;

    this.overColour = color(0);
    this.underColour = color(180);
  }

  update() {
    this.time += this.waveSpeed;
  }

  display() {
    push();
    translate(this.centreX, this.centreY);
    noFill();

    rotate(frameCount * this.rotationSpeed);

    for (let n=0; n<this.wovenLayers; n++){

    push()
    rotate((360 / this.pointsOnCircle)*n);
    this.drawCircularWeave(this.weaveRadius * (1+(n/10)), this.overColour, -1);
    this.drawCircularWeave(this.weaveRadius * (1.05+(n/10)), this.underColour, -1);
    pop();

    }
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
