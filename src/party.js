import {Map, List, fromJS} from 'immutable';

export function addParty(state, party) {
    let newParty = Map({});
    newParty = newParty.set(party, Map({members: Map()}));
    return state.getIn(['parties', party]) ? state : state.mergeIn(['parties'], newParty);
}

export function addMember(party, member) {
    member = fromJS(member);
    return party.setIn(['members', member.get('socketId')], Map({ name: member.get('name')}));
}

export function startBrew(party, socketId) {
    console.log(party);
    party = fromJS(party);
    return party.merge(Map({brewInProgress: true, brewer: socketId}));
}

export function removeMemberBySocketId(state, socketId) {
    let allParties = fromJS(state).get('parties').entries();

    let found = false;
    let currentMemberId;
    let currentParty;

    for( let p of allParties) {
        if( !found ) {
            currentParty = p[0];
            let member = p[1].getIn( ['members', socketId] );
            if( typeof member != 'undefined') {
                found = true;
            }
        }
    }

    return found ? state.deleteIn(['parties', currentParty, 'members', socketId] ) : state;
}