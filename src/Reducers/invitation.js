import {Record} from 'immutable'
import {arrToMap} from '../Utils/helper'
import { SENDING_INVITATION, START, SUCCESS, FAIL } from '../CONSTANTS'

const ReducerState = Record({
    sending: false,
    errors: {},
    fail: false,
});

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case SENDING_INVITATION + START:
            return state.set('sending', true).set('fail', false);
        case SENDING_INVITATION + FAIL:
            return state.set('sending', false).set('fail', true).set('errors', action.payload)
    }

    return state
}
