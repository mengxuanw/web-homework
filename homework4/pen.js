var curQuote = "";
var curAuthor = "";
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var colIndex = 0;
function getQuote(){
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(r){
      if(typeof r === 'string'){
        r = JSON.parse(r);
      }
      if(Array.isArray(r)){
        r = r[0];
      }
      $(".quote-text").animate({
        opacity:0
      },500,
       function(){
        $(this).animate({
          opacity:1
        },500);
        $("#text").html(r.quote);
      });
      
      $(".quote-author").animate({
        opacity:0
      },500,
       function(){
       $(this).animate({
         opacity:1
       },500);
       $("#author").html(r.author);
      });
      var color = Math.floor(Math.random() * colors.length);
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);
    }
  });
}
$(document).ready(function(){
  $("#quote-btn").on("click",getQuote);
})
