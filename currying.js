var curriedSum = function(numArgs){
  numbers = []
  arr = Array.prototype.slice.call(arguments)
  summing = 0

  var _curriedSum = function(num){
   numbers.push(num)

    if (numbers.length == numArgs){
      for(var i=0;i<numbers.length;i++){
         summing += numbers[i]
      }
      return summing;

    } else {
      return _curriedSum
    }

  };
  return _curriedSum

};

Function.prototype.curry = function(numArgs){
  numbers = []
  arr = Array.prototype.slice.call(arguments)
  var that = this

  var _curried = function(num){
   numbers.push(num)

    if (numbers.length == numArgs){
      return that.apply(null, numbers)

    } else {
      return _curried
    }

  };
  return _curried
}

// var sum = curriedSum(3)
// console.log(sum(2)(3)(5))

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

console.log(sumThree.curry(3)(4)(20)(3));