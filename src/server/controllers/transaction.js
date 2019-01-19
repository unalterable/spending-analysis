const analysis = require('../analysis/index')

const initTransactionController = (store) => {
  const data = async (req, res) => {
    console.log('1', 1)
    const [statement, rentStrings] = await Promise.all([store.transactions.getAll(), store.rentStrings.getAll()]);
    console.log('2', rentStrings)
    const json = await analysis({ statement, rentStrings });
    console.log('3', 3)
    res.send(json);
  }

  const saveTransactions = async (req, res) => {
    const newData = [].concat(req.body);
    await store.insertTransactions(newData);
    res.sendStatus(204);
  };

  return {
    data,
    saveTransactions,
  };
};

module.exports = initTransactionController;
