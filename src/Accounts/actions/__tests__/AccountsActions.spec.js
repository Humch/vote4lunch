/* eslint-disable no-undef */
import {
  formInputPseudo,
  formInputEmail,
  updateUserData,
  formInputPassword,
  formInputPasswordRepeater,
} from '..';

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

  it('actionCreator form input password', () => {
    const email = formInputPassword('f4k3password');
    expect(email).toEqual({ type: 'FORM_INPUT_PASSWORD', password: 'f4k3password' });
  });

  it('actionCreator form input passwordRepeater', () => {
    const email = formInputPasswordRepeater('f4k3password');
    expect(email).toEqual({ type: 'FORM_INPUT_PASSWORD_REPEATER', passwordRepeater: 'f4k3password' });
  });
});
