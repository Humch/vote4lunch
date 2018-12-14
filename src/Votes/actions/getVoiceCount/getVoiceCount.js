import axios from 'axios';

export const getVoiceCountBegin = () => ({
  type: 'GET_VOICE_COUNT_BEGIN',
});

export const getVoiceCountSuccess = (count, voteId, placeId) => ({
  type: 'GET_VOICE_COUNT_SUCCESS',
  count,
  voteId,
  placeId,
});

export const getVoiceCountFailure = error => ({
  type: 'GET_VOICE_COUNT_FAILURE',
  error,
});

export function getVoiceCount(voteUrl, placeId) {
  return (dispatch) => {
    dispatch(getVoiceCountBegin());
    return (
      axios
        .get(`/api/vote/get?vote_url=${voteUrl}`)
        .then((vote) => {
          const url = `/api/voice/count/all?vote_id=${vote.data.id}&place_id=${placeId}`;
          return axios
            .get(url)
            .then(result => ({ count: result.data.count, vote_id: vote.data.id }));
        })
        .then((result) => {
          dispatch(getVoiceCountSuccess(result.count, result.vote_id, placeId));
        })
        .catch(error => dispatch(getVoiceCountFailure(error)))
    );
  };
}
