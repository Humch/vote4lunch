import { combineReducers } from 'redux';

import {
  addUserReducer,
  emailCheckerReducer,
  pseudoCheckerReducer,
  userDataReducer,
} from './Accounts/reducers';
import topAlertReducer from './Core/reducers';
import { listOfRestaurantsReducer, mapCoordinatesReducer, onMapAlertReducer } from './Map/reducers';
import { createAVoteReducer, voteDataFormReducer, voteDataReducer } from './VoteCreator/reducers';
import {
  addVoiceReducer,
  deleteAVoteReducer,
  getAllVoicesForAVoteReducer,
  getAVoteReducer,
  getManyPlacesListReducer,
  getPlacesListReducer,
  getUsersVotesReducer,
  getUserVoicesReducer,
  getVoicesCountReducer,
} from './Votes/reducers';

export default combineReducers({
  restaurants: listOfRestaurantsReducer,
  mapCoordinates: mapCoordinatesReducer,
  vote: createAVoteReducer,
  delVote: deleteAVoteReducer,
  voteData: voteDataReducer,
  onMapAlert: onMapAlertReducer,
  topAlert: topAlertReducer,
  getPlacesList: getPlacesListReducer,
  getVoicesCount: getVoicesCountReducer,
  addVoice: addVoiceReducer,
  usersVotes: getUsersVotesReducer,
  userVoices: getUserVoicesReducer,
  getManyPlacesList: getManyPlacesListReducer,
  addUser: addUserReducer,
  pseudoChecker: pseudoCheckerReducer,
  emailChecker: emailCheckerReducer,
  userData: userDataReducer,
  voteDataForm: voteDataFormReducer,
  getAVote: getAVoteReducer,
  allVoicesForAVote: getAllVoicesForAVoteReducer,
});
