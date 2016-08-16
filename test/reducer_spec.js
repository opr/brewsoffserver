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
                    members: {}
                }
            }
        }));
    });

    it('handles ADD MEMBER', () => {
        const initialState = fromJS({
            parties: {
                edgethreesixty: {
                    members: {}
                }
            }
        });
        const action = {
            type: 'ADD_MEMBER',
            payload: {
                party: 'edgethreesixty',
                member: Map({name: 'Thomas Roberts', socketId: 'dd11'})
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            parties: {
                edgethreesixty: {
                    members: {
                        dd11: {
                            name: 'Thomas Roberts'
                        }
                    }
                }
            }
        }));
    });

    it('handles START BREW', () => {
        const initialState = fromJS({
            parties: {
                edgethreesixty: {
                    members: {}
                }
            }
        });
        const action = {
            type: 'START_BREW',
            payload: {party: 'edgethreesixty', socketId: 'dd11'}
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            parties: {
                edgethreesixty: {
                    members: {},
                    brewInProgress: true,
                    brewer: 'dd11'
                }
            }
        }));
    });


    it('handles STOP BREW', () => {
        const initialState = fromJS({
            parties: {
                edgethreesixty: {
                    members: {}
                }
            }
        });
        const action = {
            type: 'STOP_BREW',
            payload: {party: 'edgethreesixty'}
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            parties: {
                edgethreesixty: {
                    members: {},
                    brewInProgress: false
                }
            }
        }));
    });

    it('handles REMOVE MEMBER', () => {
        const initialState = Map({
            parties: Map({
                edgethreesixty: Map({
                    members: Map({
                        dd11: Map({
                            name: 'Thomas Roberts'
                        }),
                        dds11: Map({
                            name: 'Colin McGivern'
                        })
                    })
                }),
                cyberfrog: Map({
                    members: Map({
                        dd22: Map({
                            name: 'Ken Tsang'
                        }),
                        dds22: Map({
                            name: 'Jade Masri'
                        })
                    })
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
                    members: Map({
                        dds11: Map({
                            name: 'Colin McGivern'
                        })
                    })
                }),
                cyberfrog: Map({
                    members: Map({
                        dd22: Map({
                            name: 'Ken Tsang'
                        }),
                        dds22: Map({
                            name: 'Jade Masri'
                        })
                    })
                })
            })
        }));
    });
});