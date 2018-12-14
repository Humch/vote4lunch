/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { checkEmail } from './emailChecker';

describe('Test Map asynchronous checkEmail Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator checkEmail success', () => {
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
      { type: 'CHECK_EMAIL_BEGIN' },
      {
        type: 'CHECK_EMAIL_SUCCESS',
        payload: {
          exist: false,
        }
      },
    ];
    const store = mockStore({});
    return store.dispatch(checkEmail('bob'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator checkEmail failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'CHECK_EMAIL_BEGIN' },
      { type: 'CHECK_EMAIL_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(checkEmail('bob'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
