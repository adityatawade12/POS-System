var db = firebase.firestore();
var todaysOrdersO = 0;
var completedOrdersO = 0;
var unfinishedOrdersO = 0;
var todaysOrdersD = 0;
var completedOrdersD = 0;
var unfinishedOrdersD = 0;
var totalCustomer = 0;
var topItems=[]
function graph() {
    db.collection("pastOrders").onSnapshot((snapshot) => {
        

        staff = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
       
        staff.forEach((i)=>{
           i.cart.forEach((i1)=>{
               
               if(topItems.some((i2)=>i2.name==i1.itemName || i2.name==i1.name)){
                topItems.forEach(i3=>{
                    if(i3.name==i1.itemName|| i3.name==i1.name){
                        i3.qty+=1;
                    }
                })
               }else{
                   topItems.push({name:i1.itemName==undefined?i1.name:i1.itemName,qty:1})
               }
           })
        
            
        })
        topItems.sort((a, b) => b.qty - a.qty);
        console.log(topItems)
        var ctx = document.getElementById('myChart');
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: [topItems[0].name, topItems[1].name, topItems[2].name, topItems[3].name, topItems[4].name,topItems[5].name],
					datasets: [{
						label: 'no of times ordered',
						data: [topItems[0].qty, topItems[1].qty, topItems[2].qty, topItems[3].qty, topItems[4].qty,topItems[5].qty],
                        minBarLength: 20,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
                        
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});
       
    })
}

graph()


function getData() {
    var curOr=0
    db.collection("currentOrders").onSnapshot((snapshot) => {
        // unfinishedOrders-=curOr
       
        todaysOrdersO-=unfinishedOrdersO
        curOr=0
        staff = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        staff.forEach((i)=>{
            console.log(typeof(i.timestamp.seconds))
        
            if(new Date((i.timestamp.seconds+19800)*1000).setHours(0, 0, 0, 0)==new Date().setHours(0, 0, 0, 0)){
                curOr+=1;
                todaysOrdersO+=1
            }
        })
        $(".unfOrd").html(curOr)
        unfinishedOrdersO=curOr
      
       $(".totOrd").html(todaysOrdersO)
        
    })
    curOrD=0
    db.collection("currentDining").onSnapshot((snapshot) => {
        // unfinishedOrders-=curOr
       
        todaysOrdersD-=unfinishedOrdersD
        curOrD=0
        staff = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        staff.forEach((i)=>{
        
            if(new Date((i.timestamp)).setHours(0, 0, 0, 0)==new Date().setHours(0, 0, 0, 0)){
                curOrD+=1;
                todaysOrdersD+=1
            }
        })
        $(".unfOrdD").html(curOrD)
        unfinishedOrdersD=curOrD
        console.log("orderyoyoyooyy");
      
       $(".totOrdD").html(todaysOrdersD)
        
    })

    compOrO=0
    compOrD=0
    db.collection("pastOrders").onSnapshot((snapshot) => {
        
        todaysOrdersO-=completedOrdersO
        compOrO=0
        compOrD=0
        staff = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // curOr=1
        
        staff.forEach((i)=>{
            console.log(i.timestamp.seconds)
            var dt=null
            if(i.timestamp.seconds==undefined){
               dt= new Date((i.timestamp)).setHours(0, 0, 0, 0)
               if(dt==new Date().setHours(0, 0, 0, 0)){
                compOrD+=1;
                todaysOrdersD+=1
            }
            }else{
                dt=new Date((i.timestamp.seconds+19800)*1000).setHours(0, 0, 0, 0)
                if(dt==new Date().setHours(0, 0, 0, 0)){
                    compOrO+=1;
                    todaysOrdersO+=1
                }
            }
        
            
        })
        $(".compOrd").html(compOrO)
        completedOrdersO=compOrO
      
       $(".totOrd").html(todaysOrdersO)

       $(".compOrdD").html(compOrD)
        completedOrdersD=compOrD
      
       $(".totOrdD").html(todaysOrdersD)
    })

    totCust=0
    db.collection("users").onSnapshot((snapshot) => {
        
        
        staff = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // curOr=1
       
        staff.forEach((i)=>{
            totCust+=1
            
        })
        $(".totCust").html(totCust)
    })

    
    
   



}
function getSum() {
    getData()
    
}
getSum()
console.log(unfinishedOrders)


