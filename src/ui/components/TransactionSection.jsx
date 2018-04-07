import React from 'react';
import TransactionTable from './TransactionTable.jsx';
import { formatTitle } from '../utils/format.js';

const TransactionSection = (transactionGroups) => {
  if(Object.keys(transactionGroups).length === 0) {
    return (<div>No Transactions</div>);
  }
  return Object.keys(transactionGroups).map(name => (
    <div key={name}>
      <span>{formatTitle(name)}</span>
      <TransactionTable transactions={transactionGroups[name]} />
    </div>
  ));
};


export default TransactionSection;
