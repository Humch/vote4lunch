/* eslint-disable no-undef */
import React from 'react';

import { shallow } from 'enzyme';

import { FindRestaurant } from '../..';


describe('FindRestaurant (Shallow)', () => {
  let container;

  beforeEach(() => {
    container = shallow(<FindRestaurant />);
  });

  it('render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });
});
