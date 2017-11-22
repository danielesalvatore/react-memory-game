import {combineReducers} from 'redux';
import {MODAL_CLOSE, MODAL_OPEN} from '../Modal/constants';

const isOpen = (state = false, action) => {
    switch (action.type) {
        case MODAL_CLOSE :
            return false;
        case MODAL_OPEN :
            return true;
        default:
            return state;
    }
};

export const modal = combineReducers({
    isOpen
});

