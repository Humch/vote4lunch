/* eslint-disable no-undef */
import { getUserVoicesReducer } from '..';

describe('Test getUserVoicesReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      result: [],
      loading: false,
      error: null,
    };
  });

  it('GET_USER_VOICES_BEGIN case reducer for getUserVoices', () => {
    state = getUserVoicesReducer(state, {
      type: 'GET_USER_VOICES_BEGIN',
    });

    expect(state).toEqual({
      result: [],
      loading: true,
      error: null,
    });
  });

  it('GET_USER_VOICES_SUCCESS case reducer for getUserVoices', () => {
    state = getUserVoicesReducer(state, {
      type: 'GET_USER_VOICES_SUCCESS',
      result: ['Youpi !'],
    });

    expect(state).toEqual({
      result: ['Youpi !'],
      loading: false,
      error: null,
    });
  });

  it('GET_USER_VOICES_FAILURE case reducer for getUserVoices', () => {
    state = getUserVoicesReducer(state, {
      type: 'GET_USER_VOICES_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      result: [],
      loading: false,
      error: 'message',
    });
  });

  it('RESET_VOTE_DATA case reducer for getUserVoices', () => {
    state.result = ['Youpi !'];

    state = getUserVoicesReducer(state, {
      type: 'RESET_VOTE_DATA',
    });

    expect(state).toEqual({
      result: [],
      loading: false,
      error: null,
    });
  });

  it('default case reducer for getUserVoices', () => {
    state = getUserVoicesReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
