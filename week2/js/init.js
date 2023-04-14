
// declare variables
let zoomLevel = 5;
const mapCenter = [34.0709,-118.444];

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

// use our marker functions
addMarker(34.3989,-119.5185,'Carpinteria CA','Where I grew Up!')
addMarker(34.0689,-118.4452,'UCLA', 'Home for the past 4 years')
addMarker(47.60,-122.33,'Seattle','Lived there last summer and, am working there after graduation')
addMarker(7.88,98.39,'Phuket Thailand',' Visited durring Family Vacation')
addMarker(21.1619,86.8515,'Cancún Mexico',' Visited durring Family Vacation')
addMarker(22.3193,114.1694,'Hong Kong',' Visited Family')
addMarker(40.7128,-74.0060,'New York City',' Trip with friends')
addMarker(30.2672,-97.7431,'Austin Texas','Visited Family')