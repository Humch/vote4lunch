/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { FormInputPseudo } from '..';

import { formInputPseudo } from '../actions';

describe('FormInputPseudo Snapshot', () => {
  const initialState = { voteDataForm: { pseudo: 'bob' } };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormInputPseudo', () => {
    const renderedValue = renderer.create(<FormInputPseudo store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});


describe('FormInputPseudo (Shallow + passing the {store} directly)', () => {
  const initialState = { voteDataForm: { pseudo: 'bob' } };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<FormInputPseudo store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('pseudo')).toEqual(initialState.voteDataForm.pseudo);
  });
});

describe('FormInputPseudo - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = { voteDataForm: { pseudo: 'bob' } };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><FormInputPseudo /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check action on dispatching', () => {
    store.dispatch(formInputPseudo('bob'));
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_PSEUDO');
    expect(action[0].pseudo).toBe(initialState.voteDataForm.pseudo);
  });

  it('check onChange in pseudo input', () => {
    const input = wrapper.find('#pseudo');
    expect(input.props().value).toBe(initialState.voteDataForm.pseudo);

    const event = { target: { value: 'roger' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_PSEUDO');
    expect(action[0].pseudo).toBe('roger');
  });
});
