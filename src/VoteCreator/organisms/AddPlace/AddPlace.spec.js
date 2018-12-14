/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from 'redux-mock-store';

import AddPlace from './AddPlace';

describe('AddPlace (Shallow + passing the {store} directly)', () => {
  const initialState = {
    voteData: {
      id: 0,
    },
    userData: {
      pseudo: 'bob',
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<AddPlace store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('voteDataId')).toEqual(initialState.voteData.id);
    expect(container.prop('userDataPseudo')).toEqual(initialState.userData.pseudo);
  });
});

describe('AddPlace - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    voteData: {
      id: 1,
      places: [],
    },
    userData: {
      pseudo: 'bob',
    },
    restaurants: {
      list: [],
    },
    mapCoordinates: {
      positionLatitude: 0,
      positionLongitude: 0,
      zoomLevel: 12,
    },
    onMapAlert: {
      messageType: '',
    },
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('render the connected(SMART) component', () => {
    wrapper = mount(
      <Router>
        <Provider store={store}>
          <AddPlace />
        </Provider>
      </Router>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('render the connected(SMART) component with invalid voteData id', () => {
    initialState.voteData.id = 0;

    wrapper = mount(
      <Router>
        <Provider store={store}>
          <AddPlace />
        </Provider>
      </Router>
    );
    expect(wrapper.length).toEqual(1);
  });
});
