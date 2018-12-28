/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { deleteVoice } from './deleteVoice';

describe('Test deleteVoice asynchronous actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('actionCreator deleteVoice success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { deleted: true },
      });
    });
    const expectedActions = [
      { type: 'DELETE_VOICE_BEGIN' },
      { type: 'DELETE_VOICE_SUCCESS', result: { deleted: true } },
      { type: 'GET_VOICE_COUNT_BEGIN' },
      { type: 'GET_USER_VOICES_BEGIN' },
      { type: 'GET_ALL_VOICES_FOR_VOTES_BEGIN' },
    ];
    const store = mockStore({});
    return store.dispatch(deleteVoice('f4k3ur1', 1, 'bob', 'bob@bob.com'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator deleteVoice failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'DELETE_VOICE_BEGIN' },
      { type: 'DELETE_VOICE_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(deleteVoice('f4k3ur1', 1, 'bob', 'bob@bob.com'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
