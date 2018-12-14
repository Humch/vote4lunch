/* eslint-disable no-undef */
import { voteDataReducer } from '..';

describe('Test Accounts Reducers', () => {
  let state;

  beforeEach(() => {
    state = {
      id: 0,
      date: null,
      pseudo: '',
      email: '',
      places: [],
      url: '',
    };
  });

  it('SAVE_VOTE_DATA case reducer for voteData', () => {
    state = voteDataReducer(state, {
      type: 'SAVE_VOTE_DATA',
      id: 121,
      pseudo: 'bob',
      email: 'bob@bob.com',
      date: '2018-10-31T00:00:00.000Z',
      url: 'ZcH3A',
    });

    expect(state).toEqual({
      id: 121,
      pseudo: 'bob',
      email: 'bob@bob.com',
      date: '2018-10-31T00:00:00.000Z',
      url: 'ZcH3A',
      places: [],
    });
  });

  it('ADD_A_PLACE_SUCCESS case reducer for voteData', () => {
    state = voteDataReducer(state, {
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
    });

    expect(state).toEqual({
      id: 0,
      pseudo: '',
      email: '',
      date: null,
      url: '',
      places: [{
        id: 1,
        name: 'Cafétéria Universitaire Le Veracruz',
        lat: 44.7946229,
        lng: -0.6199622,
        type: 'restaurant',
        createdAt: '2018-10-29T10:10:53.870Z',
        updatedAt: '2018-10-29T10:10:53.870Z',
      }],
    });
  });

  it('DELETE_A_PLACE_SUCCESS case reducer for voteData', () => {
    state.places = [{
      id: 1,
      name: 'Cafétéria Universitaire Le Veracruz',
      lat: 44.7946229,
      lng: -0.6199622,
      type: 'restaurant',
      createdAt: '2018-10-29T10:10:53.870Z',
      updatedAt: '2018-10-29T10:10:53.870Z',
    }];

    state = voteDataReducer(state, {
      type: 'DELETE_A_PLACE_SUCCESS',
      result: {
        deleted: true,
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
    });

    expect(state).toEqual({
      id: 0,
      pseudo: '',
      email: '',
      date: null,
      url: '',
      places: [],
    });
  });

  it('RESET_VOTE_DATA case reducer for voteDataForm', () => {
    state = voteDataReducer(state, { type: 'RESET_VOTE_DATA' });
    expect(state).toEqual({
      id: 0,
      date: null,
      pseudo: '',
      email: '',
      places: [],
      url: '',
    });
  });

  it('UPDATE_USER_DATA case reducer for voteDataForm', () => {
    state = voteDataReducer(state, { type: 'UPDATE_USER_DATA', pseudo: 'bob', email: 'bob@bob.com' });
    expect(state).toEqual({
      id: 0,
      date: null,
      pseudo: 'bob',
      email: 'bob@bob.com',
      places: [],
      url: '',
    });
  });

  it('default case reducer for voteData', () => {
    state = voteDataReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
