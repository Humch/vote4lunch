/* eslint-disable no-undef */
import { formInputPseudo, formInputEmail, updateUserData } from '../actions';

describe('Test Accounts Actions', () => {
  it('actionCreator form input email', () => {
    const email = formInputEmail('bob@bob.com');
    expect(email).toEqual({ type: 'FORM_INPUT_EMAIL', email: 'bob@bob.com' });
  });
  it('actionCreator form input pseudo', () => {
    const pseudo = formInputPseudo('bob');
    expect(pseudo).toEqual({ type: 'FORM_INPUT_PSEUDO', pseudo: 'bob' });
  });
  it('actionCreator form input pseudo', () => {
    const input = updateUserData('bob', 'bob@bob.com');
    expect(input).toEqual({ type: 'UPDATE_USER_DATA', pseudo: 'bob', email: 'bob@bob.com' });
  });
});
