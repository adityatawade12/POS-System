var db = firebase.firestore();

var currorders=[], pastorders=[];

function orderRetrieve () {
    db.collection("currentOrders").onSnapshot((snapshot) => {
        currorders=[], pastorders=[];
        let orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        snapshot.docChanges().forEach(change => {
			console.log("change: ",change.doc.data());
			showNotification('top', 'right', `<b>New Order received!</b> from customer: ${change.doc.data()['user_name']}`, 'info', 20000);
		})
        orders.forEach(or => {
            // console.log()
            if ((or['delivered'] == false) &&  !currorders.includes(or)) {
                currorders.push(or);
            }
            else if ((or['delivered'] == true) &&  !pastorders.includes(or)){
                pastorders.push(or);
            }
        });
        
        console.log("orderR invoked!");
        // newOrder();

        console.log("pastorders: ", pastorders, "currorders: ", currorders);
        
        displayOrder(currorders, pastorders);        
    });
}


// FUNC FOR DISPLAYING ORDERS
function displayOrder(currorders, pastorders) {
    let data = ``;
    currorders.forEach(curor => {
        // console.log(`category: ${cat}`)
        data += `
        <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Order ID: ${curor.id}</h4>
                    <p class="card-category">
                        Customer Name: ${curor.user_name}<br>
                        Address: ${curor.address}<br>
                        Time: ${new Date((curor["timestamp"].seconds)*1000).toUTCString()}
                    </p>
				    <a class="btn btn-primary" onclick="deliver('${curor.id}')" href="javascript:void(0)"><i class="fas fa-check"></i> Done</a>
                    
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class=" text-primary">
                                <th>Food Item</th>
                                <th class="text-center">Quantity</th>
                                <th class="text-center">Price</th>
                            <!-- <th>Total Price</th> -->
                            </thead>
                            <tbody>
                            `;
                            curor.cart.forEach(cart => {
                                data += 
                                `
                                    <tr>
                                        <td>${cart.itemName}</td>
                                        <td class="text-center">${cart.itemQty}</td>
                                        <td class="text-center">&#8377;${cart.totalPrice}</td>
                                    </tr>
                                `;
                            });
                    data += `
                                <tr>
                                    <td class="text-success"><b>Total Price</b></td>
                                    <td></td>
                                    <td class="text-center text-success"><b>&#8377;${curor.total}</b></td>
                                </tr>        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('COrder').innerHTML = data;

    var past = `<div id="accordion">`;
    pastorders.forEach(curor => {
        past += `
            <div class="card">
                <div class="card-header" id="#${curor.id}_head">
                    <a class="btn btn-primary btn-neutral" data-toggle="collapse" data-target="#${curor.id}_collapse" 
                    aria-expanded="true" aria-controls="${curor.id}_collapse" style="width: -webkit-fill-available; text-align:left;">
                        <h5 class="mb-0">
                            Order ID: ${curor.id}
                            <!-- <i class="fas fa-ellipsis-v"></i> -->
                        </h5>
                    </a>
                </div>
                    
                <div id="${curor.id}_collapse" class="collapse" aria-labelledby="${curor.id}_head" data-parent="#accordion">
                    <div class="card-body" style="padding: 15px;">
                        Date & Time: ${new Date((curor["timestamp"].seconds)*1000).toUTCString()}<br> 
                        Customer Name: ${curor.user_name}<br>Address: ${curor.address}<br>Items: `;
                        curor.cart.forEach(cart => {
                            past += `${cart.itemName}, `; 
                        });

                past +=`<br>
                        Total: &#8377;${curor.total}
                    </div>
                </div>
            </div>
        `;
    });
    past += `</div>`;
    document.getElementById('POrder').innerHTML = past;
}

function deliver(id) {
    // var id = ele.id;
    var name;
    currorders.forEach(cor => {
        if (id === cor.id) {
            name = cor.user_name;
        }
    });
    console.log("name: ", name);
    db.collection("currentOrders").doc(`${id}`)
    .update({
                delivered: true
            })
            .then(() => {
                console.log("Order delivered");
                showNotification('top', 'center', `<b>Success!</b>  The order (id: ${id}) is delivered to the customer`, 'success', 5000);
            })
            .catch((error) => {
                console.error("Error updating doc", error);
                showNotification('top', 'center', '<b>Error</b> Issues updating the order status', 'danger', 5000);
            });
}