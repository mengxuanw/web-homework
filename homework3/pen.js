$(document).ready(function(){
  $(".btn-send").click(function(){
    $str=$("input").val();
    $top = Math.random()*450;
    $fon = Math.random()*30 + 10;
    $arr = ["red","blue","yellow","black","green","pink","orange","purple","white","sienna"];
    $num = Math.floor(Math.random()*10);
    $col = $arr[$num];
    $speed = Math.random()*10000 + 2000;
    $("<span></span>").appendTo(".wall").text($str).addClass("span").siblings().removeClass("span");
    $(".span").css({"font-size":$fon});
    $wid = $(".span").width();
    $(".span").css({"top":$top, "color":$col, "right":-$wid});
     $(".span").animate({"left":-$wid},$speed,"linear",function(){
         $(this).remove();
     });
  });
  //enter
  $("input").keypress(function(event){
    if(event.keyCode == "13"){
      $(".btn-send").trigger("click");
    }
  });
});
