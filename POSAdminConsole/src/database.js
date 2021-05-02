// function admin_login() {
//     var email = document.getElementById('admin').value;
//     var password = document.getElementById('password').value;

//     console.log(email)
//     console.log(password)

//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         // Signed in
//         var user = userCredential.user;
//         console.log(user);
//         session_id=user['idToken']
//         // ...
//         window.location.href ='dashboard.html';
//       })
//       .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorMessage);
//         // window.location.href() ='index.html';
//       });
// }



function newOrder() {
	firebase.firestore().collection("currentOrders").where("notify", "==", 1).onSnapshot((snapshot) => {
        console.log("New order invoked!");
		// console.log(snapshot.docChanges());
		snapshot.docChanges().forEach(change => {
			console.log("change: ",change.doc.data());
			// if (change)
			// if (change.type === 'added') {
			// 	console.log(change.doc.data());
				showNotification('top', 'right', `<b>New Order received!</b> from customer: ${change.doc.data()['user_name']}`, 'info', 20000);
			// }
			// if (change.type === 'removed') {
			// 	// showNotification('top', 'right', `<b>New Order received!</b> from customer: `, 'info', 12000);       
			// }
		});
	});
}

// try {
// 	newOrder();
// } catch(err) {
// 	console.log('Error getting documents', err)
// }