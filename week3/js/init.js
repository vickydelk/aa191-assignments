
// declare the map and use the variables above
const map = L.map('the_map').setView([34.0709,-118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng)
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map).eachLayer((layer)=>{
                console.log(layer);
                createButtons(layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0], layer.feature.properties.place);
            });
    })



function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    document.getElementById("contents").appendChild(newButton); //this adds the button to our page.
}