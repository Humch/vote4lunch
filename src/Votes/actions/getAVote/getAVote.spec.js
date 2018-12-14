/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getAVote } from './getAVote';

describe('Test Votes asynchronous getAVote Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator getAVote success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'voteData',
      });
    });
    const expectedActions = [
      { type: 'GET_A_VOTE_BEGIN' },
      {
        type: 'GET_A_VOTE_SUCCESS',
        result: 'voteData',
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAVote('xCd4R'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator getAVote fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    const expectedActions = [
      { type: 'GET_A_VOTE_BEGIN' },
      {
        type: 'GET_A_VOTE_FAILURE',
        error: new Error('Request failed with status code 404'),
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAVote('xCd4R'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
