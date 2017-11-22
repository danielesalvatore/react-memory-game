import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {cards, status} from '../containers/App/reducers'
import {modal} from '../containers/Modal/reducers'
import {scores} from '../containers/Scores/reducers'

export default combineReducers({
    form: formReducer,
    scores,
    cards,
    status,
    modal
})