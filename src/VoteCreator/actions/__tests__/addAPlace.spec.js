/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addAPlace } from '..';

describe('Test Map asynchronous addAPlace Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator addAPlace success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          added: true,
          place: {
            id: 1,
            name: 'Cafétéria Universitaire Le Veracruz',
            lat: 44.7946229,
            lng: -0.6199622,
            type: 'restaurant',
            createdAt: '2018-10-29T10:10:53.870Z',
            updatedAt: '2018-10-29T10:10:53.870Z',
          }
        },
      });
    });
    const expectedActions = [
      { type: 'ADD_A_PLACE_BEGIN' },
      {
        type: 'ADD_A_PLACE_SUCCESS',
        result: {
          added: true,
          place: {
            id: 1,
            name: 'Cafétéria Universitaire Le Veracruz',
            lat: 44.7946229,
            lng: -0.6199622,
            type: 'restaurant',
            createdAt: '2018-10-29T10:10:53.870Z',
            updatedAt: '2018-10-29T10:10:53.870Z',
          }
        }
      },
    ];
    const store = mockStore({});
    return store.dispatch(addAPlace(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('actionCreator addAPlace failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404
      });
    });
    const expectedActions = [
      { type: 'ADD_A_PLACE_BEGIN' },
      { type: 'ADD_A_PLACE_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(addAPlace(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
