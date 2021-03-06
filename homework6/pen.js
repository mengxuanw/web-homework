$(document).ready(function(){
    $("button").on("click",function(){
        var word = $(".word").val();
        if(word == ""){
            $(".word").focus();
        }
        
        else{
            var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&gsrlimit-10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=";
           $.ajax({
               url: url + word,
               success: function(data){
                   var x=[];
                   for(var pageid in data.query.pages){
                       x.push(pageid);
                   }
                   $(x).each(function(index, el){
                       var page = data.query.pages[x[index]];
                       var title = page.title;
                       var extract = page.extract;
                       var imgsrc = "";
                       try{
                           imgsrc = page.thumbnail.source;
                       }
                       catch(e){}
                       var listcontent = "";
                       if(imgsrc){
                           listcontent = "<img src='"+imgsrc+"'>";
                       }
                       listcontent += extract;
                       var href = "http://en.wikipedia.org/wiki/" + encodeURIComponent(title);
                       var list = $(".searchresult ol li").eq(index);
                       list.find('a').text(title).attr('href',href);
                       list.find('p').html(listcontent);
                   });
               }
           }); 
           $('.logo').fadeOut();
           $('.form').animate({marginTop:"5px"}, 400, function(){
               //$(".searchresult").animate({height:"show"},600);
               $('.searchresult').fadeIn();
           });
        }
    })

    $(".word").focus(function(){
        $(this).select();
        $('.form').animate({marginTop:"0px"}, 400, function(){
            $('.logo').fadeIn();
        });
        //$('searchresult').stop(true,true).animate({height:"hide"}, 600);
        $('.searchresult').fadeOut();
    })
})
