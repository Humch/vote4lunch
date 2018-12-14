const initialState = {
  id: 0,
  date: null,
  pseudo: '',
  email: '',
  url: '',
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_VOTE_DATA':
      return {
        ...state,
        id: action.id,
        date: action.date,
        pseudo: action.pseudo,
        email: action.email,
        url: action.url
      };
    case 'ADD_A_PLACE_SUCCESS':
    {
      const newPlaces = state.places;
      if (action.result.added) {
        newPlaces.push(action.result.place);
      }
      return {
        ...state,
        places: newPlaces
      };
    }
    case 'DELETE_A_PLACE_SUCCESS':
    {
      const remainPlaces = state.places;
      let result;
      if (action.result.deleted) {
        result = remainPlaces.filter(element => element.id !== action.result.place.id);
      }
      return {
        ...state,
        places: result
      }; }
    case 'RESET_VOTE_DATA':
      return {
        ...state,
        id: 0,
        date: null,
        pseudo: '',
        email: '',
        url: '',
        places: [],
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        pseudo: action.pseudo,
        email: action.email,
      };
    default:
      return state;
  }
};
