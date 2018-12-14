/* eslint-disable no-undef */
import topAlertReducer from '..';

describe('Test Core Reducers', () => {
  let state;

  beforeEach(() => {
    state = {
      status: false,
      message: '',
      messageType: '',
    };
  });

  it('ON_TOP_ALERT case reducer for topAlert', () => {
    state = topAlertReducer(state, { type: 'ON_TOP_ALERT', messageType: 'danger', message: 'le ciel est rouge !' });
    expect(state).toEqual({ status: true, messageType: 'danger', message: 'le ciel est rouge !' });
  });

  it('OFF_TOP_ALERT case reducer for topAlert', () => {
    state = topAlertReducer(state, { type: 'OFF_TOP_ALERT' });
    expect(state).toEqual({ status: false, messageType: '', message: '' });
  });

  it('default case reducer for topAlert', () => {
    state = topAlertReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
