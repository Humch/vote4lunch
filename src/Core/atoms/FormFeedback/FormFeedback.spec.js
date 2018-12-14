/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';

import FormFeedback from './FormFeedback';


describe('FormFeedback Snapshot', () => {
  it('capturing Snapshot of FormFeedback with valid equal false', () => {
    const renderedValue = renderer.create(
      <FormFeedback
        valid={false}
        text="Ce champ est invalide ;)"
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of ValueChecker with valid', () => {
    const renderedValue = renderer.create(
      <FormFeedback
        valid
        text="Ce champ est valide ;)"
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
