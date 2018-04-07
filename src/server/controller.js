const store = require('./store');
const analysis = require('./analysis');


module.exports = {
  data: (req, res) =>
    Promise.all([store.getAllTransactions(), store.getAllRentStrings()])
      .then(([statement, rentStrings]) => analysis({ statement, rentStrings }))
      .then(json => res.json(json)),
  saveTransactions: (req, res) => {
    const newData = [].concat(req.body);
    return store.insertTransactions(newData)
      .then(() => res.sendStatus(204));
  },
};
