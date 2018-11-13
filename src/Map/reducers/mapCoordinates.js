const initialState = {
  positionLatitude: 44.833,
  positionLongitude: -0.59,
  zoomLevel: 12,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MAP_COORDINATES':
      return {
        ...state,
        positionLatitude: action.positionLatitude,
        positionLongitude: action.positionLongitude,
        zoomLevel: action.zoomLevel,
      };
    case 'UPDATE_ZOOM_LEVEL':
      return {
        ...state,
        zoomLevel: action.zoomLevel,
      };
    default:
      return state;
  }
};
