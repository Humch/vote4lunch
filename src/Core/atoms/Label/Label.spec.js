/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';


import Label from './Label';


describe('Label Snapshot', () => {
  const text = 'Le superbe titre';
  const forProp = 'leLabel';
  const color = 'white';

  it('capturing Snapshot of Label with text and forProp only', () => {
    const renderedValue = renderer.create(
      <Label
        text={text}
        forProp={forProp}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of Label with text, forProp and color', () => {
    const renderedValue = renderer.create(
      <Label
        text={text}
        forProp={forProp}
        color={color}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
