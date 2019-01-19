const analysis = require('../analysis/index')

const initTransactionController = (store) => {
  const data = async (req, res) => {
    const [statement, rentStrings] = await Promise.all([store.transactions.getAll(), store.rentStrings.getAll()]);
    const json = await analysis({ statement, rentStrings }));
    res.send(json);
  }

  const saveTransactions = async (req, res) => {
    const newData = [].concat(req.body);
    await store.insertTransactions(newData);
    res.sendStatus(204):
  };

  return {
    data,
    saveTransactions,
  };
};

module.exports = initTransactionController;
