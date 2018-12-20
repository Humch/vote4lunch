/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';

import configureStore from 'redux-mock-store';

import FormGoupPassword from './FormGroupPassword';

describe('FormGoupPassword Snapshot', () => {
  const initialState = {
    userData: {
      password: '',
      passwordRepeater: '',
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const text = 'le super label';
  const forProp = 'password';
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormGoupPassword', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <FormGoupPassword
          text={text}
          forProp={forProp}
        />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormGoupPassword Snapshot', () => {
  const initialState = {
    userData: {
      password: 'f4k3password',
      passwordRepeater: 'f4k3password',
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const text = 'le super label';
  const forProp = 'password';
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormGoupPassword with password and passwordRepeater equals', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <FormGoupPassword
          text={text}
          forProp={forProp}
        />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormGoupPassword Snapshot', () => {
  const initialState = {
    userData: {
      password: 'f4k3password',
      passwordRepeater: 'f4k3',
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const text = 'le super label';
  const forProp = 'password';
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormGoupPassword with password and passwordRepeater differents', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <FormGoupPassword
          text={text}
          forProp={forProp}
        />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
