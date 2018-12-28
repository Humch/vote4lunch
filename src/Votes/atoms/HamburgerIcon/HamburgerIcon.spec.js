/* eslint-disable no-undef */
import React from 'react';

import { mount } from 'enzyme';

import HamburgerIcon from '.';

describe('HamburgerIcon (Mount)', () => {
  let onClickEvent;
  let wrapper;
  beforeEach(() => {
    onClickEvent = jest.fn();
    wrapper = mount(
      <HamburgerIcon onClickEvent={onClickEvent} />
    );
  });

  it('check HamburgerIcon (Mount)', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check button click call function (Mount)', () => {
    const button = wrapper.find('FontAwesomeIcon');
    button.simulate('click');
    expect(onClickEvent).toHaveBeenCalled();
  });
});
