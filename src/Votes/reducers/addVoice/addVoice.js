const initialState = {
  result: '',
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VOICE_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_VOICE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        result: action.result,
      };
    case 'ADD_VOICE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
