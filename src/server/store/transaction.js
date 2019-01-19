const uuidv4 = require('uuid/v4');

module.exports = ({ getCollection }) => {
  const getTransactions = () => getCollection('transaction');
  return {
    getAll: () => getTransactions()
      .then(collection => collection
        .find({}).project({ _id: 0 }).toArray()),
    insertMany: transactions => getTransactions()
      .then(collection => collection
        .insertMany(transactions.map(t => ({ ...t, id: uuidv4() })))),
  };
};
