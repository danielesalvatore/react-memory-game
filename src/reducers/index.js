import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {cards, status} from '../containers/App/reducers'
import {modal} from '../containers/Modal/reducers'

export default combineReducers({
    form: formReducer,
    cards,
    status,
    modal
})