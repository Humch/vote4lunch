/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import FormGroupVoteTitle from './FormGroupVoteTitle';

describe('FormGroupVoteTitle (Shallow)', () => {
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore();
    container = shallow(<FormGroupVoteTitle store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});

describe('FormGroupVoteTitle (Mount)', () => {
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore();
    wrapper = mount(<Provider store={store}><FormGroupVoteTitle /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Test input change', () => {
    const input = wrapper.find('input');
    const event = { target: { value: 'bla bla bla' } };
    input.props().onChange(event);

    const action = store.getActions();
    expect(action[0].type).toBe('FORM_INPUT_TITLE');
    expect(action[0].title).toBe('bla bla bla');
  });
});
