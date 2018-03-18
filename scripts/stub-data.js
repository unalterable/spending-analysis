const fs = require('fs')
const parseCSV = require('csv-parse/lib/sync')
const store = require('../src/server/store.js');

const getFile = (filePath) => fs.readFileSync(filePath).toString();

const csv = parseCSV(getFile('./test/test-data.csv'), {columns: true})

store.insertTransactions(csv)
  .then(() => console.log('success'))
