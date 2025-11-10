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
        this.waveAmplitude = this.weaveRadius * 0.03;
        this.waveSpeed = 0.5;
        this.rotationSpeed = 0.2;
        this.time = 0;

        this.overColour = color(0);
        this.underColour = color(180);
    }

    update(){
        this.time += this.waveSpeed;

    }

    display (){
        push();

        translate(this.centreX, this.centreY);
        strokeWeight(this.strokewidth);
        noFill();

        for (let r = 0; r < 7; r++){
            let baseRadius = this.weaveRadius - r * (this.waveAmplitude * 0.6);
        
                for (let strand = 0; strand < 2; strand++) {
                if ((strand + r) % 2 === 0) {
                    stroke(this.overColour);
                } else {
                stroke(this.underColour);
                }

                beginShape();
                    for (let a = 0; a <= 360; a++) {
                    let wave = sin(a * 4 + this.time + strand * 180 + r * 5) * this.waveAmplitude;
                    
                    let radius = baseRadius + wave;
                    
                    let x = radius * cos(a);
                    let y = radius * sin(a);
                    vertex(x, y);
                }

                endShape();
            }
        }
        
        pop();
    }

    resize(newX, newY){
    this.centreX = newX;
    this.centreY = newY;
    this.weaveRadius = min(width, height) / 3;
    this.waveAmplitude = this.weaveRadius * 0.08;
    }

}