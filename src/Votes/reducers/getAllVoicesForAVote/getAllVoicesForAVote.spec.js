/* eslint-disable no-undef */
import { getAllVoicesForAVoteReducer } from '..';

describe('Test getAllVoicesForAVoteReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      result: [],
      loading: false,
      error: null,
    };
  });

  it('ADD_VOICE_BEGIN case reducer for getAllVoicesForAVote', () => {
    state = getAllVoicesForAVoteReducer(state, {
      type: 'GET_ALL_VOICES_FOR_VOTES_BEGIN',
    });

    expect(state).toEqual({
      result: [],
      loading: true,
      error: null,
    });
  });

  it('ADD_VOICE_SUCCESS case reducer for getAllVoicesForAVote', () => {
    state = getAllVoicesForAVoteReducer(state, {
      type: 'GET_ALL_VOICES_FOR_VOTES_SUCCESS',
      result: ['result'],
    });

    expect(state).toEqual({
      result: ['result'],
      loading: false,
      error: null,
    });
  });

  it('ADD_VOICE_FAILURE case reducer for getAllVoicesForAVote', () => {
    state = getAllVoicesForAVoteReducer(state, {
      type: 'GET_ALL_VOICES_FOR_VOTES_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      result: [],
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for getAllVoicesForAVote', () => {
    state = getAllVoicesForAVoteReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
