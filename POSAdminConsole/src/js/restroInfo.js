var db = firebase.firestore();
let data, dt;
let position = [1, 2, 3, 4, 5, 6, 7];
function date_time () {
    db.collection("openingHours").onSnapshot((snapshot) => {
        dt = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        printDT(dt);
        console.log("All data in 'openingHours' collection", dt);
    });
}


// FUNCTION FOR PRINTING THE DATE AND OPENING HOURS
function printDT(dt) {

    data = ``;
    for (var i = 1; i < 8; i++) {
        dt.forEach(doc => {
            // console.log("i", i, " dt.pos", doc.pos);
            if (i == doc.pos) {
                data += `
                <tr>
                    <td class="text-center">${doc.day}</td>
                    <td class="text-center">${doc.hours}</td>
                    <td class="text-center"><a onclick="changeHours(this)" id="${doc.id}" href="#myModal" class="dishes btn btn-primary" data-toggle="modal">Edit</a></td>
                </tr>
                `
            }
        });
    }
    document.getElementById("timing").innerHTML = data;
}

function changeHours(ele) {
    var id = ele.id;
    let name, hour;

    dt.forEach(time => {
        if (id === time.id) {
            name = time.day;
            hour = time.hours;
        }
    });
    console.log(name, hour);
    document.getElementById("day").value = name;
    document.getElementById("hours").value = hour;
    document.getElementsByClassName("dates")[0].setAttribute("id", `${id}`);
}

function edit_time(ele) {
    var id  = ele.id;
    db.collection("openingHours").doc(`${ele.id}`)
    .update({
        hours: document.getElementById("hours").value,        
    })
    .then(() => {
        showNotification('top', 'center', '<b>Success!</b>  Hours are updated', 'success');
    })
    .catch((error) => {
        console.error("Error updating doc", error);
        showNotification('top', 'center', '<b>Error</b> Issues updating hours', 'danger');
    });
}