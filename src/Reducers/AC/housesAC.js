import {
    LOAD_HOUSE_ITEM, LOAD_HOUSES_LIST, SET_SEARCH_STRING, SET_HOUSE_ITEM, START, SUCCESS, FAIL, SENDING_INVITATION,
    HIDE_INVITATION_ALERT, CHANGE_DATE, CHANGE_DATE_DAYS, NODATA
} from '../../CONSTANTS';

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

export const setHouseNoData = (payload, id) => ({
    type: SET_HOUSE_ITEM + NODATA,
    payload,
    id
});

export const sendingInvitation = () => ({type: SENDING_INVITATION + START});

export const setInviteFail = payload => ({
    type: SENDING_INVITATION + FAIL,
    payload
});

export const sendInvitation = payload => ({
    type: SENDING_INVITATION + SUCCESS,
    payload
});

export const hideInvitationAlert = () => ({
    type: HIDE_INVITATION_ALERT
});

export const changeDate = (id, year, month) => ({
    type: CHANGE_DATE,
    payload: {id, year, month},
});

export const changeDateAndBills = (days, id, year, month) => ({
    type: CHANGE_DATE_DAYS,
    payload: {days, id, year, month}
})
