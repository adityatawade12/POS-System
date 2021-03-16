
var cart=[];

function newCartItem(name,price){
    
    console.log(name);
     
    console.log(cart)
    cart.forEach((item, index) => {
            if(item.itemName==name){
                item.itemQty+=1
                item.totalPrice=item.itemPrice*item.itemQty
            }
});

    cart.push({itemName:name,itemQty:1,itemPrice:price,totalPrice:price})
    
cartRefresh()

}

$(".click").on("click",function(event){
    console.log("run")
    $(this).parent().children('div').eq(1).css({"visibility": "visible"})
    $(this).css({"visibility": "hidden"});
})

$(".click1").on("click", "a", function(event){
    var t= $(this).parent().parent().parent().parent().parent().attr('id')
    var r=$(this).attr('class').split(" ")[1]
    console.log(t)
    console.log(r)
       cart.forEach((item, index) => {
        if(item.itemName==t){
            if(r=='inc'){
                item.itemQty+=1
            }else{
                item.itemQty-=1
            }
            item.totalPrice=item.itemPrice*item.itemQty
           if(item.itemQty==0){
            item.itemQty=1;
            $(this).parent().parent().css({"visibility": "hidden"});
            $(this).parent().parent().parent().children('div').eq(0).css({"visibility": "visible"})
            cart.forEach((item, index1) => {
                if(item.itemName==t){
                    delete cart[index1]
                }
        });
           }
           $(this).parent().html('<a class="indebtn dec" href="javascript:void(0)" >-</a>'+item.itemQty+'<a class="indebtn inc" href="javascript:void(0)" >+</a>')   
        }
});
cartRefresh()
});

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


function cartRefresh(){
    var int=""

cart.forEach((item, index) => {
    // $("#list").append("<li><span><i class='fa fa-trash'></i></span> " + item.itemName +" "+item.itemQty +"</li>")
    int+="<li><span><i class='fa fa-trash'></i></span> <span>" + item.itemName +"</span> <span>"+item.itemQty +"</span> <span>"+item.totalPrice +"</span></li>"
    
});
document.getElementById("list").innerHTML=int
}