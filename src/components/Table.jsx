import React from 'react';
import TableData from './TableData';

const Table = ({ tableData }) => {
  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <div id="printTable" style={{ width: '80%', borderCollapse: 'collapse', backgroundColor: '#f9f9f9', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>会社名</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>所在地</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>業務内容</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>電話番号</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>ウェブサイト</th>
              <th style={{ border: '1px solid #ccc', padding: '10px' }}>設立年</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <TableData key={index} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
