import {shuffle} from './utils'
import {AMOUNT_OF_CARD_PAIRS} from './config'
import faker from 'faker'

const createCardBaseModel = () => {
    return {
        matched: false,
        isFlipped: true
    }
};
const createCardsArray = (n = (AMOUNT_OF_CARD_PAIRS * 2)) => {
    const baseModel = createCardBaseModel();
    const array = new Array(n).fill(baseModel)
        .map(x => Object.assign({}, x, {id: "id-" + Math.random()}));

    for (let i = 0; i < array.length; i += 2) {
        let image = faker.fake("{{image.avatar}}");
        array[i].image = image;
        array[i + 1].image = image;
    }

    return array;
};

export const fetchCards = () => {

    return new Promise((resolve, reject) => {
        resolve(shuffle(createCardsArray()))
    });
};