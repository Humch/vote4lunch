/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { deleteAVote } from './deleteAVote';

describe('Test Votes asynchronous deleteAVote Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator deleteAVote success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          delete: true,
        },
      });
    });
    const expectedActions = [
      { type: 'DELETE_A_VOTE_BEGIN' },
      {
        type: 'DELETE_A_VOTE_SUCCESS',
        result: {
          delete: true,
        }
      },
      { type: 'DELETE_A_VOTE_INIT' },
    ];
    const store = mockStore({});
    return store.dispatch(deleteAVote('xCd4R'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator deleteAVote fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    const expectedActions = [
      { type: 'DELETE_A_VOTE_BEGIN' },
      {
        type: 'DELETE_A_VOTE_FAILURE',
        error: new Error('Request failed with status code 404'),
      },
    ];
    const store = mockStore({});
    return store.dispatch(deleteAVote('xCd4R'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
