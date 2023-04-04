let images = [];
let imageTrail = [];
let currentImageIndex = 0;
const MAX_IMAGE_SIZE = 200;

function preload() {
  // Load the images
  images.push(loadImage(
    "./imgs/poster-08.png"
  ));
  images.push(loadImage(
    "./imgs/poster-09.png"
  ));
  images.push(loadImage(
    "./imgs/poster-10.png"
  ));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(60);
}

function draw() {
  // Draw an image at the current mouse location
  let img = images[currentImageIndex];
  let imgWidth = img.width;
  let imgHeight = img.height;
  let currentTime = millis();

  // Calculate new dimensions while maintaining aspect ratio
  if (imgWidth > imgHeight) {
    imgWidth = MAX_IMAGE_SIZE;
    imgHeight = imgHeight * (MAX_IMAGE_SIZE / img.width);
  } else {
    imgHeight = MAX_IMAGE_SIZE;
    imgWidth = imgWidth * (MAX_IMAGE_SIZE / img.height);
  }

  // Add image to trail
  imageTrail.push({
    img: img,
    x: mouseX - imgWidth / 2,
    y: mouseY - imgHeight / 2,
    width: imgWidth,
    height: imgHeight,
    createTime: currentTime
  });

  // Draw trail
  clear();
  for (let i = 0; i < imageTrail.length; i++) {
    let imageInfo = imageTrail[i];
    tint(255, 255); // Set the alpha value to a constant
    image(imageInfo.img, imageInfo.x, imageInfo.y, imageInfo.width, imageInfo.height);
  }

  // Remove oldest image from trail if more than 20 images
  if (imageTrail.length > 120) {
    imageTrail.shift();
  }
}

function mouseClicked() {
    // Switch to the next image without clearing the image trail
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

