/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { BrowserRouter as Router } from 'react-router-dom';

// mock browser local storage
import LS from '../../../../__mocks__/localStorage';

import Header from './Header';


describe('Header Snapshot, screen larger than 768px', () => {
  const initialState = {
    userData: {
      authenticated: false,
      pseudo: '',
    },
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

  afterEach(() => {
    LS.window.localStorage.clear();
  });

  it('capturing Snapshot of Header, user is not logged in, screen larger than 768px', () => {
    const renderedValue = renderer.create(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of Header with pseudo and email, screen larger than 768px', () => {
    LS.window.localStorage.setItem('pseudo', 'bob');
    LS.window.localStorage.setItem('email', 'bob@bob.com');

    const div = document.createElement('div');
    div.setAttribute('id', 'TooltipMyVotes');
    document.body.appendChild(div);

    const renderedValue = renderer.create(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('Header Snapshot, screen smaller than 768px', () => {
  const initialState = {
    userData: {
      authenticated: false,
      pseudo: '',
    },
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
    window.innerWidth = 767;
  });

  afterEach(() => {
    LS.window.localStorage.clear();
  });

  it('capturing Snapshot of Header, user is not logged in, screen smaller than 768px', () => {
    const renderedValue = renderer.create(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of Header with pseudo and email, screen smaller than 768px', () => {
    LS.window.localStorage.setItem('pseudo', 'bob');
    LS.window.localStorage.setItem('email', 'bob@bob.com');

    const div = document.createElement('div');
    div.setAttribute('id', 'TooltipMyVotes');
    document.body.appendChild(div);

    const renderedValue = renderer.create(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('Header (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: {
      authenticated: false,
      pseudo: '',
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<Header store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('voteData')).toEqual(initialState.voteData);
  });
});

describe('Header - REACT-REDUX (Mount + wrapping in <Provider>) - user is logged in', () => {
  const initialState = {
    userData: {
      authenticated: true,
      pseudo: '',
    },
    topAlert: {
      messageType: 'success',
      status: true,
      message: 'Ceci est un test'
    }
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();

    // set localStorage value to login user
    LS.window.localStorage.setItem('pseudo', 'bob');
    LS.window.localStorage.setItem('email', 'bob@bob.com');
    LS.window.localStorage.setItem('authenticated', 'true');
    wrapper = mount(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    );

    const div = document.createElement('div');
    div.setAttribute('id', 'TooltipMyVotes');
    document.body.appendChild(div);
  });

  afterEach(() => {
    // clear localStorage
    LS.window.localStorage.clear();
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check if Hamburger is open', () => {
    window.innerWidth = 767;

    const header = wrapper.find('Header');
    expect(header.state().isOpen).toBeFalsy();
    const buttonHamburger = wrapper.find('.navbar-toggler');
    buttonHamburger.simulate('click');
    expect(header.state().isOpen).toBeTruthy();
  });

  it('check if ToolTip is open', () => {
    const header = wrapper.find('Header');
    const toolTip = wrapper.find('Tooltip');

    expect(header.state().tooltipOpen).toBeFalsy();
    toolTip.props().toggle();
    expect(header.state().tooltipOpen).toBeTruthy();
  });
});

describe('Header - REACT-REDUX (Mount + wrapping in <Provider>) - user is logged in', () => {
  const initialState = {
    userData: {
      authenticated: true,
      pseudo: '',
    },
    topAlert: {
      messageType: 'success',
      status: true,
      message: 'Ceci est un test'
    }
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();

    window.innerWidth = 1280;

    // set localStorage value to login user
    LS.window.localStorage.setItem('pseudo', 'bob');
    LS.window.localStorage.setItem('email', 'bob@bob.com');
    LS.window.localStorage.setItem('authenticated', 'true');

    wrapper = mount(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    );

    const div = document.createElement('div');
    div.setAttribute('id', 'TooltipMyVotes');
    document.body.appendChild(div);
  });

  afterEach(() => {
    // clear localStorage
    LS.window.localStorage.clear();
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Header - REACT-REDUX (Mount + wrapping in <Provider>) - user is not logged in', () => {
  const initialState = {
    topAlert: {
      messageType: 'success',
      status: true,
      message: 'Ceci est un test'
    },
    userData: {
      pseudo: '',
      email: '',
      authenticated: false,
    },
    voteDataForm: {
      pseudo: '',
      email: '',
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
    },
    emailChecker: {
      payload: {
        exist: false,
      },
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
          <Header />
        </Provider>
      </Router>
    );

    const div = document.createElement('div');
    div.setAttribute('id', 'TooltipMyVotes');
    document.body.appendChild(div);
  });

  afterEach(() => {
    LS.window.localStorage.clear();
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check if Hamburger is open', () => {
    window.innerWidth = 767;

    const header = wrapper.find('Header');
    expect(header.state().isOpen).toBeFalsy();
    const buttonHamburger = wrapper.find('.navbar-toggler');
    buttonHamburger.simulate('click');
    expect(header.state().isOpen).toBeTruthy();
  });
});
