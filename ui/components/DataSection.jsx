import React from 'react';
import Plot from 'react-plotly.js'
import accounting from 'accounting';
import moment from 'moment';

const formatDate = date => moment(date).format('DD-MMM-YYYY');
const formatCurrency = num => accounting.formatMoney(num/100, '£');

const blankRow = (
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
);

const createRow = row => (
  <tr key={row.date}>
    <td>{formatDate(row.date)}</td>
    <td>{formatCurrency(row.balance)}</td>
    <td>{formatCurrency(row.spendingSoFarThisMonth)}</td>
  </tr>
);

const DataSection = ({data}) => {
  const rows = data ? data.reverse().map(createRow) : blankRow;

  return (
    <div>
      <table width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Balance</th>
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

