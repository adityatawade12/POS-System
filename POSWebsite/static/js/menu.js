
var cart=[];

function myfunct(name){
    var x=0;
    console.log(name);
    
    
    console.log(cart)
    cart.forEach((item, index) => {
            if(item.itemName==name){
                item.itemQty+=1
                x=1;  
            }
            
        
});
if(x!=1){
    cart.push({itemName:name,itemQty:1})
    // $("#list").append("<li><span><i class='fa fa-trash'></i></span> " + name +" " +"</li>")
}
var int=""

cart.forEach((item, index) => {
    // $("#list").append("<li><span><i class='fa fa-trash'></i></span> " + item.itemName +" "+item.itemQty +"</li>")
    int+="<li><span><i class='fa fa-trash'></i></span> <span>" + item.itemName +"</span> <span>"+item.itemQty +"</span></li>"
    

});
document.getElementById("list").innerHTML=int
}



$("ul").on("click", "span", function(event){
    var t= $(this).parent().children("span")[1].outerText
       console.log(t)
       cart.forEach((item, index) => {
        if(item.itemName==t){
            delete cart[index]
        }
        
    
});
	$(this).parent().fadeOut(300,function(){
       
		$(this).remove();

	});
	event.stopPropagation();
});



$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

