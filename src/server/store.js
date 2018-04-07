'use strict';
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const dbName = 'spending_analysis';
const transactionsCollection = 'transactions';
const rentStringsCollection = 'rent_strings';

const storeActions = {
  insertTransactions: transactions => MongoClient.connect(url)
    .then(conn => conn.db(dbName).collection(transactionsCollection)
      .insertMany(transactions)
      .then(() => conn.close())),

  getAllTransactions: () => MongoClient.connect(url)
    .then(conn => conn.db(dbName).collection(transactionsCollection)
      .find({}).toArray()
      .then(result => conn.close().then(() => result))),

  insertRentStrings: rentStrings => MongoClient.connect(url)
    .then(conn => conn.db(dbName).collection(rentStringsCollection)
      .insertMany(rentStrings)
      .then(() => conn.close())),

  getAllRentStrings: () => MongoClient.connect(url)
    .then(conn => conn.db(dbName).collection(rentStringsCollection)
      .find({}).toArray()
      .then(result => conn.close().then(() => result))),
};

module.exports = storeActions;
