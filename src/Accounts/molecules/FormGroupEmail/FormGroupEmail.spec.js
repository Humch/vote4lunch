/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';

import renderer from 'react-test-renderer';

import configureStore from 'redux-mock-store';

import FormGroupEmail from './FormGroupEmail';

describe('FormGroupEmail Snapshot', () => {
  const initialState = {
    userData: {
      email: '',
    },
    emailChecker: {
      payload: {
        exist: false,
      },
    },
  };
  const text = 'le super label';
  const forProp = 'email';
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormGroupEmail', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <FormGroupEmail
          text={text}
          forProp={forProp}
        />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormGoupEmail Snapshot', () => {
  const initialState = {
    userData: {
      email: 'bob@bob.com',
    },
    emailChecker: {
      payload: { exist: false },
      loading: false,
    }
  };
  const text = 'le super label';
  const forProp = 'email';
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormGroupEmail with email', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <FormGroupEmail
          text={text}
          forProp={forProp}
        />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormGroupEmail - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      email: '',
    },
    emailChecker: {
      payload: {
        exist: false,
      },
    },
  };
  const text = 'le super label';
  const forProp = 'email';
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('render the connected(SMART) component', () => {
    wrapper = mount(
      <Provider store={store}>
        <FormGroupEmail
          text={text}
          forProp={forProp}
        />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('expect the input have is-invalid className', () => {
    initialState.emailChecker.payload.exist = true;
    wrapper = mount(
      <Provider store={store}>
        <FormGroupEmail
          text={text}
          forProp={forProp}
        />
      </Provider>
    );
    const input = wrapper.find('input');

    expect(input.hasClass('is-invalid')).toBe(true);
  });
});
