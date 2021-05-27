var db = firebase.firestore();
var c = 0;

// notify when new orders are made
// function newOrder() {
//     c = c + 1;

//     console.log(c, "New order invoked!");
//     db.collection("currentOrders").where("notify", "==", 1).onSnapshot((snapshot) => {
// 		console.log("snap",snapshot.docChanges());
// 		snapshot.docChanges().forEach(change => {
// 			console.log("change: ",change.doc.data());
			
// 			showNotification('top', 'right', `<b>New Order received!</b> <br> Customer Name: ${change.doc.data()['user_name']}
// 			<br> Order ID: ${change.doc.id}`, 'info', 20000);
// 			notified(change.doc);
// 		});
// 	});
// }

// once notification is done
function notified(doc, collec) {
    db.collection(collec).doc(doc.id)
    .update({
		// cart: doc.data().cart,
        // user_email: doc.data().user_email,
        // user_name: doc.data().user_name,
        // user_id: doc.data().user_id,
        // address: doc.data().address,
        // loc: doc.data().loc,
        // timestamp: doc.data().timestamp,
        // total: doc.data().total,
        // delivered: False,
        notify: 0
        })
        .then(() => {
            console.log("Notified once.");
        })
        .catch((error) => {
            console.error("Error notifying", error);
        });
}