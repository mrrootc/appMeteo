const jourSemaine = ['Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi','Samedi', 'Dimanche'];

let toDay = new Date();
let options = {weekday: 'long'};
let jourActuelle = toDay.toLocaleDateString('fr-FR',options)

// console.log(jourActuelle, options)
jourActuelle = jourActuelle.charAt(0).toUpperCase() + jourActuelle.slice(1);

let tabJoursEnOrde = jourSemaine.slice(jourSemaine.indexOf(jourActuelle)).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuelle)))
// console.log(tabJoursEnOrde)

export default tabJoursEnOrde;