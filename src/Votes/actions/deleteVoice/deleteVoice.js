import axios from 'axios';
import { getVoiceCount, getUserVoices, getAllVoicesForAVote } from '..';

export const deleteVoiceBegin = () => ({
  type: 'DELETE_VOICE_BEGIN',
});

export const deleteVoiceSuccess = result => ({
  type: 'DELETE_VOICE_SUCCESS',
  result,
});

export const deleteVoiceFailure = error => ({
  type: 'DELETE_VOICE_FAILURE',
  error,
});

export function deleteVoice(voteUrl, placeId, pseudo, email) {
  return (dispatch) => {
    dispatch(deleteVoiceBegin());
    return (
      axios({
        url: '/api/voice/delete',
        method: 'post',
        data: {
          vote_url: voteUrl,
          place_id: placeId,
          pseudo,
          email,
        }
      })
        .then((result) => {
          dispatch(deleteVoiceSuccess(result.data));
          dispatch(getVoiceCount(voteUrl, placeId));
          dispatch(getUserVoices(pseudo, email, [voteUrl]));
          dispatch(getAllVoicesForAVote(voteUrl));
        })
        .catch(error => dispatch(deleteVoiceFailure(error)))
    );
  };
}
