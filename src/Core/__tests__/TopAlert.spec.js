/* eslint-disable no-undef */
import React from 'react';
// import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { TopAlert } from '..';


describe('TopAlert Snapshot', () => {
  const initialState = {
    topAlert: {
      messageType: 'success',
      status: true,
      message: 'Ceci est un test'
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of TopAlert', () => {
    const renderedValue = renderer.create(
      <TopAlert
        store={store}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
  it('capturing Snapshot of TopAlert with messageType is danger', () => {
    initialState.topAlert.messageType = 'danger';
    const renderedValue = renderer.create(
      <TopAlert
        store={store}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
