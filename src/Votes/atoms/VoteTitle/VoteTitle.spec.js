/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import VoteTitle from '.';

describe('VoteTitle (Shallow + passing the {store} directly)', () => {
  const initialState = {
    getAVote: {
      pseudo: 'bob',
      title: 'Ceci est un titre',
      date: '2018-12-31',
    }
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<VoteTitle store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});

describe('VoteTitle - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    getAVote: {
      pseudo: 'bob',
      title: 'Ceci est un titre',
      date: '2018-12-31',
    }
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><VoteTitle /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
