import {combineReducers} from 'redux';
import invitation from './Reducers/invitation';
import houses from './Reducers/houses'

export default combineReducers({
    invitation,
    houses
})