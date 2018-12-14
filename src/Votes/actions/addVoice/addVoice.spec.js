/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addVoice } from './addVoice';

describe('Test Votes asynchronous Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  // TODO - erreur de timeout
  // it('actionCreator addVoice success', () => {
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 200,
  //       response: { vote: true },
  //     });
  //   });
  //   const expectedActions = [
  //     { type: 'ADD_VOICE_BEGIN' },
  //     { type: 'ADD_VOICE_SUCCESS', result: { vote: true } },
  //   ];
  //   const store = mockStore({});
  //   return store.dispatch(addVoice('f4k3ur1', 1, 'bob', 'bob@bob.com'))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  // });

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
