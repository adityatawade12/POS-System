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
var successMod = document.getElementById("successMod");
$(".modal-content").on("click","span",function(event){
  successMod.style.display='none';
})

// close1.onClick=function(event){
//   console.log("Hello")
//   successMod.style.display='none';
// }
window.onclick = function(event) {
  if (event.target == successMod) {
    successMod.style.display = "none";
  }
}

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


$("#submit").click(function(){
  $.ajax({
    
    method: "POST", 
    headers: { "X-CSRFToken": csrftoken },// GET or POST
    url: "/accounts/signup",
    data:{
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        phone:$("#phone").val(),


    },
    // on success
    success: function(response) {
        // alert("Thankyou for reaching us out ");
        console.log(response)
        if(response.success=="yes"){
          $(".errorBox").text("Account created succesfully!")
          successMod.style.display = "block";
           setTimeout(function(){window.location.href = '/menu';}, 3000);
        }
        else{
          $(".errorBox").text(response.error)
          successMod.style.display = "block";
          //  setTimeout(function(){window.location.href = '/menu';}, 3000);
        }
        
        
    },
    // on error
    error: function(response) {
        // alert the error if any error occured
        // alert(response.responseJSON.errors);
        $(".confirmText").text("There was an error, try later")
        successMod.style.display = "block";
        console.log(response.responseJSON.errors)
    }
});

})