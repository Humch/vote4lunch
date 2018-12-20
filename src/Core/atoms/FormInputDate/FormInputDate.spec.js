/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { FormInputDate } from '../..';

import { formInputDate } from '../../actions';

describe('FormInputDate Snapshot', () => {
  const initialState = {
    voteDataForm: {
      date: '2018-10-01',
      time: '',
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormInputDate', () => {
    const renderedValue = renderer.create(<FormInputDate store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormInputDate (Shallow + passing the {store} directly)', () => {
  const initialState = {
    voteDataForm: {
      date: '2018-10-01',
      time: '',
    }
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<FormInputDate store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('date')).toEqual(initialState.voteDataForm.date);
    expect(container.prop('time')).toEqual(initialState.voteDataForm.time);
  });
});

describe('FormInputDate - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    voteDataForm: {
      date: '2018-10-01',
      time: '12:00',
    }
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><FormInputDate /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check action on dispatching', () => {
    store.dispatch(formInputDate('2018-10-01', '12:00'));
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_DATE');
    expect(action[0].date).toBe(initialState.voteDataForm.date);
    expect(action[0].time).toBe(initialState.voteDataForm.time);
  });

  it('check onChange in date input', () => {
    const input = wrapper.find('#date');
    expect(input.props().value).toBe(initialState.voteDataForm.date);

    const event = { target: { value: '2018-01-05' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_DATE');
    expect(action[0].date).toBe('2018-01-05');
  });

  it('check onChange in time input', () => {
    const input = wrapper.find('#time');
    expect(input.props().value).toBe(initialState.voteDataForm.time);

    const event = { target: { value: '15:00' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_DATE');
    expect(action[0].time).toBe('15:00');
  });
});
