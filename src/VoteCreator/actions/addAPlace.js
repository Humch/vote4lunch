import axios from 'axios';

export const addAPlaceBegin = () => ({
  type: 'ADD_A_PLACE_BEGIN',
});

export const addAPlaceSuccess = result => ({
  type: 'ADD_A_PLACE_SUCCESS',
  result,
});

export const addAPlaceFailure = error => ({
  type: 'ADD_A_PLACE_FAILURE',
  error,
});

export function addAPlace(voteId, placeId) {
  return (dispatch) => {
    dispatch(addAPlaceBegin());
    return (
      axios({
        url: '/api/vote/add/place',
        method: 'post',
        data: {
          vote_id: voteId,
          place_id: placeId,
        }
      })
        .then(result => dispatch(addAPlaceSuccess(result.data)))
        .catch(error => dispatch(addAPlaceFailure(error)))
    );
  };
}
