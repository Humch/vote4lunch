export default (password, passwordRepeater) => ({
  type: 'RESET_PASSWORD_DATA',
  password,
  passwordRepeater,
});
