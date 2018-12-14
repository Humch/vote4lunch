import axios from 'axios';

export const getAVoteBegin = () => ({
  type: 'GET_A_VOTE_BEGIN',
});

export const getAVoteSuccess = result => ({
  type: 'GET_A_VOTE_SUCCESS',
  result,
});

export const getAVoteFailure = error => ({
  type: 'GET_A_VOTE_FAILURE',
  error,
});

export function getAVote(voteUrl) {
  return (dispatch) => {
    dispatch(getAVoteBegin());
    return (
      axios
        .get(`/api/vote/get?vote_url=${voteUrl}`)
        .then((vote) => {
          dispatch(getAVoteSuccess(vote.data));
        })
        .catch(error => dispatch(getAVoteFailure(error)))
    );
  };
}
