const initialState = {
  payload: { exist: false },
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_EMAIL_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'CHECK_EMAIL_SUCCESS':
      return {
        loading: false,
        error: null,
        payload: action.payload,
      };
    case 'CHECK_EMAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
