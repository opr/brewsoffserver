import {addParty, addMember} from '../src/party';

export default function reducer(state, action) {

    switch( action.type ) {
        case 'ADD_PARTY' :
            return addParty( state, action.payload );
        case 'ADD_MEMBER' :
            return state.setIn( ['parties', action.payload.party ], addMember( state.getIn( ['parties', action.payload.party ] ), action.payload.member ) );
        default:
            return state;
    }

}