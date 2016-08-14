import {List, Map} from 'immutable';
import {expect} from 'chai';

import {addParty, addMember, removeMemberBySocketId} from '../src/party';

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

        it('doesnt create a party if one already exists', () => {
            const state = Map({
                parties: Map({
                    edgethreesixty: Map({
                        members: List([
                            Map({
                                name: 'Thomas Roberts',
                                socketId: 'dd11'
                            })
                        ])
                    })
                })
            });
            const partyName = 'edgethreesixty';
            const nextState = addParty(state, partyName);
            expect(nextState).to.equal(Map({
                parties: Map({
                    edgethreesixty: Map({
                        members: List([
                            Map({
                                name: 'Thomas Roberts',
                                socketId: 'dd11'
                            })
                        ])
                    })
                })
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
                socketId: 'dd11'
            }));

            expect(nextState).to.equal(
                Map({
                    members: List([
                        Map({
                            name: 'Thomas Roberts',
                            socketId: 'dd11'
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
                socketId: 'dd11'
            }));

            const finalState = addMember(nextState, Map({
                name: 'Colin McGivern',
                socketId: 'dd211'
            }));

            expect(finalState).to.equal(
                Map({
                    members: List([
                        Map({
                            name: 'Thomas Roberts',
                            socketId: 'dd11'
                        }),
                        Map({
                            name: 'Colin McGivern',
                            socketId: 'dd211'
                        })
                    ])
                })
            );
        });
        
        
        it('removes a disconnected member from the party', () => {
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

            const nextState = removeMemberBySocketId( initialState, 'dd11' );

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
            }))
        });


        it('doesn\'t do anything if that socket ID doesn\'t exist', () => {
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

            const nextState = removeMemberBySocketId( initialState, 'mymadeupsocket' );

            expect(nextState).to.equal(Map({
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
            }))
        });
    });
});