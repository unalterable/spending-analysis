import React from 'react';
import { formatDate, formatCurrency, formatTitle } from '../utils/format.js'

const tableStyle = {
  width: '80%',
  border: '1px solid #CCC',
}

const transactionRow = ({ id, date, description, amount, balance }) => (
  <tr key={id}>
    <td>{formatDate(date)}</td>
    <td>{description}</td>
    <td align='right'>{formatCurrency(amount)}</td>
    <td align='right'>{formatCurrency(balance)}</td>
  </tr>
)

const transactionGroup = (name, transactions) => (
  <tbody key={name}>
    <tr>
      <th colSpan={4}>{formatTitle(name)}</th>
    </tr>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Balance</th>
    </tr>
    {transactions.map(transactionRow)}
  </tbody>
)

const TransactionSection = (transactionGroups) => (
  <table style={tableStyle}>
    {
      Object.keys(transactionGroups).length === 0 ?
      ( <tr><td colSpan={4}>No Transactions</td></tr>) :
      Object.keys(transactionGroups).map(name => transactionGroup(name, transactionGroups[name]))
    }
  </table>
)

export default TransactionSection;