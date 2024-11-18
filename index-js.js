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
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

let cordinate = [];


/************************GESTIONE MAPPA************************/


let zoom = 12;
let maxZoom = 19;
let map = L.map('map').setView([45.4639102, 9.1906426], zoom);
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
        modal.classList.remove('show'); // Rimuove la classe "show"
        salva();
    });
});


/************************GESTIONE INSERIMENTO******************/


/*************************GESTIONE BARRA DI RICERCA************/
searchButton.onclick = function() {
    filterTable();
};
function filterTable() {
    const query = searchBar.value.toLowerCase();
    const filteredData = cordinate.filter((place) =>
        place.name.toLowerCase().includes(query)
    );
    renderTable(filteredData);
}
function renderTable(data) {
    const header = '<tr><th>INDIRIZZO</th><th>TARGHE</th><th>DATA E ORA</th><th>NUMERO FERITI</th><th>NUMERO MORTI</th></tr>';
    let html = '';
    data.forEach((place) => {
        let row = `<tr><td>${place.name}</td><td>${place.targhe_coinvolte.join(', ')}</td><td>${place.dataeora.join(', ')}</td><td>${place.feriti}</td><td>${place.morti}</td></tr>`;
        html += row;
    });
    tabella.innerHTML = header + html;
    mappa();
    console.log("prova")
}
renderTable(cordinate);


/*************************GESTIONE BARRA DI RICERCA************/
/*************************GESTIONE SALVATAGGIO E CARICAMENTO***/
function salva() {
    return fetch('https://ws.cipiaceinfo.it/cache/set', {
        headers: {
            'Content-Type': 'application/json',
            key: '12891abd-4716-4766-922b-6e46eba36b4c',
        },
        method: 'POST',
        body: JSON.stringify({
        key: 'incidenti',
        value: cordinate,
        }),
    })
    .then((r) => r.json())
    .then((r) => {
        console.log(r);
    })
    .catch((err) => console.log('Errore durante il salvataggio:', err));
}

function carica() {
  return fetch('https://ws.cipiaceinfo.it/cache/get', {
    headers: {
      'Content-Type': 'application/json',
      key: '12891abd-4716-4766-922b-6e46eba36b4c',
    },
    method: 'POST',
    body: JSON.stringify({
      key: 'incidenti',
    }),
  })
    .then((r) => r.json())
    .then((r) => {
        cordinate = r.result;
        console.log(r.result);
        mappa();
        createTable().render();
    })
    .catch((err) => {
      console.log('Errore durante il caricamento:', err);
      return [];
  })
}
carica();
/*************************GESTIONE SALVATAGGIO E CARICAMENTO***/