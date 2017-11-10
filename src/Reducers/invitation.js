import {Record} from 'immutable'
import {arrToMap} from '../Utils/helper'
import { SENDING_INVITATION, START, SUCCESS, FAIL, HIDE_INVITATION_ALERT } from '../CONSTANTS'

const ReducerState = Record({
    sending: false,
    errors: {},
    fail: false,
    alert: null,
});

export default (state = new ReducerState(), action = {}) => {
    switch (action.type) {
        case SENDING_INVITATION + START:
            return state.set('sending', true).set('fail', false);
        case SENDING_INVITATION + FAIL:
            return state.set('sending', false).set('fail', true).set('errors', action.payload);
        case SENDING_INVITATION + SUCCESS:
            return state.set('sending', false).set('fail', false).set('errors', {}).set('alert', action.payload);
        case HIDE_INVITATION_ALERT:
            return state.set('alert', null);
    }

    return state
}
