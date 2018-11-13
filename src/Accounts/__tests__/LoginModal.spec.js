/* eslint-disable no-undef */
import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { LoginModal } from '..';

describe('LoginModal Snapshot', () => {
  const initialState = {
    userData: { pseudo: '', email: '' },
    voteDataForm: { pseudo: '', email: '' },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('capturing Snapshot of LoginModal', () => {
    const renderedValue = renderer.create(
      <Provider store={store}>
        <LoginModal />
      </Provider>
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('LoginModal (Shallow + passing the {store} directly)', () => {
  const initialState = {
    userData: { pseudo: '', email: '' },
    voteDataForm: { pseudo: '', email: '' },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<LoginModal store={store} />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('pseudo')).toEqual(initialState.userData.pseudo);
    expect(container.prop('email')).toEqual(initialState.userData.email);
  });
});

describe('LoginModal - REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    userData: { pseudo: '', email: '' },
    voteDataForm: { pseudo: '', email: '' },
  };
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
    wrapper = mount(<Provider store={store}><LoginModal open /></Provider>);
  });

  it('render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check if Modal is open => isOpen props is true', () => {
    const modal = wrapper.find('Modal');

    expect(modal.props().isOpen).toBeTruthy();
  });

  it('check submitting form', () => {
    const inputPseudo = wrapper.find('#pseudo');
    inputPseudo.props().value = 'bob';
    const inputMail = wrapper.find('#email');
    inputMail.props().value = 'bob@bob.com';

    const form = wrapper.find('Form');
    form.simulate('submit', { preventDefault: jest.fn() });

    const action = store.getActions();
    expect(action[0].type).toBe('UPDATE_USER_DATA');
  });
});
