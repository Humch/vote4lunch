const initialState = {
  status: false,
  message: '',
  messageType: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ON_MAP_ALERT':
      return { ...state, messageType: action.messageType, status: true, message: action.message };
    case 'OFF_MAP_ALERT':
      return { ...state, status: false };

    default:
      return state;
  }
};
