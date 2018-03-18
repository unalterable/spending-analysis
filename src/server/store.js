'use strict';
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
const dbName = 'spending_analysis';
const transactionsCollection = 'transactions';

const storeActions = {
  insertTransactions: transactions => MongoClient.connect(url)
    .then(conn => conn.db(dbName).collection(transactionsCollection)
      .insertMany(transactions)
      .then(() => conn.close())),
  getAllTransactions: () => MongoClient.connect(url)
    .then(conn => conn.db(dbName).collection(transactionsCollection)
      .find({}).toArray()
      .then(result => conn.close().then(() => result))),
};

module.exports = storeActions;
