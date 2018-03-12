import accounting from 'accounting';
import moment from 'moment';

export const formatDate = date => moment(date).format('DD-MMM-YYYY');
export const formatCurrency = num => accounting.formatMoney(num/100, '£');
export const formatTitle = string => string.replace(/\b\w/g, l => l.toUpperCase())