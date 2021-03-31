var db = firebase.firestore();
let str, dishes , category=[], dishdata, data='';

console.log("INVENTORY");

// RETRIEVING DATA FROM FIRESTORE
function dataRetrieve () {
    db.collection("dishes").onSnapshot((snapshot) => {
        dishes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // dishes = data;
        console.log("All data in 'dishes' collection", dishes);
        
        dishes.forEach((doc) =>{
            str = `${doc["Category"]}`;
            if (!category.includes(str)) {
                category.push(str);
            }
        });

        // snapshot.docChanges().forEach(change => {
        //     console.log(snapshot.docChanges(), change);
        //     if (change.type === 'added') {
                // add the doc data to the page
                // console.log("dishes",dishes,"cate:", category);
                displayDish(dishes, category);
        //     }
        //     if (change.type === 'removed') {
        //         // remove the doc data from the page        
        //     }
        // });
        
    });
}
// chao();


// async function dataRetrieve() {
    //     dishdata = await db.collection('dishes').get();
    
//     for (item of dishdata.docs) {
    //         str = `${item.get("Category")}`;
    //         if (!category.includes(str)) {
        //             category.push(str);
//         }
//     }

//     dishes = dishdata.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
//       }));

//     console.log(`cat: ${category}`);
//     console.log(`dish data: ${dishes}`);

//     displayDish(dishes, category);
//     // getDish(dishes);

// }


// FUNCTION FOR PRINTING THE DISHES ON THE PAGE
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
                                        <td><a onclick="form_('${doc.id}')" id="${doc["Name"]}" href="#myModal" class="dishes btn btn-primary" data-toggle="modal">Edit</a></td>
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


// FUNCTION FOR VIEWING THE DISH DATA
function form_(id) {

    var name, img, desc, price, avail, cat;
    
    dishes.forEach((doc) =>{
       if (id===doc.id) {
           name = doc.Name;
           console.log("inside for loop name: ", name);
           price = doc["Price"];
           img = doc["Image"];
           desc = doc["Description"];
           avail = doc["IsAvailable"];
           cat = doc["Category"];
        }
    });
    console.log('name of dish to be edited:',name, img, desc, price, avail, cat);

    document.getElementById("Name").value=name;
    document.getElementById("desc").innerHTML=desc;
    document.getElementById("cat").value=cat;
    document.getElementById("price").value=price;
    document.getElementById("img").value=img;
    document.getElementById("available").value=avail;
}

// FUNCTION FOR EDITING DISH DATA
function editDish() {
    //TAWADE CHO CODE HADE YEU DYO
    // save button madhe onClick takun thevla aahe.
}