/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';


import ValueChecker from './ValueChecker';


describe('ValueChecker Snapshot', () => {
  it('capturing Snapshot of ValueChecker with check equal false', () => {
    const renderedValue = renderer.create(
      <ValueChecker
        check={false}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of ValueChecker with check', () => {
    const renderedValue = renderer.create(
      <ValueChecker
        check
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
