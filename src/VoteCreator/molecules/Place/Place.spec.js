/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Place from './Place';

describe('Place Snapshot', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of Place with restaurant icon', () => {
    const renderedValue = renderer.create(
      <Place
        store={store}
        placeName="Cafétéria Universitaire Le Veracruz"
        type="restaurant"
        voteId={1}
        placeId={1}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of Place with fastfood icon', () => {
    const renderedValue = renderer.create(
      <Place
        store={store}
        placeName="Cafétéria Universitaire Le Veracruz"
        type="fastfood"
        voteId={1}
        placeId={1}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('Place - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {};
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <Place
          placeName="Cafétéria Universitaire Le Veracruz"
          type="restaurant"
          voteId={1}
          placeId={1}
        />
      </Provider>
    );
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check if Button delete the place', () => {
    const buttonDelete = wrapper.find('Button');
    buttonDelete.simulate('click');
  });
});
