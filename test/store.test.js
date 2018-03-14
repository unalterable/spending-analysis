const MongoClient = require('mongodb').MongoClient
const _  = require('lodash');
const expect = require('expect.js')

const initStore = require('../src/server/store.js');
const url = 'mongodb://localhost:27017/';
const db = 'base_app_test';
const coll = 'collection1';

const sut = initStore(db, coll);

const storeHelper = {
  getAll: (dbName, collection) => MongoClient.connect(url)
    .then(db => db.db(dbName).collection(collection).find({}).toArray()
      .then(result => {
        db.close();
        return result})),
  removeAll: (dbName, collection) => MongoClient.connect(url)
    .then(db => db.db(dbName).collection(collection).remove({})
      .then(result => db.close())),
};

describe('store', () => {
  beforeEach(() => storeHelper.removeAll(db, coll));

  const testDoc = {
    prop1: "val1",
    prop2: "val2",
  };

  const testDocs = [
    { num: 0, documentProp1: 'test value1' },
    { num: 1, documentProp2: 'test value2' },
  ];

  it('saves a document', () =>
    sut.insert(testDoc)
      .then(() => storeHelper.getAll(db, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(1);
        expect(_.omit(dbDocs[0], '_id')).to.eql(testDoc);
      })
  );

  it('saves documents', () =>
    sut.insert(testDocs)
      .then(() => storeHelper.getAll(db, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
        expect(_.omit(dbDocs.find(doc => doc.num === 0), '_id')).to.eql(testDocs.find(doc => doc.num === 0));
        expect(_.omit(dbDocs.find(doc => doc.num === 1), '_id')).to.eql(testDocs.find(doc => doc.num === 1));
      })
  );

  it('updates documents', () =>
    sut.insert(testDocs)
      .then(() => sut.update({ num: 0 }, testDoc))
      .then(() => storeHelper.getAll(db, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
        expect(_.omit(dbDocs.find(doc => doc.num === 0), '_id')).to.eql(Object.assign({}, testDocs.find(doc => doc.num === 0), testDoc));
        expect(_.omit(dbDocs.find(doc => doc.num === 1), '_id')).to.eql(testDocs.find(doc => doc.num === 1));
      })
      .then(() => sut.update({ num: 1 }, { documentProp2: 'blob'}))
      .then(() => storeHelper.getAll(db, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
        expect(_.omit(dbDocs.find(doc => doc.num === 1), '_id')).to.eql({ num: 1, documentProp2: 'blob' });
      })
  );

  it('deletes documents', () =>
    sut.insert(testDocs)
      .then(() => storeHelper.getAll(db, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(2);
      })
      .then(() => sut.delete({ num: 0 }))
      .then(() => storeHelper.getAll(db, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(1);
        expect(dbDocs[0].num).to.eql(1);
      })
      .then(() => sut.delete({ num: 1 }))
      .then(() => storeHelper.getAll(db, coll))
      .then(dbDocs => {
        expect(dbDocs).to.have.length(0);
      })
  );
})
