import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

const getPseudo = localStorage.getItem('pseudo');
const getEmail = localStorage.getItem('email');

const initialState = {
  pseudo: getPseudo || '',
  email: getEmail || '',
  title: '',
  date: moment().format('YYYY-MM-DD'),
  time: '',
  endDate: moment().format('YYYY-MM-DD'),
  endTime: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_INPUT_PSEUDO':
      return {
        ...state,
        pseudo: action.pseudo
      };
    case 'FORM_INPUT_EMAIL':
      return {
        ...state,
        email: action.email
      };
    case 'FORM_INPUT_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'FORM_INPUT_DATE':
      return {
        ...state,
        date: action.date,
        time: action.time,
      };
    case 'FORM_INPUT_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
        endTime: action.endTime
      };
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        pseudo: action.payload.pseudo,
        email: action.payload.email,
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        pseudo: action.pseudo,
        email: action.email,
      };
    case 'RESET_VOTE_DATA':
      return {
        ...initialState
      };
    default:
      return state;
  }
};
