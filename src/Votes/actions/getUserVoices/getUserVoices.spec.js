/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getUserVoices } from './getUserVoices';

describe('Test Votes asynchronous getUserVoices Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator getUserVoices success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'voices',
      });
    });
    const expectedActions = [
      { type: 'GET_USER_VOICES_BEGIN' },
      {
        type: 'GET_USER_VOICES_SUCCESS',
        result: 'voices',
      },
    ];
    const store = mockStore({});
    return store.dispatch(getUserVoices('bob', 'bob@bob.com', ['votesUrl']))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator getUserVoices fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    const expectedActions = [
      { type: 'GET_USER_VOICES_BEGIN' },
      {
        type: 'GET_USER_VOICES_FAILURE',
        error: new Error('Request failed with status code 404'),
      },
    ];
    const store = mockStore({});
    return store.dispatch(getUserVoices('bob', 'bob@bob.com', ['votesUrl']))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
