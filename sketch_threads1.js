function setup (){
createCanvas(windowWidth, windowHeight);
angleMode (DEGREES);
noFill();
}

function draw (){
background(255);
drawWovenPattern();

}

function windowResized(){
resizeCanvas (windowWidth, windowHeight);
}

function drawWovenPattern(){
stroke(0);
strokeWeight(0.5);

//setup for spacing and placement
let rows = 100;
let cols = 100;
let spacingX = width / cols;
let spacingY = height / rows;

//setup for animation
let waveAmplitude = spacingX/3;
let waveSpeed = 0.02;
let time = frameCount*waveSpeed;

for (let x=0; x<=cols; x++){

    for (let y = 0; y<= rows; y++){

        let x1 = x*spacingX;
        let y1 = y*spacingY;
        let x2 = (x+1)*spacingX;
        let y2 = (y+1)*spacingY;

        let wave1 = -sin(time*60 + y*5 + x*10)*waveAmplitude;
        let wave2 = sin(time*30 + y*20 + x*3 + 2*PI)*waveAmplitude;

        let verticalDrift = -sin(time+y*15+x*10)*spacingY/4;

        if ((x+y)%2===0){
            //wave 1 - darker strand
            stroke(0);
            bezier(
                x1, y1, 
                x1 + wave1, y1 + spacingY / 2 + verticalDrift,
                x2 + wave1, y2 - spacingY / 2 + verticalDrift,
                x2, y2
            );
           
            //wave 2 - lighter strand
            stroke(100);
            bezier(
                x1, y1,
                x1 - wave2, y1 - spacingY / 2 - verticalDrift,
                x2 - wave2, y2 + spacingY / 2 - verticalDrift,
                x2, y2
        );
        } else {
            //wave 1 - lighter strand
            stroke(150);
            bezier(
                x1, y1,
                x1- wave1, y1 - spacingY / 2 - verticalDrift,
                x2- wave1, y2 + spacingY / 2 - verticalDrift,
                x2, y2
        );
            //wave 2 - darker strand
            stroke(0);
             bezier(
                x1, y1,
                x1 + wave2, y1 + spacingY / 2 + verticalDrift,
                x2 + wave2, y2 - spacingY / 2 + verticalDrift,
                x2, y2
            );
        }
    }
}
}
