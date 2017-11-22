import {FETCH_SCORES_SUCCESS, FETCH_SCORES_ERROR, FETCH_SCORES_REQUEST} from './constants';
import * as api from '../../api';
import {normalize} from 'normalizr';
import {arrayOfScore} from '../../schemas/score'
import {getIsFetching} from './selectors'

export const fetchScores = () => (dispatch, getState) => {

    if (getIsFetching(getState())) {
        return
    }

    dispatch({
        type: FETCH_SCORES_REQUEST
    });

    return api.fetchScores()
        .then(response => {
                dispatch({
                    type: FETCH_SCORES_SUCCESS,
                    response: normalize(response.data.Items, arrayOfScore)
                });
            },
            error => {
                dispatch({
                    type: FETCH_SCORES_ERROR,
                    message: error.message || 'Something went wrong.'
                });
            });
};
