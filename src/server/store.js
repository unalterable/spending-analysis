const { MongoClient } = require('mongodb');
const uuidv4 = require('uuid/v4');
const _  = require('lodash');

const getUrl = async () => process.env.NODE_ENV !== 'test'
  ? 'mongodb://localhost:27017'
  : require('../../test/helpers/db')().then(({ getDbUrl }) => getDbUrl());

const dbName = 'base-app';

const sanitiseItem = item => _.omit(item, '_id');

const initStore = async () => {
  const url = await getUrl();
  console.log('url', url)
  const connection = await MongoClient.connect(url, { useNewUrlParser: true });

  const db = connection.db(dbName);

  const itemsCollection = db.collection('items');

  return {
    connection: connection,
    collections: {
      items: {
        getAll: () => itemsCollection.find({}).toArray(),
        getById: id => itemsCollection
          .findOne({ id })
          .then(sanitiseItem),
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

module.exports = initStore;
