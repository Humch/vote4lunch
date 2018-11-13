import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ headList }) => (
  <thead>
    <tr>
      <th />
      {headList.map(e => <th key={e.id} className="text-center">{e.name}</th>)}
    </tr>
  </thead>
);

TableHead.propTypes = {
  headList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default TableHead;
