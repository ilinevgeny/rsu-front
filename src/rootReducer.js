import {combineReducers} from 'redux';
import users from './Reducers/users';
import houseInfo from './Reducers/houseInfo';
import houses from './Reducers/houses'

export default combineReducers({
    users,
    houseInfo,
    houses
})