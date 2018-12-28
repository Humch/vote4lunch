/* eslint-disable no-undef */
import React from 'react';

import { mount } from 'enzyme';

import { BrowserRouter as Router } from 'react-router-dom';

import HomeButton from '.';

describe('HomeButton (Mount)', () => {
  it('check HomeButton', () => {
    const wrapper = mount(
      <Router>
        <HomeButton />
      </Router>
    );

    expect(wrapper.length).toEqual(1);
  });
});
