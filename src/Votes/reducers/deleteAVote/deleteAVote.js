const initialState = {
  result: '',
  loading: false,
  error: null,
};

const deleteAVote = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_A_VOTE_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'DELETE_A_VOTE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        result: action.result,
      };
    case 'DELETE_A_VOTE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'DELETE_A_VOTE_INIT':
      return initialState;
    default:
      return state;
  }
};

export default deleteAVote;
