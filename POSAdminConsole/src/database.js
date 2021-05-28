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
        session_id=user['idToken']
        // ...
        window.location.href ='dashboard.html';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // window.location.href() ='index.html';
      });
}