
import { HearthstoneApi } from './scripts/api.js';
import { SetType } from './scripts/setType.js';
import { ClassType } from './scripts/ClassType.js';

const hearthstoneApi = new HearthstoneApi();

let listeClasses = [];
let listeSet = [];

hearthstoneApi.info().then((allInfo) => {
    //console.log(allInfo.sets);
    //console.log(allInfo.classes);
    //allInfo.classes.forEach(e => listeCLasses.push(new ClassType(e)));
    //allInfo.sets.forEach(e => listeSet.push(new SetType(e)));
    const listeClasses = allInfo.classes.map(e => new ClassType(e));
    const listeSet = allInfo.sets.map(e => new SetType(e));

    /*listeSet.forEach(function (e) {

        hearthstoneApi.set(e.name).then(function (result) {

            e.setCards(result);

        });


    })*/

    /*listeClasses.forEach(function (e) {

        hearthstoneApi.classes(e.name).then(function (result) {

            e.setCards(result);

        });

    });*/

    let listePromiseSet = listeSet.map(e => e.setCards(hearthstoneApi.set(e.name)));
    let listePromiseClasses = listeClasses.map(e => e.setCards(hearthstoneApi.classes(e.name)));

    Promise.all(listePromiseClasses).then(() => console.log('liste promise avec les classes terminée'));
    Promise.all(listePromiseSet).then(() => console.log('liste promise avec les set terminée'));;

    //console.log(listeCLasses);
    console.log(listeClasses);
    //console.log(listeSet);
    console.log(listeSet);
    //affiche(listeSet);
    //affiche(listeCLasses);
});

function affiche(liste) {

    let body = document.querySelector('body');

    //let paragraph = document.createElement('p');

    liste.forEach(e => body.appendChild(document.createTextNode(' ' + JSON.stringify(e) + ' ')));

}

