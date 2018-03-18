const fs = require('fs')
const parseCSV = require('csv-parse/lib/sync')
const store = require('./store');
const analysis = require('./analysis')


module.exports = {
  data: (req, res) => store.getAllTransactions()
    .then(analysis)
    .then(json => res.json(json))
    .catch(err => { console.error(err)  }),
  saveTransactions: (req, res) => {
    /* const newData = [].concat(req.body);*/
    return store.insertTransactions([])
      .then(() => res.sendStatus(204))
  },
}
