import axios from 'axios';

export const getPlacesListBegin = () => ({
  type: 'GET_PLACES_LIST_BEGIN',
});

export const getPlacesListSuccess = result => ({
  type: 'GET_PLACES_LIST_SUCCESS',
  result,
});

export const getPlacesListFailure = error => ({
  type: 'GET_PLACES_LIST_FAILURE',
  error,
});

export function getPlacesList(voteUrl) {
  return (dispatch) => {
    dispatch(getPlacesListBegin());
    return (
      axios({
        url: '/api/vote/get/places/list',
        method: 'post',
        data: {
          vote_url: voteUrl,
        }
      })
        .then((result) => {
          dispatch(getPlacesListSuccess({ [voteUrl]: result.data }));
        })
        .catch(error => dispatch(getPlacesListFailure(error)))
    );
  };
}
