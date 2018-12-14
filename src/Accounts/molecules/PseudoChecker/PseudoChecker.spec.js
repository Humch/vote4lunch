/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import PseudoChecker from './PseudoChecker';

describe('PseudoChecker Snapshot', () => {
  const initialState = {
    pseudoChecker: {
      payload: { exist: false },
      loading: false,
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of PseudoChecker', () => {
    const renderedValue = renderer.create(<PseudoChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('PseudoChecker Snapshot', () => {
  const initialState = {
    pseudoChecker: {
      payload: { exist: false },
      loading: true,
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of PseudoChecker with loading', () => {
    const renderedValue = renderer.create(<PseudoChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('PseudoChecker Snapshot', () => {
  const initialState = {
    pseudoChecker: {
      payload: { exist: true },
      loading: false,
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of PseudoChecker with exist true', () => {
    const renderedValue = renderer.create(<PseudoChecker store={store} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
