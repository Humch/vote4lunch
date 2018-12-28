/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import LogoutButton from '.';

describe('LogoutButton (Shallow + passing the {store} directly)', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<LogoutButton store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});

describe('LogoutButton - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><LogoutButton /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check if button click dispatch action', () => {
    const button = wrapper.find('Button');
    button.simulate('click');

    const action = store.getActions();

    expect(action[0].type).toBe('RESET_USER_DATA');
  });
});
