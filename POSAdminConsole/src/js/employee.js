console.log($("tbody").html())
var db = firebase.firestore();
let staff

function getStaffData(){
    db.collection("staff").onSnapshot((snapshot) => {
        staff = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // dishes = data;
        console.log("All data in 'dishes' collection", staff);
        var x=""
        staff.forEach((item)=>{
            x+=`<tr id=${item.id}>
            <td class="text-center"> ${item.name} </td>
            <td class="text-center"> ${item.role} </td>
             <td class="text-center"> Acitve </td>
            
        </tr>`

        })
        $(".staffList").html(x)
        // dishes.forEach((doc) =>{
        //     str = `${doc["Category"]}`;
        //     if (!category.includes(str)) {
        //         category.push(str);
        //     }
        // });

        
                // displayDish(dishes, category);
        
        
    });
}
getStaffData();

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

$(".staffList").on("click","tr",function(){
    var empId=$(this).attr('id')
    var emp={}
    staff.forEach(item=>{
        if(item.id==empId){
            
            $(".staffName").val(item.name)
            $(".staffNo").val(item.phone)
            $(".staffAddress").val(item.address)
            $(".staffRole").val(item.role)
            $(".staffDateJoined").val(item.joined)
            $(".staffEmail").val(item.email)
        }
    })
    console.log(emp)
   



})