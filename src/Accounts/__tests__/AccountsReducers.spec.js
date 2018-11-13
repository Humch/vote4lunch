/* eslint-disable no-undef */
import userDataReducer from '../reducers';

describe('Test Accounts Reducers', () => {
  let state;

  beforeEach(() => {
    state = { pseudo: 'bob', email: 'bob@bob.com' };
  });

  it('UPDATE_USER_DATA case reducer for userData', () => {
    state = userDataReducer(state, { type: 'UPDATE_USER_DATA', pseudo: 'roger', email: 'roger@roger.com' });
    expect(state).toEqual({ pseudo: 'roger', email: 'roger@roger.com' });
  });

  it('FORM_INPUT_PSEUDO case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_PSEUDO', pseudo: 'roger' });
    expect(state).toEqual({ pseudo: 'roger', email: 'bob@bob.com' });
  });

  it('UPDATE_USER_DATA case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_EMAIL', email: 'roger@roger.com' });
    expect(state).toEqual({ pseudo: 'bob', email: 'roger@roger.com' });
  });

  it('RESET_VOTE_DATA case reducer for userData', () => {
    state = userDataReducer(state, { type: 'RESET_VOTE_DATA' });
    expect(state).toEqual({ pseudo: '', email: '' });
  });

  it('default case reducer for userData', () => {
    state = userDataReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
