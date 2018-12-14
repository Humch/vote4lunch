const voicescount = (state = [], action) => {
  switch (action.type) {
    case 'GET_VOICE_COUNT_SUCCESS':
    {
      const newCount = { count: action.count, voteId: action.voteId, place: action.placeId };

      const newState = [...state];
      if (!newState.some(e => e.voteId === action.voteId && e.place === action.placeId)) {
        newState.push(newCount);
      } else {
        newState.map((e) => {
          if (e.place === action.placeId && e.voteId === action.voteId) {
            e.count = action.count;
          }
          return e;
        });
      }
      return [...newState];
    }
    default:
      return state;
  }
};

export default voicescount;
