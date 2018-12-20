/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import moment from 'moment';
import 'moment/locale/fr';

import { shallow, mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from 'redux-mock-store';

import CreateAVote from './CreateAVote';

moment.locale('fr');

describe('CreateAVote (Shallow + passing the {store} directly)', () => {
  const initialState = {
    vote: {
      result: '',
      loading: false,
      error: null,
    },
    voteDataForm: {
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: 'ceci est un titre',
      date: moment().format('YYYY-MM-DD'),
      time: '',
      endDate: moment().format('YYYY-MM-DD'),
      endTime: '',
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<CreateAVote store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('pseudo')).toEqual(initialState.voteDataForm.pseudo);
    expect(container.prop('email')).toEqual(initialState.voteDataForm.email);
  });
});

describe('CreateAVote - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    vote: {
      result: '',
      loading: false,
      error: null,
    },
    voteDataForm: {
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: 'ceci est un titre',
      date: moment().format('YYYY-MM-DD'),
      time: '',
      endDate: moment().format('YYYY-MM-DD'),
      endTime: '',
    },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <CreateAVote />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check submitting form', () => {
    const inputTime = wrapper.find('#time');
    inputTime.props().value = '12:00';
    const inputEndTime = wrapper.find('#endTime');
    inputEndTime.props().value = '12:00';

    const form = wrapper.find('Form');
    form.simulate('submit', { preventDefault: jest.fn() });

    const action = store.getActions();
    expect(action[0].type).toBe('CREATE_A_VOTE_BEGIN');
  });
});

describe('CreateAVote - REACT-REDUX (Mount + wrapping in <Provider>) - loading state', () => {
  const initialState = {
    vote: {
      result: '',
      loading: true,
      error: null,
    },
    voteDataForm: {
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: 'ceci est un titre',
      date: moment().format('YYYY-MM-DD'),
      time: '',
      endDate: moment().format('YYYY-MM-DD'),
      endTime: '',
    },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <CreateAVote />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('CreateAVote - REACT-REDUX (Mount + wrapping in <Provider>) - error state', () => {
  const initialState = {
    vote: {
      result: '',
      loading: false,
      error: new Error('oups!'),
    },
    voteDataForm: {
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: 'ceci est un titre',
      date: moment().format('YYYY-MM-DD'),
      time: '',
      endDate: moment().format('YYYY-MM-DD'),
      endTime: '',
    },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <CreateAVote />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('CreateAVote - REACT-REDUX (Mount + wrapping in <Provider>) - success state', () => {
  const initialState = {
    vote: {
      result: {
        id: 138,
        pseudo: 'bob',
        email: 'bob@bob.com',
        date: '2018-10-01T13:00:00.000Z',
        title: 'ceci est un titre',
        end_date: '2018-10-01T13:00:00.000Z',
        url: 'QuMsv',
        updatedAt: '2018-12-17T12:44:16.164Z',
        createdAt: '2018-12-17T12:44:16.164Z',
        active: null
      },
      loading: false,
      error: null,
    },
    voteDataForm: {
      pseudo: 'bob',
      email: 'bob@bob.com',
      title: 'ceci est un titre',
      date: moment().format('YYYY-MM-DD'),
      time: '',
      endDate: moment().format('YYYY-MM-DD'),
      endTime: '',
    },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Router>
        <Provider store={store}>
          <CreateAVote />
        </Provider>
      </Router>

    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
