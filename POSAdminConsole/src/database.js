var db = firebase.firestore();


var dish_doc = db.collection('dishes');

let temp;
let str = '';
let data= '';
let dishes;
var category=[];
let docu;
/*
async function daata() {
dish_doc.get().then((querySnapshot) => {
    console.log("inside daaaata");
    docu = querySnapshot;
    return "querySnapshot";
});
}

console.log("dcdsdssds", docu);
function tem () {
    const doci = daata();
    // doci.then((doggo) => {
    //     console.log(`dcdsdssds ${doggo}`);
    // });
    console.log("tem: ", doci);
}
tem();
*/
// docu.forEach((doc) =>{
//     str = `${doc.get("Category")}`;
//     if (!category.includes(str)) {
//         category.push(str);
//     }
// });


// dishes = querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    // }));
/*
    dishes = new Promise(function (resolve, reject) {
        resolve("rex");
        return "xer";
    }).then (res => {
        console.log("res:",res);
        })

    console.log("dishes:",dishes);
    // console.log("dishes:", dishes)
*/

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