function convert(str) {
  // &colon;&rpar;
  var arr = {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};
  str = str.replace(/[&<>"']/g,function(match){
    return arr[match];
  });
  return str;
}
