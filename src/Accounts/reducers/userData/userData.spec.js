/* eslint-disable no-undef */
import { userDataReducer } from '..';

// mock browser local storage
import LS from '../../../../__mocks__/localStorage';

describe('Test Accounts Reducers', () => {
  let state;

  beforeEach(() => {
    state = {
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    };
  });

  it('UPDATE_USER_DATA case reducer for userData', () => {
    state = userDataReducer(state, {
      type: 'UPDATE_USER_DATA',
      pseudo: 'roger',
      email: 'roger@roger.com',
      authenticated: true,
    });
    expect(state).toEqual({
      pseudo: 'roger',
      email: 'roger@roger.com',
      password: '',
      passwordRepeater: '',
      authenticated: true,
      loading: false,
      loginError: false,
    });
  });

  it('FORM_INPUT_PSEUDO case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_PSEUDO', pseudo: 'roger' });
    expect(state).toEqual({
      pseudo: 'roger',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });

  it('FORM_INPUT_PASSWORD case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_PASSWORD', password: 'f4k3password' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: 'f4k3password',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });

  it('FORM_INPUT_PASSWORD_REPEATER case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_PASSWORD_REPEATER', passwordRepeater: 'f4k3password' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: 'f4k3password',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });

  it('FORM_INPUT_EMAIL case reducer for userData', () => {
    state = userDataReducer(state, { type: 'FORM_INPUT_EMAIL', email: 'roger@roger.com' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'roger@roger.com',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });

  it('RESET_VOTE_DATA case reducer for userData', () => {
    state = userDataReducer(state, { type: 'RESET_VOTE_DATA' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });

  it('LOGIN_USER_BEGIN case reducer for userData', () => {
    state = userDataReducer(
      state,
      {
        type: 'LOGIN_USER_BEGIN',
      },
    );

    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: true,
      loginError: false,
    });
  });

  it('LOGIN_USER_SUCCESS case reducer for userData', () => {
    state = userDataReducer(
      state,
      {
        type: 'LOGIN_USER_SUCCESS',
        payload: {
          login: true,
          pseudo: 'bob',
          email: 'bob@bob.com',
        },
      },
    );

    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
      authenticated: true,
      loading: false,
      loginError: false,
    });

    const storagePseudo = LS.window.localStorage.getItem('pseudo');
    const storageEmail = LS.window.localStorage.getItem('email');
    const storageAuthenticated = JSON.parse(LS.window.localStorage.getItem('authenticated'));

    expect(storagePseudo).toEqual('bob');
    expect(storageEmail).toEqual('bob@bob.com');
    expect(storageAuthenticated).toBe(true);
  });

  it('LOGIN_USER_FAILURE case reducer for userData', () => {
    state = userDataReducer(
      state,
      {
        type: 'LOGIN_USER_FAILURE',
        error: 'message',
      },
    );

    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: true,
    });
  });

  it('RESET_LOGIN_FAILURE case reducer for userData', () => {
    state = userDataReducer(
      state,
      {
        type: 'RESET_LOGIN_FAILURE',
      },
    );

    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });
  it('RESET_PASSWORD_DATA case reducer for userData', () => {
    state = userDataReducer(
      {
        ...state,
        password: 'f4k3password',
        passwordRepeater: 'f4k3password',
      },
      {
        type: 'RESET_PASSWORD_DATA',
      },
    );

    expect(state).toEqual({
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });
  it('RESET_USER_DATA case reducer for userData', () => {
    state = userDataReducer(
      {
        ...state,
        pseudo: 'bob',
        email: 'bob@bob.com',
        password: 'f4k3password',
        passwordRepeater: 'f4k3password',
        authenticated: true,
      },
      {
        type: 'RESET_USER_DATA',
      },
    );

    expect(state).toEqual({
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    });
  });

  it('default case reducer for userData', () => {
    state = userDataReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
