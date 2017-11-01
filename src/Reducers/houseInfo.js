import {Record, OrderedMap} from 'immutable'
import {arrToMap} from '../Utils/helper'

const list = [
    {id: 'debit', title: 'Поступления', sum: 1000000},
    {id: 'credit', title: 'Расходы', sum: 1000000},
    {id: 'saldo', title: 'Остаток на счете', sum: 1000000}
]

const ReducerState = Record({
    legendList: new OrderedMap({})
});

let initialState = new ReducerState();

initialState = initialState.set('legendList', arrToMap(list));
//const initialState = new ReducerState();

export default (state = initialState, action = {}) => {
    // switch (action.type) {
    //     case 'USER':
    //         return state.set('list', action.payload);
    // }

    return state
}
