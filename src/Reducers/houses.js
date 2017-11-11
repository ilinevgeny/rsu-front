import {Record, Map} from 'immutable';
import {LOAD_HOUSES_LIST, SET_SEARCH_STRING,
    LOAD_HOUSE_ITEM, SET_HOUSE_ITEM,
    START, SUCCESS} from '../CONSTANTS';

import {formatLists, getCurrentDate} from './Formatters/housesInfoFormatter'

const ReducerState = Record({
    list: null,
    loading: false,
    loaded: false,
    infoDict: new Map({}),
    found: 0,
    total: 0,
    search: '',
});

let initialState = new ReducerState();

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_HOUSES_LIST + START:
            return state.set('loading', true).set('loaded', false);
        case SET_SEARCH_STRING:
            return state.set('search', action.payload);
        case LOAD_HOUSES_LIST + SUCCESS:
            return state
                .set('list',  action.payload && action.payload.list  || [])
                .set('found', action.payload && action.payload.found || 0)
                .set('total', action.payload && action.payload.total || 0)
                .set('loading', false).set('loaded', true);
        case LOAD_HOUSE_ITEM + START:
            return state.set('loading', true);
        case SET_HOUSE_ITEM + SUCCESS:
            let data = action.payload;
            let {year, month} = getCurrentDate(data)


            data.bills = formatLists(data);
            data.curYear = year;
            data.curMonth = month;

            return state.setIn(['infoDict', action.id], data).set('loading', false);
    }

    return state
}
