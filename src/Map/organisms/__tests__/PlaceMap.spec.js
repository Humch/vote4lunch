/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { PlaceMap } from '..';

describe('PlaceMap (Shallow + passing the {store} directly)', () => {
  const initialState = {
    restaurants: {
      list: [],
      loading: false,
      error: null,
    },
    mapCoordinates: {
      positionLatitude: 44.833,
      positionLongitude: -0.59,
      zoomLevel: 12,
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);

    const div = global.document.createElement('div');
    div.setAttribute('id', 'leafletmap');
    global.document.body.appendChild(div);

    container = shallow(<PlaceMap store={store} />, { attachTo: div });
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});

describe('PlaceMap (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    restaurants: {
      list: [],
      loading: false,
      error: null,
    },
    mapCoordinates: {
      positionLatitude: 44.833,
      positionLongitude: -0.59,
      zoomLevel: 12,
    },
    onMapAlert: {
      status: false,
      messageType: '',
      message: '',
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <PlaceMap />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
