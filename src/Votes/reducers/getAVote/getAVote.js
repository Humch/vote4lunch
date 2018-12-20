const initialState = {
  id: 0,
  pseudo: '',
  email: '',
  date: '',
  end_date: '',
  url: '',
  active: false,
  loading: false,
  error: null,
};

const getAvote = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_A_VOTE_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_A_VOTE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        id: action.result.id,
        pseudo: action.result.user.pseudo,
        email: action.result.user.email,
        title: action.result.title,
        date: action.result.date,
        end_date: action.result.end_date,
        url: action.result.url,
        active: action.result.active,
      };
    case 'GET_A_VOTE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default getAvote;
