/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';

import { mount } from 'enzyme';

import VoteCardTextVoiceCounter from '.';

describe('VoteCardTextVoiceCounter - REACT-REDUX (Mount + wrapping in <Provider>) with no voices', () => {
  const initialState = {
    getVoicesCount: [],
    getAVote: {
      id: 1,
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('check if VoteCardTextVoiceCounter mount with no voices', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteCardTextVoiceCounter
          placeId={1}
        />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });
});

describe('VoteCardTextVoiceCounter - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    getVoicesCount: [
      {
        count: 0,
        place: 1,
        voteId: 1,
      },
    ],
    getAVote: {
      id: 1,
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('check if VoteCardTextVoiceCounter mount', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteCardTextVoiceCounter
          placeId={1}
        />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });
});

describe('VoteCardTextVoiceCounter - REACT-REDUX (Mount + wrapping in <Provider>) without matching place', () => {
  const initialState = {
    getVoicesCount: [
      {
        count: 0,
        place: 1024,
        voteId: 1,
      },
    ],
    getAVote: {
      id: 1,
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('check if VoteCardTextVoiceCounter mount without matching place', () => {
    wrapper = mount(
      <Provider store={store}>
        <VoteCardTextVoiceCounter
          placeId={1}
        />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });
});
