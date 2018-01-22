import React from 'react';
import Plot from 'react-plotly.js'

import Day from './Day.jsx';


const blankRow = (
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
);

const DataSection = ({data}) => {
  const rows = data ? data.reverse().map(row => (
    <Day key={row.date} {...row} />
  )) : blankRow;

  return (
    <div>
      <table width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Spending</th>
            <th>Income</th>
            <th>Rent</th>
            <th>Balance</th>
            <th>Amortised Balance</th>
            <th>Spending This Month</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default DataSection;

