/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addVoice } from './addVoice';

describe('Test addVoice asynchronous actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('actionCreator addVoice success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { vote: true },
      });
    });
    const expectedActions = [
      { type: 'ADD_VOICE_BEGIN' },
      { type: 'ADD_VOICE_SUCCESS', result: { vote: true } },
      { type: 'GET_VOICE_COUNT_BEGIN' },
      { type: 'GET_USER_VOICES_BEGIN' },
      { type: 'GET_ALL_VOICES_FOR_VOTES_BEGIN' },
    ];
    const store = mockStore({});
    return store.dispatch(addVoice('f4k3ur1', 1, 'bob', 'bob@bob.com'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator addVoice failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'ADD_VOICE_BEGIN' },
      { type: 'ADD_VOICE_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(addVoice('f4k3ur1', 1, 'bob', 'bob@bob.com'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
