let weave;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();

  weave = new Weave(width / 2, height / 2);
}

function draw() {
  background(255);
  weave.update();
  weave.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Weave {
  constructor(centreX, centreY) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.weaveRadius = min(width, height) / 4;
    this.strokewidth = 0.5;
    this.weaveExtent = 5;
    this.pointsOnCircle = 80;

    this.waveAmplitude = this.weaveRadius * 0.03;
    this.waveSpeed = 0.5;
    this.rotationSpeed = 0.2;
    this.time = 0;
  }

  update() {
    this.time += this.waveSpeed;
  }

  display() {
    push();
    strokeWeight(this.strokewidth);
    stroke(0);
    noFill();

    for (let i = 0; i < this.pointsOnCircle; i++) {
      let angle1 = (i / this.pointsOnCircle) * 360;
      let angle2 = ((i + 1) / this.pointsOnCircle) * 360;

      let wave1 = sin(angle1 * 4 + this.time * 10) * this.waveAmplitude;
      let wave2 = sin(angle2 * 4 + this.time * 10) * this.waveAmplitude;

      let r1 = this.weaveRadius + wave1;
      let r2 = this.weaveRadius + wave2;

      let x1 = this.centreX + r1 * cos(angle1);
      let y1 = this.centreY + r1 * sin(angle1);
      let x2 = this.centreX + r2 * cos(angle2);
      let y2 = this.centreY + r2 * sin(angle2);

      // Control points for curvature
      let cx1 = this.centreX + (r1 + this.waveAmplitude) * cos(angle1 - 1);
      let cy1 = this.centreY + (r1 - this.waveAmplitude) * sin(angle1 + 1);
      let cx2 = this.centreX + (r2 + this.waveAmplitude) * cos(angle2 - 1);
      let cy2 = this.centreY + (r2 - this.waveAmplitude) * sin(angle2 + 1);

    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);

    strokeWeight(1.5);
    let scaleFactor = 1.2;
    bezier(-x1*scaleFactor, -y1*scaleFactor, -cx1*scaleFactor, -cy1*scaleFactor, -cx2*scaleFactor, -cy2*scaleFactor, -x2*scaleFactor, -y2*scaleFactor);
    }

    pop();
  }
}

/*-- happy accident??

let weave;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();

  weave = new Weave(width/2, height/2);

}

function draw() {
  background(255);
    weave.update();
    weave.display();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Weave {
    constructor(centreX, centreY){
        this.centreX = centreX;
        this.centreY = centreY;
        this.weaveRadius = min(width,height)/4;
        this.strokewidth = 0.5;
        this.weaveExtent = 5;
        this.externalWeaveOutline = this.weaveRadius+this.weaveExtent;
        this.internalWeaveOutline = this.weaveRadius-(this.weaveExtent/2);
        this.pointsOnCircle = 240;


        this.waveAmplitude = this.weaveRadius * 0.03;
        this.waveSpeed = 0.5;
        this.rotationSpeed = 0.2;
        this.time = 0;

    }

    update(){
        this.time += this.waveSpeed;

    }

    display (){
        push();

        strokeWeight(this.strokewidth);
        noFill();

        //circle(this.centreX, this.centreY, this.weaveRadius*2);
        //circle(this.centreX, this.centreY, this.externalWeaveOutline*2);
        //circle(this.centreX, this.centreY, this.internalWeaveOutline*2);

        for (let i = 0; i <= this.pointsOnCircle; i++){ 

            let angle1 = (i / this.pointsOnCircle) * 360;
            let angle2 = ((i+1) / this.pointsOnCircle) * 360;

            let wave1 = sin(angle1*4+this.time*60)*this.waveAmplitude;
            let wave2 = sin(angle2*4+this.time*60)*this.waveAmplitude;

            let r1 = this.weaveRadius + wave1;
            let r2 = this.weaveRadius + wave2;

            let x1 = this.centreX + r1 * cos(angle1);
            let y1 = this.centreY + r1 * sin(angle1);
            let x2 = this.centreX + r2 * sin(angle2) + this.weaveExtent;
            let y2 = this.centreY + r2 * sin(angle2) - this.weaveExtent;

            let cx1 = this.centreX + (r1 + this.waveAmplitude) * cos(angle1 + 2);
            let cy1 = this.centreY + (r1 + this.waveAmplitude) * sin(angle1 + 2);
            let cx2 = this.centreX + (r2 + this.waveAmplitude) * cos(angle2 - 2);
            let cy2 = this.centreY + (r2 + this.waveAmplitude) * sin(angle2 - 2);

        bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);

        }

        pop();
    }

} */ 
