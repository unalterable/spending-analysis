const { MongoClient } = require('mongodb');
const _  = require('lodash');
const url = 'mongodb://localhost:27017/';

const initStoreActions = dbName =>
  MongoClient.connect(url)
    .then(connection => {
      const db = connection.db(dbName);

      const collection1 = db.collection('collection1');

      return {
        connection: connection,
        collections: {
          collection1: {
            getAll: () => collection1.find({}).toArray(),
            insert: objOrArr => collection1.insert(_.cloneDeep(objOrArr)),
            update: (query, changes) => collection1.findOneAndUpdate(query, { $set: _.cloneDeep(changes) }),
            delete: query => collection1.deleteOne(query),
          },
        },
      };
    });

module.exports = initStoreActions;
