document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

const audio_context = new AudioContext();
audio_context.suspend();

let vibraphone_buffers = [];
let current_buffer_index = 0;

get_vibraphone_buffers();

function get_vibraphone_buffers() {
  const filenames = ['vibraphone_note_1.wav', 'vibraphone_note_2.wav', 'vibraphone_note_3.wav', 'vibraphone_note_4.wav', 'vibraphone_note_5.wav'];
  Promise.all(filenames.map(fetchAndDecode)).then(buffers => {
    vibraphone_buffers = buffers;
  });
}

function fetchAndDecode(filename) {
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(buffer => audio_context.decodeAudioData(buffer));
}

document.onclick = click_handler;

function click_handler(mouse_event) {
  if (audio_context.state == 'suspended') {
    audio_context.resume();
  } else {
    const buffer = vibraphone_buffers[current_buffer_index];
    const playback_rate = (mouse_event.clientX / window.innerWidth) * 2 + 0.5;
    play_vibraphone(buffer, playback_rate);
    current_buffer_index = (current_buffer_index + 1) % vibraphone_buffers.length;
  }
}

function play_vibraphone(buffer, rate) {
  const buf_node = audio_context.createBufferSource();
  buf_node.buffer = buffer;
  buf_node.playbackRate.value = rate;
  buf_node.connect(audio_context.destination);
  buf_node.start();
}

let r, circleColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  circleColor = rand_colour();
  r = new RecursiveCircle(width/2, height/2, min(width, height), circleColor);
  noStroke();
  
  // add event listener to window to call resizeCanvas() on window resize
  window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
    r = new RecursiveCircle(width/2, height/2, min(width, windowHeight), circleColor);
  });

  // add event listener to canvas to randomize color on click
  canvas.addEventListener('click', () => {
    circleColor = rand_colour();
    r.updateColor(circleColor);
  });
}

function draw() {
  background(220);
  r.draw(frameCount);
  
}

class RecursiveCircle {
  constructor(x, y, d, c) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.c = c;
    this.has_child = false;
    this.n_x = random() * 20;
    this.n_y = random() * 20;

    if (d > 10) {
      const c = rand_colour();
      this.child = new RecursiveCircle(x, y, d * 0.75, c);
      this.has_child = true;
    }
  }

  draw(f) {
    fill(this.c);
    const offset = noise(this.n_x + (f / 60), this.n_y) * 60 - 30;
    ellipse(this.x, this.y, this.d + offset, this.d + offset);
    if (this.has_child) {
      this.child.draw(f);
    }
  }

  updateColor(c) {
    this.c = c;
    if (this.has_child) {
      this.child.updateColor(rand_colour());
    }
  }
}


function rand_colour() {
  const h = random(360);
  return color(h, 100, 100);
}
