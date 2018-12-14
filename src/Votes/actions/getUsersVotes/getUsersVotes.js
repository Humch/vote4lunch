import axios from 'axios';

export const getUsersVotesBegin = () => ({
  type: 'GET_USERS_VOTES_BEGIN',
});

export const getUsersVotesSuccess = votes => ({
  type: 'GET_USERS_VOTES_SUCCESS',
  votes,
});

export const getUsersVotesFailure = error => ({
  type: 'GET_USERS_VOTES_FAILURE',
  error,
});

export function getUsersVotes(pseudo) {
  return (dispatch) => {
    dispatch(getUsersVotesBegin());
    return (
      axios
        .get(`/api/vote/get/mine?pseudo=${pseudo}`)
        .then((votes) => {
          dispatch(getUsersVotesSuccess(votes.data));
        })
        .catch(error => dispatch(getUsersVotesFailure(error)))
    );
  };
}
