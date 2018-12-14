/* eslint-disable no-undef */
import { createAVoteReducer } from '..';

describe('Test Accounts Reducers', () => {
  let state;

  beforeEach(() => {
    state = {
      result: '',
      loading: false,
      error: null,
    };
  });

  it('CREATE_A_VOTE_BEGIN case reducer for vote', () => {
    state = createAVoteReducer(state, { type: 'CREATE_A_VOTE_BEGIN', loading: true, error: null });
    expect(state).toEqual({ result: '', loading: true, error: null, });
  });

  it('CREATE_A_VOTE_SUCCESS case reducer for vote', () => {
    state = createAVoteReducer(
      state, {
        type: 'CREATE_A_VOTE_SUCCESS',
        result: {
          id: 121,
          pseudo: 'bob',
          email: 'bob@bob.com',
          date: '2018-10-01T00:00:00.000Z',
          end_date: '2018-10-01T12:00:00.000Z',
          url: 'ZcH3A',
          updatedAt: '2018-11-15T13:44:04.860Z',
          createdAt: '2018-11-15T13:44:04.860Z',
          active: null,
        },
      },
    );
    expect(state).toEqual({
      result: {
        id: 121,
        pseudo: 'bob',
        email: 'bob@bob.com',
        date: '2018-10-01T00:00:00.000Z',
        end_date: '2018-10-01T12:00:00.000Z',
        url: 'ZcH3A',
        updatedAt: '2018-11-15T13:44:04.860Z',
        createdAt: '2018-11-15T13:44:04.860Z',
        active: null,
      },
      loading: false,
      error: null,
    });
  });

  it('CREATE_A_VOTE_FAILURE case reducer for vote', () => {
    state = createAVoteReducer(state, { type: 'CREATE_A_VOTE_FAILURE', error: 'message' });
    expect(state).toEqual({ result: '', loading: false, error: 'message', });
  });

  it('RESET_VOTE_DATA case reducer for vote', () => {
    state = createAVoteReducer(state, { type: 'RESET_VOTE_DATA' });
    expect(state).toEqual({ result: '', loading: false, error: null, });
  });

  it('default case reducer for vote', () => {
    state = createAVoteReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
