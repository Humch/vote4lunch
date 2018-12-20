/* eslint-disable no-undef */
import resetPasswordData from './resetPasswordData';

describe('Test Accounts resetPasswordData action', () => {
  it('actionCreator reset password data', () => {
    const data = resetPasswordData();
    expect(data).toEqual({ type: 'RESET_PASSWORD_DATA' });
  });
});
