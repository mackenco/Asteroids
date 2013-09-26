(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {} );

   var Bullet = Asteroids.Bullet = function(centerX, centerY, velocity, game){
     var COLOR = 'black';
	  var BORDER = 'red';
     var RADIUS = 5;
     Asteroids.MovingObject.call(this, RADIUS, COLOR, BORDER, centerX, centerY, velocity)
     this.game = game;
   }

   Bullet.inherits(Asteroids.MovingObject);

   Bullet.SPEED = 4;

   Bullet.prototype.move = function () {
     Asteroids.MovingObject.prototype.move.call(this);
     this.hitAsteroids();
   }

   Bullet.prototype.hitAsteroids = function() {
     var bullet = this;

     this.game.asteroids.forEach(function (asteroid){
       if (bullet.isCollidedWith(asteroid)) {
         asteroid.remove();
         bullet.remove();
       }
     });
   };

   Bullet.prototype.remove = function (){
     this.game.removeBullet(this);
   };

 })(this);