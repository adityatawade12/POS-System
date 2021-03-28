
console.log("INVENTORY");


function form_ (name, img, desc, price, avail, cat) {

    // console.log('name of dish to be edited:',name, img, desc, price, avail, cat);
    // var desc, price, img, cat, avail;

   /* dishes.forEach((doc) =>{
        if (name=doc["Name"]) {
            price = doc["Price"];
            img = doc["Image"];
            desc = doc["Description"];
            avail = doc["IsAvailable"];
            cat = doc["Category"];
        }
    });*/

    document.getElementById("Name").value=name;
    document.getElementById("desc").innerHTML=desc;
    document.getElementById("cat").value=cat;
    document.getElementById("price").value=price;
    document.getElementById("img").value=img;
    document.getElementById("available").value=avail;
}




var db = firebase.firestore();
let str, dishes , category=[], dishdata, data='';



// function chao () {
//     db.collection("dishes").onSnapshot((snapshot) => {
//         dishes = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         // dishes = data;
//         console.log("All data in 'dishes' collection", dishes);
        
//         dishes.forEach((doc) =>{
//             str = `${doc["Category"]}`;
//             if (!category.includes(str)) {
//                 category.push(str);
//             }
//         });
//     });

//     console.log("All data in category", category);

//     displayDish(dishes, category);
// }
// chao();
// console.log("dishes outside:", dishes);


async function dataRetrieve() {
    dishdata = await db.collection('dishes').get();

    for (item of dishdata.docs) {
        str = `${item.get("Category")}`;
        if (!category.includes(str)) {
            category.push(str);
        }
    }

    dishes = dishdata.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    console.log(`cat: ${category}`);
    console.log(`dish data: ${dishes}`);

    displayDish(dishes, category);
    // getDish(dishes);

}

function displayDish(dishes, category) {
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
                                        <td><a onclick="form_('${doc["Name"]}', '${doc["Image"]}', '${doc["Description"]}', '${doc["Price"]}', '${doc["IsAvailable"]}', '${doc["Category"]}')" id="${doc["Name"]}" href="#myModal" class="dishes btn btn-primary" data-toggle="modal">Edit</a></td>
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
}

// Call our async function in a try block to catch connection errors.
// try {
//     dataRetrieve();
// }
// catch(err) {
//     console.log('Error getting documents', err)
// }

