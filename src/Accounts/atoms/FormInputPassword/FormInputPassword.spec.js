/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import FormInputPassword from './FormInputPassword';

describe('FormInputPassword Snapshot', () => {
  const initialState = {
    userData: {
      password: '',
      passwordRepeater: '',
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormInputPassword with repeater prop false', () => {
    const renderedValue = renderer.create(<FormInputPassword store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of FormInputPassword with repeater prop true', () => {
    const renderedValue = renderer.create(<FormInputPassword repeater store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});


describe('FormInputPassword (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: {
      password: '',
      passwordRepeater: '',
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<FormInputPassword store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('password')).toEqual(initialState.userData.password);
    expect(container.prop('passwordRepeater')).toEqual(initialState.userData.passwordRepeater);
  });
});

describe('FormInputEmail - REACT-REDUX (Mount + wrapping in <Provider>) without repeater prop', () => {
  const initialState = {
    userData: {
      password: '',
      passwordRepeater: '',
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><FormInputPassword /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check onChange in password input', () => {
    const input = wrapper.find('#password');
    expect(input.props().value).toBe(initialState.userData.password);

    const event = { target: { value: 'f4k3pAssw0rd' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_PASSWORD');
    expect(action[0].password).toBe('f4k3pAssw0rd');
  });
});

describe('FormInputEmail - REACT-REDUX (Mount + wrapping in <Provider>) with repeater prop', () => {
  const initialState = {
    userData: {
      password: '',
      passwordRepeater: '',
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><FormInputPassword repeater /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check onChange in password input', () => {
    const input = wrapper.find('#passwordRepeater');
    expect(input.props().value).toBe(initialState.userData.passwordRepeater);

    const event = { target: { value: 'f4k3pAssw0rd' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_PASSWORD_REPEATER');
    expect(action[0].passwordRepeater).toBe('f4k3pAssw0rd');
  });
});
