
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');

var dishes;

dishes = JSON.parse(document.getElementById('items').textContent);

var cart=[];

cart = JSON.parse(document.getElementById('cartitems').textContent);
console.log(cart)
if (cart!=null && cart.length>0 ){
    
    cart.forEach((ci,cii)=>{
    clx=ci.itemName.split(' ').join('.');
    console.log(clx)
    $(".click."+clx).css({"visibility": "hidden"});
    $(".click."+clx).parent().children('div').eq(1).css({"visibility": "visible"})
    $(".click."+clx).parent().children('div').eq(1).children('div').eq(0).html( '<a class="indebtn dec" href="javascript:void(0)" >-</a>'+ci.itemQty+'<a class="indebtn inc" href="javascript:void(0)" >+</a>')
   
})
}else{
    cart=[]
}

$(".click").on("click",function(event){
    $(this).parent().children('div').eq(1).css({"visibility": "visible"})
    $(this).css({"visibility": "hidden"});
    var name=$(this).attr('class').slice(6)
    // var image=null
    dishes.forEach((i,x)=>{
        if(name==i.Name){
            price=i.Price
            img=i.Image
        }
    })
    // var price=$(this).children('a').eq(0).attr('class')
    cart.push({itemName:name,itemQty:1,itemPrice:price,totalPrice:price,itemImage:img})
    cartRefresh()
    
})

$(".click1").on("click", "a", function(event){
    var t= $(this).parent().parent().parent().parent().parent().attr('id')
    var r=$(this).attr('class').split(" ")[1]
   
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

        cart=cart.filter(el => el);
        console.log(cart)
           }
           $(this).parent().html('<a class="indebtn dec" href="javascript:void(0)" >-</a>'+item.itemQty+'<a class="indebtn inc" href="javascript:void(0)" >+</a>')   
        }
});
cartRefresh()
});

$("#list").on("click", "span", function(event){
    var t= $(this).parent().parent().attr('class').slice(4)
       console.log(t)
       cart.forEach((item, index) => {
        if(item.itemName==t){
            delete cart[index]
        }
           
});
cart=cart.filter(el => el);
var t= $(this).parent().parent().attr('class').slice(4).split(' ').join(".")
console.log(cart)
t=t.split(' ').join('.');
// console.log($(".incdec."+t))
$("."+t+".incdec").children('div').eq(0).html('<a class="indebtn dec" href="javascript:void(0)" >-</a>1<a class="indebtn inc" href="javascript:void(0)" >+</a>')
    $(".incdec."+t).css({"visibility": "hidden"})
    $("."+t+".click").css({"visibility": "visible"})
	$(this).parent().parent().fadeOut(300,function(){
       
		$(this).remove();

	});
	event.stopPropagation();
    myCart();
});


function cartRefresh(){
    var int=""

    cart.forEach((item, index) => {

        int+=`<div class="row `+item.itemName+`" style="height: 6em;">
            <div class="col-4" id="cart_img">
            <a href="#` +item.itemName+ `_span" style="text-decoration: none; color: #24252a; background-image: url(` +item.itemImage+ `);"></a>
                    <!-- <img src=`+item.itemImage+`> -->
            </div>
            <div class="col-4">
                    <a href="#`+item.itemName+`" style="text-decoration: none; color: #24252a;">`+item.itemName+`</a>
            </div>
            <div class="col-1">
                    `+item.itemQty+`
            </div>
            <div class="col-2">
                    &#8377;`+item.totalPrice+`
            </div>
            <div class="col-1">
                    <span><i class='fa fa-trash'></i></span>
            </div>
        </div> `

    });
    if (int.length == 0)
    {
        int = `Your Cart is empty!`;
    }
    myCart();
    document.getElementById("list").innerHTML=int
}

  function myCart() {
    cart1=JSON.stringify(cart)
    // create an AJAX call
    console.log(cart)
    console.log(cart1)
    $.ajax({
        data: {cart:cart1}, // get the form data
        method: "POST", 
        headers: { "X-CSRFToken": csrftoken  },// GET or POST
        url: "/orders/checkout",
        // on success
        success: function(response) {
            // alert("Thankyou for reaching us out ");
        },
        // on error
        error: function(response) {
            // alert the error if any error occured
            // alert(response.responseJSON.errors);
            console.log(response.responseJSON.errors)
        }
    });
    return false;
}

function scrolldiv(arg) { 
    var elem = document.getElementById(arg); 
    elem.scrollIntoView();
}
