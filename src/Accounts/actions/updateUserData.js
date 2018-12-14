export default (pseudo, email, authenticated) => ({
  type: 'UPDATE_USER_DATA',
  pseudo,
  email,
  authenticated,
});
