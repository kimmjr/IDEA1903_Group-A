// This function draws and places the Weave class objects onto the grid
function drawWeaves(){
  weaves = [];   //Creates an empty array to place new Weaves in
  
  //Variables for spacing to create grid & grid offsets
  let colWeaves = weaveSpacing;
  let rowWeaves = Math.floor(weaveSpacing*(height/width));

  let spacingX = width / colWeaves;
  let spacingY = height / rowWeaves;
  let radius = (min(spacingX, spacingY)/2);

  push();
  translate(width / 2, height / 2);   //move grid to centre of canvas

  //Nested for loop to create a grid of Weaves according to spacing variables
  //-1 to +1 of colWeaves was used as a starting number to create weaves spreading throughout the canvas
  for (let c = -1; c <= (colWeaves+1); c++) {
    for (let r=-1; r <= (rowWeaves+1); r++){

      //Checks to see if row is odd or even, if odd returns 1, if even returns 0. Changes the spacing every second row to create a staggered grid
      let offsetX = (r%2) * spacingX/2;

      //creates set of centre coordinates to place weaves
      let x = spacingX * c + offsetX;
      let y = spacingY * r;

      //creates the new Weave objects to the array
      weaves.push(new Weave(x,y,radius * random(0.8,1.2))); // Add each weave object to the array             
    }
  }
  pop();
}

//Weave class to create single weave 

class Weave {
  constructor(centreX, centreY, weaveRadius) {
    //constructors that determine central properties of Weave
    this.centreX = centreX;
    this.centreY = centreY;
    this.weaveRadius = weaveRadius;
    this.strokewidth = 1;
    this.pointsOnCircle = 20;
    this.wovenLayers = 9;

    //constructors that determine animation & "wave" effects
    this.waveAmplitude = this.weaveRadius * 0.09;
    this.waveSpeed = 0.02; 
    this.rotationSpeed = 0.05;
    this.time = 0;

    //stylistic constructors for "thread" type
    this.overColour = color(255, 165, 0);
    this.underColour = color(255, 105, 180);
  }

  //determines animation, advances internal time counter
  update() {
    this.time += this.waveSpeed;
  }

  //draws weave object at each frame
  display() {
    push();
    translate(this.centreX, this.centreY); //Move drawing origin to centre of weave
    noFill();
    rotate(frameCount * this.rotationSpeed);

    //for loop that draws the number of specified woven layers and gives them a colour
    //Creates bezier "loops" that look like woven threads
    for (let n=0; n<this.wovenLayers; n++){

    push();
    //creates two layers of bezier curves per weave layer to give "stitched" effect
    this.drawCircularWeave(this.weaveRadius*(1*(n/10)), this.overColour, -1);
    this.drawCircularWeave(this.weaveRadius*1.05*(n/10), this.underColour, -1);
    pop();
    } 

    pop();
  }

  //function to create the bezier weaves & undulating effects
  drawCircularWeave(radiusBase, colour){
    stroke(colour);
    strokeWeight(this.strokewidth);

    //for loop that loops through circle to create Bezier curves around circle
    for (let i = 0; i < this.pointsOnCircle; i++) {

      let angle1 = (i / this.pointsOnCircle) * 360; //for first point of bezier curve
      let angle2 = ((i + 1) / this.pointsOnCircle) * 360; //for second point of bezier curve

      let wave1 = sin(angle1 * 2 + this.time * 200) * this.waveAmplitude; //first sine wave based undulation factor
      let wave2 = sin(angle2 * 2 + this.time * 200) * this.waveAmplitude; //second sine wave based undulation factor

      //creates radius for both points with wave undulation built in
      let r1 = (radiusBase - wave1);
      let r2 = (radiusBase - wave2);

      //uses radius with wave undulation to calculate x and y coordinates for bezier curve
      let x1 = r1 * cos(angle1);
      let y1 = r1 * sin(angle1);
      let x2 = r2 * cos(angle2);
      let y2 = r2 * sin(angle2);

      // uses "wave amplitude" as an additional factor to calculate extent of control point placement
      let cx1 = (r1 - this.waveAmplitude) * cos(angle1 - 2);
      let cy1 = (r1 + this.waveAmplitude) * sin(angle1 + 2);
      let cx2 = (r2 - this.waveAmplitude) * cos(angle2 - 2);
      let cy2 = (r2 + this.waveAmplitude) * sin(angle2 + 2);

      let cx3 = (r1 + this.waveAmplitude) * cos(angle1 - 2);
      let cy3 = (r1 - this.waveAmplitude) * sin(angle1 + 2);
      let cx4 = (r2 + this.waveAmplitude) * cos(angle2 - 2);
      let cy4 = (r2 - this.waveAmplitude) * sin(angle2 + 2);

      //draws bezier curves according to above determined coordinates 
      bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
      bezier(x1, y1, cx3, cy3, cx4, cy4, x2, y2);
    }
  }
}