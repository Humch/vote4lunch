/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';


import { Title5 } from '../..';


describe('Title5 Snapshot', () => {
  const content = 'Le superbe titre';
  const color = 'white';
  const alignment = 'center';

  it('capturing Snapshot of Title5 with content only', () => {
    const renderedValue = renderer.create(
      <Title5
        content={content}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of Title5 with content and color', () => {
    const renderedValue = renderer.create(
      <Title5
        content={content}
        color={color}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of Title5 with content and alignment', () => {
    const renderedValue = renderer.create(
      <Title5
        content={content}
        alignment={alignment}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
