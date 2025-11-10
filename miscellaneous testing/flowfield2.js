// This is the function file for the flow field for the morphing in and out - Kim


function drawFlowField() {
  img.loadPixels();

  let cycle = (frameCount % (morphDuration * 2)) / morphDuration;
  let progress = cycle <= 1 ? cycle : 2 - cycle;

  tint(255, 255 * (1 - progress));
  image(img, 0, 0, width, height);

  for (let y = 0; y < img.height; y += spacing) {
    for (let x = 0; x < img.width; x += spacing) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let originalColor = color(r, g, b);
      let blendedColor = lerpColor(originalColor, solidColor, progress);

      let baseSize = map((r + g + b) / 3, 0, 255, 2, spacing);
      let size = baseSize + sin(frameCount * 0.05 + (x + y) * 0.01) * 3;

      noStroke();
      fill(blendedColor);
      ellipse(x * (width / img.width), y * (height / img.height), size, size);
    }
  }
}


if (frameCount >= morphDuration * 2) {
    noLoop();
  }

