import React from 'react';
import { formatDate, formatCurrency } from '../utils/format.js'

const TransactionTable = ({ transactions }) => console.log('transactions', transactions) || (
  <table style={{width: '80%', border: '1px solid #CCC'}}>
    <tbody>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Balance</th>
      </tr>
  {transactions.map(({date, description, amount, balance }, i) => (
    <tr key={i}>
      <td>{formatDate(date)}</td>
      <td>{description}</td>
      <td align='right'>{formatCurrency(amount)}</td>
      <td align='right'>{formatCurrency(balance)}</td>
    </tr>
      ))}
    </tbody>
  </table>
);
export default TransactionTable;
