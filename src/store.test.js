import { configureStore } from './store';
import expect from 'expect';

function getStore() {
    return configureStore();
}

describe('store', () => {
    it('can be initialized', () => {
        const store = getStore();
    });

    it('initial state is ok', () => {
        const store = getStore();
        const state = store.getState();
        expect(state).toExist();
    });
});
