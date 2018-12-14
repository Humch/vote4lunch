/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';

import { Footer } from '../..';


describe('Footer Snapshot', () => {
  it('capturing Snapshot of Footer', () => {
    const renderedValue = renderer.create(
      <Footer />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
