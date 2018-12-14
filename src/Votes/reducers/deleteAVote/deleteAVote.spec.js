/* eslint-disable no-undef */
import { deleteAVoteReducer } from '..';

describe('Test deleteAVoteReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      result: '',
      loading: false,
      error: null,
    };
  });

  it('DELETE_A_VOTE_BEGIN case reducer for deleteAVote', () => {
    state = deleteAVoteReducer(state, {
      type: 'DELETE_A_VOTE_BEGIN',
    });

    expect(state).toEqual({
      result: '',
      loading: true,
      error: null,
    });
  });

  it('DELETE_A_VOTE_SUCCESS case reducer for deleteAVote', () => {
    state = deleteAVoteReducer(state, {
      type: 'DELETE_A_VOTE_SUCCESS',
      result: 'Youpi !',
    });

    expect(state).toEqual({
      result: 'Youpi !',
      loading: false,
      error: null,
    });
  });

  it('DELETE_A_VOTE_FAILURE case reducer for deleteAVote', () => {
    state = deleteAVoteReducer(state, {
      type: 'DELETE_A_VOTE_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      result: '',
      loading: false,
      error: 'message',
    });
  });

  it('DELETE_A_VOTE_INIT case reducer for deleteAVote', () => {
    state = deleteAVoteReducer(state, {
      type: 'DELETE_A_VOTE_INIT',
    });

    expect(state).toEqual({
      result: '',
      loading: false,
      error: null,
    });
  });

  it('default case reducer for deleteAVote', () => {
    state = deleteAVoteReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
