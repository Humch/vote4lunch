/* eslint-disable no-undef */
import { getVoicesCountReducer } from '..';

describe('Test getVoicesCountReducer', () => {
  let state;

  beforeEach(() => {
    state = [];
  });

  it('GET_VOICE_COUNT_SUCCESS case reducer for getVoicesCount', () => {
    state = getVoicesCountReducer(state, {
      type: 'GET_VOICE_COUNT_SUCCESS',
      count: 5,
      voteId: 10,
      placeId: 13,
    });

    expect(state).toEqual([
      {
        count: 5,
        voteId: 10,
        place: 13,
      }
    ]);
  });

  it('GET_VOICE_COUNT_SUCCESS case reducer for getVoicesCount with votes count already exist', () => {
    state = [
      {
        count: 5,
        voteId: 10,
        place: 13,
      },
      {
        count: 8,
        voteId: 3,
        place: 42,
      }
    ];
    state = getVoicesCountReducer(state, {
      type: 'GET_VOICE_COUNT_SUCCESS',
      count: 6,
      voteId: 10,
      placeId: 13,
    });

    expect(state).toEqual([
      {
        count: 6,
        voteId: 10,
        place: 13,
      },
      {
        count: 8,
        voteId: 3,
        place: 42,
      }
    ]);
  });

  it('default case reducer for getVoicesCount', () => {
    state = getVoicesCountReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
