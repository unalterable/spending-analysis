import axios from 'axios';
import moment from 'moment';
import accounting from 'accounting';

const canvass = document.getElementById('app');

canvass.innerHTML = 'Initial Data'

const formatDate = date => moment(date).format('DD-MMM-YYYY');
const formatCurrency = num => accounting.formatMoney(num/100, '£');

const headers = '<thead><td>Date</td><td>Balance</td><td>Spending This Month</td></thead>'
const createRow = row => `<tr><td>${formatDate(row.date)}</td><td>${formatCurrency(row.balance)}</td><td>${formatCurrency(row.spendingSoFarThisMonth)}</td></tr>`

axios.get('http://localhost:3000/data').then(({ data }) => {
  const rows = data.map(createRow).join('');
  canvass.innerHTML = `<table>${headers}${ rows }</table>`
})
