import {FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR, FETCH_CARDS_REQUEST} from './constants';
import {FLIP_CARD, MARK_AS_MATCHED, FLIP_UNMATCHED_CARDS} from './constants';
import * as api from '../../api';
import {normalize} from 'normalizr';
import {arrayOfCard} from '../../schemas/card'
import {getCards} from "./selectors";

export const fetchCards = () => (dispatch) => {

    dispatch({
        type: FETCH_CARDS_REQUEST
    });

    return api.fetchCards()
        .then(
            (response) => {
                dispatch({
                    type: FETCH_CARDS_SUCCESS,
                    response: normalize(response, arrayOfCard)
                });
            },
            (error) => {
                dispatch({
                    type: FETCH_CARDS_ERROR,
                    message: error.message || 'Something went wrong.'
                });
            });
};

export const flipCard = (id) => (dispatch) => {

    dispatch({
        type: FLIP_CARD,
        id
    });

};

const markCardAsMatched = (id, dispatch) => {

    dispatch({
        type: MARK_AS_MATCHED,
        id
    });


};

export const checkMatchingCards = () => (dispatch, getState) => {

    const pairs = {};
    const cards = getCards(getState());

    // Create mapping image 2 flipped card
    cards.forEach(c => {

        //abort if not flipped
        if (c.isFlipped) {
            return
        }

        // base case: first occurrence for given image
        if (!Array.isArray(pairs[c.image])) {
            pairs[c.image] = []
        }

        pairs[c.image].push(c);

    });


    for (let img in pairs) {

        const matched = pairs[img];

        if (matched.length === 2) {
            matched.forEach(m =>
                markCardAsMatched(m.id, dispatch))
        }


    }

    // flip back unmatched card;

    window.setTimeout(() => {
        if (cards.filter(c => !c.isFlipped).length % 2 === 0) {
            cards.filter(c => !c.isFlipped && !c.matched).forEach(m =>
                flipCard(m.id)(dispatch))
        }

        //check if win
        const matched = cards.filter(c => c.matched).length;
        if (matched === cards.length) {
            alert("Win")
        }
    }, 2000)


};