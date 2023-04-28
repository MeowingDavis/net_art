document.body.style.margin = 0;
document.body.style.overflow = `hidden`;

let r;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  r = new RecursiveCircle(width/2, height/2, min(width, height), rand_colour());
  noStroke();
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
}

function rand_colour() {
  const h = random(360);
  return color(h, 100, 100);
}
