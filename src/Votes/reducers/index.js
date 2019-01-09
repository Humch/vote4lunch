import { combineReducers } from 'redux';

import addVoiceReducer from './addVoice/addVoice';
import deleteAVoteReducer from './deleteAVote/deleteAVote';
import getAllVoicesForAVoteReducer from './getAllVoicesForAVote/getAllVoicesForAVote';
import getAVoteReducer from './getAVote/getAVote';
import getManyPlacesListReducer from './getManyPlacesList/getManyPlacesList';
import getPlacesListReducer from './getPlacesList/getPlacesList';
import getUsersVotesReducer from './getUsersVotes/getUsersVotes';
import getUserVoicesReducer from './getUserVoices/getUserVoices';
import getVoicesCountReducer from './getVoicesCount/getVoicesCount';
import toggleSideButtonBarInfo from './toggleSideButtonBarInfo';


export default combineReducers({
  sideButtonBarInfo: toggleSideButtonBarInfo,
});

export {
  addVoiceReducer,
  deleteAVoteReducer,
  getAllVoicesForAVoteReducer,
  getAVoteReducer,
  getManyPlacesListReducer,
  getPlacesListReducer,
  getUsersVotesReducer,
  getUserVoicesReducer,
  getVoicesCountReducer,
};
