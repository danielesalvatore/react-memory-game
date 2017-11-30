import {FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR, FETCH_CARDS_REQUEST} from './constants';
import {FLIP_CARD, MARK_AS_MATCHED, GAME_VICTORY} from './constants';
import {CHECK_MATCHING_CARDS_START, CHECK_MATCHING_CARDS_STOP} from './constants';
import {CARD_FLIP_SPEED_IN_MS, RESET_UNMATCHED_CARDS_TIMEOUT} from '../../config'
import * as api from '../../api';
import {normalize} from 'normalizr';
import {arrayOfCard} from '../../schemas/card'
import {getCards} from "./selectors";
import {open} from '../Modal/actions'

const markCardAsMatched = (id, dispatch) => {
    dispatch({
        type: MARK_AS_MATCHED,
        id
    });
};

const disableCardFlipping = (dispatch) => {
    dispatch({
        type: CHECK_MATCHING_CARDS_START
    });
};

const enableCardFlipping = (dispatch) => {
    dispatch({
        type: CHECK_MATCHING_CARDS_STOP
    });
};

const getFlippedCardsToMarkAsMatched = (cards) => {

    const mapping = {};
    const pairs = [];
    const toMark = [];

    //group by img
    cards.forEach(c => {

        //abort if not flipped
        if (c.isFlipped) {
            return
        }

        // base case: first occurrence for given image
        if (!Array.isArray(mapping[c.image])) {
            mapping[c.image] = []
        }

        mapping[c.image].push(c);

    });

    //get matched card pairs
    for (let img in mapping) {
        if (mapping[img].length % 2 === 0) {
            pairs.push(mapping[img]);
        }
    }

    // flatten array of array
    return toMark.concat.apply([], pairs).filter(m => !m.matched);
};

export const isGameWon = (cards) => {
    return cards.filter(c => c.matched).length === cards.length;
};

const getCardToFlipBack = (cards) => {
    return cards.filter(c => !c.isFlipped && !c.matched);
};

const setGameVictory = (dispatch) => {
    // Every pair is matched here
    window.setTimeout(() => {
        enableCardFlipping(dispatch);

        dispatch({
            type: GAME_VICTORY,
            finishAt: new Date().getTime()
        });

        open(dispatch)

    }, CARD_FLIP_SPEED_IN_MS) // wait that the card is completely flipped before to win
};

export const fetchCards = () => (dispatch) => {

    dispatch({
        type: FETCH_CARDS_REQUEST
    });

    return api.fetchCards()
        .then(
            response => {
                dispatch({
                    type: FETCH_CARDS_SUCCESS,
                    response: normalize(response, arrayOfCard)
                });
            },
            error => {
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

export const checkMatchingCards = () => (dispatch, getState) => {

    let cards = getCards(getState());
    const flippedCardsAmount = cards.filter(c => !c.isFlipped).length;

    // Abort if flipped cards amount is odd
    if (flippedCardsAmount % 2 !== 0) {
        return;
    }

    disableCardFlipping(dispatch);

    const toMarkAsMatched = getFlippedCardsToMarkAsMatched(cards);
    toMarkAsMatched.forEach(m => {
        markCardAsMatched(m.id, dispatch)
    });

    // Check if user won the game
    cards = getCards(getState()); // get refreshed state
    const victory = isGameWon(cards);

    if (victory) {
        setGameVictory(dispatch);
        return
    }

    // Still some card to pair here...
    const toFlipBack = getCardToFlipBack(cards);

    // Enable flipping if no card to flip back
    if (!toFlipBack.length) {
        enableCardFlipping(dispatch);
        return;
    }

    // flip back unmatched card after a small timeout to allow user to memorize cards
    window.setTimeout(() => {

        toFlipBack.forEach(m => flipCard(m.id)(dispatch));

        enableCardFlipping(dispatch);

    }, RESET_UNMATCHED_CARDS_TIMEOUT);

};