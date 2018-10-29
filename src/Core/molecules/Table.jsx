import React from 'react';
import PropTypes from 'prop-types';

import { Table as T } from 'reactstrap';

import { TableBody, TableHead } from '../atoms';

const Table = ({ data, headList, dark }) => (
  <T
    dark={dark}
  >
    <TableHead
      headList={headList}
    />
    <TableBody
      headList={headList}
      data={data}
    />
  </T>
);

Table.propTypes = {
  headList: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dark: PropTypes.bool,
};

export default Table;
