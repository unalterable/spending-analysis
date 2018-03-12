const fs = require('fs')
const parseCSV = require('csv-parse/lib/sync')
const store = require('./store');
const analysis = require('./analysis')

const getFile = (filePath) => fs.readFileSync(filePath).toString();

module.exports = {
  data: (req, res) => {
    const csv = parseCSV(getFile('./data/statement.csv'), {columns: true})
    const thisAnalysis = analysis(csv);
    return res.json(thisAnalysis);
  },
  saveTransactions: (req, res) => {
    /* const newData = [].concat(req.body);*/
    const csv = parseCSV(getFile('./data/statement.csv'), {columns: true})
    return store.insertTransactions(csv)
      .then(() => res.sendStatus(204))
  },
}
