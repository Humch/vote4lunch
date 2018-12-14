/* eslint-disable no-undef */
import { getUsersVotesReducer } from '..';

describe('Test getUsersVotesReducer', () => {
  let state;

  beforeEach(() => {
    state = [];
  });

  it('GET_USERS_VOTES_SUCCESS case reducer for getUsersVotes', () => {
    state = getUsersVotesReducer(state, {
      type: 'GET_USERS_VOTES_SUCCESS',
      votes: [1, 2, 3],
    });

    expect(state).toEqual([1, 2, 3]);
  });

  it('default case reducer for getUsersVotes', () => {
    state = getUsersVotesReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
