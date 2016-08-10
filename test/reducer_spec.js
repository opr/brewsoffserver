import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles ADD PARTY', () => {
        const initialState = Map();
        const action = {type: 'ADD_PARTY', payload: 'edgethreesixty'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            parties: {
                edgethreesixty: {
                    members: []
                }
            }
        }));
    });

    it('handles ADD MEMBER', () => {
        const initialState = fromJS({
            parties: {
                edgethreesixty: {
                    members: []
                }
            }
        });
        const action = {
            type: 'ADD_MEMBER',
            payload: {party: 'edgethreesixty', member: Map({name: 'Thomas Roberts', email: 'thomas@edgethreesixty.com'})}
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            parties: {
                edgethreesixty: {
                    members: [
                        {
                            name: 'Thomas Roberts',
                            email: 'thomas@edgethreesixty.com'
                        }
                    ]
                }
            }
        }));
    });
});