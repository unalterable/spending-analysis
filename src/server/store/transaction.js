const uuidv4 = require('uuid/v4');

module.exports = ({ getCollection }) => {
  const getTransactions = () => getCollection('transaction');
  return {
    getAll: (userId) => getTransactions()
      .then(collection => collection
        .find({ userId }).project({ _id: 0 }).toArray()),
    insertMany: (userId, transactions) => getTransactions()
      .then(collection => collection
        .insertMany(transactions.map(t => ({ ...t, userId, id: uuidv4() })))),
  };
};
