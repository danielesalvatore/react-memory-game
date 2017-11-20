import {combineReducers} from 'redux'
import {cards, status} from '../contatiners/App/reducers'

export default combineReducers({
    cards,
    status
})