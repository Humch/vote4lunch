/* eslint-disable no-undef */
import React from 'react';

import { mount } from 'enzyme';

import { MailToButton } from '../..';

describe('DisplayWinnerEmoji (Mount)', () => {
  it('check if atom mount', () => {
    const url = '/c-ici-qu-on-mange';
    window.history.pushState({}, 'Test', url);
    const className = 'pop';
    const wrapper = mount(<MailToButton className={className} />);
    const link = wrapper.find('a');

    expect(wrapper.length).toEqual(1);
    expect(wrapper.prop('className')).toEqual(className);
    expect(link.prop('href')).toEqual(`mailto:?subject=Où%20déjeune-t-on%20ce%20midi?&body=Votez%20grâce%20à%20ce%20lien:%0D%0A%0D%0Ahttp://localhost${url}`);
  });
});
