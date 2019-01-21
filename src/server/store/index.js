const { MongoClient } = require('mongodb');
const config = require('config');
const initRentStringCollection = require('./rent-string');
const initTransactionCollection = require('./transaction');

const mongoOpts = { useNewUrlParser: true, autoReconnect: false };

const getAuth = () => config.has('db.mongo.user') && config.has('db.mongo.password')
                    ? { auth: { user: config.get('db.mongo.user'), password: config.get('db.mongo.password') } }
                    : {};

const getConnection = (connectionAttempt => () => {
  if (!connectionAttempt) {
    connectionAttempt = (async () => {
      try {
        const url = await config.get('db.mongo.url');
        const connection = await MongoClient.connect(url, { ...mongoOpts, ...getAuth() });
        console.info('Mongo connection established');

        connection.on('close', () => {
          console.info('Mongo connection terminated');
          connectionAttempt = null;
        });

        return connection;
      } catch (err) {
        connectionAttempt = null;
        throw Error(`Mongo connection failed: ${err.message}`);
      }
    })();
  }
  return connectionAttempt;
})(null);

const getCollection = (collectionName) => getConnection()
  .then(connection => connection.db(config.get('db.mongo.dbName')).collection(collectionName));

const initStore = () => ({
  getConnection,
  rentStrings: initRentStringCollection({ getCollection }),
  transactions: initTransactionCollection({ getCollection }),
});

module.exports = initStore;
