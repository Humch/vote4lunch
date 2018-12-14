/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { BrowserRouter as Router } from 'react-router-dom';

import SignIn from './SignIn';

describe('SignIn Snapshot', () => {
  const initialState = {
    userData: {
      pseudo: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loginError: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of SignIn', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <SignIn />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('SignIn Snapshot with loginError true', () => {
  const initialState = {
    userData: {
      pseudo: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loginError: true,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of SignIn with loginError true', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <SignIn />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('SignIn (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: {
      pseudo: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loginError: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<SignIn store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});

describe('SignIn - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      pseudo: 'bob',
      password: 'f4k3password',
      passwordRepeater: '',
      authenticated: false,
      loginError: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();

    wrapper = mount(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check if form is submit', () => {
    const signUpForm = wrapper.find('form');
    signUpForm.simulate('submit', { preventDefault: jest.fn() });
    const action = store.getActions();

    expect(action[0].type).toBe('LOGIN_USER_BEGIN');
  });
});

describe('SignIn - REACT-REDUX (Mount + wrapping in <Provider>) - test Redirect', () => {
  const initialState = {
    userData: {
      pseudo: 'bob',
      password: 'f4k3password',
      passwordRepeater: '',
      authenticated: true,
      loginError: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();

    wrapper = mount(
      <Router>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </Router>
    );
  });

  it('render the connected(SMART) component', () => {
    const redirect = wrapper.find('Redirect');

    expect(redirect.length).toEqual(1);
    expect(wrapper.length).toEqual(1);
  });
});
