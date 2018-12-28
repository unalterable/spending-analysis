const { MongoClient } = require('mongodb');
const uuidv4 = require('uuid/v4');
const _  = require('lodash');

const dbName = 'base-app';
const url = 'mongodb://localhost:27017/';

const sanitiseItem = item => _.omit(item, '_id');

const initStore = async () => {
  const connection = await MongoClient.connect(url, { useNewUrlParser: true });

  const db = connection.db(dbName);

  const itemsCollection = db.collection('items');

  return {
    connection: connection,
    collections: {
      items: {
        getAll: () => itemsCollection.find({}).toArray(),
        getById: id => itemsCollection
          .findOne({ id }),
        insert: item => itemsCollection
          .insertOne({ ...item, id: uuidv4() })
          .then(result => sanitiseItem(result.ops[0])),
        updateById: (id, changes) => itemsCollection
          .findOneAndUpdate({ id }, { $set: _.omit(changes, ['id']) })
          .then(result => sanitiseItem(result.value)),
        deleteById: id => itemsCollection
          .deleteOne({ id }),
      },
    },
  };
};

module.exports = initStore();
