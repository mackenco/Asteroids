//sum
var sum = function(){
  var args = Array.prototype.slice.call(arguments);
  output = 0;
  args.forEach(function (i) { output += i });
  return output;
}

console.log(sum(1, 2, 3, 4))
console.log(sum(1, 2, 3, 4, 5))

//bind
var myBind = function(obj){
  var args = Array.prototype.slice.call(arguments);
  var that = this;

  return function(){
    that.apply(obj, args);
  }
}

