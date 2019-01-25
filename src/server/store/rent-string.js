const uuidv4 = require('uuid/v4');

module.exports = ({ getCollection }) => {
  const getRentStrings = () => getCollection('rent-string');
  return {
    getAll: (userId) => getRentStrings()
      .then(collection => collection
        .find({ userId }).project({ _id: 0 }).toArray()),
    insertOne: (userId, string) => getRentStrings()
      .then(collection => collection
        .insertOne(({ id: uuidv4(), userId, string }))),
    insertMany: (userId, rentStrings) => getRentStrings()
      .then(collection => collection
        .insertMany(rentStrings.map(string => ({ id: uuidv4(), userId, string })))),
  };
};
