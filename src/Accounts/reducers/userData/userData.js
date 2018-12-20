const getPseudo = localStorage.getItem('pseudo');
const getEmail = localStorage.getItem('email');

const initialState = {
  pseudo: getPseudo || '',
  email: getEmail || '',
  password: '',
  passwordRepeater: '',
  authenticated: false,
  loading: false,
  loginError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        pseudo: action.pseudo,
        email: action.email,
        authenticated: action.authenticated,
      };
    case 'FORM_INPUT_PSEUDO':
      return {
        ...state,
        pseudo: action.pseudo,
      };
    case 'FORM_INPUT_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'FORM_INPUT_PASSWORD':
      return {
        ...state,
        password: action.password,
      };
    case 'FORM_INPUT_PASSWORD_REPEATER':
      return {
        ...state,
        passwordRepeater: action.passwordRepeater,
      };
    case 'RESET_VOTE_DATA':
      return {
        ...state,
        pseudo: '',
        email: '',
        authenticated: false,
      };
    case 'LOGIN_USER_BEGIN':
      return {
        ...state,
        loading: true,
        loginError: false,
      };
    case 'LOGIN_USER_SUCCESS':
      localStorage.setItem('pseudo', action.payload.pseudo);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('authenticated', JSON.stringify(true));
      return {
        ...state,
        loading: false,
        pseudo: action.payload.pseudo,
        email: action.payload.email,
        authenticated: true,
      };
    case 'LOGIN_USER_FAILURE':
      return {
        ...state,
        loading: false,
        loginError: true,
      };
    case 'RESET_LOGIN_FAILURE':
      return {
        ...state,
        loginError: false,
      };
    case 'RESET_PASSWORD_DATA':
      return {
        ...state,
        pseudo: '',
        email: '',
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
