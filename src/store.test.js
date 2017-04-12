import { configureStore } from './store';
import { hashHistory } from 'react-router';
import expect from 'expect';

function getStore() {
    return configureStore(hashHistory, undefined);
}

describe('store', () => {
    it('can be initialized', () => {
        const store = getStore();
    });

    it('initial state is ok', () => {
        const store = getStore();
        const state = store.getState();
        expect(state.routing).toExist();
    });
});
