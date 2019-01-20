const fs = require('fs');
const parseCSV = require('csv-parse/lib/sync');
const initStore = require('../src/server/store/index');
const getFile = (filePath) => fs.readFileSync(filePath).toString();

const rentStrings = require('../test/rent-strings.json');
const csvAsJson = parseCSV(getFile('./test/test-data.csv'), {columns: true});

const store = initStore();

Promise.resolve()
  .then(() => store.transactions.insertMany(csvAsJson))
  .then(() => console.info('inserted transactions')) // eslint-disable-line no-console
  .then(() => store.rentStrings.insertMany(rentStrings))
  .then(() => console.info('inserted rent strings')) // eslint-disable-line no-console
  .then(() => store.getConnection())
  .then(connection => connection.close())
  .catch(e => {
    console.error(e);
    process.exit(1);
  });