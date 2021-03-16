var firebaseConfig = {
    apiKey: "AIzaSyCRdXgH7cvG87cBYmEbgekw-uQGjBdm4D8",
    authDomain: "mkstrial-91474.firebaseapp.com",
    databaseURL: "https://mkstrial-91474-default-rtdb.firebaseio.com",
    projectId: "mkstrial-91474",
    storageBucket: "mkstrial-91474.appspot.com",
    messagingSenderId: "1088196034064",
    appId: "1:1088196034064:web:64adfcfa8910dec666d495",
    measurementId: "G-5W423NNNQP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  // firebase.auth().currentUser.getIdToken( true).then(function(idToken) {
  //   $.ajax({
  //     url: '/userid',
  //     type: "POST",
  //     data: {
  //       'idToken': idToken
  //     },
  //     beforeSend: function (xhr) {
  //         xhr.setRequestHeader("X-CSRFToken", csrftoken);
  //     },
  //     success: function (data) {
  //         console.log(data);
  //         alert(data);
  //     },
  //     error: function (error) {
  //         console.log(error);
  //         alert("no user");
  //     }
  // });
  //   // Send token to your backend via HTTPS
  //   // ...

  // }).catch(function(error) {
  //   // Handle error
  //   console.log("No user");
  //   alert("no user catch");
  //   window.location.assign('/account/login');
  // });
  // return user.getIdToken().then(idToken => {
  //   let data = new FormData(); // 2
  //   data.append("idToken", idToken)  
  //   data.append("csrfmiddlewaretoken", csrftoken) // 3
  //   axios.post('/accounts/sessionLogin', data) // 4
  //     .then(res => {
  //         return res
  //      }
  //       )
  //       .catch(errors => alert("axios "+errors))
    
  //  });