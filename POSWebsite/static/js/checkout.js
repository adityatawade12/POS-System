var cart = JSON.parse(document.getElementById('cart').textContent);
console.log(cart);
updateTotal(cart);

var modal = document.getElementById("myModal");
var btn = document.getElementById("mapbtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$(".but").on("click","a",function(event){
    var r=$(this).attr('class').split(" ")[0]
    var t=$(this).parent().attr('class').slice(4)
    console.log(t)
    console.log(r);
    cart.forEach((item,index)=>{
        if(item.itemName==t){
            if(r=="minus"){
                item.itemQty=item.itemQty-1;
            }else{
                item.itemQty=item.itemQty+1;
            }
            item.totalPrice=item.itemPrice*item.itemQty;
            $(this).parent().parent().parent().parent().children('div').eq(2).html('<h2 class="card-title-checkout">&#8377; '+item.totalPrice+' </h2>')
            $(this).parent().html('<a href="javascript:void(0)" class="minus">-</a><span style="width: 35px;" class="quanval"> '+item.itemQty+' </span><a href="javascript:void(0)" class="plus">+</a>')
            updateTotal(cart);
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
