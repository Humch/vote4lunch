/* eslint-disable no-undef */
import React from 'react';

import renderer from 'react-test-renderer';

import fakeDataTableHead from './TableHead.spec';
import fakeDataTableBody from './TableBody.spec';

import { Table } from '..';


describe('Table Snapshot', () => {
  it('capturing Snapshot of Table with data and headList only', () => {
    const renderedValue = renderer.create(
      <Table
        data={fakeDataTableBody}
        headList={fakeDataTableHead}
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('capturing Snapshot of Table with dark props', () => {
    const renderedValue = renderer.create(
      <Table
        data={fakeDataTableBody}
        headList={fakeDataTableHead}
        dark
      />
    ).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
