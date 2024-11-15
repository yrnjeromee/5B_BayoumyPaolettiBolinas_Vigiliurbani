import { API_KEY } from './cartella/config.js';
let nome_posto = document.getElementById('nome_posto');
const button = document.getElementById('button');
const tabella = document.getElementById('table');
let cordinate = [
    {
        name: 'Piazza del Duomo',
        coords: [45.4639102, 9.1906426],
    },
];

const header = '<tr><th>INDIRIZZO</th><th>TARGHE</th><th>DATA E ORA</th><th>NUMERO FERITI</th><th>NUMERO MORTI</th></tr>';

/************************GESTIONE PULSANTE*********************/


button.onclick = () => {
let posto = nome_posto.value;
const url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${posto}&format=json&`;
fetch(url)
    .then((response) => response.json())
    .then((data) => {
    console.log(data[0]['boundingbox'][0], data[0]['boundingbox'][2]);
    let lat = data[0]['boundingbox'][0];
    let lon = data[0]['boundingbox'][2];
    cordinate.push({ name : posto, coords: [lat, lon] });
    console.log(cordinate)
    mappa();
    });
};


/************************GESTIONE PULSANTE*********************/


/************************GESTIONE MAPPA************************/


let zoom = 12;
let maxZoom = 19;
let map = L.map('map').setView(cordinate[0].coords, zoom);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: maxZoom,
attribution:
    '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: null
});

function mappa() {
    cordinate.forEach((place) => {
        const marker = L.marker(place.coords).addTo(map);
        marker.bindPopup(`<b> ${place.name} </b>`);
    });
}


/************************GESTIONE MAPPA************************/


/************************GESTIONE TABELLA**********************/


function createTable () {
    let html = ''
    for (let i in cordinate){
        let row = `<tr><th>banana</th><th>banana</th><th>banana</th><th>banana</th><th>banana</th></tr>`;
        html += row;
    };
    tabella.innerHTML = header + html;
};


mappa();
createTable();