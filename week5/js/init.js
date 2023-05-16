// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message1,message2 ){
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message1}</h3> <h3>${message2}</h3>`)
 
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT2tvAe_iDsPUXLMl7pYBOBacBaHGu7Cu9gAXQpbREof15gnaBDrQdWsTps4qzEebDStBV57b3BzWTB/pub?output=tsv"

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
        addMarker(data.lat,data.lng,data['Where do you live '],data['What type of pet did\\do you have '],data['Do you want more pets, if so what kind and why '])
    })
}

loadData(dataUrl)
