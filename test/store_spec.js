import {Map, fromJS, List} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({
            type: 'ADD_PARTY',
            payload: 'edgethreesixty'
        });

        expect(store.getState()).to.equal(Map({"parties": Map({"edgethreesixty": Map({"members": Map({})})})}));
    });

});