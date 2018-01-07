import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import accounting from 'accounting';
import Application from './components/application.jsx';

const container = document.getElementById('app');

ReactDom.render(
  <Application />,
  container,
);

axios.get('http://localhost:3000/data').then(({ data }) => {
  const formatDate = date => moment(date).format('DD-MMM-YYYY');
  const formatCurrency = num => accounting.formatMoney(num/100, '£');

  const headers = '<thead><td>Date</td><td>Balance</td><td>Spending This Month</td></thead>'
  const createRow = row => `<tr><td>${formatDate(row.date)}</td><td>${formatCurrency(row.balance)}</td><td>${formatCurrency(row.spendingSoFarThisMonth)}</td></tr>`
  const rows = data.map(createRow).join('');
  container.innerHTML = `<table>${headers}${ rows }</table>`
})
