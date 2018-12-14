import axios from 'axios';

export const checkPseudoBegin = () => ({
  type: 'CHECK_PSEUDO_BEGIN',
});

export const checkPseudoSuccess = payload => ({
  type: 'CHECK_PSEUDO_SUCCESS',
  payload,
});

export const checkPseudoFailure = error => ({
  type: 'CHECK_PSEUDO_FAILURE',
  error,
});

export function checkPseudo(pseudo) {
  return (dispatch) => {
    dispatch(checkPseudoBegin());
    const url = `/api/user/exists?pseudo=${pseudo}`;
    return (
      axios.get(url)
        .then(payload => dispatch(checkPseudoSuccess(payload.data)))
        .catch(error => dispatch(checkPseudoFailure(error)))
    );
  };
}
