import React from 'react';
import accounting from 'accounting';
import moment from 'moment';

const formatDate = date => moment(date).format('DD-MMM-YYYY');
const formatCurrency = num => accounting.formatMoney(num/100, '£');

const log = (date, transactions) => {
  console.log('=========');
  console.log(formatDate(date));
  transactions.forEach(transaction => {
    console.log('('+formatCurrency(transaction.amount)+')', transaction.description);
  })
};

const Day = row => (
  <tbody>
    <tr>
      <td>{formatDate(row.date)}</td>
      <td style={row.spending < -50000 ? {color: '#F00'} : {}} onClick={() => log(row.date, row.transactions.spending)}>{formatCurrency(row.spending)}</td>
      <td onClick={() => log(row.date, row.transactions.income)}>{formatCurrency(row.income)}</td>
      <td onClick={() => log(row.date, row.transactions.rent)}>{formatCurrency(row.rent)}</td>
      <td>{formatCurrency(row.balance)}</td>
      <td>{formatCurrency(row.amortisedBalance)}</td>
      <td>{formatCurrency(row.spendingSoFarThisMonth)}</td>
    </tr>
    <tr>
      <td></td>
      <td colSpan={6}></td>
    </tr>
  </tbody>
);

module.exports = Day;
