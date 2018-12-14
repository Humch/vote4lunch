/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

// mock browser local storage
import LS from '../../../../__mocks__/localStorage';

import BeginVote from './BeginVote';

describe('BeginVote Snapshot', () => {
  const initialState = {
    userData: {
      authenticated: false,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    LS.window.localStorage.clear();
  });

  it('capturing Snapshot of BeginVote, user is not logged in', () => {
    const renderedValue = renderer.create(
      <Router>
        <Provider store={store}>
          <BeginVote />
        </Provider>
      </Router>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of BeginVote, user is logged in', () => {
    LS.window.localStorage.setItem('pseudo', 'bob');
    LS.window.localStorage.setItem('email', 'bob@bob.com');
    LS.window.localStorage.setItem('authenticated', 'true');

    const renderedValue = renderer.create(
      <Router>
        <Provider store={store}>
          <BeginVote />
        </Provider>
      </Router>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('Beginvote (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: {
      authenticated: false,
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<BeginVote store={store} />);
  });

  afterEach(() => {
    LS.window.localStorage.clear();
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('authenticated')).toEqual(initialState.userData.authenticated);
  });
});

describe('Beginvote REACT-REDUX (Mount + wrapping in <Provider>) - user is logged in', () => {
  const initialState = {
    userData: {
      authenticated: true,
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Router>
        <Provider store={store}>
          <BeginVote />
        </Provider>
      </Router>
    );
  });

  afterEach(() => {
    LS.window.localStorage.clear();
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
