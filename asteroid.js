(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {} );

  var Asteroid = Asteroids.Asteroid = function(centerX, centerY, velocity, game){
    var COLOR = 'black'
	 var BORDER = 'green'
    var RADIUS = 20

    Asteroids.MovingObject.call(this, RADIUS, COLOR, BORDER, centerX, centerY, velocity)

    this.game = game;
  }

  Asteroid.inherits(Asteroids.MovingObject)

  Asteroid.SPEED = 1;

  Asteroid.randomAsteroid = function(dimX, dimY, game){
    return new Asteroid(
      (Math.random() * dimX),
      (Math.random() * dimY),
      (randomVec(Asteroid.SPEED)),
		game
    );
  };

  function randomVec(length){
    var x = Math.random() - 0.5;
    var y = Math.random() - 0.5;

    var preNorm = Asteroids.Util.norm([x, y])
    var mult = length / preNorm;

    return [mult * x, mult * y];
  }

  Asteroid.prototype.remove = function() {
    this.game.removeAsteroid(this);
  };

 })(this);