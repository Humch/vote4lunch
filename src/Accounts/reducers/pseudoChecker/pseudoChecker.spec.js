/* eslint-disable no-undef */
import { pseudoCheckerReducer } from '..';

describe('Test pseudoCheckerReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      payload: { exist: false },
      loading: false,
      error: null,
    };
  });

  it('CHECK_PSEUDO_BEGIN case reducer for pseudoChecker', () => {
    state = pseudoCheckerReducer(state, {
      type: 'CHECK_PSEUDO_BEGIN',
    });

    expect(state).toEqual({
      payload: { exist: false },
      loading: true,
      error: null,
    });
  });

  it('CHECK_PSEUDO_SUCCESS case reducer for pseudoChecker', () => {
    state = pseudoCheckerReducer(state, {
      type: 'CHECK_PSEUDO_SUCCESS',
      payload: {
        exist: true,
      },
    });

    expect(state).toEqual({
      payload: { exist: true },
      loading: false,
      error: null,
    });
  });

  it('CHECK_PSEUDO_FAILURE case reducer for pseudoChecker', () => {
    state = pseudoCheckerReducer(state, {
      type: 'CHECK_PSEUDO_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      payload: { exist: false },
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for voteData', () => {
    state = pseudoCheckerReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
