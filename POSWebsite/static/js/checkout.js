/*function myfunction(){
    
    document.querySelector(".idbtnsplus").addEventListener("click", function () {
        valueCount = document.getElementsByClassName("quanval").value;
        valueCount++;
        document.getElementsByClassName("quanvalue").value = valueCount;
    })

    document.querySelector(".idbtnsminus").addEventListener("click", function () {
        valueCount = document.getElementsByClassName("quanvalue").value;
        valueCount--;
        document.getElementsByClassName("quanvalue").value = valueCount;
    })
    
}
function alfunction(){
    $("#check").click(function(){
        alert("Thank you for placing your order!!\n Your order will be delivered at your address :)");
    });
}*/

var modal = document.getElementById("myModal");

var btn = document.getElementById("mapbtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function myfunction(){
    var x = document.getElementsByClassName("quanval").innerText;
    console.log(x);
}