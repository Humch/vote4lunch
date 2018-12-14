const initialState = {
  result: {},
  loading: false,
  error: null,
};

const getPlacesList = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLACES_LIST_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_PLACES_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        result: action.result,
      };
    case 'GET_PLACES_LIST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default getPlacesList;
