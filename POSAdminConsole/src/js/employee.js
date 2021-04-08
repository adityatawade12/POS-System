// console.log($(".staff").html())
var db = firebase.firestore();

$(".attendanceBtn").on("click",function(){
    $(".salary").css({"display":"none"})
    $(".data").css({"display":"none"})
    $(".attendance").css({"display":"block"})

})

$(".salaryBtn").on("click",function(){
    
    $(".data").css({"display":"none"})
    $(".attendance").css({"display":"none"})
    $(".salary").css({"display":"block"})

})

$(".dataBtn").on("click",function(){
    $(".salary").css({"display":"none"})
    $(".attendance").css({"display":"none"})
    $(".data").css({"display":"block"})
    

})