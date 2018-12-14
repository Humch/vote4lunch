/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getAllVoicesForAVote } from './getAllVoicesForAVote';

describe('Test Votes asynchronous getAllVoicesForAVote Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator getAllVoicesForAVote success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          'result1',
          'result2',
          'result3',
          'result4',
        ],
      });
    });
    const expectedActions = [
      { type: 'GET_ALL_VOICES_FOR_VOTES_BEGIN' },
      {
        type: 'GET_ALL_VOICES_FOR_VOTES_SUCCESS',
        result: [
          'result1',
          'result2',
          'result3',
          'result4',
        ],
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAllVoicesForAVote('xCd4R'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator getAllVoicesForAVote fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    const expectedActions = [
      { type: 'GET_ALL_VOICES_FOR_VOTES_BEGIN' },
      {
        type: 'GET_ALL_VOICES_FOR_VOTES_FAILURE',
        error: new Error('Request failed with status code 404'),
      },
    ];
    const store = mockStore({});
    return store.dispatch(getAllVoicesForAVote('xCd4R'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
