import { getAllSetAndClasses } from './get-all.js';
import { HearthstoneApi } from './api.js';

const hearthstoneApi = new HearthstoneApi();

export function getCardsWithParams(setName, className) {

    let resultCards = new Set();
    let myPromises = [getCardsWithSetName(setName), getCardsWithClassName(className)];

    return Promise.all(myPromises).then(([cardsWithSet, cardsWithClass]) => {

        return getCardsInCommon(cardsWithSet, cardsWithClass);

    });

}

function getCardsWithSetName(setName) {

    return hearthstoneApi.set(setName);

}


function getCardsWithClassName(className) {

    return hearthstoneApi.classes(className);

}

function getCardsInCommon(t1, t2) {

    let result = [];

    t1.forEach(element => {

        if (includes(t2, element)) {

            result.push(element);

        }

    });

    return result;

}

function includes(t, element) {

    let result = false;

    t.forEach(e => {

        if (compare(e, element)) {

            result = true;

        }

    });

    return result;

}

function elementAlreadyExist(t, element) {

    t.forEach(e => {

        if (compare(e, element)) {

            return true;

        }

    })

    return false;

}

function compare(e1, e2) {

    return e1.cardId === e2.cardId;

}