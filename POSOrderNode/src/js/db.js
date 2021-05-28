let  dishes , category=[], data='',cart=[],cartData='',basecart,currentTable,tables=[],currentCart,totP=0,waiters,currentWaiter;
var db = firebase.firestore();


function dataRetrieval() {
    db.collection("dishes").onSnapshot((snapshot) => {
        dishes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        dishes.forEach((doc) => {
            str = `${doc["Category"]}`;
            if (!category.includes(str)) {
                category.push(str);
            }
        });
        getcurrWaiter();
        displayDish(dishes, category);
        console.log(dishes);
        console.log(currentWaiter);
    });
}

function loadWaiterCred(){
    db.collection("waiterCredentials").onSnapshot((snapshot) => {
        waiters = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(waiters);
    });
}

function getcurrWaiter(){
    var a = window.location.href;
    console.log(a);
    var li = a.split("?");
    console.log(li);
    var id = li[1];
    console.log(id);
    waiters.forEach((wt)=>{
        if(wt["LM_id"]==id){
            currentWaiter=wt["Name"];
        }
    });
    document.getElementById("currWait").innerHTML=`<a class="subheader">`+currentWaiter+`</a>`;
}

window.onload = loadWaiterCred();

function displayDish() {
    var c=0,quan;
    data = ``;
    category.forEach(cat => {
        data += `
            <div class="recipes container grey-text text-darken-1">
                <div class="card-head">
                    <h5 class="card-title" style="color:rgba(54, 52, 52, 0.7),font-weight:bold">`+cat+`</h5>
                </div>`;
        dishes.forEach((doc)=>{
            if (cat == doc["Category"]){
                c=0;
                cart.forEach((ca)=>{
                    if(ca["name"]==doc["Name"]){
                        c=1;
                        quan=ca["quantity"];
                    }
                });
                if(c==0){
                    data+=`
                    <div class="card-panel recipe white row ${doc["Category"]}" id="${doc["id"]}">
                        <div class="img" style="background-image: url('${doc["Image"]}');" >
                            
                        </div>
                        <div class="recipe-details">
                            <div class="recipe-title">${doc["Name"]}</div>
                            <div class="recipe-ingredients">${doc["Price"]}</div>
                        </div>
                        
                        <div class="center cart" style="display:block">
                            <a class="btn-floating btn-small btn-large add-btn" >
                                <i class="material-icons " onclick="displayCart()">add</i>
                            </a>
                        </div>
                        <div class="center incdec" style="display:none">
                            <div class="click1">
                                <a class="btn-floating btn-small btn-large add-btn dec" >
                                    <i class="material-icons " onclick="displayCart()">remove</i>
                                </a>
                                1
                                <a class="btn-floating btn-small btn-large add-btn inc" >
                                    <i class="material-icons " onclick="displayCart()">add</i>
                                </a>
                            </div>
                        </div> 
                    </div>`;
                }else if(c==1){
                    data+=`
                    <div class="card-panel recipe white row ${doc["Category"]}" id="${doc["id"]}">
                        <div class="img" style="background-image: url('${doc["Image"]}');" >
                            
                        </div>
                        <div class="recipe-details">
                            <div class="recipe-title">${doc["Name"]}</div>
                            <div class="recipe-ingredients">${doc["Price"]}</div>
                        </div>
                        
                        <div class="center cart" style="display:none">
                            <a class="btn-floating btn-small btn-large add-btn" >
                                <i class="material-icons " onclick="displayCart()">add</i>
                            </a>
                        </div>
                        <div class="center incdec" style="display:block">
                            <div class="click1">
                                <a class="btn-floating btn-small btn-large add-btn dec" >
                                    <i class="material-icons " onclick="displayCart()">remove</i>
                                </a>`+
                                quan+`
                                <a class="btn-floating btn-small btn-large add-btn inc" >
                                    <i class="material-icons " onclick="displayCart()">add</i>
                                </a>
                            </div>
                        </div> 
                    </div>`;
                }
            };
        });
        data+=`
        </div>`;
    });
    document.getElementById("dis").innerHTML=data;
}



$(".addB").on("click",function(event){
    console.log("Clicked");
});

$("#dis").on("click",".cart",function(){
    console.log("Clicked!");
    $(this).css({"display": "none"});
    $(this).parent().children('div').eq(3).css({"display": "block"});
    var name=$(this).parent().children('div').eq(1).children('div').eq(0).html();
    console.log(name);
    var price=$(this).parent().children('div').eq(1).children('div').eq(1).html();
    console.log(price);
    var food_id=$(this).parent().attr('id').split(" ")[0];
    console.log(food_id);
    var fcat=$(this).parent().attr('class').split(" ")[4];
    if(fcat=="Main"){
        fcat=fcat+" "+$(this).parent().attr('class').split(" ")[5];
    }
    console.log(fcat);
    det={
        "name":name,
        "price":price,
        "total_price":price, 
        "F_id":food_id,
        "quantity":1,
        "fcat":fcat,
    }
    var l = cart.length;
    cart[l]=det;
    console.log(cart);
    displayCart();
});

$("#dis").on("click",".click1 a",function(){
    console.log("Clicked!");
    var t=$(this).parent().parent().parent('div').attr('id').split(" ")[0];
    var r=$(this).attr('class').split(" ")[4];
    console.log(t);
    console.log(r);
    cart.forEach((item,index) => {
        if(item.F_id==t){
            if(r=="inc"){
                console.log("Increement");
                item.quantity+=1;
                console.log(item.quantity);
                displayCart();
            }else if(r=="dec"){
                console.log("Decreement");
                item.quantity-=1;
                console.log(item.quantity);
                displayCart();
            }
            item.total_price=item.price*item.quantity;
            if(item.quantity==0){
                item.quantity=1;
                $(this).parent().parent().css({"display": "none"});
                $(this).parent().parent().parent().children('div').eq(2).css({"display":"block"});
                cart.forEach((item,index1) =>{
                    if(item.F_id==t){
                        delete cart[index1];
                    }
                });
                cart=cart.filter(el=>el);
                console.log(cart);
            }
            $(this).parent().html('<a class="btn-floating btn-small btn-large add-btn dec"><i class="material-icons ">remove</i></a>'+item.quantity+'<a class="btn-floating btn-small btn-large add-btn inc" ><i class="material-icons ">add</i></a>');
        }
        
    });
    console.log(cart);
    displayCart();
});

function displayCart(){
    totP=0;
    console.log(category);
    cartData=``;
    console.log();
    category.forEach(ct=>{
        cartData+=`
            <div class="rec-cart">
                <div class="carthead"><h5 style="color:blanchedalmond;border-bottom:1px solid blanchedalmond;margin-right:10%;">`+ ct +`</h5></div>
                <div class="row" >`;
        console.log(ct);
        cart.forEach(dc=>{
            if(ct==dc["fcat"]){
                totP+=parseInt(dc["total_price"]);
                cartData +=`
                
                    <div class="col s6" style="text-align:left;color:blanchedalmond;">${dc["name"]}</div>
                    <div class="col s3" style="text-align:center;color:blanchedalmond;">${dc["quantity"]}</div>
                    <div class="col s3" style="text-align:center;color:blanchedalmond;">${dc["total_price"]}</div>
                `;
            }
        });
        cartData +=`
        </div>
        
        </div>
        `;
    });
    cartData+=`
    <div style="text-align:left;color:blanchedalmond;">
           Total Amount:`+ totP+` 
        </div>
        <div>
          <button id="check-btn" onclick="checkout()">Checkout</button>
        </div>`
    document.getElementById("cartbody").innerHTML=cartData;
    tables.forEach((table)=>{
        if(table==currentTable){
            basecart.forEach((doc)=>{
                if(doc["table"]==table){
                    console.log(table+"detected");
                    var myca = db.collection("diningOrders").doc(doc["id"]);
                    return myca.update({
                        cart: cart,
                        totalprice: totP,
                    })
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                    
                }
            });
        }
    });
    
}

function Indicart(){
    db.collection("diningOrders").onSnapshot((snapshot) => {
        basecart = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        basecart.forEach((doc) => {
            str = `${doc["table"]}`;
            if (!tables.includes(str)) {
                tables.push(str);
            }
        }); 
        console.log(basecart);
        console.log(tables);
    });

}

$(".tab-but").on("click",function(){
    currentTable=$(this).html();
    tables.forEach((item,index)=>{
        console.log(item);
        if(item==currentTable){
            basecart.forEach((Citem)=>{
                if(item==Citem.table){
                    currentCart=Citem.cart;
                    console.log(Citem.cart);
                }
            });
        }
    });
    cart=currentCart;
    displayDish();
    displayCart();
    console.log(currentTable);
    console.log(currentCart)
});

function checkout(){
    console.log("Clicked");
    db.collection("currentDining").add({
        cart: currentCart,
        table: currentTable,
        total_price: totP,
        waiter:currentWaiter,
        notify:1,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    currentCart=[];
    console.log(currentCart);
    basecart.forEach((doc)=>{
        if(doc["table"]==currentTable){
            
            var myca = db.collection("diningOrders").doc(doc["id"]);
            return myca.update({
                cart: currentCart,
                totalprice: 0,
                waiter:"",
            })
            .then(() => {
              console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });    
        }
    });
};

$("#check-btn").on("click",function(){
    loadWaiterCred();
    console.log("Clicked!!");
    var name = $("#exampleInputEmail1").val();
    var Id = $("#exampleInputPassword1").val();
    var check=0;
    waiters.forEach((wt)=>{
        if(name==wt["Name"]){
            if(Id==wt["LM_id"]){
                console.log("Valid User!!");
                check=1;
                window.location.assign("pages/menu.html?"+Id);
            }else{
                //alert("Incorrect Id!!");
                check=2;
            }
        }else{
            //alert("Waiter not registered!!");
        }
    });
    if(check==0){
        alert("Waiter not registered!!");
        window.location.assign("../index.html");
    }else if(check==2){
        alert("Incorrect Id!Try again");
        $("#exampleInputPassword1").val("");
    }
    //window.location.assign("pages/menu.html");
});






