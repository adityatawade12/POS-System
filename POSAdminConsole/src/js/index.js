function admin_login() {
    var email = document.getElementById('admin').value;
    var password = document.getElementById('password').value;

    console.log(email)
    console.log(password)

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        // ...
        window.location.href ='dashboard.html';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        showNotification('top', 'center', `<b>Error!</b> ${errorMessage}`, 'error', 5000);
      });
}


// auth()
//   .getUserByEmail('admin@mail.com')
//   .then((user) => {
//     // Confirm user is verified.
//     if (user.emailVerified) {
//       // Add custom claims for additional privileges.
//       // This will be picked up by the user on token refresh or next sign in on new device.
//       return auth().setCustomUserClaims(user.uid, {
//         admin: true,
//       });
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });