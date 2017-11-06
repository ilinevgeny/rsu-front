import {Record} from 'immutable';
import {LOAD_HOUSES_LIST, SET_SEARCH_STRING, START, SUCCESS} from '../CONSTANTS';

const ReducerState = Record({
    list: null,
    loading: false,
    loaded: false,
    found: 0,
    total: 0,
    search: ''
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
    }

    return state
}
