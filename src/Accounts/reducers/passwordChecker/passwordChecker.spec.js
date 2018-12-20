/* eslint-disable no-undef */
import { passwordCheckerReducer } from '..';

describe('Test passwordChecker reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      password: '',
      passwordRepeater: '',
      tooShort: false,
      different: false,
    };
  });

  it('FORM_INPUT_PASSWORD case reducer for passwordChecker', () => {
    state = passwordCheckerReducer(state, { type: 'FORM_INPUT_PASSWORD', password: 'f4k3password' });
    expect(state).toEqual({
      password: 'f4k3password',
      passwordRepeater: '',
      tooShort: false,
      different: false,
    });
  });

  it('FORM_INPUT_PASSWORD case reducer for passwordChecker with short password', () => {
    state = passwordCheckerReducer(state, { type: 'FORM_INPUT_PASSWORD', password: 'f4k3' });
    expect(state).toEqual({
      password: 'f4k3',
      passwordRepeater: '',
      tooShort: true,
      different: false,
    });
  });

  it('FORM_INPUT_PASSWORD_REPEATER case reducer for passwordChecker', () => {
    state = passwordCheckerReducer(state, { type: 'FORM_INPUT_PASSWORD_REPEATER', passwordRepeater: 'f4k3password' });
    expect(state).toEqual({
      password: '',
      passwordRepeater: 'f4k3password',
      tooShort: false,
      different: false,
    });
  });

  it('FORM_INPUT_PASSWORD_REPEATER case reducer for passwordChecker with short password', () => {
    state = passwordCheckerReducer(state, { type: 'FORM_INPUT_PASSWORD_REPEATER', passwordRepeater: 'f4k3' });
    expect(state).toEqual({
      password: '',
      passwordRepeater: 'f4k3',
      tooShort: true,
      different: false,
    });
  });

  it('PASSWORD_TOO_SHORT case reducer for passwordChecker', () => {
    state = passwordCheckerReducer(
      state,
      {
        type: 'PASSWORD_TOO_SHORT',
      },
    );

    expect(state).toEqual({
      password: '',
      passwordRepeater: '',
      tooShort: true,
      different: false,
    });
  });

  it('RESET_PASSWORD_DATA case reducer for passwordChecker', () => {
    state = passwordCheckerReducer(
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
      password: '',
      passwordRepeater: '',
      tooShort: false,
      different: false,
    });
  });

  it('RESET_USER_DATA case reducer for passwordChecker', () => {
    state = passwordCheckerReducer(
      {
        ...state,
        password: 'f4k3password',
        passwordRepeater: 'f4k3password',
      },
      {
        type: 'RESET_USER_DATA',
      },
    );

    expect(state).toEqual({
      password: '',
      passwordRepeater: '',
      tooShort: false,
      different: false,
    });
  });

  it('default case reducer for passwordChecker', () => {
    state = passwordCheckerReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
