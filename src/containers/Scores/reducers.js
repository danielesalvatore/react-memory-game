import {combineReducers} from 'redux';
import {FETCH_SCORES_SUCCESS, FETCH_SCORES_ERROR, FETCH_SCORES_REQUEST} from './constants';
import {SUBMIT_VICTORY_SUCCESS} from '../../containers/Modal/constants'

const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_SCORES_SUCCESS :
            return {
                ...state,
                ...action.response.entities.scores,
            };
        case SUBMIT_VICTORY_SUCCESS:
            return {  };
        default:
            return state;
    }
};

const createList = () => {
    const ids = (state = null, action) => {
        switch (action.type) {
            case FETCH_SCORES_SUCCESS :
                return action.response.result;
            case SUBMIT_VICTORY_SUCCESS:
                return  null;
            default:
                return state;
        }
    };

    const errorMessage = (state = null, action) => {
        switch (action.type) {
            case FETCH_SCORES_ERROR :
                return action.message;
            case FETCH_SCORES_REQUEST :
            case FETCH_SCORES_SUCCESS :
                return null;
            default:
                return state;
        }
    };

    const isFetching = (state = false, action) => {
        switch (action.type) {
            case FETCH_SCORES_REQUEST:
                return true;
            case FETCH_SCORES_ERROR:
            case FETCH_SCORES_SUCCESS:
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

export const scores = combineReducers({
    byId,
    list: createList(),
});

