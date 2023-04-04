let images = [];
let imageTrail = [];
const MAX_IMAGE_SIZE = 300;
const middleColumnWidth = 900;

// Define left and right boundaries of the column
const leftBoundary = windowWidth * 0.3;
const rightBoundary = windowWidth * 0.7;

function preload() {
  // Load the images
  images.push(loadImage("./imgs/poster-08.png"));
  images.push(loadImage("./imgs/poster-09.png"));
  images.push(loadImage("./imgs/poster-10.png"));
  images.push(loadImage("./imgs/poster-11.png"));
  images.push(loadImage("./imgs/poster-12.png"));
  images.push(loadImage("./imgs/poster-14.png"));
  images.push(loadImage("./imgs/poster-15.png"));
  images.push(loadImage("./imgs/poster-16.png"));
  images.push(loadImage("./imgs/poster-18.png"));
  images.push(loadImage("./imgs/poster-19.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(4);
}

  // Add event listener to canvas to prevent clicking on links
  canvas.addEventListener('click', function(event) {
    if (event.target === canvas) {
      event.preventDefault();
    }
  });


function draw() {
  // Draw an image at the current mouse location
  if (mouseX >= (windowWidth - middleColumnWidth) / 2 && mouseX <= (windowWidth + middleColumnWidth) / 2) {
    let img = getRandomImage();
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
  }

  // Draw trail
  clear();
  for (let i = 0; i < imageTrail.length; i++) {
    let imageInfo = imageTrail[i];
    let age = millis() - imageInfo.createTime;
    let opacity = map(age, 0, 4000, 255, 0); 
    tint(255, opacity);
    image(imageInfo.img, imageInfo.x, imageInfo.y, imageInfo.width, imageInfo.height);
  }

  // Remove oldest image from trail if more than 20 images
  if (imageTrail.length > 20) {
    imageTrail.shift();
  }
}

function getRandomImage() {
  return random(images);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recalculate left and right boundaries of the column
  leftBoundary = windowWidth * 0.3;
  rightBoundary = windowWidth * 0.7;
}

let canvas = document.getElementById("myCanvas");
canvas.style.pointerEvents = "none";