const analysis = require('../analysis/index')

const initTransactionController = (store) => {
  const data = async (req, res) => {
    const userId = req.jwt.user.id;
    const [statement, rentStrings] = await Promise.all([store.transactions.getAll(userId), store.rentStrings.getAll(userId)]);
    const json = await analysis({ statement, rentStrings });
    res.send(json);
  };

  const saveTransactions = async (req, res) => {
    const userId = req.jwt.user.id;
    const newData = [].concat(req.body);
    await store.transactions.insertMany(userId, newData);
    res.sendStatus(204);
  };

  return {
    data,
    saveTransactions,
  };
};

module.exports = initTransactionController;
