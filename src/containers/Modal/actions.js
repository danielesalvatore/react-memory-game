import * as api from '../../api'
import {SUBMIT_VICTORY_ERROR, SUBMIT_VICTORY_REQUEST, SUBMIT_VICTORY_SUCCESS} from "./constants";
import {MODAL_OPEN, MODAL_CLOSE} from './constants'

export const submitVictory = ({payload, dispatch}) => {

    dispatch({
        type: SUBMIT_VICTORY_REQUEST
    });

    return api.submitVictory(payload)
        .then(
            () => {
                dispatch({
                    type: SUBMIT_VICTORY_SUCCESS,
                });
            },
            error => {
                dispatch({
                    type: SUBMIT_VICTORY_ERROR,
                    message: error.message || 'Something went wrong.'
                });
            });
};

export const open = (dispatch) => {
    dispatch({
        type: MODAL_OPEN
    })
};

export const close = () => (dispatch) => {
    dispatch({
        type: MODAL_CLOSE
    })
};