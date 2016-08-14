import {Map, fromJS, List} from 'immutable';
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
            payload: {
                party: 'edgethreesixty',
                member: Map({name: 'Thomas Roberts', email: 'thomas@edgethreesixty.com'})
            }
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

    it('handles START BREW', () => {
        const initialState = fromJS({
            parties: {
                edgethreesixty: {
                    members: []
                }
            }
        });
        const action = {
            type: 'START_BREW',
            payload: {party: 'edgethreesixty', member: 1}
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            parties: {
                edgethreesixty: {
                    members: [],
                    brewInProgress: true,
                    brewer: 1
                }
            }
        }));
    });

    it('handles REMOVE MEMBER', () => {
        const initialState = Map({
            parties: Map({
                edgethreesixty: Map({
                    members: List([
                        Map({
                            name: 'Thomas Roberts',
                            socketId: 'dd11'
                        }),
                        Map({
                            name: 'Colin McGivern',
                            socketId: 'dds11'
                        })
                    ])
                }),
                cyberfrog: Map({
                    members: List([
                        Map({
                            name: 'Ken Tsang',
                            socketId: 'dd22'
                        }),
                        Map({
                            name: 'Jade Masri',
                            socketId: 'dds22'
                        })
                    ])
                })
            })
        });

        const action = {
            type: 'REMOVE_MEMBER',
            payload: 'dd11'
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            parties: Map({
                edgethreesixty: Map({
                    members: List([
                        Map({
                            name: 'Colin McGivern',
                            socketId: 'dds11'
                        })
                    ])
                }),
                cyberfrog: Map({
                    members: List([
                        Map({
                            name: 'Ken Tsang',
                            socketId: 'dd22'
                        }),
                        Map({
                            name: 'Jade Masri',
                            socketId: 'dds22'
                        })
                    ])
                })
            })
        }));
    });
});