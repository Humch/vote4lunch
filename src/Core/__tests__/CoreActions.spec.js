/* eslint-disable no-undef */
import {
  formInputDate,
  formInputEndDate,
  onTopAlert,
  offTopAlert,
} from '../actions';

describe('Test Core Actions', () => {
  it('actionCreator form input date', () => {
    const date = formInputDate('2018-10-01');
    expect(date).toEqual({
      type: 'FORM_INPUT_DATE',
      date: '2018-10-01',
    });
  });

  it('actionCreator form input end date', () => {
    const endDate = formInputEndDate('2018-10-01', '12:00');
    expect(endDate).toEqual({
      type: 'FORM_INPUT_END_DATE',
      endDate: '2018-10-01',
      endTime: '12:00',
    });
  });

  it('actionCreator on top alert', () => {
    const alert = onTopAlert('danger', 'le ciel est rouge !');
    expect(alert).toEqual({
      type: 'ON_TOP_ALERT',
      messageType: 'danger',
      message: 'le ciel est rouge !',
    });
  });

  it('actionCreator off top alert', () => {
    const alert = offTopAlert();
    expect(alert).toEqual({
      type: 'OFF_TOP_ALERT',
    });
  });
});
