//to-do
//random asteroid sizes
//romo


(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {} );
  

  var Game = Asteroids.Game = function (ctx, dimX, dimY, numAsteroids){
    this.ctx = ctx
    this.DIM_X = dimX;
    this.DIM_Y = dimY;

    this.ship = new Asteroids.Ship(dimX/2,dimY/2, this)

    this.asteroids = []
    this.addAsteroids(numAsteroids)
    this.bullets = [];
	 
	 this.img = new Image();
	 this.img.src = 'stars.jpg';

    this.starter = null;
  }

  Game.prototype.addAsteroids = function(numAsteroids){
    for(var i=0;i<numAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y, this));
    }
  }

  Game.prototype.bindKeyHandlers = function(){
    var game = this

    var MOVES = {
      "w": [0, -.5],
      "s": [0, .5],
      "a": [-.5, 0],
      "d": [.5, 0],
		
      "up": [0, -.5],
      "down": [0, .5],
      "left": [-.5, 0],
      "right": [.5, 0]
    }

    for (move in MOVES) {
      (function (move, impulse){
        key(move, function() { game.ship.power(impulse); });
      })(move, MOVES[move]);
    };

    key("space", function() { game.fireBullet() });
  }

  Game.prototype.checkCollisions = function(){
    var game = this
    var collision = false
    this.asteroids.forEach(function(ast){
      if (ast.isCollidedWith(game.ship)){
        collision = true
      }
    })
    if (collision){
      alert("In space, no one can hear YOU LOSE")
      game.stop()
    }
  };

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	 ctx.drawImage(this.img, 0, 0);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
	 
	 this.bullets.forEach(function (bullet){
		 bullet.draw(ctx);
	 });
	 
    this.ship.draw(ctx)
  };

  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fireBullet();
    if (bullet){
      this.bullets.push(bullet);
    }
  };

  Game.prototype.checkPosition = function(){
    var game = this;
  
    this.asteroids.forEach(function(ast){
		 if(ast.centerX > game.DIM_X){
			 ast.centerX %= game.DIM_X;
		 } else if(ast.centerX < 0){
			 ast.centerX += game.DIM_X;
		 } else if(ast.centerY > game.DIM_Y){
			 ast.centerY %= game.DIM_Y;
		 } else if(ast.centerY < 0){
			 ast.centerY += game.DIM_Y;
		 } else {}
	 })
	 
	 var objects = [this.ship].concat(this.bullets)
	 objects.forEach(function(obj){
		 if(obj.centerX > game.DIM_X){
			 obj.remove();
		 } else if(obj.centerX < 0){
			 obj.remove();
		 } else if(obj.centerY > game.DIM_Y){
			 obj.remove();
		 } else if(obj.centerY < 0){
			 obj.remove();
		 } else {}
	 })
 }

  Game.prototype.move = function(ctx){
    var game = this
    this.asteroids.forEach(function (asteroid) {
      asteroid.move(game.DIM_X, game.DIM_Y);
    });
	 
	 this.bullets.forEach(function (bullet) {
		 bullet.move(game.DIM_X, game.DIM_Y);
	 });

    this.ship.move(game.DIM_X, game.DIM_Y)
  };

  Game.prototype.removeBullet = function (bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  }

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

  Game.prototype.start = function(canvasE1){
    var ctx = canvasE1.getContext("2d");

    var game = this;
    this.draw(ctx)
    this.bindKeyHandlers()

    this.starter = setInterval(function () {
      game.step(ctx)
    }, 17)
  }

  Game.prototype.step = function(ctx){
	  
	  if(this.asteroids.length > 0){
	     this.move(ctx);
	     this.draw(ctx);
	     this.checkCollisions();
	     this.checkPosition();
	  } else {
		  alert("You defeated space!");
		  this.stop();
	  }
  }

  Game.prototype.stop = function(){
    var game = this
    clearInterval(game.starter)
  }

})(this);