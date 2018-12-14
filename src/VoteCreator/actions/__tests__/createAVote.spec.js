/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { createAVote } from '..';

describe('Test Map asynchronous createAVote Actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('actionCreator createAVote success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          id: 121,
          pseudo: 'bob',
          email: 'bob@bob.com',
          date: '2018-10-01T00:00:00.000Z',
          end_date: '2018-10-01T12:00:00.000Z',
          url: 'ZcH3A',
          updatedAt: '2018-11-15T13:44:04.860Z',
          createdAt: '2018-11-15T13:44:04.860Z',
          active: null,
        },
      });
    });
    const expectedActions = [
      { type: 'CREATE_A_VOTE_BEGIN' },
      {
        type: 'CREATE_A_VOTE_SUCCESS',
        result: {
          id: 121,
          pseudo: 'bob',
          email: 'bob@bob.com',
          date: '2018-10-01T00:00:00.000Z',
          end_date: '2018-10-01T12:00:00.000Z',
          url: 'ZcH3A',
          updatedAt: '2018-11-15T13:44:04.860Z',
          createdAt: '2018-11-15T13:44:04.860Z',
          active: null,
        },
      },
    ];
    const store = mockStore({});
    return store.dispatch(createAVote('bob', 'bob@bob.com', '2018-10-01', '2018-10-01', '12:00'))
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
      { type: 'CREATE_A_VOTE_BEGIN' },
      { type: 'CREATE_A_VOTE_FAILURE', error: new Error('Request failed with status code 404') },
    ];
    const store = mockStore({});
    return store.dispatch(createAVote('bob', 'bob@bob.com', '2018-10-01', '2018-10-01', '12:00'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
