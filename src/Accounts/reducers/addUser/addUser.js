const initialState = {
  payload: { created: false },
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_USER_SUCCESS':
      return {
        loading: false,
        error: null,
        payload: action.payload,
      };
    case 'ADD_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
