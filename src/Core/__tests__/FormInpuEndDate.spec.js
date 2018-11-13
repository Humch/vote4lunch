/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { FormInputEndDate } from '..';

import { formInputEndDate } from '../actions';

describe('FormInputEndDate Snapshot', () => {
  const initialState = { voteDataForm: { endDate: '2018-10-01', endTime: '12:00' } };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormInputEndDate', () => {
    const renderedValue = renderer.create(<FormInputEndDate store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormInputEndDate (Shallow + passing the {store} directly)', () => {
  const initialState = { voteDataForm: { endDate: '2018-10-01', endTime: '12:00' } };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<FormInputEndDate store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('endDate')).toEqual(initialState.voteDataForm.endDate);
    expect(container.prop('endTime')).toEqual(initialState.voteDataForm.endTime);
  });
});

describe('FormInputEndDate - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = { voteDataForm: { endDate: '2018-10-01', endTime: '12:00' } };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><FormInputEndDate /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check action on dispatching', () => {
    store.dispatch(formInputEndDate('2018-10-01', '12:00'));
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_END_DATE');
    expect(action[0].endDate).toBe(initialState.voteDataForm.endDate);
    expect(action[0].endTime).toBe(initialState.voteDataForm.endTime);
  });

  it('check onChange in endDate input', () => {
    const input = wrapper.find('#endDate');
    expect(input.props().value).toBe(initialState.voteDataForm.endDate);

    const event = { target: { value: '2018-01-05' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_END_DATE');
    expect(action[0].endDate).toBe('2018-01-05');
    expect(action[0].endTime).toBe('12:00');
  });

  it('check onChange in endTime input', () => {
    const input = wrapper.find('#endTime');
    expect(input.props().value).toBe(initialState.voteDataForm.endTime);

    const event = { target: { value: '15:00' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_END_DATE');
    expect(action[0].endDate).toBe('2018-10-01');
    expect(action[0].endTime).toBe('15:00');
  });
});
