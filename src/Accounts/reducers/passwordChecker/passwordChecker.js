const initialState = {
  password: '',
  passwordRepeater: '',
  tooShort: false,
  different: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_INPUT_PASSWORD':
    {
      let passwordTooShort = false;
      if (action.password.length < 6) {
        passwordTooShort = true;
      }
      return {
        ...state,
        password: action.password,
        tooShort: passwordTooShort,
      };
    }
    case 'FORM_INPUT_PASSWORD_REPEATER':
    {
      let passwordTooShort = false;
      if (action.passwordRepeater.length < 6) {
        passwordTooShort = true;
      }
      return {
        ...state,
        passwordRepeater: action.passwordRepeater,
        tooShort: passwordTooShort,
      };
    }
    case 'PASSWORD_TOO_SHORT':
      return {
        ...state,
        tooShort: true,
      };
    case 'RESET_PASSWORD_DATA':
      return {
        ...state,
        password: '',
        passwordRepeater: '',
      };
    case 'RESET_USER_DATA':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
