var db = firebase.firestore();
let str, dishes , category=[], dishdata, data='';

console.log("INVENTORY");

// RETRIEVING DATA FROM FIRESTORE
function dataRetrieve() {
    db.collection("dishes").onSnapshot((snapshot) => {
        dishes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // dishes = data;
        // console.log("All data in 'dishes' collection", dishes);
        
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
    data = '';
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
                            <th class="text-center">Price</th>
                            <th class="text-center"><i class="far fa-edit"></i></th>
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
                                        <td class="text-center"><a onclick="form_('${doc.id}'); forEdit()" id="${doc["Name"]}" href="#myModal" class="dishes btn btn-primary" data-toggle="modal">Edit</a></td>
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

    // console.log("save btn:",);
    var btn = document.getElementsByClassName("save_btn")[0];
    btn.setAttribute("id", `${id}`);
    var del = document.getElementsByClassName("del_btn")[0];
    del.setAttribute("id", `${id}`);
    
    
    dishes.forEach((doc) =>{
       if (id===doc.id) {
           name = doc.Name;
        //    console.log("inside for loop name: ", name);
           price = doc["Price"];
           img = doc["Image"];
           desc = doc["Description"];
           avail = doc["IsAvailable"];
           cat = doc["Category"];
        }
    });
    console.log('name of dish to be edited:',name, img, desc, price, avail, cat);

    document.getElementById("Name").value=name;
    document.getElementById("desc").value=desc;
    document.getElementById("cat").value=cat;
    document.getElementById("price").value=price;
    document.getElementById("img").value=img;
    document.getElementById("available").value=avail;
}

function resetModal() {
    document.getElementById("Name").value='';
    document.getElementById("desc").value='';
    document.getElementById("cat").value='';
    document.getElementById("price").value='';
    document.getElementById("img").value='';
    document.getElementById("available").value='';
}

function forAdd() {
    document.getElementsByClassName('del_btn')[0].style.display = 'none';
    document.getElementsByClassName('save_btn')[0].style.display = 'none';
    document.getElementsByClassName('add_btn')[0].style.display = 'initial';
    document.getElementsByClassName('modal-title')[0].innerHTML = 'Add New Dish';
}

function forEdit() {
    document.getElementsByClassName('del_btn')[0].style.display = 'initial';
    document.getElementsByClassName('save_btn')[0].style.display = 'initial';
    document.getElementsByClassName('add_btn')[0].style.display = 'none';
    document.getElementsByClassName('modal-title')[0].innerHTML = 'Edit Dish Data';
}

function addItem() {

    // console.log(document.getElementById("Name").value,
    //         document.getElementById("desc").value,
    //         document.getElementById("cat").value,
    //         document.getElementById("price").value,
    //         document.getElementById("img").value,
    //         document.getElementById("available").value);
    
    db.collection("dishes")
    .add({
            Name: document.getElementById("Name").value,
            Description: document.getElementById("desc").value,
            Category: document.getElementById("cat").value,
            Price: document.getElementById("price").value,
            Image: document.getElementById("img").value,
            IsAvailable: document.getElementById("available").value,
        })
        .then(() => {
            console.log("Document updated"); // Document updated
            showNotification('top', 'center', '<b>Success!</b> Item added to the Menu', 'success');
        })
        .catch((error) => {
            console.error("Error updating doc", error);
            showNotification('top', 'center', '<b>Error</b> Issues adding the item', 'danger');
        });
}


// FUNCTION FOR EDITING DISH DATA
function editDish(dish) {

    var elementId = dish.id;

    // console.log(document.getElementById("Name").value,
    //             document.getElementById("desc").value,
    //             document.getElementById("cat").value,
    //             document.getElementById("price").value,
    //             document.getElementById("img").value,
    //             document.getElementById("available").value);

    db.collection("dishes").doc(`${elementId}`)
    .update({
                Name: document.getElementById("Name").value,
                Description: document.getElementById("desc").value,
                Category: document.getElementById("cat").value,
                Price: parseInt(document.getElementById("price").value, 10),
                Image: document.getElementById("img").value,
                IsAvailable: document.getElementById("available").value,
            })
            .then(() => {
                console.log("Document updated"); // Document updated
                showNotification('top', 'center', '<b>Success!</b>  Item details are updated', 'success');
            })
            .catch((error) => {
                console.error("Error updating doc", error);
                showNotification('top', 'center', '<b>Error</b> Issues updating the item details', 'danger');
            });
}

// FUNCs FOR DELETING AN ITEM
function deldish(ele) {
    let id = ele.id;
    let name;

    dishes.forEach(doc => {
        if (id === doc.id) {
            name = doc.Name;
        }
    });
    document.getElementById('deli').innerHTML=`Are you sure you want to delete the item "${name}"`;
    var del = document.getElementsByClassName("yes_btn")[0];
    del.setAttribute("id", `${id}`);
}

function removeDish(dish) {
    var id = dish.id;

    db.collection("dishes").doc(`${id}`)
    .delete()
    .then(() => {
        console.log("Document deleted"); // Document updated
        showNotification('top', 'center', '<b>Success!</b>  Item deleted from the Menu', 'success');
    })
    .catch((error) => {
        console.error("Error updating doc", error);
        showNotification('top', 'center', '<b>Error</b> Issues deleting the item', 'danger');
    });

}


function showNotification(from, align, msg, color) {
    // color = 'primary';
    let i;
    if (color == 'success') {
        i = "far fa-check-circle";
    }
    else if (color == 'danger') {
        i = "fas fa-exclamation";
    }
    else {
        i = "nc-icon nc-bell-55"
    }

    $.notify({
      icon: i,
      message: msg

    }, {
      type: color,
      timer: 5000,
      placement: {
        from: from,
        align: align
      }
    });
  }