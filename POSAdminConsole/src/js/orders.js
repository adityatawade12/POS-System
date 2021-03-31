var db = firebase.firestore();

let currorders, data;

function orderRetrieve () {
    db.collection("currentOrders").onSnapshot((snapshot) => {
        currorders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // dishes = data;
        console.log("All data in 'currorders' collection", currorders);
        
        // currorders.forEach((doc) =>{
        //     str = `${doc.id}`;
        //     if (!usID.includes(str)) {
        //         usID.push(str);
        //     }
        // });

        // snapshot.docChanges().forEach(change => {
        //     console.log(snapshot.docChanges(), change);
        //     if (change.type === 'added') {
                // add the doc data to the page
                // console.log("dishes",dishes,"cate:", category);
               displayOrder(currorders);
        //     }
        //     if (change.type === 'removed') {
        //         // remove the doc data from the page        
        //     }
        // });
        
    });
}


// FUNC FOR DISPLAYING ORDERS
function displayOrder(currorders) {
    data = ``;
    currorders.forEach(curor => {
        // console.log(`category: ${cat}`)
        data += `
        <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Order ID</h4>
                    <p class="card-category">
                        Customer Name: ${curor.user_name}<br>
                        Address: ${curor.address}<br>
                        Time: ${new Date((curor["timestamp"].seconds)*1000).toUTCString()}
                    </p>
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

    document.getElementById('order').innerHTML = data;
}