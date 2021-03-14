
function myfunction(){
    
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
}
