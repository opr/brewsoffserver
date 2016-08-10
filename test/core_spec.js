import {List, Map} from 'immutable';
import {expect} from 'chai';

import {addParty, addMember} from '../src/party';

describe('application logic', () => {

    describe('starts the server and lets things be added', () => {

        it('adds a party to the state by name', () => {
            const state = Map();
            const partyName = 'edgethreesixty';
            const nextState = addParty(state, partyName);
            expect(nextState).to.equal(Map({
                parties: Map({edgethreesixty: Map({members: List()})})
            }));
        });

        it('adds another party to the state by name', () => {
            const state = Map();
            const partyName = 'edgethreesixty';
            let nextState = addParty(state, partyName);
            nextState = addParty(nextState, 'fatmedia');
            expect(nextState).to.equal(Map({
                parties: Map({edgethreesixty: Map({members: List()}), fatmedia: Map({members: List()})})
            }));
        });

        it('adds another party to the state by name', () => {
            const state = Map();
            const partyName = 'edgethreesixty';
            let nextState = addParty(state, partyName);
            nextState = addParty(nextState, 'fatmedia');
            nextState = addParty(nextState, 'cyberfrog');
            expect(nextState).to.equal(Map({
                parties: Map({
                    edgethreesixty: Map({members: List()}),
                    fatmedia: Map({members: List()}),
                    cyberfrog: Map({members: List()})
                })
            }));
        });

        it('adds people to the party', () => {
            const state = Map();
            const party = Map({
                members: List()
            });
            const nextState = addMember(party, Map({
                name: 'Thomas Roberts',
                email: 'thomas@edgethreesixty.com'
            }));
            
            expect(nextState).to.equal(
                Map({
                    members: List([
                        Map({
                            name: 'Thomas Roberts',
                            email: 'thomas@edgethreesixty.com'
                        })
                    ])
                })
            );
        });

        it('adds another person to the party', () => {
            const state = Map();
            const party = Map({
                members: List()
            });
            let nextState = addMember(party, Map({
                name: 'Thomas Roberts',
                email: 'thomas@edgethreesixty.com'
            }));

            const finalState = addMember(nextState, Map({
                name: 'Colin McGivern',
                email: 'colin@edgethreesixty.com'
            }));

            expect(finalState).to.equal(
                Map({
                    members: List([
                        Map({
                            name: 'Thomas Roberts',
                            email: 'thomas@edgethreesixty.com'
                        }),
                        Map({
                            name: 'Colin McGivern',
                            email: 'colin@edgethreesixty.com'
                        })
                    ])
                })
            );
        });
    });
});