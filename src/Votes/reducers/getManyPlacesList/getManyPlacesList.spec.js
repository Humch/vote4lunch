/* eslint-disable no-undef */
import { getManyPlacesListReducer } from '..';

describe('Test getManyPlacesListReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      result: [],
      loading: false,
      error: null,
    };
  });

  it('GET_PLACES_LIST_BEGIN case reducer for getManyPlacesList', () => {
    state = getManyPlacesListReducer(state, {
      type: 'GET_PLACES_LIST_BEGIN',
    });

    expect(state).toEqual({
      result: [],
      loading: true,
      error: null,
    });
  });

  it('GET_PLACES_LIST_SUCCESS case reducer for getManyPlacesList', () => {
    state = getManyPlacesListReducer(state, {
      type: 'GET_PLACES_LIST_SUCCESS',
      result: 'Youpi !',
    });

    expect(state).toEqual({
      result: ['Youpi !'],
      loading: false,
      error: null,
    });
  });

  it('GET_PLACES_LIST_FAILURE case reducer for getManyPlacesList', () => {
    state = getManyPlacesListReducer(state, {
      type: 'GET_PLACES_LIST_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      result: [],
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for getManyPlacesList', () => {
    state = getManyPlacesListReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
