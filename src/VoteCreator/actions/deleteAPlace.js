import axios from 'axios';

export const deleteAPlaceBegin = () => ({
  type: 'DELETE_A_PLACE_BEGIN',
});

export const deleteAPlaceSuccess = result => ({
  type: 'DELETE_A_PLACE_SUCCESS',
  result,
});

export const deleteAPlaceFailure = error => ({
  type: 'DELETE_A_PLACE_FAILURE',
  error,
});

export function deleteAPlace(voteId, placeId) {
  return (dispatch) => {
    dispatch(deleteAPlaceBegin());
    return (
      axios({
        url: '/api/vote/del/place',
        method: 'post',
        data: {
          vote_id: voteId,
          place_id: placeId,
        }
      })
        .then((result) => {
          dispatch(deleteAPlaceSuccess(result.data));
        })
        .catch(error => dispatch(deleteAPlaceFailure(error)))
    );
  };
}
