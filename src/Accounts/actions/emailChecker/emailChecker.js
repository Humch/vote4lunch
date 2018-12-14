import axios from 'axios';

export const checkEmailBegin = () => ({
  type: 'CHECK_EMAIL_BEGIN',
});

export const checkEmailSuccess = payload => ({
  type: 'CHECK_EMAIL_SUCCESS',
  payload,
});

export const checkEmailFailure = error => ({
  type: 'CHECK_EMAIL_FAILURE',
  error,
});

export function checkEmail(email) {
  return (dispatch) => {
    dispatch(checkEmailBegin());
    const url = `/api/user/exists?email=${email}`;
    return (
      axios.get(url)
        .then(payload => dispatch(checkEmailSuccess(payload.data)))
        .catch(error => dispatch(checkEmailFailure(error)))
    );
  };
}
