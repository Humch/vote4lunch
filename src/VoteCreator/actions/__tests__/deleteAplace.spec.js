/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { deleteAPlace } from '..';

describe('Test Map asynchronous addAPlace Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator deleteAPlace success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { deleted: true },
      });
    });
    const expectedActions = [
      { type: 'DELETE_A_PLACE_BEGIN' },
      {
        type: 'DELETE_A_PLACE_SUCCESS',
        result: { deleted: true },
      },
    ];
    const store = mockStore({});
    return store.dispatch(deleteAPlace(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator deleteAPlace failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'DELETE_A_PLACE_BEGIN' },
      { type: 'DELETE_A_PLACE_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(deleteAPlace(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
