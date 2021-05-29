var db = firebase.firestore();
let userList
var user={}

function getCustomersData(){
    db.collection("users").onSnapshot((snapshot) => {
        userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // dishes = data;
        // console.log("All data in 'dishes' collection", staff);
        var x=""
        
        // staff.sort((a,b) => b.active - a.active)
        userList.forEach((item)=>{
            x+=`<tr id=${item.id}>
            <td class="text-center"> ${item.id} </td>
            
            
        </tr>`

        })
        $(".userList").html(x)
        // dishes.forEach((doc) =>{
        //     str = `${doc["Category"]}`;
        //     if (!category.includes(str)) {
        //         category.push(str);
        //     }
        // });

        
                // displayDish(dishes, category);
        
        
    });
}
getCustomersData();

$(".userList").on("click","tr",function(){
    var empId=$(this).attr('id')
    userDataRefresh(empId)
})

function userDataRefresh(empId){
    
   
    $("tr").css({"background-color":"white"});
    $("#"+empId).css({"background-color":"#e6e6e6"})
    userList.forEach(item=>{
        if(item.id==empId){
            user=item
            // attArray.splice(0, attArray.length)
            // attArray=item.attendance
            // $(".staffName").val(item.name)
            // $(".staffNo").val(item.phone)
            // $(".staffAddress").val(item.address)
            // $(".staffRole").val(item.role)
            // $(".staffDateJoined").val(item.joined)
            // $(".staffEmail").val(item.email)
            // if(item.active==false){
            //     $(".removeEmp").text("Restore Employee")
            // }else{
            //     $(".removeEmp").text("Remove Employee")
            // }
            console.log(user)
            $(".tc").scrollTop($(".tc").scrollTop() + $("#"+user.id).position().top - $(".tc").height()/2 + $("#"+user.id).height()/2);
            refreshPdocs()
            refreshCdocs()
        }
    })
   
}

function refreshPdocs() {
    var p="";
    user.Addresses.forEach(item=>{
        p+=`<tr > <td class="text-center">${item.address}</td></tr>`

    })
   $(".pdocs").html(p)
}

function refreshCdocs() {
    var p="";
     user.cart.forEach(item=>{
      p+=`<tr > <td>${item.itemName}</td><td class="text-right">${item.itemQty}</td><td class="text-center">${item.totalPrice}</td></tr>`
  
      })
      $(".cdocs").html(p)
 }