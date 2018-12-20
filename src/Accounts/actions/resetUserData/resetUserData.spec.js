/* eslint-disable no-undef */
import resetUserData from './resetUserData';

describe('Test Accounts resetUserData action', () => {
  it('actionCreator reset user data', () => {
    const data = resetUserData();
    expect(data).toEqual({ type: 'RESET_USER_DATA' });
  });
});
