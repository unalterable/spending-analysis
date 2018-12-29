const dockerStarter = require('docker-starter');
const { MongoClient } = require('mongodb');

const mongo = dockerStarter({
  container: 'db-test',
  image: 'mongo:4.0.4',
  extraOptions: '--restart on-failure:5',
  containerPort: 27017,
  publishedPort: 27019,
});


const getDbUrl = (url => async () => {
  if (!url) {
    const { host, port } = mongo.ensureRunning();
    url = `mongodb://${host}:${port}`;
  }
  return url;
})(null);

module.exports = async (dbName, collection) => {
  return {
    getDbUrl,
    getAll: async () => {
      const db = await MongoClient.connect(await getDbUrl(), { useNewUrlParser: true });
      const result = await db.db(dbName).collection(collection).find({}).toArray();
      db.close();
      return result;
    },
    insertMany: async (items) => {
      const db = await MongoClient.connect(await getDbUrl(), { useNewUrlParser: true });
      await db.db(dbName).collection(collection).insertMany(items);
      db.close();
    },
    removeAll: async () => {
      const db = await MongoClient.connect(await getDbUrl(), { useNewUrlParser: true });
      await db.db(dbName).collection(collection).deleteMany({});
      db.close();
    },
  };
};
