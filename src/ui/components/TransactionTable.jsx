import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { formatTitle, formatDate, formatCurrency } from '../utils/format.js';

const TransactionTable = ({ title, transactions }) => (
  <Paper style={{width: '80%', margin: 'auto' }}>
    {title && <div style={{ textAlign: 'center', padding: '20px 0 0' }}><span>{formatTitle(title)}</span></div>}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell align='right'>Amount</TableCell>
          <TableCell align='right'>Balance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map(({date, description, amount, balance }, i) => (
          <TableRow key={i}>
            <TableCell>{formatDate(date)}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell align='right'>{formatCurrency(amount)}</TableCell>
            <TableCell align='right'>{formatCurrency(balance)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);
export default TransactionTable;
