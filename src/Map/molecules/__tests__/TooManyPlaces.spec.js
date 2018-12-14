/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import configureStore from 'redux-mock-store';

import { TooManyPlaces } from '../..';


describe('TooManyPlaces (Shallow + passing the {store} directly)', () => {
  const initialState = {
    onMapAlert: {
      messageType: 'success',
      status: true,
      message: 'Ceci est un test'
    }
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<TooManyPlaces store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
  it('check Prop matches with initialState', () => {
    expect(container.prop('messageType')).toEqual(initialState.onMapAlert.messageType);
  });
});
