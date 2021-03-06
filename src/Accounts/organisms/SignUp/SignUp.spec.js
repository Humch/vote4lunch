/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { BrowserRouter as Router } from 'react-router-dom';

import SignUp from './SignUp';

describe('SignUp Snapshot', () => {
  const initialState = {
    userData: {
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    },
    addUser: {
      payload: {
        created: false,
      },
      loading: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    emailChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of SignUp', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <SignUp />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('SignUp Snapshot with loading', () => {
  const initialState = {
    userData: {
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    },
    addUser: {
      payload: {
        created: false,
      },
      loading: true,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    emailChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of SignUp with loading', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <SignUp />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('SignUp Snapshot with user created', () => {
  const initialState = {
    userData: {
      pseudo: '',
      email: '',
      password: '',
      passwordRepeater: '',
      authenticated: false,
      loading: false,
      loginError: false,
    },
    addUser: {
      payload: {
        created: true,
      },
      loading: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    emailChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of SignUp with user created', () => {
    const renderedValue = renderer.create(
      <Router>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </Router>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('SignUp (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: {
      pseudo: 'mickey',
      email: 'mickey@mou.se',
      password: 'dingolefoldingo',
      passwordRepeater: 'dingolefoldingo',
      authenticated: false,
      loading: false,
      loginError: false,
    },
    addUser: {
      payload: {
        created: false,
      },
      loading: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    emailChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    passwordChecker: {
      tooShort: false,
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<SignUp store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('payload')).toEqual(initialState.addUser.payload);
  });
});

describe('SignUp - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      pseudo: 'mickey',
      email: 'mickey@mou.se',
      password: 'dingolefoldingo',
      passwordRepeater: 'dingolefoldingo',
      authenticated: false,
      loading: false,
      loginError: false,
    },
    addUser: {
      payload: {
        created: false,
      },
      loading: false,
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    emailChecker: {
      payload: {
        exist: false,
      },
      loading: false,
    },
    passwordChecker: {
      tooShort: false,
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
        <SignUp />
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

    expect(action[0].type).toBe('ADD_USER_BEGIN');
  });
});
