import { LOAD_HOUSES_LIST, SET_SEARCH_STRING, START, SUCCESS} from '../../CONSTANTS';

export const loadHouses = () => ({type: LOAD_HOUSES_LIST + START});

export const setHousesList = (payload) => ({
    type: LOAD_HOUSES_LIST + SUCCESS,
    payload
});

export const setSearchString = (payload) => ({
    type: SET_SEARCH_STRING,
    payload
});