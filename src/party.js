import {Map, List} from 'immutable';

export function addParty( state, party ) {
    console.log('adding', party );
    let newParty = Map({});
    newParty = newParty.set( party, Map({ members: List() }) );
    return state.getIn( ['parties', party ] ) ? state : state.mergeIn( ['parties'], newParty );
}

export function addMember( party, member ) {
    console.log( 'adding', member, 'to', party);
    return party.set( 'members', party.get('members').push(member) );
}

export function startBrew( member ) {
    return Map({ brewInProgress: true, brewer: member } );
}

export function removeMemberBySocketId( state, socketId) {
    let allParties = state.get('parties');

    console.log(allParties.entrySeq());

    return state;
}