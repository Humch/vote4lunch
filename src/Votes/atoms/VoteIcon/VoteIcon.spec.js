/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import reduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { mount } from 'enzyme';

import VoteIcon from '.';

describe('VoteIcon - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      pseudo: 'bob',
      email: 'bob@bob.com',
    },
    getAVote: {
      url: 'fak3Url',
      end_date: '2020-10-01 12:00',
    },
    userVoices: {
      result: []
    }
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('check if VoteIcon atom mount', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteIcon
          placeId={1}
        />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('check if VoteIcon atom mount without disabled icon', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteIcon
          placeId={1}
        />
      </Provider>
    );

    const icon = wrapper.find('svg');

    expect(wrapper.length).toEqual(1);
    expect(icon.prop('className')).not.toContain('disabled-icon');
  });

  it('check if click on VoteIcon icon call action addVoice', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteIcon
          placeId={1}
        />
      </Provider>
    );

    const expectedActions = [
      { type: 'ADD_VOICE_BEGIN' },
    ];

    const icon = wrapper.find('svg');
    icon.simulate('click');

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('VoteIcon - REACT-REDUX (Mount + wrapping in <Provider>) with vote state true', () => {
  const initialState = {
    userData: {
      pseudo: 'bob',
      email: 'bob@bob.com',
    },
    getAVote: {
      url: 'fak3Url',
      end_date: '2018-10-01 12:00',
    },
    userVoices: {
      result: [
        {
          placeId: 1,
        },
        {
          placeId: 998,
        },
      ]
    }
  };

  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('check if VoteIcon atom mount', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteIcon
          placeId={1024}
        />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('check if click on VoteIcon icon call action deleteVoice', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteIcon
          placeId={1}
        />
      </Provider>
    );

    const expectedActions = [
      { type: 'DELETE_VOICE_BEGIN' },
    ];

    const icon = wrapper.find('svg');
    icon.simulate('click');

    expect(store.getActions()).toEqual(expectedActions);
  });
});
