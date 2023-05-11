//Set angle to zero
let angle = 0;

//Create an audio context
const audio_context = new AudioContext();

//Set toggle to true
let bgToggle = true;

// Define function to load audio file asynchronously
const loadAudio = async () => {
  const response = await fetch("drone.wav");
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audio_context.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

// Call the function &get the promise, 
const audioBufferPromise = loadAudio();

// On setup, initialize the canvas
function setup() {
  createCanvas(innerWidth, innerHeight);

  // Attach an asynchronous click event listener to the canvas
  canvas.addEventListener("click", async () => {
    const buffer = await audioBufferPromise;
    const source = audio_context.createBufferSource();
    source.buffer = buffer;
    source.connect(audio_context.destination);
    source.start(0);
  });

  // Add an event listener for the "beforeunload" event
  window.addEventListener("beforeunload", () => {
    audio_context.close();
  });
}

// On each frame, draw the animated graphics
function draw() {
  // If bgToggle is true set background
  if (bgToggle) {
    background(220);
  }

  // Set the ellipse fill
  noStroke();

  //Calculate the diamater of the ellipse
  let diameter = 100 + 50 * noise(angle + 20);

  // Calculate the ellipse coordinates
  let x = width/2 + 50 * noise(angle);
  let y = height/2 + 50 * noise(angle+10);

  // Set ellipse mode to the center
  ellipseMode(CENTER);

  // Apply color using different wave frequencies
  let r = 255 * 0.5 * (1 + sin(frameCount * 0.01));
  let g = 255 * 0.5 * (1 + sin(frameCount * 0.02));
  let b = 255 * 0.5 * (1 + sin(frameCount * 0.03));
  fill(r, g, b);

  // Recursively draw the ellipse using smaller size for each iteration
  recursive_ellipse(x, y, diameter, diameter);

  // Update the angle
  angle += 0.05;
}

//Recursive function to draw an ellipse
function recursive_ellipse(x, y, w, h) {
  //Draw the ellipse at the current position
  ellipse(x, y, w, h);

  // If the size of the ellipse is small enough, return
  if (w < 3 || h < 3) return;

  // Recursively call the function on random positions on the screen 
  let newX1 = random(0, width);
  let newY1 = random(0, height);
  recursive_ellipse(newX1, newY1, w / 2, h / 2);

  let newX2 = random(0, width);
  let newY2 = random(0, height);
  recursive_ellipse(newX2, newY2, w / 2, h / 2);
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

//Toggle background on double click
function doubleClicked() {
  bgToggle = !bgToggle;
  if (bgToggle) {
    // Comment out this line to remove background
    background(220);
  } 
}
