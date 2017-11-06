import { loadHouses, setHousesList, setSearchString } from '../AC/housesAC';
import axios from 'axios'

export function listLoader(params = {search: ''}) {
    return dispatch => {
        dispatch(loadHouses());
        dispatch(setSearchString(params.search || ''));
        return axios.get('http://rsu.ilin.me:8080/index/getHouses', {params}).then((res) => {
            return dispatch(setHousesList(res.data.result));
        });
    }
}

