import {
    loadHouses, setHousesList, setSearchString, loadHouseItem, setHouseItem, sendingInvitation, setInviteFail,
    sendInvitation, changeDate, changeDateAndBills, setHouseNoData
} from '../AC/housesAC';
import axios from 'axios'
import { API_GET_HOUSES, API_GET_HOUSE_INFO, API_SEND_INVITATION, API_GET_MONTH_TRANSACTIONS, API_SEND_QUESTION } from '../../../config/ENV';

export function listLoader(params = {search: ''}) {
    return dispatch => {
        dispatch(loadHouses());
        dispatch(setSearchString(params.search || ''));
        return axios.get(API_GET_HOUSES, {params}).then(res => {
            return dispatch(setHousesList(res.data.result));
        });
    }
}

export function houseLoader(params = {}) {
    return dispatch => {
        dispatch(loadHouseItem());
        if (!params.id) {
            /* @todo dispatch on fail */
        }

        return axios.get(API_GET_HOUSE_INFO + params.id).then(res => {
            if (res.data.result.bills == null) {
                return dispatch(setHouseNoData(res.data.result, params.id));
            }
            return dispatch(setHouseItem(res.data.result, params.id));
        });
    }
}

export function inviteRsu(params = {}) {
    return dispatch => {
        dispatch(sendingInvitation());
        return axios.get(API_SEND_INVITATION, {params}).then(res => {
            if (res.data.code === '499') {
                return dispatch(setInviteFail(res.data.result));
            }
            return dispatch(sendInvitation(res.data.result));
        });
    }
}

export function loadMonth(houseId, year, month) {
    return (dispatch, getState) => {
        const transactions = getState().houses.getIn(['infoDict', houseId, 'bills', year, month, 'transactions']).length;

        if (!transactions) {
            return axios.get(API_GET_MONTH_TRANSACTIONS + [houseId, year, month].join('/')).then(res => {
                return dispatch(changeDateAndBills(res.data.result.days, houseId, year, month));
            });
        }
        return dispatch(changeDate(houseId, year, month));
    }
}

export function sendQuestion(id, name, email, q) {
    return axios.get(API_SEND_QUESTION, {params:{id, name, email, q}}).then(res => {
        return res.data;
    });
}
