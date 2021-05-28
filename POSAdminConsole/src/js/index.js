var found_user = 0;
var db = firebase.firestore();

let form  = document.getElementById('login');

var crypt = {
  // (B1) THE SECRET KEY
  secret : "CIPHERKEY",
 
  // (B2) ENCRYPT
  encrypt : function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },
 
  // (B3) DECRYPT
  decrypt : function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};

console.log("local storage:", localStorage.getItem('admin_cred'));


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

$('#submit').on('click', function (){

  // function admin_login() {
      var adminId = document.getElementById('admin').value;
      var password = document.getElementById('password').value;
  
      console.log(adminId)
      console.log(password)
  
      passEnter = crypt.encrypt(password);
      console.log("password:", passEnter);
      console.log("password:", crypt.decrypt(passEnter));
  
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
        passEnter = crypt.decrypt(doc['password']);
        console.log("password:", passEnter, doc['password']);
  
        if (doc['admin-id'] == adminId && password == passEnter) {
          user = doc;
          console.log("user: ", user);
          found_user = 1;
          // window.setTimeout(window.location.assign('/dashboard.html'), 50000);
          // window.location.assign('/dashboard.html');
  
          persis(doc['admin-id']);
  
          window.location.href = 'dashboard.html';
        }
      })
      
      if (found_user === 0) {
        alert("You have entered wrong Id or Password.");
      }
      
    });
  
  // }
});


function persis(id) {
  // db.collection("pastOrders").doc(`${id}`)
  //   .set({
  //     admin_id: id,
  //     // ip_add:  
  //   })
  //   .then(() => {
  //     console.log("Login Success");
  //   })
  //   .catch((error) => {
  //       console.error("Error updating doc", error);
  //   });

  console.log("local storage:", localStorage.getItem('admin_cred'));
    dId = Math.random().toString(36).slice(2);
    localStorage.setItem('admin_cred', JSON.stringify({id: id, deviceId: dId}));
}