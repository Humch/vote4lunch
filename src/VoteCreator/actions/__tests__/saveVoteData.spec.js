/* eslint-disable no-undef */
import { saveVoteData } from '..';

describe('Test VoteCreator Actions', () => {
  it('actionCreator saveVoteData', () => {
    const input = saveVoteData(121, '2018-10-31T00:00:00.000Z', 'bob', 'bob@bob.com', 'ZcH3A');
    expect(input).toEqual({
      type: 'SAVE_VOTE_DATA',
      id: 121,
      pseudo: 'bob',
      email: 'bob@bob.com',
      date: '2018-10-31T00:00:00.000Z',
      url: 'ZcH3A',
    });
  });
});
