
function drawWeaves(){
  weaves = [];

  let spacingX = width / (colWeaves+1);
  let spacingY = height / (rowWeaves+1);
  let radius = min(width,height)/10;

  for (let c = 0; c < colWeaves; c++) {
    for (let r=0; r < rowWeaves; r++){
      let x = spacingX * (c+1);
      let y = spacingY * (r+1);
      weaves.push(new Weave(x,y,radius * random(0.8,1.2))); // Add each weave object to the array
    }
  }
}

class Weave {
  constructor(centreX, centreY, weaveRadius) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.weaveRadius = weaveRadius*2;
    this.strokewidth = 0.7;
    this.pointsOnCircle = 20;
    this.wovenLayers = 5;

    this.waveAmplitude = this.weaveRadius * 0.08;
    this.waveSpeed = 0.02; 
    this.rotationSpeed = 0.1;
    this.time = 0;

    this.overColour = color(255, 165, 0);
    this.underColour = color(255, 105, 180);
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
    push();
    this.drawCircularWeave(this.weaveRadius*(1*(n/10)), this.overColour, -1);
    this.drawCircularWeave(this.weaveRadius*1.05*(n/10), this.underColour, -1);
    pop();
    } 
    pop();
  }

  drawCircularWeave(radiusBase, colour, direction){
    stroke(colour);
    strokeWeight(this.strokewidth);

    for (let i = 0; i < this.pointsOnCircle; i++) {
      let angle1 = (i / this.pointsOnCircle) * 360;
      let angle2 = ((i + 1) / this.pointsOnCircle) * 360;

      let wave1 = sin(angle1 * 2 + this.time * 200 * direction) * this.waveAmplitude;
      let wave2 = sin(angle2 * 2 + this.time * 200 * direction) * this.waveAmplitude;

      let r1 = radiusBase - wave1;
      let r2 = radiusBase - wave2;

      let x1 = r1 * cos(angle1)*2;
      let y1 = r1 * sin(angle1)*2;
      let x2 = r2 * cos(angle2)*2;
      let y2 = r2 * sin(angle2)*2;

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