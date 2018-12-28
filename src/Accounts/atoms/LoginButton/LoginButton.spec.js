/* eslint-disable no-undef */
import React from 'react';

import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import LoginButton from '.';

describe('LoginButton (Mount)', () => {
  it('check LoginButton', () => {
    const wrapper = mount(
      <Router>
        <LoginButton />
      </Router>
    );

    expect(wrapper.length).toEqual(1);
  });
});
