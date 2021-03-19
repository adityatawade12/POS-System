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

var cart = JSON.parse(document.getElementById('cart').textContent);
console.log(cart);
updateTotal(cart);

var modal = document.getElementById("myModal");
var mod = document.getElementById("myMod");
var btn = document.getElementById("mapbtn");
var btn2 = document.getElementById("place");
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

btn.onclick = function() {
  modal.style.display = "block";
}

btn2.onclick = function() {
    mod.style.display = "block";
  }

span.onclick = function() {
  modal.style.display = "none";
}

span2.onclick = function() {
    mod.style.display = "none";
  }

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$(".but").on("click","a",function(event){
    var r=$(this).attr('class').split(" ")[0]
    var t=$(this).parent().attr('class').slice(4)
    console.log(t);
    console.log(r);
    cart.forEach((item,index)=>{
        if(item.itemName==t){
            if(r=="minus"){
                item.itemQty=item.itemQty-1;
            }else{
                item.itemQty=item.itemQty+1;
            }
            if(item.itemQty==0){
                $(this).parent().parent().parent().parent().parent().parent().parent().css({"display": "none"})
                delete cart[index];
            }
            cart=cart.filter(el => el);
            console.log(cart)
            item.totalPrice=item.itemPrice*item.itemQty;
            $(this).parent().parent().parent().parent().children('div').eq(2).html('<h2 class="card-title-checkout">&#8377; '+item.totalPrice+' </h2>')
            $(this).parent().html('<a href="javascript:void(0)" class="minus">-</a><span style="width: 35px;" class="quanval"> '+item.itemQty+' </span><a href="javascript:void(0)" class="plus">+</a>')
            updateTotal(cart);
            myCart();
        }
    });
    console.log(cart)
})

function updateTotal(cart){
    var subT=0;
    var grnT=0;
    cart.forEach((item,index)=>{
        subT=subT+item.totalPrice;
    });
    console.log(subT);
    grnT=0.05*subT+subT;
    console.log(grnT);
    $(".subT").html('<h6>Sub-Total:&emsp13;<span> '+subT+' </span></h6>')
    $(".grnT").html('<h6>Grand-Total:&emsp13;<span> '+grnT+' </span></h6>')
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