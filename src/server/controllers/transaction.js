const analysis = require('../analysis/index');

const initTransactionController = (store) => {
  const _performChecks = async ({ userId, newTransactions }) => {
    const [statement, rentStrings] = await Promise.all([store.transactions.getAll(userId), store.rentStrings.getAll(userId)]);
    await analysis({ statement: statement.concat(newTransactions), rentStrings: rentStrings.map(({ string }) => string)  });
  };

  const data = async (req, res) => {
    const userId = req.jwt.user.id;
    const [statement, rentStrings] = await Promise.all([store.transactions.getAll(userId), store.rentStrings.getAll(userId)]);
    const json = await analysis({ statement, rentStrings: rentStrings.map(({ string }) => string) });
    res.send(json);
  };

  const saveTransactions = async (req, res) => {
    try {
      const userId = req.jwt.user.id;
      const newData = [].concat(req.body);
      await _performChecks({ userId, newTransactions: newData });
      await store.transactions.insertMany(userId, newData);
      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(409);
      console.error('saveTransactions error =>', e);
    }
  };

  return {
    data,
    saveTransactions,
  };
};

module.exports = initTransactionController;
