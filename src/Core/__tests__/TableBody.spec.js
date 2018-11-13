/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';

import shortid from 'shortid';

import { TableBody } from '..';

const fakeDataTableBody = [
  {
    rowData: [
      {
        id: shortid.generate(),
        data: 'X'
      },
      {
        id: shortid.generate(),
        data: ''
      },
      {
        id: shortid.generate(),
        data: ''
      },
      {
        id: shortid.generate(),
        data: 'X'
      }
    ],
    rowId: shortid.generate(),
    rowName: 'bob',
  },
  {
    rowData: [
      {
        id: shortid.generate(),
        data: 'X'
      },
      {
        id: shortid.generate(),
        data: ''
      },
      {
        id: shortid.generate(),
        data: 'X'
      },
      {
        id: shortid.generate(),
        data: 'X'
      }
    ],
    rowId: shortid.generate(),
    rowName: 'roger',
  },
  {
    rowData: [
      {
        id: shortid.generate(),
        data: 'X'
      },
      {
        id: shortid.generate(),
        data: 'X'
      },
      {
        id: shortid.generate(),
        data: ''
      },
      {
        id: shortid.generate(),
        data: 'X'
      }
    ],
    rowId: shortid.generate(),
    rowName: 'mickey',
  }
];

describe('TableBody Snapshot', () => {
  it('capturing Snapshot of TableBody', () => {
    const renderedValue = renderer.create(<TableBody data={fakeDataTableBody} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

export default fakeDataTableBody;
