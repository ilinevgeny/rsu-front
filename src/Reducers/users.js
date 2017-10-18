import {Record} from 'immutable'
const ReducerState = Record({
    list: []
});

const initialState = new ReducerState();

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case 'USER':
            return state.set('list', action.payload);
    }

    return state
}