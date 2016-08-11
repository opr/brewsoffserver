import {Map, List} from 'immutable';

export function addParty( state, party ) {
    let newParty = Map({});
    newParty = newParty.set( party, Map({ members: List() }) );
    return state.mergeIn( ['parties'], newParty );
}

export function addMember( party, member ) {
    return party.set( 'members', party.get('members').push(member) );
}

export function startBrew( member ) {
    return Map({ brewInProgress: true, brewer: member } );
}