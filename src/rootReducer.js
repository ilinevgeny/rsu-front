import {combineReducers} from 'redux';
import invitation from './Reducers/invitation';
import houseInfo from './Reducers/houseInfo';
import houses from './Reducers/houses'

export default combineReducers({
    invitation,
    houseInfo,
    houses
})