document.body.style.margin   = 0
document.body.style.overflow = `hidden`

let r

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode (HSB)
  r = new RecursiveRectangle (0, 0, width, height, rand_colour ())
}

function draw() {
  background(220);
  r.draw (frameCount)
}

class RecursiveRectangle {
  constructor (x, y, w, h, c) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = c
    this.has_child = false
    this.n_x = random () * 20
    this.n_y = random () * 20
    
    if (w > 0 && h > 0) {
      const c = rand_colour ()
      this.child = new RecursiveRectangle (x + 12, y + 12, w - 24, h - 24, c)
      this.has_child = true
    }
  }
  
  draw (f) {
    fill (this.c)
    const x_offset = noise (this.n_x + (f / 60), this.n_y) * 12 - 6
    const y_offset = noise (this.n_x, this.n_y + (f / 60)) * 12 - 6
    rect (this.x + x_offset, this.y + y_offset, this.w, this.h)
    if (this.has_child) {
      this.child.draw (f)
    }
  }  
}

function rand_colour () {
  const h = random (360)
  return color (h, 100, 100)
}