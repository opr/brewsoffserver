import {INITIAL_STATE} from './core';
import {addParty, addMember, startBrew, removeMemberBySocketId} from '../src/party';

export default function reducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADD_PARTY' :
            return addParty(state, action.payload);
        case 'REMOVE_MEMBER' :
            return removeMemberBySocketId(state, action.payload);
        case 'ADD_MEMBER' :
            return state.setIn(['parties', action.payload.party], addMember( state.getIn(['parties', action.payload.party]), action.payload.member));
        case 'START_BREW' :
            return state.mergeIn(['parties', action.payload.party], startBrew( state.getIn( ['parties', action.payload.party ] ), action.payload.socketId ) );
        default:
            return state;
    }
}