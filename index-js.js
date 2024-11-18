import { API_KEY } from './config.js';
const Milano = ["45.3867381","45.5358482","9.0408867","9.2781103"];
const tabella = document.getElementById("table");
const modal = document.getElementById('modal');
const button = document.getElementById("button");//alla pressione creare un modale
const chiudiModale = document.getElementById('chiudiModale');
const via = document.getElementById("via");
const civico = document.getElementById("civico");
const targa1 = document.getElementById("targa1");
const targa2 = document.getElementById("targa2");
const targa3 = document.getElementById("targa3");
const data = document.getElementById("data");
const ora = document.getElementById("ora");
const n_morti = document.getElementById("n_morti");
const n_feriti = document.getElementById("n_feriti");
const confirmButton = document.getElementById('confirmButton');
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const MAIUSCOLE = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const numeri = ["1","2","3","4","5","6","7","8","9","0"];

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


button.onclick = () => {
    modal.classList.add('show'); // Aggiunge la classe "show"
};

// Chiudi la modale
chiudiModale.onclick = () => {
    modal.classList.remove('show'); // Rimuove la classe "show"
};

// Chiudi la modale quando si clicca fuori dal contenuto
window.onclick = (event) => {
    if (event.target === modal) {
        modal.classList.remove('show'); // Rimuove la classe "show"
    }
};


/************************GESTIONE INSERIMENTO******************/


confirmButton.onclick = () => {
    if (targa1.value && via.value && civico.value && data.value && ora.value && n_feriti.value && n_morti.value ){
        let posto = via.value +" "+ civico.value + " milano";
        //controllo targa 1//
        let targhe = []
        console.log(targa1.value.charCodeAt(0))
        if (targa1.value.length === 7 && targa1.value.charCodeAt(0) > 64 && targa1.value.charCodeAt(0) < 91 && targa1.value.charCodeAt(1) > 64 && targa1.value.charCodeAt(1) < 91 && targa1.value.charCodeAt(2) > 47 && targa1.value.charCodeAt(2) < 58 && targa1.value.charCodeAt(3) > 47 && targa1.value.charCodeAt(3) < 58 && targa1.value.charCodeAt(4) > 47 && targa1.value.charCodeAt(4) < 58 && targa1.value.charCodeAt(5) > 64 && targa1.value.charCodeAt(5) < 91 && targa1.value.charCodeAt(6) > 64 && targa1.value.charCodeAt(6) < 91){
            targhe.push(targa1.value)
        } else {
            alert("La targa 1 non è valida");
        }
        //controllo targa 2//
        if (targa2.value !== ""){
            if (targa2.value.length === 7 && targa2.value.charCodeAt(0) > 64 && targa2.value.charCodeAt(0) < 91 && targa2.value.charCodeAt(1) > 64 && targa2.value.charCodeAt(1) < 91 && targa2.value.charCodeAt(2) > 47 && targa2.value.charCodeAt(2) < 58 && targa2.value.charCodeAt(3) > 47 && targa2.value.charCodeAt(3) < 58 && targa2.value.charCodeAt(4) > 47 && targa2.value.charCodeAt(4) < 58 && targa2.value.charCodeAt(5) > 64 && targa2.value.charCodeAt(5) < 91 && targa2.value.charCodeAt(6) > 64 && targa2.value.charCodeAt(6) < 91){
                targhe.push(targa2.value)
            } else {
                alert("La targa 2 non è valida");
            }
        }
        //controllo targa 3//
        if (targa3.value !== ""){
            if (targa3.value.length === 7 && targa3.value.charCodeAt(0) > 64 && targa3.value.charCodeAt(0) < 91 && targa3.value.charCodeAt(1) > 64 && targa3.value.charCodeAt(1) < 91 && targa3.value.charCodeAt(2) > 47 && targa3.value.charCodeAt(2) < 58 && targa3.value.charCodeAt(3) > 47 && targa3.value.charCodeAt(3) < 58 && targa3.value.charCodeAt(4) > 47 && targa3.value.charCodeAt(4) < 58 && targa3.value.charCodeAt(5) > 64 && targa3.value.charCodeAt(5) < 91 && targa3.value.charCodeAt(6) > 64 && targa3.value.charCodeAt(6) < 91){
                targhe.push(targa3.value)
            } else {
                alert("La targa 3 non è valida");
            }
        }
        let dataeora = [data.value,ora.value]
        let nMorti = n_morti.value;
        let nFeriti = n_feriti.value;
        console.log(posto, targhe, dataeora, nMorti, nFeriti);
        const url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${posto}&format=json&`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            let lat = parseFloat((parseFloat(data[0]['boundingbox'][0]) + parseFloat(data[0]['boundingbox'][1]))/2);
            let lon = parseFloat((parseFloat(data[0]['boundingbox'][2]) + parseFloat(data[0]['boundingbox'][3]))/2);
            console.log(lat, lon);
            console.log(Milano[0],Milano[1])
            if (lat > Milano[0] && lat < Milano [1]){
                if(lon > Milano[2] && lon < Milano [3]){
                    cordinate.push({ name: posto, coords: [lat, lon], targhe_coinvolte: targhe, dataeora: dataeora, morti: nMorti, feriti: nFeriti });
                    console.log(cordinate);
                    mappa();
                    createTable().render();
                    modal.classList.remove('show'); // Rimuove la classe "show"
                    salva();
                } else {
                    alert("La cordinate inserite non sono all'interno della zona di Milano");
                }
            } else {
                alert("La località inserita non è all'interno della zona di milano");
            }
        
        });
    } else {
        alert('Tutti i campi devono essere compilati!');
        return false;
    }
};
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