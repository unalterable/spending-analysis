const uuidv4 = require('uuid/v4');

module.exports = ({ getCollection }) => {
  const getRentStrings = () => getCollection('rent-string');
  return {
    getAll: (userId) => getRentStrings()
      .then(collection => collection
        .find({ userId }).project({ _id: 0 }).toArray()),
    insertMany: (userId, rentStrings) => getRentStrings()
      .then(collection => collection
        .insertMany(rentStrings.map(t => ({ ...t, userId, id: uuidv4() })))),
  };
};
