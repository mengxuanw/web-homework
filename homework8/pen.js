var expre = "";
$(document).ready(function(){
    $("button").on("click",function(e){
        var val = $(e.target).text();
        if(val === "AC"){
            expre = "";
        }
        else if(val === "CE"){
            expre = expre.slice(0,-1);
        }
        else if(val === "="){
            expre = eval(expre);
        }
        else if(val === "Ans"){
        }
        else{
            expre += val;
        }
        $(".text").val(expre);
    })
})
