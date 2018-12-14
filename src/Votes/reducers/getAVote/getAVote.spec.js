/* eslint-disable no-undef */
import { getAVoteReducer } from '..';

describe('Test getAVoteReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      id: 0,
      pseudo: '',
      email: '',
      date: '',
      end_date: '',
      url: '',
      active: false,
      loading: false,
      error: null,
    };
  });

  it('GET_A_VOTE_BEGIN case reducer for getAVote', () => {
    state = getAVoteReducer(state, {
      type: 'GET_A_VOTE_BEGIN',
    });

    expect(state).toEqual({
      id: 0,
      pseudo: '',
      email: '',
      date: '',
      end_date: '',
      url: '',
      active: false,
      loading: true,
      error: null,
    });
  });

  it('GET_A_VOTE_SUCCESS case reducer for getAVote', () => {
    state = getAVoteReducer(state, {
      type: 'GET_A_VOTE_SUCCESS',
      result: {
        id: 1,
        pseudo: 'bob',
        email: 'bob@bob.com',
        date: '31/12/2018',
        end_date: '31/12/2018',
        url: 'xY4Ht',
        active: true,
      },
    });

    expect(state).toEqual({
      id: 1,
      pseudo: 'bob',
      email: 'bob@bob.com',
      date: '31/12/2018',
      end_date: '31/12/2018',
      url: 'xY4Ht',
      active: true,
      loading: false,
      error: null,
    });
  });

  it('GET_A_VOTE_FAILURE case reducer for getAVote', () => {
    state = getAVoteReducer(state, {
      type: 'GET_A_VOTE_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      id: 0,
      pseudo: '',
      email: '',
      date: '',
      end_date: '',
      url: '',
      active: false,
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for getAVote', () => {
    state = getAVoteReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
