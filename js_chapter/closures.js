function add() {
  var len = arguments.length;
  for(var i = 0; i < len; i ++){
    if(typeof arguments[i] !== "number")
      return undefined;
  }
  if(len == 2)
    return arguments[0] + arguments[1];
  if(len == 1){
    var x = arguments[0];
    return function(y){
      if(typeof y !== "number")
        return undefined;
      return x + y;
    };
  }
}
