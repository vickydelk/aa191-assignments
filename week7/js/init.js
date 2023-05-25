// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let petOwner = L.featureGroup();
let notPetOwner = L.featureGroup();

let layers = {
    "Pet Owner": petOwner,
    "Not a Pet Owner": notPetOwner
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT2tvAe_iDsPUXLMl7pYBOBacBaHGu7Cu9gAXQpbREof15gnaBDrQdWsTps4qzEebDStBV57b3BzWTB/pub?output=tsv"

// add layer control box
L.control.layers(null,layers).addTo(map)

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

function addMarker(data){
    if(data['Do you currently have a pet'] == "yes"){
        circleOptions.fillColor = "red"
        petOwner.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Owns a Pet</h2>`))
        createButtons(data.lat,data.lng,data['Where do you live '])
        }
    else{
        circleOptions.fillColor = "blue"
        notPetOwner.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Doesn't Own a Pet</h2>`))
        createButtons(data.lat,data.lng,data['Where do you live '])
    }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    vaccinated.addTo(map) // add our layers after markers have been made
    nonVaccinated.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([vaccinated,nonVaccinated]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)
