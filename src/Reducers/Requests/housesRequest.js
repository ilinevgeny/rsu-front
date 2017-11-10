import { loadHouses, setHousesList, setSearchString, loadHouseItem, setHouseItem, sendingInvitation, setInviteFail, sendInvitation } from '../AC/housesAC';
import axios from 'axios'
import { API_GET_HOUSES, API_GET_HOUSE_INFO, API_SEND_INVITATION } from '../../../config/ENV';

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
