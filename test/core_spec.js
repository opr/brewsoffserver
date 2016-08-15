import {List, Map} from 'immutable';
import {expect} from 'chai';

import {addParty, addMember, removeMemberBySocketId, startBrew} from '../src/party';

describe('application logic', () => {

    describe('starts the server and lets things be added', () => {

        it('adds a party to the state by name', () => {
            const state = Map();
            const partyName = 'edgethreesixty';
            const nextState = addParty(state, partyName);
            expect(nextState).to.equal(Map({
                parties: Map({edgethreesixty: Map({members: Map()})})
            }));
        });

        it('doesnt create a party if one already exists', () => {
            const state = Map({
                parties: Map({
                    edgethreesixty: Map({
                        members: Map({
                            dd11: Map({
                                name: 'Thomas Roberts'
                            })
                        })
                    })
                })
            });
            const partyName = 'edgethreesixty';
            const nextState = addParty(state, partyName);
            expect(nextState).to.equal(Map({
                parties: Map({
                    edgethreesixty: Map({
                        members: Map({
                            dd11: Map({
                                name: 'Thomas Roberts'
                            })
                        })
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
                parties: Map({edgethreesixty: Map({members: Map()}), fatmedia: Map({members: Map()})})
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
                    edgethreesixty: Map({members: Map()}),
                    fatmedia: Map({members: Map()}),
                    cyberfrog: Map({members: Map()})
                })
            }));
        });

        it('adds people to the party', () => {
            const party = Map({
                members: Map()
            });
            const nextState = addMember(party, Map({
                name: 'Thomas Roberts',
                socketId: 'dd11'
            }));

            expect(nextState).to.equal(
                Map({
                    members: Map({
                        dd11: Map({
                            name: 'Thomas Roberts'
                        })
                    })
                })
            );
        });

        it('adds another person to the party', () => {
            const party = Map({
                members: Map()
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
                    members: Map({
                        dd11: Map({
                            name: 'Thomas Roberts'
                        }),
                        dd211: Map({
                            name: 'Colin McGivern'
                        })
                    })
                })
            );
        });


        it('removes a disconnected member from the party', () => {
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

            const nextState = removeMemberBySocketId(initialState, 'dd11');

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
            }))
        });


        it('doesn\'t do anything if that socket ID doesn\'t exist', () => {
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

            const nextState = removeMemberBySocketId(initialState, 'mymadeupsocket');

            expect(nextState).to.equal(Map({
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
            }))
        });


        it('Starts a brew from a socket id', () => {
            const initialState = Map({
                members: Map({
                    dd11: Map({
                        name: 'Thomas Roberts'
                    }),
                    dds11: Map({
                        name: 'Colin McGivern'
                    })
                })
            });
            const nextState = startBrew(initialState, 'dd11');

            expect(nextState).to.equal(
                Map({
                    members: Map({
                        dd11: Map({
                            name: 'Thomas Roberts'
                        }),
                        dds11: Map({
                            name: 'Colin McGivern'
                        })
                    }),
                    brewInProgress: true,
                    brewer: 'dd11'
                })
            )

        });
    });
});