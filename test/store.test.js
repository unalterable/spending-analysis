const _  = require('lodash');
const { expect } = require('chai');
const { initDb } = require('./helpers');

const initStore = require('../src/server/store.js');
const dbName = 'base-app';
const coll = 'items';

const testDoc = {
  prop1: 'val1',
  prop2: 'val2',
};

describe('store', () => {
  let dbHelper;
  let dbConnection;
  let itemsCollection;

  before(async () => {
    dbHelper = await initDb(dbName, coll);
    const { connection, collections } = await initStore();
    dbConnection = connection;
    itemsCollection = collections[coll];
  });

  after(() => dbConnection.close());

  beforeEach(async () => {
    await dbHelper.removeAll();
  });

  it('saves a document, adding a uuid', async () => {
    await itemsCollection.insert(testDoc);

    const dbDocs = await dbHelper.getAll();
    expect(dbDocs).to.have.length(1);

    const dbDoc = dbDocs[0];
    expect(_.omit(dbDoc, ['_id', 'id'])).to.eql(testDoc);
    expect(dbDoc.id).to.be.a('string').with.length(36); // is a uuidv4
  });

  it('retrieves a document', async () => {
    await itemsCollection.insert(testDoc);

    const dbDocs = await itemsCollection.getAll();

    expect(dbDocs).to.have.length(1);
    expect(dbDocs[0]).to.include(testDoc);
  });

  it('updates a document by ID', async () => {
    const entry = await itemsCollection.insert({ prop: 'thing' });

    await itemsCollection.updateById(entry.id, testDoc);

    const dbDocs = await dbHelper.getAll();
    const updatedItem = dbDocs.find(doc => doc.prop === 'thing');

    expect(updatedItem).to.include({ prop: 'thing' });
    expect(updatedItem).to.include(testDoc);
  });

  it('deletes a document by ID', async () => {
    const entry = await itemsCollection.insert({ prop: 'thing' });

    const dbDocs = await dbHelper.getAll();
    const dbItem = dbDocs.find(doc => doc.id === entry.id);
    expect(dbItem).to.include({ id: entry.id, prop: 'thing' });

    await itemsCollection.deleteById(entry.id);

    const updatedDbDocs = await dbHelper.getAll();
    const updatedDbItem = updatedDbDocs.find(doc => doc.id === entry.id);
    expect(updatedDbItem).to.equal(undefined);
  });
});
