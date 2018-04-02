const fs = require('fs')
const parseCSV = require('csv-parse/lib/sync')
const store = require('./store');
const analysis = require('./analysis')


module.exports = {
  data: (req, res) =>
    Promise.all([store.getAllTransactions(), store.getAllRentStrings()])
      .then(([statement, rentStrings]) => analysis({ statement, rentStrings }))
      .then(json => res.json(json))
      .catch(console.error),

  saveTransactions: (req, res) => {
    const newData = [].concat(req.body);
    return store.insertTransactions(newData)
      .then(() => res.sendStatus(204))
  },
}
