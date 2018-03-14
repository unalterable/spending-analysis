const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;
const _  = require('lodash');
const url = 'mongodb://localhost:27017/';

const initStoreActions = (dbName, collection) => ({
  getAll: () => MongoClient.connect(url)
    .then(db => db.db(dbName).collection(collection).find({}).toArray()
      .then(result => db.close()
        .then(() => result))),
  insert: objOrArr => MongoClient.connect(url)
    .then(db => db.db(dbName).collection(collection).insert(_.cloneDeep(objOrArr))
      .then(() => db.close())),
  update: (query, changes) => MongoClient.connect(url)
    .then(db => db.db(dbName).collection(collection).findOneAndUpdate(query, { $set: _.cloneDeep(changes) })
      .then(() => db.close())),
  delete: query => MongoClient.connect(url)
    .then(db => db.db(dbName).collection(collection).deleteOne(query)
      .then(() => db.close())),
});

module.exports = initStoreActions;
