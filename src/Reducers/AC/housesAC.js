import {LOAD_HOUSE_ITEM, LOAD_HOUSES_LIST, SET_SEARCH_STRING, SET_HOUSE_ITEM, START, SUCCESS, FAIL, SENDING_INVITATION} from '../../CONSTANTS';

export const loadHouses = () => ({type: LOAD_HOUSES_LIST + START});
export const loadHouseItem = () => ({type: LOAD_HOUSE_ITEM + START});

export const setHousesList = payload => ({
    type: LOAD_HOUSES_LIST + SUCCESS,
    payload
});

export const setSearchString = payload => ({
    type: SET_SEARCH_STRING,
    payload
});

export const setHouseItem = (payload, id) => ({
    type: SET_HOUSE_ITEM + SUCCESS,
    payload,
    id
});

export const sendingInvitation = () => ({type: SENDING_INVITATION + START});

export const setInviteFail = payload => ({
    type: SENDING_INVITATION + FAIL,
    payload
});