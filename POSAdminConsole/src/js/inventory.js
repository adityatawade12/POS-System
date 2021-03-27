// import { dishes } from '/src/database.js';

// $(".dishes").on("click",function(event){
//     var name=$(this).attr('id')
    // console.log("dishes", dishes);
// });

// var dishes;
// function initi (dish) {
//     dishes = dish;
// }

function form_ (name) {

    console.log('name of dish to be edited:',name);

    var desc, price, img, suggest, cat, avail;
    // var image=null
    dishes.forEach((doc) =>{
        if (name=doc["Name"]) {
            price = doc["Price"];
            img = doc["Image"];
            desc = doc["Description"];
            avail = doc["IsAvailable"];
            cat = doc["Category"];
        }
    });

    document.getElementsByName("Name").value=name;
    document.getElementsByName("desc").value=desc;
    document.getElementsByName("cat").value=cat;
    document.getElementsByName("price").value=price;
    document.getElementsByName("img").value=img;

}
// );