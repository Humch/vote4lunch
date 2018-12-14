/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { LogoutView } from '../..';

describe('LogoutView Snapshot', () => {
  const initialState = { };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of LogoutView', () => {
    const renderedValue = renderer.create(<Router><LogoutView store={store} /></Router>).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
