var db = firebase.firestore();
let feedbackList
var user={}

function getFeedbackData(){
    db.collection("feedbacks").onSnapshot((snapshot) => {
        feedbackList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // dishes = data;
        // console.log("All data in 'dishes' collection", staff);
        var x=""
        
        // staff.sort((a,b) => b.active - a.active)
        feedbackList.forEach((item)=>{
        //     x+=`<tr id=${item.id}>
        //     <td class="text-center"> ${item.id} </td>
            
            
        // </tr>`
        // x+=`<tr id=${item.id}> <td class="text-center" style="width: 10%;"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></td><td style="width: 55%;" >${item.msg}</td><td class="text-center">${item.date}</td><td class="text-center">${item.time}</td><td class="text-center"><a  href="#myModal" class="dishes btn btn-primary" data-toggle="modal">View</a></td></tr>`
        x+=`<tr id=${item.id}> <td class="text-center" >${retVal(item.star)}</td><td  class="text-center" style="width:20%" >${item.subject}</td><td class="text-center">${item.date}</td><td class="text-center">${item.time}</td><td class="text-center"><a  href="#myModal" class="view btn btn-primary" data-toggle="modal">View</a></td></tr>`
        })
        $(".fbList").html(x)
        // dishes.forEach((doc) =>{
        //     str = `${doc["Category"]}`;
        //     if (!category.includes(str)) {
        //         category.push(str);
        //     }
        // });
        
        
                // displayDish(dishes, category);
        
        
    });
}
getFeedbackData();

// $(".userList").on("click","tr",function(){
//     var empId=$(this).attr('id')
//     userDataRefresh(empId)
// })

// function userDataRefresh(empId){
    
   
//     $("tr").css({"background-color":"white"});
//     $("#"+empId).css({"background-color":"#e6e6e6"})
//     userList.forEach(item=>{
//         if(item.id==empId){
//             user=item
//             // attArray.splice(0, attArray.length)
//             // attArray=item.attendance
//             // $(".staffName").val(item.name)
//             // $(".staffNo").val(item.phone)
//             // $(".staffAddress").val(item.address)
//             // $(".staffRole").val(item.role)
//             // $(".staffDateJoined").val(item.joined)
//             // $(".staffEmail").val(item.email)
//             // if(item.active==false){
//             //     $(".removeEmp").text("Restore Employee")
//             // }else{
//             //     $(".removeEmp").text("Remove Employee")
//             // }
//             console.log(user)
//             $(".tc").scrollTop($(".tc").scrollTop() + $("#"+user.id).position().top - $(".tc").height()/2 + $("#"+user.id).height()/2);
//             refreshPdocs()
//             refreshCdocs()
//         }
//     })
   
// }

function retVal(z) {
   
    return `<span class="fa fa-star checked"></span>`.repeat(z)+`<span class="fa fa-star "></span>`.repeat(5-z)
}

$(".fbList").on("click",".view",function(){
    var dat=feedbackList.find((item)=>{
        if(item.id==$(this).parent().parent().attr("id")){
            return item
        }
    })
    var x=`<div class="row"> <div class="col-4 fbt">Name:</div><div class="col-8">${dat.fname} ${dat.lname}</div>   </div>
    <div class="row"> <div class="col-4 fbt ">Number:</div><div class="col-8">${dat.num}</div>   </div>
    <div class="row"> <div class="col-4 fbt">Email:</div><div class="col-8">${dat.email}</div>   </div>
    <div class="row"> <div class="col-4 fbt ">Dining Date:</div><div class="col-8">${dat.date}</div>   </div>
    <div class="row"> <div class="col-4 fbt ">Dining Time:</div><div class="col-8">${dat.time}</div>   </div>
    <div class="row"> <div class="col-4 fbt ">Recoded:</div><div class="col-8">${getTimestamp(dat.timestamp)}</div>   </div>
    <div class="row"> <div class="col-4 fbt">Stars:</div><div class="col-8">${retVal(dat.star)}</div>   </div>
    <div class="row"> <div class="col-4 fbt">Subject:</div><div class="col-8">${dat.subject}</div>   </div>
    <div class="row"> <div class="col-4 fbt">Message:</div><div class="col-8">${dat.msg}</div>   </div>
`   
$(".fbView").html(x)
    // $(this).parent().parent().attr("id")
    // console.log(dat)

})

function getTimestamp(ts) {
    console.log(ts)
    var date = new Date(ts.seconds*1000);

return date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds();
}
