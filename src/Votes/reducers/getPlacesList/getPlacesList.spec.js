/* eslint-disable no-undef */
import { getPlacesListReducer } from '..';

describe('Test getPlacesListReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      result: {},
      loading: false,
      error: null,
    };
  });

  it('GET_PLACES_LIST_BEGIN case reducer for getPlacesList', () => {
    state = getPlacesListReducer(state, {
      type: 'GET_PLACES_LIST_BEGIN',
    });

    expect(state).toEqual({
      result: {},
      loading: true,
      error: null,
    });
  });

  it('GET_PLACES_LIST_SUCCESS case reducer for getPlacesList', () => {
    state = getPlacesListReducer(state, {
      type: 'GET_PLACES_LIST_SUCCESS',
      result: {
        id: 'object',
      },
    });

    expect(state).toEqual({
      result: {
        id: 'object',
      },
      loading: false,
      error: null,
    });
  });

  it('GET_PLACES_LIST_FAILURE case reducer for getPlacesList', () => {
    state = getPlacesListReducer(state, {
      type: 'GET_PLACES_LIST_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      result: {},
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for getPlacesList', () => {
    state = getPlacesListReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
