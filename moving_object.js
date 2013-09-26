(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {} );

   var MovingObject = Asteroids.MovingObject = function(radius, color, border, centerX, centerY, velocity){
   this.color = color;
	this.border = border;
   this.radius = radius;
   this.centerX = centerX
   this.centerY = centerY
   this.velocity = velocity
 }

 MovingObject.prototype.draw = function(ctx) {
   ctx.fillStyle = this.color;
	ctx.strokeStyle = this.border;
	ctx.lineWidth = 2;

   ctx.beginPath();
   ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
   ctx.fill();
	ctx.stroke();
 };

 MovingObject.prototype.isCollidedWith = function(otherObject){
   otherX = otherObject.centerX;
   otherY = otherObject.centerY;

   dx = this.centerX - otherX;
   dy = this.centerY - otherY;

   distance = Math.sqrt( (dx * dx) + (dy * dy) );

   if ((otherObject.radius + this.radius) > distance){
     return true;
   } else {
     return false;
   }
 }

 MovingObject.prototype.move = function(maxX, maxY){
   this.centerX += this.velocity[0];
   this.centerY += this.velocity[1];
 }

 Function.prototype.inherits = function(sup){
   function Surrogate () {};

   Surrogate.prototype = sup.prototype
   this.prototype = new Surrogate()
 }

})(this);