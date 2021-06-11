var address=[]
var longlat={}
mapboxgl.accessToken = '';
var map = new mapboxgl.Map({
  container: 'map',
  zoom:15,
  center:[72.94318719476757,19.188422818024094],
  style: 'mapbox://styles/mapbox/streets-v11'
});
var marker = new mapboxgl.Marker({draggable: true})
.setLngLat([ 72.94318719476757,19.188422818024094])
.addTo(map);
  function onDragEnd() {
var lngLat = marker.getLngLat();
map.flyTo({
  center: [lngLat.lng,lngLat.lat]
  });
// coordinates.style.display = 'block';

console.log('Longitude: ' + lngLat.lng + 'Latitude: ' + lngLat.lat);
setMarker(lngLat.lng,lngLat.lat)
latlong={"long":lngLat.lng,"lat":lngLat.lat}
}

marker.on('dragend', onDragEnd);
  var geocoder = new MapboxGeocoder({
// Initialize the geocoder
accessToken: mapboxgl.accessToken, // Set the access token
mapboxgl: mapboxgl, // Set the mapbox-gl instance
marker: false, // Do not use the default marker style
placeholder: 'Search ', // Placeholder text for the search bar

});
map.addControl(geocoder);
geolocate=new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: false,
showUserLocation:false,
showAccuracyCircle:false
})
map.addControl(geolocate);
var adtext="";
// Add the geocoder to the map

// geolocate.on('geolocate', function(loc) {
//     // console.log('A geolocate event has occurred.')
//     console.log(loc.coords)
//     console.log(loc.coords.latitude)
//     // navigator.geolocation.getCurrentPosition((pos)=>{console.log(pos.coords)}, error, options)
//     });
  map.on('load', function() {
// map.addSource('single-point', {
//     type: 'geojson',
//     data: {
//     type: 'FeatureCollection',
//     features: []
//     }
// });

// map.addLayer({
//     id: 'point',
//     source: 'single-point',
//     type: 'circle',
//     paint: {
//     'circle-radius': 10,
//     'circle-color': '#448ee4'
//     }
// });

// Listen for the `result` event from the Geocoder
// `result` event is triggered when a user makes a selection
//  Add a marker at the result's coordinates
geocoder.on('result', function(e) {
  console.log(e.result.geometry.coordinates)
  // map.getSource('single-point').setData(e.result.geometry);
  marker.setLngLat(e.result.geometry.coordinates)
  map.flyTo({
  center: e.result.geometry.coordinates
  });
});
geolocate.on('geolocate', function(loc) {
  // console.log('A geolocate event has occurred.')
  console.log(loc.coords)
  console.log(loc.coords.latitude)
  longlat={"long":loc.coords.longitude,"lat":loc.coords.latitude}
  setMarker(loc.coords.longitude,loc.coords.latitude)
  // navigator.geolocation.getCurrentPosition((pos)=>{console.log(pos.coords)}, error, options)
  });
});
function setMarker(lng,lat){
  longlat={"long":lng,"lat":lat}
  marker.setLngLat([lng,lat])
  map.flyTo({
  center: [lng,lat]
  });
  $.ajax({
    type: "POST",
    dataType: 'text',
    url: "/php",
    // url: api_url,
    async: false,
    headers: { "X-CSRFToken": csrftoken  },
    data: {
        // url: JSON.stringify(api_url),
        url:""
    },
    success: function (result) {
        console.log(result)
        // result = result.replaceAll("'", "\"");
        
        var jsondata = JSON.parse(result);
        console.log(jsondata)
        if (jsondata!= undefined) {
                // display_rev_geocode_result(jsondata);
                adtext=jsondata.addresses[0].address.municipalitySubdivision+","+jsondata.addresses[0].address.municipality+","+jsondata.addresses[0].address.postalCode
                console.log(adtext)
                document.getElementById('addText').innerHTML=adtext
                // document.getElementById('addL').innerHTML=[lng,lat]
        }
        /*handle the error codes and put the responses in divs. more error codes can be viewed in the documentation*/
        else{
           document.getElementById('addText').innerHTML="No Result found" ;
        }
    }
});
}

function changeAddText(){
    console.log($("#addText").text())
}

// $(".click.addC").click(function(){
//     console.log("hello")
//     $(".addT").text($(this).text())
//     $("#myModal").css({"display":"none"})
//     // modal.style.display = "none";
//     $('.addList').css({"visibility":"visible" })
//     $('.addMap').css({"visibility":"hidden" })
    
//   })

//   $('.locConf').click(function(){
//     var x=$('.add1').val()+","+$('.add2').val()+","+$("#addText").text()
//     console.log(x)
//     $(".addT").text(x)
//     // $(".addT1").val(x)
//     // modal.style.display = "none";
//     $("#myModal").css({"display":"none"})
//     $('.addList').css({"visibility":"visible" })
//     $('.addMap').css({"visibility":"hidden" })
//     updateAddresses(x,longlat)
//   })

function getAddresses(){
  $.ajax({
    type: "GET",
    dataType: 'text',
    url: "/orders/getAddresses",
    // url: api_url,
    async: false,
    // headers: { "X-CSRFToken": csrftoken  },
    // data: {
    //     // url: JSON.stringify(api_url),
    //     url:""
    // },
    success: function (result) {
        console.log(result)
        console.log(typeof(result))
        console.log(result.add)
        console.log(typeof(result.add))
        // result = result.replaceAll("'", "\"");
        
        var jsondata = JSON.parse(result);
        console.log(jsondata)
        if (jsondata!= undefined) {
                // display_rev_geocode_result(jsondata);
                try {
                  address=JSON.parse(jsondata.add)
                  console.log(typeof(address))
                  console.log(address)
                } catch (error) {
                  // console.log(error)
                  address=[]
                }
                
               
                // document.getElementById('addL').innerHTML=[lng,lat]
        }
        /*handle the error codes and put the responses in divs. more error codes can be viewed in the documentation*/
        else{
           document.getElementById('addText').innerHTML="No Result found" ;
        }
    },
    error: function(response){
      console.log(response)
      address=[]
    }
});
myAddress()
// if (address==undefined){address=[]}
// var x1="<div class=\"click newLoc\" id=\"newLoc\">Choose another location</div>"
// if(address!=null &&address.length>0){
//   address.forEach((item,i)=>{
//     x1+="<div class='click addC'>"+item.address+"</div>"
//   })
// }

// $(".addList1").html(x1)
}
function myAddress(){
  var x1="<div class=\"click newLoc\" id=\"newLoc\">Choose another location</div>"
if(address!=null &&address.length>0){
  address.forEach((item,i)=>{
    x1+="<div class='click addC'>"+item.address+"</div>"
  })
}

$(".addList1").html(x1)
}

getAddresses()
function updateAddresses(add,loc){
  
  address.push({"address":add,"coords":loc})
  myAddress()
  add1=JSON.stringify(address)
  console.log("update")
  console.log(add1)
    // create an AJAX call
    
    $.ajax({
        data: {add:add1}, // get the form data
        method: "POST", 
        headers: { "X-CSRFToken": csrftoken  },// GET or POST
        url: "/orders/updateAddresses",
        
        // on success
        success: function(response) {
            // alert("Thankyou for reaching us out ");
            console.log(response)
            // getAddresses()
        },
        // on error
        error: function(response) {
            // alert the error if any error occured
            // alert(response.responseJSON.errors);
            console.log(response.responseJSON.errors)
        }
    });
    return false;
}

$(".addList1").on("click",".newLoc",function(){
  console.log("hello1")
  $('.addList').css({"visibility": "hidden"})
  $('.addMap').css({"visibility": "visible"})
  $('.mapboxgl-canvas').css({"width":"100%"})
  
})

$(".locConf").click(function(){
  var x=$('.add1').val()+","+$('.add2').val()+","+$("#addText").text()
  console.log(x)
  $(".addT").text(x)
  // $(".addT1").val(x)
  modal.style.display = "none";
  $('.addList').css({"visibility":"visible" })
  $('.addMap').css({"visibility":"hidden" })
  updateAddresses(x,longlat)
})

$(".addList1").on("click",".click.addC",function(){

    $(".addT").text($(this).text())
    modal.style.display = "none";
    $('.addList').css({"visibility":"visible" })
    $('.addMap').css({"visibility":"hidden" })
    address.forEach((ad,i)=>{
      console.log(ad.coords)
      if(ad.address==$(this).text()){
        // console.log(ad.coords)
        longlat=ad.coords
        console.log(longlat)
      }
    })
    // window.location.href = '/home';
  })


  $(".click.pn").click(function(){
    cart1=JSON.stringify(cart)
    var address=$(".addT").text()
    var loc=JSON.stringify(longlat)
    console.log(grnT)
    $.ajax({
      data: {
        cart:cart1,
        address:address,
        loc:loc,
        grnt:grnT
      
      }, // get the form data
      method: "POST", 
      headers: { "X-CSRFToken": csrftoken },// GET or POST
      url: "/orders/confirm",
      // on success
      success: function(response) {
          // alert("Thankyou for reaching us out ");
          console.log(response)
          $(".confirmText").text("Order placed succesfully!")
          successMod.style.display = "block";
          setTimeout(function(){window.location.href = '/home';}, 3000);
          
      },
      // on error
      error: function(response) {
          // alert the error if any error occured
          // alert(response.responseJSON.errors);
          $(".confirmText").text("There was an error, try later")
          successMod.style.display = "block";
          console.log(response.responseJSON.errors)
      }
  });
  
    
  })
