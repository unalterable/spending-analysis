const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://localhost:27017/';

module.exports = {
  storeHelper: {
    getAll: async (dbName, collection) => {
      const db = await MongoClient.connect(mongoUrl);
      const result = await db.db(dbName).collection(collection).find({}).toArray();
      db.close();
      return result;
    },
    removeAll: async (dbName, collection) => {
      const db = await MongoClient.connect(mongoUrl);
      await db.db(dbName).collection(collection).remove({});
      db.close();
    },
  },
};
