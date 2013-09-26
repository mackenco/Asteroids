Function.prototype.inherits = function(sup){
  function Surrogate () {};

  Surrogate.prototype = sup.prototype
  this.prototype = new Surrogate()
}

function MovingObject() {
  this.mine = "Hello"
};

MovingObject.prototype.saysHello = function(){
  return "Hello";
}

function Ship (owner) {
  this.owner = owner
};
Ship.inherits(MovingObject);

function Asteroid (name) {
  this.name = name
};
Asteroid.inherits(MovingObject);

s = new Ship("bob")
console.log(s.owner)
a = new Asteroid("cathy")
m = new MovingObject();
console.log(s.saysHello())