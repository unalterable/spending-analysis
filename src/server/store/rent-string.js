const uuidv4 = require('uuid/v4');
const _  = require('lodash');

const sanitiseItem = item => _.omit(item, '_id');
const projection = { _id: 0 };

module.exports = ({ getCollection }) => {
  const getRentStrings = () => getCollection('rent-string');
  return {
    getAll: () => getRentStrings()
      .then(collection => collection
        .find({}).project({ _id: 0 }).toArray()),
    insertMany: items => getRentStrings()
      .then(collection => collection
        .insertMany(rentStrings.map(rs => { rentString: rs, id: uuidv4() }))),
  };
};
