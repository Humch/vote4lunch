/* eslint-disable no-undef */
import { formInputVoteTitle } from '..';

describe('Test formInputVoteTitle Action', () => {
  it('actionCreator form input vote title', () => {
    const input = formInputVoteTitle('ceci est un titre');
    expect(input).toEqual({
      type: 'FORM_INPUT_TITLE',
      title: 'ceci est un titre',
    });
  });
});
