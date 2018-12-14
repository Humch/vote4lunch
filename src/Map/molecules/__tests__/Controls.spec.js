/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import { Controls } from '../..';


describe('Controls (Shallow)', () => {
  let container;

  beforeEach(() => {
    container = shallow(<Controls />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});
