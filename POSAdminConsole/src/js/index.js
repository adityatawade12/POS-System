var found_user = 0;
var db = firebase.firestore();

let form  = document.getElementById('login');

// form.addEventListener('submit', (event) => {

// 	let adminId = form.elements['admin'].value;
// 	let password = form.elements['password'].value;

// 	db.collection("admin-data").onSnapshot((snapshot) => {
// 		let adminLogin = snapshot.docs.map((doc) => ({
// 		id: doc.id,
// 		...doc.data(),
// 		}))

// 		adminLogin.forEach((doc) =>{
// 			window.setTimeout(console.log(adminId, password), 10000);
// 			console.log('usera:', doc.id);
// 			if (doc['admin-id'] == adminId && doc['password'] == password) {
// 			user = doc;
// 			console.log("user: ", user);

// 			found_user = 1;
// 			// window.setTimeout(window.location.assign('/dashboard.html'), 50000);
// 			// window.location.assign('/dashboard.html');
// 			window.location.href = 'dashboard.html';
// 			}
// 		})
// 	});

// 	// console.log(adminId, password);

// });

function admin_login() {
    var adminId = document.getElementById('admin').value;
    var password = document.getElementById('password').value;

    console.log(adminId)
    console.log(password)

    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     var user = userCredential.user;
    //     setTimeout(console.log("hi: ",user), 8000);
    //     // ...
    //     // window.location.href = 'dashboard.html';
    //     setTimeout(window.location.assign('/dashboard.html'), 10000);
    //     // window.location.assign('/dashboard.html');
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorMessage);
    //     // window.location.href() ='index.html';
    //   });

    db.collection("admin-data").onSnapshot((snapshot) => {
		let adminLogin = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		adminLogin.forEach((doc) =>{
			console.log('usera:', doc.id);
			if (doc['admin-id'] == adminId && doc['password'] == password) {
				user = doc;
				console.log("user: ", user);
				found_user = 1;
				// window.setTimeout(window.location.assign('/dashboard.html'), 50000);
				// window.location.assign('/dashboard.html');
				window.location.href = 'dashboard.html';
			}
		})
    if (found_user == 0) {
      // alert("The user doesn't exist!");
      showNotification('top', 'center', '<b>Error</b> Invalid username or password!', 'danger', 5000);
    }
    });
}