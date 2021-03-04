
var cart=[];
function myfunct(name){
    
    console.log(name);
    $("#list").append("<li><span><i class='fa fa-trash'></i></span> " + name + "</li>")
    cart.push({itemName:name,itemQty:1})
    console.log(cart)
};


$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});


$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(300,function(){
		$(this).remove();
	});
	event.stopPropagation();
});



$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

