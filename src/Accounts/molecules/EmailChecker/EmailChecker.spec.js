/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import EmailChecker from './EmailChecker';

describe('EmailChecker Snapshot', () => {
  const initialState = {
    emailChecker: {
      payload: { exist: false },
      loading: false,
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of EmailChecker', () => {
    const renderedValue = renderer.create(<EmailChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('EmailChecker Snapshot', () => {
  const initialState = {
    emailChecker: {
      payload: { exist: false },
      loading: true,
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of EmailChecker with loading', () => {
    const renderedValue = renderer.create(<EmailChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('EmailChecker Snapshot', () => {
  const initialState = {
    emailChecker: {
      payload: { exist: true },
      loading: false,
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of EmailChecker with exist true', () => {
    const renderedValue = renderer.create(<EmailChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
