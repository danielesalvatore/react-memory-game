import {combineReducers} from 'redux';
import {FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR, FETCH_CARDS_REQUEST} from './constants';
import {FLIP_CARD, MARK_AS_MATCHED, GAME_VICTORY} from './constants';
import {CHECK_MATCHING_CARDS_START, CHECK_MATCHING_CARDS_STOP} from './constants';


const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CARDS_SUCCESS :
            return {
                ...state,
                ...action.response.entities.cards,
            };
        case FLIP_CARD :
            const toFlip = state[action.id];
            toFlip.isFlipped = !toFlip.isFlipped;

            return {
                ...state,
                [action.id]: toFlip
            };
        case MARK_AS_MATCHED :
            const toMark = state[action.id];
            toMark.matched = true;

            return {
                ...state,
                [action.id]: toMark
            };
        default:
            return state;
    }
};

const createList = () => {
    const ids = (state = [], action) => {
        switch (action.type) {
            case FETCH_CARDS_SUCCESS :
                return action.response.result;
            default:
                return state;
        }
    };

    const errorMessage = (state = null, action) => {
        switch (action.type) {
            case FETCH_CARDS_ERROR :
                return action.message;
            case FETCH_CARDS_REQUEST :
            case FETCH_CARDS_SUCCESS :
                return null;
            default:
                return state;
        }
    };

    const isFetching = (state = false, action) => {
        switch (action.type) {
            case FETCH_CARDS_REQUEST:

                return true;
            case FETCH_CARDS_ERROR:
            case FETCH_CARDS_SUCCESS:
                return false;
            default:
                return state;
        }
    };

    return combineReducers({
        ids,
        isFetching,
        errorMessage,
    });
};

export const status = (state = {checkingMatchingCards: false, cardIsFlipping: false, victory: false}, action) => {

    switch (action.type) {
        case FETCH_CARDS_SUCCESS :
            return {
                ...state,
                startAt: new Date().getTime(),
                victory: false
            };
        case CHECK_MATCHING_CARDS_START :
            return {
                ...state,
                checkingMatchingCards: true
            };
        case CHECK_MATCHING_CARDS_STOP :
            return {
                ...state,
                checkingMatchingCards: false
            };
        case GAME_VICTORY :
            return {
                ...state,
                victory: true
            };
        default:
            return state;
    }
};

export const cards = combineReducers({
    byId,
    list: createList(),
});

