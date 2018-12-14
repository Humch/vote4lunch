/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getUsersVotes } from './getUsersVotes';

describe('Test Votes asynchronous deleteAVote Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator getUsersVotes success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'userVotes',
      });
    });
    const expectedActions = [
      { type: 'GET_USERS_VOTES_BEGIN' },
      {
        type: 'GET_USERS_VOTES_SUCCESS',
        votes: 'userVotes',
      },
    ];
    const store = mockStore({});
    return store.dispatch(getUsersVotes('xCd4R'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator getUsersVotes fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    const expectedActions = [
      { type: 'GET_USERS_VOTES_BEGIN' },
      {
        type: 'GET_USERS_VOTES_FAILURE',
        error: new Error('Request failed with status code 404'),
      },
    ];
    const store = mockStore({});
    return store.dispatch(getUsersVotes('bob'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
