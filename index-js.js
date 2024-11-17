import { API_KEY } from './cartella/config.js';
const tabella = document.getElementById("table");
const modal = document.getElementById('modal');
const button = document.getElementById("button");//alla pressione creare un modale
const chiudiModale = document.getElementById('chiudiModale');
const nome_posto = document.getElementById("nome_posto");
const targhe = document.getElementById("targhe");
const dataeora = document.getElementById("dataeora");
const n_morti = document.getElementById("n_morti");
const n_feriti = document.getElementById("n_feriti");
const confirmButton = document.getElementById('confirmButton');
let cordinate = [
    {
        name: 'Piazza del Duomo',
        coords: [45.4639102, 9.1906426],
        targhe_coinvolte: ["1234567","8589282","7372919"],
        dataeora: ["17/05/2006","02:14"],
        morti: 4,
        feriti: 12
    },
    {
        name: 'Corso Buenos Aires 10',
        coords: [45.4762013, 9.2070085],
        targhe_coinvolte: ["6573928","7378198"],
        dataeora: ["26/7/2006","13:41"],
        morti: 0,
        feriti: 1
    },
    {
        name: 'Via Gerolamo Vida 4',
        coords: [45.4985238, 9.2252347],
        targhe_coinvolte: ["7583814"],
        dataeora: ["12/10/2006","10:21"],
        morti: 1,
        feriti: 0
    }
];


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
        marker.bindPopup(`<p> morti: ${place.morti} feriti : ${place.feriti} data : ${place.dataeora[0]} ora: ${place.dataeora[1]}</p>`);
    });
}


/************************GESTIONE TABELLA**********************/


const createTable = () => {
    const header = '<tr><th>INDIRIZZO</th><th>TARGHE</th><th>DATA E ORA</th><th>NUMERO FERITI</th><th>NUMERO MORTI</th></tr>';
    let html = ''
    return{
        render: () => {
            for (let i in cordinate){
                let row = `<tr><td>${cordinate[i].name}</td><td>${cordinate[i].targhe_coinvolte}</td><td>${cordinate[i].dataeora}</td><td>${cordinate[i].feriti}</td><td>${cordinate[i].morti}</td></tr>`;
                html += row;
            };
            tabella.innerHTML = header + html;
        }
    }
};


/************************GESTIONE TABELLA**********************/


/************************GESTIONE MODALE***********************/


button.addEventListener('click', () => {
    modal.classList.add('show'); // Aggiunge la classe "show"
});

// Chiudi la modale
chiudiModale.addEventListener('click', () => {
    modal.classList.remove('show'); // Rimuove la classe "show"
});

// Chiudi la modale quando si clicca fuori dal contenuto
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show'); // Rimuove la classe "show"
    }
});


/************************GESTIONE MODALE***********************/


/************************GESTIONE INSERIMENTO******************/


confirmButton.addEventListener('click', () => {
    let posto = nome_posto.value;
    let temp_targhe = targhe.value;
    let temp_dataeora = dataeora.value;
    let nMorti = n_morti.value;
    let nFeriti = n_feriti.value;
    console.log(posto, temp_targhe, temp_dataeora, nMorti, nFeriti);
    let tutte_le_Targhe = temp_targhe.split(',').join('').split(' ');
    let newDataeora = temp_dataeora.split(',').join('').split(' ');
    const url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${posto}&format=json&`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        console.log(data[0]['boundingbox'][0], data[0]['boundingbox'][2]);
        let lat = data[0]['boundingbox'][0];
        let lon = data[0]['boundingbox'][2];
        cordinate.push({ name: posto, coords: [lat, lon], targhe_coinvolte: tutte_le_Targhe, dataeora: newDataeora, morti: nMorti, feriti: nFeriti });
        console.log(cordinate);
        mappa();
        createTable().render();
        });
});


/************************GESTIONE INSERIMENTO******************/


mappa();
createTable().render();