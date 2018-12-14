/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loginUser, resetLoginFailure } from './loginUser';

describe('Test Map asynchronous loginUser Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator loginUser fails with bad password', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          login: false,
        },
      });
    });
    const expectedActions = [
      { type: 'LOGIN_USER_BEGIN' },
      {
        type: 'LOGIN_USER_FAILURE',
        error: new Error('votre pseudo ou votre mot de passe est erroné')
      },
    ];
    const store = mockStore({});
    return store.dispatch(loginUser('bob', 'b4dPassword'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator loginUser success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          login: true,
        },
      });
    });
    const expectedActions = [
      { type: 'LOGIN_USER_BEGIN' },
      {
        type: 'LOGIN_USER_SUCCESS',
        payload: {
          login: true,
        }
      },
    ];
    const store = mockStore({});
    return store.dispatch(loginUser('bob', 'f4k3password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator loginUser failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'LOGIN_USER_BEGIN' },
      { type: 'LOGIN_USER_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(loginUser('bob', 'f4k3password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator reset login failure', () => {
    const reset = resetLoginFailure();
    expect(reset).toEqual({ type: 'RESET_LOGIN_FAILURE' });
  });
});
