'use strict';
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const url = 'mongodb://localhost:27017/personal_spending';

const storeActions = {
  insertTransactions: transactions => MongoClient
    .connect(url)
    .then(db => db.collection('trasactions')
      .insertMany(transactions)
      .then(() => db.close()))
};

module.exports = storeActions;
