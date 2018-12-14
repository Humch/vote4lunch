const initialState = {
  result: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_VOICES_FOR_VOTES_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ALL_VOICES_FOR_VOTES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        result: action.result,
      };
    case 'GET_ALL_VOICES_FOR_VOTES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
