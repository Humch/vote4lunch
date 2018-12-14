/* eslint-disable no-undef */
import { emailCheckerReducer } from '..';

describe('Test emailCheckerReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      payload: { exist: false },
      loading: false,
      error: null,
    };
  });

  it('CHECK_EMAIL_BEGIN case reducer for emailChecker', () => {
    state = emailCheckerReducer(state, {
      type: 'CHECK_EMAIL_BEGIN',
    });

    expect(state).toEqual({
      payload: { exist: false },
      loading: true,
      error: null,
    });
  });

  it('CHECK_EMAIL_SUCCESS case reducer for emailChecker', () => {
    state = emailCheckerReducer(state, {
      type: 'CHECK_EMAIL_SUCCESS',
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

  it('CHECK_EMAIL_FAILURE case reducer for emailChecker', () => {
    state = emailCheckerReducer(state, {
      type: 'CHECK_EMAIL_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      payload: { exist: false },
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for voteData', () => {
    state = emailCheckerReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
