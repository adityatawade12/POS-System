var db = firebase.firestore();


function checkuser() {
    admin_user = JSON.parse(localStorage.getItem('admin_cred'));
    console.log("admin data:", admin_user);
    console.log("type of", typeof(admin_user));

    let adminId = admin_user.id;
    console.log("admin id:", adminId, admin_user['id']);
    let found_user = 0;

    db.collection("admin-data").onSnapshot((snapshot) => {
		let adminLogin = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		adminLogin.forEach((doc) =>{
			console.log('usera:', doc.id);

            if (doc['admin-id'] == adminId) {
                user = doc;
                console.log("user: ", user);
                found_user = 1;
			}
		})
        
        if (found_user === 0) {
            window.location.href = 'index.html';
        }
    
    });
    
    return admin_user;
}

function logout() {
    let us = checkuser();
    localStorage.removeItem('admin_cred');
    window.location.href = 'index.html';
}

// notify when new orders are made
function newOrder() {
	// db.collection("currentOrders").where("notify", "==", 1).onSnapshot((snapshot) => {
    //     console.log("New order invoked!");
	// 	// console.log(snapshot.docChanges());
	// 	snapshot.docChanges().forEach(change => {
	// 		console.log("change: ",change.doc.data());
			
	// 		showNotification('top', 'right', `<b>New Order received!</b> <br> Customer Name: ${change.doc.data()['user_name']}
	// 		<br> Order ID: ${change.doc.id}`, 'info', 20000);
	// 		notified(change.doc);
	// 	});
	// });
    console.log("HI db.js")
}

// once notification is done
function notified(doc, collection) {
    db.collection(collection).doc(doc.id)
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
            console.error("Error", doc,id, " notifying", error);
        });
}