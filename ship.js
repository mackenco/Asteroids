(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var Ship = Asteroids.Ship = function(centerX, centerY, game){
    var RADIUS = 10;
    var COLOR = 'black';
	// var COLOR = "rgba(255,0,0,0.5)"
	 var BORDER = 'blue';
    Asteroids.MovingObject.call(this, RADIUS, COLOR, BORDER, centerX, centerY, [0,0]);

    this.startX = centerX;
    this.startY = centerY;
    this.game = game;
  };

   Ship.inherits(Asteroids.MovingObject)

   Ship.prototype.power = function(impulse){
     this.velocity[0] += impulse[0];
     this.velocity[1] += impulse[1];
   }

   Ship.prototype.fireBullet = function() {
     var norm = Asteroids.Util.norm(this.velocity);

     if (norm == 0){
       return;
     } else {
       var mult = Asteroids.Bullet.SPEED/norm;
       var bulletVel = [mult *this.velocity[0], mult * this.velocity[1]];
       return new Asteroids.Bullet(this.centerX, this.centerY, bulletVel, this.game);
     }
   };

   Ship.prototype.remove = function() {
     this.centerX = this.startX;
     this.centerY = this.startY;
	  this.velocity = [0, 0];
   }

})(this);