/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';

import { TableHead } from '../..';

const fakeDataTableHead = [
  {
    id: 1,
    name: 'Resto 1'
  },
  {
    id: 2,
    name: 'Resto 2'
  },
  {
    id: 3,
    name: 'Resto 3'
  }
];

describe('TableHead Snapshot', () => {
  it('capturing Snapshot of TableHead', () => {
    const renderedValue = renderer.create(<TableHead headList={fakeDataTableHead} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

export default fakeDataTableHead;
