import React from 'react';

const TableData = ({ row }) => {
  return (
    <tr>
      <td style={{ border: '1px solid #ccc', padding: '10px' }}>{row.name}</td>
      <td style={{ border: '1px solid #ccc', padding: '10px' }}>{row.location}</td>
      <td style={{ border: '1px solid #ccc', padding: '10px' }}>{row.works}</td>
      <td style={{ border: '1px solid #ccc', padding: '10px' }}>{row.telephone}</td>
      <td style={{ border: '1px solid #ccc', padding: '10px' }}>{row.website}</td>
      <td style={{ border: '1px solid #ccc', padding: '10px' }}>{row.established}</td>
    </tr>
  );
};

export default TableData;
