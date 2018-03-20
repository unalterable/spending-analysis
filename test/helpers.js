const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://localhost:27017/';

module.exports = {
  storeHelper: {
    getAll: (dbName, collection) => MongoClient.connect(mongoUrl)
      .then(db => db.db(dbName).collection(collection).find({}).toArray()
        .then(result => {
          db.close();
          return result})),
    removeAll: (dbName, collection) => MongoClient.connect(mongoUrl)
      .then(db => db.db(dbName).collection(collection).remove({})
        .then(result => db.close())),
  },
}
