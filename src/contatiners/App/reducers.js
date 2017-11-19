import {combineReducers} from 'redux';
import {FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR, FETCH_CARDS_REQUEST} from './constants';
import {FLIP_CARD, MARK_AS_MATCHED} from './constants';

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

export default combineReducers({
    byId,
    list: createList(),
});
