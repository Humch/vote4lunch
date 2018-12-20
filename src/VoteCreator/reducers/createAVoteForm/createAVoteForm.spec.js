/* eslint-disable no-undef */
import moment from 'moment';
import 'moment/locale/fr';

import { voteDataFormReducer } from '..';

moment.locale('fr');

describe('Test Accounts Reducers', () => {
  let state;
  const today = moment().format('YYYY-MM-DD');

  beforeEach(() => {
    state = {
      pseudo: '',
      email: '',
      title: '',
      date: today,
      time: '',
      endDate: today,
      endTime: '',
    };
  });

  it('FORM_INPUT_PSEUDO case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_PSEUDO', pseudo: 'bob' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: '',
      title: '',
      date: today,
      time: '',
      endDate: today,
      endTime: '',
    });
  });

  it('FORM_INPUT_EMAIL case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_EMAIL', email: 'bob@bob.com' });
    expect(state).toEqual({
      pseudo: '',
      email: 'bob@bob.com',
      title: '',
      date: today,
      time: '',
      endDate: today,
      endTime: '',
    });
  });

  it('FORM_INPUT_TITLE case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_TITLE', title: 'Ceci est un titre' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      title: 'Ceci est un titre',
      date: today,
      time: '',
      endDate: today,
      endTime: '',
    });
  });

  it('FORM_INPUT_DATE case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_DATE', date: '2018-10-01', time: '12:00' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      title: '',
      date: '2018-10-01',
      time: '12:00',
      endDate: today,
      endTime: '',
    });
  });

  it('FORM_INPUT_END_DATE case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'FORM_INPUT_END_DATE', endDate: '2018-10-01', endTime: '12:00' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      title: '',
      date: today,
      time: '',
      endDate: '2018-10-01',
      endTime: '12:00',
    });
  });

  it('LOGIN_USER_SUCCESS case reducer for voteDataForm', () => {
    state = voteDataFormReducer(
      state,
      {
        type: 'LOGIN_USER_SUCCESS',
        payload: {
          pseudo: 'bob',
          email: 'bob@bob.com',
        }
      }
    );
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: '',
      date: today,
      time: '',
      endDate: today,
      endTime: '',
    });
  });

  it('UPDATE_USER_DATA case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'UPDATE_USER_DATA', pseudo: 'bob', email: 'bob@bob.com' });
    expect(state).toEqual({
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: '',
      date: today,
      time: '',
      endDate: today,
      endTime: '',
    });
  });

  it('RESET_VOTE_DATA case reducer for voteDataForm', () => {
    state = voteDataFormReducer(state, { type: 'RESET_VOTE_DATA' });
    expect(state).toEqual({
      pseudo: '',
      email: '',
      title: '',
      date: today,
      time: '',
      endDate: today,
      endTime: '',
    });
  });

  it('default case reducer for voteDataForm', () => {
    state = voteDataFormReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
