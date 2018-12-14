const initialState = {
  payload: { exist: false },
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_PSEUDO_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'CHECK_PSEUDO_SUCCESS':
      return {
        loading: false,
        error: null,
        payload: action.payload,
      };
    case 'CHECK_PSEUDO_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
