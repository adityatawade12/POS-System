var db = firebase.firestore();


var dish_doc = db.collection('dishes');

let temp;
let str = '';
let data= '';
let dishes;
var category=[];
let docu;


    /*
    category.forEach(cat => {
        // console.log(`category: ${cat}`)
        data += `
        <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title"> `+ cat+ `</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead class=" text-primary">
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th class="text-right">Price</th>
                        </thead>
                        <tbody>
                        <div class="table_body">`

                    // <!-- for loop -->
                    dishes.forEach((doc) =>{
                            if (cat == doc["Category"]) {
                                data += `
                                    <tr>
                                        <td>${doc["Name"]}</td>
                                        <td>${doc["Category"]}</td>
                                        <td>${doc["Description"]}</td>
                                        <td class="text-center">&#8377;${doc["Price"]}</td>
                                        <td><a onclick="form_('${doc["Name"]}')" id="${doc["Name"]}" href="#myModal" class="dishes btn btn-primary" data-toggle="modal">Edit</a></td>
                                    </tr>`;
                            }
                    });
                    // <!-- end for loop -->
        data += ` 
        </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>`;
    });

    document.getElementById("inva").innerHTML=data;


console.log("DATABASE");
*/


// dish_doc.onSnapshot((snapshot) => {
//     snapshot.docChanges().forEach(change => {
//         if (change.type === 'added') {
//             // add the doc data to the page
//         }
//         if (change.type === 'removed') {
//             // remove the doc data from the page
            
//         }
//     });
// });