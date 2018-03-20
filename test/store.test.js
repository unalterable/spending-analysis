const _  = require('lodash');
const expect = require('expect.js')
const { storeHelper } = require('./helpers.js');

const initStore = require('../src/server/store.js');
const dbName = 'base_app_test';
const coll = 'collection1'

const testDoc = {
  prop1: "val1",
  prop2: "val2",
};

const testDocs = [
  { num: 0, documentProp1: 'test value1' },
  { num: 1, documentProp2: 'test value2' },
];

describe('store', () => {
  let dbConnection;
  let testCollection;

  before(() => initStore(dbName).then(store => {
    dbConnection = store.connection;
    testCollection = store.collections[coll];
  }));

  after(() => dbConnection.close());

  beforeEach(() => storeHelper.removeAll(dbName, coll));

  it('saves a document', () =>
    testCollection.insert(testDoc)
      .then(() => storeHelper.getAll(dbName, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(1);
        expect(_.omit(dbDocs[0], '_id')).to.eql(testDoc);
      })
  );

  it('saves documents', () =>
    testCollection.insert(testDocs)
      .then(() => storeHelper.getAll(dbName, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
        expect(_.omit(dbDocs.find(doc => doc.num === 0), '_id')).to.eql(testDocs.find(doc => doc.num === 0));
        expect(_.omit(dbDocs.find(doc => doc.num === 1), '_id')).to.eql(testDocs.find(doc => doc.num === 1));
      })
  );

  it('updates documents', () =>
    testCollection.insert(testDocs)
      .then(() => testCollection.update({ num: 0 }, testDoc))
      .then(() => storeHelper.getAll(dbName, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
        expect(_.omit(dbDocs.find(doc => doc.num === 0), '_id')).to.eql(Object.assign({}, testDocs.find(doc => doc.num === 0), testDoc));
        expect(_.omit(dbDocs.find(doc => doc.num === 1), '_id')).to.eql(testDocs.find(doc => doc.num === 1));
      })
      .then(() => testCollection.update({ num: 1 }, { documentProp2: 'blob'}))
      .then(() => storeHelper.getAll(dbName, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
        expect(_.omit(dbDocs.find(doc => doc.num === 1), '_id')).to.eql({ num: 1, documentProp2: 'blob' });
      })
  );

  it('deletes documents', () =>
    testCollection.insert(testDocs)
      .then(() => storeHelper.getAll(dbName, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
      })
      .then(() => testCollection.delete({ num: 0 }))
      .then(() => storeHelper.getAll(dbName, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(1);
        expect(dbDocs[0].num).to.eql(1);
      })
      .then(() => testCollection.delete({ num: 1 }))
      .then(() => storeHelper.getAll(dbName, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(0);
      })
  );
})
