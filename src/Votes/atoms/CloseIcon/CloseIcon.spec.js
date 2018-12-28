/* eslint-disable no-undef */
import React from 'react';

import { mount } from 'enzyme';

import CloseIcon from '.';

describe('CloseIcon (Mount)', () => {
  let onClickEvent;
  let wrapper;
  beforeEach(() => {
    onClickEvent = jest.fn();
    wrapper = mount(
      <CloseIcon onClickEvent={onClickEvent} />
    );
  });

  it('check CloseIcon (Mount)', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('check button click call function (Mount)', () => {
    const button = wrapper.find('FontAwesomeIcon');
    button.simulate('click');
    expect(onClickEvent).toHaveBeenCalled();
  });
});
