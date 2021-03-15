// var dishes=( function(){
//     fetch('/orders/items', {
//         method: 'get'
//     })
//     .then(response => response.json())
//     .then(jsonData => {
//         console.log(typeof(jsonData))
//         return jsonData;
//     })
//     .catch(err => {
//             //error block
//             console.log(err)
//         })
// })();

var dishes;

$.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'dataType': 'html',
    'url': "/orders/items",
    
    'success': function (data) {
        dishes = data;
        // console.log(dishes)
    }
});
// console.log(myVariable)
myObject = JSON.parse(dishes);
console.log(myObject)
var cart=[];

myObject.forEach((i,i1)=>{
    console.log(i)
})

$(".click").on("click",function(event){
    
    $(this).parent().children('div').eq(1).css({"visibility": "visible"})
    $(this).css({"visibility": "hidden"});
    var name=$(this).attr('class').slice(6)
    myObject.forEach((i,x)=>{
        if(name==i.Name){
            price=i.Price
        }
    })
    // var price=$(this).children('a').eq(0).attr('class')
    cart.push({itemName:name,itemQty:1,itemPrice:price,totalPrice:price})
    
    cartRefresh()
    
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
    //    console.log(t)
       cart.forEach((item, index) => {
        if(item.itemName==t){
            delete cart[index]
        }
        
    
});

t=t.split(' ').join('.');
// console.log($(".incdec."+t))
$("."+t+".incdec").children('div').eq(0).html('<a class="indebtn dec" href="javascript:void(0)" >-</a>1<a class="indebtn inc" href="javascript:void(0)" >+</a>')
    $(".incdec."+t).css({"visibility": "hidden"})
    $("."+t+".click").css({"visibility": "visible"})
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