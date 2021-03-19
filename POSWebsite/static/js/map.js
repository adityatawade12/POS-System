mapboxgl.accessToken = 'pk.eyJ1IjoibWtzMTgiLCJhIjoiY2ttZGR0dXZnMmtjdzJwb2poanV1dXJyZiJ9.IoK236JvqD9mETA7On0GGw';
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
  setMarker(loc.coords.longitude,loc.coords.latitude)
  // navigator.geolocation.getCurrentPosition((pos)=>{console.log(pos.coords)}, error, options)
  });
});
function setMarker(lng,lat){
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
        url:"https://api.tomtom.com/search/2/reverseGeocode/+"+lat+","+lng+".JSON?key=ZYNJngIGXOiQca5cvigxA8tTQmdOcpbG"
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


