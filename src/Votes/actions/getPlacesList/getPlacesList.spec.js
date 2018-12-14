/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getPlacesList } from './getPlacesList';

describe('Test Votes asynchronous getPlacesList Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const voteUrl = 'xCd4R';

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator getPlacesList success', () => {
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
      { type: 'GET_PLACES_LIST_BEGIN' },
      {
        type: 'GET_PLACES_LIST_SUCCESS',
        result: {
          [voteUrl]: [
            'result1',
            'result2',
            'result3',
            'result4',
          ],
        }
      },
    ];
    const store = mockStore({});
    return store.dispatch(getPlacesList(voteUrl))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator getPlacesList fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    const expectedActions = [
      { type: 'GET_PLACES_LIST_BEGIN' },
      {
        type: 'GET_PLACES_LIST_FAILURE',
        error: new Error('Request failed with status code 404'),
      },
    ];
    const store = mockStore({});
    return store.dispatch(getPlacesList(voteUrl))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
