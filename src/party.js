import {Map, List, fromJS} from 'immutable';

export function addParty(state, party) {
    let newParty = Map({});
    newParty = newParty.set(party, Map({members: List()}));
    return state.getIn(['parties', party]) ? state : state.mergeIn(['parties'], newParty);
}

export function addMember(party, member) {
    return party.set('members', party.get('members').push(member));
}

export function startBrew(member) {
    return Map({brewInProgress: true, brewer: member});
}

export function removeMemberBySocketId(state, socketId) {
    let allParties = state.get('parties').entries();

    let found = false;
    let currentMemberId;
    let currentParty;

    for( let p of allParties) {
        if( !found ) {
            currentParty = p[0];
            let members = p[1].get('members');
            currentMemberId = -1;
            for (let i of members) {
                i = fromJS(i);
                currentMemberId++;
                try {
                    if (i.get('socketId') == socketId) {
                        found = true;
                        break;
                    }
                }
                catch( e ){
                    console.error(e);
                }
            }
        }
    }

    return found ? state.deleteIn(['parties', currentParty, 'members', currentMemberId] ) : state;
}