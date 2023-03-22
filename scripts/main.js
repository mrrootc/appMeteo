import tabJoursEnOrde from './utiliraire/gestionTemps.js';
 
// console.log('Depuis main js' + tabJoursEnOrde)

const CLEAPI = 'd1ca2d322e0f3dcab0ce41c443d5310d';
let resultatAPI;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heurePrevision = document.querySelectorAll('.heure-nom-prevision');
const heurePrevisionValeur = document.querySelectorAll('.heure-prevision-valeur');
const jourPrevision  = document.querySelectorAll('.jour-prevision-nom');
const jourPrevisionValeur = document.querySelectorAll('.jour-prevision-temp')
const chargement = document.querySelector('.overlay-icon-chargement');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( position =>{
        console.log(position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        AppelAPI(longitude, latitude);
    }, () =>{
        alert(`Vous avez refuse l'autorisation pour acceder a votre geolocalisation`)
    }) 
}

function AppelAPI(longitude,latitude){
    
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        // console.log(data);

        resultatAPI = data;

        temps.textContent = resultatAPI.current.weather[0].description;
        temperature.textContent = `${Math.trunc(resultatAPI.current.temp)}°`
        localisation.textContent = resultatAPI.timezone;

        let heureActuelle = new Date().getHours();

        for(let i = 0; i<heurePrevision.length; i++){

            let heureIcrement = heureActuelle + i * 3;

            if(heureIcrement > 24){
                heurePrevision[i].textContent = ` ${heureIcrement - 24} h`
            } 
            else if(heureIcrement === 24){
                heurePrevision[i].textContent = ` 00 h`
            }
            else{
                heurePrevision[i].textContent = `${heureIcrement} h`;
            }

        }

        for(let j = 0; j < heurePrevisionValeur.length; j++){
            heurePrevisionValeur[j].textContent = `${Math.trunc(resultatAPI.hourly[j * 3].temp)} °`;
        }

        //Troia premiers lettre des jours

        for(let k = 0; k < tabJoursEnOrde.length; k++){
            jourPrevision[k].textContent = tabJoursEnOrde[k].slice(0,3)
        }

        for(let m = 0; m < 7; m++){
            jourPrevisionValeur[m].textContent = `${Math.trunc(resultatAPI.daily[m+1].temp.day)} °`
        }

        // if(heureActuelle >= 6)

        chargement.classList.add('disparition')
    })

}