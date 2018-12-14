/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { checkPseudo } from './pseudoChecker';

describe('Test Map asynchronous checkPseudo Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator checkPseudo success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          exist: false,
        },
      });
    });
    const expectedActions = [
      { type: 'CHECK_PSEUDO_BEGIN' },
      {
        type: 'CHECK_PSEUDO_SUCCESS',
        payload: {
          exist: false,
        }
      },
    ];
    const store = mockStore({});
    return store.dispatch(checkPseudo('bob'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator checkPseudo failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'CHECK_PSEUDO_BEGIN' },
      { type: 'CHECK_PSEUDO_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(checkPseudo('bob'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
