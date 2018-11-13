import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ data }) => (
  <tbody>
    {
      data.map(row => (
        <tr key={row.rowId}>
          <th scope="row">{row.rowName}</th>
          {row.rowData.map(cell => <td key={cell.id} className="text-center">{cell.data}</td>)}
        </tr>
      ))
    }
  </tbody>
);

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    rowId: PropTypes.string.isRequired,
    rowName: PropTypes.string.isRequired,
    rowData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        data: PropTypes.any.isRequired,
      })
    ).isRequired,
  })).isRequired,
};

export default TableBody;
