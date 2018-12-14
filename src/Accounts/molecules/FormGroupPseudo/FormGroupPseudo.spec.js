/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';

import renderer from 'react-test-renderer';

import configureStore from 'redux-mock-store';

import FormGoupPseudo from './FormGroupPseudo';

describe('FormGoupPseudo Snapshot', () => {
  const initialState = {
    userData: {
      pseudo: '',
    },
    pseudoChecker: {
      payload: {
        exist: false,
      },
    },
  };
  const text = 'le super label';
  const forProp = 'pseudo';
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormGoupPseudo', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <FormGoupPseudo
          text={text}
          forProp={forProp}
        />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormGoupPseudo Snapshot', () => {
  const initialState = {
    userData: {
      pseudo: 'bob',
    },
    pseudoChecker: {
      payload: { exist: false },
      loading: false,
    }
  };
  const text = 'le super label';
  const forProp = 'pseudo';
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of FormGoupPseudo with pseudo', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <FormGoupPseudo
          text={text}
          forProp={forProp}
        />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('FormGoupPseudo - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: {
      pseudo: '',
    },
    pseudoChecker: {
      payload: { exist: false },
      loading: false,
    }
  };
  const text = 'le super label';
  const forProp = 'pseudo';
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('render the connected(SMART) component', () => {
    wrapper = mount(
      <Provider store={store}>
        <FormGoupPseudo
          text={text}
          forProp={forProp}
        />
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('expect the input have is-invalid className', () => {
    initialState.pseudoChecker.payload.exist = true;
    wrapper = mount(
      <Provider store={store}>
        <FormGoupPseudo
          text={text}
          forProp={forProp}
        />
      </Provider>
    );
    const input = wrapper.find('input');

    expect(input.hasClass('is-invalid')).toBe(true);
  });
});
