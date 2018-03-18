const fs = require('fs')
const parseCSV = require('csv-parse/lib/sync')
const store = require('../src/server/store.js');
const getFile = (filePath) => fs.readFileSync(filePath).toString();

const rentStrings = require('../test/rent-strings.json');
const csvAsJson = parseCSV(getFile('./test/test-data.csv'), {columns: true})

Promise.resolve()
  .then(store.insertTransactions(csvAsJson))
  .then(() => console.log('inserted transactions'))
  .then(store.insertRentStrings(rentStrings))
  .then(() => console.log('inserted rent strings'))
