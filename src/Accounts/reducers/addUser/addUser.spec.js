/* eslint-disable no-undef */
import { addUserReducer } from '..';

describe('Test addUserReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      payload: { created: false },
      loading: false,
      error: null,
    };
  });

  it('ADD_USER_BEGIN case reducer for addUser', () => {
    state = addUserReducer(state, {
      type: 'ADD_USER_BEGIN',
    });

    expect(state).toEqual({
      payload: { created: false },
      loading: true,
      error: null,
    });
  });

  it('ADD_USER_SUCCESS case reducer for addUser', () => {
    state = addUserReducer(state, {
      type: 'ADD_USER_SUCCESS',
      payload: {
        created: true,
      },
    });

    expect(state).toEqual({
      payload: { created: true },
      loading: false,
      error: null,
    });
  });

  it('ADD_USER_FAILURE case reducer for addUser', () => {
    state = addUserReducer(state, {
      type: 'ADD_USER_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      payload: { created: false },
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for voteData', () => {
    state = addUserReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
