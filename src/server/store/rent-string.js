const uuidv4 = require('uuid/v4');

module.exports = ({ getCollection }) => {
  const getRentStrings = () => getCollection('rent-string');
  return {
    getAll: () => getRentStrings()
      .then(collection => collection
        .find({}).project({ _id: 0 }).toArray()),
    insertMany: rentStrings => getRentStrings()
      .then(collection => collection
        .insertMany(rentStrings.map(t => ({ ...t, id: uuidv4() })))),
  };
};
