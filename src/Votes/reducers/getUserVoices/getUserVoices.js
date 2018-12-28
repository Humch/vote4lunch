const initialState = {
  result: [],
  loading: false,
  error: null,
};

const userVoices = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_VOICES_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_USER_VOICES_SUCCESS':
    {
      return {
        ...state,
        loading: false,
        error: null,
        result: [...action.result],
      };
    }
    case 'GET_USER_VOICES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'RESET_VOTE_DATA':
      return {
        ...state,
        result: [],
      };
    default:
      return state;
  }
};

export default userVoices;
