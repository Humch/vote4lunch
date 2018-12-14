/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { FormInputEmail } from '../..';

import { formInputEmail } from '../../actions';

describe('FormInputEmail Snapshot', () => {
  const initialState = {
    userData: {
      email: 'bob@bob.com'
    },
    emailChecker: {
      payload: {
        exist: false,
      },
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormInputEmail', () => {
    const renderedValue = renderer.create(<FormInputEmail store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});


describe('FormInputEmail (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: {
      email: 'bob@bob.com'
    },
    emailChecker: {
      payload: {
        exist: false,
      },
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<FormInputEmail store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('email')).toEqual(initialState.userData.email);
  });
});

describe('FormInputEmail - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      email: 'bob@bob.com'
    },
    emailChecker: {
      payload: {
        exist: false,
      },
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><FormInputEmail /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check action on dispatching', () => {
    store.dispatch(formInputEmail('bob@bob.com'));
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_EMAIL');
    expect(action[0].email).toBe(initialState.userData.email);
  });

  it('check onChange in email input', () => {
    const input = wrapper.find('#email');
    expect(input.props().value).toBe(initialState.userData.email);

    const event = { target: { value: 'roger@roger.com' } };
    input.props().onChange(event);
    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_EMAIL');
    expect(action[0].email).toBe('roger@roger.com');
  });
});
