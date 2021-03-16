
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

$("ul").on("click", "span", function(event){
    var t= $(this).parent().children("span")[1].outerText
    //    console.log(t)
       cart.forEach((item, index) => {
        if(item.itemName==t){
            delete cart[index]
        }
           
});
cart=cart.filter(el => el);
console.log(cart)
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
//     int+=`<li><div class="_cards" style="display: flex; justify-content: center;">
//     <div style="height: 100%;">
//             <!--class="card-img-top" --> 
//             <div class="card_img" style="height: 40%; background-image: url('`+item.itemImage+`');">
//                     <!-- <img class="card-img-top" alt="Card image cap" style=""> -->
//             </div>
//             <div class="card-body"style="background-color: blanchedalmond ; max-height:60%;font-size:100%;overflow:hidden ">
//                     <!-- <br> -->
//                     <div style="height: 20%;font-size: 1.2em;">
//                             <h5 class="card-title-1" style="font-size: 1.1em;font-weight: bold;">`+item.itemName+`</h5>
//                     </div>
//                     <div style="height: 30%; display: flex; align-items: center;">
//                             &emsp;&#8377;`+item.totalPrice+`
//                     </div>
//             </div>
//     </div>
// </div></li>`;
    int+="<li><span><i class='fa fa-trash'></i></span> <span>" + item.itemName +"</span> <span>"+item.itemQty +"</span> <span>"+item.totalPrice +"</span></li>"
    
});
document.getElementById("list").innerHTML=int

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
            
        },
        // on error
        error: function(response) {
            // alert the error if any error occured
            
            console.log(response.responseJSON.errors)
        }
    });
    return false;

}

