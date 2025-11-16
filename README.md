# IDEA1903_Group-A
## IDEA1903 Group A - Creative Coding Major Project

## How to interact with our artwork

We have separated our class / functions into their own .js files and created a main sketchNew.js file which calls each of these functions.

- Our final files are found in folder 'update 02'
- Open artwork using sketchNew.js
- Our artwork is time based, so everything will automatically move as it is supposed to.
- You will notice the background circles morphing as the time passes.
- Each of the lines around the weaves draw, fade and then re-draw.
- The weaves have continuous movement, as do the worms.

### File summary

#### sketchNew.js
Base file for entire project. Includes setup(), draw() and update() functions

#### flowfield.js
Background weave using a local textile artwork. Base image can be found in assets folder.

#### circularWeave.js
Circular "weaves" that oscillate and populate the canvas in a grid format. 

#### worm.js
Randomised sinusoidal waves connected to circular weaves.

#### newLine.js
New lines around circular weaves with small circles growing incrementally. 

