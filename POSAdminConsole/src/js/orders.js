var db = firebase.firestore();

var currorders=[], pastorders=[], pastordersDine=[], tables=[];


// retrieve from the database
function orderRetrieve () {
    db.collection("currentOrders").onSnapshot((snapshot) => {
        currorders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        snapshot.docChanges().forEach(change => {
            // console.log("change: ",change.doc.data());
            if (change.doc.data().notify === 1) {
                // in-app notifiaction
                showNotification('top', 'right', `
                <b>New Order received!</b> 
                <br> Order ID: ${change.doc.id}
                <br> Customer Name: ${change.doc.data()['user_name']}`, 'info', 20000);
                notified(change.doc);
            }
        });

        // console.log("orderR invoked!");
        // newOrder();

        displayCurrOrd(currorders);
    })

    db.collection("pastOrders").where("user_id", "!=", "").onSnapshot((snapshot) => {
        pastorders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // snapshot.docChanges().forEach(change => {
        //     console.log("change: ",change.doc.data());
        //     // if (change.type === 'added') {
        //     //     showNotification('top', 'right', `<b>New Order received!</b> <br>ID: ${change.doc.data().id}`, 'info', 20000);
        //     // }
        // });
 
        // console.log("pastorders: ", pastorders, "currorders: ", currorders);
        displayPastOrd(pastorders);
    })

    db.collection("pastOrders").where("table", "!=", "").onSnapshot((snapshot) => {
        pastordersDine = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        pastordersDine.forEach((doc) =>{
            str = `${doc["table"]}`;
            if (!tables.includes(str)) {
                tables.push(str);
            }
        })
        snapshot.docChanges().forEach(change => {
            console.log("change: ",change.doc.data());
            // if (change.type === 'added') {
            //     showNotification('top', 'right', `<b>New Order received!</b> <br>ID: ${change.doc.data().id}`, 'info', 20000);
            // }
        });

        console.log("pastorders: ", pastorders, "pastorders dine: ", pastordersDine, "currorders: ", currorders);
        displayPastOrdDine(pastordersDine);
    });
}


// FUNC FOR DISPLAYING ORDERS
function displayCurrOrd(currorders) {
    let data = ``;
    if (currorders.length == 0) {
        data = `
        <div class="card">
        <div class="card-header">
            <p class="card-category">
                There are no orders placed currently.
            </p>
        </div>
        `;
    }
    else {
        currorders.forEach(curor => {
            // console.log(`category: ${cat}`)
            data += `
            <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Order ID: ${curor.id}</h4>
                        <p class="card-category">
                            Customer Name: ${curor.user_name}<br>
                            Address: ${curor.address}<br>
                            Time: ${new Date((curor["timestamp"].seconds)*1000)}
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
    }
    document.getElementById('COrder').innerHTML = data;
}

function displayPastOrd(pastOrders) {
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

function displayPastOrdDine(pastordersDine) {
    var past = `<div id="accordion1">`;
    pastordersDine.forEach(curor => {
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

                <div id="${curor.id}_collapse" class="collapse" aria-labelledby="${curor.id}_head" data-parent="#accordion1">
                    <div class="card-body" style="padding: 15px;">
                        
                        Waiter: ${curor.waiter}<br>Items: `;
                        curor.cart.forEach(cart => {
                            past += `${cart.name}, `; 
                        });

                past +=`<br>
                        Total: &#8377;${curor.total_price}
                    </div>
                </div>
            </div>
        `;
    });  

    past += `</div>`;
    document.getElementById('PDOrder').innerHTML = past;
}


function deliver(id) {
    // var id = ele.id;
    var name, cart, email, address, loc, timestamp, total, uid;

    currorders.forEach(cor => {
        if (id === cor.id) {
            name = cor.user_name;
            cart = cor.cart;
            email = cor.user_email;
            address = cor.address;
            loc = cor.loc;
            timestamp = cor.timestamp;
            total = cor.total;
            uid = cor.user_id;
        }
    });

    console.log("name: ", name);

    db.collection("pastOrders").doc(`${id}`)
    .set({
        cart: cart,
        user_email: email,
        user_name: name,
        user_id: uid,
        address:  address,
        loc: loc,
        timestamp: timestamp,
        total: total,
        delivered: true,
        })
        .then(() => {
            console.log("Order delivered");
            showNotification('top', 'center', `<b>Success!</b>  The order (id: ${id}) is delivered to the customer`, 'success', 5000);
        })
        .catch((error) => {
            console.error("Error updating doc", error);
            showNotification('top', 'center', '<b>Error</b> Issues adding the item', 'danger', 5000);
        });

        console.log("past: ", db.collection("pastOrders"));
    // db.collection("currentOrders").doc(`${id}`)
    // .update({
    //             delivered: true
    //         })
    //         .then(() => {
    //             console.log("Order delivered");
    //             showNotification('top', 'center', `<b>Success!</b>  The order (id: ${id}) is delivered to the customer`, 'success', 5000);
    //         })
    //         .catch((error) => {
    //             console.error("Error updating doc", error);
    //             showNotification('top', 'center', '<b>Error</b> Issues updating the order status', 'danger', 5000);
    //         });

    db.collection("currentOrders").doc(`${id}`)
    .delete()
    .then(() => {
        console.log("Document deleted from the current orders");
        // showNotification('top', 'center', '<b>Success!</b>  Item deleted from the current orders', 'success', 5000);
    })
    .catch((error) => {
        console.error("Error deleting doc", error);
        // showNotification('top', 'center', '<b>Error</b> Issues deleting the item', 'danger', 5000);
    });
}