const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://localhost:27017/';

module.exports = async (dbName, collection) => ({
  getAll: async () => {
    const db = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const result = await db.db(dbName).collection(collection).find({}).toArray();
    db.close();
    return result;
  },
  insertMany: async (items) => {
    const db = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    await db.db(dbName).collection(collection).insertMany(items);
    db.close();
  },
  removeAll: async () => {
    const db = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    await db.db(dbName).collection(collection).deleteMany({});
    db.close();
  },
});
