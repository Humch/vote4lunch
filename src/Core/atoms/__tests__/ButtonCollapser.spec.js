/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';


import { ButtonCollapser } from '../..';


describe('ButtonCollapser Snapshot', () => {
  let collapse = false;
  function toggle() {
    collapse = !collapse;
  }

  it('capturing Snapshot of ButtonCollapser 0', () => {
    const renderedValue = renderer.create(
      <ButtonCollapser
        toggle={() => toggle()}
        collapse={collapse}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of ButtonCollapser 1', () => {
    toggle();
    const renderedValue = renderer.create(
      <ButtonCollapser
        toggle={() => toggle()}
        collapse={collapse}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
