import axios from 'axios';

export const addUserBegin = () => ({
  type: 'ADD_USER_BEGIN',
});

export const addUserSuccess = payload => ({
  type: 'ADD_USER_SUCCESS',
  payload,
});

export const addUserFailure = error => ({
  type: 'ADD_USER_FAILURE',
  error,
});

export function addUser(pseudo, email, password, passwordRepeater) {
  return (dispatch) => {
    dispatch(addUserBegin());
    return (
      axios({
        url: '/api/user/add',
        method: 'post',
        data: {
          pseudo,
          email,
          password,
          password_repeat: passwordRepeater
        }
      })
        .then(payload => dispatch(addUserSuccess(payload.data)))
        .catch(error => dispatch(addUserFailure(error)))
    );
  };
}
