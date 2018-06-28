function myReplace(str, before, after) {
  var a = before.charAt(0);
  var b;
  if(a >= 'A' && a <= 'Z'){
    b = after.slice(0,1).toUpperCase();
  }
  else
    b = after.slice(0,1).toLowerCase();
  after = after.slice(1);
  after = b.concat(after);
  str = str.replace(before, after);
  return str;
}
