/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getVoiceCount } from './getVoiceCount';

describe('Test Votes asynchronous deleteAVote Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator getVoiceCount success', () => {
    moxios.wait(() => {
      const request = moxios.requests.at(0);
      request.respondWith({
        status: 200,
        response: {
          id: 5,
        },
      });
      moxios.wait(() => {
        const secondRequest = moxios.requests.at(1);
        secondRequest.respondWith({
          status: 200,
          response: {
            count: 1,
            voteId: 5,
          },
        });
      });
    });
    const expectedActions = [
      { type: 'GET_VOICE_COUNT_BEGIN' },
      {
        type: 'GET_VOICE_COUNT_SUCCESS',
        count: 1,
        voteId: 5,
        placeId: 50,
      },
    ];
    const store = mockStore({});
    return store.dispatch(getVoiceCount('xCd4R', 50))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator getVoiceCount fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    const expectedActions = [
      { type: 'GET_VOICE_COUNT_BEGIN' },
      {
        type: 'GET_VOICE_COUNT_FAILURE',
        error: new Error('Request failed with status code 404'),
      },
    ];
    const store = mockStore({});
    return store.dispatch(getVoiceCount('xCd4R', 50))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
