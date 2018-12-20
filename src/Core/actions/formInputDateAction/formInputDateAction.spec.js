/* eslint-disable no-undef */
import formInputDate from './formInputDateAction';

describe('Test Core formInputDate Action', () => {
  it('actionCreator form input date', () => {
    const date = formInputDate('2018-10-01', '12:00');
    expect(date).toEqual({
      type: 'FORM_INPUT_DATE',
      date: '2018-10-01',
      time: '12:00'
    });
  });
});
