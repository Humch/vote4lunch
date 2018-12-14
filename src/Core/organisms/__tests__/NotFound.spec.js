/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';

import { NotFound } from '../..';


describe('NotFound Snapshot', () => {
  it('capturing Snapshot of NotFound', () => {
    const renderedValue = renderer.create(
      <NotFound />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
