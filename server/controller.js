const store = require('./store');

module.exports = {
  saveTransactions: (req, res) => {
    const newData = [].concat(req.body);
    return store.insertTransactions(newData)
      .then(() => res.sendStatus(204))
  }
}
