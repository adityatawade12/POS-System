function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');


function sb(){
  var email = $("#email").val();
    var password = $("#password").val();
   // alert(email+password);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
  var user = firebase.auth().currentUser;
    return user.getIdToken().then(idToken => {
   let data = new FormData(); // 2
   data.append("idToken", idToken)  
   data.append("csrfmiddlewaretoken", csrftoken) // 3
   axios.post('/accounts/sessionLogin', data) // 4
     .then(res => {
         return res
      }
       )
       .catch(errors => alert("axios "+errors))
   
  });
}).then(() => {
  
  return firebase.auth().signOut();
}).then(() => {

  window.location.assign('/accounts/profile');
  
  }

)}
