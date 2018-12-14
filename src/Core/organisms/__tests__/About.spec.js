/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';

import { About } from '../..';


describe('About Snapshot', () => {
  it('capturing Snapshot of About', () => {
    const renderedValue = renderer.create(
      <About />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
