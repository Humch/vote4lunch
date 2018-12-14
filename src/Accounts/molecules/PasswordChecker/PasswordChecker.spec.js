/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import PasswordChecker from './PasswordChecker';

describe('PasswordChecker Snapshot', () => {
  const initialState = {
    userData: {
      password: '',
      passwordRepeater: '',
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of PasswordChecker with passwords equals', () => {
    const renderedValue = renderer.create(<PasswordChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('PasswordChecker Snapshot', () => {
  const initialState = {
    userData: {
      password: '',
      passwordRepeater: 'f4k3',
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of PasswordChecker with different passwords', () => {
    const renderedValue = renderer.create(<PasswordChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
