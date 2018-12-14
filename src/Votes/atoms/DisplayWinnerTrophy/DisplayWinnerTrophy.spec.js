/* eslint-disable no-undef */
import React from 'react';

import { mount } from 'enzyme';

import { DisplayWinnerTrophy } from '../..';

describe('DisplayWinnerEmoji (Shallow)', () => {
  it('check Prop emoji trophy matches', () => {
    const emoji = 'trophy';
    const wrapper = mount(<DisplayWinnerTrophy emoji={emoji} />);

    expect(wrapper.length).toEqual(1);
    expect(wrapper.prop('emoji')).toEqual(emoji);
  });

  it('check Prop emoji surprise matches', () => {
    const emoji = 'surprise';
    const wrapper = mount(<DisplayWinnerTrophy emoji={emoji} />);

    expect(wrapper.length).toEqual(1);
    expect(wrapper.prop('emoji')).toEqual(emoji);
  });

  it('check Prop emoji sadtear matches', () => {
    const emoji = 'sadtear';
    const wrapper = mount(<DisplayWinnerTrophy emoji={emoji} />);

    expect(wrapper.length).toEqual(1);
    expect(wrapper.prop('emoji')).toEqual(emoji);
  });

  it('check Prop no emoji', () => {
    const emoji = '';
    const wrapper = mount(<DisplayWinnerTrophy emoji={emoji} />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.prop('emoji')).toEqual(emoji);
  });
});
