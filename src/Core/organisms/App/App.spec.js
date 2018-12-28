/* eslint-disable no-undef */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import { App } from '../..';

describe('App', () => {
  it('should render a App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });
});

describe('App - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      pseudo: '',
      authenticated: false,
    },
    topAlert: {
      messageType: '',
      status: false,
      message: '',
    }
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render a App with Router', () => {
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    expect(wrapper.length).toEqual(1);
  });
});
