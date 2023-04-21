document.body.style.margin   = 0
document.body.style.overflow = `hidden`

function setup () {
   createCanvas (innerWidth, innerHeight)
   colorMode (HSB)
   r = new RecursiveRectangle (0, 0, width, height, rand_colour ())
 }
 
 function draw() {
   background(220);
   r.draw ()
 }
 
 class RecursiveRectangle {
   constructor (x, y, w, h, c) {
     this.x = x
     this.y = y
     this.w = w
     this.h = h
     this.c = c
     this.has_child = false
     
     if (w > 0 && h > 0) {
       const c = rand_colour ()
       this.child = new RecursiveRectangle (x + 12, y + 12, w - 24, h - 24, c)
       this.has_child = true
     }
   }
   
   draw () {
     fill (this.c)
     rect (this.x, this.y, this.w, this.h)
     if (this.has_child) {
       this.child.draw ()
     }
   }  
 }
 
 function rand_colour () {
   const h = random (360)
   return color (h, 100, 100)
 }